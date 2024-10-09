import { yupResolver } from '@hookform/resolvers/yup';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import InfoIcon from '@mui/icons-material/Info';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import {
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import PageBreadcrumbs from 'components/PageBreadcrumbs';
import PageWrapper from 'components/PageWrapper';
import ActionButton from 'components/ProButton/ActionButton';
import ProForm from 'components/ProForm';
import ProFormSelect from 'components/ProForm/Label/ProFormSelect';
import ProFormContent from 'components/ProForm/ProFormContent';
import ProFormDate from 'components/ProForm/ProFormDate';
import ProFormLabel from 'components/ProForm/ProFormLabel';
import ProFormRadio from 'components/ProForm/ProFormRadio';
import ProFormTextField from 'components/ProForm/ProFormTextField';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Validation from 'utils/Validation';
import { NumberInput } from '../../../../plugins/NumberFormat';
import AddNewSupplier from './AddNewSupplier';
import BillTable from './ExportBillTable';
import { IImportExport } from './utils/types';

const schema = Validation.shape({
  warehouse: Validation.select(1),
  abc: Validation.select(2),
  acv: Validation.select(1),
  hgf: Validation.select(1),
  unit: Validation.select(1),
  unit234: Validation.select(1),
  taikhoan: Validation.select(1),
  taikhoan2: Validation.select(1),
  company: Validation.select(1),
});

const ExportBill = () => {
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

  const [toggleVAT, setToggleVAT] = useState<Boolean>(false);
  const [isOpenDialogInfo, setOpenDialogInfo] = useState<boolean>(false);
  const handleToggleDialog = () => {
    setOpenDialogInfo((prev) => !prev);
  };
  const handleToggleVAT = () => {
    setToggleVAT((prev) => !prev);
  };

  return (
    <PageWrapper title={'Thêm phiếu xuất'}>
      <PageBreadcrumbs
        title={'Thêm phiếu xuất'}
        items={[
          { link: '/inventory', text: 'Kho hàng' },
          { link: '/inventory', text: 'Xuất nhập kho' },
        ]}
      />
      <ProForm form={form} onFinish={handleSubmit}>
        <div
          style={{
            marginTop: '10px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateAreas:
              '"left right" "mid mid" "bot bot" "divider divider" "note note"',
            columnGap: '20px',
            rowGap: '10px',
          }}
        >
          <Stack
            direction={'column'}
            sx={{ gridArea: 'left', minHeight: '100%' }}
          >
            <ProFormContent sx={{ minHeight: '100%' }}>
              <Paper sx={{ p: 2, minHeight: '100%' }}>
                <Box sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
                  <InfoIcon />
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 'medium', marginLeft: '4px' }}
                  >
                    {'Thông tin'}
                  </Typography>
                </Box>
                <Divider />
                <Grid container spacing={2} marginTop={1} marginBottom={1}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <ProFormLabel title={'Kho hàng'} name="warehouse" />
                    <ProFormSelect
                      name="warehouse"
                      options={[{ value: 1, label: '1234234234ss' }]}
                      placeholder={'Kho hàng'}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <ProFormLabel title={'Loại phiếu xuất'} name="abc" />
                    <ProFormSelect
                      name="abc"
                      options={[
                        { value: 1, label: 'Nhà cung cấp' },
                        { value: 2, label: 'Khác' },
                      ]}
                      placeholder={'Loại trả hàng'}
                    />
                  </Grid>
                  {getTypeImport === 2 ? (
                    <>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <ProFormLabel title={'Khách hàng'} name="customer" />
                        <ProFormTextField
                          name="customer"
                          placeholder={'Khách hàng'}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <ProFormLabel title={'Số điện thoại'} name="mobile" />
                        <ProFormTextField
                          name="mobile"
                          placeholder={'Số điện thoại'}
                        />
                      </Grid>
                    </>
                  ) : null}
                  {getTypeImport === 1 ? (
                    <>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <ProFormLabel title={'Nhà cung cấp'} name="acv" />
                        <Stack>
                          <ProFormSelect
                            name="acv"
                            options={[{ value: 1, label: '123' }]}
                            placeholder={'Nhà cung cấp'}
                          />
                          <ActionButton
                            actionType="add"
                            onClick={handleToggleDialog}
                          />
                        </Stack>
                      </Grid>
                    </>
                  ) : null}
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <ProFormLabel title={'Ghi chú'} name="note" />
                    <ProFormTextField
                      name="note"
                      placeholder={'Ghi chú'}
                      rows={4}
                      multiline
                    />
                  </Grid>
                </Grid>
              </Paper>
            </ProFormContent>
          </Stack>
          <Stack direction={'column'} sx={{ gridArea: 'right' }}>
            <ProFormContent>
              <Paper sx={{ p: 2 }}>
                <Box
                  sx={{
                    p: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CreditCardIcon />
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 'medium', marginLeft: '4px' }}
                    >
                      {'Thanh toán'}
                    </Typography>
                  </Box>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      opacity: '0.5',
                    }}
                    onClick={handleToggleVAT}
                  >
                    VAT
                    {toggleVAT ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                  </div>
                </Box>
                <Divider />
                <Grid container spacing={2} marginTop={1} marginBottom={1}>
                  {toggleVAT && (
                    <>
                      <Grid item container xs={12} sm={12} md={12} lg={12}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <ProFormLabel title={'VAT'} name="vat" />
                        </Grid>
                        <Grid item container xs={12} sm={12} md={12} lg={12}>
                          <Grid item xs={2} sm={2} md={2} lg={2}>
                            <ProFormSelect
                              name="unit"
                              options={[
                                { value: 1, label: '%' },
                                { value: 2, label: 'VND' },
                              ]}
                              placeholder={'Đơn vị'}
                            />
                          </Grid>
                          <Grid item xs={10} sm={10} md={10} lg={10}>
                            <ProFormTextField
                              name="amount"
                              placeholder="Số tiền"
                              InputProps={{
                                inputComponent: NumberInput,
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <ProFormLabel title={'Số hóa đơn VAT'} name="poo" />
                        <ProFormTextField
                          name="poo"
                          placeholder={'Số hóa đơn VAT'}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <ProFormLabel title={'Ngày xuất VAT'} name="iii" />
                        <ProFormDate name="date" type="start" />
                      </Grid>
                    </>
                  )}
                  {getTypeImport === 1 ? (
                    <>
                      <Grid item container xs={12} sm={12} md={12} lg={12}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <ProFormLabel title={'Chiết khấu'} name="unit234" />
                        </Grid>
                        <Grid item container xs={12} sm={12} md={12} lg={12}>
                          <Grid item xs={2} sm={2} md={2} lg={2}>
                            <ProFormSelect
                              name="unit234"
                              options={[
                                { value: 1, label: '%' },
                                { value: 2, label: 'VND' },
                              ]}
                              placeholder={'Đơn vị'}
                            />
                          </Grid>
                          <Grid item xs={10} sm={10} md={10} lg={10}>
                            <ProFormTextField
                              name="amount"
                              placeholder="Số tiền"
                              InputProps={{
                                inputComponent: NumberInput,
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </>
                  ) : null}

                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <ProFormLabel title={'Tiền mặt'} name="iiuj" />
                    <ProFormTextField
                      name="amount1"
                      placeholder="Số tiền"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocalAtmIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <ProFormLabel title={'Tài khoản'} name="taikhoan" />
                    <ProFormSelect
                      name="taikhoan"
                      options={[{ value: 1, label: '123' }]}
                      placeholder={'Tài khoản'}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <ProFormLabel title={'Chuyển khoản'} name="bank" />
                    <ProFormTextField
                      name="amount2"
                      placeholder="Số tiền"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocalAtmIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <ProFormLabel title={'Tài khoản'} name="taikhoan2" />
                    <ProFormSelect
                      name="taikhoan2"
                      options={[{ value: 1, label: '123' }]}
                      placeholder={'Tài khoản'}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </ProFormContent>
          </Stack>
          <Box sx={{ gridArea: 'mid', height: '500px', padding: '8px' }}>
            <Grid container spacing={2} marginBottom={2}>
              <Grid item xs={2} sm={2} md={2} lg={2}>
                <ProFormSelect
                  name="company"
                  placeholder={''}
                  options={[
                    { value: 1, label: 'Sản phẩm' },
                    { value: 2, label: 'Nhập theo ri' },
                  ]}
                />
              </Grid>
              <Grid item xs={9} sm={9} md={9} lg={9}>
                <ProFormTextField
                  name="nhapsanpham"
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
          <Stack direction="column" spacing={2} sx={{ gridArea: 'bot' }}>
            <Box sx={{ p: 2 }}>
              <Grid container spacing={2} marginTop={1} marginBottom={1}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <ProFormLabel title={'Sau khi lưu dữ liệu'} name="afterAdd" />
                  <ProFormRadio
                    name="afterAdd"
                    options={[
                      { value: 1, label: 'Tiếp tục thêm' },
                      { value: 2, label: 'Hiển thị danh sách' },
                    ]}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ p: 2 }}>
              <Stack direction="row" spacing={1}>
                <ActionButton actionType="save" type="submit">
                  Lưu
                </ActionButton>
              </Stack>
            </Box>
          </Stack>
          <Divider sx={{ gridArea: 'divider' }} />
          <Box sx={{ gridArea: 'note' }}>
            <Typography sx={{ fontWeight: 'medium' }}>Chú ý:</Typography>
            <ul>
              <li>
                Nếu có chiết khấu theo sản phẩm và cả hóa đơn, thì áp dụng chiết
                khấu theo sản phẩm thay vì cả hóa đơn.
              </li>
              <li>Nên nhập tối đa khoảng 200 sản phẩm / phiếu.</li>
              <li>
                Nếu sản phẩm là loại Sản phẩm theo IMEI, nhập mỗi IMEI trên 1
                dòng. Số dòng IMEI phải bằng với cột Số lượng.
              </li>
              <li>
                Nếu doanh nghiệp có sử dụng module Kế toán, hệ thống sẽ tự động
                tạo 1 phiếu chi nếu có chọn "Tài khoản trả tiền" và điền "Tiền
                đã thanh toán nhập hàng cho hóa đơn này".
              </li>
            </ul>
          </Box>
          {isOpenDialogInfo ? (
            <AddNewSupplier
              open={isOpenDialogInfo}
              onClose={handleToggleDialog}
            />
          ) : null}
        </div>
      </ProForm>
    </PageWrapper>
  );
};

export default ExportBill;
