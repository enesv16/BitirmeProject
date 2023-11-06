import React from 'react';
import { View, Text, StyleSheet,StatusBar, Image, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import MainScreen from '../../screens/MainScreen/MainScreen';
import CurrencyAlarmScreen from '../../screens/CurrencyAlarmScreen/CurrencyAlarmScreen';
import AccountsScreen from '../../screens/AccountsScreen/AccountsScreen';
import CurrencyPurchaseScreen from '../../screens/CurrencyPurchase/CurrencyPurchase';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';


const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


const DrawerMenu = () => (
  <Drawer.Navigator
    initialRouteName="AccountsScreen"
    drawerPosition="right"
    screenOptions={{
      headerShown: false,
      headerStyle:{
        
        backgroundColor: 'gray',
      },
      headerTitleContainerStyle:{
        backgroundColor: 'gray',
      },
          drawerStyle: {
      backgroundColor: '#c6cbef',
      width: 240,
    },
    }}
  >
    <Drawer.Screen
      name="Ana Ekran"
      component={BottomTabNavigator}
      options={{ drawerLabel: 'Ana Ekran' }}
    />
  </Drawer.Navigator>
);


const BottomTabNavigator = () => (
  <View style={styles.container}>
    <LinearGradient
      colors={['#2c7da0', '#014270', '#2c7da0']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#f0c808',
          tabBarInactiveTintColor: 'white',
          keyboardHidesTabBar: true,
          tabBarStyle: {
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            elevation: 0,
          },
        }}
      >
        <Tab.Screen
          name="Döviz İzle"
          component={MainScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Alarmlar"
          component={CurrencyAlarmScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="bell" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Satın Alım"
          component={CurrencyPurchaseScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="shopping-cart" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Cüzdanlar"
          component={AccountsScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon5 name="wallet" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </LinearGradient>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DrawerMenu;
