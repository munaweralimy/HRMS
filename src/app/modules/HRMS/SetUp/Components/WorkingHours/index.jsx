import React, {Fragment, useState, useEffect} from 'react';
import { Row, Col, message, Pagination, Button } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import ListCard from '../../../../../molecules/ListCard';
import AddPopup from './Components/AddPopup';
import Search from './Components/Search';
import {CloseCircleFilled} from '@ant-design/icons';
import {getWorkingHoursList} from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import { apiresource } from '../../../../../../configs/constants';
import axios from '../../../../../../services/axiosInterceptor';

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const dispatch = useDispatch();
  const workingHoursListData = useSelector((state) => state.setup.workingHoursListData);

  useEffect(() => {
    dispatch(getWorkingHoursList(page,pageSize));
  }, []);

  const deleteRecord = async (record) => {
    //props.setLoading(true);
    let url = `${apiresource}/Work Hour Template/${record.name}`;
    try {
      await axios.delete(url);
      message.success('Record Successfully Deleted');
      //props.setLoading(false);
      dispatch(getWorkingHoursList(page,pageSize));
    } catch (e) {
      //props.setLoading(false);
      const { response } = e;
      message.error('Something went wrong');
    }
  }

  const ListCol = [
    {
      title: 'Template Name',
      dataIndex: 'template_name',
      key: 'template_name',
      sorted: (a, b) => a.template_name - b.template_name,
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      sorted: (a, b) => a.company - b.company,
    },
    {
      title: 'Users',
      dataIndex: 'total_staff_count',
      key: 'total_staff_count',
      sorted: (a, b) => a.total_staff_count - b.total_staff_count,
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
      text: '+ New Working Hours',
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
    dispatch(getWorkingHoursList(pg,pageSize));
  }

  return (
    <>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Working Hours" btnList={btnList} />
        </Col>
        <Col span={24}>
          <ListCard
            onRow={onClickRow}
            Search={Search}
            onSearch={onSearch}
            ListCol={ListCol}
            ListData={workingHoursListData?.rows}
            pagination={false}
          />
          <div className='w-100 text-right mt-2'>
              <Pagination
                pageSize={pageSize}
                current={page}
                hideOnSinglePage={true}
                onChange={onPageChange}
                total={workingHoursListData?.count}
              />
          </div>
        </Col>
      </Row>
      <Popup {...popup} />
    </>
  );
};