import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Button, Pagination, message } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import ListCard from '../../../../../molecules/ListCard';
import AddPopup from './Components/AddPopup';
import Search from './Components/Search';
import { CloseCircleFilled } from '@ant-design/icons';
import { getProjectsList } from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import { apiresource } from '../../../../../../configs/constants';
import axios from '../../../../../../services/axiosInterceptor';

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  const projectsListData = useSelector((state) => state.setup.projectsListData);

  useEffect(() => {
    dispatch(getProjectsList(page, limit, '', ''));
  }, []);

  const ListCol = [
    {
      title: 'Project Name',
      dataIndex: 'project_name',
      key: 'project_name',
      sorted: (a, b) => a.project_name - b.project_name,
    },
    {
      title: 'Staff',
      dataIndex: 'staff',
      key: 'staff',
      sorted: (a, b) => a.staff - b.staff,
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
      text: '+ New Project',
      classes: 'green-btn',
      action: () => {
        setVisible(true);
      },
    },
  ];

  const popup = {
    closable: false,
    visibility: visible,
    class: 'black-modal',
    content: <AddPopup title="Add New Policy" onClose={() => setVisible(false)} />,
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
      dispatch(getProjectsList(page, pageSize));
    } catch (e) {
      //props.setLoading(false);
      const { response } = e;
      message.error('Something went wrong');
    }
  };

  const onClickRow = (record) => {
    return {
      onClick: () => {},
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
      dispatch(getProjectsList(pagination.current, pagination.pageSize, sorter.order, sorted.columnKey));
    } else {
      dispatch(getProjectsList(pagination.current, pagination.pageSize, '', ''));
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
            ListData={projectsListData?.rows}
            pagination={{
              total: projectsListData?.count,
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
