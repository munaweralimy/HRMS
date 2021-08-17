import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Form, Breadcrumb } from 'antd';
import { useForm } from 'react-hook-form';
import ListCard from '../../../../../../../molecules/ListCard';
import { useSelector, useDispatch } from 'react-redux';
import { closeAllOpenForms } from '../../../../ducks/action';
const loanCol = [
  {
    title: 'Loan Date',
    dataIndex: 'loan_date',
    key: 'loan_date',
    sorter: (a, b) => a.loan_date.length - b.loan_date.length,
    render: (text, record) => moment(text).format('LL'),
  },
  {
    title: 'Type',
    dataIndex: 'loan_type',
    key: 'loan_type',
    sorter: (a, b) => a.loan_type.length - b.loan_type.length,
  },
  {
    title: 'Ammount',
    dataIndex: 'loan_ammount',
    key: 'loan_ammount',
    sorter: (a, b) => a.loan_ammount.length - b.loan_ammount.length,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    //sorter: (a, b) => a.term_start.length - b.term_start.length,
    // render: (text, record) => moment(text).format('LL'),
  },
];

const AddEditLoans = () => {
  const { control, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [viewLoanForm, setViewLoanForm] = useState(false);
  const tabVal = useSelector((state) => state.finance.tabClose);

  const onFormViewer = () => {
    dispatch(closeAllOpenForms(true));
    setViewLoanForm(true);
  };

  return (
    <Row gutter={[24, 30]} align="bottom">
      {viewLoanForm && tabVal ? (
        <Form layout="vertical" scrollToFirstError={true}>
          <Breadcrumb className="mb-1 c-gray">
            <Breadcrumb.Item onClick={() => setViewLoanForm(false)}>{`< Loan List`}</Breadcrumb.Item>
          </Breadcrumb>
          {/* render add loans form*/}
        </Form>
      ) : (
        <Col span={24}>
          <ListCard title="Loan List" ListCol={loanCol} ListData={[]} pagination={true} />
          <Row gutter={24} justify="end">
            <Col>
              <Button size="large" type="primary" onClick={onFormViewer}>
                + Add New Loan
              </Button>
            </Col>
          </Row>
        </Col>
      )}
    </Row>
  );
};

export default AddEditLoans;
