const axios = require('axios');

const coinNewsApiHeaders = {
  'X-BingApis-SDK': 'true',
  'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
  'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
};

export const useGetCoinNewsQuery = async ({ newsCategory, count }) => {
  const options = {
    method: 'GET',
    url: 'https://bing-news-search1.p.rapidapi.com/news/search',
    params: {
      q: newsCategory,
      freshness: 'Day',
      textFormat: 'Raw',
      safeSearch: 'Moderate',
      count: count
    },
    headers: coinNewsApiHeaders
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw error;
  }
};
