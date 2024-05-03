import "../App.css";
import React from "react";

function Searchbar({ searchTerm, setSearchTerm, handleSearch, loading }) {
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={`search-container ${loading ? "loading" : ""}`}>
      <input
        type="text"
        className="search-input"
        placeholder="Search places..."
        value={searchTerm}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        autoFocus // Focus the input field on initial render
        disabled={loading}
      />
      <button
        className="search-button"
        onClick={handleSearch}
        disabled={loading}
      >
        Search
      </button>
    </div>
  );
}

export default Searchbar;
