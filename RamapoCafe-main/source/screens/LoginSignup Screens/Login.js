/**/
/*
LoginScreen::LoginScreen() LoginScreen::LoginScreen()

NAME

        LoginScreen::LoginScreen - Handles user login functionality.

SYNOPSIS

        React Native Component LoginScreen({ navigation });

DESCRIPTION

        This component manages user authentication by allowing users to log in with their email and password. 
        It interacts with Firebase for authentication and provides real-time feedback on login status. Users 
        can also toggle password visibility, access options for Google and Facebook login, and navigate to 
        the signup screen if they don't have an account.

RETURNS

        Returns a React Native component that renders the login interface.

*/
/**/
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { titles, colors, btn1, hr80 } from '../../globals/style'
import { MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { firebase } from '../../../FireBase/FirebaseConfig';

const LoginScreen = ({ navigation }) => {
    const [emailfocus, setEmailfocus] = useState(false);
    const [passwordfocus, setPasswordfocus] = useState(false);
    const [showpassword, setShowpassword] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [customError, setCustomError] = useState('');

    const handleLogin = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var user = userCredential.user;
                console.log('Logged in successfully!!!!!!');
                navigation.navigate('WelcomePage');
            })
            .catch((error) => {
                var errorMessage = error.message;
                if (errorMessage === 'Firebase: The email address is badly formatted. (auth/invalid-email).'
                ) {
                    setCustomError('Please enter a valid email address')
                }
                else {
                    setCustomError('Incorrect email or password')
                }
            })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.head1}>Login</Text>
            {customError !== '' && <Text style={styles.errormsg}>{customError}</Text>}
            <View style={styles.inputout}>
                <MaterialIcons name="email" size={24} color={emailfocus === true ? colors.text3 : colors.text2} />
                <TextInput 
                    style={styles.input} 
                    placeholder='Email'
                    onFocus={() => {
                        setEmailfocus(true)
                        setPasswordfocus(false)
                        setShowpassword(false)
                        setCustomError('')
                    }}
                    onChangeText={(text) => { setEmail(text) }}
                />
            </View>
            <View style={styles.inputout}> 
                <MaterialCommunityIcons name="lock-outline" size={24} color={passwordfocus == true ? colors.text3 : colors.text2} />
                <TextInput 
                    style={styles.input} 
                    placeholder='Password'
                    onFocus={() => {
                        setEmailfocus(false)
                        setPasswordfocus(true)
                        setCustomError('')
                    }}
                    onChangeText={(text) => { setPassword(text) }}
                    secureTextEntry={showpassword == false ? true : false}
                />
                <Octicons 
                    name={showpassword == false ? "eye-closed" : "eye"} 
                    size={24} 
                    color="black" 
                    onPress={() => setShowpassword(!showpassword)} 
                />
            </View>
            <TouchableOpacity style={btn1} onPress={() => handleLogin()}>
                <Text style={{ color: colors.col1, fontSize: titles.btntxt, fontWeight: "bold" }}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.forgot}>Forgot Password?</Text>
            <Text style={styles.or}>OR</Text>
            <Text style={styles.googlefacebooktxt}>Sign In With </Text>

            <View style={styles.googlefacebook}>
                <TouchableOpacity>
                    <View style={styles.googlefacebookicon}>
                        <AntDesign name="google" size={24} color="white" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.googlefacebookicon}>
                        <FontAwesome5 name="facebook-f" size={24} color="white" />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={hr80}></View>
            <Text>Don't have an account?
                <Text style={styles.signup} onPress={() => navigation.navigate('SignUp')}> Sign Up</Text>
            </Text>
        </View>
    )
}

/*
styles::StyleSheet styles::StyleSheet

NAME

        styles::StyleSheet - Defines the styles for the login screen components.

SYNOPSIS

        const styles = StyleSheet.create({ ... });

DESCRIPTION

        This StyleSheet object styles the login screen components, including input fields, buttons, and text. 
        It ensures a clean and user-friendly interface with appropriate colors, spacing, and typography. 
        The styles also handle focus states and button interactions.

RETURNS

        Returns a StyleSheet object used to style the LoginScreen components.

*/
const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    head1: {
        fontSize: titles.title1,
        color: colors.text3,
        textAlign: 'center',
        marginVertical: 10,
    },
    inputout:{
        flexDirection:'row',
        width:'80%',
        marginVertical: 10,
        backgroundColor: colors.col1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignSelf: 'center',
        elevation: 20,
    },
    input:{
        fontSize: 18,
        marginLeft: 10,
        width: '80%',
    },
    forgot: {
        color: colors.text2,
        marginTop: 20,
        marginBottom: 10,
    },
    or: {
        color: colors.text3,
        marginVertical: 10,
        fontWeight: 'bold',
    },
    googlefacebooktxt: {
        color: colors.text2,
        marginVertical: 10,
        fontSize: 25,
    },
    googlefacebook: {
        flexDirection: 'row',
    },
    googlefacebookicon: {
        backgroundColor: '#871230',
        width: 50,
        margin: 10,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        elevation: 40,
    },
    signup: {
        color: colors.text3,
    }
})

export default LoginScreen;
/**/
