export type Filter = {
    minYear?: number,
    maxYear?: number,
    minRevenue?: number,
    maxRevenue?: number,
    minNetIncome?: number,
    maxNetIncome?: number,
}

export type SortColumns = "year" | "revenue" | "netIncome"

export type Sorter = {
    column?: SortColumns, // as per the sorting criteria
    order: "asc" | "desc"
}

// only the fields that are to be displayed
export type AAPLData = {
    date: string,
    revenue: number,
    netIncome: number,
    grossProfit: number,
    eps: number,
    operatingIncoming: number
}
  