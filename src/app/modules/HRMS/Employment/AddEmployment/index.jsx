import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Button, Spin, Space, Form } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import HeadingChip from '../../../../molecules/HeadingChip';
import { useHistory } from 'react-router-dom';
import EmployeeForm from '../components/EmployeeForm';
import { LoadingOutlined } from '@ant-design/icons';
import SideDetails from '../../../../molecules/SideDetails';
import SideDetailResponsive from '../../../../molecules/SideDetailResponsive';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../../../configs/constantData';
import PlaceHolderImage from '../../../../../assets/img/scholarship-icon.svg';

const { Title } = Typography;
const antIcon = <LoadingOutlined spin />;

export default (props) => {

  const [ load, setLoad] = useState(false);
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });

  const onFinish = async () => {
  }

  const sideData = {
    image: PlaceHolderImage,
    text: "Please fill up the details on the right. Once finished, click 'Save Draft' or 'Add Faculty' to proceed."
}

  const bottomList = [
      {
          title: 'Save Draft',
          type: 'submit',
          class: 'black-btn',
      },
      {
          title: 'Add Employee',
          type: 'submit',
          class: 'green-btn',
      }
  ]
  

return (
      <Form 
      layout="vertical" 
      scrollToFirstError={true}
      onFinish={onFinish}
      >
        <Row gutter={[20, 30]}>
          <Col span={24}>
            <Space direction="vertical" size={18}>
              <Button type="link" className="c-gray-linkbtn p-0" onClick={() => history.goBack()} htmlType="button">
                <LeftOutlined /> Back
              </Button>
              <HeadingChip title="Add Employee" />
            </Space>
          </Col>
          <Col span={24}>
              <div className='twocol-3070'>
                  <div className='side-detail'>
                      {isHDScreen ?
                      <SideDetails data={sideData} cardType='empty' type="button" bottom={bottomList} />
                      :
                      <SideDetailResponsive data={sideData} cardType='empty' type='button' bottom={bottomList} />
                      }
                  </div>
                  <div className='side-form'>
                    <Card bordered={false} className={`transparent-card ${isHDScreen ? 'scrolling-card' : ''}`}>
                      <Card bordered={false} className="uni-card h-auto w-100">
                        <Row gutter={[20, 30]}>
                          <Col flex='auto'><Title level={4} className='mb-0'>Employment</Title></Col>
                          <Col>
                            <Button icon={<LeftOutlined />} size='middle' className="c-graybtn small-btn" onClick={() => history.push('/requests')}>Categories</Button>
                          </Col>
                          <Col span={24}>
                            <Spin indicator={antIcon} size="large" spinning={load}>
                              <EmployeeForm mode='add' setLoad={setLoad} />
                            </Spin>
                          </Col>
                        </Row>
                      </Card>
                    </Card>
                  </div>
                </div>
            </Col>
        </Row>
    </Form>
  );
};