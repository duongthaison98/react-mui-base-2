import type { ProTableSortingState } from '@/components/ProTable/types';
import { SORT_DIRECTION } from '@/constants/common';
import { useState } from 'react';
import type { PaginationParams } from '@/types/common';
// import { STATUS } from './constants';

export interface FilterParams extends PaginationParams {
  id: number | null;
  cardCode: string | null;
  name: string;
}

const useFilters = () => {
  const [filters, setFilters] = useState<FilterParams>({
    id: null,
    cardCode: null,
    name: '',
    sort: {},
    search: null,
    page: 1,
    limit: 25,
  });

  const onSortingChange = (sorting?: ProTableSortingState) => {
    if (!sorting || !sorting.length) {
      setFilters((state) => ({
        ...state,
        sort: {},
      }));

      return;
    }

    const column = sorting[0];

    setFilters((state) => ({
      ...state,
      sort: {
        [column.id]: column.desc ? 'desc' : 'asc',
      },
    }));
  };

  const onPageChange = (page: number) => {
    setFilters((state) => ({
      ...state,
      page,
    }));
  };

  const onPageSizeChange = (limit: number) => {
    setFilters((state) => ({
      ...state,
      limit: limit,
    }));
  };

  const onSearch = (params: Partial<FilterParams>) => {
    setFilters((state) => ({
      ...state,
      ...params,
      page: 1,
    }));
  };

  const onChangeStatus = (status: number) => {
    setFilters((state) => ({
      ...state,
      page: 1,
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
