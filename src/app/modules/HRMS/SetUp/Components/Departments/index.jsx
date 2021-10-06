import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import ListCard from '../../../../../molecules/ListCard';
import { CloseCircleFilled } from '@ant-design/icons';
import { getDepartments } from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import { AddEditDepartment } from './Component/AddEditDepartment';

const Departments = () => {
  const [visible, setVisible] = useState(false);
  const [positionFields, setPositionFields] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  const departmentList = useSelector((state) => state.setup.departmentList);

  useEffect(() => {
    if (!visible) {
      dispatch(getDepartments(page, limit, '', ''));
    }
  }, [visible]);

  const ListCol = [
    {
      title: 'Department',
      dataIndex: 'Department',
      key: 'Department',
      sorted: (a, b) => a.Department - b.Department,
      align: 'center',
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      sorted: (a, b) => a.company - b.company,
    },
    {
      title: 'Employee Name',
      dataIndex: 'employee_name',
      key: 'employee_name',
      sorted: (a, b) => a.employee_name - b.employee_name,
      align: 'center',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorted: (a, b) => a.status - b.status,
      align: 'center',
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
      text: '+ New Job Position',
      classes: 'green-btn',
      action: () => {
        // setPositionFields({ name: '', job_title: '' });
        setVisible(true);
      },
    },
  ];

  const popup = {
    closable: true,
    visibility: visible,
    content: (
      <AddEditDepartment
        jobPosition={positionFields}
        title="Add New Position"
        onClose={() => {
          setVisible(false);
        }}
      />
    ),
    width: 1199,
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
      dispatch(getDepartments(pagination.current, pagination.pageSize, sorter.order, sorted.columnKey));
    } else {
      dispatch(getDepartments(pagination.current, pagination.pageSize, '', ''));
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

export default Departments;
