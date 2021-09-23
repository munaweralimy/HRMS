import React, { useState, useEffect } from 'react';
import { Row, Col, Button, message } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import ListCard from '../../../../../molecules/ListCard';
import AddEditEducation from './Components/AddEditEducation';
import Search from './Components/Search';
import { CloseCircleFilled } from '@ant-design/icons';
import { getEducationalFieldsList } from '../../ducks/actions';
import { deleteEducationLeave } from '../../ducks/services';
import { useDispatch, useSelector } from 'react-redux';

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [field, setField] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  const educationalFieldsListData = useSelector((state) => state.setup.educationalFieldsListData);

  useEffect(() => {
    if (!visible) {
      dispatch(getEducationalFieldsList(page, limit, '', ''));
    }
  }, [visible]);

  const ListCol = [
    {
      title: 'Education Field',
      dataIndex: 'education_field',
      key: 'education_field',
      sorted: (a, b) => a.education_field - b.education_field,
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action',
      sorted: (a, b) => a.Action - b.Action,
      align: 'center',
      width: '100px',
      render: (text, record) => (
        <Button
          type="link"
          className="list-links"
          onClick={() => {
            // deleteEducationLeave(record.education_field).then((response) => {
            //   dispatch(getEducationalFieldsList(page, limit, '', ''));
            //   message.success('Education deleted successfully');
            // });
          }}
        >
          <CloseCircleFilled />
        </Button>
      ),
    },
  ];

  const btnList = [
    {
      text: '+ New Education Field',
      classes: 'green-btn',
      action: () => {
        setField('');
        setVisible(true);
      },
    },
  ];

  const popup = {
    closable: false,
    visibility: visible,
    class: 'black-modal',
    content: (
      <AddEditEducation educationField={field} title="Add New Education Field" onClose={() => setVisible(false)} />
    ),
    width: 536,
    onCancel: () => setVisible(false),
  };

  const onSearch = (value) => {
    console.log('check values', value);
  };

  const onTableChange = (pagination, filters, sorter) => {
    console.log('heloo', pagination);
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getEducationalFieldsList(pagination.current, pagination.pageSize, sorter.order, sorted.columnKey));
    } else {
      dispatch(getEducationalFieldsList(pagination.current, pagination.pageSize, '', ''));
    }
  };

  const onRowClick = (record) => {
    return {
      onClick: () => {
        setField(record.education_field);
        setVisible(true);
      },
    };
  };

  return (
    <>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Teams" btnList={btnList} />
        </Col>
        <Col span={24}>
          <ListCard
            onRow={onRowClick}
            Search={Search}
            onSearch={onSearch}
            ListCol={ListCol}
            className="clickRow"
            ListData={educationalFieldsListData?.rows}
            pagination={{
              total: educationalFieldsListData?.count,
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
