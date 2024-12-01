/**
  Cardslider()::Cardslider()
  
  NAME
  
      Cardslider - A component that displays a horizontal card slider of food items.
  
  SYNOPSIS
  
      Cardslider({ title, data, navigation })
  
      title       --> The title for the card slider section.
      data        --> An array of food items to be displayed in the slider.
      navigation  --> The navigation prop used to navigate between screens.
  
  DESCRIPTION
  
      The Cardslider component renders a horizontal list of food items using the 
      `FlatList` component. Each item is displayed as a card that includes an image,
      name, price, and a "Buy" button. The component accepts a `title` prop to display 
      as the section header and a `data` prop containing an array of food items. 
  
      When a card is pressed, the `openProductPage` function is called, navigating
      the user to a detailed product page for the selected item.
  
  
  RETURNS
  
      The Cardslider component does not return any value but renders a horizontal 
      slider of food item cards as part of the UI.
 */


import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {colors, veg, nonveg} from "../globals/style"

const Cardslider = ({title, data, navigation}) => {
  //console.log(data)  

  const openProductPage = (item) => {
        navigation.navigate('ProductPage', item)
    }

  return (
    <View style={styles.container}>
        <Text style={styles.cardouthead}>
            {title}
        </Text>

        <FlatList
          style={styles.cardsout}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({item})=>( 
            <TouchableOpacity key={item.index} onPress={() =>{
                openProductPage(item)
            }}>    
                <View style={styles.card}>
                <View style={styles.s1}>
                    <Image source = {{
                        uri: item.foodImageUrl
                    }} style={styles.cardimgin}/>
                </View>

                <View style={styles.s1}>
                    <Text style={styles.txt1}>{item.foodName}</Text>
                </View>

                <View style={styles.s2in}>
                    <Text style={styles.txt2}>${item.foodPrice} </Text>
                    {item.foodType == 'veg'? <Text style={veg}></Text>: <Text style={nonveg}></Text>}
                </View>

                <View style={styles.s3}>
                    <Text style={styles.buybtn}>Buy
                    </Text>
                </View>
                </View>
            </TouchableOpacity>
          )}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    //card
    cardouthead: {
        color: colors.text3,
        width: '90%',
        fontSize: 30,
        fontWeight: '200',
        borderRadius: 10,
        marginHorizontal: 10,
    },
    cardsout: {
        width: '100%',
        // backgroundColor: 'red',
    },
    card: {
        // backgroundColor: "aqua",
        width: 300,
        height: 300,
        margin: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e8e8e8',
        backgroundColor: colors.col1,
    },
    cardimgin: {
        width: "100%",
        height: 200,
        borderRadius: 10,
    },
    s2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'aqua',
    },
    txt1: {
        fontSize: 18,
        color: colors.text3,
        marginHorizontal: 5,
        width: 150,
    },
    txt2: {
        fontSize: 20,
        color: colors.text2,
        marginRight: 10,
    },
    s2in: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,

    },
    s3: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 1,
        width: '100%',
    },
    buybtn: {
        backgroundColor: colors.text3,
        color: colors.col1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 20,
        borderRadius: 10,
        width: '90%',
        textAlign: 'center',
    }
})


export default Cardslider;