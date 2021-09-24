import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Button, Pagination, message } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import ListCard from '../../../../../molecules/ListCard';
import AddEditHolidays from './Components/AddEditHolidays';
import Search from './Components/Search';
import { CloseCircleFilled } from '@ant-design/icons';
import { getHolidaysList } from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [holidayFields, setHolidayFields] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  const holidaysListData = useSelector((state) => state.setup.holidaysListData);

  useEffect(() => {
    if (!visible) {
      dispatch(getHolidaysList(page, limit, '', ''));
    }
  }, [visible]);

  const ListCol = [
    {
      title: 'Holiday Name',
      dataIndex: 'holiday',
      key: 'holiday',
      sorted: (a, b) => a.holiday - b.holiday,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorted: (a, b) => a.date - b.date,
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
      sorted: (a, b) => a.note - b.note,
      render: (text) => (text ? text : '-'),
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action',
      sorted: (a, b) => a.Action - b.Action,
      align: 'center',
      render: (text, record) => (
        <Button type="link" className="list-links">
          <CloseCircleFilled />
        </Button>
      ),
    },
  ];

  const btnList = [
    {
      text: '+ New Holiday',
      classes: 'green-btn',
      action: () => {
        setHolidayFields({ name: '', holiday: '' });
        setVisible(true);
      },
    },
  ];

  const popup = {
    closable: true,
    visibility: visible,
    class: 'black-modal',
    content: (
      <AddEditHolidays holidayFields={holidayFields} title="Add New Holiday" onClose={() => setVisible(false)} />
    ),
    width: 536,
    onCancel: () => setVisible(false),
  };

  const onClickRow = (record) => {
    return {
      onClick: () => {
        setHolidayFields(record);
        setVisible(true);
      },
    };
  };

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getHolidaysList(pagination.current, pagination.pageSize, sorter.order, sorted.columnKey));
    } else {
      dispatch(getHolidaysList(pagination.current, pagination.pageSize, '', ''));
    }
  };
  const onSearch = () => {};

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
            ListData={holidaysListData?.rows}
            pagination={{
              total: holidaysListData?.count,
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
