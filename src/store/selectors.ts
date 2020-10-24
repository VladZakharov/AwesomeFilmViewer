import {RootState} from './reducer';
import {FilmModel} from '../model';
import {DataState} from '../support/types';

export const selectAllFilms = ({filmsReducer}: RootState): FilmModel[] =>
  filmsReducer.all;

export const selectFilmsState = ({
  filmsReducer,
}: RootState): DataState | undefined => filmsReducer.state;

export const selectFavoriteFilms = ({
  filmsReducer: {all, favorites_id},
}: RootState): FilmModel[] =>
  all.filter((film) => favorites_id.indexOf(film.id) !== -1);

export const selectFilmsIsFavorite = (
  {filmsReducer}: RootState,
  filmId: string,
): boolean => filmsReducer.favorites_id.some((id) => id === filmId);
