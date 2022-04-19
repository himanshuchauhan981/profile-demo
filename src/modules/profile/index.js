import React from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';
import { connect } from 'react-redux';

import GeneralInfo from './components/GeneralInfo';
import styles from "./styles.module.css";
import SaleInfo from './components/SaleInfo';
import CustomerInfo from './components/CustomerInfo';
import { steps } from '../../constants';
import Service from '../../services';
import ProfileCompletion from './components/ProfileCompletion';
import ActionTypes from '../../redux/action';
import utils from "../../utils";

const Profile = (props) => {
  const { company_details, sale_details, customer_details, active_step, branch_status } = props;

  const loadStepperContent = () => {
    switch (active_step) {
      case 0:
        return <GeneralInfo />
      case 1:
        return <SaleInfo />
      case 2:
        return <CustomerInfo />

      default:
        return null;
    }
  };

  const calculateProfileCompletion = () => {
    let profile_completion = 0;
    let { name, description, branches } = company_details;
    let { categories, currency } = sale_details;
    let { gender, age_groups, countries } = customer_details;
    const branch_status = utils.checkBranchCompletion(branches);


    if (name !== '') {
      profile_completion += 1;
    }
    if (description !== '') {
      profile_completion += 1;
    }

    if (categories.length !== 0) {
      profile_completion += 1;
    }

    if (currency !== '') {
      profile_completion += 1;
    }

    if (gender !== '') {
      profile_completion += 1;
    }

    if (countries.length !== 0) {
      profile_completion += 1;
    }

    if (age_groups.length !== 0) {
      profile_completion += 1;
    }

    if(branch_status) {
      profile_completion += 1;
    }

    profile_completion = profile_completion * 12.5;

    return profile_completion;
  };

  const profileCalculation = calculateProfileCompletion();

  const updateUserDetails = () => {
    const service = new Service();

    service.updateUserDetails({
      company_details, sale_details, customer_details,
    });
  };

  return (
    <div className='container-fluid p-5'>
      <p className={styles.heading}>User Profile</p>
      <div className='w-50'>
        <Stepper activeStep={active_step}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </div>
      <div className='row'>
        <div className={`${styles.stepperContent} col-md-8 p-0`}>
          <div className={styles.stepperHeading}>
            {
              active_step === 0 ? 'General Information' :
                active_step === 1 ? 'Sales Information' :
                  active_step === 2 ? 'Customers & Locale' : null
            }
          </div>
          <div className='p-4'>
            {loadStepperContent()}
          </div>
        </div>
        <ProfileCompletion profileCalculation={profileCalculation} />
      </div>
      <div className='row mt-2'>
        <div className='col-md-8 p-0'>
          <div className='d-flex justify-content-between'>
            <button
              type="button"
              disabled={profileCalculation < 99}
              className={`${styles.saveButton} ${profileCalculation > 99 ? styles.active : null}`}
              onClick={updateUserDetails}
            >
              SAVE UPDATES
            </button>
            <div className='d-flex'>
              <button
                type="button"
                className={`${styles.backButton} ${active_step === 0 ? 'd-none' : null}`}
                disabled={active_step === 0}
                onClick={() => props.setActiveStep(active_step - 1)}
              >
                BACK
              </button>
              <button
                type="button"
                disabled={active_step === steps.length - 1}
                className={styles.nextButton}
                onClick={() => props.setActiveStep(active_step + 1)}
              >
                NEXT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    company_details: state.profileReducer.company_details,
    sale_details: state.profileReducer.sale_details,
    customer_details: state.profileReducer.customer_details,
    active_step: state.profileReducer.active_step,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveStep: (active_step) => {
      dispatch({
        type: ActionTypes.ACTIVE_STEP,
        active_step: active_step,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);