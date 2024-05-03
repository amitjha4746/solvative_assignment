import "../App.css";

function Limit({ limit, handleLimitChange, handleSearch }) {
  return (
    <div className="limit-container">
      <label htmlFor="limitInput">Results limit:</label>
      <input
        type="number"
        id="limitInput"
        min="1"
        max="10"
        value={limit}
        onChange={handleLimitChange}
      />
      <button onClick={handleSearch}>Apply</button>
    </div>
  );
}

export default Limit;
