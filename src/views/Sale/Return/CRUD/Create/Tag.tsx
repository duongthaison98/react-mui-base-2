// import { yupResolver } from '@hookform/resolvers/yup';
import MoneyIcon from '@mui/icons-material/Money';
import ReplyIcon from '@mui/icons-material/Reply';
import { Checkbox, Grid, InputAdornment, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ProFormTextField from '@/components/ProForm/Label/ProFormTextField';
// import { useForm } from 'react-hook-form';
// import Validation from '@/utils/Validation';
// const schema = Validation.shape({
//   name: Validation.string().optional(),
// });

const Tag = () => {
  // const form = useForm<any>({
  //   mode: 'onChange',
  //   resolver: yupResolver(schema),
  //   defaultValues: schema.getDefault(),
  // });

  // const handleSubmit = (values: any) => {};

  return (
    <Box
      sx={{
        border: '1px solid #E6E8F0',
        marginBottom: '10px',
      }}
    >
      <Grid container justifyContent='space-between' sx={{ padding: '10px 15px' }}>
        <Box sx={{ display: 'flex' }}>
          <MoneyIcon />
          <span
            style={{
              fontWeight: 'bold',
              display: 'inline-block',
              marginLeft: '10px',
            }}
          >
            Tổng Trả
          </span>
        </Box>
        <Typography gutterBottom variant='subtitle2' align='right' sx={{ color: 'primary.main' }}>
          0
        </Typography>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Checkbox /> Đổi trả ngang
        </Grid>
      </Grid>
      <Box>
        <Divider />
      </Box>

      <Box sx={{ padding: '10px 15px' }}>
        <ProFormTextField
          sx={{ marginBottom: 1 }}
          name='customer'
          placeholder={'Phí trả hàng'}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <ReplyIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Grid container justifyContent='space-between' sx={{ padding: '0 10px' }}>
        <Box sx={{ display: 'flex' }}>
          <span
            style={{
              fontWeight: 'bold',
              display: 'inline-block',
              marginLeft: '10px',
            }}
          >
            Trả lại khách
          </span>
        </Box>
        <Typography gutterBottom variant='subtitle2' align='right' sx={{ color: 'primary.main' }}>
          0
        </Typography>
      </Grid>
    </Box>
  );
};

export default Tag;
