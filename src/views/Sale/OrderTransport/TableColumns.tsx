import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import ActionIconButton from '@/components/ProButton/ActionIconButton';
import ProMenu from '@/components/ProMenu';
import type { HeadCell, ProColumn } from '@/components/ProTable/types';
import { getColumnHelper } from '@/components/ProTable/utils/getColumnHelper';
import { useMemo } from 'react';
import { IRetail } from '@/types/retail';
const columnHelper = getColumnHelper<IRetail>();

const HEAD_CELLS: HeadCell<IRetail> = {
  creator: 'Người tạo',
  idBill: 'ID',
  store: 'Cửa hàng',
  customer: 'Khách hàng',
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
}

const useTableColumns = (props: Props) => {
  const columns: ProColumn<IRetail> = useMemo(() => {
    return [
      columnHelper.accessor('creator', {
        id: 'creator',
        size: 100,
        header: () => 'ID',
        cell: (context) => <Typography color='#007bff'>12481</Typography>,
        meta: {
          title: HEAD_CELLS.creator,
        },
      }),
      columnHelper.accessor('idBill', {
        id: 'idBill',
        size: 100,
        header: () => 'Cửa hàng',
        cell: (context) => 'HN-1',
        meta: {
          title: HEAD_CELLS.idBill,
        },
      }),
      columnHelper.accessor('store', {
        id: 'store',
        size: 150,
        header: () => 'Tên khách hàng',
        cell: (context) => (
          <Box>
            <Typography color='#007bff'>12481</Typography>
            <Typography color='primary'>cod</Typography>
          </Box>
        ),
        meta: {
          title: HEAD_CELLS.store,
        },
      }),
      columnHelper.accessor('customer', {
        id: 'customer',
        size: 100,
        enableSorting: false,
        header: () => 'Tên nhà vận chuyển',
        cell: (context) => '',
        meta: {
          title: HEAD_CELLS.customer,
        },
      }),
      columnHelper.accessor('product', {
        id: 'product',
        size: 100,
        enableSorting: false,
        header: () => 'Điện thoại',
        cell: (context) => '',
        meta: {
          title: HEAD_CELLS.product,
        },
      }),
      columnHelper.accessor('price', {
        id: 'price',
        size: 100,
        header: () => 'Chuyển kho',
        cell: (context) => '',
        meta: {
          title: HEAD_CELLS.price,
        },
      }),
      columnHelper.accessor('amount', {
        id: 'amount',
        size: 100,
        enableSorting: false,
        header: () => 'Nhân viên giao hàng',
        cell: (context) => 'Nguyễn Văn Đức',
        meta: {
          title: HEAD_CELLS.amount,
        },
      }),
      columnHelper.accessor('unit', {
        id: 'unit',
        size: 130,
        header: () => 'Trạng thái',
        cell: (context) => 'Chờ giao hàng',
        meta: {
          title: HEAD_CELLS.unit,
        },
      }),
      columnHelper.accessor('discount', {
        id: 'discount',
        size: 150,
        enableSorting: false,
        header: () => 'Ngày tạo',
        cell: (context) => '10/02/2023 18:09',
        meta: {
          title: HEAD_CELLS.discount,
        },
      }),
      columnHelper.accessor('vat', {
        id: 'vat',
        size: 150,
        enableSorting: false,
        header: () => 'Giao hàng lúc',
        cell: (context) => '10/02/2023 18:09',
        meta: {
          title: HEAD_CELLS.vat,
        },
      }),
      columnHelper.accessor('totalPrice', {
        id: 'totalPrice',
        size: 100,
        enableSorting: false,
        header: () => 'Ghi chú',
        cell: (context) => '',
        meta: {
          title: HEAD_CELLS.totalPrice,
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
              position='left'
              items={[
                {
                  label: 'Cập nhật',
                  value: 1,
                  actionType: 'edit',
                },
                {
                  label: 'Cập nhật nhân viên giao hàng',
                  value: 2,
                  actionType: 'edit',
                },
                {
                  label: 'Cập nhật trạng thái',
                  value: 3,
                  actionType: 'edit',
                },
                {
                  label: 'Xóa',
                  value: 3,
                  actionType: 'delete',
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
  }, []);

  return { columns };
};

export default useTableColumns;
