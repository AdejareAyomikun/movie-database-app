import MovieCard from "./MovieCard";

export default function MovieGrid({ movies }) {
  if (!movies || movies.length === 0) {
    return null;
  }
     console.log(movies);

  return (
    <div className="w-full px-4">
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}
