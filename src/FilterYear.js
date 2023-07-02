import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Context } from "./Provider";

export default function FilterYear() {
  const { filterYear, setFilterYear, setFilterMode } =
    React.useContext(Context);
  let years = new Array(24).fill(2023);
  const handleChange = (event) => {
    setFilterYear(event.target.value || "");
    setFilterMode("Year");
  };
  return (
    <FormControl sx={{ ml: 1, mr: 1, minWidth: 120 }} size="small">
      <InputLabel>Year</InputLabel>
      <Select value={filterYear} label="Year" onChange={handleChange}>
        {years.map((e, i) => (
          <MenuItem key={i} value={e - i}>
            {e - i}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
