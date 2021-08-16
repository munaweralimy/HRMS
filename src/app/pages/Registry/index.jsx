import React, { useState } from 'react';
import Dashboard from '../../templates/Dashboard';
import Overview from '../../modules/AQA/Overview';
import StudentDetails from '../../modules/Registry/Students/StudentDetails';
import ApplicationDetails from '../../modules/Registry/Students/ApplicationDetails';
import PendingOfferLetter from '../../modules/Registry/Students/PendingOfferLetter';
import PendingRegistration from '../../modules/Registry/Students/PendingRegistration';
import Students from '../../modules/Registry/Students';
import ScholarshipList from '../../modules/Registry/Scholarships/ScholarshipList';
import ScholarshipDetail from '../../modules/Registry/Scholarships/ScholarshipDetail';
import AddScholarship from '../../modules/Registry/Scholarships/AddScholarship';
import RequestList from '../../modules/Registry/Requests/RequestList';
import RequestDetail from '../../modules/Registry/Requests/RequestDetail';

import ReportsList from '../../modules/Registry/Reports';
import AddReports from '../../modules/Registry/Reports/AddReports';

const Components = {
    Students,
    StudentDetails,
    PendingOfferLetter,
    PendingRegistration,
    ApplicationDetails,
    ScholarshipList,
    AddScholarship,
    ScholarshipDetail,
    RequestList,
    RequestDetail,
    ReportsList,
    AddReports
 }
 
export default (props) => {

    const StudentComp = Components[props.Comp];
    const [loading, setLoading] = useState(false);

    return (
        <Dashboard load={loading}>
            <StudentComp setLoading={setLoading} />
        </Dashboard>
    )
}