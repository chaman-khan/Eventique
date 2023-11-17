import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {theme} from '../theme/theme';
const {width, height} = Dimensions.get('screen');

export default function Home() {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [lanuage, setLanguage] = useState('English');
  const [lanuageIcon, setLanguageIcon] = useState(
    require('../Images/english.png'),
  );

  const translateY = useRef(new Animated.Value(-200)).current;

  const showMenu = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setMenuVisible(true);
  };

  const hideMenu = () => {
    Animated.timing(translateY, {
      toValue: -200,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setMenuVisible(false));
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          backgroundColor: theme.colors.primary,
          paddingTop: 20,
          paddingBottom: 35,
        }}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={isMenuVisible ? hideMenu : showMenu}>
            {isMenuVisible ? (
              <Image source={require('../Images/cross.png')} />
            ) : (
              <Image source={require('../Images/menu.png')} />
            )}
          </TouchableOpacity>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontFamily: 'Roboto',
              fontWeight: '700',
            }}>
            App Title
          </Text>
          <Image
            source={require('../Images/cross.png')}
            tintColor="transparent"
          />
        </View>
        {isMenuVisible && (
          <Animated.View style={[styles.menu, {transform: [{translateY}]}]}>
            <TouchableOpacity
              style={{
                width: width - 20,
                height: 50,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                alignSelf: 'center',
                margin: 20,
              }}>
              <Text>Logout</Text>
            </TouchableOpacity>
            <Text
              style={{
                color: '#FFF',
                fontFamily: 'Roboto',
                fontSize: 18,
                fontWeight: '400',
              }}>
              Change Language
            </Text>
            <View
              style={{
                width: '100%',
                height: 50,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 100,
                backgroundColor: 'white',
                borderRadius: 10,
                marginTop: 8,
                paddingHorizontal: 15,
              }}>
              <View
                style={{
                  width: '30%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Image source={lanuageIcon} />
                <Text>{lanuage}</Text>
              </View>
              <Image source={require('../Images/downArrow.png')} />
            </View>
          </Animated.View>
        )}
      </View>
      {/* <View style={{height: 20, backgroundColor: theme.colors.primary}}></View> */}
      <View
        style={{
          width: width,
          height: height - height / 5,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          backgroundColor: 'white',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          marginTop: -20,
        }}>
        <Image source={require('../Images/noEvents.png')} />
        <Text
          style={{
            fontSize: 20,
            color: '#C4C4C4',
            fontFamily: 'Roboto',
            fontWeight: '700',
          }}>
          NO EVENTS YET
        </Text>
      </View>
      <TouchableOpacity
        style={{
          width: '95%',
          height: 50,
          backgroundColor: theme.colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          alignSelf: 'center',
          position: 'absolute',
          bottom: 20,
        }}>
        <Text style={styles.btnText}>Create new Event</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    // position: 'absolute',
    // top: 60,
    // left: 0,
    // right: 0,
    // height: 200,
    width: '95%',
    backgroundColor: theme.colors.primary,
    // borderTopWidth: 1,
    // borderTopColor: 'gray',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  topBar: {
    width: '95%',
    alignSelf: 'center',
    // paddingTop: 20,
    backgroundColor: theme.colors.primary,
    // paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnText: {
    color: '#FFF',
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '400',
  },
});
