import ProTable from '@/components/ProTable';
import useRefresh from '@/hooks/useRefresh';
import { fetchCustomers, selectCustomers, setLoading } from '@/slices/customter-slice';
import { useAppDispatch, useAppSelector } from '@/store';

import { getCustomers } from '@/services/customer-service';
import { Customer } from '@/types/customer-types';
import { FiltersRef } from '@/types/refs';
import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';
import ActionButtonComponent from './components/ActionButton';
import CreateCustomerButton from './components/CreateCustomerButton';
import FiltersForm from './FilterForm';
import useTableColumns from './TableColumns';
import useFilters from './utils/filters';
import { useTranslation } from 'react-i18next';

const CustomerTable = () => {
  const { t } = useTranslation('customers');
  const [, refetch] = useRefresh();
  const filtersRef = useRef<FiltersRef>(null);
  const { filters, onSortingChange, onPageChange, onPageSizeChange, onSearch } = useFilters();
  const dispatch = useAppDispatch();
  const { data, loading, total } = useAppSelector(selectCustomers);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const response = await getCustomers(filters);
        if (response.data) {
          dispatch(fetchCustomers(response.data));
        }
      } catch (error) {
        console.error('Failed to fetch customer groups', error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchData();
  }, [filters, refetch]);

  const handleResetFilters = () => {
    filtersRef.current?.reset();
  };

  const handleSubmitFilters = () => {
    console.log('filtersRef.current?.getValues()', filtersRef.current);
    filtersRef.current?.submit();
  };

  const { columns } = useTableColumns({
    page: filters.page,
    limit: filters.limit,
  });

  return (
    <ProTable<Customer>
      title={t('title')}
      loading={loading}
      columns={columns}
      data={data}
      refetch={refetch}
      onSortingChange={onSortingChange}
      hiddenFooter={true}
      pagination={{
        page: filters.page,
        limit: filters.limit,
        total,
        onPageChange,
        onPageSizeChange,
      }}
      filter={
        <FiltersForm
          ref={filtersRef}
          onSearch={onSearch}
          onSubmit={handleSubmitFilters}
          onClear={handleResetFilters}
        />
      }
      toolBar={
        <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
          <CreateCustomerButton />
          <ActionButtonComponent />
        </Box>
      }
    />
  );
};

export default CustomerTable;
