import { Box } from '@mui/material';
import ProTable from 'components/ProTable';
import useRefresh from 'hooks/useRefresh';
import { useRef, useState } from 'react';
import { FiltersRef } from 'types/refs';
import ActionButtonComponent from './components/ActionButton';
import CreateCustomerButton from './components/CreateCustomerButton';
import FiltersForm from './FiltersForm';
import useTableColumns from './TableColumns';
import useFilters from './utils/filters';
import { IPurchaseHistoryType } from './utils/type';

const DATA = [
  {
    id: 901568,
    date: '12/02',
    type: 'Mua hàng [L] DP-142482-1 ',
    customer:
      'Trung Apple-Tây Ninh (SG) 0908069091 xã phan , phước long 1 , Dương minh châu , Tây Ninh ( Nx Đồng Phước-Cầu K13 TN )',
    products: 'Vỏ XSMAX Vàng Đẹp (VXMVD)',
    price: 550000,
    quantity: 1,
    discount: 10,
    money: 0,
    totalMoney: 0,
    note: '',
  },
  {
    id: 901568,
    date: '12/02',
    type: 'Mua hàng [L] DP-142482-1 ',
    customer:
      'Trung Apple-Tây Ninh (SG) 0908069091 xã phan , phước long 1 , Dương minh châu , Tây Ninh ( Nx Đồng Phước-Cầu K13 TN )',
    products: 'Vỏ 11 nhỏ Trắng - Đẹp (V11.TRT)',
    price: 550000,
    quantity: 1,
    discount: 10,
    money: 0,
    totalMoney: 0,
    note: '',
  },
  {
    id: 901569,
    date: '12/02',
    type: 'Trả hàng [L] DP-142482-1',
    customer:
      'Đạt Apple-Tây Ninh (SG) 0908069091 xã phan , phước long 1 , Dương minh châu , Tây Ninh ( Nx Đồng Phước-Cầu K13 TN )',
    products: 'Vỏ 11 nhỏ Trắng - Đẹp (V11.TRT)',
    price: 550000,
    quantity: 1,
    discount: 0,
    money: 0,
    totalMoney: 0,
    note: '',
  },
  {
    id: 901569,
    date: '12/02',
    type: 'Trả hàng [L] DP-142482-1',
    customer:
      'Đạt Apple-Tây Ninh (SG) 0908069091 xã phan , phước long 1 , Dương minh châu , Tây Ninh ( Nx Đồng Phước-Cầu K13 TN )',
    products: 'Vỏ 12 nhỏ Trắng - Đẹp (V11.TRT)',
    price: 550000,
    quantity: 1,
    discount: 0,
    money: 0,
    totalMoney: 0,
    note: '',
  },
];

const PurchaseHistoryTable = () => {
  const [, refetch] = useRefresh();
  const [banners] = useState<IPurchaseHistoryType[]>(DATA);
  const [loading] = useState<boolean>(false);
  const [total] = useState<number>(banners.length || 0);
  const filtersRef = useRef<FiltersRef>(null);
  const { filters, onSortingChange, onPageChange, onPageSizeChange, onSearch } =
    useFilters();

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

  return (
    <ProTable<IPurchaseHistoryType>
      title="Danh sách sản phẩm"
      loading={loading}
      columns={columns}
      data={banners}
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
          <CreateCustomerButton />
          <ActionButtonComponent />
        </Box>
      }
    />
  );
};

export default PurchaseHistoryTable;
