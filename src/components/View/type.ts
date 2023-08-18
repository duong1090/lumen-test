import {FlexAlignType} from 'react-native';
import {InjectProps} from '../type';

export type ViewProps = {
  flexDirection?: 'row' | 'column';
  alignItems?: FlexAlignType;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined;
} & InjectProps;
