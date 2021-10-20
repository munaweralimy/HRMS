import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Typography, Card, Tabs, Form, Spin, message } from 'antd';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleTaskDetail, getAddProjectName, getTimesheet } from '../Tasks/ducks/actions';
import StaffDetails from '../StaffDetails';
import Employment from './components/Employment';
import Management from './components/Managment';
import DetailsComponent from '../../../molecules/HRMS/DetailsComponent';
import { useForm } from 'react-hook-form';
import { LeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { emptyStaffDetails, getAdvancementdetails } from '../Advancement/dcuks/action';
import { getEmployeeProfile } from './ducks/actions';
import Personal from './components/Personal' 

const { TabPane } = Tabs;
const { Title } = Typography;
const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const dispatch = useDispatch();
  const id = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].name;
  const history = useHistory();
  const location = useLocation();
  const [tags, setTags] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const [options, setOptions] = useState([]);
  const [rowDetails, setRowDetail] = useState(true);
  const [load, setLoad] = useState(false);
  const singleTaskDetail = useSelector((state) => state.tasks.singleTaskData);
  const projectName = useSelector((state) => state.tasks.myAddProjectData);
  const timesheetData = useSelector((state) => state.tasks.timesheetData);
  const employeeProfileData = useSelector((state) => state.employeeProfile.employeeProfileData);
  const { control, errors, handleSubmit, reset } = useForm();

  useEffect(() => {
    dispatch(getEmployeeProfile(id))
    dispatch(getSingleTaskDetail(id));
    dispatch(getAdvancementdetails(id));
    if (location?.state?.tab) {
      if (location.state.tab == 'Missed') {
        dispatch(getTimesheet(id, 'Issues', 1, 10, '', ''));
      } else {
        dispatch(getTimesheet(id, location?.state?.tab, 1, 10, '', ''));
      }
    } else {
      dispatch(getTimesheet(id, 'Pending', 1, 10, '', ''));
    }
    dispatch(getAddProjectName());
    return () => {
      dispatch(emptyStaffDetails())
    }
  }, []);

  //console.log('employeeProfileData', employeeProfileData?.contracts)

  const updateApi = () => {
    dispatch(getSingleTaskDetail(id));
  }

  const updateTimesheet = (status, page, limit, sort, sortby) => {
    dispatch(getTimesheet(id, status, page, limit, sort, sortby));
  }

  useEffect(() => {
    if (projectName) {
      let temp = [];
      projectName.map((item) => temp.push({ label: item.project, value: item.project_code }));
      setOptions(temp);
    }
  }, [projectName]);

  useEffect(() => {
    if (singleTaskDetail.length > 0) {
      let projects = [];
      singleTaskDetail.map((item) => {
        projects.push({
          name: item.row_name,
          project_code: item.name,
          project: item.project,
        });
      });
      setTags(projects);
    }
  }, [singleTaskDetail]);


  const ListCol = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: true,
    },
    {
      title: 'Project',
      dataIndex: 'project',
      key: 'project',
      elipsis: true,
      sorter: true,
    },
    {
      title: 'Hours',
      dataIndex: 'hours',
      key: 'hours',
      align: 'center',
      sorter: true,
    },
    {
      title: 'Task',
      dataIndex: 'tasks',
      key: 'tasks',
      ellipsis: true,
      sorter: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'right',
      render: (text) => {
        let clname = '';
        if (text == 'Approved') {
          clname = 'c-success';
        } else if (text == 'Rejected') {
          clname = 'c-error';
        } else if (~text.indexOf('Pending')) {
          clname = 'c-pending';
        }
        return <span className={`SentanceCase ${clname}`}>{text}</span>;
      },
    },
  ]


  const data = [
    {
      date: '1515'
    }
  ]

  const personalData = {
    title: 'Pending',
    key: 'Pending',
    heading: 'Personal Details',
    data: data,
    column: ListCol,
    nodetail: false,
    detailTitle: 'Pending Timesheet Details',
    // onAction1: onApprove,
    // onAction2: onReject,
  }

  let temp = [
    {
      label: 'Title',
      value: 'Mr.'
    },
    {
      label: 'Name as per IC/Passport',
      value: 'Faid Zamin'
    },
    {
      label: 'Profile Picture',
      value: 'Change'
    },
  ];

  return (
    <StaffDetails id={id} section='HRMS Tasks' title={'Tasks'}>
      <Card bordered={false} className="uni-card h-auto w-100">
        <Row gutter={[20, 30]}>
          <Col span={24}>
            <Tabs defaultActiveKey="1" type="card" className='custom-tabs'>
              <TabPane tab="Employment" key="1">
                <Employment id={id} data={employeeProfileData?.contracts} />
              </TabPane>
              <TabPane tab="Personal" key="2">
                <Personal data={employeeProfileData} />
              </TabPane>
              <TabPane tab="Fit Index" key="3">
                <Management id={id} />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Card>
    </StaffDetails>
  );
};
