import { yupResolver } from '@hookform/resolvers/yup';
import Grid from '@mui/material/Grid';
import { nanoid } from '@reduxjs/toolkit';
import ProForm from '@/components/ProForm';
import ProFormTextField from '@/components/ProForm/Label/ProFormTextField';
import ProFormCheckboxSelect from '@/components/ProForm/ProFormCheckboxSelect';
import ProFormFilterAction from '@/components/ProForm/ProFormFilterAction';
import ProFormHiddenInput from '@/components/ProForm/ProFormHiddenInput';
import { forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { FiltersRef } from '@/types/refs';
import Validation from '@/utils/Validation';
import { STATUS } from './utils/constants';
import type { FilterParams } from './utils/filters';

interface FilterValues {
  searchText: string;
  status: number;
}

const schema = Validation.shape({
  name: Validation.string().optional(),
  status: Validation.select(STATUS.ALL),
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
    onSearch(values);
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
          <ProFormTextField
            name='name'
            placeholder={t('ID tài khoản')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <ProFormCheckboxSelect
            name='store'
            placeholder={t('-Loại-')}
            options={[
              { value: nanoid(), label: 'Tiền mặt cửa hàng' },
              { value: nanoid(), label: 'Tiền trong ngân hàng' },
              { value: nanoid(), label: 'Tiền quẹt thẻ' },
              { value: nanoid(), label: 'Tiền mặt thanh toán' },
            ]}
            renderLabel={(option) => option.label}
            renderValue={(option) => option.value}
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
