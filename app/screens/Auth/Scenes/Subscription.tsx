import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { SafeAreaView, View, Text, ScrollView, ActivityIndicator, Pressable, Keyboard, TextInput } from 'react-native';
import AuthHeader from '../Components/AuthHeader';
import PrimaryButton from '../Components/PrimaryButton';
import STYLES from '../Styles/Subscription.style';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Safety } from '@app/assets';
import { navigate, navigateAndReplace, navigateAndSimpleReset } from '@app/navigators';
import {
    useGetBoardsQuery,
    useGetCoupneListQuery,
    useGetStandardsMutation,
    useGetSubjectPlansMutation,
    usePaymentFailedHandlerMutation,
    usePaymentSuccessHandlerMutation,
    useRequestOrderIdMutation,
} from '@app/services/redux/api/subscription';
import RazorpayCheckout from 'react-native-razorpay';
import Loading from '@app/components/Loading';
import { useGetSubcribedSubjectsQuery } from '@app/services/redux/api/home';
import Snackbar from 'react-native-snackbar';
import { COLORS, FONTS } from '@app/theme';
import BottomSheet from '@gorhom/bottom-sheet';
import { SIZES } from '@app/theme/fonts';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SubscriptionProps {}

const checkBoxData = ['English', 'Maths', 'Gujarati', 'Science', 'Social Science'];

const Subscription: React.FC<SubscriptionProps> = () => {
    const [boardValue, setBoardValue] = useState(null);
    const [stdValue, setStdValue] = useState(null);
    const { data: boardData, isLoading: isBoardLoading, isError: isBoardError } = useGetBoardsQuery();
    const [getStandards, { isLoading: isStandardLoading, data: standardsData, error: standardError }] =
        useGetStandardsMutation();
    const [getSubjectPlans, { isLoading: isSubjectLoading, data: subjectData, error: subjectError }] =
        useGetSubjectPlansMutation();

    const {
        data: subscribedSubjectData,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch,
    } = useGetSubcribedSubjectsQuery();

    const { data: coupneList, isLoading: isCoupneLoading, isError: isCoupneError } = useGetCoupneListQuery();

    const [subjectDataToShow, setSubjectDataToShow] = useState(subjectData);
    const [isPrivacy, setIsPrivacy] = useState(false);

    useEffect(() => {
        console.log({ subscribedSubjectData, subjectData });
        const subscribedSubjectIds = subscribedSubjectData?.data.map((item) => item?.subjectPlanId);
        const subjectsToShow = subjectData?.data.filter((item) => !subscribedSubjectIds?.includes(item.id));
        setSubjectDataToShow(subjectsToShow);
        console.log('subjectsToShow', subjectsToShow);
    }, [subjectData, subscribedSubjectData]);

    useEffect(() => {
        console.log(boardData?.data);
    }, [boardData, isBoardLoading, isBoardError]);

    useEffect(() => {
        console.log({ coupneList });
    }, [coupneList]);

    useEffect(() => {
        if (boardValue) {
            setSubjectDataToShow(null);
            getStandards(boardValue);
        }
    }, [boardValue]);

    useEffect(() => {
        if (stdValue) {
            getSubjectPlans(stdValue);
        }
    }, [stdValue]);

    useEffect(() => {
        if (!isStandardLoading && standardsData) {
            console.log({ standardsData });
        }
    }, [isStandardLoading, standardsData]);

    const renderBoards = (item: any) => {
        return (
            <View style={STYLES.item}>
                <Text style={STYLES.textItem}>{item.label}</Text>
                {item.value === boardValue && <Safety style={STYLES.icon} height={20} width={20} />}
            </View>
        );
    };

    const renderStandards = (item: any) => {
        return (
            <View style={STYLES.item}>
                <Text style={STYLES.textItem}>{item.label}</Text>
                {item.value === stdValue && <Safety style={STYLES.icon} height={20} width={20} />}
            </View>
        );
    };
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [totel, setTotel] = useState(0);

    const calculateTotel = () => {
        if (selectedSubjects.length > 0) {
            let totel = 0;
            for (let index = 0; index < selectedSubjects?.length; index++) {
                const element = selectedSubjects[index];
                totel += element.fees;
            }
            setTotel(totel);
            // return totel;
        } else {
            setTotel(0);
        }
    };
    useEffect(() => {
        calculateTotel();
        console.log({ selectedSubjects });
    }, [selectedSubjects]);
    const handleSelectedSubject = (newSub) => {
        const isExist = selectedSubjects.findIndex((e) => e.id === newSub.id);
        if (isExist < 0) {
            setSelectedSubjects([...selectedSubjects, newSub]);
        }
        console.log({ isExist });
    };
    const handleUnSelectedSubject = (sub) => {
        const isExist = selectedSubjects.findIndex((e) => e.id === sub.id);
        if (isExist >= 0) {
            const newArr = selectedSubjects.filter((e) => e.id !== sub.id);
            console.log({ newArr });

            setSelectedSubjects(newArr);
        }
    };

    const handleNext = () => {
        const subjectPlanId = selectedSubjects.map((item) => item.id);
        navigate('SubscriptionDetail', { subjectPlanId, stdValue });
        // requestOrderId({ subjectPlanId: subjectPlanId, couponCode: couponCode });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <AuthHeader />

            <View style={{ flex: 1, backgroundColor: '#FFF', height: '100%' }}>
                <Pressable
                    onPress={() => {
                        Keyboard.dismiss();
                    }}
                    style={STYLES.container}
                >
                    {isBoardLoading ? (
                        <Loading />
                    ) : (
                        <View style={{ justifyContent: 'space-between', flex: 1 }}>
                            <View style={{ flex: 1 }}>
                                <View style={STYLES.marginT}>
                                    <Text style={STYLES.selectText}>Select Board</Text>
                                    <Dropdown
                                        style={STYLES.dropdown}
                                        placeholderStyle={STYLES.placeholderStyle}
                                        selectedTextStyle={STYLES.selectedTextStyle}
                                        iconStyle={STYLES.iconStyle}
                                        data={boardData?.data?.map((item, index) => ({
                                            label: item.name,
                                            value: item.id,
                                        }))}
                                        maxHeight={110}
                                        labelField="label"
                                        valueField="value"
                                        placeholder="Select Board"
                                        value={boardValue}
                                        onChange={(item) => {
                                            setBoardValue(item.value);
                                        }}
                                        renderLeftIcon={() => <Safety style={STYLES.icon} height={20} width={20} />}
                                        renderItem={renderBoards}
                                    />
                                </View>
                                {!isStandardLoading && standardsData && (
                                    <View style={STYLES.marginT}>
                                        <Text style={STYLES.selectText}>Select Standard</Text>
                                        <Dropdown
                                            style={STYLES.dropdown}
                                            placeholderStyle={STYLES.placeholderStyle}
                                            selectedTextStyle={STYLES.selectedTextStyle}
                                            iconStyle={STYLES.iconStyle}
                                            data={standardsData?.data?.map((item, index) => ({
                                                label: item.name,
                                                value: item.id,
                                            }))}
                                            maxHeight={180}
                                            labelField="label"
                                            valueField="value"
                                            placeholder="Select Standard"
                                            value={stdValue}
                                            onChange={(item) => {
                                                setStdValue(item.value);
                                            }}
                                            renderLeftIcon={() => <Safety style={STYLES.icon} height={20} width={20} />}
                                            renderItem={renderStandards}
                                        />
                                    </View>
                                )}
                                {!isSubjectLoading && subjectData && subjectDataToShow && (
                                    <View style={STYLES.marginT}>
                                        <Text style={STYLES.selectText}>Select Subjects</Text>
                                        {subjectDataToShow?.length > 0 ? (
                                            <ScrollView style={STYLES.checkboxContainer}>
                                                {subjectDataToShow?.map((item, index) => {
                                                    return (
                                                        <BouncyCheckbox
                                                            // textComponent={(props) => (
                                                            //     <View>
                                                            //         <Text>yash</Text>
                                                            //         <Text>Bathe</Text>
                                                            //     </View>
                                                            // )}
                                                            key={index}
                                                            size={25}
                                                            style={STYLES.checkboxStyle}
                                                            fillColor="#2A368A"
                                                            unfillColor="#FFFFFF"
                                                            textStyle={STYLES.checkBoxTextStyle}
                                                            text={item?.name + '( ₹' + item.fees + ')'}
                                                            iconStyle={STYLES.checkBoxIconStyle}
                                                            onPress={(isChecked: boolean) => {
                                                                if (isChecked) {
                                                                    handleSelectedSubject(item);
                                                                } else {
                                                                    handleUnSelectedSubject(item);
                                                                }
                                                                // console.log({ isChecked });
                                                            }}
                                                        />
                                                    );
                                                })}
                                            </ScrollView>
                                        ) : (
                                            <View
                                                style={
                                                    (STYLES.noDataContainer,
                                                    { justifyContent: 'flex-start', alignItems: 'center' })
                                                }
                                            >
                                                <Text style={{ ...FONTS.h4, textAlign: 'center', paddingTop: 12 }}>
                                                    No Chapters Found
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                )}
                            </View>
                            <View>
                                {totel > 0 && <Text style={STYLES.price}>Total ₹{totel}</Text>}
                                <PrimaryButton
                                    disabled={selectedSubjects && selectedSubjects.length === 0}
                                    isLoading={false}
                                    InputText="Next"
                                    OnPress={() => handleNext()}
                                />
                            </View>

                            {/* <View>
                                <View style={{ width: '100%', alignItems: 'center' }}>
                                    <BouncyCheckbox
                                        // textComponent={(props) => (
                                        //     <View>
                                        //         <Text>yash</Text>
                                        //         <Text>Bathe</Text>
                                        //     </View>
                                        // )}

                                        size={25}
                                        style={STYLES.checkboxStyle}
                                        fillColor="#2A368A"
                                        unfillColor="#FFFFFF"
                                        textStyle={STYLES.checkBoxTextStyle}
                                        text={'Accept Privacy Policy'}
                                        iconStyle={STYLES.checkBoxIconStyle}
                                        onPress={(isChecked: boolean) => {
                                            // console.log({ isChecked });
                                            setIsPrivacy(isChecked);
                                        }}
                                    />
                                </View>

                                <Text style={STYLES.desclaimer}>
                                    Students will get unlimited access to content after taking one time suscribtion
                                </Text>
                                <PrimaryButton
                                    disabled={false}
                                    isLoading={false}
                                    InputText="Apply Coupne Code"
                                    OnPress={() => bottomSheetRef.current?.snapToIndex(0)}
                                />
                                <PrimaryButton
                                    disabled={!isPrivacy}
                                    isLoading={isOrderLoading}
                                    InputText="Next"
                                    OnPress={() => handleNext()}
                                />
                            </View> */}
                        </View>
                    )}
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default Subscription;
