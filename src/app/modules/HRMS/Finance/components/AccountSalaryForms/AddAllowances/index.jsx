import React, { useEffect } from 'react';
import { Row, Col, Typography, Form, Button, message } from 'antd';
import { useForm } from 'react-hook-form';
import FormGroup from '../../../../../../molecules/FormGroup';
import { addAllowences } from './FormFields';
import { updateAllowance, addNewAllowance, deleteAllowance } from '../../../ducks/services';
import { uniquiFileName, getSingleUpload, getFileName } from '../../../../../../../features/utility';

import { useParams } from 'react-router-dom';

import moment from 'moment';

const AddAllowences = (props) => {
  const { selectedAllowance, onCloseForm } = props;
  const { id } = useParams();
  const { control, errors, setValue, handleSubmit } = useForm();
  const { Title } = Typography;

  useEffect(() => {
    if (selectedAllowance) {
      setValue('allowance_type', {
        label: selectedAllowance?.allowance_type,
        value: selectedAllowance?.allowance_type,
      });
      setValue('allowence_ammount_type', { value: 'RM', label: 'RM' });
      setValue('amount', selectedAllowance.amount);
      setValue('date_given', moment(selectedAllowance.date_given, 'YYYY-MM-DD'));
      setValue('document', {
        fileList: [
          {
            uid: '-1',
            name: getFileName(selectedAllowance?.document),
            status: 'done',
            url: `http://cms2dev.limkokwing.net${selectedAllowance.document}`,
          },
        ],
      });
      setValue('description', selectedAllowance.description);
    }
  }, [selectedAllowance]);

  const onSubmitHandler = async (values) => {
    let res = '';
    if (values.document.file) {
      let modifiedName = uniquiFileName(values.document?.file?.originFileObj.name);
      res = await getSingleUpload(modifiedName, 'image', values.document?.file?.originFileObj, 'HRMS EMP Finance', id);
    }
    const payload = {
      allowance_type: values.allowance_type.label,
      amount: values.amount,
      date_given: moment(values.date_given).format('YYYY-MM-DD'),
      description: values.description,
      document: res?.file_url ? res?.file_url : selectedAllowance.document,
      status: 'Active',
    };
    selectedAllowance?.name
      ? updateAllowance(selectedAllowance.name, payload).then((response) => {
          message.success(`Allowance ${selectedAllowance?.name} Updated Seccussfully`);
          onCloseForm('', '');
        })
      : addNewAllowance({ employee_id: id, allowance: { ...payload } }).then((response) => {
          message.success(`Allowance Addeda Seccussfully`);
          onCloseForm('', '');
        });
  };

  const onDeleteHandler = () => {
    deleteAllowance(selectedAllowance.name, { status: 'Inactive' }).then((response) => {
      message.success(`Allowance ${selectedAllowance.name} Deleted Seccussfully`);
      onCloseForm('', '');
    });
  };

  return (
    <Form layout="vertical" scrollToFirstError={true} onFinish={handleSubmit(onSubmitHandler)}>
      <Row gutter={[24, 30]} align="bottom">
        <Col span={24}>
          <Title level={4} className="mb-0">
            Allowance Details
          </Title>
        </Col>
        {addAllowences.map((value, key) => (
          <FormGroup key={key} item={value} control={control} errors={errors} />
        ))}
        <Col span={24}>
          <Row gutter={24} justify="end">
            {selectedAllowance?.name ? (
              <>
                <Col>
                  <Button onClick={onDeleteHandler} size="large" type="primary" className="red-btn">
                    Delete Allowance
                  </Button>
                </Col>
                <Col>
                  <Button size="large" type="primary" htmlType="submit" className="green-btn">
                    Save Changes
                  </Button>
                </Col>
              </>
            ) : (
              <Col>
                <Button size="large" type="primary" htmlType="submit" className="green-btn">
                  Add Allowance
                </Button>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default AddAllowences;
