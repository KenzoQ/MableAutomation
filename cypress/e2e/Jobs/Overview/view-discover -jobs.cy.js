import * as data from '../../../fixtures/test-data.json';

describe('View discover jobs', () => {
  const dashboardOpenJobsElements = data.jobFeature.elementsInWorker.dashboardOpenJob;
  const dashboardOpenJobsTexts = data.jobFeature.textInWorker.dashboardOpenJob;
  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it('ES-T1279. View job discover page, with records', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        'automation_kang.haneul.activeagreement+worker@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Verify the open jobs form')
      .verifyElementListVisible(dashboardOpenJobsElements.jobForm,
        dashboardOpenJobsElements.jobPanel,
        dashboardOpenJobsElements.viewButton)
      .verifyElementContainsTextList(dashboardOpenJobsElements.jobForm,
        dashboardOpenJobsTexts.title,
        dashboardOpenJobsTexts.showAll,
        dashboardOpenJobsTexts.view)

      .log('Click Jobs on the left navigation')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Click Discover')
      .clickElementOnText('.mat-tab-links a', 'Discover')

      .log('Verify job has status as Onging and One-off')
      .verifyElementContainsText('.jobStatus span', 'Ongoing');
  });

  it('ES-T1292. View open discover regular job details, approved', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        'automation_kim.taehee.jobagreement+worker@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Click Jobs on the left navigation')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Click Discover')
      .clickElementOnText('a', 'Discover')

      .log('Select the first job')
      .clickElement('app-discover-tab .resultTile', true, 0)

      .log('Check job detail page')
      .verifyElementVisible('.jobTitle')
      .verifyElementVisible('#jobInformation')
      .verifyElementContainsText('button', 'Message to apply')
      .verifyElementContainsText('#reportBtn span', 'Report')

      .log('Click "Message to apply"')
      .clickElementOnText('button', 'Message to apply')
      .verifyElementVisible(data.regularJob.worker.messageInput)

      .log('Click "Back to job list"')
      .clickElementOnText('#backToListBtn span', 'Back to job list')
      .verifyElementNotExist('#selectedJobContent');
  });
});
