import React, {Fragment, useState, useEffect} from 'react';
import { Row, Col, message } from 'antd';
import { useTranslate } from 'Translate';
import PolicyCard from '../../../atoms/HRMS/PolicyCard';
import HeadingChip from '../../../molecules/HeadingChip';
import { Popup } from '../../../atoms/Popup';
import AddPolicy from './AddPolicy';
import {getPolicyList} from './ducks/actions';
import { useDispatch, useSelector } from 'react-redux';

import axios from '../../../../services/axiosInterceptor';
import { apiresource } from '../../../../configs/constants';

export default (props) => {

  const il8n = useTranslate();
  const { t } = il8n;
  const dispatch = useDispatch();
  const policyListData = useSelector((state) => state.policy.policyListData);
  const [visible, setVisible] = useState(false);
  const callList = () => dispatch(getPolicyList());
  
  const btnList = [
    {
      text: '+ New Policy',
      action: () => setVisible(true),
      classes: 'green-btn'
    },
  ];

  useEffect(() => {
    callList()
  }, []);

  const popup = {
    closable: false,
    visibility: visible,
    class: 'black-modal',
    content: <AddPolicy
        title='Add New Policy'
        onClose={() => setVisible(false)}
        onUpdate={callList}
    />,
    width: 536,
    onCancel: () => setVisible(false),
  };

  const onDelete = async (name) => {
    props.setLoading(true);
    let url = `${apiresource}/HRMS Policy/${name}`;
    try {
      await axios.delete(url);
      message.success('Policy Successfully Deleted');
      dispatch(getPolicyList());
      props.setLoading(false);
    } catch (e) {
      const { response } = e;
      message.error(e);
      props.setLoading(false);
    }
  };

  const onView = async (data) => {
    const attachment = data?.attachment;
    attachment && window.open(`http://cms2dev.limkokwing.net${attachment}`, "_blank");

    console.log('data', data)
    const json = {
        data: {
          name: data?.name,
          policy_status: "Viewed"
        }
    }
    console.log('json', json)

    let url = `${apiresource}/HRMS Policy/${data?.name}`;
    
    try {
        await axios.put(url, json);
        dispatch(getPolicyList());
    } catch(e) {
        const { response } = e;
        message.error(response?.data?.message);
    }
  }

  return (
    <>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Policy" btnList={btnList} />
        </Col>
        {policyListData && policyListData?.rows?.length > 0 && policyListData?.rows[0]?.map((resp, i) => (
          <Fragment key={i}>
            <Col span={24}>
              <PolicyCard data={resp} onDelete={onDelete} onView={onView} />
            </Col>
          </Fragment>
        ))} 
      </Row>
      <Popup {...popup} />
    </>
  );
};