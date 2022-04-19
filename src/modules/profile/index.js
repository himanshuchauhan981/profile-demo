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


const Profile = (props) => {
  const { company_details, sale_details, customer_details } = props;

  const [activeStep, setActiveStep] = React.useState(0);

  const loadStepperContent = () => {
    switch(activeStep) {
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

  const calculateProfileCalculation = () => {
    let profile_completion = 0;
    let { name, description } = company_details;
    let { categories, currency } = sale_details;
    let {gender, age_groups, countries } = customer_details;


    if( name !== '') {
      profile_completion += 14.28;
    }
    if( description !== '') {
      profile_completion += 14.28;
    }

    if(categories.length !== 0) {
      profile_completion += 14.28;
    }

    if(currency  !== '') {
      profile_completion += 14.28;
    }

    if(gender  !== '') {
      profile_completion += 14.28;
    }

    if(countries.length !== 0) {
      profile_completion += 14.28;
    }

    if(age_groups.length !== 0) {
      profile_completion += 14.28;
    }

    return profile_completion;
  };

  const profileCalculation = calculateProfileCalculation();

  const updateUserDetails = () => {
    const service = new Service();

    service.updateUserDetails({
      company_details,sale_details, customer_details,
    });
  };

  return (
    <div className='container-fluid p-5'>
      <p className={styles.heading}>User Profile</p>
      <div className='w-50'>
        <Stepper activeStep={activeStep}>
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
        <div className={`${styles.stepperHeading} col-md-8 `}>
          {
            activeStep === 0 ? 'General Information': 
            activeStep === 1 ? 'Sales Information':
            activeStep === 2 ? 'Customers & Locale': null
          }
        </div>
      </div>
      <div className='row'>
        <div className={`${styles.stepperContent} col-md-8 p-4`}>
          {loadStepperContent()} 
        </div>
        <ProfileCompletion profileCalculation={profileCalculation}  />
      </div>
      <div className='row mt-2'>
        <div className='col-md-8 p-0'>
          <div className='d-flex justify-content-between'>
            <button
              type="button"
              disabled={profileCalculation < 99}
              className={`${styles.saveButton} ${profileCalculation > 99 ? styles.active: null }`}
              onClick={updateUserDetails}
            >
              SAVE UPDATES
            </button>
            <div className='d-flex'>
              <button
                type="button"
                className={`${styles.backButton} ${activeStep === 0 ? 'd-none': null }`}
                disabled={activeStep === 0}
                onClick={() => setActiveStep(activeStep - 1)}
              >
                BACK
              </button>
              <button
                type="button"
                disabled={activeStep === steps.length - 1}
                className={styles.nextButton}
                onClick={() => setActiveStep(activeStep + 1)}
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
  };
};

export default connect(mapStateToProps)(Profile);