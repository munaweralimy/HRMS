import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Button, Switch, message } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import ListCard from '../../../../../molecules/ListCard';
import AddEditReqForm from './Components/AddEditReqForm';
import Search from './Components/Search';
import { CloseCircleFilled } from '@ant-design/icons';
import { getRequestFormsList } from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import { delRequest } from '../../ducks/services';
import { getRoles } from '../../../../Application/ducks/actions';

export default (props) => {
  const [formFields, setFormFields] = useState();
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  
  const dispatch = useDispatch();
  const requestFormsList = useSelector((state) => state.setup.requestFormsListData);

  useEffect(() => {
    dispatch(getRoles());
    if (!visible) {
      dispatch(getRequestFormsList(page, limit, '', ''));
    }
  }, [visible]);

  const ListCol = [
    {
      title: 'Form Name',
      dataIndex: 'form_name',
      key: 'form_name',
      sorter: true,
      render: (text, record) => (
        <Button type="link" className="list-links" onClick={() => onClickRow(record)}>{text}</Button>
      ),
    },
    {
      title: 'Fields',
      dataIndex: 'fields',
      key: 'fields',
      sorter: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      sorter: true,
      render: (text, record) => <Switch checked={text == 1 ? true : false} disabled />,
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action',
      sorted: (a, b) => a.Action - b.Action,
      align: 'center',
      render: (text, record) => (
        <Button type="link" className="list-links" onClick={() => deleteRequest(record.form_name)}>
          <CloseCircleFilled />
        </Button>
      ),
    },
  ];

  const btnList = [
    {
      text: '+ New Team',
      classes: 'green-btn',
      action: () => {
        setVisible(true);
      },
    },
  ];

  const onUpdate = () => {
    setVisible(false);
    dispatch(getRequestFormsList(page, limit, '', ''));
  }

  const popup = {
    closable: true,
    visibility: visible,
    content: <AddEditReqForm title="Add New Form" data={formFields} onClose={() => setVisible(false)} onUpdate={onUpdate} />,
    width: 536,
    onCancel: () => setVisible(false),
  };
  

  const deleteRequest = async (name) => {
    props.setLoading(true);
    delRequest(name).then(res => {
      message.success('Request Deleted');
      onUpdate();
      props.setLoading(false);
    }).catch(e => {
      props.setLoading(false);
      message.error('Something went wrong');
    });
  };

  const onClickRow = (record) => {
      setFormFields(record);
      setVisible(true);
  };
  const onSearch = (value) => {
    console.log('check values', value);
  };
  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getRequestFormsList(pagination.current, pagination.pageSize, sorter.order, sorter.columnKey));
    } else {
      dispatch(getRequestFormsList(pagination.current, pagination.pageSize, '', ''));
    }
  };
  return (
    <>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Request Form" btnList={btnList} />
        </Col>
        <Col span={24}>
          <ListCard
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
