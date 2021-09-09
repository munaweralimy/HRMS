import React, { useState } from 'react';
import { Row, Col, Button, Breadcrumb } from 'antd';
import { useForm } from 'react-hook-form';
import ListCard from '../../../../../molecules/ListCard';
import { closeAllOpenForms } from '../../ducks/action';
import { useSelector, useDispatch } from 'react-redux';
import { LeftOutlined } from '@ant-design/icons';
import SalaryInformation from '../../components/AccountSalaryForms/SalaryInformation';
import AddAccount from '../../components/AccountSalaryForms/AddAccount';
import AddAllowence from '../../components/AccountSalaryForms/AddAllowances';
const AddEditAccountSalary = (props) => {
  const { control, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const tabVal = useSelector((state) => state.finance.tabClose);
  const [viewSpecificForm, setViewSpecificForm] = useState({
    accountForm: false,
    allowanceForm: false,
  });
  const empEditRecords = [
    {
      heading: 'Account List',
      btnAcation: (
        <Button size="large" type="primary" onClick={() => onFormViewHandler('accountForm')}>
          + Add New Account
        </Button>
      ),

      empHistoryCol: [
        {
          title: 'Account No.',
          dataIndex: 'account_no',
          key: 'account_no',
          sorter: (a, b) => a.account_no.length - b.account_no.length,
        },
        {
          title: 'Account Type',
          dataIndex: 'account_type',
          key: 'account_type',
          sorter: (a, b) => a.account_type.length - b.account_type.length,
        },
        {
          title: 'Branch',
          dataIndex: 'account_branch',
          key: 'account_branch',
          sorter: (a, b) => a.account_branch.length - b.account_branch.length,
          ellipsis: true,
        },
      ],
    },
    {
      heading: 'Allowances List',
      btnAcation: (
        <Button size="large" type="primary" onClick={() => onFormViewHandler('allowanceForm')}>
          + Add New Allowence
        </Button>
      ),

      empHistoryCol: [
        {
          title: 'Date',
          dataIndex: 'allowance_date',
          key: 'allowance_date',
          sorter: (a, b) => a.allowance_date.length - b.allowance_date.length,
          render: (text, record) => moment(text).format('LL'),
        },
        {
          title: 'Allowance Type',
          dataIndex: 'allowance_type',
          key: 'allowance_type',
          sorter: (a, b) => a.allowance_type.length - b.allowance_type.length,
        },
        {
          title: 'Ammount',
          dataIndex: 'allowance_ammount',
          key: 'allowance_ammount',
          sorter: (a, b) => a.allowance_ammount.length - b.allowance_ammount.length,
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
          //sorter: (a, b) => a.term_start.length - b.term_start.length,
          // render: (text, record) => moment(text).format('LL'),
        },
      ],
    },
  ];
  function onFormViewHandler(form) {
    dispatch(closeAllOpenForms(true));
    let viewFormObj = {
      ...viewSpecificForm,
      accountForm: false,
      allowanceForm: false,
    };
    if (form.length > 0) {
      viewFormObj[form] = true;
    }

    setViewSpecificForm(viewFormObj);
  }
  return (
    <Row gutter={[24, 30]} align="bottom">
      {viewSpecificForm.accountForm && tabVal ? (
        <Col span={24}>
          <Button
            type="link"
            htmlType="button"
            className="mb-1 p-0 c-gray-linkbtn"
            icon={<LeftOutlined />}
            onClick={() => onFormViewHandler('')}
          >
            Account List
          </Button>
          <AddAccount />
        </Col>
      ) : viewSpecificForm.allowanceForm && tabVal ? (
        <Col span={24}>
          <Button
            type="link"
            htmlType="button"
            className="mb-1 p-0 c-gray-linkbtn"
            icon={<LeftOutlined />}
            onClick={() => onFormViewHandler('')}
          >
            Allowances List
          </Button>
          <AddAllowence />
        </Col>
      ) : (
        <>
          <Col span={24}>
            <Row gutter={[20, 30]} justify="end">
              <Col span={24}>
                <ListCard
                  listClass="nospace-card"
                  title={empEditRecords[0].heading}
                  ListCol={empEditRecords[0].empHistoryCol}
                  ListData={[]}
                  pagination={true}
                />
              </Col>
              <Col>{empEditRecords[0].btnAcation}</Col>
            </Row>
          </Col>
          <Col span={24}>
            <SalaryInformation />
          </Col>
          <Col span={24}>
            <Row gutter={[20, 30]} justify="end">
              <Col span={24}>
                <ListCard
                  listClass="nospace-card"
                  title={empEditRecords[1].heading}
                  ListCol={empEditRecords[1].empHistoryCol}
                  ListData={[]}
                  pagination={true}
                />
              </Col>
              <Col>{empEditRecords[1].btnAcation}</Col>
            </Row>
          </Col>
        </>
      )}
    </Row>
  );
};

export default AddEditAccountSalary;
