import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxTestComponent } from './ngrx-test.component';

describe('NgrxTestComponent', () => {
  let component: NgrxTestComponent;
  let fixture: ComponentFixture<NgrxTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgrxTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgrxTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
