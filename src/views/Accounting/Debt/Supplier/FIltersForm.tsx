import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import ProDateRange from '@/components/ProDateTime/ProDateRange';
import ProForm from '@/components/ProForm';
import ProFormSelect from '@/components/ProForm/Label/ProFormSelect';
import ProFormFilterAction from '@/components/ProForm/ProFormFilterAction';
import ProFormTextField from '@/components/ProForm/ProFormTextField';
import { forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FiltersRef } from '@/types/refs';
import DateTime from '@/utils/DateTime';
import Validation from '@/utils/Validation';
import { FilterParams } from './utils/filters';

interface Props {
  onSearch: (params: Partial<FilterParams>) => void;
  onSubmit: VoidFunction;
  onClear: VoidFunction;
}

interface FilterValues {
  startDate: string | null;
  endDate: string | null;
  id: string | null;
  supplier: string | null;
  typeSupplier: number | string | null;
  debt: number | null;
  yuan: number;
}

const schema = Validation.shape({
  startDate: Validation.string().optional().default(null),
  endDate: Validation.string().optional().default(null),
  id: Validation.string().optional().default(null),
  supplier: Validation.string().optional().default(null),
  typeSupplier: Validation.select(0).optional(),
  debt: Validation.select(0).optional(),
  yuan: Validation.number().optional().default(0),
});

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
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <ProDateRange label={t('Chọn ngày')} from='startDate' to='endDate' />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={0.8}>
          <ProFormTextField name='id' placeholder={t('ID')} InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1.5}>
          <ProFormTextField
            name='supplier'
            placeholder={t('Nhà cung cấp')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1.5}>
          <ProFormSelect
            name='typeSupplier'
            placeholder={t('Phân loại NCC')}
            options={[
              { value: 1, label: 'Nhà CC VN' },
              { value: 2, label: 'Nhà CC TQ' },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1.5}>
          <ProFormSelect
            name='debt'
            placeholder={t('Công nợ')}
            options={[
              { value: 1, label: 'Phải thu' },
              { value: 2, label: 'Phải trả' },
              { value: 3, label: 'Phải thu | Phải trả' },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={1}>
          <ProFormTextField name='yaun' placeholder={t('NDT')} InputLabelProps={{ shrink: true }} />
        </Grid>

        <Grid item xs={12} sm={6} md={3} lg={2}>
          <ProFormFilterAction onSubmit={onSubmit} onClear={onClear} />
        </Grid>
      </Grid>
    </ProForm>
  );
});

export default FiltersForm;
