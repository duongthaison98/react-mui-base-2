import { ProTableSortingState } from 'components/ProTable/types';
import { SORT_DIRECTION } from 'constants/common';
import { useState } from 'react';
import { PaginationParams } from 'types/common';

export interface FilterParams extends PaginationParams {
  id: string;
  transactionId: string;
  startDate: string | null;
  endDate: string | null;
  transStartDate: string | null;
  transEndDate: string | null;
  actionType: number;
  documentType: number;
  document: string;
  type: number;
  objectType: number;
  object: string;
  operator: string;
}

const useFilters = () => {
  const [filters, setFilters] = useState<FilterParams>({
    id: '',
    transactionId: '',
    startDate: '',
    endDate: '',
    transStartDate: '',
    transEndDate: '',
    actionType: 0,
    documentType: 0,
    document: '',
    type: 0,
    objectType: 0,
    object: '',
    operator: '',

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

  return { filters, onSortingChange, onPageChange, onPageSizeChange, onSearch };
};

export default useFilters;
