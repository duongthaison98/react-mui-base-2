import ActionButton from '@/components/ProButton/ActionButton';
import ProMenu from '@/components/ProMenu';
import ProTable from '@/components/ProTable';
import useRefresh from '@/hooks/useRefresh';
import { Fragment, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { FiltersRef } from '@/types/refs';
import FiltersForm from './FiltersForm';
import useTableColumns from './TableColumns';
import useFilters from './utils/filters';
import type { Product } from './utils/types';
import Dialog from '@mui/material/Dialog';
import DialogHeader from '@/components/ProDialog/DialogHeader';
import DialogForm from '@/components/ProDialog/DialogForm';
import DialogContent from '@/components/ProDialog/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Grid, TextField } from '@mui/material';
import DialogFooter from '@/components/ProDialog/DialogFooter';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import ProFormLabel from '@/components/ProForm/ProFormLabel';
const DATA = [
  {
    id: 1,

    code: '1',
    name: '1',
    markCode: 'HN-1',
    importPrice: '772.00',
    costPrice: 'Luân Thành',
    price: '772.00',
    priceVAT: '772.00',
    wholesalePrice: '772.00',
    inventory: 15,
    totalInventory: 25,
    shipping: 23,
  },
  {
    id: 2,

    code: '2',
    name: '2',
    markCode: 'HN-2',
    importPrice: '772.00',
    costPrice: 'Thành Long',
    price: '772.00',
    priceVAT: '772.00',
    wholesalePrice: '772.00',
    inventory: 15,
    totalInventory: 25,
    shipping: 221,
  },
  {
    id: 3,

    code: '3',
    name: '3',
    markCode: 'Thái Nguyên',
    importPrice: '772.00',
    costPrice: 'Mạnh hải',
    price: '772.00',
    priceVAT: '772.00',
    wholesalePrice: '772.00',
    inventory: 22,
    totalInventory: 25,
    shipping: 45,
  },
  {
    id: 4,

    code: '4',
    name: '4',
    markCode: 'Màn Hình',
    importPrice: '772.00',
    costPrice: 'Dinh The Long',
    price: '772.00',
    priceVAT: '772.00',
    wholesalePrice: '772.00',
    inventory: 15,
    totalInventory: 25,
    shipping: 11,
  },
  {
    id: 5,

    code: '3',
    name: '3',
    markCode: '	VTech Thanh Hoá',
    importPrice: '772.00',
    costPrice: 'Huyền',
    price: '772.00',
    priceVAT: '772.00',
    wholesalePrice: '772.00',
    inventory: 10,
    totalInventory: 25,
    shipping: 22,
  },
  {
    id: 6,
    status: 3,
    code: '3',
    name: '3',
    markCode: 'Linh Kiện HN',
    importPrice: '772.00',
    costPrice: 'Xuân Anh',
    price: '772.00',
    priceVAT: '772.00',
    wholesalePrice: '772.00',
    inventory: 5,
    totalInventory: 25,
    shipping: 32,
  },
  {
    id: 7,

    code: '3',
    name: '3',
    markCode: 'Linh Kiện HN',
    importPrice: '772.00',
    costPrice: 'Hoàng',
    price: '772.00',
    priceVAT: '772.00',
    wholesalePrice: '772.00',
    inventory: 25,
    totalInventory: 25,
    shipping: 66,
  },
  {
    id: 8,

    code: '3',
    name: '3',
    markCode: 'Vinh',
    importPrice: '772.00',
    costPrice: 'Linhh',
    price: '772.00',
    priceVAT: '772.00',
    wholesalePrice: '772.00',
    inventory: 3,
    totalInventory: 25,
    shipping: 2,
  },
  {
    id: 9,

    code: '2',
    name: '2',
    markCode: 'HNMC',
    importPrice: '9090',
    costPrice: 'Chac',
    price: '772.00',
    priceVAT: '772.00',
    wholesalePrice: '772.00',
    inventory: 3,
    totalInventory: 25,
    shipping: 2,
  },
  {
    id: 10,
    status: 4,
    code: '2',
    name: '2',
    markCode: 'VTech Thanh Hoá',
    importPrice: '772.00',
    costPrice: 'Linhh',
    price: '772.00',
    priceVAT: '772.00',
    wholesalePrice: '772.00',
    inventory: 3,
    totalInventory: 25,
    shipping: 2,
  },
  {
    id: 11,

    code: '2',
    name: '2',
    markCode: 'Thái Nguyên',
    importPrice: '772.00',
    costPrice: 'Linhh',
    price: '772.00',
    priceVAT: '772.00',
    wholesalePrice: '772.00',
    inventory: 3,
    totalInventory: 25,
    shipping: 2,
  },
  {
    id: 12,

    code: '2',
    name: '2',
    markCode: 'Vinh',
    importPrice: '772.00',
    costPrice: 'Linhh',
    price: '772.00',
    priceVAT: '772.00',
    wholesalePrice: '772.00',
    inventory: 3,
    totalInventory: 25,
    shipping: 2,
  },
];

const AccountTable = () => {
  const { t } = useTranslation();
  const [, refetch] = useRefresh();
  const [products] = useState<Product[]>(DATA);
  const [loading] = useState<boolean>(false);
  const [open, setDialogs] = useState<boolean>(false);
  const [total] = useState<number>(products.length || 0);
  const filtersRef = useRef<FiltersRef>(null);
  const { filters, onSortingChange, onPageChange, onPageSizeChange, onSearch } = useFilters();

  const handleResetFilters = () => {
    filtersRef.current?.reset();
  };

  const handleSubmitFilters = () => {
    filtersRef.current?.submit();
  };
  const handleSelect = () => {
    setDialogs(!open);
  };
  const handleReset = () => {
    setDialogs(false);
  };

  const { columns } = useTableColumns({
    pageNumber: filters.pageNumber,
    pageSize: filters.pageSize,
  });

  return (
    <ProTable<any>
      title='Danh sách sản phẩm'
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
          <ActionButton
            onClick={handleSelect}
            iconPosition='end'
            actionType='expand'
            color='success'
          >
            {t('Thêm mới')}
          </ActionButton>
          <ProMenu
            position='right'
            items={[
              {
                label: 'Xuất Excel',
                value: 1,
                actionType: 'excel',
              },
              {
                label: 'Thiết lập tài khoản mặc định',
                value: 2,
                actionType: 'edit',
              },
            ]}
          >
            <ActionButton iconPosition='end' actionType='expand' color='info'>
              {t('Thao tác')}
            </ActionButton>
          </ProMenu>
          <Dialog open={open} scroll='body' fullWidth>
            <DialogHeader title={t('Thêm tài khoản kế toán')} />
            <DialogForm>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <ProFormLabel required title={t('Loại tài khoản')} name='name' gutterBottom />
                  </Grid>
                  <Grid item xs={12} sm={6} md={9}>
                    <TextField
                      placeholder='-Loại tài khoản-'
                      id='outlined-basic'
                      variant='outlined'
                    />{' '}
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <ProFormLabel required title={t('Cửa hàng')} name='name' gutterBottom />
                  </Grid>
                  <Grid item xs={12} sm={6} md={9}>
                    <TextField placeholder='-Cửa hàng-' id='outlined-basic' variant='outlined' />{' '}
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <ProFormLabel required title={t('Tài khoản cha')} name='name' gutterBottom />
                  </Grid>
                  <Grid item xs={12} sm={6} md={9}>
                    <TextField id='outlined-basic' variant='outlined' />{' '}
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <ProFormLabel required title={t('Mã tài khoản')} name='name' gutterBottom />
                  </Grid>
                  <Grid item xs={12} sm={6} md={9}>
                    <TextField id='outlined-basic' variant='outlined' />{' '}
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <ProFormLabel required title={t('Tên')} name='name' gutterBottom />
                  </Grid>
                  <Grid item xs={12} sm={6} md={9}>
                    <TextField id='outlined-basic' variant='outlined' />{' '}
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <ProFormLabel required title={t('Trạng thái')} name='name' gutterBottom />
                  </Grid>
                  <Grid item xs={12} sm={6} md={9}>
                    <TextField placeholder='Kích Hoạt' id='outlined-basic' variant='outlined' />{' '}
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogFooter>
                <LoadingButton startIcon={<SaveIcon />} onClick={handleReset}>
                  {t('Lưu')}
                </LoadingButton>
                <Button variant='outlined' startIcon={<CloseIcon />} onClick={handleReset}>
                  {t('Đóng')}
                </Button>
              </DialogFooter>
            </DialogForm>
          </Dialog>
        </Fragment>
      }
    />
  );
};

export default AccountTable;
