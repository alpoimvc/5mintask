export const searchTitle = async (query) => {
  console.log("querying: ", query);
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_MOVIEDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`)
  return response.json();
}

export const searchMovie = async (query) => {
  console.log("querying: ", query);
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_MOVIEDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`)
  return response.json();
}
