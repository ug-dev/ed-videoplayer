import { VideoPlayerLike } from '@app/assets';
import AuthHeader from '@app/screens/Auth/Components/AuthHeader';
import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import styles from '../Styles/Favourite.style';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FavouritesProps {}

const ImportantCard = () => {
    return (
        <View style={styles.importantContainer}>
            <VideoPlayerLike height="38" width="38" style={styles.importantLikeIcon} />
            <Image style={styles.importantBg} source={require('../../../assets/images/ImportantCardBg.png')} />
            <View style={styles.importantText}>
                <Text style={styles.name}>John Doe</Text>
                <Text style={styles.courseName}>Java Crash Course</Text>
            </View>
        </View>
    );
};

const Favourites: React.FC<FavouritesProps> = () => {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <AuthHeader Title="Important" />
                <ScrollView style={styles.scrollContainer}>
                    <ImportantCard />
                    <ImportantCard />
                    <ImportantCard />
                    <ImportantCard />
                    <ImportantCard />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Favourites;
