import React, {useState, useRef, memo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Image,
  Dimensions,
  Modal,
  TextInput,
  FlatList,
} from 'react-native';
import {theme} from '../../theme/theme';
const {width, height} = Dimensions.get('screen');

export default function DoorKeeperHome() {
  const [entryNumber, setNumber] = useState('1');
  const [alertPoint, setAlertPoint] = useState('355');
  const [maxParticipants, setMaxParticipants] = useState('500');
  const [totalIn, setTotalIn] = useState('200');
  const [totalOut, setTotalOut] = useState('200');
  const [isOpened, setIsOpened] = useState('Opened');

  const barRatio = (alertPoint / maxParticipants) * 100;
  return (
    <View style={{flex: 1}}>
      <View style={styles.menuView}>
        <View style={styles.topBar}>
          <Text style={styles.topBarTxt}>ENTRY # {entryNumber}</Text>
        </View>
      </View>
      <View>
        <View style={styles.noEvent}>
          <Text style={styles.eventText}>EVENT STATISTICS</Text>
          <View style={styles.listItem}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  color: '#101010',
                  fontFamily: 'Roboto',
                  fontSize: 14,
                  fontWeight: '700',
                }}>
                CURRENT IN
              </Text>
              <Text>
                {alertPoint}/{maxParticipants}
              </Text>
            </View>
            <View
              style={{
                width: `100%`,
                height: 10,
                // borderTopRightRadius: 10,
                // borderBottomRightRadius: 10,
                // borderTopLeftRadius: 10,
                // borderBottomLeftRadius: 10,
                borderRadius: 10,
                marginTop: 10,
                flexDirection: 'row',
                flexShrink: 1,
                backgroundColor: theme.colors.grey,
              }}>
              <Text
                style={{
                  width: `${barRatio}%`,
                  borderRadius: 10,
                  backgroundColor: '#DDC523',
                }}></Text>
              <Text
                style={{
                  width: `${100 - barRatio}%`,
                }}></Text>
            </View>
            <View style={styles.itemRow}>
              <View>
                <Text style={styles.entryTxt}>TOTAL IN</Text>
                <Text style={styles.entryNumber}>{totalIn}</Text>
              </View>
              <View>
                <Text style={styles.entryTxt}>TOTAL OUT</Text>
                <Text style={styles.entryNumber}>{totalOut}</Text>
              </View>
              <View>
                <Text style={styles.entryTxt}>OPENED ENTRIES</Text>
                <Text style={styles.entryNumber}>1</Text>
              </View>
              <View>
                <Text style={styles.entryTxt}>CLOSED ENTRIES</Text>
                <Text style={styles.entryNumber}>3</Text>
              </View>
            </View>
          </View>
          <Text style={styles.eventText}>ENTRY STATISTICS</Text>
          <View style={styles.enteryState}>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 10}}>TOTAL IN</Text>
              <Text
                style={{
                  fontSize: 20,
                  color: theme.colors.primary,
                  marginBottom: 5,
                }}>
                {totalIn}
              </Text>
              <Text style={{fontSize: 10}}>TOTAL OUT</Text>
              <Text style={{fontSize: 20, color: theme.colors.primary}}>
                {totalOut}
              </Text>
            </View>
            {isOpened == 'Opened' ? (
              <View style={styles.opened}>
                <Image source={require('../../Images/lock-open.png')} />

                <Text style={styles.openTxt}>Opened</Text>
              </View>
            ) : (
              <View style={[styles.opened, {backgroundColor: '#CE5454'}]}>
                <Image source={require('../../Images/lock-close.png')} />

                <Text style={styles.openTxt}>Closed</Text>
              </View>
            )}
          </View>
          <View style={styles.lastBtns}>
            <TouchableOpacity activeOpacity={1} style={styles.lastBtn}>
              <Text style={{fontSize: 24, color: 'white', fontWeight: '500'}}>
                -1
              </Text>
            </TouchableOpacity>
            {isOpened == 'Opened' ? (
              <TouchableOpacity
                activeOpacity={1}
                style={[
                  styles.lastBtn,
                  {backgroundColor: theme.colors.primary},
                ]}>
                <Text style={{fontSize: 24, color: 'white', fontWeight: '500'}}>
                  +1
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.lastBtn, {backgroundColor: '#AABBCC'}]}>
                <Text style={{fontSize: 24, color: 'white', fontWeight: '500'}}>
                  +1
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  topBar: {
    width: '90%',
    alignSelf: 'center',
    // paddingTop: 20,
    backgroundColor: theme.colors.primary,
    // paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topBarTxt: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: '700',
  },
  menuView: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingTop: 20,
    paddingBottom: 35,
  },
  noEvent: {
    width: width,
    height: height - height / 8,
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  eventText: {
    width: '90%',
    color: 'black',
    fontFamily: 'Roboto',
    fontSize: 25,
    fontWeight: '900',
    alignSelf: 'center',
    marginTop: 20,
  },
  listItem: {
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.grey,
    borderRadius: 10,
    marginVertical: 10,
  },
  entryTxt: {
    color: '#4B4B4B',
    fontSize: 10,
    fontWeight: '400',
    fontFamily: 'Roboto',
  },
  entryNumber: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
  itemRow: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  opened: {
    width: '70%',
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#40AA71',
    borderRadius: 10,
    gap: 7,
  },
  enteryState: {
    width: '90%',
    backgroundColor: theme.colors.grey,
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  openTxt: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
    borderRadius: 10,
  },
  lastBtn: {
    width: '47%',
    height: 100,
    backgroundColor: '#CE5454',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastBtns: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
