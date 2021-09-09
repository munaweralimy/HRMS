import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Card, Breadcrumb, Button } from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import EditFinanceForms from '../components/EditFinanceForms';
import StaffDetails from '../../StaffDetails';
import { getSingleTaskDetail } from '../../Tasks/ducks/actions';
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
const EditFinance = () => {
  const [tags, setTags] = useState();
  const { id } = useParams();
  const dispatch = useDispatch();
  const singleTaskDetail = useSelector((state) => state.tasks.singleTaskData);

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
    <StaffDetails id={id} section="Finance" data={singleTaskDetail}>
      <EditFinanceForms />
    </StaffDetails>
  );
};

export default EditFinance;
