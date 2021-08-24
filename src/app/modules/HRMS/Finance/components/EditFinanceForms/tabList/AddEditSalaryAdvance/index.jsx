import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Form, Breadcrumb } from 'antd';
import { useForm } from 'react-hook-form';
import ListCard from '../../../../../../../molecules/ListCard';
import { useSelector, useDispatch } from 'react-redux';
import { closeAllOpenForms } from '../../../../ducks/action';
import { LeftOutlined } from '@ant-design/icons';
import AddSalaryAdvance from './AddSalaryAdvance';
const salayAdvCol = [
  {
    title: 'Date Applied',
    dataIndex: 'date_applied',
    key: 'date_applied',
    sorter: (a, b) => a.date_applied.length - b.date_applied.length,
    render: (text, record) => moment(text).format('LL'),
  },
  {
    title: 'Deduction Date',
    dataIndex: 'deduction_date',
    key: 'deduction_date',
    sorter: (a, b) => a.deduction_date.length - b.deduction_date.length,
  },
  {
    title: 'Ammount',
    dataIndex: 'salary_ammount',
    key: 'salary_ammount',
    sorter: (a, b) => a.salary_ammount.length - b.salary_ammount.length,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    //sorter: (a, b) => a.term_start.length - b.term_start.length,
    // render: (text, record) => moment(text).format('LL'),
  },
];

const AddEditSalaryAdvance = () => {
  const { control, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [viewSalaryAdvanceForm, setviewSalaryAdvanceForm] = useState(false);
  const tabVal = useSelector((state) => state.finance.tabClose);

  const onFormViewer = () => {
    dispatch(closeAllOpenForms(true));
    setviewSalaryAdvanceForm(true);
  };

  return (
    <Row gutter={[24, 30]} align="bottom">
      {viewSalaryAdvanceForm && tabVal ? (
        <Col span={24}>
          <Button
            type="link"
            htmlType="button"
            className="mb-1 p-0 c-gray-linkbtn"
            icon={<LeftOutlined />}
            onClick={() => setviewSalaryAdvanceForm(false)}
          >
            Salary Advance List
          </Button>
          <AddSalaryAdvance />
        </Col>
      ) : (
        <Col span={24}>
          <Row gutter={[20, 30]} justify="end">
            <Col span="24">
              <ListCard
                listClass="nospace-card"
                title="Loan List"
                ListCol={salayAdvCol}
                ListData={[]}
                pagination={true}
              />
            </Col>
            <Col>
              <Button size="large" type="primary" onClick={onFormViewer}>
                + Add New Advance
              </Button>
            </Col>
          </Row>
        </Col>
      )}
    </Row>
  );
};

export default AddEditSalaryAdvance;
