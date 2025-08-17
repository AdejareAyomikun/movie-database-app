import React from 'react'

export default function App() {
  return (
    <div className="container py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">🎬 Movie DB</h1>
        <p className="text-gray-600">Step 1: Project setup + static UI (no functionality yet)</p>
      </header>

      <section className="card p-4">
        <form className="flex gap-2" onSubmit={(e)=>e.preventDefault()}>
          <input className="input" placeholder="Search movies (not active yet)" aria-label="Search" />
          <button className="btn" type="submit">Search</button>
        </form>
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="card h-64 flex items-center justify-center text-gray-500">Poster
          </div>
        ))}
      </section>
    </div>
  )
}
