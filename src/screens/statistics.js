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
  ScrollView,
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

const DoorKeepers = [
  {
    email: 'kmi@gmail.com',
  },
  {
    email: 'kkk@gmail.com',
  },
  {
    email: 'keeper@gmail.com',
  },
];
export default function Statistics({navigation}) {
  const route = useRoute().params;
  const item = route.item;
  console.log(item);

  const [showSetting, setShowSetting] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  const [eventTitle, setEventTitle] = useState(item.title);
  const [eventVenue, setEventVenue] = useState(item.venue);
  const [maxParticipants, setMaxParticipants] = useState(item.maxParticipants);
  const [alertPoint, setAlertPoint] = useState(item.alertPoint);
  const [numEntries, setNumEntries] = useState(item.numEntries);

  const barRatio = (alertPoint / maxParticipants) * 100;
  console.log(barRatio);

  const handleMinusPressParticipants = () => {
    // Decrease numEntries by 1, but not below 0
    setMaxParticipants(prevNumEntries =>
      Math.max(Number(prevNumEntries) - 1, 0).toString(),
    );
  };
  const handlePlusPressParticipants = () => {
    // Increase numEntries by 1, but not beyond maxParticipants
    setMaxParticipants(prevNumEntries => {
      const incrementedValue = Number(prevNumEntries) + 1;
      const maxAllowedValue = Number(50000); // Assuming maxParticipants is a state or prop

      return Math.min(incrementedValue, maxAllowedValue).toString();
    });
  };
  const handleMinusPressAlerts = () => {
    // Decrease numEntries by 1, but not below 0
    setAlertPoint(prevNumEntries =>
      Math.max(Number(prevNumEntries) - 1, 0).toString(),
    );
  };
  const handlePlusPressAlerts = () => {
    // Increase numEntries by 1, but not beyond maxParticipants
    setAlertPoint(prevNumEntries => {
      const incrementedValue = Number(prevNumEntries) + 1;
      const maxAllowedValue = Number(maxParticipants); // Assuming maxParticipants is a state or prop

      return Math.min(incrementedValue, maxAllowedValue).toString();
    });
  };
  const handleMinusPressEntries = () => {
    // Decrease numEntries by 1, but not below 0
    setNumEntries(prevNumEntries =>
      Math.max(Number(prevNumEntries) - 1, 0).toString(),
    );
  };
  const handlePlusPressEntries = () => {
    // Increase numEntries by 1, but not beyond maxParticipants
    setNumEntries(prevNumEntries => {
      const incrementedValue = Number(prevNumEntries) + 1;
      const maxAllowedValue = Number(maxParticipants); // Assuming maxParticipants is a state or prop

      return Math.min(incrementedValue, maxAllowedValue).toString();
    });
  };
  // const handleCreateEvent = newEvent => {
  //   // Handle the creation of the event and update the state
  //   setEventData(prevData => [...prevData, newEvent]);
  //   setIsShowModal(false);
  // };

  const EventConfig = () => {
    const [doorKeeperName, setDoorKeeperName] = useState('');
    const [doorKeeperAddress, setDoorKeeperAddress] = useState('');
    return (
      <Modal transparent>
        <View style={styles.bgModal}>
          <View style={[styles.modell, {paddingHorizontal: 10}]}>
            <TouchableOpacity
              style={{alignSelf: 'flex-end'}}
              onPress={() => setShowConfig(false)}>
              <Image source={require('../Images/delete1.png')} />
            </TouchableOpacity>
            <Text style={{fontSize: 18, fontWeight: '700', color: 'black'}}>
              ENTRY CONFIG
            </Text>
            <View style={[styles.input]}>
              <Text style={{fontSize: 10, padding: 0}}>DOOR KEEPER'S ID</Text>
              <TextInput
                style={{padding: 0}}
                placeholder="Door keeper's ID/name"
                value={doorKeeperName}
                onChangeText={text => setDoorKeeperName(text)}
              />
            </View>
            <View style={styles.input}>
              <Text style={{fontSize: 10, padding: 0}}>
                DOOR KEEPER'S EMAIL
              </Text>
              <TextInput
                style={{padding: 0}}
                placeholder="Door keeper's email address"
                value={doorKeeperAddress}
                onChangeText={text => setDoorKeeperAddress(text)}
              />
            </View>
            <View
              style={{
                width: '90%',
                height: 50,
                backgroundColor: theme.colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Text style={{color: 'white'}}>Add Keeper</Text>
            </View>
            <Text
              style={{
                width: '90%',
                alignSelf: 'center',
                alignContent: 'flex-start',
                color: 'black',
                marginTop: 30,
                fontSize: 18,
                fontWeight: '700',
              }}>
              KEEPER(S)
            </Text>
            <View style={{maxHeight: 200}}>
              <FlatList
                data={DoorKeepers}
                renderItem={() => (
                  <View
                    style={[
                      styles.input,
                      {
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        alignSelf: 'center',
                        backgroundColor: 'white',
                        borderColor: theme.colors.grey,
                        borderWidth: 2,
                      },
                    ]}>
                    <View style={{width: '80%'}}>
                      <Text style={{fontSize: 10, padding: 0}}>
                        DOOR KEEPER'S EMAIL
                      </Text>
                      <Text style={{color: 'black'}}>Email Address</Text>
                    </View>
                    <Image source={require('../Images/deleteIcon.png')} />
                  </View>
                )}
              />
            </View>
            <TouchableOpacity
              style={[
                styles.Btn,
                {
                  width: '90%',
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
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
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
          <ScrollView>
            <View style={styles.modell}>
              <Text style={styles.newEventTxt}>EVENT SETTINGS</Text>
              <View style={styles.input}>
                <Text style={{fontSize: 10, padding: 0}}>EVENT TITLE</Text>
                <TextInput
                  style={{padding: 0}}
                  placeholder="Some event title"
                  value={eventTitle}
                  onChangeText={text => setEventTitle(text)}
                />
              </View>
              <View style={styles.input}>
                <Text style={{fontSize: 10, padding: 0}}>VENUE</Text>
                <TextInput
                  style={{padding: 0}}
                  placeholder="Some location"
                  value={eventVenue}
                  onChangeText={text => setEventVenue(text)}
                />
              </View>
              <View style={styles.halfInput}>
                <View style={[styles.input, {width: '60%'}]}>
                  <Text style={{fontSize: 10, padding: 0}}>
                    MAX PARTICIPANTS
                  </Text>
                  <TextInput
                    style={{padding: 0}}
                    placeholder="500"
                    value={maxParticipants}
                    onChangeText={text => setMaxParticipants(text)}
                  />
                </View>
                <TouchableOpacity
                  style={styles.plusBtn}
                  onPress={handleMinusPressParticipants}>
                  <Image source={require('../Images/minus.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.plusBtn}
                  onPress={handlePlusPressParticipants}>
                  <Image source={require('../Images/plus.png')} />
                </TouchableOpacity>
              </View>
              <View style={styles.halfInput}>
                <View style={[styles.input, {width: '60%'}]}>
                  <Text style={{fontSize: 10, padding: 0}}>ALERT POINT</Text>
                  <TextInput
                    style={{padding: 0}}
                    placeholder="355"
                    value={alertPoint}
                    onChangeText={text => {
                      const numericValue = Number(text);
                      if (
                        !isNaN(numericValue) &&
                        numericValue <= maxParticipants
                      ) {
                        setAlertPoint(text);
                      }
                    }}
                  />
                </View>
                <TouchableOpacity
                  style={styles.plusBtn}
                  onPress={handleMinusPressAlerts}>
                  <Image source={require('../Images/minus.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.plusBtn}
                  onPress={handlePlusPressAlerts}>
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
                    value={numEntries}
                  />
                </View>
                <TouchableOpacity
                  style={styles.plusBtn}
                  onPress={handleMinusPressEntries}>
                  <Image source={require('../Images/minus.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.plusBtn}
                  onPress={handlePlusPressEntries}>
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
              <Text style={{fontSize: 30}}></Text>
            </View>
            {showDeleteModal && (
              <Modal>
                <View style={styles.deleteModel}>
                  <View style={styles.deleteView}>
                    <Text style={styles.deleteText}>
                      CONFIRM EVENT DELETION
                    </Text>
                    <View style={styles.deleteButon}>
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
                        <Text style={{color: theme.colors.primary}}>
                          Cancel
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.Btn, {width: '47%'}]}
                        onPress={() => {
                          setDeleteModal(false);
                          setShowSetting(false);
                        }}>
                        <Text style={{color: 'white'}}>Confirm</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            )}
          </ScrollView>
        </View>
      ) : (
        <View style={styles.noEvent}>
          <ScrollView>
            <View style={{width: '90%'}}>
              <Text style={styles.eventText}>EVENT STATISTICS</Text>
              <View style={styles.listItem}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
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
                    <Text style={styles.entryNumber}>{maxParticipants}</Text>
                  </View>
                  <View>
                    <Text style={styles.entryTxt}>TOTAL OUT</Text>
                    <Text style={styles.entryNumber}>{maxParticipants}</Text>
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
                  <Text
                    style={{fontSize: 10, fontWeight: '400', color: '#274D76'}}>
                    TOGGLE ALL
                  </Text>
                </View>
              </View>
              <View
                style={{width: '90%', alignSelf: 'center', paddingBottom: 90}}>
                <FlatList
                  data={Data}
                  key={item => item.id.toString()}
                  numColumns={2}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      activeOpacity={1}
                      style={{
                        width: '47%',
                        backgroundColor: theme.colors.grey,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                        margin: 5,
                        paddingTop: 20,
                        paddingBottom: 5,
                      }}
                      onPress={() => setShowConfig(true)}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '500',
                          color: 'black',
                        }}>
                        Entry #{item.id}
                      </Text>
                      <Text
                        style={{fontSize: 10, marginTop: 10, color: 'black'}}>
                        TOTAL IN
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '700',
                          color: 'black',
                        }}>
                        {item.totalIn}
                      </Text>
                      <Text
                        style={{fontSize: 10, marginTop: 10, color: 'black'}}>
                        TOTAL OUT
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '700',
                          color: 'black',
                        }}>
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
                          style={{
                            fontSize: 12,
                            color: 'white',
                            fontWeight: '700',
                          }}>
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
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      )}
      {showConfig && <EventConfig />}
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
    // height: height,
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
    // width: '100%',
    width: '90%',
    height: 55,
    alignSelf: 'center',
    // justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: theme.colors.grey,
    padding: 10,
    flexShrink: 0,
    marginVertical: 4,
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
    width: '90%',
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
  deleteModel: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  deleteView: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  deleteText: {
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: '700',
    alignSelf: 'center',
    marginBottom: 15,
    color: 'black',
  },
  deleteButon: {
    width: '100%',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bgModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.40)',
  },
});
