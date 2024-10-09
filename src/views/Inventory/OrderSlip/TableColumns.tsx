import EditIcon from '@mui/icons-material/Edit';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import ActionIconButton from 'components/ProButton/ActionIconButton';
import ProMenu from 'components/ProMenu';
import type { HeadCell, ProColumn } from 'components/ProTable/types';
import { getColumnHelper } from 'components/ProTable/utils/getColumnHelper';
import useDialog from 'hooks/useDialog';
import { Fragment, useMemo } from 'react';

const columnHelper = getColumnHelper<any>();

const HEAD_CELLS: HeadCell<any> = {
  index: 'ID',
  imageUrl: 'Ảnh',
  code: 'Mã sản phẩm',
  name: 'Tên sản phẩm',
  markCode: 'Mã vạch',
  importPrice: 'Giá nhập',
  costPrice: 'Giá vốn',
  price: 'Giá bán',
  priceVAT: 'Giá bán + VAT',
  wholesalePrice: 'Giá sỉ',
  inventory: 'Tồn',
  totalInventory: 'Tổng tồn',
  actions: 'Hành động',
};

interface Props {
  pageNumber: number;
  pageSize: number;
  handleConfirm: () => void;
  handleEditNote: (id: number, note: string) => void;
}

const useTableColumns = (props: Props) => {
  const { pageNumber, pageSize, handleConfirm, handleEditNote } = props;
  const dialog = useDialog();

  const columns: ProColumn<any> = useMemo(() => {
    return [
      columnHelper.accessor('imageUrl', {
        id: 'imageUrl',
        size: 60,
        enableSorting: false,
        header: () => 'ID | ngày',
        cell: (context) => (
          <Box sx={{ textAlign: 'center' }}>
            <Typography fontWeight="bold" color="primary">
              15
            </Typography>
            <Typography color="primary">02/02/2023</Typography>
          </Box>
        ),
        meta: {
          title: HEAD_CELLS.imageUrl,
        },
      }),
      columnHelper.accessor('code', {
        id: 'code',
        size: 90,
        header: () => 'Kho hàng',
        cell: (context) => <Typography color="primary">HN-1 </Typography>,
        meta: {
          title: HEAD_CELLS.code,
        },
      }),
      columnHelper.accessor('name', {
        id: 'name',
        size: 100,
        header: () => 'NCC',
        cell: (context) => <Typography color="primary">NCC 47</Typography>,
        meta: {
          title: HEAD_CELLS.code,
        },
      }),
      columnHelper.accessor('name', {
        id: 'name',
        size: 100,
        header: () => 'Số hóa đơn',
        cell: (context) => '768886',
        meta: {
          title: HEAD_CELLS.name,
        },
      }),

      columnHelper.accessor('costPrice', {
        id: 'costPrice',
        size: 90,
        enableSorting: false,
        header: () => 'SL SP ',
        cell: (context) => <Typography color="primary">1</Typography>,
        meta: {
          title: HEAD_CELLS.costPrice,
        },
      }),
      columnHelper.accessor('price', {
        id: 'price',
        size: 100,
        header: () => 'Tổng SL',
        cell: (context) => <Typography color="primary">6900</Typography>,
        meta: {
          title: HEAD_CELLS.price,
        },
      }),

      columnHelper.accessor('price', {
        id: 'price',
        size: 100,
        header: () => 'TT tệ',
        cell: (context) => <Typography color="primary">39.330</Typography>,
        meta: {
          title: HEAD_CELLS.price,
        },
      }),

      columnHelper.accessor('price', {
        id: 'price',
        size: 100,
        header: () => 'Tổng tiền',
        cell: (context) => <Typography color="primary">140.014.800</Typography>,
        meta: {
          title: HEAD_CELLS.price,
        },
      }),

      columnHelper.accessor('inventory', {
        id: 'inventory',
        size: 100,
        enableSorting: false,
        header: () => 'Ghi chú',
        cell: (context) => {
          const { note, id } = context.row.original;
          return (
            <IconButton onClick={() => handleEditNote(id, note)}>
              <EditIcon color="primary" />
            </IconButton>
          );
        },
        meta: {
          title: HEAD_CELLS.inventory,
        },
      }),
      columnHelper.accessor('inventory', {
        id: 'inventory',
        size: 150,
        enableSorting: false,
        header: () => 'Người lập',
        cell: (context) => 'Nguyễn Thành Luân',
        meta: {
          title: HEAD_CELLS.inventory,
        },
      }),
      columnHelper.accessor('inventory', {
        id: 'inventory',
        size: 120,
        enableSorting: false,
        header: () => 'Xác nhận',
        cell: (context) => {
          return <Button onClick={handleConfirm}>Xác nhận</Button>;
        },
        meta: {
          title: HEAD_CELLS.inventory,
        },
      }),
      columnHelper.accessor('inventory', {
        id: 'inventory',
        size: 100,
        enableSorting: false,
        header: () => 'Trạng thái duyệt',
        cell: (context) => <Typography color="primary">5000 / 6900</Typography>,
        meta: {
          title: HEAD_CELLS.inventory,
        },
      }),
      columnHelper.accessor('inventory', {
        id: 'inventory',
        size: 100,
        enableSorting: false,
        header: () => 'Trạng thái phiếu',
        cell: (context) => {
          const handleConfirmComplete = () => {
            dialog({
              headline: 'Xác nhận?',
              supportingText: (
                <Fragment>
                  Bạn có chắc chắn muốn hoàn thành đơn hàng này không?
                </Fragment>
              ),
              onConfirm: async () => {},
            });
          };

          return <Button onClick={handleConfirmComplete}>Hoàn thành</Button>;
        },
        meta: {
          title: HEAD_CELLS.inventory,
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
                  Bạn có chắc chắn muốn xóa:{' '}
                  <strong>{context.row.original.name}</strong>
                </Fragment>
              ),
              onConfirm: async () => {},
            });
          };

          return (
            <ProMenu
              position="left"
              items={[
                {
                  label: 'Xem chi tiết',
                  value: 1,
                  actionType: 'view',
                },
                {
                  label: 'Sửa thông tin',
                  value: 2,
                  actionType: 'edit',
                },
                {
                  label: 'Xóa',
                  value: 3,
                  actionType: 'delete',
                  onSelect: handleDeleteRow,
                },
                {
                  label: 'Xem ảnh phiếu',
                  value: 4,
                  actionType: 'view',
                  onSelect: handleDeleteRow,
                },
                {
                  label: 'Upload',
                  value: 5,
                  actionType: 'upload',
                  onSelect: handleDeleteRow,
                },
                {
                  label: 'Thêm mới hàng chiếu',
                  value: 6,
                  actionType: 'add',
                  onSelect: handleDeleteRow,
                },
              ]}
            >
              <ActionIconButton actionType="action" />
            </ProMenu>
          );
        },
        meta: {
          title: HEAD_CELLS.actions,
          align: 'center',
        },
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, pageSize, dialog]);

  return { columns };
};

export default useTableColumns;
