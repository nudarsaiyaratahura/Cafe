/**
  OfferSlider()::OfferSlider()
  
  NAME
  
      OfferSlider - A component that displays a slider of promotional offers.
  
  SYNOPSIS
  
      OfferSlider()
  
  DESCRIPTION
  
      The OfferSlider component creates a slider using the `react-native-swiper`
      library to display promotional offers. It automatically cycles through the
      images in the slider with a timeout of 4 seconds per slide. The slider shows
      navigation buttons to allow manual control over the slides.
  
      The component renders three slides, each containing an image loaded from
      the local assets folder. The appearance of the slider, including the dot
      indicators and navigation buttons, is styled using the `StyleSheet` API.
  
  RETURNS
  
      The OfferSlider component does not return any value but renders the slider
      as part of the UI.
 */


import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'
import {colors} from '../globals/style'


const OfferSlider = () => {
  return (
    <View>
      <View style = {styles.offerSlider}>
        <Swiper autoplay={true} autoplayTimeout={4} showsButtons={true} 
          dotColor={colors.text2} activeDotColor={colors.text3}
          nextButton={<Text style={styles.btntxt}>›</Text>}
          prevButton={<Text style={styles.btntxt}>‹</Text>}
          > 
          <View style={styles.slide}>
              <Image source={require('../../assets/OfferSliders/slider1.png')} style={styles.image}/>
          </View>
          <View style={styles.slide}>
              <Image source={require('../../assets/OfferSliders/slider2.png')} style={styles.image}/>
          </View>
          <View style={styles.slide}>
              <Image source={require('../../assets/OfferSliders/slider3.png')} style={styles.image}/>
          </View>
        </Swiper>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  offerSlider:{
    width:'100%',
    height:200,
    backgroundColor: colors.col1,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  slide:{
    width: '100%',
    height:200,
    backgroundColor: colors.col1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image:{
    width:'100%',
    height: '100%',
    borderRadius: 20,
  },
  btntxt:{
    fontSize: 40,
    color: colors.text3,
    fontWeight: '500',
    backgroundColor: colors.col1,
    borderRadius: 20,
    width: 40,
    height: 40,
    textAlign: 'center',
    lineHeight: 40,
  }
})


export default OfferSlider