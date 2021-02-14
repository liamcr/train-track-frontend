import React, { useState } from "react";
import SearchBar from "./SearchBar";
import "../styles/UserSearch.module.css";
import { FullUser } from "../util/commonTypes";
import UserCard from "./UserCard";
import { CircularProgress } from "@material-ui/core";
import NotFoundIcon from "../assets/icons/notFound.svg";
import { Search } from "@material-ui/icons";

const UserSearch: React.FC = () => {
    const [searchResults, setSearchResults] = useState<FullUser[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="user-search-container">
            <SearchBar
                updateSearchResults={setSearchResults}
                setIsLoading={setIsLoading}
            />
            {isLoading ? (
                <CircularProgress color="primary" />
            ) : searchResults !== null && searchResults.length > 0 ? (
                searchResults.map((user) => (
                    <UserCard key={user._id} userInfo={user} />
                ))
            ) : searchResults === null ? (
                <div className="no-users-search-container">
                    <Search style={{ fontSize: 96 }} />
                    Search for a User!
                </div>
            ) : (
                <div className="no-users-search-container">
                    <img
                        src={NotFoundIcon}
                        className="not-found-icon"
                        alt="No users found"
                    />
                    No users found. Try another search!
                </div>
            )}
        </div>
    );
};

export default UserSearch;
