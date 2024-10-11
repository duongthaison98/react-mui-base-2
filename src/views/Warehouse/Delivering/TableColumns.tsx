import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ActionIconButton from '@/components/ProButton/ActionIconButton';
import ProMenu from '@/components/ProMenu';
import Selection from '@/components/ProTable/components/Selection';
import type { HeadCell, ProColumn } from '@/components/ProTable/types';
import { getColumnHelper } from '@/components/ProTable/utils/getColumnHelper';
import useDialog from '@/hooks/useDialog';
import { Fragment, useMemo } from 'react';
import SmsFailedIcon from '@mui/icons-material/SmsFailed';
import SwipeRightIcon from '@mui/icons-material/SwipeRight';

const columnHelper = getColumnHelper<any>();

const HEAD_CELLS: HeadCell<any> = {
  warehouse: 'Kho hàng',
  index: 'ID',
  style: 'Kiểu',
  SP: 'SP',
  SL: 'SL',
  count: 'Tổng tiền',
  discount: 'Chiết khấu',
  creator: 'Người tạo',
  comment: 'Ghi chú',
  browser: 'Duyệt',
  confirm: 'Xác nhận',
};

interface Props {
  pageNumber: number;
  pageSize: number;
}

const useTableColumnsDelivering = (props: Props) => {
  // const { pageNumber, pageSize } = props;
  const dialog = useDialog();

  const columns: ProColumn<any> = useMemo(() => {
    return [
      Selection<any>(),
      // Index<any>(pageNumber, pageSize),
      columnHelper.group({
        id: 'order',
        header: '',
        columns: [
          columnHelper.accessor('ID | Ngày', {
            id: 'ID | Ngày',
            size: 60,
            header: () => 'ID | Ngày',
            cell: (context) => (
              <Typography variant='subtitle2' sx={{ color: '#007bff' }}>
                7578658{' '}
                <Typography variant='subtitle2' sx={{ color: '#000' }}>
                  09/02
                </Typography>
              </Typography>
            ),
          }),
        ],
        meta: {
          align: 'center',
        },
      }),

      columnHelper.group({
        id: 'order',
        header: '',
        columns: [
          columnHelper.accessor('warehouse', {
            id: 'warehouse',
            size: 250,
            header: () => HEAD_CELLS.warehouse,
            cell: (context) => (
              <Typography variant='subtitle2'>
                VTech Thanh Hoá - HCM
                <Typography variant='subtitle2' sx={{ color: '#f44336' }}>
                  Xuất chuyển kho
                </Typography>
              </Typography>
            ),
            meta: {
              title: HEAD_CELLS.warehouse,
            },
          }),

          columnHelper.accessor('SP', {
            id: 'SP',
            size: 60,
            header: () => HEAD_CELLS.SP,
            cell: (context) => Math.round(Math.random() * 50),
            meta: {
              title: HEAD_CELLS.SP,
            },
          }),

          columnHelper.accessor('SL', {
            id: 'SL',
            size: 60,
            header: () => HEAD_CELLS.SL,
            cell: (context) => Math.round(Math.random() * 500),
            meta: {
              title: HEAD_CELLS.SL,
            },
          }),
          columnHelper.accessor('count', {
            id: 'count',
            size: 60,
            header: () => HEAD_CELLS.count,
            cell: (context) => Math.round(Math.random() * 50000),
            meta: {
              title: HEAD_CELLS.count,
            },
          }),
          columnHelper.accessor('creator', {
            id: 'creator',
            size: 250,
            header: () => HEAD_CELLS.creator,
            cell: (context) => (
              <Typography variant='subtitle2'>
                Nguyễn Xuân Anh
                <Typography variant='subtitle1'> 18:47 09/02</Typography>
              </Typography>
            ),
            meta: {
              title: HEAD_CELLS.creator,
            },
          }),
          columnHelper.accessor('browser', {
            id: 'browser',
            size: 250,
            header: () => HEAD_CELLS.browser,
            cell: (context) => (
              <Typography variant='subtitle2' sx={{ color: 'green' }}>
                Nguyễn Xuân Anh
                <Typography variant='subtitle1' sx={{ color: '#000' }}>
                  {' '}
                  23:11 09/02
                </Typography>
              </Typography>
            ),
            meta: {
              title: HEAD_CELLS.browser,
            },
          }),
          columnHelper.accessor('confirm', {
            id: 'confirm',
            size: 160,
            header: () => HEAD_CELLS.confirm,
            cell: (context) => (
              <Tooltip title='Xác nhận'>
                <Typography variant='subtitle2' sx={{ color: '#f44336' }}>
                  <SwipeRightIcon color='error' sx={{ marginRight: '8px' }} />
                  Xác nhận
                </Typography>
              </Tooltip>
            ),
            meta: {
              title: HEAD_CELLS.confirm,
            },
          }),
          columnHelper.accessor('comment', {
            id: 'comment',
            size: 250,
            enableSorting: false,
            header: () => (
              <Tooltip title='Ghi chú'>
                <SmsFailedIcon color='error' />
              </Tooltip>
            ),
            cell: (context) => (
              <Typography variant='subtitle2'>Dây sạc nhanh 3 đầu. lệ yêu cầu gửi</Typography>
            ),
            meta: {
              title: HEAD_CELLS.totalInventory,
            },
          }),
        ],
        meta: {
          align: 'center',
        },
        //
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
                  label: 'In Phiếu',
                  value: 1,
                  actionType: 'add',
                },
                {
                  label: 'In mã vạch',
                  value: 2,
                  actionType: 'print',
                },
                {
                  label: 'Xuất Excel in mã vạch bằng Bartender',
                  value: 2,
                  actionType: 'change',
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
  }, [dialog]);

  return { columns };
};

export default useTableColumnsDelivering;
