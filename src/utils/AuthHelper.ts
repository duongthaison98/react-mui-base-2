import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/auth';

function parsedToken(key: string) {
  const token = localStorage.getItem(key);
  if (!token) {
    return;
  }
  try {
    return JSON.parse(token);
  } catch (error) {
    console.error('GET LOCAL TOKEN PARSE ERROR', error);
  }
}

const getLocalToken = {
  get accessToken() {
    return parsedToken(ACCESS_TOKEN);
  },
  get refreshToken() {
    return parsedToken(REFRESH_TOKEN);
  },
};

const convertToken = (key: string, value: string) => {
  try {
    const lsValue = JSON.stringify(value);
    localStorage.setItem(key, lsValue);
  } catch (error) {
    console.error('SET LOCAL TOKEN PARSE ERROR', error);
  }
};
const setLocalToken = {
  accessToken(value: string) {
    convertToken(ACCESS_TOKEN, value);
    return this;
  },
  refreshToken(value: string) {
    convertToken(REFRESH_TOKEN, value);
    return this;
  },
};

const removeLocalToken = () => {
  try {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  } catch (error) {
    console.error('REMOVE LOCAL TOKEN ERROR', error);
  }
};

export { getLocalToken, setLocalToken, removeLocalToken, parsedToken };
