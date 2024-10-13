import Grid from '@mui/material/Grid';
import ProForm from '@/components/ProForm';
import ProFormTextField from '@/components/ProForm/Label/ProFormTextField';
import ProFormHiddenInput from '@/components/ProForm/ProFormHiddenInput';
import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ProFormFilterAction from '@/components/ProForm/ProFormFilterAction';
import { FiltersRef } from '@/types/refs';
import Validation from '@/utils/Validation';
import { FilterParams } from './utils/filters';

interface FilterValues {
  id: number | null;
  cardCode: string | null;
  name: string;
}

const schema = Validation.shape({
  name: Validation.string().optional(),
  id: Validation.number().optional(),
  cardCode: Validation.string().optional(),
  debtClassification: Validation.select(0).optional(),
});

interface Props {
  onSearch: (params: Partial<FilterParams>) => void;
  onSubmit: VoidFunction;
  onClear: VoidFunction;
}

const FiltersForm = forwardRef<FiltersRef, Props>((props) => {
  const { onSearch, onSubmit, onClear } = props;
  const { t } = useTranslation();
  const form = useForm<FilterValues>({
    mode: 'onChange',
    defaultValues: schema.getDefault(),
  });

  const handleSubmit = (values: FilterValues) => {
    const { ...rest } = values;
    onSearch({
      ...rest,
    });
  };

  return (
    <ProForm form={form} onFinish={handleSubmit} PaperProps={{ sx: { p: 2 } }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <ProFormTextField
            name='name'
            placeholder={t('Tìm kiếm nhóm khách hàng...')}
            InputLabelProps={{ shrink: true }}
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
