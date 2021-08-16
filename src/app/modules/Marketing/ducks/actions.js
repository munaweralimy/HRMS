import axios from "../../../../services/axiosInterceptor";
import * as action_types from "./constants";
import { apiresource, apiMethod } from "../../../../configs/constants";


export const getApplicationLeads = () => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/Application?fields=["name","applicant_name"]&filters=[["docstatus","=",2]]`);
        dispatch({
            type: action_types.APPLICATION_LEADS,
            data: data,
        });
    };
};

export const getApplicationLeadsCount = () => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/Application?fields=["name","applicant_name"]&filters=[["docstatus","=",0]]&limit_page_length=None`);
        dispatch({
            type: action_types.APPLICATION_COUNT,
            data: data,
        });
    };
};

export const getApplicationProgress = () => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/marketing.api.get_incomplete_application_list`);
        dispatch({
            type: action_types.APPLICATION_PROG,
            data: message,
        });
    };
};

export const getApplicationProgressDetail = () => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/Application?fields=["name","applicant_name","workflow_state","modified"]&filters=[["docstatus","=",0]]&order_by=name DESC&limit_page_length=0`);
        dispatch({
            type: action_types.APPLICATION_PROG_DETAIL,
            data: data,
        });
    };
};

export const getTotalStudentEnrolled = () => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/marketing.api.get_total_and_enrolled_students`);
        dispatch({
            type: action_types.TOTAL_STUDENT_ENROLLED,
            data: message,
        });
    };
};

export const getEligibilityAssessmentList = () => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/Application?fields=["name","applicant_name","workflow_state","modified"]&filters=[["docstatus","=",0],["workflow_state","=","Eligibility assessment"]]&order_by=name DESC&limit_page_length=None`);
        dispatch({
            type: action_types.ELIGIBILITY_ASSESSMENT,
            data: data,
        });
    };
};

export const getIncompleteDocumentsList = () => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/Application?fields=["name","applicant_name","workflow_state","modified"]&filters=[["docstatus","=",0],["workflow_state","=","Incomplete document"]]&order_by=name DESC&limit_page_length=None`);
        dispatch({
            type: action_types.INCOMPLETE_REGISTRATIONS,
            data: data,
        });
    };
};

export const getPendingVisaList = () => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/Application?fields=["name","applicant_name","workflow_state","modified"]&filters=[["docstatus","=",0],["workflow_state","=","Incomplete registration visa"]]&order_by=name DESC&limit_page_length=None`);
        dispatch({
            type: action_types.PENDING_VISA,
            data: data,
        });
    };
};

export const getPendingAccomodationList = () => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/Application?fields=["name","applicant_name","workflow_state","modified"]&filters=[["docstatus","=",0],["workflow_state","=","Pending accomodation"]]&order_by=name DESC&limit_page_length=None`);
        dispatch({
            type: action_types.PENDING_ACCOMODATION,
            data: data,
        });
    };
};

export const getPendingEnrollmentList = () => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/Application?fields=["name","applicant_name","workflow_state","modified"]&filters=[["docstatus","=",0],["workflow_state","=","Pending enrollment"]]&order_by=name DESC&limit_page_length=None`);
        dispatch({
            type: action_types.PENDING_ENROLLMENT,
            data: data,
        });
    };
};

export const getApplicationDetial = (appURL) => {
    return async(dispatch) => {
        const {
            data: { data },
        } = await axios.get(`${apiresource}/Application/${appURL}`);
        dispatch({
            type: action_types.APPLICATION_DETAIL,
            data: data,
        });
    };
};