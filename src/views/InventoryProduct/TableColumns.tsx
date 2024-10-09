import Index from 'components/ProTable/components/Index';
import Selection from 'components/ProTable/components/Selection';
import type { HeadCell, ProColumn } from 'components/ProTable/types';
import { getColumnHelper } from 'components/ProTable/utils/getColumnHelper';
import { useMemo } from 'react';
import { Inventory, Product } from './utils/type';
import Numeral from 'utils/Numeral';
import ProductImage from 'components/ProductImage';
import { Link, Stack } from '@mui/material';

const columnHelper = getColumnHelper<Inventory>();

const HEAD_CELLS: HeadCell<Inventory> = {
  index: 'ID',
  image: 'Ảnh',
  price: 'Giá bán',
  tm: 'TM',
  hn: 'HN-1',
  th: 'Thái Hà',
  sg: 'Sài Gòn',
  commingProduct: 'Hàng trên đường',
  tn: 'Thái Nguyên',
  vinh: 'Vinh',
  screen: 'Màn hình',
  product: 'Sản phẩm',
  thanhhoa: 'VTech Thanh Hóa',
  danang: 'VTech Đà Nẵng',
  xeth: 'Xe TH',
  mrV: 'Anh Vương',
  actions: 'Hành động',
};

interface Props {
  pageNumber: number;
  pageSize: number;
}

const useTableColumns = (props: Props) => {
  const { pageNumber, pageSize } = props;

  const columns: ProColumn<Inventory> = useMemo(() => {
    return [
      Selection<Inventory>(),
      Index<Inventory>(pageNumber, pageSize),

      columnHelper.accessor('product', {
        id: 'product',
        size: 50,
        enableSorting: false,
        header: () => HEAD_CELLS.product,
        cell: (context) => {
          const { name, code } = context.getValue<Product>();
          return (
            <Stack direction="column" spacing={0}>
              {name}
              <Link
                href="https://www.google.com.vn/?hl=vi"
                underline="none"
                target="_blank"
                color={'#007bff'}
              >
                {code}
              </Link>
            </Stack>
          );
        },
        meta: {
          title: HEAD_CELLS.product,
        },
      }),
      columnHelper.accessor('image', {
        id: 'image',
        size: 100,
        enableSorting: false,
        header: () => HEAD_CELLS.image,
        cell: (context) => <ProductImage src={context.getValue()} />,
        meta: {
          title: HEAD_CELLS.image,
        },
      }),
      columnHelper.accessor('tm', {
        id: 'tm',
        size: 50,
        enableSorting: false,
        header: () => HEAD_CELLS.tm,
        cell: (context) => Numeral.price(context.getValue()),
        meta: {
          title: HEAD_CELLS.tm,
        },
      }),
      columnHelper.accessor('hn', {
        id: 'hn',
        size: 50,
        enableSorting: false,
        header: () => HEAD_CELLS.hn,
        cell: (context) => Numeral.price(context.getValue()),
        meta: {
          title: HEAD_CELLS.hn,
        },
      }),
      columnHelper.accessor('th', {
        id: 'th',
        size: 50,
        enableSorting: false,
        header: () => HEAD_CELLS.th,
        cell: (context) => Numeral.price(context.getValue()),
        meta: {
          title: HEAD_CELLS.th,
        },
      }),
      columnHelper.accessor('sg', {
        id: 'sg',
        size: 50,
        enableSorting: false,
        header: () => HEAD_CELLS.sg,
        cell: (context) => Numeral.price(context.getValue()),
        meta: {
          title: HEAD_CELLS.sg,
        },
      }),
      columnHelper.accessor('commingProduct', {
        id: 'commingProduct',
        size: 50,
        enableSorting: false,
        header: () => HEAD_CELLS.commingProduct,
        cell: (context) => Numeral.price(context.getValue()),
        meta: {
          title: HEAD_CELLS.commingProduct,
        },
      }),
      columnHelper.accessor('tn', {
        id: 'tn',
        size: 50,
        enableSorting: false,
        header: () => HEAD_CELLS.tn,
        cell: (context) => Numeral.price(context.getValue()),
        meta: {
          title: HEAD_CELLS.tn,
        },
      }),
      columnHelper.accessor('vinh', {
        id: 'vinh',
        size: 50,
        enableSorting: false,
        header: () => HEAD_CELLS.vinh,
        cell: (context) => Numeral.price(context.getValue()),
        meta: {
          title: HEAD_CELLS.vinh,
        },
      }),
      columnHelper.accessor('screen', {
        id: 'screen',
        size: 50,
        enableSorting: false,
        header: () => HEAD_CELLS.screen,
        cell: (context) => Numeral.price(context.getValue()),
        meta: {
          title: HEAD_CELLS.screen,
        },
      }),
      columnHelper.accessor('thanhhoa', {
        id: 'thanhhoa',
        size: 50,
        enableSorting: false,
        header: () => HEAD_CELLS.thanhhoa,
        cell: (context) => Numeral.price(context.getValue()),
        meta: {
          title: HEAD_CELLS.thanhhoa,
        },
      }),
      columnHelper.accessor('danang', {
        id: 'danang',
        size: 50,
        enableSorting: false,
        header: () => HEAD_CELLS.danang,
        cell: (context) => Numeral.price(context.getValue()),
        meta: {
          title: HEAD_CELLS.danang,
        },
      }),
      columnHelper.accessor('xeth', {
        id: 'xeth',
        size: 50,
        enableSorting: false,
        header: () => HEAD_CELLS.xeth,
        cell: (context) => Numeral.price(context.getValue()),
        meta: {
          title: HEAD_CELLS.xeth,
        },
      }),
      columnHelper.accessor('mrV', {
        id: 'mrV',
        size: 50,
        enableSorting: false,
        header: () => HEAD_CELLS.mrV,
        cell: (context) => Numeral.price(context.getValue()),
        meta: {
          title: HEAD_CELLS.mrV,
        },
      }),
    ];
  }, [pageNumber, pageSize]);

  return { columns };
};

export default useTableColumns;
