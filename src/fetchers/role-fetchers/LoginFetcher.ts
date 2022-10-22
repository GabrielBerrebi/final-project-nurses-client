import {User} from '../../models/interfaces/User';
import {UserFromLogin} from '../../models/interfaces/UserFromLogin';
import UrlServerConstants from '../urls/UrlServerConstants';

export class LoginFetcher {
    async login(user: User) {
        try {
            const response = await UrlServerConstants.axiosBase.post(UrlServerConstants.loginURL, {...user});
            return {
                status: response.status,
                data: response?.data as UserFromLogin
            }
        } catch (e) {
            throw e;
        }
    }

    async logout() {
        await UrlServerConstants.axiosBase.get(UrlServerConstants.logoutURL);
    }
}
