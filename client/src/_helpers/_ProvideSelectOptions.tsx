import React from "react";
import { sortASCForStrings } from "src/_helpers/_utils";

export const getSelectOptions = (arrayOfObjects: any[]) => {
  return arrayOfObjects?.sort(sortASCForStrings).map((row, i) => (
    <option value={row.id} disabled={row.disabled} key={i}>
      {row.stringValue}
    </option>
  ));
};
