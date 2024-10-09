import AddCircleIcon from '@mui/icons-material/AddCircle';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Tooltip } from '@mui/material';
import ActionIconButton from 'components/ProButton/ActionIconButton';
import ProMenu from 'components/ProMenu';
import Index from 'components/ProTable/components/Index';
import { HeadCell, ProColumn } from 'components/ProTable/types';
import { getColumnHelper } from 'components/ProTable/utils/getColumnHelper';
import { useMemo } from 'react';
import { Debt } from '../../utils/type';

const columnHelper = getColumnHelper<Debt>();

const HEAD_CELLS: HeadCell<Debt> = {
  index: '[1]',
  customer: 'Khách hàng [2]',
  debtReminderDate: 'Ngày nhắc nợ [3]',
  lastestCollectionDate: 'Ngày thu gần nhất',
  staff: 'Nhân viên phụ trách',
  store: 'CHPT',
  collectOpeningBalance: 'Nợ [Phải thu] [4]',
  giveOpeningBalance: 'Có [Phải trả] [5]',
  collectArising: 'Nợ [6]',
  giveArising: 'Có [7]',
  collectEndingBalance: 'Nợ [Phải thu] = 4 + 6 -5 - 7',
  giveEndingBalance: 'Có [Phải trả] = 5 + 7 - 4 -6',
  limit: 'Giới hạn',
};

interface Props {
  pageNumber: number;
  pageSize: number;
  handleClickShowPopup: () => void;
}
const useTableColumns = (props: Props) => {
  const { pageNumber, pageSize, handleClickShowPopup } = props;

  const columns: ProColumn<Debt> = useMemo(() => {
    return [
      Index<Debt>(pageNumber, pageSize),
      columnHelper.group({
        id: 'objects',
        header: 'Đối tượng',
        columns: [
          columnHelper.accessor('customer', {
            id: 'customer',
            size: 150,
            enableSorting: false,
            header: () => HEAD_CELLS.customer,
            cell: (context) => context.getValue(),
            meta: {
              title: HEAD_CELLS.customer,
            },
          }),
          columnHelper.accessor('debtReminderDate', {
            id: 'debtReminderDate',
            size: 60,
            enableSorting: false,
            header: () => HEAD_CELLS.debtReminderDate,
            cell: (context) => (
              <Tooltip title="Lịch sử nhắc nợ">
                <div onClick={handleClickShowPopup}>
                  <AddCircleIcon
                    color="success"
                    sx={{ '&:hover': { cursor: 'pointer' } }}
                  />
                </div>
              </Tooltip>
            ),
            meta: {
              title: HEAD_CELLS.debtReminderDate,
              align: 'center',
            },
          }),
        ],
        meta: {
          align: 'center',
        },
      }),
      columnHelper.accessor('lastestCollectionDate', {
        id: 'lastestCollectionDate',
        size: 80,
        enableSorting: false,
        header: () => HEAD_CELLS.lastestCollectionDate,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.lastestCollectionDate,
        },
      }),
      columnHelper.accessor('staff', {
        id: 'staff',
        size: 150,
        enableSorting: false,
        header: () => HEAD_CELLS.staff,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.staff,
        },
      }),
      columnHelper.accessor('store', {
        id: 'store',
        size: 150,
        enableSorting: false,
        header: () => HEAD_CELLS.store,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.store,
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
      columnHelper.accessor('limit', {
        id: 'limit',
        size: 80,
        enableSorting: false,
        header: () => HEAD_CELLS.limit,
        cell: (context) =>
          context.getValue()?.toLocaleString('it-IT', {
            style: 'currency',
            currency: 'VND',
          }),
        meta: {
          title: HEAD_CELLS.limit,
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
                  label: 'In chi tiết khách hàng',
                  value: 3,
                  actionType: 'print',
                },
                {
                  label: 'Cập nhật khách hàng',
                  value: 4,
                  actionType: 'edit',
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
  }, [pageNumber, pageSize, handleClickShowPopup]);
  return { columns };
};

export default useTableColumns;
