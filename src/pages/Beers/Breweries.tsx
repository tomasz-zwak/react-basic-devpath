import './beers.scss'

import classNames from 'classnames'
import Spinner from 'components/spinner'
import Table from 'components/Table'
import React, { useState } from 'react'
import { Brewery } from 'services/types'
import useBreweries from 'services/use-breweries'

const Breweries = () => {
  const [size, setSize] = useState(10)
  const [page, setPage] = useState(0)

  const { isLoading, error, data } = useBreweries(page, size)

  if (isLoading) return <Spinner size="small" />

  if (!data || error)
    return <p className={classNames({ error })}>{JSON.stringify(error)}</p>

  return (
    <>
      <Table<Brewery>
        size={size}
        onSizeChange={setSize}
        data={data}
        loading={isLoading}
        columns={[
          {
            title: 'ID',
            key: 'id',
          },
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
        ]}
      />
    </>
  )
}

export default Breweries
