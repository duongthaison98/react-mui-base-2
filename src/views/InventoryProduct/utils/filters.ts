import type { ProTableSortingState } from '@/components/ProTable/types';
import { SORT_DIRECTION } from '@/constants/common';
import { useState } from 'react';
import type { PaginationParams } from '@/types/common';

export interface FilterParams extends PaginationParams {
  id: string;
  product: string;
  store: number[] | [];
  brand: number | null;
  inventory: number;
  category: number;
  internalCategory: number;
  type: number;
  provider: string;
  remain: boolean;

  startDate: string | null;
  endDate: string | null;
}

const useFilters = () => {
  const [filters, setFilters] = useState<FilterParams>({
    id: '',
    product: '',
    store: [],
    brand: 0,
    inventory: 0,
    category: 0,
    internalCategory: 0,
    type: 0,
    provider: '',
    remain: false,
    startDate: null,
    endDate: null,

    sortBy: '',
    sortDirection: '',
    pageNumber: 1,
    pageSize: 25,
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

  const onChangeStatus = (status: number) => {
    setFilters((state) => ({
      ...state,
      pageNumber: 1,
      status,
    }));
  };

  return {
    filters,
    onSortingChange,
    onPageChange,
    onPageSizeChange,
    onSearch,
    onChangeStatus,
  };
};

export default useFilters;
