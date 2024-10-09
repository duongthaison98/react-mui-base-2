import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Box, Link } from '@mui/material';
import ActionIconButton from 'components/ProButton/ActionIconButton';
import Selection from 'components/ProTable/components/Selection';
import type { HeadCell, ProColumn } from 'components/ProTable/types';
import { getColumnHelper } from 'components/ProTable/utils/getColumnHelper';
import { useMemo } from 'react';
import { EditHistory } from './utils/type';

const columnHelper = getColumnHelper<EditHistory>();

const HEAD_CELLS: HeadCell<EditHistory> = {
  index: 'ID',
  maSanPham: 'Mã sản phẩm',
  tenSanPham: 'Tên sản phẩm',
  kieuLog: 'Kiểu Log',
  nguoiSua: 'Người Sửa',
  thoiGian: 'Thời gian',
};

interface Props {
  pageNumber: number;
  pageSize: number;
  handleToggleDialog: () => void;
}

const useTableColumns = (props: Props) => {
  const { handleToggleDialog } = props;
  const columns: ProColumn<EditHistory> = useMemo(() => {
    return [
      Selection<EditHistory>(),

      columnHelper.accessor('maSanPham', {
        id: 'maSanPham',
        size: 200,
        header: () => HEAD_CELLS.maSanPham,
        cell: (context) => context.getValue(),
        enableSorting: false,
        meta: {
          title: HEAD_CELLS.maSanPham,
        },
      }),
      columnHelper.accessor('tenSanPham', {
        id: 'tenSanPham',
        size: 200,
        header: () => HEAD_CELLS.tenSanPham,
        cell: (context) => (
          <Box>
            <Link
              href="https://www.google.com.vn/?hl=vi"
              underline="none"
              target="_blank"
              color={'#007bff'}
            >
              {context.getValue()}
            </Link>
          </Box>
        ),
        enableSorting: false,
        meta: {
          title: HEAD_CELLS.tenSanPham,
        },
      }),
      columnHelper.accessor('kieuLog', {
        id: 'kieuLog',
        size: 200,
        header: () => HEAD_CELLS.kieuLog,
        cell: (context) => context.getValue(),
        enableSorting: false,
        meta: {
          title: HEAD_CELLS.kieuLog,
        },
      }),
      columnHelper.accessor('nguoiSua', {
        id: 'nguoiSua',
        size: 200,
        header: () => HEAD_CELLS.nguoiSua,
        cell: (context) => context.getValue(),
        enableSorting: false,
        meta: {
          title: HEAD_CELLS.nguoiSua,
        },
      }),
      columnHelper.accessor('thoiGian', {
        id: 'thoiGian',
        size: 200,
        header: () => HEAD_CELLS.thoiGian,
        cell: (context) => context.getValue(),
        enableSorting: false,
        meta: {
          title: HEAD_CELLS.thoiGian,
        },
      }),
      {
        id: 'actions',
        size: 65,
        enableSorting: false,
        header: () => <SettingsOutlinedIcon sx={{ color: 'text.secondary' }} />,
        cell: (context) => {
          return (
            <ActionIconButton actionType="more" onClick={handleToggleDialog} />
          );
        },
        meta: {
          title: HEAD_CELLS.actions,
          align: 'center',
        },
      },
    ];
  }, [handleToggleDialog]);

  return { columns };
};

export default useTableColumns;
