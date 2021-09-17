import React, { useState } from 'react';
import { Row, Col, Form, message } from 'antd';
import ListCard from '../../../../../../../../molecules/ListCard';
import ListFormComp from '../../../../../../../../molecules/HRMS/ListFormComp';
import { useForm } from 'react-hook-form';
import { insuranceApi } from '../../../../../ducks/services';

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
    title: 'Start',
    dataIndex: 'start_date',
    key: 'start_date',
    sorter: true,
  },
  {
    title: 'End',
    dataIndex: 'end_date',
    key: 'end_date',
    sorter: true,
  },
];

const instype = [
  {label: 'Waiting for Unauthorized Use of Company Asset', value: 'Waiting for Unauthorized Use of Company Asset'},
  {label: 'Illegal Access', value: 'Illegal Access'},
  {label: 'Late Coming', value: 'Late Coming'},
]

const insuranceFields = [
    {
      type: 'select',
      label: 'letter_type',
      name: 'letter_type',
      twocol: false,
      options: instype,
      req: true,
      reqmessage: 'Please enter type',
    },
  ]

  const initq = {
    warning_letter: '',
  }

export default (props) => {

    const { data, updateApi, id, setLoad, setVisible } = props;
    const { control, errors, setValue, reset, handleSubmit } = useForm({ defaultValues: initq});
    const [formVisible, setFormVisible] = useState(false);
    const [recordData, setRecord] = useState(null);

    const onClickRow = (record) => {

      return {
        onClick: () => {
          
          setRecord([
            {
              field: 'name',
              value: record.name
            },
            {
              field: 'letter_type',
              value: record.letter_type ? {label: record.letter_type, value: record.letter_type} : ''
            },
          ]);
          setVisible({
              set1: true,
              set2: false,
              set3: false,
              set4: false,
          });
          setFormVisible(true);
        },
      };
    }
    
    const addNew = () => {
        setVisible({
            set1: true,
            set2: false,
            set3: false,
            set4: false,
        });
      setFormVisible(true);
    }

    const onBack = () => {
        reset();
        setFormVisible(false);
        setRecord(null)
        setVisible({
            set1: true,
            set2: true,
            set3: true,
            set4: true,
        });
    }

    const onFinish = async (val) => {
      
    }

    return (
        <Row gutter={[20,20]}>
          {!formVisible ? 
            <Col span={24}>
                <ListCard
                scrolling={500}
                title="Employment History"
                onRow={onClickRow}
                ListCol={colName}
                ListData={data?.employee_medical}
                pagination={false}
                extraBtn={'+ Add New Contract'}
                extraAction={addNew}
                scrolling={500}
                listClass="nospace-card"
                classes='clickRow'
                />
            </Col>
            :
            <Col span={24}>
              <Form layout='vertical' onFinish={handleSubmit(onFinish)}>
                <ListFormComp 
                control={control}
                errors={errors}
                record={recordData}
                onBack={onBack}
                setValue={setValue}
                title={'Employment Contract'}
                fieldsList={insuranceFields}
                backbtnTitle='Employment History'
                />
              </Form>
            </Col>}
        </Row>

    )
}