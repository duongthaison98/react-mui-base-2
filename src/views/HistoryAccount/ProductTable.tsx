import ActionButton from '@/components/ProButton/ActionButton';
import ProMenu from '@/components/ProMenu';
import ProTable from '@/components/ProTable';
import useRefresh from '@/hooks/useRefresh';
import { Fragment, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { DialogRef, FiltersRef } from '@/types/refs';
import Dialog from './Dialog';
import FiltersForm from './FiltersForm';
import useTableColumns from './TableColumns';
import useFilters from './utils/filters';
import type { Product } from './utils/types';

const DATA = [
  {
    id: 1,
    code: '1234141',
    name: '613789322',
    markCode: 'Phạm Thị Mai Hương',
    importPrice: '772.00',
    costPrice: '772.00',
    price: '772.00',
    priceVAT: '19:14 09/02',
    wholesalePrice: '772.00',
    inventory: 'Dây Sạc 20W TaiWan - VTEC94',
    totalInventory: 25,
    shipping: 23,
  },
  {
    id: 2,
    code: '1243124',
    name: '613787323',
    markCode: 'Xuan Anh',
    importPrice: '772.00',
    costPrice: '772.00',
    price: '772.00',
    priceVAT: '19:14 09/02',
    wholesalePrice: '772.00',
    inventory: 'Vỏ 12 MINI 4G Trắng',
    totalInventory: 25,
    shipping: 221,
  },
  {
    id: 3,
    code: '613787321',
    name: '613789322',
    markCode: 'Luan Luan',
    importPrice: '772.00',
    costPrice: '772.00',
    price: '772.00',
    priceVAT: '18:59 09/02',
    wholesalePrice: '772.00',
    inventory: 'Viền Cam 12PRM Vàng',
    totalInventory: 51,
    shipping: 45,
  },
  {
    id: 4,
    code: '613787320',
    name: '613755082',
    markCode: 'Luan Kyo',
    importPrice: '772.00',
    costPrice: '772.00',
    price: '772.00',
    priceVAT: '8:36 09/02',
    wholesalePrice: '772.00',
    inventory: 'Viền Cam 14Pro-14PRM Trắng',
    totalInventory: 11,
    shipping: 11,
  },
  {
    id: 5,
    code: '613787318',
    name: '613787315',
    markCode: 'Thanh Luan',
    importPrice: '772.00',
    costPrice: '772.00',
    price: '772.00',
    priceVAT: '18:34 09/02',
    wholesalePrice: '772.00',
    inventory: 'Viền Cam XS-XSM Trắng',
    totalInventory: 15,
    shipping: 22,
  },
  {
    id: 6,
    code: '233432432',
    name: '613787315',
    markCode: 'Luan Thanh',
    importPrice: '772.00',
    costPrice: '772.00',
    price: '772.00',
    priceVAT: '18:59 09/02',
    wholesalePrice: '772.00',
    inventory: 'Vỏ 13PRM 4G Vàng',
    totalInventory: 67,
    shipping: 32,
  },
  {
    id: 7,
    code: '233432432',
    name: '613792204',
    markCode: 'Thu Hương',
    importPrice: '772.00',
    costPrice: '772.00',
    price: '772.00',
    priceVAT: '19:12 09/02',
    wholesalePrice: '772.00',
    inventory: 'Kính 7G Trắng',
    totalInventory: 64,
    shipping: 66,
  },
  {
    id: 8,
    code: '233432432',
    name: '613787316',
    markCode: 'Phạm Thị Mai Hương',
    importPrice: '772.00',
    costPrice: '772.00',
    price: '772.00',
    priceVAT: '19:12 09/02',
    wholesalePrice: '772.00',
    inventory: 'Kính Lưng XSM Đen ( N )',
    totalInventory: 32,
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
  const dialogRef = useRef<DialogRef>(null);

  const handleOpenDialog = () => {
    dialogRef.current?.open();
  };

  const handleResetFilters = () => {
    filtersRef.current?.reset();
  };

  const handleSubmitFilters = () => {
    filtersRef.current?.submit();
  };

  const { columns } = useTableColumns({
    pageNumber: filters.pageNumber,
    pageSize: filters.pageSize,
    open: handleOpenDialog,
  });

  return (
    <>
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
                  label: 'Xuất Excel',
                  value: 1,
                  actionType: 'excel',
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
      <Dialog ref={dialogRef} />
    </>
  );
};

export default ProductTable;
