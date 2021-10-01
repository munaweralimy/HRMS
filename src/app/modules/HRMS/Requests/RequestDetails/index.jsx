import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography } from 'antd';
import StaffDetails from '../../StaffDetails';
import { getAdvancementdetails, emptyStaffDetails }  from '../../Advancement/dcuks/action';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import CategoryCard from '../../../../atoms/CategoryCard';
import Request from '../components/Request'
import { TaskIcon, AdvancementIcon, CalendarIcon, FacultyIcon, ClockIcon, StaffIcon } from '../../../../atoms/CustomIcons';

const { Title } = Typography;

export default (props) => {

  const {id} = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const department = location.pathname.split('/')[1];
  const [ load, setLoad] = useState(false);
  const data = useSelector(state => state.advancement.advData);
  const [requests, setRequests] = useState({
    pending: [],
    yourrequests: [],
    archive: []
  });

  useEffect(() => {
    dispatch(getAdvancementdetails(id));
    return () => {
      dispatch(emptyStaffDetails())
    }
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

  const caseDepart = (dept) => {
    switch(dept) {
      case 'aqa' :
        return { department: 'AQA', link:'/aqa' };

      case 'registry' :
        return { department: 'Registry', link:'/registry' };

      case 'faculty' :
        return { department: 'Faculty', link:'/faculty' };
      case 'hrms' :
          return { department: 'HRMS', link:'/hrms' };
      default:
        break;
    }
  }

  const updateReqApi = () => {
    console.log('i am here');
  }

return (
  <>
      <StaffDetails id={id} section='Requests' data={data}>
        <Row gutter={[20,20]}>
          <Col span={24}>
            <Card bordered={false} className="uni-card h-auto w-100">
              <Request updateReqApi={updateReqApi} currentDept={caseDepart('hrms')} data={requests} selectedTab={location?.state?.rstatus || 'Pending'} selectedPanel={location?.state?.rid || ''} />
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
    </>
  );
};