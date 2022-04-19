import React from 'react';
import { connect } from 'react-redux';

import ActionTypes from "../../../../redux/action";
import { age_groups, gender , countries } from "../../../../constants";

const CustomerInfo = (props) => {

  const { customer_details } = props;

  const handleCustomerInfoChange = (event) => {
    const { target } = event;

    let value;

    if(target.name !== 'gender') {
      
      const index = customer_details[target.name].find(item => item === target.value);
      
      if(index) {
        value = customer_details[target.name].filter(item => item !== index);
      }
      else {
        value = customer_details[target.name].concat([target.value]);
      }
    }
    else {
      value = target.value;
    }
    
    props.saveCustomerDetails({
      [target.name]: value,
    });
  };

  const loadGender = gender.map((item, index) => (
    <div className="form-check form-check-inline" key={index}>
      <input
        className="form-check-input"
        type="radio"
        name="gender"
        id={item.value}
        value={item.value}
        checked={customer_details.gender === item.value}
        onChange={handleCustomerInfoChange}
      />
      <label className="form-check-label" htmlFor="male">
        {item.label}
      </label>
    </div>
  ));

  const loadAgeGroups = age_groups.map((item, index) => (
    <div className="form-check" key={index}>
      <input
        
        className="form-check-input"
        type="checkbox"
        id={item.value}
        value={item.value}
        name='age_groups'
        onChange={handleCustomerInfoChange}
        checked={customer_details.age_groups.includes(item.value)}
      />
      <label className="form-check-label" htmlFor="tween">{item.label}</label>
    </div>
  ));

  const loadCountries = countries.map((item, index) => (
    <div className="form-check" key={index}>
      <input
        className="form-check-input"
        name="countries"
        type="checkbox"
        id={item.value}
        value={item.value}
        onChange={handleCustomerInfoChange}
        checked={customer_details.countries.includes(item.value)}
      />
      <label className="form-check-label" htmlFor="saudi_arabia">{item.value}</label>
    </div>
  ));

  return(
    <div className='w-100'>
      <div className='row mb-3'>
        <div className='col-md-6'>
          What gender does your store focus?
        </div>
        <div className='col-md-6'>
          {loadGender}
        </div>
      </div>

      <div className='row mb-3'>
        <div className='col-md-6'>
          What age groups do you target?
        </div>
        <div className='col-md-6'>
          { loadAgeGroups }
        </div>
      </div>

      <div className='row mb-3'>
        <div className='col-md-6'>
          What countries do you serve?
        </div>
        <div className='col-md-6'>
          { loadCountries }
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    customer_details: state.profileReducer.customer_details,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveCustomerDetails: (details) => {
      dispatch({
        type: ActionTypes.CUSTOMER_DETAILS,
        customer_info: details,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerInfo);