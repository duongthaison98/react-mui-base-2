import PageBreadcrumbs from '@/components/PageBreadcrumbs';
import PageWrapper from '@/components/PageWrapper';
import ActionButton from '@/components/ProButton/ActionButton';
import ProMenu from '@/components/ProMenu';
import ProTable from '@/components/ProTable';
import useRefresh from '@/hooks/useRefresh';
import { Fragment, useCallback, useRef, useState } from 'react';
import type { FiltersRef } from '@/types/refs';

import FiltersForm from './FiltersForm';
import useTableColumns from './TableColumns';
import useFilters from './utils/filters';
import type { Cash } from './utils/type';

const DATA: Cash[] = [
  {
    id: 1,
    transactionId: 67232471,
    date: '2023-02-03T08:32:46.000+00:00',
    type: 1,
    account: '123234323',
    contraAccount: '123432323',
    object: 'Phiếu thu',
    document: 'Xuan Anh - Đà Nẵng (TĐ) - 0932246357',
    receive: 29750000,
    spend: 320000,
    creator: 'Xuan Anh Nguyen',
    note: 'sửa main',
    file: 'cacsa',
  },

  {
    id: 2,
    transactionId: 563423,
    date: '2023-02-03T08:32:46.000+00:00',
    type: 2,
    account: '127413243',
    contraAccount: '15255623',
    object: 'Báo có (Nộp tiền)',
    document: 'Đà Nẵng (TĐ) - 0932246357',
    receive: 29750000,
    spend: 320000,
    creator: 'LowsSG',
    note: 'Iphone 14 promax',
    file: 'các',
  },
  {
    id: 3,
    transactionId: 3423123,
    date: '2023-02-03T08:32:46.000+00:00',
    type: 4,
    account: '1231132323',
    contraAccount: '1231132323',
    object: 'Báo có (Nộp tiền)',
    document: 'A Mạnh - Hà Nội (TĐ) - 0932246357',
    receive: 29750000,
    spend: 320000,
    creator: 'Duong sh',
    note: 'Thay màn',
    file: 'ssss',
  },
  {
    id: 3,
    transactionId: 2323523,
    date: '2023-02-03T08:32:46.000+00:00',
    type: 4,
    account: '1231132323',
    contraAccount: '1231132323',
    object: 'Phiếu thu',
    document: 'A Quang - HN (TĐ) - 0932246357',
    receive: 29750000,
    spend: 320000,
    creator: 'Hải Hm',
    note: 'ép kính',
    file: 'ssss',
  },
  {
    id: 13,
    transactionId: 325423213,
    date: '2023-02-03T08:32:46.000+00:00',
    type: 1,
    account: '123234323',
    contraAccount: '123432323',
    object: 'Phiếu chi',
    document: 'Xuan Anh - Đà Nẵng (TĐ) - 0932246357',
    receive: 29750000,
    spend: 320000,
    creator: 'Xuan Anh Nguyen',
    note: 'sửa main',
    file: 'cacsa',
  },

  {
    id: 24,
    transactionId: 4223123,
    date: '2023-02-03T08:32:46.000+00:00',
    type: 2,
    account: '127413243',
    contraAccount: '15255623',
    object: 'Phiếu thu',
    document: 'Đà Nẵng (TĐ) - 0932246357',
    receive: 29750000,
    spend: 320000,
    creator: 'LowsSG',
    note: 'Iphone 14 promax',
    file: 'các',
  },
  {
    id: 32,
    transactionId: 32423523423,
    date: '2023-02-03T08:32:46.000+00:00',
    type: 4,
    account: '1231132323',
    contraAccount: '1231132323',
    object: 'Báo có (Nộp tiền)',
    document: 'A Mạnh - Hà Nội (TĐ) - 0932246357',
    receive: 29750000,
    spend: 320000,
    creator: 'Duong sh',
    note: 'Thay màn',
    file: 'ssss',
  },
  {
    id: 23,
    transactionId: 12343632,
    date: '2023-02-03T08:32:46.000+00:00',
    type: 4,
    account: '1231132323',
    contraAccount: '1231132323',
    object: 'Báo có (Nộp tiền)',
    document: 'A Quang - HN (TĐ) - 0932246357',
    receive: 29750000,
    spend: 320000,
    creator: 'Hải Hm',
    note: 'ép kính',
    file: 'ssss',
  },

  {
    id: 23,
    transactionId: 12343632,
    date: '2023-02-03T08:32:46.000+00:00',
    type: 4,
    account: '1231132323',
    contraAccount: '1231132323',
    object: 'Báo có (Nộp tiền)',
    document: 'A Quang - HN (TĐ) - 0932246357',
    receive: 29750000,
    spend: 320000,
    creator: 'Hải Hm',
    note: 'ép kính',
    file: 'ssss',
  },
  {
    id: 23,
    transactionId: 12343632,
    date: '2023-02-03T08:32:46.000+00:00',
    type: 4,
    account: '1231132323',
    contraAccount: '1231132323',
    object: 'Báo có (Nộp tiền)',
    document: 'A Quang - HN (TĐ) - 0932246357',
    receive: 29750000,
    spend: 320000,
    creator: 'Hải Hm',
    note: 'ép kính',
    file: 'ssss',
  },
  {
    id: 23,
    transactionId: 12343632,
    date: '2023-02-03T08:32:46.000+00:00',
    type: 4,
    account: '1231132323',
    contraAccount: '1231132323',
    object: 'Báo có (Nộp tiền)',
    document: 'A Quang - HN (TĐ) - 0932246357',
    receive: 29750000,
    spend: 320000,
    creator: 'Hải Hm',
    note: 'ép kính',
    file: 'ssss',
  },
  {
    id: 23,
    transactionId: 12343632,
    date: '2023-02-03T08:32:46.000+00:00',
    type: 4,
    account: '1231132323',
    contraAccount: '1231132323',
    object: 'Báo có (Nộp tiền)',
    document: 'A Quang - HN (TĐ) - 0932246357',
    receive: 29750000,
    spend: 320000,
    creator: 'Hải Hm',
    note: 'ép kính',
    file: 'ssss',
  },
  {
    id: 23,
    transactionId: 12343632,
    date: '2023-02-03T08:32:46.000+00:00',
    type: 4,
    account: '1231132323',
    contraAccount: '1231132323',
    object: 'Báo có (Nộp tiền)',
    document: 'A Quang - HN (TĐ) - 0932246357',
    receive: 29750000,
    spend: 320000,
    creator: 'Hải Hm',
    note: 'ép kính',
    file: 'ssss',
  },
  {
    id: 23,
    transactionId: 12343632,
    date: '2023-02-03T08:32:46.000+00:00',
    type: 4,
    account: '1231132323',
    contraAccount: '1231132323',
    object: 'Báo có (Nộp tiền)',
    document: 'A Quang - HN (TĐ) - 0932246357',
    receive: 29750000,
    spend: 320000,
    creator: 'Hải Hm',
    note: 'ép kính',
    file: 'ssss',
  },
  {
    id: 23,
    transactionId: 12343632,
    date: '2023-02-03T08:32:46.000+00:00',
    type: 4,
    account: '1231132323',
    contraAccount: '1231132323',
    object: 'Báo có (Nộp tiền)',
    document: 'A Quang - HN (TĐ) - 0932246357',
    receive: 29750000,
    spend: 320000,
    creator: 'Hải Hm',
    note: 'ép kính',
    file: 'ssss',
  },
  {
    id: 23,
    transactionId: 12343632,
    date: '2023-02-03T08:32:46.000+00:00',
    type: 4,
    account: '1231132323',
    contraAccount: '1231132323',
    object: 'Báo có (Nộp tiền)',
    document: 'A Quang - HN (TĐ) - 0932246357',
    receive: 29750000,
    spend: 320000,
    creator: 'Hải Hm',
    note: 'ép kính',
    file: 'ssss',
  },
  {
    id: 23,
    transactionId: 12343632,
    date: '2023-02-03T08:32:46.000+00:00',
    type: 4,
    account: '1231132323',
    contraAccount: '1231132323',
    object: 'Báo có (Nộp tiền)',
    document: 'A Quang - HN (TĐ) - 0932246357',
    receive: 29750000,
    spend: 320000,
    creator: 'Hải Hm',
    note: 'ép kính',
    file: 'ssss',
  },
  {
    id: 23,
    transactionId: 12343632,
    date: '2023-02-03T08:32:46.000+00:00',
    type: 4,
    account: '1231132323',
    contraAccount: '1231132323',
    object: 'Báo có (Nộp tiền)',
    document: 'A Quang - HN (TĐ) - 0932246357',
    receive: 29750000,
    spend: 320000,
    creator: 'Hải Hm',
    note: 'ép kính',
    file: 'ssss',
  },
  {
    id: 23,
    transactionId: 12343632,
    date: '2023-02-03T08:32:46.000+00:00',
    type: 4,
    account: '1231132323',
    contraAccount: '1231132323',
    object: 'Báo có (Nộp tiền)',
    document: 'A Quang - HN (TĐ) - 0932246357',
    receive: 29750000,
    spend: 320000,
    creator: 'Hải Hm',
    note: 'ép kính',
    file: 'ssss',
  },
  {
    id: 23,
    transactionId: 12343632,
    date: '2023-02-03T08:32:46.000+00:00',
    type: 4,
    account: '1231132323',
    contraAccount: '1231132323',
    object: 'Báo có (Nộp tiền)',
    document: 'A Quang - HN (TĐ) - 0932246357',
    receive: 29750000,
    spend: 320000,
    creator: 'Hải Hm',
    note: 'ép kính',
    file: 'ssss',
  },
];

const InventoryTable = () => {
  const [, refetch] = useRefresh();
  const [data] = useState<Cash[]>(DATA);
  const [loading] = useState<boolean>(false);
  const [total] = useState<number>(data.length || 0);
  const filtersRef = useRef<FiltersRef>(null);
  const { filters, onSortingChange, onPageChange, onPageSizeChange, onSearch } = useFilters();
  const [rowIds, setRowIds] = useState<number[]>([]);

  const [, setEditRowId] = useState<number | null>(null);

  const handleResetFilters = () => {
    filtersRef.current?.reset();
  };

  // edit note
  const handleEditNote = useCallback((rowId: number, note: string) => {
    setEditRowId(rowId);
  }, []);

  const { columns } = useTableColumns({
    pageNumber: filters.pageNumber,
    pageSize: filters.pageSize,
    handleEditNote,
  });

  const handleRowSelectionChange = (rowIds: string[]) => {
    setRowIds(rowIds.map(Number));
  };

  const handleCloseChangeStore = () => {};

  return (
    <Fragment>
      <PageWrapper title='Kế toán'>
        <PageBreadcrumbs
          title='Thu chi'
          items={[{ link: '/accounting/transaction/index', text: 'Kế toán' }]}
        />
        <ProTable<Cash>
          title='Danh sách giao dịch'
          loading={loading}
          columns={columns}
          data={data}
          refetch={refetch}
          onSortingChange={onSortingChange}
          onRowSelectionChange={handleRowSelectionChange}
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
              <ActionButton variant='text' onClick={handleResetFilters}>
                Xóa bộ lọc
              </ActionButton>

              <ProMenu<number>
                position='left'
                items={[
                  {
                    label: 'Xuất Excel',
                    value: 1,
                    // onSelect: handleToggleExportInventory,
                    actionType: 'excel',
                  },
                  {
                    label: 'In phiếu đã chọn',
                    value: 2,
                    onSelect: handleCloseChangeStore,
                    disabled: rowIds.length === 0,
                    actionType: 'print',
                  },
                ]}
              >
                <ActionButton color='info'>Thao tác</ActionButton>
              </ProMenu>
            </Fragment>
          }
        />
      </PageWrapper>
    </Fragment>
  );
};

export default InventoryTable;
