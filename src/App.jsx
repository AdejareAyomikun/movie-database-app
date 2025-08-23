import { useState } from "react";
import { Routes,Route } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import MovieGrid from "./components/MovieGrid";
import MovieDetails from "./components/MovieDetails";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  return (
<div className="app-container">
  <header className="app-title">🎬 Movie Database</header>
  <Routes>
    <Route
      path="/"
      element={
        <>
          <SearchBar onSearch={handleSearch} />
          {loading ? (
            <p className="status-message">Loading...</p>
          ) : error ? (
            <p className="status-message error">{error}</p>
          ) : movies.length > 0 ? (
            <MovieGrid movies={movies} />
          ) : (
            <p className="no-movies">Search for a movie to get started!</p>
          )}
        </>
      }
    />
    <Route path="/movie/:id" element={<MovieDetails />} />
  </Routes>
</div>
  );
}
