import React from 'react';
import {Row, Col } from 'antd';
import {InputField, DateField, SelectField, TextAreaField } from '../../../../../../../atoms/FormElement';
import { useSelector } from 'react-redux';

const studyDuration = [
    {
        label: '1 Year',
        value: '1 Year',
    },
    {
        label: '2 Years',
        value: '2 Years',
    },
    {
        label: '3 Years',
        value: '3 Years',
    },
    {
        label: '4 Years',
        value: '4 Years',
    },
]

const studyLevel = [
    {
        label: 'Short Course',
        value: 'Short Course',
    },
    {
        label: 'Diploma',
        value: 'Diploma',
    },
    {
        label: 'Degree',
        value: 'Degree',
    }
]


export default (props) => {

    const { control, errors, t } = props;
    const facultyApi = useSelector(state => state.faculty.facultyList);

    return (
        
        <Row gutter={[20, 30]}>
            <Col span={24}>
                <InputField 
                    fieldname='program_name'
                    label='Program Name'
                    control={control}
                    class='mb-0'
                    iProps={{ placeholder: 'Please state', size: 'large'}}
                    initValue=''
                    rules={{ required: 'Name required' }}
                    validate={errors.program_name && 'error'}
                    validMessage={errors.program_name && errors.program_name.message}
                />
            </Col>
            <Col span={24}>
                <InputField 
                    fieldname='program_code'
                    label='Program Code'
                    control={control}
                    class='mb-0'
                    iProps={{ placeholder: 'Please state', size: 'large'}}
                    initValue=''
                    rules={{ required: 'Code required' }}
                    validate={errors.program_code && 'error'}
                    validMessage={errors.program_code && errors.program_code.message}
                />
            </Col>
            <Col span={24}>
                <SelectField
                fieldname='faculty'
                label='Faculty'
                class='mb-0 w-100'
                initValue=''
                control={control}
                iProps={{ placeholder: 'Select one'}}
                selectOption={facultyApi?.map(e => ({value: e.faculty_code, label:  e.faculty_name}))}
                // rules={{ required: 'Select one' }}
                // validate={errors.faculty && 'error'}
                // validMessage={errors.faculty && errors.faculty.message}
                />
            </Col>

            <Col span={12}>
                <DateField 
                    fieldname='effective_date'
                    label='Effective Date'
                    control={control}
                    class='mb-0'
                    iProps={{ placeholder: 'Please state', size: 'large'}}
                    initValue=''
                    // rules={{ required: 'Date required' }}
                    // validate={errors.effective_date && 'error'}
                    // validMessage={errors.effective_date && errors.effective_date.message}
                />
            </Col>
            <Col span={12}>
                <DateField 
                    fieldname='ineffective_date'
                    label='Ineffective Date'
                    control={control}
                    class='mb-0'
                    iProps={{ placeholder: 'Please state', size: 'large'}}
                    initValue=''
                    // rules={{ required: 'Date required' }}
                    // validate={errors.ineffective_date && 'error'}
                    // validMessage={errors.ineffective_date && errors.ineffective_date.message}
                />
            </Col>
            <Col span={12}>
                <SelectField
                fieldname='study_duration'
                label='Study Duration'
                class='mb-0 w-100'
                initValue=''
                control={control}
                iProps={{ placeholder: 'Select one'}}
                selectOption={studyDuration}
                // rules={{ required: 'Select one' }}
                // validate={errors.study_duration && 'error'}
                // validMessage={errors.study_duration && errors.study_duration.message}
                />
            </Col>
            <Col span={12}>
                <SelectField
                fieldname='study_level'
                label='Study Level'
                class='mb-0 w-100'
                initValue=''
                control={control}
                iProps={{ placeholder: 'Select one'}}
                selectOption={studyLevel}
                // rules={{ required: 'Select one' }}
                // validate={errors.study_level && 'error'}
                // validMessage={errors.study_level && errors.study_level.message}
                />
            </Col>
            <Col span={24}>
                <TextAreaField
                fieldname='course_synopsis'
                label='Course Synopsis'
                control={control}
                class='mb-0'
                iProps={{ placeholder: 'Please state', size: 'large'}}
                initValue=''
                />
            </Col>
        </Row>
    )
}