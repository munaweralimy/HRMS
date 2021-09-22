import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Form, Space, Button, Image, Layout, message, Breadcrumb } from 'antd';
import { useTranslate } from 'Translate';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PlaceHolderImage from '../../../../../assets/img/scholarship-icon.svg';
import HeadingChip from '../../../../molecules/HeadingChip';
import { useForm } from 'react-hook-form';
import EmployeeForm from '../components/EmployeeForm';
import { addEmployer, addContract } from '../ducks/services';
import moment from 'moment';
import { getSingleUpload, uniquiFileName } from '../../../../../features/utility';

const AddEmployment = () => {
  const { control, errors, getValues, setValue, handleSubmit, reset } = useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const i18n = useTranslate();
  const { t } = i18n;
  const { Text } = Typography;

  const uploadFiles = async (fileName, code) => {
    let modifiedName = uniquiFileName(fileName.name);
    let res = await getSingleUpload(modifiedName, 'image', fileName, 'Employee', code);
    return res.file_url;
  };

  const finalUpload = async (values, code) => {
    console.log({ code });
    let {
      current_address,
      current_state,
      current_post_code,
      current_country,
      current_city,
      same_address,
      permanent_address_1,
      permanent_state,
      permanent_post_code,
      permanent_country,
      permanent_city,
      insurance_type,
      expiration_date,
      insurance_no,
      upload_document,
      descritpion,
      contract_type,
      employment_type,
      start_date,
      end_date,
      endorser,
      staff_category,
      company,
      job_title,
      position_level,
      supervisor,
      contract_attachment,
      work_hour_template,
      program_requirements,
      employee_role,
      ...removeFirstFileds
    } = values;
    let updatePayload = {
      ...removeFirstFileds,
      salutation: values.salutation.label,
      image: await uploadFiles(values.image?.file?.originFileObj, code),
      spouse_salutation: values.spouse_salutation.label,
      date_of_birth: values.date_of_birth ? moment(values.date_of_birth).format('YYYY-MM-DD') : '',
      spouse_dob: values.spouse_dob ? moment(values.spouse_dob).format('YYYY-MM-DD') : '',
      dob: values.dob ? moment(values.dob).format('YYYY-MM-DD') : '',
      date_of_issue: values.date_of_issue ? moment(values.date_of_issue).format('YYYY-MM-DD') : '',
      valid_upto: values.valid_upto ? moment(values.valid_upto).format('YYYY-MM-DD') : '',
      emp_pass_expiration_date: values.emp_pass_expiration_date
        ? moment(values.emp_pass_expiration_date).format('YYYY-MM-DD')
        : '',
      employee_children:
        values.employee_children &&
        values.employee_children.map((value) => ({
          ...value,
          gender: value.gender.label,
          salutation: value.salutation.label,
          dob: value.dob ? moment(value.dob).format('YYYY-MM-DD') : '',
        })),
      education:
        values.education &&
        (await Promise.all(
          values.education.map(async (value) => ({
            ...value,
            year_of_passing: value.year_of_passing ? moment(value.year_of_passing).format('YYYY-MM-DD') : '',
            from_date: value.from_date ? moment(value.from_date).format('YYYY-MM-DD') : '',
            to_date: value.to_date ? moment(value.to_date).format('YYYY-MM-DD') : '',
            attach_transcript: await uploadFiles(value.attach_transcript?.file?.originFileObj, code),
          })),
        )),
      external_work_history:
        values.external_work_history &&
        values.external_work_history.map((value) => ({
          ...value,
          position: value.position.label,
          from_date: value.from_date ? moment(value.from_date).format('YYYY-MM-DD') : '',
          to_date: value.to_date ? moment(value.to_date).format('YYYY-MM-DD') : '',
        })),
      gender: values.gender.label,
      marital_status: values.marital_status.label,
      nationality: values.nationality.label,
      race: values.race.label,
      religious: values.religious.label,
      spouse_martial_status: values.spouse_martial_status.label,
      spouse_race: values.spouse_race.label,
      spouse_religious: values.spouse_religious.label,
      emergency_salutation: values.emergency_salutation.label,
      current_permanent_address: [
        {
          current_address: values.current_address,
          current_state: values.current_state,
          current_post_code: values.current_post_code,
          current_country: values.current_country.label,
          current_city: values.current_city,
          permanent_address_1: values.permanent_address_1,
          permanent_state: values.permanent_state,
          permanent_post_code: values.permanent_post_code,
          permanent_country: values.permanent_country.label,
          permanent_city: values.permanent_city,
        },
      ],
      employee_medical: [
        {
          insurance_type: values.insurance_type,
          expiration_date: values.expiration_date,
          insurance_no: values.insurance_no,
          upload_document: await uploadFiles(values.upload_document?.file?.originFileObj, code),
          descritpion: values.descritpion,
        },
      ],
    };
    return updatePayload;
  };
  const contractUpload = async (values, code) => {
    let contractFields = {
      contract_type: values.contract_type,
      employment_type: values.employment_type,
      start_date: values.start_date ? moment(values.start_date).format('YYYY-MM-DD') : '',
      end_date: values.end_date ? moment(values.end_date).format('YYYY-MM-DD') : '',
      endorser: values.endorser,
      staff_category: values.staff_category,
      company: values.company,
      job_title: values.job_title,
      position_level: values.position_level,
      supervisor: values.supervisor,
      contract_attachment: await uploadFiles(values.contract_attachment?.file?.originFileObj, code),
      work_hour_template: values.work_hour_template,
      employee_role: values.employee_role && values.employee_role.map((value) => ({ role: value.label })),
      program_requirements:
        values.program_requirements &&
        values.program_requirements.map((value) => ({
          ...value,
          day: value.day,
          work_type: value.work_type.label,
          time: moment(value.time).format('h:mm a'),
          total_hours: value.total_hours.label,
        })),
    };
    return contractFields;
  };
  const onSubmit = async (values) => {
    console.log({ values });
    const initialFileds = {
      salutation: values.salutation.label,
      first_name: values.first_name,
    };
    contractUpload(values);

    addEmployer(initialFileds).then(async (response) => {
      console.log({ response });
      let finalPayload = await finalUpload(values, response?.data?.data.name);
      addEmployer(finalPayload).then(async (res) => {
        let contractUploadData = await contractUpload(values, response?.data?.data.name);
        addContract(contractUploadData).then((response3) => {
          console.log({ response3 });
        });
      });
    });

    // addEmployer(updatePayload).then((response) => {
    //   console.log({ response });
    // });
  };

  return (
    <Fragment>
      <Breadcrumb separator=">" className="mb-1">
        <Breadcrumb.Item href="/hrms/employment">Employment</Breadcrumb.Item>
        <Breadcrumb.Item>Employment Details</Breadcrumb.Item>
      </Breadcrumb>
      <Form layout="vertical" scrollToFirstError={true} onFinish={handleSubmit(onSubmit)}>
        <Row gutter={[30, 24]}>
          <Col span={24}>
            <HeadingChip title="Add New Employee" />
          </Col>
          <Col span={8}>
            <Card bordered={false} className="uni-card side-panel">
              <Layout className="empty-card">
                <Space size={50} direction="vertical" className="text-center pt-1">
                  <Image src={PlaceHolderImage} preview={false} />
                  <Text>
                    Please fill up the details on the right. Once finished, click 'Save Draft' or 'Add Employee' to
                    proceed.
                  </Text>
                </Space>
                <Space size={10} direction="vertical" className="w-100">
                  <Button size="large" type="primary" htmlType="submit" className="w-100 black-btn">
                    Save Draft
                  </Button>
                  <Button size="large" type="primary" htmlType="submit" className="w-100 green-btn">
                    Add Employee
                  </Button>
                </Space>
              </Layout>
            </Card>
          </Col>
          <Col span={16}>
            <Card bordered={false} className="scrolling-card">
              <EmployeeForm
                control={control}
                errors={errors}
                // setValue={setValue}
                mode="add"
                // deleted={deleted}
                // setDeleted={setDeleted}
                // t={t}
              />
            </Card>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};

export default AddEmployment;
