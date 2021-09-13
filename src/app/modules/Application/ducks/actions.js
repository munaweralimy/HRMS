import axios from '../../../../services/axiosInterceptor';
import * as action_types from './constants';
import { apiresource, apiMethod } from '../../../../configs/constants';

export const getCountry = () => {
  return async (dispatch) => {
    const {
      data: { data },
    } = await axios.get(`${apiresource}/Country`);
    dispatch({
      type: action_types.COUNTRY,
      data: data,
    });
  };
};

export const getRace = () => {
  return async (dispatch) => {
    const {
      data: { data },
    } = await axios.get(`${apiresource}/Race`);
    dispatch({
      type: action_types.RACE,
      data: data,
    });
  };
};

export const getMarital = () => {
  return async (dispatch) => {
    const {
      data: { data },
    } = await axios.get(`${apiresource}/Marital Status`);
    dispatch({
      type: action_types.MARITAL_STATUS,
      data: data,
    });
  };
};

export const getReligion = () => {
  return async (dispatch) => {
    const {
      data: { data },
    } = await axios.get(`${apiresource}/Religion`);
    dispatch({
      type: action_types.RELIGION,
      data: data,
    });
  };
};

export const getAppType = () => {
  return async (dispatch) => {
    const {
      data: { data },
    } = await axios.get(`${apiresource}/Application Type`);
    dispatch({
      type: action_types.APPLICATION_TYPE,
      data: data,
    });
  };
};

export const getGender = () => {
  return async (dispatch) => {
    const {
      data: { data },
    } = await axios.get(`${apiresource}/Gender`);
    dispatch({
      type: action_types.GENDER,
      data: data,
    });
  };
};

export const getEngQualification = () => {
  return async (dispatch) => {
    const {
      data: { data },
    } = await axios.get(`${apiresource}/English Qualification`);
    dispatch({
      type: action_types.ENG_QUALIFICATION,
      data: data,
    });
  };
};

export const getProgName = () => {
  return async (dispatch) => {
    const {
      data: { message },
    } = await axios.get(`${apiMethod}/marketing.api.get_program_names_list`);
    dispatch({
      type: action_types.PROGRAMME_NAME,
      data: message,
    });
  };
};

export const getComments = (doctype, id) => {
    return async(dispatch) => {
        const {
            data: { message },
        } = await axios.get(`${apiMethod}/hrms.api.get_message?doctype=${doctype}&doc_name=${id}`);
        dispatch({
            type: action_types.ALL_COMMENTS,
            data: message,
        });
    };
};

export const emptyComments = () => {
  return (dispatch) => {
    dispatch({
      type: action_types.EMPTY_COMMENTS,
      data: [],
    });
  };
};

export const updateMenu = (stat) => {
  return (dispatch) => {
    dispatch({
      type: action_types.MENU_STAT,
      data: stat,
    });
  };
};