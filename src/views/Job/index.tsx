import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import {SceneMap, TabBar, TabBarItem, TabView} from 'react-native-tab-view';
import Ongoing from './Ongoing';
import Available from './Available';
import History from './History';
import {Container, Text} from '~/components';
import {COLORS, SIZE} from '~/constants';
import styled from 'styled-components/native';
import {TabBarLabelProps} from './type';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const TAB_BAR_HEIGHT = 40;

const renderScene = SceneMap({
  ongoing: Ongoing,
  available: Available,
  history: History,
});

const StyledLinearGradient = styled(LinearGradient)`
  flex: 1;
  padding: ${SIZE.SIZE_14}px;
`;

const StyledTabBar = styled(TabBar).attrs(() => ({
  indicatorStyle: {height: 0},
}))`
  min-height: ${TAB_BAR_HEIGHT}px;
  background-color: transparent;
  margin: 0 ${-SIZE.SIZE_5}px;
`;

const StyledTabBarItem = styled(TabBarItem)<{focused: boolean}>`
  background-color: ${props => (props.focused ? COLORS.primary : COLORS.grey)};
  border-radius: ${SIZE.SIZE_20}px;
  margin: 0 ${SIZE.SIZE_5}px;
  min-height: ${TAB_BAR_HEIGHT}px;
`;

const StyledLabelText = styled(Text)<TabBarLabelProps>`
  color: ${props => (props.focused ? COLORS.white : COLORS.disable)};
  font-size: ${SIZE.SIZE_14}px;
  font-weight: 500;
`;

const StyledActionBtn = styled.TouchableOpacity`
  position: absolute;
  bottom: ${SIZE.SIZE_20}px;
  left: ${SIZE.SIZE_20}px;
  justify-content: center;
  align-items: center;
  width: ${SIZE.SIZE_45}px;
  height: ${SIZE.SIZE_45}px;
  background-color: ${COLORS.white};
  border-radius: ${SIZE.SIZE_50 / 2}px;
`;

const JobView = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'ongoing', title: 'Ongoing'},
    {key: 'available', title: 'Available'},
    {key: 'history', title: 'History'},
  ]);

  const renderLabel = (props: any) => (
    <StyledLabelText focused={props.focused}>
      {props.route.title}
    </StyledLabelText>
  );

  const renderTabBarItem = (props: any) => {
    const focused = props.key === routes[index].key;
    return <StyledTabBarItem {...props} focused={focused} />;
  };

  const renderTabBar = (props: any) => {
    return (
      <StyledTabBar
        {...props}
        activeColor={COLORS.white}
        inactiveColor={COLORS.disable}
        renderLabel={renderLabel}
        renderTabBarItem={renderTabBarItem}
      />
    );
  };

  return (
    <Container edges={['top']}>
      <StyledLinearGradient
        colors={[
          COLORS.white,
          COLORS.white,
          COLORS.white,
          '#f1f1f1',
          '#57575a',
        ]}>
        <Text color={COLORS.primary} size={SIZE.SIZE_30} bold mb={SIZE.SIZE_20}>
          Jobs
        </Text>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={{width: SCREEN_WIDTH}}
        />
      </StyledLinearGradient>
      <StyledActionBtn>
        <MaterialIcons
          name="electric-bolt"
          size={SIZE.SIZE_25}
          color={COLORS.green}
        />
      </StyledActionBtn>
    </Container>
  );
};

export default JobView;
