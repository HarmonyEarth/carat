import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const coinApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': `${process.env.REACT_APP_COINRANKING_KEY}`
}
 
const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: coinApiHeaders });

export const coinApi = createApi({
    reducerPath: 'coinApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCoins: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`),
        }),
        getCoinDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`),
        }),
        getCoinHistory: builder.query({
            query: ({coinId, timePeriod}) => createRequest(`/coin/${coinId}/history/${timePeriod}`),
        }),
        getExchanges: builder.query({
            query: () => createRequest('/exchanges'),
        }),
    })
});

export const {
    useGetCoinsQuery, 
    useGetCoinDetailsQuery,
    useGetCoinHistoryQuery,
    useGetExchangesQuery,
} = coinApi;