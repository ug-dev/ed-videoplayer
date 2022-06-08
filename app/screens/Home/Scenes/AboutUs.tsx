import { Linking, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FONTS } from '@app/theme';
import AuthHeader from '@app/screens/Auth/Components/AuthHeader';

const FieldRow = ({ label, description }) => {
    return (
        <View style={{ marginBottom: 12 }}>
            <Text style={[FONTS.h4, { color: '#717171' }]}>{label}</Text>
            <Text
                onPress={() => {
                    if (label === 'Contact no') Linking.openURL('tel:+91' + description);
                }}
                style={[FONTS.body5, label === 'Contact no' && { color: 'blue' }]}
            >
                {description}
            </Text>
        </View>
    );
};
const AboutUs = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={{ paddingHorizontal: 16 }}>
                <AuthHeader />
                <Text style={[FONTS.h3, { marginBottom: 16 }]}>About Us</Text>
                <FieldRow
                    label={'Producer & Director'}
                    description={'Rashmi N. Pala (16 years experience in the field of education)'}
                />
                <FieldRow label={'Email'} description={'radhekrishnalearning@gmail.com'} />
                <FieldRow label={'Contact no'} description={'7575888861'} />
                <FieldRow
                    label={'Application Description'}
                    description={
                        'Hello! Welcome to the Radhe Krishna Learning This application is for school students ( CBSE & GSEB) who want to learn with innovative techniques. This application contains Videos of different subjects (chapter wise) as per their respective board syllabus. If you found this app helpful, then don’t forget to rate this app on play store/ App store! Keep learning with Radhe Krishna Learning App'
                    }
                />
            </View>
        </SafeAreaView>
    );
};

export default AboutUs;

const styles = StyleSheet.create({});
