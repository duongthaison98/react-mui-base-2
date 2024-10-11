import PersonIcon from '@mui/icons-material/Person';
import { Grid, InputAdornment } from '@mui/material';
import Box from '@mui/material/Box';
import ProFormTextField from '@/components/ProForm/Label/ProFormTextField';
import ProFormAutocomplete from '@/components/ProForm/ProFormAutocomplete';
const Information = () => {
  return (
    <Box
      sx={{
        border: '1px solid #E6E8F0',
        marginBottom: '10px',
      }}
    >
      {/* <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px 15px',
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <ErrorOutlineOutlinedIcon />
          <span
            style={{
              fontWeight: 'bold',
              display: 'inline-block',
              marginLeft: '10px',
            }}
          >
            Thông tin
          </span>
        </Box>
      </Box>
      <Box>
        <Divider />
      </Box> */}
      <Box sx={{ padding: '15px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <ProFormAutocomplete
              name='store'
              placeholder='Cửa hàng'
              options={[
                { value: 1, label: 'TM' },
                { value: 2, label: 'HN-1' },
                { value: 3, label: 'HN-2' },
                { value: 4, label: 'Sài Gòn' },
                { value: 5, label: 'VTech Thanh Hóa' },
              ]}
              renderLabel={(option) => option.label}
              renderValue={(option) => option.value}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ProFormTextField
              sx={{ marginBottom: 1 }}
              name='customer'
              placeholder={'Nhân viên bán hàng'}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Information;
