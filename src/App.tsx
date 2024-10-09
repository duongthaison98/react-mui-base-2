import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import GlobalBaseline from 'components/GlobalBaseline';
import { DateTimeLocaleText } from 'constants/locale';
import { AuthProvider } from 'contexts/Auth';
import DialogProvider from 'contexts/Dialog';
import { NotificationProvider } from 'contexts/Notification';
import { SettingsProvider } from 'contexts/Settings';
import viLocale from 'date-fns/locale/vi';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import Routers from 'routers';
import store from 'store';
import history from 'utils/history';
import './i18n';

const App = () => {
  return (
    <HelmetProvider>
      <ReduxProvider store={store}>
        <AuthProvider>
          <SettingsProvider>
            <NotificationProvider>
              <DialogProvider>
                <HistoryRouter history={history}>
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    adapterLocale={viLocale}
                    localeText={DateTimeLocaleText}
                  >
                    <CssBaseline enableColorScheme />
                    <GlobalBaseline />
                    <Routers />
                  </LocalizationProvider>
                </HistoryRouter>
              </DialogProvider>
            </NotificationProvider>
          </SettingsProvider>
        </AuthProvider>
      </ReduxProvider>
    </HelmetProvider>
  );
};

export default App;
