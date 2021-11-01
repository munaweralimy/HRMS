import * as action_types from "./constants";

const initialState = {
    employeeProfileData: [],
    singleSkillsData: [],
};

export default (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case action_types.PROFILE_DATA:
            return {...state, employeeProfileData: data };
        case action_types.SINGLE_SKILLS:
            return {...state, singleSkillsData: data };
        default:
            return state;
    }
};