import React, {Fragment, useState, useEffect} from 'react';
import { Row, Col, Button, Pagination, message, Switch } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import ListCard from '../../../../../molecules/ListCard';
import AddPopup from './Components/AddPopup';
import Search from './Components/Search';
import {CloseCircleFilled} from '@ant-design/icons';
import {getRequestFormsList} from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import { apiresource } from '../../../../../../configs/constants';
import axios from '../../../../../../services/axiosInterceptor';

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const dispatch = useDispatch();
  const requestFormsListData = useSelector((state) => state.setup.requestFormsListData);

  useEffect(() => {
    dispatch(getRequestFormsList(page,pageSize));
  }, []);

  const ListCol = [
    {
      title: 'Form Name',
      dataIndex: 'form_name',
      key: 'form_name',
      sorted: (a, b) => a.form_name - b.form_name,
    },
    {
      title: 'Fields',
      dataIndex: 'form_fields_count',
      key: 'form_fields_count',
      align: 'center',
      sorted: (a, b) => a.form_fields_count - b.form_fields_count,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorted: (a, b) => a.status - b.status,
      render: (text, record) => (
        <Switch defaultChecked={text == 'Archive'} />
      ),
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
      dispatch(getRequestFormsList(page,pageSize));
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
    dispatch(getRequestFormsList(pg,pageSize));
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
            ListData={requestFormsListData?.rows}
            pagination={false}
          />
          <div className='w-100 text-right mt-2'>
              <Pagination
                pageSize={pageSize}
                current={page}
                hideOnSinglePage={true}
                onChange={onPageChange}
                total={requestFormsListData?.count}
              />
          </div>
        </Col>
      </Row>
      <Popup {...popup} />
    </>
  );
};