import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUserData, IState } from '../../interfaces/ngrx-app.interface';
import { Store } from '@ngrx/store';
import { GetUserDataAction, SetUserAgeAction } from '../../actions/ngrx-app.action';
import { getAppState, getAge } from '../../reducers/ngrx-app.reducer';
import { filter, debounceTime, concatMap, mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-ngrx-test',
  templateUrl: './ngrx-test.component.html',
  styleUrls: ['./ngrx-test.component.css']
})
export class NgrxTestComponent implements OnInit, OnDestroy {
  public age$: Observable<number>;
  public data: IUserData;
  public testForm: FormGroup;

  private unsubscribe = new Subject<void>();
  constructor(private store: Store<IState>, private fb: FormBuilder, private dataService: DataService) { }

  public ngOnInit(): void {
    this.testForm = this.fb.group({
      age: [''],
      test1: [''],
      test2: [''],
      test3: ['']
    });
    this.age$ = this.store.select(getAge);
    this.store.select(getAppState).pipe(filter(state => !!(state && state.user)))
    .subscribe((state: IState) =>  {
      this.data = state.user;
    });

    this.store.dispatch(new GetUserDataAction());

    this.testForm.get('age').valueChanges.pipe(
      debounceTime(200),
      takeUntil(this.unsubscribe)
    ).subscribe((resp) => {
      this.store.dispatch(new SetUserAgeAction(resp));
    });

    this.testOperators();
  }

  private testOperators(): void {

    this.testForm.get('test1').valueChanges.pipe(
      takeUntil(this.unsubscribe),
      concatMap((value) =>
        this.dataService.saveData(value)
      )
    ).subscribe((resp) => {
    });

    this.testForm.get('test2').valueChanges.pipe(
      takeUntil(this.unsubscribe),
      mergeMap((value) =>
        this.dataService.saveData(value)
      )
    ).subscribe((resp) => {
    });
    this.testForm.get('test3').valueChanges.pipe(
      takeUntil(this.unsubscribe),
      switchMap((value) =>
        this.dataService.saveData(value)
      )
    ).subscribe((resp) => {
    });
  }


  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
