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
  const [recommended, setRecommended] = useState([]);
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState("light");

  // Persist theme in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Fetch recommended & latest movies by default
  useEffect(() => {
    const fetchDefaults = async () => {
      try {
        // Recommended Movies (e.g. Avengers)
        const res1 = await fetch(
          `https://www.omdbapi.com/?apikey=${
            import.meta.env.VITE_OMDB_API_KEY
          }&s=avengers`
        );
        const data1 = await res1.json();
        if (data1.Response === "True") setRecommended(data1.Search);

        // Latest Movies (e.g. 2025 releases)
        const res2 = await fetch(
          `https://www.omdbapi.com/?apikey=${
            import.meta.env.VITE_OMDB_API_KEY
          }&s=2025`
        );
        const data2 = await res2.json();
        if (data2.Response === "True") setLatest(data2.Search);
      } catch (err) {
        console.error("Error fetching default movies:", err);
      }
    };

    fetchDefaults();
  }, []);

  // Search handler
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
              <Link to="/favorites">Favorites</Link>
                 <button onClick={toggleTheme} style={{ marginLeft: "auto" }}>
                {theme === "light" ? "Dark" : "Light"}
              </button>
            </nav>
            <div className="app-container">
              <header className="app-title">Movie Database</header>
              <SearchBar onSearch={handleSearch} />
              {loading ? (
                <Loader />
              ) : error ? (
                <p className="status-message error">{error}</p>
              ) : movies.length > 0 ? (
                <MovieGrid movies={movies} onFavorite={addToFavorites} />
              ) : (
                <>
                  {/* Default Sections */}
                  {recommended.length > 0 && (
                    <>
                      <h2>Recommended</h2>
                      <MovieGrid
                        movies={recommended}
                        onFavorite={addToFavorites}
                        favorites={favorites}
                      />
                    </>
                  )}

                  {latest.length > 0 && (
                    <>
                      <h2>Latest Releases</h2>
                      <MovieGrid
                        movies={latest}
                        onFavorite={addToFavorites}
                        favorites={favorites}
                      />
                    </>
                  )}
                </>
              )}

              {favorites.length > 0 && (
                <>
                  <h2>Your Favorites</h2>
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
