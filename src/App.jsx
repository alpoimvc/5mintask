import { Box, CircularProgress } from '@mui/material';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useState, cloneElement, createContext, useEffect } from 'react'
import { getMovieGenres, getPopularMovies, searchTitle } from './api/moviesApi';
import { useParams } from "react-router-dom";
import './App.css'
import MovieList from './components/MovieList';
import SearchMovie from './components/SearchMovie';
import { useGetMovies } from './hooks/useGetMovies';

export const AppContext = createContext({
  search: '',
  selectedTitle: '',
});

function App() {
  const [searchQuery, setSearchQuery] = useState();
  let { title } = useParams();

  useEffect(() => {
    console.log("App, useffect title 1", title, searchQuery);
    if (title?.length > 0) {
      setSearchQuery(title);
    }
    else {
      console.log("App, useffect title 2", title, searchQuery);
      setSearchQuery()
    }
  }, [title])

  const { data, isLoading, isFetching } = useGetMovies(searchQuery, title);
  const { data: genres } = useQuery({
    queryKey: ['genres', getMovieGenres],
    queryFn: () => getMovieGenres()
  });


  // const GENRES = {
  //   Action: 1,
  //   Adventure: 2,
  // }

  // const results = useQueries({
  //   queries: [
  //     {
  //       queryKey: ['movies', searchQuery],
  //       queryFn: () => searchTitle(searchQuery),
  //       enabled: searchQuery?.length > 0,
  //     },
  //     {
  //       queryKey: ['popular'],
  //       queryFn: () => getPopularMovies(),
  //       enabled: !searchQuery && !title,
  //     }
  //   ]
  // })

  // console.log("render App: ", searchQuery, title, results[0].isFetching, results[1].isFetching);
  console.log("App: ", data, isLoading, isFetching, genres);

  return (
    <AppContext.Provider value={{ searchQuery }}>
      <Box sx={{ textAlign: 'center', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <SearchMovie movies={data} title={title} />
        {isLoading || isFetching ?
          <CircularProgress sx={{ margin: 'auto' }} />
          : <MovieList movies={data} />
        }
      </Box>
    </AppContext.Provider >
  )
}

export default App
