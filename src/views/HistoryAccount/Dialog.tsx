import DialogContainer from '@/components/ProDialog/DialogContainer';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { DialogRef } from '@/types/refs';
import DialogContent from '@/components/ProDialog/DialogContent';
import DialogFooter from '@/components/ProDialog/DialogFooter';
import DialogHeader from '@/components/ProDialog/DialogHeader';
import { Box, Button, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

interface Props {}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#ccc',

  padding: theme.spacing(0.3, 5),
  //   textAlign: 'center',

  color: theme.palette.text.primary,
}));

const Dialog = forwardRef<DialogRef, Props>((props, ref) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useImperativeHandle(ref, () => ({
    close: () => {},
    open: handleOpen,
  }));

  return (
    <DialogContainer maxWidth='xl' open={open}>
      <DialogHeader title={'Chi Tiết Log'} />
      <DialogContent>
        <Box>
          <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <Item>{'Array'}</Item>
              <Item>{'('}</Item>
              <Item>{' [date] => 09/02/2023'}</Item>
              <Item>{'[type] => 2 '}</Item>
              <Item>{' [mode] => 2'}</Item>
              <Item>{'  [orderId] => '}</Item>
              <Item>{' [depotId] => 104015'}</Item>
              <Item>{' [requirementBillId] =>'}</Item>
              <Item>{'[relatedDepotId] => '}</Item>
              <Item>{'[storeId] => 101959'}</Item>
              <Item>{' [customerName] =>'}</Item>
              <Item>{'[relatedDepotId] => '}</Item>
              <Item>{' [customerAddress] =>  '}</Item>
              <Item>{'   [customerCityLocationId]  =>'}</Item>
              <Item>{' [customerDistrictLocationId] => '}</Item>
              <Item>{' [customerId] => 105365225 =>'}</Item>
              <Item>{'[storeId] => 101959'}</Item>
              <Item>{' [discount] =>  =>'}</Item>
              <Item>{'[storeId] => 101959'}</Item>
              <Item>{' [customerName] =>'}</Item>
              <Item>{' [installmentMoney] =>'}</Item>
              <Item>{'  [cash] => '}</Item>
              <Item>{' [installmentMoney] =>'}</Item>

              <Item>{')'}</Item>
            </Grid>
            <Grid item xs={6}>
              <Item>{'Array'}</Item>
              <Item>{'('}</Item>
              <Item>{' [date] => 09/02/2023'}</Item>
              <Item>{'[type] => 2 '}</Item>
              <Item>{' [mode] => 2'}</Item>
              <Item>{'  [orderId] => '}</Item>
              <Item>{' [depotId] => 104015'}</Item>
              <Item>{' [requirementBillId] =>'}</Item>
              <Item>{'[relatedDepotId] => '}</Item>
              <Item>{'[storeId] => 101959'}</Item>
              <Item>{' [customerName] =>'}</Item>
              <Item>{'[relatedDepotId] => '}</Item>
              <Item>{' [customerAddress] =>  '}</Item>
              <Item>{'   [customerCityLocationId]  =>'}</Item>
              <Item>{' [customerDistrictLocationId] => '}</Item>
              <Item>{' [customerId] => 105365225 =>'}</Item>

              <Item>{'  [creditAccountId] => '}</Item>
              <Item>{')'}</Item>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogFooter>
        <Button variant='outlined' startIcon={<CloseIcon />} onClick={handleClose}>
          {'Hủy bỏ'}
        </Button>
      </DialogFooter>
    </DialogContainer>
  );
});

export default Dialog;
