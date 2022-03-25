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
import styling from '../styling/styling';
import auth from '@react-native-firebase/auth';

const styles = StyleSheet.create(styling);
const Login = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const loginUser = () => {
    let userData = {email, password};
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
      .signInWithEmailAndPassword(userData.email, userData.password)
      .then(() => {
        ToastAndroid.show('User Login Sucessfully', ToastAndroid.SHORT);
        var useremail = auth().currentUser.email;
        console.log(useremail);
        navigation.navigate('Todo', useremail);
      })
      .catch(err => {
        Alert.alert('Aurhentication Error', err.message, [{label: 'okay'}]);
      });
  };
  return (
    <>
      <View style={[styles.bgwhite, styles.container]}>
        <View style={[styles.mt]}>
          <Image source={back} style={[{width: 350, height: 250}]} />
        </View>
        <Text style={[styles.headertitle, styles.mb1]}>Login</Text>
        <View>
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
          <TouchableOpacity onPress={loginUser}>
            <Text style={[styles.btn]}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.mb2, styles.m1, styles.flexcenter]}>
          <Text style={[styles.paragraph, styles.mb2]}>
            Are You New Here? SignUp First
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={[styles.textcenter, styles.dark, styles.fs3]}>
              SignUp
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Login;
