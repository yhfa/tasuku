import React from "react";
import SelectSearch, { fuzzySearch } from "react-select-search";
import "./searchSelect.css";
import { FormGroup, FormLabel as Label } from "react-bootstrap";
import "src/components/Atoms/form.Atoms/customInput/input.css";
const CustomSearchSelect = (props: any) => {
  const { label, options, placeholder, onChange, multi, invalid, error } =
    props;

  return (
    <FormGroup className="input__formG">
      <div className="input-Container">
        <Label>{label}</Label>
        <SelectSearch
          className={"select-search"}
          closeOnSelect={multi ? false : true}
          printOptions="on-focus"
          options={options}
          onChange={onChange}
          search
          multiple={multi}
          placeholder={placeholder}
          filterOptions={fuzzySearch}
        />
        {invalid && <span className="input-error">{error}</span>}
      </div>
    </FormGroup>
  );
};

export default CustomSearchSelect;
