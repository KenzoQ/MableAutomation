import * as data from '../../../fixtures/test-data.json';

describe('Report a job', () => {
  const workerEmail = 'automation_maria.repollo.jobspec+worker@donotuse.com.au';
  const workerPass = 'qaAutomation2021';
  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it(`1. ES-T1300. Report a job
      2. ES-T1409. Check newly reported job`, () => {
    cy
      .log('Login as worker')
      .loginToDashboard(workerEmail, workerPass)

      .log('Go to the Job page')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Click search tab')
      .clickElementOnText('[href="/jobs/search/all"]', 'Search')

      .log('Check address')
      .verifyElementVisible(data.search.worker.addressInput)

      .log('Enter new address')
      .inputTextField(data.search.worker.addressInput, 2600)
      .clickElement('.suggestions .listOption', true, 1)
      .wait(1000)

      .log('Click search btn')
      .clickElement(data.regularJob.worker.searchBtn)

      .wait(2000)
      .getListJobAsWorker(workerEmail, workerPass, '37269')
      .then((res) => {
        const job = res.body.data.find(
          (item) => item.attributes.allow_actions.report,
        );

        cy.get('virtual-scroller#resultsList').scrollTo('bottom');
        cy.get('.resultTile').contains(job.attributes.title).scrollIntoView();
        cy.log('Select the job')
          .clickElementOnTextNoWait('.resultTile', job.attributes.title, true)

          .log('Click the report btn')
          .clickElementOnText('#reportBtn span', 'Report')

          .log('Verify the confirmed popup is shown')
          .verifyTextVisible('Report Job')
          .verifyTextVisible('Why are you reporting this job?')

          .log('Choose an option on popup')
          .clickElementOnText(
            'app-report-job-modal .radioLabel',
            'Contains offensive language',
          )

          .log('Click Report btn')
          .wait(1000)
          .clickElementOnText('app-report-job-modal button', 'Report')
          .wait(1000)

          .log('Verify worker report successfully')
          .verifyTextVisible('Job Reported')
          .verifyTextVisible(
            'Thank you for reporting this job. Our team has been notified and will take the necessary steps.',
          )

          .log('Click Close btn')
          .clickElementOnText('button', 'Close')

        // cy.get('virtual-scroller#resultsList').scrollTo('top')
          .log('Select the job')
          .clickElementOnTextNoWait('.resultTile', job.attributes.title, true)

          .log('Verify Report btn is not visible')
          .verifyElementNotExist('#reportBtn span');
      });
  });
});
