import React, { useState } from "react";
import StudentCard from "../studentCard/studentCard";
import "../studentCard/studentCard.css"



const languages = ["English", "Spanish", "German", "French", "Japanese"];
const levels = ["Beginner", "Intermediate", "Advanced","Native"];

function SearchFilter(props) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  console.log(props.cards)

  const handleNameInputChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleLanguageInputChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleLevelInputChange = (event) => {
    setSelectedLevel(event.target.value);
  };

  const filteredList = props.cards.filter((item) => {
    const countryMatch =
      item.country.toLowerCase().includes(searchKeyword.toLowerCase()) 

    const languageMatch =
      selectedLanguage === "" || selectedLanguage === item.language;

    const levelMatch = selectedLevel === "" || selectedLevel === item.level;

    return countryMatch && languageMatch && levelMatch;
  });

  return (
    <div>
      <input
        type="text"
        onChange={handleNameInputChange}
        value={searchKeyword}
        placeholder="Search by Country"
      />
      <select onChange={handleLanguageInputChange} value={selectedLanguage}>
        <option value="">All Languages</option>
        {languages.map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>
      <select onChange={handleLevelInputChange} value={selectedLevel}>
        <option value="">All Levels</option>
        {levels.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>
      <div className="card-container">
        {filteredList.map((card) => {
         return <StudentCard card={card} key={Math.random()} />;
          })}
      </div>
    </div>
  );
}

export default SearchFilter







