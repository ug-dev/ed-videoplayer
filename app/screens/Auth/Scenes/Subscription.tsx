import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { SafeAreaView, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import AuthHeader from '../Components/AuthHeader';
import PrimaryButton from '../Components/PrimaryButton';
import STYLES from '../Styles/Subscription.style';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Safety } from '@app/assets';
import { navigate, navigateAndSimpleReset } from '@app/navigators';
import {
    useGetBoardsQuery,
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
    const [requestOrderId, { isLoading: isOrderLoading, data: orderData, error: orderError }] =
        useRequestOrderIdMutation();
    const [
        paymentFailedHandler,
        { isLoading: isPaymentFailedLoading, data: paymentFailedData, error: paymentFailedError },
    ] = usePaymentFailedHandlerMutation();
    const [
        paymentSuccessHandler,
        { isLoading: isPaymentSuccessLoading, data: paymentSuccessData, error: paymentSuccess },
    ] = usePaymentSuccessHandlerMutation();
    const {
        data: subscribedSubjectData,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch,
    } = useGetSubcribedSubjectsQuery();

    const [subjectDataToShow, setSubjectDataToShow] = useState(subjectData);
    const [isPrivacy, setIsPrivacy] = useState(false);

    useEffect(() => {
        console.log({ subscribedSubjectData, subjectData });
        const subscribedSubjectIds = subscribedSubjectData?.data.map((item) => item?.subjectPlanId);
        const subjectsToShow = subjectData?.data.filter((item) => !subscribedSubjectIds.includes(item.id));
        setSubjectDataToShow(subjectsToShow);
        console.log('subjectsToShow', subjectsToShow);
    }, [subjectData, subscribedSubjectData]);

    useEffect(() => {
        console.log(boardData?.data);
    }, [boardData, isBoardLoading, isBoardError]);

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
        if (!isOrderLoading && orderData) {
            const options = {
                description: 'Credits towards Buying RK streaming App',
                image: 'https://i.imgur.com/3g7nmJC.png',
                currency: 'INR',
                key: 'rzp_test_WuUA5MnbHJiAdL', // Your api key
                name: 'foo',
                prefill: {
                    email: 'void@razorpay.com',
                    contact: '9191919191',
                    name: 'Razorpay Software',
                },
                order_id: orderData?.data?.subscription?.orderId,
                theme: { background: '#102A8B' },
            };
            RazorpayCheckout.open(options)
                .then((data) => {
                    // handle success
                    paymentSuccessHandler(data);
                    alert(`Success: ${data.razorpay_payment_id}`);
                })
                .catch((error) => {
                    // handle failure
                    console.log(error);
                    paymentFailedHandler({ order_id: orderData?.data?.subscription?.orderId });
                    alert(`Error: ${error.code} | ${error.description}`);
                });
        }
    }, [orderData]);

    useEffect(() => {
        if (!isPaymentSuccessLoading && paymentSuccessData) {
            navigateAndSimpleReset('HomeNavigator');
        }
    }, [isPaymentSuccessLoading, paymentSuccessData]);

    useEffect(() => {
        if (!isStandardLoading && standardsData) {
            console.log({ standardsData });
        }
    }, [isStandardLoading, standardsData]);

    useEffect(() => {
        if (orderError) {
            console.log({ orderError });
            Snackbar.show({ text: orderError?.data?.message, backgroundColor: '#FFF', textColor: COLORS.angry });
        }
    }, [orderError]);

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
        requestOrderId({ subjectPlanId: subjectPlanId });
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={STYLES.container}>
                {isBoardLoading || isPaymentSuccessLoading ? (
                    <Loading />
                ) : (
                    <>
                        <View>
                            <AuthHeader Title="Subscription" />

                            <View style={STYLES.marginT}>
                                <Text style={STYLES.selectText}>Select Board</Text>
                                <Dropdown
                                    style={STYLES.dropdown}
                                    placeholderStyle={STYLES.placeholderStyle}
                                    selectedTextStyle={STYLES.selectedTextStyle}
                                    iconStyle={STYLES.iconStyle}
                                    data={boardData?.data?.map((item, index) => ({ label: item.name, value: item.id }))}
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
                            {totel > 0 && <Text style={STYLES.price}>₹ {totel}</Text>}
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
                                disabled={!isPrivacy}
                                isLoading={isOrderLoading}
                                InputText="Next"
                                OnPress={() => handleNext()}
                            />
                        </View>
                    </>
                )}
            </View>
        </SafeAreaView>
    );
};

export default Subscription;
