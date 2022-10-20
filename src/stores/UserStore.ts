import {makeAutoObservable} from 'mobx';
import {Role} from '../models/enums/Role';
import {UserFromLogin} from '../models/interfaces/UserFromLogin';

export class UserStore {
    private _id: string = '';
    private _isAuthenticated: boolean = false;
    private _role: Role = Role.EMPTY;

    constructor() {
        makeAutoObservable(this);
    }

    getId() {
        return this._id;
    }

    getIsAuthenticated() {
        return this._isAuthenticated;
    }

    getRole() {
       return this._role;
    }

    setUser(user: UserFromLogin) {
        this._setId(user.id.toString());
        this._setRole(user.role);
        this._setIsAuthenticated(true);
    }

    removeUser() {
        this._role = Role.EMPTY;
        this._setIsAuthenticated(false);
    }

    private _setId(id: string) {
        this._id = id;
    }

    private _setRole(role: Role) {
        this._role = role;
    }

    private _setIsAuthenticated(isAuthenticated: boolean) {
        this._isAuthenticated = isAuthenticated;
    }
}
