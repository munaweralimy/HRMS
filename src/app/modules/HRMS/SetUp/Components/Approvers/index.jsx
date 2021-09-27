import React, { useState, useEffect } from 'react';
import { Row, Col, message, Button } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import ListCard from '../../../../../molecules/ListCard';
import AddEditApprover from './Components/AddEditApprover';
import Search from './Components/Search';
import { CloseCircleFilled } from '@ant-design/icons';
import { getApproversList } from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [apparoaverFileds, setApproverFields] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  const approversList = useSelector((state) => state.setup.approversListData);

  useEffect(() => {
    if (!visible) dispatch(getApproversList(page, limit, '', ''));
  }, [visible]);

  const ListCol = [
    {
      title: 'Approver Name',
      dataIndex: 'name',
      key: 'name',
      sorted: (a, b) => a.name - b.name,
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
      text: '+ New Team',
      classes: 'green-btn',
      action: () => {
        setApproverFields({ name: '', approver_name: '' });
        setVisible(true);
      },
    },
  ];

  const popup = {
    closable: true,
    visibility: visible,
    class: 'black-modal',
    content: <AddEditApprover approver={apparoaverFileds} title="Add New Policy" onClose={() => setVisible(false)} />,
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
      dispatch(getApproversList(page, pageSize));
    } catch (e) {
      //props.setLoading(false);
      const { response } = e;
      message.error('Something went wrong');
    }
  };

  const onClickRow = (record) => {
    return {
      onClick: () => {
        setApproverFields(record);
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
      dispatch(getApproversList(pagination.current, pagination.pageSize, sorter.order, sorted.columnKey));
    } else {
      dispatch(getApproversList(pagination.current, pagination.pageSize, '', ''));
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
            ListData={approversList?.rows}
            pagination={{
              total: approversList?.count,
              current: page,
              pageSize: limit,
            }}
            onChange={onTableChange}
          />
          <div className="w-100 text-right mt-2">
            <Pagination
              pageSize={pageSize}
              current={page}
              hideOnSinglePage={true}
              onChange={onPageChange}
              total={approversListData?.count}
            />
          </div>
        </Col>
      </Row>
      <Popup {...popup} />
    </>
  );
};
