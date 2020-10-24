import React from 'react';
import {ComponentProvider} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {store} from './store/store';
import {BottomPanel, FavoriteScreen, MainScreen} from './screens';

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

Navigation.registerComponent(
  'BottomPanel',
  // componentProvider(BottomPanel),
  () => BottomPanel,
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

Navigation.events().registerAppLaunchedListener(async () => {
  const homeIconSource = await Icon.getImageSource('home', 20, 'black');
  const favIconSource = await Icon.getImageSource('star', 20, 'black');
  await Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'LOGIN_SCREEN',
            },
          },
        ],
      },
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'Main',
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Главная',
                  icon: homeIconSource,
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'Favorite',
                  },
                },
              ],
              options: {
                bottomTab: {
                  text: 'Избранное',
                  icon: favIconSource,
                },
              },
            },
          },
        ],
      },
    },
  });
});
