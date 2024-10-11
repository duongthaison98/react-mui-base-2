import ActionButton from '@/components/ProButton/ActionButton';
import ProMenu from '@/components/ProMenu';
import ProTable from '@/components/ProTable';
import useRefresh from '@/hooks/useRefresh';
import { Fragment, useCallback, useRef, useState } from 'react';
import type { FiltersRef } from '@/types/refs';
import ConfirmChangeStore from '@/views/Accounting/Cash/components/ConfirmChangeStore';
import EditNote from '@/views/Accounting/Cash/components/EditNote';
import FiltersForm from './FiltersForm';
import useTableColumns from './TableColumns';
import useFilters from './utils/filters';
import { IImportExport } from './utils/types';

const DATA = [
  {
    id: 1,
    idAndDay: { id: 976876, day: '02/05' },
    warehouse: { name: 'Linh kiện Sài Gòn', type: 'Xuất bán lẻ' },
    product: 20,
    quantity: 23,
    totalMoney: 1111111,
    creator: 'string',
    customer: { name: 'Nguyễn Văn A', mobile: '0987678765' },
    note: 'string',
  },
  {
    id: 2,
    idAndDay: { id: 976876, day: '02/05' },
    warehouse: { name: 'Linh kiện Sài Gòn', type: 'Xuất bán lẻ' },
    product: 20,
    quantity: 23,
    totalMoney: 1111111,
    creator: 'string',
    customer: { name: 'Nguyễn Văn A', mobile: '0987678765' },
    note: 'string',
  },
  {
    id: 3,
    idAndDay: { id: 976876, day: '02/05' },
    warehouse: { name: 'Linh kiện Sài Gòn', type: 'Xuất bán lẻ' },
    product: 20,
    quantity: 23,
    totalMoney: 1111111,
    creator: 'string',
    customer: { name: 'Nguyễn Văn A', mobile: '0987678765' },
    note: 'string',
  },
  {
    id: 4,
    idAndDay: { id: 976876, day: '02/05' },
    warehouse: { name: 'Linh kiện Sài Gòn', type: 'Xuất bán lẻ' },
    product: 20,
    quantity: 23,
    totalMoney: 1111111,
    creator: 'string',
    customer: { name: 'Nguyễn Văn A', mobile: '0987678765' },
    note: 'string',
  },
];

const BillTable = () => {
  const [, refetch] = useRefresh();
  const [banners] = useState<IImportExport[]>(DATA);
  const [loading] = useState<boolean>(false);
  const [total] = useState<number>(banners.length || 0);
  const filtersRef = useRef<FiltersRef>(null);
  const { filters, onSortingChange, onPageChange, onPageSizeChange, onSearch } = useFilters();
  const [openEditNote, setEditNote] = useState<boolean>(false);
  const [, setEditRowId] = useState<number | null>(null);
  const [value, setValue] = useState<string>('');
  const [openConfirmChangeStore, setOpenConfirmChangeStore] = useState<boolean>(false);

  // edit note
  const handleEditNote = useCallback((rowId: number, note: string) => {
    setEditNote(true);
    setEditRowId(rowId);
    setValue(note);
  }, []);

  const handleCloseEditNote = () => {
    setEditNote(false);
    setEditRowId(null);
  };

  const confirmEditNote = (price: string) => {};

  const handleCloseChangeStore = () => {
    setOpenConfirmChangeStore((prev) => !prev);
  };

  const confirmChangeStore = (store: number | null) => {};

  const handleResetFilters = () => {
    filtersRef.current?.reset();
  };

  const handleSubmitFilters = () => {
    filtersRef.current?.submit();
  };

  const { columns } = useTableColumns({
    pageNumber: filters.pageNumber,
    pageSize: filters.pageSize,
    handleEditNote,
  });

  return (
    <>
      <ProTable<IImportExport>
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
            <ProMenu
              items={[
                {
                  label: 'Nhập kho',
                  to: '/inventory/bill/import',
                  actionType: 'arrowLeft',
                },
                {
                  label: 'Xuất kho',
                  to: '/inventory/bill/export',
                  actionType: 'arrowRight',
                },
              ]}
            >
              <ActionButton iconPosition='end' actionType='expand' color='success'>
                {'Thêm mới'}
              </ActionButton>
            </ProMenu>
            <ProMenu
              items={[
                {
                  label: 'Xuất Excel',
                  value: 1,
                  onSelect: () => {
                    console.log('hihi');
                  },
                  actionType: 'excel',
                },
                {
                  label: 'In các phiếu XNK đã chọn',
                  value: 2,
                  onSelect: () => {
                    console.log('hihi');
                  },
                  actionType: 'print',
                },
                {
                  label: 'Gán nhãn phiếu XNK đã chọn',
                  value: 3,
                  onSelect: () => {
                    console.log('hihi');
                  },
                  actionType: 'tags',
                },
                {
                  label: 'Xóa các phiếu XNK đã chọn',
                  value: 4,
                  onSelect: () => {
                    console.log('hihi');
                  },
                  actionType: 'delete',
                },
              ]}
            >
              <ActionButton iconPosition='end' actionType='expand' color='info'>
                {'Thao tác'}
              </ActionButton>
            </ProMenu>
          </Fragment>
        }
      />
      <ConfirmChangeStore
        open={openConfirmChangeStore}
        onClose={handleCloseChangeStore}
        confirmChange={confirmChangeStore}
      />
      <EditNote
        open={openEditNote}
        onClose={handleCloseEditNote}
        confirmChange={confirmEditNote}
        value={value}
      />
    </>
  );
};

export default BillTable;
