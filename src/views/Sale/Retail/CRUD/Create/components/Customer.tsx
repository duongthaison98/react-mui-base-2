import CallIcon from '@mui/icons-material/Call';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import {
  Box,
  Button,
  Collapse,
  Grid,
  InputAdornment,
  Typography,
} from '@mui/material';
import ActionButton from 'components/ProButton/ActionButton';
import ProFormAutocomplete from 'components/ProForm/Label/ProFormAutocomplete';
import ProFormTextField from 'components/ProForm/Label/ProFormTextField';
import ProFormDate from 'components/ProForm/ProFormDate';
import { useState } from 'react';

const Customer = () => {
  const [collapse, setCollapse] = useState<boolean>(true);

  return (
    <Box
      sx={{
        border: '1px solid #E6E8F0',
        marginTop: '10px',
        paddingBottom: 1,
        px: 1,
      }}
    >
      <Grid container spacing={2} sx={{ marginTop: 1 }}>
        <Grid item xs={12} md={1.7}>
          <Box sx={{ display: 'flex', padding: '10px' }}>
            <PersonIcon />
            Khách hàng
          </Box>
        </Grid>
        <Grid item xs={12} md={4.5} container alignContent={'center'}>
          <Grid item xs={2}>
            <Typography
              gutterBottom
              variant="subtitle2"
              sx={{ color: 'primary.main' }}
            >
              GHCN
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography
              gutterBottom
              variant="subtitle2"
              sx={{ color: 'primary.main' }}
            >
              Tổng: 3.700.00
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography gutterBottom variant="subtitle2">
              CN: 0
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography
              gutterBottom
              variant="subtitle2"
              sx={{ color: 'primary.main' }}
            >
              CN cuối: 3.700.00
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} md={2.4}>
          <ProFormAutocomplete
            name="store"
            placeholder="Nhân viên chăm sóc"
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
        <Grid item xs={12} md={2.4}>
          <ProFormAutocomplete
            name="store"
            placeholder="Nhân viên bán hàng"
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
        <Grid item xs={12} md={1}>
          <Button onClick={() => setCollapse(!collapse)} color="inherit">
            <ExpandMoreIcon
              sx={!collapse ? { transform: 'rotate(180deg)' } : null}
            />
          </Button>
        </Grid>
      </Grid>
      <Collapse in={collapse} timeout="auto">
        <Grid container spacing={2} sx={{ marginTop: 1 }}>
          <Grid item xs={12} md={3}>
            <ProFormTextField
              name="name"
              placeholder="Họ tên"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <ProFormTextField
              name="name"
              placeholder="Số điện thoại"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CallIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <ProFormAutocomplete
              name="store"
              placeholder="Thành phố"
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
          <Grid item xs={12} md={3}>
            <ProFormDate name="firstDate" type="start" />
          </Grid>
          <Grid item xs={12} md={3}>
            <ProFormTextField
              name="name"
              placeholder="Địa chỉ"
              multiline
              rows={2}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HomeIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProFormTextField
              name="name"
              placeholder="Ghi chú"
              multiline
              rows={2}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EditIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <ActionButton iconPosition="start" color="info">
              <PersonIcon />
              Lưu thông tin
            </ActionButton>
          </Grid>
        </Grid>
      </Collapse>
    </Box>
  );
};

export default Customer;
