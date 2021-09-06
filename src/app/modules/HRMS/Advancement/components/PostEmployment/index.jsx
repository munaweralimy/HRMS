import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Typography, Form } from 'antd';
import { useForm } from 'react-hook-form';
import { LeftOutlined } from '@ant-design/icons';
import ListCard from '../../../../../molecules/ListCard';
import { PopupSuccess } from '../../../../../atoms/Popup';
import ContractForm from '../../../Employment/components/EmployeeForm/tabList/Contract';
const popup = {
  closable: false,
  className: 'black-modal',
  title: 'Successfully Changed Position',
  width: 500,
};
const colName = [
  {
    title: 'Contract Type',
    dataIndex: 'contracttype',
    key: 'contracttype',
    sorted: (a, b) => a.contracttype - b.contracttype,
  },
  {
    title: 'Job Title',
    dataIndex: 'jobtitle',
    key: 'jobtitle',
    sorted: (a, b) => a.jobtitle - b.jobtitle,
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
    sorted: (a, b) => a.company - b.company,
    align: 'center',
    ellipsis: true,
  },
  {
    title: 'Start',
    dataIndex: 'from_date',
    key: 'from_date',
    sorted: (a, b) => a.from_date - b.from_date,
  },
  {
    title: 'End',
    dataIndex: 'to_date',
    key: 'to_date',
    sorted: (a, b) => a.to_date - b.to_date,
  },
];

const data = [
  {
    contracttype: 'Permanent',
    jobtitle: 'Graphic Designer',
    company: 'Centre for Content Creation Sdn. Bhd.',
    from_date: '15th February 2021',
    to_date: '15th Jan 2024',
  },
  {
    contracttype: 'Permanent',
    jobtitle: 'Graphic Designer',
    company: 'Centre for Content Creation Sdn. Bhd.',
    from_date: '15th February 2021',
    to_date: '15th Jan 2024',
  },
  {
    contracttype: 'Permanent',
    jobtitle: 'Graphic Designer',
    company: 'Centre for Content Creation Sdn. Bhd.',
    from_date: '15th February 2021',
    to_date: '15th Jan 2024',
  },
  {
    contracttype: 'Permanent',
    jobtitle: 'Graphic Designer',
    company: 'Centre for Content Creation Sdn. Bhd.',
    from_date: '15th February 2021',
    to_date: '15th Jan 2024',
  },
  {
    contracttype: 'Permanent',
    jobtitle: 'Graphic Designer',
    company: 'Centre for Content Creation Sdn. Bhd.',
    from_date: '15th February 2021',
    to_date: '15th Jan 2024',
  },
];
const eligibility_col = [
  {
    title: 'Job Title',
    dataIndex: 'jobtitle',
    key: 'jobtitle',
    sorted: (a, b) => a.jobtitle - b.jobtitle,
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
    sorted: (a, b) => a.company - b.company,
  },
  {
    title: 'Fit Index',
    dataIndex: 'fitindex',
    key: 'fitindex',
    sorted: (a, b) => a.fitindex - b.fitindex,
  },
];
const eligibility_data = [
  {
    jobtitle: 'Graphic Designer',
    company: 'Centre for Content Creation Sdn. Bhd',
    fitindex: '68%',
  },
  {
    jobtitle: 'Graphic Designer',
    company: 'Centre for Content Creation Sdn. Bhd',
    fitindex: '68%',
  },
  {
    jobtitle: 'Graphic Designer',
    company: 'Centre for Content Creation Sdn. Bhd',
    fitindex: '68%',
  },
];

const onChangePoistionHandler = () => {
  PopupSuccess(popup);
};

export default (props) => {
  const { Title } = Typography;
  const { control, errors, handleSubmit } = useForm();
  const [viewForm, setViewForm] = useState(false);
  const [id, setID] = useState();

  const onClickRow = (record) => {
    return {
      onClick: () => {
        console.log({ record });
        setViewForm(true);
      },
    };
  };

  const onViewFormHandler = () => {
    setViewForm(false);
  };

  return (
    <Row gutter={[24, 30]} align="bottom">
      {!viewForm ? (
        <>
          <Col span={24}>
            <Title level={4} className="mb-0">
              Employment History
            </Title>
          </Col>
          <Col span={24}>
            <ListCard ListCol={colName} ListData={data} onRow={onClickRow} blackCard="nospace-card" />
          </Col>
          <Col span={24}>
            <Title level={4} className="mb-0">
              Eligibility for Open Position
            </Title>
          </Col>
          <Col span={24}>
            <Row gutter={[20, 30]} justify="end">
              <Col span={24}>
                <ListCard ListCol={eligibility_col} ListData={eligibility_data} blackCard="black-nospace-card" />
              </Col>
              <Col>
                <Button size="large" type="primary" className="green-btn" onClick={onChangePoistionHandler}>
                  Change Position
                </Button>
              </Col>
            </Row>
          </Col>
        </>
      ) : (
        <>
          <Col span={24}>
            <Button type="link" className="mb-0 p-0 c-gray-linkbtn" icon={<LeftOutlined />} onClick={onViewFormHandler}>
              Employment History
            </Button>
          </Col>
          <Col span={24}>
            <Row gutter={[20, 30]} justify="end">
              <Col span={24}>
                <Form layout="vertical" scrollToFirstError={true}>
                  <ContractForm control={control} errors={errors} />
                </Form>
              </Col>
              <Col>
                <Button size="large" type="primary" className="red-btn">
                  Terminate Employee
                </Button>
              </Col>
              <Col>
                <Button size="large" type="primary" className="green-btn">
                  Save Changes
                </Button>
              </Col>
            </Row>
          </Col>
        </>
      )}
    </Row>
  );
};