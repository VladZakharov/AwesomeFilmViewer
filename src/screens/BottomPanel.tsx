import React, {useCallback, useEffect, useRef} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Navigation, NavigationFunctionComponent} from 'react-native-navigation';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import {FilmModel} from '../model';

const PANEL_HEIGHT = 300;

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
      <View style={SS.panel}>
        <ScrollView
          alwaysBounceVertical={false}
          contentContainerStyle={SS.contentContainer}
          showsVerticalScrollIndicator={false}>
          <Text style={SS.title}>{data.title}</Text>
          <Text style={SS.text}>{`Директор: ${data.director}`}</Text>
          <Text style={SS.text}>{`Продюсер: ${data.producer}`}</Text>
          <Text style={SS.text}>{`Год выхода: ${data.release_date}`}</Text>
          <Text
            style={SS.text}>{`Оценка пользователей: ${data.rt_score}`}</Text>
          <Text style={SS.text}>{`Описание: ${data.description}`}</Text>
        </ScrollView>
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
        snapPoints={[PANEL_HEIGHT, 0]}
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
  panel: {
    backgroundColor: 'white',
    height: PANEL_HEIGHT,
  },
  contentContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  text: {
    fontSize: 14,
    color: 'black',
    marginVertical: 4,
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
