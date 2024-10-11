import { Box } from '@mui/system';
import ProFormTextField from '@/components/ProForm/ProFormTextField';
// import Selection from '@/components/ProTable/components/Selection';
import { HeadCell, ProColumn } from '@/components/ProTable/types';
import { getColumnHelper } from '@/components/ProTable/utils/getColumnHelper';
import { useMemo } from 'react';

const columnHelper = getColumnHelper<any>();

const HEAD_CELLS: HeadCell<any> = {
  debt: 'TK Nợ',
  got: 'TK Có',
  amount: 'Tiền VND',
  documentType: 'Loại chứng từ',
  document: 'Chứng từ',
  note: 'Ghi chú',
};

const useTable = () => {
  const columns: ProColumn<any> = useMemo(() => {
    return [
      // Selection<any>(),

      columnHelper.accessor('debt', {
        id: 'debt',
        size: 100,
        header: () => HEAD_CELLS.debt,
        cell: () => {
          return (
            <Box>
              <ProFormTextField name={'debt'} />
            </Box>
          );
        },
        meta: {
          title: HEAD_CELLS.debt,
          align: 'center',
        },
      }),

      columnHelper.accessor('got', {
        id: 'got',
        size: 100,
        header: () => HEAD_CELLS.got,
        cell: () => {
          return (
            <Box>
              <ProFormTextField name={'got'} />
            </Box>
          );
        },
        meta: {
          title: HEAD_CELLS.got,
          align: 'center',
        },
      }),

      columnHelper.accessor('amount', {
        id: 'amount',
        size: 100,
        header: () => HEAD_CELLS.amount,
        cell: () => {
          return (
            <Box>
              <ProFormTextField name={'amount'} />
            </Box>
          );
        },
        meta: {
          title: HEAD_CELLS.amount,
          align: 'center',
        },
      }),

      columnHelper.accessor('documentType', {
        id: 'documentType',
        size: 100,
        header: () => HEAD_CELLS.documentType,
        cell: () => {
          return (
            <Box>
              <ProFormTextField name={'documentType'} />
            </Box>
          );
        },
        meta: {
          title: HEAD_CELLS.documentType,
          align: 'center',
        },
      }),

      columnHelper.accessor('document', {
        id: 'document',
        size: 100,
        header: () => HEAD_CELLS.document,
        cell: () => {
          return (
            <Box>
              <ProFormTextField name={'document'} />
            </Box>
          );
        },
        meta: {
          title: HEAD_CELLS.document,
          align: 'center',
        },
      }),

      columnHelper.accessor('note', {
        id: 'note',
        size: 100,
        header: () => HEAD_CELLS.note,
        cell: () => {
          return (
            <Box>
              <ProFormTextField name={'note'} />
            </Box>
          );
        },
        meta: {
          title: HEAD_CELLS.note,
          align: 'center',
        },
      }),
    ];
  }, []);
  return { columns };
};
export default useTable;
