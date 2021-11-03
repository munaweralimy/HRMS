import * as action_types from "./constants";

const initialState = {
    facultyList: [],
    
    faculty: {},
    programmes: []
};

export default (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case action_types.FACULTY_LIST:
            return {...state, facultyList: data };
        
        case action_types.SINGLE_FACULTY:
            return {...state, faculty: data };
        case action_types.PROGRAM_LIST:
            return {...state, programmes: data };
        default:
            return state;
    }
};