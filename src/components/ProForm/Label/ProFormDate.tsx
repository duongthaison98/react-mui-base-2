import EventIcon from '@mui/icons-material/Event';
import TodayIcon from '@mui/icons-material/Today';
import type { TextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import type { DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateFormat } from '@/constants/locale';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Dayjs } from 'dayjs';

interface Props {
  name: string;
  label?: string;
  onSelect?: (date: Dayjs | null) => void;
  TextFieldProps?: TextFieldProps;
  shouldDisableDate?: (date: Dayjs) => boolean;
  DatePickerProps?: Partial<DatePickerProps<Dayjs>>;
  type: 'start' | 'end';
  disabled?: boolean;
  required?: boolean;
}

const ProFormDate = (props: Props) => {
  const { name, type, disabled, onSelect, TextFieldProps, DatePickerProps, shouldDisableDate } =
    props;

  const { t } = useTranslation();

  const { control } = useFormContext();

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  const OpenPickerIcon = type === 'start' ? TodayIcon : EventIcon;

  return (
    <DatePicker
      disabled={disabled}
      format={DateFormat}
      shouldDisableDate={shouldDisableDate}
      onChange={(date: Dayjs | null) => {
        onChange(date);
        onSelect?.(date);
      }}
      value={value}
      {...DatePickerProps}
      slots={{
        openPickerIcon: disabled ? () => null : OpenPickerIcon,
        textField: (params) => (
          <TextField
            {...params}
            {...TextFieldProps}
            fullWidth
            size='small'
            error={Boolean(error)}
            helperText={error?.message && t(error.message)}
            id={name}
            slotProps={{
              input: {
                ...params.InputProps,
                ...TextFieldProps?.slotProps?.input,
                placeholder: disabled ? undefined : params.inputProps?.placeholder,
              },
            }}
          />
        ),
      }}
      slotProps={{
        popper: {
          sx: {
            '& .MuiPickersDay-root': {
              borderRadius: 1,
            },
            '& .MuiPickersDay-root.Mui-disabled': {
              opacity: 0.3,
            },
          },
        },
        actionBar: {
          actions: ['today'],
        },
        openPickerButton: {
          sx: { marginRight: 0 },
        },
      }}
    />
  );
};

export default ProFormDate;
