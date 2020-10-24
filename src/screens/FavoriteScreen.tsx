import React from 'react';
import {useSelector} from 'react-redux';
import {selectFavoriteFilms} from '../store/selectors';
import {FilmList} from '../components';

export const FavoriteScreen = () => {
  const data = useSelector(selectFavoriteFilms);

  return <FilmList data={data} />;
};

FavoriteScreen.options = {
  topBar: {
    title: {
      text: 'Избранное',
    },
  },
  bottomTab: {
    text: 'Избранное',
  },
};
