import { Box } from '@mui/material';
import ProTable from 'components/ProTable';
import useRefresh from 'hooks/useRefresh';
import { useRef, useState } from 'react';
import { Customer } from 'types/customer';
import { FiltersRef } from 'types/refs';
import ActionButtonComponent from './components/ActionButton';
import CreateCustomerButton from './components/CreateCustomerButton';
import FiltersForm from './FilterForm';
import useTableColumns from './TableColumns';
import useFilters from './utils/filters';

const Data = [
  {
    id: 1,
    customer: 'Anh Hùng Huế ĐL(SG)',
    address: 'Hà Nội',
    typeCustomer: 'Khách lẻ',
    phoneNumber: '0123456789',
    store : 'Thái Hà',
    email: null,
    birthDay: null,
    level: '',
    group: 'Đạt',
    totalMoney: 12900000,
    point: null,
    numberPurchase: 1,
    daysPurchase: 1,
    daysNotPurchase: 1,
    lastDatePurchase: null,
    amount: 60,
    note: null,
    buyingCycle: null,
  },
  {
    id: 2,
    customer: 'Anh Hùng Huế ĐL(SG)',
    address: 'Hà Nội',
    store : 'Thái Hà',
    typeCustomer: 'Khách lẻ',
    phoneNumber: '0123456789',
    email: null,
    birthDay: null,
    level: '',
    group: 'Đạt',
    totalMoney: 12900000,
    point: null,
    numberPurchase: 1,
    daysPurchase: 1,
    daysNotPurchase: 1,
    lastDatePurchase: null,
    amount: 60,
    buyingCycle: null,
    note: null,
  },

  {
    id: 3,
    customer: 'Anh Hùng Huế ĐL(SG)',
    address: 'Hà Nội',
    store : 'Thái Hà',
    typeCustomer: 'Khách lẻ',
    phoneNumber: '0123456789',
    email: null,
    birthDay: null,
    level: '',
    group: 'Đạt',
    totalMoney: 12900000,
    point: null,
    numberPurchase: 1,
    daysPurchase: 1,
    daysNotPurchase: 1,
    lastDatePurchase: null,
    amount: 60,
    buyingCycle: null,
    note: null,
  },
  {
    id: 4,
    customer: 'Anh Hùng Huế ĐL(SG)',
    address: 'Hà Nội',
    store : 'Thái Hà',
    typeCustomer: 'Khách lẻ',
    phoneNumber: '0123456789',
    email: null,
    birthDay: null,
    level: '',
    group: 'Đạt',
    totalMoney: 12900000,
    point: null,
    numberPurchase: 1,
    daysPurchase: 1,
    daysNotPurchase: 1,
    lastDatePurchase: null,
    amount: 60,
    buyingCycle: null,
    note: null,
  },

  {
    id: 15,
    customer: 'Anh Hùng Huế ĐL(SG)',
    address: 'Hà Nội',
    store : 'Thái Hà',
    typeCustomer: 'Khách lẻ',
    phoneNumber: '0123456789',
    email: null,
    birthDay: null,
    level: '',
    group: 'Đạt',
    totalMoney: 12900000,
    point: null,
    numberPurchase: 1,
    daysPurchase: 1,
    daysNotPurchase: 1,
    lastDatePurchase: null,
    amount: 60,
    buyingCycle: null,
    note: null,
  },
  {
    id: 16,
    customer: 'Anh Hùng Huế ĐL(SG)',
    address: 'Hà Nội',
    store : 'Thái Hà',
    typeCustomer: 'Khách lẻ',
    phoneNumber: '0123456789',
    email: null,
    birthDay: null,
    level: '',
    group: 'Đạt',
    totalMoney: 12900000,
    point: null,
    numberPurchase: 1,
    daysPurchase: 1,
    daysNotPurchase: 1,
    lastDatePurchase: null,
    amount: 60,
    buyingCycle: null,
    note: null,
  },
  {
    id: 17,
    customer: 'Anh Hùng Huế ĐL(SG)',
    address: 'Hà Nội',
    store : 'Thái Hà',
    typeCustomer: 'Khách lẻ',
    phoneNumber: '0123456789',
    email: null,
    birthDay: null,
    level: '',
    group: 'Đạt',
    totalMoney: 12900000,
    point: null,
    numberPurchase: 1,
    daysPurchase: 1,
    daysNotPurchase: 1,
    lastDatePurchase: null,
    amount: 60,
    buyingCycle: null,
    note: null,
  },
  {
    id: 18,
    customer: 'Anh Hùng Huế ĐL(SG)',
    address: 'Hà Nội',
    store : 'Thái Hà',
    typeCustomer: 'Khách lẻ',
    phoneNumber: '0123456789',
    email: null,
    birthDay: null,
    level: '',
    group: 'Đạt',
    totalMoney: 12900000,
    point: null,
    numberPurchase: 1,
    daysPurchase: 1,
    daysNotPurchase: 1,
    lastDatePurchase: null,
    amount: 60,
    buyingCycle: null,
    note: null,
  },
];

const CustomerTable = () => {
  const [, refetch] = useRefresh();
  const [banners] = useState<Customer[]>(Data);
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
    <ProTable<Customer>
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

export default CustomerTable;
