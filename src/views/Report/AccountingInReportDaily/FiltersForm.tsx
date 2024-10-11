import { yupResolver } from '@hookform/resolvers/yup';
import Grid from '@mui/material/Grid';
import { nanoid } from '@reduxjs/toolkit';
import ProDateRange from '@/components/ProDateTime/ProDateRange';
import ProForm from '@/components/ProForm';
import ProFormTextField from '@/components/ProForm/Label/ProFormTextField';
import ProFormCheckboxSelect from '@/components/ProForm/ProFormCheckboxSelect';
import ProFormFilterAction from '@/components/ProForm/ProFormFilterAction';
import ProFormHiddenInput from '@/components/ProForm/ProFormHiddenInput';
import { forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FiltersRef } from '@/types/refs';
import Validation from '@/utils/Validation';
import { STATUS } from './utils/constants';
import type { FilterParams } from './utils/filters';
import ProFormSelect from '@/components/ProForm/Label/ProFormSelect';

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
        <Grid item xs={12} sm={6} md={4} lg={1.2}>
          <ProFormSelect
            name='inventory'
            placeholder={t('Theo ngày')}
            options={[
              { value: nanoid(), label: 'Theo ngày' },
              { value: nanoid(), label: 'Theo tháng' },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.0}>
          <ProDateRange label={t('Ngày tạo')} from='startDate' to='endDate' />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.0}>
          <ProFormCheckboxSelect
            name='store'
            label={t('Cửa hàng')}
            placeholder={t('Chọn cửa hàng')}
            options={[
              { value: nanoid(), label: 'TM' },
              { value: nanoid(), label: 'HN-1' },
              { value: nanoid(), label: 'HN-2' },
              { value: nanoid(), label: 'Sài Gòn' },
              { value: nanoid(), label: 'Hàng trên đường' },
              { value: nanoid(), label: 'Thái nguyên' },
              { value: nanoid(), label: 'Vinh' },
              { value: nanoid(), label: 'Màn hình' },
              { value: nanoid(), label: 'VTech Thanh Hóa' },
              { value: nanoid(), label: 'Linh Kiện HN' },
              { value: nanoid(), label: 'Xe TH' },
              { value: nanoid(), label: 'Anh Vương' },
            ]}
            renderLabel={(option) => option.label}
            renderValue={(option) => option.value}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={1.2}>
          <ProFormTextField
            name='staff'
            placeholder={t('Đối tượng')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={1.2}>
          <ProFormTextField
            name='account'
            placeholder={t('Tài khoản')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.0}>
          <ProFormSelect
            name='objectType'
            placeholder={t('Loại đối tượng')}
            options={[
              { value: nanoid(), label: 'Nhà cung cấp' },
              { value: nanoid(), label: 'Khách hàng' },
              { value: nanoid(), label: 'Dịch vụ chả góp' },
              { value: nanoid(), label: 'Nhân viên' },
              { value: nanoid(), label: 'Sàn thương mại điện tử' },
              { value: nanoid(), label: 'Khác' },
            ]}
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
