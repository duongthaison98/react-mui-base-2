import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/vi';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';

import './i18n';
import store from './store';
import Routers from './routers';
import { DateTimeLocaleText } from './constants/locale';
import { SettingsProvider } from './contexts/Settings';
import { NotificationProvider } from './contexts/Notification';
import { AuthProvider } from './contexts/Auth';
import DialogProvider from './contexts/Dialog';
import InitLoadingProvider from './contexts/InitLoadingProvider';

const App = () => {
  return (
    <HelmetProvider>
      <ReduxProvider store={store}>
        <AuthProvider>
          <SettingsProvider>
            <NotificationProvider>
              <DialogProvider>
                <InitLoadingProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs} localeText={DateTimeLocaleText}>
                    <Routers />
                  </LocalizationProvider>
                </InitLoadingProvider>
              </DialogProvider>
            </NotificationProvider>
          </SettingsProvider>
        </AuthProvider>
      </ReduxProvider>
    </HelmetProvider>
  );
};

export default App;
