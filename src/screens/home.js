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
} from 'react-native';
import {theme} from '../theme/theme';
const {width, height} = Dimensions.get('screen');

export default function Home() {
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
  const ChangeLanguage1 = () => {
    setLanguage(language1);
    setLanguageIcon(language1Icon);
    setLanguage1(language2);
    setLanguage1Icon(language2Icon);
    setLanguage2(language);
    setLanguage2Icon(languageIcon);
    setDropdown(false);
  };
  const ChangeLanguage2 = () => {
    setLanguage(language2);
    setLanguageIcon(language2Icon);
    setLanguage1(language);
    setLanguage1Icon(languageIcon);
    setLanguage2(language1);
    setLanguage2Icon(language1Icon);
    setDropdown(false);
  };
  const CreateEvent = () => {
    return (
      <Modal transparent>
        <View style={styles.bgModal}>
          <View style={styles.modell}>
            <Text style={styles.newEventTxt}>CREATE NEW EVENT</Text>
            <View style={styles.input}>
              <Text style={{fontSize: 10, padding: 0}}>EVENT TITLE</Text>
              <TextInput style={{padding: 0}} placeholder="Some event title" />
            </View>
            <View style={styles.input}>
              <Text style={{fontSize: 10, padding: 0}}>VENUE</Text>
              <TextInput style={{padding: 0}} placeholder="Some location" />
            </View>
            <View style={styles.halfInput}>
              <View style={[styles.input, {width: '60%'}]}>
                <Text style={{fontSize: 10, padding: 0}}>MAX PARTICIPANTS</Text>
                <TextInput style={{padding: 0}} placeholder="500" />
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
                <TextInput style={{padding: 0}} placeholder="355" />
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
                <TextInput style={{padding: 0}} placeholder="7" />
              </View>
              <TouchableOpacity style={styles.plusBtn}>
                <Image source={require('../Images/minus.png')} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.plusBtn}>
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
                onPress={() => setIsShowModal(false)}>
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
            <TouchableOpacity style={styles.logoutBtn}>
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
      {/* <View style={{height: 20, backgroundColor: theme.colors.primary}}></View> */}
      <View style={styles.noEvent}>
        <Image source={require('../Images/noEvents.png')} />
        <Text style={styles.noEventText}>NO EVENTS YET</Text>
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
    width: '95%',
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
    width: width,
    height: height - height / 5,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
});
