/**/
/*
ProductPage::ProductPage() ProductPage::ProductPage()

NAME

        ProductPage::ProductPage - Displays detailed information about a selected product and manages cart actions.

SYNOPSIS

        React Native Component ProductPage({ navigation, route });

DESCRIPTION

        This component displays detailed information about a selected product, including an image, name, price, description, and 
        location details. It also allows users to add the product to their cart and adjust the quantity of both the product and 
        any add-ons.

        The component retrieves product data passed via the route parameters. It includes functionality to increase or decrease
        the quantity of the product and any add-ons. It also handles adding the selected product with specified quantities to the
        user's cart in Firestore. If the cart document does not exist, it creates a new one; otherwise, it updates the existing one.

        The component also provides navigation options for going back to the home page or proceeding to place an order.

RETURNS

        Returns a React Native component that displays product details, quantity controls, and buttons for adding the product to 
        the cart or proceeding to place an order.

*/
/**/

import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import { btn2, colors, hr80, incdecbtn, incdecinput, incdecout, navbtn, navbtnin, navbtnout, dunkin, atrium, starbucks } from '../globals/style';
import { AntDesign } from '@expo/vector-icons';
import { firebase } from '../../FireBase/FirebaseConfig';

const ProductPage = ({ navigation, route }) => {
  const data = route.params;

  if (route.params === undefined) {
    navigation.navigate('HomePage');
  }

  const [quantity, setQuantity] = useState('1');
  const [addonQuantity, setAddonQuantity] = useState('0');

  const addTocart = () => {
    const docRef = firebase.firestore().collection('UserCart').doc(firebase.auth().currentUser.uid);
    const data1 = { data, AddOnQuantity: addonQuantity, FoodQuantity: quantity };

    docRef.get().then((doc) => {
      if (doc.exists) {
        docRef.update({
          cart: firebase.firestore.FieldValue.arrayUnion(data1)
        });
        alert('Added to cart');
      } else {
        docRef.set({
          cart: [data1],
        });
        alert('Added to cart');
      }
    });
  };

  const increaseQuantity = () => {
    setQuantity((parseInt(quantity) + 1).toString());
  };

  const decreaseQuantity = () => {
    if (parseInt(quantity) > 1) {
      setQuantity((parseInt(quantity) - 1).toString());
    }
  };

  const increaseAddonQuantity = () => {
    setAddonQuantity((parseInt(addonQuantity) + 1).toString());
  };

  const decreaseAddonQuantity = () => {
    if (parseInt(addonQuantity) > 0) {
      setAddonQuantity((parseInt(addonQuantity) - 1).toString());
    }
  };

  const cartData = JSON.stringify({ cart: [{ AddOnQuantity: addonQuantity, FoodQuantity: quantity, data }] });

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('HomePage')} style={navbtnout}>
        <View style={navbtn}>
          <AntDesign name="back" size={24} color="black" style={navbtnin} />
        </View>
      </TouchableOpacity>

      <View style={styles.container1}>
        <View style={styles.s1}>
          <Image source={{ uri: data.foodImageUrl }} style={styles.cardimgin} />
        </View>

        <View style={styles.s2}>
          <View style={styles.s2in}>
            <Text style={styles.head1}>{data.foodName}</Text>
            <Text style={styles.head2}>${data.foodPrice}/-</Text>
          </View>

          <View style={styles.s3}>
            <Text style={styles.head3}>About Food</Text>
            <Text style={styles.head4}>{data.foodDescription}</Text>
            <View style={styles.s3in}>
              {data.foodType === 'dunkin' ? <Text style={dunkin}></Text> : data.foodType === 'atrium' ? <Text style={atrium}></Text> :
                <Text style={starbucks}></Text>}
              <Text style={styles.head5}>{data.foodType}</Text>
            </View>
          </View>

          <View style={styles.container2}>
            <Text style={styles.txt1}>Location</Text>
            <Text style={styles.txt2}>{data.restaurantName}</Text>
            <View style={styles.container2in}>
              <Text style={styles.txt3}>{data.restaurantAddressBuilding}</Text>
              <View style={styles.dash}></View>
              <Text style={styles.txt3}>{data.restaurantAddressStreet}</Text>
              <View style={styles.dash}></View>
              <Text style={styles.txt3}>{data.restaurantAddressCity}</Text>
            </View>
          </View>

          {data.foodAddonPrice != "" &&
            <View style={styles.container3}>
              <View style={hr80}></View>
              <Text style={styles.txt4}>Add Extra</Text>
              <View style={styles.c3in}>
                <Text style={styles.txt5}>{data.foodAddon}</Text>
                <Text style={styles.txt5}>${data.foodAddonPrice}/-</Text>
              </View>
              <View style={incdecout}>
                <Text style={incdecbtn} onPress={() => increaseAddonQuantity()}>+</Text>
                <TextInput value={addonQuantity} style={incdecinput} />
                <Text style={incdecbtn} onPress={() => decreaseAddonQuantity()}>-</Text>
              </View>
            </View>}

          <View style={styles.container3}>
            <View style={hr80}></View>
            <Text style={styles.txt3}>Food Quantity</Text>
            <View style={incdecout}>
              <Text style={incdecbtn} onPress={() => increaseQuantity()}>+</Text>
              <TextInput value={quantity} style={incdecinput} />
              <Text style={incdecbtn} onPress={() => decreaseQuantity()}>-</Text>
            </View>
            <View style={hr80}></View>
          </View>

          <View style={styles.c4in}>
            <Text style={styles.txt2}>Total Price</Text>
            {data.foodAddonPrice ?
              <Text style={styles.txt6}>${
                ((parseInt(data.foodPrice) * parseInt(quantity)) + parseInt(addonQuantity) * parseInt(data.foodAddonPrice)).toString()}/-</Text>
              :
              <Text style={styles.txt6}>${((parseInt(data.foodPrice) * parseInt(quantity))).toString()}/-</Text>
            }
          </View>
          <View style={hr80}></View>
        </View>

        <View style={styles.btncont}>
          <TouchableOpacity style={btn2} onPress={() => addTocart()}>
            <Text style={styles.btntxt}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={btn2}>
            <Text style={styles.btntxt} onPress={() => navigation.navigate('PlaceOrder', { cartData })}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
  container1: {
    flex: 1,
    backgroundColor: '#fff',
  },
  s1: {
    width: '100%',
    height: 300,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardimgin: {
    width: '100%',
    height: '100%',
  },
  s2: {
    width: '100%',
    padding: 20,
    position: 'relative',
    top: -30,
    backgroundColor: colors.col1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  s2in: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  head1: {
    fontSize: 30,
    fontWeight: '500',
    color: colors.text3,
    width: 220,
    marginRight: 10,
  },
  head2: {
    fontSize: 50,
    fontWeight: '200',
    color: colors.text1,
  },
  s3: {
    backgroundColor: colors.text3,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center'
  },
  head3: {
    fontSize: 30,
    fontWeight: '200',
    color: colors.col1,
  },
  head4: {
    marginVertical: 10,
    fontSize: 20,
    fontWeight: '400',
    color: colors.col1,
  },
  s3in: {
    backgroundColor: colors.col1,
    padding: 10,
    borderRadius: 10,
    width: 130,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  head5: {
    color: colors.text1,
    fontSize: 20,
    fontWeight: '200',
    marginLeft: 10,
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
  },
  container2: {
    width: '90%',
    backgroundColor: colors.col1,
    padding: 20,
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 10,
    elevation: 10,
    alignItems: 'center',
  },
  txt1: {
    color: colors.text3,
    fontSize: 20,
    fontWeight: '200',
  },
  txt2: {
    color: colors.text1,
    fontSize: 30,
    fontWeight: '200',
    marginVertical: 10,
  },
  container2in: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt3: {
    color: colors.text3,
    fontSize: 14,
    width: '30%',
    textAlign: 'center'
  },
  dash: {
    width: 1,
    height: 20,
    backgroundColor: colors.text3,
    marginHorizontal: 10,
  },
  c3in: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  container3: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  txt4: {
    color: colors.text3,
    fontSize: 20,
    marginHorizontal: 10,
  },
  txt5: {
    color: colors.text1,
    fontSize: 20,
    marginHorizontal: 10,
  },
  txt6: {
    color: colors.text3,
    fontSize: 40,
    marginHorizontal: 10,
  },
  c4in: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  }
});
