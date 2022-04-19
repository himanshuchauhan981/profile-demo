import React from "react";
import { connect } from "react-redux";
import ReactSelect from "react-select";

import Option from "../../../../shared/components/Option";
import ActionTypes from "../../../../redux/action";
import { categories } from "../../../../constants";

const SaleInfo = (props) => {

  const { saleInformation } = props;

  const handleSaleInfoChange = (event) => {
    let details;
    if(Array.isArray(event)) {
      details = {
        categories: event,
      };
    }
    else {
      const { target } = event;

      details = {
        [target.name]: target.value,
      };
    }

    props.saveSaleInformation(details);
  };

  return(
    <div className="w-100">
      <div className="row mb-3">
        <div className="col-md-6">
          What product categories do you sell ?
        </div>
        <div className="col-md-6">
          <ReactSelect
            options={categories}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            name="categories"
            components={{
              Option
            }}
            onChange={handleSaleInfoChange}
            allowSelectAll={true}
            value={saleInformation.categories}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          Primary Store Currency
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="w-100 form-control"
            name="currency"
            onChange={handleSaleInfoChange}
            value={saleInformation.currency}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    saleInformation: state.profileReducer.sale_details,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveSaleInformation: (sale_info) => {
      dispatch({
        type: ActionTypes.SALES_DETAILS,
        sale_info,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaleInfo);