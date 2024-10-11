import { yupResolver } from '@hookform/resolvers/yup';
import Grid from '@mui/material/Grid';
import ProDateRange from '@/components/ProDateTime/ProDateRange';
import ProForm from '@/components/ProForm';
import ProFormSelect from '@/components/ProForm/Label/ProFormSelect';
import ProFormTextField from '@/components/ProForm/Label/ProFormTextField';
import ProFormFilterAction from '@/components/ProForm/ProFormFilterAction';
import ProFormHiddenInput from '@/components/ProForm/ProFormHiddenInput';
import { forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FiltersRef } from '@/types/refs';
import Validation from '@/utils/Validation';
import { STATUS } from './utils/constants';
import type { FilterParams } from './utils/filters';

interface FilterValues {
  name: string;
  status: number;
  startDate: Date | null;
  endDate: Date | null;
}

const schema = Validation.shape({
  name: Validation.string().optional(),
  status: Validation.select(STATUS.all),
  startDate: Validation.date().optional(),
  endDate: Validation.date().optional(),
  typeLog: Validation.select(1),
  chaCon: Validation.select(1),
  kieuLog: Validation.select(1),
});

interface Props {
  onSearch: (params: Partial<FilterParams>) => void;
  onSubmit: VoidFunction;
  onClear: VoidFunction;
}

const FiltersForm = forwardRef<FiltersRef, Props>((props, ref) => {
  const { onSearch, onSubmit, onClear } = props;
  const { t } = useTranslation();

  const form = useForm<FilterValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });

  const handleSubmit = (values: FilterValues) => {
    const { startDate, endDate, ...rest } = values;

    onSearch({
      ...rest,
    });
  };

  const handleReset = () => {
    form.reset(schema.getDefault());
  };

  useImperativeHandle(ref, () => ({
    reset: handleReset,
    submit: form.handleSubmit(handleSubmit),
  }));

  return (
    <ProForm form={form} onFinish={handleSubmit} PaperProps={{ sx: { p: 2 } }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <ProDateRange label={t('Từ - Đến')} from='startDate' to='endDate' />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <ProFormTextField
            name='products'
            placeholder={t('Nhập sản phẩm')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <ProFormSelect
            name='typeLog'
            placeholder={t('Chọn loại log')}
            options={[
              { value: 1, label: 'Sửa sản phẩm' },
              { value: 2, label: 'Xóa sản phẩm' },
              { value: 3, label: 'Xóa links sản phẩm' },
              { value: 4, label: 'Thêm hàng lỗi' },
              { value: 5, label: 'Sửa hàng lỗi' },
              { value: 6, label: 'Xóa hàng lỗi' },
              { value: 7, label: 'Thay đổi SL lỗi khi làm phiếu XNK' },
              { value: 8, label: 'Sửa ghi chú hàng lỗi' },
              { value: 9, label: 'Sửa giá chi nhánh' },
              { value: 10, label: 'Xóa tag từ Website Tag' },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <ProFormSelect
            name='kieuLog'
            placeholder={t('Chọn kiểu log')}
            options={[
              { value: 1, label: 'Sửa giá bán' },
              { value: 2, label: 'Sửa giá nhập' },
              { value: 3, label: 'Thay đổi số lượng lỗi' },
              { value: 4, label: 'Sửa sản phẩm Combo' },
              { value: 5, label: 'Sửa đơn vị tính' },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <ProFormSelect
            name='chaCon'
            placeholder={''}
            options={[
              { value: 1, label: 'Sản phẩm cha' },
              { value: 2, label: 'Sản phẩm độc lập' },
              { value: 3, label: 'Sản phẩm con' },
              { value: 4, label: 'Sản phẩm cha + độc lập' },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <ProFormTextField
            name='editor'
            placeholder={t('Nhập người sửa')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <ProFormFilterAction onSubmit={onSubmit} onClear={onClear} />
        </Grid>
      </Grid>
      <ProFormHiddenInput />
    </ProForm>
  );
});

export default FiltersForm;
