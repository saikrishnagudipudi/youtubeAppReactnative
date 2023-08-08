import {fireEvent, render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import VideoPlayers from '../src/component/VideoPlayers';
import {act} from 'react-test-renderer';
import React from 'react';
import {View as MockView} from 'react-native';

jest.mock('react-native-video', () => (props: any) => <></>);
jest.mock('react-native-responsive-screen', () => ({
  widthPercentageToDP: jest.fn(),
  heightPercentageToDP: jest.fn(),
}));
jest.mock('react-native-vector-icons/FontAwesome', () => 'FontAwesome');
jest.mock('react-native-vector-icons/AntDesign', () => 'AntDesign');
jest.mock('react-native-vector-icons/Entypo', () => 'Entypo');
jest.mock('react-native-vector-icons/MaterialIcons', () => 'MaterialIcons');
jest.mock('@react-native-community/slider', () => (props: Object) => {
  return <MockView testID="slider" {...props} />;
});

jest.spyOn(React, "createRef").mockImplementation((() => ({
  seek: jest.fn()
})) as any)

const VideoPlayerProps = {
  globalState: {themeMode: false},
  navigation: {goBack: jest.fn(), push: jest.fn()},
  clickVideo: jest.fn(),
  getHistoryVideo: jest.fn(),
};
const VideoPlayerStore1 = createStore(() => {
  const initialState: any = {
    themeMode: false,
    videoList: [
      {
        id: '1',
        title: 'Big Buck Bunny',
        thumbnailUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/1200px-Big_Buck_Bunny_thumbnail_vlc.png',
        duration: '9:56',
        uploadTime: '4 Years ago',
        views: '24M',
        author: 'Vlc Media Player',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        description:
          "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
        subscriber: '25M',
        isLive: true,
      },
      {
        id: '2',
        title: 'The first Blender Open Movie from 2006',
        thumbnailUrl:
          'https://res.cloudinary.com/duujfpr1f/image/upload/v1690615059/Screenshot_from_2023-07-29_12-34-55_qko0yg.png',
        duration: '10:53',
        uploadTime: '3.6 Years ago',
        views: '20M',
        author: 'Blender Inc.',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        description:
          'Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series',
        subscriber: '20M',
        isLive: true,
      },
      {
        id: '3',
        title: 'For Bigger Blazes',
        thumbnailUrl:
          'https://res.cloudinary.com/duujfpr1f/image/upload/v1690615187/Screenshot_from_2023-07-29_12-49-36_myqhjg.png',
        duration: '0:15',
        uploadTime: '4 Years ago',
        views: '25M',
        author: 'T-Series Regional',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        description:
          'Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series',
        subscriber: '22M',
        isLive: true,
      },
      {
        id: '4',
        title: 'For Bigger Escape',
        thumbnailUrl:
          'https://img.jakpost.net/c/2019/09/03/2019_09_03_78912_1567484272._large.jpg',
        duration: '0:15',
        uploadTime: '5 Years ago',
        views: '27M',
        author: 'T-Series Regional',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        description:
          " Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
        subscriber: '28M',
        isLive: false,
      },
      {
        id: '5',
        title: 'Big Buck Bunny',
        thumbnailUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/1200px-Big_Buck_Bunny_thumbnail_vlc.png',
        duration: '9:56',
        uploadTime: '4 Years ago',
        views: '24M',
        author: 'Vlc Media Player',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        description:
          "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
        subscriber: '25M',
        isLive: true,
      },
      {
        id: '6',
        title: 'For Bigger Blazes',
        thumbnailUrl:
          'https://res.cloudinary.com/duujfpr1f/image/upload/v1690615187/Screenshot_from_2023-07-29_12-49-36_myqhjg.png',
        duration: '0:15',
        uploadTime: '3 Years ago',
        views: '28M',
        author: 'T-Series Regional',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        description:
          'Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series',
        subscriber: '24M',
        isLive: false,
      },
      {
        id: '7',
        title: 'For Bigger Escape',
        thumbnailUrl:
          'https://img.jakpost.net/c/2019/09/03/2019_09_03_78912_1567484272._large.jpg',
        duration: '0:15',
        uploadTime: '3.6 Years ago',
        views: '21M',
        author: 'T-Series Regional',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        description:
          " Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
        subscriber: '26M',
        isLive: true,
      },
      {
        id: '8',
        title: 'The first Blender Open Movie from 2006',
        thumbnailUrl:
          'https://res.cloudinary.com/duujfpr1f/image/upload/v1690615059/Screenshot_from_2023-07-29_12-34-55_qko0yg.png',
        duration: '10:53',
        uploadTime: '4 Years ago',
        views: '24M',
        author: 'Blender Inc.',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        description:
          'Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series',
        subscriber: '25M',
        isLive: false,
      },
    ],
    activeVideo: [
      {
        id: '1',
        title: 'Big Buck Bunny',
        thumbnailUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/1200px-Big_Buck_Bunny_thumbnail_vlc.png',
        duration: '0:00',
        uploadTime: '4 Years ago',
        views: '24M',
        author: 'Vlc Media Player',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        description:
          "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
        subscriber: '25M',
        isLive: true,
      },
    ],
    historyList: [],
  };
  return initialState;
});

const VideoPlayerStore2 = createStore(() => {
  const initialState: any = {
    themeMode: true,
    videoList: [
      {
        id: '1',
        title: 'Big Buck Bunny',
        thumbnailUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/1200px-Big_Buck_Bunny_thumbnail_vlc.png',
        duration: '9:56',
        uploadTime: '4 Years ago',
        views: '24M',
        author: 'Vlc Media Player',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        description:
          "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
        subscriber: '25M',
        isLive: true,
      },
      {
        id: '2',
        title: 'The first Blender Open Movie from 2006',
        thumbnailUrl:
          'https://res.cloudinary.com/duujfpr1f/image/upload/v1690615059/Screenshot_from_2023-07-29_12-34-55_qko0yg.png',
        duration: '10:53',
        uploadTime: '3.6 Years ago',
        views: '20M',
        author: 'Blender Inc.',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        description:
          'Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series',
        subscriber: '20M',
        isLive: true,
      },
      {
        id: '3',
        title: 'For Bigger Blazes',
        thumbnailUrl:
          'https://res.cloudinary.com/duujfpr1f/image/upload/v1690615187/Screenshot_from_2023-07-29_12-49-36_myqhjg.png',
        duration: '0:15',
        uploadTime: '4 Years ago',
        views: '25M',
        author: 'T-Series Regional',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        description:
          'Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series',
        subscriber: '22M',
        isLive: true,
      },
      {
        id: '4',
        title: 'For Bigger Escape',
        thumbnailUrl:
          'https://img.jakpost.net/c/2019/09/03/2019_09_03_78912_1567484272._large.jpg',
        duration: '0:15',
        uploadTime: '5 Years ago',
        views: '27M',
        author: 'T-Series Regional',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        description:
          " Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
        subscriber: '28M',
        isLive: false,
      },
      {
        id: '5',
        title: 'Big Buck Bunny',
        thumbnailUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/1200px-Big_Buck_Bunny_thumbnail_vlc.png',
        duration: '9:56',
        uploadTime: '4 Years ago',
        views: '24M',
        author: 'Vlc Media Player',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        description:
          "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
        subscriber: '25M',
        isLive: true,
      },
      {
        id: '6',
        title: 'For Bigger Blazes',
        thumbnailUrl:
          'https://res.cloudinary.com/duujfpr1f/image/upload/v1690615187/Screenshot_from_2023-07-29_12-49-36_myqhjg.png',
        duration: '0:15',
        uploadTime: '3 Years ago',
        views: '28M',
        author: 'T-Series Regional',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        description:
          'Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series',
        subscriber: '24M',
        isLive: false,
      },
      {
        id: '7',
        title: 'For Bigger Escape',
        thumbnailUrl:
          'https://img.jakpost.net/c/2019/09/03/2019_09_03_78912_1567484272._large.jpg',
        duration: '0:15',
        uploadTime: '3.6 Years ago',
        views: '21M',
        author: 'T-Series Regional',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        description:
          " Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
        subscriber: '26M',
        isLive: true,
      },
      {
        id: '8',
        title: 'The first Blender Open Movie from 2006',
        thumbnailUrl:
          'https://res.cloudinary.com/duujfpr1f/image/upload/v1690615059/Screenshot_from_2023-07-29_12-34-55_qko0yg.png',
        duration: '10:53',
        uploadTime: '4 Years ago',
        views: '24M',
        author: 'Blender Inc.',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        description:
          'Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series',
        subscriber: '25M',
        isLive: false,
      },
    ],
    activeVideo: [
      {
        id: '1',
        title: 'Big Buck Bunny',
        thumbnailUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/1200px-Big_Buck_Bunny_thumbnail_vlc.png',
        duration: '9:56',
        uploadTime: '4 Years ago',
        views: '24M',
        author: 'Vlc Media Player',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        description:
          "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
        subscriber: '25M',
        isLive: true,
        videoDuration: 596,
        seeks: 102,
      },
    ],
    historyList: [
      {
        id: '1',
        title: 'Big Buck Bunny',
        thumbnailUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/1200px-Big_Buck_Bunny_thumbnail_vlc.png',
        duration: '9:56',
        uploadTime: '4 Years ago',
        views: '24M',
        author: 'Vlc Media Player',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        description:
          "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
        subscriber: '25M',
        isLive: true,
        videoDuration: 596,
        seeks: 102,
      },
    ],
  };
  return {
    ...initialState,
  };
});

// const videoPlayerLocalState1 = {
//   videoPlayPause: false,
//   videoDuration: 256,
//   videoDurationValue: 12,
//   videoDurationSeconds: 0,
//   videoDurationMinutes: 0,
//   moreText: false,
//   controlVisible: true,
//   volumeValue: 1,
//   visibleVolumeSlider: false,
//   previousVideoId: '0',
//   previousVideoIconDisable: false,
//   currentVideoList: [],
// };

beforeEach(() => {
  globalThis.setInterval = jest.fn().mockImplementation(((
    callback: Function,
  ) => {
    callback && callback();
  }) as any) as any;
  globalThis.setTimeout = jest.fn().mockImplementation(((
    callback: Function,
  ) => {
    callback && callback();
  }) as any) as any;
});

describe('VideoPlayer Screen test Cases', () => {
  it('Screen visibility Time', () => {
    render(
      <Provider store={VideoPlayerStore1}>
        <VideoPlayers />
      </Provider>,
    );
    expect(setTimeout).toHaveBeenCalled;
    expect(setInterval).toHaveBeenCalled;
  });
  it('Screen visibility Time', () => {
    render(
      <Provider store={VideoPlayerStore2}>
        <VideoPlayers />
      </Provider>,
    );

    jest.useFakeTimers();
    jest.spyOn(global, 'setInterval');
    act(() => {
      jest.advanceTimersByTime(60000);
    });
  });

  it('Video Player', () => {
    const {getByTestId} = render(
      <Provider store={VideoPlayerStore1}>
        <VideoPlayers {...VideoPlayerProps} />
      </Provider>,
    );
    const PlaySeek = jest.fn();
    expect(PlaySeek).toBeCalled;
    const VideoTimeControls = jest.fn();
    const videoButtonElement = getByTestId('VideoPlayer');
    // console.log(videoButtonElement.props);
    act(() => {
      fireEvent.press(videoButtonElement);
      videoButtonElement.props.children[0].ref();
      expect(VideoTimeControls).toHaveBeenCalled;
    });
  });
  it('VideoPlayer Screen Light Background Color', () => {
    const {getByTestId} = render(
      <Provider store={VideoPlayerStore1}>
        <VideoPlayers />
      </Provider>,
    );

    const getVideoScreenBackground = getByTestId('VideoScreen');
    expect(getVideoScreenBackground.props.style[1].backgroundColor).toBe(
      '#ffffff',
    );
  });
  it('VideoPlayer Screen Dark Background Color', () => {
    const {getByTestId} = render(
      <Provider store={VideoPlayerStore2}>
        <VideoPlayers />
      </Provider>,
    );

    const getVideoScreenBackground = getByTestId('VideoScreen');
    expect(getVideoScreenBackground.props.style[1].backgroundColor).toBe(
      '#000000cc',
    );
  });

  test('Down Icon click to call the goBack function', () => {
    const {getByTestId} = render(
      <Provider store={VideoPlayerStore2}>
        <VideoPlayers {...VideoPlayerProps} />
      </Provider>,
    );
    const goBackFunction = jest.fn();
    const downIconElement = getByTestId('DownIconId');
    act(() => {
      fireEvent.press(downIconElement);
      expect(goBackFunction).toHaveBeenCalled;
      expect(VideoPlayerProps.navigation.goBack).toHaveBeenCalled;
    });
  });

  it('VideoPlayControl video will paly and pause function', () => {
    const {getByTestId} = render(
      <Provider store={VideoPlayerStore2}>
        <VideoPlayers {...VideoPlayerProps} />
      </Provider>,
    );
    const VideoFunction = jest.fn();
    const videoPlayControl = getByTestId('VideoPlayControl');
    act(() => {
      fireEvent.press(videoPlayControl);
      expect(VideoFunction).toHaveBeenCalled;
      expect(VideoPlayerProps.navigation.goBack).toHaveBeenCalled;
    });
  });
  it('Display Duration time less than 10', async () => {
    const visibleVolumeSlider = true;
    const {getByTestId} = render(
      <Provider store={VideoPlayerStore2}>
        <VideoPlayers {...VideoPlayerProps} />
      </Provider>,
    );

    const videoTime = getByTestId('videoDurationTimeText');
    expect(videoTime.props.children.toString()).toBe('1:42/,9:56');
  });

  it('Display Text More', async () => {
    const moreText = false;
    const checkMore = jest.fn();
    const {getByTestId} = render(
      <Provider store={VideoPlayerStore2}>
        <VideoPlayers {...VideoPlayerProps} />
      </Provider>,
    );
    const checkHideText = getByTestId('TextHide');
    act(() => {
      fireEvent.press(checkHideText);
      expect(checkMore).toHaveBeenCalled;
      expect(checkHideText.props.children).toBe('More');
    });
  });

  it('Display Video Volume show Slider', () => {
    const {getByTestId} = render(
      <Provider store={VideoPlayerStore1}>
        <VideoPlayers {...VideoPlayerProps} />
      </Provider>,
    );
    const volumeIcon = getByTestId('volumeIcon');
    act(() => {
      fireEvent.press(volumeIcon);
    });
    const VolumeSlider = getByTestId('VolumeSlider');
    act(() => {
      VolumeSlider.props.children.props.onValueChange(0.5);
    });
  });

  it('Display Video FlatList', () => {
    const {getByTestId} = render(
      <Provider store={VideoPlayerStore1}>
        <VideoPlayers {...VideoPlayerProps} />
      </Provider>,
    );
    const flatListSmallVideo = getByTestId('videoSmall1');
    act(() => {
      fireEvent.press(flatListSmallVideo);
    });
    expect(VideoPlayerProps.getHistoryVideo).toHaveBeenCalled;
  });
  it('Display VideoSlider', () => {
    const {getByTestId} = render(
      <Provider store={VideoPlayerStore1}>
        <VideoPlayers {...VideoPlayerProps} />
      </Provider>,
    );
    const videoSliderTime = getByTestId('VideoSlider');
    act(() => {
      videoSliderTime.props.children.props.onValueChange(0.5);
    });
  });
  it('Play back videoDuration above 10 seconds Video', () => {
    const play10SecondsBackVideo = jest.fn();
    const {getByTestId} = render(
      <Provider store={VideoPlayerStore2}>
        <VideoPlayers {...VideoPlayerProps} />
      </Provider>,
    );
    const play10Back = getByTestId('back10SecondPlay');
    // console.log(playPrevious.props.children)
    fireEvent.press(play10Back);
    console.log(VideoPlayerProps.getHistoryVideo);
    expect(play10SecondsBackVideo).toBeCalled;
    act(() => {
      expect(VideoPlayerProps.getHistoryVideo).toBeCalled;
    });
    act(() => {
      expect(VideoPlayerProps.clickVideo).toBeCalled;
    });
  });
  it('Play back videoDuration below 10 seconds Video', () => {
    const play10SecondsBackVideo = jest.fn();
    const {getByTestId} = render(
      <Provider store={VideoPlayerStore1}>
        <VideoPlayers {...VideoPlayerProps} />
      </Provider>,
    );
    const play10Back = getByTestId('back10SecondPlay');
    // console.log(playPrevious.props.children)
    fireEvent.press(play10Back);
    console.log(VideoPlayerProps.getHistoryVideo);
    expect(play10SecondsBackVideo).toBeCalled;
    act(() => {
      expect(VideoPlayerProps.getHistoryVideo).toBeCalled;
    });
    act(() => {
      expect(VideoPlayerProps.clickVideo).toBeCalled;
    });
  });
  it('Play forward above 10 seconds Video', () => {
    const play10SecondsForwardVideo = jest.fn();
    const {getByTestId} = render(
      <Provider store={VideoPlayerStore1}>
        <VideoPlayers {...VideoPlayerProps} />
      </Provider>,
    );
    const play10Forward = getByTestId('forward10Seconds');
    // console.log(playPrevious.props.children)
    fireEvent.press(play10Forward);
    console.log(VideoPlayerProps.getHistoryVideo);
    expect(play10SecondsForwardVideo).toBeCalled;
    act(() => {
      expect(VideoPlayerProps.getHistoryVideo).toBeCalled;
    });
    act(() => {
      expect(VideoPlayerProps.clickVideo).toBeCalled;
    });
  });
  it('Play forward above 10 seconds Video', () => {
    const play10SecondsForwardVideo = jest.fn();
    const {getByTestId} = render(
      <Provider store={VideoPlayerStore2}>
        <VideoPlayers {...VideoPlayerProps} />
      </Provider>,
    );
    const play10Forward = getByTestId('forward10Seconds');
    // console.log(playPrevious.props.children)
    fireEvent.press(play10Forward);
    console.log(VideoPlayerProps.getHistoryVideo);
    expect(play10SecondsForwardVideo).toBeCalled;
    act(() => {
      expect(VideoPlayerProps.getHistoryVideo).toBeCalled;
    });
    act(() => {
      expect(VideoPlayerProps.clickVideo).toBeCalled;
    });
  });
  it('Play Forward Video', () => {
    const playForwardVideo = jest.fn();
    const {getByTestId} = render(
      <Provider store={VideoPlayerStore1}>
        <VideoPlayers {...VideoPlayerProps} />
      </Provider>,
    );
    const playNextVideo = getByTestId('forwardToNextPlay');
    // console.log(playPrevious.props.children)
    fireEvent.press(playNextVideo);
    // console.log(VideoPlayerProps.getHistoryVideo);
    expect(playForwardVideo).toBeCalled;
    expect(VideoPlayerProps.getHistoryVideo).toBeCalled;
  });
  it('Play Previous Video', () => {
    const previousVideoIconDisable = false;
    const playPreviousVideo = jest.fn();
    const {getByTestId} = render(
      <Provider store={VideoPlayerStore2}>
        <VideoPlayers {...VideoPlayerProps} />
      </Provider>,
    );
    const playNextVideo = getByTestId('forwardToNextPlay');
    // console.log(playPrevious.props.children)
    act(() => {
      fireEvent.press(playNextVideo);
    });
    const playPrevious = getByTestId('playPrevious');
    // console.log(playPrevious.props.children)
    fireEvent.press(playPrevious);
    // console.log(VideoPlayerProps.getHistoryVideo);
    expect(playPreviousVideo).toBeCalled;
    expect(VideoPlayerProps.getHistoryVideo).toBeCalled;
  });
});
