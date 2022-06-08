import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ActivityIndicator, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import styles from '../Styles/subject.styles';
import Search from '../../../assets/icons/search.svg';
import SearchBar from '../Components/SearchBar';
import { Shadow } from 'react-native-neomorph-shadows';
import { navigate } from '@app/navigators';
import { useGetSubcribedSubjectsQuery } from '@app/services/redux/api/home';
import LottieView from 'lottie-react-native';
import AuthHeader from '@app/screens/Auth/Components/AuthHeader';
import { SIZES } from '@app/theme/fonts';
import PrimaryButton from '@app/screens/Auth/Components/PrimaryButton';
import { FONTS } from '@app/theme';
import Loading from '@app/components/Loading';
import { useIsFocused } from '@react-navigation/native';

const SubjectCard = (props) => {
    const { Logo, name, backgroundColor, id } = props;

    return (
        <Shadow style={styles.shadowContainer}>
            <Pressable
                onPress={() => navigate('PlayerNav', { screen: 'Chapters', params: { id: id, subjectName: name } })}
                style={styles.subjectCard}
            >
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
    const { data: subjectData, isLoading, isSuccess, isError, error, refetch } = useGetSubcribedSubjectsQuery();
    const [dataToShow, setdataToShow] = useState(subjectData?.data || null);

    useEffect(() => {
        if (!isLoading && subjectData) {
            setdataToShow(subjectData?.data);
        }
    }, [subjectData, isLoading]);
    const isFocused = useIsFocused();

    const handleSearch = (searchQuery) => {
        if (searchQuery && searchQuery.length > 0) {
            const newData = subjectData?.data.filter((item) =>
                item?.name.toLowerCase().includes(searchQuery.toLowerCase()),
            );
            setdataToShow(newData);
            console.log(newData);
        } else {
            setdataToShow(subjectData?.data);
        }
    };
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        refetch();
        //   getAllRecurities();
        setRefreshing(false);
        // wait(2000).then(() => setRefreshing(false));
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={styles.container}>
                <AuthHeader />
                <SearchBar
                    handleSearch={handleSearch}
                    // value={searchQuery}
                    onChangeText={(value: string) => handleSearch(value)}
                />
                <ScrollView
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    style={styles.subjectsContainer}
                >
                    {!isLoading && subjectData && subjectData?.data.length > 0 ? (
                        dataToShow?.length > 0 ? (
                            dataToShow?.map((item) => (
                                <SubjectCard
                                    key={item.id}
                                    Logo={Search}
                                    id={item.id}
                                    name={item.name}
                                    backgroundColor="#070C19"
                                />
                            ))
                        ) : (
                            <View
                                style={(styles.noDataContainer, { justifyContent: 'flex-start', alignItems: 'center' })}
                            >
                                <Text style={{ ...FONTS.h4, textAlign: 'center', paddingTop: 12 }}>
                                    No Subject Found
                                </Text>
                            </View>
                        )
                    ) : (
                        !isError && <Loading />
                    )}
                    {isError && (
                        <View style={styles.noDataContainer}>
                            <LottieView
                                style={{ width: SIZES.width * 0.5 }}
                                source={require('../../../assets/NoData.json')}
                                autoPlay
                                loop
                            />
                            <Text style={{ ...FONTS.h4, textAlign: 'center', paddingTop: 12 }}>
                                You did't subscribed to any subjects yet
                            </Text>
                            <PrimaryButton
                                OnPress={() => {
                                    navigate('AuthStack', { screen: 'Subscription' });
                                }}
                                isLoading={false}
                                InputText="Subscribe Now"
                            />
                        </View>
                    )}

                    {/* <SubjectCard Logo={Search} name="Science" backgroundColor="pink" /> */}
                    {/* <SubjectCard Logo={Search} name="Science" backgroundColor="yellow" />
                <SubjectCard Logo={Search} name="Science" backgroundColor="pink" /> */}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};
export default Subject;
