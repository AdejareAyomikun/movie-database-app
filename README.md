# 🎬 Movie Database (React)

A simple movie search app that lets you find films via the OMDb API, view results in a responsive grid, and open a details page for full info (plot, actors, ratings). Built with React + Vite and pure CSS.

## Features

- 🔎 Search movies by title (OMDb)
- 🖼️ Responsive grid (rows & columns) with uniform cards
- 🧭 Click a card → details page (plot, cast, genre, IMDb rating)
- 🔄 Loading & error states
- 🌐 Client-side routing (React Router)

## Tech Stack

- React + Vite
- React Router
- TypeScript
- CSS

## Quick Start

npm create vite@latest movie-db -- --template react
cd movie-db
npm i
npm i react-router-dom


Add your OMDb API key (free): https://www.omdbapi.com/apikey.aspx
Create .env.local at the project root:
VITE_OMDB_API_KEY=YOUR_OMDB_KEY

Run the app:
npm run dev

## Project Structure

src/
  components/
    SearchBar.jsx
    MovieGrid.jsx
    MovieCard.jsx
    MovieDetails.jsx
  App.jsx
  App.css
  main.jsx

## How It Works
- SearchBar triggers a fetch to https://www.omdbapi.com/?s=<query>&apikey=...
- MovieGrid displays results; MovieCard links to /movie/:id
- MovieDetails fetches https://www.omdbapi.com/?i=<imdbID>&apikey=...