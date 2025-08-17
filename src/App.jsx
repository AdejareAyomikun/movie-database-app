// App.jsx
import { useState } from "react";
import { searchMovies } from "./services/omdb";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    try {
      const results = await searchMovies(query);
      setMovies(results);
    } catch (err) {
      setError(err.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 text-center text-xl font-bold">
        Movie Database
      </header>

      <main className="max-w-4xl mx-auto p-4">
        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movie..."
            className="flex-grow p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </form>

        {/* Loading state */}
        {loading && <p className="text-gray-600">Loading...</p>}

        {/* Error state */}
        {error && <p className="text-red-600">{error}</p>}

        {/* Movies grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="bg-white rounded shadow p-2">
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/150"
                }
                alt={movie.Title}
                className="w-full h-60 object-cover rounded"
              />
              <h3 className="text-sm font-bold mt-2">{movie.Title}</h3>
              <p className="text-xs text-gray-600">{movie.Year}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
