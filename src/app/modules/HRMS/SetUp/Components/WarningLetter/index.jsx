import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Button, Pagination, message } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import ListCard from '../../../../../molecules/ListCard';
import Search from './Components/Search';
import { CloseCircleFilled } from '@ant-design/icons';
import { getWarningLetterList, showWarningLetter, getAllApprovers, getALlLetterTemp } from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';

export default (props) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const warningLetterListData = useSelector((state) => state.setup.warningLetterListData);

  useEffect(() => {
    dispatch(getWarningLetterList(page, limit, '', ''));
    dispatch(getAllApprovers());
    dispatch(getALlLetterTemp());
  }, []);

  const ListCol = [
    {
      title: 'Warning Letter Name',
      dataIndex: 'writing_letter_name',
      key: 'writing_letter_name',
      sorter: true,
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action',
      align: 'center',
      width: '100px',
      render: (text, record) => (
        <Button type="link" className="list-links" onClick={() => {}}>
          <CloseCircleFilled />
        </Button>
      ),
    },
  ];

  const btnList = [
    {
      text: '+ New Warning Letter',
      classes: 'green-btn',
      action: () => {
        dispatch(showWarningLetter({ name: '', warning_letter_name: '', visible: true }));
      },
    },
  ];

  const onClickRow = (record) => {
    return {
      onClick: () => {
        let warningLetterRecord = {
          name: record.name,
          warning_letter_name: record.warning_letter_name,
          visible: true,
        };
        dispatch(showWarningLetter(warningLetterRecord));
      },
    };
  };

  const onSearch = (value) => {
    console.log('check values', value);
  };

  const onTableChange = (pagination, filters, sorter) => {
    console.log('heloo', pagination);
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getWarningLetterList(pagination.current, pagination.pageSize, sorter.order, sorter.columnKey));
    } else {
      dispatch(getWarningLetterList(pagination.current, pagination.pageSize, '', ''));
    }
  };

  return (
    <Row gutter={[20, 30]}>
      <Col span={24}>
        <HeadingChip title="Warning Letter" btnList={btnList} />
      </Col>
      <Col span={24}>
        <ListCard
          onRow={onClickRow}
          Search={Search}
          onSearch={onSearch}
          ListCol={ListCol}
          ListData={warningLetterListData?.rows}
          pagination={{
            total: warningLetterListData?.count,
            current: page,
            pageSize: limit,
          }}
          onChange={onTableChange}
        />
      </Col>
    </Row>
  );
};
