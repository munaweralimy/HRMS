import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Form, Breadcrumb } from 'antd';
import { useForm } from 'react-hook-form';
import ListCard from '../../../../../../../molecules/ListCard';
import ContractForm from '../../../EmployeeForm/tabList/Contract';
import WarningLetter from '../WarningLetter';
const EditContract = () => {
  const { control, errors, handleSubmit } = useForm();
  const [viewContractForm, setViewContractForm] = useState(false);
  const [viewWarningSection, setViewWarningSection] = useState(false);

  const [viewSpecificForm, setViewSpecificForm] = useState({
    contract: false,
    warningLetter: false,
  });

  const onFormViewHandler = (form) => {
    console.log({ form });
    let viewFormObj = {
      ...viewSpecificForm,
      contract: false,
      warningLetter: false,
    };
    if (form.length > 0) {
      viewFormObj[form] = true;
    }

    setViewSpecificForm(viewFormObj);
  };

  const empEditRecords = [
    {
      heading: 'Employment History',
      btnAcation: (
        <Button size="large" type="primary" onClick={() => onFormViewHandler('contract')}>
          + Add New Contract
        </Button>
      ),

      empHistoryCol: [
        {
          title: 'Contract Type',
          dataIndex: 'faculcontract_typet',
          key: 'contract_type',
          sorter: (a, b) => a.faculty.length - b.faculty.length,
          ellipsis: true,
          render: (text, record) => (
            <Button type="link" className="list-links" onClick={() => onFormViewHandler('contract')}>
              {text}
            </Button>
          ),
        },
        {
          title: 'Job Title',
          dataIndex: 'job_title',
          key: 'job_title',
          sorter: (a, b) => a.faculty.length - b.faculty.length,
          ellipsis: true,
        },
        {
          title: 'Company',
          dataIndex: 'company',
          key: 'company',
          sorter: (a, b) => a.faculty.length - b.faculty.length,
          ellipsis: true,
        },
        {
          title: 'Start',
          dataIndex: 'start',
          key: 'start',
          sorter: (a, b) => a.term_start.length - b.term_start.length,
          // render: (text, record) => moment(text).format('LL'),
        },
        {
          title: 'End',
          dataIndex: 'end',
          key: 'end',
          sorter: (a, b) => a.term_start.length - b.term_start.length,
          // render: (text, record) => moment(text).format('LL'),
        },
      ],
    },
    {
      heading: 'Termination & Resignation',
      btnAcation: (
        <Button size="large" type="primary" className="w-100 red-btn">
          Terminate Employee
        </Button>
      ),

      empHistoryCol: [
        {
          title: 'Start',
          dataIndex: 'start',
          key: 'start',
          sorter: (a, b) => a.term_start.length - b.term_start.length,
          // render: (text, record) => moment(text).format('LL'),

          render: (text, record) => (
            <Button type="link" className="list-links" onClick={() => history.push(``)}>
              {text}
            </Button>
          ),
        },
        {
          title: 'Job Title',
          dataIndex: 'job_title',
          key: 'job_title',
          sorter: (a, b) => a.faculty.length - b.faculty.length,
          ellipsis: true,
        },
        {
          title: 'Company',
          dataIndex: 'company',
          key: 'company',
          sorter: (a, b) => a.faculty.length - b.faculty.length,
          ellipsis: true,
        },
        {
          title: 'Last Date',
          dataIndex: 'last_date',
          key: 'start',
          sorter: (a, b) => a.term_start.length - b.term_start.length,
          // render: (text, record) => moment(text).format('LL'),
        },
        {
          title: 'Exit Form',
          dataIndex: 'exit_form',
          key: 'exit_form',
          sorter: (a, b) => a.faculty.length - b.faculty.length,
        },
      ],
    },
    {
      heading: 'Show Cause Letter History',
      btnAcation: (
        <Button size="large" type="primary" className="w-100 red-btn">
          Request Show Cause
        </Button>
      ),

      empHistoryCol: [
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
          sorter: (a, b) => a.term_start.length - b.term_start.length,
          // render: (text, record) => moment(text).format('LL'),

          render: (text, record) => (
            <Button type="link" className="list-links" onClick={() => history.push(``)}>
              {text}
            </Button>
          ),
        },
        {
          title: 'Type',
          dataIndex: 'type',
          key: 'job_title',
          sorter: (a, b) => a.faculty.length - b.faculty.length,
        },
      ],
    },
    {
      heading: 'Warning Letter History',
      btnAcation: (
        <Button
          size="large"
          type="primary"
          className="w-100 red-btn"
          onClick={() => onFormViewHandler('warningLetter')}
        >
          Issue Warning Letter
        </Button>
      ),

      empHistoryCol: [
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
          sorter: (a, b) => a.term_start.length - b.term_start.length,
          // render: (text, record) => moment(text).format('LL'),

          render: (text, record) => (
            <Button type="link" className="list-links" onClick={() => history.push(``)}>
              {text}
            </Button>
          ),
        },
        {
          title: 'Type',
          dataIndex: 'type',
          key: 'job_title',
          sorter: (a, b) => a.faculty.length - b.faculty.length,
        },
      ],
    },
  ];

  return (
    <Row gutter={[24, 30]} align="bottom">
      {viewSpecificForm.contract === true ? (
        <Form layout="vertical" scrollToFirstError={true}>
          <Breadcrumb className="mb-1">
            <Breadcrumb.Item onClick={() => onFormViewHandler('')}>{`< Employment History`}</Breadcrumb.Item>
          </Breadcrumb>
          <ContractForm control={control} errors={errors} />
          <Row gutter={24} justify="end">
            <Col>
              <Button size="large" type="primary" htmlType="submit" className="green-btn save-btn">
                Save Changes
              </Button>
            </Col>
          </Row>
        </Form>
      ) : viewSpecificForm.warningLetter === true ? (
        <Col span={24}>
          <Breadcrumb className="mb-1">
            <Breadcrumb.Item onClick={() => onFormViewHandler('')}>{`< Warning Letter History`}</Breadcrumb.Item>
          </Breadcrumb>
          <WarningLetter />
        </Col>
      ) : (
        empEditRecords.map((value, index) => (
          <Col span={24} key={index}>
            <ListCard title={value.heading} ListCol={value.empHistoryCol} ListData={[]} pagination={true} />
            <Row gutter={24} justify="end">
              <Col>{value.btnAcation}</Col>
            </Row>
          </Col>
        ))
      )}
    </Row>
  );
};

export default EditContract;
