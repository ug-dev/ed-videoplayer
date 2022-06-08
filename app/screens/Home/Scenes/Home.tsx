import { JsCrash } from '@app/assets';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, Text, TouchableHighlight, View } from 'react-native';
import SearchBar from '../Components/SearchBar';
import HomeCardView from '../Components/HomeCardView';
import STYLES from '../Styles/Home.style';
import AuthHeader from '@app/screens/Auth/Components/AuthHeader';
import { navigate } from '@app/navigators';
import PrimaryButton from '@app/screens/Auth/Components/PrimaryButton';
import { useGetBannersQuery } from '@app/services/redux/api/home';
import { SIZES } from '@app/theme/fonts';
import { FacebookPlayer } from 'react-native-video-extension';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { data, isLoading, isError, error } = useGetBannersQuery();

    useEffect(() => {
        console.log({ data });
        console.log(data?.data[0]?.media?.thumbnailUrl);
    }, [data]);

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
                        <View style={STYLES.bannerCardView}>
                            <FacebookPlayer
                                disableFocus={true}
                                initialPaused
                                // fullscreenOrientation={''}
                                // style={{ borderRadius: 16 }}
                                // onTimedMetadata={(e) => console.log(e)}
                                // onEnd={(e) => {
                                //     console.log(e);
                                // }}
                                // mode="auto-fit"
                                source={{
                                    uri: 'https://stream.mux.com/Tyu80069gbkJR2uIYlz2xARq8VOl4dLg3.m3u8',
                                }}
                                // onProgress={handleProgress}
                                onLoad={(meta) => {
                                    // setDuration(meta.duration);
                                    // console.log({ meta });
                                }}
                            />
                            {/* <Image
                            style={{ borderRadius: 12 }}
                            width={SIZES.width - 32}
                            height={SIZES.height * 0.24}
                            source={{ uri: data && data?.data[0]?.media?.thumbnailUrl }}
                        /> */}
                            {/* <Text style={STYLES.bannerInnerText}>Java Crash Course</Text> */}
                        </View>
                        <View style={STYLES.bannerCardView}>
                            <Image
                                style={{ borderRadius: 12 }}
                                width={SIZES.width - 32}
                                height={SIZES.height * 0.24}
                                source={{ uri: data && data?.data[0]?.media?.thumbnailUrl }}
                            />
                            {/* <Text style={STYLES.bannerInnerText}>Java Crash Course</Text> */}
                        </View>
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
                        <Pressable onPress={() => navigate('PlayerNav', { screen: 'ContinueLearn' })}>
                            <Text style={STYLES.viewAllContainer}>View All</Text>
                        </Pressable>
                    </View>

                    <ScrollView horizontal>
                        <HomeCardView />
                        <HomeCardView />
                        <HomeCardView />
                        <HomeCardView />
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
