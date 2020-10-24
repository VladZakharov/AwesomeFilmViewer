import React, {useCallback} from 'react';
import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {FilmModel} from '../model';
import {FilmCard} from './FilmCard';

interface Props
  extends Pick<FlatListProps<FilmModel>, 'data' | 'refreshing' | 'onRefresh'> {
  loading?: boolean;
  error?: boolean;
}

export const FilmList = (props: Props) => {
  const renderFilmCard = useCallback(
    ({item}: ListRenderItemInfo<FilmModel>) => {
      return <FilmCard data={item} />;
    },
    [],
  );

  const ListEmptyComponent = useCallback(() => {
    if (props.loading) {
      return (
        <View style={SS.container}>
          <ActivityIndicator color={'black'} />
        </View>
      );
    }
    if (props.error) {
      return (
        <View style={SS.container}>
          <Text>Произошла ошибка.</Text>
        </View>
      );
    }
    return (
      <View style={SS.container}>
        <Text>Ничего не найдено.</Text>
      </View>
    );
  }, [props.loading, props.error]);

  return (
    <FlatList
      contentContainerStyle={{flexGrow:1}}
      ListEmptyComponent={ListEmptyComponent}
      data={props.data}
      refreshing={props.refreshing}
      onRefresh={props.onRefresh}
      renderItem={renderFilmCard}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id}
    />
  );
};

const SS = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
