import './beers.scss'

import classNames from 'classnames'
import Spinner from 'components/spinner'
import Table from 'components/table'
import { NOT_FOUND_ERROR } from 'constants/generic-errors'
import { useState } from 'react'
import { useBeers } from 'services/use-beers'

const Beers = () => {
  const [size, setSize] = useState(undefined)

  const { data, loading, error } = useBeers(size)

  if (!data && error)
    return <p className={classNames({ error })}>{error || NOT_FOUND_ERROR}</p>

  if (!data && loading) return <Spinner size="small" />

  return (
    <>
      <Table
        onSizeChange={setSize}
        data={data}
        loading={loading}
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
            title: 'Brand',
            key: 'brand',
            info: 'details',
          },
          {
            title: 'Alcohol %',
            key: 'alcohol',
          },
        ]}
      ></Table>
    </>
  )
}
export default Beers
