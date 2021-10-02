import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Typography, Card, Tabs, Form, Spin, message } from 'antd';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleLeaveDetail, getLeaveApplicationDetail, } from '../ducks/actions';
import StaffDetails from '../../StaffDetails';
import LeaveApplication from './components/LeaveApplication';
import LeaveSummary from './components/LeaveSummary';
import axios from '../../../../../services/axiosInterceptor';
import { apiMethod } from '../../../../../configs/constants';
import { useForm } from 'react-hook-form';
import { LeftOutlined, LoadingOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { Title } = Typography;
const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const [deleted, setDeleted] = useState([]);
  const [load, setLoad] = useState(false);
  const singleLeaveDetail = useSelector((state) => state.leaves.singleLeaveData);
  const applicationLeaveData = useSelector((state) => state.leaves.applicationLeaveData);
  const { control, errors, handleSubmit, reset } = useForm();

  console.log('singleLeaveDetail?.summary', singleLeaveDetail?.summary)

  useEffect(() => {
    dispatch(getSingleLeaveDetail(id));
    dispatch(getLeaveApplicationDetail(id, 'Pending'));
  }, []);

  const updateStatus = (status, page, limit, sort, sortby) => {
    dispatch(getLeaveApplicationDetail(id, status, page, limit, sort, sortby));
  }

  const onFinish = async (val) => {
    setLoad(true);
    if (deleted.length > 0) {
      let url = `${apiMethod}/hrms.api.delete_projects`;
      try {
        await axios.post(url, { projects: deleted });
        if (val.form_projects.length == 0) {
          message.success('Projects Successfully Updated');
          setLoad(false);
          reset();
        }
      } catch (e) {
        setLoad(false);
        const { response } = e;
        message.error(e);
      }

    }
    if (val.form_projects.length > 0) {
      let proj = [];
      val.form_projects.map((item) => {
          proj.push({
              employee_id: id,
              project_name: item.project.label,
          });
      });
      const json = {
          projects: proj
      };
      let url = `${apiMethod}/hrms.api.add_projects`;
      try {
        await axios.post(url, json);
        message.success('Projects Successfully Updated');
        setLoad(false);
        reset();
      } catch (e) {
        setLoad(false);
        const { response } = e;
        message.error(e);
      }
    } else {
      setLoad(false);
    }
  };

  return (
    <StaffDetails id={id} section='Tasks' data={singleLeaveDetail} title={'Tasks'}>
      <Card bordered={false} className="uni-card h-auto w-100">
        <Row gutter={[20, 30]}>
          <Col flex='auto'><Title level={4} className='mb-0'>Leaves</Title></Col>
          <Col>
            <Button icon={<LeftOutlined />} size='middle' className="c-graybtn small-btn" onClick={() => history.push('/requests')}>Categories</Button>
          </Col>
          <Col span={24}>
        <Tabs defaultActiveKey="1" type="card" className='custom-tabs'>
            <TabPane tab="Leave Application" key="1">
                <LeaveApplication id={id} updateApi={updateStatus} data={applicationLeaveData} tabSelected={location?.state?.tab == 'Missed' ? 'Issues' : location?.state?.tab} />
            </TabPane>
            <TabPane tab="Summary" key="2">
                <LeaveSummary title="Leave Statistics" id={id} data={singleLeaveDetail?.summary} />
            </TabPane>
            <TabPane tab="Availability" key="3">
                <Form onFinish={handleSubmit(onFinish)} layout="vertical" scrollToFirstError={true}>
                  <Spin indicator={antIcon} size="large" spinning={load}>
                    
                  </Spin>
                </Form>
            </TabPane>
        </Tabs>
        </Col>
        </Row>
      </Card>
    </StaffDetails>
  );
};
