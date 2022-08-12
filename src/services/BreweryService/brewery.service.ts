import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { camelizeKeys } from 'humps'

import { Brewery } from './brewery.type'

const client = axios.create({
  baseURL: 'https://api.openbrewerydb.org',
  headers: { 'content-type': 'application/json' },
})

const camelizeKeysInterceptor = (response: AxiosResponse) => {
  if (
    response.data &&
    response.headers['content-type'].split('; ').includes('application/json')
  )
    response.data = camelizeKeys(response.data)

  return response
}

client.interceptors.response.use(camelizeKeysInterceptor)

const request = async <T>(options: AxiosRequestConfig) => {
  const onSuccess = (response: AxiosResponse<T>) => response.data

  const onError = (error) => Promise.reject(error)

  return client(options).then(onSuccess).catch(onError)
}

export const breweries = (page = 0, perPage = 10) =>
  request<Brewery[]>({
    params: {
      page,
      per_page: perPage,
    },
    url: '/breweries',
    method: 'GET',
  })

export const brewery = (breweryId: Brewery['id']) =>
  request<Brewery>({
    url: `/breweries/${breweryId}`,
    method: 'GET',
  })
