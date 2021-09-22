import React, {Fragment, useState, useEffect} from 'react';
import { Row, Col, Button, Pagination, message } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import ListCard from '../../../../../molecules/ListCard';
import AddPopup from './Components/AddPopup';
import Search from './Components/Search';
import {CloseCircleFilled} from '@ant-design/icons';
import {getApproversList} from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import { apiresource } from '../../../../../../configs/constants';
import axios from '../../../../../../services/axiosInterceptor';

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const dispatch = useDispatch();
  const approversListData = useSelector((state) => state.setup.approversListData);

  useEffect(() => {
    dispatch(getApproversList(page,pageSize));
  }, []);

  const ListCol = [
    {
      title: 'Approver Name',
      dataIndex: 'approver_name',
      key: 'approver_name',
      sorted: (a, b) => a.approver_name - b.approver_name,
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action',
      sorted: (a, b) => a.Action - b.Action,
      align: 'center',
      width: '100px',
      render: (text, record) => (
        <Button type="link" className="list-links" onClick={() => deleteRecord(record)}>
          <CloseCircleFilled />
        </Button>
      ),
    },
  ];

  const btnList = [
    {
      text: '+ New Team',
      classes: 'green-btn',
      action: () => { setVisible(true);},
    },
  ];

  const popup = {
    closable: false,
    visibility: visible,
    class: 'black-modal',
    content: <AddPopup
        title='Add New Policy'
        onClose={() => setVisible(false)}
    />,
    width: 536,
    onCancel: () => setVisible(false),
  };

  const deleteRecord = async (record) => {
    //props.setLoading(true);
    let url = `${apiresource}/HRMS Teams/${record.name}`;
    try {
      await axios.delete(url);
      message.success('Record Successfully Deleted');
      //props.setLoading(false);
      dispatch(getApproversList(page,pageSize));
    } catch (e) {
      //props.setLoading(false);
      const { response } = e;
      message.error('Something went wrong');
    }
  }

  const onClickRow = (record) => {
    return {
      onClick: () => { },
    };
  }

  const onSearch = (value) => {
    console.log('check values', value);
  }

  const onPageChange = (pg) => {
    setPage(pg);
    dispatch(getApproversList(pg,pageSize));
  }

  return (
    <>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Teams" btnList={btnList} />
        </Col>
        <Col span={24}>
          <ListCard
            onRow={onClickRow}
            Search={Search}
            onSearch={onSearch}
            ListCol={ListCol}
            ListData={approversListData?.rows}
            pagination={false}
          />
          <div className='w-100 text-right mt-2'>
              <Pagination
                pageSize={pageSize}
                current={page}
                hideOnSinglePage={true}
                onChange={onPageChange}
                total={approversListData?.count}
              />
          </div>
        </Col>
      </Row>
      <Popup {...popup} />
    </>
  );
};