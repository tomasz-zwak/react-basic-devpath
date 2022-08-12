import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import { CoalStock } from './coal-stock.type'

const client = axios.create({
  baseURL: 'https://api.sprawdzwegiel.pl',
  headers: { 'content-type': 'application/json' },
})

const request = async <T>(options: AxiosRequestConfig) => {
  const onSuccess = (response: AxiosResponse<T>) => response.data

  const onError = (error) => Promise.reject(error)

  return client(options).then(onSuccess).catch(onError)
}

export const coalStock = () =>
  request<CoalStock>({
    url: `/coal-stock.json?${new Date()
      .toISOString()
      .split(':')
      .slice(0, 2)
      .join(':')}`,
    method: 'GET',
  })
