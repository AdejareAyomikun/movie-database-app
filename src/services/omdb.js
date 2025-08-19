export async function searchMovies(query) {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.Response === "False") {
      return { movies: [], error: data.Error };
    }

    return { movies: data.Search, error: null };
  } catch (err) {
    return { movies: [], error: "Network error. Please try again." };
  }
}
