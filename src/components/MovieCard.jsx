export default function MovieCard({ movie }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-3">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
        alt={movie.Title}
        className="w-full h-72 object-cover rounded-lg"
      />
      <div className="mt-2">
        <h3 className="text-lg font-semibold">{movie.Title}</h3>
        <p className="text-gray-600">{movie.Year}</p>
      </div>
    </div>
  );
}
