import React, { useEffect, useState } from 'react';
import { VLCPlayer, VlCPlayerView } from 'react-native-vlc-media-player';
import Orientation from 'react-native-orientation';
import { Dimensions, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import { FacebookPlayer, ScreenContainer, useVideoCtx, YoutubePlayer } from 'react-native-video-extension';
import { SIZES } from '@app/theme/fonts';
import { RKLogo, VideoPlayerBack, VideoPlayerLike } from '@app/assets';

interface VideoProps {}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Video: React.FC<VideoProps> = () => {
    const url = ['https://your-url.com/video.mp4'];
    const [isPlayer, setIsPlayer] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScreenContainer>
                {({ fullscreen }) => {
                    return (
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: '#FFF',
                            }}
                        >
                            {isPlayer ? (
                                <View
                                    style={{
                                        width: SIZES.width,
                                        height: SIZES.height * 0.25,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        // important, try removing flex: 1 and enter fullscreen
                                    }}
                                >
                                    <FacebookPlayer
                                        mode="auto-fit"
                                        source={{
                                            uri: 'https://stream.mux.com/Tyu80069gbkJR2uIYlz2xARq8VOl4dLg3.m3u8',
                                        }}
                                    />
                                </View>
                            ) : (
                                <View>
                                    <View
                                        style={{
                                            position: 'absolute',
                                            zIndex: 1,
                                            width: SIZES.width,
                                            paddingHorizontal: 18,
                                            paddingTop: 16,
                                            backgroundColor: 'transparent',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <VideoPlayerBack height="40" width="40" />
                                        <VideoPlayerLike height="40" width="40" />
                                    </View>
                                    <Image
                                        style={{ width: SIZES.width, height: SIZES.height * 0.3 }}
                                        source={require('../../../assets/images/VideoPlayerBG.png')}
                                    />
                                    <Pressable
                                        style={{
                                            position: 'absolute',
                                            left: SIZES.width * 0.5 - 40,
                                            top: SIZES.height * 0.15 - 40,
                                        }}
                                        onPress={() => setIsPlayer(true)}
                                    >
                                        <RKLogo height="80" width="80" />
                                    </Pressable>
                                </View>
                            )}

                            <View style={{ paddingVertical: 20, paddingHorizontal: 18 }}>
                                <Text style={{ color: '#B8C0C9', fontSize: 16 }}>Umang Gadhavana</Text>
                                <Text style={{ color: '#404B63', fontWeight: 'bold', fontSize: 24 }}>
                                    Socket Io Basics
                                </Text>
                                <Text style={{ color: '#B8C0C9', fontSize: 16 }}>Lenght: 1.5 hours</Text>
                                <Text style={{ color: '#404B63', fontSize: 16, marginTop: 18 }}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                                    unknown printer took a galley of type and scrambled it to make a type specimen book.
                                </Text>
                            </View>
                        </View>
                    );
                }}
            </ScreenContainer>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: screenHeight - 70,
    },
    video: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});
export default Video;
