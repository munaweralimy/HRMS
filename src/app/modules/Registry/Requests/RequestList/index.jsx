import React, { useEffect } from 'react';
import { Tabs, Typography, Space, Badge } from 'antd';
import RequestCard from '../../../../atoms/RequestCard';
import { getRequestListingPending, getRequestListingArchive } from '../../../AQA/Requests/ducks/actions';
import { useDispatch, useSelector } from 'react-redux';

const { TabPane } = Tabs;
const { Title } = Typography;

export default (props) => {

  const dispatch = useDispatch();
  const dataPending = useSelector((state) => state.request.requestListPending);
  const dataArchive = useSelector((state) => state.request.requestListArchive);
  
  useEffect(() => {
    dispatch(getRequestListingPending());
    dispatch(getRequestListingArchive());
  }, []);


  return (
    <Tabs defaultActiveKey="Pending" type="card" className="tab-bold">
      <TabPane tab={
        <Space size={20}>
          <Title className='tab-header mb-0' level={4}>Pending Requests</Title>
          <Badge count={dataPending.length} className="tab-badge" />
        </Space>
      } key="Pending" forceRender={true}>
        <div className='flexibleRow'>
          {dataPending && dataPending.map((item, index) => (
              <div className='requestPanel'>
                <RequestCard data={item} link={`/registry/students/${item?.['student id']}`} />
              </div>
            ))}
        </div>
      </TabPane>
      <TabPane tab={
        <Space size={20}>
          <Title className='tab-header mb-0' level={4}>Archives</Title>
        </Space>
      } key="Archive" forceRender={true}>
        <div className='flexibleRow'>
          {dataArchive && dataArchive.map((item) => (
            <div className='requestPanel'>
              <RequestCard data={item} link={`/registry/students/${item?.['student id']}`} />
            </div>
          ))}
        </div>
      </TabPane>
    </Tabs>
  );
};
