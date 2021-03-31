import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { GetUserDataAction, SetUserDataAction, UserActions } from '../actions/ngrx-app.action';
import { Action } from '@ngrx/store';
import { switchMap, map } from 'rxjs/operators';
import { DataService } from '../services/data/data.service';
import { IUserData } from '../interfaces/ngrx-app.interface';

@Injectable()
export class NgrxAppEffects {
    @Effect()
    public fetchData$: Observable<Action | {}> = this.actions$.pipe(
        ofType<GetUserDataAction>(UserActions.GetUserData),
        switchMap(() => {
            return this.dataService.getUserData().pipe(
                map((resp: IUserData) => new SetUserDataAction(resp))
            );
        }));

    constructor(private actions$: Actions,
            private dataService: DataService) {}
}
