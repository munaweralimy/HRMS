import React, { useEffect } from 'react';
import { Form, Rate } from 'antd';
import { Controller } from 'react-hook-form';

export const RateField = (props) => {
  const { fieldname, label, control, iProps, rules, initValue, isRequired, validate, validMessage, valueGot } = props;
  useEffect(() => {
    valueGot && props.setValue(fieldname, valueGot);
  }, [valueGot]);
  return (
    <Form.Item
      required={isRequired ? isRequired : false}
      label={label}
      validateStatus={validate}
      help={validMessage}
      className={props.class}
    >
      <Controller
        name={fieldname}
        control={control}
        defaultValue={initValue || initValue == 0 ? initValue : ''}
        rules={rules}
        render={({ onBlur, value, onChange }) => (
          <Rate value={value} onChange={onChange} onBlur={props.onBlur} {...iProps} />
        )}
      />
    </Form.Item>
  );
};
