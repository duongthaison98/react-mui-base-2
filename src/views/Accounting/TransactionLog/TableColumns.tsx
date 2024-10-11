import { HeadCell, ProColumn } from '@/components/ProTable/types';
import { getColumnHelper } from '@/components/ProTable/utils/getColumnHelper';
import useDialog from '@/hooks/useDialog';
import { useMemo } from 'react';
import { TransactionHistory } from './utils/type';
import Selection from '@/components/ProTable/components/Selection';
import { Box } from '@mui/system';
import DateTime from '@/utils/DateTime';
import Numeral from '@/utils/Numeral';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton } from '@mui/material';

const HEAD_CELLS: HeadCell<TransactionHistory> = {
  index: 'STT',
  id: 'ID',
  transactionId: 'ID giao dịch',
  transactionDate: 'Ngày giao dịch',
  documentType: 'Loại chứng từ',
  document: 'Chứng từ',
  type: 'Loại giao dịch',
  amount: 'Tổng tiền giao dịch',
  operator: 'Người thao tác',
  actionType: 'Hành động',
  actions: 'Dữ liệu',
};

interface Props {
  pageNumber: number;
  pageSize: number;
}

const columnsHelper = getColumnHelper<TransactionHistory>();

const useTableColumns = (props: Props) => {
  const dialog = useDialog();
  const columns: ProColumn<TransactionHistory> = useMemo(() => {
    return [
      Selection<TransactionHistory>(),
      columnsHelper.accessor('id', {
        id: 'id',
        size: 50,
        enableSorting: false,
        header: () => HEAD_CELLS.id,
        cell: (context) => {
          <Box>{context.getValue()}</Box>;
        },
        meta: {
          title: HEAD_CELLS.id,
          align: 'center',
        },
      }),

      columnsHelper.accessor('transactionId', {
        id: 'transactionId',
        size: 50,
        enableSorting: false,
        header: () => HEAD_CELLS.transactionId,
        cell: (context) => <Box sx={{ color: '#007bff' }}>{context.getValue()}</Box>,
        meta: {
          title: HEAD_CELLS.transactionId,
          align: 'center',
        },
      }),

      columnsHelper.accessor('transactionDate', {
        id: 'transactionDate',
        size: 100,
        enableSorting: false,
        header: () => HEAD_CELLS.transactionDate,
        cell: (context) => <Box>{DateTime.Format(context.getValue())}</Box>,
        meta: {
          title: HEAD_CELLS.transactionDate,
          align: 'center',
        },
      }),

      columnsHelper.accessor('documentType', {
        id: 'documentType',
        size: 100,
        enableSorting: false,
        header: () => HEAD_CELLS.documentType,
        cell: (context) => <Box>{context.getValue() === 1 ? 'Phiếu XNK' : 'Đơn hàng'}</Box>,
        meta: {
          title: HEAD_CELLS.documentType,
          align: 'center',
        },
      }),

      columnsHelper.accessor('document', {
        id: 'document',
        size: 100,
        enableSorting: false,
        header: () => HEAD_CELLS.document,
        cell: (context) => <Box>{context.getValue()}</Box>,
        meta: {
          title: HEAD_CELLS.document,
          align: 'center',
        },
      }),

      columnsHelper.accessor('type', {
        id: 'type',
        size: 100,
        enableSorting: false,
        header: () => HEAD_CELLS.type,
        cell: (context) => <Box>{context.getValue() === 1 ? 'Phiếu thu' : 'Khác'}</Box>,
        meta: {
          title: HEAD_CELLS.type,
          align: 'center',
        },
      }),

      columnsHelper.accessor('amount', {
        id: 'amount',
        size: 100,
        enableSorting: false,
        header: () => HEAD_CELLS.amount,
        cell: (context) => (
          <Box display='flex' justifyContent='end'>
            {Numeral.price(context.getValue())}
          </Box>
        ),
        meta: {
          title: HEAD_CELLS.amount,
          align: 'center',
        },
      }),

      columnsHelper.accessor('operator', {
        id: 'operator',
        size: 100,
        enableSorting: false,
        header: () => HEAD_CELLS.operator,
        cell: (context) => <Box>{context.getValue()}</Box>,
        meta: {
          title: HEAD_CELLS.operator,
          align: 'center',
        },
      }),

      columnsHelper.accessor('actionType', {
        id: 'actionType',
        size: 50,
        enableSorting: false,
        header: () => HEAD_CELLS.actionType,
        cell: (context) => <Box>{context.getValue() === 1 ? 'Sửa' : 'Xóa'}</Box>,
        meta: {
          title: HEAD_CELLS.actionType,
          align: 'center',
        },
      }),

      {
        id: 'actions',
        size: 10,
        enableSorting: false,
        header: () => HEAD_CELLS.actions,
        cell: () => {
          const handleView = () => {
            dialog({
              supportingText: 'View details transaction history...',
            });
          };
          return (
            <IconButton onClick={handleView}>
              <VisibilityIcon sx={{ color: 'text.secondary' }} />
            </IconButton>
          );
        },
      },
    ];
  }, [dialog]);
  return { columns };
};

export default useTableColumns;
