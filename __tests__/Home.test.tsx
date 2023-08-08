import Home from '../src/component/Home';
import React, {Component} from 'react';
import 'react-native';

import {render, fireEvent, screen} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import Store from '../src/component/Store';
import {createStore} from 'redux';
import {getTabBarHeight} from '@react-navigation/bottom-tabs/lib/typescript/src/views/BottomTabBar';

jest.mock('react-native-responsive-screen', () => ({
  widthPercentageToDP: jest.fn(),
  heightPercentageToDP: jest.fn(),
}));

jest.mock('react-native-vector-icons/Entypo', () => 'Entypo');
jest.mock('@react-navigation/native', () => {
  const actualNavigation = jest.requireActual('@react-navigation/native');
  const {View: MockView} = require('react-native');
  return {
    ...actualNavigation,
    NavigationContainer: () => <MockView />,
  };
});
const mockFn = jest.fn();
const homeScreenProps = {
  navigation: {
    push: mockFn,
  },
  globalState: {themeMode: false},
  clickVideo: jest.fn(),
};

const HomeStore1 = createStore(() => {
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
    activeVideo: [],
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

const HomeStore2 = createStore(() => {
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
    activeVideo: [],
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

describe('Home Screen Youtube', () => {
  it('Check the Home Screen Background', () => {
    const {getByTestId} = render(
      <Provider store={HomeStore1}>
        <Home {...homeScreenProps} />
      </Provider>,
    );
    const homeContainer = getByTestId('homeScreen');
    expect(homeContainer.props.style[1].backgroundColor).toBe('#ffffff');
  });
  it('Check the Home Screen Background', () => {
    const {getByTestId} = render(
      <Provider store={HomeStore2}>
        <Home {...homeScreenProps} />
      </Provider>,
    );
    const homeContainer = getByTestId('homeScreen');
    expect(homeContainer.props.style[1].backgroundColor).toBe('#000000cc');
  });

  it('Shorts Button Static', () => {
    const {getByTestId} = render(
      <Provider store={Store}>
        <Home {...homeScreenProps} />
      </Provider>,
    );
    const content = getByTestId('ShortId');
    const checkColor = homeScreenProps.globalState.themeMode ? '#fff' : '#000';
    expect(content.props.style[1].color).toBe(checkColor);
    expect(content.props.children).toBe('Shorts');
  });

  it('Press Video Button', async () => {
    const {getByTestId} = render(
      <Provider store={Store}>
        <Home {...homeScreenProps} />
      </Provider>,
    );
    const content1 = getByTestId('video1');
    await fireEvent.press(content1);
    expect(homeScreenProps.navigation.push).toHaveBeenCalledWith(
      'VideoPlayers',
    );
  });

  it('displays the correct number of items in FlatList', () => {
    const buttonList = [
      {id: 1, text: 'Item 1'},
      {id: 2, text: 'Item 2'},
      {id: 3, text: 'Item 3'},
    ];

    const {getAllByTestId} = render(
      <Provider store={Store}>
        <Home />
      </Provider>,
    );

    const renderedItems = getAllByTestId(/category\d+/);
    expect(renderedItems).toHaveLength(buttonList.length);
  });

  it('clicking on a button triggers onClickTopButton function', () => {
    const onClickTopButton = jest.fn();

    const {getByTestId} = render(
      <Provider store={Store}>
        <Home />
      </Provider>,
    );

    const buttonToClick = getByTestId('category2');
    expect(buttonToClick.props.style.backgroundColor).toBe('#DADADA5a');
    fireEvent.press(buttonToClick);
    expect(buttonToClick.props.style.backgroundColor).toBe('#000');

    expect(onClickTopButton).toBeCalled;
  });

  it('Shorts Button Static', () => {
    const {getByTestId} = render(
      <Provider store={Store}>
        <Home />
      </Provider>,
    );
    const content = getByTestId('buttonText1');
    expect(content.props.children).toBe('All');
  });

  it('clicking on a button triggers Video function', () => {
    const onClickVideo = jest.fn();

    const {getByTestId} = render(
      <Provider store={Store}>
        <Home />
      </Provider>,
    );
    const clickVideo = getByTestId('video1');
    fireEvent.press(clickVideo);
    expect(onClickVideo).toHaveBeenCalled;
  });
});
