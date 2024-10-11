import { PaginationParams } from '@/types/common';
import { useState } from 'react';
import { ProTableSortingState } from '@/components/ProTable/types';
import { SORT_DIRECTION } from '@/constants/common';

export interface FilterParams extends PaginationParams {
  store: string | null;
  startDateCreate: string | null;
  endDateCreate: string | null;
  document: string;
  typeDocument: string | number | null;
  startDatePayment: string | null;
  endDatePayment: string | null;
  creator: string;
  customer: string;
  seller: string;
  paymentStatus: string | number | null;
}

const useFilters = () => {
  const [filters, setFilters] = useState<FilterParams>({
    store: '',
    startDateCreate: null,
    endDateCreate: null,
    document: '',
    typeDocument: null,
    startDatePayment: null,
    endDatePayment: null,
    creator: '',
    customer: '',
    seller: '',
    paymentStatus: null,

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
