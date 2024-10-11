import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import HouseIcon from '@mui/icons-material/House';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Link } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ActionIconButton from '@/components/ProButton/ActionIconButton';
import ProMenu from '@/components/ProMenu';
import Selection from '@/components/ProTable/components/Selection';
import type { HeadCell, ProColumn } from '@/components/ProTable/types';
import { getColumnHelper } from '@/components/ProTable/utils/getColumnHelper';
import useDialog from '@/hooks/useDialog';
import { Fragment, useMemo } from 'react';

const columnHelper = getColumnHelper<any>();

const HEAD_CELLS: HeadCell<any> = {
  index: 'ID',
  imageUrl: 'Ảnh',
  code: 'Mã sản phẩm',
  name: 'Tên sản phẩm',
  markCode: 'Mã vạch',
  importPrice: 'Giá nhập',
  costPrice: 'Giá vốn',
  price: 'Giá bán',
  priceVAT: 'Giá bán + VAT',
  wholesalePrice: 'Giá sỉ',
  inventory: 'Tồn',
  totalInventory: 'Tổng tồn',
  spaPrice: 'Giá spa',
  actions: 'Hành động',
};

interface Props {
  pageNumber: number;
  pageSize: number;
}

const useTableColumns = (props: Props) => {
  const { pageNumber, pageSize } = props;
  const dialog = useDialog();

  const columns: ProColumn<any> = useMemo(() => {
    return [
      Selection<any>(),
      columnHelper.accessor('imageUrl', {
        id: 'imageUrl',
        size: 60,
        enableSorting: false,
        header: () => HEAD_CELLS.imageUrl,
        cell: (context) => <AddCircleIcon color='success' />,
        meta: {
          title: HEAD_CELLS.imageUrl,
        },
      }),
      columnHelper.accessor('code', {
        id: 'code',
        size: 100,
        header: () => 'Mã vạch',
        cell: (context) => (
          <Typography variant='subtitle2' sx={{ color: '#007bff' }}>
            {context.getValue()}
          </Typography>
        ),
        meta: {
          title: HEAD_CELLS.code,
        },
      }),
      columnHelper.accessor('name', {
        id: 'name',
        size: 250,
        header: () => 'Mã',
        cell: (context) => (
          <Typography variant='subtitle2' sx={{ color: '#007bff' }}>
            {context.getValue()}
          </Typography>
        ),
        meta: {
          title: HEAD_CELLS.code,
        },
      }),
      columnHelper.accessor('name', {
        id: 'name',
        size: 250,
        header: () => 'Tên',
        cell: (context) => {
          const { id } = context.row.original;
          return (
            <Link
              href={`/products/detail?id=${id}`}
              underline='hover'
              sx={{ color: '#007bff', fontWeight: '500' }}
            >
              {context.getValue()}
            </Link>
          );
        },
        meta: {
          title: HEAD_CELLS.name,
        },
      }),

      columnHelper.accessor('costPrice', {
        id: 'costPrice',
        size: 100,
        enableSorting: false,
        header: () => HEAD_CELLS.costPrice,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.costPrice,
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
      columnHelper.accessor('spaPrice', {
        id: 'spaPrice',
        size: 100,
        header: () => HEAD_CELLS.spaPrice,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.spaPrice,
        },
      }),

      columnHelper.accessor('inventory', {
        id: 'inventory',
        size: 100,
        enableSorting: false,
        header: () => HEAD_CELLS.inventory,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.inventory,
        },
      }),
      columnHelper.accessor('totalInventory', {
        id: 'totalInventory',
        size: 100,
        enableSorting: false,
        header: () => HEAD_CELLS.totalInventory,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.totalInventory,
        },
      }),

      columnHelper.accessor('shipping2', {
        id: 'shipping2',
        size: 100,
        enableSorting: false,
        header: () => (
          <Tooltip title='Đang giao hàng'>
            <LocalShippingIcon color='primary' />
          </Tooltip>
        ),
        cell: (context) => Math.round(Math.random() * 500),
        meta: {
          title: HEAD_CELLS.totalInventory,
        },
      }),
      columnHelper.accessor('shipping3', {
        id: 'shipping3',
        size: 100,
        enableSorting: false,
        header: () => (
          <Tooltip title='Tồn trong kho'>
            <HouseIcon />
          </Tooltip>
        ),
        cell: (context) => Math.round(Math.random() * 500),
        meta: {
          title: HEAD_CELLS.totalInventory,
        },
      }),
      columnHelper.accessor('shipping1', {
        id: 'shipping1',
        size: 100,
        enableSorting: false,
        header: () => (
          <Tooltip title='Tạm giữ'>
            <InventoryIcon color='warning' />
          </Tooltip>
        ),
        cell: (context) => Math.round(Math.random() * 500),
        meta: {
          title: HEAD_CELLS.totalInventory,
        },
      }),
      columnHelper.accessor('shipping4', {
        id: 'shipping4',
        size: 100,
        enableSorting: false,
        header: () => (
          <Tooltip title='Có thể bán'>
            <CheckBoxIcon color='success' />
          </Tooltip>
        ),
        cell: (context) => Math.round(Math.random() * 500),
        meta: {
          title: HEAD_CELLS.totalInventory,
        },
      }),
      columnHelper.accessor('shipping4', {
        id: 'shipping4',
        size: 100,
        enableSorting: false,
        header: () => 'Bán',
        cell: (context) => '*',
        meta: {
          title: HEAD_CELLS.totalInventory,
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
                  label: 'Sửa',
                  value: 1,
                  actionType: 'edit',
                },
                {
                  label: 'Sửa giá',
                  value: 2,
                  actionType: 'edit',
                },
                {
                  label: 'Tạo giá vốn mới',
                  value: 3,
                  actionType: 'edit',
                },
                {
                  label: 'Chuyển mã',
                  value: 4,
                  actionType: 'edit',
                },
                {
                  label: 'Sửa giá vốn nhanh',
                  value: 5,
                  actionType: 'edit',
                },
                {
                  label: 'Xóa',
                  value: 6,
                  actionType: 'delete',
                  color: 'error.main',
                  onSelect: handleDeleteRow,
                },
              ]}
            >
              <ActionIconButton actionType='action' />
            </ProMenu>
          );
        },
        meta: {
          title: HEAD_CELLS.actions,
          align: 'center',
        },
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, pageSize, dialog]);

  return { columns };
};

export default useTableColumns;
