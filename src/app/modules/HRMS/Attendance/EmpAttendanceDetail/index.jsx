import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography } from 'antd';
import EmpAttendance from '../components/EmpAttendance';
import StaffDetails from '../../StaffDetails';
import { getSingleTaskDetail } from '../../Tasks/ducks/actions';
import { useDispatch, useSelector } from 'react-redux';

import { useLocation, useParams } from 'react-router-dom';

const sideData = [
  {
    type: 'code',
    text: 'Scholarship',
    title: '',
  },
  {
    type: 'reversetitleValue',
    title: 'Schemes',
    level1: 3,
    level2: 4,
    value: '',
  },
  {
    type: 'reversetitleValue',
    title: 'Active Students',
    level1: 3,
    level2: 4,
    value: '',
  },
  {
    type: 'titleValue',
    title: 'Created',
    space: 10,
    level: 4,
    value: '',
    noDivider: true,
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
const EmpAttendanceDetail = () => {
  const { Title } = Typography;
  const { id } = useParams();
  const [tags, setTags] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const singleTaskDetail = useSelector((state) => state.tasks.singleTaskData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleTaskDetail(id));
  }, []);
  useEffect(() => {
    if (singleTaskDetail && singleTaskDetail?.projects) {
      let projects = [];
      singleTaskDetail?.projects.map((item) => {
        projects.push({
          name: item.name,
          project: item.project,
        });
      });
      setTags(projects);
    }
  }, [singleTaskDetail]);

  return (
    <StaffDetails id={id} section="Attendance" data={singleTaskDetail} title={'Attendance'}>
      <EmpAttendance />
    </StaffDetails>
  );
};

export default EmpAttendanceDetail;
