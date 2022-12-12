import { Avatar, Box, Chip, Stack, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from "react-router-dom";
import { searchMovie } from '../api/moviesApi';
import CircularProgress from '@mui/material/CircularProgress';
import StarIcon from '@mui/icons-material/Star';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import LinkIcon from '@mui/icons-material/Link';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const MovieDetails = () => {
  let { movieId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));
  const isMedium = useMediaQuery(theme.breakpoints.up('sm'));
  const { data: movie, isLoading, isFetching, isSuccess } = useQuery(
    {
      queryKey: ['movie', movieId],
      queryFn: () => searchMovie(movieId, true),
      enabled: movieId?.length > 0,
    }
  );

  let trailerLink;
  if (isSuccess && movie?.videos?.results.length > 0) {
    trailerLink = movie.videos.results.find(video => video.name === "Official Trailer")?.key;
  }

  return (
    <>
      {isMedium ? <KeyboardBackspaceIcon sx={{ fontSize: 60, top: '0.25em', left: '0.25em', position: 'absolute', cursor: 'pointer' }} onClick={() => navigate(-1)} /> : null}
      <Box sx={{ maxWidth: '100%', padding: { xs: '2em 1em', sm: '2em 1em', md: '6em 2em' } }} >
        {isLoading || isFetching ?
          <CircularProgress sx={{ margin: 'auto' }} />
          : <Box sx={{ maxWidth: '100%', display: 'flex', flexDirection: { xs: 'column', sm: 'column', md: 'row' }, margin: { xs: '1em', sm: '1em', md: '2em', lg: '2em 6em', xl: '2em 8em' } }}>
            <Box sx={{ maxWidth: { xs: '100%', sm: '100%', md: '40%', lg: '30%' }, textAlign: 'center' }}>
              <img src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`} loading="lazy" style={{ maxWidth: "100%", borderRadius: '0.8rem' }} />
            </Box>
            <Box sx={{ maxWidth: { xs: '100%', sm: '100%', md: '60%', lg: '60%' }, margin: { md: '0 2em' } }}>
              <Typography variant="h3" sx={{ textTransform: 'uppercase', fontWeight: '200', width: '100%' }}>{movie.title} </Typography>
              <Typography variant="h5">{movie.tagline} </Typography>
              <Box sx={{ display: 'flex', mt: '1em', flexDirection: { xs: 'column', sm: 'column', md: 'row' } }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}><StarIcon /><Typography variant="body1" >{Math.round(movie.vote_average * 10) / 10} / 10</Typography></Box>
                <Typography variant="body1" color="text.secondary" sx={{ ml: { md: 'auto' } }}>{movie.spoken_languages[0]?.name} / {movie.runtime} MIN. / {movie.release_date?.substring(0, 4)}</Typography>
              </Box>
              <Typography variant="h6" sx={{ mt: '1.2em' }}>Genres</Typography>
              <Stack direction="row" spacing={1} sx={{ mt: '0.5em' }}>
                {movie.genres?.map(genre => <Chip label={genre.name} key={genre.id} />)}
              </Stack>
              <Typography variant="h6" sx={{ mt: '1.5em' }}>Synopsis</Typography>
              <Typography variant="body1" sx={{ mt: '0.5em' }}>{movie.overview}</Typography>
              <Typography variant="h6" sx={{ mt: '1.5em' }}>Cast</Typography>
              <Stack direction="row" spacing={2} sx={{ mt: '0.5em' }}>
                {movie.credits?.cast?.slice(0, isMedium ? 8 : 5).map(person =>
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
                  icon={<PlayArrowIcon />}
                /> : null}
                {movie.homepage ? <Chip
                  variant="outlined"
                  label="Website"
                  onClick={() => window.open('https://www.dc.com/BlackAdam', "_blank")}
                  icon={<LinkIcon />}
                /> : null}
                {movie.imdb_id ? <Chip
                  variant="outlined"
                  label="IMDB"
                  onClick={() => window.open('https://www.imdb.com/title/' + movie.imdb_id, "_blank")}
                /> : null}
              </Stack>
            </Box>
          </Box>
        }
      </Box>
    </>
  )
}

export default MovieDetails