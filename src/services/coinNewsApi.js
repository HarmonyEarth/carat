import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const coinNewsApiHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key':  `${process.env.REACT_APP_BINGNEWS_KEY}`
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = (newsCategory, count) => ({
    url: `/news/search?q=${newsCategory}&safeSearch=Moderate&textFormat=Raw&freshness=Day&count=${count}`,
    headers: coinNewsApiHeaders
});

export const coinNewsApi = createApi({
    reducerPath: 'coinNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCoinNews: builder.query({
            queryFn: ({ newsCategory, count }) => createRequest(newsCategory, count),
        })
    }),
});

export const {
    useGetCoinNewsQuery,
} = coinNewsApi;
