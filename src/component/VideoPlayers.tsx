import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import Video from 'react-native-video';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {connect} from 'react-redux';
import Slider from '@react-native-community/slider';
import {ActiveVideo} from './Action';
interface IProps {
  globalState: any;
  navigation?: {goBack: () => void; push: (arg: string) => void};
  clickVideo: (id: string) => void;
}
interface IState {
  videoPlayPause: boolean;
  videoDuration: number;
  videoDurationValue: number;
  videoDurationSeconds: number;
  videoDurationMinutes: number;
  moreText: boolean;
  controlVisible: boolean;
  volumeValue: number;
  visibleVolumeSlider: boolean;
}

let timeDuration: string | number | NodeJS.Timeout | undefined;

class VideoPlayers extends Component<IProps, IState> {
  player: any = React.createRef();
  state: IState = {
    videoPlayPause: false,
    videoDuration: 0,
    videoDurationValue: 0,
    videoDurationSeconds: 0,
    videoDurationMinutes: 0,
    moreText: false,
    controlVisible: true,
    volumeValue: 1,
    visibleVolumeSlider: false,
  };

  timeConvert = async (time: any) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.trunc(time - minutes * 60);
    this.setState({
      videoDurationMinutes: minutes,
      videoDurationSeconds: seconds,
    });
  };

  playVideo = async () => {
    const {videoDurationValue} = this.state;
    this.setState({videoPlayPause: false});
    this.player.seek(videoDurationValue);
    await this.timeConvert(videoDurationValue);
    await this.checkTime();
  };

  clearTimer = async () => {
    // console.log("clear")
    await clearInterval(timeDuration);
  };

  pauseVideo = async () => {
    this.setState({videoPlayPause: true});
    await this.clearTimer();
  };

  onDurationChange = async (value: number) => {
    this.player.seek(value);
    this.setState({videoDurationValue: value});
    await this.timeConvert(value);
  };

  runningTime = async () => {
    const {
      videoDurationValue,
      videoDuration,
      videoDurationSeconds,
      videoDurationMinutes,
    } = this.state;
    if (videoDurationValue <= videoDuration) {
      if (videoDurationSeconds < 59) {
        this.setState(prevState => ({
          videoDurationValue: prevState.videoDurationValue + 1,
          videoDurationSeconds: videoDurationSeconds + 1,
        }));
      } else {
        this.setState(prevState => ({
          videoDurationValue: prevState.videoDurationValue + 1,
          videoDurationMinutes: videoDurationMinutes + 1,
          videoDurationSeconds: 0,
        }));
      }
    } else {
      await this.clearTimer();
      await this.pauseVideo();
    }
  };

  visibleControls = () => {
    this.setState({controlVisible: false});
  };

  onClickVisibleControl = () => {
    this.setState({controlVisible: true});
    setTimeout(() => {
      this.visibleControls();
    }, 9000);
  };

  checkTime = () => {
    timeDuration = setInterval(() => {
      this.runningTime();
    }, 1000);
    setTimeout(() => {
      this.visibleControls();
    }, 9000);
  };

  getData = async () => {
    const getVideoDetails = this.props.globalState.activeVideo[0];
    const durationSplit = getVideoDetails.duration.split(':');
    // console.log(durationSplit);
    const durationSeconds =
      parseInt(durationSplit[0]) * 60 + parseInt(durationSplit[1]);
    // console.log(durationSeconds);
    this.setState({
      videoDuration: durationSeconds,
      videoDurationMinutes: 0,
      videoDurationSeconds: 0,
    });
  };

  componentDidMount = async () => {
    // await this.clearTimer();
    await this.getData();
    await this.checkTime();
  };

  goHome = () => {
    this.props.navigation?.push('BottomTab');
  };

  checkMore = () => {
    this.setState(prev => ({moreText: !prev.moreText}));
  };

  clickVolume = () => {
    this.setState(prev => ({visibleVolumeSlider: !prev.visibleVolumeSlider}));
  };

  onChangeVolume = (value: number) => {
    this.setState({volumeValue: value});
  };

  forwardPlay = async() => {
    const {videoDurationValue, videoDuration} = this.state;
    if (videoDurationValue < videoDuration) {
      const newDuration = videoDurationValue + 10;
      const minutes = Math.floor(newDuration / 60);
      const seconds = Math.trunc(newDuration - minutes * 60);
      this.setState(prev => ({
        videoDurationValue: prev.videoDurationValue + 10,
        videoDurationMinutes: minutes,
        videoDurationSeconds: seconds,
      }));
      await this.player.seek(videoDurationValue + 10);
    } else {
        // const newDuration = videoDurationValue + 10;
      const minutes = Math.floor(videoDuration / 60);
      const seconds = Math.trunc(videoDuration - minutes * 60);
      this.setState(prev => ({
        videoDurationValue: videoDuration,
        videoDurationMinutes: minutes,
        videoDurationSeconds: seconds,
      }));
      await this.player.seek(videoDuration);
    }
  };

  backPlay = async () => {
    const {videoDurationValue} = this.state;
    if (videoDurationValue < 10) {
      this.setState({
        videoDurationValue: 0,
        videoDurationMinutes: 0,
        videoDurationSeconds: 0,
      });
      await this.player.seek(0);
    } else {
      const newDuration = videoDurationValue - 10;
      const minutes = Math.floor(newDuration / 60);
      const seconds = Math.trunc(newDuration - minutes * 60);
      this.setState(prev => ({
        videoDurationValue: prev.videoDurationValue - 10,
        videoDurationMinutes: minutes,
        videoDurationSeconds: seconds,
      }));
      await this.player.seek(videoDurationValue - 10);
    }
  };

  onClickPlayVideo = async (id: string) => {
    await this.props.clickVideo(id);
    this.setState({
      videoDuration: 0,
      videoDurationMinutes: 0,
      videoDurationSeconds: 0,
      videoDurationValue: 0,
      moreText: false,
    });
    await this.player.seek(0);
    await this.clearTimer();
    await this.getData();
    // await this.checkTime();
    // await this.player.seek(0);
    await this.playVideo();
    // console.log("first")
    // this.props.navigation?.push('VideoPlayers');
  };

  render() {
    const getState = this.props.globalState;
    const getVideo = getState.activeVideo[0];
    const {
      videoPlayPause,
      videoDuration,
      videoDurationValue,
      videoDurationSeconds,
      videoDurationMinutes,
      moreText,
      controlVisible,
      volumeValue,
      visibleVolumeSlider,
    } = this.state;
    const filterVideosList = getState.videoList.filter(
      (each: {id: string}) => each.id !== getVideo.id,
    );
    // console.log(getState.activeVideo);
    return (
      <View
        style={[
          styles.videoContainer,
          getState.themeMode
            ? {backgroundColor: '#000000cc'}
            : {backgroundColor: '#ffffff'},
        ]}>
        <TouchableOpacity onPress={this.onClickVisibleControl}>
          <Video
            source={{
              uri: getVideo.videoUrl,
            }} // Can be a URL or a local file.
            ref={ref => {
              this.player = ref;
            }} // Store reference
            //   onBuffer={this.onBuffer} // Callback when remote video is buffering
            //   onError={this.videoError} // Callback when video cannot be loaded
            style={styles.backgroundVideo}
            paused={videoPlayPause}
            disableFocus
            automaticallyWaitsToMinimizeStalling={false}
            // controls
            volume={volumeValue}
            resizeMode="stretch"
          />
        </TouchableOpacity>
        {controlVisible && (
          <>
            <View style={styles.videoHeaderContainer}>
              <AntDesign
                onPress={this.goHome}
                name="down"
                color={'#fff'}
                size={hp('3')}
              />
            </View>
            <View style={styles.videoControlsContainer}>
              <View style={styles.videoControlIconsContainer}>
                <TouchableOpacity
                  onPress={this.backPlay}
                  style={styles.iconBackgroundContainer}>
                  <MaterialIcons
                    name="replay-10"
                    color={'#fff'}
                    size={hp('3.5')}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBackgroundContainer}>
                  <AntDesign
                    name="stepbackward"
                    color={'#fff'}
                    size={hp('3')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={videoPlayPause ? this.playVideo : this.pauseVideo}
                  style={styles.iconBackgroundContainer}>
                  <AntDesign
                    name={videoPlayPause ? 'caretright' : 'pause'}
                    color={'#fff'}
                    size={hp('3')}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBackgroundContainer}>
                  <AntDesign name="stepforward" color={'#fff'} size={hp('3')} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconBackgroundContainer}
                  onPress={this.forwardPlay}>
                  <MaterialIcons
                    name="forward-10"
                    color={'#fff'}
                    size={hp('3.5')}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.sliderContainer}>
              <View style={styles.timeContainer}>
                <Text style={styles.time}>
                  {videoDurationMinutes < 10
                    ? `0${videoDurationMinutes}`
                    : videoDurationMinutes}{' '}
                  :{' '}
                  {videoDurationSeconds < 10
                    ? `0${videoDurationSeconds}`
                    : videoDurationSeconds}
                  / {getVideo.duration}
                </Text>
                <View style={styles.volumeContainer}>
                  <FontAwesome
                    name="volume-up"
                    color={'#fff'}
                    size={hp('3')}
                    onPress={this.clickVolume}
                  />
                  {visibleVolumeSlider && (
                    <Slider
                      style={styles.volumeSlider}
                      thumbTintColor="#ffffff"
                      minimumValue={0}
                      maximumValue={1}
                      maximumTrackTintColor="#fff"
                      minimumTrackTintColor="#fff"
                      value={volumeValue}
                      onValueChange={value => this.onChangeVolume(value)}
                    />
                  )}
                </View>
              </View>
              <Slider
                style={styles.slider}
                thumbTintColor="#900"
                minimumValue={0}
                maximumValue={videoDuration}
                maximumTrackTintColor="#fff"
                minimumTrackTintColor="#900"
                value={videoDurationValue}
                onValueChange={value => this.onDurationChange(value)}
              />
            </View>
          </>
        )}
        <View style={styles.titleVideoContainer}>
          <View style={styles.titleContainer}>
            <Image
              source={{uri: getVideo.thumbnailUrl}}
              resizeMode="stretch"
              style={styles.thumbnailImage}
            />
            <View style={styles.titleTextContainer}>
              <Text
                style={[
                  styles.videoTittle,
                  getState.themeMode ? {color: '#fff'} : {color: '#030303'},
                ]}>
                {getVideo.title}
              </Text>
              <Text
                style={[
                  styles.viewsText,
                  getState.themeMode ? {color: '#fff'} : {color: '#030303'},
                ]}>
                {getVideo.views} Views, {getVideo.uploadTime}, ...
                <Text onPress={this.checkMore}>
                  {moreText ? 'Hide' : 'more'}
                </Text>
              </Text>
            </View>
          </View>
          <Entypo
            name="dots-three-vertical"
            color={getState.themeMode ? '#fff' : '#000'}
            size={hp('3')}
          />
        </View>
        {moreText && (
          <Text
            style={[
              styles.description,
              getState.themeMode ? {color: '#fff'} : {color: '#030303'},
            ]}>
            {getVideo.description}
          </Text>
        )}
        <View style={styles.subscribeContainer}>
          <View style={styles.subscribeAuthorContainer}>
            <View
              style={[
                styles.authorContainer,
                getState.themeMode
                  ? {backgroundColor: '#fff'}
                  : {backgroundColor: '#000000aa'},
              ]}>
              <Text
                style={[
                  styles.subscribeLogo,
                  getState.themeMode ? {color: '#000000'} : {color: '#ffffff'},
                ]}>
                {getVideo.author[0]}
              </Text>
            </View>
            <Text
              style={[
                styles.authorText,
                getState.themeMode ? {color: '#fff'} : {color: '#030303'},
              ]}>
              {getVideo.author} {getVideo.subscriber}
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.subscriptionButton,
              getState.themeMode
                ? {backgroundColor: '#fff'}
                : {backgroundColor: '#900'},
            ]}>
            <Text
              style={[
                styles.authorText,
                getState.themeMode ? {color: '#000000'} : {color: '#ffffff'},
              ]}>
              Subscribe
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={filterVideosList}
          showsVerticalScrollIndicator={false}
          style={styles.videoListContainer}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => this.onClickPlayVideo(item.id)}
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
                <View style={styles.thumbTitleVideoContainer}>
                  <View style={styles.thumbTitleContainer}>
                    {/* <Image
                      source={{uri: item.thumbnailUrl}}
                      resizeMode="stretch"
                      style={styles.thumbThumbnailImage}
                    /> */}
                    <View style={styles.thumbTitleTextContainer}>
                      <Text
                        style={[
                          styles.thumbVideoTittle,
                          getState.themeMode
                            ? {color: '#fff'}
                            : {color: '#030303'},
                        ]}>
                        {item.title}
                      </Text>
                      <Text
                        style={[
                          styles.thumbViewsText,
                          getState.themeMode
                            ? {color: '#fff'}
                            : {color: '#030303'},
                        ]}>
                        {item.views} Views, {item.uploadTime}
                      </Text>
                    </View>
                  </View>
                  <Entypo
                    name="dots-three-vertical"
                    color={getState.themeMode ? '#fff' : '#000'}
                    size={hp('3')}
                  />
                </View>
              </TouchableOpacity>
            );
          }}
        />
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
    clickVideo: (para: string) => dispatch(ActiveVideo(para)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayers);

const styles = StyleSheet.create({
  videoContainer: {
    flex: 1,
  },
  backgroundVideo: {
    height: hp('30'),
    width: wp('100'),
  },
  videoHeaderContainer: {
    position: 'absolute',
    top: hp('1'),
    left: wp('2'),
  },
  videoControlsContainer: {
    width: wp('100'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: hp('12'),
  },
  videoControlIconsContainer: {
    width: wp('75'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconBackgroundContainer: {
    height: hp('6'),
    width: wp('12'),
    backgroundColor: '#000000aa',
    borderRadius: hp('5'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderContainer: {
    width: wp('100'),
    // backgroundColor: '#000000aa',
    position: 'absolute',
    top: hp('24'),
  },
  volumeSlider: {
    width: wp('20'),
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: wp('4'),
  },
  time: {
    color: '#fff',
    fontSize: hp('2'),
    fontFamily: 'Inter',
    fontWeight: '500',
    marginLeft: wp('2'),
  },
  volumeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  slider: {
    width: wp('100'),
    height: hp('2'),
  },
  titleVideoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: hp('1.5'),
    paddingLeft: wp('2'),
    paddingRight: wp('2'),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  thumbnailImage: {
    height: hp('6'),
    width: wp('12'),
    borderRadius: hp('30'),
  },
  titleTextContainer: {
    marginLeft: hp('1'),
  },
  videoTittle: {
    color: '#030303',
    width: wp('70'),
    fontSize: hp('2.5'),
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  viewsText: {
    color: '#030303',
    width: wp('70'),
    fontSize: hp('2'),
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  description: {
    color: '#030303',
    width: wp('70'),
    fontSize: hp('2'),
    fontFamily: 'Inter',
    fontWeight: '500',
    marginLeft: wp('13'),
  },
  subscribeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: wp('2'),
    paddingRight: wp('2'),
    marginTop: hp('2'),
  },
  subscribeAuthorContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  authorContainer: {
    backgroundColor: '#000000aa',
    height: hp('6'),
    width: wp('12'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp('6'),
    marginRight: wp('2'),
  },
  subscribeLogo: {
    color: '#ffffff',
    fontSize: hp('3'),
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  authorText: {
    color: '#000000',
    fontSize: hp('2'),
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  subscriptionButton: {
    backgroundColor: '#000000',
    height: hp('5'),
    width: wp('30'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp('5'),
  },
  videoListContainer: {
    marginTop: hp('1.5'),
  },
  videoPageContainer: {
    marginBottom: hp('3'),
    marginLeft: hp('1.2'),
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
