/**
 TrackOrder()::TrackOrder()

 NAME
     TrackOrder - Displays the list of orders placed by the user, including order details, status, and options to cancel an order.

 SYNOPSIS
     const TrackOrder = ({ navigation }) => {
         navigation       --> The navigation object used to navigate between screens.

 DESCRIPTION
     This component is responsible for displaying the user's past orders, including their details and status. It retrieves
     the orders data from Firestore, formats the date, and provides functionality to cancel orders if they are not yet
     delivered or cancelled. The component updates the UI with the current status of each order and allows the user to
     cancel an order if applicable.

     The component performs the following tasks:
     - Fetches the user's order data from Firestore and updates the state with this data.
     - Formats the date of each order from Firestore's timestamp format to a readable string.
     - Provides functionality to cancel an order by updating its status in Firestore.
     - Displays each order using a FlatList component, showing the order details, items, status, and total cost.
     - Allows the user to cancel an order if its status is not yet "delivered" or "cancelled".

 PARAMETERS
     navigation       --> The navigation object used to navigate between screens.

 RETURNS
     Returns a React component that displays the user's orders, including order details, status, and options to cancel an order.
 */

import { StyleSheet, Text, View, StatusBar, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeHeadNav from '../components/HomeHeadNav'
import BottomNav from '../components/BottomNav'
import { colors, hr80 } from '../globals/style'
import { firebase } from '../../FireBase/FirebaseConfig'


const TrackOrder = ({navigation}) => {

    const [orders, setOrders] = useState([])

    const getOrders = async () => {
        const ordersRef = firebase.firestore().collection('UserOrders').where('orderuseruid', '==', firebase.auth().currentUser.uid);
        ordersRef.onSnapshot(snapshot => {
            setOrders(snapshot.docs.map(doc => doc.data()))
        })
    }

    useEffect(() => {
        getOrders()
    }, [])

    const convertDate = (date) => {
        // console.log(date.seconds)
        const newdate = new Date(date.seconds * 1000)
        // console.log(newdate)
        return newdate.toDateString()
    }

    const cancelOrder = (orderitem) =>{
        const orderRef = firebase.firestore().collection('UserOrders')
        .doc(orderitem.orderid)
        orderRef.update({
            orderstatus: 'cancelled'
        })
        getOrders();
    }

  return (
    <View style={styles.container}>
      <StatusBar/>
      <HomeHeadNav navigation={navigation}/>
      <Text></Text>
      <View style={styles.bottomNav}>
        <BottomNav navigation={navigation}/>
      </View>

      <ScrollView style={styles.containerin}>
        <Text style={styles.head1}>Track Orders</Text>
        {orders.sort(
            (a,b) => {
                b.orderdate.seconds - a.orderdate.seconds
            }
        ).map((order, index) => {
            return(
                <View style={styles.ordercard} key={index}>
                    <Text style={styles.orderindex}>
                        {index + 1}
                    </Text>
                    <Text style={styles.ordertxt2}>Order Id: {order.orderid}</Text>
                    <Text style={styles.ordertxt2}>Order Date: {convertDate( order.orderdate)}</Text>
                    {order.orderstatus === "ontheway" && <Text style={styles.orderotw}>Your Order is on the Way</Text>}
                    {order.orderstatus === "delivered" && <Text style={styles.orderdelivered}>Your Order is Delivered</Text>}
                    {order.orderstatus === "cancelled" && <Text style={styles.ordercancelled}>Your Order is Cancelled</Text>}
                    {order.orderstatus === "pending" && <Text style={styles.orderpending}>Your Order is Pending</Text>}

                    <View style={styles.row1}>
                        <Text style={styles.ordertxt1}>Rider Name & Contact: </Text>
                        {
                                        order.deliveryboy_name ? <Text style={styles.ordertxt2}>{order.deliveryboy_name} : {order.deliveryboy_contact}</Text> : <Text style={styles.ordertxt2}>Not Assigned</Text>
                                    }
                                    {
                                        order.deliveryboy_phone ? <Text style={styles.ordertxt2}>{order.deliveryboy_phone}</Text> : null
                                    }
                    </View>
                    <FlatList style={styles.c1} data = {order.orderdata} renderItem={({item}) => {
                    return (
                    <View style={styles.rowout}>
                        <View style={styles.row}>
                            <View style={styles.left}>
                                <Text style={styles.qty}>{item.FoodQuantity}</Text>
                                <Text style={styles.title}>{item.data.foodName}</Text>
                                <Text style={styles.price1}>${item.data.foodPrice}</Text>
                            </View>
                            <View style={styles.right}>
                                <Text style={styles.totalPrice}>${parseInt(item.FoodQuantity) * parseInt(item.data.foodPrice)}</Text>
                            </View>
                        </View>

                        {item.AddOnQuantity > 0 && <View style={styles.row}>
                            <View style={styles.left}>
                                <Text style={styles.qty}>{item.AddOnQuantity}</Text>
                                <Text style={styles.title}>{item.data.foodAddon}</Text>
                                <Text style={styles.price1}>${item.data.foodAddonPrice}</Text>
                            </View>
                            <View style={styles.right}>
                                <Text style={styles.totalPrice}>${parseInt(item.AddOnQuantity) * parseInt(item.data.foodAddonPrice)}</Text>
                            </View>
                        </View>}                        
                    </View>
                )
            }}/>
                    <Text style={styles.total}>
                        Total: ${order.ordercost}
                    </Text>
                    {
                        order.orderstatus === "delivered" ? <Text style={styles.ordertxt3}>Thank you for Ordering with us</Text> : null
                    }
                    <View style={hr80}>
                    </View>
                    {
                        order.orderstatus === "cancelled" ? <Text style={styles.ordertxt3}>Sorry for the inconvenience</Text> : null
                    }
                    {
                        order.orderstatus != 'cancelled' && order.orderstatus != 'delivered' ?
                            <TouchableOpacity style={styles.cancelbtn} onPress={() => cancelOrder(order)}>
                                <Text style={styles.cancelbtnin}>Cancel Order</Text>
                            </TouchableOpacity>
                        : null
                    }
                </View>
            )
        })
        }
      </ScrollView>
    </View>
  )
}

export default TrackOrder

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.col1,
    width: '100%',
    height: '100%',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: colors.col1,
    zIndex: 20,
  },
  containerin: {
        marginTop: 10,
        flex: 1,
        backgroundColor: colors.col1,
        // alignItems: 'center',
        width: '100%',
        height: '100%',
        marginBottom: 100,
    },
    head1: {
        fontSize: 30,
        color: colors.text3,
        textAlign: 'center',
        marginVertical: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        justifyContent: 'space-between',
    },
    rowout: {
        flexDirection: 'column',
        margin: 10,
        elevation: 10,
        backgroundColor: colors.col1,
        padding: 10,
        borderRadius: 10,
    },
    row1: {
        flexDirection: 'column',
        margin: 10,
        elevation: 10,
        backgroundColor: colors.col1,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    qty: {
        fontSize: 20,
        color: colors.text3,
        marginRight: 10,

    },
    title: {
        fontSize: 17,
        color: colors.text3,
        marginRight: 10,

    },
    price1: {
        fontSize: 17,
        color: colors.text3,
        marginRight: 10,
    },
    totalprice: {
        fontSize: 20,
        // color: colors.text1,
        marginRight: 10,

    },
    total: {
        fontSize: 20,
        color: colors.text1,
        textAlign: 'right',
        marginVertical: 10,
        marginRight: 20,
    },
    order: {
        margin: 10,
        elevation: 10,
        backgroundColor: colors.col1,
        padding: 10,
        borderRadius: 10,

    },
    ordertxt1: {
        fontSize: 20,
        color: colors.text3,
        textAlign: 'center',
        marginVertical: 10,

    },
    ordertxt2: {
        fontSize: 17,
        color: colors.text1,
        textAlign: 'center',
        marginVertical: 5,
        fontWeight: 'bold',
    },
    orderindex: {
        fontSize: 20,
        color: colors.col1,
        backgroundColor: colors.text3,
        textAlign: 'center',
        borderRadius: 30,
        padding: 5,
        width: 30,
        position: 'absolute',
        top: 10,
        left: 10,
    },
    ordertxt3: {
        fontSize: 17,
        color: colors.text1,
        textAlign: 'center',
        marginVertical: 5,
        borderColor: colors.text1,
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
    },
    cancelbtn: {
        backgroundColor: colors.text3,
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        alignSelf: 'center',

    },
    cancelbtnin: {
        fontSize: 20,
        color: colors.col1,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    orderstatusin: {},
    orderotw: {
        fontSize: 20,
        backgroundColor: 'orange',
        color: 'white',
        textAlign: 'center',
        borderRadius: 10,
        padding: 5,
        marginVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'center',
    },
    orderdelivered: {
        fontSize: 20,
        backgroundColor: 'green',
        color: 'white',
        textAlign: 'center',
        borderRadius: 10,
        padding: 5,
        marginVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'center',
    },
    ordercancelled: {
        fontSize: 20,
        backgroundColor: 'red',
        color: 'white',
        textAlign: 'center',
        borderRadius: 10,
        padding: 5,
        marginVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'center',
    },
    orderpending: {
        fontSize: 20,
        backgroundColor: 'yellow',
        color: 'grey',
        textAlign: 'center',
        borderRadius: 10,
        padding: 5,
        marginVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'center',
    }
})