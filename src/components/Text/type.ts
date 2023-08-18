import type {TextProps as RNTextProps} from 'react-native';
import {InjectProps} from '../type';

export type TextProps = {
  size?: number;
  color?: string;
  bold?: boolean;
  italic?: boolean;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
} & RNTextProps &
  InjectProps;
