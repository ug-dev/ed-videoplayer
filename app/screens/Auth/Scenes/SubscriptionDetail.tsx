import { Keyboard, Modal, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import AuthHeader from '../Components/AuthHeader';
import {
    useCheckCouponMutation,
    useGetCoupneListQuery,
    useGetSubjectPlansMutation,
    usePaymentFailedHandlerMutation,
    usePaymentSuccessHandlerMutation,
    useRequestOrderIdMutation,
} from '@app/services/redux/api/subscription';
import { COLORS, FONTS } from '@app/theme';
import { Discount } from '@app/assets/icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { SIZES } from '@app/theme/fonts';
import Snackbar from 'react-native-snackbar';
import PrimaryButton from '../Components/PrimaryButton';
import RazorpayCheckout from 'react-native-razorpay';
import { navigateAndReplace, navigateAndSimpleReset } from '@app/navigators';
import { useGetUserMutation } from '@app/services/redux/api/auth';
import Loading from '@app/components/Loading';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const CoupneCard = ({ couponCode, couponName, couponType, discount, id, setCouponCode, handleApplyCoupon }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                paddingVertical: 18,
                justifyContent: 'space-between',
                // backgroundColor: 'red',
                width: SIZES.width,
                paddingHorizontal: 18,
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: '#777',
            }}
        >
            <View style={{}}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[FONTS.h3, { marginBottom: 6 }]}>{couponName}</Text>
                    <Text style={FONTS.h5}>
                        {' ('}
                        {'-'}
                        {couponType === 'flat' && '₹'}
                        {discount}
                        {couponType === 'percent' && '%'}
                        {')'}
                    </Text>
                </View>
                <Text
                    style={{
                        padding: 6,
                        borderColor: '#2A368A',
                        borderWidth: 1,
                        borderStyle: 'dashed',
                        borderRadius: 6,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {couponCode}
                </Text>
            </View>

            <Pressable
                onPress={() => {
                    handleApplyCoupon(couponCode);
                }}
            >
                <Text style={[FONTS.h7, { color: '#2A368A' }]}>Apply</Text>
            </Pressable>
        </View>
    );
};

const SubscriptionDetail = ({ route }) => {
    const { stdValue, subjectPlanId } = route?.params;
    console.log({ stdValue, subjectPlanId });
    const [getSubjectPlans, { isLoading: isSubjectLoading, data: subjectData, error: subjectError }] =
        useGetSubjectPlansMutation();
    const { data: coupneList, isLoading: isCoupneLoading, isError: isCoupneError } = useGetCoupneListQuery(null);
    const [checkCoupon, { data: checkCouponData, error: checkCouponError }] = useCheckCouponMutation();
    const [subscribedPlans, setSubscribedPlans] = useState<[] | null>(null);
    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [total, setTotal] = useState(0);
    const [netTotal, setNetTotal] = useState(total);
    const [discountAmount, setDiscountAmount] = useState(0);

    // variables
    const snapPoints = useMemo(() => ['50%', '80%'], []);
    const [couponCode, setCouponCode] = useState<string | null>(null);
    const [newCouponCode, setNewCouponCode] = useState<string | null>(null);

    const [showTermsModel, setShowTermsModel] = useState(false);

    const [getUser, { data: userData, isLoading: isUserLoading, error }] = useGetUserMutation();
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

    useEffect(() => {
        getSubjectPlans(stdValue);
        getUser();
    }, []);

    useEffect(() => {
        console.log(subjectData, subjectPlanId);
        if (subjectData) {
            const filterSubjectData = subjectData?.data.filter((subject) => subjectPlanId.includes(subject.id));
            let totel = 0;
            for (let index = 0; index < filterSubjectData?.length; index++) {
                const element = filterSubjectData[index];
                totel += element.fees;
            }

            setTotal(totel);
            setNetTotal(totel);
            setSubscribedPlans(filterSubjectData);
            console.log(filterSubjectData);
        }
    }, [subjectData]);
    const handleApplyCoupon = (code) => {
        setCouponCode(code);
        bottomSheetRef.current?.close();
    };
    const handleCoupneChange = () => {
        console.log(couponCode, coupneList?.data);

        if (couponCode) {
            const coupneDetails = coupneList?.data[0].find((item) => item.couponCode === couponCode);
            if (coupneDetails) {
                const discountType = coupneDetails?.couponType;
                const discount = coupneDetails?.discount;
                console.log({ total, discount, discountType });

                if (discountType === 'percent') {
                    const discountAmt = (total * parseFloat(discount)) / 100;
                    setDiscountAmount(discountAmt);
                    setNetTotal(total - discountAmt);
                    console.log({ discountAmt });
                } else {
                    const discountAmt = discount;
                    setDiscountAmount(discountAmt);
                    setNetTotal(total - discountAmt);
                    console.log({ discountAmt });
                }
            }
        }
    };
    const toggleModel = () => {
        setShowTermsModel(!showTermsModel);
    };
    useEffect(() => {
        handleCoupneChange();
    }, [couponCode]);

    useEffect(() => {
        console.log({ checkCouponData, checkCouponError });
        if (checkCouponError) {
            Snackbar.show({ text: checkCouponError?.data.errors[0], textColor: '#F04F4F', backgroundColor: '#F1f1f1' });
        }
        if (checkCouponData) {
            Snackbar.show({ text: 'coupon applied', textColor: '#2A368A', backgroundColor: '#F1f1f1' });
            console.log(checkCouponData);
            const coupneDetails = checkCouponData?.data;
            const discountType = coupneDetails?.couponType;
            const discount = coupneDetails?.discount;
            console.log({ total, discount, discountType });

            if (discountType === 'percent') {
                const discountAmt = (total * parseFloat(discount)) / 100;
                setDiscountAmount(discountAmt);
                setNetTotal(total - discountAmt);
                // console.log({ discountAmt });
            } else {
                const discountAmt = discount;
                setDiscountAmount(discountAmt);
                setNetTotal(total - discountAmt);
                // console.log({ discountAmt });
            }

            setCouponCode(newCouponCode);
        }
    }, [checkCouponData, checkCouponError]);

    useEffect(() => {
        if (!isOrderLoading && orderData) {
            toggleModel();
            const options = {
                description: 'Credits towards Buying RK streaming App',
                image: 'https://i.imgur.com/3g7nmJC.png',
                currency: 'INR',
                key: 'rzp_test_WuUA5MnbHJiAdL', // Your api key
                name: 'foo',
                prefill: {
                    email: userData?.data?.email,
                    contact: userData?.data?.phone,
                    name: userData?.data?.firstName + ' ' + userData?.data?.lastName,
                },
                order_id: orderData?.data?.subscription?.orderId,
                theme: { background: '#102A8B' },
            };
            RazorpayCheckout.open(options)
                .then((data) => {
                    // handle success

                    paymentSuccessHandler(data);
                    // alert(`Success: ${data.razorpay_payment_id}`);
                })
                .catch((error) => {
                    // handle failure
                    console.log(error);
                    paymentFailedHandler({ order_id: orderData?.data?.subscription?.orderId });
                    alert(`${error.description}`);
                });
        }
    }, [orderData]);

    useEffect(() => {
        if (orderError) {
            console.log({ orderError });
            Snackbar.show({ text: orderError?.data?.message, backgroundColor: '#FFF', textColor: COLORS.angry });
        }
    }, [orderError]);

    useEffect(() => {
        if (!isPaymentSuccessLoading && paymentSuccessData) {
            navigateAndSimpleReset('HomeNavigator');
            // navigateAndReplace('HomeNavigator', { screen: 'Player' });
        }
    }, [isPaymentSuccessLoading, paymentSuccessData]);

    const handleCouponChange = (newCode) => {
        setNewCouponCode(newCode);
    };

    const handleApplyNewCoupon = () => {
        Keyboard.dismiss();
        bottomSheetRef.current?.close();
        if (newCouponCode && newCouponCode.length > 0) {
            checkCoupon(newCouponCode);
        }
    };

    const handleNext = () => {
        requestOrderId({ subjectPlanId: subjectPlanId, couponCode: couponCode });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <AuthHeader />
            {isPaymentSuccessLoading || isSubjectLoading || isCoupneLoading ? (
                <Loading />
            ) : (
                <>
                    <Modal
                        transparent={true}
                        style={{
                            width: SIZES.width,
                            height: SIZES.height,
                            alignItems: 'center',
                            flex: 1,
                            justifyContent: 'center',
                            backgroundColor: '#000',
                        }}
                        visible={showTermsModel}
                    >
                        <Pressable
                            onPress={toggleModel}
                            style={{
                                width: SIZES.width,
                                height: SIZES.height,
                                backgroundColor: 'rgba(0,0,0,0.7)',
                                alignItems: 'center',
                                // flex: 1,
                                justifyContent: 'center',
                            }}
                        >
                            <View
                                style={{
                                    width: SIZES.width * 0.9,
                                    // height: SIZES.height * 0.5,
                                    backgroundColor: '#fff',
                                    alignItems: 'center',
                                    // flex: 1,
                                    justifyContent: 'center',
                                    borderRadius: 12,
                                    padding: 20,
                                }}
                            >
                                <Text style={{ ...FONTS.h5, marginBottom: 12 }}>Disclaimer Terms and Conditions</Text>
                                <Text>
                                    • Content of the application are subject to Copyright.{'\n'}• Clarity of video is
                                    Hd. still it is dependent on your internet service. {'\n'}• Videos are not
                                    downloadable and sharable. Screenshot and screen recording will not be allowed.{' '}
                                    {'\n'}• Once log in with one id in a particular device, same id will not work for
                                    another device. once subscribed anyhow it is not refundable. {'\n'}• Due to any
                                    reason if you want to change device then need to inform us about to change device.
                                    Once in a 12 months will be allowed to change. second time anyhow change in device
                                    will not be allowed subscription time period is 12 months starting from May to
                                    April. {'\n'}• subscription will be ended in the month month of April irrespective
                                    of the date of your subscription taken.
                                </Text>
                                <PrimaryButton
                                    isLoading={isOrderLoading}
                                    OnPress={() => handleNext()}
                                    InputText="Accept"
                                />
                            </View>
                        </Pressable>
                    </Modal>
                    <BottomSheet
                        enableHandlePanningGesture
                        enablePanDownToClose={true}
                        // backgroundStyle={{ backgroundColor: 'green' }}
                        style={{
                            zIndex: 100,
                            backgroundColor: '#FFF',
                            shadowColor: '#333',
                            shadowOffset: { height: -10 },
                            shadowOpacity: 0.2,
                            elevation: 30,
                            paddingHorizontal: 12,
                        }}
                        containerStyle={{ zIndex: 100 }}
                        ref={bottomSheetRef}
                        index={-1}
                        snapPoints={snapPoints}
                        // onChange={handleSheetChanges}
                    >
                        <View style={styles.contentContainer}>
                            <View style={styles.coupneInputContaier}>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        onFocus={() => {
                                            bottomSheetRef.current?.snapToIndex(1);
                                        }}
                                        onBlur={() => {
                                            bottomSheetRef.current?.snapToIndex(-1);
                                        }}
                                        onChangeText={handleCouponChange}
                                        placeholderTextColor={'#B8C0C9'}
                                        style={styles.input}
                                        placeholder={'Enter coupne'}
                                        // {...props}
                                    />
                                </View>
                                <Pressable onPress={handleApplyNewCoupon}>
                                    <Text style={[FONTS.h7, { color: '#2A368A' }]}>Apply</Text>
                                </Pressable>
                            </View>

                            <View>
                                {coupneList?.data[0]?.map((data) => (
                                    <CoupneCard
                                        handleApplyCoupon={handleApplyCoupon}
                                        setCouponCode={setCouponCode}
                                        couponCode={data.couponCode}
                                        couponName={data.couponName}
                                        couponType={data.couponType}
                                        discount={data.discount}
                                        key={data?.id}
                                        id={data?.id}
                                    />
                                ))}
                            </View>
                        </View>
                    </BottomSheet>
                    <View style={{ flex: 1, padding: 12 }}>
                        <View style={{ width: '100%', alignItems: 'flex-end' }}>
                            <Pressable
                                onPress={() => {
                                    bottomSheetRef.current?.expand();
                                }}
                                style={{
                                    marginBottom: 24,
                                    width: 170,
                                    flexDirection: 'row',
                                    // justifyContent: 'flex-end',
                                    borderColor: '#2A368A',
                                    borderWidth: 0.5,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 6,
                                    borderRadius: 6,
                                    backgroundColor: '#edefff',
                                }}
                            >
                                <Discount width={20} height={20} />
                                <Text style={{ ...FONTS.h5, color: '#2A368A', marginLeft: 6 }}>Apply Coupne</Text>
                            </Pressable>
                        </View>

                        <View
                            style={{
                                ...styles.discountRow,
                            }}
                        >
                            <Text style={{ ...FONTS.h5, textAlign: 'center', color: '#2A368A' }}>Subject</Text>
                            <Text style={{ ...FONTS.h5, textAlign: 'center', color: '#2A368A' }}>Fees</Text>
                        </View>
                        {subscribedPlans?.map((item) => (
                            <View
                                style={{
                                    ...styles.discountRow,
                                }}
                                key={item?.id}
                            >
                                <Text style={{ ...FONTS.body6, textAlign: 'center' }}>{item?.name}</Text>
                                <Text style={{ ...FONTS.body6, textAlign: 'center' }}>₹{item?.fees}</Text>
                            </View>
                        ))}

                        <View
                            style={{
                                ...styles.discountRow,
                                borderTopColor: '#000',
                                borderTopWidth: 1,
                                paddingTop: 12,
                            }}
                        >
                            <Text style={{ ...FONTS.body6, textAlign: 'center', color: '#333' }}>Order Total</Text>
                            <Text style={{ ...FONTS.body6, textAlign: 'center', color: '#333' }}>₹{total}</Text>
                        </View>
                        {parseFloat(discountAmount) > 0 && (
                            <>
                                <View
                                    style={{
                                        ...styles.discountRow,
                                    }}
                                >
                                    <Text style={{ ...FONTS.h6, textAlign: 'center', color: '#F04F4F' }}>Discount</Text>
                                    <Text style={{ ...FONTS.h6, textAlign: 'center', color: '#F04F4F' }}>
                                        -₹{discountAmount}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        ...styles.discountRow,
                                    }}
                                >
                                    <Text style={{ ...FONTS.h6, textAlign: 'center', color: '#2A368A' }}>
                                        Net Total
                                    </Text>
                                    <Text style={{ ...FONTS.h6, textAlign: 'center', color: '#2A368A' }}>
                                        ₹{netTotal}
                                    </Text>
                                </View>
                            </>
                        )}

                        <PrimaryButton
                            // disabled={!isPrivacy}
                            isLoading={isOrderLoading}
                            InputText="Next"
                            OnPress={toggleModel}
                            // OnPress={() => handleNext()}
                        />
                    </View>
                </>
            )}
        </SafeAreaView>
    );
};

export default SubscriptionDetail;

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        // backgroundColor: 'red',
        zIndex: 100,
        // padding: 12,
    },
    inputContainer: {
        // width: '100%',
        // height: 55,
        marginVertical: 8,
        // paddingHorizontal: 12,
        backgroundColor: '#F6F7FB',
        borderRadius: 8,
        // width: '80%',
        paddingHorizontal: 12,
        flex: 1,
        marginRight: 12,
    },
    input: {
        height: 55,
        color: '#404B63',
    },
    coupneInputContaier: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    discountRow: {
        marginBottom: 12,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
