import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Button, Spin } from 'antd';
import StaffDetails from '../../StaffDetails';
import { getAdvancementdetails, emptyStaffDetails }  from '../../Advancement/dcuks/action';
import { useDispatch, useSelector } from 'react-redux';
import { LeftOutlined } from '@ant-design/icons';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import EmployeeForm from '../components/EmployeeForm';
import {emptyStaff, getEmployeeDetail} from '../ducks/action';
import { LoadingOutlined } from '@ant-design/icons';

const { Title } = Typography;
const antIcon = <LoadingOutlined spin />;

export default (props) => {

  const {id} = useParams();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [ load, setLoad] = useState(false);
  const details = useSelector(state => state.employment.empDetails);

  useEffect(() => {
    dispatch(getAdvancementdetails(id));
    dispatch(getEmployeeDetail(id));
    return () => {
      dispatch(emptyStaff())
      dispatch(emptyStaffDetails())
    }
  }, []);

  const updateApi = () => {
    dispatch(getEmployeeDetail(id));
  }

return (
    <StaffDetails id={id} section='Employee'>
      
      <Card bordered={false} className="uni-card h-auto w-100">
        <Row gutter={[20, 30]}>
          <Col flex='auto'><Title level={4} className='mb-0'>Employment</Title></Col>
          <Col>
            <Button icon={<LeftOutlined />} size='middle' className="c-graybtn small-btn" onClick={() => history.push(`/requests/${id}`)}>Categories</Button>
          </Col>
          <Col span={24}>
            <Spin indicator={antIcon} size="large" spinning={load}>
              <EmployeeForm mode='edit' data={details} updateApi={updateApi} id={id} setLoad={setLoad} dTab={location?.state} />
            </Spin>
          </Col>
        </Row>
      </Card>
    </StaffDetails>
  );
};