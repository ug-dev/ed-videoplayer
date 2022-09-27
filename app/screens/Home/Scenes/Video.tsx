import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, Image, Pressable, SafeAreaView, StatusBar, Text, View } from 'react-native';
import { ScreenContainer } from 'react-native-video-extension';
import { SIZES } from '@app/theme/fonts';
import { PlayButton, RKLogo, VideoPlayerBack, VideoPlayerLike } from '@app/assets';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import STYLES from '../Styles/Video.style';
import VideoPlayer from '../Components/VideoPlayer';
import { useAddLastWatchMutation, useGetMediaQuery } from '@app/services/redux/api/home';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { navigationRef } from '@app/navigators';
import { useAddFavouriteMutation } from '@app/services/redux/api/favourite';
import Loading from '@app/components/Loading';
import LottieView from 'lottie-react-native';
import Orientation, { LANDSCAPE, OrientationLocker, PORTRAIT } from 'react-native-orientation-locker';

interface VideoProps {
    setShowTabNavigator?: () => void;
    fullscreen: boolean | string;
    mediaId: any;
    subjectText: any;
}

const VideoScreen: React.FC<VideoProps> = (props) => {
    const { fullscreen, mediaId, subjectText } = props;

    const { data: videoData, isLoading } = useGetMediaQuery(mediaId);
    const [addFavourite, { data: isAddData, isLoading: isAddLoading }] = useAddFavouriteMutation();
    const VIDEO_URL = videoData?.data?.mediaUrl || 'https://stream.mux.com/Tyu80069gbkJR2uIYlz2xARq8VOl4dLg3.m3u8';
    const [isPlayer, setIsPlayer] = useState(false);
    const [progress, setProgress] = useState(null);
    const [addLastWatch, { data: isLastAddData, isLoading: isLastAddLoading }] = useAddLastWatchMutation();

    useEffect(() => {
        addLastWatch(mediaId);
    }, []);
    useEffect(() => {
        if (!isLoading && videoData) {
            console.log({ videoData });
            console.log(videoData?.data?.thumbnailUrl);
        }
    }, [videoData]);
    useEffect(() => {
        if (fullscreen) {
            // Orientation.lockToLandscape();
            SystemNavigationBar.navigationHide();
        } else {
            // Orientation.lockToPortrait();
            SystemNavigationBar.navigationShow();
        }
    }, [fullscreen]);

    const handleProgressChange = (pg) => {
        setProgress(pg);
    };

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            console.log({ progress });
            console.log('hoiiii');
            return false;
        });

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', () => {
                console.log({ progress });
                return false;
            });
        };
    }, [progress]);

    if (isLoading) {
        return <Loading />;
    }
    return (
        <>
            <StatusBar backgroundColor={'#FFF'} barStyle={'dark-content'} />
            <SafeAreaView style={STYLES.container}>
                {/* <OrientationLocker orientation={LANDSCAPE} /> */}
                <View style={STYLES.innerContainer}>
                    {!fullscreen && (
                        <View style={STYLES.topHeaderContainer}>
                            <Pressable
                                onPress={() => {
                                    console.log({ progress });

                                    navigationRef.goBack();
                                }}
                            >
                                <VideoPlayerBack height="40" width="40" />
                            </Pressable>
                            <Pressable
                                onPress={() => {
                                    addFavourite(mediaId);
                                }}
                            >
                                <VideoPlayerLike height="40" width="40" />
                            </Pressable>
                        </View>
                    )}
                    {isPlayer ? (
                        <View
                            style={[
                                !fullscreen
                                    ? { width: SIZES.width, height: SIZES.height * 0.3 }
                                    : STYLES.playerContainer,
                                STYLES.defaultPlayerContainer,
                            ]}
                        >
                            <VideoPlayer
                                fullscreen={fullscreen}
                                autoPlay={false}
                                handleProgressChange={handleProgressChange}
                                URL={VIDEO_URL}
                            />
                        </View>
                    ) : (
                        <View>
                            <Image
                                width={SIZES.width}
                                height={SIZES.height * 0.3}
                                style={{ width: SIZES.width, height: SIZES.height * 0.3 }}
                                source={
                                    videoData?.data?.thumbnailUrl
                                        ? {
                                              uri: videoData?.data?.thumbnailUrl,
                                          }
                                        : require('../../../assets/images/VideoPlayerBG.png')
                                }
                            />
                            <Pressable style={STYLES.playerButton} onPress={() => setIsPlayer(true)}>
                                <PlayButton height="80" width="80" />
                            </Pressable>
                        </View>
                    )}

                    {!fullscreen && (
                        <View style={STYLES.lowerTextContainer}>
                            <Text style={STYLES.primaryText}>{subjectText}</Text>
                            <Text style={STYLES.titleText}>{videoData?.data?.title}</Text>

                            <Text style={STYLES.descText}>{videoData?.data?.description}</Text>
                        </View>
                    )}
                </View>
            </SafeAreaView>
            {isAddLoading && (
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.9)',
                        position: 'absolute',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                    }}
                >
                    <LottieView
                        style={{ width: SIZES.width * 0.45 }}
                        source={require('../../../assets/loading.json')}
                        autoPlay
                        loop
                    />
                    <Text>Adding to favourite</Text>
                </View>
            )}
        </>
    );
};

const Video = (props) => {
    console.log('hi', { hi: props?.route });

    return (
        <ScreenContainer>
            {({ fullscreen }) => {
                return (
                    <VideoScreen
                        mediaId={props?.route?.params?.id}
                        subjectText={props?.route?.params?.subjectText}
                        fullscreen={fullscreen}
                    />
                );
            }}
        </ScreenContainer>
    );
};

export default Video;
