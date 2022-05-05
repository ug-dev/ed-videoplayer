import { JsCrash } from '@app/assets';
import React, { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import SearchBar from '../Components/SearchBar';
import HomeCardView from '../Components/HomeCardView';
import STYLES from '../Styles/Home.style';
import AuthHeader from '@app/screens/Auth/Components/AuthHeader';
import { navigate } from '@app/navigators';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <SafeAreaView>
            <ScrollView style={STYLES.scrollContainer}>
                <View style={STYLES.container}>
                    <AuthHeader Title="RK" />
                    <SearchBar value={searchQuery} onChangeText={(value: string) => setSearchQuery(value)} />
                    <View style={STYLES.bannerCardView}>
                        <JsCrash style={STYLES.bannerInnerImage} />
                        <Text style={STYLES.bannerInnerText}>Java Crash Course</Text>
                    </View>
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
