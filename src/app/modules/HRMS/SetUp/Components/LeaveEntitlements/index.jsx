import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import ListCard from '../../../../../molecules/ListCard';
import AddEditEntitlmentLeave from './Components/AddEditLeaveEntitlement';
import Search from './Components/Search';
import { CloseCircleFilled } from '@ant-design/icons';
import { getLeaveEntitlementsList, getLeaveList } from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [entitlementLeave, setEntitlementLeave] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  const leaveEntitlementsListData = useSelector((state) => state.setup.leaveEntitlementsListData);

  useEffect(() => {
    if (!visible) {
      dispatch(getLeaveEntitlementsList(page, limit, '', ''));
    }
  }, [visible]);

  useEffect(() => {
    dispatch(getLeaveList());
  }, []);

  const ListCol = [
    {
      title: 'Name',
      dataIndex: 'leave_entitlement_name',
      key: 'leave_entitlement_name',
      sorter: true,
    },
    {
      title: 'Entitlement',
      dataIndex: 'entitlement',
      key: 'entitlement',
      sorter: true,
    },
    {
      title: 'Min Years',
      dataIndex: 'min_years',
      key: 'min_years',
      align: 'center',
      sorter: true,
    },
    {
      title: 'Limited',
      dataIndex: 'is_limit',
      key: 'is_limit',
      sorter: true,
      align: 'center',
      // render: (text) => {
      //   if (text == 0) {
      //     return 'No';
      //   } else {
      //     return 'Yes';
      //   }
      // },
    },
    {
      title: 'Apply Before',
      dataIndex: 'apply_before_current_date',
      key: 'apply_before_current_date',
      sorter: true,
      align: 'center',
      // render: (text) => {
      //   if (text == 0) {
      //     return 'No';
      //   } else {
      //     return 'Yes';
      //   }
      // },
    },
    {
      title: 'Prorated',
      dataIndex: 'is_prorate',
      key: 'is_prorate',
      sorter: true,
      align: 'center',
      // render: (text) => {
      //   if (text == 0) {
      //     return 'No';
      //   } else {
      //     return 'Yes';
      //   }
      // },
    },
    {
      title: 'Overdraft',
      dataIndex: 'overdraft',
      key: 'overdraft',
      sorter: true,
      align: 'center',
      // render: (text) => {
      //   if (text == 0) {
      //     return 'No';
      //   } else {
      //     return 'Yes';
      //   }
      // },
    },
    {
      title: 'CF',
      dataIndex: 'carries_forward',
      key: 'carries_forward',
      sorter: true,
      align: 'center',
      // render: (text) => {
      //   if (text == 0) {
      //     return 'No';
      //   } else {
      //     return 'Yes';
      //   }
      // },
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
        setEntitlementLeave({ name: '', leave_entitlement_name: '' });
        setVisible(true);
      },
    },
  ];

  const popup = {
    closable: true,
    visibility: visible,
    content: (
      <AddEditEntitlmentLeave
        leaveEtitlement={entitlementLeave}
        title={`${entitlementLeave.name ? 'Edit' : 'Add New'} Leave Entitlement`}
        onClose={() => setVisible(false)}
      />
    ),
    width: '800px',
    onCancel: () => setVisible(false),
  };

  const onClickRow = (record) => {
    return {
      onClick: () => {
        setEntitlementLeave(record);
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
