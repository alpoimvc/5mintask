import { useState, cloneElement } from 'react';
import { Autocomplete, List, ListItem, ListItemIcon, ListItemText, TextField } from '@mui/material';
import useSearchMovie from '../hooks/query/useSearchMovie';

export default function SearchMovie() {
  const [search, setSearch] = useState('');
  const { isLoading, error, data } = useSearchMovie(search);

  console.log("search:", search, data);

  return (
    <div>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={data ? data.results.map((option) => option.title) : []}
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
    </div>
  )
}

