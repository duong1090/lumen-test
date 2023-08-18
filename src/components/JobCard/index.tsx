import React, {FC} from 'react';
import {JobCardProps} from './type';
import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {COLORS, SIZE} from '~/constants';
import View from '../View';
import Text from '../Text';
import {formatCurrency} from '~/utils';
import moment from 'moment';

const JobCardContainer = styled.TouchableOpacity`
  background-color: ${COLORS.primary};
  padding: ${SIZE.SIZE_16}px;
  padding-bottom: ${SIZE.SIZE_30}px;
  padding-top: ${SIZE.SIZE_20}px;
  border-radius: ${SIZE.SIZE_5}px;
`;

const TextContainer = styled(Text)`
  line-height: ${SIZE.SIZE_20}px;
  flex: 1;
`;

const NameText = styled(Text).attrs(() => ({
  color: COLORS.white,
  size: SIZE.SIZE_16,
  bold: true,
}))``;

const StreetText = styled(Text).attrs(() => ({
  color: COLORS.disable,
  size: SIZE.SIZE_14,
}))``;

const IconContainer = styled(View)`
  width: ${SIZE.SIZE_30}px;
  justify-content: center;
  align-items: center;
`;

const Line = styled.View`
  background-color: ${COLORS.blue};
  width: ${SIZE.SIZE_2}px;
  height: ${SIZE.SIZE_20}px;
`;

const JobCard: FC<JobCardProps> = props => {
  return (
    <JobCardContainer onPress={props.onPress}>
      <View flexDirection="row" justifyContent="space-between">
        <NameText>{props.name}</NameText>
        <View alignItems="flex-end">
          <Text color={COLORS.grey} size={SIZE.SIZE_16}>
            {formatCurrency(props.cost)}
          </Text>
          <View flexDirection="row" mt={SIZE.SIZE_2}>
            <FeatherIcon
              name="clock"
              color={COLORS.disable}
              size={SIZE.SIZE_14}
            />
            <Text ml={SIZE.SIZE_5} color={COLORS.disable} size={SIZE.SIZE_12}>
              {moment(props.duration).fromNow()}
            </Text>
          </View>
        </View>
      </View>
      <View mt={SIZE.SIZE_14}>
        <View flexDirection="row" alignItems="center">
          <IconContainer>
            <MaterialIcon
              name="emoji-people"
              color={COLORS.blue}
              size={SIZE.SIZE_16}
            />
          </IconContainer>

          <TextContainer>
            <NameText>{props.from.name}</NameText>
            <StreetText> - {props.from.address}</StreetText>
          </TextContainer>
        </View>

        <IconContainer mv={SIZE.SIZE_5}>
          <Line />
        </IconContainer>
        <View flexDirection="row" alignItems="flex-start">
          <IconContainer>
            <MaterialIcon
              name="circle"
              color={COLORS.blue}
              size={SIZE.SIZE_20}
            />
          </IconContainer>

          <TextContainer>
            <NameText>{props.to.name}</NameText>
            <StreetText> - {props.to.address}</StreetText>
          </TextContainer>
        </View>
      </View>
    </JobCardContainer>
  );
};

export default JobCard;
