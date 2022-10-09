import {makeAutoObservable} from 'mobx';
import {Role} from '../models/enums/Role';
import {UserFromLogin} from '../models/interfaces/UserFromLogin';

export class UserStore {
    private _id: string = '';
    private _isAuthenticated: boolean = false;
    private _role: Role = Role.STUDENT;

    constructor() {
        makeAutoObservable(this);
    }

    setUser(user: UserFromLogin) {
        this._setId(user.id.toString());
        this._setRole(user.role);
        this._isAuthenticated = true;
    }

    getIsAuthenticated() {
        return this._isAuthenticated;
    }

    getRole() {
        return this._role;
    }

    removeUser() {
        this._isAuthenticated = false;
    }

    private _setId(id: string) {
        this._id = id;
    }

    private _setRole(role: Role) {
        this._role = role;
    }
}
