import "../App.css";
import React from "react";

function Table({ loading, results, searchTerm, currentPage, itemsPerPage }) {
  // Calculate start and end indices based on current page and items per page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the results array to show only items for the current page
  const slicedResults = results.slice(startIndex, endIndex);

  return (
    <table id="dataTable" className="custom-table">
      <thead>
        <tr>
          <th className="table-header">#</th>
          <th className="table-header">Place Name</th>
          <th className="table-header">Country</th>
        </tr>
      </thead>
      <tbody>
        {loading && (
          <tr>
            <td colSpan="3">Loading...</td>
          </tr>
        )}
        {!loading && (!searchTerm || slicedResults.length === 0) && (
          <tr>
            <td colSpan="3">
              {!searchTerm ? "Start searching" : "No result found"}
            </td>
          </tr>
        )}
        {!loading &&
          slicedResults.map((result, index) => (
            <tr key={result.id}>
              <td className="table-cell">{startIndex + index + 1}</td>
              <td className="table-cell">{result.city}</td>
              <td className="table-cell">
                <img
                  src={`https://flagsapi.com/${result.countryCode}/flat/24.png`}
                  alt={result.country}
                />
                {result.country}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default Table;
