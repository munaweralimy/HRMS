import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Typography, Card, Tabs, Form, Spin, message, Tag } from 'antd';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import StaffDetails from '../../StaffDetails';
import LeaveApplication from './components/LeaveApplication';
import LeaveSummary from './components/LeaveSummary';
import axios from '../../../../../services/axiosInterceptor';
import { apiMethod } from '../../../../../configs/constants';
import { useForm } from 'react-hook-form';
import { LeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { getAdvancementdetails, emptyStaffDetails } from '../../Advancement/dcuks/action';
import { getSingleLeaveDetail, getLeaveApplicationDetail, getEntitlement } from '../ducks/actions';
import ListCard from '../../../../molecules/ListCard';
import { DateField, InputField } from '../../../../atoms/FormElement';

const { TabPane } = Tabs;
const { Title } = Typography;
const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [deleted, setDeleted] = useState([]);
  const [leaveAvailability, setLeaveAvailability] = useState(false);
  const [entitlement, setEntitlement] = useState([]);
  const [load, setLoad] = useState(false);
  const singleLeaveDetail = useSelector((state) => state.leaves.singleLeaveData);
  const applicationLeaveData = useSelector((state) => state.leaves.applicationLeaveData);
  const entitlementData = useSelector((state) => state.leaves.entitlementData);
  const { control, errors, setValue, handleSubmit } = useForm();
  //console.log('entitlementData', entitlementData)

  useEffect(() => {
    dispatch(getSingleLeaveDetail(id));
    dispatch(getEntitlement(id));
    dispatch(getLeaveApplicationDetail(id, 'Pending'));

    dispatch(getAdvancementdetails(id));
    return () => {
      dispatch(emptyStaffDetails())
    }
  }, []);

  useEffect(() => {
    if(entitlementData) {
      let temp = {
        annualLeave: entitlementData?.find(element => element?.leave_type == 'Annual Leave'),
        medicalLeave: entitlementData?.find(element => element?.leave_type === 'Medical Leave'),
        hospitalizationLeave: entitlementData?.find(element => element?.leave_type === 'Hospitalization Leave'),
        paternityLeave: entitlementData?.find(element => element?.leave_type === 'Paternity Leave'),
        bereavementLeave: entitlementData?.find(element => element?.leave_type === 'Bereavement Leave'),
        marriageLeave: entitlementData?.find(element => element?.leave_type === 'Marriage Leave'),
        unpaidLeave: entitlementData?.find(element => element?.leave_type === 'Unpaid Leave'),
        replacementLeave: entitlementData?.find(element => element?.leave_type === 'Replacement Leave'),
        maternityLeave: entitlementData?.find(element => element?.leave_type === 'Maternity Leave')
      };
      setEntitlement(temp)
    }
  }, [entitlementData]);

  const updateStatus = (status, page, limit, sort, sortby) => {
    dispatch(getLeaveApplicationDetail(id, status, page, limit, sort, sortby));
  }

  const onFinish = async (val) => {
    setLoad(true);
    const json = {
      employee_id: id,
      leaves_availibility: [
          {
            leave_type: "Annual Leave",
            entitlement: val?.annualLeave,
            carry_forward_cut_off_days: "70"
          },
          {
            leave_type: "Replacement Leave",
            entitlement: val?.replacementLeave,
          },
          {
            leave_type: "Medical Leave",
            entitlement: val?.medicalLeave,
          },
          {
            leave_type: "Hospitalization Leave",
            entitlement: val?.hospitalizationLeave,
          },
          {
            leave_type: "Bereavement Leave",
            entitlement: val?.bereavementLeave,
          },
          {
            leave_type: "Marriage Leave",
            entitlement: val?.marriageLeave,
          },
          {
            leave_type: "Maternity Leave",
            entitlement: val?.maternityLeave,
          }
      ]
    };
    let url = `${apiMethod}/hrms.api.edit_leaves_availibilites`;
    try {
      await axios.post(url, json);
      message.success('Entitlement Successfully Updated');
      getEntitlement(id)
      setLoad(false);
      setLeaveAvailability(false);
    } catch (e) {
      setLoad(false);
      const { response } = e;
      message.error(e);
    }
  };

  const ListCol = [
    {
      title: 'Leave Type',
      dataIndex: 'leave_type',
      key: 'leave_type',
      sorter: true, 
    },
    {
      title: 'Carried Forward',
      dataIndex: 'carry_forwarded_leaves',
      key: 'carry_forwarded_leaves',
      align: 'center',
      sorter: true,
      render: (text) => {
        return <>{text} Days</>
      }
    },
    {
      title: 'Entitlement',
      dataIndex: 'till_date',
      key: 'till_date',
      sorter: true,
      align: 'center',
      render: (text) => {
        return <>{text} Days</>
      }
    },
    {
      title: 'Taken',
      dataIndex: 'taken_leaves',
      key: 'taken_leaves',
      sorter: true,
      align: 'center',
      render: (text) => {
        return <>{text} Days</>
      }
    },
    {
      title: 'Available',
      dataIndex: 'available_leaves',
      key: 'available_leaves',
      align: 'center',
      sorter: true,
      render: (text) => {
        return <span className="c-success">{text} Days</span>;
      },
    },
  ]

  const editLeave = () => {
    setLeaveAvailability(true)
  }

  useEffect(() => {
    if(leaveAvailability) {
      setValue('annualLeave', entitlement?.annualLeave?.entitlement);
      setValue('medicalLeave', entitlement?.medicalLeave?.entitlement);
      setValue('hospitalizationLeave', entitlement?.hospitalizationLeave?.entitlement);
      setValue('paternityLeave', entitlement?.paternityLeave?.entitlement);
      setValue('bereavementLeave', entitlement?.bereavementLeave?.entitlement);
      setValue('marriageLeave', entitlement?.marriageLeave?.entitlement);
      setValue('unpaidLeave', entitlement?.unpaidLeave?.entitlement);
      setValue('replacementLeave', entitlement?.replacementLeave?.entitlement);
      setValue('maternityLeave', entitlement?.maternityLeave?.entitlement);
    }
  }, [leaveAvailability]);

  return (
    <StaffDetails id={id} section='Tasks' title={'Tasks'}>
      <Card bordered={false} className="uni-card h-auto w-100">
        <Row gutter={[20, 30]}>
          <Col flex='auto'><Title level={4} className='mb-0'>Leaves</Title></Col>
          <Col>
            <Button icon={<LeftOutlined />} size='middle' className="c-graybtn small-btn" onClick={() => history.push(`/requests/${id}`)}>Categories</Button>
          </Col>
          <Col span={24}>
        <Tabs defaultActiveKey="1" type="card" className='custom-tabs'>
            <TabPane tab="Leave Application" key="1">
                <LeaveApplication id={id} updateApi={updateStatus} progressData={singleLeaveDetail?.summary} data={applicationLeaveData} tabSelected={location?.state?.tab == 'Missed' ? 'Issues' : location?.state?.tab} />
            </TabPane>
            <TabPane tab="Summary" key="2">
                <LeaveSummary title="Leave Statistics" id={id} data={singleLeaveDetail?.summary} />
            </TabPane>
            <TabPane tab="Availability" key="3">
              {!leaveAvailability && (
                <ListCard 
                  title='Leave Availability' 
                  ListCol={ListCol} 
                  ListData={singleLeaveDetail?.availibility} 
                  pagination={false}
                  extraBtn={'Edit'}
                  extraAction={editLeave}
                  btnClass='blue-btn'
                  scrolling={500}
                />
              )}
              {leaveAvailability && (
                <Form onFinish={handleSubmit(onFinish)} layout="vertical" scrollToFirstError={true}>
                  <Spin indicator={antIcon} size="large" spinning={load}>
                    <Button type="text" onClick={() => setLeaveAvailability(false)}>Leaves Availabilty</Button>
                    <Col span={24}>
                      <Title level={4} className="c-default mb-0 ">Edit Leave Availability</Title>
                    </Col>
                    <Row gutter={[20, 30]}>
                      <Col span={24}>
                        <Row gutter={[20, 30]}>
                          <Col span={10}>
                            <Tag className="program-list">
                              <span className="p-name">Annual Leave</span>
                            </Tag>
                          </Col>
                          <Col span={10}>
                            <DateField 
                                fieldname='leaveStart'
                                control={control}
                                class='mb-0'
                                iProps={{ placeholder: 'Please Select date', size: 'large', format: "DD-MM-YYYY"}}
                                initValue=''
                            />
                          </Col>
                          <Col span={4}>
                            <InputField 
                                fieldname='annualLeave'
                                control={control}
                                class='mb-0'
                                iProps={{ placeholder: 'Please state', size: 'small'}}
                                initValue=''
                            />
                          </Col>
                        </Row>
                      </Col>

                      <Col span={24}>
                        <Row gutter={[20, 30]}>
                          <Col span={20}>
                            <Tag className="program-list">
                              <span className="p-name">Replacement Leave</span>
                            </Tag>
                          </Col>
                          <Col span={4}>
                            <InputField 
                                fieldname='replacementLeave'
                                control={control}
                                class='mb-0'
                                iProps={{ placeholder: 'Please state', size: 'small'}}
                                initValue=''
                            />
                          </Col>
                        </Row>
                      </Col>

                      <Col span={24}>
                        <Row gutter={[20, 30]}>
                          <Col span={20}>
                            <Tag className="program-list">
                              <span className="p-name">Medical Leave</span>
                            </Tag>
                          </Col>
                          <Col span={4}>
                            <InputField 
                                fieldname='medicalLeave'
                                control={control}
                                class='mb-0'
                                iProps={{ placeholder: 'Please state', size: 'small'}}
                                initValue=''
                            />
                          </Col>
                        </Row>
                      </Col>

                      <Col span={24}>
                        <Row gutter={[20, 30]}>
                          <Col span={20}>
                            <Tag className="program-list">
                              <span className="p-name">Hospitalization Leave</span>
                            </Tag>
                          </Col>
                          <Col span={4}>
                            <InputField 
                                fieldname='hospitalizationLeave'
                                control={control}
                                class='mb-0'
                                iProps={{ placeholder: 'Please state', size: 'small'}}
                                initValue=''
                            />
                          </Col>
                        </Row>
                      </Col>

                      <Col span={24}>
                        <Row gutter={[20, 30]}>
                          <Col span={20}>
                            <Tag className="program-list">
                              <span className="p-name">Bereavement Leave</span>
                            </Tag>
                          </Col>
                          <Col span={4}>
                            <InputField 
                                fieldname='bereavementLeave'
                                control={control}
                                class='mb-0'
                                iProps={{ placeholder: 'Please state', size: 'small'}}
                                initValue=''
                            />
                          </Col>
                        </Row>
                      </Col>

                      <Col span={24}>
                        <Row gutter={[20, 30]}>
                          <Col span={20}>
                            <Tag className="program-list">
                              <span className="p-name">Marriage Leave</span>
                            </Tag>
                          </Col>
                          <Col span={4}>
                            <InputField 
                                fieldname='marriageLeave'
                                control={control}
                                class='mb-0'
                                iProps={{ placeholder: 'Please state', size: 'small'}}
                                initValue=''
                            />
                          </Col>
                        </Row>
                      </Col>

                      <Col span={24}>
                        <Row gutter={[20, 30]}>
                          <Col span={20}>
                            <Tag className="program-list">
                              <span className="p-name">Maternity Leave</span>
                            </Tag>
                          </Col>
                          <Col span={4}>
                            <InputField 
                                fieldname='maternityLeave'
                                control={control}
                                class='mb-0'
                                iProps={{ placeholder: 'Please state', size: 'small'}}
                                initValue=''
                            />
                          </Col>
                        </Row>
                      </Col>

                      <Col span={24} className='text-right'>
                        <Button type='primary' size='large' htmlType='submit' className="green-btn">Save Changes</Button>
                      </Col>
                    </Row>
                  </Spin>
                </Form>
              )}
            </TabPane>
        </Tabs>
        </Col>
        </Row>
      </Card>
    </StaffDetails>
  );
};
