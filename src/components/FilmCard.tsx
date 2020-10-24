import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FilmModel} from '../model';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {selectFilmsIsFavorite} from '../store/selectors';
import {addToFavorites, removeFromFavorites} from '../store/slice';

interface Props {
  data: FilmModel;
  onPress?: (data: FilmModel) => void;
}

export const FilmCard = (props: Props) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state) =>
    selectFilmsIsFavorite(state, props.data.id),
  );

  const onStarPress = useCallback(() => {
    if (isFavorite) {
      dispatch(removeFromFavorites(props.data.id));
    } else {
      dispatch(addToFavorites(props.data.id));
    }
  }, [props.data.id, isFavorite]);

  const [expanded, setExpanded] = useState(false);

  const toggle = useCallback(() => {
    setExpanded((e) => !e);
  }, []);

  const onPress = useCallback(() => {
    if (props.onPress) {
      props.onPress(props.data);
    }
  }, [props.onPress, props.data]);

  const data = props.data;
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1} style={SS.container}>
      <View style={SS.header}>
        <Text style={SS.title}>
          {data.title}
          <Text style={SS.smallText}>{` (${data.release_date})`}</Text>
        </Text>
        <TouchableOpacity onPress={onStarPress} style={SS.icon}>
          {isFavorite ? (
            <Icon name={'star'} size={20} color={'#ffa53e'} />
          ) : (
            <Icon name={'star-o'} size={20} color={'black'} />
          )}
        </TouchableOpacity>
      </View>
      <Text style={SS.smallText}>{`Рейтинг: ${data.rt_score}`}</Text>

      <View style={{alignItems: 'flex-start'}}>
        <Text
          numberOfLines={expanded ? undefined : 3}
          // onTextLayout={e => console.warn(e.nativeEvent)}
          style={SS.description}>
          {data.description}
        </Text>
        <TouchableOpacity onPress={toggle}>
          <Text style={SS.subtext}>{expanded ? 'Свернуть' : 'Развернуть'}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const SS = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  smallText: {
    fontSize: 14,
    fontWeight: 'normal',
    color: 'grey',
  },
  description: {
    flexShrink: 1,
    fontSize: 14,
    fontWeight: 'normal',
    color: 'red',
  },
  subtext: {
    flexShrink: 1,
    fontSize: 14,
    fontWeight: 'normal',
    color: 'black',
  },
  icon: {
    margin: 5,
  },
});
