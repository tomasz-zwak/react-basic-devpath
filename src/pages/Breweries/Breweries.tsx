import './Breweries.scss'

import classNames from 'classnames'
import Spinner from 'components/spinner'
import Table from 'components/Table'
import React, { useState } from 'react'
import useBreweries from 'services/BreweryService'

const Breweries = () => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const { isLoading, error, data } = useBreweries(page, pageSize)

  if (isLoading) return <Spinner size="small" />

  if (!data || error)
    return <p className={classNames({ error })}>{JSON.stringify(error)}</p>

  return (
    <>
      <Table
        data={data}
        loading={isLoading}
        selectable={{ onSelect: (selectedRows) => console.log(selectedRows) }}
        pagination={{
          paginationValues: {
            page,
            pageSize,
          },
          onPageChange: ({ page, pageSize }) => {
            setPage(page)
            setPageSize(pageSize)
          },
        }}
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
