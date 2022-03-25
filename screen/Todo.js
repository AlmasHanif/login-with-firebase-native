//

/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
// import backImg from './assets/images/background.jpg';
import backImg2 from '../assets/images/background2.jpg';
import logo from '../assets/images/logo.png';
import add from '../assets/images/add.png';
import delet from '../assets/images/delete.png';
import editimg from '../assets/images/edit.png';
import database from '@react-native-firebase/database';

const reference = database().ref('todos/');
import {
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import styling from '../styling/styling';

const styles = StyleSheet.create(styling);
// const deviceWidth = Dimensions.get('window').width;

const Todo = ({navigate, route}) => {
  const [user, setUser] = useState({});
  const [text, settext] = useState('');
  const [todo, settodo] = useState([]);
  const [editTodo, seteditTodo] = useState(false);
  const [index, setIndex] = useState();
  console.log(user.useremail);
  const addtodo = () => {
    if (editTodo) {
      todo[index] = text;
      settodo([...todo]);
      seteditTodo(false);
      settext(' ');
    } else {
      settodo([...todo, text]);
      settext(' ');
    }
    reference.push(todo).then(() => {
      Alert.alert('signup', 'data send sucessfully', [
        {
          label: 'okay',
        },
      ]);
      console.log('data send sucessfully');
    });
    reference.on('value', data => {
      console.log(data.val());
    });
    setUser(route.params);
  };
  const deleteAll = () => {
    settodo([]);
  };
  const deleteItem = id => {
    // console.log(id);
    const list = todo.filter((ele, ind) => {
      return ind !== id;
    });
    settodo(list);
  };

  const edit = id => {
    // console.log(id);
    settext(todo[id]);
    seteditTodo(true);
    setIndex(id);
    // settext('');
  };
  return (
    <>
      <ImageBackground>
        <View style={styles.div}>
          <View style={styles.header}>
            {/* <Image source={logo} style={{width: 50, height: 50}} /> */}
            <Text style={[styles.heading, styles.textcenter]}>TODO APP</Text>
            <Text style={styles.heading}>
              Welcome : {user && user.email ? user.email : '--'}
            </Text>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TextInput
              value={text}
              style={styles.input}
              placeholder="enter todo...."
              onChangeText={e => settext(e)}
            />
          </View>
          <View
            style={[styles.flexrow, styles.justifycontentcenter, styles.mt1]}>
            <TouchableOpacity onPress={addtodo}>
              <Text style={styles.btn}>
                Add
                {/* <Image source={add} style={{width: 20, height: 20}} /> */}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteAll}>
              <Text style={styles.btn}>
                Delete
                {/* <Image source={delet} style={{width: 20, height: 20}} /> */}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.listBox}>
            <ScrollView>
              {todo.map((note, ind) => (
                <>
                  <View style={[styles.mt3]}>
                    <View key={ind} style={[styles.p1, styles.input]}>
                      <Text>{note}</Text>
                    </View>
                    <View
                      style={[
                        styles.flexrow,
                        styles.justifycontentcenter,
                        styles.mt1,
                      ]}>
                      <TouchableOpacity onPress={() => edit(ind)}>
                        <Text style={styles.btn}>
                          edit
                          {/* <Image
                            source={editimg}
                            style={{width: 20, height: 20}}
                          /> */}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => deleteItem(ind)}>
                        <Text style={[styles.btn]}>
                          delete
                          {/* <Image
                            source={delet}
                            style={{width: 20, height: 20, color: 'white'}}
                          /> */}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              ))}
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default Todo;
