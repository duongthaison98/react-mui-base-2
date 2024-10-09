import PageBreadcrumbs from 'components/PageBreadcrumbs';
import PageWrapper from 'components/PageWrapper';
import ActionButton from 'components/ProButton/ActionButton';
import ProMenu from 'components/ProMenu';
import ProTable from 'components/ProTable';
import useRefresh from 'hooks/useRefresh';
import { Fragment, useCallback, useRef, useState } from 'react';
import { FiltersRef } from 'types/refs';
import FiltersForm from './FiltersForm';
import useTableColumns from './TableColumns';
import useFilters from './utils/filters';
import { Entry } from './utils/type';

const DATA: Entry[] = [
  {
    id: 1,
    transactionId: 67471,
    date: '2023-02-03T08:32:46.000+00:00',
    type: 1,
    object: { id: 12311, info: 'tien mat 665 le hong phong' },
    document: 8759843,
    amount: 2975000,
    debt: 8595,
    got: 9347,
    note: 'ahi ahi ahi',
    file: '',
  },
  {
    id: 2,
    transactionId: 67471,
    date: '2023-02-03T08:32:46.000+00:00',
    type: 1,
    object: { id: 12311, info: 'tien mat 665 le hong phong' },
    document: 8759843,
    amount: 2975000,
    debt: 8595,
    got: 9347,
    note: 'ahi ahi ahi',
    file: '',
  },
  {
    id: 3,
    transactionId: 67471,
    date: '2023-02-03T08:32:46.000+00:00',
    type: 1,
    object: { id: 12311, info: 'tien mat 665 le hong phong' },
    document: 8759843,
    amount: 2975000,
    debt: 8595,
    got: 9347,
    note: 'ahi ahi ahi',
    file: '',
  },
  {
    id: 4,
    transactionId: 67471,
    date: '2023-02-03T08:32:46.000+00:00',
    type: 1,
    object: { id: 12311, info: 'tien mat 665 le hong phong' },
    document: 8759843,
    amount: 2975000,
    debt: 8595,
    got: 9347,
    note: 'ahi ahi ahi',
    file: '',
  },
  {
    id: 5,
    transactionId: 67471,
    date: '2023-02-03T08:32:46.000+00:00',
    type: 1,
    object: { id: 12311, info: 'tien mat 665 le hong phong' },
    document: 8759843,
    amount: 2975000,
    debt: 8595,
    got: 9347,
    note: 'ahi ahi ahi',
    file: '',
  },
];

const Transaction = () => {
  const [, refetch] = useRefresh();
  const [data] = useState<Entry[]>(DATA);
  const [loading] = useState<boolean>(false);
  const { filters, onSortingChange, onPageChange, onPageSizeChange, onSearch } =
    useFilters();
  const [total] = useState<number>(data.length || 0);
  const [rowIds, setRowIds] = useState<number[]>([]);
  const filtersRef = useRef<FiltersRef>(null);

  const handleEditNote = useCallback(() => {}, []);
  const handleRowSelectionChange = (rowIds: string[]) => {
    setRowIds(rowIds.map(Number));
  };

  const { columns } = useTableColumns({
    pageNumber: filters.pageNumber,
    pageSize: filters.pageSize,
    handleEditNote,
  });

  return (
    <Fragment>
      <PageWrapper title="Danh sách bút toán">
        <PageBreadcrumbs
          title="Bút toán"
          items={[
            {
              link: '/accounting/transaction/index',
              text: 'Kế Toán',
            },
          ]}
        />
        <ProTable<Entry>
          title="Danh sách bút toán"
          loading={loading}
          columns={columns}
          data={data}
          refetch={refetch}
          onSortingChange={onSortingChange}
          onRowSelectionChange={handleRowSelectionChange}
          pagination={{
            total,
            page: filters.pageNumber,
            pageSize: filters.pageSize,
            onPageChange,
            onPageSizeChange,
          }}
          filter={<FiltersForm ref={filtersRef} onSearch={onSearch} />}
          toolBar={
            <Fragment>
              <ActionButton variant="text" onClick={() => null}>
                Xóa bộ lọc
              </ActionButton>
              <ActionButton
                href="/accounting/transaction/create"
                color="success"
              >
                Thêm mới
              </ActionButton>
              <ProMenu<number>
                position="left"
                items={[
                  {
                    label: 'Xuất Excel',
                    value: 1,
                    actionType: 'excel',
                  },
                  {
                    label: 'In phiếu đã chọn',
                    value: 2,
                    disabled: rowIds.length === 0,
                    actionType: 'print',
                  },
                ]}
              >
                <ActionButton color="info">Thao tác</ActionButton>
              </ProMenu>
            </Fragment>
          }
        />
      </PageWrapper>
    </Fragment>
  );
};

export default Transaction;
