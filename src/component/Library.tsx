import React, {Component} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';

interface IProps {
  globalState: any;
}
interface IState {}
import Entypo from 'react-native-vector-icons/Entypo';
class Library extends Component<IProps, IState> {
  render() {
    const getState = this.props.globalState;
    return (
      <View
        style={[
          styles.libraryContainer,
          getState.themeMode
            ? {backgroundColor: '#000000cc'}
            : {backgroundColor: '#ffffff'},
        ]}>
        <Text
          style={[
            styles.reactText,
            getState.themeMode ? {color: '#fff'} : {color: '#000'},
          ]}>
          Recent
        </Text>
        <View style={styles.hrLine} />
        <View style={styles.historyButtonContainer}>
          <TouchableOpacity style={styles.historyButton}>
            <MaterialCommunityIcons
              name="history"
              size={hp('3.5')}
              color={getState.themeMode ? '#fff' : '#000'}
            />
            <Text
              style={[
                styles.historyText,
                getState.themeMode ? {color: '#fff'} : {color: '#000'},
              ]}>
              History
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.historyButton}>
            <Foundation
              name="play-video"
              size={hp('3.5')}
              color={getState.themeMode ? '#fff' : '#000'}
            />
            <Text
              style={[
                styles.historyText,
                getState.themeMode ? {color: '#fff'} : {color: '#000'},
              ]}>
              Your Videos
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.historyButtonContainer}>
          <TouchableOpacity style={styles.historyButton}>
            <Octicons
              name="download"
              size={hp('3.5')}
              color={getState.themeMode ? '#fff' : '#000'}
            />
            <View>
              <Text
                style={[
                  styles.historyText,
                  getState.themeMode ? {color: '#fff'} : {color: '#000'},
                ]}>
                Downloads
              </Text>
              <Text style={styles.historyDesptions}>20 recommendations</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.historyButton}>
            <MaterialIcons
              name="local-movies"
              size={hp('3.5')}
              color={getState.themeMode ? '#fff' : '#000'}
            />
            <Text
              style={[
                styles.historyText,
                getState.themeMode ? {color: '#fff'} : {color: '#000'},
              ]}>
              Your Movies
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.historyButtonContainer}>
          <TouchableOpacity style={styles.historyButton}>
            <MaterialCommunityIcons
              name="clock-time-four-outline"
              size={hp('3')}
              color={getState.themeMode ? '#fff' : '#000'}
            />
            <View>
              <Text
                style={[
                  styles.historyText,
                  getState.themeMode ? {color: '#fff'} : {color: '#000'},
                ]}>
                Watch later
              </Text>
              <Text style={styles.historyDesptions}>
                Videos you save for later
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.historyButton}>
            <AntDesign
              name="like2"
              size={hp('3.5')}
              color={getState.themeMode ? '#fff' : '#000'}
            />
            <View>
              <Text
                style={[
                  styles.historyText,
                  getState.themeMode ? {color: '#fff'} : {color: '#000'},
                ]}>
                Liked videos
              </Text>
              <Text style={styles.historyDesptions}>No Videos</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.playListContainer}>
          <Text
            style={[
              styles.playListText,
              getState.themeMode ? {color: '#fff'} : {color: '#000'},
            ]}>
            Playlists
          </Text>
          <Text
            style={[
              styles.azText,
              getState.themeMode ? {color: '#fff'} : {color: '#000'},
            ]}>
            A-Z{' '}
            <AntDesign
              name="down"
              size={hp('2')}
              color={getState.themeMode ? '#fff' : '#000'}
            />{' '}
          </Text>
        </View>
        <View style={styles.newPlayListContainer}>
          <MaterialIcons name="add" size={hp('4')} color={'#076AFE'} />
          <Text style={styles.newPlaylistText}>New playlist</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    globalState: state,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Library);

const styles = StyleSheet.create({
  libraryContainer: {
    flex: 1,
  },
  reactText: {
    color: '#000',
    fontSize: hp('2.2'),
    fontFamily: 'Inter',
    fontWeight: '500',
    marginTop: hp('0.6'),
  },
  historyButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('1'),
  },
  hrLine: {
    width: wp('100'),
    borderWidth: 1,
    borderColor: '#C4C4C426',
  },
  historyButton: {
    height: hp('7'),
    width: wp('45.5'),
    flexDirection: 'row',
    // justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#C4C4C426',
    padding: hp('1'),
    borderRadius: hp('1'),
    // marginBottom: hp('1'),
  },
  historyText: {
    color: '#000000',
    fontSize: hp('1.9'),
    fontFamily: 'Inter',
    fontWeight: '500',
    marginLeft: wp('2.5'),
  },
  historyDesptions: {
    color: '#979797',
    fontSize: hp('1.5'),
    fontFamily: 'Inter',
    fontWeight: '500',
    marginLeft: wp('2.5'),
  },
  playListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('2s'),
  },
  playListText: {
    color: '#000000',
    fontSize: hp('2.2'),
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  azText: {
    color: '#000000',
    fontSize: hp('2.2'),
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  newPlayListContainer: {
    height: hp('7'),
    width: wp('92'),
    flexDirection: 'row',
    // justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#C4C4C426',
    padding: hp('1'),
    borderRadius: hp('1'),
    marginTop: hp('2'),
  },
  newPlaylistText: {
    color: '#076AFE',
    fontSize: hp('2.5'),
    fontFamily: 'Inter',
    fontWeight: '500',
    marginLeft: wp('2'),
  },
});
