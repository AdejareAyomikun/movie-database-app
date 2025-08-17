export async function searchMovies(query) {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.Response === "False") {
    throw new Error(data.Error);
  }

  return data.Search; // array of movies
}