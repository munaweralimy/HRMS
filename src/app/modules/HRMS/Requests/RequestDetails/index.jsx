import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Tabs } from 'antd';
import StaffDetails from '../../StaffDetails';
import { getAdvancementdetails, emptyStaffDetails }  from '../../Advancement/dcuks/action';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import CategoryCard from '../../../../atoms/CategoryCard';
import Request from '../components/Request'
import { TaskIcon, AdvancementIcon, CalendarIcon, FacultyIcon, ClockIcon, StaffIcon } from '../../../../atoms/CustomIcons';
import { getRequestDetails } from '../ducks/actions';

const { Title } = Typography;
const { TabPane } = Tabs;

export default (props) => {

  const {id} = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const data = useSelector(state => state.advancement.advData);
  const dataRequest = useSelector(state => state.hrmsrequests.requestData);
  const [activeTab, setActiveTab] = useState('Requests');
  const [requests, setRequests] = useState({});

  useEffect(() => {
    dispatch(getAdvancementdetails(id));
    dispatch(getRequestDetails(id));
    return () => dispatch(emptyStaffDetails());
  }, []);

  const cardData = [
    {
      title: 'Tasks',
      icon: <TaskIcon />,
      link: `/tasks/${id}`
    },
    {
      title: 'Advancement',
      icon: <AdvancementIcon />,
      text: 'Low Fit Index',
      status: 'c-error',
      link: `/advancement/${id}`
    },
    {
      title: 'Employment',
      icon: <StaffIcon />,
      text: 'Expiring Passport',
      status: 'c-pending',
      link: `/employment/${id}`
    },
    {
      title: 'Finance',
      icon: <FacultyIcon />,
      text: '1 Outstanding Loan',
      status: 'c-error',
      link: `/finance/${id}`
    },
    {
      title: 'Leaves',
      icon: <CalendarIcon />,
      text: '1 Pending Leave Application',
      status: 'c-error',
      link: `/leaves/${id}`
    },
    {
      title: 'Attendance',
      icon: <ClockIcon />,
      link: `/attendance/${id}`
    },
  ]

  useEffect(() => {
    if (dataRequest.length > 0) {
      console.log('data', dataRequest)
      setRequests({
        pending: dataRequest.filter((value) => value.status == 'Pending'),
        yourrequests: dataRequest.filter((value) => value.status == 'Pending' && value.requestor == 'HR-EMP-00063'),
        archive: dataRequest.filter((value) => value.status != 'Pending')
      })
    }
  }, [dataRequest]);

  const updateReqApi = () => {
    console.log('i am here');
  }

return (
    <StaffDetails id={id} section='Requests' data={data}>
      <Row gutter={[20,20]}>
        <Col span={24}>
          <Card bordered={false} className="uni-card">
            <Row gutter={[20, 20]}>
              <Col span={24}><Title level={4} className='mb-0 c-default'>Requests & Complaints</Title></Col>
              <Col span={24}>
                <Tabs activeKey={activeTab} type="card" className="custom-tabs" onChange={(e) => setActiveTab(e)}>
                  <TabPane tab="Requests" key="Requests">
                    <Request updateReqApi={updateReqApi} data={requests} selectedTab={location?.state?.rstatus || 'Pending'} selectedPanel={location?.state?.rid || ''} />
                  </TabPane>
                  <TabPane tab="Complaints" key="Complaints">
                  </TabPane>
                </Tabs>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card bordered={false} className="uni-card h-auto w-100">
            <Row gutter={[20, 30]}>
              <Col span={24}><Title level={4} className='mb-0'>Select Category</Title></Col>
              <Col span={24}>
                <Row gutter={[20,20]}>
                  {cardData.map((x, i) => (
                    <Col flex='1 0 250px' key={i}>
                      <CategoryCard data={x} />
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </StaffDetails>
  );
};