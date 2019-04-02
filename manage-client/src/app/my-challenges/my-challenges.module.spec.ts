import { MyChallengesModule } from './my-challenges.module';

describe('MyChallengesModule', () => {
  let myChallengesModule: MyChallengesModule;

  beforeEach(() => {
    myChallengesModule = new MyChallengesModule();
  });

  it('should create an instance', () => {
    expect(myChallengesModule).toBeTruthy();
  });
});
