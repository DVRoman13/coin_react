import React, {useState} from 'react'
import './App.css'
import {Box, Select, MenuItem, SelectChangeEvent, Typography} from '@mui/material';
import CustomTable from './components/CustomTable/CustomTable';
import {SortType} from './types';

const App: React.FC = () => {
  const [sortRule, setSortRule] = useState<SortType>('standard')

  const handleChange = (event: SelectChangeEvent<SortType>) => {
    setSortRule(event.target.value as SortType);
  };

  return (
    <Box>
      <Box sx={{margin: '20px 0', display: 'flex', alignItems: 'center'}}>
        <Typography sx={{marginRight: '20px'}}>Sorting:</Typography>
        <Select
          value={sortRule as SortType}
          label='Sorting'
          onChange={handleChange}
        >
          <MenuItem value={'standard'}>Standard</MenuItem>
          <MenuItem value={'expensive'}>Expensive</MenuItem>
          <MenuItem value={'cheap'}>Cheap</MenuItem>
        </Select>
      </Box>
      <CustomTable sortRule={sortRule as SortType}/>
    </Box>
  )
}

export default App
