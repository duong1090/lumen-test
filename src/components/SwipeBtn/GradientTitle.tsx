import React, {FC, useEffect} from 'react';
import {COLORS} from '~/constants';
import {Defs, LinearGradient, Stop, Svg, Text, TSpan} from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const GradientTitle: FC<{title: string}> = ({title}) => {
  const offset = useSharedValue(0);

  useEffect(() => {
    offset.value = withRepeat(withTiming(800, {duration: 6000}), 0);
  }, [offset]);

  const animatedProps = useAnimatedProps(
    () => ({
      x2: `${offset.value}%`,
    }),
    [offset.value],
  );

  return (
    <Svg width="100%" height="100%" viewBox="0 0 800 250">
      <Defs>
        <AnimatedLinearGradient
          animatedProps={animatedProps}
          id="Gradient"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          y2="0">
          <Stop stopColor={COLORS.white} offset={0} />
          <Stop stopColor={COLORS.primary} offset={0.25} />
          <Stop stopColor={COLORS.primary} offset={0.5} />
          <Stop stopColor={COLORS.white} offset={1} />
        </AnimatedLinearGradient>
      </Defs>
      <Text
        id="Text"
        x="400"
        y="150"
        fill="url(#Gradient)"
        fontFamily="Hellix"
        fontWeight="600"
        textAnchor="middle">
        <TSpan fontSize="80" x="400" y="150">
          {title}
        </TSpan>
      </Text>
    </Svg>
  );
};

export default GradientTitle;
