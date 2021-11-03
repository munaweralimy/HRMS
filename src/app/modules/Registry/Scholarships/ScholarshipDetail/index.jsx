import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Breadcrumb, message } from 'antd';
import { useTranslate } from 'Translate';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HeadingChip from '../../../../molecules/HeadingChip';
import ScholarshipForm from '../components/ScholarshipForm';
import { useForm } from 'react-hook-form';
import ActivationCard from '../../../../atoms/ActivationCard';
import OutstandingList from '../../../../molecules/OutstandingList';
import StudentsListCard from '../../../../molecules/StudentsListCard';
import {
  getOutstandingPaymentList,
  getTotalOutstandingPayment,
  getStudentsList,
  getSingleScholorshipData,
} from '../ducks/actions';
import { apiMethod, apiresource } from '../../../../../configs/constants';
import axios from '../../../../../services/axiosInterceptor';
import { Popup } from '../../../../atoms/Popup';
import DeletePopup from '../../../../molecules/DeletePopup';
import { getComments, emptyComments } from '../../../Application/ducks/actions';
import UpdateSection from '../../../../molecules/UpdateSection';
import moment from 'moment';
import SideDetails from '../../../../molecules/SideDetails';
import SideDetailResponsive from '../../../../molecules/SideDetailResponsive';
import { BreakingPoint } from '../../../../../configs/constantData';
import { useMediaQuery } from 'react-responsive';

const StudentCol = [
  {
    title: 'Code',
    dataIndex: 'student_id',
    key: 'student_id',
    sorter: (a, b) => a.student_id.length - b.student_id.length,
  },
  {
    title: 'Name',
    dataIndex: 'student_name',
    key: 'student_name',
    sorter: (a, b) => a.student_name.length - b.student_name.length,
  },
  {
    title: 'Faculty',
    dataIndex: 'faculty_code',
    key: 'faculty_code',
    sorter: (a, b) => a.faculty_code - b.faculty_code,
  },
  {
    title: 'Programme',
    dataIndex: 'program_name',
    key: 'program_name',
    sorter: (a, b) => a.program_name - b.program_name,
    width: 180,
  },
  {
    title: 'Scheme',
    dataIndex: 'student_scheme',
    key: 'student_scheme',
    sorter: (a, b) => a.student_scheme - b.student_scheme,
  },
  {
    title: 'Status',
    dataIndex: 'scholarship_status',
    key: 'scholarship_status',
    align: 'right',
    render: (text) => {
      let clname = '';
      if (text == 'Active') {
        clname = 'c-success';
      } else if (text == 'Outstanding') {
        clname = 'c-error';
      }
      return <span className={`SentanceCase ${clname}`}>{text}</span>;
    },
  },
];

const OutstandingCol = [
  {
    title: 'Code',
    dataIndex: 'student_id',
    key: 'student_id',
    sorter: (a, b) => a.student_id.length - b.student_id.length,
  },
  {
    title: 'Name',
    dataIndex: 'student_name',
    key: 'student_name',
    sorter: (a, b) => a.student_name.length - b.student_name.length,
  },
  {
    title: 'Faculty',
    dataIndex: 'faculty_code',
    key: 'faculty_code',
    sorter: (a, b) => a.faculty_code - b.faculty_code,
  },
  {
    title: 'Programme',
    dataIndex: 'program_name',
    key: 'program_name',
    sorter: (a, b) => a.program_name - b.program_name,
    width: 180,
  },
  {
    title: 'Scheme',
    dataIndex: 'student_scheme',
    key: 'student_scheme',
    sorter: (a, b) => a.student_scheme - b.student_scheme,
  },
  {
    title: 'Amount',
    dataIndex: 'outstanding',
    key: 'outstanding',
    sorter: (a, b) => a.outstanding - b.outstanding,
    render: (text) => <span className="c-error">{text}</span>,
  },
];

export default (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const i18n = useTranslate();
  const { t } = i18n;
  const { id } = useParams();
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState('Active');
  const [deleted, setDeleted] = useState([]);
  const { control, errors, setValue, handleSubmit } = useForm();
  const outstandingPaymentData = useSelector((state) => state.scholarship.outstandingPayment);
  const outstandingTotalPaymentData = useSelector((state) => state.scholarship.outstandingTotalPayment);
  const studentListData = useSelector((state) => state.scholarship.studentList);
  const scholorshipSingleData = useSelector((state) => state.scholarship.scholorshipSingleData);
  const commentsApi = useSelector((state) => state.global.comments);
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });

  const sideData = [
    {
      type: 'code',
      text: 'Scholarship',
      title: scholorshipSingleData?.scholarship_name,
      highlight: true,
    },
    {
      type: 'reversetitleValue',
      title: 'Schemes',
      level1: isHDScreen ? 3 : 4,
      level2: isHDScreen ? 4 : 5,
      value: scholorshipSingleData?.total_schemes,
    },
    {
      type: 'reversetitleValue',
      title: 'Active Students',
      level1: isHDScreen ? 3 : 4,
      level2: isHDScreen ? 4 : 5,
      value: scholorshipSingleData?.total_students,
    },
    {
      type: 'titleValue',
      title: 'Created',
      space: isHDScreen ? 10 : 4,
      level: isHDScreen ? 4 : 5,
      value: scholorshipSingleData?.created ? moment(scholorshipSingleData?.created).format('Do MMMM YYYY') : '',
      noDivider: true,
      highlight: true,
      noLine: true
    },
  ];

  const bottomList = [
    {
      title: 'Delete Scholarship',
      type: 'button',
      class: 'black-btn',
      action: () => setVisible(true),
    },
  ];

  const popup = {
    closable: false,
    visibility: visible,
    class: 'black-modal',
    content: <DeletePopup title="Faculty" onClose={() => setVisible(false)} onDelete={() => onDelete()} />,
    width: 536,
    onCancel: () => setVisible(false),
  };

  const onDelete = async () => {
    let url = `${apiresource}/Scholarship/${id}`;
    try {
      await axios.delete(url);
      message.success('Scholorship Successfully Deleted');
      setVisible(false);
      setTimeout(() => history.push('/registry/scholarships'), 1000);
    } catch (e) {
      const { response } = e;
      message.error(e);
    }
  };

    useEffect(() => {
        dispatch(getOutstandingPaymentList(id));
        dispatch(getTotalOutstandingPayment(id));
        dispatch(getStudentsList(id));
        dispatch(getSingleScholorshipData(id));
        dispatch(getComments('Scholarship', `${id}`));
        return () => {dispatch(emptyComments())}        
    }, []);

  useEffect(() => {
    if (Object.keys(scholorshipSingleData).length > 0) {
      setValue('scholarship_code', scholorshipSingleData?.scholarship_code);
      setValue('scholarship_name', scholorshipSingleData?.scholarship_name);
      setValue('contact_person', scholorshipSingleData?.contact_person);
      setValue('address', scholorshipSingleData?.address);
      setValue('state', scholorshipSingleData?.state);
      setValue('postcode', scholorshipSingleData?.postcode);
      setValue('city', scholorshipSingleData?.city);
      setValue('email', scholorshipSingleData?.email);
      setValue('contact_number', scholorshipSingleData?.contact_number);
      if (scholorshipSingleData?.schemes) {
        setValue('schemes_structure', scholorshipSingleData?.schemes);
      }

      if (scholorshipSingleData?.country) {
        setValue('country', {
          value: scholorshipSingleData?.country,
          label: scholorshipSingleData?.country,
        });
      }
    }
    console.log('scholorshipSingleData?.schemes', scholorshipSingleData?.schemes);
  }, [scholorshipSingleData]);

  const onFinish = async (val) => {
    console.log('deleted', deleted);

    let schemes_array = [];
    val?.schemes_structure?.map((resp) => {
      schemes_array.push({
        scheme_name: resp?.scheme_name,
        scholarship_type: resp?.scholarship_type?.value,
        food_allowances: resp?.food_allowances,
        study_allowances: resp?.study_allowances,
        transport_allowances: resp?.transport_allowances,
        name: resp?.name,
      });
    });

    const payload = {
      scholarship_scheme_list: {
        name: id,
        scholarship_code: val?.scholarship_code,
        scholarship_name: val?.scholarship_name,
        contact_person: val?.contact_person,
        address: val?.address,
        state: val?.state,
        postcode: val?.postcode,
        country: val?.country?.value,
        city: val?.city,
        email: val?.email,
        contact_number: val?.contact_number,
        status: status,
        schemes: schemes_array,
        name: scholorshipSingleData?.name,
        scholarship_student_list: [],
      },
      delete_scheme: [],
    };

    console.log('payload', payload);
    let url = `${apiMethod}/registry.api.scholarship_add_scheme`;
    try {
      await axios.put(url, payload);
      message.success('Scholorship Successfully Updated');
      setTimeout(() => history.push('/registry/scholarships'), 1000);
    } catch (e) {
      const { response } = e;
      message.error(e);
    }
  };

  const updateComment = () => {
    dispatch(getComments('Scholarship', `${id}`));
  };

  return (
    <>
      <Breadcrumb separator=">" className="mb-1">
        <Breadcrumb.Item href="/registry/scholarships">Scholarships</Breadcrumb.Item>
        <Breadcrumb.Item>Scholarships Details</Breadcrumb.Item>
      </Breadcrumb>

      <Row gutter={[30, 24]}>
        <Col span={24}>
          <HeadingChip title="Scholarships Details" />
        </Col>
        <Col span={24}>
        <div className='twocol-3070'>
          <div className='side-detail'>
              {isHDScreen ?
              <SideDetails data={sideData} type="button" bottom={bottomList} />
              :
              <SideDetailResponsive data={sideData} type='button' bottom={bottomList} />
              }
          </div>
          <div className='side-form'>
            <Card bordered={false} className={`transparent-card ${isHDScreen ? 'scrolling-card' : ''}`}>
              <Row gutter={[20, 20]}>
                <Col span={24}>
                  <ActivationCard t={t} title={scholorshipSingleData?.status} status={scholorshipSingleData?.status} />
                </Col>

                <Col span={24}>
                  <OutstandingList
                    heading="Outstanding Payments"
                    outStanding={outstandingTotalPaymentData}
                    ListCol={OutstandingCol}
                    ListData={outstandingPaymentData}
                    pagination={true}
                  />
                </Col>

                <Col span={24}>
                  <StudentsListCard
                    heading="Student List"
                    ListCol={StudentCol}
                    ListData={studentListData}
                    pagination={true}
                  />
                </Col>

                <Col span={24}>
                  <Form layout="vertical" scrollToFirstError={true} onFinish={handleSubmit(onFinish)}>
                    <ScholarshipForm
                      control={control}
                      errors={errors}
                      setValue={setValue}
                      mode="edit"
                      deleted={deleted}
                      setDeleted={setDeleted}
                      t={t}
                    />
                  </Form>
                </Col>
                <Col span={24}>
                  <UpdateSection data={commentsApi} code={id} module={'Scholarship'} updateComment={updateComment} />
                </Col>
              </Row>
          </Card>
          </div>
          </div>
        </Col>
      </Row>
      <Popup {...popup} />
    </>
  );
};
