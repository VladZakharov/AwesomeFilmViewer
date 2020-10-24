import {AppThunk} from './store';
import {getFilmList} from '../api/methods';
import {
  setFilms,
  setFilmsLoading,
  setFilmsError,
  setFilmsRefreshing,
} from './slice';
import {delay} from '../support';
import {FilmModel} from '../model';

const generatedFilms: FilmModel[] = [...Array(10000)].map((_, index) => ({
  id: `id_${index}`,
  title: `title_${index}`,
  description: 'description',
  director: 'director',
  locations: [],
  people: [],
  producer: 'producer',
  release_date: 'release_date',
  rt_score: 'rt_score',
  species: [],
  url: 'url',
  vehicles: [],
}));

export const loadFilms = (): AppThunk => async (dispatch) => {
  dispatch(setFilmsLoading());
  try {
    const result = await getFilmList();
    await delay(2000);
    dispatch(setFilms([...result, ...generatedFilms]));
  } catch (e) {
    dispatch(setFilmsError());
  }
};

export const refreshFilms = (): AppThunk => async (dispatch) => {
  dispatch(setFilmsRefreshing());
  try {
    const result = await getFilmList();
    await delay(2000);
    dispatch(setFilms([...result, ...generatedFilms]));
  } catch (e) {
    dispatch(setFilmsError());
  }
};
