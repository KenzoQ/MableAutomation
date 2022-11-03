import * as data from '../../../fixtures/test-data.json';

describe('View archived jobs', () => {
  const clientEmail = 'automation_maria.repollo.jobmessaging+client@donotuse.com.au';
  const clientPass = 'qaAutomation2021';

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it('ES-T519. Check archived job page', () => {
    cy
      .log('Login as client')
      .loginToDashboard(clientEmail, clientPass)

      .log('Click "Post a job" on the left navigation')
      .navigateByLeftMenuInDashboard('Jobs')
      .wait(1000)

      .log('Click Archive tab')
      .clickElementOnText(data.regularJob.client.tabHeader, 'Archive')
      .wait(1000)

      .log('Verify the open job is not shown')
      .verifyElementNotContainsText('.details .chip span', 'Open')
      .verifyElementNotContainsText('.details .chip span', 'Filled');
  });

  it('ES-T520. View archived jobs from posted job list', () => {
    cy
      .log('Login as client')
      .loginToDashboard(clientEmail, clientPass)

      .log('Click "Post a job" on the left navigation')
      .navigateByLeftMenuInDashboard('Jobs')
      .wait(1000)

      .log('Click Archive tab')
      .clickElementOnText(data.regularJob.client.tabHeader, 'Archive')
      .wait(1000)

      .log('Click cancelled job')
      .selectJobWithStatus('Cancelled')

      .log('Verify that job has status as Cancelled')
      .verifyTextVisible('Cancelled')

      .log('Click "Post a job" on the left navigation')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Click "Post a job" on the left navigation')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Click Archive tab')
      .clickElementOnText(data.regularJob.client.tabHeader, 'Archive')

      .log('Click Archived job')
      .selectJobWithStatus('Expired')

      .log('Verify that job has status as Expired')
      .verifyTextVisible('Expired');
  });
});
