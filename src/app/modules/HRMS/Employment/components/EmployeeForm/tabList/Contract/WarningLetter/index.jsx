import React, { useState } from 'react';
import { Row, Col, Form, message } from 'antd';
import ListCard from '../../../../../../../../molecules/ListCard';
import ListFormComp from '../../../../../../../../molecules/HRMS/ListFormComp';
import { useForm } from 'react-hook-form';
import { insuranceApi } from '../../../../../ducks/services';

const colName = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    sorter: true,
  },
  {
    title: 'Type',
    dataIndex: 'letter_type',
    key: 'letter_type',
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
              set1: false,
              set2: false,
              set3: false,
              set4: true,
          });
          setFormVisible(true);
        },
      };
    }
    
    const addNew = () => {
        setVisible({
            set1: false,
            set2: false,
            set3: false,
            set4: true,
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
                title="Warning Letter History"
                onRow={onClickRow}
                ListCol={colName}
                ListData={data?.employee_medical}
                pagination={false}
                extraBtn={'Issue Warning Letter'}
                extraAction={addNew}
                btnClass='red-btn'
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
                title={'Issue Warning Letter'}
                fieldsList={insuranceFields}
                backbtnTitle='Warning Letter History'
                btnMain={{
                    title: 'Delete',
                    class: 'red-btn'
                }}
                />
              </Form>
            </Col>}
        </Row>

    )
}