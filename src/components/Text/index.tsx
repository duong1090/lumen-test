import {TextProps} from './type';
import styled from 'styled-components/native';
import {COLORS, FONT_FAMILY, SIZE} from '~/constants';
import {injectStyled} from '../style';

const Text = styled.Text<TextProps>`
  font-family: ${FONT_FAMILY};
  font-size: ${props => props.size || SIZE.SIZE_14}px;
  font-weight: ${props => (props.bold ? 600 : 'normal')};
  color: ${props => props.color || COLORS.primary};
  font-style: ${props => (props.italic ? 'italic' : 'normal')};
  text-align: ${props => (props.textAlign ? props.textAlign : 'auto')};
  ${injectStyled}
`;

export default Text;
