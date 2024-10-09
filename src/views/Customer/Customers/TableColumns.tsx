import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import ActionIconButton from 'components/ProButton/ActionIconButton';
import ProMenu from 'components/ProMenu';
import Selection from 'components/ProTable/components/Selection';
import { HeadCell, ProColumn } from 'components/ProTable/types';
import { getColumnHelper } from 'components/ProTable/utils/getColumnHelper';
import { useMemo } from 'react';
import { Customer } from 'types/customer';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { Link } from 'react-router-dom';

const columnHelper = getColumnHelper<Customer>();

interface Props {
  pageNumber: number;
  pageSize: number;
}

const HEAD_CELLS: HeadCell<Customer> = {
  id: 'ID',
  index: '',
  customer: 'Khách hàng',
  address: 'Địa chỉ',
  store: 'CHPT',
  typeCustomer: 'Loại',
  phoneNumber: 'Điện thoại',
  email: 'Email',
  birthDay: 'Ngày sinh',
  level: 'Cấp độ',
  group: 'Nhóm',
  totalMoney: 'Tổng tiền',
  point: 'Điểm',
  numberPurchase: 'Lần mua',
  daysPurchase: 'Số ngày mua',
  amount: 'SL',
  lastDatePurchase: 'Ngày mua gần nhất',
  buyingCycle: 'Chu kỳ mua',
  daysNotPurchase: 'Số ngày chưa mua',
  note: 'Ghi chú',
  actions: 'Hành động',
};

const useTableColumns = (props: Props) => {
  const columns: ProColumn<Customer> = useMemo(() => {
    return [
      Selection<Customer>(),
      // Index<Customer>(pageNumber, pageSize),
      columnHelper.accessor('id', {
        id: 'ID',
        size: 55,
        header: () => HEAD_CELLS.id,
        cell: (context) => (
          <Typography variant="subtitle2" sx={{ color: '#000000' }}>
            {context.getValue()}
          </Typography>
        ),
        meta: {
          title: HEAD_CELLS.id,
        },
      }),
      columnHelper.accessor('customer', {
        id: 'customer',
        size: 200,
        header: () => HEAD_CELLS.customer,
        cell: (context) => (
          <Link
            to="/customers/customer-info"
            style={{ textDecoration: 'none' }}
          >
            <Typography
              variant="subtitle2"
              sx={{ color: '#007bff', cursor: 'pointer' }}
            >
              {context.getValue()}
            </Typography>
          </Link>
        ),
        meta: {
          title: HEAD_CELLS.customer,
        },
      }),
      columnHelper.accessor('address', {
        id: 'address',
        size: 150,
        header: () => HEAD_CELLS.address,
        cell: (context) => (
          <Typography variant="subtitle2" sx={{ color: '#000000' }}>
            {context.getValue()}
          </Typography>
        ),
        meta: {
          title: HEAD_CELLS.address,
        },
      }),
      columnHelper.accessor('store', {
        id: 'store',
        size: 150,
        header: () => HEAD_CELLS.store,
        cell: (context) => (
          <Typography variant="subtitle2" sx={{ color: '#000000' }}>
            {context.getValue()}
          </Typography>
        ),
        meta: {
          title: HEAD_CELLS.store,
        },
      }),
      columnHelper.accessor('typeCustomer', {
        id: 'typeCustomer',
        size: 150,
        header: () => HEAD_CELLS.typeCustomer,
        cell: (context) => (
          <Typography variant="subtitle2" sx={{ color: '#000913' }}>
            {context.getValue()}
          </Typography>
        ),
        meta: {
          title: HEAD_CELLS.typeCustomer,
        },
      }),
      columnHelper.accessor('phoneNumber', {
        id: 'phoneNumber',
        size: 150,
        header: () => HEAD_CELLS.phoneNumber,
        cell: (context) => (
          <Typography variant="subtitle2" sx={{ color: '#000000' }}>
            {context.getValue()}
          </Typography>
        ),
        meta: {
          title: HEAD_CELLS.phoneNumber,
        },
      }),
      columnHelper.accessor('email', {
        id: 'email',
        size: 150,
        header: () => HEAD_CELLS.email,
        cell: (context) => (
          <Typography variant="subtitle2" sx={{ color: '#000000' }}>
            {context.getValue()}
          </Typography>
        ),
        meta: {
          title: HEAD_CELLS.email,
        },
      }),
      columnHelper.accessor('birthDay', {
        id: 'birthDay',
        size: 100,
        header: () => HEAD_CELLS.birthDay,
        cell: (context) => (
          <Typography variant="subtitle2" sx={{ color: '#000000' }}>
            {context.getValue()}
          </Typography>
        ),
        meta: {
          title: HEAD_CELLS.birthDay,
        },
      }),
      columnHelper.accessor('level', {
        id: 'level',
        size: 100,
        header: () => HEAD_CELLS.level,
        cell: (context) => (
          <Typography variant="subtitle2" sx={{ color: '#000913' }}>
            {context.getValue()}
          </Typography>
        ),
        meta: {
          title: HEAD_CELLS.level,
        },
      }),
      columnHelper.accessor('group', {
        id: 'group',
        size: 150,
        header: () => HEAD_CELLS.group,
        cell: (context) => (
          <Typography variant="subtitle2" sx={{ color: '#000913' }}>
            {context.getValue()}
          </Typography>
        ),
        meta: {
          title: HEAD_CELLS.group,
        },
      }),
      columnHelper.accessor('totalMoney', {
        id: 'totalMoney',
        size: 150,
        header: () => HEAD_CELLS.totalMoney,
        cell: (context) => (
          <Typography variant="subtitle2" sx={{ color: '#038151' }}>
            {context.getValue()?.toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })}
          </Typography>
        ),
        meta: {
          title: HEAD_CELLS.totalMoney,
        },
      }),
      columnHelper.accessor('point', {
        id: 'point',
        size: 100,
        header: () => HEAD_CELLS.point,
        cell: (context) => (
          <Typography variant="subtitle2" sx={{ color: '#000913' }}>
            {context.getValue()}
          </Typography>
        ),
        meta: {
          title: HEAD_CELLS.point,
        },
      }),
      columnHelper.accessor('numberPurchase', {
        id: 'numberPurchase',
        size: 100,
        header: () => HEAD_CELLS.numberPurchase,
        cell: (context) => (
          <Typography variant="subtitle2" sx={{ color: '#007bff' }}>
            {context.getValue()}
          </Typography>
        ),
        meta: {
          title: HEAD_CELLS.numberPurchase,
        },
      }),
      columnHelper.accessor('daysPurchase', {
        id: 'daysPurchase',
        size: 85,
        header: () => HEAD_CELLS.daysPurchase,
        cell: (context) => (
          <Typography variant="subtitle2" sx={{ color: '#007bff' }}>
            {context.getValue()}
          </Typography>
        ),
        meta: {
          title: HEAD_CELLS.daysPurchase,
        },
      }),
      columnHelper.accessor('amount', {
        id: 'amount',
        size: 85,
        header: () => HEAD_CELLS.amount,
        cell: (context) => (
          <Typography variant="subtitle2" sx={{ color: '#000000' }}>
            {context.getValue()}
          </Typography>
        ),
        meta: {
          title: HEAD_CELLS.amount,
        },
      }),
      columnHelper.accessor('lastDatePurchase', {
        id: 'lastDatePurchase',
        size: 65,
        header: () => HEAD_CELLS.lastDatePurchase,
        cell: (context) => (
          <Typography variant="subtitle2" sx={{ color: '#000000' }}>
            {context.getValue()}
          </Typography>
        ),
        meta: {
          title: HEAD_CELLS.lastDatePurchase,
        },
      }),
      columnHelper.accessor('buyingCycle', {
        id: 'buyingCycle',
        size: 150,
        header: () => HEAD_CELLS.buyingCycle,
        cell: (context) => (
          <Typography variant="subtitle2" sx={{ color: '#007bff' }}>
            {context.getValue()}
          </Typography>
        ),
        meta: {
          title: HEAD_CELLS.buyingCycle,
        },
      }),
      columnHelper.accessor('daysNotPurchase', {
        id: 'daysNotPurchase',
        size: 65,
        header: () => HEAD_CELLS.daysNotPurchase,
        cell: (context) => (
          <Typography variant="subtitle2" sx={{ color: '#000000' }}>
            {context.getValue()}
          </Typography>
        ),
        meta: {
          title: HEAD_CELLS.daysNotPurchase,
        },
      }),
      columnHelper.accessor('note', {
        id: 'note',
        size: 65,
        enableSorting: false,
        header: () => (
          <Tooltip title="Ghi chú">
            <NoteAltIcon color="inherit" />
          </Tooltip>
        ),
        cell: (context) => (
          <Typography variant="subtitle2" sx={{ color: '#000000' }}>
            {context.getValue()}
          </Typography>
        ),
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
                  value: 2,
                  actionType: 'edit',
                },
                {
                  label: 'Xóa',
                  value: 3,
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
  }, []);
  return { columns };
};

export default useTableColumns;
