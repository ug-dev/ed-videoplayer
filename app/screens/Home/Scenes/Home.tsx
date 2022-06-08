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
                    <View style={STYLES.bannerCardView}>
                        {/* <FacebookPlayer
                            style={{ borderRadius: 16, overflow: 'hidden' }}
                            // onTimedMetadata={(e) => console.log(e)}
                            // onEnd={(e) => {
                            //     console.log(e);
                            // }}
                            mode="auto-fit"
                            source={{
                                uri: 'https://rk-space.sgp1.digitaloceanspaces.com/video/062%20Handling%20Different%20Routes.mp4?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=B266WWKKK3KB2QKG6VDJ%2F20220526%2Fsgp1%2Fs3%2Faws4_request&X-Amz-Date=20220526T191908Z&X-Amz-SignedHeaders=host&X-Amz-Expires=600&X-Amz-Signature=c0c89f7dccb7508d5225e90ccfc01fc8aac4084a5efa5220a80e4a35dba74067',
                            }}
                            // onProgress={handleProgress}
                            onLoad={(meta) => {
                                // setDuration(meta.duration);
                                // console.log({ meta });
                            }}
                        /> */}
                        <Image
                            style={{ borderRadius: 12 }}
                            width={SIZES.width - 32}
                            height={SIZES.height * 0.24}
                            source={{ uri: data && data?.data[0]?.media?.thumbnailUrl }}
                        />
                        {/* <Text style={STYLES.bannerInnerText}>Java Crash Course</Text> */}
                    </View>
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
