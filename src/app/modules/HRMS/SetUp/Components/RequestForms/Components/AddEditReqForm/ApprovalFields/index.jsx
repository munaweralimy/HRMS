import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { SelectField } from '../../../../../../../../atoms/FormElement';
import { useSelector } from 'react-redux';


const approveList = [
    { label: 'Individual', value: 'Individual' },
    { label: 'Manager', value: 'Manager' },
    { label: 'Team Leader', value: 'Team Leader' },
    { label: 'Supervisor', value: 'Supervisor' },
    { label: 'Job Position', value: 'Job Position' },
]

export default (props) => {

    const [detailList, setDetailList] = useState([]);
    const [visible, setVisible] = useState(false);
    const { control, errors, item, index } = props;
    const position = useSelector(state =>  state.global.roles)


    const onChange = (e) => {
        if (e.label == 'Job Position') {
            setVisible(true);
            setDetailList(position.map(x => ({label: x.name, value: x.name})));
            console.log('chek', position)
        } else if(e.label == 'Individual') {
            setVisible(true);
        }
    }

    return (
        <Row gutter={[10,10]}>
            <Col span={24}>
                <SelectField
                  fieldname={`approvers_fields[${index}].approvers`}
                  label={'Approvers'}
                  control={control}
                  class={`mb-0`}
                  onChange={onChange}
                  iProps={{ placeholder: 'Please select' }}
                  initValue={item?.approvers}
                  selectOption={approveList}
                  />
            </Col>
            <Col span={24}>
                <SelectField
                  fieldname={`approvers_fields[${index}].approvers_detail`}
                  label={''}
                  control={control}
                  class={`mb-0 ${!visible ? 'd-none' : ''}`}
                  iProps={{ placeholder: 'Please select' }}
                  initValue={item?.approvers_detail ? { label: item?.approvers_detail, value: item?.approvers_detail } : ''}
                  selectOption={detailList}
                />
            </Col>
        </Row>
    )
}