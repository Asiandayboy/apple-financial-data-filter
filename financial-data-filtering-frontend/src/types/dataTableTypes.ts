export type Filter = {
    minYear?: number,
    maxYear?: number,
    minRevenue?: number,
    maxRevenue?: number,
    minNetIncome?: number,
    maxNetIncome?: number,
}

export type Sorter = {
    column: "date" | "revenue" | "netIncome", // as per the sorting criteria
    order: "asc" | "desc"
    } | {
    column: "",
    order: ""
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
  