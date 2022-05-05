import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from '../Styles/subject.styles';
import Search from '../../../assets/icons/search.svg';
import SearchBar from '../Components/SearchBar';
import { Shadow } from 'react-native-neomorph-shadows';
import { navigate } from '@app/navigators';

const SubjectCard = (props) => {
    const { Logo, name, backgroundColor } = props;

    return (
        <Shadow style={styles.shadowContainer}>
            <Pressable onPress={() => navigate('PlayerNav')} style={styles.subjectCard}>
                <View style={[styles.logoContainer, { backgroundColor: backgroundColor }]}>
                    <Logo />
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameText}>{name}</Text>
                </View>
            </Pressable>
        </Shadow>
    );
};

const Subject = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <View style={styles.container}>
            <SearchBar value={searchQuery} onChangeText={(value: string) => setSearchQuery(value)} />
            <View style={styles.subjectsContainer}>
                <SubjectCard Logo={Search} name="Maths" backgroundColor="#070C19" />
                <SubjectCard Logo={Search} name="Science" backgroundColor="blue" />
                <SubjectCard Logo={Search} name="Science" backgroundColor="yellow" />
                <SubjectCard Logo={Search} name="Science" backgroundColor="pink" />
            </View>
        </View>
    );
};
export default Subject;
