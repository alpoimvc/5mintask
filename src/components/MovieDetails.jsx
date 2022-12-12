import { Autocomplete, Avatar, Box, Chip, ImageList, ImageListItem, List, ListItem, ListItemIcon, ListItemText, Stack, TextField, Tooltip, Typography } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import React, { cloneElement } from 'react';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from "react-router-dom";
import { searchMovie, getMovieVideos, getMovieImages, getMovieCredits, getImage } from '../api/moviesApi';
import CircularProgress from '@mui/material/CircularProgress';
import StarIcon from '@mui/icons-material/Star';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import LinkIcon from '@mui/icons-material/Link';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const MovieDetails = () => {
  let { movieId } = useParams();
  const navigate = useNavigate();
  const { data: movie, isLoading, isFetching, isSuccess } = useQuery(
    {
      queryKey: ['movie', movieId],
      queryFn: () => searchMovie(movieId, true),
      enabled: movieId?.length > 0,
    }
  );

  let trailerLink;
  if (isSuccess && movie?.videos?.results.length > 0) {
    trailerLink = movie.videos.results.find(video => video.name === "Official Trailer").key;
  }

  console.log("Movie details", movie);

  return (
    <Box sx={{ maxWidth: '70vw', margin: '7em auto', display: 'flex', backgroundColor: 'white' }}>
      <KeyboardBackspaceIcon sx={{ fontSize: 60, top: '0.25em', left: '0.25em', position: 'absolute', cursor: 'pointer' }} onClick={() => navigate(-1)} />
      {isLoading || isFetching ?
        <CircularProgress sx={{ margin: 'auto' }} />
        : <Box sx={{ maxWidth: '100%', display: 'flex' }}>
          <Box sx={{ maxWidth: '40%' }}>
            <img src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`} loading="lazy" style={{ maxWidth: "100%", height: 'auto', borderRadius: '0.8rem' }} />
          </Box>
          <Box sx={{ margin: '0 4em', maxWidth: '60%' }}>
            <Typography variant="h3" sx={{ textTransform: 'uppercase', fontWeight: '200' }}>{movie.title} </Typography>
            <Typography variant="h5">{movie.tagline} </Typography>
            <Box sx={{ display: 'flex', mt: '1em' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}><StarIcon /><Typography variant="body1" >{Math.round(movie.vote_average * 10) / 10} / 10</Typography></Box>
              <Typography variant="body1" color="text.secondary" sx={{ ml: 'auto' }}>{movie.spoken_languages[0]?.name} / {movie.runtime} MIN. / {movie.release_date?.substring(0, 4)}</Typography>
            </Box>
            <Typography variant="h6" sx={{ mt: '1.2em' }}>Genres</Typography>
            <Stack direction="row" spacing={1} sx={{ mt: '0.5em' }}>
              {movie.genres?.map(genre => <Chip label={genre.name} key={genre.id} />)}
            </Stack>
            <Typography variant="h6" sx={{ mt: '1.5em' }}>Synopsis</Typography>
            <Typography variant="body1" sx={{ mt: '0.5em' }}>{movie.overview}</Typography>
            <Typography variant="h6" sx={{ mt: '1.5em' }}>Cast</Typography>
            <Stack direction="row" spacing={2} sx={{ mt: '0.5em' }}>
              {movie.credits?.cast?.slice(0, 8).map(person =>
                <Tooltip title={person.name} key={person.id}>
                  <Avatar alt={person.name} src={"https://image.tmdb.org/t/p/w500" + person.profile_path} />
                </Tooltip>
              )}
            </Stack>
            <Stack direction="row" spacing={3} sx={{ mt: '2em' }}>
              {trailerLink ? <Chip
                variant="outlined"
                label="Trailer"
                onClick={() => window.open('https://www.youtube.com/watch?v=' + trailerLink, "_blank")}
                // onDelete={handleDelete}
                icon={<PlayArrowIcon />}
              /> : null}
              {movie.homepage ? <Chip
                variant="outlined"
                label="Website"
                onClick={() => window.open('https://www.dc.com/BlackAdam', "_blank")}
                // onDelete={handleDelete}
                icon={<LinkIcon />}
              /> : null}
              {movie.imdb_id ? <Chip
                variant="outlined"
                label="IMDB"
                onClick={() => window.open('https://www.imdb.com/title/' + movie.imdb_id, "_blank")}
              // onDelete={handleDelete}
              // deleteIcon={<DoneIcon />}
              /> : null}
            </Stack>
          </Box>
        </Box>
      }
    </Box>
  )
}

export default MovieDetails