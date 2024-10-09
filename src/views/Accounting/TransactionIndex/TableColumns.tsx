import { HeadCell, ProColumn } from 'components/ProTable/types';
import { getColumnHelper } from 'components/ProTable/utils/getColumnHelper';
import useDialog from 'hooks/useDialog';
import { useMemo } from 'react';
import { Account, Entry } from './utils/type';
import Selection from 'components/ProTable/components/Selection';
import {
  Box,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import DateTime from 'utils/DateTime';
import Numeral from 'utils/Numeral';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import SettingsOutlined from '@mui/icons-material/SettingsOutlined';
import ProMenu from 'components/ProMenu';
import ActionIconButton from 'components/ProButton/ActionIconButton';

const columnHelper = getColumnHelper<Entry>();

const HEAD_CELLS: HeadCell<Entry> = {
  index: 'STT',
  transactionId: 'ID | Ngày',
  type: 'Loại',
  object: 'Đối tượng',
  document: 'Chứng từ',
  amount: 'Số tiền',
  debt: 'Nợ',
  got: 'Có',
  note: 'Ghi chú',
  file: 'file',
};

interface Props {
  pageNumber: number;
  pageSize: number;
  handleEditNote: (id: number, note: string) => void;
}

const useTableColumns = (props: Props) => {
  const { handleEditNote } = props;
  const dialog = useDialog();
  const columns: ProColumn<Entry> = useMemo(() => {
    return [
      Selection<Entry>(),

      columnHelper.accessor('transactionId', {
        id: 'transactionId',
        size: 50,
        enableSorting: false,
        header: () => HEAD_CELLS.transactionId,
        cell: (context) => {
          const { transactionId, date } = context.row.original;
          return (
            <Tooltip title={DateTime.Format(date, 'YYYY-MM-DD')}>
              <Stack direction="column">
                <Link href="" underline="none" target="_blank" color="#007bff">
                  {transactionId}
                </Link>
                <Box>{DateTime.Format(date, 'MM-DD')}</Box>
              </Stack>
            </Tooltip>
          );
        },
        meta: {
          title: HEAD_CELLS.transactionId,
          align: 'center',
        },
      }),

      columnHelper.accessor('type', {
        id: 'type',
        size: 100,
        enableSorting: false,
        header: () => HEAD_CELLS.type,
        cell: (context) => {
          const value = context.getValue();
          if (!value) return;
          return (
            <Stack>
              <Typography>Phiếu bán hàng</Typography>
            </Stack>
          );
        },
        meta: {
          title: HEAD_CELLS.type,
          align: 'center',
        },
      }),

      columnHelper.accessor('object', {
        id: 'object',
        size: 150,
        enableSorting: false,
        header: () => HEAD_CELLS.object,
        cell: (context) => {
          return (
            <Stack direction="column" alignItems="start" spacing={0}>
              <Box>{`KH.${context.getValue<Account>().id}`}</Box>
              <Link
                href=""
                underline="none"
                target="_blank"
                color="#007bff"
              >{`${context.getValue<Account>().info}`}</Link>
            </Stack>
          );
        },
        meta: {
          title: HEAD_CELLS.object,
          align: 'center',
        },
      }),

      columnHelper.accessor('document', {
        id: 'document',
        size: 100,
        enableSorting: false,
        header: () => HEAD_CELLS.document,
        cell: (context) => {
          return (
            <Stack direction="row" alignItems="baseline">
              <Box>Phiếu XNK</Box>
              <Link href="" underline="none" target="_blank" color="#007bff">
                {context.getValue()}
              </Link>
            </Stack>
          );
        },
        meta: {
          title: HEAD_CELLS.document,
          align: 'center',
        },
      }),

      columnHelper.accessor('amount', {
        id: 'amount',
        size: 50,
        enableSorting: false,
        header: () => HEAD_CELLS.amount,
        cell: (context) => {
          return (
            <Box display="flex" justifyContent="end">
              {Numeral.price(context.getValue())}
            </Box>
          );
        },
        meta: {
          title: HEAD_CELLS.amount,
          align: 'center',
        },
      }),

      columnHelper.accessor('debt', {
        id: 'debt',
        size: 50,
        enableSorting: false,
        header: () => HEAD_CELLS.debt,
        cell: (context) => {
          return <Box>{Numeral.price(context.getValue())}</Box>;
        },
        meta: {
          title: HEAD_CELLS.debt,
          align: 'center',
        },
      }),

      columnHelper.accessor('got', {
        id: 'got',
        size: 50,
        enableSorting: false,
        header: () => HEAD_CELLS.got,
        cell: (context) => {
          return <Box>{Numeral.price(context.getValue())}</Box>;
        },
        meta: {
          title: HEAD_CELLS.got,
          align: 'center',
        },
      }),

      columnHelper.accessor('note', {
        id: 'note',
        size: 150,
        enableSorting: false,
        header: () => HEAD_CELLS.note,
        cell: (context) => {
          const { note, id } = context.row.original;
          return (
            <Stack direction={'row'} alignItems="center" spacing={2}>
              <Box>{note}</Box>

              <IconButton onClick={() => handleEditNote(id, note)}>
                <EditIcon sx={{ color: 'text.secondary' }} />
              </IconButton>
            </Stack>
          );
        },
        meta: {
          title: HEAD_CELLS.note,
          align: 'center',
        },
      }),

      columnHelper.accessor('file', {
        id: 'file',
        size: 50,
        enableSorting: false,
        header: () => HEAD_CELLS.file,
        cell: (context) => {
          return (
            <IconButton>
              <AddIcon color="primary" />
            </IconButton>
          );
        },
        meta: {
          title: HEAD_CELLS.file,
          align: 'center',
        },
      }),

      {
        id: 'actions',
        size: 10,
        enableSorting: false,
        header: () => <SettingsOutlined sx={{ color: 'text.secondary' }} />,
        cell: () => {
          const handleDelete = () => {
            dialog({
              supportingText: 'Bạn có chắc chắn muốn xóa đơn hàng này không?',
            });
          };
          return (
            <ProMenu
              position="left"
              items={[
                {
                  label: 'In Phieu',
                  value: 1,
                  actionType: 'save',
                },
                {
                  label: 'Sua',
                  value: 2,
                  actionType: 'edit',
                },
                {
                  label: 'Xoa',
                  value: 3,
                  actionType: 'delete',
                  onSelect: handleDelete,
                },
              ]}
            >
              <ActionIconButton actionType="more" />
            </ProMenu>
          );
        },
      },
    ];
  }, [dialog, handleEditNote]);

  return { columns };
};

export default useTableColumns;
