import LinkButton from 'components/LinkButton';
import ActionButton from 'components/ProButton/ActionButton';
import ProMenu from 'components/ProMenu';
import ProTable from 'components/ProTable';
import useDialog from 'hooks/useDialog';
import useRefresh from 'hooks/useRefresh';
import { Fragment, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { FiltersRef } from 'types/refs';
import { IRetail } from 'types/retail';
import AttackSelectedBillDialog from './Dialog/AttackSelectedBillDialog';
import CreateBillDialog from './Dialog/CreateBillDialog';
import EditNoteDialog from './Dialog/EditNoteDialog';
import InfoDialog from './Dialog/Infomation';
import FiltersForm from './FiltersForm';
import useTableColumns from './TableColumns';
import useFilters from './utils/filters';

const DATA = [
  {
    creator: 'Hòa SG 11:47 02/02',
    idBill: 1,
    store: 'Linh kiện sài gòn',
    customer: 'Táo Đen-Cmt8 (SG)',
    status: 'Trạng thái 1',
    product: 'Vỏ 12PRM 5G trắng đẹp',
    price: 1,
    amount: 1,
    unit: 'Chiếc',
    vat: 1,
    discount: 11,
    totalPrice: 111,
    payment: 111,
    note: 'string;',
    id: '1',
  },
  {
    creator: 'Hòa SG 11:47 02/02',
    idBill: 1,
    store: 'Linh kiện sài gòn',
    customer: 'Táo Đen-Cmt8 (SG)',
    status: 'Trạng thái 1',
    product: 'Vỏ 12PRM 5G trắng đẹp 1',
    price: 1,
    amount: 1,
    unit: 'Chiếc',
    vat: 1,
    discount: 11,
    totalPrice: 111,
    payment: 111,
    note: 'string;',
    id: '1',
  },
];

const ProductTable = () => {
  const { t } = useTranslation();
  const [, refetch] = useRefresh();
  const [banners] = useState<IRetail[]>(DATA);
  const [loading] = useState<boolean>(false);
  const [total] = useState<number>(banners.length || 0);
  const filtersRef = useRef<FiltersRef>(null);
  const [isOpenDialogInfo, setOpenDialogInfo] = useState<boolean>(false);
  const [isOpenDialogEditNote, setOpenDialogEditNote] =
    useState<boolean>(false);
  const [dataSelected, setDataSelected] = useState<any>({});
  const [isOpenCreateBillDialog, setOpenCreateBillDialog] =
    useState<boolean>(false);
  const [isOpenAttackSelectedBillDialog, setOpenAttackSelectedBillDialog] =
    useState<boolean>(false);
  const { filters, onSortingChange, onPageChange, onPageSizeChange, onSearch } =
    useFilters();
  const dialog = useDialog();

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

  const handleDeleteRow = () => {
    dialog({
      headline: 'Xác nhận',
      supportingText: (
        <Fragment>
          Bạn muốn xóa các phiếu xuất nhập kho:
          <strong>9589804</strong>
        </Fragment>
      ),
      onConfirm: async () => {},
    });
  };

  return (
    <>
      <ProTable<IRetail>
        title="Danh sách"
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
            <LinkButton
              to="/sales/retail/create"
              variant="contained"
              type="create"
              color="success"
            >
              {t('Thêm mới')}
            </LinkButton>
            <ProMenu
              position="right"
              items={[
                {
                  label: 'Xuất Excel',
                  value: 2,
                  actionType: 'excel',
                },
                { type: 'divider' },
                {
                  label: 'Xóa các dòng được chọn',
                  value: 3,
                  actionType: 'delete',
                  color: 'error.main',
                  onSelect: handleDeleteRow,
                },
              ]}
            >
              <ActionButton iconPosition="end" actionType="expand" color="info">
                {t('Thao tác')}
              </ActionButton>
            </ProMenu>
            <LinkButton
              to="/sales/return"
              variant="contained"
              type="create"
              color="error"
            >
              {t('Trả hàng')}
            </LinkButton>
          </Fragment>
        }
      />
      <InfoDialog
        open={isOpenDialogInfo}
        onClose={() => {
          setOpenDialogInfo(false);
          setDataSelected({});
        }}
        dataSelected={dataSelected}
      />
      <CreateBillDialog
        open={isOpenCreateBillDialog}
        onClose={() => {
          setOpenCreateBillDialog(!isOpenCreateBillDialog);
        }}
      />
      <AttackSelectedBillDialog
        open={isOpenAttackSelectedBillDialog}
        onClose={() => {
          setOpenAttackSelectedBillDialog(!isOpenAttackSelectedBillDialog);
        }}
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
