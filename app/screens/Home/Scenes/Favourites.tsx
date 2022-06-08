import { VideoPlayerLike } from '@app/assets';
import Loading from '@app/components/Loading';
import { navigate } from '@app/navigators';
import AuthHeader from '@app/screens/Auth/Components/AuthHeader';
import PrimaryButton from '@app/screens/Auth/Components/PrimaryButton';
import { useGetFavouritesQuery } from '@app/services/redux/api/favourite';
import { FONTS } from '@app/theme';
import { SIZES } from '@app/theme/fonts';
import AnimatedLottieView from 'lottie-react-native';
import React, { useEffect } from 'react';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import styles from '../Styles/Favourite.style';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FavouritesProps {}

const ImportantCard = ({ title }) => {
    return (
        <View style={styles.importantContainer}>
            <VideoPlayerLike height="38" width="38" style={styles.importantLikeIcon} />
            <Image style={styles.importantBg} source={require('../../../assets/images/ImportantCardBg.png')} />
            <View style={styles.importantText}>
                <Text style={styles.name}>John Doe</Text>
                <Text style={styles.courseName}>{title}</Text>
            </View>
        </View>
    );
};

const Favourites: React.FC<FavouritesProps> = () => {
    const { data: favouriteData, isLoading, error } = useGetFavouritesQuery();

    useEffect(() => {
        console.log({ favouriteData });
    }, [favouriteData]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={styles.container}>
                <AuthHeader Title="Important" />
                <ScrollView style={styles.scrollContainer}>
                    {favouriteData.length > 0 ? (
                        favouriteData?.data?.map((data) => <ImportantCard title={data?.name} />)
                    ) : (
                        <View style={styles.noDataContainer}>
                            <AnimatedLottieView
                                style={{ width: SIZES.width * 0.5 }}
                                source={require('../../../assets/NoData.json')}
                                autoPlay
                                loop
                            />
                            <Text style={{ ...FONTS.h4, textAlign: 'center', paddingTop: 12 }}>
                                You don't have any important chapters
                            </Text>
                            <PrimaryButton
                                OnPress={() => {
                                    navigate('Player');
                                }}
                                isLoading={false}
                                InputText="Explore Now"
                            />
                        </View>
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Favourites;
