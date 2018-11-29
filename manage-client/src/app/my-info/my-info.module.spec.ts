import { MyInfoModule } from './my-info.module';

describe('MyInfoModule', () => {
  let myInfoModule: MyInfoModule;

  beforeEach(() => {
    myInfoModule = new MyInfoModule();
  });

  it('should create an instance', () => {
    expect(myInfoModule).toBeTruthy();
  });
});
