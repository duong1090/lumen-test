/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CoinView, HomeView, JobDetailView, JobView, MenuView} from '~/views';
import {StackParamList, TabParamList} from './type';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {FONT_FAMILY, SIZE} from '~/constants';
import {Platform} from 'react-native';

const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();
export const navigationRef = createNavigationContainerRef<StackParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {fontSize: SIZE.SIZE_14, fontFamily: FONT_FAMILY},
      }}>
      <Tab.Screen
        name="ROUTE_HOME"
        component={HomeView}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <FeatherIcon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ROUTE_COIN"
        component={CoinView}
        options={{
          tabBarLabel: 'Coin',
          tabBarIcon: ({color, size}) => (
            <FeatherIcon name="dollar-sign" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ROUTE_JOB"
        component={JobView}
        options={{
          tabBarLabel: 'Job',
          tabBarIcon: ({color, size}) => (
            <AntIcon name="car" color={color} size={size} />
          ),
          tabBarBadge: '',
          tabBarBadgeStyle: {
            top: Platform.OS === 'ios' ? 4 : 9,
            minWidth: SIZE.SIZE_10,
            maxHeight: SIZE.SIZE_10,
            borderRadius: SIZE.SIZE_5,
            fontSize: SIZE.SIZE_5,
            lineHeight: SIZE.SIZE_10,
            alignSelf: undefined,
          },
        }}
      />
      <Tab.Screen
        name="ROUTE_MENU"
        component={MenuView}
        options={{
          tabBarLabel: 'Menu',
          tabBarIcon: ({color, size}) => (
            <FeatherIcon name="menu" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const RouteProvider = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="ROUTE_BOTTOM_TABS" component={BottomTabNavigator} />
        <Stack.Screen name="ROUTE_JOB_DETAIL" component={JobDetailView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RouteProvider;
