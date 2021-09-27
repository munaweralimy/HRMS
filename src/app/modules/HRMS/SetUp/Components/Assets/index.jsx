import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import ListCard from '../../../../../molecules/ListCard';
import AddEditAsset from './Components/AddEditAssets';
import Search from './Components/Search';
import { CloseCircleFilled } from '@ant-design/icons';
import { getAssetsList, getEmployeeList } from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [assetField, setAssetField] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  const assetsList = useSelector((state) => state.setup.assetsListData);

  useEffect(() => {
    if (!visible) {
      dispatch(getAssetsList(page, limit, '', ''));
    }
    dispatch(getEmployeeList('Limkokwing University Creative Technology'));
  }, [visible]);

  const ListCol = [
    {
      title: 'Asset No.',
      dataIndex: 'assets_id',
      key: 'assets_id',
      sorted: (a, b) => a.assets_id - b.assets_id,
    },
    {
      title: 'Asset Name',
      dataIndex: 'assets_name',
      key: 'assets_name',
      sorted: (a, b) => a.assets_name - b.assets_name,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        let clname = '';
        if (text == 'In Staff Possession') {
          clname = 'c-pending';
        } else if (text == 'With Company') {
          clname = 'c-success';
        }
        return <span className={`SentanceCase ${clname}`}>{text}</span>;
      },
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
      text: '+ New Asset',
      classes: 'green-btn',
      action: () => {
        setAssetField({ name: '', status: '', assets_id: '', assets_name: '' });
        setVisible(true);
      },
    },
  ];

  const popup = {
    closable: true,
    visibility: visible,
    class: 'black-modal',
    content: <AddEditAsset asset={assetField} title="Add New Asset" onClose={() => setVisible(false)} />,
    width: 536,
    onCancel: () => setVisible(false),
  };

  const onClickRow = (record) => {
    return {
      onClick: () => {
        setAssetField(record);
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
      dispatch(getAssetsList(pagination.current, pagination.pageSize, sorter.order, sorted.columnKey));
    } else {
      dispatch(getAssetsList(pagination.current, pagination.pageSize, '', ''));
    }
  };

  return (
    <>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Assets" btnList={btnList} />
        </Col>
        <Col span={24}>
          <ListCard
            onRow={onClickRow}
            Search={Search}
            onSearch={onSearch}
            ListCol={ListCol}
            ListData={assetsList?.rows}
            pagination={{
              total: assetsList?.count,
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
