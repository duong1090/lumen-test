import {InjectProps} from './type';
import {css} from 'styled-components/native';

export const injectStyled = css`
  ${(props: InjectProps) =>
    props.mh || props.mr ? `margin-right: ${props.mh || props.mr}px` : ''};
  ${(props: InjectProps) =>
    props.mv || props.mt ? `margin-top: ${props.mv || props.mt}px` : ''};
  ${(props: InjectProps) =>
    props.mh || props.ml ? `margin-left: ${props.mh || props.ml}px` : ''};
  ${(props: InjectProps) =>
    props.mv || props.mb ? `margin-bottom: ${props.mv || props.mb}px` : ''};
  ${(props: InjectProps) => (props.m ? `margin: ${props.m}px` : '')};
  ${(props: InjectProps) =>
    props.ph || props.pv ? `padding-right: ${props.ph || props.pv}px` : ''};
  ${(props: InjectProps) =>
    props.pv || props.pt ? `padding-top: ${props.pv || props.pt}px` : ''};
  ${(props: InjectProps) =>
    props.ph || props.pl ? `padding-left: ${props.ph || props.pl}px` : ''};
  ${(props: InjectProps) =>
    props.pv || props.pb ? `padding-bottom: ${props.pv || props.pb}px` : ''};
  ${(props: InjectProps) => (props.p ? `padding: ${props.p}px` : '')};
  ${(props: InjectProps) =>
    props.alignSelf ? `align-self: ${props.alignSelf}` : ''};
  ${(props: InjectProps) => (props.zIndex ? `z-index: ${props.zIndex}` : '')};
  ${(props: InjectProps) => (props.flex ? `flex: ${props.flex}` : '')};
  ${(props: InjectProps) =>
    props.width
      ? `width: ${props.width}${typeof props.width === 'number' ? 'px' : ''}`
      : ''};
  ${(props: InjectProps) =>
    props.height
      ? `height: ${props.height}${typeof props.height === 'number' ? 'px' : ''}`
      : ''};
  ${(props: InjectProps) =>
    props.backgroundColor ? `backgroundColor: ${props.backgroundColor}` : ''};
`;
