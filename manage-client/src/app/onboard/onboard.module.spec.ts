import { OnboardModule } from './onboard.module';

describe('OnboardModule', () => {
  let onboardModule: OnboardModule;

  beforeEach(() => {
    onboardModule = new OnboardModule();
  });

  it('should create an instance', () => {
    expect(onboardModule).toBeTruthy();
  });
});
