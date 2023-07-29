import React, {Component} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import {connect} from 'react-redux';
interface IProps {
  globalState: any;
}

// const imagesList = [
//   {
//     id: 0,
//     image: require('./assets/Trending.png'),
//   },
//   {
//     id: 1,
//     image: require('./assets/Music.png'),
//   },
//   {
//     id: 2,
//     image: require('./assets/Gaming.png'),
//   },
//   {
//     id: 3,
//     image: require('./assets/News.png'),
//   },
//   {
//     id: 4,
//     image: require('./assets/Films.png'),
//   },
//   {
//     id: 5,
//     image: require('./assets/FashionBeauty.png'),
//   },
//   {
//     id: 6,
//     image: require('./assets/Learning.png'),
//   },
//   {
//     id: 7,
//     image: require('./assets/Live.png'),
//   },
//   {
//     id: 8,
//     image: require('./assets/Sport.png'),
//   },
// ];

interface IState {}
class Explore extends Component<IProps, IState> {
  render() {
    const getState = this.props.globalState;
    return (
      <View
        style={[
          styles.exploreContainer,
          getState.themeMode
            ? {backgroundColor: '#000000cc'}
            : {backgroundColor: '#ffffff'},
        ]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginTop: hp('2')}}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.exploreImages}
                source={require('./assets/Trending.png')}
                resizeMode="stretch"
              />
              <Image
                style={styles.exploreImages}
                source={require('./assets/Music.png')}
                resizeMode="stretch"
              />
            </View>
            <View style={styles.imageContainer}>
              <Image
                style={styles.exploreImages}
                source={require('./assets/Gaming.png')}
                resizeMode="stretch"
              />
              <Image
                style={styles.exploreImages}
                source={require('./assets/News.png')}
                resizeMode="stretch"
              />
            </View>
            <View style={styles.imageContainer}>
              <Image
                style={styles.exploreImages}
                source={require('./assets/Films.png')}
                resizeMode="stretch"
              />
              <Image
                style={styles.exploreImages}
                source={require('./assets/FashionBeauty.png')}
                resizeMode="stretch"
              />
            </View>
            <View style={styles.imageContainer}>
              <Image
                style={styles.exploreImages}
                source={require('./assets/Learning.png')}
                resizeMode="stretch"
              />
              <Image
                style={styles.exploreImages}
                source={require('./assets/Live.png')}
                resizeMode="stretch"
              />
            </View>
            <View style={styles.imageContainer}>
              <Image
                style={styles.exploreImages}
                source={require('./assets/Sport.png')}
                resizeMode="stretch"
              />
            </View>
          </View>
          <Text
            style={[
              styles.trendingText,
              getState.themeMode ? {color: '#ffffff'} : {color: '#000000'},
            ]}>
            Trending videos
          </Text>
          {getState.videoList.map((item: any) => {
            return (
              <TouchableOpacity key={item.id} style={styles.videoContainer}>
                <ImageBackground
                  source={{uri: item.thumbnailUrl}}
                  resizeMode="stretch"
                  style={styles.videoBackImage}>
                  <View style={styles.durationContainer}>
                    <Text style={[styles.durationTimeText, {color: '#fff'}]}>
                      {item.duration}
                    </Text>
                  </View>
                </ImageBackground>
                <View style={styles.titleVideoContainer}>
                  <View style={styles.titleContainer}>
                    <Image
                      source={{uri: item.thumbnailUrl}}
                      resizeMode="stretch"
                      style={styles.thumbnailImage}
                    />
                    <View style={styles.titleTextContainer}>
                      <Text
                        style={[
                          styles.videoTittle,
                          getState.themeMode
                            ? {color: '#fff'}
                            : {color: '#030303'},
                        ]}>
                        {item.title}
                      </Text>
                      <Text
                        style={[
                          styles.viewsText,
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
          })}
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Explore);

const styles = StyleSheet.create({
  exploreContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  exploreImages: {
    height: hp('6'),
    width: wp('45'),
    marginBottom: hp('1.5'),
    // marginRight: wp('2'),
  },
  trendingText: {
    color: '#000000',
    width: wp('70'),
    fontSize: hp('3'),
    fontFamily: 'Inter',
    fontWeight: '800',
    marginBottom: hp('1'),
  },
  shortText: {
    color: '#000000',
    fontSize: hp('2.5'),
    fontFamily: 'Inter',
    fontWeight: '500',
    marginLeft: wp('2'),
  },
  videoListContainer: {
    marginTop: hp('1.5'),
  },
  videoContainer: {
    marginBottom: hp('3'),
  },
  videoBackImage: {
    height: hp('20'),
    width: wp('93'),
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: hp('1'),
    borderRadius: hp('2'),
  },
  durationContainer: {
    height: hp('3'),
    width: wp('12'),
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationTimeText: {
    color: '#000000',
    fontSize: hp('2.2'),
    fontFamily: 'Inter',
    fontWeight: '500',
    // marginLeft: wp('2'),
  },
  titleVideoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: hp('1.5'),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  thumbnailImage: {
    height: hp('6.5'),
    width: wp('11'),
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
});
