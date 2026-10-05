function GenreFilter({ genres, genre, setGenre }) {
  return (
    <select
      value={genre}
      onChange={(e) => setGenre(e.target.value)}
      style={{
        padding: "10px",
        fontSize: "16px",
      }}
    >
      <option value="all">Tất cả thể loại</option>
      {genres.map((g) => (
        <option key={g} value={g}>
          {g}
        </option>
      ))}
    </select>
  );
}

export default GenreFilter;
