import React, { useState } from 'react';
import { Row, Col, Button } from 'antd';
import { useForm } from 'react-hook-form';
import ListCard from '../../../../../molecules/ListCard';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { closeAllOpenForms, getFinanceDetail } from '../../ducks/action';
import { LeftOutlined } from '@ant-design/icons';
import AddAsset from '../../components/AddAssest';
import moment from 'moment';

const assetsCol = [
  {
    title: 'Asset No',
    dataIndex: 'asset_no',
    key: 'asset_no',
    sorter: (a, b) => a.asset_no.length - b.asset_no.length,
  },
  {
    title: 'Start',
    dataIndex: 'start_date',
    key: 'start_date',
    sorter: true,
    render: (text) => moment(text).format('Do MMMM YYYY'),
  },
  {
    title: 'End',
    dataIndex: 'end_date',
    key: 'end_date',
    sorter: true,
    render: (text) => moment(text).format('Do MMMM YYYY'),
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
];

const AddEditAssets = (props) => {
  const { assetData } = props;
  const { id } = useParams();
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState();
  const [viewAssetsForm, setViewAssetsForm] = useState(false);
  const tabVal = useSelector((state) => state.finance.tabClose);

  const onFormViewer = (record) => {
    setRowData(record);
    dispatch(closeAllOpenForms(true));
    setViewAssetsForm(true);
  };

  const onCloseForm = () => {
    dispatch(getFinanceDetail(id));
    setViewAssetsForm(false);
  };

  const onRowClickHandler = (record) => {
    return {
      onClick: () => {
        onFormViewer(record);
      },
    };
  };
  return (
    <Row gutter={[24, 30]} align="bottom">
      {viewAssetsForm && tabVal ? (
        <Col span={24}>
          <Button
            type="link"
            htmlType="button"
            className="mb-1 p-0 c-gray-linkbtn"
            icon={<LeftOutlined />}
            onClick={onCloseForm}
          >
            Assets in Possession
          </Button>
          <AddAsset data={rowData} onUpdateComplete={onCloseForm} />
        </Col>
      ) : (
        <Col span={24}>
          <Row gutter={[20, 30]} justify="end">
            <Col span={24}>
              <ListCard
                title="Assets in Position"
                ListCol={assetsCol}
                ListData={assetData}
                classes="clickRow"
                listClass="nospace-card"
                pagination={false}
                onRow={onRowClickHandler}
                scrolling={500}
              />
            </Col>
            <Col>
              <Button size="large" type="primary" onClick={onFormViewer}>
                + Add New Asset
              </Button>
            </Col>
          </Row>
        </Col>
      )}
    </Row>
  );
};

export default AddEditAssets;
