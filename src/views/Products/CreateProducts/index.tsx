import Image from '@/components/Image';
import PageBreadcrumbs from '@/components/PageBreadcrumbs';
import PageWrapper from '@/components/PageWrapper';
import ActionButton from '@/components/ProButton/ActionButton';
import ProForm from '@/components/ProForm';
import ProFormSelect from '@/components/ProForm/Label/ProFormSelect';
import ProFormContent from '@/components/ProForm/ProFormContent';
import ProFormLabel from '@/components/ProForm/ProFormLabel';
import ProFormRadio from '@/components/ProForm/ProFormRadio';
import ProFormTextField from '@/components/ProForm/ProFormTextField';
import UploadInput from '@/components/UploadInput';
import { NumberInput } from '@/plugins/NumberFormat';
import Validation from '@/utils/Validation';
import { yupResolver } from '@hookform/resolvers/yup';
import AddIcon from '@mui/icons-material/Add';
import { Button, Grid, Stack } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AddNewCategory from './AddNewCategory';

const schema = Validation.shape({
  warehouse: Validation.select(1),
  trangThai: Validation.select(1),
  danhMuc: Validation.select(1),
});

interface IForm {
  warehouse: number;
  trangThai: number;
  danhMuc: number;
}

const CreateProducts = () => {
  const form = useForm<IForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });
  const handleSubmit = (data: IForm) => {
    console.log(data);
  };

  const getTypeImport = form.watch('warehouse');
  console.log(getTypeImport);

  const [isOpenDialogInfo, setOpenDialogInfo] = useState<boolean>(false);
  const handleToggleDialog = () => {
    setOpenDialogInfo((prev) => !prev);
  };

  const [selectedFileImage, setSelectedFileImage] = useState<any>();
  const [previewImage, setPreviewImage] = useState<any>();

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFileImage) {
      setPreviewImage(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFileImage);
    setPreviewImage(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFileImage]);

  const onSelectFileImage = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFileImage(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFileImage(e.target.files[0]);
  };

  return (
    <PageWrapper title={'Thêm sản phẩm'}>
      <PageBreadcrumbs title={'Thêm sản phẩm'} items={[{ link: '/products', text: 'Sản phẩm' }]} />
      <ProForm form={form} onFinish={handleSubmit}>
        <div
          style={{
            marginTop: '10px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateAreas: '"left right" "bot bot"',
            columnGap: '20px',
            rowGap: '10px',
          }}
        >
          <Stack direction={'column'} sx={{ gridArea: 'left', minHeight: '100%' }}>
            <ProFormContent sx={{ minHeight: '100%' }}>
              <Paper sx={{ p: 2, minHeight: '100%' }}>
                <Grid container spacing={2} marginBottom={1}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <ProFormLabel title={'Tên'} name='ten' />
                    <ProFormTextField name='ten' />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    {/* <ProFormLabel title={'Loại'} name='warehouse' /> */}
                    <ProFormSelect
                      name='warehouse'
                      label='Loại'
                      placeholder=''
                      options={[
                        { value: 1, label: 'Sản phẩm' },
                        { value: 2, label: 'Voucher' },
                        { value: 3, label: 'Sản phẩm cân đo' },
                        { value: 4, label: 'Sản phẩm theo IMEI' },
                        { value: 5, label: 'Gói sản phẩm' },
                        { value: 6, label: 'Dịch vụ' },
                        { value: 7, label: 'Dụng cụ' },
                        { value: 8, label: 'Sản phẩm bán theo lô' },
                        { value: 9, label: 'Combo' },
                        { value: 10, label: 'Sản phẩm nhiều đơn vị tính' },
                      ]}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <ProFormLabel title={'Tỷ lệ'} name='tyle' />
                    <ProFormTextField name='tyle' />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <ProFormLabel title={'Mã'} name='ma' />
                    <ProFormTextField name='ma' />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <ProFormLabel title={'Mã vạch'} name='maVach' />
                    <ProFormTextField name='maVach' />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <ProFormLabel title={'Giá bán'} name='giaBan' />
                    <ProFormTextField
                      name='giaBan'
                      InputProps={{
                        inputComponent: NumberInput,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <ProFormLabel title={'Giá sỉ'} name='giaSi' />
                    <ProFormTextField
                      name='giaSi'
                      InputProps={{
                        inputComponent: NumberInput,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <ProFormLabel title={'Giá cũ'} name='giaCu' />
                    <ProFormTextField
                      name='giaCu'
                      InputProps={{
                        inputComponent: NumberInput,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <ProFormLabel title={'Giá spa'} name='giaSpa' />
                    <ProFormTextField
                      name='giaSpa'
                      InputProps={{
                        inputComponent: NumberInput,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <ProFormLabel title={'Trạng thái'} name='trangThai' />
                    <ProFormSelect
                      name='trangThai'
                      placeholder=''
                      options={[
                        { value: 1, label: 'Mới' },
                        { value: 2, label: 'Đang bán' },
                        { value: 3, label: 'Ngừng bán' },
                        { value: 4, label: 'Hết hàng' },
                      ]}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </ProFormContent>
          </Stack>
          <Stack direction={'column'} sx={{ gridArea: 'right' }}>
            <ProFormContent>
              <Paper sx={{ p: 2 }}>
                <Grid container spacing={2} marginBottom={1}>
                  <Grid item container xs={12} sm={12} md={12} lg={12}>
                    <Grid item container xs={12} sm={12} md={12} lg={12} spacing={2}>
                      <Grid item xs={10} sm={10} md={10} lg={10}>
                        <ProFormSelect
                          name='danhMuc'
                          label='Danh mục'
                          options={[
                            { value: 1, label: '- Danh mục -' },
                            { value: 2, label: 'Tuavit' },
                            { value: 3, label: 'Pin' },
                          ]}
                          placeholder=''
                        />
                      </Grid>
                      <Grid item xs={2} sm={2} md={2} lg={2}>
                        <Button onClick={handleToggleDialog}>
                          <AddIcon />
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <ProFormLabel title={'Đơn vị tính'} name='donViTinh' />
                    <ProFormTextField name='donViTinh' placeholder='VD: cái, hộp, chiếc, lon' />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <ProFormLabel title={'Ảnh'} name='name' />
                    <Button variant='contained' component='label'>
                      Upload
                      <UploadInput accept='image/*' onChange={onSelectFileImage} />
                    </Button>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    {selectedFileImage && (
                      <Image
                        src={previewImage}
                        sx={{
                          width: '150px',
                          height: '150px',
                          objectFit: 'cover',
                        }}
                      />
                    )}
                  </Grid>
                </Grid>
              </Paper>
            </ProFormContent>
          </Stack>
          <Stack direction='column' spacing={2} sx={{ gridArea: 'bot' }}>
            <Grid container spacing={2} marginTop={1} marginBottom={1}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <ProFormRadio
                  name='afterAdd'
                  options={[
                    { value: 1, label: 'Tiếp tục thêm' },
                    { value: 2, label: 'Hiện danh sách sản phẩm' },
                    { value: 3, label: 'In mã vạch sản phẩm' },
                  ]}
                />
              </Grid>
            </Grid>
            <Stack direction='row' spacing={1}>
              <ActionButton actionType='save' type='submit'>
                Lưu
              </ActionButton>
            </Stack>
          </Stack>

          {isOpenDialogInfo ? (
            <AddNewCategory open={isOpenDialogInfo} onClose={handleToggleDialog} />
          ) : null}
        </div>
      </ProForm>
    </PageWrapper>
  );
};

export default CreateProducts;
