import { yupResolver } from '@hookform/resolvers/yup';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import PageBreadcrumbs from '@/components/PageBreadcrumbs';
import PageWrapper from '@/components/PageWrapper';
import ActionButton from '@/components/ProButton/ActionButton';
import ProForm from '@/components/ProForm';
import ProFormSelect from '@/components/ProForm/Label/ProFormSelect';
import ProFormContent from '@/components/ProForm/ProFormContent';
import ProFormLabel from '@/components/ProForm/ProFormLabel';
import ProFormTextField from '@/components/ProForm/ProFormTextField';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Validation from '@/utils/Validation';
import BillTable from './ImportBillTable';
import { IImportExport } from './utils/types';
import StorefrontIcon from '@mui/icons-material/Storefront';
const schema = Validation.shape({
  warehouse: Validation.select(1),
  abc: Validation.select(1),
  acv: Validation.select(1),
  hgf: Validation.select(1),
  unit: Validation.select(1),
  unit234: Validation.select(1),
  taikhoan: Validation.select(1),
  taikhoan2: Validation.select(1),
  company: Validation.select(1),
});

const ImportBill = () => {
  const [radioValue, setRadioValue] = useState<string>('1');
  const form = useForm<IImportExport>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });
  const handleSubmit = (data: any) => {
    console.log(data);
  };

  const getTypeImport = form.watch('abc');
  console.log(getTypeImport);

  const handleChangeRaio = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setRadioValue(value);
  };
  return (
    <PageWrapper title={'Thêm phiếu chuyển kho nháp'}>
      <PageBreadcrumbs
        title={'Thêm phiếu chuyển kho nháp'}
        items={[
          { link: '/warehouse', text: 'Chuyển kho nháp' },
          { link: '/warehouse', text: 'Danh sách chuyển kho nháp' },
        ]}
      />
      <ProForm form={form} onFinish={handleSubmit}>
        <div
          style={{
            marginTop: '10px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateAreas: '"left right" "mid mid" "bot bot" "divider divider" "note note"',
            columnGap: '20px',
            rowGap: '10px',
          }}
        >
          <Stack direction={'column'} sx={{ gridArea: 'left', minHeight: '100%' }}>
            <ProFormContent>
              <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, pb: 5 }}>
                    <Stack mb={1.5}>
                      <StorefrontIcon />
                      <Typography variant='body1' sx={{ fontWeight: 'medium' }}>
                        {'Kho hàng'}
                      </Typography>
                    </Stack>
                    <Divider />
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                      <Grid item xs={12} sm={12} lg={3}>
                        <ProFormLabel title={'Từ kho:'} required name='warehouse' />
                      </Grid>
                      <Grid item xs={12} sm={12} lg={9}>
                        <ProFormSelect
                          name='objectType'
                          placeholder='Từ kho hàng'
                          options={[
                            { value: 0, label: 'Hà Nội' },
                            { value: 1, label: 'Hải phòng' },
                            { value: 2, label: 'Bắc giang' },
                            { value: 2, label: 'Bắc hải' },
                            { value: 2, label: 'Quảng ninh' },
                            { value: 2, label: 'Sài gòn' },
                          ]}
                          renderLabel={(option) => option.label}
                          renderValue={(option) => option.value}
                        />
                      </Grid>
                      <Divider />
                      <Grid item xs={12} sm={12} lg={3}>
                        <ProFormLabel title={'Từ kho:'} required name='warehouse' />
                      </Grid>
                      <Grid item xs={12} sm={12} lg={9}>
                        <ProFormSelect
                          name='move'
                          placeholder='Đến kho hàng'
                          options={[
                            { value: 0, label: 'Ninh Bình' },
                            { value: 1, label: 'Sóc Sơn' },
                            { value: 2, label: 'Yên bái' },
                            { value: 2, label: 'Lào cai' },
                            { value: 2, label: 'Hải Dương' },
                            { value: 2, label: 'Ninh Thuận' },
                          ]}
                          renderLabel={(option) => option.label}
                          renderValue={(option) => option.value}
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={6}></Grid>
              </Grid>
            </ProFormContent>
          </Stack>
          <Stack direction={'column'} sx={{ gridArea: 'right', marginTop: '24px' }}>
            <ProFormContent>
              <Paper sx={{ p: 2, pb: 5 }}>
                <Stack mb={1.5}>
                  <InfoIcon />
                  <Typography variant='body1' sx={{ fontWeight: 'medium' }}>
                    {'Thông tin'}
                  </Typography>
                </Stack>
                <Divider />
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={12} sm={12} lg={3}>
                    <ProFormLabel title={'Ghi chú'} name='note' />
                  </Grid>
                  <Grid item xs={12} sm={12} lg={9}>
                    <ProFormTextField name='note' placeholder='Ghi chú' multiline rows={2} />
                  </Grid>

                  <Grid item xs={12} sm={12} lg={3}>
                    <ProFormLabel title={'Chọn File'} name='note' />
                  </Grid>
                  <Grid item xs={12} sm={12} lg={9}>
                    <Button
                      variant='contained'
                      size='medium'
                      component='label'
                      sx={{ height: '100%' }}
                    >
                      Chọn File
                      <input hidden accept='*' type='file' />
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </ProFormContent>
          </Stack>
          <Box sx={{ gridArea: 'mid', height: '500px', padding: '8px' }}>
            <Grid container spacing={2} marginBottom={2}>
              <Grid item xs={2} sm={2} md={2} lg={2}>
                <ProFormSelect
                  name='company'
                  placeholder={''}
                  options={[
                    { value: 1, label: 'Sản phẩm' },
                    { value: 2, label: 'Nhập theo Imei' },
                  ]}
                />
              </Grid>
              <Grid item xs={9} sm={9} md={9} lg={9}>
                <ProFormTextField
                  name='nhapsanpham'
                  placeholder={''}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={1} sm={1} md={1} lg={1}>
                <Button>
                  <AddIcon />
                </Button>
              </Grid>
            </Grid>
            <BillTable />
          </Box>
          <Stack direction='column' spacing={2} sx={{ gridArea: 'bot' }}>
            <Box sx={{ p: 2 }}>
              <Grid container spacing={2} marginTop={1} marginBottom={1}>
                <FormControl>
                  <RadioGroup
                    row
                    sx={{ mt: 4, mb: 4 }}
                    value={radioValue}
                    onChange={handleChangeRaio}
                  >
                    <FormControlLabel
                      value='1'
                      control={<Radio />}
                      label='Xem chi tiết phiếu chuyển kho
                '
                    />
                    <FormControlLabel
                      value='2'
                      control={<Radio />}
                      label='Tiếp tục lập phiếu chuyển kho'
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Box>
            <Box sx={{ p: 2 }}>
              <Stack direction='row' spacing={1}>
                <ActionButton actionType='save' type='submit'>
                  Lưu
                </ActionButton>
              </Stack>
            </Box>
          </Stack>
          <Divider sx={{ gridArea: 'divider' }} />
        </div>
      </ProForm>
    </PageWrapper>
  );
};

export default ImportBill;
