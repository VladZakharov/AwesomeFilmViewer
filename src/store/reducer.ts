import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {filmsReducer} from './slice';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['filmsReducer'],
};

const filmsPersistConfig = {
  key: 'filmsReducer',
  storage: AsyncStorage,
  blacklist: [],
};

const rootReducer = combineReducers({
  filmsReducer: persistReducer(filmsPersistConfig, filmsReducer),
});

export const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export type RootState = ReturnType<typeof persistedReducer>;
