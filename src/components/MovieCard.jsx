import { Link } from "react-router-dom";

export default function MovieCard({ movie, onFavorite, onRemove, isFavorite }) {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.imdbID}`}>
        <div className="poster">
          {movie.Poster && movie.Poster !== "N/A" ? (
            <img src={movie.Poster} alt={movie.Title} />
          ) : (
            <span>No Image</span>
          )}
        </div>
        <div className="details">
          <h2>{movie.Title}</h2>
          <p>{movie.Year}</p>
        </div>
      </Link>
      {/* Conditional button */}
      {onFavorite && !isFavorite && (
        <button className="btn-fav" onClick={() => onFavorite(movie)}>
          ⭐ Add to Favorites
        </button>
      )}
      {onRemove && (
        <button className="btn-remove" onClick={() => onRemove(movie.imdbID)}>
          ❌ Remove
        </button>
      )}
    </div>
  );
}
