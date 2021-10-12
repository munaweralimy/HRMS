import React, { useEffect, Fragment } from 'react';
import { Button, Row, Col, Typography, Form, message, Spin } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { useForm } from 'react-hook-form';
import { departmentFields } from './FormFields';
import { addSingleDepartment, updateDepartment, deleteDepartment } from '../../../../ducks/services';
import moment from 'moment';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const { title, onClose, departmentField } = props;
  const { Title, Text } = Typography;
  const [load, setLoad] = useState(false);
  const { control, errors, setValue, reset, handleSubmit } = useForm();

  const onFinish = (values) => {
    setLoad(true);
    const payload = {
      department_name: values?.department_name,
      company: values.company?.value,
      employee_name: values?.employee_name.value,
      employee_id: values?.employee_name.id,
      doctype: 'HRMS Department',
      status: 'Active',
    };
    departmentField.name.length == 0
      ? addSingleDepartment(payload)
          .then((response) => {
            if (response.data.message.success == true) {
              message.success(response.data.message.message);
            } else {
              message.error(response.data.message.message);
            }
            setLoad(false);
            onClose();
          })
          .catch((error) => message.error('Holiday exists'))
      : updateDepartment(departmentField.name, payload)
          .then((response) => {
            if (response.data.message.success == true) {
              message.success(response.data.message.message);
            } else {
              message.error(response.data.message.message);
            }
            setLoad(false);
            onClose();
          })
          .catch((error) => message.error('Update Failed'));
  };

  const onDeleteHoliday = () => {
    setLoad(true);
    deleteDepartment(departmentField.name, { status: 'Inactive' })
      .then((response) => {
        if (response.data.message.success == true) {
          message.success(response.data.message.message);
        } else {
          message.error(response.data.message.message);
        }
        setLoad(false);
        onClose();
      })
      .catch((error) => {
        message.error('Holiday Deleted Unsccessfully');
        onClose();
      });
  };

  useEffect(() => {
    if (departmentField.name.length > 0) {
      setValue('department_name', departmentField.department_name);
      setValue('employee_name', {
        label: departmentField.employee_name,
        value: departmentField.employee_name,
        id: departmentField.employee_id,
      });
      setValue('company', { label: departmentField.company, value: departmentField.company });
    } else {
      reset();
    }
  }, [departmentField]);

  return (
    <Spin indicator={antIcon} size="large" spinning={load}>
      <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
        <Row gutter={[20, 50]}>
          <Col span={24}>
            <Title level={3}>{title}</Title>
          </Col>
          <Col span={24}>
            <Row gutter={[20, 30]}>
              {departmentFields().map((item, idx) => (
                <Fragment key={idx}>
                  <FormGroup item={item} control={control} errors={errors} />
                </Fragment>
              ))}
              {departmentField.company.length == 0 ? (
                <>
                  <Col span={12}>
                    <Button size="large" type="primary" htmlType="button" className="black-btn w-100" onClick={onClose}>
                      Close
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
                      Add
                    </Button>
                  </Col>
                </>
              ) : (
                <>
                  <Col span={12}>
                    <Button size="large" type="primary" className="red-btn w-100" onClick={onDeleteHoliday}>
                      Delete
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">
                      Save
                    </Button>
                  </Col>
                </>
              )}
            </Row>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};
