import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SyncIcon from '@mui/icons-material/Sync';
import { Grid, InputAdornment } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { nanoid } from '@reduxjs/toolkit';
import ProFormTextField from 'components/ProForm/Label/ProFormTextField';
import ProFormCheckboxSelect from 'components/ProForm/ProFormCheckboxSelect';
import ProFormSelect from 'components/ProForm/ProFormSelect';
import { PriceInput } from 'plugins/NumberFormat';
import { useState } from 'react';

interface ICheckShow {
  tienMat: boolean;
  chuyenKhoan: boolean;
  tienKhachDua: boolean;
}

const Payment = () => {
  const [checkShow, setCheckShow] = useState<ICheckShow>({
    tienMat: false,
    chuyenKhoan: false,
    tienKhachDua: false,
  });

  const handleClickShowInput = (type: string) => {
    if (!type) return;
    if (type === 'tienMat') {
      setCheckShow({ ...checkShow, tienMat: !checkShow.tienMat });
      return;
    }
    if (type === 'chuyenKhoan') {
      setCheckShow({ ...checkShow, chuyenKhoan: !checkShow.chuyenKhoan });
    }
  };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px 15px',
        }}
      >
        <Box sx={{ display: 'flex', fontSize: '17px', fontWeight: 'bold' }}>
          Tổng tiền hàng
        </Box>
        <Box sx={{ display: 'flex', fontSize: '21px', color: 'red' }}>
          870.000
        </Box>
      </Box>
      <Box>
        <Divider />
      </Box>
      <Box sx={{ padding: '15px' }}>
        <Grid
          xs={12}
          container
          item
          md={12}
          sx={{ marginBottom: 1, marginTop: 1 }}
          spacing={1}
        >
          <Grid item xs={3} container alignContent="center">
            Trạng thái
          </Grid>
          <Grid item xs={9}>
            <ProFormSelect
              name="status"
              options={[
                { id: 1, label: 'Trạng thái 1' },
                { id: 2, label: 'Trạng thái 2' },
              ]}
              renderValue={(item) => item.id}
              renderLabel={(item) => item.label}
              placeholder="Trạng thái"
            />
          </Grid>
          {/* chiết khấu */}

          <Grid item xs={3} container alignContent="center">
            Chiết khấu (F6)
          </Grid>
          <Grid item xs={1}>
            <ProFormCheckboxSelect
              name="store"
              placeholder=""
              options={[
                { value: nanoid(), label: 'Bỏ chiết khấu tự động' },
                { value: nanoid(), label: 'Bỏ tính điểm tự động' },
              ]}
            />
          </Grid>
          <Grid item xs={3}>
            <ProFormSelect
              name="unit"
              options={[
                { id: 1, label: '%' },
                { id: 2, label: 'VND' },
              ]}
              renderValue={(item) => item.id}
              renderLabel={(item) => item.label}
              placeholder="Đơn vị"
            />
          </Grid>
          <Grid item xs={5}>
            <ProFormTextField
              name="price"
              placeholder="Chiết khấu"
              InputProps={{
                inputComponent: PriceInput,
                startAdornment: (
                  <InputAdornment position="start">
                    <ArrowForwardIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          {/* coupon */}

          <Grid item xs={3} container alignContent="center">
            Coupon
          </Grid>
          <Grid item xs={9}>
            <ProFormTextField
              name="price"
              placeholder="Chiết khấu"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <SyncIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px 0',
          }}
        >
          <Box sx={{ display: 'flex', fontSize: '17px', fontWeight: 'bold' }}>
            Khách cần trả
          </Box>
          <Typography
            gutterBottom
            variant="subtitle1"
            align="right"
            sx={{
              fontWeight: 'bold',
              fontSize: '21px',
              color: '#038151',
            }}
          >
            870.000
          </Typography>
        </Box>
        <Grid container spacing={2} sx={{ marginBottom: 1 }}>
          <Grid item xs={3} container alignContent="center">
            Tiền mặt(F8)
          </Grid>
          <Grid item xs={9}>
            <ProFormTextField
              name="price"
              placeholder="Tiền mặt"
              InputProps={{
                inputComponent: PriceInput,
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleClickShowInput('tienMat')}
                  >
                    <ArrowForwardIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          {checkShow.tienMat && (
            <>
              <Grid item xs={3}></Grid>
              <Grid item xs={9}>
                <ProFormSelect
                  name="unit"
                  options={[
                    { id: 1, label: '%' },
                    { id: 2, label: 'VND' },
                  ]}
                  renderValue={(item) => item.id}
                  renderLabel={(item) => item.label}
                  placeholder="Quỹ Tiền mặt"
                />
              </Grid>
            </>
          )}
        </Grid>
        <Grid container spacing={2} sx={{ marginBottom: 1 }}>
          {/* Tài khoản ngân hàng */}
          <Grid item xs={3} container alignContent="center">
            Chuyển khoản
          </Grid>
          <Grid item xs={9}>
            <ProFormTextField
              name="price"
              placeholder="Chuyển khoản"
              InputProps={{
                inputComponent: PriceInput,
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleClickShowInput('chuyenKhoan')}
                  >
                    <ArrowForwardIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          {checkShow.chuyenKhoan && (
            <>
              <Grid item xs={3}></Grid>
              <Grid item xs={9}>
                <ProFormSelect
                  name="unit"
                  options={[
                    { id: 1, label: '%' },
                    { id: 2, label: 'VND' },
                  ]}
                  renderValue={(item) => item.id}
                  renderLabel={(item) => item.label}
                  placeholder="Tài khoản ngân hàng"
                />
              </Grid>
            </>
          )}
          {/* <Grid item xs={12}>
              <ProFormTextField
                name="price"
                placeholder="Tiền khách đưa"
                InputProps={{
                  inputComponent: PriceInput,
                  startAdornment: (
                    <InputAdornment position="start" sx={{ cursor: 'pointer' }}>
                      <ArrowForwardIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid> */}
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{ marginBottom: 1, fontSize: '17px', fontWeight: 'bold' }}
        >
          <Grid item xs={12} md={6}>
            Còn thiếu
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              gutterBottom
              variant="subtitle1"
              align="right"
              sx={{ color: 'primary.main', fontSize: '21px' }}
            >
              870.000
            </Typography>
          </Grid>
        </Grid>
        <ProFormTextField
          name="customer"
          placeholder={'Ghi chú'}
          InputLabelProps={{ shrink: true }}
          multiline
          rows={3}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EventNoteIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </>
  );
};

export default Payment;
