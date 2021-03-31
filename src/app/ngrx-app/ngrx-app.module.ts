import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgrxTestComponent } from './components/ngrx-test/ngrx-test.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './reducers/ngrx-app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DataService } from './services/data/data.service';
import { NgrxAppEffects } from './effects/ngrx-app.effect';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([NgrxAppEffects]),
    StoreModule.forFeature('appState', appReducer)
  ],
  declarations: [NgrxTestComponent],
  exports: [NgrxTestComponent],
  providers: [DataService]
})
export class NgrxAppModule { }
