import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import MovieGrid from "./components/MovieGrid";
import MovieDetails from "./components/MovieDetails";
import Loader from "./components/Loader";
import Favorites from "./components/Favorites";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = async (query) => {
    if (!query) return;

    setLoading(true);
    setError("");
    setMovies([]);

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${
          import.meta.env.VITE_OMDB_API_KEY
        }&s=${query}`
      );
      const data = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError(data.Error || "No movies found.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = (movie) => {
    if (!favorites.some((fav) => fav.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((fav) => fav.imdbID !== id));
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <nav className="navbar">
              <Link to="/">Home</Link>
              <Link to="/favorites">⭐ Favorites</Link>
            </nav>
            <div className="app-container">
              <header className="app-title">🎬 Movie Database</header>
              <SearchBar onSearch={handleSearch} />
              {loading ? (
                <Loader />
              ) : error ? (
                <p className="status-message error">{error}</p>
              ) : movies.length > 0 ? (
                <MovieGrid movies={movies} onFavorite={addToFavorites} />
              ) : (
                <p className="no-movies">Search for a movie to get started!</p>
              )}
              {favorites.length > 0 && (
                <>
                  <h2>⭐ Your Favorites</h2>
                  <MovieGrid
                    movies={favorites}
                    onFavorite={addToFavorites}
                    onRemove={removeFromFavorites}
                  />
                </>
              )}
            </div>
          </>
        }
      />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route
        path="/favorites"
        element={
          <Favorites
            favorites={favorites}
            removeFavorite={removeFromFavorites}
          />
        }
      />
    </Routes>
  );
}
