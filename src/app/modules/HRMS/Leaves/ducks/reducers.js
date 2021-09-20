import * as action_types from "./constants";

const initialState = {
    overallTaskData: [],
    overallTaskDataWithStatus: {},
    teamTaskData: {},
    teamTaskDataWithStatus: [],
    myTaskData: {},
    myAvailableLeaves: [],
    leaveStatAnnualList: [],
    leaveStatReplacementList: [],
    leaveStatUnpaidList: [],
    leaveStatisticsBar: [],
    // leaveStatReplacementBar: [],
    // leaveStatUnpaidBar: [],

    myProjectData: [],
    myAddProjectData: [],
    singleTaskData: [],
    timesheetData: {}
};

export default (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case action_types.OVERALL_TASKS:
            return {...state, overallTaskData: data };
        case action_types.OVERALL_TASKS_WITH_STATUS:
            return {...state, overallTaskDataWithStatus: data };
        case action_types.TEAM_TASKS:
            return {...state, teamTaskData: data };
        case action_types.TEAM_TASKS_WITH_STATUS:   
            return {...state, teamTaskDataWithStatus: data };
        case action_types.MY_TASKS:
            return {...state, myTaskData: data };
        case action_types.MY_AVAILABLE_LEAVES:
            return {...state, myAvailableLeaves: data };
        case action_types.STATISTIC_LIST_ANNUAL:
            return {...state, leaveStatAnnualList: data };
        case action_types.STATISTIC_LIST_REPLACEMENT:
            return {...state, leaveStatReplacementList: data };
        case action_types.STATISTIC_LIST_UNPAID:
            return {...state, leaveStatUnpaidList: data };
        case action_types.STATISTIC_BAR:
            return {...state, leaveStatisticsBar: data };
        // case action_types.STATISTIC_BAR_REPLACEMENT:
        //     return {...state, leaveStatReplacementBar: data };
        // case action_types.STATISTIC_BAR_UNPAID:
        //     return {...state, leaveStatUnpaidBar: data };


            
        case action_types.PROJECT_NAME:
            return {...state, myProjectData: data };
        case action_types.ADD_PROJECT_NAME:
            return {...state, myAddProjectData: data };
        case action_types.SINGLE_TASK_DETAIL:
            return {...state, singleTaskData: data };
        case action_types.EMPTY_TASKS:
            return initialState;
        case action_types.MY_TIMESHEETS:
            return {...state, timesheetData: data };
            
            
        default:
            return state;
    }
};