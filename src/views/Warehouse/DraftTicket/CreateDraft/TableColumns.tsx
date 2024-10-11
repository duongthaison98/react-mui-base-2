import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Box, Stack, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import ActionIconButton from '@/components/ProButton/ActionIconButton';
import ProMenu from '@/components/ProMenu';
import Index from '@/components/ProTable/components/Index';
import type { HeadCell, ProColumn } from '@/components/ProTable/types';
import { getColumnHelper } from '@/components/ProTable/utils/getColumnHelper';
import { useMemo, useState } from 'react';
import { IImportExport } from './utils/types';

const columnHelper = getColumnHelper<IImportExport>();

const HEAD_CELLS: HeadCell<IImportExport> = {
  index: 'ID',
  inventory: 'Có thể chuyển',
  unit: 'Tên SP',
  product: 'Mã  SP',
  quantity: 'SL',
  IMEI: 'Lỗi (0)  ',
  price: 'Giá',
  thanhTien: 'Thành tiền',
  chietKhau: 'Chiết khấu',
  khoiLuong: 'Số lượng',
  actions: 'Hành động',
};

interface Props {
  pageNumber: number;
  pageSize: number;
}

const useTableColumns = (props: Props) => {
  const { pageNumber, pageSize } = props;
  const [checkNote, setCheckNote] = useState<number[]>([]);
  const columns: ProColumn<IImportExport> = useMemo(() => {
    return [
      Index<IImportExport>(pageNumber, pageSize),

      columnHelper.accessor('product', {
        id: 'product',
        size: 150,
        enableSorting: false,
        header: () => HEAD_CELLS.product,
        cell: (context) => {
          const rowIndex = context.row.index;
          return (
            <Stack direction={'column'} spacing={2}>
              <Typography variant='body2'>{context.getValue().code}</Typography>
              <Typography variant='body2'>{context.getValue().code2}</Typography>
              <Typography variant='body2'>{context.getValue().name}</Typography>
              {checkNote.includes(rowIndex) ? (
                <TextField placeholder='Ghi chú' size='small' />
              ) : null}
            </Stack>
          );
        },
        meta: {
          title: HEAD_CELLS.product,
        },
      }),
      columnHelper.accessor('unit', {
        id: 'unit',
        size: 50,
        header: () => HEAD_CELLS.unit,
        enableSorting: false,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.unit,
        },
      }),
      columnHelper.accessor('inventory', {
        id: 'inventory',
        size: 50,
        enableSorting: false,
        header: () => HEAD_CELLS.inventory,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.inventory,
        },
      }),
      columnHelper.accessor('price', {
        id: 'price',
        size: 150,
        header: () => (
          <>
            <TextField placeholder='SL' size='small' />
            <ActionIconButton actionType='arrowDown' />
          </>
        ),
        enableSorting: false,
        cell: (context) => (
          <Box>
            <TextField size='small' />
          </Box>
        ),
        meta: {
          title: HEAD_CELLS.price,
        },
      }),

      {
        id: 'actions',
        size: 65,
        enableSorting: false,
        header: () => <SettingsOutlinedIcon sx={{ color: 'text.secondary' }} />,
        cell: (context) => {
          const rowIndex = context.row.index;
          return (
            <ProMenu
              position='left'
              items={[
                {
                  label: 'Hiện ô nhập ghi chú',
                  value: 1,
                  actionType: 'description',
                  onSelect: () => {
                    setCheckNote((prev) => [...prev, rowIndex]);
                  },
                },
                {
                  label: 'Xóa sản phẩm',
                  value: 2,
                  actionType: 'delete',
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
  }, [pageNumber, pageSize, checkNote]);

  return { columns };
};

export default useTableColumns;
