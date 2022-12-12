import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useState, cloneElement, createContext, useEffect } from 'react'
import { getMovieCredits, getGenres, getPopularMovies, searchTitle } from './api/moviesApi';
import { useParams } from "react-router-dom";
import MovieList from './components/MovieList';
import SearchMovie from './components/SearchMovie';
import { useGetMovies } from './hooks/useGetMovies';

export const AppContext = createContext({
  search: '',
  genres: {},
});

function App() {
  const [searchQuery, setSearchQuery] = useState();
  const [genres, setGenres] = useState({});
  let { title } = useParams();
  const theme = useTheme();

  useEffect(() => {
    if (title?.length > 0) {
      setSearchQuery(title);
    }
    else {
      setSearchQuery()
    }
  }, [title])

  useEffect(() => {
    let genresEnum = {};
    getGenres()
      .then(res => res.genres.forEach(genre => genresEnum[genre.id] = genre.name))
      .then(() => setGenres({ ...genresEnum }));
  }, [])

  const { data, isLoading, isFetching, isSuccess } = useGetMovies(searchQuery, title);
  const movies = isSuccess ? data.results : [];

  console.log("App: ", data);

  return (
    <AppContext.Provider value={{ searchQuery, genres }}>
      <Box sx={{ textAlign: 'center', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: theme.palette.background }}>
        <SearchMovie movies={movies} title={title} />
        {isLoading || isFetching ?
          <CircularProgress sx={{ margin: 'auto' }} />
          :
          movies.length > 0 ? <MovieList movies={movies} /> : <Typography variant="h3" sx={{ mt: '2em' }}>No Movies Found</Typography>
        }
        <a href="/popular/?page=2">
          Next Page
        </a>
      </Box>
    </AppContext.Provider >
  )
}

export default App
