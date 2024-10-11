import ActionButton from '@/components/ProButton/ActionButton';
import ProMenu from '@/components/ProMenu';
import ProTable from '@/components/ProTable';
import useRefresh from '@/hooks/useRefresh';
import { Fragment, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { FiltersRef } from '@/types/refs';
import FiltersForm from './FiltersForm';
import useTableColumns from './TableColumns';
import useFilters from './utils/filters';
import type { Product } from './utils/types';

const DATA = [
  {
    id: 1,
    code: 'V12PRMTRDE',
    name: 'Vỏ 12PRM 5G trắng đẹp',
    markCode: 200002,
    importPrice: '772.00',
    costPrice: '772.00',
    price: '772.00',
    priceVAT: '772.00',
    wholesalePrice: '772.00',
    inventory: 15,
    totalInventory: 25,
    shipping: 23,
  },
  {
    id: 2,
    code: 'A12PRMTRDE',
    name: 'Vỏ 12PRM 5G trắng đẹp',
    markCode: 200002,
    importPrice: '772.00',
    costPrice: '772.00',
    price: '772.00',
    priceVAT: '772.00',
    wholesalePrice: '772.00',
    inventory: 15,
    totalInventory: 25,
    shipping: 221,
  },
  {
    id: 3,
    code: 'G12PRMTRDE',
    name: 'Vỏ 12PRM 5G trắng đẹp',
    markCode: 200002,
    importPrice: '772.00',
    costPrice: '772.00',
    price: '772.00',
    priceVAT: '772.00',
    wholesalePrice: '772.00',
    inventory: 22,
    totalInventory: 25,
    shipping: 45,
  },
  {
    id: 4,
    code: 'HV12PRMTRDE',
    name: 'Vỏ 12PRM 5G trắng đẹp',
    markCode: 200002,
    importPrice: '772.00',
    costPrice: '772.00',
    price: '772.00',
    priceVAT: '772.00',
    wholesalePrice: '772.00',
    inventory: 15,
    totalInventory: 25,
    shipping: 11,
  },
  {
    id: 5,
    code: 'L12PRMTRDE',
    name: 'Vỏ 12PRM 5G trắng đẹp',
    markCode: 200002,
    importPrice: '772.00',
    costPrice: '772.00',
    price: '772.00',
    priceVAT: '772.00',
    wholesalePrice: '772.00',
    inventory: 10,
    totalInventory: 25,
    shipping: 22,
  },
  {
    id: 6,
    code: 'E12PRMTRDE',
    name: 'Vỏ 12PRM 5G trắng đẹp',
    markCode: 200002,
    importPrice: '772.00',
    costPrice: '772.00',
    price: '772.00',
    priceVAT: '772.00',
    wholesalePrice: '772.00',
    inventory: 5,
    totalInventory: 25,
    shipping: 32,
  },
  {
    id: 7,
    code: 'C12PRMTRDE',
    name: 'Vỏ 12PRM 5G trắng đẹp',
    markCode: 200002,
    importPrice: '772.00',
    costPrice: '772.00',
    price: '772.00',
    priceVAT: '772.00',
    wholesalePrice: '772.00',
    inventory: 25,
    totalInventory: 25,
    shipping: 66,
  },
  {
    id: 8,
    code: 'M12PRMTRDE',
    name: 'Vỏ 12PRM 5G trắng đẹp',
    markCode: 200002,
    importPrice: '772.00',
    costPrice: '772.00',
    price: '772.00',
    priceVAT: '772.00',
    wholesalePrice: '772.00',
    inventory: 3,
    totalInventory: 25,
    shipping: 2,
  },
];

const ProductTable = () => {
  const { t } = useTranslation();
  const [, refetch] = useRefresh();
  const [products] = useState<Product[]>(DATA);
  const [loading] = useState<boolean>(false);
  const [total] = useState<number>(products.length || 0);
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

  return (
    <ProTable<any>
      title='Danh sách sản phẩm'
      loading={loading}
      columns={columns}
      data={products}
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
        <Fragment>
          <ProMenu
            position='right'
            items={[
              {
                label: 'Thêm mới',
                value: 1,
                actionType: 'add',
                to: '/products/create',
              },
              // {
              //   label: 'Nhập từ Excel',
              //   value: 2,
              //   actionType: 'excel',
              // },
              // {
              //   label: 'Nhập từ Excel sản phẩm Combo',
              //   value: 3,
              //   actionType: 'excel',
              // },
            ]}
          >
            <ActionButton iconPosition='end' actionType='expand' color='success'>
              {t('Thêm mới')}
            </ActionButton>
          </ProMenu>
          <ProMenu
            position='right'
            items={[
              {
                label: 'Xuất Excel',
                value: 1,
                actionType: 'excel',
              },
              {
                label: 'In mã vạch',
                value: 2,
                actionType: 'print',
              },
              {
                label: 'Đổi trạng thái sản phẩm',
                value: 3,
                actionType: 'sync',
              },
              {
                label: 'Xem giá sản phẩm theo chi nhánh',
                value: 8,
                actionType: 'tree',
              },
            ]}
          >
            <ActionButton iconPosition='end' actionType='expand' color='info'>
              {t('Thao tác')}
            </ActionButton>
          </ProMenu>
        </Fragment>
      }
    />
  );
};

export default ProductTable;
