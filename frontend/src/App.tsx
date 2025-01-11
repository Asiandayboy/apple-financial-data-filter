import './index.css'
import { DataTable, DataTableFilter } from './components/DataTable'
import { useEffect, useState } from 'react'
import { AAPLData, Filter, SortColumns, Sorter } from './types/dataTableTypes'


const BACKEND_ENDPOINT = "/aapl/annual-income"


const BASE_URL = import.meta.env.VITE_ENV === "production" 
  ? "https://aapl-financial-data-filter.vercel.app"
  : "http://127.0.0.1:8000"





function buildQueryParams(filter: Filter, sorter: Sorter) {
  const queryParams = new URLSearchParams()

  if (filter.minYear) {
    queryParams.append("min_year", filter.minYear.toString())
  }
  if (filter.maxYear) {
    queryParams.append("max_year", filter.maxYear.toString())
  }
  if (filter.minRevenue) {
    queryParams.append("min_revenue", filter.minRevenue.toString())
  }
  if (filter.maxRevenue) {
    queryParams.append("max_revenue", filter.maxRevenue.toString())
  }
  if (filter.minNetIncome) {
    queryParams.append("min_net_income", filter.minNetIncome.toString())
  }
  if (filter.maxNetIncome) {
    queryParams.append("max_net_income", filter.maxNetIncome.toString())
  }

  if (sorter.column) {
    queryParams.append("sort_by", sorter.column)
    queryParams.append("sort_order", sorter.order)
  }

  return queryParams.toString()
}


function App() {
  const [aaplData, setAaplData] = useState<AAPLData[]>([])
  const [filter, setFilter] = useState<Filter>({
    minYear: 0,
    maxYear: 2025,
    minRevenue: 0,
    maxRevenue: 100_000_000_000_000,
    minNetIncome: 0,
    maxNetIncome: 100_000_000_000_000
  })
  const [sorter, setSorter] = useState<Sorter>({ column: "year", order: "asc" })
  const [loading, setLoading] = useState(false)


  function handleFilterChange(name: string, value: string) {
    setFilter((prev) => ({
      ...prev,
      [name]: value && Number(value)
    }))
  }

  function handleSortOrderChange() {
    let sortOrder = sorter.order

    if (sortOrder === "asc") {
      sortOrder = "desc"
    } else {
      sortOrder = "asc"
    }

    setSorter((prev) => ({
      ...prev,
      order: sortOrder
    }))
  }

  function handleSortByChange(name: SortColumns) {
    setSorter((prev) => ({
      ...prev,
      column: name
    }))
  }

  async function fetchAAPLData() {
    setLoading(true)

    try {
      const queryParams = buildQueryParams(filter, sorter)
      const url = queryParams ? `${BASE_URL}${BACKEND_ENDPOINT}?${queryParams}` : `${BASE_URL}${BACKEND_ENDPOINT}`

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error()
      }

      const result = await response.json()

      setAaplData(result)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAAPLData()
  }, [])



  return (
    <>
      <main className='mb-10'>
        <h1 className='mx-10 my-10 text-center font-bold text-5xl'>AAPL Annual Income Statements</h1>
        <section className='
          flex flex-col items-center justify-start min-h-screen gap-8
          mx-auto w-5/6
          '>
          <DataTableFilter 
            filter={filter}
            sorter={sorter}
            onFilterChange={handleFilterChange}
            onSortByChange={handleSortByChange}
            onSortOrderChange={handleSortOrderChange}
          />
          <button 
            className='text-lg border-2 py-1 px-8 rounded-lg hover:bg-gray-200 mb-10'
            onClick={fetchAAPLData}
          >
            Search
          </button>
          <DataTable 
            data={aaplData} 
            loading={loading}
          />
        </section>
      </main>
    </>
  )
}

export default App
