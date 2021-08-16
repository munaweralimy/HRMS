import React, { useEffect } from 'react';
import {Row, Col, Card, Typography, Tabs, Space, Button } from 'antd';
import {InputField, SelectField} from '../../../../../atoms/FormElement';
import { useDispatch, useSelector } from 'react-redux';
import { getProgrmList } from '../../../Faculty/ducks/actions';
import AttachProgram from '../../../../components/AttachProgram';
import {numberList, currencyList, typeList } from '../../../../../../configs/constantData';

const { TabPane } = Tabs;
const { Title } = Typography;

export default (props) => {

    const { control, errors, tags, setTags, mode, deleted, setDeleted, t } = props;
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getProgrmList());
    }, []);

    const prefixSelector = (
        <SelectField 
            noStyle={true}
            isRequired={true}
            fieldname='currency'
            label=''
            control={control}
            class='mb-0'
            initValue={currencyList[0]}
            selectOption={currencyList}
        />
      );
    

    return (
    <Card bordered={false} className="uni-card h-auto">
        
        <Row gutter={[30, 20]}>
            
            <Col span={24}>
                <Title level={4}>Module Details</Title>
            </Col>
            <Col span={24}>
                <Tabs defaultActiveKey="1" type="card" className='custom-tabs -space30'>
                    <TabPane tab="Summary" key="1">
                        <Row gutter={[20, 30]}>
                            <Col span={24}>
                                <InputField 
                                    isRequired={true}
                                    fieldname='name'
                                    label='Module Name'
                                    control={control}
                                    class='mb-0'
                                    iProps={{ placeholder: 'Please state', size: 'large'}}
                                    rules={{
                                        required: 'Module Name Required',
                                        }}
                                    initValue=''
                                    validate={errors.name && 'error'}
                                    validMessage={errors.name && errors.name.message}
                                />
                            </Col>
                            <Col span={24}>
                                <InputField 
                                    isRequired={true}
                                    fieldname='code'
                                    label='Module Code'
                                    control={control}
                                    class='mb-0'
                                    iProps={{ placeholder: 'Please state', size: 'large'}}
                                    rules={{required: 'Enter Module Code'}}
                                    initValue=''
                                    validate={errors.code && 'error'}
                                    validMessage={errors.code && errors.code.message}
                                />
                            </Col>
                            <Col span={24}>
                                <SelectField 
                                    isRequired={true}
                                    fieldname='type'
                                    label='Type'
                                    control={control}
                                    class='mb-0'
                                    iProps={{ placeholder: 'Please select'}}
                                    rules={{required: 'Enter Type'}}
                                    initValue=''
                                    selectOption={typeList}
                                    validate={errors.type && 'error'}
                                    validMessage={errors.type && errors.type.message}
                                />
                            </Col>
                            <Col span={12}>
                                <SelectField 
                                    isRequired={true}
                                    fieldname='credit'
                                    label='Credit'
                                    control={control}
                                    class='mb-0'
                                    iProps={{ placeholder: 'Please select'}}
                                    rules={{required: 'Enter Type'}}
                                    initValue=''
                                    selectOption={numberList}
                                    validate={errors.credit && 'error'}
                                    validMessage={errors.credit && errors.credit.message}
                                />
                            </Col>
                            <Col span={12}>
                                <SelectField 
                                    isRequired={true}
                                    fieldname='hours'
                                    label='Hours'
                                    control={control}
                                    class='mb-0'
                                    iProps={{ placeholder: 'Please select'}}
                                    rules={{required: 'Enter Type'}}
                                    initValue=''
                                    selectOption={numberList}
                                    validate={errors.hours && 'error'}
                                    validMessage={errors.hours && errors.hours.message}
                                />
                            </Col>
                            <Col span={24}>
                                
                                <InputField 
                                    isRequired={true}
                                    fieldname='fee'
                                    label='Module Fee'
                                    control={control}
                                    class='mb-0 inputGroupWithClose'
                                    iProps={{ placeholder: 'Please state', size: 'large', type: 'number', addonBefore: prefixSelector}}
                                    rules={{
                                        required: 'Module Fee Required',
                                        }}
                                    initValue=''
                                    validate={errors.fee && 'error'}
                                    validMessage={errors.fee && errors.fee.message}
                                />
                            </Col>
                            
                        
                        </Row>
                    </TabPane>  
                    <TabPane tab="Programmes" key="2">
                        <Row gutter={20}>
                            <Col span={24}>
                                <AttachProgram deleted={deleted} setDeleted={setDeleted} tags={tags} setTags={setTags} />
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
            </Col>
            {mode == 'edit' &&
                <Col span={24}>
                    <Row gutter={20} justify='end'>
                        <Col>
                            <Button size='large' type='primary' htmlType='submit' className='green-btn'>Save Changes</Button>
                        </Col>
                    </Row>
                </Col>
            }
        </Row>
    </Card>
    )
    
}