import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import { getLetterTemplateList } from '../../ducks/actions';
import ListCard from '../../../../../molecules/ListCard';
import AddEditLetterTemplate from './Components/AddEditLetteremplate';
import Search from './Components/Search';

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [teamplateData, setTemplateData] = useState('');

  const dispatch = useDispatch();
  const tempData = useSelector((state) => state.setup.letterTemplateListData);
  const ListCol = [
    {
      title: 'Template Name',
      dataIndex: 'name',
      key: 'name',
      sorted: (a, b) => a.name - b.name,
    },
  ];

  const btnList = [
    {
      text: '+ New Letter Template',
      classes: 'green-btn',
      action: () => {
        setTemplateData({ name: '', template_name: '' });
        setVisible(true);
      },
    },
  ];

  const popup = {
    closable: true,
    visibility: visible,
    content: (
      <AddEditLetterTemplate templateData={teamplateData} title="Add New Policy" onClose={() => setVisible(false)} />
    ),
    width: 750,
    onCancel: () => {
      setVisible(false);
    },
  };

  const onClickRow = (record) => {
    return {
      onClick: () => {
        setTemplateData(record);
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
      dispatch(getLetterTemplateList(pagination.current, pagination.pageSize, sorter.order, sorted.columnKey));
    } else {
      dispatch(getLetterTemplateList(pagination.current, pagination.pageSize, '', ''));
    }
  };

  useEffect(() => {
    if (!visible) {
      dispatch(getLetterTemplateList(page, limit, '', ''));
    }
  }, [visible]);

  return (
    <>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Letter Template" btnList={btnList} />
        </Col>
        <Col span={24}>
          <ListCard
            onRow={onClickRow}
            Search={Search}
            onSearch={onSearch}
            ListCol={ListCol}
            ListData={tempData?.rows}
            pagination={{
              total: tempData?.count,
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
