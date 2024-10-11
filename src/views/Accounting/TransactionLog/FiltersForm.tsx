import { yupResolver } from '@hookform/resolvers/yup';
import Validation from '@/utils/Validation';
import DateTime from '@/utils/DateTime';
import { Button, Grid } from '@mui/material';
import ProForm from '@/components/ProForm';
import { forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import { FiltersRef } from '@/types/refs';
import { FilterParams } from './utils/filters';
import ProFormTextField from '@/components/ProForm/ProFormTextField';
import { useTranslation } from 'react-i18next';
import ProDateRange from '@/components/ProDateTime/ProDateRange';
import ProFormSelect from '@/components/ProForm/Label/ProFormSelect';

interface FiltersValues {
  transactionId: string;
  startDate: Date | null;
  endDate: Date | null;
  transStartDate: Date | null;
  transEndDate: Date | null;
  actionType: number;
  documentType: number;
  document: string;
  type: number;
  objectType: number;
  object: string;
  operator: string;
}
interface Props {
  onSearch: (params: Partial<FilterParams>) => void;
}

const schema = Validation.shape({
  transactionId: Validation.string().optional(),
  startDate: Validation.date().optional(),
  endDate: Validation.date().optional(),
  transStartDate: Validation.date().optional(),
  transEndDate: Validation.date().optional(),
  actionType: Validation.select(0),
  documentType: Validation.select(0),
  document: Validation.string().optional(),
  type: Validation.select(0),
  objectType: Validation.select(0),
  object: Validation.string().optional(),
  operator: Validation.string().optional(),
});

const FiltersForm = forwardRef<FiltersRef, Props>((props, ref) => {
  const { t } = useTranslation();
  const { onSearch } = props;
  const form = useForm<FiltersValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });

  const handleSubmit = (values: FiltersValues) => {
    const { startDate, endDate, transStartDate, transEndDate, ...rest } = values;

    onSearch({
      ...rest,
      startDate: DateTime.Format(startDate),
      endDate: DateTime.Format(endDate),
      transStartDate: DateTime.Format(transStartDate),
      transEndDate: DateTime.Format(transEndDate),
    });
  };

  return (
    <ProForm
      form={form}
      onFinish={handleSubmit}
      PaperProps={{ sx: { padding: '16px 16px 0px 16px' } }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <ProFormTextField name='transactionId' placeholder={t('ID giao dịch')} />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <ProDateRange label={t('Chọn ngày')} from='startDate' to='endDate' />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <ProDateRange label={t('Ngày giao dịch')} from='transStartDate' to='transEndDate' />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <ProFormSelect
            name='actionType'
            label={t('Thao tác')}
            placeholder={t('Thao tác')}
            options={[
              { value: 0, label: '-Thao tác-' },
              { value: 1, label: 'Sửa' },
              { value: 2, label: 'Xóa' },
              { value: 3, label: 'Đổi trạng thái phiếu thu trả góp' },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <ProFormSelect
            name='documentType'
            label={t('Loại chứng từ')}
            placeholder={t('Loại chứng từ')}
            options={[
              { value: 0, label: '-Loại chứng từ-' },
              { value: 1, label: 'Phiếu XNK' },
              { value: 2, label: 'Đơn hàng' },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <ProFormTextField name='document' placeholder={t('Chứng từ')} />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <ProFormSelect
            name='type'
            label={t('Loại phiếu')}
            placeholder={t('Loại phiếu')}
            options={[
              { value: 0, label: '-Loại phiếu-' },
              { value: 1, label: 'Phiếu XNK' },
              { value: 2, label: 'Đơn hàng' },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <ProFormSelect
            name='objectType'
            label={t('Loại đối tượng')}
            placeholder={t('Loại đối tượng')}
            options={[
              { value: 0, label: '-Loại đối tượng-' },
              { value: 1, label: 'Phiếu XNK' },
              { value: 2, label: 'Đơn hàng' },
            ]}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3} lg={2}>
          <ProFormTextField name='object' placeholder={t('Đối tượng')} />
        </Grid>

        <Grid item xs={12} sm={6} md={3} lg={2}>
          <ProFormTextField name='operator' placeholder={t('Người thao tác')} />
        </Grid>

        <Grid item xs={12} sm={6} md={3} lg={2}>
          <Button type='submit' sx={{ height: '100%' }}>
            Filter
          </Button>
        </Grid>
      </Grid>
    </ProForm>
  );
});

export default FiltersForm;
