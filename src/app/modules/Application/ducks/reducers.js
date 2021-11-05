import * as action_types from "./constants";

const initialState = {
    pendingData: [],
    policyData: [],
    timesheetData: [],
    checkInData: [],
    teamsDetailData: [],
    calenderData: [],
    staffData: [],


    checkInData: [],
    countryData: [],
    religionData: [],
    raceData: [],
    appTypeData: [],
    genderData: [],
    engQualificationData: [],
    progData: [],
    maritalData: [],
    comments: [],
    institutions: [],
    educationType: [],
    companies: [],
    jobslist: [],
    teams: [],
    roles: [],
    staff: [],
    menu: false,
    projects: {}
};

export default (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case action_types.PENDING_ISSUES:
            return {...state, pendingData: data };
        case action_types.POLICY_LIST:
            return {...state, policyData: data };
        case action_types.TIMESHEET_DATA:
            return {...state, timesheetData: data };
        case action_types.CHECK_IN_DATA:
            return {...state, checkInData: data };

        case action_types.EMPLOYEE_ID:
            return {...state, teamsDetailData: data };

        case action_types.STAFF_DATA:
            return {...state, staffData: data };

        case action_types.CALENDER_DATA:
            return {...state, calenderData: data };

        case action_types.COUNTRY:
            return {...state, countryData: data };
        case action_types.RELIGION:
            return {...state, religionData: data };
        case action_types.RACE:
            return {...state, raceData: data };
        case action_types.APPLICATION_TYPE:
            return {...state, appTypeData: data };
        case action_types.GENDER:
            return {...state, genderData: data };
        case action_types.ENG_QUALIFICATION:
            return {...state, engQualificationData: data };
        case action_types.PROGRAMME_NAME:
            return {...state, progData: data };
        case action_types.MARITAL_STATUS:
            return {...state, maritalData: data };
        case action_types.ALL_COMMENTS:
            return {...state, comments: data };
        case action_types.EMPTY_COMMENTS:
            return {...state, comments: data };
        case action_types.MENU_STAT:
            return {...state, menu: data };
        case action_types.INTITUTION_LIST:
            return {...state, institutions: data };
        case action_types.EDUCATION_TYPE:
            return {...state, educationType: data };
        case action_types.COMPANY_LIST:
            return { ...state, companies: data };
        case action_types.JOBS_LIST:
            return { ...state, jobslist: data };
        case action_types.TEAM_LISTING:
            return { ...state, teams: data };
        case action_types.ROLE_LIST:
            return { ...state, roles: data };
        case action_types.SUPERVISOR_LIST:
            return { ...state, staff: data };
        case action_types.ALL_PROJECTS:
            return { ...state, projects: data };
        default:
            return state;
    }
};