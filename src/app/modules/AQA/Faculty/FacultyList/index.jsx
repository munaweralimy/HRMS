import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import HeadingChip from '../../../../molecules/HeadingChip';
import { useTranslate } from 'Translate';
import ListCard from '../../../../molecules/ListCard';
import { useHistory } from 'react-router-dom';
import { getFaculty, getFacultyList } from '../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';

const filters = [
  {
    label: 'Active',
    value: 'active',
  },
  {
    label: 'Draft',
    value: 'draft',
  },
  {
    label: 'Archive',
    value: 'archive',
  },
  {
    label: 'Inactive',
    value: 'inactive',
  },
];

export default (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const facultyApi = useSelector((state) => state.faculty.facultyList);
  const [faculties, setFaculties] = useState([]);
  const [filterVal, setFilterVal] = useState(filters[0].value);
  const i18n = useTranslate();
  const { t } = i18n;

  const addNew = () => history.push('faculty/addnew');

  const btnList = [
    {
      text: '+ New Faculty',
      action: () => addNew(),
    },
  ];

  useEffect(() => {
    if (facultyApi) {
      let data = [];
      facultyApi.map((item) => {
        data.push({
          code: item.faculty_code,
          faculty: item.faculty_name,
          expired: item.expired,
          expiring: item.expiring,
          programme: item.programme,
          status: item.status,
          student: item.student,
        });
      });
      setFaculties(data);
    } else {
      setFaculties(Object.assign([]));
    }
  }, [facultyApi]);

  const ListCol = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      sorter: (a, b) => a.code.length - b.code.length,
      width: 90,
    },
    {
      title: 'Faculty',
      dataIndex: 'faculty',
      key: 'faculty',
      sorter: (a, b) => a.faculty.length - b.faculty.length,
      ellipsis: true,
      width: 280,
      render: (text, record) => (
        <Button type="link" className="list-links" onClick={() => history.push(`/aqa/faculty/edit/${record.code}`)}>
          {text}
        </Button>
      ),
    },
    {
      title: 'Expiring Programmes',
      dataIndex: 'expiring',
      key: 'expiring',
      sorter: (a, b) => a.expiring - b.expiring,
      align: 'center',
      render: (text) => (Number(text) > 0 ? <span className="c-pending">{text}</span> : text),
    },
    {
      title: 'Expired Programmes',
      dataIndex: 'expired',
      key: 'expired',
      align: 'center',
      sorter: (a, b) => a.expired - b.expired,
      render: (text) => (Number(text) > 0 ? <span className="c-error">{text}</span> : text),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
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
    {
      title: 'Programmes',
      dataIndex: 'programme',
      key: 'programme',
      align: 'center',
      sorter: (a, b) => a.programme.length - b.programme.length,
    },
    {
      title: 'Active Students',
      dataIndex: 'student',
      key: 'student',
      align: 'center',
      sorter: (a, b) => a.student.length - b.student.length,
    },
  ];

  useEffect(() => {
    dispatch(getFaculty(filterVal));
    dispatch(getFaculty(filterVal));
  }, []);

  useEffect(() => {
    dispatch(getFaculty(filterVal));
  }, [filterVal]);

  const onFilter = (e) => {
    setFilterVal(e.target.value);
  };

  return (
    <Row gutter={[30, 24]}>
      <Col span={24}>
        <HeadingChip title={t('AQA.Faculty.title1')} btnList={btnList} />
      </Col>
      <Col span={24}>
        <ListCard
          filters={filters}
          filterValue={filterVal}
          onFilter={onFilter}
          ListCol={ListCol}
          ListData={faculties}
          pagination={true}
        />
      </Col>
    </Row>
  );
};
