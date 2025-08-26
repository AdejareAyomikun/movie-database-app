import MovieCard from "./MovieCard";

export default function MovieGrid({ movies, onFavorite, favorites }) {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="w-full px-4">
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onFavorite={onFavorite}
            isFavorite={favorites?.some((fav) => fav.imdbID === movie.imdbID)}
          />
        ))}
      </div>
    </div>
  );
}
