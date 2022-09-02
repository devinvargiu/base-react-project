import { Middleware, combineReducers, Action } from 'redux';
import { configureStore, getDefaultMiddleware, MiddlewareArray } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { appReducer, authReducer, rootSaga } from './slices';

const sagaMiddleware = createSagaMiddleware();

const middleware: Middleware[] = new MiddlewareArray()
  // .concat([...getDefaultMiddleware({ thunk: false })])
  .concat([...getDefaultMiddleware({ thunk: false, immutableCheck: false, serializableCheck: false })])
  .concat(sagaMiddleware);

const applicationReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
});

const rootReducer = (state: any, action: Action) => {
  if (action.type === 'RESET_STATE') {
    state = undefined;
  }
  return applicationReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.REACT_APP_DEBUG_MODE === 'true',
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export type StoreProps = typeof store;

export * from './slices';

export default store;
