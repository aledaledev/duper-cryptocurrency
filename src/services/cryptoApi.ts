import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    'X-RapidAPI-Key': '411cb2b1c9mshe9441ecd506f461p163e95jsnbf3948d93d55',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
  }

const baseUrl = 'https://coinranking1.p.rapidapi.com'

//no hace falta
const createRequest = (url:string) => ({url,headers:cryptoApiHeaders})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery:fetchBaseQuery({baseUrl,headers:cryptoApiHeaders}),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            //que se le agrega al final a la url
            query:(count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query:(cryptoId) => `/coin/${cryptoId}`
        }),
    })
})

//te crea metodos
export const {useGetCryptosQuery,useGetCryptoDetailsQuery} = cryptoApi
