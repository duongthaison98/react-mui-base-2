import PageBreadcrumbs from 'components/PageBreadcrumbs';
import PageWrapper from 'components/PageWrapper';
import ProTable from 'components/ProTable';
import useRefresh from 'hooks/useRefresh';
import { Fragment, useState } from 'react';
import useFilters from './utils/filters';
import { TransactionHistory } from './utils/type';
import FiltersForm from './FiltersForm';
import ProMenu from 'components/ProMenu';
import ActionButton from 'components/ProButton/ActionButton';
import useTableColumns from './TableColumns';

const DATA: TransactionHistory[] = [
  {
    id: 2323,
    transactionId: 234878,
    transactionDate: '2023-02-03T08:32:46.000+00:00',
    documentType: 1,
    document: '3845783',
    type: 1,
    amount: 1284000,
    operator: 'OanhSG',
    actionType: 1,
  },
  {
    id: 2323,
    transactionId: 234878,
    transactionDate: '2023-02-03T08:32:46.000+00:00',
    documentType: 1,
    document: '3845783',
    type: 1,
    amount: 1284000,
    operator: 'OanhSG',
    actionType: 1,
  },
  {
    id: 2323,
    transactionId: 234878,
    transactionDate: '2023-02-03T08:32:46.000+00:00',
    documentType: 1,
    document: '3845783',
    type: 1,
    amount: 1284000,
    operator: 'OanhSG',
    actionType: 1,
  },
  {
    id: 2323,
    transactionId: 234878,
    transactionDate: '2023-02-03T08:32:46.000+00:00',
    documentType: 1,
    document: '3845783',
    type: 1,
    amount: 1284000,
    operator: 'OanhSG',
    actionType: 1,
  },
];

const TransactionLog = () => {
  const [, refetch] = useRefresh();
  const [data] = useState<TransactionHistory[]>(DATA);
  const [loading] = useState<boolean>(false);
  const [total] = useState<number>(data.length || 0);
  const { filters, onSortingChange, onPageChange, onPageSizeChange, onSearch } =
    useFilters();

  const { columns } = useTableColumns({
    pageNumber: filters.pageNumber,
    pageSize: filters.pageSize,
  });

  return (
    <Fragment>
      <PageWrapper title="Giao dịch kế toán">
        <PageBreadcrumbs
          title="Lịch sử"
          items={[
            {
              link: '/accounting/transaction/index',
              text: 'Kế toán',
            },
            {
              link: '/accounting/transaction/log',
              text: 'Bút toán',
            },
          ]}
        />
        <ProTable<TransactionHistory>
          title="Danh sách giao dịch"
          loading={loading}
          columns={columns}
          data={data}
          refetch={refetch}
          onSortingChange={onSortingChange}
          onRowSelectionChange={() => null}
          pagination={{
            total,
            page: filters.pageNumber,
            pageSize: filters.pageSize,
            onPageChange,
            onPageSizeChange,
          }}
          filter={<FiltersForm onSearch={onSearch} />}
          toolBar={
            <Fragment>
              <ProMenu<number>
                position="left"
                items={[
                  {
                    label: 'Xuất Excel',
                    value: 1,
                    actionType: 'excel',
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

export default TransactionLog;
