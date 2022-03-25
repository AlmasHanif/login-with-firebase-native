/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import back from '../assets/images/images.png';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styling from '../styling/styling';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const reference = database().ref('users/');

const styles = StyleSheet.create(styling);
const SignUp = ({navigation}) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const signupUser = () => {
    let userData = {name, email, password};
    if (!userData.email) {
      Alert.alert('Aurhentication Error', 'Enter Email', [{label: 'okay'}]);
      return;
    }
    if (!userData.password && password.length < 6) {
      Alert.alert(
        'Aurhentication Error',
        'Enter Password and password should be more that 6 characters',
        [{label: 'okay'}],
      );
      return;
    }
    auth()
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .then(() => {
        ToastAndroid.show('User Created Sucessfully', ToastAndroid.SHORT);
        navigation.navigate('Login', userData);
        console.log('sucess');
      })
      .catch(err => {
        Alert.alert('Aurhentication Error', err.message, [{label: 'okay'}]);
        console.log('error');
      });

    // reference.push(userData).then(() => {
    //   Alert.alert('signup', 'data send sucessfully', [
    //     {
    //       label: 'okay',
    //     },
    //   ]);
    //   console.log('data send sucessfully');
    // });
    // navigation.navigate('Login', userData);
  };
  return (
    <>
      <View style={[styles.bgwhite, styles.container]}>
        <View style={[styles.mt]}>
          <Image source={back} style={[{width: 350, height: 250}]} />
        </View>
        <Text style={[styles.headertitle, styles.mb1]}>SignUp</Text>
        <View>
          <TextInput
            style={[styles.input, styles.mb2]}
            placeholder="Enter Name"
            onChangeText={e => setName(e)}
          />
          <TextInput
            keyboardType="email-address"
            style={[styles.input, styles.mb2]}
            placeholder="Enter Email"
            onChangeText={e => setEmail(e)}
          />
          <TextInput
            // keyboardType=""
            secureTextEntry={true}
            style={[styles.input, styles.mb2]}
            placeholder="Enter Password"
            onChangeText={e => setPassword(e)}
          />
        </View>
        <View style={[styles.mb2, styles.m1, styles.flexcenter]}>
          <TouchableOpacity onPress={signupUser}>
            <Text style={[styles.btn]}>
              SignUp
              <Icon name="rocket" size={30} color="#fff" />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.flexcenter]}>
          {/* <Text style={[styles.paragraph, styles.mb2]}>
            Are You New Here? SignUp First
          </Text> */}
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.textcenter, styles.dark, styles.fs3]}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default SignUp;
