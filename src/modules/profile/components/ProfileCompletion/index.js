import React from "react";
import { connect } from 'react-redux';

import styles from "./styles.module.css";

const ProfileCompletion = (props) => {

  const { company_details, sale_details, customer_details, branch_status } = props;

  return(
    <div className='col-md-4 mt-2'>
      <div className={styles.profileCompletionHeader}>
        <p>Profile Completion</p>
        <p>{props.profileCalculation > 99 ? 100 : props.profileCalculation.toFixed(2)}%</p>
      </div>

      <div className={`${styles.info} ${company_details.name !== '' && company_details.description ? styles.completedStepper: null }`}>
        <p>General Company Info</p>
        <div className={styles.infoGroup}>
          <i className={`${company_details?.name ? styles.completedCheck: styles.check} ${styles.checkIcon} fa fa-check`} />
          <p className={company_details?.name ? styles.completed: null}>Company Name</p>
        </div>
        <div className={styles.infoGroup}>
          <i className={`${company_details?.description ? styles.completedCheck: styles.check} ${styles.checkIcon} fa fa-check`} />
          <p className={company_details?.description ? styles.completed: null}>Company Description</p>
        </div>
        <div className={styles.infoGroup}>
          <i className={`${branch_status ? styles.completedCheck: styles.check} ${styles.checkIcon} fa fa-check`} />
          <p className={branch_status ? styles.completed: null}>Branches</p>
        </div>
        <p></p>
      </div>

      <div className={`${styles.info} ${sale_details.categories.length && sale_details.currency ? styles.completedStepper: null }`}>
        <p>Sales Information</p>
        <div className={styles.infoGroup}>
          <i className={`${sale_details?.categories.length ? styles.completedCheck: styles.check} fa fa-check`} />
          <p className={sale_details?.categories.length ? styles.completed: null}>Product Categories</p>
        </div>
        <div className={styles.infoGroup}>
          <i className={`${sale_details?.currency ? styles.completedCheck: styles.check} fa fa-check`} />
          <p className={sale_details?.currency ? styles.completed: null}>Primary Store currency</p>
        </div>
      </div>

      <div className={`${styles.info} ${customer_details.countries.length && customer_details.age_groups.length && customer_details.gender ? styles.completedStepper: null }`}>
        <p>Customers & Locale</p>
        <div className={styles.infoGroup}>
          <i className={`${customer_details?.gender ? styles.completedCheck: styles.check} fa fa-check`} />
          <p className={customer_details?.gender ? styles.completed: null}>Gender Focus</p>
        </div>
        <div className={styles.infoGroup}>
          <i className={`${customer_details?.age_groups.length ? styles.completedCheck: styles.check} fa fa-check`} />
          <p className={customer_details?.age_groups.length ? styles.completed: null}>Age Groups</p>
        </div>
        <div className={styles.infoGroup}>
          <i className={`${customer_details?.countries.length ? styles.completedCheck: styles.check} fa fa-check`} />
          <p className={customer_details?.countries.length ? styles.completed: null}>Countries</p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    company_details: state.profileReducer.company_details,
    sale_details: state.profileReducer.sale_details,
    customer_details: state.profileReducer.customer_details,
    branch_status: state.profileReducer.branch_status,
  };
};

export default connect(mapStateToProps)(ProfileCompletion);