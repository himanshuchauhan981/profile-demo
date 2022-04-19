import React from 'react';

const Branch = () => {
  return(
    <div className='mb-5'>
      <div className='row mb-3'>
        <div className='col-md-6'>
          City
        </div>
        <div className='col-md-6'>
          <input type="text" className='w-100 form-control' />
        </div>
      </div>
      <div className='row mb-3'>
        <div className='col-md-6'>
          Name
        </div>
        <div className='col-md-6'>
          <input type="text" className='w-100 form-control' />
        </div>
      </div>
      <div className='row mb-3'>
        <div className='col-md-6'>
          Notes
        </div>
        <div className='col-md-6'>
          <input type="text" className='w-100 form-control' />
        </div>
      </div>
    </div>

  );
};

export default Branch;