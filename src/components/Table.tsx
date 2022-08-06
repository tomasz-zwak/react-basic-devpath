import './table.scss'

import React, { useId, useMemo, useState } from 'react'

import Spinner from './spinner'

const Table = <T extends unknown>({
  data,
  loading,
  columns,
  size,
  onSizeChange,
}: {
  data: T[]
  loading: boolean
  columns: Array<{
    title: string
    key: keyof T
    info?: keyof T
  }>
  size: number
  onSizeChange: (size: number) => void
}) => {
  const tableSizeOptions = useMemo(() => {
    const sizes: number[] = []
    for (let size = 0; size < 100; size++) sizes.push(size)
    return sizes
  }, [])

  const headerId = useId()
  const rowId = useId()
  const cellId = useId()
  const selectId = useId()

  return (
    <>
      <label style={{ marginRight: '5px' }} htmlFor="size">
        Items to show:
      </label>
      <select
        value={size}
        style={{ marginBottom: '5px' }}
        name="size"
        id={`size-select-${selectId}`}
        onChange={(e) => {
          const size = parseInt(e.target.value)
          onSizeChange(size)
        }}
      >
        {tableSizeOptions.map((size) => (
          <option key={`beer-size-option-${size}`} value={size}>
            {size}
          </option>
        ))}
      </select>
      {loading && <Spinner size="medium" />}
      <table>
        <thead>
          <tr>
            {columns.map(({ title }) => (
              <th key={`table-header-cell-${headerId}`}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((dataRow) => (
            <tr key={`table-row-${rowId}`}>
              {columns.map((col) => (
                <TableCell
                  info={col.info ? dataRow[col.info] : null}
                  key={`table-cell-${cellId}`}
                >
                  {dataRow[col.key]}
                </TableCell>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

const TableCell = ({ info, children }) => {
  const [showInfo, setShowInfo] = useState(false)
  const [showIcon, setShowIcon] = useState(false)

  const toggleIcon = () => {
    if (!info) return
    setShowIcon(!showIcon)
  }

  return (
    <td
      tabIndex={-1}
      onClick={() => setShowInfo(true)}
      onBlur={() => setShowInfo(false)}
      onMouseEnter={() => toggleIcon()}
      onMouseLeave={() => toggleIcon()}
    >
      {children}
      {info && showInfo && <div>{info}</div>}
      {showIcon && !showInfo && '?'}
    </td>
  )
}

export default Table
