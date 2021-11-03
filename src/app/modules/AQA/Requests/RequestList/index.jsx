import React, { useState, useEffect } from 'react';
import { Tabs, Badge, Typography, Space } from 'antd';
import RequestCard from '../../../../atoms/RequestCard';
import { getRequestListing, getRequestListingPending, getRequestListingArchive } from '../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';

const { TabPane } = Tabs;
const { Title } = Typography;

export default (props) => {

  const dispatch = useDispatch();
  const dataPending = useSelector((state) => state.request.requestListPending);
  const dataArchive = useSelector((state) => state.request.requestListArchive);
  const dataYourRequest = useSelector((state) => state.request.requestListYourRequest);
  
  useEffect(() => {
    dispatch(getRequestListingPending());
    dispatch(getRequestListingArchive());
    dispatch(getRequestListing());
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
                <RequestCard data={item} link={`/aqa/requests/${item?.name}`} />
              </div>
            ))}
        </div>
      </TabPane>
      
      <TabPane tab={
        <Space size={20}>
          <Title className='tab-header mb-0' level={4}>Your Requests</Title>
      </Space>
      } key="Your Request" forceRender={true}>
        <div className='flexibleRow'>
          {dataYourRequest && dataYourRequest.map((item, index) => (
            <div className='requestPanel' key={index}>
              <RequestCard data={item} link={`/aqa/requests/${item?.name}`} />
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
              <RequestCard data={item} link={`/aqa/requests/${item?.name}`} />
            </div>
          ))}
        </div>
      </TabPane>
    </Tabs>
  );
};
