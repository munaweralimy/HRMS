import React, {useState, useEffect} from 'react';
import {Row, Col, Card, Typography, Form, message, Menu, Breadcrumb, Space } from 'antd';
import HeadingChip from '../../../../molecules/HeadingChip';
import { useTranslate } from 'Translate';
import { useForm } from 'react-hook-form';
import { PhoneIcon, MailIcon } from '../../../../atoms/CustomIcons';
import Information from '../AddApplication/Information';
import { getApplicationDetial } from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { ClockCircleFilled } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { apiMethod, apiresource } from '../../../../../configs/constants';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import SideDetails from '../../../../molecules/SideDetails';
import SideDetailResponsive from '../../../../molecules/SideDetailResponsive';
import { BreakingPoint } from '../../../../../configs/constantData';
import { useMediaQuery } from 'react-responsive';
import ApplicationStatus from '../../../../molecules/ApplicationStatus';
import AssessmentCard from '../../../../atoms/AssessmentCard';
import NotifyDeartment from '../../../../molecules/NotifyDeartment';
import { Popup } from '../../../../atoms/Popup';
import StatusCardTemp from '../../../../atoms/StatusCardTemp';
import CardStepAccordian from '../../../../molecules/CardStepAccordian';

const { Title, Text } = Typography;
  
  const menu = (
    <Menu>
      <Menu.Item>
        <Space size={4}>
          <ClockCircleFilled /> 
          <Text>Move to earlier stage</Text>
        </Space>
      </Menu.Item>
      <Menu.Item>
        <Space size={4}>
          <ClockCircleFilled />
        < Text>Archive application</Text>
        </Space>
      </Menu.Item>
    </Menu>
  );

  export default (props) => {

    const { id } = useParams()
    let location = useLocation();
    const url = location.pathname;
    const dispatch = useDispatch();
    const history = useHistory();
    const [visible, setVisible] = useState(false);
    const { control, errors, setValue, handleSubmit } = useForm();
    const [ tags, setTags ] = useState([])
    const appDetalData = useSelector(state => state.marketing.appDetailData);
    const i18n = useTranslate();
    const { t } = i18n;
    const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });
    let name = url.split('/')[3];
    
    const sideData = [
      {
          type:'image',
          imgurl:'',
          size: 120,
          highlight: true,
      },
      {
          type:'tag',
          title:'Application',
          noDivider: true,
          highlight: true,
      },
      {
          type:'mainTitle',
          title: appDetalData?.applicant_name,
          subtitle: appDetalData?.name,
          highlight: true,
      },
      {
          type:'single',
          title: appDetalData?.nationality,
          highlight: true,
          noLine: true,
      },
      {
          type:'titleValue',
          title: 'Counselor',
          value: appDetalData?.counsellor
      },
      {
          type:'titleValue',
          title: 'Application Date',
          value: appDetalData?.creation ? moment(appDetalData?.creation).format('Do MMMM YYYY') : '' ,
          noDivider: true
      },
  ]

  const bottomList = [
      {
          icon: <PhoneIcon />,
          text: appDetalData?.contact_no
      },
      {
          icon: <MailIcon />,
          text: appDetalData?.email
      },
  ]

  const visaSteps = [
    {
      title: 'Registration Fee',
      cards: [
        {
          status: 'pending',
          title: 'Pending Registration Fee',
          text: 'Please contact the applicant to make the payment through Student Application Portal',
          date: appDetalData.modified,
        },
        {
          status: 'done',
          title: 'Payment Varification',
          text: 'Pending payment completion',
        },
        {
          status: '',
          title: 'Offer Letter Release',
          text: 'Pending payment varification',
        }
      ]
    },
    {
      title: 'Visa Processing Fee',
      cards: [
        {
          status: '',
          title: 'Visa Processing Fee',
          text: 'Pending Offer Letter Release',
        },
        {
          status: '',
          title: 'Payment Varification',
          text: 'Pending payment completion',
        },
        {
          status: '',
          title: 'VAL Release',
          text: 'Pending payment completion',
        }
      ]
    },
  ];

  const enrolledSteps = [
    {
      title: 'Medical Checkup',
      cards: [
        {
          status: 'pending',
          title: 'Pending Medical Checkup',
          text: 'Please contact the applicant to make the payment through Student Application Portal',
          date: appDetalData.modified,
        },
        {
          status: '',
          title: 'Medical Checkup Verfication',
          text: 'Pending document upload',
        },
      ]
    },
    {
      title: 'Visa Sticker',
      cards: [
        {
          status: '',
          title: 'Pending Visa',
          text: 'Pending visa from applicant',
        },
        {
          status: '',
          title: 'Visa Sticker Approval',
          text: 'Pending visa from applicant',
        },
        {
          status: '',
          title: 'Visa Sticker Collection',
          text: 'Pending visa collection',
        }
      ]
    },
    {
      title: 'Tution Fee',
      cards: [
        {
          status: '',
          title: 'Tution Fee',
          text: 'Pending payment collection',
        },
        {
          status: '',
          title: 'Payment Verification',
          text: 'Pending payment collection',
        },
      ]
    },
    {
      title: 'Module Registration',
      cards: [
        {
          status: '',
          title: 'Module Registration',
          text: 'Pending registration',
        },
      ]
    },
  ];

    useEffect(() => {
        dispatch(getApplicationDetial(id));
    }, []);

    const popup = {
      closable: false,
      visibility: visible,
      class: 'black-modal',
      content: <NotifyDeartment
          title='Notify Department'x
          onClose={() => setVisible(false)}
      />,
      width: 536,
      onCancel: () => setVisible(false),
    };

    useEffect(() => {
        if (Object.keys(appDetalData).length > 0) {
            setValue('applicant_name', appDetalData.applicant_name);
            setValue('applicant_name', appDetalData.applicant_name);
            setValue('icpassport', appDetalData.icpassport);
            setValue('contact_no', appDetalData.contact_no);
            setValue('email', appDetalData.email);
            setValue('emergency_contact_name', appDetalData.emergency_contact_name);
            setValue('emergency_contact_email', appDetalData.emergency_contact_email);
            setValue('emergency_contact_number', appDetalData.emergency_contact_number);
            setValue('score', appDetalData.score);
            setValue('place_of_birth', appDetalData?.place_of_birth);

            setValue('current_address_1', appDetalData?.address[0]?.current_address_1);
            setValue('current_city', appDetalData?.address[0]?.current_city);
            setValue('current_post_code', appDetalData?.address[0]?.current_post_code);
            setValue('permanent_state', appDetalData?.address[0]?.permanent_state);
            
            setValue('current_address_2', appDetalData?.address[1]?.current_address_1);
            setValue('current_city2', appDetalData?.address[1]?.current_city);
            setValue('current_post_code2', appDetalData?.address[1]?.current_post_code);
            setValue('permanent_state2', appDetalData?.address[1]?.permanent_state);

            
            if(appDetalData?.date_of_birth) {
                setValue('date_of_birth', moment(appDetalData?.date_of_birth,'DD-MM-YYYY'));
            }
            if(appDetalData?.passport_expiry) {
                setValue('passport_expiry', moment(appDetalData?.passport_expiry,'DD-MM-YYYY'));
            }
            
            if(appDetalData?.english_language_qualification) {
              setValue('english_language_qualification', {
                value: appDetalData?.english_language_qualification,
                label: appDetalData?.english_language_qualification,
              });
            }

            if(appDetalData?.type) {
              setValue('type', {
                value: appDetalData?.type,
                label: appDetalData?.type,
              });
            }

            if(appDetalData?.third_pref) {
              setValue('third_pref', {
                value: appDetalData?.third_pref,
                label: appDetalData?.third_pref,
              });
            }

            if(appDetalData?.second_pref) {
              setValue('second_pref', {
                value: appDetalData?.second_pref,
                label: appDetalData?.second_pref,
              });
            }
            
            if(appDetalData?.first_pref) {
              setValue('first_pref', {
                value: appDetalData?.first_pref,
                label: appDetalData?.first_pref,
              });
            }

            if(appDetalData?.race) {
              setValue('race', {
                value: appDetalData?.race,
                label: appDetalData?.race,
              });
            }

            if(appDetalData?.nationality) {
              setValue('nationality', {
                value: appDetalData?.nationality,
                label: appDetalData?.nationality,
              });
            }

            if(appDetalData?.gender) {
              setValue('gender', {
                value: appDetalData?.gender,
                label: appDetalData?.gender,
              });
            }

            if(appDetalData?.marital_satus) {
              setValue('marital_satus', {
                value: appDetalData?.marital_satus,
                label: appDetalData?.marital_satus,
              });
            }

            if(appDetalData?.address[0]?.current_country) {
              setValue('current_country', {
                value: appDetalData?.address[0]?.current_country,
                label: appDetalData?.address[0]?.current_country,
              });
            }

            if(appDetalData?.address[1]?.current_country) {
              setValue('current_country2', {
                value: appDetalData?.address[1]?.current_country,
                label: appDetalData?.address[1]?.current_country,
              });
            }
        }
    }, [appDetalData])

    const onFinish = async (value) => {
      console.log('value', value)
      props.setLoading(true);
      
      const appName = appDetalData?.name;

      let certificateIMG = '';
      let AcademicTranscript = '';
      let AcademicCertificate = '';
      let passportbg = '';
      let passportscanned = '';

      if (value.certificate) {
          let modifiedName = uniquiFileName(value.certificate?.file?.originFileObj.name)
          let res = await getSingleUpload(modifiedName, 'image',  value.certificate?.file?.originFileObj, 'Application', appName);
          certificateIMG = res?.file_url;
      }

      if (value.academic_certificate) {
          let modifiedName = uniquiFileName(value.academic_certificate?.file?.originFileObj.name)
          let res = await getSingleUpload(modifiedName, 'image',  value.academic_certificate?.file?.originFileObj, 'Application', appName);
          AcademicCertificate = res?.file_url;
      }

      if (value.academic_transcript) {
          let modifiedName = uniquiFileName(value.academic_transcript?.file?.originFileObj.name)
          let res = await getSingleUpload(modifiedName, 'image',  value.academic_transcript?.file?.originFileObj, 'Application', appName);
          AcademicTranscript = res?.file_url;
      }

      if (value.attached_document_bg) {
          let modifiedName = uniquiFileName(value.attached_document_bg?.file?.originFileObj.name)
          let res = await getSingleUpload(modifiedName, 'image',  value.attached_document_bg?.file?.originFileObj, 'Application', appName);
          passportbg = res?.file_url;
      }

      if (value.attached_document_scanned) {
          let modifiedName = uniquiFileName(value.attached_document_scanned?.file?.originFileObj.name)
          let res = await getSingleUpload(modifiedName, 'image',  value.attached_document_scanned?.file?.originFileObj, 'Application', appName);
          passportscanned = res?.file_url;
      }        

      const payLoad = {
          type: value?.type?.value,
          applicant_name: value?.applicant_name,
          icpassport: value?.icpassport,
          contact_no: value?.contact_no,
          email: value?.email,
          emergency_contact_name: value?.emergency_contact_name,
          emergency_contact_email: value?.emergency_contact_email,
          emergency_contact_number: value?.emergency_contact_number,
          english_language_qualification: value?.english_language_qualification?.value,
          score: value?.score,
          certificate: certificateIMG,
          race: value?.race?.value,
          marital_satus: value?.marital_satus?.value,
          gender: value?.gender?.value,
          religion: '',
          age_joined: '',
          //date_of_birth: value?.date_of_birth,
          nationality: value?.nationality?.value,
          place_of_birth: value?.place_of_birth,
          //passport_expiry: value?.passport_expiry,                    
          remarks: '',
          find_us: 'Social network',
          first_pref: value?.first_pref?.value,
          second_pref: value?.second_pref?.value,
          third_pref: value?.third_pref?.value,
          intake: '',
          documents: [
              {
                  attached_document: passportbg
              },
              {
                  attached_document: passportscanned
              }
          ],
          education: [
              {
                  education_name: value?.education_name?.value,
                  country: value?.country?.value,
                  academic_certificate: AcademicCertificate,
                  academic_transcript: AcademicTranscript
              },
          ],
          address: [
            {
              current_address_1: value?.current_address_1,
              current_post_code: value?.current_post_code,
              current_city: value?.current_city,
              current_country: value?.current_country?.value,
              permanent_state: value?.permanent_state,
            },
            {
                current_address_1: value?.permenent_address ? value?.current_address_1 : value?.current_address_2,
                current_post_code: value?.permenent_address ? value?.current_post_code : value?.current_post_code2,
                current_city: value?.permenent_address ? value?.current_city : value?.current_city2,
                current_country: value?.permenent_address ? value?.current_country?.value : value?.current_country2?.value,
                permanent_state: value?.permenent_address ? value?.permanent_state : value?.permanent_state2,
            },
          ],
          
      }

      try {
          const url = `${apiresource}/Application/${id}`;
          await axios.put(url, payLoad);
          props.setLoading(false);
          message.success('Application Successfully Created');
          reset();
          setTimeout(() => history.push('/marketing/applications'), 1000);
      } catch (e) {
          const {response} = e;
          props.setLoading(false);
          message.error(response); 
      }
    }

    const onNotify = (name) => {
      setVisible(true);
    }

    const props1 = {
      title: 'Incomplete Documents',
      appStage: '1',
      stage: 0,
      type: 'app',
      noTitle: false,
      component: <Text className='card-text'>Please complete the application form below to proceed to the next stage.</Text>
    }
    const props2 = {
      title: 'Eligibility Assessments',
      appStage: '2',
      stage: 1,
      type: 'app',
      noTitle: false,
      component: <AssessmentCard status='pending' reason='Hello World' data={appDetalData.modified} btnTitle='Notify Department' title='' title2={appDetalData?.status == 'done' ? 'Completed Assessment' : 'Pending Assessment'} title3='Elgibility Team' action={() => onNotify(appDetalData.name)} />
    }
    const props3 = {
      title: 'Pending Registration & Visa',
      appStage: '3',
      stage: 2,
      type: 'app',
      noTitle: false,
      component: <CardStepAccordian data={visaSteps} page={true} />
    }
    const props4 = {
      title: 'Pending Accommodations',
      appStage: '4',
      stage: 3,
      type: 'app',
      noTitle: false,
      component: <StatusCardTemp 
      page={true}
      mainTitle='Arrival & Accommodation'
      title='Arrival Form' 
      text='Please contact the applicant to fill up the form in the Student Application Portal' 
      status='done'
      data={appDetalData.modified}
      title2='Accommodation Form' 
      text2='Please contact the applicant to fill up the form in the Student Application Portal' 
      status2='pending'
      data2={appDetalData.modified}
    />
    }
    const props5 = {
      title: 'Pending Enrolment',
      appStage: '5',
      stage: 4,
      type: 'app',
      noTitle: false,
      component: <CardStepAccordian data={enrolledSteps} page={true} />
    }

    const checkCase = () => {
      switch(name) {
        case 'incomplete-documents': return props1;
        case 'eligibility-assessments': return props2;
        case 'pending-registration-visa': return props3;
        case 'pending-accommodations': return props4;
        case 'pending-enrolment': return props5;
      }
    }

    return (
        <>
          <Breadcrumb separator=">" className="mb-1">
            <Breadcrumb.Item href="/marketing/applications">Applications</Breadcrumb.Item>
              <Breadcrumb.Item href={`/marketing/applications/${name}`} className='SentanceCase'>{name.replace('-', ' ')}</Breadcrumb.Item>
            <Breadcrumb.Item>Application Details</Breadcrumb.Item>
          </Breadcrumb>
          <Row gutter={[20, 30]}>
            <Col span={24}>
                <HeadingChip title="Application Details"  />
            </Col>
            <Col span={24}>
              <div className='twocol-3070'>
                <div className='side-detail'>
                    {isHDScreen ?
                    <SideDetails data={sideData} type='info' bottom={bottomList} />
                    :
                    <SideDetailResponsive data={sideData} type='info' bottom={bottomList} />
                    }
                </div>
                <div className='side-form'>
                    <Card bordered={false} className={`transparent-card ${isHDScreen ? 'scrolling-card' : ''}`}>
        
                      <Row gutter={[20,20]}>
                        <Col span={24}>
                          <ApplicationStatus {...checkCase()} menu={menu} />
                        </Col>
                        <Col span={24}>
                          <Form 
                            onFinish={handleSubmit(onFinish)} 
                            layout="vertical" 
                            scrollToFirstError={true}
                          >
                            <Information 
                              control={control} 
                              errors={errors}
                              tags={tags}
                              setTags={setTags}
                              mode='add'
                              t={t}
                            />
                          </Form>
                        </Col>
                    </Row>
                    </Card>
                    </div>
                  </div>
                </Col>
            </Row>
            <Popup {...popup} />
        </>
    )
}