function AddMovie({
  title,
  type,
  status,
  rating,
  setTitle,
  setType,
  setStatus,
  setRating,
  handleAddMovie,
  handleUpdateMovie,
  editingId,
}) {
  return (
    <div className="add-movie">
      <h2>➕ {editingId ? "Edit Movie" : "Add Movie"}</h2>

      <form className="movie-form"
        onSubmit={editingId ? handleUpdateMovie : handleAddMovie}
      >
        <input
          type="text"
          placeholder="Movie title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <br />
        <br />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="movie">Movie</option>
          <option value="tv_show">TV Show</option>
        </select>

        <br />
        <br />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="unwatched">Unwatched</option>
          <option value="watched">Watched</option>
        </select>

        <br />
        <br />

        

        

        <button type="submit">
          {editingId ? "Update Movie" : "Add Movie"}
        </button>
      </form>
    </div>
  );
}

export default AddMovie;