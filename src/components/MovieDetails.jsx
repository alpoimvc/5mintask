import { Autocomplete, Box, ImageList, ImageListItem, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import React, { cloneElement } from 'react';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useParams } from "react-router-dom";
import { searchMovie, getMovieVideos, getMovieImages } from '../api/moviesApi';
import CircularProgress from '@mui/material/CircularProgress';

const MovieDetails = () => {
  let { movieId } = useParams();

  // const results = useQueries({
  //   queries: [
  //     {
  //       queryKey: ['movie', movieId],
  //       queryFn: () => searchMovie(movieId, true),
  //       enabled: movieId?.length > 0,
  //     },
  //     // {
  //     //   queryKey: ['movieImages', movieId],
  //     //   queryFn: () => getMovieImages(movieId),
  //     //   enabled: movieId?.length > 0,
  //     // },
  //     // {
  //     //   queryKey: ['movieVideos', movieId],
  //     //   queryFn: () => getMovieImages(movieId),
  //     //   enabled: movieId?.length > 0,
  //     // }
  //   ]
  // })

  const { data: movie, error, isLoading } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => searchMovie(movieId, true),
    enabled: movieId?.length > 0,
  })

  // const { data: movieVideos } = useQuery({
  //   queryKey: ['movie', movieId],
  //   queryFn: () => getMovieVideos(movieId),
  //   enabled: movieId?.length > 0,
  // })

  // const { data: movieImages } = useQuery({
  //   queryKey: ['movie', movieId],
  //   queryFn: () => getMovieImages(movieId),
  //   enabled: movieId?.length > 0,
  // })

  console.log("render MovieDetails", movie);
  // console.log("movieVideos", movieVideos);
  // console.log("movieImages", movieImages);

  return (
    <Box sx={{ width: '70vw', height: '100vh', margin: 'auto', display: 'flex', backgroundColor: 'white' }}>
      {isLoading ?
        <CircularProgress sx={{ margin: 'auto' }} />
        : <Box sx={{ border: '1px solid gray', width: '100%', dispaly: 'flex' }}>
          <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} loading="lazy" />
          <Typography variant="h2">{movie.title}</Typography>
          {/* <ImageList sx={{ width: '100%', height: 450 }} cols={3} rowHeight={164}>
            {movie?.images?.backdrops.map((item) => (
              <ImageListItem key={item.img}>
                <img src={`https://image.tmdb.org/t/p/w200/${item.file_path}`} loading="lazy" />
              </ImageListItem>
            ))}
          </ImageList> */}
          <Typography variant="h2body1">{movie.overview}</Typography>
        </Box>
      }
    </Box>
  )
}

export default MovieDetails