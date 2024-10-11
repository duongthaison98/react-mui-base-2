import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Typography from '@mui/material/Typography';
import ActionIconButton from '@/components/ProButton/ActionIconButton';
import ProMenu from '@/components/ProMenu';
import Index from '@/components/ProTable/components/Index';
import type { HeadCell, ProColumn } from '@/components/ProTable/types';
import { getColumnHelper } from '@/components/ProTable/utils/getColumnHelper';
import useDialog from '@/hooks/useDialog';
import { Fragment, useMemo } from 'react';
import CheckIcon from '@mui/icons-material/Check';

const columnHelper = getColumnHelper<any>();

const HEAD_CELLS: HeadCell<any> = {
  index: 'ID',
  code: 'Code',
  name: 'Tên',
  markCode: 'Cửa hàng',
  importPrice: 'Tình trạng',
  costPrice: 'Người tạo',
  actions: 'Hành động',
};

interface Props {
  pageNumber: number;
  pageSize: number;
}

const useTableColumns = (props: Props) => {
  const { pageNumber, pageSize } = props;

  const dialog = useDialog();

  const columns: ProColumn<any> = useMemo(() => {
    return [
      Index<any>(pageNumber, pageSize),

      columnHelper.group({
        id: 'order',
        header: '',
        columns: [
          columnHelper.accessor('code', {
            id: 'code',
            size: 250,
            header: () => HEAD_CELLS.code,
            cell: (context) => {
              return context.getValue() === '1' ? (
                <Typography sx={{ marginLeft: '12px' }}>111111</Typography>
              ) : context.getValue() === '2' ? (
                <Typography sx={{ marginLeft: '24px' }}>222222</Typography>
              ) : context.getValue() === '3' ? (
                <Typography sx={{ marginLeft: '48px' }}>333333</Typography>
              ) : (
                <Typography sx={{ marginLeft: '96px' }}>444444</Typography>
              );
            },

            meta: {
              title: HEAD_CELLS.code,
            },
          }),
          columnHelper.accessor('name', {
            id: 'name',
            size: 250,
            header: () => HEAD_CELLS.name,
            cell: (context) => {
              return context.getValue() === '1' ? (
                <Typography sx={{ marginLeft: '12px' }}>TM Trương Định</Typography>
              ) : context.getValue() === '2' ? (
                <Typography sx={{ marginLeft: '24px' }}>TM Hồ Chí Minh</Typography>
              ) : context.getValue() === '3' ? (
                <Typography sx={{ marginLeft: '48px' }}>Tài khoản màn hình</Typography>
              ) : (
                <Typography sx={{ marginLeft: '96px' }}>Quỹ xe tải Thanh Hóa</Typography>
              );
            },
            meta: {
              title: HEAD_CELLS.name,
            },
          }),
          columnHelper.accessor('markCode', {
            id: 'markCode',
            size: 160,
            header: () => HEAD_CELLS.markCode,
            cell: (context) => <Typography>{context.getValue()}</Typography>,
            meta: {
              title: HEAD_CELLS.markCode,
            },
          }),
          columnHelper.accessor('importPrice', {
            id: 'importPrice',
            size: 60,
            header: () => HEAD_CELLS.importPrice,
            cell: (context) => (
              <Typography sx={{ justifyContent: 'center' }}>
                <CheckIcon />
              </Typography>
            ),
            meta: {
              title: HEAD_CELLS.importPrice,
            },
          }),

          columnHelper.accessor('costPrice', {
            id: 'costPrice',
            size: 160,
            header: () => HEAD_CELLS.costPrice,
            cell: (context) => <Typography>{context.getValue()}</Typography>,
            meta: {
              title: HEAD_CELLS.costPrice,
            },
          }),
        ],

        meta: {
          align: 'center',
        },
      }),

      {
        id: 'actions',
        size: 65,
        enableSorting: false,
        header: () => <SettingsOutlinedIcon sx={{ color: 'text.secondary' }} />,
        cell: (context) => {
          const handleDeleteRow = () => {
            dialog({
              headline: 'Xác nhận xóa?',
              supportingText: (
                <Fragment>
                  Bạn có chắc chắn muốn xóa: <strong>{context.row.original.name}</strong>
                </Fragment>
              ),
              onConfirm: async () => {},
            });
          };

          return (
            <ProMenu
              position='left'
              items={[
                {
                  label: 'Thêm tài khoản',
                  value: 1,
                  actionType: 'add',
                },
                {
                  label: 'Sửa',
                  value: 2,
                  actionType: 'edit',
                },
                {
                  label: 'Xóa',
                  value: 3,
                  actionType: 'delete',
                  onSelect: handleDeleteRow,
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
  }, [pageNumber, pageSize, dialog]);

  return { columns };
};

export default useTableColumns;
