export const searchTitle = async (query) => {
  console.log("querying: ", query);
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_MOVIEDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`)
  return response.json();
}

export const searchMovie = async (id, includeMedia = false) => {
  console.log("searching movie: ", id);
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_MOVIEDB_API_KEY}&language=en-US,null${includeMedia === true ? '&append_to_response=images' : null}`)
  return response.json();
}

export const getPopularMovies = async () => {
  console.log("getting popular movies");
  const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_MOVIEDB_API_KEY}&language=en-US&page=1`)
  return response.json();
}

export const getMovieImages = async (id) => {
  console.log("searching movie images: ", id);
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_MOVIEDB_API_KEY}&language=en-US,null`)
  return response.json();
}

export const getMovieVideos = async (id) => {
  console.log("searching movie videos: ", id);
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_MOVIEDB_API_KEY}&language=en-US,null`)
  return response.json();
}
