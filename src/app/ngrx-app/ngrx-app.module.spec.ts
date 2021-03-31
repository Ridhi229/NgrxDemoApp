import { NgrxAppModule } from './ngrx-app.module';

describe('NgrxAppModule', () => {
  let ngrxAppModule: NgrxAppModule;

  beforeEach(() => {
    ngrxAppModule = new NgrxAppModule();
  });

  it('should create an instance', () => {
    expect(ngrxAppModule).toBeTruthy();
  });
});
