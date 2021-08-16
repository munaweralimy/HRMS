import React, { Fragment } from 'react';
import { Row, Col, Typography, Button, Card } from 'antd';
import { useFieldArray } from 'react-hook-form';
import {
  personalInfoFields,
  contactDetails,
  spouseDetails,
  childrenDetail,
  emergencyDetail,
  educationLevel,
  workExperience,
} from './PersonalFormFields/PersoanlFormFields';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { InputField, SelectField } from '../../../../../../../atoms/FormElement';

const Personal = (props) => {
  const { control, errors, t } = props;
  const mode = 'edAit';
  const { Title } = Typography;
  const {
    fields: fileds1,
    append: childAppend,
    remove: childRemove,
  } = useFieldArray({
    control,
    name: 'employee_children',
  });
  const {
    fields: fields2,
    append: emergencyAppend,
    remove: emergencyRemove,
  } = useFieldArray({
    control,
    name: 'emergency_detail',
  });
  const {
    fields: fields3,
    append: educationAppend,
    remove: educationRemove,
  } = useFieldArray({
    control,
    name: 'education',
  });
  const {
    fields: fields4,
    append: workAppend,
    remove: workRemove,
  } = useFieldArray({
    control,
    name: 'external_work_history',
  });
  const initQ = {
    education_name: '',
    country: '',
    academic_transcript: '',
    academic_certificate: '',
  };
  return (
    <Row gutter={[24, 30]} align="bottom">
      <Col span={24}>
        <Title level={4} className="mb-0">
          Personal Information
        </Title>
      </Col>
      <Col span={6}>
        <SelectField
          fieldname="salutation"
          label="Title"
          control={control}
          class="mb-0"
          selectOption={[
            { value: 'Mr', label: 'Mr' },
            { value: 'Miss', label: 'Miss' },
          ]}
        />
      </Col>
      <Col span={18}>
        <InputField
          fieldname="first_name"
          label="Name as per IC/Passport"
          control={control}
          class="mb-0"
          iProps={{ placeholder: '', size: 'large' }}
        />
      </Col>
      {personalInfoFields().map((item, index) => (
        <Fragment key={index}>
          {item?.subheader && (
            <Col span={24}>
              <Title level={5} className="mb-0 c-default">
                {item.subheader}
              </Title>
            </Col>
          )}
          <FormGroup item={item} control={control} errors={errors} />
        </Fragment>
      ))}
      <Col span={24}>
        <Title level={4} className="mb-0">
          Contact Details
        </Title>
      </Col>
      {contactDetails().map((item, index) => (
        <Fragment key={index}>
          {item?.subheader && (
            <Col span={24}>
              <Title level={5} className="mb-0 c-default">
                {item.subheader}
              </Title>
            </Col>
          )}
          <FormGroup item={item} control={control} errors={errors} />
        </Fragment>
      ))}
      <Col span={24}>
        <Title level={4} className="mb-0">
          Spouse Details
        </Title>
      </Col>
      <Col span={6}>
        <SelectField
          fieldname="spouse_salutation"
          label="Title"
          control={control}
          class="mb-0"
          selectOption={[
            { value: 'Mr', label: 'Mr' },
            { value: 'Miss', label: 'Miss' },
          ]}
        />
      </Col>
      <Col span={18}>
        <InputField
          fieldname="spouse_name"
          label="Name as per IC/Passport"
          control={control}
          class="mb-0"
          iProps={{ placeholder: '', size: 'large' }}
        />
      </Col>
      {spouseDetails().map((item, index) => (
        <Fragment key={index}>
          {item?.subheader && (
            <Col span={24}>
              <Title level={5} className="mb-0 c-default">
                {item.subheader}
              </Title>
            </Col>
          )}
          {item?.type == 'switch' ? (
            <Col span={24}>
              <Row gutter={24} justify="space-between">
                <Col span={12}>{item.label}</Col>
                <Col span={3} offset={4}>
                  <FormGroup item={item} control={control} errors={errors} />
                </Col>
              </Row>
            </Col>
          ) : (
            <FormGroup item={item} control={control} errors={errors} />
          )}
        </Fragment>
      ))}
      <Col span={24}>
        <Title level={4} className="mb-0">
          Children Details
        </Title>
      </Col>
      {childrenDetail().map((item, idx) => (
        <Fragment key={idx}>
          {item?.subheader && (
            <Col span={24}>
              <Title level={5} className="mb-0 c-default">
                {item.subheader}
              </Title>
            </Col>
          )}
          {item.type == 'array' ? (
            <Col span={24}>
              {fileds1.map((elem, index) => (
                <Card className="border-card" key={elem.id}>
                  <Row gutter={[20, 20]}>
                    {item.child.map((x, i) => (
                      <Fragment key={i}>
                        {x?.subheader && (
                          <Col span={24}>
                            <Row gutter={20}>
                              <Col flex={'auto'}>
                                <Title level={5} className="mb-0 c-default">{`${index + 1} ${x.subheader} `}</Title>
                              </Col>

                              <Col flex="80px">
                                <Button
                                  type="link"
                                  htmlType="button"
                                  className="p-0 h-auto c-gray-linkbtn"
                                  onClick={() => childRemove(index)}
                                >
                                  Remove
                                </Button>
                              </Col>
                            </Row>
                          </Col>
                        )}

                        <FormGroup elem={elem} index={index} parent={item} item={x} control={control} errors={errors} />
                      </Fragment>
                    ))}
                  </Row>
                </Card>
              ))}

              <Button htmlType="button" type="dashed" size="large" className="w-100" onClick={() => childAppend(initQ)}>
                + Add children
              </Button>
            </Col>
          ) : (
            <FormGroup static={true} item={item} control={control} errors={errors} />
          )}
        </Fragment>
      ))}
      <Col span={24}>
        <Title level={4} className="mb-0">
          Emergency Details
        </Title>
      </Col>
      <Col span={6}>
        <SelectField
          fieldname="emergency_salutation"
          label="Title"
          control={control}
          class="mb-0"
          selectOption={[
            { value: 'Mr', label: 'Mr' },
            { value: 'Miss', label: 'Miss' },
          ]}
        />
      </Col>
      <Col span={18}>
        <InputField
          fieldname="emergency_contact"
          label="Name as per IC/Passport"
          control={control}
          class="mb-0"
          iProps={{ placeholder: '', size: 'large' }}
        />
      </Col>
      {emergencyDetail().map((item, index) => (
        <Fragment key={index}>
          {item?.subheader && (
            <Col span={24}>
              <Title level={5} className="mb-0 c-default">
                {item.subheader}
              </Title>
            </Col>
          )}
          <FormGroup item={item} control={control} errors={errors} />
        </Fragment>
      ))}
      {/* {emergencyDetail().map((item, idx) => (
        <Fragment key={idx}>
          {item?.subheader && (
            <Col span={24}>
              <Title level={5} className="mb-0 c-default">
                {item.subheader}
              </Title>
            </Col>
          )}
          
          {item.type == 'array' ? (
            <Col span={24}>
              {fields2.map((elem, index) => (
                <Card className="border-card" key={elem.id}>
                  <Row gutter={[20, 20]}>
                    {item.child.map((x, i) => (
                      <Fragment key={i}>
                        {x?.subheader && (
                          <Col span={24}>
                            <Row gutter={20}>
                              <Col flex={'auto'}>
                                <Title level={5} className="mb-0 c-default">{`${index + 1} ${x.subheader} `}</Title>
                              </Col>

                              <Col flex="80px">
                                <Button
                                  type="link"
                                  htmlType="button"
                                  className="p-0 h-auto c-gray-linkbtn"
                                  onClick={() => emergencyRemove(index)}
                                >
                                  Remove
                                </Button>
                              </Col>
                            </Row>
                          </Col>
                        )}
                        <FormGroup elem={elem} index={index} parent={item} item={x} control={control} errors={errors} />
                      </Fragment>
                    ))}
                  </Row>
                </Card>
              ))}

              <Button
                htmlType="button"
                type="dashed"
                size="large"
                className="w-100"
                onClick={() => emergencyAppend(initQ)}
              >
                + Add other emergency detail
              </Button>
            </Col>
          ) : (
            <FormGroup static={true} item={item} control={control} errors={errors} />
          )}
        </Fragment>
      ))} */}
      <Col span={24}>
        <Title level={4} className="mb-0">
          Education Level
        </Title>
      </Col>
      {educationLevel().map((item, idx) => (
        <Fragment key={idx}>
          {item?.subheader && (
            <Col span={24}>
              <Title level={5} className="mb-0 c-default">
                {item.subheader}
              </Title>
            </Col>
          )}
          {item.type == 'array' ? (
            <Col span={24}>
              {fields3.map((elem, index) => (
                <Card className="border-card" key={elem.id}>
                  <Row gutter={[20, 20]}>
                    {item.child.map((x, i) => (
                      <Fragment key={i}>
                        {x?.subheader && (
                          <Col span={24}>
                            <Row gutter={20}>
                              <Col flex={'auto'}>
                                <Title level={5} className="mb-0 c-default">{`${index + 1} ${x.subheader} `}</Title>
                              </Col>

                              <Col flex="80px">
                                <Button
                                  type="link"
                                  htmlType="button"
                                  className="p-0 h-auto c-gray-linkbtn"
                                  onClick={() => educationRemove(index)}
                                >
                                  Remove
                                </Button>
                              </Col>
                            </Row>
                          </Col>
                        )}
                        <FormGroup index={index} parent={item} item={x} control={control} errors={errors} />
                      </Fragment>
                    ))}
                  </Row>
                </Card>
              ))}

              <Button
                htmlType="button"
                type="dashed"
                size="large"
                className="w-100"
                onClick={() => educationAppend(initQ)}
              >
                + Add other education level
              </Button>
            </Col>
          ) : (
            <FormGroup static={true} item={item} control={control} errors={errors} />
          )}
        </Fragment>
      ))}
      <Col span={24}>
        <Title level={4} className="mb-0">
          Work Experience
        </Title>
      </Col>
      {workExperience().map((item, idx) => (
        <Fragment key={idx}>
          {item?.subheader && (
            <Col span={24}>
              <Title level={5} className="mb-0 c-default">
                {item.subheader}
              </Title>
            </Col>
          )}
          {item.type == 'array' ? (
            <Col span={24}>
              {fields4.map((elem, index) => (
                <Card className="border-card" key={elem.id}>
                  <Row gutter={[20, 20]}>
                    {item.child.map((x, i) => (
                      <Fragment key={i}>
                        {x?.subheader && (
                          <Col span={24}>
                            <Row gutter={20}>
                              <Col flex={'auto'}>
                                <Title level={5} className="mb-0 c-default">{`${index + 1} ${x.subheader} `}</Title>
                              </Col>

                              <Col flex="80px">
                                <Button
                                  type="link"
                                  htmlType="button"
                                  className="p-0 h-auto c-gray-linkbtn"
                                  onClick={() => workRemove(index)}
                                >
                                  Remove
                                </Button>
                              </Col>
                            </Row>
                          </Col>
                        )}
                        <FormGroup elem={elem} index={index} parent={item} item={x} control={control} errors={errors} />
                      </Fragment>
                    ))}
                  </Row>
                </Card>
              ))}

              <Button htmlType="button" type="dashed" size="large" className="w-100" onClick={() => workAppend(initQ)}>
                + Add other work experience
              </Button>
            </Col>
          ) : (
            <FormGroup static={true} item={item} control={control} errors={errors} />
          )}
        </Fragment>
      ))}
    </Row>
  );
};

export default Personal;
