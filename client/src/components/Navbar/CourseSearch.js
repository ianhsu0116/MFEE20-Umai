import React, { useState } from "react";
import { ImCross } from "react-icons/im";

const CourseSearch = (props) => {
  let { searchValue, setSearchValue } = props;

  //搜尋列推薦關鍵字
  const SearchKeywordTagList = [
    "創意壽司",
    "義大利麵",
    "紅酒燉牛肉",
    "獵人燉雞",
  ];
  //搜尋列推薦課程
  const SearchCourseList = [
    "創意壽司",
    "築地創意壽司",
    "築地高級壽司",
    "築地高級創意壽司",
  ];

  //刪除搜尋內容
  async function handleSearchValueDelete() {
    setSearchValue("");
  }

  return (
    <div className="Navbar-CourseSearch">
      <div className="Navbar-CourseSearch-container">
        <div className="Navbar-CourseSearch-dropdown">
          <input
            type="text"
            className="Navbar-CourseSearch-dropdown-SearchBar"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <button
            className="SearchBar-cross-circle"
            onClick={handleSearchValueDelete}
          >
            <ImCross className="SearchBar-cross-icon" />
          </button>
        </div>
        <div className="SearchKeywordTag">
          <span>推薦關鍵字：</span>
          {SearchKeywordTagList.map((keywordTag) => (
            <div
              className="KeywordTag"
              title={keywordTag}
              onClick={(e) => {
                setSearchValue(e.target.title);
              }}
            >
              #{keywordTag}
            </div>
          ))}
        </div>
        <div className="SearchCourseList">
          {SearchCourseList.map((Course) => (
            <div
              className="recommandCourse"
              title={Course}
              onClick={(e) => {
                setSearchValue(e.target.title);
              }}
            >
              {Course}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseSearch;
