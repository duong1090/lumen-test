/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo, useRef, useState} from 'react';
import styled from 'styled-components/native';
import {Back, Container, SwipeBtn, SwipeModal, Text, View} from '~/components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {COLORS, SIZE} from '~/constants';
import {useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ActivityIndicator, Dimensions, TouchableOpacity} from 'react-native';
import {formatCurrency, getRegionForCoordinates} from '~/utils';
import moment from 'moment';
import Map from './Map';
import {CoordinateModel, RegionModel} from '~/models';
import NotifyModal from './NotifyModal';
import {NotifyModalRef, RouteType} from './type';
import {navigationRef} from '~/router';

const SCREEN_HEIGHT = Dimensions.get('screen').height;
const HEADER_HEIGHT = 100;
const BOTTOM_OFFSET = SCREEN_HEIGHT - 250;
const OFFSET_MAP_TO_MIDDLE = 0.02;
const OFFSET_MAP_TO_BOTTOM = 0.005;

const InfoContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  height: ${HEADER_HEIGHT}px;
  padding: 0 ${SIZE.SIZE_20}px;
  background-color: ${COLORS.primary};
  border-top-left-radius: ${SIZE.SIZE_10}px;
  border-top-right-radius: ${SIZE.SIZE_10}px;
`;

const LocationContainer = styled(View)`
  padding: ${SIZE.SIZE_22}px ${SIZE.SIZE_16}px;
`;

const DateContainer = styled(View)`
  margin: 0 ${SIZE.SIZE_20}px;
  flex: 1;
`;

const CheckContainer = styled(View)`
  justify-content: center;
  align-items: center;
  width: ${SIZE.SIZE_45}px;
  height: ${SIZE.SIZE_45}px;
  background-color: ${COLORS.blue};
  border-radius: ${SIZE.SIZE_50 / 2}px;
`;

const PickUpContainer = styled(View)`
  flex-direction: row;
`;

const PickUpInfoContainer = styled(View)`
  position: absolute;
  bottom: -${SIZE.SIZE_50}px;
`;

const IconContainer = styled(View)`
  width: ${SIZE.SIZE_50}px;
  justify-content: center;
  align-items: center;
`;

const NameText = styled(Text).attrs(() => ({
  color: COLORS.primary,
  size: SIZE.SIZE_22,
  bold: true,
}))``;

const AddressText = styled(Text).attrs(() => ({
  size: SIZE.SIZE_16,
  color: COLORS.disable,
  mb: SIZE.SIZE_5,
}))`
  line-height: ${SIZE.SIZE_25}px;
`;

const StatusText = styled(Text).attrs(() => ({
  size: SIZE.SIZE_16,
  color: COLORS.yellow,
  bold: true,
}))``;

const Line = styled.View`
  background-color: ${COLORS.blue};
  width: ${SIZE.SIZE_2}px;
  height: 120px;
`;

const DropOffContainer = styled(View)`
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const JobDateContainer = styled(View)`
  padding: ${SIZE.SIZE_22}px ${SIZE.SIZE_25}px;
  flex-direction: row;
  justify-content: space-between;
`;

const HeaderContainer = styled(View)<{height: number}>`
  background-color: ${COLORS.white};
  height: ${props => props.height}px;
`;

const BackContainer = styled(TouchableOpacity)`
  width: ${SIZE.SIZE_50}px;
  height: ${SIZE.SIZE_50}px;
  justify-content: center;
  align-items: center;
`;

const HeaderFooter = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-bottom: ${SIZE.SIZE_16}px;
  border-bottom-width: ${SIZE.SIZE_2}px;
  border-bottom-color: ${COLORS.primary};
`;

const CurrLocationBtn = styled.TouchableOpacity`
  align-self: flex-end;
  margin: 0 ${SIZE.SIZE_20}px ${SIZE.SIZE_20}px 0;
  width: ${SIZE.SIZE_40}px;
  height: ${SIZE.SIZE_40}px;
  border-radius: ${SIZE.SIZE_40 / 2}px;
  background-color: ${COLORS.white};
  justify-content: center;
  align-items: center;
`;

const JobDetailView = () => {
  const {params} = useRoute<RouteType>();
  const insets = useSafeAreaInsets();
  const {job} = params;
  const [headerVisible, setHeaderVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [regionMap, setRegionMap] = useState<RegionModel>();
  const notifyModalRef = useRef<NotifyModalRef>(null);

  const coordinates = useMemo<CoordinateModel[]>(
    () => [
      {latitude: job.from.lat, longitude: job.from.long},
      {latitude: job.to.lat, longitude: job.to.long},
    ],
    [job],
  );

  useEffect(() => {
    setOnCurrLocation();
  }, []);

  const turnHeaderVisible = () => setHeaderVisibility(true);

  const turnHeaderInvisible = () => setHeaderVisibility(false);

  const setOnCurrLocation = () => {
    setRegionMap(getRegionForCoordinates(coordinates, OFFSET_MAP_TO_MIDDLE));
  };

  const onCompletedJob = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      notifyModalRef.current?.show();
    }, 2000);
  };

  const bounceToTopCallback = () => {
    turnHeaderVisible();
  };

  const bounceToMiddleCallback = () => {
    turnHeaderInvisible();
    setRegionMap(getRegionForCoordinates(coordinates, OFFSET_MAP_TO_MIDDLE));
  };

  const bounceToBottomCallback = () => {
    turnHeaderInvisible();
    setRegionMap(getRegionForCoordinates(coordinates, OFFSET_MAP_TO_BOTTOM));
  };

  return (
    <Container>
      <Map coordinates={coordinates} region={regionMap} />
      <Back />
      <SwipeModal
        bounceToTopCallback={bounceToTopCallback}
        bounceToMiddleCallback={bounceToMiddleCallback}
        bounceToBottomCallback={bounceToBottomCallback}
        panningCallback={turnHeaderInvisible}
        bottomOffset={BOTTOM_OFFSET}>
        {headerVisible ? (
          <HeaderContainer height={HEADER_HEIGHT + insets.top} pt={insets.top}>
            <View flexDirection="row" alignItems="center">
              <BackContainer onPress={() => navigationRef.goBack()}>
                <Feather name="chevron-left" size={SIZE.SIZE_25} />
              </BackContainer>
              <Text flex={1} textAlign="center" size={SIZE.SIZE_18} bold>
                Ly-4b3dec
              </Text>
              {loading ? (
                <BackContainer>
                  <ActivityIndicator color={COLORS.primary} />
                </BackContainer>
              ) : (
                <BackContainer />
              )}
            </View>
            <HeaderFooter>
              <Text mr={SIZE.SIZE_10} size={SIZE.SIZE_20}>
                {formatCurrency(job.cost)}
              </Text>
              <MaterialIcon
                name="loop"
                color={COLORS.blue}
                size={SIZE.SIZE_20}
              />
            </HeaderFooter>
          </HeaderContainer>
        ) : (
          <>
            <CurrLocationBtn onPress={setOnCurrLocation}>
              <MaterialIcon
                name="my-location"
                color={COLORS.primary}
                size={SIZE.SIZE_18}
              />
            </CurrLocationBtn>
            <InfoContainer>
              <Text size={SIZE.SIZE_35} bold color={COLORS.white}>
                {moment(job.duration).format('DD')}
              </Text>
              <DateContainer>
                <Text size={SIZE.SIZE_22} color={COLORS.white}>
                  {moment(job.duration).format('MMMM')}
                </Text>
                <Text
                  size={SIZE.SIZE_20}
                  color={COLORS.disable}
                  mt={SIZE.SIZE_5}>
                  N95899
                </Text>
              </DateContainer>
              <Text size={SIZE.SIZE_30} color={COLORS.white}>
                {formatCurrency(job.cost)}
              </Text>
            </InfoContainer>
          </>
        )}

        <View flex={1} backgroundColor={COLORS.white}>
          <LocationContainer>
            <View flexDirection="row" mb={SIZE.SIZE_20}>
              <CheckContainer>
                <MaterialCommunityIcons
                  name="shield-check"
                  size={SIZE.SIZE_25}
                  color={COLORS.white}
                />
              </CheckContainer>
              <Text
                mt={SIZE.SIZE_2}
                ml={SIZE.SIZE_16}
                size={SIZE.SIZE_18}
                bold
                color={COLORS.blue}>
                STANDARD RIDE
              </Text>
            </View>
            <PickUpContainer>
              <IconContainer>
                <MaterialIcon
                  name="emoji-people"
                  color={COLORS.blue}
                  size={SIZE.SIZE_20}
                />
              </IconContainer>
              <View flex={1}>
                <NameText>{job.from.name}</NameText>
                <PickUpInfoContainer>
                  <AddressText>{job.from.address}</AddressText>
                  <StatusText>Picked up</StatusText>
                </PickUpInfoContainer>
              </View>
            </PickUpContainer>
            <IconContainer mv={SIZE.SIZE_5}>
              <Line />
            </IconContainer>
            <DropOffContainer>
              <IconContainer>
                <MaterialIcon
                  name="circle"
                  color={COLORS.blue}
                  size={SIZE.SIZE_20}
                />
              </IconContainer>
              <View flex={1}>
                <Text mb={SIZE.SIZE_16}>6:06pm</Text>
                <NameText mb={SIZE.SIZE_10}>{job.to.name}</NameText>
                <AddressText>{job.to.address}</AddressText>
                <StatusText>Dropped - off</StatusText>
              </View>
            </DropOffContainer>
          </LocationContainer>
          <JobDateContainer>
            <Text size={SIZE.SIZE_16} color={COLORS.disable} bold>
              Job Date
            </Text>
            <Text size={SIZE.SIZE_16} bold>
              {moment(job.duration).format('DD/MM/YYYY')}
            </Text>
          </JobDateContainer>
          <SwipeBtn
            title="Completed"
            onCompleted={onCompletedJob}
            loading={loading}
          />
        </View>
      </SwipeModal>
      <NotifyModal ref={notifyModalRef} />
    </Container>
  );
};

export default JobDetailView;
