import React, { useEffect } from 'react';
import { DatePicker, Form, Input, Checkbox, Typography, TimePicker, Upload, Switch, Radio } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import { dummyRequest } from '../../../features/utility';

const { Text } = Typography;

export const InputField = (props) => {
  const { fieldname, label, control, iProps, rules, initValue, isRequired, validate, validMessage } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, [props.valueGot]);

  return (
    <>
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
            <Input value={value} onChange={onChange} onBlur={props.onBlur} {...iProps} />
          )}
        />
      </Form.Item>
    </>
  );
};

export const InputPassword = (props) => {
  const { fieldname, label, control, iProps, rules, initValue, isRequired, validate, validMessage } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, [props.valueGot]);

  return (
    <>
      <Form.Item required={isRequired ? isRequired : false} label={label} validateStatus={validate} help={validMessage}>
        <Controller
          name={fieldname}
          control={control}
          defaultValue={initValue || initValue == 0 ? initValue : ''}
          rules={rules}
          as={<Input.Password {...iProps} />}
        />
      </Form.Item>
    </>
  );
};

export const SelectField = (props) => {
  const { fieldname, label, control, iProps, rules, selectOption, isRequired, initValue, validate, validMessage } =
    props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, []);

  return (
    <Form.Item
      required={isRequired ? isRequired : false}
      label={label}
      validateStatus={validate}
      help={validMessage}
      noStyle={props.noStyle}
      className={props.class}
    >
      <Controller
        name={fieldname}
        control={control}
        defaultValue={initValue ? initValue : ''}
        rules={rules}
        render={({ onBlur, value, onChange }) => (
          <Select
            value={value}
            className="customSelect"
            styles={{
              control: (val) => ({ ...val, minHeight: 32 }),
              valueContainer: (vcontain) => ({
                ...vcontain,
                padding: '5px 15px',
                textTransform: 'capitalize',
              }),
              dropdownIndicator: (icontain) => ({ ...icontain, padding: 5 }),
              indicatorSeparator: (icontain) => ({
                ...icontain,
                backgroundColor: '#000',
              }),
              option: (vcontain, state) => ({
                ...vcontain,
                textTransform: 'capitalize',
                color: '#BEBEBE',
                backgroundColor: state.isFocused ? '#0077B6' : '#171717',
              }),
              placeholder: (place) => ({ ...place, color: 'rgba(0,0,0,.3)' }),
            }}
            onChange={(e) => {
              onChange(e);
              props.onChange && props.onChange(e);
            }}
            onBlur={props.onBlur}
            {...iProps}
            options={selectOption}
            theme={(theme) => ({
              ...theme,
              borderRadius: 2,
              colors: { ...theme.colors, primary: '#767676' },
            })}
          />
        )}
      />
    </Form.Item>
  );
};

export const DateField = (props) => {
  const { fieldname, label, control, iProps, rules, initValue, isRequired, validate, validMessage } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, [props.valueGot]);

  return (
    <>
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
          defaultValue={initValue ? initValue : ''}
          rules={rules}
          render={({ value, onChange }) => (
            <DatePicker
              style={{ width: '100%' }}
              value={value}
              onChange={(e) => {
                onChange(e);
                props.onChange && props.onChange(e);
              }}
              {...iProps}
            />
          )}
        />
      </Form.Item>
    </>
  );
};

export const InputCheckbox = (props) => {
  const { fieldname, label, control, rules, initValue, isRequired, validate, validMessage } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, []);

  return (
    <Form.Item
      required={isRequired ? isRequired : false}
      validateStatus={validate}
      help={validMessage}
      valuePropName="checked"
      noStyle
    >
      <Controller
        name={fieldname}
        control={control}
        rules={rules}
        defaultValue={initValue ? initValue : ''}
        render={({ value, onChange }) => (
          <Checkbox
            checked={value}
            onChange={(e) => {
              onChange(e.target.checked);
            }}
          >
            {label}
          </Checkbox>
        )}
      />
    </Form.Item>
  );
};

export const CheckboxGroup = (props) => {
  const { fieldname, label, option, control, rules, initValue, isRequired, validate, validMessage } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, []);

  return (
    <Form.Item
      required={isRequired ? isRequired : false}
      validateStatus={validate}
      help={validMessage}
      label={label}
      className={props.class}
    >
      <Controller
        name={fieldname}
        control={control}
        rules={rules}
        defaultValue={initValue ? initValue : ''}
        render={({ value, onChange }) => (
          <Checkbox.Group
            value={value}
            onChange={(e) => {
              onChange(e);
              onChange(e);
            }}
            className="w-100"
            options={option}
          />
        )}
      />
    </Form.Item>
  );
};

export const TimeField = (props) => {
  const { fieldname, label, control, iProps, rules, initValue, isRequired, validate, validMessage } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, []);

  return (
    <>
      <Form.Item required={isRequired ? isRequired : false} label={label} validateStatus={validate} help={validMessage}>
        <Controller
          name={fieldname}
          control={control}
          defaultValue={initValue ? initValue : ''}
          rules={rules}
          as={<TimePicker style={{ width: '100%' }} {...iProps} />}
        />
      </Form.Item>
    </>
  );
};

export const UploadField = (props) => {
  const {
    fieldname,
    label,
    control,
    rules,
    initValue,
    isRequired,
    validate,
    validMessage,
    filelist,
    fileProps,
    iProps,
  } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, []);

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
        rules={rules}
        defaultValue={initValue ? initValue : ''}
        render={({ value, fileList, onChange }) => (
          <Upload
            className="uploadWithbtn"
            showUploadList={false}
            accept="image/*,.pdf"
            maxCount={1}
            fileList={fileList}
            customRequest={dummyRequest}
            onChange={(e) => onChange(e)}
            {...iProps}
          >
            <Input
              size="large"
              className="ag-upload-btn"
              value={value ? value.fileList[0].name : 'Please Upload File'}
              addonAfter={<PlusCircleFilled />}
            />
          </Upload>
        )}
      />
    </Form.Item>
  );
};

export const TextAreaField = (props) => {
  const { fieldname, label, control, iProps, rules, initValue, isRequired, validate, validMessage } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, [props.valueGot]);

  return (
    <Form.Item
      required={isRequired ? isRequired : false}
      label={label}
      validateStatus={validate}
      help={validMessage}
      className={props.classes}
    >
      <Controller
        name={fieldname}
        control={control}
        defaultValue={initValue || initValue == 0 ? initValue : ''}
        rules={rules}
        as={<Input.TextArea {...iProps} />}
      />
    </Form.Item>
  );
};

export const InputRadio = (props) => {
  const { fieldname, label, control, rules, initValue, isRequired, validate, validMessage, noStyle } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, []);
  return (
    <Form.Item
      required={isRequired ? isRequired : false}
      validateStatus={validate}
      help={validMessage}
      valuePropName="checked"
      noStyle={noStyle}
      className={props.class ? props.class : ''}
    >
      <Controller
        rules={rules}
        name={fieldname}
        control={control}
        defaultValue={initValue ? initValue : ''}
        render={({ value, onChange }) => (
          <Radio.Group
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              props.onChange(e);
            }}
          >
            {props.options}
          </Radio.Group>
        )}
      />
    </Form.Item>
  );
};

export const SwitchField = (props) => {
  const { fieldname, control, initValue, rules, iProps } = props;

  useEffect(() => {
    props.valueGot && props.setValue(fieldname, props.valueGot);
  }, []);
  return (
    <Form.Item className="mb-0">
      <Controller
        name={fieldname}
        control={control}
        rules={rules}
        defaultValue={initValue ? initValue : false}
        render={({ value, onChange }) => <Switch checked={value} onChange={(e) => onChange(e)} {...iProps} />}
      />
    </Form.Item>
  );
};
