import type { ReactNode } from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { EmptyState } from "./empty-state"
import { LoadingState } from "./loading-state"

export interface Column<T> {
  /** Stable key for the column. */
  key: string
  header: ReactNode
  /** Renders the cell for a row. */
  cell: (row: T) => ReactNode
  className?: string
  headerClassName?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  getRowKey: (row: T, index: number) => string | number
  isLoading?: boolean
  /** Shown when `data` is empty and not loading. */
  emptyState?: ReactNode
}

/**
 * Generic, presentational table that integrates the standard loading and empty
 * states. Business logic (fetching, sorting, pagination) stays in the caller.
 */
export function DataTable<T>({
  columns,
  data,
  getRowKey,
  isLoading = false,
  emptyState,
}: DataTableProps<T>) {
  const spanAll = columns.length || 1

  return (
    <div className="rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {columns.map((column) => (
              <TableHead key={column.key} className={column.headerClassName}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={spanAll} className="p-0">
                <LoadingState />
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={spanAll} className="p-0">
                {emptyState ?? <EmptyState title="No records" className="border-0" />}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => (
              <TableRow key={getRowKey(row, index)}>
                {columns.map((column) => (
                  <TableCell key={column.key} className={cn(column.className)}>
                    {column.cell(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
