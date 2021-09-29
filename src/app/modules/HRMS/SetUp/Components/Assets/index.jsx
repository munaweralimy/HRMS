import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import ListCard from '../../../../../molecules/ListCard';
import AddEditAsset from './Components/AddEditAssets';
import Search from './Components/Search';
import { CloseCircleFilled } from '@ant-design/icons';
import { getAssetsList } from '../../ducks/actions';
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
      text: '+ New Team',
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

  const deleteRecord = async (record) => {
    //props.setLoading(true);
    let url = `${apiresource}/HRMS Teams/${record.name}`;
    try {
      await axios.delete(url);
      message.success('Record Successfully Deleted');
      //props.setLoading(false);
      dispatch(getAssetsList(page, pageSize));
    } catch (e) {
      //props.setLoading(false);
      const { response } = e;
      message.error('Something went wrong');
    }
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

  const onPageChange = (pg) => {
    setPage(pg);
    dispatch(getAssetsList(pg, pageSize));
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
