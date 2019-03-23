import { MyGoalsModule } from './my-goals.module';

describe('MyGoalsModule', () => {
  let myGoalsModule: MyGoalsModule;

  beforeEach(() => {
    myGoalsModule = new MyGoalsModule();
  });

  it('should create an instance', () => {
    expect(myGoalsModule).toBeTruthy();
  });
});
