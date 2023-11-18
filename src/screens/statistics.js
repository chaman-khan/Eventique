import React, {useState, useRef} from 'react';
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
import {theme} from '../theme/theme';
import {useRoute} from '@react-navigation/native';
const {width, height} = Dimensions.get('screen');
const Data = [
  {
    id: 1,
    totalIn: 142,
    totalOut: 30,
    isOpened: 'Opened',
    color: '#40AA71',
  },
  {
    id: 2,
    totalIn: 142,
    totalOut: 30,
    isOpened: 'Closed',
    color: '#CE5454',
  },
  {
    id: 3,
    totalIn: 142,
    totalOut: 30,
    isOpened: 'Closed',
    color: '#CE5454',
  },
  {
    id: 4,
    totalIn: 142,
    totalOut: 30,
    isOpened: 'Closed',
    color: '#CE5454',
  },
];

export default function Statistics({navigation}) {
  const route = useRoute().params;
  const item = route.item;
  console.log(item);
  const barRatio = (item.alertPoint / item.maxParticipants) * 100;
  console.log(barRatio);
  const [showSetting, setShowSetting] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);

  const handleMinusPress = () => {
    // Decrease numEntries by 1, but not below 0
    setNumEntries(prevNumEntries =>
      Math.max(Number(prevNumEntries) - 1, 0).toString(),
    );
  };
  const handlePlusPress = () => {
    // Increase numEntries by 1, but not beyond maxParticipants
    setNumEntries(prevNumEntries => {
      const incrementedValue = Number(prevNumEntries) + 1;
      const maxAllowedValue = Number(maxParticipants); // Assuming maxParticipants is a state or prop

      return Math.min(incrementedValue, maxAllowedValue).toString();
    });
  };
  const handleCreateEvent = newEvent => {
    // Handle the creation of the event and update the state
    setEventData(prevData => [...prevData, newEvent]);
    setIsShowModal(false);
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.menuView}>
        <View style={styles.topBar}>
          {!showSetting ? (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('../Images/back.png')} />
            </TouchableOpacity>
          ) : (
            <Image
              source={require('../Images/back.png')}
              style={{tintColor: 'transparent'}}
            />
          )}
          <Text style={styles.topBarTxt}>App Title</Text>
          {!showSetting ? (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setShowSetting(true)}>
              <Image source={require('../Images/setting.png')} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setShowSetting(false)}>
              <Image source={require('../Images/cross.png')} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {showSetting ? (
        <View style={styles.noEvent}>
          <View style={styles.modell}>
            <Text style={styles.newEventTxt}>EVENT SETTINGS</Text>
            <View style={styles.input}>
              <Text style={{fontSize: 10, padding: 0}}>EVENT TITLE</Text>
              <TextInput
                style={{padding: 0}}
                placeholder="Some event title"
                value={item.title}
                // onChangeText={text => setEventTitle(text)}
              />
            </View>
            <View style={styles.input}>
              <Text style={{fontSize: 10, padding: 0}}>VENUE</Text>
              <TextInput
                style={{padding: 0}}
                placeholder="Some location"
                value={item.venue}
                // onChangeText={text => setEventVenue(text)}
              />
            </View>
            <View style={styles.halfInput}>
              <View style={[styles.input, {width: '60%'}]}>
                <Text style={{fontSize: 10, padding: 0}}>MAX PARTICIPANTS</Text>
                <TextInput
                  style={{padding: 0}}
                  placeholder="500"
                  value={item.maxParticipants}
                />
              </View>
              <TouchableOpacity style={styles.plusBtn}>
                <Image source={require('../Images/minus.png')} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.plusBtn}>
                <Image source={require('../Images/plus.png')} />
              </TouchableOpacity>
            </View>
            <View style={styles.halfInput}>
              <View style={[styles.input, {width: '60%'}]}>
                <Text style={{fontSize: 10, padding: 0}}>ALERT POINT</Text>
                <TextInput
                  style={{padding: 0}}
                  placeholder="355"
                  value={item.alertPoint}
                  // onChangeText={text => setAlertPoint(text)}
                />
              </View>
              <TouchableOpacity style={styles.plusBtn}>
                <Image source={require('../Images/minus.png')} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.plusBtn}>
                <Image source={require('../Images/plus.png')} />
              </TouchableOpacity>
            </View>
            <View style={styles.halfInput}>
              <View style={[styles.input, {width: '60%'}]}>
                <Text style={{fontSize: 10, padding: 0}}>
                  NUMBER OF ENTRIES
                </Text>
                <TextInput
                  style={{padding: 0}}
                  placeholder="7"
                  value={item.numEntries}
                />
              </View>
              <TouchableOpacity
                style={styles.plusBtn}
                onPress={handleMinusPress}>
                <Image source={require('../Images/minus.png')} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.plusBtn}
                onPress={handlePlusPress}>
                <Image source={require('../Images/plus.png')} />
              </TouchableOpacity>
            </View>
            <View style={styles.btns}>
              <TouchableOpacity
                style={styles.Btn}
                onPress={() => setShowSetting(false)}>
                <Text
                  style={[
                    styles.createTxt,
                    {backgroundColor: theme.colors.primary},
                  ]}>
                  Save Changes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.Btn, {backgroundColor: '#40AA71'}]}
                onPress={() => setIsShowModal(false)}>
                <Text style={[styles.createTxt]}>
                  Download Event statistics
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.Btn,
                  {
                    borderColor: 'red',
                    borderWidth: 1,
                    backgroundColor: 'white',
                  },
                ]}
                onPress={() => setDeleteModal(true)}>
                <Text
                  style={[
                    styles.createTxt,
                    {
                      color: 'red',
                    },
                  ]}>
                  Delete Event
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.createBtn}
                onPress={() =>
                  handleCreateEvent({
                    id: eventData.length + 1,
                    title: eventTitle,
                    venue: eventVenue,
                    maxParticipants: maxParticipants,
                    alertPoint: alertPoint,
                    numEntries: numEntries,
                  })
                }>
                <Text style={styles.createTxt}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
          {showDeleteModal && (
            <Modal>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'grey',
                }}>
                <View
                  style={{
                    width: '90%',
                    padding: 20,
                    backgroundColor: 'white',
                    borderRadius: 20,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Roboto',
                      fontSize: 20,
                      fontWeight: '700',
                      alignSelf: 'center',
                      marginBottom: 15,
                      color: 'black',
                    }}>
                    CONFIRM EVENT DELETION
                  </Text>
                  <View
                    style={{
                      width: '100%',
                      paddingVertical: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      style={[
                        styles.Btn,
                        {
                          width: '47%',
                          backgroundColor: 'white',
                          borderColor: theme.colors.grey,
                          borderWidth: 1,
                        },
                      ]}
                      onPress={() => setDeleteModal(false)}>
                      <Text style={{color: theme.colors.primary}}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.Btn, {width: '47%'}]}
                      onPress={() => setShowSetting(false)}>
                      <Text style={{color: 'white'}}>Confirm</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          )}
        </View>
      ) : (
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
                {item.alertPoint}/{item.maxParticipants}
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
                <Text style={styles.entryNumber}>{item.maxParticipants}</Text>
              </View>
              <View>
                <Text style={styles.entryTxt}>TOTAL OUT</Text>
                <Text style={styles.entryNumber}>{item.maxParticipants}</Text>
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
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <Text style={styles.eventText1}>ENTRIES</Text>
            <View
              style={{
                width: '30%',
                height: 29,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: theme.colors.grey,
                borderWidth: 1,
                borderRadius: 20,
              }}>
              <Text style={{fontSize: 10, fontWeight: '400', color: '#274D76'}}>
                TOGGLE ALL
              </Text>
            </View>
          </View>
          <View>
            <FlatList
              data={Data}
              key={item => item.id.toString()}
              numColumns={2}
              renderItem={({item}) => (
                <View
                  style={{
                    width: '47%',
                    backgroundColor: theme.colors.grey,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                    margin: 5,
                    paddingTop: 20,
                    paddingBottom: 5,
                  }}>
                  <Text
                    style={{fontSize: 18, fontWeight: '500', color: 'black'}}>
                    Entry #{item.id}
                  </Text>
                  <Text style={{fontSize: 10, marginTop: 10, color: 'black'}}>
                    TOTAL IN
                  </Text>
                  <Text
                    style={{fontSize: 16, fontWeight: '700', color: 'black'}}>
                    {item.totalIn}
                  </Text>
                  <Text style={{fontSize: 10, marginTop: 10, color: 'black'}}>
                    TOTAL OUT
                  </Text>
                  <Text
                    style={{fontSize: 16, fontWeight: '700', color: 'black'}}>
                    {item.totalOut}
                  </Text>
                  <View
                    style={{
                      width: '80%',
                      height: 30,
                      alignSelf: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: item.color,
                      borderRadius: 20,
                      marginTop: 15,
                      marginBottom: 5,
                    }}>
                    <Text
                      style={{fontSize: 12, color: 'white', fontWeight: '700'}}>
                      {item.isOpened}
                    </Text>
                  </View>
                  <Text
                    style={{
                      width: '40%',
                      height: 5,
                      alignSelf: 'center',
                      backgroundColor: item.color,
                      borderRadius: 10,
                    }}></Text>
                </View>
              )}
            />
          </View>
        </View>
      )}
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
    flexDirection: 'row',
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
    height: height,
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
  eventText1: {
    color: 'black',
    fontFamily: 'Roboto',
    fontSize: 25,
    fontWeight: '900',
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
    color: 'black',
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
  modell: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    gap: 15,
    borderRadius: 20,
    paddingVertical: 20,
  },
  newEventTxt: {
    width: '95%',
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
    marginBottom: 20,
    alignSelf: 'center',
  },
  plusBtn: {
    width: 55,
    height: 55,
    backgroundColor: theme.colors.primary,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  halfInput: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Btn: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
  },
  createTxt: {
    color: 'white',
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 14,
  },
  btns: {
    width: '95%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50,
  },
});
