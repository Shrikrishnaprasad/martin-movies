import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Context } from "./Provider";

export default function FilterType() {
  const {
    setFilterMode,
    filterType,
    setFilterType,
    setFilterYear,
    setKeyWord
  } = React.useContext(Context);
  const handleChange = (event) => {
    setFilterMode(event.target.value);
    setFilterType(event.target.value);
    setFilterYear("");
    setKeyWord("");
  };

  return (
    <FormControl sx={{ minWidth: 140 }} size="small">
      <InputLabel>Filter Movies</InputLabel>
      <Select value={filterType} label="Filter Movies" onChange={handleChange}>
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Watched">Watched</MenuItem>
      </Select>
    </FormControl>
  );
}
