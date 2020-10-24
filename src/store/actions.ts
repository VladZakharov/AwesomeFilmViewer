import {AppThunk} from './store';
import {getFilmList} from '../api/methods';
import {
  setFilms,
  setFilmsLoading,
  setFilmsError,
  setFilmsRefreshing,
} from './slice';
import {delay} from '../support';

export const loadFilms = (): AppThunk => async (dispatch) => {
  dispatch(setFilmsLoading());
  try {
    const result = await getFilmList();
    await delay(2000);
    dispatch(setFilms(result));
  } catch (e) {
    dispatch(setFilmsError());
  }
};

export const refreshFilms = (): AppThunk => async (dispatch) => {
  dispatch(setFilmsRefreshing());
  try {
    const result = await getFilmList();
    await delay(2000);
    dispatch(setFilms(result));
  } catch (e) {
    dispatch(setFilmsError());
  }
};
