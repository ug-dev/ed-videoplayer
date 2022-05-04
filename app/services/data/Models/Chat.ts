import { BaseInterface } from '../SDK/SimpleInterface';

export default (Base: BaseInterface) => {
    return {
        getContacts(data) {
            return Base.create('/user/get-available-contacts', data);
        },
        getUserChat(data: object) {
            return Base.create('/user/get-messages', data);
        },
        getConversations() {
            return Base.detail('/user/get-conversations');
        },
    };
};
