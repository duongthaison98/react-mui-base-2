import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Typography from '@mui/material/Typography';
import ActionIconButton from 'components/ProButton/ActionIconButton';
import type { HeadCell, ProColumn } from 'components/ProTable/types';
import { getColumnHelper } from 'components/ProTable/utils/getColumnHelper';
import useDialog from 'hooks/useDialog';
import { useMemo } from 'react';
const columnHelper = getColumnHelper<any>();

const HEAD_CELLS: HeadCell<any> = {
  index: 'ID',
  imageUrl: 'Ảnh',
  code: 'ID Phiếu XNK',
  name: 'ID Sản Phẩm XNK',
  markCode: 'Người thao tác',
  importPrice: 'Giá nhập',
  costPrice: 'Giá',
  price: 'Giá bán',
  priceVAT: 'Thời Gian Tạo',
  wholesalePrice: 'Giá sỉ',
  inventory: 'Sản phẩm',
  totalInventory: 'Số lượng',
  actions: 'Hành động',
};

interface Props {
  pageNumber: number;
  pageSize: number;
  open: () => void;
}

const useTableColumns = (props: Props) => {
  const { pageNumber, pageSize, open: openDialog } = props;
  const dialog = useDialog();

  const columns: ProColumn<any> = useMemo(() => {
    return [
      columnHelper.accessor('code', {
        id: 'code',
        size: 160,
        header: () => 'ID Phiếu XNK',
        cell: (context) => (
          <Typography variant="subtitle2">239636506</Typography>
        ),
        meta: {
          title: HEAD_CELLS.code,
        },
      }),
      columnHelper.accessor('name', {
        id: 'name',
        size: 160,
        header: () => 'ID sản phẩm XNK',
        cell: (context) => (
          <Typography variant="subtitle2">613787323</Typography>
        ),
        meta: {
          title: HEAD_CELLS.code,
        },
      }),
      columnHelper.accessor('name1', {
        id: 'name1',
        size: 120,
        header: () => 'Kiểu log',
        cell: (context) => <Typography variant="subtitle2">Sửa XNK</Typography>,
        meta: {
          title: HEAD_CELLS.name,
        },
      }),

      columnHelper.accessor('name2', {
        id: 'name2',
        size: 120,
        header: () => 'Loại XNK',
        cell: (context) => <Typography variant="subtitle2">Xuất</Typography>,
        meta: {
          title: HEAD_CELLS.name,
        },
      }),
      columnHelper.accessor('name3', {
        id: 'name3',
        size: 160,
        header: () => 'Kiểu XNK',
        cell: (context) => (
          <Typography variant="subtitle2">[L] Bán lẻ</Typography>
        ),
        meta: {
          title: HEAD_CELLS.name,
        },
      }),

      columnHelper.accessor('inventory', {
        id: 'inventory',
        size: 250,
        enableSorting: false,
        header: () => HEAD_CELLS.inventory,
        cell: (context) => (
          <Typography variant="subtitle2">{context.getValue()}</Typography>
        ),
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

      columnHelper.accessor('costPrice', {
        id: 'costPrice',
        size: 100,
        enableSorting: false,
        header: () => HEAD_CELLS.costPrice,
        cell: (context) => Math.round(Math.random() * 500),
        meta: {
          title: HEAD_CELLS.costPrice,
        },
      }),
      columnHelper.accessor('markCode', {
        id: 'markCode',
        size: 250,
        enableSorting: false,
        header: () => HEAD_CELLS.markCode,
        cell: (context) => (
          <Typography variant="subtitle2">{context.getValue()}</Typography>
        ),
        meta: {
          title: HEAD_CELLS.markCode,
        },
      }),
      columnHelper.accessor('priceVAT', {
        id: 'priceVAT',
        size: 250,
        enableSorting: false,
        header: () => HEAD_CELLS.priceVAT,
        cell: (context) => (
          <Typography variant="subtitle2">{context.getValue()}</Typography>
        ),
        meta: {
          title: HEAD_CELLS.priceVAT,
        },
      }),

      {
        id: 'actions',
        size: 65,
        enableSorting: false,
        header: () => <SettingsOutlinedIcon />,
        cell: (context) => (
          <Typography>
            {' '}
            <ActionIconButton onClick={openDialog} actionType="view" />
          </Typography>
        ),
      },
    ];

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, pageSize, dialog]);

  return { columns };
};

export default useTableColumns;
