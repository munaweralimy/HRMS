import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Button, Form, Spin, Typography, Card, message } from 'antd';
import { useForm } from 'react-hook-form';
import { LoadingOutlined } from '@ant-design/icons';
import Base64Downloader from 'common-base64-downloader-react';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { DateField, InputField, SelectField } from '../../../../../atoms/FormElement';
import { downloadEmployee } from '../../ducks/services';
import moment from 'moment';

const { Title } = Typography;
const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const { control, errors, handleSubmit } = useForm()
  const [load, setLoad] = useState(false);
  const [pdfDownload, setPdfDownload] = useState();
  const [pdfName, setPdfName] = useState();
  const onSubmit = (val) => {
    setLoad(true);
    const payload = {
      formatting: val.reportFormat.value,
      filters: {
        employee_id: val.id,
        employee_name: val.name,
        team_name: "",
        contract_type: val.contractType.value,
        start_date: val.startDate ? moment(val.startDate).format('YYYY-MM-DD') : '',
        end_date: val.endDate ? moment(val.endDate).format('YYYY-MM-DD') : '',
      }
    }

    downloadEmployee(payload)
      .then((response) => {
        setLoad(false);
        setPdfDownload(response.data.filecontent)
        setPdfName(response.data.filename)
      })
      .catch((error) => {
        setLoad(false);
        message.error('Something went wrong');
      })
  }

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Card bordered={false} className="uni-card">
        <Form onFinish={handleSubmit(onSubmit)} layout="vertical" className='w-100'>
          <Row gutter={[30, 30]}>
            <Col span={24}>
              <HeadingChip title="Download Employment Reports" />
            </Col>

            <Col span={8}>
              <InputField
                //isRequired={true}
                fieldname='id'
                label='Staff ID'
                control={control}
                class='mb-0'
                iProps={{ placeholder: 'Please state', size: 'large' }}
                //rules={{ required: 'Enter Staff ID' }}
                initValue=''
              //validate={errors.id && 'error'}
              //validMessage={errors.id && errors.id.message}
              />
            </Col>

            <Col span={8}>
              <InputField
                //isRequired={true}
                fieldname='name'
                label='Staff Name'
                control={control}
                class='mb-0'
                iProps={{ placeholder: 'Please state', size: 'large' }}
                //rules={{ required: 'Enter Staff Name' }}
                initValue=''
              //validate={errors.name && 'error'}
              //validMessage={errors.name && errors.name.message}
              />
            </Col>

            <Col span={8}>
              <SelectField
                //isRequired={true}
                fieldname='team'
                label='Select Team'
                control={control}
                class='mb-0'
                iProps={{ placeholder: 'Please select' }}
                //rules={{ required: 'Select Team' }}
                initValue=''
                selectOption={[{ label: 'team1', value: 'team1' }]}
              //validate={errors.team && 'error'}
              //validMessage={errors.team && errors.team.message}
              />
            </Col>

            <Col span={8}>
              <SelectField
                //isRequired={true}
                fieldname='contractType'
                label='Contract Type'
                control={control}
                class='mb-0'
                iProps={{ placeholder: 'Please select' }}
                //rules={{ required: 'Select Team' }}
                initValue=''
                selectOption={[
                  { label: 'All', value: 'all' },
                  { label: 'Permanent', value: 'Permanent' },
                  { label: 'Contract', value: 'Contract' },
                  { label: 'Probation', value: 'Probation' }
                ]}
              // validate={errors.contractType && 'error'}
              // validMessage={errors.contractType && errors.contractType.message}
              />
            </Col>

            <Col span={8}>
              <DateField
                fieldname='startDate'
                label='Select Start Date'
                control={control}
                class='mb-0'
                iProps={{ placeholder: 'Please Select date', size: 'large', format: "DD-MM-YYYY" }}
                initValue=''
              />
            </Col>

            <Col span={8}>
              <DateField
                fieldname='endDate'
                label='Select End Date'
                control={control}
                class='mb-0'
                iProps={{ placeholder: 'Please Select date', size: 'large', format: "DD-MM-YYYY" }}
                initValue=''
              />
            </Col>

            <Col span={8}>
              <SelectField
                isRequired={true}
                fieldname='reportFormat'
                label='Select Report Format'
                control={control}
                class='mb-0'
                iProps={{ placeholder: 'Please select' }}
                rules={{ required: 'Select Team' }}
                initValue=''
                selectOption={[
                  { label: 'PDF', value: 'pdf' },
                  { label: 'Excel', value: 'excel' }
                ]}
                validate={errors.reportFormat && 'error'}
                validMessage={errors.reportFormat && errors.reportFormat.message}
              />
            </Col>

            <Col span={24}>
              <Row justify='center' gutter={[30, 30]}>
                <Col span={8}>
                  <Button size='large' type='primary' htmlType='submit' className='w-100'>Search</Button>
                </Col>
                {pdfDownload && (
                  <Col span={8}>
                    <Base64Downloader base64={pdfDownload} downloadName={pdfName} className="ant-btn ant-btn-primary ant-btn-lg w-100">
                      Click to download
                    </Base64Downloader>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        </Form>
      </Card>
    </Spin>
  );
};
