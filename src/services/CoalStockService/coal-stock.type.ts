export interface CoalStock {
  updatedAt: Date
  numOfRound: string
  data: CoalStockEntry[]
}

export interface CoalStockEntry {
  productId: string
  mineId: string
  productName: string
  productUrl: string
  stockStatus: boolean
  mine: string
  sortIndex: number
  createdAt: Date
  updatedAt: Date
}
