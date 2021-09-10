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
  const { accountData, allowanceData } = props;
  console.log({ accountData }, { allowanceData });
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
          sorter: true,
        },
        {
          title: 'Account Type',
          dataIndex: 'account_type',
          key: 'account_type',
          sorter: true,
        },
        {
          title: 'Branch',
          dataIndex: 'branch',
          key: 'branch',
          sorter: true,
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
          dataIndex: 'date_given',
          key: 'date_given',
          sorter: true,
          // render: (text, record) => moment(text).format('LL'),
        },
        {
          title: 'Allowance Type',
          dataIndex: 'allowance_type',
          key: 'allowance_type',
          sorter: true,
        },
        {
          title: 'Ammount',
          dataIndex: 'amount',
          key: 'amount',
          sorter: true,
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
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
                  ListData={accountData}
                  pagination={false}
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
                  ListData={allowanceData}
                  pagination={false}
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
