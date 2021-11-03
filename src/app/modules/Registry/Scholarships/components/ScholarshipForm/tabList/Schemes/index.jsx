import React, {Fragment, useState, useEffect} from 'react';
import {Row, Col, Typography, Collapse, Button } from 'antd';
import { useSelector } from 'react-redux';
import { useFieldArray } from 'react-hook-form';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { InputField, SelectField } from '../../../../../../../atoms/FormElement';
import { currencyList } from '../../../../../../../../configs/constantData';
import { getScholarshipTypeDrop } from '../../../../ducks/actions';
import { useDispatch } from 'react-redux';

const { Panel } = Collapse;
const {Title} = Typography;
const _ = require("lodash");

const initQ = {
    structure_name:'Scheme',
    name:'',
    scheme_name: '',
    scholarship_type: '',
    food_allowances: '',
    study_allowances: '',
    transport_allowances: ''
}

export default (props) => {
    const [iconPos, setIconPos] = useState(false);
    const dispatch = useDispatch();
    const { control, errors, setValue, setDeleted, t } = props;
    const [panelActive, setPanelActive] = useState(["1"]);
    const scholarshipDrop = useSelector(state => state.scholarship.scholarshipDropList);
    
    const { fields, append, remove } = useFieldArray({
        control,
        name: "schemes_structure",
      });
      {console.log('fields----------', fields)}
      

    //   useEffect(() => {
    //       append(initQ);
    //   }, []);

    useEffect(() => {
        dispatch(getScholarshipTypeDrop())
    }, []);

    const callback = (key) => {
        setPanelActive(key);
    };

    const onRemove = (e, index) => {
        if (e.doctype) {
            let delDept = []
            delDept= [...deleted];
            delDept.push(e.name);
            setDeleted(delDept);
        }
        remove(index)
    };

    const semesterHeader = (heading, item, index) => (
        <Row gutter={20} onClick={() => setIconPos(!iconPos)}>
              <Col flex="auto">{heading +' '+ (index+1)}</Col>
              <Col flex="100px"><Button type="link" onClick={() => onRemove(item, index)}>Remove</Button></Col>
              <Col flex="100px"><Button type="link">{iconPos ? 'Hide' : 'Show'}</Button></Col>
          </Row>
    )

    const onAdd = () => {
        append(initQ)
        let leng = `${fields.length + 1}`;
        setPanelActive([leng]);
      }

    return (
        
        <Row gutter={[20, 30]} align='bottom'>
            <Col span={24}>
                <Collapse activeKey={panelActive} accordion={true} onChange={callback} className='black-card' expandIconPosition='right' bordered={false}>
                    {console.log('fields', fields)}
                    {fields?.map((item,index) => ( 
                    <Fragment key={item.id}>
                        {console.log('schemes_structure', item.scholarship_type)}
                        <Panel forceRender={true} header={semesterHeader(item.structure_name,item,index)}>
                            <Row gutter={[20,30]} align='bottom'>
                                <InputField 
                                    fieldname={`schemes_structure[${index}].name`}
                                    label=''
                                    control={control}
                                    class='d-none mb-0'
                                    initValue={item?.name}
                                    iProps={{ size: 'large'}}
                                />
                                <Col span={24}>
                                    <InputField
                                        fieldname={`schemes_structure[${index}].scheme_name`}
                                        label='Scheme Name'
                                        control={control}
                                        class='mb-0'
                                        initValue={item?.scheme_name}
                                        iProps={{ placeholder: 'Please state', size: 'large'}}
                                    />
                                </Col>
                                <Col span={24}>
                                    <SelectField
                                        fieldname={`schemes_structure[${index}].scholarship_type`}
                                        label='Scholarship Type'
                                        control={control}
                                        class='mb-0'
                                        iProps={{ placeholder: 'Select one'}}
                                        initValue={item?.scholarship_type ? { label: item?.scholarship_type, value: item?.scholarship_type } : ""}
                                        selectOption={_.map(scholarshipDrop, e => ({label: e.name, value: e.name}))}
                                    />
                                </Col>
                                <Col span={24}>
                                    <InputField 
                                        fieldname={`schemes_structure[${index}].food_allowances`}
                                        label='Food Allowance'
                                        control={control}
                                        class='mb-0 inputGroupWithClose'
                                        initValue={item.food_allowances || 0}
                                        iProps={{ placeholder: 'Please state', size: 'large', type: 'number', 
                                        addonBefore: <SelectField 
                                            noStyle={true}
                                            fieldname={`schemes_structure[${index}].currency`}
                                            label=''
                                            control={control}
                                            class='mb-0'
                                            initValue={item.currency ? { label: item.currency, value: item.currency } : ""}
                                            selectOption={currencyList}
                                        />}}
                                    />
                                </Col>
                                <Col span={24}>
                                    <InputField 
                                        fieldname={`schemes_structure[${index}].study_allowances`}
                                        label='Study Allowance'
                                        control={control}
                                        class='mb-0 inputGroupWithClose'
                                        initValue={item.study_allowances || 0}
                                        iProps={{ placeholder: 'Please state', size: 'large', type: 'number', 
                                        addonBefore: <SelectField 
                                            noStyle={true}
                                            fieldname={`schemes_structure[${index}].currency`}
                                            label=''
                                            control={control}
                                            class='mb-0'
                                            initValue={item.currency ? { label: item.currency, value: item.currency } : ""}
                                            selectOption={currencyList}
                                        />}}
                                    />
                                </Col>
                                <Col span={24}>
                                    <InputField 
                                        fieldname={`schemes_structure[${index}].transport_allowances`}
                                        label='Transport Allowance'
                                        control={control}
                                        class='mb-0 inputGroupWithClose'
                                        initValue={item.transport_allowances || 0}
                                        iProps={{ placeholder: 'Please state', size: 'large', type: 'number', 
                                        addonBefore: <SelectField 
                                            noStyle={true}
                                            fieldname={`schemes_structure[${index}].currency`}
                                            label=''
                                            control={control}
                                            class='mb-0'
                                            initValue={item.currency ? { label: item.currency, value: item.currency } : ""}
                                            selectOption={currencyList}
                                        />}}
                                    />
                                </Col>
                            </Row>
                        </Panel>
                    </Fragment>
                    ))}
                </Collapse>
            </Col>
            <Col span={24}>
                <Button htmlType='button'type="dashed" size='large' className='w-100' onClick={onAdd}>+ Add other semester</Button>
            </Col>
        </Row>
    )
}