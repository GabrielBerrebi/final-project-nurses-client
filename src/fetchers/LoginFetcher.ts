import {User} from '../models/interfaces/User';
import {UserFromLogin} from '../models/interfaces/UserFromLogin';
import URLConstants from './URLConstants';

export class LoginFetcher {
    async login(user: User) {
        try {
            const response = await URLConstants.axiosBase.post(URLConstants.loginURL, {...user});
            return {
                status: response.status,
                data: response?.data as UserFromLogin
            }
        } catch (e) {
            throw e;
        }
    }

    async logout() {
        await URLConstants.axiosBase.get(URLConstants.logoutURL);
    }
}
