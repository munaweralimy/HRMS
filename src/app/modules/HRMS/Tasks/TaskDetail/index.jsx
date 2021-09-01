import React, { useState, useEffect } from 'react';
import { Card, Tabs, Form } from 'antd';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getSingleTaskDetail} from '../ducks/actions';
import StaffDetails from '../../StaffDetails';
import Timesheet from './components/Timesheet';
import Projects from './components/Projects';
import axios from '../../../../../services/axiosInterceptor';
import { apiMethod } from '../../../../../configs/constants';
import { useForm } from 'react-hook-form';

const { TabPane } = Tabs;

export default (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const [tags, setTags] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const singleTaskDetail = useSelector((state) => state.tasks.singleTaskData);
  const { control, errors, handleSubmit, reset } = useForm();

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

  const onFinish = async (val) => {
      let proj = [];
      tags.map((item) => {
          proj.push({
              employee_id: id,
              project_name: item.project,
          });
      });
      const json = {
          projects: proj
      };
      let url = `${apiMethod}/hrms.api.add_projects`;
      try {
        await axios.post(url, json);
        message.success('Project Successfully Updated');
      } catch (e) {
        const { response } = e;
        message.error(e);
      }
  };

  return (
    <StaffDetails id={id} section='Tasks' data={singleTaskDetail}>
      <Card bordered={false} className="uni-card h-auto w-100">
        <Tabs defaultActiveKey="1" type="card" className='custom-tabs'>
            <TabPane tab="Timesheet" key="1">
                <Timesheet data={singleTaskDetail} tabSelected={location?.state?.tab} />
            </TabPane>
            <TabPane tab="Projects" key="2">
                <Form onFinish={handleSubmit(onFinish)} layout="vertical" scrollToFirstError={true}>
                    <Projects data={singleTaskDetail} deleted={deleted} setDeleted={setDeleted} tags={tags} setTags={setTags} control={control}/>
                </Form>
            </TabPane>
        </Tabs>
      </Card>
    </StaffDetails>
  );
};
