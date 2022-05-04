import { RKLogo } from '@app/assets';
import React, { useState } from 'react';
import { Dimensions, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import Search from '../../../assets/icons/search.svg';
import styles from '../Styles/chapters.styles';
const SubjectCard = (props) => {
    const { Logo, name, backgroundColor, subjectText } = props;

    return (
        <View style={[styles.subjectCard, { marginVertical: 8 }]}>
            <View style={[styles.logoContainer, { backgroundColor: backgroundColor }]}>
                <Logo />
            </View>
            <View style={styles.nameContainer}>
                <Text style={styles.subjectText}>{subjectText}</Text>
                <Text style={styles.nameText}>{name}</Text>
                <ProgressBar style={{ height: 6, marginTop: 6, borderRadius: 12 }} progress={0.5} color={'#2A368A'} />
                <Text style={{ color: '#2A368A', marginTop: 4, fontSize: 14 }}>00:02:20</Text>
            </View>
        </View>
    );
};

const ContinueLearn = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [toggleSwitch, setToggleSwitch] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View
                style={{
                    position: 'relative',
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: '100%',
                    paddingHorizontal: 16,
                    height: 60,
                }}
            >
                <RKLogo />
                <Text style={{ color: '#404B63', fontWeight: 'bold', fontSize: 20, marginLeft: 12 }}>
                    Continue Learning
                </Text>
            </View>
            <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.container}>
                <SubjectCard Logo={Search} subjectText="Umang Gadhavana" name="Java A to Z" backgroundColor="#070C19" />
                <SubjectCard Logo={Search} subjectText="Maths" name="Science" backgroundColor="blue" />
                <SubjectCard Logo={Search} subjectText="Maths" name="Science" backgroundColor="#F0DB4F" />
                <SubjectCard Logo={Search} subjectText="Maths" name="Science" backgroundColor="pink" />
            </ScrollView>
        </SafeAreaView>
    );
};
export default ContinueLearn;
