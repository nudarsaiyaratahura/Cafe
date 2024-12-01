/**
  BottomNav()::BottomNav()
  
  NAME
  
      BottomNav - A bottom navigation bar for navigating between key screens.
  
  SYNOPSIS
  
      BottomNav({ navigation })
  
      navigation  --> The navigation prop used to navigate between screens.
  
  DESCRIPTION
  
      The BottomNav component provides a bottom navigation bar with four icons 
      that allow users to navigate to different screens: Home, Search, Cart, 
      and Track Order. The icons are arranged horizontally and styled to provide 
      visual feedback when pressed.
  
      - `AntDesign` icons are used for Home and Cart buttons.
      - `Ionicons` is used for the Search button.
      - `FontAwesome5` is used for the Track Order button.
  
      The Search button is given a distinct style, making it more prominent 
      by elevating it above the other buttons.
  
  
  RETURNS
  
      The BottomNav component does not return any value but renders a bottom navigation 
      bar as part of the UI.
 */


import { StyleSheet, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../globals/style';
import { FontAwesome5 } from '@expo/vector-icons';

const BottomNav = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.btncon1}>
                <AntDesign name="home" size={30} color="black" style={styles.icon1} onPress={() => { navigation.navigate('HomePage') }} />

            </View>
            <View style={styles.btncon2} >
                <Ionicons name="search" size={40} color="black" style={styles.icon2} onPress={() => { navigation.navigate('HomePage') }} />
            </View>
            <View style={styles.btncon1} >
                <AntDesign name="shoppingcart" size={30} color="black" style={styles.icon1} onPress={() => { navigation.navigate('UserCart') }} />

            </View>
            <View style={styles.btncon1} >
                <FontAwesome5 name="map-marked-alt" size={30} color="black" style={styles.icon1} onPress={() => { navigation.navigate('TrackOrder') }} />
            </View>
        </View>
    )
}

export default BottomNav;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
        elevation: 30,
        borderTopColor: colors.text1,
        borderTopWidth: 1,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
    },
    btncon1: {
        alignItems: 'center',
        backgroundColor: colors.col1,
        elevation: 10,
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center'
    },
    btncon2: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        top: -20,
        backgroundColor: colors.text3,
        width: 60,
        height: 60,
        borderRadius: 60,
    },
    icon2: {
        color: 'white',

    },
    icon1: {
        color: colors.text3,

    }
})