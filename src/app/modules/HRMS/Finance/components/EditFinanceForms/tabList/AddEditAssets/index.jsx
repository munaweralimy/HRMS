import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Form, Breadcrumb } from 'antd';
import { useForm } from 'react-hook-form';
import ListCard from '../../../../../../../molecules/ListCard';
import { useSelector, useDispatch } from 'react-redux';
import { closeAllOpenForms } from '../../../../ducks/action';
const assetsCol = [
  {
    title: 'Asset No',
    dataIndex: 'asset_no',
    key: 'asset_no',
    sorter: (a, b) => a.asset_no.length - b.asset_no.length,
  },
  {
    title: 'Start',
    dataIndex: 'from_date',
    key: 'from_date',
    sorter: (a, b) => a.from_date.length - b.from_date.length,
  },
  {
    title: 'End',
    dataIndex: 'to_date',
    key: 'to_date',
    sorter: (a, b) => a.to_date.length - b.to_date.length,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    //sorter: (a, b) => a.term_start.length - b.term_start.length,
    // render: (text, record) => moment(text).format('LL'),
  },
];

const AddEditAssets = () => {
  const { control, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [viewAssetsForm, setViewAssetsForm] = useState(false);
  const tabVal = useSelector((state) => state.finance.tabClose);

  const onFormViewer = () => {
    dispatch(closeAllOpenForms(true));
    setViewAssetsForm(true);
  };

  return (
    <Row gutter={[24, 30]} align="bottom">
      {viewAssetsForm && tabVal ? (
        <Form layout="vertical" scrollToFirstError={true}>
          <Breadcrumb className="mb-1 c-gray">
            <Breadcrumb.Item onClick={() => setViewAssetsForm(false)}>{`< Assets in Possession`}</Breadcrumb.Item>
          </Breadcrumb>
          {/* render add assets form */}
        </Form>
      ) : (
        <Col span={24}>
          <ListCard title="Assets in Position" ListCol={assetsCol} ListData={[]} pagination={true} />
          <Row gutter={24} justify="end">
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
