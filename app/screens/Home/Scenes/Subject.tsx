import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../Styles/subject.styles';
import Search from '../../../assets/icons/search.svg';
import SearchBar from '../Components/SearchBar';
import { Shadow } from 'react-native-neomorph-shadows';
import { SIZES } from '@app/theme/fonts';

const SubjectCard = (props) => {
    const { Logo, name, backgroundColor } = props;

    return (
        <Shadow
            style={{
                shadowOffset: { width: 2, height: 6 },
                shadowOpacity: 0.1,
                shadowColor: '#404B63',
                shadowRadius: 10,
                borderRadius: 20,
                backgroundColor: '#FFF',
                width: SIZES.width - 36,
                height: (SIZES.width - 36) * 0.3,
                marginVertical: 10,
            }}
        >
            <View style={styles.subjectCard}>
                <View style={[styles.logoContainer, { backgroundColor: backgroundColor }]}>
                    <Logo />
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameText}>{name}</Text>
                </View>
            </View>
        </Shadow>
    );
};

const Subject = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <View style={styles.container}>
            <SearchBar value={searchQuery} onChangeText={(value) => setSearchQuery(value)} />
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
