/**/
/*
OnboardingScreen::OnboardingScreen() OnboardingScreen::OnboardingScreen()

NAME

        OnboardingScreen::OnboardingScreen - Renders an onboarding experience for the application.

SYNOPSIS

        React Native Component OnboardingScreen();

DESCRIPTION

        This component handles the onboarding process of the application. It displays a series of 
        onboarding steps that guide the user through key features of the app. The component maintains
        the current step using a state variable and provides navigation options like skipping or proceeding
        to the next step.

        The steps array contains the information for each onboarding screen, including a title, description, 
        and image. Users can navigate through the steps using the "NEXT" button or skip the process entirely
        using the "SKIP" button. Upon completing the onboarding process, the "Get Started" button will navigate 
        the user to the WelcomePage.

RETURNS

        Returns a React Native component that renders the onboarding steps and handles navigation based on user interaction.

*/

/**/
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OnboardingScreen = () => {
  
  const [currentStep, setCurrentStep] = useState(0);

  
  const navigation = useNavigation();

  
  const steps = [
    {
      title: "Discover places near you",
      description: "We make it simple to find the food you crave. Enter your address and let us do the rest.",
      image: require('../../../assets/board1.jpg'), 
    },
    {
      title: "Order your favourite",
      description: "When you order from us, we will hook you up with exclusive coupons, special rewards.",
      image: require('../../../assets/board2.jpg'), 
    },
    {
      title: "Fastest Delivery",
      description: "We make food ordering fast, simple, and free - no matter if you order online or cash.",
      image: require('../../../assets/board3.jpg'), 
    },
  ];

 
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  
  const handleSkip = () => {
    navigation.replace('WelcomePage'); 
  };


  const handleGetStarted = () => {
    navigation.replace('WelcomePage'); 
  }

  return (
    
    <View style={styles.container}>
      <Image source={steps[currentStep].image} style={styles.image} />
      <Text style={styles.title}>{steps[currentStep].title}</Text>
      <Text style={styles.description}>{steps[currentStep].description}</Text>
      <View style={styles.pagination}>
        {steps.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentStep === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
      <View style={styles.buttonContainer}>
        {currentStep < steps.length - 1 ? (
          <>
            <TouchableOpacity onPress={handleSkip}>
              <Text style={styles.skipText}>SKIP</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
              <Text style={styles.nextText}>NEXT</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={handleGetStarted} style={styles.getStartedButton}>
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

/*
styles::StyleSheet styles::StyleSheet

NAME

        styles::StyleSheet - Defines the styles for the onboarding screen components.

SYNOPSIS

        const styles = StyleSheet.create({ ... });

DESCRIPTION

        This StyleSheet object defines the styling rules for the various components 
        in the onboarding screen, including the container, image, title, description,
        pagination dots, and buttons. It ensures a consistent and visually appealing 
        layout across the onboarding steps.

RETURNS

        Returns a StyleSheet object that can be used to style components in the onboarding screen.

*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'orange',
  },
  inactiveDot: {
    backgroundColor: '#ccc',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  skipText: {
    fontSize: 16,
    color: '#666',
  },
  nextButton: {
    backgroundColor: 'lightgray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  nextText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'orange',
  },
  getStartedButton: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  getStartedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default OnboardingScreen;
/**/