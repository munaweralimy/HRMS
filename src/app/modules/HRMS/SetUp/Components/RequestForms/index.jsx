import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Button, Switch } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import ListCard from '../../../../../molecules/ListCard';
import AddEditReqForm from './Components/AddEditReqForm';
import Search from './Components/Search';
import { CloseCircleFilled } from '@ant-design/icons';
import { getRequestFormsList } from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';

export default (props) => {
  const [formFields, setFormFields] = useState('');
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  const requestFormsList = useSelector((state) => state.setup.requestFormsListData);

  useEffect(() => {
    if (!visible) {
      dispatch(getRequestFormsList(page, limit, '', ''));
    }
  }, [visible]);

  const ListCol = [
    {
      title: 'Form Name',
      dataIndex: 'form_name',
      key: 'form_name',
      sorted: (a, b) => a.form_name - b.form_name,
    },
    {
      title: 'Fields',
      dataIndex: 'fields',
      key: 'fields',
      sorted: (a, b) => a.fields - b.fields,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorted: (a, b) => a.status - b.status,
      align: 'center',
      render: (text, record) => <Switch checked={text == 1 ? true : false} disabled />,
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action',
      sorted: (a, b) => a.Action - b.Action,
      align: 'center',
      render: (text, record) => (
        <Button type="link" className="list-links" onClick={() => {}}>
          <CloseCircleFilled />
        </Button>
      ),
    },
  ];

  const btnList = [
    {
      text: '+ New Form',
      classes: 'green-btn',
      action: () => {
        setFormFields({ form_name: '', name: '' });
        setVisible(true);
      },
    },
  ];

  const popup = {
    closable: true,
    visibility: visible,
    content: <AddEditReqForm title="Add New Form" onClose={() => setVisible(false)} />,
    width: 536,
    onCancel: () => setVisible(false),
  };

  const onClickRow = (record) => {
    return {
      onClick: () => {
        setFormFields(record);
        setVisible(true);
      },
    };
  };
  const onSearch = (value) => {
    console.log('check values', value);
  };
  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getRequestFormsList(pagination.current, pagination.pageSize, sorter.order, sorted.columnKey));
    } else {
      dispatch(getRequestFormsList(pagination.current, pagination.pageSize, '', ''));
    }
  };
  return (
    <>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Request Forms" btnList={btnList} />
        </Col>
        <Col span={24}>
          <ListCard
            onRow={onClickRow}
            Search={Search}
            onSearch={onSearch}
            ListCol={ListCol}
            ListData={requestFormsList?.rows}
            pagination={{
              total: requestFormsList?.count,
              current: page,
              pageSize: limit,
            }}
            onChange={onTableChange}
          />
        </Col>
      </Row>
      <Popup {...popup} />
    </>
  );
};
