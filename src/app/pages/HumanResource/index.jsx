import React, { useState } from 'react';
import Dashboard from '../../templates/Dashboard';
import Policy from '../../modules/HRMS/Policy';
import Tasks from '../../modules/HRMS/Tasks';
import Attendance from '../../modules/HRMS/Attendance';
import TaskDetail from '../../modules/HRMS/Tasks/TaskDetail';
import Advancement from '../../modules/HRMS/Advancement';
import Employment from '../../modules/HRMS/Employment';
import AddEmployment from '../../modules/HRMS/Employment/AddEmployment';
import EditEmployment from '../../modules/HRMS/Employment/EditEmployment';
import TeamDetails from '../../modules/HRMS/Employment/TeamDetails';
import Finance from '../../modules/HRMS/Finance';
import EditFinance from '../../modules/HRMS/Finance/EditFinance';
const Components = {
  Advancement,
  Tasks,
  TaskDetail,
  Policy,
  Employment,
  AddEmployment,
  EditEmployment,
  TeamDetails,
  Finance,
  EditFinance,
  Attendance,
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
