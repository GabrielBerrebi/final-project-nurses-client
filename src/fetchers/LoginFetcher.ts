import axios from 'axios';
import {User} from '../models/interfaces/User';
import {UserFromLogin} from '../models/interfaces/UserFromLogin';

export class LoginFetcher {
    private readonly _baseURL: string = 'https://backend-app-nurse.herokuapp.com/api/auth/';
    private readonly _loginURL: string = 'login/';
    private readonly _logoutURL: string = 'logout/';

    async login(user: User) {
        try {
            const response = await axios.post(`${this._baseURL}${this._loginURL}`, {...user});
            return {
                status: response.status,
                data: response?.data as UserFromLogin
            }
        } catch (e) {
            return {status: 400, data: null};
        }
    }

    async logout() {
        await axios.get(`${this._baseURL}${this._logoutURL}`);
    }
}
