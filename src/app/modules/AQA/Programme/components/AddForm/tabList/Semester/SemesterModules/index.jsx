import React, {useEffect, useState} from 'react';
import {Row, Col, Button, Space, message } from 'antd';
import {InputField, SelectField } from '../../../../../../../../atoms/FormElement';
import { useFieldArray } from 'react-hook-form';
import {CloseCircleFilled} from '@ant-design/icons';
import { typeList } from '../../../../../../../../../configs/constantData';
import {useSelector} from 'react-redux';

const initQ = {
    module_code: '',
    module_name: '',
    credit: '',
    type: '',
    module_fees: '',
}

const options = [
    {
        label: 'High Rated',
        value: 1
    }
]

export default (props) => {

    const { control, getValues, aitem, pIndex, mode, t } = props;
    const moduleApi = useSelector(state => state.programme.module);
    const [selected, setSelected] = useState();

    const { fields, append, remove } = useFieldArray({
        control,
        name: `semester_structure[${pIndex}.semester`,
      });


      const onAdd = () => {
          let semesters = getValues().semester_structure
          let a = null;
          if (semesters[pIndex].semester) { 
           a = semesters[pIndex].semester.find(y => y.module_code == selected.module_code)
          }
          if (!a) {
              append(
                {
                    module_code: selected.module_code,
                    module_name: selected.module_name,
                    credit: selected.credit,
                    type: selected.type,
                    module_fees: selected.module_fees,
                }
              )
            } else {
                message.error('Already Added')
            }
      }

    return (
        <Row gutter={[20, 30]}>
            <Col span={24}>
                <Row gutter={20}>
                    <Col flex='auto'>
                <SelectField
                    class='mb-0 w-100'
                    fieldname='facultyselect'
                    label=''
                    control={control}
                    iProps={{placeholder: 'Type Program name'}}
                    selectOption={moduleApi?.map(e => ({
                        label: e.module_name, 
                        value: e.name,
                        module_code: e.module_code,
                        module_name: e.module_name,
                        type: e.type,
                        credit: e.credit,
                        module_fees: e.module_fee
                    }))}
                    onChange={(e) => setSelected(e)}
                />
                </Col>
                <Col flex='80px'>
                <Button type='primary' htmlType='button' size='large' className='green-btn' onClick={onAdd}>Add</Button>
                </Col>
                </Row>
            </Col>
            <Col span={24}>
                <Space className='w-100' direction='vertical' size={20}>
                    {fields.map((item,index) => (
                        <Row gutter={20} wrap={false}>
                            <Col flex="auto">
                            <Row gutter={20}>
                                    <InputField
                                    fieldname={`semester_structure[${pIndex}.semester[${index}.module_code`}
                                    class='d-none mb-0'
                                    label=''
                                    control={control}
                                    iProps={{ size: 'large', readOnly: true}}
                                    initValue={item.module_code}
                                    />
                                <Col span={8}>
                                    <InputField
                                    fieldname={`semester_structure[${pIndex}.semester[${index}.module_name`}
                                    class='mb-0'
                                    label=''
                                    control={control}
                                    iProps={{ size: 'large', readOnly: true}}
                                    initValue={item.module_name}
                                    />
                                </Col>
                                <Col span={6}>
                                    <InputField
                                    fieldname={`semester_structure[${pIndex}.semester[${index}.type`}
                                    label=''
                                    class='mb-0'
                                    initValue={item.type}
                                    control={control}
                                    iProps={{readOnly: true}}
                                    />
                                </Col>
                                <Col span={4}>
                                    <InputField
                                    fieldname={`semester_structure[${pIndex}.semester[${index}.credit`}
                                    class='mb-0'
                                    label=''
                                    control={control}
                                    iProps={{ readOnly: true, size: 'large'}}
                                    initValue={item.credit}
                                    />
                                </Col>
                                <Col span={6}>
                                    <InputField
                                    fieldname={`semester_structure[${pIndex}.semester[${index}.module_fees`}
                                    class='mb-0'
                                    label=''
                                    control={control}
                                    iProps={{ readOnly: true, size: 'large'}}
                                    initValue={item.module_fees}
                                    />
                                </Col>
                            </Row>
                            </Col>
                            <Col flex="40px">
                                <Button type='link' size="large" className='cross-iconbtn' htmlType='button' icon={<CloseCircleFilled />} onClick={() => remove(index)} />
                            </Col>
                        </Row>
                    ))}
                    </Space>
            </Col>
        </Row>
    )
}