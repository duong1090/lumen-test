import React, {FC} from 'react';
import {SwipeBtnProps} from './type';
import styled from 'styled-components/native';
import View from '../View';
import {COLORS, SIZE} from '~/constants';
import GradientTitle from './GradientTitle';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import {Dimensions} from 'react-native';
import {ActivityIndicator} from 'react-native';

const BTN_HEIGHT = 55;
const BTN_WIDTH = Dimensions.get('screen').width - SIZE.SIZE_25 * 2;
const CIRCLE_SIZE = BTN_HEIGHT - 8;
const CIRCLE_MARGIN = 4;
const CIRCLE_DISTANCE = BTN_WIDTH - CIRCLE_SIZE - CIRCLE_MARGIN * 2;

const SwipeCircle = styled(Animated.View)`
  position: absolute;
  top: ${CIRCLE_MARGIN}px;
  left: ${CIRCLE_MARGIN}px;
  background-color: ${COLORS.white};
  width: ${CIRCLE_SIZE}px;
  height: ${CIRCLE_SIZE}px;
  border-radius: ${CIRCLE_SIZE / 2}px;
  justify-content: center;
  align-items: center;
`;

const SwipeBtnContainer = styled(View)`
  background-color: ${COLORS.blue};
  margin: ${SIZE.SIZE_25}px;
  height: ${BTN_HEIGHT}px;
  border-radius: ${BTN_HEIGHT / 2}px;
  justify-content: center;
  align-items: center;
`;

const SwipeBtn: FC<SwipeBtnProps> = props => {
  const {loading, onCompleted} = props;
  const translateX = useSharedValue(0);

  const panHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      lastX: number;
      startX: number;
    }
  >({
    onStart: (event, ctx) => {
      ctx.lastX = translateX.value;
      ctx.startX = event.translationX;
    },
    onActive: (event, ctx) => {
      if (
        ctx.lastX + event.translationX >= 0 &&
        ctx.lastX + event.translationX <= CIRCLE_DISTANCE
      ) {
        translateX.value = ctx.lastX + event.translationX;
      }
    },
    onEnd: () => {
      if (translateX.value >= CIRCLE_DISTANCE * 0.7) {
        translateX.value = withTiming(CIRCLE_DISTANCE);
        runOnJS(onCompleted)();
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [{translateX: translateX.value}],
    }),
    [translateX.value],
  );

  return (
    <SwipeBtnContainer>
      <GradientTitle title={props.title} />
      <PanGestureHandler onGestureEvent={panHandler}>
        <SwipeCircle style={animatedStyle}>
          {loading ? (
            <ActivityIndicator color={COLORS.primary} />
          ) : (
            <MaterialCommunityIcons name="swap-horizontal" size={30} />
          )}
        </SwipeCircle>
      </PanGestureHandler>
    </SwipeBtnContainer>
  );
};

SwipeBtn.defaultProps = {
  onCompleted: () => {},
};

export default SwipeBtn;
