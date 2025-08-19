import { useState } from "react";
import SearchBar from "./components/SearchBar";
import { searchMovies } from "./services/omdb";
import MovieGrid from "./components/MovieGrid";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    if (!query) return;
    const { movies, error } = await searchMovies(query);
    setMovies(movies);
    setError(error);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-indigo-600 text-white p-4 text-center text-xl font-bold">
        🎬 Movie Database
      </header>
      <main className="p-4 max-w-4xl mx-auto">
        <SearchBar onSearch={handleSearch} />
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <MovieGrid movies={movies} />
      </main>
    </div>
  );
}
