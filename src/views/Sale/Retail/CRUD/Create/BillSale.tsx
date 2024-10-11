import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Switch, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import DropdownCustom from '@/components/DropdownCustom';
import ActionButton from '@/components/ProButton/ActionButton';
import ProForm from '@/components/ProForm';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Validation from '@/utils/Validation';
import Customer from './components/Customer';
import Delivery from './components/Delivery';
import Payment from './components/Payment';
import ProductTable from './components/ProductTable';

interface IForm {}
const schema = Validation.shape({});

const BillSale = () => {
  // const { t } = useTranslation();
  const form = useForm<IForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });
  const [openSwitch, setOpenSwitch] = useState<boolean>(false);

  const handleSubmit = () => {};
  return (
    <ProForm form={form} onFinish={handleSubmit} PaperProps={{ sx: { p: 2 } }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <ProductTable />
          <Box sx={{ my: 2 }}>
            <Typography gutterBottom variant='subtitle2' sx={{ color: '#2196f3' }}>
              Lịch sử mua hàng
            </Typography>
          </Box>
          <Customer />
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              border: '1px solid #E6E8F0',
              marginBottom: '10px',
            }}
          >
            <Payment />
          </Box>
          <Box
            sx={{
              border: '1px solid #E6E8F0',
              marginBottom: '10px',
            }}
          >
            <Delivery />
          </Box>
          <Box sx={{ marginBottom: 2, textAlign: 'right' }}>
            <ActionButton type='submit' iconPosition='start' color='success' actionType='save'>
              Lưu (F9)
            </ActionButton>
            <DropdownCustom
              open={openSwitch}
              setOpen={() => setOpenSwitch(!openSwitch)}
              actionType='arrowDown'
            >
              <>
                <Switch defaultChecked color='info' />
                Tự động in sau khi lưu hóa đơn (F10)
              </>
            </DropdownCustom>
          </Box>
        </Grid>
      </Grid>
    </ProForm>
  );
};

export default BillSale;
