export default function MovieCard({ movie }) {
  return (
    <div className="movie-card">
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
    </div>
  );
}
