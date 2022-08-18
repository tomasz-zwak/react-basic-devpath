import classNames from 'classnames'
import Spinner from 'components/spinner'
import Table from 'components/Table'
import React from 'react'
import useCoalStocks from 'services/CoalStockService/coal-stock.hooks'

const CoalStocks = () => {
  const { isLoading, error, data: coalStock } = useCoalStocks()

  if (isLoading) return <Spinner size="small" />

  if (!coalStock || error)
    return <p className={classNames({ error })}>{JSON.stringify(error)}</p>

  console.log(coalStock)

  return (
    <>
      <Table
        data={coalStock.data}
        rowId="productId"
        loading={isLoading}
        columns={[
          {
            title: 'Name',
            key: 'productName',
          },
          {
            title: 'Availability',
            key: 'stockStatus',
            render: ({ stockStatus }) => (
              <span style={{ color: stockStatus ? 'green' : 'red' }}>
                {stockStatus ? 'Available' : 'Out of stock'}
              </span>
            ),
          },
        ]}
      />
    </>
  )
}

export default CoalStocks
