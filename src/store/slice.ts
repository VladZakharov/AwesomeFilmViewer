import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FilmModel} from '../model';
import {DataState} from '../support/types';

type FilmsSliceState = {
  state?: DataState;
  all: FilmModel[];
  favorites_id: string[];
};

const initialState: FilmsSliceState = {
  state: undefined,
  all: [],
  favorites_id: [],
};

const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setFilmsLoading: (state) => {
      state.all = [];
      state.state = DataState.Loading;
    },
    setFilmsRefreshing: (state) => {
      state.state = DataState.Refreshing;
    },
    setFilmsError: (state) => {
      state.all = [];
      state.state = DataState.Error;
    },
    setFilms: (state, {payload: films}: PayloadAction<FilmModel[]>) => {
      state.all = films;
      state.state = DataState.Ready;
    },
    addToFavorites: (state, {payload: filmId}: PayloadAction<string>) => {
      state.favorites_id = [...state.favorites_id, filmId];
    },
    removeFromFavorites: (state, {payload: filmId}: PayloadAction<string>) => {
      state.favorites_id = state.favorites_id.filter((id) => id !== filmId);
    },
  },
});
export const {
  setFilmsLoading,
  setFilmsRefreshing,
  setFilmsError,
  setFilms,
  addToFavorites,
  removeFromFavorites,
} = filmsSlice.actions;
export const filmsReducer = filmsSlice.reducer;
