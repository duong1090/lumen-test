import {GestureResponderEvent} from 'react-native';
import {LocationModel} from '~/models';

export type JobCardProps = {
  name: string;
  cost: number;
  duration: string;
  from: LocationModel;
  to: LocationModel;
  onPress?: (event: GestureResponderEvent) => void;
};
