import {JobModel} from '~/models';
import * as routers from './constants';

export type TabParamList = {
  [routers.ROUTE_HOME]: undefined;
  [routers.ROUTE_COIN]: undefined;
  [routers.ROUTE_JOB]: undefined;
  [routers.ROUTE_MENU]: undefined;
};

export type StackParamList = {
  [routers.ROUTE_BOTTOM_TABS]: undefined;
  [routers.ROUTE_JOB_DETAIL]: {job: JobModel};
};
