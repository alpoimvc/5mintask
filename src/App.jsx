import { useState, cloneElement } from 'react'
import './App.css'
import { Autocomplete, List, ListItem, ListItemIcon, ListItemText, TextField } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import useSearchMovie from './hooks/query/useSearchMovie';
import SearchMovie from './components/SearchMovie';

function App() {

  function generate(element) {
    return [0, 1, 2].map((value) =>
      cloneElement(element, {
        key: value,
      }),
    );
  }

  return (
    <div className="App">
      <SearchMovie />
      <List dense={true}>
        {generate(
          <ListItem>
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText
              primary="Single-line item"
              secondary={true ? 'Secondary text' : null}
            />
          </ListItem>,
        )}
      </List>
    </div>
  )
}

export default App
