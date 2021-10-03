import React, { useState, useEffect, Fragment } from 'react';
import { Button, Row, Col, Typography, Form, message } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { useForm } from 'react-hook-form';
import AddUser from '../../../Teams/Components/AddUser';
import { getSingleRole } from '../../../../ducks/services';
import { workingHorFields } from './FormFields';
export default (props) => {
  const { title, onClose, workingHourTemp } = props;
  const { Title, Text } = Typography;
  const [workingHours, setWorkingHours] = useState('');
  const [userData, setUserData] = useState([]);
  const { control, errors, setValue, reset, handleSubmit } = useForm();

  useEffect(() => {
    if (workingHourTemp.name.length > 0) {
      getSingleRole(workingHourTemp.name).then((response) => {
        setWorkingHours(response?.data?.data);
        setUserData(
          response?.data?.data?.user_staff.map((value) => ({
            full_name: value.employee_full_name,
            id: value.employee,
          })),
        );
      });
    } else {
      reset();
      setUserData([]);
    }
  }, [workingHourTemp]);

  useEffect(() => {
    if (Object.entries(workingHours.length > 0)) {
    }
  }, [workingHours]);

  const onFinish = async (val) => {};

  return (
    <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
      <Row gutter={[24, 30]}>
        <Col span={24}>
          <Row gutter={24} justify="center">
            <Col>
              <Title level={3} className="mb-0">
                {title}
              </Title>
            </Col>
          </Row>
        </Col>

        <Col span={16}>
          <Row gutter={[24, 18]}>
            {workingHorFields.map((item, idx) => (
              <Fragment key={idx}>
                <FormGroup item={item} control={control} errors={errors} />
              </Fragment>
            ))}
          </Row>
        </Col>
        <Col span={8}>
          <Row gutter={[24, 20]}>
            <Col span={24}>
              <AddUser userData={userData} setUserData={setUserData} title="Team Member" control={control} />
            </Col>
            <Col span={24}>
              <Row gutter={24}>
                {workingHourTemp.name ? (
                  <>
                    <Col span={12}>
                      <Button
                        size="large"
                        type="primary"
                        htmlType="button"
                        className="red-btn w-100"
                        onClick={onDeleteTeam}
                      >
                        Delete
                      </Button>
                    </Col>
                    <Col span={12}>
                      <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
                        Save
                      </Button>
                    </Col>
                  </>
                ) : (
                  <>
                    <Col span={12}>
                      <Button
                        size="large"
                        type="primary"
                        htmlType="button"
                        className="black-btn w-100"
                        onClick={onClose}
                      >
                        Close
                      </Button>
                    </Col>
                    <Col span={12}>
                      <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
                        Add
                      </Button>
                    </Col>
                  </>
                )}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};
