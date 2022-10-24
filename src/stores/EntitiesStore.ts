import {makeAutoObservable} from 'mobx';

export class EntitiesStore {
    constructor() {
        makeAutoObservable(this);
    }
}
