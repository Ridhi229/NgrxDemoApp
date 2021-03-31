import { IUserData, IState } from '../interfaces/ngrx-app.interface';
import { AllUserActions, UserActions } from '../actions/ngrx-app.action';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export function userReducer(state: IUserData, action: AllUserActions): IUserData {
    switch (action.type) {
        case UserActions.GetUserData:
            state = null;
            break;
        case UserActions.SetUserData:
             state = action.payload;
             break;
        case UserActions.SetUserAge:
            state = {
                ...state,
                age: action.payload
            };
            break;
    }
    return state;
}

export const appReducer: ActionReducerMap<IState> = {
    user: userReducer
};


export const getAppState = createFeatureSelector<IState>('appState');

export const getAge = createSelector(
    getAppState,
    (state: IState) =>  state && state.user ? state.user.age : null
);
