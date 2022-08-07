import './Table.scss'

import classNames from 'classnames'
import Spinner from 'components/spinner'
import { Flex } from 'layouts/Flex'
import React, { useId, useMemo, useReducer, useState } from 'react'
import { createPortal } from 'react-dom'

interface TablePagination {
  page: number
  pageSize: number
}

interface TablePaginationProps {
  paginationValues?: TablePagination
  onPageChange?: (pagination: TablePagination) => void
}

interface TableColumnProps<T> {
  title: string
  key: keyof T
  info?: keyof T
}

interface TableProps<T> {
  data: T[]
  loading: boolean
  rowId?: 'id' | keyof T
  columns: TableColumnProps<T>[]
  pagination?: TablePaginationProps
}

const paginationReducer = (
  paginationState: TablePagination,
  action: {
    type: keyof Partial<TablePagination>
    payload: number
  }
) => {
  if (action.type === 'page')
    return { ...paginationState, page: action.payload }

  if (action.type === 'pageSize')
    return { ...paginationState, pageSize: action.payload }

  return paginationState
}

const defaultPagination = { page: 1, pageSize: 10 }

const TablePaginationControls: React.FC<{
  tablePagination: TablePaginationProps
}> = ({
  tablePagination: {
    paginationValues: { page, pageSize } = defaultPagination,
    onPageChange,
  },
}) => {
  const [paginationState, dispatchPaginationStateChange] = useReducer(
    paginationReducer,
    { page, pageSize }
  )

  React.useEffect(() => {
    if (onPageChange) onPageChange(paginationState)
  }, [paginationState, onPageChange])

  const id = useId()

  const tableSizeOptions = useMemo(() => {
    const sizes: number[] = []
    for (let size = 1; size < 100; size++) sizes.push(size)
    return sizes
  }, [])

  const changePageSize = (pageSize: number) => {
    dispatchPaginationStateChange({ type: 'pageSize', payload: pageSize })
  }

  const changePage = (page: number) => {
    if (page >= 1)
      dispatchPaginationStateChange({ type: 'page', payload: page })
  }

  return (
    <Flex>
      <label style={{ marginRight: '5px' }} htmlFor="size">
        Items to show:
      </label>
      <select
        value={paginationState.pageSize}
        style={{ margin: '1rem' }}
        name="size"
        id={`table-size-select${id}`}
        onChange={(e) => changePageSize(parseInt(e.target.value))}
      >
        {tableSizeOptions.map((size) => (
          <option key={`table-size-select-option-${size}`} value={size}>
            {size}
          </option>
        ))}
      </select>
      <button onClick={() => changePage(paginationState.page - 1)}>
        Previous
      </button>
      {paginationState.page}
      <button onClick={() => changePage(paginationState.page + 1)}>Next</button>
    </Flex>
  )
}

const Table = <T extends Record<any, any>>({
  data,
  loading,
  columns,
  rowId = 'id',
  pagination,
}: TableProps<T>) => {
  return (
    <>
      {loading && <Spinner size="medium" />}
      <table>
        <thead>
          <tr>
            {columns.map(({ title }) => (
              <th key={`table-header-cell-${title}`}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((dataRow) => (
            <tr key={`table-row-${dataRow[rowId]}`}>
              {columns.map((col) => (
                <TableCell
                  info={col.info ? dataRow[col.info] : null}
                  key={`table-cell-${dataRow[col.key]}`}
                >
                  {dataRow[col.key]}
                </TableCell>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {pagination && <TablePaginationControls tablePagination={pagination} />}
    </>
  )
}

const TableInfo = ({ content, top, left }) => {
  return createPortal(
    <div
      style={{ top, left }}
      className={classNames({
        'table--info-popup': true,
      })}
    >
      {content}
    </div>,
    document.body
  )
}

const TableCell = ({ info, children }) => {
  const [showInfo, setShowInfo] = useState({ visible: false, top: 0, left: 0 })
  const [showIcon, setShowIcon] = useState(false)

  const toggleIcon = () => {
    if (!info) return
    setShowIcon(!showIcon)
  }

  return (
    <td
      tabIndex={-1}
      onClick={({ clientX, clientY }) =>
        setShowInfo({ visible: true, top: clientY, left: clientX })
      }
      onBlur={() =>
        setShowInfo((showInfo) => ({ ...showInfo, visible: false }))
      }
      onMouseEnter={() => toggleIcon()}
      onMouseLeave={() => toggleIcon()}
    >
      {children}
      {info && showInfo.visible && (
        <TableInfo content={info} top={showInfo.top} left={showInfo.left} />
      )}
      {showIcon && info && '+'}
    </td>
  )
}

export default Table
