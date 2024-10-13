import ActionIconButton from '@/components/ProButton/ActionIconButton';
import ProMenu from '@/components/ProMenu';
import Selection from '@/components/ProTable/components/Selection';
import { HeadCell, ProColumn } from '@/components/ProTable/types';
import { getColumnHelper } from '@/components/ProTable/utils/getColumnHelper';
import { Customer } from '@/types/customer-types';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useMemo } from 'react';

const columnHelper = getColumnHelper<Customer>();

interface Props {
  page: number;
  limit: number;
}

const HEAD_CELLS: HeadCell<Customer> = {
  id: 'ID',
  name: 'Tên khách hàng',
  email: 'Email',
  phone: 'Số điện thoại',
  address: 'Địa chỉ',
  customerGroupId: 'Mã nhóm khách hàng',
  customerType: 'Loại khách hàng',
  createdAt: 'Ngày tạo',
  updatedAt: 'Ngày cập nhật',
  customerGroup: 'Nhóm khách hàng',
  actions: 'Hành động',
};

const useTableColumns = (props: Props) => {
  const columns: ProColumn<Customer> = useMemo(() => {
    return [
      Selection<Customer>(),
      columnHelper.accessor('id', {
        id: 'id',
        size: 100,
        header: () => HEAD_CELLS.id,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.id,
        },
      }),
      columnHelper.accessor('name', {
        id: 'name',
        size: 200,
        header: () => HEAD_CELLS.name,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.name,
        },
      }),
      columnHelper.accessor('email', {
        id: 'email',
        size: 200,
        header: () => HEAD_CELLS.email,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.email,
        },
      }),
      columnHelper.accessor('phone', {
        id: 'phone',
        size: 150,
        header: () => HEAD_CELLS.phone,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.phone,
        },
      }),
      columnHelper.accessor('address', {
        id: 'address',
        size: 200,
        header: () => HEAD_CELLS.address,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.address,
        },
      }),
      columnHelper.accessor('customerType', {
        id: 'customerType',
        size: 150,
        header: () => HEAD_CELLS.customerType,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.customerType,
        },
      }),
      columnHelper.accessor('customerGroup.name', {
        id: 'customerGroup',
        size: 200,
        header: () => HEAD_CELLS.customerGroup,
        cell: (context) => context.getValue(),
        meta: {
          title: HEAD_CELLS.customerGroup,
        },
      }),
      columnHelper.accessor('createdAt', {
        id: 'createdAt',
        size: 200,
        header: () => HEAD_CELLS.createdAt,
        cell: (context) => new Date(context.getValue()).toLocaleString(),
        meta: {
          title: HEAD_CELLS.createdAt,
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
