import React, {Fragment, useState, useEffect} from 'react';
import { Row, Col, Button, Pagination, message } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import ListCard from '../../../../../molecules/ListCard';
import AddPopup from './Components/AddPopup';
import Search from './Components/Search';
import {CloseCircleFilled} from '@ant-design/icons';
import {getJobPositionsList} from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import { apiresource } from '../../../../../../configs/constants';
import axios from '../../../../../../services/axiosInterceptor';

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const dispatch = useDispatch();
  const jobPositionsListData = useSelector((state) => state.setup.jobPositionsListData);

  useEffect(() => {
    dispatch(getJobPositionsList(page,pageSize));
  }, []);

  const ListCol = [
    {
      title: 'Job Title',
      dataIndex: 'job_position_name',
      key: 'job_position_name',
      sorted: (a, b) => a.job_position_name - b.job_position_name,
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
      dispatch(getJobPositionsList(page,pageSize));
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
    dispatch(getJobPositionsList(pg,pageSize));
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
            ListData={jobPositionsListData?.rows}
            pagination={false}
          />
          <div className='w-100 text-right mt-2'>
              <Pagination
                pageSize={pageSize}
                current={page}
                hideOnSinglePage={true}
                onChange={onPageChange}
                total={jobPositionsListData?.count}
              />
          </div>
        </Col>
      </Row>
      <Popup {...popup} />
    </>
  );
};