import { Box, CircularProgress } from '@mui/material';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useState, cloneElement, createContext, useEffect } from 'react'
import { getPopularMovies, searchTitle } from './api/moviesApi';
import { useParams } from "react-router-dom";
import './App.css'
import MovieList from './components/MovieList';
import SearchMovie from './components/SearchMovie';

export const AppContext = createContext({
  search: '',
  selectedTitle: '',
});

function App() {
  const [search, setSearch] = useState('');
  let { title } = useParams();

  useEffect(() => {
    if (title?.length > 0) {
      setSearch(title);
    }
  }, [])

  const results = useQueries({
    queries: [
      {
        queryKey: ['movies', search],
        queryFn: () => searchTitle(search),
        enabled: search?.length > 0,
      },
      {
        queryKey: ['popular'],
        queryFn: () => getPopularMovies()
      }
    ]
  })

  // const { data: movies, isLoading, isFetching } = useQuery({
  //   queryKey: ['movies', search],
  //   queryFn: () => searchTitle(search),
  //   enabled: search?.length > 0,
  // })

  // const { data: popularMovies, isLoadingPopular, isFetchingPopular } = useQuery({
  //   queryKey: ['popular'],
  //   queryFn: () => getPopularMovies()
  // })

  // console.log("search, title, App: ", search, title);
  console.log("movies: ", results);
  // console.log("popular movies: ", popularMovies);

  return (
    <AppContext.Provider value={{ search, setSearch }}>
      <Box sx={{ textAlign: 'center' }}>
        <SearchMovie movies={results[0]} />
        {/* {(isLoading && isFetching) || (isLoadingPopular && isFetchingPopular) ?
          <CircularProgress />
          : <MovieList movies={results[0].data || results[1].data} />
        } */}
      </Box>
    </AppContext.Provider >
  )
}

export default App
