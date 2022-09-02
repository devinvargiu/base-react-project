import { createSlice, createAction, Slice, PayloadAction } from '@reduxjs/toolkit';
import { put, call, fork, take, select, CallEffect, PutEffect, SelectEffect, TakeEffect } from 'redux-saga/effects';
import { serializeError } from 'serialize-error';
import history from '../../utils/history';
import { RootState } from '../index';
import { IdentityState, Credentials, UserPreferences } from '../../types';
import AppError from '../../utils/error';
import CookieManager from '../../utils/cookies';

const authSlice: Slice = createSlice({
  name: 'auth',

  initialState: {
    token: null,
    username: null,
    expiration: null,
    renewExpiration: null,
    preferences: null,
    error: null,
  } as IdentityState,

  reducers: {
    restore: (state: IdentityState, action: PayloadAction<IdentityState>) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.expiration = action.payload.expiration;
      state.renewExpiration = action.payload.renewExpiration;
      state.preferences = action.payload.preferences;
      return state;
    },

    changePreferences: (state: IdentityState, action: PayloadAction<UserPreferences>) => {
      state.preferences = action.payload;
      return state;
    },

    loginSuccess: (state: IdentityState, action: PayloadAction<IdentityState>) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.expiration = action.payload.expiration;
      state.renewExpiration = action.payload.renewExpiration;
      state.preferences = action.payload.preferences;
      return state;
    },

    loginError: (state, action: PayloadAction<AppError>) => {
      state.error = action.payload;
      return state;
    },

    logout: (state: IdentityState) => {
      state.token = null;
      state.username = null;
      state.expiration = null;
      state.renewExpiration = null;
      return state;
    },
  },
});

export const login = createAction('login', (credential: Credentials) => {
  return {
    payload: { ...credential },
  };
});

export const { loginSuccess, loginError, logout, restore, changePreferences } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const getAuth = (state: RootState) => state.auth;
export const getPreferences = (state: RootState) => state.auth.preferences;

export function* loginFlow(): Generator<
  | SelectEffect
  | TakeEffect
  | CallEffect<JSON>
  | PutEffect<{
      payload: Credentials;
      type: string;
    }>,
  void,
  PayloadAction<Credentials>
> {
  while (true) {
    const action = yield take(login.toString());
    const { username } = action.payload;

    try {
      //const authResponse = yield call([AuthApi, AuthApi.auth], username, password);
      const authResponse = {
        token: 'example',
        username: username,
        expiration: null,
        renewExpiration: null,
        preferences: null,
        error: null,
      };

      CookieManager.setAuthCookie(authResponse);

      const preferences = CookieManager.getPrefCookie();
      yield put(loginSuccess({ ...authResponse, preferences: preferences }));
    } catch (e) {
      const error = serializeError(e);
      yield put(loginError(error));
    }
  }
}

export function* logoutFlow() {
  while (true) {
    yield take(logout.toString());
    yield put({ type: 'RESET_STATE' });
    CookieManager.deleteAuthCookie();
    yield history.push(`/login`);
  }
}

export function* authFlow() {
  yield fork(loginFlow);
  yield fork(logoutFlow);
}
