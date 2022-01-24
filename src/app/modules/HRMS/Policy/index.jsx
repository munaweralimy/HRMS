import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, message } from 'antd';
import { useTranslate } from 'Translate';
import PolicyCard from '../../../atoms/HRMS/PolicyCard';
import HeadingChip from '../../../molecules/HeadingChip';
import { Popup } from '../../../atoms/Popup';
import AddPolicy from './AddPolicy';
import { getPolicyList } from './ducks/actions';
import { useDispatch, useSelector } from 'react-redux';

import axios from '../../../../services/axiosInterceptor';
import { apiMethod } from '../../../../configs/constants';
import Roles from '../../../../routing/config/Roles';
import { allowed } from '../../../../routing/config/utils';
import { baseUrl } from '../../../../configs/constants';

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
    let url = `${apiMethod}/hrms.policy_api.delete_policy?name=${name}`;
    try {
      const res = await axios.post(url);
      props.setLoading(false);
      console.log('res', res)
      if (res.data.message.success == true) {
        message.success(res.data.message.message);
        dispatch(getPolicyList());
      } else {
        message.error(res.data.message.message);
      }
    } catch (e) {
      const { response } = e;
      message.error(e);
      props.setLoading(false);
    }
  };

  const onView = async (data) => {
    const attachment = data?.attachment;
    attachment && window.open(`${baseUrl}${attachment}`, "_blank");

    const json = {
      policy_list: [
        {
          policy_title: data?.policy_title,
          name: data?.name,
          attachment: attachment,
          policy_status: 'Viewed',
          policy_user_group: data?.roles
        }
      ]
    }

    console.log('json', data)

    let url = `${apiMethod}/hrms.policy_api.add_single_policy`;

    try {
      await axios.put(url, json);
      dispatch(getPolicyList());
    } catch (e) {
      const { response } = e;
      message.error(response?.data?.message);
    }
  }

  return (
    <>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Policy" btnList={allowed([Roles.POLICY], 'write') ? btnList : null} />
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