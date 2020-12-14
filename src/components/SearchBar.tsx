import React, { useState } from "react";
import {
  IconButton,
  Paper,
  InputBase,
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { FullUser } from "../util/commonTypes";
import axios from "axios";
import { SEARCH_URL } from "../consts";

type SearchBarProps = {
  updateSearchResults: React.Dispatch<React.SetStateAction<FullUser[] | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const useStyles = makeStyles({
  searchBarMain: {
    display: "inline-flex",
    paddingRight: "1%",
    width: "100%",
  },
});

const SearchBar: React.FC<SearchBarProps> = ({
  updateSearchResults,
  setIsLoading,
}) => {
  const classes = useStyles();

  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const executeSearch = () => {
    setIsLoading(true);

    axios
      .get(SEARCH_URL(query), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "train-track-access-token"
          )}`,
        },
      })
      .then((response) => {
        updateSearchResults(response.data);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Paper className={classes.searchBarMain}>
      <Tooltip title="Search">
        <IconButton
          onClick={executeSearch}
          disabled={query.length < 3}
          aria-label="Search Users"
        >
          <Search />
        </IconButton>
      </Tooltip>

      <InputBase
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        placeholder="Search Users"
        fullWidth
        onKeyDown={(e) => {
          if (e.keyCode === 13 && query.length >= 3) {
            e.preventDefault();

            executeSearch();
          }
        }}
      />
    </Paper>
  );
};

export default SearchBar;
