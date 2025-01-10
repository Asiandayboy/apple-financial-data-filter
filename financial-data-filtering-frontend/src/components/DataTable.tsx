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
      <div>
        <div>
          <label htmlFor="">
            Min Year:
            <input 
              type="number" 
              value={filter.minYear} 
              onChange={(e) => onFilterChange("minYear", e.target.value)}
            />
          </label>
          <label htmlFor="">
            Max Year:
            <input 
              type="number" 
              value={filter.maxYear} 
              onChange={(e) => onFilterChange("maxYear", e.target.value)}
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
            />
          </label>
          <label htmlFor="">
            Max Revenue:
            <input 
              type="number" 
              value={filter.maxRevenue} 
              onChange={(e) => onFilterChange("maxRevenue", e.target.value)}
            />
          </label>
        </div>

        <div>
          <label htmlFor="">
            Min Net Income:
            <input 
              type="number" 
              value={filter.minNetIncome} 
              onChange={(e) => onFilterChange("minNetIncome", e.target.value)}
            />
          </label>
          <label htmlFor="">
            Max Net Income:
            <input 
              type="number" 
              value={filter.maxNetIncome} 
              onChange={(e) => onFilterChange("maxNetIncome", e.target.value)}
            />
          </label>
        </div>
      </div>

      <div>
        <div>
          <label htmlFor="sortBy">Sort By:</label>
          <select 
            name="sortBy" 
            id="sortBy" 
            value={sorter.column}
            onChange={(e) => onSortByChange(e.target.value as SortColumns)}
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
            value={sorter.column}
            onChange={() => onSortOrderChange()}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      
    </section>
  )
}


function DataTable({ data, loading }: DataTableProps) {
  if (loading) {
    return (
      <div>Loading...</div>
    )
  }


  return (
    <section>
			<table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Revenue</th>
            <th>Net Income</th>
            <th>Gross Profit</th>
            <th>EPS (Earnings Per Share)</th>
            <th>Operating Income</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((entry, i) => (
              <tr key={i}>
                <td>{entry.date}</td>
                <td>{entry.revenue}</td>
                <td>{entry.netIncome}</td>
                <td>{entry.grossProfit}</td>
                <td>{entry.eps}</td>
                <td>{entry.operatingIncoming}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
		</section>
  )
}


export { DataTableFilter as DataTableFilter, DataTable }