import { navigate } from '@app/navigators';
import AuthHeader from '@app/screens/Auth/Components/AuthHeader';
import React from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import Search from '../../../assets/icons/search.svg';
import styles from '../Styles/chapters.styles';

const SubjectCard = (props) => {
    const { Logo, name, backgroundColor, subjectText } = props;

    return (
        <Pressable onPress={() => navigate('Video')} style={[styles.subjectCard, styles.marginV]}>
            <View style={[styles.logoContainer, { backgroundColor: backgroundColor }]}>
                <Logo />
            </View>
            <View style={styles.nameContainer}>
                <Text style={styles.subjectText}>{subjectText}</Text>
                <Text style={styles.nameText}>{name}</Text>
                <ProgressBar style={styles.progressBar} progress={0.5} color={'#2A368A'} />
                <Text style={styles.time}>00:02:20</Text>
            </View>
        </Pressable>
    );
};

const ContinueLearn = () => {
    return (
        <SafeAreaView style={styles.outer}>
            <View style={styles.paddingH}>
                <AuthHeader Title="Continue Learn" />
            </View>
            <ScrollView contentContainerStyle={styles.alignC} style={styles.container}>
                <SubjectCard Logo={Search} subjectText="Umang Gadhavana" name="Java A to Z" backgroundColor="#070C19" />
                <SubjectCard Logo={Search} subjectText="Maths" name="Science" backgroundColor="blue" />
                <SubjectCard Logo={Search} subjectText="Maths" name="Science" backgroundColor="#F0DB4F" />
                <SubjectCard Logo={Search} subjectText="Maths" name="Science" backgroundColor="pink" />
            </ScrollView>
        </SafeAreaView>
    );
};
export default ContinueLearn;
