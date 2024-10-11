import ActionButton from '@/components/ProButton/ActionButton';
import ProMenu from '@/components/ProMenu';
import ProTable from '@/components/ProTable';
import useRefresh from '@/hooks/useRefresh';
import { Fragment, useRef, useState } from 'react';
import type { FiltersRef } from '@/types/refs';
import FiltersForm from './FiltersForm';
import PopupDetail from './PopupDetail';
import useTableColumns from './TableColumns';
import useFilters from './utils/filters';
import { EditHistory } from './utils/type';

const DATA = [
  {
    id: 1,
    maSanPham: 'AGHNFYGB',
    tenSanPham: 'Cáp loa JBL 1234',
    kieuLog: 'Xóa sản phẩm',
    nguoiSua: 'Oanh SG',
    thoiGian: '16:32 11/02',
  },
  {
    id: 2,
    maSanPham: 'AGHNFYGB',
    tenSanPham: 'Cáp loa JBL 1234',
    kieuLog: 'Xóa sản phẩm',
    nguoiSua: 'Oanh SG',
    thoiGian: '16:32 11/02',
  },
  {
    id: 3,
    maSanPham: 'AGHNFYGB',
    tenSanPham: 'Cáp loa JBL 1234',
    kieuLog: 'Xóa sản phẩm',
    nguoiSua: 'Oanh SG',
    thoiGian: '16:32 11/02',
  },
];

const EditHistoryTable = () => {
  const [, refetch] = useRefresh();
  const [banners] = useState<EditHistory[]>(DATA);
  const [loading] = useState<boolean>(false);
  const [total] = useState<number>(banners.length || 0);
  const filtersRef = useRef<FiltersRef>(null);
  const { filters, onSortingChange, onPageChange, onPageSizeChange, onSearch } = useFilters();

  const [isOpenDialogInfo, setOpenDialogInfo] = useState<boolean>(false);
  const handleToggleDialog = () => {
    setOpenDialogInfo((prev) => !prev);
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
    handleToggleDialog,
  });

  return (
    <>
      <ProTable<EditHistory>
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
            <ActionButton iconPosition='end' actionType='print' color='info'>
              {'In mã vạch'}
            </ActionButton>
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
              ]}
            >
              <ActionButton iconPosition='end' actionType='expand' color='success'>
                {'Thao tác'}
              </ActionButton>
            </ProMenu>
          </Fragment>
        }
      />
      {isOpenDialogInfo ? (
        <PopupDetail open={isOpenDialogInfo} onClose={handleToggleDialog} />
      ) : null}
    </>
  );
};

export default EditHistoryTable;
