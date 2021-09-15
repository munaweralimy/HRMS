import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, Typography, Button, Form, message } from 'antd';
import FormGroup from '../../../../../../../molecules/FormGroup';
import { useForm, useFieldArray } from 'react-hook-form';
import { titleList } from '../../../../../../../../configs/constantData';
import { getCountry, getRace, getReligion, getMarital, getGender } from '../../../../../../Application/ducks/actions';
import { useSelector, useDispatch } from 'react-redux';
import ArrayForm from './ArrayForm';

const { Title } = Typography;
const identificationList = [
  {label: 'MyKad / MyPR', value: 'MyKad / MyPR'}
]

export default (props) => {

  const { mode, data, updateApi, id, setLoad } = props;
  const dispatch = useDispatch();
  const { control, errors, setValue, handleSubmit } = useForm();
  const genderList = useSelector(state => state.global.genderData);
  const raceList = useSelector(state => state.global.raceData);
  const maritalList = useSelector(state => state.global.maritalData);
  const religionList = useSelector(state => state.global.religionData);
  const countryList = useSelector(state => state.global.countryData);

  useEffect(() => {
    dispatch(getCountry());
    dispatch(getRace());
    dispatch(getReligion());
    dispatch(getMarital());
    dispatch(getGender());
  }, []);

  const { fields: fieldsP, append: appendP, remove: removeP,
  } = useFieldArray({
    control,
    name: 'phone_nos',
  });

  const { fields: fieldsE, append: appendE, remove: removeE,
  } = useFieldArray({
    control,
    name: 'emails',
  });
  
  

  useEffect(() => {
    if (mode == 'edit' && data && Object.keys(data).length > 0) {
    } 
  }, [data]);

  const initE = { email: '' }
  const initP = { phone: '' }

  const personalFields = [
    {
      type: 'select',
      label: 'Title',
      name: 'salutation',
      twocol: false,
      colWidth: '0 1 150px',
      options: titleList,
      req: true,
      reqmessage: 'required',
    },
    {
      type: 'input',
      label: 'Name as per IC/Passport',
      name: 'first_name',
      twocol: false,
      colWidth: '1 0 auto',
      req: true,
      reqmessage: 'Please enter name',
    },
    {
      type: 'upload',
      name: 'image',
      label: 'Profile Picture',
      placeholder: 'Upload',
      twocol: false,
      colWidth: '1 0 100%',
      req: false,
    },
    {
      type: 'select',
      label: 'Gender',
      name: 'gender',
      twocol: true,
      options: genderList?.map(x => ({label: x.name, value: x.name})),
      req: true,
      reqmessage: 'required',
    },
    {
      type: 'select',
      label: 'Marital Status',
      name: 'marital_status',
      twocol: true,
      options: maritalList?.map(x => ({label: x.name, value: x.name})),
      req: true,
      reqmessage: 'required',
    },
    {
      type: 'select',
      label: 'Nationality',
      name: 'nationality',
      twocol: true,
      options: countryList?.map(x => ({label: x.name, value: x.name})),
      req: true,
      reqmessage: 'required',
    },
    {
      type: 'select',
      label: 'Identification Type',
      name: 'identification_type',
      twocol: true,
      options: identificationList,
      req: false,
    },
    {
      type: 'input',
      label: 'Identification No.',
      name: 'identification_no',
      twocol: true,
      req: false,
    },
    {
      type: 'date',
      label: 'Date of Birth',
      name: 'date_of_birth',
      twocol: true,
      req: true,
      reqmessage: 'Required',
    },
    {
      type: 'select',
      label: 'Race',
      name: 'race',
      twocol: true,
      options: raceList?.map(x => ({label: x.name, value: x.name})),
      req: false,
    },
    {
      type: 'select',
      label: 'Religion',
      name: 'religious',
      twocol: true,
      options: religionList?.map(x => ({label: x.name, value: x.name})),
      req: false,
    },
    {
      subheader: 'Contact Details',
      type: 'array',
      name: 'phone_nos',
      twocol: true,
      field: fieldsP,
      remov: removeP,
      adding: () => appendP(initP),
      appendText:'+ Add phone no.',
      single: true,
      child : [
          {
              type: 'input',
              name: 'phone',
              label: 'Phone No.',
              req: false,
              number: true,
              colWidth: '1 0 100%',
              twocol: false,
          },
      ]
    },
    {
      type: 'array',
      name: 'emails',
      twocol: true,
      field: fieldsE,
      remov: removeE,
      adding: () => appendE(initE),
      appendText:'+ Add email',
      single: true,
      child : [
          {
              type: 'input',
              name: 'email',
              label: 'Email',
              req: false,
              colWidth: '1 0 100%',
              twocol: false,
          },
      ]
    },
  ];
  
  const onFinish = async (val) => {
    console.log('val', val);
  }

  return (
    <Form layout='vertical' onFinish={handleSubmit(onFinish)}>
    <Row gutter={[24, 30]} align="bottom">
      <Col span={24}><Title level={4} className="mb-0 c-default">Personal Information</Title></Col>
      {personalFields.map((item, idx) => (
        <Fragment key={idx}>
          {item?.subheader && 
          <Col span={24}><Title level={5} className='mb-0 c-default'>{item.subheader}</Title></Col>}
          {item.type == 'array' ?
            <Col span={item.twocol ? 12 : 24}>
              <Row gutter={[20, 30]}>
                <Col span={24}>
                  <ArrayForm fields={item.field} remove={item.remov} item={item} control={control} errors={errors} />
                </Col>
                <Col span={24}>
                  <Button htmlType="button" type="dashed" size="large" className="w-100" onClick={item.adding}>
                    {item.appendText}
                  </Button>
                </Col>
              </Row>
            </Col>
          : <FormGroup static={true} item={item} control={control} errors={errors} />
          }
        </Fragment>
      ))}
      {/* <Col span={6}>
        <SelectField
          fieldname="salutation"
          label="Title"
          control={control}
          class="mb-0"
          selectOption={}
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
      ))} */}
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
      {/* <Col span={24}>
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
      ))} */}
    </Row>
    </Form>
  );
};