import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Form, Button, Typography, message, Spin } from 'antd';
import { useForm } from 'react-hook-form';
import FormGroup from '../../../../../molecules/FormGroup';
import ListCard from '../../../../../molecules/ListCard';
import { getJobs, getCompany } from '../../../../Application/ducks/actions';
import { getSuitableApplicants, emptyApplicant } from '../../dcuks/action';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from '../../../../../../services/axiosInterceptor';
import { apiresource } from '../../../../../../configs/constants';
import { LoadingOutlined } from "@ant-design/icons";

const { Title } = Typography;
const antIcon = <LoadingOutlined spin />;

const listCol = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: true,
  },
  {
    title: 'Current Position',
    dataIndex: 'current_position',
    key: 'current_position',
    sorter: true,
  },
  {
    title: 'Current Company',
    dataIndex: 'current_company',
    key: 'current_company',
    sorter: true,
  },
  {
    title: 'Employment Status',
    dataIndex: 'employement_status',
    key: 'employement_status',
    sorter: true,
    align: 'center',
  },
  {
    title: 'Fit Index',
    dataIndex: 'fit_ratio',
    key: 'fit_ratio',
    sorter: true,
    align: 'center',
  },
];

export default ({data, updateApi}) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [load, setLoad] = useState(false);
  const companies = useSelector(state => state.global.companies)
  const jobslist = useSelector(state => state.global.jobslist)
  const applicantList = useSelector(state => state.advancement.applicantlist)
  const { control, errors, setValue, handleSubmit } = useForm();
  
  useEffect(() => {
    dispatch(getJobs());
    dispatch(getCompany());
    return () => dispatch(emptyApplicant())
  }, []);

  useEffect(() => {
    if (data) {
      setValue('job_title', {label: data?.job_title, value: data?.job_title})
      setValue('company', {label: data?.company, value: data?.company});
      dispatch(getSuitableApplicants(data?.job_title, 1, 10, '', ''));
    }
  }, [data]);

  const addeditJobs = [
    {
      type: 'select',
      label: 'Job Title',
      name: 'job_title',
      placeholder: 'Select Job',
      options: jobslist?.map(x => ({label: x.name, value: x.name })),
      req: true,
      reqmessage: 'Select Jobs',
      twocol: true,
    },
    {
      type: 'select',
      label: 'Company',
      name: 'company',
      options: companies?.map(x => ({label: x.name, value: x.name })),
      req: true,
      reqmessage: 'Select Jobs',
      twocol: true,
    },
  ];

  const onFinish = async (val) => {
    setLoad(true);
    let body = {
      job_title: val.job_title.label,
      company: val.company.label,
    }
    let url = `${apiresource}/HRMS Job Openings`
    try {
      if(data.job_title) {
        await axios.post(`url/${data.job_title}`, body)
      } else {
        await axios.post(url, body)
      }
      message.success(`Job ${data ? 'Updated' : 'Added'} Successfully`)
      setLoad(false);
      reset();
      updateApi();
    } catch(e) {
      const {response} = e;
      console.log('error', response);
      setLoad(false);
      message.error('Something went wrong'); 
    }
  }

  const onClickRow = (record) => {
    return {
      onClick: () => {
        history.push(`/advancement/${record?.name}`);
      },
    };
  };

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getSuitableApplicants(data?.job_title, pagination.current, pagination.pageSize, sorter.order, sorter.columnKey));
    } else {
        dispatch(getSuitableApplicants(data?.job_title, pagination.current, pagination.pageSize, '', ''));
    }
  }
  

  const onDelete = async (job) => {
    setLoad(true);
    try {
      await axios.delete(`${apiresource}/HRMS Job Openings/${job}`);
      message.success('Job Deleted Successfully');
      setLoad(false);
      updateApi();
    } catch(e) {
      const {response} = e;
      console.log('error', response);
      setLoad(false);
      message.error('Something went wrong'); 
    }
  }

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
    <Form layout="vertical" scrollToFirstError={true} onFinish={handleSubmit(onFinish)}>
      <Row gutter={[20, 30]} align="bottom">
        <Col span={24}>
          <Title level={4} className="mb-0">
            {`${data ? data.job_title + ' Position' : 'Add New Job Opening'} `}
          </Title>
        </Col>
        {addeditJobs.map((item, index) => (
          <Fragment key={index}>
            <FormGroup item={item} control={control} errors={errors} />
          </Fragment>
        ))}
        {data ? (
          <>
            <Col span={24}>
              <Row gutter={24} justify="end">
                <Col>
                  <Button size="large" type="primary" htmlType="button" className="red-btn" onClick={() => onDelete(data.job_title)}>
                    Delete Job Openinges
                  </Button>
                </Col>
                <Col>
                  <Button size="large" type="primary" htmlType="submit" className="green-btn">
                    Save Changes
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Title level={4} className="mb-0">
                Suitable Applicants
              </Title>
            </Col>
            <Col span={24}>
              <ListCard 
                classes='clickRow'
                listClass="small-card8 b-black"
                onRow={onClickRow}
                ListCol={listCol}
                ListData={applicantList?.rows}
                onChange={onTableChange}
                pagination={{
                  total: applicantList?.count,
                  current: page,
                  pageSize: limit
                }}
                />
            </Col>
          </>
        ) : (
          <Col span={24}>
            <Row gutter={24} justify="end">
              <Col>
                <Button size="large" type="primary" htmlType="submit" className="green-btn">
                  Save Changes
                </Button>
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    </Form>
    </Spin>
  );
};