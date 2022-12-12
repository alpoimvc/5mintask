import { Box, CircularProgress, useTheme } from '@mui/material'
import { useState, createContext, useEffect, Fragment } from 'react'
import { useParams } from "react-router-dom"
import MovieList from './components/MovieList'
import SearchMovie from './components/SearchMovie'
import { useGetMovies } from './hooks/useGetMovies'
import { useInView } from 'react-intersection-observer'
import { getGenres } from './api/moviesApi'

export const AppContext = createContext({
  search: '',
  genres: {},
});

function App() {
  const [searchQuery, setSearchQuery] = useState();
  const [genres, setGenres] = useState({});
  let { title } = useParams();
  const theme = useTheme();
  const { ref, inView } = useInView();
  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = useGetMovies(searchQuery, title);

  useEffect(() => {
    let fetching = false;
    if (inView && !fetching) {
      fetching = true;
      if (hasNextPage) fetchNextPage();
      fetching = false;
    }
  }, [inView])

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

  return (
    <AppContext.Provider value={{ searchQuery, genres }}>
      <Box sx={{ textAlign: 'center', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: theme.palette.background }}>
        <SearchMovie movies={data?.pages[0]?.results} title={title} />
        {isLoading
          ? <CircularProgress sx={{ margin: 'auto' }} />
          : <>
            {data?.pages?.map((page) => (
              <Fragment key={page.page}>
                <MovieList movies={page.results} key={page.page} />
              </Fragment>
            ))}
            <div>
              <button
                ref={ref}
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                {isFetchingNextPage
                  ? <CircularProgress sx={{ margin: 'auto' }} />
                  : hasNextPage
                    ? 'Load Newer'
                    : 'Nothing more to load'}
              </button>
            </div>
          </>
        }
      </Box>
    </AppContext.Provider >
  )
}

export default App
