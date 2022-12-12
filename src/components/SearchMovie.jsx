import { useEffect, useState } from 'react';
import { Autocomplete, TextField, useTheme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { searchMovie } from '../api/moviesApi';
import { useContext } from 'react';
import { AppContext } from '../App';
import { useNavigate, useParams } from "react-router-dom";

export default function SearchMovie({ movies, title }) {
  const navigate = useNavigate();
  const { searchQuery } = useContext(AppContext);

  return (
    <Autocomplete
      freeSolo
      id="free-solo-2-demo"
      disableClearable
      options={movies && searchQuery?.length > 2 ? movies.map((option) => option.title) : []}
      sx={{ width: '30vw', margin: '1em auto' }}
      renderOption={(props, option) =>
        <li {...props} key={props.id}>
          {option}
        </li>
      }
      value={title || searchQuery}
      onInputChange={(e, newValue) => {
        if (newValue === '') navigate("/")
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search movie"
          InputProps={{
            ...params.InputProps,
            type: 'search',
          }}
          onKeyUp={e => {
            if (e.target.value === '') navigate("/")
            else navigate("/search/" + e.target.value)
          }}
        />
      )}
    />
  )
}

