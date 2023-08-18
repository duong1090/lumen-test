import React, {forwardRef, useImperativeHandle, useState} from 'react';
import ReactNativeModal from 'react-native-modal';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, SIZE} from '~/constants';
import {Text} from '~/components';
import {Image} from 'react-native';
import {NotifyModalRef} from './type';

const StyledModal = styled(ReactNativeModal)`
  justify-content: flex-end;
  margin: 0;
`;

const Container = styled(SafeAreaView)`
  background-color: ${COLORS.white};
  padding: ${SIZE.SIZE_16}px;
`;

const CloseContainer = styled.TouchableOpacity`
  align-self: flex-end;
  width: ${SIZE.SIZE_30}px;
  height: ${SIZE.SIZE_30}px;
`;

const StyledImage = styled(Image).attrs(() => ({
  resizeMode: 'contain',
}))`
  width: 200px;
  height: 180px;
  align-self: center;
`;

const Btn = styled.TouchableOpacity`
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.primary};
  border-radius: ${SIZE.SIZE_10}px;
  margin: ${SIZE.SIZE_40}px 0;
`;

const NotifyModal = forwardRef<NotifyModalRef, {}>((_, ref) => {
  const [visible, setVisibility] = useState(false);

  useImperativeHandle(ref, () => ({
    show,
    hide,
  }));

  const show = () => {
    setVisibility(true);
  };
  const hide = () => {
    setVisibility(false);
  };

  return (
    <StyledModal isVisible={visible} onBackdropPress={hide}>
      <Container>
        <CloseContainer onPress={hide}>
          <Ionicons name="close" size={SIZE.SIZE_25} color={COLORS.disable} />
        </CloseContainer>
        <StyledImage source={require('./image.png')} />
        <Text
          textAlign="center"
          size={SIZE.SIZE_25}
          mh={SIZE.SIZE_20}
          bold
          color={COLORS.primary}>
          You have not arrived back at Expo
        </Text>
        <Text
          mt={SIZE.SIZE_20}
          textAlign="center"
          size={SIZE.SIZE_18}
          bold
          color={COLORS.disable}>
          Please report back at Foyer 1 to complete the job.
        </Text>
        <Btn onPress={hide}>
          <Text color={COLORS.white} size={SIZE.SIZE_18}>
            Ok
          </Text>
        </Btn>
      </Container>
    </StyledModal>
  );
});

export default NotifyModal;
