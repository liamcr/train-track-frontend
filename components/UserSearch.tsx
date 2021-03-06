import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { FullUser } from "../util/commonTypes";
import UserCard from "./UserCard";
import { CircularProgress } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import Image from "next/image";

const styles = require("../styles/UserSearch.module.css");

const UserSearch: React.FC = () => {
  const [searchResults, setSearchResults] = useState<FullUser[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={styles.userSearchContainer}>
      <SearchBar
        updateSearchResults={setSearchResults}
        setIsLoading={setIsLoading}
      />
      {isLoading ? (
        <CircularProgress color="primary" />
      ) : searchResults !== null && searchResults.length > 0 ? (
        searchResults.map((user) => <UserCard key={user._id} userInfo={user} />)
      ) : searchResults === null ? (
        <div className={styles.noUsersSearchContainer}>
          <Search style={{ fontSize: 96 }} />
          Search for a User!
        </div>
      ) : (
        <div className={styles.noUsersSearchContainer}>
          <Image
            src="/notFound.svg"
            height={96}
            width={96}
            alt="No users found"
          />
          No users found. Try another search!
        </div>
      )}
    </div>
  );
};

export default UserSearch;
