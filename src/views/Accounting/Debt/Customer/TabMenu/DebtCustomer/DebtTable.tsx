import ActionButton from 'components/ProButton/ActionButton';
import ProMenu from 'components/ProMenu';
import ProTable from 'components/ProTable';
import useRefresh from 'hooks/useRefresh';
import { Fragment, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiltersRef } from 'types/refs';
import UpdateDebtHistory from '../../components/UpdateDebtHistory';
import FiltersForm from './FilterForm';
import useTableColumns from './TableColumns';
import useFilters from './utils/filters';
import { Debt } from '../../utils/type';

const DATA = [
  {
    id: 0,
    customer: 'ABC',
    debtReminderDate: '2023-02-03T08:32:46.000+00:00',
    lastestCollectionDate: '2023-02-03T08:32:46.000+00:00',
    staff: 'DDajt',
    collectOpeningBalance: 1000000,
    giveOpeningBalance: 100000,
    collectArising: 100000,
    giveArising: 1000000,
    collectEndingBalance: 1000000,
    giveEndingBalance: 100000,
    limit: 0,
    store: 'Thái Hà',
  },
];

const DebtTable = () => {
  const { t } = useTranslation();

  const [, refetch] = useRefresh();
  const [banners] = useState<Debt[]>(DATA);
  const [loading] = useState<boolean>(false);
  const [total] = useState<number>(banners.length || 0);
  const filtersRef = useRef<FiltersRef>(null);
  const { filters, onSortingChange, onPageChange, onPageSizeChange, onSearch } =
    useFilters();
  const [isShowPopup, setIsShowPopup] = useState<boolean>(false);

  const handleClickShowPopup = () => {
    setIsShowPopup(!isShowPopup);
  };

  const { columns } = useTableColumns({
    pageNumber: filters.pageNumber,
    pageSize: filters.pageSize,
    handleClickShowPopup,
  });

  const handleResetFilters = () => {
    filtersRef.current?.reset();
  };

  const handleSubmitFilters = () => {
    filtersRef.current?.submit();
  };

  return (
    <ProTable<Debt>
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
          <ProMenu
            position="right"
            items={[
              {
                label: 'Xuất Excel',
                value: 1,
                actionType: 'excel',
              },
              { type: 'divider' },
              {
                label: 'Tính tổng phải thu khách hàng',
                value: 2,
                actionType: 'add',
              },
            ]}
          >
            <ActionButton iconPosition="end" actionType="expand" color="info">
              {t('Thao tác')}
            </ActionButton>
          </ProMenu>
          <UpdateDebtHistory
            open={isShowPopup}
            handleClose={() => setIsShowPopup(false)}
          />
          ,
        </Fragment>
      }
    />
  );
};

export default DebtTable;
