import { Typography } from '@mui/material';
import { HeadCell, ProColumn } from 'components/ProTable/types';
import { getColumnHelper } from 'components/ProTable/utils/getColumnHelper';
import filter from 'lodash.filter';
import { useMemo } from 'react';
import { IPurchaseHistoryType } from './utils/type';

const columnHelper = getColumnHelper<IPurchaseHistoryType>();

interface Props {
  pageNumber: number;
  pageSize: number;
}

const HEAD_CELLS: HeadCell<IPurchaseHistoryType> = {
  id: 'ID',
  date: 'Ngày',
  type: 'Loại',
  customer: 'Khách hàng',
  producs: 'Sản phẩm',
  price: 'Giá',
  quantity: 'SL',
  discount: 'Chiết khấu',
  money: 'Tiền TĐ',
  totalMoney: 'Tổng tiền',
  note: 'Ghi chú',
};

const useTableColumns = (props: Props) => {
  const columns: ProColumn<IPurchaseHistoryType> = useMemo(() => {
    return [
      columnHelper.accessor('id', {
        id: 'ID',
        size: 120,
        header: () => HEAD_CELLS.id,
        cell: (context) => (
          <Typography variant="subtitle2" sx={{ color: '#000000' }}>
            {context.getValue()}
          </Typography>
        ),
        footer: (context) => <Typography variant="subtitle2">Tổng</Typography>,
        meta: {
          title: HEAD_CELLS.id,
          rowSpan: (context, rows) => {
            const result: any = filter(
              rows.map((row) => row.original),
              { id: context.getValue() }
            );

            if (context.row.original.products === result[0]?.products) {
              return result.length;
            }

            return null;
          },
          colSpan: () => 4,
        },
      }),
      columnHelper.accessor('type', {
        id: 'type',
        size: 120,
        enableSorting: false,
        header: () => HEAD_CELLS.type,
        cell: (context) => {
          if (context.getValue() == 'Trả hàng [L] DP-142482-1') {
            return <Typography color="error">{context.getValue()}</Typography>;
          } else {
            return <Typography>{context.getValue()}</Typography>;
          }
        },
        meta: {
          title: HEAD_CELLS.type,
          rowSpan: (context, rows) => {
            const result: any = filter(
              rows.map((row) => row.original),
              { type: context.getValue() }
            );

            if (context.row.original.products === result[0]?.products) {
              return result.length;
            }

            return null;
          },
          colSpan: () => null,
        },
      }),
      columnHelper.accessor('customer', {
        id: 'customer',
        size: 250,
        enableSorting: false,
        header: () => HEAD_CELLS.customer,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.customer,
          rowSpan: (context, rows) => {
            const result: any = filter(
              rows.map((row) => row.original),
              { customer: context.getValue() }
            );

            if (context.row.original.products === result[0]?.products) {
              return result.length;
            }

            return null;
          },
          colSpan: () => null,
        },
      }),
      columnHelper.accessor('products', {
        id: 'products',
        size: 280,
        enableSorting: false,
        header: () => HEAD_CELLS.products,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.products,
          colSpan: () => null,
        },
      }),
      columnHelper.accessor('price', {
        id: 'price',
        size: 150,
        enableSorting: false,
        header: () => HEAD_CELLS.price,
        cell: (context) =>
          context.getValue()?.toLocaleString('it-IT', {
            style: 'currency',
            currency: 'VND',
          }),

        meta: {
          title: HEAD_CELLS.price,
        },
      }),
      columnHelper.accessor('quantity', {
        id: 'quantity',
        size: 120,
        enableSorting: false,
        header: () => HEAD_CELLS.quantity,
        cell: (context) => context.getValue(),
        footer: (context) => <Typography variant="subtitle2">4</Typography>,

        meta: {
          title: HEAD_CELLS.quantity,
        },
      }),
      columnHelper.accessor('discount', {
        id: 'discount',
        size: 120,
        enableSorting: false,
        header: () => HEAD_CELLS.discount,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.discount,
          rowSpan: (context, rows) => {
            const result: any = filter(
              rows.map((row) => row.original),
              { discount: context.getValue() }
            );

            if (context.row.original.products === result[0]?.products) {
              return result.length;
            }

            return null;
          },
          // colSpan: () => null,
        },
      }),
      columnHelper.accessor('money', {
        id: 'money',
        size: 150,
        enableSorting: false,
        header: () => HEAD_CELLS.money,
        cell: (context) =>
          context.getValue()?.toLocaleString('it-IT', {
            style: 'currency',
            currency: 'VND',
          }),
        meta: {
          title: HEAD_CELLS.money,
          rowSpan: (context, rows) => {
            const result: any = filter(
              rows.map((row) => row.original),
              { money: context.getValue() }
            );

            if (context.row.original.products === result[0]?.products) {
              return result.length;
            }

            return null;
          },
          // colSpan: () => null,
        },
      }),
      columnHelper.accessor('totalMoney', {
        id: 'totalMoney',
        size: 150,
        enableSorting: false,
        header: () => HEAD_CELLS.totalMoney,
        cell: (context) =>
          context.getValue()?.toLocaleString('it-IT', {
            style: 'currency',
            currency: 'VND',
          }),
        footer: (context) => {
          return Math.random();
        },
        meta: {
          title: HEAD_CELLS.totalMoney,
          rowSpan: (context, rows) => {
            const result: any = filter(
              rows.map((row) => row.original),
              { totalMoney: context.getValue() }
            );

            if (context.row.original.products === result[0]?.products) {
              return result.length;
            }

            return null;
          },
          // colSpan: () => null,
        },
      }),
    ];
  }, []);
  return { columns };
};

export default useTableColumns;
