import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {COLORS, SIZE} from '~/constants';
import Feather from 'react-native-vector-icons/Feather';
import {navigationRef} from '~/router';

const BackContainer = styled.TouchableOpacity`
  position: absolute;
  top: ${SIZE.SIZE_20}px;
  left: ${SIZE.SIZE_10}px;
  justify-content: center;
  align-items: center;
  width: ${SIZE.SIZE_45}px;
  height: ${SIZE.SIZE_45}px;
  background-color: ${COLORS.white};
  border-radius: ${SIZE.SIZE_50 / 2}px;
`;

const Back = () => {
  const insets = useSafeAreaInsets();

  return (
    <BackContainer
      style={{top: insets.top + SIZE.SIZE_10}}
      onPress={() => navigationRef.goBack()}>
      <Feather name="chevron-left" size={SIZE.SIZE_25} />
    </BackContainer>
  );
};

export default Back;
