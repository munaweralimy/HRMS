import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button } from 'antd';
import HeadingChip from '../../../molecules/HeadingChip';
import { useHistory } from 'react-router';
import { useTranslate } from 'Translate';
import { useDispatch, useSelector } from 'react-redux';
import ListCard from '../../../molecules/ListCard';
import Search from './components/Search';
import { getStudentsList, getStudentsListPg, studentsStatus } from './ducks/actions';
import PendingRequestCard from '../../../molecules/PendingRequestCard';

const { Title, Text } = Typography;

let tempFaculty = [
  {
    label: 'All Faculties',
    value: 'All',
  },
];
let tempProg = [
  {
    label: 'All Programmes',
    value: '',
  },
];

const filters = [
  {
    label: 'All',
    value: 'Active',
  },
  {
    label: 'Graduating',
    value: 'graduating',
  },
  {
    label: 'Inactive',
    value: 'inactive',
  },
  {
    label: 'Archive',
    value: 'archive',
  },
];

export default (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [filterData, setFilterData] = useState(null);
  const [filterVal, setFilterVal] = useState('Active');
  const students = useSelector((state) => state.students.studentList);
  const pendingList = useSelector((state) => state.students.pendingList);
  const [page, setPage] = useState(1);
  const [limit,setLimit] = useState(10);

  const i18n = useTranslate();
  const { t } = i18n;

  const ListCol = [
    {
      title: 'Code',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      width: 140,
    },
    {
      title: 'Student Name',
      dataIndex: 'student_name',
      key: 'student_name',
      sorter: true,
      ellipsis: true,
    },
    {
      title: 'Faculty',
      dataIndex: 'faculty_code',
      key: 'faculty_code',
      ellipsis: true,
      sorter: true,
    },
    {
      title: 'Issues',
      dataIndex: 'issues',
      key: 'issues',
      ellipsis: true,
      render: (text) => <span className={`${text > 0 ? 'c-error' : ''}`}>{text > 0 ? text + ' Issue(s)' : text}</span>,
      sorter: true,
    },
    {
      title: 'Requests',
      dataIndex: 'requests',
      key: 'requests',
      ellipsis: true,
      render: (text) => (
        <span className={`${text > 0 ? 'c-error' : ''}`}>{text > 0 ? text + ' Request(s)' : text}</span>
      ),
      sorter: true,
    },
    {
      title: 'Status',
      dataIndex: 'program_status',
      key: 'program_status',
      align: 'center',
      width: 140,
      render: (text) => {
        let clname = '';
        if (text == 'Active') {
          clname = 'c-success';
        } else if (text == 'Inactive') {
          clname = 'c-error';
        } else if (text == 'Draft') {
          clname = 'c-pending';
        }
        return <span className={`SentanceCase ${clname}`}>{text}</span>;
      },
    },
  ];

  useEffect(() => {
    dispatch(getStudentsListPg(filterVal, page, limit, '', ''));
    dispatch(studentsStatus());
  }, []);

  useEffect(() => {
    filterVal && dispatch(getStudentsListPg(filterVal, page, limit, '', ''));
  }, [filterVal]);

  const onFilter = (e) => {
    setFilterVal(e.target.value);
  };

  const onSearch = (val) => {
    
  };

  const onClickRow = (record) => {
    return {
      onClick: () => {
        history.push(`students/${record.name}`);
      },
    };
  };

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getStudentsListPg(filterVal, pagination.current, pagination.pageSize, sorter.order, sorter.columnKey));
    } else {
      dispatch(getStudentsListPg(filterVal, pagination.current, pagination.pageSize, '', ''));
    }
  }
  

  return (
    <Row gutter={[20, 50]}>
      <Col span={24}>
        <Row gutter={[20, 30]}>
          <Col span={24}>
            <HeadingChip title="Pending Issues" />
          </Col>
          <Col xl={12} lg={24}>
            <PendingRequestCard
              data={pendingList.length > 0 ? pendingList[0]?.pending_offer_letter[0]?.visa_students[0] : []}
              title="Pending Offer Letter Release"
              count={pendingList.length > 0 ? pendingList[0]?.pending_offer_letter[0]?.visa_total : 0}
              link="pending-offerletter/"
              label="Students"
              innerlink="registration/"
              status={'b-error'}
            />
          </Col>
          <Col xl={12} lg={24}>
            <PendingRequestCard
              data={
                pendingList.length > 0 ? pendingList[0]?.pending_student_registration[0]?.enrollment_students[0] : []
              }
              title="Pending Student Registration"
              count={pendingList.length > 0 ? pendingList[0]?.pending_student_registration[0]?.enrollment_total : 0}
              link="pending-registration/"
              label="Students"
              innerlink="offerletter/"
              status={'b-error'}
            />
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[20, 30]}>
          <Col span={24}>
            <HeadingChip title="Student List" />
          </Col>
          <Col span={24}>
            <ListCard
              Search={Search}
              onSearch={onSearch}
              filters={filters}
              filterValue={filterVal}
              onFilter={onFilter}
              onChange={onTableChange}
              filterData={filterData}
              ListCol={ListCol}
              ListData={students[0]?.rows}
              onRow={onClickRow}
              pagination={{
                total: students[0]?.count,
                current: page,
                pageSize: limit
              }}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
