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
import {theme} from '../theme/theme';
const {width, height} = Dimensions.get('screen');

export default function Home({navigation}) {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isdropdown, setDropdown] = useState(false);
  const [language, setLanguage] = useState('English');
  const [language1, setLanguage1] = useState('French');
  const [language2, setLanguage2] = useState('German');
  const [languageIcon, setLanguageIcon] = useState(
    require('../Images/english.png'),
  );
  const [language1Icon, setLanguage1Icon] = useState(
    require('../Images/french.png'),
  );
  const [language2Icon, setLanguage2Icon] = useState(
    require('../Images/german.png'),
  );
  const [isShowModal, setIsShowModal] = useState(false);
  const [eventData, setEventData] = useState([]);

  const [isEmpty, setisEmpty] = useState(false);
  const ChangeLanguage1 = () => {
    setLanguage(language1);
    setLanguageIcon(language1Icon);
    setLanguage1(language2);
    setLanguage1Icon(language2Icon);
    setLanguage2(language);
    setLanguage2Icon(languageIcon);
    setDropdown(false);
  };
  
  const addEvent = newEvent => {
    setEventData(prevEvents => [...prevEvents, {newEvent}]);
  };
  const CreateEvent = () => {
    const [eventTitle, setEventTitle] = useState('First Event');
    const [eventVenue, setEventVenue] = useState('Lahore');
    const [maxParticipants, setMaxParticipants] = useState('500');
    const [alertPoint, setAlertPoint] = useState('355');
    const [numEntries, setNumEntries] = useState('7');
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
    const handleCreateEvent = newEvent => {
      // Handle the creation of the event and update the state
      setEventData(prevData => [...prevData, newEvent]);
      setIsShowModal(false);
    };
    return (
      <Modal transparent>
        <View style={styles.bgModal}>
          <View style={styles.modell}>
            <Text style={styles.newEventTxt}>CREATE NEW EVENT</Text>
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
                <Text style={{fontSize: 10, padding: 0}}>MAX PARTICIPANTS</Text>
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
                  onChangeText={text => setAlertPoint(text)}
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
                  onChangeText={text => setNumEntries(text)}
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
                style={styles.cancelBtn}
                onPress={() => setIsShowModal(false)}>
                <Text style={styles.cancelTxt}>Cancel</Text>
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
        </View>
      </Modal>
    );
  };
  return (
    <View style={{flex: 1}}>
      <View style={styles.menuView}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => setMenuVisible(!isMenuVisible)}>
            {isMenuVisible ? (
              <Image source={require('../Images/cross.png')} />
            ) : (
              <Image source={require('../Images/menu.png')} />
            )}
          </TouchableOpacity>
          <Text style={styles.topBarTxt}>App Title</Text>
          <Image
            source={require('../Images/cross.png')}
            tintColor="transparent"
          />
        </View>
        {isMenuVisible && (
          <View style={styles.menu}>
            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={() => navigation.navigate('Login')}>
              <Text>Logout</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Change Language</Text>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.languageButton}
              onPress={() => setDropdown(!isdropdown)}>
              <View style={styles.btnPart}>
                <Image source={languageIcon} />
                <Text>{language}</Text>
              </View>
              <Image source={require('../Images/downArrow.png')} />
            </TouchableOpacity>
            {isdropdown && (
              <View style={styles.dropItem}>
                <TouchableOpacity
                  style={styles.dropDownButton}
                  activeOpacity={1}
                  onPress={ChangeLanguage1}>
                  <Image source={languageIcon} />
                  <Text>{language1}</Text>
                  <Image source={language1Icon} tintColor="transparent" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.dropDownButton,
                    {borderTopColor: theme.colors.grey, borderTopWidth: 1},
                  ]}
                  activeOpacity={1}
                  onPress={ChangeLanguage2}>
                  <Image source={language2Icon} />
                  <Text>{language2}</Text>
                  <Image source={language2Icon} tintColor="transparent" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>

      <View style={styles.noEvent}>
        {!isEmpty && <Text style={styles.eventText}>EVENTS</Text>}
        <FlatList
          data={eventData}
          renderItem={({item}) => {
            setisEmpty(false);
            return (
              <TouchableOpacity
                activeOpacity={1}
                style={styles.listItem}
                onPress={() => navigation.navigate('Statistics', {item: item})}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <View style={styles.itemRow}>
                  <View>
                    <Text style={styles.entryTxt}>ENTRIES</Text>
                    <Text style={styles.entryNumber}>{item.numEntries}</Text>
                  </View>
                  <View>
                    <Text style={styles.entryTxt}>MAX PARTICIPANTS</Text>
                    <Text style={styles.entryNumber}>
                      {item.maxParticipants}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.entryTxt}>TOTAL PARTICIPANTS</Text>
                    <Text style={styles.entryNumber}>{item.alertPoint}</Text>
                  </View>
                </View>
                <View style={styles.itemSecondRow}>
                  <View style={{width: '47%', flexDirection: 'row'}}>
                    <Text style={styles.circle}></Text>
                    <Text style={[styles.circle, {marginLeft: -10}]}></Text>
                    <Text style={[styles.circle, {marginLeft: -10}]}></Text>
                    <Text style={[styles.circle, {marginLeft: -10}]}></Text>
                  </View>
                  <View style={styles.seeMore}>
                    <Text style={{fontSize: 10, fontWeight: '400'}}>
                      See More
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={() => {
            setisEmpty(true);
            return (
              <View
                style={[
                  styles.noEvent,
                  {alignItems: 'center', justifyContent: 'center'},
                ]}>
                <Image source={require('../Images/noEvents.png')} />
                <Text style={styles.noEventText}>NO EVENTS YET</Text>
              </View>
            );
          }}
        />
        {/* <Image source={require('../Images/noEvents.png')} />
        <Text style={styles.noEventText}>NO EVENTS YET</Text> */}
      </View>
      {!isMenuVisible && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsShowModal(true)}>
          <Text style={styles.btnText}>Create new Event</Text>
        </TouchableOpacity>
      )}
      {isShowModal && <CreateEvent />}
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
  btnText: {
    color: '#FFF',
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '400',
  },
  dropDownButton: {
    width: '80%',
    height: 45,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  noEvent: {
    // width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: -20,
  },
  button: {
    width: '95%',
    height: 50,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
  },
  noEventText: {
    fontSize: 20,
    color: '#C4C4C4',
    fontFamily: 'Roboto',
    fontWeight: '700',
  },
  dropItem: {
    width: '45%',
    // maxHeight: 100,
    alignSelf: 'flex-end',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 5,
    marginVertical: 10,
  },
  languageButton: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 8,
    paddingHorizontal: 15,
  },
  logoutBtn: {
    width: width - 20,
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  text: {
    color: '#FFF',
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: '400',
  },
  btnPart: {
    width: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  bgModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.50)',
  },
  modell: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    gap: 20,
    borderRadius: 20,
    paddingVertical: 20,
  },
  newEventTxt: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
    marginBottom: 20,
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
  cancelBtn: {
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.colors.grey,
    borderWidth: 1,
    borderRadius: 10,
    height: 55,
  },
  createBtn: {
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    height: 55,
  },
  cancelTxt: {
    color: theme.colors.primary,
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 14,
  },
  createTxt: {
    color: 'white',
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 14,
  },
  btns: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  entryTxt: {
    color: '#4B4B4B',
    fontSize: 10,
    fontWeight: '400',
    fontFamily: 'Roboto',
  },
  circle: {
    width: 30,
    height: 30,
    backgroundColor: theme.colors.primary,
    borderColor: 'white',
    borderWidth: 1.5,
    borderRadius: 15,
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
  },
  itemTitle: {
    color: '#101010',
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: '700',
    marginBottom: 20,
  },
  listItem: {
    width: '90%',
    alignSelf: 'center',
    padding: 20,
    backgroundColor: theme.colors.grey,
    borderRadius: 10,
    marginVertical: 10,
  },
  seeMore: {
    width: '35%',
    borderColor: theme.colors.primary,
    height: 30,
    borderWidth: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventText: {
    width: '90%',
    alignSelf: 'center',
    textAlign: 'left',
    marginTop: 20,
    color: 'black',
    fontFamily: 'Roboto',
    fontSize: 25,
    fontWeight: '900',
  },
  itemSecondRow: {
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
