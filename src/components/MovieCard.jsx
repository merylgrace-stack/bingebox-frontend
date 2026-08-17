import { useState } from "react";
import axios from "axios";

function MovieCard({ item, handleEdit, handleDeleteMovie }) {
  const [rating, setRating] = useState(item.rating || 0);

  const handleRating = async (newRating) => {
    try {
      const token = localStorage.getItem("userToken");

      const response = await axios.patch(
        `https://bingebox-ra8f.onrender.com/watchlist/api/media/${item.id}/`,
        {
          rating: newRating,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      setRating(response.data.rating);
    } catch (error) {
      console.log(
        "RATING UPDATE ERROR:",
        JSON.stringify(error.response?.data, null, 2)
      );
    }
  };

  const isWatched = item.status === "watched";

  return (
    <article className="cinema-movie-card">

      <div className="movie-card-top">

        <span className="movie-index">
          #{String(item.id).padStart(2, "0")}
        </span>

        <span className={`movie-state ${isWatched ? "watched" : ""}`}>
          {isWatched ? "WATCHED" : "WAITING"}
        </span>

      </div>

      <div className="movie-card-main">

        <h3>{item.title}</h3>

        <p className="movie-kind">
          {item.type === "movie" ? "FEATURE FILM" : "TELEVISION"}
        </p>

      </div>

      <div className="movie-card-divider"></div>

      <div className="movie-card-rating">

        <span className="rating-label">
          YOUR RATING
        </span>

        <div className="rating-stars">
          {Array.from({ length: 5 }, (_, index) => {
            const starNumber = index + 1;

            return (
              <button
                key={starNumber}
                className={
                  starNumber <= rating
                    ? "cinema-star active"
                    : "cinema-star"
                }
                onClick={() => handleRating(starNumber)}
                aria-label={`Rate ${starNumber} out of 5`}
              >
                ★
              </button>
            );
          })}
        </div>

      </div>

      <div className="movie-card-actions">

        <button
          className="card-action edit-action"
          onClick={() => handleEdit(item)}
        >
          Edit
        </button>

        <button
          className="card-action delete-action"
          onClick={() => handleDeleteMovie(item.id)}
        >
          Remove
        </button>

      </div>

    </article>
  );
}

export default MovieCard;