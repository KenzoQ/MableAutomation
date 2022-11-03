import faker from 'faker/locale/en_AU';

describe('Cancel regular job (Additional)', () => {
  const cocoClientEmail = 'automation_coco.regularjob+client@donotuse.com.au';
  const defaultPass = 'qaAutomation2021';

  const cancelledClientEmail = 'automation_cancelregjob+client@donotuse.com.au';

  // const closeBannerClientEmail = 'automation_closebanner+client@donotuse.com.au';
  const workerName = 'Rodrick';

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it('ES-T1806 - Client cancels regular job in jobs page - first option selected', () => {
    const jobTitle = faker.name.jobTitle();
    cy
      .log('Login as client')
      .loginToDashboard(cocoClientEmail, defaultPass)

      .createRegularJobByAPI(cocoClientEmail, defaultPass, jobTitle)

      .cancelFirstJobThenSelectOption(0);
  });

  it('ES-T1807 - Client cancels regular job in jobs page - second option selected', () => {
    const jobTitle = faker.name.jobTitle();
    cy
      .log('Login as client')
      .loginToDashboard(cocoClientEmail, defaultPass)

      .createRegularJobByAPI(cocoClientEmail, defaultPass, jobTitle)

      .cancelFirstJobThenSelectOption(1);
  });

  it('ES-T1809 - Client cancels regular job in jobs page - third option selected', () => {
    const jobTitle = faker.name.jobTitle();
    cy
      .log('Login as client')
      .loginToDashboard(cocoClientEmail, defaultPass)

      .createRegularJobByAPI(cocoClientEmail, defaultPass, jobTitle)

      .cancelFirstJobThenSelectOption(2);
  });

  it('ES-T1810 - Client cancels regular job in jobs page - fourth option selected', () => {
    const jobTitle = faker.name.jobTitle();
    cy
      .log('Login as client')
      .loginToDashboard(cocoClientEmail, defaultPass)

      .createRegularJobByAPI(cocoClientEmail, defaultPass, jobTitle)

      .cancelFirstJobThenSelectOption(3);
  });

  it('ES-T1812 - Client cancels a regular job in jobs page - none of the options were selected', () => {
    const jobTitle = faker.name.jobTitle();
    cy
      .log('Login as client')
      .loginToDashboard(cocoClientEmail, defaultPass)
      .createRegularJobByAPI(cocoClientEmail, defaultPass, jobTitle).then(($job) => {
        cy
          .cancelFirstJobThenNoOption(true)
          .cancelJob($job.body.data.id, cocoClientEmail, defaultPass);
      });
  });

  it(`ES-T1961 - Client cancels job in jobs page
      ES-T1813 - Client click close button in job cancellation prompt - from jobs page`, () => {
    const jobTitle = faker.name.jobTitle();
    cy
      .log('Login as client')
      .loginToDashboard(cocoClientEmail, defaultPass)
      .createRegularJobByAPI(cocoClientEmail, defaultPass, jobTitle).then(($job) => {
        cy
          .cancelFirstJobThenNoOption(false)
          .cancelJob($job.body.data.id, cocoClientEmail, defaultPass);
      });
  });

  it('ES-T1829 - Client cancels private job - close button was clicked', () => {
    cy
      .log('Login as client')
      .loginToDashboard(cocoClientEmail, defaultPass)
      .createPJOnlyDes2ByAPI(cocoClientEmail, defaultPass).then(($job) => {
        cy
          .cancelFirstPrivateJobThenNoOption(false, 0)
          .cancelJob($job.body.data.id, cocoClientEmail, defaultPass);
      });
  });

  it(`ES-T1962 - Client cancels job in job details page
          ES-T1819 - Client cancels a regular job in job detail page - close button was clicked`, () => {
    const jobTitle = faker.name.jobTitle();
    cy
      .log('Login as client')
      .loginToDashboard(cocoClientEmail, defaultPass)
      .createRegularJobByAPI(cocoClientEmail, defaultPass, jobTitle).then(($job) => {
        cy
          .cancelFirstJobDetailThenNoOption(false)
          .cancelJob($job.body.data.id, cocoClientEmail, defaultPass);
      });
  });

  it('ES-T1818 - Client cancels a regular job in job detail page - close button was clicked', () => {
    const jobTitle = faker.name.jobTitle();
    cy
      .log('Login as client')
      .loginToDashboard(cocoClientEmail, defaultPass)
      .createRegularJobByAPI(cocoClientEmail, defaultPass, jobTitle).then(($job) => {
        cy
          .cancelFirstJobDetailThenNoOption(true)
          .cancelJob($job.body.data.id, cocoClientEmail, defaultPass);
      });
  });

  it('ES-T1814 - Client cancels a regular job in job details page - first option was selected', () => {
    const jobTitle = faker.name.jobTitle();
    cy
      .log('Login as client')
      .loginToDashboard(cocoClientEmail, defaultPass)
      .createRegularJobByAPI(cocoClientEmail, defaultPass, jobTitle)
      .cancelFirstJobDetailThenSelectOption(0);
  });

  it('ES-T1815 - Client cancels a regular job in job details page - second option was selected', () => {
    const jobTitle = faker.name.jobTitle();
    cy
      .log('Login as client')
      .loginToDashboard(cocoClientEmail, defaultPass)
      .createRegularJobByAPI(cocoClientEmail, defaultPass, jobTitle)
      .cancelFirstJobDetailThenSelectOption(1);
  });

  it('ES-T1816 - Client cancels a regular job in job details page - third option was selected', () => {
    const jobTitle = faker.name.jobTitle();
    cy
      .log('Login as client')
      .loginToDashboard(cocoClientEmail, defaultPass)
      .createRegularJobByAPI(cocoClientEmail, defaultPass, jobTitle)
      .cancelFirstJobDetailThenSelectOption(2);
  });

  it('ES-T1817 - Client cancels a regular job in job details page - fourth option was selected', () => {
    const jobTitle = faker.name.jobTitle();
    cy
      .log('Login as client')
      .loginToDashboard(cocoClientEmail, defaultPass)
      .createRegularJobByAPI(cocoClientEmail, defaultPass, jobTitle)
      .cancelFirstJobDetailThenSelectOption(3);
  });

  it('ES-T1772 - Client cancels all open regular job - BANNER WILL NOT BE DISPLAYED', () => {
    cy
      .log('Login as client')
      .loginToDashboard(cancelledClientEmail, defaultPass)

      .navigateByLeftMenuInDashboard('Inbox')

      .url()
      .should('include', '/inbox')

      .clickElementOnText('.channelContent .title', 'Wilf')

      .verifyTextNotExist('Send your recent job description?')
      .verifyElementNotExist('#supportDescriptionBanner');
  });

  it('ES-T1773 - Client has closed the job share banner and navigated to other pages and navigated back to conversation page - BANNER SHOULD BE DISPLAYED', () => {
    cy
      .log('Login as client')
      .loginToDashboard(cocoClientEmail, defaultPass)

      .navigateByLeftMenuInDashboard('Inbox')

      .url()
      .should('include', '/inbox')

      .clickElementOnText('.channelContent .title', workerName)

      .verifyElementVisible('#supportDescriptionBanner')
      .verifyTextVisible('Send your recent job description?')

      .clickElement('app-icon.close', true)
      .verifyTextNotExist('Send your recent job description?')
      .verifyElementNotExist('#supportDescriptionBanner')

      .navigateByLeftMenuInDashboard('Dashboard')

      .navigateByLeftMenuInDashboard('Inbox')

      .url()
      .should('include', '/inbox')

      .clickElementOnText('.channelContent .title', workerName)

      .verifyElementVisible('#supportDescriptionBanner')
      .verifyTextVisible('Send your recent job description?');
  });
});
