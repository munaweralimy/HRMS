import React from 'react';
import {Row, Col, Button } from 'antd';
import {SelectField} from '../../../../../atoms/FormElement';
import { useFieldArray } from 'react-hook-form';
import {CloseCircleFilled} from '@ant-design/icons';
import { useSelector} from 'react-redux';

const initQ = {
    field_name: '',
}

const options = [
    {
        label: 'Approval',
        value: 'Approval'
    },
    {
        label: 'Rejection',
        value: 'Rejection'
    }
]

export default (props) => {

    const { control, errors, setDeleted, deleted, t } = props;
    const fieldList = useSelector(state => state.forms.fieldsData);
        
    const { fields, append, remove } = useFieldArray({
        control,
        name: `form_fields`,
      });

    const onAdd = () => {
    append(initQ)
    }

    const onRemove = (e, index) => {
        if (e.doctype) {
            let delDept = []
            delDept= [...deleted];
            delDept.push(e.name);
            setDeleted(delDept);
        }
        remove(index)
    };

    return (
        <Row gutter={[20, 20]}>
            <Col span={24}>
                <Row gutter={[20,20]}>
            {fields.map((item,index) => (
                <Col span={24} key={item.id}>
                <Row gutter={20} wrap={false}>
                    <Col flex="auto">
                        <SelectField
                        fieldname={`form_fields[${index}.field_name`}
                        label=''
                        class='mb-0'
                        initValue={item.field_name ? {label: item.field_name, value: item.field_name, type: item.field_type} : ''}
                        control={control}
                        selectOption={fieldList?.map(e => ({label: e.name, value: e.name, type:e.type }))}
                        />
                    </Col>
                    <Col flex="40px">
                        <Button type='link' size="large" className='cross-iconbtn' htmlType='button' icon={<CloseCircleFilled />} onClick={() => onRemove(item, index)} />
                    </Col>
                </Row>
                </Col>
            ))}
            </Row>
            </Col>
            <Col span={24}>
                <Button htmlType='button'type="dashed" size='large' className='w-100' onClick={onAdd}>+ Add field</Button>
            </Col>
        </Row>
    )
}