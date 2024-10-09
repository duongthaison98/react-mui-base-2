import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Box } from '@mui/material';
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
  productDadCode: 'Mã SP cha',
  productDadName: 'Tên SP cha',
  productCode: ' Mã sản phẩm',
  product: 'Sản phẩm',
  quantity: 'SL',
  dvt: 'ĐVT',
  inventory: 'Tồn',
  price: 'Giá',
  costPrice: 'Giá vốn',
  money: 'Tiền',
  totalMoney: 'Tổng tiền',
  icon: 'Icon',
  creator: 'Người tạo',
  note: 'Ghi chú',
  actions: 'Hành động',
};

interface Props {
  pageNumber: number;
  pageSize: number;
}

const useTableColumns = (props: Props) => {
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
      columnHelper.accessor('productDadCode', {
        id: 'productDadCode',
        size: 100,
        enableSorting: false,
        header: () => HEAD_CELLS.productDadCode,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.productDadCode,
        },
      }),
      columnHelper.accessor('productDadName', {
        id: 'productDadName',
        size: 100,
        enableSorting: false,
        header: () => HEAD_CELLS.productDadName,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.productDadName,
        },
      }),
      columnHelper.accessor('productCode', {
        id: 'productCode',
        size: 50,
        enableSorting: false,
        header: () => HEAD_CELLS.productCode,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.productCode,
        },
      }),
      columnHelper.accessor('product', {
        id: 'product',
        size: 100,
        enableSorting: false,
        header: () => HEAD_CELLS.product,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.product,
        },
      }),
      columnHelper.accessor('dvt', {
        id: 'dvt',
        size: 50,
        enableSorting: false,
        header: () => HEAD_CELLS.dvt,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.dvt,
        },
      }),
      columnHelper.accessor('quantity', {
        id: 'quantity',
        size: 50,
        enableSorting: false,
        header: () => HEAD_CELLS.quantity,
        cell: (context) => (
          <Typography variant="body1" sx={{ color: 'red' }}>
            {context.getValue()}
          </Typography>
        ),
        meta: {
          title: HEAD_CELLS.quantity,
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
        size: 100,
        enableSorting: false,
        header: () => HEAD_CELLS.price,
        cell: (context) => Numeral.price(context.getValue()),
        meta: {
          title: HEAD_CELLS.price,
        },
      }),
      columnHelper.accessor('costPrice', {
        id: 'costPrice',
        size: 100,
        enableSorting: false,
        header: () => HEAD_CELLS.costPrice,
        cell: (context) => Numeral.price(context.getValue()),
        meta: {
          title: HEAD_CELLS.costPrice,
        },
      }),
      columnHelper.accessor('money', {
        id: 'money',
        size: 100,
        enableSorting: false,
        header: () => HEAD_CELLS.money,
        cell: (context) => Numeral.price(context.getValue()),
        meta: {
          title: HEAD_CELLS.money,
        },
      }),
      columnHelper.accessor('totalMoney', {
        id: 'totalMoney',
        size: 100,
        header: () => HEAD_CELLS.totalMoney,
        cell: (context) => (
          <Typography variant="body1" sx={{ color: 'red' }}>
            {Numeral.price(context.getValue())}
          </Typography>
        ),
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
      columnHelper.accessor('note', {
        id: 'note',
        size: 100,
        header: () => HEAD_CELLS.note,
        cell: (context) => context.getValue(),
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
                  label: 'Sửa',
                  value: 1,
                  actionType: 'edit',
                  onSelect: () => navigate('/inventory/imex/edit'),
                },
                {
                  label: 'Xóa',
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
  }, [navigate]);

  return { columns };
};

export default useTableColumns;
