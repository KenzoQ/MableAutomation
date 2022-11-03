import * as data from '../../../fixtures/test-data.json';
import faker from 'faker/locale/en_AU';

describe('Cancel regular job', () => {
  const clientEmail = 'automation_richard.gutierrez.regularjob+client@donotuse.com.au';
  const clientPass = 'qaAutomation2021';

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it(`1. ES-T532. Cancel an open job
      2. ES-T533. Check newly cancelled open job`, () => {
    const titleJob = faker.name.jobTitle();
    cy
      .log('Login as client')
      .loginToDashboard(clientEmail, clientPass)

      .createRegularJobByAPI(clientEmail, clientPass, titleJob)

      .log('Click "Post a job" on the left navigation')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Select Reqular job with status as Open')
      .selectJobWithStatus('Open')

      .log('Click Cancel job btn')
      .clickElementOnText('.actions button span', 'Cancel job')

      .log('The cancel popup is shown')
      .verifyTextVisible('Why are you cancelling it?')
      .clickElementOnText('.radioLabel', 'I found a worker on Mable')

      .log('Click Cancel Job on the popup')
      .clickElementOnText(data.postAJob.cancelJobPop.btn, 'Cancel Job')

      // Check newly cancelled open job
      .log('Click "Post a job" on the left navigation')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('That cancelled job is not in the job list')
      .verifyTextNotExist(titleJob)

      .log('Click Archive')
      .clickElementOnText(data.regularJob.client.tabHeader, 'Archive')

      .log('View job with title')
      .clickElementOnText(data.regularJob.client.titleJobArchive, titleJob)
      .wait(1000)

      .log('Verify the current status is Cancelled')
      .verifyElementContainsText('span', 'Cancelled');
  });
});
