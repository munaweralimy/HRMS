import React from 'react';
import { InputField, DateField, SelectField, CheckboxGroup, UploadField, TextAreaField } from '../../atoms/FormElement';
import { Row, Col, Typography } from 'antd';
import moment from 'moment';
import { getFileName } from '../../../features/utility';

const { Title } = Typography;

export default (props) => {
  const { item, control, errors, parent, index, elem } = props;

  const setValidate = (mess) => {
    if (parent && errors[`${parent.name}`]) {
      let ret = null;
      errors[`${parent.name}`].map((x, i) => {
        if (Object.keys(x) == item.name && index == i) {
          if (mess) {
            ret = Object.values(x)[0].message;
          } else {
            ret = 'error';
          }
        }
      });
      return ret;
    } else {
      if (errors[`${item.name}`]) {
        if (mess) {
          return errors[`${item.name}`].message;
        } else {
          return 'error';
        }
      }
    }
  };

  return (
    <Col className={item.hidden ? 'd-none': ''} flex={`${item.twocol ? '1 0 300px': item.colWidth ? item.colWidth : '100%'}`}>
      {item.type == 'input' && (
        <InputField
          fieldname={parent ? `${parent.name}[${index}].${item.name}` : item.name}
          label={item.label}
          control={control}
          class={`mb-0 ${item.hidden ? 'd-none' : ''}`}
          iProps={{
            readOnly: props.static ? props.static : false,
            placeholder: item.placeholder,
            size: 'large',
            type: item.number && 'number',
          }}
          initValue={elem && elem[item.name] ? elem[item.name] : ''}
          rules={{
            required: { value: item.req, message: item.reqmessage },
            pattern: item.email
              ? { value: /(?=^.{1,50}$)^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Enter valid Email Address' }
              : '',
          }}
          validate={setValidate(false)}
          validMessage={setValidate(true)}
        />
      )}
      {item.type == 'select' && (
        <SelectField
          fieldname={parent ? `${parent.name}[${index}].${item.name}` : item.name}
          label={item.label}
          class={`mb-0 w-100 ${item.hidden ? 'd-none' : ''}`}
          initValue={elem ? { label: elem[item.name], value: elem[item.name] } : ''}
          control={control}
          iProps={{ placeholder: item.placeholder, isMulti: item.multiple ? item.multiple : false , isDisabled: item.disabled || props.static }}
          selectOption={item.options}
          rules={{ required: { value: item.req, message: item.reqmessage } }}
          validate={setValidate(false)}
          validMessage={setValidate(true)}
        />
      )}
      {item.type == 'date' && (
        <DateField
          fieldname={parent ? `${parent.name}[${index}].${item.name}` : item.name}
          label={item.label}
          control={control}
          class="mb-0"
          iProps={{ picker: item?.dateType ? item?.dateType : 'date', size: 'large', format: item?.format ? item?.format : '' }}
          initValue={elem && elem[item.name] ? moment(elem[item.name], 'YYYY-MM-DD') : ''}
          rules={{ 
            required: { value: item.req, message: item.reqmessage },
            setValueAs: (value) => value ? moment(value).format('YYYY-MM-DD') : '',
           }}
          validate={setValidate(false)}
          validMessage={setValidate(true)}
        />
      )}
      {item.type == 'checkbox' && (
        <CheckboxGroup
          fieldname={parent ? `${parent.name}[${index}].${item.name}` : item.name}
          label=""
          class={`mb-0 fullWidth-checbox ${item.class ? item.class : ''}`}
          control={control}
          initValue=""
          option={item.options}
          rules={{ required: { value: item.req, message: item.reqmessage } }}
          validate={setValidate(false)}
          validMessage={setValidate(true)}
        />
      )}
      {item.type == 'upload' && (
        <UploadField
          fieldname={parent ? `${parent.name}[${index}].${item.name}` : item.name}
          label={item.label}
          class={`mb-0`}
          iProps={{ disabled: props.static ? props.static : false }}
          control={control}
          initValue={
            elem && elem[item.name] && typeof elem[item.name] == 'string'
              ? {
                  fileList: [
                    {
                      uid: '-1',
                      name: getFileName(elem[item.name]),
                      status: 'done',
                      url: `http://cms2dev.limkokwing.net${elem[item.name]}`,
                    },
                  ],
                }
              : ''
          }
          rules={{ required: { value: item.req, message: item.reqmessage } }}
          validate={setValidate(false)}
          validMessage={setValidate(true)}
        />
      )}
      {item.type == 'textarea' && (
        <TextAreaField
          fieldname={parent ? `${parent.name}[${index}].${item.name}` : item.name}
          label={item.label}
          control={control}
          class={`mb-0 ${item.hidden ? 'd-none' : ''}`}
          iProps={{
            readOnly: props.static ? props.static : false,
            placeholder: item.placeholder,
            size: 'large',
          }}
          initValue={elem && elem[item.name] ? elem[item.name] : ''}
        />
      )}
    </Col>
  );
};
