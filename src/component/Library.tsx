import React, {Component} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
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
  clickPlayHistory: (id: string) => void;
  navigation?: {push: (arg: string) => void};
}
interface IState {}
import Entypo from 'react-native-vector-icons/Entypo';
import Slider from '@react-native-community/slider';
import {PlayHistoryVideo} from './Action';
class Library extends Component<IProps, IState> {
  playHistoryVideo = async (id: string) => {
    await this.props.clickPlayHistory(id);
    this.props.navigation?.push('VideoPlayers');
  };

  onTextColorChangeThemeMode = () =>
    this.props.globalState.themeMode ? '#fff' : '#000';
  videoTextChangeThemeMode = () =>
    this.props.globalState.themeMode ? '#fff' : '#030303';
  render() {
    const getState = this.props.globalState;
    return (
      <View
        testID="libraryScreen"
        style={[
          styles.libraryContainer,
          getState.themeMode
            ? {backgroundColor: '#000000cc'}
            : {backgroundColor: '#ffffff'},
        ]}>
        <Text
          style={[
            styles.reactText,
            {color: this.onTextColorChangeThemeMode()},
          ]}>
          Recent
        </Text>
        <View style={styles.historyVideosContainer}>
          <FlatList
            data={[...getState.historyList].reverse()}
            showsHorizontalScrollIndicator={false}
            style={styles.videoListContainer}
            horizontal
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  testID={`history${item.id}`}
                  onPress={() => this.playHistoryVideo(item.id)}
                  style={styles.videoPageContainer}>
                  <ImageBackground
                    source={{uri: item.thumbnailUrl}}
                    resizeMode="stretch"
                    style={styles.videoThumbBackImage}>
                    <View style={styles.thumbDurationContainer}>
                      <Text
                        style={[styles.thumbDurationTimeText, {color: '#fff'}]}>
                        {item.duration}
                      </Text>
                    </View>
                  </ImageBackground>
                  <View style={styles.historySliderContainer}>
                    <Slider
                      style={styles.historySlider}
                      thumbTintColor="#900"
                      minimumValue={0}
                      maximumValue={item.videoDuration}
                      maximumTrackTintColor="#fff"
                      minimumTrackTintColor="#900"
                      value={item.seeks}
                    />
                  </View>
                  <View style={styles.thumbTitleVideoContainer}>
                    <View style={styles.thumbTitleContainer}>
                      <View style={styles.thumbTitleTextContainer}>
                        <Text
                          testID={`VideoTittleId${item.id}`}
                          style={[
                            styles.thumbVideoTittle,
                            {color: this.videoTextChangeThemeMode()},
                          ]}>
                          {item.title}
                        </Text>
                        <Text
                          style={[
                            styles.thumbViewsText,
                            {color: this.videoTextChangeThemeMode()},
                          ]}>
                          {item.views} Views, {item.uploadTime}
                        </Text>
                      </View>
                    </View>
                    <Entypo
                      name="dots-three-vertical"
                      color={this.onTextColorChangeThemeMode()}
                      size={hp('3')}
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View style={styles.hrLine} />
        <View style={styles.historyButtonContainer}>
          <TouchableOpacity style={styles.historyButton}>
            <MaterialCommunityIcons
              name="history"
              size={hp('3.5')}
              color={this.onTextColorChangeThemeMode()}
            />
            <Text
              style={[
                styles.historyText,
                {color: this.onTextColorChangeThemeMode()},
              ]}>
              History
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.historyButton}>
            <Foundation
              name="play-video"
              size={hp('3.5')}
              color={this.onTextColorChangeThemeMode()}
            />
            <Text
              style={[
                styles.historyText,
                {color: this.onTextColorChangeThemeMode()},
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
              color={this.onTextColorChangeThemeMode()}
            />
            <View>
              <Text
                style={[
                  styles.historyText,
                  {color: this.onTextColorChangeThemeMode()},
                ]}>
                Downloads
              </Text>
              <Text style={styles.historyDescriptions}>20 recommendations</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.historyButton}>
            <MaterialIcons
              name="local-movies"
              size={hp('3.5')}
              color={this.onTextColorChangeThemeMode()}
            />
            <Text
              style={[
                styles.historyText,
                {color: this.onTextColorChangeThemeMode()},
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
              color={this.onTextColorChangeThemeMode()}
            />
            <View>
              <Text
                style={[
                  styles.historyText,
                  {color: this.onTextColorChangeThemeMode()},
                ]}>
                Watch later
              </Text>
              <Text style={styles.historyDescriptions}>
                Videos you save for later
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.historyButton}>
            <AntDesign
              name="like2"
              size={hp('3.5')}
              color={this.onTextColorChangeThemeMode()}
            />
            <View>
              <Text
                style={[
                  styles.historyText,
                  {color: this.onTextColorChangeThemeMode()},
                ]}>
                Liked videos
              </Text>
              <Text style={styles.historyDescriptions}>No Videos</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.playListContainer}>
          <Text
            style={[
              styles.playListText,
              {color: this.onTextColorChangeThemeMode()},
            ]}>
            Playlists
          </Text>
          <Text
            style={[styles.azText, {color: this.onTextColorChangeThemeMode()}]}>
            A-Z{' '}
            <AntDesign
              name="down"
              size={hp('2')}
              color={this.onTextColorChangeThemeMode()}
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
  return {
    clickPlayHistory: (para: string) => dispatch(PlayHistoryVideo(para)),
  };
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
    alignItems: 'center',
    backgroundColor: '#C4C4C426',
    padding: hp('1'),
    borderRadius: hp('1'),
  },
  historyText: {
    color: '#000000',
    fontSize: hp('1.9'),
    fontFamily: 'Inter',
    fontWeight: '500',
    marginLeft: wp('2.5'),
  },
  historyDescriptions: {
    color: '#979797',
    fontSize: hp('1.3'),
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
  historyVideosContainer: {
    // marginRight: wp("-4")
  },
  videoListContainer: {
    marginTop: hp('1.5'),
  },
  videoPageContainer: {
    marginBottom: hp('3'),
    marginRight: hp('1.2'),
  },
  videoThumbBackImage: {
    height: hp('15'),
    width: wp('46'),
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: hp('1'),
    borderRadius: hp('2'),
  },
  thumbDurationContainer: {
    height: hp('3'),
    // width: wp('12'),
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: wp('0.5'),
    paddingRight: wp('0.5'),
  },
  historySliderContainer: {
    position: 'absolute',
    top: Platform.OS === "ios" ? hp(12.5) : hp(14),
    left: Platform.OS === "ios" ? wp(-3) : wp(-4),
  },
  historySlider: {
    height: hp('2'),
    width: wp('54'),
    marginLeft: 0,
  },
  thumbDurationTimeText: {
    color: '#000000',
    fontSize: hp('2.2'),
    fontFamily: 'Inter',
    fontWeight: '500',
    // marginLeft: wp('2'),
  },
  thumbTitleVideoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: hp('1.5'),
    paddingLeft: wp('1'),
    paddingRight: wp('1'),
    // borderWidth: 1,
  },
  thumbTitleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  thumbThumbnailImage: {
    height: hp('3'),
    width: wp('5'),
    borderRadius: hp('30'),
  },
  thumbTitleTextContainer: {
    // marginLeft: hp('1'),
  },
  thumbVideoTittle: {
    width: wp('32'),
    color: '#030303',
    fontSize: hp('1.8'),
    fontFamily: 'Inter',
    fontWeight: '500',
    // borderWidth: 1,
  },
  thumbViewsText: {
    color: '#030303',
    // width: wp('70'),
    fontSize: hp('1.5'),
    fontFamily: 'Inter',
    fontWeight: '500',
  },
});
