import Loading from '@app/components/Loading';
import { navigate } from '@app/navigators';
import AuthHeader from '@app/screens/Auth/Components/AuthHeader';
import { useGetChaptersMutation, useGetChaptersQuery, useGetLanguagesQuery } from '@app/services/redux/api/home';
import { FONTS } from '@app/theme';
import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Shadow } from 'react-native-neomorph-shadows';
import Search from '../../../assets/icons/search.svg';
import SearchBar from '../Components/SearchBar';
import styles from '../Styles/chapters.styles';

const colors = ['#2A368A', '#F04F4F', '#53B715'];
const randomeColor = () => colors[Math.floor(Math.random() * colors.length)];
const SubjectCard = (props) => {
    const { Logo, name, backgroundColor, subjectText, id } = props;

    return (
        <Shadow style={styles.shadowContainer}>
            <Pressable onPress={() => navigate('Video', { id: id, subjectText })} style={styles.subjectCard}>
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

const Chapters = ({ route }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [toggleSwitch, setToggleSwitch] = useState(true);
    const { data: languageData, isLoading: isLanguageLoading } = useGetLanguagesQuery(null);
    const [getChapter, { data: chaptersData, isLoading }] = useGetChaptersMutation();
    const [dataToShow, setdataToShow] = useState(chaptersData?.data || null);
    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const handleSearch = (query) => {
        if (query && query.length > 0) {
            const newData = chaptersData?.data.filter((item) => item?.name.toLowerCase().includes(query.toLowerCase()));
            console.log({ newData });
            setdataToShow(newData);
        } else {
            setdataToShow(chaptersData?.data);
        }
    };

    useEffect(() => {
        if (languageData && !isLanguageLoading) {
            console.log({ languageData: languageData?.data });
            const english = languageData?.data?.find((item) => item?.name.toLowerCase().includes('english'));
            setSelectedLanguage(english?.id);
        }
    }, [languageData]);

    useEffect(() => {
        if (selectedLanguage) {
            getChapter({ subjectId: route?.params?.id, languageId: selectedLanguage });
        }
    }, [selectedLanguage]);

    useEffect(() => {
        if (!isLoading && chaptersData) {
            console.log({ chaptersData });
            setdataToShow(chaptersData?.data);
        }
    }, [isLoading, chaptersData]);

    useEffect(() => {
        if (toggleSwitch) {
            const english = languageData?.data?.find((item) => item?.name.toLowerCase().includes('english'));
            setSelectedLanguage(english?.id);
        } else {
            const gujarati = languageData?.data?.find((item) => item?.name.toLowerCase().includes('gujarati'));
            setSelectedLanguage(gujarati?.id);
        }
    }, [toggleSwitch]);

    console.log({ route });

    const id = route.params.id;
    console.log({ id });

    return (
        <SafeAreaView style={styles.outer}>
            <AuthHeader />
            <View style={styles.container}>
                <View style={styles.searchBarContainer}>
                    <SearchBar onChangeText={(value: string) => handleSearch(value)} />
                </View>

                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{route?.params?.subjectName}</Text>
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
                    {dataToShow ? (
                        dataToShow.length > 0 ? (
                            dataToShow?.map((item, index) => {
                                return (
                                    <SubjectCard
                                        id={item?.id}
                                        key={item?.id}
                                        Logo={item?.number}
                                        subjectText={route?.params?.subjectName}
                                        name={item?.name}
                                        backgroundColor={colors[index % colors.length]}
                                    />
                                );
                            })
                        ) : (
                            <View
                                style={(styles.noDataContainer, { justifyContent: 'flex-start', alignItems: 'center' })}
                            >
                                <Text style={{ ...FONTS.h4, textAlign: 'center', paddingTop: 12 }}>
                                    No Chapters Found
                                </Text>
                            </View>
                        )
                    ) : (
                        <Loading />
                    )}
                    {/* <SubjectCard Logo={Search} subjectText="Maths" name="Science" backgroundColor="blue" />
                    <SubjectCard Logo={Search} subjectText="Maths" name="Science" backgroundColor="#F0DB4F" />
                    <SubjectCard Logo={Search} subjectText="Maths" name="Science" backgroundColor="pink" /> */}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};
export default Chapters;
