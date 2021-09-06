import * as action_types from './constant';

const initialState = {
  jobopen: {},
  companies: [],
  jobslist: [],
  applicantlist: {},
  fitindexlist: {},
  fitindexcard: {},
  advData: {}
};
export default (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case action_types.JOB_OPENING:
      return { ...state, jobopen: data };
    case action_types.COMPANY_LIST:
      return { ...state, companies: data };
    case action_types.JOBS_LIST:
      return { ...state, jobslist: data };
    case action_types.SUITABLE_APPLICANTS:
      return { ...state, applicantlist: data };
    case action_types.EMPTY_APPLICANTS:
      return { ...state, applicantlist: data };
    case action_types.OVERALL_FITINDEX:
      return { ...state, fitindexlist: data };
    case action_types.OVERALL_FITINDEX_CARD:
      return { ...state, fitindexcard: data };
    case action_types.ADVANCEMENT_DETAILS:
      return { ...state, advData: data };
      
    default:
      return state;
  }
};
