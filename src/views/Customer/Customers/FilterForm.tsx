import { yupResolver } from '@hookform/resolvers/yup';
import Grid from '@mui/material/Grid';
import ProForm from '@/components/ProForm';
import ProFormSelect from '@/components/ProForm/Label/ProFormSelect';
import ProFormTextField from '@/components/ProForm/Label/ProFormTextField';
import ProFormHiddenInput from '@/components/ProForm/ProFormHiddenInput';
// import ProFormNumberField from '@/components/ProForm/ProFormNumberField';
import { forwardRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
// import type { FiltersRef } from '@/types/form';
import { Collapse } from '@mui/material';
import Typography from '@mui/material/Typography';
import ProFormFilterAction from '@/components/ProForm/ProFormFilterAction';
import { FiltersRef } from '@/types/refs';
import Validation from '@/utils/Validation';
import ProFormDate from '../../../components/ProForm/ProFormDate';
import { FilterParams } from './utils/filters';
import ProFormCheckboxSelect from '@/components/ProForm/ProFormCheckboxSelect';

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

const FiltersForm = forwardRef<FiltersRef, Props>((props, ref) => {
  const { onSearch, onSubmit, onClear } = props;
  const { t } = useTranslation();

  const [isShowFilter, setIsShowFilter] = useState<boolean>(false);

  const form = useForm<FilterValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });

  const handleSubmit = (values: FilterValues) => {
    const { ...rest } = values;
    onSearch({
      ...rest,
    });
  };

  const handleShowFilter = () => {
    setIsShowFilter(!isShowFilter);
  };

  return (
    <ProForm form={form} onFinish={handleSubmit} PaperProps={{ sx: { p: 2 } }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={1}>
          <ProFormTextField name='id' placeholder={t('ID')} InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={1.5}>
          <ProFormTextField
            name='cardCode'
            placeholder={t('Mã thẻ')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <ProFormTextField
            name='name'
            placeholder={t('Khách hàng')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={1}>
          <ProFormSelect
            name='typeCustomer'
            placeholder={t('Loại')}
            options={[
              { value: 1, label: 'Khách lẻ' },
              { value: 2, label: 'Khách sỉ' },
              { value: 3, label: 'Đại lý' },
            ]}
            renderLabel={(option) => option.label}
            renderValue={(option) => option.value}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={2}>
          <ProFormTextField
            name='carer'
            placeholder={t('Người chăm sóc')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2.5}>
          <ProFormSelect
            name='debtClassification'
            placeholder={t('Phân loại công nợ')}
            options={[
              { value: 1, label: 'A' },
              { value: 2, label: 'B' },
              { value: 3, label: 'C' },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <ProFormTextField
            name='debtLimit'
            placeholder={t('Giới hạn công nợ')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <ProFormCheckboxSelect
            name='store'
            placeholder={t('CHPT')}
            options={[
              { value: 1, label: 'Hà Nội' },
              { value: 2, label: 'Đà Nẵng' },
              { value: 3, label: 'Sài Gòn' },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <ProFormFilterAction
            onSubmit={onSubmit}
            onClear={onClear}
            onExpanded={handleShowFilter}
          />
        </Grid>
      </Grid>

      <Collapse in={isShowFilter} timeout='auto'>
        <Grid container spacing={2} mt={2} alignItems='center'>
          <Grid item xs={12} sm={6} md={4} lg={0.75}>
            <Typography>Sản phẩm</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.25}>
            <ProFormTextField
              name='product'
              placeholder={t('Sản phẩm')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={0.75}>
            <Typography>Mã thẻ</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.25}>
            <ProFormSelect
              name='cardCodeSelect'
              placeholder={t('Mã thẻ')}
              options={[
                { value: 1, label: 'Có' },
                { value: 2, label: 'Không' },
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={0.75}>
            <Typography>Nhân viên bán hàng</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.25}>
            <ProFormTextField
              name='seller'
              placeholder={t('Nhân viên bán hàng')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={0.75}>
            <Typography>Giới tính</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.25}>
            <ProFormSelect
              name='gender'
              placeholder={t('Giới tính')}
              options={[
                { value: 1, label: 'Nam' },
                { value: 2, label: 'Nữ' },
                { value: 3, label: 'Khác' },
              ]}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={0.75}>
            <Typography>Ngày sinh</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.25}>
            <ProFormDate name='dateOfBirth' type='start' />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={0.75}>
            <Typography>CH tạo thẻ</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.25}>
            <ProFormSelect
              name='store2'
              placeholder={t('Tạo thẻ')}
              options={[{ value: 1, label: 'Linh kiện sài gòn' }]}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={0.75}>
            <Typography>Tháng sinh</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.25}>
            <ProFormDate name='monthOfBirth' type='start' />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={0.75}>
            <Typography>Thành phố</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.25}>
            <ProFormSelect
              name='province'
              placeholder={t('Thành phố')}
              options={[
                { value: 1, label: 'Hà Nội' },
                { value: 2, label: 'Sài Gòn' },
              ]}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={0.75}>
            <Typography>Ngày chăm sóc</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.25}>
            <ProFormDate name='careDate' type='start' />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={0.75}>
            <Typography>Năm sinh</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2.25}>
            <ProFormDate name='yearOfBirth' type='start' />
          </Grid>
        </Grid>
      </Collapse>

      <ProFormHiddenInput />
    </ProForm>
  );
});

export default FiltersForm;
