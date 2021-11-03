import React, { useState } from 'react';
import Dashboard from '../../templates/Dashboard';
import Overview from '../../modules/AQA/Overview';
import FacultyList from '../../modules/AQA/Faculty/FacultyList';
import AddFaculty from '../../modules/AQA/Faculty/AddFaculty';
import EditFaculty from '../../modules/AQA/Faculty/EditFaculty';
import ProgrammeList from '../../modules/AQA/Programme/ProgrammeList';
import ModuleList from '../../modules/AQA/Modules/ModuleList';
import AddModule from '../../modules/AQA/Modules/AddModule';
import EditModule from '../../modules/AQA/Modules/EditModule';
import AddProgramme from '../../modules/AQA/Programme/AddProgramme';
import ProgramDetails from '../../modules/AQA/Programme/ProgramDetails';
import RequestList from '../../modules/AQA/Requests/RequestList';
import RequestDetail from '../../modules/AQA/Requests/RequestDetail';

//
import FormsList from '../../modules/AQA/Forms/FormsList';
import AddForms from '../../modules/AQA/Forms/AddForms';
import EditForms from '../../modules/AQA/Forms/EditForms';

import Calendar from '../../modules/AQA/AcademicCalendar';
import TermDetails from '../../modules/AQA/AcademicCalendar/TermDetails';
import AddNewTerm from '../../modules/AQA/AcademicCalendar/AddNewTerm';
import CalendarRequestDetail from '../../modules/AQA/AcademicCalendar/CalendarRequestDetail';

const Components = {
    Overview, FacultyList, AddFaculty, EditFaculty, ProgrammeList, AddProgramme, ProgramDetails, ModuleList, AddModule, EditModule,
    FormsList, AddForms, EditForms, RequestList, RequestDetail, Calendar, TermDetails, AddNewTerm, CalendarRequestDetail
 }
 
export default (props) => {
    
    const AQAComp = Components[props.Comp];
    const [loading, setLoading] = useState(false);

    return (
        <Dashboard load={loading}>
            <AQAComp setLoading={setLoading} />
        </Dashboard>
    )
}