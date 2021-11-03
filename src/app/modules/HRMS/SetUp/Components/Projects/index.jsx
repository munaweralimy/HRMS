import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Button, Pagination, message } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import ListCard from '../../../../../molecules/ListCard';
import AddEditProject from './Components/AddEditProject';
import Search from './Components/Search';
import { CloseCircleFilled } from '@ant-design/icons';
import { getProjectsList } from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [projectFields, setProjectFields] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  const projectsListData = useSelector((state) => state.setup.projectsListData);

  useEffect(() => {
    if (!visible) {
      dispatch(getProjectsList(page, limit, '', ''));
    }
  }, [visible]);

  const ListCol = [
    {
      title: 'Project Name',
      dataIndex: 'project_name',
      key: 'project_name',
      sorter: true,
    },
    {
      title: 'Staff',
      dataIndex: 'staff',
      key: 'staff',
      sorter: true,
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action',
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
      text: '+ New Project',
      classes: 'green-btn',
      action: () => {
        setProjectFields({ name: '', project_name: '' });
        setVisible(true);
      },
    },
  ];

  const popup = {
    closable: true,
    visibility: visible,
    content: (
      <AddEditProject
        projectData={projectFields}
        title={`${projectFields.name ? 'Edit' : 'Add New'} Projects`}
        onClose={() => setVisible(false)}
      />
    ),
    width: 536,
    onCancel: () => setVisible(false),
  };

  const onClickRow = (record) => {
    return {
      onClick: () => {
        setProjectFields(record);
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
      dispatch(getProjectsList(pagination.current, pagination.pageSize, sorter.order, sorter.columnKey));
    } else {
      dispatch(getProjectsList(pagination.current, pagination.pageSize, '', ''));
    }
  };

  return (
    <>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Projects" btnList={btnList} />
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
