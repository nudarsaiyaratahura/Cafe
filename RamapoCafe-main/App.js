/*
App::App() App::App()

NAME

        App::App - serves as the entry point of the application.

SYNOPSIS

        React Native Component App();

DESCRIPTION

        This function defines the main component of the application.
        It initializes the navigation stack and specifies the routes
        for various screens. The app starts with the WelcomeScreen and 
        allows navigation to other screens like OnboardingPage, WelcomePage,
        LoginScreen, SignUp, HomePage, UserProfile, ProductPage, UserCart,
        PlaceOrder, TrackOrder, and PaymentPage. The NavigationContainer
        wraps the stack navigator, managing the navigation flow.

RETURNS

        Returns a React Native component wrapped in a NavigationContainer that
        manages the routing and rendering of the application's screens.

*/


import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './source/screens/LoginSignup Screens/WelcomeScreen';
import OnboardingPage from './source/screens/LoginSignup Screens/OnboardingPage';
import WelcomePage from './source/screens/LoginSignup Screens/WelcomePage';
import LoginScreen from './source/screens/LoginSignup Screens/Login';
import SignUp from './source/screens/LoginSignup Screens/SignUp';
import HomePage from './source/screens/HomePage';
import UserProfile from './source/screens/UserProfile';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductPage from './source/screens/ProductPage';
import UserCart from './source/screens/UserCart';
import PlaceOrder from './source/screens/PlaceOrder';
import TrackOrder from './source/screens/TrackOrder';
import PaymentPage from './source/screens/PaymentPage';

export default function App() {

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='WelcomeScreen'>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="OnboardingPage" component={OnboardingPage} options={{headerShown: false}}/>
        <Stack.Screen name="WelcomePage" component={WelcomePage} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
        <Stack.Screen name="HomePage" component={HomePage} options={{headerShown: false}}/>
        <Stack.Screen name="UserProfile" component={UserProfile} options={{headerShown:false}}/>
        <Stack.Screen name="ProductPage" component={ProductPage} options={{headerShown:false}}/>
        <Stack.Screen name="UserCart" component={UserCart} options={{headerShown:false}}/>
        <Stack.Screen name="PlaceOrder" component={PlaceOrder} options={{headerShown:false}}/>
        <Stack.Screen name="TrackOrder" component={TrackOrder} options={{headerShown:false}}/>
        <Stack.Screen name="PaymentPage" component={PaymentPage} options={{headerShown:false}}/>
         
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
