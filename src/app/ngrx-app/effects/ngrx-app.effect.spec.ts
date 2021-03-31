import { NgrxAppEffects } from './ngrx-app.effect';
import { UserActions, GetUserDataAction, SetUserDataAction } from '../actions/ngrx-app.action';
import { DataService } from '../services/data/data.service';
import { async, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { hot, cold } from 'jasmine-marbles';
import { provideMockActions } from '@ngrx/effects/testing';
import { IUserData } from '../interfaces/ngrx-app.interface';

const userData = {name: 'test', age: 30};

class MockDataService {
    public getUserData(data: string): Observable<IUserData> {
        return of(userData);
    }
}


describe('NgrxAppEffects', () => {
    let effects: NgrxAppEffects;
    let actions: Observable<Actions>;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        providers: [
        NgrxAppEffects,
          {
            provide: DataService, useClass: MockDataService
          },
          provideMockActions(() => actions)
        ]
      });
    }));

    beforeEach(() => {
      effects = TestBed.get(NgrxAppEffects);
    });

    it('should call fetch the data from service and set it in state', () => {
        const action = new GetUserDataAction();
        const completion = new SetUserDataAction(userData);
        actions = hot('-a-', { a: action });
        const expected = cold('-b', { b: completion });
        expect(effects.fetchData$).toBeObservable(expected);
    });

});
