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
  handleCancelEdit,
}) {
  const isEditing = Boolean(editingId);

  return (
    <section id="movie-form-section" className="add-movie cinema-add">

      <div className="add-movie-heading">
        <div>
          <p className="section-eyebrow">
            {isEditing ? "YOUR COLLECTION" : "NEW ENTRY"}
          </p>

          <h2>
            {isEditing ? "Edit entry" : "Add to your collection"}
            <span>.</span>
          </h2>

          <p className="add-movie-description">
            {isEditing
              ? "Update the details of this entry."
              : "Keep track of something worth watching."}
          </p>
        </div>

        <div className="add-movie-number">
          {isEditing ? "EDIT" : "01"}
        </div>
      </div>

      <form
        className="cinema-movie-form"
        onSubmit={isEditing ? handleUpdateMovie : handleAddMovie}
      >

        <div className="form-field title-field">
          <label htmlFor="movie-title">
            TITLE
          </label>

          <input
            id="movie-title"
            type="text"
            placeholder="Enter a movie or series..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-row">

          <div className="form-field">
            <label htmlFor="media-type">
              FORMAT
            </label>

            <select
              id="media-type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="movie">Movie</option>
              <option value="tv_show">TV Show</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="media-status">
              STATUS
            </label>

            <select
              id="media-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="unwatched">Waiting to watch</option>
              <option value="watched">Already watched</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="media-rating">
              RATING
            </label>

            <select
              id="media-rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="">Not rated</option>
              <option value="1">1 / 5</option>
              <option value="2">2 / 5</option>
              <option value="3">3 / 5</option>
              <option value="4">4 / 5</option>
              <option value="5">5 / 5</option>
            </select>
          </div>

        </div>

        <div className="form-footer">

  <p>
    {isEditing
      ? "Changes will be saved to your collection."
      : "You can edit or rate this entry later."}
  </p>

  <div className="form-actions">

    <button
      type="submit"
      className="cinema-submit"
    >
      <span>
        {isEditing ? "Save changes" : "Add entry"}
      </span>

      <span className="submit-arrow">
        →
      </span>
    </button>

    {editingId && (
      <button
        type="button"
        className="cancel-edit"
        onClick={handleCancelEdit}
      >
        Cancel
      </button>
    )}

  </div>

</div>

          

      </form>

    </section>
  );
}

export default AddMovie;