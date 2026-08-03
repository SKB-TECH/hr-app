"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Row,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  tableClassName?: string;
  tableBodyClassName?: string;
  headerRowClassName?: string;
  headerCellClassName?: string;
  rowClassName?: (row: Row<TData>) => string;
  cellClassName?: string;
  emptyMessage?: string;
  tableHeader?: React.ReactNode;
  pagination?: React.ReactNode;
  jobsPerPage: number;
  currentPage?: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  tableClassName,
  tableBodyClassName,
  headerRowClassName,
  headerCellClassName,
  rowClassName,
  pagination,
  cellClassName,
  emptyMessage = "No results.",
  tableHeader,
  jobsPerPage,
  currentPage = 1,
}: DataTableProps<TData, TValue>) {
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageSize: jobsPerPage,
        pageIndex: currentPage - 1,
      },
    },
  });

  return (
    <div className="w-full overflow-hidden border border-brand-light-neutral">
      {tableHeader}
      <Table className={tableClassName}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className={headerRowClassName} key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead className={headerCellClassName} key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody className={tableBodyClassName}>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className={rowClassName?.(row)}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell className={cellClassName} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {pagination}
    </div>
  );
}
