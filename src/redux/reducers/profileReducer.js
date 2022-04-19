import actions from "../action";
import utils from "../../utils";

const initialState = {
  company_details: {
    name: '',
    description: '',
    branches: [{ city: '', name: '', notes: '' }],
  },
  sale_details: {
    categories: [],
    currency: '',
  },
  customer_details: {
    gender: '',
    age_groups: [],
    countries: [],
  },
  active_step: 0,
  branch_status: false,
};

const profileReducer = (state = initialState, action) => {

  if (action.type === actions.COMPANY_DETAILS) {
    const [key] = Object.keys(action.company_info);
    let branch_status;

    if (key === 'branches') {
      branch_status = utils.checkBranchCompletion(action.company_info[key]);
    }

    return {
      ...state,
      branch_status: branch_status !== undefined ? branch_status : state.branch_status,
      company_details: {
        ...state.company_details,
        [key]: action.company_info[key],
      },
    }
  }
  else if (action.type === actions.SALES_DETAILS) {
    const [key] = Object.keys(action.sale_info);

    return {
      ...state,
      sale_details: {
        ...state.sale_details,
        [key]: action.sale_info[key],
      }
    };
  }
  else if (action.type === actions.CUSTOMER_DETAILS) {
    const [key] = Object.keys(action.customer_info);

    return {
      ...state,
      customer_details: {
        ...state.customer_details,
        [key]: action.customer_info[key],
      }
    };
  }
  else if (action.type === actions.ACTIVE_STEP) {

    return {
      ...state,
      active_step: action.active_step
    };
  }

  return state;
};

export default profileReducer;