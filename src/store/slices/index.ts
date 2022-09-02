import { all } from 'redux-saga/effects';
import { authFlow } from './auth';

export * from './app';
export * from './auth';

export function* rootSaga() {
  yield all([authFlow()]);
}
