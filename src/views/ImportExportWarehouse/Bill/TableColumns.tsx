import EditIcon from '@mui/icons-material/Edit';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Box, IconButton, Link } from '@mui/material';
import Typography from '@mui/material/Typography';
import ActionIconButton from 'components/ProButton/ActionIconButton';
import ProMenu from 'components/ProMenu';
import Selection from 'components/ProTable/components/Selection';
import type { HeadCell, ProColumn } from 'components/ProTable/types';
import { getColumnHelper } from 'components/ProTable/utils/getColumnHelper';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Numeral from 'utils/Numeral';
import { IImportExport } from './utils/types';

const columnHelper = getColumnHelper<IImportExport>();

const HEAD_CELLS: HeadCell<IImportExport> = {
  index: 'ID',
  idAndDay: 'ID | Ngày',
  warehouse: 'Kho hàng',
  product: 'SP',
  quantity: 'SL',
  totalMoney: 'Tổng tiền',
  icon: 'Chiết khấu',
  creator: 'Người tạo',
  customer: 'Khách hàng',
  file: 'File đính kèm',
  note: 'Ghi chú',
  actions: 'Hành động',
};

interface Props {
  pageNumber: number;
  pageSize: number;
  handleEditNote: (id: number, note: string) => void;
}

const useTableColumns = (props: Props) => {
  const { handleEditNote } = props;
  const navigate = useNavigate();
  const columns: ProColumn<IImportExport> = useMemo(() => {
    return [
      Selection<IImportExport>(),

      columnHelper.accessor('idAndDay', {
        id: 'idAndDay',
        size: 50,
        header: () => HEAD_CELLS.idAndDay,
        cell: (context) => (
          <Box>
            <Typography variant="subtitle2" sx={{ color: '#007bff' }}>
              {context.getValue().id}
            </Typography>
            <Link href="#" color="orange">
              {`(Log sửa)`}
            </Link>
            <Typography variant="body2">{context.getValue().day}</Typography>
          </Box>
        ),
        meta: {
          title: HEAD_CELLS.idAndDay,
        },
      }),
      columnHelper.accessor('warehouse', {
        id: 'warehouse',
        size: 200,
        header: () => HEAD_CELLS.warehouse,
        cell: (context) => (
          <Box>
            <Typography variant="body1">{context.getValue().name}</Typography>
            <Typography variant="body1" sx={{ color: 'red' }}>
              {context.getValue().type}
            </Typography>
          </Box>
        ),
        meta: {
          title: HEAD_CELLS.warehouse,
        },
      }),
      columnHelper.accessor('product', {
        id: 'product',
        size: 50,
        enableSorting: false,
        header: () => HEAD_CELLS.product,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.product,
        },
      }),
      columnHelper.accessor('quantity', {
        id: 'quantity',
        size: 50,
        enableSorting: false,
        header: () => HEAD_CELLS.quantity,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.quantity,
        },
      }),
      columnHelper.accessor('totalMoney', {
        id: 'totalMoney',
        size: 80,
        header: () => HEAD_CELLS.totalMoney,
        cell: (context) => Numeral.price(context.getValue()),
        meta: {
          title: HEAD_CELLS.totalMoney,
        },
      }),
      columnHelper.accessor('icon', {
        id: 'icon',
        size: 50,
        header: () => HEAD_CELLS.icon,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.icon,
        },
      }),
      columnHelper.accessor('creator', {
        id: 'creator',
        size: 100,
        header: () => HEAD_CELLS.creator,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.creator,
        },
      }),
      columnHelper.accessor('customer', {
        id: 'customer',
        size: 150,
        header: () => HEAD_CELLS.customer,
        cell: (context) => (
          <Box>
            <Typography variant="body1">{context.getValue().name}</Typography>
            <Typography variant="body1">{context.getValue().mobile}</Typography>
          </Box>
        ),
        meta: {
          title: HEAD_CELLS.customer,
        },
      }),
      columnHelper.accessor('file', {
        id: 'file',
        size: 100,
        header: () => HEAD_CELLS.file,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.file,
        },
      }),
      columnHelper.accessor('note', {
        id: 'note',
        size: 100,
        enableSorting: false,
        header: () => HEAD_CELLS.note,
        cell: (context) => {
          const { note, id } = context.row.original;
          return (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {note}
              <IconButton onClick={() => handleEditNote(id, note)}>
                <EditIcon sx={{ color: 'text.secondary', ml: 1 }} />
              </IconButton>
            </Box>
          );
        },
        meta: {
          title: HEAD_CELLS.note,
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
                  label: 'In phiếu',
                  value: 1,
                  actionType: 'print',
                },
                {
                  label: 'Sửa phiếu',
                  value: 2,
                  actionType: 'edit',
                  onSelect: () => navigate('/sales/retail/edit/1'),
                },
                {
                  label: 'Sửa phiếu XNK khác',
                  value: 2,
                  actionType: 'edit',
                  onSelect: () => navigate('/inventory/bill/edit'),
                },
                {
                  label: 'In mã vạch sản phẩm trong phiếu',
                  value: 3,
                  actionType: 'add',
                },
                {
                  label: 'In IMEI sản phẩm phiếu XNK',
                  value: 4,
                  actionType: 'add',
                },
                {
                  label: 'Xuất Excel in mã vạch bằng Bartender',
                  value: 5,
                  actionType: 'arrowRight',
                },
                {
                  label: 'Xóa phiếu',
                  value: 6,
                  actionType: 'delete',
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
  }, [navigate, handleEditNote]);

  return { columns };
};

export default useTableColumns;
