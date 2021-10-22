import React, { useEffect } from 'react';
import { Row, Col, Typography, Card, Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import StaffDetails from '../StaffDetails';
import Employment from './components/Employment';
import Management from './components/Managment';
import { LoadingOutlined } from '@ant-design/icons';
import { emptyStaffDetails, getAdvancementdetails } from '../Advancement/dcuks/action';
import { getEmployeeProfile } from './ducks/actions';
import Personal from './components/Personal' 

const { TabPane } = Tabs;
const { Title } = Typography;
const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const dispatch = useDispatch();
  const id = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].name;
  const employeeProfileData = useSelector((state) => state.employeeProfile.employeeProfileData);

  useEffect(() => {
    dispatch(getEmployeeProfile(id))
    dispatch(getAdvancementdetails(id))
    return () => {
      dispatch(emptyStaffDetails())
    }
  }, []);


  return (
    <StaffDetails id={id} section='HRMS Tasks' title={'Tasks'}>
      <Card bordered={false} className="uni-card h-auto w-100">
        <Row gutter={[20, 30]}>
          <Col span={24}>
            <Tabs defaultActiveKey="1" type="card" className='custom-tabs'>
              <TabPane tab="Employment" key="1">
                <Employment id={id} data={employeeProfileData} />
              </TabPane>
              <TabPane tab="Personal" key="2">
                <Personal data={employeeProfileData} />
              </TabPane>
              <TabPane tab="Fit Index" key="3">
                <Management id={id} />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Card>
    </StaffDetails>
  );
};
