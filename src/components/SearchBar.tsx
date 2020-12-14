import React, { useState } from "react";
import {
  IconButton,
  Paper,
  InputBase,
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";

const useStyles = makeStyles({
  searchBarMain: {
    display: "inline-flex",
    paddingRight: "1%",
    width: "100%",
  },
});

const SearchBar: React.FC = () => {
  const classes = useStyles();

  const [query, setQuery] = useState("");

  return (
    <Paper className={classes.searchBarMain}>
      <Tooltip title="Search">
        <IconButton
          onClick={() => {
            console.log(`Searching for ${query}`);
          }}
          disabled={query === ""}
          aria-label="Search"
        >
          <Search />
        </IconButton>
      </Tooltip>

      <InputBase
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        placeholder="Search"
        fullWidth
        onKeyDown={(e) => {
          if (e.keyCode === 13 && query !== "") {
            e.preventDefault();

            console.log(`Searching for ${query}`);
          }
        }}
      />
    </Paper>
  );
};

export default SearchBar;
