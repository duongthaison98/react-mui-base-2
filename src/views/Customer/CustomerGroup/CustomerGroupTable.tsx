import { Box } from '@mui/material';
import ProTable from '@/components/ProTable';
import useRefresh from '@/hooks/useRefresh';
import { useEffect, useRef, useState } from 'react';
import { FiltersRef } from '@/types/refs';
import ActionButtonComponent from './components/ActionButton';
import useFilters from './utils/filters';
import useTableColumns from './TableColumns';
import FiltersForm from './FilterForm';
import { CustomerGroup } from '@/types/customerGroup';
import CreateCustomerGroupButton from './components/CreateCustomerGroupButton';
import { getCustomerGroups } from '@/services/customerGroup-service';

const CustomerTable = () => {
  const [, refetch] = useRefresh();
  const [customerGroups, setCustomerGroups] = useState<CustomerGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const filtersRef = useRef<FiltersRef>(null);
  const { filters, onSortingChange, onPageChange, onPageSizeChange, onSearch } = useFilters();

  const handleResetFilters = () => {
    filtersRef.current?.reset();
  };

  const handleSubmitFilters = () => {
    filtersRef.current?.submit();
  };

  const { columns } = useTableColumns({
    pageNumber: filters.pageNumber,
    pageSize: filters.pageSize,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getCustomerGroups(filters.pageNumber, filters.pageSize);
        setCustomerGroups(response.data?.items || []);
        setTotal(response.data?.total || 0);
      } catch (error) {
        console.error('Failed to fetch customer groups', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filters.pageNumber, filters.pageSize, refetch]);

  return (
    <ProTable<CustomerGroup>
      title='Danh sách sản phẩm'
      loading={loading}
      columns={columns}
      data={customerGroups}
      refetch={refetch}
      onSortingChange={onSortingChange}
      pagination={{
        page: filters.pageNumber,
        total,
        pageSize: filters.pageSize,
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
          <CreateCustomerGroupButton />
          <ActionButtonComponent />
        </Box>
      }
    />
  );
};

export default CustomerTable;
