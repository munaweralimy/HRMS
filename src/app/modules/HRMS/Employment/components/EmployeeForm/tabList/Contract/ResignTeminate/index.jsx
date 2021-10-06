import React from 'react';
import {Row, Col} from 'antd';
import ListCard from '../../../../../../../../molecules/ListCard';
import moment from 'moment';

const colName = [
    {
      title: 'Contract Type',
      dataIndex: 'contract_type',
      key: 'contract_type',
      sorter: true,
    },
    {
      title: 'Job Title',
      dataIndex: 'job_title',
      key: 'job_title',
      sorter: true,
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      sorter: true,
    },
    {
      title: 'Last Date',
      dataIndex: 'last_date',
      key: 'start_date',
      sorter: true,
    },
    {
      title: 'Exit From',
      dataIndex: 'exit_date',
      key: 'exit_date',
      sorter: true,
      
    },
  ];

export default (props) => {

    const { data, updateApi, id, setLoad, setVisible, mode } = props;

    return (
      <Row gutter={[20,20]}>
        <Col span={24}>
          <ListCard
          scrolling={data?.term_Resign && data?.term_Resign.length > 0 ? 500 : '100%'}
          title="Termination & Resignation"
          ListCol={colName}
          ListData={data?.term_Resign}
          pagination={false}
          extraBtn={'Terminate Employee'}
          extraAction={() => console.log('---')}
          btnClass='red-btn'
          listClass="nospace-card"
          />
          </Col>
          </Row>
    )
}