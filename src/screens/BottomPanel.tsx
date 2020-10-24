import React, {useCallback, useEffect, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Navigation, NavigationFunctionComponent} from 'react-native-navigation';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import {FilmModel} from '../model';

interface Props {
  data: FilmModel;
}

export const BottomPanel: NavigationFunctionComponent<Props> = ({
  componentId,
  data,
}) => {
  const sheetRef = React.useRef<BottomSheet>(null);

  const bottomPanel = useCallback(() => {
    return (
      <View
        style={{backgroundColor: 'red', height: 300}}>
        <Text>{data.title}</Text>
      </View>
    );
  }, []);

  const openSheet = useCallback(() => {
    sheetRef.current?.snapTo(0);
  }, []);

  const closeSheet = useCallback(() => {
    sheetRef.current?.snapTo(1);
  }, []);

  const dismissOverlay = useCallback(
    () => Navigation.dismissOverlay(componentId),
    [componentId],
  );

  useEffect(() => {
    openSheet();
  }, []);

  const sheetPosition = useRef(new Animated.Value(1)).current;

  return (
    <>
      <Animated.View
        onTouchEnd={closeSheet}
        style={[
          SS.background,
          {opacity: Animated.sub(0.6, Animated.multiply(sheetPosition, 0.6))},
        ]}
      />
      <BottomSheet
        ref={sheetRef}
        snapPoints={[300, 0]}
        initialSnap={1}
        borderRadius={10}
        renderContent={bottomPanel}
        callbackNode={sheetPosition}
        onCloseEnd={dismissOverlay}
      />
    </>
  );
};

const SS = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    backgroundColor: 'black',
  },
});

BottomPanel.options = () => {
  return {
    layout: {
      componentBackgroundColor: 'transparent',
    },
    overlay: {
      interceptTouchOutside: true,
    },
  };
};
