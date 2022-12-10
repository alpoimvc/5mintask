import { Autocomplete, Box, Card, CardContent, CardMedia, IconButton, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import React, { cloneElement } from 'react';
import { useNavigate } from "react-router-dom";

const MovieListItem = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ width: '70vw', display: 'flex', margin: '0.25em auto' }} onClick={() => navigate("/movie/" + movie.id)}>
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
    // <Box sx={{ width: '70vw', margin: '1em auto', display: 'flex', border: '1px solid gray' }} onClick={() => navigate("/movie/" + movie.id)}>
    //   <Box sx={{ width: '200px', height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    //     {movie.poster_path ? <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} /> : <p>No image available</p>}
    //   </Box>
    //   <Box sx={{ padding: '0 1em' }}>
    //     <p>{movie.title}</p>
    //     <p sx={{}}>{movie?.release_date?.substring(0, 4)}</p>
    //   </Box>
    // </Box >
  )
}

const MovieList = ({ movies }) => {
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