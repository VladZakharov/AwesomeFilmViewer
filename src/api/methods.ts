import {makeApiCall} from './api';
import {AxiosResponse} from 'axios';
import {FilmModel} from '../model';

export const getFilmList = async (): Promise<FilmModel[]> => {
  const res: AxiosResponse = await makeApiCall<FilmModel[]>({
    url: 'https://ghibliapi.herokuapp.com/films/?limit=250',
  });
  return res.data;
};
