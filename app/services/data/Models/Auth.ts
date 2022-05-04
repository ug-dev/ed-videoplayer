import { BaseInterface } from '../SDK/SimpleInterface';

export default (Base: BaseInterface) => {
    return {
        getAuth(data) {
            return Base.create('/auth/request-op', data);
        },
    };
};
