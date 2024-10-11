import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Validation from '@/utils/Validation';
import PageBreadcrumbs from '@/components/PageBreadcrumbs';
import PageWrapper from '@/components/PageWrapper';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ProForm from '@/components/ProForm';
import ProFormContent from '@/components/ProForm/ProFormContent';
import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import AddIcon from '@mui/icons-material/Add';
import ProFormDate from '@/components/ProForm/ProFormDate';
import ProFormSelect from '@/components/ProForm/ProFormSelect';
import ProFormTextField from '@/components/ProForm/ProFormTextField';
import ActionButton from '@/components/ProButton/ActionButton';
import ProTable from '@/components/ProTable';
import useTable from './Table';
import { Box } from '@mui/system';

const DATA = [
  {
    debt: '12',
    got: '12',
    amount: '12',
    documentType: '12',
    document: 'as',
    note: 'as',
  },
  {
    debt: 'as',
    got: 'asd',
    amount: 'asd',
    documentType: 'as',
    document: 'as',
    note: 'asd',
  },
  {
    debt: 'as',
    got: 'as',
    amount: 'as',
    documentType: 'as',
    document: 'as',
    note: 'as',
  },
];

const validationSchema = yup.object().shape({
  date: Validation.date().optional(),
  type: yup.number().nullable().default(null).required(),
});

const TransactionCreate = () => {
  const [radioVal, setRadioVal] = useState<string>('1');

  const { columns } = useTable();

  const form = useForm<any>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.getDefault(),
  });

  const handleSubmit = (val: any) => {
    console.log(val);
  };

  const handleChangeRadio = (_: any, val: string) => {
    setRadioVal(val);
  };

  return (
    <PageWrapper title='Thêm giao dịch'>
      <PageBreadcrumbs
        title='Thêm giao dịch'
        items={[{ link: '/accounting/transaction/index', text: 'Kế toán' }]}
      />
      <ProForm form={form} onFinish={handleSubmit}>
        <ProFormContent>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={8} md={8} lg={8}>
              <Paper sx={{ p: 2, pb: 5 }}>
                <Stack mb={1.5}>
                  <ErrorOutline />
                  <Typography variant='body1' sx={{ fontWeight: 'medium' }}>
                    {'Thông tin giao dịch'}
                  </Typography>
                </Stack>

                <Divider />

                <Grid container spacing={2} mt={2} justifyContent='end'>
                  <Grid item xs={12} sm={12} md={6}>
                    <ProFormDate
                      name='date'
                      DatePickerProps={{ label: 'Ngày thu chi' }}
                      type='start'
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <ProFormSelect
                      name='objectType'
                      placeholder='Loại đối tượng'
                      options={[
                        { value: 0, label: '-Loại đối tượng-' },
                        { value: 1, label: 'Khách hàng' },
                        { value: 2, label: 'Nhà cung cấp' },
                      ]}
                      renderLabel={(opt) => opt.label}
                      renderValue={(opt) => opt.value}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <ProFormSelect
                      name='type'
                      placeholder='Loại phiếu'
                      options={[
                        { value: 0, label: '-Loại phiếu-' },
                        { value: 1, label: 'Phiếu thu' },
                        { value: 2, label: 'Phiếu chi' },
                      ]}
                      renderLabel={(opt) => opt.label}
                      renderValue={(opt) => opt.value}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <ProFormTextField name='object' placeholder='Đối tượng' />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <ProFormTextField name='document' placeholder='Chứng từ ngoài' />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <Paper sx={{ p: 2, pb: 5 }}>
                <Stack mb={1.5}>
                  <PriorityHighIcon />
                  <Typography variant='body1' sx={{ fontWeight: 'medium' }}>
                    {'Thông tin thêm'}
                  </Typography>
                </Stack>

                <Divider />

                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Stack direction='row'>
                      <TextField />
                      <Button variant='contained' size='medium' component='label'>
                        File
                        <input hidden accept='*' type='file' />
                      </Button>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <ProFormTextField
                      name='note'
                      placeholder='Ghi chú'
                      multiline
                      rows='auto'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <ChatBubbleIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>

          {/* fix Table */}

          <Box mt={2} height={300}>
            <ProTable title='Phiên giao dịch' loading={false} columns={columns} data={DATA} />
          </Box>

          <FormControl>
            <RadioGroup row sx={{ mt: 4, mb: 4 }} value={radioVal} onChange={handleChangeRadio}>
              <FormControlLabel value='1' control={<Radio />} label='Tiếp tục thêm giao dịch' />
              <FormControlLabel value='2' control={<Radio />} label='Danh sách giao dịch' />
            </RadioGroup>
          </FormControl>
        </ProFormContent>

        <Stack spacing={2}>
          <ActionButton actionType='save' sx={{ backgroundColor: '#4CAF50 ' }}>
            Lưu
          </ActionButton>
          <Button startIcon={<AddIcon />} sx={{ backgroundColor: '#2196F3' }}>
            Thêm dòng
          </Button>
        </Stack>
      </ProForm>
    </PageWrapper>
  );
};

export default TransactionCreate;
