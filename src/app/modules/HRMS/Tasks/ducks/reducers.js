import * as action_types from "./constants";

const initialState = {
    overallTaskData: [],
    overallTaskDataWithStatus: [],
    teamTaskData: [],
    teamTaskDataWithStatus: [],
    myTaskData: [],
    myProjectData: [],
    myAddProjectData: [],
    singleTaskData: []
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
        case action_types.PROJECT_NAME:
            return {...state, myProjectData: data };
        case action_types.ADD_PROJECT_NAME:
            return {...state, myAddProjectData: data };
        case action_types.SINGLE_TASK_DETAIL:
            return {...state, singleTaskData: data };
        default:
            return state;
    }
};