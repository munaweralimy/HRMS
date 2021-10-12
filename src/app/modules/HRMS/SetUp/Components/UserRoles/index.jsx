import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import ListCard from '../../../../../molecules/ListCard';
import AddEditRoles from './Components/AddEditRoles';
import Search from './Components/Search';
import { CloseCircleFilled } from '@ant-design/icons';
import { getUserList } from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [userFields, setUserFileds] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.setup.userList);

  useEffect(() => {
    if (!visible) {
      dispatch(getUserList(page, limit, '', ''));
    }
  }, [visible]);

  const ListCol = [
    {
      title: 'User Role',
      dataIndex: 'role_name',
      key: 'role_name',
      sorted: (a, b) => a.role_name - b.role_name,
    },
    {
      title: 'Role Access',
      dataIndex: 'role_access',
      key: 'role_access',
      sorted: (a, b) => a.role_access - b.role_access,
    },
    {
      title: 'Users',
      dataIndex: 'users',
      key: 'users',
      sorted: (a, b) => a.users - b.users,
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
      text: '+ New User Role',
      classes: 'green-btn',
      action: () => {
        setUserFileds({ name: '', role_name: '' });
        setVisible(true);
      },
    },
  ];

  const popup = {
    closable: true,
    visibility: visible,
    content: (
      <AddEditRoles
        roleData={userFields}
        title={`${userFields.name ? 'Edit' : 'Add New'} Roles`}
        onClose={() => setVisible(false)}
      />
    ),
    width: 1199,
    onCancel: () => setVisible(false),
  };

  const onClickRow = (record) => {
    return {
      onClick: () => {
        setUserFileds(record);
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
      dispatch(getTeamList(pagination.current, pagination.pageSize, sorter.order, sorted.columnKey));
    } else {
      dispatch(getTeamList(pagination.current, pagination.pageSize, '', ''));
    }
  };
  return (
    <>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="User Roles" btnList={btnList} />
        </Col>
        <Col span={24}>
          <ListCard
            onRow={onClickRow}
            Search={Search}
            onSearch={onSearch}
            ListCol={ListCol}
            ListData={userList?.rows}
            pagination={{
              total: userList?.count,
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
