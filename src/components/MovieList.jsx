import { Autocomplete, List, ListItem, ListItemIcon, ListItemText, TextField } from '@mui/material';
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
  console.log(movie);
  return (
    <div sx={{ width: '70vw', margin: 'auto' }}>
      <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} />
      <p>{movie.title}</p>
      {/* secondary={true ? 'Secondary text' : null} */}
    </div>
  )
}

const MovieList = ({ movies }) => {
  console.log("list:", movies);
  return (
    movies?.results?.length > 0 ?
      <List>
        {movies.results.map(movie => generate(
          <MovieListItem movie={movie} />
        )
        )}
      </List>
      : <p>Search for a title</p>
  )
}

export default MovieList