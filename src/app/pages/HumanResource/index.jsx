import React, { useState } from 'react';
import Dashboard from '../../templates/Dashboard';
import Policy from '../../modules/HRMS/Policy';
import Tasks from '../../modules/HRMS/Tasks';
import Attendance from '../../modules/HRMS/Attendance';
import EmpAttendanceDetail from '../../modules/HRMS/Attendance/EmpAttendanceDetail';
import TaskDetail from '../../modules/HRMS/Tasks/TaskDetail';
import Advancement from '../../modules/HRMS/Advancement';
import AdvancementDetails from '../../modules/HRMS/Advancement/AdvancementDetails';
import Employment from '../../modules/HRMS/Employment';
import AddEmployment from '../../modules/HRMS/Employment/AddEmployment';
import EmploymentDetails from '../../modules/HRMS/Employment/EmploymentDetails';
import TeamDetails from '../../modules/HRMS/Employment/TeamDetails';
import Finance from '../../modules/HRMS/Finance';
import FinanceDetails from '../../modules/HRMS/Finance/FinanceDetail';
import SetUp from '../../modules/HRMS/SetUp';
import Requests from '../../modules/HRMS/Requests';
import Reports from '../../modules/HRMS/Reports';
import Leaves from '../../modules/HRMS/Leaves';
import LeavesDetail from '../../modules/HRMS/Leaves/LeavesDetail';
import RequestDetails from '../../modules/HRMS/Requests/RequestDetails';
import AddRequest from '../../modules/HRMS/Requests/AddRequest';
import Profile from '../../modules/HRMS/Profile';

const Components = {
  Advancement,
  AdvancementDetails,
  Tasks,
  TaskDetail,
  Policy,
  Employment,
  AddEmployment,
  EmploymentDetails,
  TeamDetails,
  Finance,
  FinanceDetails,
  Attendance,
  EmpAttendanceDetail,
  SetUp,
  Requests,
  RequestDetails,
  Reports,
  Leaves,
  LeavesDetail,
  AddRequest,
  Profile
};

export default (props) => {
  const [loading, setLoading] = useState(false);
  const HRMSComp = Components[props.Comp];

  return (
    <Dashboard load={loading}>
      <HRMSComp setLoading={setLoading} />
    </Dashboard>
  );
};
