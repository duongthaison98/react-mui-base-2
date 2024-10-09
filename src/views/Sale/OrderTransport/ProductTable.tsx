import ActionButton from 'components/ProButton/ActionButton';
import ProTable from 'components/ProTable';
import useRefresh from 'hooks/useRefresh';
import { Fragment, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { FiltersRef } from 'types/refs';
import { IRetail } from 'types/retail';
import CreateDialog from './Dialog/Create';
import FiltersForm from './FiltersForm';
import useTableColumns from './TableColumns';
import useFilters from './utils/filters';

const DATA = [
  {
    creator: 'Hòa SG 11:47 02/02',
    idBill: 123,
    store: 'Linh kiện sài gòn',
    customer: 'Táo Đen-Cmt8 (SG)',
    product: 'Vỏ 12PRM 5G trắng đẹp',
    price: 111,
    amount: 111,
    unit: 'Chiếc',
    vat: 111,
    discount: 11,
    totalPrice: 111,
    payment: 111,
    note: 'string;',
  },
  {
    creator: 'Hòa SG 11:47 02/02',
    idBill: 1235,
    store: 'Linh kiện sài gòn',
    customer: 'Táo Đen-Cmt8 (SG)',
    product: 'Vỏ 12PRM 5G trắng đẹp',
    price: 111,
    amount: 111,
    unit: 'Chiếc',
    vat: 111,
    discount: 11,
    totalPrice: 111,
    payment: 111,
    note: 'string;',
  },
  {
    creator: 'Hòa SG 11:47 02/02',
    idBill: 2123,
    store: 'Linh kiện sài gòn',
    customer: 'Táo Đen-Cmt8 (SG)',
    product: 'Vỏ 12PRM 5G trắng đẹp',
    price: 111,
    amount: 111,
    unit: 'Chiếc',
    vat: 111,
    discount: 11,
    totalPrice: 111,
    payment: 111,
    note: 'string;',
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
  const [isOpenDialogCreate, setOpenDialogCreate] = useState<boolean>(false);
  const { filters, onSortingChange, onPageChange, onPageSizeChange, onSearch } =
    useFilters();

  const handleSubmitFilters = () => {
    filtersRef.current?.submit();
  };
  const handleOpenDialog = (value: any) => {
    setOpenDialogInfo(!isOpenDialogInfo);
  };

  const { columns } = useTableColumns({
    pageNumber: filters.pageNumber,
    pageSize: filters.pageSize,
    handleOpenDialog,
  });

  const handleOpenCreateDialog = () => setOpenDialogCreate(true);

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
        filter={<FiltersForm ref={filtersRef} onSearch={onSearch} />}
        toolBar={
          <Fragment>
            <ActionButton
              variant="contained"
              actionType="add"
              onClick={handleOpenCreateDialog}
            >
              {t('Thêm mới')}
            </ActionButton>
            <ActionButton
              actionType="download"
              variant="outlined"
              onClick={handleSubmitFilters}
            >
              {t('Xuất file')}
            </ActionButton>
          </Fragment>
        }
      />
      <CreateDialog
        open={isOpenDialogCreate}
        onClose={() => setOpenDialogCreate(false)}
      />
    </>
  );
};

export default ProductTable;
