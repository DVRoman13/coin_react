import {Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead,
  TablePagination, TableRow } from '@mui/material';
import React from 'react';
import appApi from '../../services/appApi';
import {COINS_PER_PAGE} from '../../constants';
import {Coin, SortType} from '../../types';
import Loader from '../Loader/Loader';


const CustomTable:React.FC<{
  sortRule: SortType
  timeInterval: string
}> = ({sortRule, timeInterval}) => {
  const [start, setStart] = React.useState(1);

  const {data: coinData, isLoading} = appApi.useGetDataQuery({limit: COINS_PER_PAGE, start: start}, {
    pollingInterval: +timeInterval
  })

  const [page, setPage] = React.useState(0);

  if(isLoading) {
    return <Loader/>
  }

  const renderCoins = (coins: Coin[], sortRule: string | null) => {
    if(sortRule === 'standard') return coins

    if(sortRule === 'cheap') {
      return [...coins].sort(function(a: Coin, b: Coin) {
        return a.quote.USD.price - b.quote.USD.price;
      });
    }

    if(sortRule === 'expensive') {
      return [...coins].sort(function(a: Coin, b: Coin) {
        return b.quote.USD.price - a.quote.USD.price;
      });
    }
    return coins
  }


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    setStart( COINS_PER_PAGE * newPage + 1)
  };

  const getTime = (date:Date) : string => `${new Date(date).getHours()}:${new Date(date).getMinutes()} ${new Date(date).toDateString()}`


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell align='left'>Name</StyledTableCell>
            <StyledTableCell align='left'>Last Update</StyledTableCell>
            <StyledTableCell align='left'>Price USD</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coinData && renderCoins(coinData.data, sortRule)?.map((coin) => (
            <StyledTableRow key={coin.name}>
              <StyledTableCell component='th' scope='row'>
                {coin.name}
              </StyledTableCell>
              <StyledTableCell align='left'>{getTime(coin?.last_updated)}</StyledTableCell>
              <StyledTableCell align='left'>{+coin.quote.USD.price.toFixed(3)}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component='div'
        count={coinData?.status.total_count as number}
        rowsPerPage={COINS_PER_PAGE}
        rowsPerPageOptions={[]}
        page={page}
        onPageChange={handleChangePage}
      />
    </TableContainer>
  )
}


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default CustomTable