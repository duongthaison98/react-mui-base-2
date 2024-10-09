import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ActionIconButton from 'components/ProButton/ActionIconButton';
import ProMenu from 'components/ProMenu';
import Index from 'components/ProTable/components/Index';
import { HeadCell, ProColumn } from 'components/ProTable/types';
import { getColumnHelper } from 'components/ProTable/utils/getColumnHelper';
import { useMemo } from 'react';
import { DebtSupplier } from './utils/type';

const columnHelper = getColumnHelper<DebtSupplier>();

const HEAD_CELLS: HeadCell<DebtSupplier> = {
  index: '[1]',
  supplier: 'Khách hàng [2]',
  collectOpeningBalance: 'Nợ [Phải thu] [3]',
  giveOpeningBalance: 'Có [Phải trả] [4]',
  collectArising: 'Nợ [5]',
  giveArising: 'Có [6]',
  collectEndingBalance: 'Nợ [Phải thu] = 3 + 5 - 4 -6',
  giveEndingBalance: 'Có [Phải trả] = 4 + 6 -3 - 5',
};

interface Props {
  pageNumber: number;
  pageSize: number;
}
const useTableColumns = (props: Props) => {
  const { pageNumber, pageSize } = props;

  const columns: ProColumn<DebtSupplier> = useMemo(() => {
    return [
      Index<DebtSupplier>(pageNumber, pageSize),
      columnHelper.group({
        id: 'objects',
        header: 'Đối tượng',
        columns: [
          columnHelper.accessor('supplier', {
            id: 'supplier',
            size: 150,
            enableSorting: false,
            header: () => HEAD_CELLS.supplier,
            cell: (context) => context.getValue(),
            meta: {
              title: HEAD_CELLS.supplier,
            },
          }),
        ],
        meta: {
          align: 'center',
        },
      }),

      columnHelper.group({
        id: 'openingBalance',
        header: 'Số dư đầu kỳ',
        columns: [
          columnHelper.accessor('collectOpeningBalance', {
            id: 'collectOpeningBalance',
            size: 80,
            enableSorting: false,
            header: () => HEAD_CELLS.collectOpeningBalance,
            cell: (context) =>
              context.getValue()?.toLocaleString('it-IT', {
                style: 'currency',
                currency: 'VND',
              }),
            meta: {
              title: HEAD_CELLS.collectOpeningBalance,
            },
          }),
          columnHelper.accessor('giveOpeningBalance', {
            id: 'giveOpeningBalance',
            size: 80,
            enableSorting: false,
            header: () => HEAD_CELLS.giveOpeningBalance,
            cell: (context) =>
              context.getValue()?.toLocaleString('it-IT', {
                style: 'currency',
                currency: 'VND',
              }),
            meta: {
              title: HEAD_CELLS.giveOpeningBalance,
            },
          }),
        ],
        meta: {
          align: 'center',
        },
      }),
      columnHelper.group({
        id: 'arising',
        header: 'Phát sinh giữa kỳ',
        columns: [
          columnHelper.accessor('collectArising', {
            id: 'collectArising',
            size: 80,
            enableSorting: false,
            header: () => HEAD_CELLS.collectArising,
            cell: (context) =>
              context.getValue()?.toLocaleString('it-IT', {
                style: 'currency',
                currency: 'VND',
              }),
            meta: {
              title: HEAD_CELLS.collectArising,
            },
          }),
          columnHelper.accessor('giveArising', {
            id: 'giveArising',
            size: 80,
            enableSorting: false,
            header: () => HEAD_CELLS.giveArising,
            cell: (context) =>
              context.getValue()?.toLocaleString('it-IT', {
                style: 'currency',
                currency: 'VND',
              }),
            meta: {
              title: HEAD_CELLS.giveArising,
            },
          }),
        ],
        meta: {
          align: 'center',
        },
      }),
      columnHelper.group({
        id: 'endingBalance',
        header: 'Số dư cuối kỳ',
        columns: [
          columnHelper.accessor('collectEndingBalance', {
            id: 'collectEndingBalance',
            size: 80,
            enableSorting: false,
            header: () => HEAD_CELLS.collectEndingBalance,
            cell: (context) =>
              context.getValue()?.toLocaleString('it-IT', {
                style: 'currency',
                currency: 'VND',
              }),
            meta: {
              title: HEAD_CELLS.collectEndingBalance,
            },
          }),
          columnHelper.accessor('giveEndingBalance', {
            id: 'giveEndingBalance',
            size: 80,
            enableSorting: false,
            header: () => HEAD_CELLS.giveEndingBalance,
            cell: (context) =>
              context.getValue()?.toLocaleString('it-IT', {
                style: 'currency',
                currency: 'VND',
              }),
            meta: {
              title: HEAD_CELLS.giveEndingBalance,
            },
          }),
        ],
        meta: {
          align: 'center',
        },
      }),

      {
        id: 'actions',
        size: 65,
        enableSorting: false,
        header: () => <SettingsOutlinedIcon sx={{ color: 'text.secondary' }} />,
        cell: (context) => {
          return (
            <ProMenu
              position="left"
              items={[
                {
                  label: 'Lập phiếu thu',
                  value: 2,
                  actionType: 'add',
                },
                {
                  label: 'Lập phiếu báo nợ',
                  value: 3,
                  actionType: 'add',
                },
              ]}
            >
              <ActionIconButton actionType="more" />
            </ProMenu>
          );
        },
        meta: {
          title: HEAD_CELLS.actions,
          align: 'center',
        },
      },
    ];
  }, [pageNumber, pageSize]);
  return { columns };
};

export default useTableColumns;
