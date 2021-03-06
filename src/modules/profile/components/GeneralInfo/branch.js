import React from 'react';
import { connect } from 'react-redux';

const Branch = (props) => {
  const { companyInformation, id } = props;
  return(
    <div className='mb-5'>
      <div className='row mb-3'>
        <div className='d-flex justify-content-end'>
          <i className="fa fa-times" aria-hidden="true" onClick={() => props.removeBranch(id)}></i>
        </div>
      </div>
      <div className='row mb-3'>
        <div className='col-md-6'>
          City
        </div>
        <div className='col-md-6'>
          <input
            type="text"
            name="city"
            className='w-100 form-control'
            value={companyInformation.branches[id].city}
            onChange={(event) => props.handleChange(event, id)}
          />
        </div>
      </div>
      <div className='row mb-3'>
        <div className='col-md-6'>
          Name
        </div>
        <div className='col-md-6'>
          <input
            type="text"
            className='w-100 form-control'
            name="name"
            value={companyInformation.branches[id].name}
            onChange={(event) => props.handleChange(event, id)}
          />
        </div>
      </div>
      <div className='row mb-3'>
        <div className='col-md-6'>
          Notes
        </div>
        <div className='col-md-6'>
          <input
            type="text"
            className='w-100 form-control'
            name='notes'
            value={companyInformation.branches[id].notes}
            onChange={(event) => props.handleChange(event, id)}
          />
        </div>
      </div>
    </div>

  );
};

const mapStateToProps = (state) => {
  return {
    companyInformation: state.profileReducer.company_details,
  };
};

export default connect(mapStateToProps)(Branch);