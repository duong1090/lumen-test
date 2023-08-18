import React, {FC} from 'react';
import {SwipeModalProps} from './type';
import styled from 'styled-components/native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Dimensions} from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('screen').height;

const RANGES = [
  {
    boundary: SCREEN_HEIGHT * 0.2,
    toY: 0,
  },
  {
    boundary: SCREEN_HEIGHT * 0.45,
    toY: SCREEN_HEIGHT * 0.45,
  },
  {
    boundary: SCREEN_HEIGHT * 0.7,
    toY: SCREEN_HEIGHT * 0.7,
  },
];

const ACTION_BOUNDARY = {
  toMove: 10,
};

const SwipeModalContainer = styled(Animated.View)`
  position: absolute;
  top: 0;
  width: 100%;
  height: ${SCREEN_HEIGHT * 2}px;
`;

const SwipeModal: FC<SwipeModalProps> = props => {
  const translateY = useSharedValue(RANGES[1].toY);

  const panHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      lastY: number;
      startY: number;
    }
  >({
    onStart: (event, ctx) => {
      ctx.lastY = translateY.value;
      ctx.startY = event.translationY;
    },
    onActive: (event, ctx) => {
      if (Math.abs(event.translationY) >= ACTION_BOUNDARY.toMove) {
        translateY.value = ctx.lastY + event.translationY;
        runOnJS(props.panningCallback)();
      }
    },
    onEnd: () => {
      if (translateY.value <= RANGES[0].boundary) {
        runOnJS(props.bounceToTopCallback)();
        translateY.value = withTiming(props.topOffset || RANGES[0].toY);
      } else if (
        translateY.value > RANGES[0].boundary &&
        translateY.value < RANGES[2].boundary
      ) {
        translateY.value = withTiming(RANGES[1].toY, {}, () => {
          return runOnJS(props.bounceToMiddleCallback)();
        });
      } else if (translateY.value >= RANGES[2].boundary) {
        runOnJS(props.bounceToBottomCallback)();
        translateY.value = withTiming(
          props.bottomOffset || RANGES[2].toY,
          {},
          () => {
            return runOnJS(props.bounceToBottomCallback)();
          },
        );
      }
    },
  });

  const animationStyle = useAnimatedStyle(
    () => ({
      transform: [{translateY: translateY.value}],
    }),
    [translateY],
  );

  return (
    <PanGestureHandler onGestureEvent={panHandler}>
      <SwipeModalContainer style={animationStyle}>
        {props.children}
      </SwipeModalContainer>
    </PanGestureHandler>
  );
};

SwipeModal.defaultProps = {
  bounceToTopCallback: () => {},
  bounceToMiddleCallback: () => {},
  bounceToBottomCallback: () => {},
  panningCallback: () => {},
};

export default SwipeModal;
