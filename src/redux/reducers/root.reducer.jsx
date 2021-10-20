import { combineReducers } from 'redux';
import userReducer from '../../features/userSlice';
import feeds from '../../app/molecules/Feeds/ducks/reducers';
import faculty from '../../app/modules/AQA/Faculty/ducks/reducers';
import modules from '../../app/modules/AQA/Modules/ducks/reducers';
import programme from '../../app/modules/AQA/Programme/ducks/reducers';
import marketing from '../../app/modules/Marketing/ducks/reducers';
import forms from '../../app/modules/AQA/Forms/ducks/reducers';
import overview from '../../app/modules/AQA/Overview/ducks/reducers';
import applicationForm from '../../app/modules/Marketing/Applications/ducks/reducers';
import request from '../../app/modules/AQA/Requests/ducks/reducers';
import aqa from '../../app/modules/AQA/ducks/reducers';
import calendar from '../../app/modules/AQA/AcademicCalendar/ducks/reducers';
import global from '../../app/modules/Application/ducks/reducers';
import students from '../../app/modules/Registry/Students/ducks/reducers';
import scholarship from '../../app/modules/Registry/Scholarships/ducks/reducers';
//HRMS
import policy from '../../app/modules/HRMS/Policy/ducks/reducers';
import tasks from '../../app/modules/HRMS/Tasks/ducks/reducers';
import finance from '../../app/modules/HRMS/Finance/ducks/reducer';
import advancement from '../../app/modules/HRMS/Advancement/dcuks/reducer';
import setup from '../../app/modules/HRMS/SetUp/ducks/reducers';
import attendance from '../../app/modules/HRMS/Attendance/ducks/reducers';
import leaves from '../../app/modules/HRMS/Leaves/ducks/reducers';
import employment from '../../app/modules/HRMS/Employment/ducks/reducer';
import hrmsrequests from '../../app/modules/HRMS/Requests/ducks/reducers';
import employeeProfile from '../../app/modules/HRMS/Profile/ducks/reducers';

const rootReducer = combineReducers({
  user: userReducer,
  global,
  aqa,
  overview,
  feeds,
  modules,
  faculty,
  programme,
  marketing,
  forms,
  applicationForm,
  request,
  calendar,
  students,
  scholarship,
  //hrms
  policy,
  tasks,
  finance,
  advancement,
  setup,
  attendance,
  leaves,
  employment,
  hrmsrequests,
  employeeProfile
});

export default rootReducer;
