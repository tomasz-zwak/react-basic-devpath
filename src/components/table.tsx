import './table.scss'

import React, { useId, useMemo, useState } from 'react'

import Spinner from './spinner'

const Table = ({ data, loading, columns, onSizeChange }) => {
  const tableSizeOptions = useMemo(() => {
    const sizes: number[] = []
    for (let size = 0; size < 100; size++) sizes.push(size)
    return sizes
  }, [])

  const id = useId()

  return (
    <>
      <label style={{ marginRight: '5px' }} htmlFor="size">
        Items to show:
      </label>
      <select
        style={{ marginBottom: '5px' }}
        name="size"
        id={`size-${id}`}
        onChange={(e) => onSizeChange(e.target.value)}
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
            {columns.map(({ title, key }) => (
              <th key={key}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((dataRow) => (
            <tr key={dataRow.id}>
              {columns.map((col, index) => (
                <TableCell info={dataRow[col.info]} key={index}>
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
