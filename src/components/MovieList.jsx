import { Autocomplete, Box, List, ListItem, ListItemIcon, ListItemText, TextField } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import React, { cloneElement } from 'react';

function generate(element) {
  return [0, 1, 2].map((value) =>
    cloneElement(element, {
      key: value,
    }),
  );
}

const MovieListItem = ({ movie }) => {
  return (
    <Box sx={{ width: '70vw', margin: '1em auto', display: 'flex' }}>
      <Box sx={{ width: '200px', height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        {movie.poster_path ? <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} /> : <p>No image available</p>}
      </Box>
      <Box sx={{ padding: '0 1em' }}>
        <p>{movie.title}</p>
        <p sx={{}}>{movie?.release_date?.substring(0, 4)}</p>
      </Box>
    </Box>
  )
}

const MovieList = ({ movies }) => {
  console.log("list:", movies);
  return (
    movies?.results?.length > 0 ?
      <List>
        {movies.results.map(movie => generate(
          <MovieListItem movie={movie} onClick={() => console.log("test")} />
        )
        )}
      </List>
      : <p>Search for a title</p>
  )
}

export default MovieList