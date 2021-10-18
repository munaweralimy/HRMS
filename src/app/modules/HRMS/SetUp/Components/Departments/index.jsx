import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import ListCard from '../../../../../molecules/ListCard';
import { CloseCircleFilled } from '@ant-design/icons';
import { getDepartments } from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import AddEditDepartment from './Component/AddEditDepartment';
import Search from './Component/Search';

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [departmentFields, setDepartmentFields] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  const departmentList = useSelector((state) => state.setup.departmentList);
  console.log({ departmentList });
  useEffect(() => {
    if (!visible) {
      dispatch(getDepartments(page, limit, '', ''));
    }
  }, [visible]);

  const ListCol = [
    {
      title: 'Department',
      dataIndex: 'department_name',
      key: 'department_name',
      sorter: true,
      align: 'center',
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      sorter: true,
    },
    {
      title: 'Employee Name',
      dataIndex: 'employee_name',
      key: 'employee_name',
      sorter: true,
      align: 'center',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: true,
      align: 'center',
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
      text: '+ New Job Position',
      classes: 'green-btn',
      action: () => {
        setDepartmentFields({ name: '', company: '' });
        setVisible(true);
      },
    },
  ];

  const popup = {
    closable: true,
    visibility: visible,
    content: (
      <AddEditDepartment
        departmentField={departmentFields}
        title={`${departmentFields.name ? 'Edit' : 'Add New'} Department`}
        onClose={() => setVisible(false)}
      />
    ),
    width: 900,
    onCancel: () => setVisible(false),
  };

  const onClickRow = (record) => {
    return {
      onClick: () => {
        setDepartmentFields(record);
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
      dispatch(getDepartments(pagination.current, pagination.pageSize, sorter.order, sorter.columnKey));
    } else {
      dispatch(getDepartments(pagination.current, pagination.pageSize, '', ''));
    }
  };

  return (
    <>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Departments" btnList={btnList} />
        </Col>
        <Col span={24}>
          <ListCard
            onRow={onClickRow}
            Search={Search}
            onSearch={onSearch}
            ListCol={ListCol}
            ListData={departmentList?.rows}
            pagination={{
              total: departmentList?.count,
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
