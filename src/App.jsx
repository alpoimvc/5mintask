import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState, cloneElement, createContext } from 'react'
import { searchTitle } from './api/moviesApi';
import './App.css'
import MovieList from './components/MovieList';
import SearchMovie from './components/SearchMovie';

export const AppContext = createContext({
  search: '',
  selectedTitle: '',
});

function App() {
  const [search, setSearch] = useState('');
  // const [selectedTitle, setSelectedTitle] = useState('');

  // const { data: movies, error, isFetching } = useQuery({
  //   queryKey: ['movies', selectedTitle],
  //   queryFn: () => searchTitle(selectedTitle),
  //   enabled: selectedTitle.length > 0,
  // })

  const { data: movies, error, isFetching } = useQuery({
    queryKey: ['movies', search],
    queryFn: () => searchTitle(search),
    enabled: search.length > 1,
  })

  console.log("App ", search, movies);

  return (
    <AppContext.Provider value={{ search, setSearch }}>
      <Box>
        <SearchMovie movies={movies} />
        <MovieList movies={movies} />
      </Box>
    </AppContext.Provider >
  )
}

export default App
