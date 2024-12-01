/**/
/*
PlaceOrder::PlaceOrder() PlaceOrder::PlaceOrder()

NAME

        PlaceOrder::PlaceOrder - Displays the order summary and allows the user to choose delivery options and place an order.

SYNOPSIS

        React Native Component PlaceOrder({ navigation, route });

DESCRIPTION

        This component provides a detailed summary of the user's order, including the list of items, their quantities, and prices.
        It allows users to select between pickup and delivery options, enter a delivery address if needed, and proceed to payment.

        The component performs several tasks:
        - Retrieves and parses order data from the route parameters.
        - Calculates the total cost of the order, including any add-ons.
        - Fetches user data from Firestore to display their details and use them for order placement.
        - Provides an option to choose between pickup and delivery, with an input field for the delivery address.
        - Allows the user to place the order by saving it to Firestore and navigating to the payment page.

RETURNS

        Returns a React Native component displaying the order summary, user details, and delivery options. It also includes a button
        for proceeding to the payment page.

USAGE

        <PlaceOrder navigation={navigation} route={route} />

        navigation: The navigation prop used to navigate between screens.
        route: The route prop containing the cart data passed from the previous screen.

*/

/**/

import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { btn1, colors, hr80, navbtn, navbtnin } from '../globals/style';
import { firebase } from '../../FireBase/FirebaseConfig';

const PlaceOrder = ({ navigation, route }) => {
  const { cartData } = route.params;
  const [orderData, setOrderData] = useState([]);
  const [totalCost, setTotalCost] = useState('0');
  const [userLoggedUid, setUserLoggedUid] = useState(null);
  const [userData, setUserData] = useState(null);
  const [deliveryOption, setDeliveryOption] = useState('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  useEffect(() => {
    setOrderData(JSON.parse(cartData));
  }, [cartData]);

  useEffect(() => {
    if (cartData != null) {
      const foodPrice = JSON.parse(cartData).cart;
      let totalFoodPrice = 0;
      foodPrice.forEach((item) => {
        const foodQuantity = parseInt(item.FoodQuantity, 10) || 0;
        const foodPrice = parseInt(item.data.foodPrice, 10) || 0;
        totalFoodPrice += (foodQuantity * foodPrice);
        const addOnQuantity = parseInt(item.AddOnQuantity, 10) || 0;
        const addOnPrice = parseInt(item.data.foodAddonPrice, 10) || 0;
        if (addOnQuantity > 0) {
          totalFoodPrice += (addOnQuantity * addOnPrice);
        }
      });
      setTotalCost(totalFoodPrice.toString());
    }
  }, [cartData]);

  useEffect(() => {
    const getUserData = async () => {
      if (userLoggedUid) {
        const docRef = firebase
          .firestore()
          .collection('UserData')
          .where('uid', '==', userLoggedUid);
        const doc = await docRef.get();
        if (!doc.empty) {
          doc.forEach((doc) => {
            setUserData(doc.data());
          });
        } else {
          navigation.navigate('Login');
        }
      }
    };
    getUserData();
  }, [userLoggedUid]);

  useEffect(() => {
    const checkLogin = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUserLoggedUid(user.uid);
        } else {
          setUserLoggedUid(null);
          navigation.navigate('Login');
        }
      });
    };
    checkLogin();
  }, []);

  const placeNow = () => {
    const docRef = firebase.firestore().collection('UserOrders').doc(new Date().getTime().toString());
    docRef.set({
      orderid: docRef.id,
      orderdata: orderData.cart,
      orderstatus: 'pending',
      ordercost: totalCost,
      orderdate: firebase.firestore.FieldValue.serverTimestamp(),
      orderaddress: deliveryOption === 'delivery' ? deliveryAddress : userData?.address,
      orderphone: userData?.phone,
      ordername: userData?.name,
      orderuseruid: userLoggedUid,
      orderpayment: 'online',
      paymenttotal: totalCost
    });
    alert('Order Placed Successfully');
    navigation.navigate('PaymentPage');
  };

  return (
    <View style={styles.containerout}>
    <ScrollView>
      <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
        <View style={navbtn}>
          <AntDesign name="back" size={24} color="black" style={navbtnin} />
        </View>
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.head1}>Your Order Summary</Text>
        <FlatList
          style={styles.c1}
          data={orderData.cart}
          renderItem={({ item }) => {
            const foodQuantity = parseInt(item.FoodQuantity, 10) || 0;
            const foodPrice = parseInt(item.data.foodPrice, 10) || 0;
            const foodTotalPrice = foodQuantity * foodPrice;
            const addOnQuantity = parseInt(item.AddOnQuantity, 10) || 0;
            const addOnPrice = parseInt(item.data.foodAddonPrice, 10) || 0;
            const addOnTotalPrice = addOnQuantity * addOnPrice;

            return (
              <View style={styles.rowout}>
                <View style={styles.row}>
                  <View style={styles.left}>
                    <Text style={styles.qty}>{foodQuantity}</Text>
                    <Text style={styles.title}>{item.data.foodName}</Text>
                    <Text style={styles.price1}>${foodPrice}</Text>
                  </View>
                  <View style={styles.right}>
                    <Text style={styles.totalPrice}>${foodTotalPrice}</Text>
                  </View>
                </View>

                {addOnQuantity > 0 && (
                  <View style={styles.row}>
                    <View style={styles.left}>
                      <Text style={styles.qty}>{addOnQuantity}</Text>
                      <Text style={styles.title}>{item.data.foodAddon}</Text>
                      <Text style={styles.price1}>${addOnPrice}</Text>
                    </View>
                    <View style={styles.right}>
                      <Text style={styles.totalPrice}>${addOnTotalPrice}</Text>
                    </View>
                  </View>
                )}
              </View>
            );
          }}
        />
        <View style={hr80}></View>
        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.title}>Order Total :</Text>
          </View>
          <View style={styles.left}>
            <Text style={styles.totalPrice}>${totalCost}</Text>
          </View>
        </View>

        <View style={hr80}></View>
        <View style={styles.userDataOut}>
          <Text style={styles.head1}>Your Details</Text>
          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.title}>Name :</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.title}>{userData?.name}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.title}>Email :</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.title}>{userData?.email}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.title}>Phone :</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.title}>{userData?.phone}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.title}>Address :</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.title}>{userData?.address}</Text>
            </View>
          </View>
        </View>

        <View style={hr80}></View>
        <View style={styles.optionContainer}>
          <Text style={styles.head1}>Pickup or Delivery</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                deliveryOption === 'pickup' && styles.optionButtonSelected
              ]}
              onPress={() => setDeliveryOption('pickup')}
            >
              <Text style={styles.optionButtonText}>Pickup</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                deliveryOption === 'delivery' && styles.optionButtonSelected
              ]}
              onPress={() => setDeliveryOption('delivery')}
            >
              <Text style={styles.optionButtonText}>Delivery</Text>
            </TouchableOpacity>
          </View>
        </View>

        {deliveryOption === 'delivery' && (
          <View style={styles.addressContainer}>
            <Text style={styles.title}>Delivery Address:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your address"
              value={deliveryAddress}
              onChangeText={setDeliveryAddress}
            />
          </View>
        )}

        <View style={hr80}></View>
        <View>
          <TouchableOpacity style={btn1} onPress={placeNow}>
            <Text style={styles.btntext}>Proceed to Payment</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    </View>
    
  );
};

export default PlaceOrder

const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        alignItems: 'center',
    },
    head1: {
        fontSize: 30,
        fontWeight: '2000',
        color: colors.text3,
        margin: 10,
        textAlign: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        justifyContent: 'space-between',
    },
    rowout: {
        flexDirection: 'column',
        margin: 5,
        elevation: 10,
        backgroundColor: colors.col1,
        padding: 20,
        borderRadius: 10,
    },
    price1: {
        fontSize: 17,
        fontWeight: 'bold',
        marginRight: 10,
        color: colors.text3,
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    right:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    qty: {
        width: 40,
        height: 30,
        backgroundColor: colors.text3,
        borderRadius: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginRight: 10,
        color: colors.col1,
        fontSize: 17,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        marginRight: 10,
    },
    totalPrice: {
        fontSize: 17,
        fontWeight: 'bold',
        borderColor: colors.text3,
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
    },
    btntext: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.col1,
        margin: 10,
    }
})
