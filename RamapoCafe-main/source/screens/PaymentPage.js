/**/
/*
PaymentPage::PaymentPage() PaymentPage::PaymentPage()

NAME

        PaymentPage::PaymentPage - Displays a payment form and handles payment processing.

SYNOPSIS

        React Native Component PaymentPage({ navigation });

DESCRIPTION

        This component renders a payment form where users can enter their card details to process a payment. It includes fields
        for card number, expiry date, CVV, and cardholder name. The form performs basic validation to ensure that the card number,
        expiry date, and CVV are in the correct format before proceeding. 

        On successful validation, it displays a success message and navigates the user to the 'HomePage'. If validation fails,
        it displays appropriate error messages.

        The component uses React Native's `Alert` for error messages and `StyleSheet` for styling.

RETURNS

        Returns a React Native component with a form for entering payment details and buttons for processing the payment.

*/
/**/

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const PaymentPage = ({ navigation }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');

  const validateCardNumber = (number) => {
    const regex = /^\d{16}$/;
    return regex.test(number);
  };

  const validateExpiryDate = (date) => {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    return regex.test(date);
  };

  const validateCvv = (cvv) => {
    const regex = /^\d{3}$/;
    return regex.test(cvv);
  };

  const handlePayment = () => {
    if (!validateCardNumber(cardNumber)) {
      Alert.alert('Error', 'Card number must be 16 digits.');
      return;
    }

    if (!validateExpiryDate(expiryDate)) {
      Alert.alert('Error', 'Expiry date must be in MM/YY format.');
      return;
    }

    if (!validateCvv(cvv)) {
      Alert.alert('Error', 'CVV must be 3 digits.');
      return;
    }

    if (!cardHolderName) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    Alert.alert('Success', 'Your payment has been processed.');
    navigation.navigate('HomePage');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Details</Text>

      <TextInput
        style={styles.input}
        placeholder="Card Number"
        keyboardType="numeric"
        value={cardNumber}
        onChangeText={setCardNumber}
      />

      <TextInput
        style={styles.input}
        placeholder="Expiry Date (MM/YY)"
        value={expiryDate}
        onChangeText={setExpiryDate}
      />

      <TextInput
        style={styles.input}
        placeholder="CVV"
        keyboardType="numeric"
        secureTextEntry
        value={cvv}
        onChangeText={setCvv}
      />

      <TextInput
        style={styles.input}
        placeholder="Cardholder Name"
        value={cardHolderName}
        onChangeText={setCardHolderName}
      />

      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

/*
styles::StyleSheet styles::StyleSheet

NAME

        styles::StyleSheet - Defines the styles for the PaymentPage component.

SYNOPSIS

        const styles = StyleSheet.create({ ... });

DESCRIPTION

        This StyleSheet object styles the various components used in the PaymentPage component, including layout, text, inputs,
        and buttons. It ensures a consistent look and feel for the payment form with appropriate spacing, colors, and font sizes.

RETURNS

        Returns a StyleSheet object used to style the PaymentPage component.

*/
/**/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'maroon',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default PaymentPage;
