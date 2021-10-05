import React, { useState, useEffect } from 'react';
import { Row, Col, Form, message } from 'antd';
import ListCard from '../../../../../../../../molecules/ListCard';
import ListFormComp from '../../../../../../../../molecules/HRMS/ListFormComp';
import { useForm } from 'react-hook-form';
import { sendWarning, delWarning } from '../../../../../ducks/services';
import { useDispatch, useSelector } from 'react-redux';
import { getWarnLetter } from '../../../../../ducks/action';
import moment from 'moment';

const colName = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: text => text ? moment(text).format('Do MMMM YYYY') : ''
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
];

export default (props) => {

    const { data, updateApi, id, setLoad, setVisible, mode, dTab } = props;
    const { control, errors, setValue, reset, handleSubmit } = useForm();
    const [formVisible, setFormVisible] = useState(false);
    const [recordData, setRecord] = useState(null);
    const dispatch = useDispatch();
    const letters = useSelector(state => state.employment.warnLetter);
    const [letterList, setLetterList] = useState([]);
    
    useEffect(() => {
      dispatch(getWarnLetter());
    }, []);

    useEffect(() => {
      if(dTab?.param) {
        addNew();
      }
    }, [dTab]);

    const insuranceFields = [
      {
        type: 'select',
        label: 'Warning Letter Type',
        name: 'warning_letter',
        twocol: false,
        options: letterList,
        req: true,
        reqmessage: 'Please enter type',
      },
    ]

    useEffect(() => {
      if (letters && letters.length) {
        let temp = [];
        letters.map(x => {
          temp.push({
            value: x.writing_letter_name,
            label: x.writing_letter_name,
          });
        })
        setLetterList(temp);
      }
    }, [letters]);


    const onClickRow = (record) => {

      return {
        onClick: () => {
          setRecord([
            {
              field: 'warning_letter',
              value: record.name
            },
            {
              field: 'warning_letter',
              value: record.type ? {label: record.type, value: record.type} : ''
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
      setLoad(true)
      const body = {
        employee_id: id,
        warning_letter: val.warning_letter.label
      }

      sendWarning(body).then(res => {
        message.success('Warning letter send');
        reset();
        
        setFormVisible(false);
        setVisible({
            set1: true,
            set2: true,
            set3: true,
            set4: true,
        });
        setLoad(false);
        updateApi();
      }).catch(e => {
        console.log(e);
        setLoad(false);
        const {response} = e;
        message.error(response);
      })
    }

    const onDelete = () => {
      setLoad(true)
      delWarning(recordData[0].value).then(res => {
        message.success('Warning letter deleted');
        reset();
        setFormVisible(false);
        setVisible({
            set1: true,
            set2: true,
            set3: true,
            set4: true,
        });
        setLoad(false);
        updateApi();
      }).catch(e => {
        console.log(e);
        setLoad(false);
        const {response} = e;
        message.error(response);
      })

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
                ListData={data?.warningLetter}
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
                mode={mode}
                title={'Issue Warning Letter'}
                fieldsList={insuranceFields}
                backbtnTitle='Warning Letter History'
                btnMain={{
                  title: 'Proceed',
                  class: 'red-btn',
                  nomain: recordData != null,
                }}
                extrabtn={{
                    title: 'Delete',
                    class: 'red-btn',
                    onAction: onDelete
                }}
                />
              </Form>
            </Col>}
        </Row>

    )
}