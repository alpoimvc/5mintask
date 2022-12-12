export const searchTitle = async (query, pageParam = 1) => {
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_MOVIEDB_API_KEY}&language=en-US&query=${query}&page=${pageParam}&include_adult=false`)
  return response.json();
}

export const searchMovie = async (id, includeMedia = false) => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_MOVIEDB_API_KEY}&language=en-US,null${includeMedia === true ? '&append_to_response=images,credits,videos' : null}`)
  return response.json();
}

export const getGenres = async () => {
  const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_MOVIEDB_API_KEY}&language=en-US`)
  return response.json();
}

export const getMovieCredits = async (id) => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_MOVIEDB_API_KEY}&language=en-US`)
  return response.json();
}

export const getPopularMovies = async (pageParam = 1) => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_MOVIEDB_API_KEY}&page=${pageParam}&language=en-US`)
  return response.json();
}

export const getMovieImages = async (id) => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_MOVIEDB_API_KEY}&language=en-US,null`)
  return response.json();
}

export const getImage = async (path) => {
  const response = await fetch(`https://image.tmdb.org/t/p/w500` + path);
  return response.json();
}

export const getMovieVideos = async (id) => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_MOVIEDB_API_KEY}&language=en-US,null`)
  return response.json();
}
