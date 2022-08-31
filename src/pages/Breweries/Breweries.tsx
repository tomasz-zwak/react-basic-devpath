import './Breweries.scss'

import { Link, Outlet } from '@tanstack/react-location'
import { useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import Spinner from 'components/spinner'
import Table from 'components/Table'
import React, { useState } from 'react'
import { useBreweries } from 'services/BreweryService/breweries.hooks'

const Breweries = () => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const queryClient = useQueryClient()

  const { isLoading, error, data } = useBreweries(page, pageSize, {
    onSuccess: (breweries) => {
      breweries.forEach((brewery) =>
        queryClient.setQueryData(['brewery', brewery.id], brewery)
      )
    },
  })

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
            render: ({ id, name }) => <Link to={id}>{name}</Link>,
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
      <Outlet />
    </>
  )
}

export default Breweries
