import {Navigation} from 'react-native-navigation';
import './src/App';

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
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
            },
          },
        ],
      },
    },
  });
});
