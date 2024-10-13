import ProForm from '@/components/ProForm';
import ProFormSelect from '@/components/ProForm/Label/ProFormSelect';
import ProFormTextField from '@/components/ProForm/Label/ProFormTextField';
import ProFormHiddenInput from '@/components/ProForm/ProFormHiddenInput';
import Grid from '@mui/material/Grid';
// import ProFormNumberField from '@/components/ProForm/ProFormNumberField';
import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
// import type { FiltersRef } from '@/types/form';
import ProFormFilterAction from '@/components/ProForm/ProFormFilterAction';
import { CustomerType } from '@/types/customer-types';
import { FiltersRef } from '@/types/refs';
import { debounce } from '@mui/material';
import Typography from '@mui/material/Typography';
import { FilterParams } from './utils/filters';

interface FilterValues extends Partial<FilterParams> {
  customerType: CustomerType | null;
  customerGroupId: string | null;
}

interface Props {
  onSearch: (params: Partial<FilterParams>) => void;
  onSubmit: VoidFunction;
  onClear: VoidFunction;
}

const FiltersForm = forwardRef<FiltersRef, Props>((props, ref) => {
  const { onSearch, onSubmit, onClear } = props;
  const { t } = useTranslation('customer');

  const form = useForm<FilterValues>({
    mode: 'onChange',
    defaultValues: {
      search: null,
      customerType: null,
      customerGroupId: null,
    },
  });

  const handleSubmit = (values: FilterValues) => {
    const { ...rest } = values;
    onSearch({
      ...rest,
    });
  };

  const onDebounceSearch = debounce((value: string) => {
    onSearch({ ...form.getValues(), search: value });
  }, 500);

  return (
    <ProForm form={form} onFinish={handleSubmit} PaperProps={{ sx: { p: 2 } }}>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={12} sm={6} md={4} lg={2.25}>
          <ProFormTextField
            name='search'
            placeholder={t('search')}
            InputLabelProps={{ shrink: true }}
            value={form.watch('search')}
            onChange={(e) => onDebounceSearch(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2} lg={0.75}>
          <Typography>Sản phẩm</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2.25}>
          <ProFormTextField
            name='product'
            placeholder={t('Sản phẩm')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={2.5} lg={0.75}>
          <Typography>Mã thẻ</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={2.5} lg={2.25}>
          <ProFormSelect
            name='cardCodeSelect'
            placeholder={t('Mã thẻ')}
            options={[
              { value: 1, label: 'Có' },
              { value: 2, label: 'Không' },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <ProFormFilterAction onSubmit={onSubmit} onClear={onClear} />
        </Grid>
      </Grid>

      <ProFormHiddenInput />
    </ProForm>
  );
});

export default FiltersForm;
