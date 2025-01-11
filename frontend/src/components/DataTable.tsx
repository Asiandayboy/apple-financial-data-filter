import { AAPLData, Filter, SortColumns, Sorter } from "../types/dataTableTypes"





type DataTableFilerProps = {
  filter: Filter
  sorter: Sorter
  onFilterChange: (name: string, value: string) => void
  onSortByChange: (name: SortColumns) => void
  onSortOrderChange: () => void
}


type DataTableProps = {
  data: AAPLData[]
  loading: boolean
}




function DataTableFilter({
  filter,
  sorter,
  onFilterChange,
  onSortByChange,
  onSortOrderChange
}: DataTableFilerProps) {

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label htmlFor="">
            Min Year:
            <input 
              type="number" 
              value={filter.minYear} 
              onChange={(e) => onFilterChange("minYear", e.target.value)}
              className="filter-input"
            />
          </label>
          <label htmlFor="">
            Max Year:
            <input 
              type="number" 
              value={filter.maxYear} 
              onChange={(e) => onFilterChange("maxYear", e.target.value)}
              className="filter-input"
            />
          </label>
        </div>

        <div>
          <label htmlFor="">
            Min Revenue:
            <input 
              type="number" 
              value={filter.minRevenue} 
              onChange={(e) => onFilterChange("minRevenue", e.target.value)}
              className="filter-input"
            />
          </label>
          <label htmlFor="">
            Max Revenue:
            <input 
              type="number" 
              value={filter.maxRevenue} 
              onChange={(e) => onFilterChange("maxRevenue", e.target.value)}
              className="filter-input"
            />
          </label>
        </div>

        <div className="col-span-1 sm:col-span-2 lg:col-span-1">
          <label htmlFor="">
            Min Net Income:
            <input 
              type="number" 
              value={filter.minNetIncome} 
              onChange={(e) => onFilterChange("minNetIncome", e.target.value)}
              className="filter-input"
            />
          </label>
          <label htmlFor="">
            Max Net Income:
            <input 
              type="number" 
              value={filter.maxNetIncome} 
              onChange={(e) => onFilterChange("maxNetIncome", e.target.value)}
              className="filter-input"
            />
          </label>
        </div>
      </div>

      {/* className="grid grid-cols-1 sm:grid-cols-2 gap-6" */}
      <div className="flex justify-center mt-8 gap-4">
        <div>
          <label htmlFor="sortBy">Sort By:</label>
          <select 
            name="sortBy" 
            id="sortBy" 
            value={sorter.column}
            onChange={(e) => onSortByChange(e.target.value as SortColumns)}
            className="sorter-input"
          >
            <option value="year">Year</option>
            <option value="revenue">Revenue</option>
            <option value="netIncome">Net Income</option>
          </select>
        </div>

        <div>
          <label htmlFor="sortOrder">Sort Order:</label>
          <select 
            name="sortOrder" 
            id="sortOrder" 
            value={sorter.order}
            onChange={() => onSortOrderChange()}
            className="sorter-input"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      
    </section>
  )
}


function formatCurrencyAmountToUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(amount)
}


function DataTable({ data, loading }: DataTableProps) {
  if (loading) {
    return (
      <div className="font-semibold">Loading...</div>
    )
  }

  if (data.length == 0) {
    return (
      <div className="font-semibold">No results</div>
    )
  }


  return (
    <section className="">
			<table className="border-4 p-4 border-collapse w-full overflow-x-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="my-th px-4 py-2 text-left font-semibold text-gray-700 whitespace-nowrap">Date</th>
            <th className="my-th px-4 py-2 text-left font-semibold text-gray-700">Revenue</th>
            <th className="my-th px-4 py-2 text-left font-semibold text-gray-700">Net Income</th>
            <th className="my-th px-4 py-2 text-left font-semibold text-gray-700">Gross Profit</th>
            <th className="my-th px-4 py-2 text-left font-semibold text-gray-700 whitespace-normal w-[120px]">
              EPS <br /> (Earnings Per Share)
            </th>
            <th className="my-th px-4 py-2 text-left font-semibold text-gray-700">Operating Income</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((entry, i) => (
              <tr 
                key={i} 
                className="border-b even:bg-gray-50"
              >
                <td 
                  data-cell="Date"
                  className="my-td whitespace-nowrap stack-td"
                >
                  <div className="td-content">
                    {entry.date}
                  </div>
                </td>
                <td 
                  data-cell="Revenue"
                  className="my-td stack-td"
                >
                  <div className="td-content">
                    {formatCurrencyAmountToUSD(entry.revenue)}
                  </div>
                </td>
                <td 
                  data-cell="Net Income"
                  className="my-td stack-td"
                >
                  <div className="td-content">
                    {formatCurrencyAmountToUSD(entry.netIncome)}
                  </div>
                </td>
                <td 
                  data-cell="Gross Profit"
                  className="my-td stack-td"
                >
                  <div className="td-content">
                    {formatCurrencyAmountToUSD(entry.grossProfit)}
                  </div>
                </td>
                <td 
                  data-cell="EPS (Earnings Per Share)"
                  className="my-td stack-td"
                >
                  <div className="td-content">
                    {entry.eps}
                  </div>
                </td>
                <td 
                  data-cell="Operating Income"
                  className="my-td stack-td"
                >
                  <div className="td-content">
                    {formatCurrencyAmountToUSD(entry.operatingIncome)}
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
		</section>
  )
}


export { DataTableFilter as DataTableFilter, DataTable }