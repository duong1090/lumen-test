import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {JobCard} from '~/components';
import {SIZE} from '~/constants';
import {JobModel} from '~/models';
import {StackParamList} from '~/router';

const DUMMY_DATA: JobModel[] = [
  {
    name: 'Expo Hall 7',
    cost: 65,
    duration: '2024-03-17',
    from: {
      name: 'Expo Hall 7',
      address: 'Expo Hall 7, Singapore',
      lat: 1.3371947976182734,
      long: 103.96160037773205,
    },
    to: {
      name: 'Far East Plaza',
      address: '14, Scotts Road, Orchard, Singapore, Singapore, 228213',
      lat: 1.3070322851732674,
      long: 103.83363812713436,
    },
  },
];

const StyledView = styled.View`
  margin-top: ${SIZE.SIZE_30}px;
`;

const Ongoing = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const onPressJobDetail = (job: JobModel) => {
    navigation.navigate('ROUTE_JOB_DETAIL', {job});
  };

  return (
    <StyledView>
      <FlatList
        data={DUMMY_DATA}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <JobCard {...item} onPress={() => onPressJobDetail(item)} />
        )}
      />
    </StyledView>
  );
};

export default Ongoing;
