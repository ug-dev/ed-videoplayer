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
    };
};
