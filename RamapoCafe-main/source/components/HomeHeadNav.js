/**
  HomeHeadNav()::HomeHeadNav()
  
  NAME
  
      HomeHeadNav - A navigation header component for the home screen.
  
  SYNOPSIS
  
      HomeHeadNav({ navigation })
  
      navigation     --> The navigation prop used to navigate between screens.
  
  DESCRIPTION
  
      The HomeHeadNav component is a custom header for the home screen, featuring
      navigation icons and the title "RamapoCafe". The component displays a menu
      icon, the app name with a food-related icon, and a user profile icon.
  
      - The `EvilIcons` component displays a menu icon.
      - The `Ionicons` component displays a food-related icon next to the app name.
      - The `FontAwesome` component is used for the user profile icon, which
        navigates to the 'UserProfile' screen when pressed.
  
  
  RETURNS
  
      The HomeHeadNav component does not return any value but renders a header
      as part of the home screen UI.
 */


import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../globals/style';
import { EvilIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const HomeHeadNav = ({navigation}) => {
  return (
    <View style={styles.container}>
        <EvilIcons name="navicon" size={34} color="#871230" style={styles.myicon}/>

        <View style={styles.containerin}>
            <Text style={styles.mytext}>RamapoCafe</Text>
            <Ionicons name="fast-food-outline" size={30} color='black' style={styles.myicon} />
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('UserProfile')}>
            <FontAwesome name="user-circle-o" size={24} color="black" style={styles.myicon} />
        </TouchableOpacity>
    </View>
  )
}

export default HomeHeadNav

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        padding:10,
        alignItems: 'center',
        backgroundColor: colors.col1,
        elevation:20,
        borderBottomLeftRadius:20,
        borderBottomRightRadius: 20,
    },
    containerin: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    myicon: {
        color: colors.text3,
    },
    mytext: {
        color: colors.text3,
        fontSize:24,
    },
})