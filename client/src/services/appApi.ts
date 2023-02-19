import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import {CoinQuery, Response} from '../types';

const baseQuery = fetchBaseQuery({
  baseUrl: '/',
  prepareHeaders: (headers) => {
    headers.set('Access-Control-Allow-Origin', '*')
  }
})

const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: baseQuery,
  endpoints: (build) => ({
    getData: build.query<Response, CoinQuery>({
      query: ({limit, start}) => ({
        url: '/api',
        params: {
          limit: limit,
          start: start
        }
      })
    })
  })
})

export default appApi

