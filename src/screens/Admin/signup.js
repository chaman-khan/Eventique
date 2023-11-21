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

function SignUP({navigation}) {
  const {width, height} = Dimensions.get('screen');
  return (
    <ScrollView style={{flex: 1}}>
      <View
        style={{
          marginTop: 30,
          marginBottom: 40,
          gap: 20,
          alignSelf: 'center',
          alignItems: 'center',
        }}>
        <Image source={require('../Images/signUp.png')} />
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000000'}}>
          CREATE NEW ACCOUNT
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
          style={[styles.button, {backgroundColor: theme.colors.primary}]}>
          <Text style={{color: 'white'}}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {
              borderColor: theme.colors.grey,
              borderWidth: 1,
            },
          ]}
          onPress={() => navigation.navigate('Login')}>
          <Text style={{color: theme.colors.primary}}>
            Already have an Account
          </Text>
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
    flexShrink: 0,
    padding: 10,
    borderRadius: 10,
    backgroundColor: theme.colors.grey,
  },
  button: {
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default SignUP;
