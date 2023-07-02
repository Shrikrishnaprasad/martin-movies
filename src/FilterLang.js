import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Context } from "./Provider";

export default function FilterLang() {
  const {
    setFilterMode,
    setFilterType,
    setFilterYear,
    setKeyWord,
    filterLanguage,
    setFilterLanguage,
  } = React.useContext(Context);
  const handleChange = (event) => {
    setFilterLanguage(event.target.value);
    setFilterMode(event.target.value === "All" ? "All" : "Lang");
    setFilterType(event.target.value === "All" ? "All" : "");
    setFilterYear("");
    setKeyWord("");
  };

  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <InputLabel>Language</InputLabel>
      <Select value={filterLanguage} label="Language" onChange={handleChange}>
        <MenuItem value="All">English</MenuItem>
        <MenuItem value="Tamil">Tamil</MenuItem>
      </Select>
    </FormControl>
  );
}
