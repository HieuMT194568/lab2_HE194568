import { memo } from "react";
import { FaStar } from "react-icons/fa";

function MovieItem({ movie, toggleMovie, onSelect }) {

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "30px 1fr 100px 70px 120px 110px",
        alignItems: "center",
        gap: "20px",
        padding: "20px",
        borderBottom: "1px solid #ccc",
      }}
    >
        {/* viền đen để sao trắng vẫn nhìn thấy trên nền sáng */}
        <FaStar
          size={26}
          color={movie.fav ? "black" : "white"}
          stroke="black"
          strokeWidth={30}
        />

      {/* bấm tên phim để xem chi tiết (alert) */}
      <span style={{ textAlign: "left" }}>{movie.title}</span>

      <span style={{ fontSize: "16px", opacity: 0.7 }}>
        {movie.genre}
        
      </span>

      <span style={{ fontSize: "16px", fontWeight: "bold" }}>
        <FaStar/> {movie.rating}
      </span>
        <button onClick={() => toggleMovie(movie.id)} name="Yêu thích">{movie.fav ? "Bỏ yêu thích" : "Yêu thích"}</button>
         <button
        onClick={() => onSelect(movie)}     
      >
        Xem chi tiết
      </button>
    </div>
  );
}

// memo + useCallback ở App: chỉ item nào thay đổi mới render lại
export default memo(MovieItem);
