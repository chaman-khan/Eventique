import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {theme} from '../theme/theme';

function Login({navigation}) {
  const {width, height} = Dimensions.get('screen');
  return (
    <ScrollView style={{flex: 1}}>
      <View
        style={{
          marginTop: 50,
          marginBottom: 40,
          gap: 20,
          alignSelf: 'center',
          alignItems: 'center',
        }}>
        <Image source={require('../Images/signIn.png')} />
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000000'}}>
          WELCOME BACK
        </Text>
      </View>
      <View style={{gap: 10, marginTop: 30}}>
        <View style={styles.input}>
          <Text style={{fontSize: 10, padding: 0}}>EMAIL</Text>
          <TextInput style={{padding: 0}} placeholder="example@gmail.com" />
        </View>
        <View style={styles.input}>
          <Text style={{fontSize: 10, padding: 0}}>Password</Text>
          <TextInput style={{padding: 0}} placeholder=". . . . . ." />
        </View>
      </View>
      <View
        style={{
          width: '95%',
          alignSelf: 'center',
          marginTop: height / 5,
          gap: 15,
        }}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: theme.colors.primary}]}
          onPress={() => navigation.navigate('Home')}>
          <Text style={{color: 'white'}}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {borderColor: theme.colors.grey, borderWidth: 1},
          ]}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={{color: theme.colors.primary}}>Create new Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '95%',
    height: 55,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: theme.colors.grey,
    padding: 10,
    flexShrink: 0,
  },
  button: {
    borderRadius: 10,

    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Login;
