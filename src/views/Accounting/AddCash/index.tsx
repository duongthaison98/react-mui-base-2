import { yupResolver } from '@hookform/resolvers/yup';
import PageBreadcrumbs from 'components/PageBreadcrumbs';
import PageWrapper from 'components/PageWrapper';
import ProForm from 'components/ProForm';
import Validation from 'utils/Validation';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { AddCash } from './utils/types';
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
  Typography,
} from '@mui/material';
import ProFormContent from 'components/ProForm/ProFormContent';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ProFormTextField from 'components/ProForm/ProFormTextField';
import ProFormDate from 'components/ProForm/ProFormDate';
import ProFormSelect from 'components/ProForm/ProFormSelect';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ActionButton from 'components/ProButton/ActionButton';
import PrintIcon from '@mui/icons-material/Print';
import { useState } from 'react';
import Numeral from 'utils/Numeral';
import { PriceInput } from 'plugins/NumberFormat';

const validationSchema = yup.object().shape({
  date: Validation.date().optional(),
  objectType: yup.number().nullable().default(null).required(),
  cashAccount: yup.number().nullable().default(null).required(),
  billType: yup.number().nullable().default(null).required(),
  object: Validation.string().optional(),
  documentType: yup.number().nullable().default(null),
  documentId: Validation.string().optional(),
  amount: Validation.string().optional(),
  note: Validation.string().optional(),
});

const AddcashTable = () => {
  const [radioValue, setRadioValue] = useState<string>('1');
  const form = useForm<AddCash>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.getDefault(),
  });

  const handleSubmit = (value: any) => {
    console.log(value);
  };

  const handleChangeRaio = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setRadioValue(value);
  };
  return (
    <PageWrapper title="Thêm phiếu thu chi">
      <PageBreadcrumbs
        title="Thêm phiếu thu chi"
        items={[{ link: '/accounting/cash', text: 'Thu chi' }]}
      />
      <ProForm form={form} onFinish={handleSubmit}>
        <ProFormContent>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={8} md={8} lg={8}>
              <Paper sx={{ p: 2, pb: 5 }}>
                <Stack mb={1.5}>
                  <ErrorOutlineIcon />
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    {'Thông tin'}
                  </Typography>
                </Stack>
                <Divider />
                <Grid container spacing={2} sx={{ mt: 0 }}>
                  <Grid item xs={12} sm={12} lg={12}>
                    <Typography variant="subtitle2">
                      Hiện khách hàng đang nợ:{' '}
                      <span style={{ color: 'red' }}>0</span>
                    </Typography>
                    <Typography variant="subtitle2">
                      Sau khi thêm phiếu sẽ nợ Khách hàng:{' '}
                      <span style={{ color: 'red' }}>
                        {Numeral.price(form.watch('amount')) || 0}
                      </span>
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={12} lg={6}>
                    <ProFormDate
                      name="date"
                      DatePickerProps={{ label: 'Ngày thu chi' }}
                      type="start"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} lg={6}>
                    <ProFormSelect
                      name="objectType"
                      placeholder="Loại đối tượng"
                      options={[
                        { value: 0, label: '-Loại đối tượng-' },
                        { value: 1, label: 'Khách hàng' },
                        { value: 2, label: 'Nhà cung cấp' },
                      ]}
                      renderLabel={(option) => option.label}
                      renderValue={(option) => option.value}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} lg={6}>
                    <ProFormSelect
                      name="cashAccount"
                      placeholder="Tài khoản tiền mặt"
                      options={[
                        { value: 0, label: '-Tài khoản tiền mặt-' },
                        { value: 1, label: '1111- Tiền mặt Lê Hồng Phong' },
                        { value: 2, label: 'Tiền mặt Cầu Giấy' },
                      ]}
                      renderLabel={(option) => option.label}
                      renderValue={(option) => option.value}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} lg={6}>
                    <ProFormTextField name="object" placeholder="Đối tượng" />
                  </Grid>
                  <Grid item xs={12} sm={12} lg={6}>
                    <ProFormSelect
                      name="billType"
                      placeholder="Loại phiếu"
                      options={[
                        { value: 0, label: '-Loại phiếu-' },
                        { value: 1, label: 'Phiếu thu' },
                        { value: 2, label: 'Phiếu chi' },
                      ]}
                      renderLabel={(option) => option.label}
                      renderValue={(option) => option.value}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} lg={6}>
                    <ProFormSelect
                      name="documentType"
                      placeholder="Loại chứng từ"
                      options={[
                        { value: 0, label: '-Loại chứng từ-' },
                        { value: 1, label: 'Phiếu XNK' },
                        { value: 2, label: 'Đơn hàng' },
                      ]}
                      renderLabel={(option) => option.label}
                      renderValue={(option) => option.value}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} lg={6}>
                    <Button
                      variant="contained"
                      size="medium"
                      component="label"
                      sx={{ height: '100%' }}
                    >
                      Chọn File
                      <input hidden accept="*" type="file" />
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={12} lg={6}>
                    <ProFormTextField
                      name="documentId"
                      placeholder="ID chứng từ"
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <Paper sx={{ p: 2, pb: 5 }}>
                <Stack mb={1.5}>
                  <LocalAtmIcon />
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    {'Thanh toán'}
                  </Typography>
                </Stack>
                <Divider />
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={12} sm={12} lg={12}>
                    <ProFormTextField
                      name="amount"
                      placeholder="Số tiền"
                      InputProps={{
                        inputComponent: PriceInput,
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocalAtmIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} lg={12}>
                    <ProFormTextField
                      name="note"
                      placeholder="Ghi chú"
                      multiline
                      rows={2}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
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
          <FormControl>
            <RadioGroup
              row
              sx={{ mt: 4, mb: 4 }}
              value={radioValue}
              onChange={handleChangeRaio}
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="Tiếp tục thêm phiếu thu chi"
              />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="Về danh sách thu chi"
              />
            </RadioGroup>
          </FormControl>
        </ProFormContent>
        <Stack spacing={2}>
          <ActionButton
            actionType="save"
            variant="contained"
            type="submit"
            sx={{ backgroundColor: '#4CAF50 ' }}
          >
            Lưu
          </ActionButton>
          <Button startIcon={<PrintIcon />} sx={{ backgroundColor: '#2196F3' }}>
            Lưu và In
          </Button>
        </Stack>
      </ProForm>
    </PageWrapper>
  );
};

export default AddcashTable;
