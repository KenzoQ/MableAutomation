import faker from 'faker/locale/en_AU';

describe('Mark job as filled (Additional)', () => {
  const cocoClientEmail = 'automation_coco.regularjob+client@donotuse.com.au';
  const filledClientEmail = 'automation_filledregjob+client@donotuse.com.au';
  const defaultPass = 'qaAutomation2021';
  const workerName = 'Wilfredo';

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it('ES-T1830 - Client fills a regular job in job details page - first option was selected', () => {
    const jobTitle = faker.name.jobTitle();
    cy
      .log('Login as client')
      .loginToDashboard(cocoClientEmail, defaultPass)

      .createRegularJobByAPI(cocoClientEmail, defaultPass, jobTitle)

      .markAsFilledAJobDetailThenSelectOption(0);
  });

  it('ES-T1831 - Client fills a regular job in job details page - second option was selected', () => {
    const jobTitle = faker.name.jobTitle();
    cy
      .log('Login as client')
      .loginToDashboard(cocoClientEmail, defaultPass)

      .createRegularJobByAPI(cocoClientEmail, defaultPass, jobTitle)

      .markAsFilledAJobDetailThenSelectOption(1);
  });

  it('ES-T1833 - Client fills a regular job in job details page - third option was selected', () => {
    const jobTitle = faker.name.jobTitle();
    cy
      .log('Login as client')
      .loginToDashboard(cocoClientEmail, defaultPass)

      .createRegularJobByAPI(cocoClientEmail, defaultPass, jobTitle)

      .markAsFilledAJobDetailThenSelectOption(2);
  });

  it('ES-T1835 - Client fills a regular job in job details page - None of the options were selected', () => {
    const jobTitle = faker.name.jobTitle();
    cy
      .log('Login as client')
      .loginToDashboard(cocoClientEmail, defaultPass)

      .createRegularJobByAPI(cocoClientEmail, defaultPass, jobTitle).then(($job) => {
        cy
          .markAsFilledAJobDetailThenNoOption()

          .cancelJob($job.body.data.id, cocoClientEmail, defaultPass);
      });
  });

  it('ES-T1836 - Client fills a regular job in job details page - close button was clicked', () => {
    const jobTitle = faker.name.jobTitle();
    cy
      .log('Login as client')
      .loginToDashboard(cocoClientEmail, defaultPass)

      .createRegularJobByAPI(cocoClientEmail, defaultPass, jobTitle).then(($job) => {
        cy
          .markAsFilledAJobDetailThenNoOption(false)

          .verifyTextNotExist('How did you fill it')

          .cancelJob($job.body.data.id, cocoClientEmail, defaultPass);
      });
  });

  it('ES-T1860 - Client fills a regular job in jobs page -first option was selected', () => {
    const jobTitle = faker.name.jobTitle();
    cy
      .log('Login as client')
      .loginToDashboard(cocoClientEmail, defaultPass)

      .createRegularJobByAPI(cocoClientEmail, defaultPass, jobTitle)

      .markAsFilledFirstJobThenSelectOption(0);
  });

  it('ES-T1862 - Client fills a regular job in jobs page -second option was selected', () => {
    const jobTitle = faker.name.jobTitle();
    cy
      .log('Login as client')
      .loginToDashboard(cocoClientEmail, defaultPass)

      .createRegularJobByAPI(cocoClientEmail, defaultPass, jobTitle)

      .markAsFilledFirstJobThenSelectOption(1);
  });

  it('ES-T1865 - Client fills a regular job in jobs page -third option was selected', () => {
    const jobTitle = faker.name.jobTitle();
    cy
      .log('Login as client')
      .loginToDashboard(cocoClientEmail, defaultPass)

      .createRegularJobByAPI(cocoClientEmail, defaultPass, jobTitle)

      .markAsFilledFirstJobThenSelectOption(2);
  });

  it('ES-T1887 - Client fills a regular job in jobs page - none of the options were selected', () => {
    const jobTitle = faker.name.jobTitle();
    cy
      .log('Login as client')
      .loginToDashboard(cocoClientEmail, defaultPass)

      .createRegularJobByAPI(cocoClientEmail, defaultPass, jobTitle).then(($job) => {
        cy
          .markAsFilledFirstJobThenNoOption()

          .cancelJob($job.body.data.id, cocoClientEmail, defaultPass);
      });
  });

  it('ES-T1953 - Client fills a regular job in jobs page - close button was clicked', () => {
    const jobTitle = faker.name.jobTitle();
    cy
      .log('Login as client')
      .loginToDashboard(cocoClientEmail, defaultPass)

      .createRegularJobByAPI(cocoClientEmail, defaultPass, jobTitle).then(($job) => {
        cy
          .markAsFilledFirstJobThenNoOption(false)

          .cancelJob($job.body.data.id, cocoClientEmail, defaultPass);
      });
  });

  it('ES-T1959 - Check job filled UI will be displayed when marking job as filled in jobs page', () => {
    const jobTitle = faker.name.jobTitle();
    cy
      .log('Login as client')
      .loginToDashboard(cocoClientEmail, defaultPass)

      .createRegularJobByAPI(cocoClientEmail, defaultPass, jobTitle).then(($job) => {
        cy
          .verifyHowDidYouFillPromptInJobPage()
          .cancelJob($job.body.data.id, cocoClientEmail, defaultPass);
      });
  });

  it('ES-T1960 - Check job filled UI will be displayed when marking job as filled in job details page', () => {
    const jobTitle = faker.name.jobTitle();
    cy
      .log('Login as client')
      .loginToDashboard(cocoClientEmail, defaultPass)

      .createRegularJobByAPI(cocoClientEmail, defaultPass, jobTitle).then(($job) => {
        cy
          .verifyHowDidYouFillPromptInJobDetails()
          .cancelJob($job.body.data.id, cocoClientEmail, defaultPass);
      });
  });

  it('ES-T1771 - All open regular jobs was filled - BANNER SHOULD NOT BE DISPLAYED', () => {
    cy
      .log('Login as client')
      .loginToDashboard(filledClientEmail, defaultPass)

      .navigateByLeftMenuInDashboard('Inbox')

      .url()
      .should('include', '/inbox')

      .clickElementOnText('.channelContent .title', workerName)

      .verifyTextNotExist('sharing')
      .verifyElementNotExist('div.banner');
  });
});
