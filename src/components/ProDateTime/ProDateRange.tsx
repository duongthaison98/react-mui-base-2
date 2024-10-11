'use client';

import { Fragment, useRef, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { DateFormat, DateTimeLocaleText } from '@/constants/locale';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

interface Props {
  from: string;
  to: string;
  label?: string;
}

export default function ProDateRange(props: Props) {
  const { from, to, label } = props;
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  const { control } = useFormContext();

  const {
    field: { value: fromValue, onChange: fromOnChange },
  } = useController({ name: from, control });

  const {
    field: { value: toValue, onChange: toOnChange },
  } = useController({ name: to, control });

  const formatDate = (date: dayjs.Dayjs | null) => {
    return date && date.isValid() ? date.locale('vi').format(DateFormat) : '';
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='vi' localeText={DateTimeLocaleText}>
      <Fragment>
        <Wrapper ref={ref} focused={focused} onClick={handleOpen}>
          <Label component='label' focused={focused} variant='body1' htmlFor={from} noWrap>
            {label}
          </Label>
          <InputBase
            name={from}
            value={formatDate(dayjs(fromValue))}
            placeholder='dd/mm/yyyy'
            onFocus={handleFocus}
            onBlur={handleBlur}
            sx={{
              zIndex: 1,
              pointerEvents: 'none',
              '& .MuiInputBase-input': {
                py: '8.5px',
                pl: 1.75,
                width: '10.5ch',
              },
            }}
          />
          <Box sx={{ px: 0.5 }}>{'-'}</Box>
          <InputBase
            name={to}
            value={formatDate(dayjs(toValue))}
            placeholder='dd/mm/yyyy'
            onFocus={handleFocus}
            onBlur={handleBlur}
            sx={{
              zIndex: 1,
              pointerEvents: 'none',
              '& .MuiInputBase-input': {
                py: '8.5px',
                pl: 0.5,
                width: '10.5ch',
              },
            }}
          />
          <IconButton onClick={handleOpen} sx={{ mr: 1, zIndex: 1, ml: 'auto' }}>
            <DateRangeIcon />
          </IconButton>
          <Fieldset focused={focused}>
            <Legend>
              <Span>{label}</Span>
            </Legend>
          </Fieldset>
        </Wrapper>
        <Popover
          open={open}
          anchorEl={ref.current}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              '& .MuiPickersDay-root': {
                borderRadius: 1,
              },
            }}
          >
            <StaticDatePicker
              displayStaticWrapperAs='desktop'
              dayOfWeekFormatter={(day) => {
                console.log(day);
                return '123';
              }}
              value={dayjs(fromValue)}
              onChange={(date) => {
                fromOnChange(date?.toDate());
                if (date && toValue && date.isAfter(dayjs(toValue))) {
                  toOnChange(date.toDate());
                }
              }}
              slotProps={{
                actionBar: { actions: ['clear', 'today'] },
              }}
            />
            <StaticDatePicker
              displayStaticWrapperAs='desktop'
              value={dayjs(toValue)}
              onChange={(date) => {
                toOnChange(date?.toDate());
                if (date && fromValue && date.isBefore(dayjs(fromValue))) {
                  fromOnChange(date.toDate());
                }
              }}
              slotProps={{
                actionBar: { actions: ['clear', 'today'] },
              }}
            />
          </Box>
        </Popover>
      </Fragment>
    </LocalizationProvider>
  );
}

const Wrapper = styled('div', {
  shouldForwardProp: (prop: string) => !['focused'].includes(prop),
})<{ focused: boolean }>(({ theme, focused }) => ({
  width: '100%',
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: 4,
  position: 'relative',
  cursor: 'pointer',
  ...(!focused && {
    '&:hover': {
      '& fieldset': {
        borderColor: theme.palette.text.primary,
      },
    },
  }),
}));

const Fieldset = styled('fieldset', {
  shouldForwardProp: (prop: string) => !['focused'].includes(prop),
})<{ focused: boolean }>(({ theme, focused }) => ({
  position: 'absolute',
  top: -5,
  left: 0,
  right: 0,
  bottom: 0,
  margin: 0,
  padding: theme.spacing(0, 1),
  pointerEvents: 'none',
  overflow: 'hidden',
  minWidth: '0%',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: theme.palette.divider,
  borderRadius: 'inherit',
  ...(focused && {
    borderWidth: 2,
    borderColor: theme.palette.primary.main,
  }),
}));

const Legend = styled('legend')(({ theme }) => ({
  float: 'unset',
  width: 'auto',
  overflow: 'hidden',
  display: 'block',
  padding: 0,
  height: 11,
  fontSize: '0.75em',
  visibility: 'hidden',
  maxWidth: '100%',
  whiteSpace: 'nowrap',
}));

const Span = styled('span')(({ theme }) => ({
  paddingLeft: 5,
  paddingRight: 5,
  display: 'inline-block',
  opacity: 0,
  visibility: 'visible',
}));

const Label = styled(Typography<'label'>, {
  shouldForwardProp: (prop: string) => !['focused'].includes(prop),
})<{ focused: boolean }>(({ theme, focused }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  transform: 'translate(14px, -9px) scale(0.75)',
  transformOrigin: 'top left',
  zIndex: 1,
  pointerEvents: 'auto',
  userSelect: 'none',
  maxWidth: 'calc(133% - 24px)',
  color: theme.palette.text.secondary,
  ...(focused && {
    color: theme.palette.primary.main,
  }),
}));
