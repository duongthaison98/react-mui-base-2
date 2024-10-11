import type { TextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { Dictionary } from '@/types/common';
import ProFormLabel from './ProFormLabel';

interface Props extends Omit<TextFieldProps, 'name'> {
  name: string;
  label?: string;
  interpolation?: Dictionary;
}

const ProFormTextField = (props: Props) => {
  const { name, placeholder, disabled, required, interpolation, label, ...rest } = props;

  const { t } = useTranslation();

  const { control } = useFormContext();

  const {
    field: { value, ref, onBlur, onChange },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <ProFormLabel name={name} title={label} required={required} gutterBottom>
      <TextField
        id={name}
        fullWidth
        required={required}
        error={Boolean(error)}
        helperText={error?.message && t(error.message, interpolation)}
        placeholder={disabled ? void 0 : placeholder}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
        value={value || ''}
        name={name}
        inputRef={ref}
        {...rest}
      />
    </ProFormLabel>
  );
};

export default ProFormTextField;
