import React from "react";
import { setAccessToken } from "../util/helperFns";
import UserSearch from "../components/UserSearch";
import PageWrapper from "../components/PageWrapper";

const Search: React.FC = () => {
  setAccessToken();

  return (
    <PageWrapper navValue="search">
      <UserSearch />
    </PageWrapper>
  );
};

export default Search;
