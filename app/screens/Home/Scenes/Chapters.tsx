import { navigate } from '@app/navigators';
import React, { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Shadow } from 'react-native-neomorph-shadows';
import Search from '../../../assets/icons/search.svg';
import SearchBar from '../Components/SearchBar';
import styles from '../Styles/chapters.styles';

const DATA = [
    { chapter: 1, name: 'Triangle' },
    { chapter: 2, name: 'Circle' },
    { chapter: 3, name: 'Part-1' },
    { chapter: 3, name: 'Part-2' },
];

const colors = ['#2A368A', '#F04F4F', '#53B715'];
const randomeColor = () => colors[Math.floor(Math.random() * colors.length)];
const SubjectCard = (props) => {
    const { Logo, name, backgroundColor, subjectText } = props;

    return (
        <Shadow style={styles.shadowContainer}>
            <Pressable onPress={() => navigate('Video')} style={styles.subjectCard}>
                <View style={[styles.logoContainer, { backgroundColor: backgroundColor }]}>
                    {/* <Logo /> */}
                    <Text style={{ color: '#FFF', fontSize: 23, fontWeight: '900' }}>Ch:{props.Logo}</Text>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.subjectText}>{subjectText}</Text>
                    <Text style={styles.nameText}>{name}</Text>
                </View>
            </Pressable>
        </Shadow>
    );
};

const Chapters = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [toggleSwitch, setToggleSwitch] = useState(false);

    return (
        <SafeAreaView style={styles.outer}>
            <View style={styles.container}>
                <View style={styles.searchBarContainer}>
                    <SearchBar value={searchQuery} onChangeText={(value: string) => setSearchQuery(value)} />
                </View>

                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Maths</Text>
                    <Shadow style={styles.navShadowContainer}>
                        <Pressable onPress={() => setToggleSwitch(!toggleSwitch)}>
                            <View style={styles.languagesContainer}>
                                <View style={[styles.languagesLeft, toggleSwitch && styles.navBg]}>
                                    <Text style={toggleSwitch ? styles.white : styles.black}>English</Text>
                                </View>
                                <View style={[styles.languagesRight, !toggleSwitch && styles.navBg]}>
                                    <Text style={!toggleSwitch ? styles.white : styles.black}>Gujarati</Text>
                                </View>
                            </View>
                        </Pressable>
                    </Shadow>
                </View>
                <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container}>
                    {DATA.map((item, index) => {
                        return (
                            <SubjectCard
                                key={index}
                                Logo={item.chapter}
                                subjectText="Maths"
                                name={item.name}
                                backgroundColor={index >= colors.length ? colors[colors.length - index] : colors[index]}
                            />
                        );
                    })}
                    {/* <SubjectCard Logo={Search} subjectText="Maths" name="Science" backgroundColor="blue" />
                    <SubjectCard Logo={Search} subjectText="Maths" name="Science" backgroundColor="#F0DB4F" />
                    <SubjectCard Logo={Search} subjectText="Maths" name="Science" backgroundColor="pink" /> */}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};
export default Chapters;
