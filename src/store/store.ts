import {persistStore} from 'redux-persist';
import {persistedReducer, RootState} from './reducer';
import {
  ThunkAction,
  Action,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [...getDefaultMiddleware({serializableCheck: false})],
});
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export const persistor = persistStore(store);
