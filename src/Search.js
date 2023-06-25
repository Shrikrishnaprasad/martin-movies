import * as React from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { Context } from "./Provider";

export default function Search() {
  const { keyWord, setKeyWord, setFilterMode } = React.useContext(Context);
  const [isSearch, setIsSearch] = React.useState(false);
  const handleKeyWord = (data) => {
    setKeyWord(data.target.value);
    if (keyWord.length > 2) {
      setFilterMode("Search");
    }
  };
  const handleSearch = () => {
    setIsSearch(!isSearch);
  };
  return (
    <>
      {isSearch && (
        <TextField
          label="Search Movie"
          value={keyWord}
          size="small"
          variant="standard"
          onChange={(e) => handleKeyWord(e)}
        />
      )}
      <IconButton onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </>
  );
}
