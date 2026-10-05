function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      value={search}
      placeholder="Tìm kiếm..."
      onChange={(e) => setSearch(e.target.value)}
      style={{
        width: "250px",
        padding: "10px",
        fontSize: "16px",
      }}
    />
  );
}

export default SearchBar;
