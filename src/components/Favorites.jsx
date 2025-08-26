import MovieGrid from "./MovieGrid";

export default function Favorites({ favorites }) {
  return (
    <div className="favorites-page">
      <h1>⭐ Your Favorite Movies</h1>
      {favorites.length > 0 ? (
        <MovieGrid movies={favorites} />
      ) : (
        <p>No favorites yet. Add some from the home page!</p>
      )}
    </div>
  );
}
