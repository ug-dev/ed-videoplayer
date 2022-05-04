import { BaseInterface } from '../SDK/SimpleInterface';

export interface RequestOtpData {
    phone: string;
    hash: string;
    otp: string;
}

export default (Base: BaseInterface) => {
    return {
        login(data: RequestOtpData) {
            const dataFinal = { phone: data?.phone };
            return Base.create('/user/send-otp', dataFinal);
        },
        verifyOtp(data: RequestOtpData) {
            const dataFinal = { ...data, phone: data?.phone };
            return Base.create('/user/verify-otp', dataFinal);
        },
        completeUserProfile(data: RequestOtpData) {
            return Base.create('/user/activate', data);
        },
        getAuth() {
            return Base.detail('/user/auth');
        },
        logoutUser(data) {
            return Base.create('/user/logout', data);
        },
    };
};
