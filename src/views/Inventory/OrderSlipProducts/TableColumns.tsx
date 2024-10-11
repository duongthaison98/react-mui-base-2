import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import type { HeadCell, ProColumn } from '@/components/ProTable/types';
import { getColumnHelper } from '@/components/ProTable/utils/getColumnHelper';
import useDialog from '@/hooks/useDialog';
import { useMemo } from 'react';

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
  actions: 'Hành động',
};

interface Props {
  pageNumber: number;
  pageSize: number;
  handleEditPrice: (id: number, note: string) => void;
}

const useTableColumns = (props: Props) => {
  const { pageNumber, pageSize, handleEditPrice } = props;
  const dialog = useDialog();

  const columns: ProColumn<any> = useMemo(() => {
    return [
      columnHelper.accessor('imageUrl', {
        id: 'imageUrl',
        size: 60,
        enableSorting: false,
        header: () => 'ID',
        cell: (context) => (
          <Typography fontWeight='bold' color='primary'>
            15
          </Typography>
        ),
        meta: {
          title: HEAD_CELLS.imageUrl,
        },
      }),
      columnHelper.accessor('code', {
        id: 'code',
        size: 90,
        header: () => 'Tên sản phẩm',
        cell: (context) => 'CÁP LOA TRONG - Loa đơn 12',
        meta: {
          title: HEAD_CELLS.code,
        },
      }),
      columnHelper.accessor('name', {
        id: 'name',
        size: 80,
        header: () => 'Tên NCC',
        cell: (context) => 'NCC 47',
        meta: {
          title: HEAD_CELLS.code,
        },
      }),
      columnHelper.accessor('name', {
        id: 'name',
        size: 100,
        header: () => 'Số lô',
        cell: (context) => <Typography sx={{ color: 'rgb(0, 0, 238)' }}>768886</Typography>,
        meta: {
          title: HEAD_CELLS.name,
        },
      }),

      columnHelper.accessor('costPrice', {
        id: 'costPrice',
        size: 90,
        enableSorting: false,
        header: () => 'Giá tiền tệ',
        cell: (context) => '3.560',
        meta: {
          title: HEAD_CELLS.costPrice,
        },
      }),
      columnHelper.accessor('price', {
        id: 'price',
        size: 80,
        header: () => 'Giá yêu cầu',
        cell: (context) => '5.7',
        meta: {
          title: HEAD_CELLS.price,
        },
      }),

      columnHelper.accessor('price', {
        id: 'price',
        size: 100,
        header: () => 'Giá đề xuất',
        cell: (context) => {
          const { note, id } = context.row.original;
          return (
            <Stack alignItems='center'>
              <IconButton onClick={() => handleEditPrice(id, note)}>
                <EditIcon color='primary' />
              </IconButton>
              <Typography color='primary'>39.330</Typography>
            </Stack>
          );
        },
        meta: {
          title: HEAD_CELLS.price,
        },
      }),

      columnHelper.accessor('price', {
        id: 'price',
        size: 100,
        header: () => 'TT tệ',
        cell: (context) => '39.330',
        meta: {
          title: HEAD_CELLS.price,
        },
      }),

      columnHelper.accessor('inventory', {
        id: 'inventory',
        size: 100,
        enableSorting: false,
        header: () => 'Tổng tiền',
        cell: (context) => '140.014.800',
        meta: {
          title: HEAD_CELLS.inventory,
        },
      }),
      columnHelper.accessor('inventory', {
        id: 'inventory',
        size: 150,
        enableSorting: false,
        header: () => 'SL',
        cell: (context) => '5000/6900',
        meta: {
          title: HEAD_CELLS.inventory,
        },
      }),
      columnHelper.accessor('inventory', {
        id: 'inventory',
        size: 100,
        enableSorting: false,
        header: () => 'Mô tả',
        cell: (context) => '',
        meta: {
          title: HEAD_CELLS.inventory,
        },
      }),
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, pageSize, dialog]);

  return { columns };
};

export default useTableColumns;
