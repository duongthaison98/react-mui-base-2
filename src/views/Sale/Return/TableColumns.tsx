import EditIcon from '@mui/icons-material/Edit';
// import MoneyOutlinedIcon from '@mui/icons-material/MoneyOutlined';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SouthIcon from '@mui/icons-material/South';
import { Box, IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ActionIconButton from '@/components/ProButton/ActionIconButton';
import ProMenu from '@/components/ProMenu';
import type { HeadCell, ProColumn } from '@/components/ProTable/types';
import { getColumnHelper } from '@/components/ProTable/utils/getColumnHelper';
import useDialog from '@/hooks/useDialog';
import { Fragment, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import filter from 'lodash/filter';

const columnHelper = getColumnHelper<any>();

const HEAD_CELLS: HeadCell<any> = {
  date: 'Ngày',
  idBill: 'ID',
  customer: 'Khách hàng',
  product: 'Sản phẩm',
  price: 'Giá',
  amount: 'SL',
  vat: 'VAT',
  discount: 'Chiết khấu',
  return: 'Trả lại',
  fee: 'Phí',
  totalPrice: 'Tổng tiền',
  note: 'Ghi chú',
  actions: 'Hành động',
};

interface Props {
  pageNumber: number;
  pageSize: number;
  handleOpenDialog: (value: any) => void;
  handleOpenEditNoteDialog: (value: any) => void;
}

const useTableColumns = (props: Props) => {
  const { handleOpenDialog, handleOpenEditNoteDialog } = props;
  const dialog = useDialog();
  const navigate = useNavigate();

  const columns: ProColumn<any> = useMemo(() => {
    return [
      columnHelper.accessor('date', {
        id: 'date',
        size: 100,
        header: () => HEAD_CELLS.date,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.date,
          rowSpan: (context, rows) => {
            const result = filter(
              rows.map((row) => row.original),
              { date: context.getValue() },
            );

            if (context.row.original.product === result[0]?.product) {
              return result.length;
            }

            return null;
          },
          colSpan: () => null,
        },
      }),
      columnHelper.accessor('idBill', {
        id: 'idBill',
        size: 100,
        header: () => HEAD_CELLS.idBill,
        cell: (context) => (
          <Typography
            variant='subtitle2'
            sx={{ color: '#007bff', cursor: 'pointer' }}
            onClick={() => handleOpenDialog(context)}
          >
            {context.getValue()}
          </Typography>
        ),
        meta: {
          title: HEAD_CELLS.idBill,
          colSpan: () => null,
          rowSpan: (context, rows) => {
            const result: any = filter(
              rows.map((row) => row.original),
              { idBill: context.getValue() },
            );

            if (context.row.original.product === result[0]?.product) {
              return result.length;
            }

            return null;
          },
        },
      }),
      columnHelper.accessor('customer', {
        id: 'customer',
        size: 100,
        enableSorting: false,
        header: () => HEAD_CELLS.customer,
        cell: (context) => context.getValue(),
        footer: (context) => <Typography variant='subtitle2'>Tổng</Typography>,
        meta: {
          title: HEAD_CELLS.customer,
          colSpan: () => 5,
          rowSpan: (context, rows) => {
            const result = filter(
              rows.map((row) => row.original),
              { customer: context.getValue() },
            );

            if (context.row.original.product === result[0]?.product) {
              return result.length;
            }

            return null;
          },
        },
      }),
      columnHelper.accessor('product', {
        id: 'product',
        size: 250,
        enableSorting: false,
        header: () => HEAD_CELLS.product,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.product,
        },
      }),
      columnHelper.accessor('price', {
        id: 'price',
        size: 100,
        header: () => HEAD_CELLS.price,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.price,
        },
      }),
      columnHelper.accessor('amount', {
        id: 'amount',
        size: 100,
        enableSorting: false,
        header: () => HEAD_CELLS.amount,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.amount,
        },
        footer: (context) => <Typography variant='subtitle2'>70000</Typography>,
      }),
      columnHelper.accessor('vat', {
        id: 'vat',
        size: 100,
        enableSorting: false,
        header: () => HEAD_CELLS.vat,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.vat,
          rowSpan: (context, rows) => {
            const result = filter(
              rows.map((row) => row.original),
              { vat: context.getValue() },
            );

            if (context.row.original.product === result[0]?.product) {
              return result.length;
            }

            return null;
          },
          colSpan: () => null,
        },
      }),
      columnHelper.accessor('discount', {
        id: 'discount',
        size: 100,
        enableSorting: false,
        header: () => (
          <Tooltip title='Chiết khấu'>
            <SouthIcon color='error' />
          </Tooltip>
        ),
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.discount,
          rowSpan: (context, rows) => {
            const result = filter(
              rows.map((row) => row.original),
              { discount: context.getValue() },
            );

            if (context.row.original.product === result[0]?.product) {
              return result.length;
            }

            return null;
          },
          colSpan: () => null,
        },
      }),
      columnHelper.accessor('return', {
        id: 'return',
        size: 100,
        enableSorting: false,
        header: () => HEAD_CELLS.return,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.return,
          rowSpan: (context, rows) => {
            const result = filter(
              rows.map((row) => row.original),
              { return: context.getValue() },
            );

            if (context.row.original.product === result[0]?.product) {
              return result.length;
            }

            return null;
          },
          colSpan: () => 1,
        },
      }),
      columnHelper.accessor('fee', {
        id: 'fee',
        size: 100,
        enableSorting: false,
        header: () => HEAD_CELLS.fee,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.fee,
          rowSpan: (context, rows) => {
            const result = filter(
              rows.map((row) => row.original),
              { fee: context.getValue() },
            );

            if (context.row.original.product === result[0]?.product) {
              return result.length;
            }

            return null;
          },
          colSpan: () => 1,
        },
      }),
      columnHelper.accessor('totalPrice', {
        id: 'totalPrice',
        size: 100,
        enableSorting: false,
        header: () => HEAD_CELLS.totalPrice,
        footer: (context) => <Typography variant='subtitle2'>80.000.000</Typography>,

        cell: (context) => (
          <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
            {context.getValue()}
          </Typography>
        ),
        meta: {
          title: HEAD_CELLS.totalPrice,
          rowSpan: (context, rows) => {
            const result = filter(
              rows.map((row) => row.original),
              { totalPrice: context.getValue() },
            );

            if (context.row.original.product === result[0]?.product) {
              return result.length;
            }

            return null;
          },
          colSpan: () => 1,
        },
      }),

      columnHelper.accessor('note', {
        id: 'note',
        size: 100,
        enableSorting: false,
        header: () => (
          <Tooltip title='Ghi chú'>
            <NoteAltIcon />
          </Tooltip>
        ),
        cell: (context) => (
          <Box>
            {context.getValue()}
            <IconButton onClick={() => handleOpenEditNoteDialog(context)}>
              <EditIcon sx={{ color: 'text.secondary', ml: 1 }} />
            </IconButton>
          </Box>
        ),
        meta: {
          title: HEAD_CELLS.note,
          rowSpan: (context, rows) => {
            const result = filter(
              rows.map((row) => row.original),
              { note: context.getValue() },
            );

            if (context.row.original.product === result[0]?.product) {
              return result.length;
            }

            return null;
          },
          colSpan: () => 1,
        },
      }),
      {
        id: 'actions',
        size: 65,
        enableSorting: false,
        header: () => <SettingsOutlinedIcon sx={{ color: 'text.secondary' }} />,
        cell: (context) => {
          const handleDeleteRow = () => {
            dialog({
              headline: 'Xác nhận xóa?',
              supportingText: (
                <Fragment>
                  Bạn có chắc chắn muốn xóa: <strong>{context.row.original.name}</strong>
                </Fragment>
              ),
              onConfirm: async () => {},
            });
          };
          return (
            <ProMenu
              position='left'
              items={[
                {
                  label: 'In hóa đơn',
                  value: 1,
                  actionType: 'print',
                },
                {
                  label: 'Sửa phiếu bán lẻ',
                  value: 3,
                  actionType: 'edit',
                  onSelect: () => {
                    navigate('/sales/return/edit/1');
                  },
                },
                {
                  label: 'Xóa hóa đơn',
                  value: 3,
                  actionType: 'delete',
                  onSelect: handleDeleteRow,
                },
              ]}
            >
              <ActionIconButton actionType='more' />
            </ProMenu>
          );
        },
        meta: {
          title: HEAD_CELLS.actions,
          align: 'center',
          colSpan: () => 1,
        },
      },
    ];
  }, [handleOpenDialog, dialog, handleOpenEditNoteDialog, navigate]);

  return { columns };
};

export default useTableColumns;
