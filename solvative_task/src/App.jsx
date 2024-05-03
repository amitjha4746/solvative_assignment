import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Table from "./components/Table";
import Loader from "./components/Loader";
import Pagination from "./components/pagination";
import Searchbar from "./components/Searchbar";
import Limit from "./components/Limit";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      // If search term is empty, do not trigger API call
      return;
    }

    // Set loading state to true to display loader
    setLoading(true);

    // Reset current page to 1 when performing a new search
    setCurrentPage(1);

    // API call to fetch data based on search term and current page
    const options = {
      method: "GET",
      url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
      params: { countryIds: "IN", namePrefix: searchTerm, limit: limit },
      headers: {
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
        "x-rapidapi-key": "e7b2f2ae6fmsh32486cb7d0877f5p1a13c5jsnd5a53d0fa3e1",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setResults(response.data.data || []);
        setTotalPages(Math.ceil(response.data.metadata.totalCount / limit));
        setLoading(false);
      })
      .catch(function (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const handleLimitChange = (event) => {
    const newLimit = parseInt(event.target.value);
    if (newLimit < 1 || newLimit > 10) {
      alert("Please enter a limit between 1 and 10.");
      return;
    }
    setLimit(newLimit);
  };

  return (
    <div className="container">
      <Searchbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        loading={loading}
      />
      {loading && <Loader />}
      <Table
        loading={loading}
        results={results}
        searchTerm={searchTerm}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />
      <Pagination
        results={results}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
      <Limit
        limit={limit}
        handleLimitChange={handleLimitChange}
        handleSearch={handleSearch}
      ></Limit>
    </div>
  );
}

export default App;
