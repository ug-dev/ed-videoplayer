import { JsCrash, PlayButton } from '@app/assets';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, Text, TouchableHighlight, View } from 'react-native';
import SearchBar from '../Components/SearchBar';
import HomeCardView from '../Components/HomeCardView';
import STYLES from '../Styles/Home.style';
import AuthHeader from '@app/screens/Auth/Components/AuthHeader';
import { navigate } from '@app/navigators';
import PrimaryButton from '@app/screens/Auth/Components/PrimaryButton';
import { useGetBannersQuery, useGetLastWatchQuery } from '@app/services/redux/api/home';
import { SIZES } from '@app/theme/fonts';
import { FacebookPlayer, FullscreenHidden, YoutubePlayer } from 'react-native-video-extension';
import { ScreenContainer } from 'react-native-screens';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HomeProps {}
const VideoBannerComponent = ({ url, thumbnailUrl, mediaId, data }) => {
    const [isVideo, setisVideo] = useState(false);
    return (
        <View style={STYLES.bannerCardView}>
            {isVideo ? (
                <FacebookPlayer
                    // onVideoSeek={(e) => console.log(e)}
                    // disableFocus={true}
                    // initialPaused
                    // fullscreenOrientation={''}
                    // style={{ borderRadius: 16 }}
                    onTimedMetadata={(e) => console.log(e)}
                    // onEnd={(e) => {
                    //     console.log(e);
                    // }}

                    // style={{ width: SIZES.width - 32 }}
                    mode="contain"
                    fullscreenAutorotate={false}
                    fullscreen={false}
                    fullscreenOrientation="landscape"
                    source={{
                        uri: url,
                    }}
                    // onProgress={handleProgress}
                    onLoad={(meta) => {
                        // setDuration(meta.duration);
                        console.log({ meta });
                    }}
                />
            ) : (
                <View>
                    <Image
                        style={{ borderRadius: 12 }}
                        width={SIZES.width - 32}
                        height={SIZES.height * 0.24}
                        source={
                            thumbnailUrl
                                ? {
                                      uri: thumbnailUrl,
                                  }
                                : require('../../../assets/images/VideoPlayerBG.png')
                        }
                    />
                    <Pressable
                        style={STYLES.playerButton}
                        onPress={() => navigate('PlayerNav', { params: { data }, screen: 'TrialVideo' })}
                    >
                        <PlayButton height="80" width="80" />
                    </Pressable>
                </View>
            )}
        </View>
    );
};
const Home: React.FC<HomeProps> = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { data, isLoading, isError, error } = useGetBannersQuery();
    const { data: lastWatch, isLoading: isLastWatchLoading } = useGetLastWatchQuery();

    useEffect(() => {
        console.log(lastWatch?.data);
        // console.log(data?.data[0]?.media);
    }, [lastWatch]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <ScrollView style={STYLES.scrollContainer}>
                <View style={STYLES.container}>
                    <AuthHeader />
                    <SearchBar value={searchQuery} onChangeText={(value: string) => setSearchQuery(value)} />
                    <ScrollView
                        pagingEnabled
                        snapToAlignment="center"
                        bounces={false}
                        overScrollMode="never"
                        scrollToOverflowEnabled={false}
                        horizontal
                    >
                        {data?.data.map((data, index) => {
                            return data?.media.mediaType === 'video' ? (
                                <VideoBannerComponent
                                    key={index}
                                    data={data}
                                    thumbnailUrl={data && data?.media?.thumbnailUrl}
                                    url={data && data?.media?.mediaUrl}
                                    mediaId={data && data?.mediaId}
                                />
                            ) : (
                                <View style={STYLES.bannerCardView}>
                                    <Image
                                        style={{ borderRadius: 12 }}
                                        width={SIZES.width - 32}
                                        height={SIZES.height * 0.24}
                                        source={{ uri: data && data?.media?.thumbnailUrl }}
                                    />
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>

                <View style={{ paddingHorizontal: 12 }}>
                    <PrimaryButton
                        InputText={'Subscribe Now'}
                        isLoading={false}
                        OnPress={() => {
                            navigate('AuthStack', { screen: 'Subscription' });
                        }}
                    >
                        Subscribe Now
                    </PrimaryButton>
                </View>

                <View style={STYLES.bottomSection}>
                    <View style={STYLES.textContainer}>
                        <Text style={STYLES.firstText}>Last watched</Text>
                        {/* <Pressable onPress={() => navigate('PlayerNav', { screen: 'ContinueLearn' })}>
                            <Text style={STYLES.viewAllContainer}>View All</Text>
                        </Pressable> */}
                    </View>

                    <ScrollView horizontal>
                        {lastWatch?.data?.map((lw) => (
                            <HomeCardView data={lw} key={lw.id} url={lw?.media.thumbnailUrl} title={lw?.media.title} />
                        ))}
                        {/* <HomeCardView />
                        <HomeCardView />
                        <HomeCardView />
                        <HomeCardView /> */}
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
