import { Controller, FieldValues, ControllerProps } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';
import { ReactNode } from 'react';

type Props<T extends FieldValues> = {
  helperText?: ReactNode;
  hasError?: boolean;
  textFieldProps?: TextFieldProps;
  controllerProps: Omit<ControllerProps<T>, 'render'>;
  prefixIcon?: SvgIconComponent;
};

export default function ControllerTextField<T extends FieldValues>({
  helperText,
  hasError,
  textFieldProps,
  controllerProps,
  prefixIcon: PrefixIcon,
}: Props<T>) {
  return (
    <Controller
      {...controllerProps}
      render={({ field: { ref, ...field } }) => (
        <TextField
          {...field}
          inputRef={ref}
          fullWidth
          margin='normal'
          error={!!hasError}
          helperText={helperText}
          slotProps={{
            input: {
              size: 'medium',
              startAdornment: PrefixIcon ? <PrefixIcon color='action' sx={{ mr: 1 }} /> : null,
            },
          }}
          {...textFieldProps}
        />
      )}
    />
  );
}
