import { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { searchMovie } from '../api/moviesApi';
import { useContext } from 'react';
import { AppContext } from '../App';

export default function SearchMovie({ movies }) {
  const { search, setSearch } = useContext(AppContext);

  console.log("SearchMovie context", search);
  console.log("movies:", movies);

  return (
    <Autocomplete
      freeSolo
      id="free-solo-2-demo"
      disableClearable
      options={movies ? movies.results.map((option) => option.title) : []}
      sx={{ width: '50vw', margin: 'auto' }}
      renderOption={(props, option) =>
        <li {...props} key={props.id}>
          {option}
        </li>
      }
      onChange={(e, newValue) => {
        setSearch(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search input"
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }}
          onKeyUp={e => setSearch(e.target.value)}
        />
      )}
    />
  )
}

