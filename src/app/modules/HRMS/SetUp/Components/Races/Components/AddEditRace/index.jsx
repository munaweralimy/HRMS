import React, { useState, useEffect, Fragment } from 'react';
import { Space, Button, Row, Col, Typography, Form, message } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { useForm } from 'react-hook-form';
import { raceFields } from './FormFields';
import { addSingleRace, updateSingleRace, deleteSingleRace } from '../../../../ducks/services';
export default (props) => {
  const { title, onClose, race } = props;
  const { Title, Text } = Typography;
  const { control, errors, setValue, reset, handleSubmit } = useForm();
  console.log({ race });
  const onFinish = (values) => {
    const payload = {
      name1: values.race_name,
    };
    race.race.length == 0
      ? addSingleRace(payload)
          .then((response) => {
            message.success('Race Added Successfully');
            onClose();
          })
          .catch((error) => message.error('Race exists'))
      : updateSingleRace(race.name, payload)
          .then((response) => {
            message.success('Race Updated Successfully');
            onClose();
          })
          .catch((error) => message.error('Update Failed'));
  };

  const onDeleteNationality = () => {
    deleteSingleRace(race.name)
      .then((response) => {
        message.success('Race Deleted Successfully');
        onClose();
      })
      .catch((error) => {
        message.error('Race Deleted Unsccessfully');
        onClose();
      });
  };
  useEffect(() => {
    if (race.race.length > 0) {
      setValue('race_name', race.race);
    } else {
      reset();
    }
  }, [race]);

  return (
    <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>
      <Row gutter={[20, 50]}>
        <Col span={24}>
          <Title level={3}>{title}</Title>
        </Col>

        <Col span={24}>
          <Row gutter={[20, 30]}>
            {raceFields.map((item, idx) => (
              <Fragment key={idx}>
                <FormGroup item={item} control={control} errors={errors} />
              </Fragment>
            ))}
            {race.race.length == 0 ? (
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
                  <Button size="large" type="primary" className="red-btn w-100" onClick={onDeleteNationality}>
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
  );
};
