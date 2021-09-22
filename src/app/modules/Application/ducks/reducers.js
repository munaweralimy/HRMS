import * as action_types from "./constants";

const initialState = {
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
    menu: false
};

export default (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
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
            
        default:
            return state;
    }
};