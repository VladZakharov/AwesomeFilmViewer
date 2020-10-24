import React from 'react';
import {ComponentProvider} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import {store} from './store/store';
import {FavoriteScreen, MainScreen} from './screens';

const componentProvider = (
  Component: React.ComponentType,
): ComponentProvider => () => (props) => {
  return (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
};

Navigation.registerComponent(
  'Main',
  componentProvider(MainScreen),
  () => MainScreen,
);

Navigation.registerComponent(
  'Favorite',
  componentProvider(FavoriteScreen),
  () => FavoriteScreen,
);

Navigation.setDefaultOptions({
  statusBar: {
    backgroundColor: 'white',
  },
  topBar: {
    title: {
      color: 'black',
    },
    backButton: {
      color: 'black',
    },
    // background: {
    //   color: '#4d089a',
    // },
  },
  bottomTab: {
    fontSize: 14,
    selectedFontSize: 14,
  },
});
