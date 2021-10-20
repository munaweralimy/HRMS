import * as action_types from "./constants";

const initialState = {
    employeeProfileData: [],
};

export default (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case action_types.PROFILE_DATA:
            return {...state, employeeProfileData: data };
        default:
            return state;
    }
};