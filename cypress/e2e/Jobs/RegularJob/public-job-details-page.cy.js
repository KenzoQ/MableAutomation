import faker from 'faker/locale/en_AU';

describe('Public job details page', () => {
  const cocoClientEmail = 'automation_coco.regularjob+client@donotuse.com.au';
  const andreaClientEmail = 'automation_andrea.jobshare+client@donotuse.com.au';
  const defaultPass = 'qaAutomation2021';

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it(`1. ES-T1442 - Client contacts the support worker from worker recommendation tile - with existing conversation
    2. ES-T1436 - Verify if the correct label on the worker recommendation section is correctly displayed
    3. ES-T1438 - Check the button in worker recommendation tile
    4. ES-T1439 - Client checks worker profile from Worker recommendation tile
    5. ES-T1466 - Check workers matching
    6. ES-T1435 - Client checks the worker recommendation`, () => {
    cy
      .log('Login as client')
      .loginToDashboard(cocoClientEmail, defaultPass)

      .log('Navigate Job and check')
      .navigateAJobAndContactWorkerRecommendationTile(0)

      .verifyElementVisible('app-inbox');
  });

  it('ES-T1440 - Client contacts the support worker from worker recommendation tile - no conversation', () => {
    cy
      .log('Login as client')
      .loginToDashboard(andreaClientEmail, defaultPass)

      .log('Navigate Job and check')
      .navigateAJobAndContactWorkerRecommendationTile(0)

      .verifyTextVisible('Conversation starter');
  });

  it(`1. ES-T2385 - Client clicks the image of the support worker from the replies section 
    2. ES-T2378 - Client checks the replies from a worker
    3. ES-T2379 - Client checks replies label in job list page`, () => {
    cy
      .log('Login as client')
      .loginToDashboard(andreaClientEmail, defaultPass)

      .log('Navigate Job and check')
      .viewAReplyRegularJob(0);
  });

  it('ES-T1437 - View support worker\'s profile from worker recommendation tile in "Job details" page', () => {
    cy
      .log('Login as client')
      .loginToDashboard(andreaClientEmail, defaultPass)

      .log('Navigate Job and check')
      .navigateAJobAndViewProfileWorkerRecommendationTile(0);
  });

  it('ES-T1446 - Worker recommendation in lastminute job', () => {
    const jobTitle = faker.name.jobTitle();
    const jobLocation = 'Sandy Beach NSW 2456';
    const postCode = '36094';
    cy.log('Precondition: Create a LMJ')
      .createLastMinuteJob(
        andreaClientEmail,
        defaultPass,
        jobTitle,
        postCode,
        jobLocation,
      );
    cy
      .log('Login as client')
      .loginToDashboard(andreaClientEmail, defaultPass)

      .log('Navigate Job and check')
      .navigateALMJAndCheckRecommendationTile(0);
  });

  it('ES-T2384 - Client clicks view profile link in replies section in job details page', () => {
    cy
      .log('Login as client')
      .loginToDashboard(andreaClientEmail, defaultPass)

      .log('Navigate Job and check')
      .viewAReplyRegularJobAndViewProfile(0);
  });
});
