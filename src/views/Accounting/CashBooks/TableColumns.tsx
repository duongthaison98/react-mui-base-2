import type { HeadCell, ProColumn } from 'components/ProTable/types';
import { getColumnHelper } from 'components/ProTable/utils/getColumnHelper';
import { useMemo } from 'react';
import Numeral from 'utils/Numeral';
import { Box, Stack } from '@mui/material';
import { Cash } from './utils/type';

import DateTime from 'utils/DateTime';

const columnHelper = getColumnHelper<Cash>();

const HEAD_CELLS: HeadCell<Cash> = {
  index: 'STT',
  transactionId: 'ID',
  type: 'Loại',
  account: ' Mã Tài khoản',
  contraAccount: 'Tên tài khoản',
  object: 'Loại phiếu',
  document: 'Đối tượng',
  receive: 'Thu',
  spend: 'Chi',
  creator: 'Chứng từ',
  note: 'Diễn giải',
  file: 'Diễn giải',
  date: 'Ngày',
};

interface Props {
  pageNumber: number;
  pageSize: number;
  handleEditNote: (id: number, note: string) => void;
}

const useTableColumns = (props: Props) => {
  const columns: ProColumn<Cash> = useMemo(() => {
    return [
      columnHelper.accessor('transactionId', {
        id: 'transactionId',
        size: 50,
        enableSorting: false,
        header: () => HEAD_CELLS.transactionId,
        cell: (context) => {
          const { transactionId } = context.row.original;
          return (
            <Stack direction="column" spacing={0}>
              {transactionId}
            </Stack>
          );
        },
        meta: {
          title: HEAD_CELLS.transactionId,
          align: 'center',
        },
      }),
      columnHelper.accessor('date', {
        id: 'date',
        size: 120,
        enableSorting: false,
        header: () => HEAD_CELLS.date,
        cell: (context) => {
          const { date } = context.row.original;
          return (
            <Stack direction="column" spacing={0}>
              {DateTime.Format(date, 'MM-DD-YYYY')}
            </Stack>
          );
        },
        meta: {
          title: HEAD_CELLS.transactionId,
          align: 'center',
        },
      }),

      columnHelper.accessor('account', {
        id: 'account',
        size: 60,
        enableSorting: false,
        header: () => HEAD_CELLS.account,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.account,
        },
      }),

      columnHelper.accessor('contraAccount', {
        id: 'contraAccount',
        size: 120,
        enableSorting: false,
        header: () => HEAD_CELLS.contraAccount,
        cell: (context) => {
          return (
            <Stack direction="column" spacing={0}>
              <Box>{`${context.getValue()}`}</Box>
            </Stack>
          );
        },
        meta: {
          title: HEAD_CELLS.contraAccount,
        },
      }),
      columnHelper.accessor('object', {
        id: 'object',
        size: 160,
        enableSorting: false,
        header: () => HEAD_CELLS.object,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.object,
        },
      }),

      columnHelper.accessor('document', {
        id: 'document',
        size: 160,
        enableSorting: false,
        header: () => HEAD_CELLS.document,

        cell: (context) => {
          return (
            <Stack direction="column" spacing={0}>
              <Box sx={{ color: 'blue' }}>{context.getValue()}</Box>
            </Stack>
          );
        },
        meta: {
          title: HEAD_CELLS.document,
        },
      }),
      columnHelper.accessor('creator', {
        id: 'creator',
        size: 120,
        enableSorting: false,
        header: () => HEAD_CELLS.creator,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.creator,
        },
      }),
      columnHelper.accessor('receive', {
        id: 'receive',
        size: 50,
        enableSorting: false,
        header: () => HEAD_CELLS.receive,
        cell: (context) => Numeral.price(context.getValue()),
        meta: {
          title: HEAD_CELLS.receive,
        },
      }),

      columnHelper.accessor('spend', {
        id: 'spend',
        size: 50,
        enableSorting: false,
        header: () => HEAD_CELLS.spend,
        cell: (context) => Numeral.price(context.getValue()),
        meta: {
          title: HEAD_CELLS.spend,
        },
      }),

      columnHelper.accessor('note', {
        id: 'note',
        size: 160,
        enableSorting: false,
        header: () => HEAD_CELLS.note,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.note,
        },
      }),
    ];
  }, []);

  return { columns };
};

export default useTableColumns;
