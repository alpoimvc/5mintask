import { Autocomplete, Box, Card, CardContent, CardMedia, IconButton, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import React, { cloneElement } from 'react';
import { useNavigate } from "react-router-dom";

const MovieListItem = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ width: '55vw', display: 'flex', margin: '0.25em auto' }} onClick={() => navigate("/movie/" + movie.id)}>
      <CardMedia
        component="img"
        sx={{ width: 250 }}
        image={movie.poster_path ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}` : './photo.svg'}
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {movie.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Mac Miller
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          Test
        </Box>
      </Box>
    </Card>
  )
}

const MovieList = ({ movies }) => {
  console.log("render MovieList", movies);
  return (
    movies?.results?.length > 0 ?
      <List sx={{ margin: '2em 0' }}>
        {movies.results.map(movie =>
          <MovieListItem movie={movie} key={movie.id} />
        )}
      </List>
      : null
  )
}

export default MovieList