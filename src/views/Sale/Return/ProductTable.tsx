import LinkButton from '@/components/LinkButton';
import ActionButton from '@/components/ProButton/ActionButton';
import ProMenu from '@/components/ProMenu';
import ProTable from '@/components/ProTable';
// import useDialog from '@/hooks/useDialog';
import useRefresh from '@/hooks/useRefresh';
import { Fragment, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { FiltersRef } from '@/types/refs';
import EditNoteDialog from './Dialog/EditNoteDialog';

import FiltersForm from './FiltersForm';
import useTableColumns from './TableColumns';
import useFilters from './utils/filters';

const DATA = [
  {
    date: 'Hòa SG 11:47 02/02',
    idBill: 1,
    customer: 'Táo Đen-Cmt8 (SG)',
    product: 'Vỏ 12PRM 5G trắng đẹp',
    price: 1,
    amount: 1,
    vat: 1,
    discount: 11,
    return: 1,
    fee: 1,
    totalPrice: 111,
    note: 'string;',
    id: '1',
  },
  {
    date: 'Hòa SG 11:47 02/02',
    idBill: 1,
    customer: 'Táo Đen-Cmt8 (SG)',
    product: 'Vỏ 12PRM 5G trắng đẹp 1',
    price: 1,
    amount: 1,
    vat: 1,
    discount: 11,
    return: 1,
    fee: 1,
    totalPrice: 111,
    note: 'string;',
    id: '1',
  },
];

const ProductTable = () => {
  const { t } = useTranslation();
  const [, refetch] = useRefresh();
  const [banners] = useState<any[]>(DATA);
  const [loading] = useState<boolean>(false);
  const [total] = useState<number>(banners.length || 0);
  const filtersRef = useRef<FiltersRef>(null);
  const [isOpenDialogInfo, setOpenDialogInfo] = useState<boolean>(false);
  const [isOpenDialogEditNote, setOpenDialogEditNote] = useState<boolean>(false);
  const [dataSelected, setDataSelected] = useState<any>({});
  const { filters, onSortingChange, onPageChange, onPageSizeChange, onSearch } = useFilters();
  // const dialog = useDialog();

  const handleResetFilters = () => {
    filtersRef.current?.reset();
  };

  const handleSubmitFilters = () => {
    filtersRef.current?.submit();
  };
  const handleOpenDialog = (value: any) => {
    setDataSelected(value?.row?.original ?? {});
    setOpenDialogInfo(!isOpenDialogInfo);
  };

  const handleOpenEditNoteDialog = (value: any) => {
    setDataSelected(value?.row?.original ?? {});
    setOpenDialogEditNote(!isOpenDialogEditNote);
  };

  const { columns } = useTableColumns({
    pageNumber: filters.pageNumber,
    pageSize: filters.pageSize,
    handleOpenDialog,
    handleOpenEditNoteDialog,
  });

  // const handleDeleteRow = () => {
  //   dialog({
  //     headline: 'Xác nhận',
  //     supportingText: (
  //       <Fragment>
  //         Bạn muốn xóa các phiếu xuất nhập kho:
  //         <strong>9589804</strong>
  //       </Fragment>
  //     ),
  //     onConfirm: async () => {},
  //   });
  // };

  return (
    <>
      <ProTable<any>
        title='Danh sách'
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
          <Fragment>
            <LinkButton to='/sales/return/create' variant='contained' type='create' color='success'>
              {t('Trả hàng không cần hóa đơn')}
            </LinkButton>
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
      <EditNoteDialog
        open={isOpenDialogEditNote}
        onClose={() => {
          setOpenDialogEditNote(!isOpenDialogEditNote);
          setDataSelected({});
        }}
        value={dataSelected}
      />
    </>
  );
};

export default ProductTable;
