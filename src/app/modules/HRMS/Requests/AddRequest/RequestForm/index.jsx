import React, { useEffect, useState } from 'react';
import {Row, Col, Card, Typography, Space, Button, Collapse, Divider } from 'antd';
import { DateField, InputField, SelectField } from '../../../../../atoms/FormElement';
import { useDispatch, useSelector } from 'react-redux';
import SmallStatusCard from '../../../../../atoms/SmallStatusCard';
import { UpOutlined } from '@ant-design/icons';
import { WarningIcon } from '../../../../../atoms/CustomIcons';
import { useHistory } from 'react-router-dom';
import { getFormFields } from '../../ducks/actions';
import { Fragment } from 'react';

const { Title, Text } = Typography;
const { Panel } = Collapse;

export default (props) => {

    const history = useHistory();
    const dispatch = useDispatch();
    const formList = useSelector(state => state.hrmsrequests.formList)
    const [forming, setForming] = useState([]);
    const { title, control, errors, Department } = props;
    const user = localStorage.getItem('user');

    useEffect(() => {
        dispatch(getFormFields());
    }, []);

    const onChangeForm = (e) => {
        if(e.fields) {
            setForming(e.fields);
        }
    }

    const panelHeader = () => {
        return <Space size={30}>
          <SmallStatusCard
            status={'Incomplete'}
            icon={<WarningIcon className='fontSize20' />}
            iColor={'b-error'}
          />
          <Space direction='vertical' size={5}>
            <Text className="smallFont12 c-white op-6">Reciever</Text>
            <Title level={5} className='c-gray lineHeight20 mb-0'>Please select request form below</Title>
          </Space>
        </Space>
    }
   
    const panelRight = (isActive) => {
      return <div>
      <Space size={4}>
        <Title level={5} className='defaultFont mb-0'>{isActive ? 'Hide' : 'View Details'} </Title>
        <UpOutlined rotate={isActive ? 0 : 180}/>
      </Space>
      </div>
    }
    
    return (
    <Card bordered={false} className="uni-card h-auto">
        <Row gutter={[30, 20]}>
            <Col span={24}>
                <Title level={4} className='mb-0'>{title}</Title>
            </Col>
            <Col span={24}>
            <Collapse accordion className='reqPanel' bordered={false} defaultActiveKey={'1'} 
            expandIcon={({isActive}) => panelRight(isActive)}
            expandIconPosition='right'>
                <Panel className='ch-black mt-0' header={panelHeader()} key={'1'} forceRender={true}>
                    <SelectField 
                    isRequired={true}
                    fieldname={'formName'}
                    label={'Request Form'}
                    class='labeldefaultFont'
                    control={control}
                    onChange={onChangeForm}
                    rules={{required: 'Please Select Form'}}
                    selectOption={formList?.map(e => ({label: e.form_name, value: e.name, fields: e.form_field}))}
                    initValue={''}
                    validate={errors.formName && 'error'}
                    validMessage={errors.formName && errors.formName.message}
                    />
                    {forming.map((item,index) => (
                        <Fragment key={index}>
                        {item.field_type == 'Date' ?
                            <DateField 
                            isRequired={true}
                            fieldname={item.field_name}
                            label={item.field_name}
                            class='labeldefaultFont'
                            control={control}
                            iProps={{placeholder: 'Select Request Form'}}
                            rules={{required: 'Please state'}}
                            initValue={''}
                            validate={errors[item.field_name] && 'error'}
                            />
                        :
                            <InputField 
                            isRequired={true}
                            fieldname={item.field_name}
                            label={item.field_name}
                            class='labeldefaultFont'
                            control={control}
                            iProps={{placeholder: 'Please state',
                            readOnly: item.field_name == 'Department' ? true
                            : item.field_name == 'Requester' ? user : false
                            }}
                            rules={{required: 'Please state'}}
                            initValue={
                                item.field_name == 'Department' ? Department?.department
                                : item.field_name == 'Requester' ? user : ''
                            }
                            validate={errors[item.field_name] && 'error'}
                            />
                        }
                        </Fragment>
                    ))}
                </Panel>
            </Collapse>
            </Col>
            <Col span={24}>
                <Row gutter={[20, 20]} justify='end'>
                    <Col span={9}>
                        <Button size='large' type='primary' htmlType='button' className='w-100 black-btn' onClick={() => history.push(`${Department.link}/requests`)}>Cancel</Button>
                    </Col>
                    <Col span={9}>
                        <Button size='large' type='primary' htmlType='submit' className='w-100 green-btn'>Save Changes</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Card>
    )
    
}