import React from 'react';
import {MenuItem, Select, SelectChangeEvent, Typography} from '@mui/material';
import {SelectItems, SortType} from '../../types';


const CustomSelect: React.FC<{
  // eslint-disable-next-line no-unused-vars
  handler: (e: SelectChangeEvent) => void,
  title: string;
  items: SelectItems[];
  value: string
}> = ({handler, title, items, value}) => {

  return (
    <>
      <Typography>{title}:</Typography>
      <Select
        value={value as SortType}
        label='Sorting'
        onChange={handler}
      >
        {items && items.map((item) => {
          return   <MenuItem key={item.value} value={item.value}>{item.title}</MenuItem>
        })}
      </Select>
    </>
  )
}

export default CustomSelect