import React from 'react';

import styles from "./styles.module.css";
import ActionTypes from "../../../../redux/action";
import { connect } from 'react-redux';
import Branch from './branch';

const GeneralInfo = (props) => {
  const { companyInformation } = props;
  
  const removeBranch = (branchIndex) => {

    const updatedBranches = companyInformation.branches.filter((item, index) => index !== branchIndex);
    
    if(updatedBranches.length) {
      props.saveCompanyDetails({
        branches: updatedBranches,
      });
    }
  };

  const handleInformationChange = (event) => {
    const { target } = event;

    props.saveCompanyDetails({
      [target.name]: target.value,
    });
  };

  let addNewBranch = () => {
    const arr = [...companyInformation.branches, {city: '', name: '', notes: ''}];
    props.saveCompanyDetails({
      branches: arr,
    });
  };

  const handleChange = (event, index) => {
    const { target } = event;

    const tempBranches = [...companyInformation.branches];
    tempBranches[index][target.name] = target.value;

    props.saveCompanyDetails({
      branches: tempBranches,
    });
  };

  return(
    <div className='w-100'>
      <div className='row mb-3'>
        <div className='col-md-6'>
          Company Name
        </div>
        <div className='col-md-6'>
          <input
            type="text"
            className='w-100 form-control'
            name="name"
            onChange={handleInformationChange}
            value={companyInformation.name}
          />
        </div>
      </div>
      <div className='row mb-3'>
        <div className='col-md-6'>
          Company Description
        </div>
        <div className='col-md-6'>
          <textarea
            className={`${styles.description} form-control`}
            rows={3}
            name="description"
            onChange={handleInformationChange}
            value={companyInformation.description}
          >
          </textarea>
        </div>
      </div>
      <p className={styles.branchHeading}>Branches</p>
      {
        companyInformation.branches.map((item, index) => (
          <Branch key={index} item={item} removeBranch={removeBranch} id={index} handleChange={handleChange} />
        ))
      }
      <p
        className={styles.addBranch}
        onClick={addNewBranch}
      >
        Add another branch
      </p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    companyInformation: state.profileReducer.company_details,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveCompanyDetails: (details) => {
      dispatch({
        type: ActionTypes.COMPANY_DETAILS,
        company_info: details,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralInfo);