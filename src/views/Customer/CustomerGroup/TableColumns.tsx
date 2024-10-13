import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Typography from '@mui/material/Typography';
import ActionIconButton from '@/components/ProButton/ActionIconButton';
import ProMenu from '@/components/ProMenu';
import Selection from '@/components/ProTable/components/Selection';
import { HeadCell, ProColumn } from '@/components/ProTable/types';
import { getColumnHelper } from '@/components/ProTable/utils/getColumnHelper';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CustomerGroup } from '@/types/customerGroup';

const columnHelper = getColumnHelper<CustomerGroup>();

interface Props {
  pageNumber: number;
  pageSize: number;
}

const HEAD_CELLS: HeadCell<CustomerGroup> = {
  name: 'Name',
  description: 'Mô tả',
  createdAt: 'Ngày tạo',
};

const useTableColumns = (props: Props) => {
  const columns: ProColumn<CustomerGroup> = useMemo(() => {
    return [
      Selection<CustomerGroup>(),
      // Index<Customer>(pageNumber, pageSize),
      columnHelper.accessor('name', {
        id: 'name',
        size: 150,
        header: () => HEAD_CELLS.name,
        cell: (context) => (
          <Typography variant='subtitle2' sx={{ color: '#000000' }}>
            {context.getValue()}
          </Typography>
        ),
        meta: {
          title: HEAD_CELLS.name,
        },
      }),
      columnHelper.accessor('description', {
        id: 'description',
        size: 150,
        header: () => HEAD_CELLS.description,
        cell: (context) => (
          <Typography variant='subtitle2' sx={{ color: '#000000' }}>
            {context.getValue()}
          </Typography>
        ),
        meta: {
          title: HEAD_CELLS.description,
        },
      }),
      columnHelper.accessor('createdAt', {
        id: 'createdAt',
        size: 150,
        header: () => HEAD_CELLS.createdAt,
        cell: (context) => (
          <Typography variant='subtitle2' sx={{ color: '#000000' }}>
            {context.getValue()}
          </Typography>
        ),
        meta: {
          title: HEAD_CELLS.createdAt,
        },
      }),
      {
        id: 'actions',
        size: 65,
        enableSorting: false,
        header: () => <SettingsOutlinedIcon sx={{ color: 'text.secondary' }} />,
        cell: () => {
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
