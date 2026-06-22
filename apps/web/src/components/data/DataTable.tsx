import React, { useState } from 'react';
import {
  ChevronUp,
  ChevronDown,
  Search,
  Download,
  Filter,
  Eye,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { cn } from '../../lib/utils';

interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  title?: string;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
  searchable?: boolean;
  filterable?: boolean;
  paginated?: boolean;
  rowsPerPage?: number;
  loading?: boolean;
  exportable?: boolean;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  title,
  onEdit,
  onDelete,
  onView,
  searchable = true,
  filterable = true,
  paginated = true,
  rowsPerPage = 10,
  loading,
  exportable,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  // Filtering
  const filteredData = data.filter((item) =>
    columns.some((col) =>
      String(item[col.key]).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Sorting
  let sortedData = [...filteredData];
  if (sortConfig) {
    sortedData.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  // Pagination
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const endIdx = startIdx + rowsPerPage;
  const paginatedData = paginated ? sortedData.slice(startIdx, endIdx) : sortedData;

  const handleSort = (key: keyof T) => {
    if (!columns.find((col) => col.key === key)?.sortable) return;

    setSortConfig((current) => {
      if (current?.key === key) {
        return {
          key,
          direction: current.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return { key, direction: 'asc' };
    });
  };

  const handleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedData.map((_, i) => i)));
    }
  };

  const handleSelectRow = (index: number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedRows(newSelected);
  };

  if (loading) {
    return (
      <Card premium>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-16 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"
            />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card premium className="overflow-hidden">
      {/* Header */}
      {(title || searchable || exportable) && (
        <div className="pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between gap-4 mb-4">
            {title && <h3 className="text-lg font-bold">{title}</h3>}
            <div className="flex items-center gap-2 ml-auto">
              {exportable && (
                <Button variant="secondary" size="sm" icon={<Download className="w-4 h-4" />}>
                  Export
                </Button>
              )}
            </div>
          </div>

          {searchable && (
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Search..."
                icon={<Search className="w-4 h-4" />}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="flex-1"
              />
              {filterable && (
                <Button variant="secondary" size="md" icon={<Filter className="w-4 h-4" />}>
                  Filter
                </Button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                  onChange={handleSelectAll}
                  className="rounded cursor-pointer"
                />
              </th>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={cn(
                    'px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide text-neutral-900 dark:text-neutral-50',
                    col.sortable && 'cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  )}
                  style={{ width: col.width }}
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    {col.sortable && sortConfig?.key === col.key && (
                      <motion.span
                        animate={{ rotate: sortConfig.direction === 'asc' ? 0 : 180 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronUp className="w-4 h-4" />
                      </motion.span>
                    )}
                  </div>
                </th>
              ))}
              {(onEdit || onDelete || onView) && (
                <th className="px-4 py-3 text-right font-semibold text-xs uppercase tracking-wide">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((row, idx) => (
              <motion.tr
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors border-b border-neutral-200 dark:border-neutral-800 last:border-b-0"
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(idx)}
                    onChange={() => handleSelectRow(idx)}
                    className="rounded cursor-pointer"
                  />
                </td>
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className="px-4 py-3 text-neutral-700 dark:text-neutral-300"
                    style={{ width: col.width }}
                  >
                    {col.render
                      ? col.render(row[col.key], row)
                      : String(row[col.key] ?? '-')}
                  </td>
                ))}
                {(onEdit || onDelete || onView) && (
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {onView && (
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => onView(row)}
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      )}
                      {onEdit && (
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => onEdit(row)}
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => onDelete(row)}
                          className="text-error-600 hover:text-error-700 dark:text-error-400"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </td>
                )}
              </motion.tr>
            ))}
          </tbody>
        </table>

        {paginatedData.length === 0 && (
          <div className="h-40 flex items-center justify-center text-neutral-500 dark:text-neutral-400">
            <div className="text-center">
              <p className="text-sm">No data found</p>
              {searchTerm && (
                <p className="text-xs mt-1">Try adjusting your search criteria</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {paginated && totalPages > 1 && (
        <div className="px-4 py-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            Showing {startIdx + 1} to {Math.min(endIdx, sortedData.length)} of{' '}
            {sortedData.length}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              icon={<ChevronLeft className="w-4 h-4" />}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
              let pageNum = i + 1;
              if (totalPages > 5 && currentPage > 3) {
                pageNum = currentPage - 2 + i;
              }
              if (pageNum <= totalPages) {
                return (
                  <Button
                    key={pageNum}
                    variant={pageNum === currentPage ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              }
              return null;
            })}

            <Button
              variant="ghost"
              size="sm"
              icon={<ChevronRight className="w-4 h-4" />}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
