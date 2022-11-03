import * as data from '../../../fixtures/test-data.json';
import faker from 'faker/locale/en_AU';

describe('Post a regular job', () => {
  // const clientEmail = 'automation_richard.gutierrez.regularjob+client@donotuse.com.au';
  const cocoClientEmail = 'automation_coco.regularjob+client@donotuse.com.au';
  const clientPass = 'qaAutomation2021';
  const workerInbox = 'Rich M';
  // const postCode = '2148';
  const profaneList = ['FUCK',
    '',
    'fcuk',
    'fuk',
    'shit',
    'ass+(es)?',
    'asshol'];

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it(`1. ES-T527. Create regular job with particular days
      2. ES-T528. Check newly created regular job`, () => {
    const titleJob = faker.name.jobTitle();
    const email = 'automation_andrea.jobshare+client@donotuse.com.au';

    cy
      .log('Login as client')
      .loginToDashboard(email, clientPass)

      .log('Click "Post a job" on the left navigation')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Click "Post a job"')
      .clickElementOnText('.action button', 'Post a job')

      .log('Select Regular as type of job')
      .clickElementOnText('button span', 'Post standard job')

      .log('Create a new regular job')
      .createRegularJobWithParticularDaysV2(titleJob)

      // Check newly created regular job
      .log('Check job details page')
      .verifyElementContainsText('h2.header', titleJob)

      .log('Click "Post a job" on the left navigation')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Click the regular job having title')
      .clickElementOnText(data.regularJob.client.titleJob, titleJob)

      .log('Verify that job has status as Open')
      .verifyElementContainsText('.open span', 'Open');
  });

  it('ES-T529. Create regular job with flexible days', () => {
    const titleJob = faker.name.jobTitle();
    const email = 'automation_andrea.jobshare+client@donotuse.com.au';

    cy
      .log('Login as client')
      .loginToDashboard(email, clientPass)

      .log('Click "Post a job" on the left navigation')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Click "Post a job"')
      .clickElementOnText('.action button', 'Post a job')

      .log('Select Regular as type of job')
      .clickElementOnText('button span', 'Post standard job')

      .log('Create a new regular job')
      .createRegularJobWithFlexibleDaysV2(titleJob);
  });

  // outdated
  it('ES-T1750. Client posted a regular job after having a conversation with the client - BANNER WILL BE DISPLAYED', () => {
    cy
      .log('Login as client')
      .loginToDashboard(cocoClientEmail, clientPass)

      .log('Click "Post a job" on the left navigation')
      .navigateByLeftMenuInDashboard('Inbox')

      .log('Verify My conversations')
      .verifyElementVisible('app-inbox')

      .log(`Click worker: ${workerInbox}`)
      .clickElementOnText('.nameDateTimeContainer', workerInbox)

      .log('Verify App messages')
      .verifyElementVisible('app-messages')

      .log('Verify banner')
      .verifyElementVisible('div#supportDescriptionBanner')

      .log('Verify Send your recent job description?')
      .verifyTextVisible('Send your recent job description?');
  });

  // outdated
  it('ES-T1746. Check add support description in kebab menu', () => {
    cy
      .log('Login as client')
      .loginToDashboard(cocoClientEmail, clientPass)

      .log('Click "Post a job" on the left navigation')
      .navigateByLeftMenuInDashboard('Inbox')

      .log('Verify My conversations')
      .verifyElementVisible('app-inbox')

      .log('Click first worker inbox')
      .get('app-channel-item .title')
      .first()
      .click()

      .log('Verify App messages')
      .verifyElementVisible('app-messages')

      .log('Verify kebab menu')
      .clickElement('div#headerAction [name="more-vertical"]')
      .verifyTextVisible('Attach job description');
  });

  // outdated
  it('ES-T3319. Post a regular job with profane words', () => {
    const titleJob = faker.name.jobTitle();
    cy
      .log('Login as client')
      .loginToDashboard(cocoClientEmail, clientPass)

      .log('Click "Post a job" on the left navigation')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Click "Post a job"')
      .clickElementOnText('.action button', 'Post a job')

      .log('Select Regular as type of job')
      .clickElementOnText('button span', 'Post standard job')

      .log('Create a new regular job')

      .log('Enter the title job')
      .inputTextField(data.regularJob.client.titleJobInput, titleJob)

      .log('Select Frequency')
      .selectRadioOnPostAJob('Ongoing, after a trial period')

      .log('Click Scheduling')
      .verifyTextVisible('Which days and times suit you?')

      .selectDayAndTimeSuit()

      .log('Select Service')
      .selectCheckboxOnPostAJob('Companionship and social support')
      .selectCheckboxOnPostAJob(
        'Community participation, sports and activities',
      )
      .selectCheckboxOnPostAJob('Provide transport ')

      .log('Select Gender as Male')
      .selectDropdown(data.regularJob.client.genderSelect, 'Male')

      .checkProfaneWordListInStandardJob(profaneList);
  });
});
