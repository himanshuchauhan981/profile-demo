import React from "react";
import { connect } from "react-redux";
import ReactSelect, { components } from "react-select";

import ActionTypes from "../../../../redux/action";

const categories = [
  { value: "online", label: "Online Grocery"},
  { value: "door", label: "Door to door delivery"},
]

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

const SaleInfo = (props) => {

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
          />
        </div>
      </div>
    </div>
  );
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

export default connect(null, mapDispatchToProps)(SaleInfo);