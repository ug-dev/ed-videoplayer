import Chat from '../Models/Chat';
import User from '../Models/User';
import { Config } from './api.config';
import SimpleInterface, { BaseInterface } from './SimpleInterface';

export default {
    init(opts: Config) {
        const client: BaseInterface = SimpleInterface.init(opts);
        return {
            user: User(client),
            chat: Chat(client),
        };
    },
};
