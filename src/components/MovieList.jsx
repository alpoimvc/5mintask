import { Autocomplete, Box, Button, Card, CardContent, CardMedia, Chip, IconButton, List, ListItem, ListItemIcon, ListItemText, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../App';
import StarIcon from '@mui/icons-material/Star';

const MovieListItem = ({ movie }) => {
  const navigate = useNavigate();
  const { genres } = useContext(AppContext);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Card sx={{ width: { sm: '100%', md: '60vw', lg: '50vw' }, display: 'flex', margin: '0.25em auto', maxHeight: '300px' }} onClick={() => navigate("/movie/" + movie.id)}>
      <CardMedia
        component="img"
        sx={{ width: 200, objectFit: 'contain' }}
        image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt="Live from space album cover"
      />
      {matches ?
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', textAlign: 'left' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
              <Typography variant="h5">
                {movie.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ ml: '0.5em' }}>
                ({movie.release_date?.substring(0, 4)})
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                <StarIcon />
                <Typography variant="h6">
                  {Math.round(movie.vote_average * 10) / 10}
                </Typography></Box>
            </Box>
            <Stack direction="row" spacing={1} sx={{ mt: '0.75em' }}>
              {movie.genre_ids.map(id => <Chip label={genres[id]} key={id} />)}
            </Stack>
            <Typography variant="body1" sx={{ mt: '1em' }}>
              {movie.overview?.length > 600 ? movie.overview?.substring(0, 600) + "..." : movie.overview}
            </Typography>
          </CardContent>
        </Box >
        : null
      }
    </Card >
  )
}

const MovieList = ({ movies }) => {
  return (
    <List sx={{ margin: 0, padding: 0 }}>
      {movies.map(movie =>
        <MovieListItem movie={movie} key={movie.id} />
      )}
    </List>
  )
}

export default MovieList