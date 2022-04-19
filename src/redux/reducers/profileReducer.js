import actions from "../action";

const initialState = {
  company_details: {
    name: '',
    description: '',
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
};

const profileReducer = (state = initialState, action) => {

  if(action.type === actions.COMPANY_DETAILS) {
    const [key] = Object.keys(action.company_info);

    return {
      ...state,
      company_details: {
        ...state.company_details,
        [key]: action.company_info[key],
      }
    }
  }
  else if(action.type === actions.SALES_DETAILS) {
    const [key] = Object.keys(action.sale_info);

    return {
      ...state,
      sale_details: {
        ...state.sale_details,
        [key]: action.sale_info[key],
      }
    };
  }
  else if(action.type === actions.CUSTOMER_DETAILS) {
    const [key] = Object.keys(action.customer_info);

    return {
      ...state,
      customer_details: {
        ...state.customer_details,
        [key]: action.customer_info[key],
      }
    };
  }

  return state;
};

export default profileReducer;