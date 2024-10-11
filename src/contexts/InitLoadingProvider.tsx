import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { FCC } from '@/types/react';
import { getLocalToken } from '@/utils/AuthHelper';
import { getCurrentUser } from '@/services/user-service';
import { useAppDispatch, useAppSelector } from '@/store';
import axios from 'axios';
import { setInitApp, setIsAuth, setProfile } from '@/slices/auth';
import Logger from '@/utils/Logger';
import LoadingOverlay from '@/components/ProTable/core/LoadingOverlay';
import { ROUTE_PATH } from '@/constants/routes';

const InitLoadingProvider: FCC = ({ children }) => {
  const { isInitialized } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const requestUser = async () => {
    try {
      if (getLocalToken.accessToken) {
        const resp = await getCurrentUser();
        const isAuth = resp.statusCode === axios.HttpStatusCode.Ok;
        dispatch(setIsAuth(isAuth));
        if (isAuth) {
          dispatch(setProfile(resp.data));
        }
      }
    } catch (error) {
      Logger.log(error);
    } finally {
      dispatch(setInitApp());
    }
  };

  useEffect(() => {
    requestUser();
  }, []);

  return (
    <>
      <LoadingOverlay visible={!isInitialized} />
      {isInitialized && children}
    </>
  );
};

export default InitLoadingProvider;
