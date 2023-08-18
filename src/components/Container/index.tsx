import styled from 'styled-components/native';
import {injectStyled} from '../style';
import {COLORS} from '~/constants';
import {SafeAreaView} from 'react-native-safe-area-context';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${COLORS.white};
  ${injectStyled}
`;

export default Container;
