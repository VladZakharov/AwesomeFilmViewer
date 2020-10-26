import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  loadFilms as loadFilmsAction,
  refreshFilms as refreshFilmsAction,
} from '../store/actions';
import {selectAllFilms, selectFilmsState} from '../store/selectors';
import {FilmList} from '../components';
import {DataState} from '../support';
import {Navigation} from 'react-native-navigation';
import {FilmModel} from '../model';

export const MainScreen = () => {
  const dispatch = useDispatch();
  const state = useSelector(selectFilmsState);
  const allFilms = useSelector(selectAllFilms);

  const loadFilms = useCallback(() => {
    dispatch(loadFilmsAction());
  }, []);

  const refreshFilms = useCallback(() => {
    dispatch(refreshFilmsAction());
  }, []);

  const onFilmPress = useCallback((data: FilmModel) => {
    Navigation.showOverlay({
      component: {
        name: 'BottomPanel',
        passProps: {data},
      },
    });
  }, []);

  useEffect(() => {
    loadFilms();
  }, []);

  return (
    <FilmList
      data={allFilms}
      refreshing={state === DataState.Refreshing}
      loading={state === DataState.Loading}
      onRefresh={refreshFilms}
      onItemPress={onFilmPress}
    />
  );
};

MainScreen.options = {
  topBar: {
    title: {
      text: 'Главная',
    },
  },
};
