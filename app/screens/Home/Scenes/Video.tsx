import React, { useEffect, useState } from 'react';
import { Image, Pressable, SafeAreaView, Text, View } from 'react-native';
import { ScreenContainer } from 'react-native-video-extension';
import { SIZES } from '@app/theme/fonts';
import { RKLogo, VideoPlayerBack, VideoPlayerLike } from '@app/assets';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import STYLES from '../Styles/Video.style';
import VideoPlayer from '../Components/VideoPlayer';

interface VideoProps {
    setShowTabNavigator?: () => void;
    fullscreen: boolean | string;
}

const VideoScreen: React.FC<VideoProps> = (props) => {
    const { fullscreen } = props;

    const VIDEO_URL = 'https://stream.mux.com/Tyu80069gbkJR2uIYlz2xARq8VOl4dLg3.m3u8';
    const [isPlayer, setIsPlayer] = useState(false);

    useEffect(() => {
        if (fullscreen) {
            SystemNavigationBar.navigationHide();
        } else {
            SystemNavigationBar.navigationShow();
        }
    }, [fullscreen]);

    return (
        <SafeAreaView style={STYLES.container}>
            <View style={STYLES.innerContainer}>
                {isPlayer ? (
                    <View
                        style={[
                            !fullscreen ? { width: SIZES.width, height: SIZES.height * 0.25 } : STYLES.playerContainer,
                            STYLES.defaultPlayerContainer,
                        ]}
                    >
                        <VideoPlayer URL={VIDEO_URL} />
                    </View>
                ) : (
                    <View>
                        <View style={STYLES.topHeaderContainer}>
                            <VideoPlayerBack height="40" width="40" />
                            <VideoPlayerLike height="40" width="40" />
                        </View>
                        <Image
                            style={{ width: SIZES.width, height: SIZES.height * 0.3 }}
                            source={require('../../../assets/images/VideoPlayerBG.png')}
                        />
                        <Pressable style={STYLES.playerButton} onPress={() => setIsPlayer(true)}>
                            <RKLogo height="80" width="80" />
                        </Pressable>
                    </View>
                )}

                {!fullscreen && (
                    <View style={STYLES.lowerTextContainer}>
                        <Text style={STYLES.primaryText}>Umang Gadhavana</Text>
                        <Text style={STYLES.titleText}>Socket Io Basics</Text>
                        <Text style={STYLES.primaryText}>Lenght: 1.5 hours</Text>
                        <Text style={STYLES.descText}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                            galley of type and scrambled it to make a type specimen book.
                        </Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

const Video = () => {
    return (
        <ScreenContainer>
            {({ fullscreen }) => {
                return <VideoScreen fullscreen={fullscreen} />;
            }}
        </ScreenContainer>
    );
};

export default Video;
