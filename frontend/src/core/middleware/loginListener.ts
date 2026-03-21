import { AxiosResponse } from 'axios';

import { toastNotification } from '@/hooks';
import { setLifetime, setLoggedIn, setTimestamp } from '@/redux/slice/user';
import { store } from '@/redux/store';
import type { SessionData } from './types';

interface ErrorData {
  code?: string;
}

interface ResponseData {
  session?: Pick<SessionData, 'is_user_logged_in' | 'lifetime'>;
  error?: ErrorData;
}

const AUTH_MESSAGES = {
  logoutTitle: 'Zostałeś wylogowany',
  logoutReasonUnknown: 'Przyczyna wylogowania nieznana.',
} as const;

const LOGOUT_REASON_MESSAGES: Record<string, string> = {
  'SESSION-REQUIRED': 'Sesja wygasła.',
  'NOT-AUTHORIZED': 'Nie masz uprawnień do wykonania tej operacji.',
};

const setAuthCookie = (value: boolean) => {
  if (value) {
    document.cookie = 'auth_session=1; path=/; SameSite=Lax';
  } else {
    document.cookie = 'auth_session=; path=/; max-age=0; SameSite=Lax';
  }
};

const loginListener = <T = unknown>(
  response: AxiosResponse<ResponseData & T>
): AxiosResponse<ResponseData & T> => {
  const { is_user_logged_in: loggedIn, lifetime } =
    response?.data?.session ?? {};
  const errorCode = response?.data?.error?.code;

  if (loggedIn !== undefined) {
    const wasLoggedIn = store.getState().user.loggedIn;

    if (wasLoggedIn && !loggedIn) {
      toastNotification({
        title: AUTH_MESSAGES.logoutTitle,
        details:
          LOGOUT_REASON_MESSAGES[errorCode ?? ''] ??
          AUTH_MESSAGES.logoutReasonUnknown,
      });
    }

    setAuthCookie(loggedIn);
    store.dispatch(setLoggedIn({ isLoggedIn: loggedIn }));

    if (lifetime !== undefined) {
      store.dispatch(setLifetime({ lifetime }));
    }

    store.dispatch(setTimestamp());
  }

  return response;
};

export default loginListener;
