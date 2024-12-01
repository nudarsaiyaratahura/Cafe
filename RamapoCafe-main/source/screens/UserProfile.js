/**/
/*
UserProfile::UserProfile()

NAME

    UserProfile - Displays and manages the user's profile, including viewing and updating profile details and changing the password.

SYNOPSIS

    const UserProfile = ({ navigation }) => {
        navigation       --> the navigation object used to navigate between screens.
    };

DESCRIPTION

    This component is responsible for displaying the user's profile information and providing functionality to update
    profile details (name and address) and change the password. It also handles user authentication state to ensure
    only logged-in users can access the profile page.

    The component performs the following tasks:
    - Checks if the user is logged in and navigates to the login screen if not.
    - Fetches user data from Firestore and displays it on the profile page.
    - Allows the user to edit profile details (name and address) and update the information in Firestore.
    - Allows the user to change their password, re-authenticating the user before updating the password.
    - Provides a logout option that signs the user out and navigates back to the login screen.

PARAMETERS

    navigation       --> The navigation object used to navigate between screens.

RETURNS

    Returns a React component that displays the user's profile information and provides UI elements for updating
    profile details, changing the password, and logging out.
*/

/**/

import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { firebase } from '../../FireBase/FirebaseConfig';
import { navbtn, navbtnin } from '../globals/style'
import { AntDesign } from '@expo/vector-icons';
import { colors, btn2 } from '../globals/style';

const UserProfile = ({ navigation }) => {
  const [userLoggedUid, setUserLoggedUid] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const checkLogin = () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUserLoggedUid(user.uid);
        } else {
          setUserLoggedUid(null);
          navigation.navigate('Login');
        }
      });
    };
    checkLogin();
  }, []);

  const getUserData = async () => {
      if (userLoggedUid) {
        const docRef = firebase
          .firestore()
          .collection('UserData')
          .where('uid', '==', userLoggedUid);
        const doc = await docRef.get();
        if (!doc.empty) {
          doc.forEach((doc) => {
            setUserData(doc.data());
          });
        } else {
          navigation.navigate('Login');
        }
      }
    };

  useEffect(() => {
    getUserData();
  }, [userLoggedUid]);

  //console.log(userData);

  const [edit, setEdit] = useState(false);
  const [newname, setNewName] = useState('');
  const [newaddress, setNewAddress] = useState('');

  const updateUser = async () => {
        const docRef = firebase.firestore().collection('UserData').where('uid', '==', userLoggedUid)
        const doc = await docRef.get();
        if (!doc.empty) {
            if (newname !== '') {
                doc.forEach((doc) => {
                    doc.ref.update({
                        name: newname
                    })
                })
            }
            if (newaddress !== '') {
                doc.forEach((doc) => {
                    doc.ref.update({
                        address: newaddress
                    })
                })
            }
            alert('Your Profile is updated');
        getUserData();
        setEdit(false);
        setPasswordedit(false);
        }
        else {
            alert('Error! Data not found');
            setEdit(false);
            setPasswordedit(false);
        }
    }
  
  const [Passwordedit, setPasswordedit] = useState(false);
  const [oldpassword, setOldPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');

  const updatePassword = async () => {
    setPasswordedit(false)
        const reauthenticate = (oldpassword) => {
            var user = firebase.auth().currentUser;
            var cred = firebase.auth.EmailAuthProvider.credential(
                user.email, oldpassword);
            return user.reauthenticateWithCredential(cred);
        }
        let docRef = firebase.firestore().collection('UserData').where('uid', '==', userLoggedUid)
        let doc = await docRef.get();
        reauthenticate(oldpassword).then(() => {
            var user = firebase.auth().currentUser;
            user.updatePassword(newpassword).then(() => {
                // alert("Password updated!");

                if (!doc.empty) {
                    doc.forEach((doc) => {
                        doc.ref.update({
                            password: newpassword
                        })
                    })
                    alert('Your Password is updated');
                }
            }).catch((error) => { alert('Server Issue'); });
        }).catch((error) => { alert('Wrong Password'); });
    }

    const logOutUser = () => {
        firebase.auth().signOut().then(() => {
            alert('You are logged out');
            navigation.navigate('Login');
        }).catch((error) => {
            alert('Server Issue');
        });
    }
  
  return (
    <View style={styles.containerout}>
      <TouchableOpacity onPress={()=> navigation.navigate('HomePage')}>
        <View style={navbtn}>
            <AntDesign name="back" size={24} color="black" style={navbtnin} />
        </View>
      </TouchableOpacity>
      {edit === false && Passwordedit == false && 
      <View style={styles.container}>
            <Text style={styles.head1}>Your Profile</Text>
            <View style={styles.containerin}>
                <Text style={styles.head2}>Name: {userData?<Text style={styles.head2in}>{userData.name}</Text>: 'loading'}</Text>
                <Text style={styles.head2}>Email: {userData?<Text style={styles.head2in}>{userData.email}</Text>: 'loading'}</Text>
                <Text style={styles.head2}>Phone: {userData?<Text style={styles.head2in}>{userData.phone}</Text>: 'loading'}</Text>
                <Text style={styles.head2}>Address: {userData?<Text style={styles.head2in}>{userData.address}</Text>: 'loading'}</Text>                
            </View>

            <TouchableOpacity onPress = {() => {
              setEdit(!edit)
            }}>
              <View style={btn2}>
                <Text style={styles.btntxt}>Edit Details</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress = {() => {
              setPasswordedit(!Passwordedit)
            }}>
              <View style={btn2}>
                <Text style={styles.btntxt}>Change Password</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => logOutUser()}>
                <View style={btn2}>
                    <Text style={styles.btntxt}>Logout</Text>
                </View>
            </TouchableOpacity>

      </View>}
      {edit == true &&
        <View style={styles.container}>
          <Text style={styles.head1}>Edit Profile</Text>
          <TextInput style={styles.input} placeholder='Name' onChangeText = {(e) => setNewName(e)}/>
          <TextInput style={styles.input} placeholder='Address' onChangeText = {(e) => setNewAddress(e)}/>
          <TouchableOpacity onPress={() => updateUser()}>
            <View style={btn2}>
              <Text style={styles.btntxt}>Submit</Text>
            </View>
          </TouchableOpacity>
        </View>}
        {Passwordedit == true &&
          <View style={styles.container}>
            <Text style={styles.head1}>Change your Password</Text>
            <View style={styles.containerin}>
                <TextInput style={styles.input} placeholder='Old Password' onChangeText={(e) => setOldPassword(e)} />
                <TextInput style={styles.input} placeholder='New Password' onChangeText={(e) => setNewPassword(e)} />
            </View>
                <TouchableOpacity onPress={() => updatePassword()}>
                    <View style={btn2}>
                      <Text style={styles.btntxt}>Submit</Text>
                    </View>
                </TouchableOpacity>
          </View>
        }
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
    containerout: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        width: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
        width: '100%',
    },
    head1: {
        fontSize: 40,
        fontWeight: '200',
        marginVertical: 20,
        color: colors.text3,
    },
    containerin: {
        width: '90%',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.text3,
        borderRadius: 10,
        padding: 20,
        marginTop: 20,
    },
    head2: {
        fontSize: 20,
        fontWeight: '200',
        marginTop: 20,

    },
    head2in: {
        fontSize: 20,
        fontWeight: '300',
    },
    inputout: {
        flexDirection: 'row',
        width: '100%',
        marginVertical: 10,
        backgroundColor: colors.col1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        // alignSelf: 'center',
        elevation: 20,
    },
    btntxt: {
        fontSize: 15,
        fontWeight: '400',
        color: 'white',
        textAlign: 'center',
        padding: 10
    },
    input: {
        width: '100%',
        marginVertical: 10,
        backgroundColor: colors.col1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        elevation: 20,
    }

});