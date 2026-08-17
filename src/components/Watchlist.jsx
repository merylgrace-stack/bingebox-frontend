import { useState } from "react";
import MovieCard from "./MovieCard";

function Watchlist({ media, handleEdit, handleDeleteMovie }) {
  const [activeTab, setActiveTab] = useState("unwatched");

  const filteredMedia = media.filter(
    (item) => item.status === activeTab
  );

  return (
    <div className="watchlist">
      <h2>🍿 My Watchlist</h2>

      <div className="watchlist-tabs">
        <button
          className={activeTab === "unwatched" ? "active" : ""}
          onClick={() => setActiveTab("unwatched")}
        >
          ⏳ To Watch
        </button>

        <button
          className={activeTab === "watched" ? "active" : ""}
          onClick={() => setActiveTab("watched")}
        >
          ✅ Watched
        </button>
      </div>

      {filteredMedia.length === 0 ? (
        <p className="empty-watchlist">
          {activeTab === "unwatched"
            ? "Nothing to watch yet."
            : "You haven't watched anything yet."}
        </p>
      ) : (
        <div className="watchlist-movies">
          {filteredMedia.map((item) => (
            <MovieCard
              key={item.id}
              item={item}
              handleEdit={handleEdit}
              handleDeleteMovie={handleDeleteMovie}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Watchlist;