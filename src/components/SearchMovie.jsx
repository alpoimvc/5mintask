import { Autocomplete, TextField } from '@mui/material';
import { useContext } from 'react';
import { AppContext } from '../App';
import { useNavigate } from "react-router-dom";

export default function SearchMovie({ movies, title }) {
  const navigate = useNavigate();
  const { searchQuery } = useContext(AppContext);

  return (
    <Autocomplete
      freeSolo
      id="free-solo-2-demo"
      disableClearable
      options={movies && searchQuery?.length > 2 ? movies.map((option) => option.title) : []}
      sx={{ width: { xs: '50vw', md: '30vw', lg: '30vw' }, margin: '2em auto' }}
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

