import {RouteProp} from '@react-navigation/native';
import {StackParamList} from '~/router';

export type RouteType = RouteProp<StackParamList, 'ROUTE_JOB_DETAIL'>;
export type NotifyModalRef = {
  show: () => void;
  hide: () => void;
};
