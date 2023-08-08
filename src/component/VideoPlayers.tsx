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
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {connect} from 'react-redux';
import Slider from '@react-native-community/slider';
import {ActiveVideo, HistoryVideo} from './Action';
interface IProps {
  globalState: any;
  navigation?: {goBack: () => void; push: (arg: string) => void};
  clickVideo: (id: string) => void;
  getHistoryVideo: (item: any) => void;
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
  previousVideoId: string;
  previousVideoIconDisable: boolean;
  currentVideoList: any[];
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
    previousVideoId: '0',
    previousVideoIconDisable: true,
    currentVideoList: [],
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
    this.player.current.seek(videoDurationValue);
    await this.timeConvert(videoDurationValue);
    await this.checkTime();
  };

  clearTimer = async () => {
    await clearInterval(timeDuration);
  };

  pauseVideo = async () => {
    this.setState({videoPlayPause: true});
    await this.clearTimer();
  };

  onDurationChange = async (value: number) => {
    await this.player.current.seek(value);
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
      await this.forwardToNextVideo();
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

  checkTime = async () => {
    timeDuration = setInterval(() => {
      this.runningTime();
    }, 1000);
    setTimeout(() => {
      this.visibleControls();
    }, 9000);
    const {videoDurationValue} = this.state;

    this.player?.current.seek(videoDurationValue);
    // this.setState({visibleVolumeSlider: false});
  };

  getData = async () => {
    const getState = this.props.globalState;
    const getVideo = getState?.activeVideo[0];
    if (getVideo?.seeks === undefined) {
      const getVideoDetails = this.props.globalState?.activeVideo[0];
      const durationSplit = getVideoDetails?.duration?.split(':');
      if (durationSplit?.length > 1) {
        const durationSeconds =
          parseInt(durationSplit[0]) * 60 + parseInt(durationSplit[1]);
        this.setState({
          videoDuration: durationSeconds,
          videoDurationMinutes: 0,
          videoDurationSeconds: 0,
        });
      }
    } else {
      const getVideoDetails = this.props.globalState.activeVideo[0];
      const durationSplit = getVideoDetails?.duration?.split(':');
      if (durationSplit?.length > 1) {
        const durationSeconds =
          parseInt(durationSplit[0]) * 60 + parseInt(durationSplit[1]);
        const minutes = Math.floor(getVideo?.seeks / 60);
        const seconds = Math.trunc(getVideo?.seeks - minutes * 60);
        await this.setState({
          videoDuration: durationSeconds,
          videoDurationMinutes: minutes,
          videoDurationSeconds: seconds,
          videoDurationValue: getVideo?.seeks,
        });
      }
    }
  };

  componentDidMount = async () => {
    const getState = this.props.globalState;
    const getVideo = getState?.activeVideo[0];
    await this.getData();
    await this.checkTime();

    const filterVideosList = getState?.videoList.filter(
      (each: {id: string}) => each.id !== getVideo?.id,
    );
    const shuffleList = filterVideosList
      ?.map((a: any) => ({sort: Math.random(), value: a}))
      .sort((a: any, b: any) => a.sort - b.sort)
      .map((a: any) => a.value);

    this.setState({
      previousVideoId: getVideo?.id,
      currentVideoList: shuffleList,
    });
  };

  goHome = async () => {
    const {videoDurationValue, videoDuration} = this.state;
    const getState = this.props.globalState;
    const getVideo = getState.activeVideo[0];
    const historyData = {
      id: getVideo?.id,
      videoDuration: videoDuration,
      seeks: videoDurationValue,
    };
    await this.clearTimer();
    await this.props.getHistoryVideo(historyData);
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

  forwardPlay = async () => {
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
      await this.player.current.seek(videoDurationValue + 10);
    } else {
      // const newDuration = videoDurationValue + 10;
      const minutes = Math.floor(videoDuration / 60);
      const seconds = Math.trunc(videoDuration - minutes * 60);
      this.setState(prev => ({
        videoDurationValue: videoDuration,
        videoDurationMinutes: minutes,
        videoDurationSeconds: seconds,
      }));
      await this.player.current.seek(videoDuration);
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
      await this.player.current.seek(0);
    } else {
      const newDuration = videoDurationValue - 10;
      const minutes = Math.floor(newDuration / 60);
      const seconds = Math.trunc(newDuration - minutes * 60);
      this.setState(prev => ({
        videoDurationValue: prev.videoDurationValue - 10,
        videoDurationMinutes: minutes,
        videoDurationSeconds: seconds,
      }));
      await this.player.current.seek(videoDurationValue - 10);
    }
  };

  forwardToNextVideo = async () => {
    const {videoDurationValue, videoDuration, currentVideoList} = this.state;
    const getState = this.props.globalState;
    const getVideo = getState.activeVideo[0];
    const filterVideosList = getState.videoList.filter(
      (each: {id: string}) => each.id !== getVideo?.id,
    );
    const historyData = {
      id: getVideo?.id,
      videoDuration: videoDuration,
      seeks: videoDurationValue,
    };
    await this.props.getHistoryVideo(historyData);

    const shuffleList = filterVideosList
      .map((a: any) => ({sort: Math.random(), value: a}))
      .sort((a: any, b: any) => a.sort - b.sort)
      .map((a: any) => a.value);

    await this.props.clickVideo(currentVideoList[0].id);
    this.setState({
      videoDuration: 0,
      videoDurationMinutes: 0,
      videoDurationSeconds: 0,
      videoDurationValue: 0,
      moreText: false,
      previousVideoIconDisable: false,
      currentVideoList: shuffleList,
    });
    await this.player.current.seek(0);
    await this.clearTimer();
    await this.getData();
    await this.playVideo();
  };

  playPreviousVideo = async () => {
    const {videoDurationValue, videoDuration, previousVideoId} = this.state;
    const getState = this.props.globalState;
    const getVideo = getState?.activeVideo[0];
    const historyData = {
      id: getVideo?.id,
      videoDuration: videoDuration,
      seeks: videoDurationValue,
    };
    await this.props.getHistoryVideo(historyData);

    const filterVideosList = getState.videoList.filter(
      (each: {id: string}) => each.id !== getVideo?.id,
    );
    const shuffleList = filterVideosList
      .map((a: any) => ({sort: Math.random(), value: a}))
      .sort((a: any, b: any) => a.sort - b.sort)
      .map((a: any) => a.value);

    await this.props.clickVideo(previousVideoId);
    this.setState({
      videoDuration: 0,
      videoDurationMinutes: 0,
      videoDurationSeconds: 0,
      videoDurationValue: 0,
      moreText: false,
      previousVideoIconDisable: false,
      currentVideoList: shuffleList,
    });
    await this.player.current.seek(0);
    await this.clearTimer();
    await this.getData();
    await this.playVideo();
  };
  static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
    prevState.currentVideoList = nextProps.globalState.videoList;
    return {
      prevState,
    };
  }
  onClickPlayVideo = async (id: string) => {
    const {videoDurationValue, videoDuration} = this.state;
    const getState = this.props.globalState;
    const getVideo = getState?.activeVideo[0];
    const historyData = {
      id: getVideo?.id,
      videoDuration: videoDuration,
      seeks: videoDurationValue,
    };
    await this.props.getHistoryVideo(historyData);

    const filterVideosList = getState.videoList.filter(
      (each: {id: string}) => each.id !== getVideo?.id,
    );
    const shuffleList = filterVideosList
      .map((a: any) => ({sort: Math.random(), value: a}))
      .sort((a: any, b: any) => a.sort - b.sort)
      .map((a: any) => a.value);

    await this.props.clickVideo(id);
    this.setState({
      videoDuration: 0,
      videoDurationMinutes: 0,
      videoDurationSeconds: 0,
      videoDurationValue: 0,
      moreText: false,
      previousVideoIconDisable: false,
      currentVideoList: shuffleList,
    });
    await this.player.current.seek(0);
    await this.clearTimer();
    await this.getData();

    await this.playVideo();
  };

  getThemeModeColorChange = () =>
    this.props.globalState?.themeMode ? '#fff' : '#030303';

  render() {
    const getState = this.props.globalState;
    const getVideo = getState?.activeVideo[0];
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
      previousVideoIconDisable,
      currentVideoList,
    } = this.state;
    // console.log('ren', videoDuration);
    return (
      <View
        testID="VideoScreen"
        style={[
          styles.videoContainer,
          getState?.themeMode
            ? {backgroundColor: '#000000cc'}
            : {backgroundColor: '#ffffff'},
        ]}>
        <TouchableOpacity
          testID="VideoPlayer"
          onPress={this.onClickVisibleControl}>
          <Video
            testID="videoPlay"
            source={{
              uri: getVideo?.videoUrl,
            }}
            ref={ref => {
              this.player = ref;
            }}
            style={styles.backgroundVideo}
            paused={videoPlayPause}
            disableFocus
            volume={volumeValue}
            resizeMode="stretch"
            allowsExternalPlayback={false}
          />
        </TouchableOpacity>
        {controlVisible && (
          <>
            <TouchableOpacity
              testID="DownIconId"
              onPress={this.goHome}
              style={styles.videoHeaderContainer}>
              <AntDesign name="down" color={'#fff'} size={hp('3')} />
            </TouchableOpacity>
            <View style={styles.videoControlsContainer}>
              <View style={styles.videoControlIconsContainer}>
                <TouchableOpacity
                  onPress={this.backPlay}
                  testID="back10SecondPlay"
                  style={styles.iconBackgroundContainer}>
                  <MaterialIcons
                    name="replay-10"
                    color={'#fff'}
                    size={hp('3.5')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconBackgroundContainer}
                  // disabled={previousVideoIconDisable}
                  testID="playPrevious"
                  onPress={this.playPreviousVideo}>
                  <AntDesign
                    name="stepbackward"
                    color={'#fff'}
                    size={hp('3')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  testID="VideoPlayControl"
                  onPress={videoPlayPause ? this.playVideo : this.pauseVideo}
                  style={styles.iconBackgroundContainer}>
                  <AntDesign
                    name={videoPlayPause ? 'caretright' : 'pause'}
                    color={'#fff'}
                    size={hp('3')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconBackgroundContainer}
                  testID="forwardToNextPlay"
                  onPress={this.forwardToNextVideo}>
                  <AntDesign name="stepforward" color={'#fff'} size={hp('3')} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.iconBackgroundContainer}
                  onPress={this.forwardPlay}
                  testID="forward10Seconds">
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
                <Text testID="videoDurationTimeText" style={styles.time}>
                  {`${videoDurationMinutes}:${videoDurationSeconds}/`}
                  {getVideo?.duration}
                </Text>
                <View style={styles.volumeContainer}>
                  <FontAwesome
                    testID="volumeIcon"
                    name="volume-up"
                    color={'#fff'}
                    size={hp('3')}
                    onPress={this.clickVolume}
                  />
                  {visibleVolumeSlider && (
                    <View testID="VolumeSlider">
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
                    </View>
                  )}
                </View>
              </View>

              <View testID="VideoSlider">
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
            </View>
          </>
        )}
        <View style={styles.titleVideoContainer}>
          <View style={styles.titleContainer}>
            <Image
              source={{uri: getVideo?.thumbnailUrl}}
              resizeMode="stretch"
              style={styles.thumbnailImage}
            />
            <View style={styles.titleTextContainer}>
              <Text
                style={[
                  styles.videoTittle,
                  {color: this.getThemeModeColorChange()},
                ]}>
                {getVideo?.title}
              </Text>
              <Text
                style={[
                  styles.viewsText,
                  {color: this.getThemeModeColorChange()},
                ]}>
                {getVideo?.views} Views, {getVideo?.uploadTime}, ...
                <Text testID="TextHide" onPress={this.checkMore}>
                  {moreText ? 'Hide' : 'More'}
                </Text>
              </Text>
            </View>
          </View>
          <Entypo
            name="dots-three-vertical"
            color={getState?.themeMode ? '#fff' : '#000'}
            size={hp('3')}
          />
        </View>
        {moreText && (
          <Text
            style={[
              styles.description,
              {color: this.getThemeModeColorChange()},
            ]}>
            {getVideo?.description}
          </Text>
        )}
        <View style={styles.subscribeContainer}>
          <View style={styles.subscribeAuthorContainer}>
            <View
              style={[
                styles.authorContainer,
                getState?.themeMode
                  ? {backgroundColor: '#fff'}
                  : {backgroundColor: '#000000aa'},
              ]}>
              <Text
                style={[
                  styles.subscribeLogo,
                  getState?.themeMode ? {color: '#000000'} : {color: '#ffffff'},
                ]}>
                {getVideo?.author[0]}
              </Text>
            </View>
            <Text
              style={[
                styles.authorText,
                {color: this.getThemeModeColorChange()},
              ]}>
              {getVideo?.author} {getVideo?.subscriber}
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.subscriptionButton,
              getState?.themeMode
                ? {backgroundColor: '#fff'}
                : {backgroundColor: '#900'},
            ]}>
            <Text
              style={[
                styles.authorText,
                getState?.themeMode ? {color: '#000000'} : {color: '#ffffff'},
              ]}>
              Subscribe
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          testID="VideoListSmall"
          data={currentVideoList}
          showsVerticalScrollIndicator={false}
          style={styles.videoListContainer}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                testID={`videoSmall${item.id}`}
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
                    <View style={styles.thumbTitleTextContainer}>
                      <Text
                        testID={`DataText${item.id}`}
                        style={[
                          styles.thumbVideoTittle,
                          getState?.themeMode
                            ? {color: '#fff'}
                            : {color: '#030303'},
                        ]}>
                        {item.title}
                      </Text>
                      <Text
                        style={[
                          styles.thumbViewsText,
                          getState?.themeMode
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
    getHistoryVideo: (para: any) => dispatch(HistoryVideo(para)),
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
