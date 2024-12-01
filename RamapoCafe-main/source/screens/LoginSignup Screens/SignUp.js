/**/
/*
SignUp::SignUp() SignUp::SignUp()

NAME

        SignUp::SignUp - Manages user registration functionality in a React Native application.

SYNOPSIS

        React Native Component SignUp({ navigation });

DESCRIPTION

        This component provides a registration form for new users. It includes fields for name, email, phone number, 
        password, and address. The component validates the input, ensures passwords match, and handles errors related 
        to Firebase authentication. Upon successful registration, user data is saved in Firestore, and a success message 
        is displayed. The user can then navigate to the login screen or go back to the registration form.

RETURNS

        Returns a React Native component that renders the registration interface and manages user creation.

*/
/**/
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar, ScrollView } from 'react-native';
import { titles, colors, btn1, hr80 } from '../../globals/style';
import { AntDesign, Octicons, MaterialCommunityIcons, FontAwesome5, Feather, Entypo } from '@expo/vector-icons';
import { firebase } from '../../../FireBase/FirebaseConfig';

const SignUp = ({ navigation }) => {
    const [emailfocus, setEmailfocus] = useState(false);
    const [phonefocus, setPhonefocus] = useState(false);
    const [namefocus, setNamefocus] = useState(false);
    const [passwordfocus, setPasswordfocus] = useState(false);
    const [cpasswordfocus, setcPasswordfocus] = useState(false);
    const [showpassword, setShowpassword] = useState(false);
    const [showcpassword, setShowcpassword] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setcPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    const [customError, setCustomError] = useState('');
    const [successmsg, setSuccessmsg] = useState(null);

    const handleSignup = () => {
        if (password !== cpassword) {
            setCustomError("Passwords do not match");
            return;
        }
        if (phone.length !== 10) {
            setCustomError("Phone number should be 10 digits");
            return;
        }
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredentials) => {
                const userRef = firebase.firestore().collection('UserData');
                userRef.add({
                    email,
                    password,
                    phone,
                    name,
                    address,
                    uid: userCredentials.user.uid,
                }).then(() => {
                    setSuccessmsg('User Created Successfully');
                }).catch((error) => {
                    console.log('Firestore error', error);
                });
            })
            .catch((error) => {
                if (error.message.includes('auth/email-already-in-use')) {
                    setCustomError('Email already exists');
                } else if (error.message.includes('auth/invalid-email')) {
                    setCustomError('Invalid Email');
                } else if (error.message.includes('auth/weak-password')) {
                    setCustomError('Password should be at least 6 characters');
                } else {
                    setCustomError(error.message);
                }
            });
    };

    return (
        <View style={styles.container}>
        <ScrollView>
            <StatusBar />
            {successmsg == null ? (
                <View style={styles.container}>
                    <Text style={styles.head1}>Sign Up</Text>
                    {customError !== '' && <Text style={styles.errormsg}>{customError}</Text>}
                    <View style={styles.inputout}>
                        <AntDesign name="user" size={24} color={namefocus ? colors.text3 : colors.text2} />
                        <TextInput 
                            style={styles.input} 
                            placeholder="Full Name" 
                            onFocus={() => {
                                setEmailfocus(false);
                                setPasswordfocus(false);
                                setShowpassword(false);
                                setShowcpassword(false);
                                setNamefocus(true);
                                setPhonefocus(false);
                                setcPasswordfocus(false);
                                setCustomError('');
                            }}
                            onChangeText={setName}
                        />
                    </View>
                    <View style={styles.inputout}>
                        <Entypo name="email" size={24} color={emailfocus ? colors.text3 : colors.text2} />
                        <TextInput 
                            style={styles.input} 
                            placeholder='Email' 
                            onFocus={() => {
                                setEmailfocus(true);
                                setNamefocus(false);
                                setPhonefocus(false);
                                setPasswordfocus(false);
                                setShowpassword(false);
                                setcPasswordfocus(false);
                                setShowcpassword(false);
                                setCustomError('');
                            }}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View style={styles.inputout}>
                        <Feather name="smartphone" size={24} color={phonefocus ? colors.text3 : colors.text2} />
                        <TextInput 
                            style={styles.input} 
                            placeholder="Phone Number" 
                            onFocus={() => {
                                setEmailfocus(false);
                                setPasswordfocus(false);
                                setShowpassword(false);
                                setShowcpassword(false);
                                setNamefocus(false);
                                setPhonefocus(true);
                                setcPasswordfocus(false);
                                setCustomError('');
                            }}
                            onChangeText={setPhone}
                        />
                    </View>
                    <View style={styles.inputout}> 
                        <MaterialCommunityIcons name="lock-outline" size={24} color={passwordfocus ? colors.text3 : colors.text2} />
                        <TextInput 
                            style={styles.input} 
                            placeholder='Password'
                            onFocus={() => {
                                setEmailfocus(false);
                                setPasswordfocus(true);
                                setShowpassword(false);
                                setNamefocus(false);
                                setPhonefocus(false);
                                setcPasswordfocus(false);
                                setCustomError('');
                            }}
                            secureTextEntry={!showpassword}
                            onChangeText={setPassword}
                        />
                        <Octicons 
                            name={showpassword ? "eye" : "eye-closed"} 
                            size={24} 
                            color="black" 
                            onPress={() => setShowpassword(!showpassword)} 
                        />
                    </View>
                    <View style={styles.inputout}> 
                        <MaterialCommunityIcons name="lock-outline" size={24} color={cpasswordfocus ? colors.text3 : colors.text2} />
                        <TextInput 
                            style={styles.input} 
                            placeholder='Confirm Password'
                            onFocus={() => {
                                setEmailfocus(false);
                                setPasswordfocus(false);
                                setcPasswordfocus(true);
                                setShowpassword(false);
                                setNamefocus(false);
                                setPhonefocus(false);
                                setCustomError('');
                            }}
                            secureTextEntry={!showcpassword}
                            onChangeText={setcPassword}
                        />
                        <Octicons 
                            name={showcpassword ? "eye" : "eye-closed"} 
                            size={24} 
                            color="black" 
                            onPress={() => setShowcpassword(!showcpassword)} 
                        />
                    </View>
                    <Text style={styles.address}>Please enter your address</Text>
                    <View style={styles.inputout}>
                        <Entypo name="address" size={24} color="black" />
                        <TextInput 
                            style={styles.input1} 
                            placeholder="  Address"
                            onChangeText={setAddress}
                        />
                    </View>
                    <TouchableOpacity style={btn1} onPress={handleSignup}>
                        <Text style={{ color: colors.col1, fontSize: titles.btntxt, fontWeight: "bold" }}>Create</Text>
                    </TouchableOpacity>
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
                    <Text>Already have an account?
                        <Text style={styles.signup} onPress={() => navigation.navigate('Login')}> Login</Text>
                    </Text>
                </View>
            ) : (
                <View style={styles.container1}>
                    <Text style={styles.successmessage}>{successmsg}</Text>
                    <TouchableOpacity style={btn1} onPress={() => navigation.navigate('Login')}>
                        <Text style={{ color: colors.col1, fontSize: titles.btntxt, fontWeight: "bold" }}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={btn1} onPress={() => setSuccessmsg(null)}>
                        <Text style={{ color: colors.col1, fontSize: titles.btntxt, fontWeight: "bold" }}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            )}
            </ScrollView>
        </View>
    );
};

/*
styles::StyleSheet styles::StyleSheet

NAME

        styles::StyleSheet - Defines the styles for the sign-up screen components.

SYNOPSIS

        const styles = StyleSheet.create({ ... });

DESCRIPTION

        This StyleSheet object styles the various components used in the SignUp component, including input fields, buttons, 
        and text elements. It ensures a consistent look and feel across the sign-up form, with styles for layout, text, 
        and icons.

RETURNS

        Returns a StyleSheet object used to style the SignUp component.

*/
/**/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container1: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
    },
    head1: {
        fontSize: titles.title1,
        color: colors.text3,
        textAlign: 'center',
        marginVertical: 10,
    },
    inputout: {
        flexDirection: 'row',
        width: '80%',
        marginVertical: 10,
        backgroundColor: colors.col1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignSelf: 'center',
        elevation: 20,
    },
    input: {
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
    },
    address: {
        fontSize: 18,
        color: colors.text2,
        textAlign: 'center',
        marginTop: 20,
    },
    errormsg: {
        color: 'maroon',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10,
        borderColor: 'maroon',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    successmessage: {
        color: 'green',
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
        borderColor: 'green',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    }
});

export default SignUp;
