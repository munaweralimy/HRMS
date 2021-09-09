import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Tabs, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { closeAllOpenForms, getFinanceDetail } from '../ducks/action';
import StaffDetails from '../../StaffDetails';
import { getSingleTaskDetail } from '../../Tasks/ducks/actions';
import { LeftOutlined } from '@ant-design/icons';
import AccountSalary from './AddEditAccountSalary';
import Assets from './AddEditAssets';
import Loans from './AddEditLoans';
import SalaryAdvance from './AddEditSalaryAdvance';

const FinanceDetail = () => {
  const { Title } = Typography;
  const { id } = useParams();
  const { TabPane } = Tabs;
  const dispatch = useDispatch();
  const [tags, setTags] = useState();
  const singleTaskDetail = useSelector((state) => state.tasks.singleTaskData);
  const financeDetails = useSelector((state) => state.finance.financeDetailData);

  const onTabChangeHandler = (e) => {
    dispatch(closeAllOpenForms(falsae));
  };

  useEffect(() => {
    dispatch(getFinanceDetail(id));
    dispatch(getSingleTaskDetail(id));
  }, [id]);

  useEffect(() => {
    if (singleTaskDetail && singleTaskDetail?.projects) {
      let projects = [];
      singleTaskDetail?.projects.map((item) => {
        projects.push({
          name: item.name,
          project: item.project,
        });
      });
      setTags(projects);
    }
  }, [singleTaskDetail]);

  return (
    <StaffDetails id={id} section="Finance" data={singleTaskDetail} title={'Finance'}>
      <Card bordered={false} className="uni-card h-auto">
        <Row gutter={[20, 30]}>
          <Col flex="auto">
            <Title level={4} className="mb-0">
              Finance
            </Title>
          </Col>
          <Col>
            <Button
              icon={<LeftOutlined />}
              size="middle"
              className="c-graybtn small-btn"
              onClick={() => history.push('/requests')}
            >
              Categories
            </Button>
          </Col>
          <Col span={24}>
            <Tabs defaultActiveKey="2" type="card" className="custom-tabs" onChange={onTabChangeHandler}>
              <TabPane tab={'Account & Salary'} key={'1'}>
                <AccountSalary id={id} />
              </TabPane>
              <TabPane tab={'Assets'} key={'2'}>
                <Assets id={id} assetData={financeDetails?.assets} />
              </TabPane>
              <TabPane tab={'Loans'} key={'3'}>
                <Loans id={id} loanData={financeDetails?.loan} />
              </TabPane>
              <TabPane tab={'Salary Advance'} key={'4'}>
                <SalaryAdvance id={id} />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Card>
    </StaffDetails>
  );
};

export default FinanceDetail;
