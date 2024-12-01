/**/
/*
WelcomePage::WelcomePage() WelcomePage::WelcomePage()

NAME

        WelcomePage::WelcomePage - Displays a welcome page with login and signup options or user information based on authentication status.

SYNOPSIS

        React Native Component WelcomePage({ navigation });

DESCRIPTION

        This component serves as the initial screen of the app. It displays the app’s logo and title, and provides navigation
        options based on the user's authentication status. 

        If the user is not logged in, the page presents buttons to navigate to the SignUp or Login pages. If the user is logged in,
        it displays the user's email and provides options to navigate to the HomePage or log out. 

        The component uses Firebase authentication to determine the user's login status and handles user sign-out.

RETURNS

        Returns a React Native component that renders the welcome page interface with dynamic navigation options and user information.

*/
/**/

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import logo from '../../../assets/logo.png';
import { colors, hr80 } from '../../globals/style';
import { firebase } from '../../../FireBase/FirebaseConfig';

const WelcomePage = ({ navigation }) => {
    const [userlogged, setUserlogged] = useState(null);

    useEffect(() => {
        const checklogin = () => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    setUserlogged(user);
                } else {
                    setUserlogged(null);
                    console.log('no user');
                }
            });
        };
        checklogin();
    }, []);

    const handleLogout = () => {
        firebase.auth().signOut().then(() => {
            setUserlogged(null);
            console.log('Signed out');
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>RamapoCafe</Text>
            <View style={hr80} />
            <View style={styles.logoout}>
                <Image source={logo} style={styles.logo} />
            </View>
            <View style={hr80} />

            {userlogged == null ? (
                <View style={styles.btnout}>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.btn}>Sign up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.btn}>Log In</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.logged}>
                    <Text style={styles.txtlog}>
                        Signed in as <Text style={styles.txtlogin}>{userlogged.email}</Text>
                    </Text>
                    <View style={styles.btnout}>
                        <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
                            <Text style={styles.btn}>Next</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleLogout()}>
                            <Text style={styles.btn}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

/*
styles::StyleSheet styles::StyleSheet

NAME

        styles::StyleSheet - Defines the styles for the WelcomePage component.

SYNOPSIS

        const styles = StyleSheet.create({ ... });

DESCRIPTION

        This StyleSheet object styles the various components used in the WelcomePage component, including layout, text, and buttons.
        It provides a consistent look and feel for the welcome page with appropriate spacing, colors, and font sizes.

RETURNS

        Returns a StyleSheet object used to style the WelcomePage component.

*/
/**/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#871230',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 50,
        color: colors.col1,
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: '200',
    },
    logoout: {
        width: '80%',
        height: '30%',
        backgroundColor: '#871230',
        alignItems: 'center',
    },
    logo: {
        width: '100%',
        height: '100%',
    },
    text: {
        fontSize: 18,
        width: '80%',
        color: colors.col1,
        textAlign: 'center',
    },
    btnout: {
        flexDirection: 'row',
    },
    btn: {
        fontSize: 20,
        color: colors.text3,
        textAlign: 'center',
        marginVertical: 30,
        marginHorizontal: 10,
        fontWeight: '700',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 20,
    },
    logged: {
        alignItems: 'center',
    },
    txtlog: {
        fontSize: 16,
        color: colors.col1,
    },
    txtlogin: {
        fontSize: 16,
        color: colors.col1,
        fontWeight: '700',
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
    },
});

export default WelcomePage;
