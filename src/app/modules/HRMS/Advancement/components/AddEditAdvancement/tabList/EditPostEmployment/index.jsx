import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import ListCard from '../../../../../../../molecules/ListCard';
import { PopupSuccess } from '../../../../../../../atoms/Popup';

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
const onClickRow = () => {};
const onChangePoistionHandler = () => {
  PopupSuccess(popup);
};
const EditPostEmployment = () => {
  const { Title } = Typography;
  return (
    <>
      <Row gutter={[24, 30]} align="bottom">
        <Col span={24}>
          <Title level={4} className="mb-0">
            Employment History
          </Title>
        </Col>
        <Col span={24}>
          <ListCard
            ListCol={colName}
            ListData={data}
            title="Job Openings"
            onRow={onClickRow}
            blackCard="nospace-card"
          />
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
      </Row>
    </>
  );
};

export default EditPostEmployment;
