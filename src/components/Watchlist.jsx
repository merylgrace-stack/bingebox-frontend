import { useState } from "react";
import MovieCard from "./MovieCard";

function Watchlist({ media, handleEdit, handleDeleteMovie }) {
  const [activeTab, setActiveTab] = useState("unwatched");

  const watchedCount = media.filter(
    (item) => item.status === "watched"
  ).length;

  const unwatchedCount = media.filter(
    (item) => item.status === "unwatched"
  ).length;

  const filteredMedia = media.filter(
    (item) => item.status === activeTab
  );

  return (
    <section className="watchlist cinema-watchlist">

      <div className="watchlist-header">

        <div className="watchlist-heading">

          <p className="section-eyebrow">
            YOUR COLLECTION
          </p>

          <h2>
            My watchlist<span>.</span>
          </h2>

          <p className="watchlist-subtitle">
            A place for the stories worth remembering.
          </p>

        </div>

        <div className="watchlist-stats">

          <div className="collection-stat">
            <span className="stat-number">
              {media.length}
            </span>

            <span className="stat-label">
              Total
            </span>
          </div>

          <div className="stat-divider"></div>

          <div className="collection-stat">
            <span className="stat-number">
              {watchedCount}
            </span>

            <span className="stat-label">
              Watched
            </span>
          </div>

          <div className="stat-divider"></div>

          <div className="collection-stat">
            <span className="stat-number">
              {unwatchedCount}
            </span>

            <span className="stat-label">
              Waiting
            </span>
          </div>

        </div>

      </div>

      <div className="watchlist-navigation">

        <button
          className={
            activeTab === "unwatched"
              ? "collection-tab active"
              : "collection-tab"
          }
          onClick={() => setActiveTab("unwatched")}
        >
          <span>Waiting</span>
          <span className="tab-count">{unwatchedCount}</span>
        </button>

        <button
          className={
            activeTab === "watched"
              ? "collection-tab active"
              : "collection-tab"
          }
          onClick={() => setActiveTab("watched")}
        >
          <span>Watched</span>
          <span className="tab-count">{watchedCount}</span>
        </button>

      </div>

      {filteredMedia.length === 0 ? (

        <div className="empty-collection">

          <div className="empty-mark">—</div>

          <h3>
            {activeTab === "unwatched"
              ? "Nothing waiting yet."
              : "Your story starts here."}
          </h3>

          <p>
            {activeTab === "unwatched"
              ? "Add something you've been meaning to watch."
              : "Once you've finished something, it'll appear here."}
          </p>

        </div>

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

    </section>
  );
}

export default Watchlist;