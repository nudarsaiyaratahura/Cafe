/**/
/*
WelcomePage::WelcomePage() WelcomePage::WelcomePage()

NAME

        WelcomePage::WelcomePage - Displays a welcome screen before navigating to onboarding.

SYNOPSIS

        React Component WelcomePage({ navigation });

DESCRIPTION

        This component shows a welcome screen with the app name "RamapoCafe" for 3 seconds. 
        After the delay, it automatically navigates to the OnboardingPage. The background 
        image and overlay provide a visually appealing introduction to the app.

RETURNS

        Returns a React component that renders the welcome screen.

*/
/**/
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const WelcomePage = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('OnboardingPage');
    }, 3000); 
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground source={require('../../../assets/backgroundforwelcome.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.appName}>RamapoCafe</Text>
      </View>
    </ImageBackground>
  );
};

/*
styles::StyleSheet styles::StyleSheet

NAME

        styles::StyleSheet - Defines the styles for the welcome screen components.

SYNOPSIS

        const styles = StyleSheet.create({ ... });

DESCRIPTION

        This StyleSheet object styles the background image, container, and text on the welcome screen. 
        The background image covers the entire screen, with a dark overlay on the container to highlight the app name.

RETURNS

        Returns a StyleSheet object used to style the WelcomePage components.

*/
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default WelcomePage;
/**/
