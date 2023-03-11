import React, { useState } from "react";
import StudentCard from "../studentCard/studentCard";
import "../studentCard/studentCard.css";
import "./SearchFilter.css";
import { languageList } from "../../data/languagesList";
import { levels } from "../../data/levels";

function SearchFilter(props) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  const handleNameInputChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleLanguageInputChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleLevelInputChange = (event) => {
    setSelectedLevel(event.target.value);
  };

  const filteredList = props.students.filter((item) => {
    const countryMatch = item.nationality
      .toLowerCase()
      .includes(searchKeyword.toLowerCase());

    const languageMatch = selectedLanguage === "" || selectedLanguage === item.language_name;

    const levelMatch = selectedLevel === "" || selectedLevel === item.levels;

    return countryMatch && languageMatch && levelMatch;
  });

  return (
    <div>
      <div className="filter-container">
      <input
        type="text"
        onChange={handleNameInputChange}
        value={searchKeyword}
        placeholder="Search by Country"
        className="input"
      />
      <select onChange={handleLanguageInputChange} value={selectedLanguage} className="select-tag">
        <option value="">All Languages</option>
        {languageList.map((language, index) => (
          <option key={index} value={language.name}>
            {language.name}
          </option>
        ))}
      </select>
      <select onChange={handleLevelInputChange} value={selectedLevel} className="select-tag">
        <option value="">All Levels</option>
        {levels.map((el, index) => (
          <option key={index} value={el.name}>
            {el.name}
          </option>
        ))}
      </select>
      </div>
      <div className="card-container">
        {filteredList.map((students) => {
          return <StudentCard students={students} key={Math.random()} />;
        })}
      </div>
    </div>
  );
}

export default SearchFilter;
