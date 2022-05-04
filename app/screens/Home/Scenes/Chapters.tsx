import React, { useState } from 'react';
import { Dimensions, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Shadow } from 'react-native-neomorph-shadows';
import Search from '../../../assets/icons/search.svg';
import SearchBar from '../Components/SearchBar';
import styles from '../Styles/chapters.styles';
// import { Shadow } from 'react-native-neomorph-shadows';
const { width, height } = Dimensions.get('window');
const SubjectCard = (props) => {
    const { Logo, name, backgroundColor, subjectText } = props;

    return (
        <Shadow
            style={{
                shadowOffset: { width: 2, height: 6 },
                shadowOpacity: 0.1,
                shadowColor: '#404B63',
                shadowRadius: 10,
                borderRadius: 20,
                backgroundColor: '#FFF',
                width: width - 36,
                height: (width - 36) * 0.3,
                marginVertical: 10,
            }}
        >
            <View style={styles.subjectCard}>
                <View style={[styles.logoContainer, { backgroundColor: backgroundColor }]}>
                    <Logo />
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.subjectText}>{subjectText}</Text>
                    <Text style={styles.nameText}>{name}</Text>
                </View>
            </View>
        </Shadow>
    );
};

const Chapters = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [toggleSwitch, setToggleSwitch] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={{ paddingHorizontal: 16, marginTop: 12 }}>
                    <SearchBar value={searchQuery} onChangeText={(value) => setSearchQuery(value)} />
                </View>

                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Maths</Text>
                    <Shadow
                        style={{
                            shadowOffset: { width: 1, height: 2 },
                            shadowOpacity: 0.1,
                            shadowColor: '#404B63',
                            shadowRadius: 10,
                            borderRadius: 20,
                            backgroundColor: '#FFF',
                            width: (width - 36) * 0.45,
                            height: 36,
                        }}
                    >
                        <Pressable onPress={() => setToggleSwitch(!toggleSwitch)}>
                            <View style={styles.languagesContainer}>
                                <View style={[styles.languagesLeft, toggleSwitch && { backgroundColor: '#2A368A' }]}>
                                    <Text style={{ color: toggleSwitch ? 'white' : 'black' }}>English</Text>
                                </View>
                                <View
                                    style={[
                                        styles.languagesRight,
                                        !toggleSwitch && {
                                            backgroundColor: '#2A368A',
                                        },
                                    ]}
                                >
                                    <Text style={{ color: !toggleSwitch ? 'white' : 'black' }}>Gujarati</Text>
                                </View>
                            </View>
                        </Pressable>
                    </Shadow>
                </View>
                <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.container}>
                    <SubjectCard Logo={Search} subjectText="Maths" name="Maths" backgroundColor="#070C19" />
                    <SubjectCard Logo={Search} subjectText="Maths" name="Science" backgroundColor="blue" />
                    <SubjectCard Logo={Search} subjectText="Maths" name="Science" backgroundColor="#F0DB4F" />
                    <SubjectCard Logo={Search} subjectText="Maths" name="Science" backgroundColor="pink" />
                    <SubjectCard Logo={Search} subjectText="Maths" name="Science" backgroundColor="pink" />
                    <SubjectCard Logo={Search} subjectText="Maths" name="Science" backgroundColor="pink" />
                    <SubjectCard Logo={Search} subjectText="Maths" name="Science" backgroundColor="pink" />
                    <SubjectCard Logo={Search} subjectText="Maths" name="Science" backgroundColor="pink" />
                    <SubjectCard Logo={Search} subjectText="Maths" name="Science" backgroundColor="pink" />
                    <SubjectCard Logo={Search} subjectText="Maths" name="Science" backgroundColor="pink" />
                    <SubjectCard Logo={Search} subjectText="Maths" name="Science" backgroundColor="pink" />
                    <SubjectCard Logo={Search} subjectText="Maths" name="Science" backgroundColor="pink" />
                    <SubjectCard Logo={Search} subjectText="Maths" name="Science" backgroundColor="pink" />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};
export default Chapters;
