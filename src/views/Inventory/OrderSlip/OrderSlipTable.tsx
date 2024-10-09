import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import ProTable from 'components/ProTable';
import ProTableCell from 'components/ProTable/ProTableCell';
import useRefresh from 'hooks/useRefresh';
import React, { Fragment, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import type { FiltersRef } from 'types/refs';
import ConfirmDialog from './components/ConfirmDialog';
import EditNote from './components/EditNote';
import FiltersForm from './components/FiltersForm';
import useTableColumns from './TableColumns';
import useFilters from './utils/filters';
import type { Product } from './utils/types';

const DATA = [
  {
    id: 1,
    code: 'V12PRMTRDE',
    name: 'Vỏ 12PRM 5G trắng đẹp',
    markCode: 200002,
    importPrice: '772.00',
    costPrice: '772.00',
    price: '772.00',
    priceVAT: '772.00',
    wholesalePrice: '772.00',
    inventory: 15,
    totalInventory: 25,
    shipping: 23,
  },
  {
    id: 2,
    code: 'A12PRMTRDE',
    name: 'Vỏ 12PRM 5G trắng đẹp',
    markCode: 200002,
    importPrice: '772.00',
    costPrice: '772.00',
    price: '772.00',
    priceVAT: '772.00',
    wholesalePrice: '772.00',
    inventory: 15,
    totalInventory: 25,
    shipping: 221,
  },
  {
    id: 3,
    code: 'G12PRMTRDE',
    name: 'Vỏ 12PRM 5G trắng đẹp',
    markCode: 200002,
    importPrice: '772.00',
    costPrice: '772.00',
    price: '772.00',
    priceVAT: '772.00',
    wholesalePrice: '772.00',
    inventory: 22,
    totalInventory: 25,
    shipping: 45,
  },
  {
    id: 4,
    code: 'HV12PRMTRDE',
    name: 'Vỏ 12PRM 5G trắng đẹp',
    markCode: 200002,
    importPrice: '772.00',
    costPrice: '772.00',
    price: '772.00',
    priceVAT: '772.00',
    wholesalePrice: '772.00',
    inventory: 15,
    totalInventory: 25,
    shipping: 11,
  },
  {
    id: 5,
    code: 'L12PRMTRDE',
    name: 'Vỏ 12PRM 5G trắng đẹp',
    markCode: 200002,
    importPrice: '772.00',
    costPrice: '772.00',
    price: '772.00',
    priceVAT: '772.00',
    wholesalePrice: '772.00',
    inventory: 10,
    totalInventory: 25,
    shipping: 22,
  },
  {
    id: 6,
    code: 'E12PRMTRDE',
    name: 'Vỏ 12PRM 5G trắng đẹp',
    markCode: 200002,
    importPrice: '772.00',
    costPrice: '772.00',
    price: '772.00',
    priceVAT: '772.00',
    wholesalePrice: '772.00',
    inventory: 5,
    totalInventory: 25,
    shipping: 32,
  },
  {
    id: 7,
    code: 'C12PRMTRDE',
    name: 'Vỏ 12PRM 5G trắng đẹp',
    markCode: 200002,
    importPrice: '772.00',
    costPrice: '772.00',
    price: '772.00',
    priceVAT: '772.00',
    wholesalePrice: '772.00',
    inventory: 25,
    totalInventory: 25,
    shipping: 66,
  },
  {
    id: 8,
    code: 'M12PRMTRDE',
    name: 'Vỏ 12PRM 5G trắng đẹp',
    markCode: 200002,
    importPrice: '772.00',
    costPrice: '772.00',
    price: '772.00',
    priceVAT: '772.00',
    wholesalePrice: '772.00',
    inventory: 3,
    totalInventory: 25,
    shipping: 2,
  },
];

const OrderSlipTable = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [, refetch] = useRefresh();
  const [loading] = useState<boolean>(false);
  const filtersRef = useRef<FiltersRef>(null);
  const [products] = useState<Product[]>(DATA);
  const [value, setValue] = useState<string>('');
  const [total] = useState<number>(products.length || 0);
  const [openEditNote, setEditNote] = useState<boolean>(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const { filters, onSortingChange, onPageChange, onPageSizeChange, onSearch } =
    useFilters();
  const [, setEditRowId] = useState<number | null>(null);

  const handleResetFilters = () => {
    filtersRef.current?.reset();
  };

  const confirmEditNote = (price: string) => {};

  const handleCloseEditNote = () => {
    setEditNote(false);
    setEditRowId(null);
  };

  const handleSubmitFilters = () => {
    filtersRef.current?.submit();
  };

  const handleEditNote = useCallback((rowId: number, note: string) => {
    setEditNote(true);
    setEditRowId(rowId);
    setValue(note);
  }, []);

  const { columns } = useTableColumns({
    pageNumber: filters.pageNumber,
    pageSize: filters.pageSize,
    handleConfirm: () => setOpenConfirmDialog(true),
    handleEditNote,
  });

  return (
    <>
      <ProTable<any>
        title="Danh sách sản phẩm"
        loading={loading}
        columns={columns}
        data={products}
        refetch={refetch}
        onSortingChange={onSortingChange}
        pagination={{
          page: filters.pageNumber,
          total,
          pageSize: filters.pageSize,
          onPageChange,
          onPageSizeChange,
        }}
        filter={
          <FiltersForm
            ref={filtersRef}
            onSearch={onSearch}
            onSubmit={handleSubmitFilters}
            onClear={handleResetFilters}
          />
        }
        toolBar={
          <Fragment>
            <Button onClick={() => navigate('add')}>
              <AddIcon /> {t('Thêm mới')}
            </Button>
            <Button variant="outlined">
              <DownloadIcon /> {t('Xuất file')}
            </Button>
          </Fragment>
        }
        totalRow={
          <>
            <TableRow hover>
              <ProTableCell offset={0}></ProTableCell>
              <ProTableCell offset={0}></ProTableCell>
              <ProTableCell offset={0}></ProTableCell>
              <ProTableCell offset={0}></ProTableCell>
              <ProTableCell offset={0}>
                <Typography fontWeight="bold">Tổng</Typography>
              </ProTableCell>
              <ProTableCell offset={0}>
                <Typography fontWeight="bold">6.900</Typography>
              </ProTableCell>
              <ProTableCell offset={0}>
                <Typography fontWeight="bold">39.330</Typography>
              </ProTableCell>
              <ProTableCell offset={0}>
                <Typography fontWeight="bold">140.014.800</Typography>
              </ProTableCell>
              <ProTableCell offset={0}></ProTableCell>
              <ProTableCell offset={0}></ProTableCell>
              <ProTableCell offset={0}></ProTableCell>
              <ProTableCell offset={0}>
                <Typography fontWeight="bold">1.900</Typography>
              </ProTableCell>
              <ProTableCell offset={0}></ProTableCell>
              <ProTableCell offset={0}></ProTableCell>
            </TableRow>
          </>
        }
      />
      <ConfirmDialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
      />
      <EditNote
        open={openEditNote}
        onClose={handleCloseEditNote}
        confirmChange={confirmEditNote}
        value={value}
      />
    </>
  );
};

export default OrderSlipTable;
