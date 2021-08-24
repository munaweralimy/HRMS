import React from 'react';
import { Row, Col, Form, Button, Typography } from 'antd';
import { addeditJobs } from './FormFields';
import { useForm } from 'react-hook-form';
import FormGroup from '../../../../../molecules/FormGroup';
import ListCard from '../../../../../molecules/ListCard';

const AddEditJob = (props) => {
  const { rowData, colName, data } = props;
  const { Title } = Typography;
  const { control, errors, handleSubmit } = useForm();

  return (
    <Form layout="vertical" scrollToFirstError={true}>
      <Row gutter={[24, 30]} align="bottom">
        <Col span={24}>
          <Title level={4} className="mb-0">
            {`${rowData ? rowData.jobtitle + 'Position' : 'Add New Job Opening'} `}
          </Title>
        </Col>
        {addeditJobs.map((value, key) => (
          <FormGroup key={key} item={value} control={control} errors={errors} />
        ))}
        {rowData ? (
          <>
            <Col span={24}>
              <Row gutter={24} justify="end">
                <Col>
                  <Button size="large" type="primary" htmlType="submit" className="red-btn">
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
              <ListCard ListCol={colName} ListData={data} blackCard="black-nospace-card" />
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
  );
};

export default AddEditJob;
