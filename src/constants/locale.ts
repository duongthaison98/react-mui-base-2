import { PickersLocaleText } from '@mui/x-date-pickers/locales';
import { TimeView } from '@mui/x-date-pickers';

export const DateFormat = 'DD/MM/YYYY';
export const DateTimeFormat = 'DD/MM/YYYY, HH:mm';

export const DateTimeLocaleText: Partial<PickersLocaleText<any>> = {
  // Existing translations
  previousMonth: 'Tháng trước',
  nextMonth: 'Tháng sau',
  cancelButtonLabel: 'Hủy bỏ',
  clearButtonLabel: 'Xóa',
  okButtonLabel: 'Đóng',
  todayButtonLabel: 'Hôm nay',

  // Additional translations
  start: 'Bắt đầu',
  end: 'Kết thúc',

  // Correct type for clockLabelText
  clockLabelText: (view: TimeView, time: any, adapter: any) => {
    switch (view) {
      case 'hours':
        return 'Chọn giờ';
      case 'minutes':
        return 'Chọn phút';
      case 'seconds':
        return 'Chọn giây';
      default:
        return 'Chọn thời gian';
    }
  },

  hoursClockNumberText: (hours: string) => `${hours} giờ`,
  minutesClockNumberText: (minutes: string) => `${minutes} phút`,
  secondsClockNumberText: (seconds: string) => `${seconds} giây`,
};
