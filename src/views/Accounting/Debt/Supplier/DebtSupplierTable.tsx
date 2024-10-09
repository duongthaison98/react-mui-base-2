import ActionButton from 'components/ProButton/ActionButton';
import ProTable from 'components/ProTable';
import useRefresh from 'hooks/useRefresh';
import { Fragment, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiltersRef } from 'types/refs';
import FiltersForm from './FIltersForm';
import useTableColumns from './TableColumns';
import useFilters from './utils/filters';
import { DebtSupplier } from './utils/type';

const DATA = [
  {
    id: 0,
    supplier: 'Đạt',
    collectOpeningBalance: 1000000,
    giveOpeningBalance: 100000,
    collectArising: 100000,
    giveArising: 1000000,
    collectEndingBalance: 1000000,
    giveEndingBalance: 100000,
  },
];

const DebtSupplierTable = () => {
  const { t } = useTranslation();

  const [, refetch] = useRefresh();
  const [banners] = useState<DebtSupplier[]>(DATA);
  const [loading] = useState<boolean>(false);
  const [total] = useState<number>(banners.length || 0);
  const filtersRef = useRef<FiltersRef>(null);
  const { filters, onSortingChange, onPageChange, onPageSizeChange, onSearch } =
    useFilters();

  const { columns } = useTableColumns({
    pageNumber: filters.pageNumber,
    pageSize: filters.pageSize,
  });

  const handleResetFilters = () => {
    filtersRef.current?.reset();
  };

  const handleSubmitFilters = () => {
    filtersRef.current?.submit();
  };

  return (
    <ProTable<DebtSupplier>
      title="Danh sách sản phẩm"
      loading={loading}
      columns={columns}
      data={DATA}
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
          <ActionButton iconPosition="start" actionType="upload" color="info">
            {t('Xuất excel')}
          </ActionButton>
        </Fragment>
      }
    />
  );
};

export default DebtSupplierTable;
