import './Breweries.scss'

import classNames from 'classnames'
import Spinner from 'components/spinner'
import Table from 'components/Table'
import React from 'react'
import { useBreweries } from 'services/BreweryService/breweries.hooks'

const Breweries2 = () => {
  const { isLoading, error, data } = useBreweries(0, 10)

  if (isLoading) return <Spinner size="small" />

  if (!data || error)
    return <p className={classNames({ error })}>{JSON.stringify(error)}</p>

  return (
    <>
      <Table
        data={data}
        loading={isLoading}
        selectable={{ onSelect: (selectedRows) => console.log(selectedRows) }}
        columns={[
          {
            title: 'Name',
            key: 'name',
          },
          {
            title: 'Brewery Type',
            key: 'breweryType',
            info: 'websiteUrl',
          },
          {
            title: 'Country',
            key: 'country',
          },
          {
            title: 'City',
            key: 'city',
          },
          {
            title: 'Country',
            key: 'country',
          },
        ]}
      />
    </>
  )
}

export default Breweries2
