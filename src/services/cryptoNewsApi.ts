import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const newsApiHeader = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': '411cb2b1c9mshe9441ecd506f461p163e95jsnbf3948d93d55',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
  }

const baseUrl = 'https://bing-news-search1.p.rapidapi.com'

export const cryptoNewsApi = createApi({
    reducerPath:'cryptoNewsApi',
    baseQuery: fetchBaseQuery({baseUrl,headers:newsApiHeader}),
    endpoints: (builder) => ({
        getCryptoNews:builder.query({
            query:({newsCategory,count}) => `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
        }),
    })
})

export const {useGetCryptoNewsQuery} = cryptoNewsApi