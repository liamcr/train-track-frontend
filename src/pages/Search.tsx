import React from "react";
import UserSearch from "../components/UserSearch";
import PageWrapper from "../components/PageWrapper";

const Search: React.FC = () => {
  return (
    <PageWrapper navValue="search">
      <UserSearch />
    </PageWrapper>
  );
};

export default Search;
