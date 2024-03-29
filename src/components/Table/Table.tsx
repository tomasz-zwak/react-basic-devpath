import './Table.scss'

import classNames from 'classnames'
import { Flex } from 'layouts/Flex'
import React, { useEffect, useId, useMemo, useReducer, useState } from 'react'
import { createPortal } from 'react-dom'

interface TablePagination {
  page: number
  pageSize: number
}

interface TablePaginationProps {
  paginationValues?: TablePagination
  onPageChange?: (pagination: TablePagination) => void
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

  return (
    <Flex>
      <label style={{ marginRight: '5px' }} htmlFor="size">
        Items to show:
      </label>
      <select
        value={paginationState.pageSize}
        style={{ margin: '1rem' }}
        name="size"
        id={id}
        onChange={(e) =>
          dispatchPaginationStateChange({
            type: 'pageSize',
            payload: parseInt(e.target.value),
          })
        }
      >
        {tableSizeOptions.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      <button
        onClick={() => {
          if (paginationState.page > 1)
            dispatchPaginationStateChange({
              type: 'page',
              payload: paginationState.page - 1,
            })
        }}
      >
        Previous
      </button>
      {paginationState.page}
      <button
        onClick={() =>
          dispatchPaginationStateChange({
            type: 'page',
            payload: paginationState.page + 1,
          })
        }
      >
        Next
      </button>
    </Flex>
  )
}

interface TableColumnProps<T> {
  title: string
  key: keyof T
  info?: keyof T
  render?: (dataRow: T) => React.ReactNode
}

interface TableSelectableProps<T> {
  onSelect: (selectedRows: T[]) => void
}

interface TableProps<T> {
  data: T[]
  loading: boolean
  rowId?: 'id' | keyof T
  columns: TableColumnProps<T>[]
  pagination?: TablePaginationProps
  selectable?: TableSelectableProps<T>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tableSelectionReducer = <T extends Record<any, any>>(
  state: T[],
  {
    data,
    rowId,
    action,
  }: { data: T; rowId: TableProps<T>['rowId']; action: 'ADD' | 'REMOVE' }
) => {
  if (action === 'ADD') return [...state, data]
  if (action === 'REMOVE') {
    const index = state.findIndex((rowData) => rowData[rowId] === data[rowId])
    const newState = [...state]
    newState.splice(index, 1)
    return newState
  }

  return state
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Table = <T extends Record<any, any>>({
  data,
  columns,
  rowId = 'id',
  pagination,
  selectable,
  loading,
}: TableProps<T>) => {
  const [selectedRows, dispatchSelectionChange] = useReducer(
    tableSelectionReducer,
    []
  )

  useEffect(() => {
    if (selectable?.onSelect) selectable.onSelect(selectedRows)
  }, [selectable, selectedRows])

  return (
    <>
      <table className={classNames({ 'table--loading': loading })}>
        <thead>
          <tr>
            {selectable && <th />}
            {columns.map(({ title }, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((dataRow) => (
            <tr key={dataRow[rowId]}>
              {selectable && (
                <td>
                  <input
                    type="checkbox"
                    value={dataRow[rowId]}
                    onChange={(e) => {
                      const selectedRowId = e.target.value
                      const selectedRowData = data.find(
                        (dataRow) => dataRow[rowId] === selectedRowId
                      )
                      if (!selectedRowData) return
                      if (e.target.checked)
                        dispatchSelectionChange({
                          data: selectedRowData,
                          rowId,
                          action: 'ADD',
                        })

                      if (!e.target.checked)
                        dispatchSelectionChange({
                          data: selectedRowData,
                          rowId,
                          action: 'REMOVE',
                        })
                    }}
                  />
                </td>
              )}
              {columns.map((col, index) => (
                <TableCell info={col.info && dataRow[col.info]} key={index}>
                  {col.render ? col.render(dataRow) : dataRow[col.key]}
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
    <div style={{ top, left }} className={'table--info-popup'}>
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
      onMouseEnter={toggleIcon}
      onMouseLeave={toggleIcon}
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
