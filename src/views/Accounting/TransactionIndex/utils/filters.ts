import { SORT_DIRECTION } from '@/constants/common';
import { ProTableSortingState } from '@/components/ProTable/types';
import { useState } from 'react';
import { PaginationParams } from '@/types/common';

export interface FilterParams extends PaginationParams {
  store: number[];
  id: string;
  dayType: number;
  startDate: string | null;
  endDate: string | null;
  document: number;
  documentId: string;
  amount: string;

  billType: number;
  type: number;

  planningType: number;
  accountCode: string;

  objectType: number;
  object: string;

  note: string;
  creator: string;
}
const useFilters = () => {
  const [filters, setFilters] = useState<FilterParams>({
    store: [],
    id: '',
    dayType: 0,
    document: 0,
    documentId: '',
    amount: '',
    billType: 0,
    type: 0,
    planningType: 0,
    accountCode: '',
    objectType: 0,
    object: '',
    note: '',
    creator: '',

    startDate: null,
    endDate: null,

    sortBy: '',
    sortDirection: '',
    pageNumber: 1,
    pageSize: 10,
  });

  const onSortingChange = (sorting?: ProTableSortingState) => {
    if (!sorting || !sorting.length) {
      setFilters((state) => ({
        ...state,
        sortBy: '',
        sortDirection: '',
      }));
      return;
    }

    const column = sorting[0];

    setFilters((state) => ({
      ...state,
      sortBy: column.id,
      sortDirection: column.desc ? SORT_DIRECTION.desc : SORT_DIRECTION.asc,
    }));
  };

  const onPageChange = (pageNumber: number) => {
    setFilters((state) => ({
      ...state,
      pageNumber,
    }));
  };

  const onPageSizeChange = (pageSize: number) => {
    setFilters((state) => ({
      ...state,
      pageSize,
    }));
  };

  const onSearch = (params: Partial<FilterParams>) => {
    setFilters((state) => ({
      ...state,
      ...params,
      pageNumber: 1,
    }));
  };

  return {
    filters,
    onSortingChange,
    onPageChange,
    onPageSizeChange,
    onSearch,
  };
};

export default useFilters;
