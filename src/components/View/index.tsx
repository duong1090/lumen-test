import styled from 'styled-components/native';
import {injectStyled} from '../style';
import {ViewProps} from './type';

const StyledView = styled.View<ViewProps>`
  ${props =>
    props.flexDirection ? `flex-direction: ${props.flexDirection};` : ''}
  ${props => (props.alignItems ? `align-items: ${props.alignItems};` : '')}
  ${props =>
    props.justifyContent ? `justify-content: ${props.justifyContent};` : ''}
  ${injectStyled}
`;

export default StyledView;
