import './App.css';
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";

import Header from "./components/Header";
import MovieList from "./components/MovieList";
import GenreFilter from "./components/GerneFilter";
import SearchBar from "./components/SearchBar";
import openMovieDetail from "./components/MoviesDetail";

import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { Movies } from "./datas/movies";

const FAVORITES_KEY = "movie_favorites";



// ==========================================
// REDUCER
// ==========================================

function movieReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_MOVIE":
      return state.map((movie) =>
        movie.id === action.payload ? { ...movie, fav: !movie.fav } : movie,
      );

    // payload: mảng id các phim yêu thích
    case "LOAD_FAVORITES":
      return state.map((movie) => ({
        ...movie,
        fav: action.payload.includes(movie.id),
      }));

    default:
      return state;
  }
}


function App() {
  return (
    <ThemeProvider>
      <MovieManager />
    </ThemeProvider>
  );
}

function  MovieManager() {
  const { darkMode } = useTheme();
    const [movies, dispatch] = useReducer(movieReducer, Movies);
    // chỉ lưu sau khi đã load xong, tránh ghi đè dữ liệu cũ bằng giá trị mặc định
    const [favoritesLoaded, setFavoritesLoaded] = useState(false);

  
      // useState - lọc & tìm kiếm
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  const [sortRating, setSortRating] = useState("default");


  // useEffect - load phim favorite từ localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY));
      if (Array.isArray(saved)) {
        dispatch({ type: "LOAD_FAVORITES", payload: saved });
      }
    } catch {
    }
    setFavoritesLoaded(true);
  }, []);

  // useEffect - lưu id phim yêu thích
  useEffect(() => {
    if (!favoritesLoaded) return;

    const favoriteIds = movies.filter((movie) => movie.fav).map((movie) => movie.id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds));
  }, [movies, favoritesLoaded]);

      // useCallback - hoàn thành
  const toggleMovie = useCallback((id) => {
    dispatch({ type: "TOGGLE_MOVIE", payload: id });
  }, []);

 

  // danh sách thể loại (không trùng) để đưa vào dropdown
  const genres = useMemo(
    () => [...new Set(movies.map((movie) => movie.genre))],
    [movies],
  );

  // useMemo - lọc, tìm kiếm & sắp xếp
  const filteredMovies = useMemo(() => {
    const result = movies.filter((movie) => {
      if (filter === "favorite" && !movie.fav) return false;
      if (filter === "notFavorite" && movie.fav) return false;
      if (genre !== "all" && movie.genre !== genre) return false;
      return movie.title.toLowerCase().includes(search.trim().toLowerCase());
    });

    if (sortRating === "high") result.sort((a, b) => b.rating - a.rating);
    if (sortRating === "low") result.sort((a, b) => a.rating - b.rating);

    return result;
  }, [movies, filter, search, genre, sortRating]);

   const stats = useMemo(() => {
    const favorite = filteredMovies.filter((movie) => movie.fav).length;

    return {
      total: filteredMovies.length,
      favorite,
      notFavorite: filteredMovies.length - favorite,
    };
  }, [filteredMovies]);


  return (
 <div 
      style={{
        minHeight: "100vh",

        backgroundColor: darkMode ? "#222" : "#f5f5f5",

        color: darkMode ? "white" : "black",
      }}
    >
            <Header />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "10px",
          padding: "20px",
          borderBottom: "1px solid #ccc",
        }}
      >
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
          }}
        >
          <option value="all">Tất cả phim</option>
          <option value="favorite"> Yêu thích</option>
          <option value="notFavorite">Chưa yêu thích</option>
        </select>

        <GenreFilter genres={genres} genre={genre} setGenre={setGenre} />

        <select
          value={sortRating}
          onChange={(e) => setSortRating(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
          }}
        >
          <option value="default">Rating: Mặc định</option>
          <option value="high">Rating: Cao - Thấp</option>
          <option value="low">Rating: Thấp - Cao</option>
        </select>

        <SearchBar search={search} setSearch={setSearch} />
      </div>

      <div
        style={{
          textAlign: "center",
          padding: "20px",
          borderBottom: "1px solid #ccc",
        }}
      >
        <h2>
          Tổng: {stats.total} | Yêu thích: {stats.favorite} | Chưa yêu thích: {stats.notFavorite}
        </h2>
      </div>

      <MovieList movie={filteredMovies} toggleMovie={toggleMovie} onSelect={openMovieDetail} />

    </div>
  );
}

export default App;
