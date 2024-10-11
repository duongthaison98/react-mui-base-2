import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Box, Grid, Stack, TextField, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import ActionIconButton from '@/components/ProButton/ActionIconButton';
import ProFormSelect from '@/components/ProForm/Label/ProFormSelect';
import ProMenu from '@/components/ProMenu';
import Index from '@/components/ProTable/components/Index';
import type { HeadCell, ProColumn } from '@/components/ProTable/types';
import { getColumnHelper } from '@/components/ProTable/utils/getColumnHelper';
import { useMemo, useState } from 'react';
import { IImportExport } from './utils/types';

const columnHelper = getColumnHelper<IImportExport>();

const HEAD_CELLS: HeadCell<IImportExport> = {
  index: 'ID',
  inventory: 'Tồn',
  unit: 'ĐVT',
  product: 'Sản Phẩm',
  quantity: 'SL',
  IMEI: 'IMEI',
  price: 'Giá',
  thanhTien: 'Thành tiền',
  chietKhau: 'Chiết khấu',
  khoiLuong: 'Khối lượng',
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
      columnHelper.accessor('quantity', {
        id: 'quantity',
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
          title: HEAD_CELLS.quantity,
        },
      }),
      columnHelper.accessor('IMEI', {
        id: 'IMEI',
        size: 100,
        enableSorting: false,
        header: () => HEAD_CELLS.IMEI,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.IMEI,
        },
      }),
      columnHelper.accessor('price', {
        id: 'price',
        size: 150,
        header: () => (
          <>
            <TextField placeholder='Giá' size='small' />
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
      columnHelper.accessor('thanhTien', {
        id: 'thanhTien',
        size: 80,
        enableSorting: false,
        header: () => HEAD_CELLS.thanhTien,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.thanhTien,
        },
      }),
      columnHelper.accessor('chietKhau', {
        id: 'chietKhau',
        size: 250,
        enableSorting: false,
        header: () => (
          <Tooltip title={'Chiết khấu'}>
            <Grid container>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <ProFormSelect
                  name='unit'
                  options={[
                    { value: 1, label: '%' },
                    { value: 2, label: 'VND' },
                  ]}
                  placeholder=''
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6}>
                <TextField size='small' />
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2}>
                <ActionIconButton actionType='arrowDown' />
              </Grid>
            </Grid>
          </Tooltip>
        ),
        cell: (context) => (
          <Box>
            <TextField size='small' />
          </Box>
        ),
        meta: {
          title: HEAD_CELLS.chietKhau,
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
