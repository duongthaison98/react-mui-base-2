import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import ProForm from 'components/ProForm';
import ProFormSelect from 'components/ProForm/Label/ProFormSelect';
import ProFormTextField from 'components/ProForm/Label/ProFormTextField';
import ProFormHiddenInput from 'components/ProForm/ProFormHiddenInput';
import { forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { FiltersRef } from 'types/refs';
import Validation from 'utils/Validation';
import type { FilterParams } from './utils/filters';
import DateTime from 'utils/DateTime';
import ProFormCheckboxSelect from 'components/ProForm/ProFormCheckboxSelect';

interface FilterValues {
  id: string;
  product: string;
  inventory: number;
  category: number;
  internalCategory: number;
  type: number;
  provider: string;

  startDate: Date | null;
  endDate: Date | null;
}

const schema = Validation.shape({
  id: Validation.string().optional(),
  product: Validation.string().optional(),
  inventory: Validation.select(0),
  category: Validation.select(0),
  internalCategory: Validation.select(0),
  type: Validation.select(0),
  provider: Validation.string().optional(),
  startDate: Validation.date().optional(),
  endDate: Validation.date().optional(),
  status: Validation.select(0),
});

interface Props {
  onSearch: (params: Partial<FilterParams>) => void;
}

const FiltersForm = forwardRef<FiltersRef, Props>((props, ref) => {
  const { onSearch } = props;
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
      startDate: DateTime.Format(startDate),
      endDate: DateTime.Format(endDate),
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
    <ProForm
      form={form}
      onFinish={handleSubmit}
      PaperProps={{ sx: { padding: '16px 16px 0 16px' } }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3} lg={0.5}>
          <ProFormTextField
            name="id"
            placeholder={t('ID')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1.5}>
          <ProFormTextField
            name="product"
            placeholder={t('Sản phẩm')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <ProFormCheckboxSelect
            name="store"
            placeholder={t('Chọn cửa hàng')}
            options={[
              { value: 1, label: 'Linh kiện Sài Gòn' },
              { value: 2, label: 'HN-1' },
            ]}
            renderLabel={(option) => option.label}
            renderValue={(option) => option.value}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <ProFormSelect
            name="inventory"
            placeholder={t('Chọn hàng tồn')}
            options={[
              { value: 0, label: 'Tất cả' },
              { value: 1, label: 'Còn tồn' },
              { value: 2, label: 'Còn có thể bán' },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <ProFormSelect
            name="category"
            placeholder={t('Danh mục')}
            options={[
              { value: 0, label: '-Danh mục-' },
              { value: 1, label: 'Tuvit' },
              { value: 2, label: 'Pin' },
              { value: 3, label: 'Vỏ' },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <ProFormSelect
            name="status"
            placeholder={t('Trạng thái')}
            options={[
              { value: 0, label: '-Trạng Thái-' },
              { value: 1, label: 'Mới' },
              { value: 2, label: 'Đang bán' },
              { value: 3, label: 'Hết hàng' },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2} lg={0.5}>
          <Button type="submit" size="medium">
            Lọc
          </Button>
        </Grid>
      </Grid>
      <ProFormHiddenInput />
    </ProForm>
  );
});

export default FiltersForm;
