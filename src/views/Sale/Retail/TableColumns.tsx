import EditIcon from '@mui/icons-material/Edit';
import MoneyOutlinedIcon from '@mui/icons-material/MoneyOutlined';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SouthIcon from '@mui/icons-material/South';
import { Box, Checkbox, Divider, Grid, IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ActionIconButton from '@/components/ProButton/ActionIconButton';
import ProMenu from '@/components/ProMenu';
import type { HeadCell, ProColumn } from '@/components/ProTable/types';
import { getColumnHelper } from '@/components/ProTable/utils/getColumnHelper';
import useDialog from '@/hooks/useDialog';
import { Fragment, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { IRetail } from '@/types/retail';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import filter from 'lodash/filter';

const columnHelper = getColumnHelper<IRetail>();

const HEAD_CELLS: HeadCell<IRetail> = {
  creator: 'Người tạo',
  idBill: 'ID',
  store: 'Cửa hàng',
  customer: 'Khách hàng',
  status: 'Trạng thái',
  product: 'Sản phẩm',
  price: 'Giá',
  amount: 'SL',
  unit: 'ĐVT',
  vat: 'VAT',
  discount: 'Chiết khấu',
  totalPrice: 'Tổng tiền',
  payment: 'Thanh toán',
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

  const columns: ProColumn<IRetail> = useMemo(() => {
    return [
      columnHelper.display({
        id: 'selection',
        size: 60,
        maxSize: 60,
        minSize: 60,
        header: (info) => (
          <Checkbox
            checked={info.table.getIsAllRowsSelected()}
            indeterminate={info.table.getIsSomeRowsSelected()}
            onChange={info.table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <Box>
            <Checkbox
              checked={row.getIsSelected()}
              indeterminate={row.getIsSomeSelected()}
              onChange={row.getToggleSelectedHandler()}
            />
          </Box>
        ),
        meta: {
          title: 'Chọn tất cả',
          colSpan: () => null,
        },
      }),
      columnHelper.accessor('creator', {
        id: 'creator',
        size: 100,
        header: () => HEAD_CELLS.creator,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.creator,
          rowSpan: (context, rows) => {
            const result = filter(
              rows.map((row) => row.original),
              { creator: context.getValue() },
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
      columnHelper.accessor('store', {
        id: 'store',
        size: 100,
        header: () => HEAD_CELLS.store,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.store,
          colSpan: () => null,
          rowSpan: (context, rows) => {
            const result = filter(
              rows.map((row) => row.original),
              { store: context.getValue() },
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
        meta: {
          title: HEAD_CELLS.customer,
          colSpan: () => null,
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
      columnHelper.accessor('status', {
        id: 'status',
        size: 100,
        enableSorting: false,
        header: () => HEAD_CELLS.status,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.status,
          colSpan: () => null,
          rowSpan: (context, rows) => {
            const result = filter(
              rows.map((row) => row.original),
              { status: context.getValue() },
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
          colSpan: () => null,
        },
      }),
      columnHelper.accessor('price', {
        id: 'price',
        size: 100,
        header: () => HEAD_CELLS.price,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.price,
          colSpan: () => 8,
        },
        footer: (context) => <Typography variant='subtitle2'>Tổng</Typography>,
      }),
      columnHelper.accessor('amount', {
        id: 'amount',
        size: 100,
        enableSorting: false,
        header: () => HEAD_CELLS.amount,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.amount,
          colSpan: () => 1,
        },
        footer: (context) => <Typography variant='subtitle2'>100</Typography>,
      }),
      columnHelper.accessor('unit', {
        id: 'unit',
        size: 100,
        header: () => HEAD_CELLS.unit,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.unit,
          colSpan: () => 1,
        },
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
          colSpan: () => 1,
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
          colSpan: () => 1,
        },
      }),
      columnHelper.accessor('totalPrice', {
        id: 'totalPrice',
        size: 100,
        enableSorting: false,
        header: () => HEAD_CELLS.totalPrice,
        cell: (context) => (
          <Typography variant='subtitle2' sx={{ color: 'primary.main' }}>
            {context.getValue()}
          </Typography>
        ),
        footer: (context) => <Typography variant='subtitle2'>60.000</Typography>,

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
      columnHelper.accessor('payment', {
        id: 'payment',
        size: 100,
        enableSorting: false,
        header: () => HEAD_CELLS.payment,
        cell: (context) => (
          <Grid container justifyContent={'flex-end'}>
            <Typography sx={{ display: 'flex', fontSize: '14px', marginBottom: 1 }}>
              <MoneyOutlinedIcon />
              {context.getValue()}
            </Typography>
            {/* <Typography
              variant="subtitle2"
              sx={{ color: 'primary.main', marginBottom: 1 }}
            >
              Nợ: {context.getValue()}
            </Typography>
            <Typography
              sx={{ display: 'flex', fontSize: '14px', marginBottom: 1 }}
            >
              <PanToolAltIcon sx={{ transform: 'rotate(90deg)' }} />
              {context.getValue()}
            </Typography>
            <Typography
              sx={{ display: 'flex', fontSize: '14px', marginBottom: 1 }}
            >
              <DomainIcon />
              {context.getValue()}
            </Typography> */}
          </Grid>
        ),
        footer: (context) => (
          <Grid container justifyContent={'flex-end'}>
            <Typography sx={{ display: 'flex', fontSize: '14px', marginBottom: 1 }}>
              <MoneyOutlinedIcon sx={{ marginRight: 1 }} />
              750
            </Typography>
            <Typography variant='subtitle2' sx={{ color: 'primary.main', marginBottom: 1 }}>
              Nợ: 200
            </Typography>
            <Typography
              sx={{
                display: 'flex',
                fontSize: '14px',
                marginBottom: 1,
                borderBottom: '1px solid #ccc',
              }}
            >
              <AccountBalanceIcon sx={{ marginRight: 1 }} />
              100
            </Typography>

            <Typography sx={{ display: 'flex', fontSize: '14px', marginBottom: 1 }}>
              Còn nợ:
            </Typography>
            <Typography sx={{ display: 'flex', fontSize: '14px', marginBottom: 1 }}>100</Typography>
          </Grid>
        ),

        meta: {
          title: HEAD_CELLS.payment,
          rowSpan: (context, rows) => {
            const result = filter(
              rows.map((row) => row.original),
              { payment: context.getValue() },
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
                  label: 'Cập nhật trạng thái',
                  value: 2,
                  actionType: 'edit',
                },
                {
                  label: 'Sửa hóa đơn',
                  value: 3,
                  actionType: 'edit',
                  onSelect: () => {
                    navigate('/sales/retail/edit/1');
                  },
                },
                {
                  label: 'Xem ảnh',
                  value: 3,
                  actionType: 'back',
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
        },
      },
    ];
  }, [handleOpenDialog, dialog, handleOpenEditNoteDialog, navigate]);

  return { columns };
};

export default useTableColumns;
