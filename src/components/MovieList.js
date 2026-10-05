import MovieItem from "./MoviesItem";

function MovieList({ movie, toggleMovie, onSelect }) {
  if (movie.length === 0) {
    return (
      <p
        style={{
          textAlign: "center",
          padding: "30px",
        }}
      >
        Không có phim nào.
      </p>
    );
  }

  return (
    <section
      style={{
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      {movie.map((movie) => (
        <MovieItem
          key={movie.id}
          movie={movie}
          toggleMovie={toggleMovie}
          onSelect={onSelect}
        />
      ))}
    </section>
  );
}

export default MovieList;
