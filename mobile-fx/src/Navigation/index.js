import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen/SignupScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import BottomTabNavigator from '../components/BottomTabNavigator/BottomTabNavigator';
import CurrencyAlarmScreen from '../screens/CurrencyAlarmScreen/CurrencyAlarmScreen';
import CreateAccountScreen from '../screens/AccountsScreen/CreateAccountScreen';
import AccountsScreen from '../screens/AccountsScreen/AccountsScreen';
import CurrencyPurchase from '../screens/CurrencyPurchase/CurrencyPurchase';
import ChartScreen from '../screens/ChartScreen/ChartScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={ {headerShown: false}}>
            <Stack.Screen name='SignIn' component={SignInScreen}/>
            <Stack.Screen name='SignUp' component={SignUpScreen}/>
            <Stack.Screen name='Register' component={RegisterScreen}/>
            <Stack.Screen name='BottomTabNavigator' component={BottomTabNavigator}/>
            <Stack.Screen name='CurrencyAlarmScreen' component={CurrencyAlarmScreen}/>
            <Stack.Screen name='CreateAccountScreen' component={CreateAccountScreen}/>
            <Stack.Screen name='AccountsScreen' component={AccountsScreen}/>
            <Stack.Screen name='CurrencyPurchase' component={CurrencyPurchase}/>
            <Stack.Screen name='ChartScreen' component={ChartScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
};


export default Navigation