import {GestureResponderEvent} from 'react-native';

export type SwipeBtnProps = {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  loading?: boolean;
  onCompleted: () => void;
};
