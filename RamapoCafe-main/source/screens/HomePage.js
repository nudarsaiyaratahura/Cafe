/**/
/*
HomePage::HomePage() HomePage::HomePage()

NAME

        HomePage::HomePage - Displays the main page of the app, featuring a search bar, category sections, and item sliders.

SYNOPSIS

        React Native Component HomePage({ navigation });

DESCRIPTION

        This component serves as the main page of the app, providing users with a search bar, category sections, and various sliders
        showcasing different food items. It allows users to search for items, view items categorized by brand, and navigate through
        the app using the provided navigation prop.

        The component performs several tasks:
        - Initializes state variables to store food data and categorize it into different brands (Dunkin, Atrium, Starbucks).
        - Uses Firebase Firestore to fetch food data in real-time and updates the state accordingly.
        - Filters food data based on the search query to display search results.
        - Renders different components such as `Categories`, `OfferSlider`, and `Cardslider` to showcase the available items.
        - Displays a bottom navigation bar for easy navigation within the app.

RETURNS

        Returns a React Native component displaying the home page, including a search bar, category sections, and item sliders.

USAGE

        <HomePage navigation={navigation} />

        navigation: The navigation prop used to navigate between screens.

*/

/**/

import { StyleSheet, Text, View, StatusBar, TextInput, ScrollView, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../globals/style';
import HomeHeadNav from '../components/HomeHeadNav';
import Categories from '../components/Categories';
import OfferSlider from '../components/OfferSlider';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { firebase } from '../../FireBase/FirebaseConfig';
import Cardslider from '../components/Cardslider';
import BottomNav from '../components/BottomNav';

const HomePage = ({ navigation }) => {
  const [foodData, setFoodData] = useState([]);
  const [DunkinData, setDunkinData] = useState([]);
  const [AtriumData, setAtriumData] = useState([]);
  const [StarbucksData, setStarbucksData] = useState([]);
  const [search, setSearch] = useState('');

  const foodRef = firebase.firestore().collection('FoodData');

  useEffect(() => {
    const unsubscribe = foodRef.onSnapshot(snapshot => {
      setFoodData(snapshot.docs.map(doc => doc.data()));
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setDunkinData(foodData.filter(item => item.foodType === 'dunkin'));
    setAtriumData(foodData.filter(item => item.foodType === 'atrium'));
    setStarbucksData(foodData.filter(item => item.foodType === 'starbucks'));
  }, [foodData]);

  return (
    <View style={styles.container}>
      <StatusBar />
      <HomeHeadNav navigation={navigation} />
      <View style={styles.bottomnav}>
        <BottomNav navigation={navigation} />
      </View>
      <ScrollView>
        <View style={styles.searchbox}>
          <Feather name="search" size={24} color="black" style={styles.searchicon} />
          <TextInput
            style={styles.input}
            placeholder='Search'
            onChangeText={text => setSearch(text)}
          />
        </View>
        {search !== '' && (
          <View style={styles.searchresultsouter}>
            <FlatList
              style={styles.searchresultsinner}
              data={foodData}
              renderItem={({ item }) => {
                if (item.foodName.toLowerCase().includes(search.toLowerCase())) {
                  return (
                    <View style={styles.searchresult}>
                      <AntDesign name="arrowright" size={24} color="black" />
                      <Text style={styles.searchresulttext}>{item.foodName}</Text>
                    </View>
                  );
                }
                return null;
              }}
              keyExtractor={item => item.id} // Assuming each item has a unique 'id'
            />
          </View>
        )}
        <Categories />
        <OfferSlider />
        <Cardslider title="All Items" data={foodData} navigation={navigation} />
        <Cardslider title="Dunkin Donuts" data={DunkinData} navigation={navigation} />
        <Cardslider title="Atrium" data={AtriumData} navigation={navigation} />
        <Cardslider title="Starbucks" data={StarbucksData} navigation={navigation} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.col1,
    width: '100%',
  },
  searchbox: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: colors.col1,
    borderRadius: 30,
    alignItems: 'center',
    padding: 10,
    margin: 20,
    elevation: 10,
  },
  input: {
    marginLeft: 10,
    width: '90%',
    fontSize: 18,
    color: colors.text3,
  },
  searchicon: {
    color: colors.text3,
  },
  searchresultsouter: {
    width: '100%',
    marginHorizontal: 30,
    height: '100%',
    backgroundColor: colors.col1,
  },
  searchresultsinner: {
    width: '100%',
  },
  searchresult: {
    width: '100%',
    flexDirection: 'row',
    padding: 5,
  },
  searchresulttext: {
    marginLeft: 10,
    fontSize: 18,
    color: colors.text3,
  },
  bottomnav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: colors.col1,
    zIndex: 20,
  },
});

export default HomePage;
