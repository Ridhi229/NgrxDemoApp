import { Action } from '@ngrx/store';
import { IUserData } from '../interfaces/ngrx-app.interface';

export enum UserActions {
    GetUserData = '[User]GetUserData',
    SetUserData = '[User]SetUserData',
    SetUserAge = '[User]SetUserAge'
}

export class GetUserDataAction implements Action {
    public readonly type: UserActions = UserActions.GetUserData;
    constructor(public payload = null) { }
}

export class SetUserDataAction implements Action {
    public readonly type: UserActions = UserActions.SetUserData;
    constructor(public payload: IUserData) { }
}

export class SetUserAgeAction implements Action {
    public readonly type: UserActions = UserActions.SetUserAge;
    constructor(public payload: number) { }
}

export type AllUserActions = GetUserDataAction | SetUserDataAction | SetUserAgeAction;
