import axios from 'axios';
import {User} from '../models/interfaces/User';
import {UserFromLogin} from '../models/interfaces/UserFromLogin';

export class LoginFetcher {
    private readonly _baseURL: string = 'https://backend-app-nurse.herokuapp.com/api/auth/';
    private readonly _loginURL: string = 'login/';
    private readonly _logoutURL: string = 'logout/';
    private readonly _axios = axios.create({
        baseURL: this._baseURL,
    })

    async login(user: User) {
        try {
            const response = await this._axios.post(this._loginURL, {...user});
            return {
                status: response.status,
                data: response?.data as UserFromLogin
            }
        } catch (e) {
            return {status: 400, data: null};
        }
    }

    async logout() {
        await this._axios.get(this._logoutURL);
    }
}
