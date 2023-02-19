import React, {useCallback, useState} from 'react'
import {Box, SelectChangeEvent} from '@mui/material';
import CustomTable from './components/CustomTable/CustomTable';
import {SortType} from './types';
import CustomSelect from './components/CustomSelect/CustomSelect';
import { sortItems, timeIntervals } from './constants';

const App: React.FC = () => {
  const [sortRule, setSortRule] = useState<SortType>(sortItems[0].value as SortType);
  const [timeToScan, setTimeToScan] = useState(timeIntervals[0].value)

  const handleChange = useCallback((event: SelectChangeEvent) => {
    setSortRule(event.target.value as SortType);
  }, []);

  const handleChangeTimeInterval = useCallback((event: SelectChangeEvent) => {
    setTimeToScan(event.target.value);
  }, [])

  return (
    <Box>
      <Box sx={{margin: '20px 0', display: 'flex', alignItems: 'center'}}>
        <CustomSelect
          handler={handleChange}
          title={'Sorting:'}
          value={sortRule}
          items={sortItems}
        />
        <CustomSelect
          handler={handleChangeTimeInterval}
          title={'Time Interval:'}
          value={timeToScan}
          items={timeIntervals}
        />
      </Box>
      <CustomTable sortRule={sortRule as SortType} timeInterval={timeToScan}/>
    </Box>
  )
}

export default App
