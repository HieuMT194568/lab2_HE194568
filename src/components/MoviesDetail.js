// Hiện chi tiết phim bằng hộp thoại alert() có sẵn của trình duyệt
function openMovieDetail(movie) {
  alert(
    `🎬 ${movie.title}\n\n` +
      `Thể loại: ${movie.genre}\n` +
      `Năm: ${movie.year}\n` +
      `Rating:  ${movie.rating}\n` +
      `Đạo diễn: ${movie.director}\n` +
      `Thời lượng: ${movie.duration} phút\n\n` +
      `Description: ${movie.description}`,
  );
}

export default openMovieDetail;
