import React from 'react';

import styles from "./styles.module.css";
import ActionTypes from "../../../../redux/action";
import { connect } from 'react-redux';
import Branch from './branch';

const GeneralInfo = (props) => {
  const { companyInformation } = props;
  const [totalBranches, setTotalBranches] = React.useState([<Branch key={0} />]);

  const handleInformationChange = (event) => {
    const { target } = event;

    props.saveCompanyDetails({
      [target.name]: target.value,
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
      { totalBranches }
      <p
        className={styles.addBranch}
        onClick={() => setTotalBranches(totalBranches.concat(<Branch key={totalBranches.length} />))}
      >
        Add another branch
      </p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    companyInformation: state.profileReducer,
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