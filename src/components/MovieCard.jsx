import axios from "axios";

function MovieCard({ item, handleEdit, handleDeleteMovie }) {
  const handleRating = async (rating) => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/watchlist/api/media/${item.id}/`,
        {
          rating: rating,
        }
      );

      console.log("RATING UPDATED:", response.data);

      // Update the displayed rating
      item.rating = response.data.rating;
    } catch (error) {
      console.log(
        "RATING UPDATE ERROR:",
        JSON.stringify(error.response?.data, null, 2)
      );
    }
  };

  return (
    <div className="movie-card">
      <h3>🎬 {item.title}</h3>

      <div className="movie-info">
        <span className="movie-type">
          {item.type === "movie" ? "🎬 Movie" : "📺 TV Show"}
        </span>

        <span className={`movie-status ${item.status}`}>
          {item.status === "watched"
            ? "✅ Watched"
            : "⏳ Unwatched"}
        </span>
      </div>

      <div className="movie-rating">
        {Array.from({ length: 5 }, (_, index) => {
          const starNumber = index + 1;

          return (
            <button
              key={starNumber}
              className={starNumber <= (item.rating || 0) ? "star active" : "star"}
              onClick={() => handleRating(starNumber)}
            >
              ★
            </button>
          );
        })}
      </div>

      <div className="movie-actions">
        <button onClick={() => handleEdit(item)}>
          ✏️ Edit
        </button>

        <button onClick={() => handleDeleteMovie(item.id)}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default MovieCard;