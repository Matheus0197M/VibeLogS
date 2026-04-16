import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import NewEntryScreen from '../screens/NewEntryScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabBarIcon({ name, focused }) {
  const icons = {
    Home: focused ? '    ' : '    ',
    Profile: focused ? '    ' : '    ',
  };
  return <Text>{icons[name]}</Text>;
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => (
          <TabBarIcon name={route.name} focused={focused} />
        ),
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
export default function AppNavigator() {
  const { isAuthenticated } = useAuth();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="NewEntry" component={NewEntryScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
