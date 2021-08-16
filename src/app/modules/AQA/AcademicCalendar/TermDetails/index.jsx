import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, message, Breadcrumb } from 'antd';
import HeadingChip from '../../../../molecules/HeadingChip';
import { useHistory } from 'react-router-dom';
import { useTranslate } from 'Translate';
import { useForm } from 'react-hook-form';
import Information from '../AddNewTerm/Information';
import ListCard from '../../../../molecules/ListCard';
import { useDispatch, useSelector } from 'react-redux';
import { Popup } from '../../../../atoms/Popup';
import DeletePopup from '../../../../molecules/DeletePopup';
import { apiMethod } from '../../../../../configs/constants';
import axios from '../../../../../services/axiosInterceptor';
import UpdateSection from '../../../../molecules/UpdateSection';
import { getComments, emptyComments } from '../../../Application/ducks/actions';
import { getTermDetail, getTermDetailProgrammeList } from '../ducks/actions';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import SideDetails from '../../../../molecules/SideDetails';
import SideDetailResponsive from '../../../../molecules/SideDetailResponsive';
import { BreakingPoint } from '../../../../../configs/constantData';


const ProgrammeCol = [
  {
    title: 'Code',
    dataIndex: 'program_code',
    key: 'program_code',
    sorter: (a, b) => a.program_code.length - b.program_code.length,
    width: 110,
  },
  {
    title: 'Programme',
    dataIndex: 'program_name',
    key: 'program_name',
    sorter: (a, b) => a.program_name.length - b.program_name.length,
  },
  {
    title: 'Faculty',
    dataIndex: 'faculty_code',
    key: 'faculty_code',
    sorter: (a, b) => a.faculty_code - b.faculty_code,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: 'right',
    render: (text) => {
      let clname = '';
      if (text == 'Active') {
        clname = 'c-success';
      } else if (text == 'Expired') {
        clname = 'c-error';
      } else if (~text.indexOf('Expires')) {
        clname = 'c-pending';
      }
      return <span className={`SentanceCase ${clname}`}>{text}</span>;
    },
  },
];

const ProgrammeModules = [
  {
    code: 'FABE-AT',
    programme: 'Diploma in Architectural Technology',
    faculty: 'FABE',
    status: 'Active',
  },
  {
    code: 'FABE-AT',
    programme: 'Diploma in Architectural Technology',
    faculty: 'FABE',
    status: 'Expires in 15 Days',
  },
  {
    code: 'FABE-AT',
    programme: 'Diploma in Architectural Technology',
    faculty: 'FABE',
    status: 'Expired',
  },
];

const StudentCol = [
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
    sorter: (a, b) => a.code.length - b.code.length,
    width: 110,
  },
  {
    title: 'Name',
    dataIndex: 'programme',
    key: 'programme',
    sorter: (a, b) => a.programme.length - b.programme.length,
  },
  {
    title: 'Semester',
    dataIndex: 'faculty',
    key: 'faculty',
    sorter: (a, b) => a.faculty - b.faculty,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: 'right',
    render: (text) => {
      let clname = '';
      if (text == 'Active') {
        clname = 'c-success';
      } else if (text == 'Expired') {
        clname = 'c-error';
      } else if (~text.indexOf('Expires')) {
        clname = 'c-pending';
      }
      return <span className={`SentanceCase ${clname}`}>{text}</span>;
    },
  },
];

const StudentModules = [
  {
    code: '123456',
    programme: 'Roy Stanley',
    faculty: 'Year 1 - Sem 2',
    status: 'Active',
  },
  {
    code: 'FABE-AT',
    programme: 'Binance',
    faculty: 'Year 1 - Sem 3',
    status: 'Expires in 15 Days',
  },
  {
    code: 'FABE-AT',
    programme: 'Diploma in Architectural Technology',
    faculty: 'FABE',
    status: 'Expired',
  },
];

export default (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const { control, errors, setValue, handleSubmit } = useForm();
  const [tags, setTags] = useState([]);
  const [status, setStatus] = useState();
  const [visible, setVisible] = useState(false);
  const [deleted, setDeleted] = useState([]);
  const i18n = useTranslate();
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });
  const moduleApi = useSelector((state) => state.modules.module);
  const commentsApi = useSelector((state) => state.global.comments);
  const termDetailData = useSelector((state) => state.calendar.termDetail);
  const programmeListData = useSelector((state) => state.calendar.termDetailProgrammeList);
  const { t } = i18n;

  useEffect(() => {
    dispatch(getTermDetail(id));
  }, []);

  useEffect(() => {
    if (Object.keys(termDetailData).length > 0) {
      setValue('termTag', termDetailData[0]?.term[0]?.term_tag);
      setValue('termName', termDetailData[0]?.term[0]?.term_name);
      setValue('offered_program', termDetailData[0]?.programs);
      if (termDetailData[0]?.term[0]?.term_start) {
        setValue('termStart', moment(termDetailData[0]?.term[0]?.term_start, 'YYYY-MM-DD'));
      }
      if (termDetailData[0]?.term[0]?.term_end) {
        setValue('termEnd', moment(termDetailData[0]?.term[0]?.term_end, 'YYYY-MM-DD'));
      }

      if (termDetailData[0]?.term[0]?.registration_start) {
        setValue('registrationStart', moment(termDetailData[0]?.term[0]?.registration_start, 'YYYY-MM-DD'));
      }
      if (termDetailData[0]?.term[0]?.term_end) {
        setValue('registrationEnd', moment(termDetailData[0]?.term[0]?.registration_end, 'YYYY-MM-DD'));
      }

      if (termDetailData[0]?.term[0]?.term_end) {
        setValue('classStart', moment(termDetailData[0]?.term[0]?.class_start, 'YYYY-MM-DD'));
      }
      if (termDetailData[0]?.term[0]?.term_end) {
        setValue('classEnd', moment(termDetailData[0]?.term[0]?.class_end, 'YYYY-MM-DD'));
      }
      if (termDetailData[0]?.courses[0]?.boe_date) {
        setValue('boe_start', moment(termDetailData[0]?.courses[0]?.boe_date, 'YYYY-MM-DD'));
      }
      if (termDetailData[0]?.courses[0]?.graduating_boe_date) {
        setValue('boe_end', moment(termDetailData[0]?.courses[0]?.graduating_boe_date, 'YYYY-MM-DD'));
      }

      if (termDetailData[0]?.courses[0]?.course_group_type) {
        setValue('course_group', {
          value: termDetailData[0]?.courses[0]?.course_group_type,
          label: termDetailData[0]?.courses[0]?.course_group_type,
        });
      }
      if (termDetailData[0]?.term[0]?.term_year) {
        setValue('termYear', {
          value: termDetailData[0]?.term[0]?.term_year,
          label: termDetailData[0]?.term[0]?.term_year,
        });
      }
    }

    dispatch(getTermDetailProgrammeList(termDetailData[0]?.courses[0]?.course_group_type));
  }, [termDetailData]);

  useEffect(() => {
    if (Object.keys(moduleApi).length > 0) {
      setValue('name', moduleApi.module_name);
      setValue('code', moduleApi.module_code);
      setValue('fee', moduleApi.module_fee);
      setValue('type', { label: moduleApi.type, value: moduleApi.type });
      setValue('credit', { label: moduleApi.credit, value: moduleApi.credit });
      setValue('hours', { label: moduleApi.hours, value: moduleApi.hours });
      setValue('currency', { label: moduleApi.fee_currency, value: moduleApi.fee_currency });

      setStatus(moduleApi.status);
      let program = [];

      moduleApi?.programs.map((item) => {
        program.push({
          name: item.program_name,
          program: item.program,
          ineffective_date: item.ineffective_date,
          status: item.status,
          doctype: 'AQA Attached Programs',
        });
      });
      setTags(program);
    }
  }, [moduleApi]);

  const popup = {
    closable: false,
    visibility: visible,
    class: 'black-modal',
    content: <DeletePopup title="Faculty" x onClose={() => setVisible(false)} onDelete={() => onDelete()} />,
    width: 536,
    onCancel: () => setVisible(false),
  };

  const onDelete = async () => {
    const courseCode = termDetailData[0]?.courses[0]?.name;
    let url = `${apiMethod}/aqa.api.delete_term?term_code=${id}&course_code=${courseCode}`;
    try {
      await axios.delete(url);
      message.success('Term Successfully Deleted');
      setVisible(false);
      setTimeout(() => history.push('/aqa/academic-calendar'), 1000);
    } catch (e) {
      const { response } = e;
      message.error(e);
    }
  };

  const onFinish = async (val) => {
    console.log('val', val);
    let progArray = [];
    val?.offered_program?.map((resp) => {
      progArray.push({
        include_exclude: resp.include_exclude.value,
        program: resp.program.value,
        name: resp.name,
      });
    });

    const json = {
      term: {
        name: termDetailData[0]?.term[0]?.name,
        term_tag: val.termTag,
        term_name: val.termName,
        term_year: val.termYear.value,
        term_start: val.termStart ? moment(val.termStart).format('YYYY-MM-DD') : '',
        term_end: val.termEnd ? moment(val.termEnd).format('YYYY-MM-DD') : '',
        registration_start: val.registrationStart ? moment(val.registrationStart).format('YYYY-MM-DD') : '',
        registration_end: val.registrationEnd ? moment(val.registrationEnd).format('YYYY-MM-DD') : '',
        class_start: val.classStart ? moment(val.classStart).format('YYYY-MM-DD') : '',
        class_end: val.classEnd ? moment(val.classEnd).format('YYYY-MM-DD') : '',
      },
      courses: {
        name: termDetailData[0]?.courses[0]?.name,
        course_group_type: val.course_group.value,
        new_intake_only: '',
        boe_date: val.boe_start ? moment(val.boe_start).format('YYYY-MM-DD') : '',
        graduating_boe_date: val.boe_end ? moment(val.boe_end).format('YYYY-MM-DD') : '',
      },
      programs: progArray,
      delete_academic_program: [],
    };
    console.log('json', json);
    let url = `${apiMethod}/aqa.api.update_term_detail`;
    try {
      await axios.put(url, json);
      message.success('Term updated Added');
      setTimeout(() => history.push('/aqa/academic-calendar'), 1000);
    } catch (e) {
      const { response } = e;
      message.error(e);
    }
  };

  const updateComment = () => {
    dispatch(getComments('AQA Module', `${id}`));
  };

  const sideData = [
    {
      type: 'tag',
      title: 'Term',
      subChild: true,
      subChildTitle: id,
      highlight: true,
    },
    {
      type: 'titleValue',
      title: 'Term Start',
      level: isHDScreen ? 4 : 5,
      value: termDetailData && moment(termDetailData[0]?.term[0]?.term_start).format('Do MMMM YYYY'),
    },
    {
      type: 'titleValue',
      title: 'Term End',
      level: isHDScreen ? 4 : 5,
      value: termDetailData && moment(termDetailData[0]?.term[0]?.term_end).format('Do MMMM YYYY'),
    },
    {
      type: 'titleValue',
      title: 'Clourse Group Offered',
      level: isHDScreen ? 4 : 5,
      value: termDetailData && termDetailData[0]?.courses[0]?.course_group_type,
      highlight: true,
      noLine: true
    },
  ];
  const bottomList = [
    {
      title: 'Delete Term',
      type: 'button',
      class: 'black-btn',
      action: () => setVisible(true),
    },
  ];

  return (
    <>
      <Breadcrumb separator=">" className="mb-1">
        <Breadcrumb.Item href="/aqa/academic-calendar">Academic Calendar</Breadcrumb.Item>
        <Breadcrumb.Item>Term Details</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Term Details" />
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
                <ListCard title='Programme List' total={programmeListData.length} totaltitle='Programmes' ListCol={ProgrammeCol} ListData={programmeListData} pagination={true} />
              </Col>

              <Col span={24}>
                <ListCard title='Student List' total={StudentModules.length} totaltitle='Students' ListCol={StudentCol} ListData={StudentModules} pagination={true} />
              </Col>

              <Col span={24}>
                <Card bordered={false} className="ag-nospace-body">
                  <Form onFinish={handleSubmit(onFinish)} layout="vertical" scrollToFirstError={true}>
                    <Information
                      control={control}
                      errors={errors}
                      tags={tags}
                      deleted={deleted}
                      setDeleted={setDeleted}
                      setTags={setTags}
                      mode="edit"
                      t={t}
                    />
                  </Form>
                </Card>
              </Col>
              <Col span={24}>
                <UpdateSection
                  data={commentsApi}
                  code={moduleApi.name}
                  module={'AQA Module'}
                  updateComment={updateComment}
                />
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
