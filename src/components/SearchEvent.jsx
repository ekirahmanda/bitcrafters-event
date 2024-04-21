("use client");

export const SearchEvent = ({
  searchQuery,
  setSearchQuery,
  handleSearchData,
  handleReset,
}) => {
  return (
    <div className="flex flex-row gap-x-2 justify-center items-center">
      <p>Search events:</p>
      <input
        className="input input-primary"
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="space-x-2">
        <button
          className="btn btn-active w-30 btn-primary"
          onClick={handleSearchData}
        >
          Search
        </button>
        <button
          className="btn btn-active w-30  btn-secondary"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};
