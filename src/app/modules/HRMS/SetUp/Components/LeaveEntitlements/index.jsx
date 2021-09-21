import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, message, Pagination, Button } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import ListCard from '../../../../../molecules/ListCard';
import AddPopup from './Components/AddPopup';
import Search from './Components/Search';
import { CloseCircleFilled } from '@ant-design/icons';
import { getLeaveEntitlementsList } from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import { apiresource } from '../../../../../../configs/constants';
import axios from '../../../../../../services/axiosInterceptor';

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  const leaveEntitlementsListData = useSelector((state) => state.setup.leaveEntitlementsListData);

  useEffect(() => {
    dispatch(getLeaveEntitlementsList(page, limit, '', ''));
  }, []);

  const deleteRecord = async (record) => {
    //props.setLoading(true);
    let url = `${apiresource}/HRMS Teams/${record.name}`;
    try {
      await axios.delete(url);
      message.success('Record Successfully Deleted');
      //props.setLoading(false);
      dispatch(getLeaveEntitlementsList(page, pageSize));
    } catch (e) {
      //props.setLoading(false);
      const { response } = e;
      message.error('Something went wrong');
    }
  };

  const ListCol = [
    {
      title: 'Name',
      dataIndex: 'leave_entitlement_name',
      key: 'leave_entitlement_name',
      sorted: (a, b) => a.leave_entitlement_name - b.leave_entitlement_name,
    },
    {
      title: 'Entitlement',
      dataIndex: 'entitlement',
      key: 'entitlement',
      sorted: (a, b) => a.entitlement - b.entitlement,
    },
    {
      title: 'Min Years',
      dataIndex: 'min_years',
      key: 'min_years',
      align: 'center',
      sorted: (a, b) => a.min_years - b.min_years,
    },
    {
      title: 'Limited',
      dataIndex: 'is_limit',
      key: 'is_limit',
      sorted: (a, b) => a.is_limit - b.is_limit,
      align: 'center',
      render: (text) => {
        if (text == 0) {
          return 'No';
        } else {
          return 'Yes';
        }
      },
    },
    {
      title: 'Apply Before',
      dataIndex: 'apply_before_current_date',
      key: 'apply_before_current_date',
      sorted: (a, b) => a.apply_before_current_date - b.apply_before_current_date,
      align: 'center',
      render: (text) => {
        if (text == 0) {
          return 'No';
        } else {
          return 'Yes';
        }
      },
    },
    {
      title: 'Prorated',
      dataIndex: 'is_prorate',
      key: 'is_prorate',
      sorted: (a, b) => a.is_prorate - b.is_prorate,
      align: 'center',
      render: (text) => {
        if (text == 0) {
          return 'No';
        } else {
          return 'Yes';
        }
      },
    },
    {
      title: 'Overdraft',
      dataIndex: 'overdraft',
      key: 'overdraft',
      sorted: (a, b) => a.overdraft - b.overdraft,
      align: 'center',
      render: (text) => {
        if (text == 0) {
          return 'No';
        } else {
          return 'Yes';
        }
      },
    },
    {
      title: 'CF',
      dataIndex: 'carries_forward',
      key: 'carries_forward',
      sorted: (a, b) => a.carries_forward - b.carries_forward,
      align: 'center',
      render: (text) => {
        if (text == 0) {
          return 'No';
        } else {
          return 'Yes';
        }
      },
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
      text: '+ New Entitlement',
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
      dispatch(getLeaveEntitlementsList(pagination.current, pagination.pageSize, sorter.order, sorter.columnKey));
    } else {
      dispatch(getLeaveEntitlementsList(pagination.current, pagination.pageSize, '', ''));
    }
  };
  return (
    <>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Leave Entitlements" btnList={btnList} />
        </Col>
        <Col span={24}>
          <ListCard
            onRow={onClickRow}
            Search={Search}
            onSearch={onSearch}
            ListCol={ListCol}
            ListData={leaveEntitlementsListData?.rows}
            pagination={{
              total: leaveEntitlementsListData?.count,
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
