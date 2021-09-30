import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Button, Pagination, message } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import ListCard from '../../../../../molecules/ListCard';
import AddEditPosition from './Components/AddEditPosition';
import Search from './Components/Search';
import { CloseCircleFilled } from '@ant-design/icons';
import { getJobPositionsList } from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import { apiresource } from '../../../../../../configs/constants';
import axios from '../../../../../../services/axiosInterceptor';

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [positionFields, setPositionFields] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  const jobPositionsListData = useSelector((state) => state.setup.jobPositionsListData);

  useEffect(() => {
    if (!visible) {
      dispatch(getJobPositionsList(page, limit, '', ''));
    }
  }, [visible]);

  const ListCol = [
    {
      title: 'Job Title',
      dataIndex: 'job_title',
      key: 'job_title',
      sorted: (a, b) => a.job_title - b.job_title,
    },
    {
      title: 'Work Quality',
      dataIndex: 'work_quality',
      key: 'work_quality',
      sorted: (a, b) => a.work_quality - b.work_quality,
      align: 'center',
    },
    {
      title: 'Work Speed',
      dataIndex: 'work_speed',
      key: 'work_speed',
      sorted: (a, b) => a.work_speed - b.work_speed,
      align: 'center',
    },
    {
      title: 'Leadership',
      dataIndex: 'leadership',
      key: 'leadership',
      sorted: (a, b) => a.leadership - b.leadership,
      align: 'center',
    },
    {
      title: 'Critical Thinking',
      dataIndex: 'critical_thinking',
      key: 'critical_thinking',
      sorted: (a, b) => a.critical_thinking - b.critical_thinking,
      align: 'center',
    },
    {
      title: 'Team Work',
      dataIndex: 'team_work',
      key: 'team_work',
      sorted: (a, b) => a.team_work - b.team_work,
      align: 'center',
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action',
      sorted: (a, b) => a.Action - b.Action,
      align: 'center',
      render: (text, record) => (
        <Button type="link" className="list-links" onClick={() => deleteRecord(record)}>
          <CloseCircleFilled />
        </Button>
      ),
    },
  ];

  const btnList = [
    {
      text: '+ New Job Position',
      classes: 'green-btn',
      action: () => {
        setPositionFields({ name: '', job_title: '' });
        setVisible(true);
      },
    },
  ];

  const popup = {
    closable: false,
    visibility: visible,
    class: 'black-modal',
    content: <AddEditPosition title="Add New Position" onClose={() => {}} />,
    width: 536,
    onCancel: () => setVisible(false),
  };

  const onClickRow = (record) => {
    return {
      onClick: () => {
        setPositionFields(record);
        setVisible(true);
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
      dispatch(getJobPositionsList(pagination.current, pagination.pageSize, sorter.order, sorted.columnKey));
    } else {
      dispatch(getJobPositionsList(pagination.current, pagination.pageSize, '', ''));
    }
  };
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
            ListData={jobPositionsListData?.rows}
            pagination={{
              total: jobPositionsListData?.count,
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
