/**/
/*
UserCart::UserCart()

NAME

    UserCart - Displays the user's cart, including the list of items, total cost, and options to delete items or place an order.

SYNOPSIS

    const UserCart = ({ navigation }) => {
        navigation       --> the navigation object used to navigate between screens.
    };

DESCRIPTION

    This component is responsible for displaying the items in the user's cart, calculating the total cost of the cart,
    and providing functionality to delete items from the cart or place an order. It retrieves cart data from Firestore,
    calculates the total cost based on the prices and quantities of items, and updates the UI accordingly.

    The component performs the following tasks:
    - Fetches the user's cart data from Firestore and updates the state with this data.
    - Parses the cart data to calculate the total cost of the items in the cart.
    - Displays the cart items using a FlatList component, showing the item's image, name, quantity, price, and addon details.
    - Provides an option to delete items from the cart, which updates Firestore and refreshes the cart data.
    - Displays the total cost of the cart and provides a button to navigate to the order placement screen.

PARAMETERS

    navigation       --> The navigation object used to navigate between screens.

RETURNS

    Returns a React component that displays the user's cart, including cart items, total cost, and navigation options.
*/

/**/

import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { btn2, colors, navbtn, navbtnin, navbtnout } from '../globals/style'
import { AntDesign } from '@expo/vector-icons';
import { firebase } from '../../FireBase/FirebaseConfig';
import BottomNav from '../components/BottomNav';

const UserCart = ({ navigation }) => {
  const [cartData, setCartData] = useState(null);
  const [totalCost, setTotalCost] = useState('0');

  const getCartData = async () => {
  const docRef = firebase.firestore().collection('UserCart').doc(firebase.auth().currentUser.uid);

  docRef.get().then((doc) => {
    if (doc.exists) {
      const data = JSON.stringify(doc.data());
      setCartData(data);
    } else {
      console.log('No such document!');
    }
  }).catch((error) => {
    console.log('Error getting document:', error);
  });
};

useEffect(() => {
  getCartData();
}, []);

useEffect(() => {
  if (cartData!== null) {
    const foodPrice = JSON.parse(cartData).cart;
    if (foodPrice && Array.isArray(foodPrice)) {
      let totalFoodPrice = 0;
      foodPrice.forEach((item) => {
        totalFoodPrice += (parseInt(item.data.foodPrice) * parseInt(item.FoodQuantity));
        if (item.AddOnQuantity > 0 && item.data.foodAddonPrice) {
          totalFoodPrice += (parseInt(item.data.foodAddonPrice) * parseInt(item.AddOnQuantity));
        }
      });
      setTotalCost(totalFoodPrice.toString());
    }
  }
}, [cartData]); 


    const deleteItem = (item) => {
        const docRef = firebase.firestore().collection('UserCart').doc(firebase.auth().currentUser.uid);
        docRef.update({
            cart: firebase.firestore.FieldValue.arrayRemove(item)
        })
        getCartData();

    }


  return (
    <View style={styles.containerout}>
        <TouchableOpacity onPress={()=> navigation.navigate('HomePage')} style={navbtnout}>
            <View style={navbtn}>
                <AntDesign name="back" size={24} color="black" style={navbtnin} />
            </View>
        </TouchableOpacity>
        <View style={styles.bottomNav}>
            <BottomNav navigation={navigation}/>
        </View>

        <View style={styles.container}>
            <Text style={styles.head1}>Your Cart</Text>
                <View style={styles.cartout}>
                    {cartData == null || JSON.parse(cartData).cart.length == 0 ?
                        <Text style={styles.head2}>Your Cart is Empty</Text>
                        :
                        <FlatList style={styles.cardlist} data={JSON.parse(cartData).cart} renderItem={
                            ({ item }) => {
                                return (
                                    <View style={styles.cartcard}>
                                        <Image source={{ uri: item.data.foodImageUrl }} style={styles.cartimg} />
                                        <View style={styles.cartcardin}>
                                            <View style={styles.c1}>
                                                <Text style={styles.txt1}>{item.FoodQuantity}&nbsp;{item.data.foodName}</Text>
                                                <Text style={styles.txt2}>${item.data.foodPrice}/each</Text>
                                            </View>
                                            {item.AddOnQuantity > 0 &&
                                                <View style={styles.c2}>
                                                    <Text style={styles.txt3}>{item.AddOnQuantity}&nbsp;{item.data.foodAddon}</Text>
                                                    <Text style={styles.txt3}>${item.data.foodAddonPrice}/each</Text>
                                                </View>}
                                            <TouchableOpacity style={styles.c4} onPress={() => deleteItem(item)}>
                                                <Text style={styles.txt1}>Delete</Text>
                                                <AntDesign name="delete" size={24} color="black" style={styles.del} />
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                )
                            }
                        } />}
                </View>
                 <View style={styles.btncont}>
                    <View style={styles.c3}>
                        <Text style={styles.txt5}>Total</Text>
                        <Text style={styles.txt6}>${totalCost}</Text>
                    </View>
                    <TouchableOpacity style={btn2}>
                        <Text style={styles.btntxt} onPress={() => navigation.navigate('PlaceOrder', { cartData })}>Place Order</Text>
                    </TouchableOpacity>
                </View>
        </View>

    </View>
  )
}

export default UserCart

const styles = StyleSheet.create({
    bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: colors.col1,
    zIndex: 20,
    },
    containerout: {
        flex: 1,
        backgroundColor: colors.col1,
        // alignItems: 'center',
        width: '100%',
        // height: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: colors.col1,
        alignItems: 'center',
        // justifyContent: 'center',
        width: '100%',
        // height: '100%',
    },
    head1: {
        fontSize: 40,
        textAlign: 'center',
        color: colors.text3,
    },
    head2: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '200',
        marginVertical: 20,
        elevation: 10,
        backgroundColor: colors.col1,
        width: '90%',
        height: '50%',
        alignSelf: 'center',
        paddingVertical: '25%',
        borderRadius: 10,
    },
    cartcard: {
        flexDirection: 'row',
        backgroundColor: colors.col1,
        marginVertical: 5,
        borderRadius: 10,
        width: '95%',
        alignSelf: 'center',
        elevation: 10,
        alignItems: 'center',
    },
    cartimg: {
        width: 150,
        height: 100,
        borderRadius: 10,
    },
    cartcardin: {
        flexDirection: 'column',
        margin: 5,
        width: '58%',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: colors.text1,

    },
    cardlist: {
        width: '100%',
    },
    cartout: {
        flex: 1,
        width: '100%',
    },
    btntxt: {
        backgroundColor: colors.text3,
        color: colors.col1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 20,
        borderRadius: 10,
        width: '90%',
        textAlign: 'center',

    },
    btncont: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        flexDirection: 'row',
        marginBottom: 80,
        borderTopColor: colors.text1,
        borderTopWidth: 0.2,
    },
    bottomnav: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: colors.col1,
        zIndex: 20,
    },
    c1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: colors.col1,
        borderRadius: 10,
        padding: 5,
    },
    txt1: {
        fontSize: 16,
        color: colors.text3,
        width: '60%',
        fontWeight: 'bold',
    },
    txt2: {
        fontSize: 16,
        color: colors.text1,
        fontWeight: 'bold',
    },
    c2: {
        backgroundColor: colors.text3,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
        flexDirection: 'row',
    },
    txt3: {
        fontSize: 15,
        color: colors.col1,
    },
    txt5: {
        fontSize: 20,
        color: colors.text1,
        marginHorizontal: 5,
    },
    txt6: {
        fontSize: 25,
        color: colors.text1,
        marginHorizontal: 5,
        fontWeight: 'bold',
    },
    c3: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    c4: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        borderRadius: 10,
        borderColor: colors.text3,
        borderWidth: 1,
        marginVertical: 10,
        padding: 5,
    },
    del: {
        color: colors.text3,
    }
})