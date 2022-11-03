import faker from 'faker/locale/en_AU';
import * as data from '../../../fixtures/test-data.json';

describe('Cancel a last minute job', () => {
  const clientEmail = 'automation_verona.lmj+client@donotuse.com.au';
  const clientPass = 'qaAutomation2021';

  const clientEmailLMJ = 'automation_maria.repollo.jobmessaging+client2@donotuse.com.au';
  const clientPassLMJ = 'qaAutomation2021';

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it(`1. ES-T758.Cancel a last minute job, no offer
      2. ES-T759.Check newly cancelled "open" last minute job, with no offer`, () => {
    const jobTitle = faker.name.jobTitle();
    const jobLocation = 'Sandy Beach NSW 2456';
    const postCode = '36094';
    cy.log('Precondition: Create a cancelled LMJ')
      .createLastMinuteJob(
        clientEmail,
        clientPass,
        jobTitle,
        postCode,
        jobLocation,
      ).then(() => {
        cy.log(`Login a client: ${clientEmail}`)
          .loginToDashboard(clientEmail, clientPass)

          .log('Navigate to Jobs')
          .navigateByLeftMenuInDashboard('Jobs')
          .wait(1000)

          .log('Click Expired job')
          .navigateToLMJByStatus(data.LMJContent.client.status.open)

          .log('Verify no offer text')
          .verifyTextVisible(data.LMJContent.client.jobDetails.noOffer)

          .log('Click Cancel job ')
          .clickElementOnText(data.LMJElements.client.jobDetails.button, 'Cancel')

          .log('Verify expired message')
          .verifyTextVisible(data.LMJContent.client.jobDetails.cancelledMessage)

          .log('ES-T759.Check newly cancelled "open" last minute job, with no offer')
          .log('Click "Job" on the left navigation')
          .navigateByLeftMenuInDashboard('Jobs')
          .wait(1000)

          .log('Click Archive tab')
          .clickElementOnText(data.regularJob.client.tabHeader, 'Archive')
          .wait(1000)

          .log('Click Cancelled job')
          .navigateToLMJByStatus(data.LMJContent.client.status.cancelled)

          .log('Verify expired message')
          .verifyTextVisible(data.LMJContent.client.jobDetails.cancelledMessage);
      });
  });

  it(`1. ES-T760.Cancel a last minute job with offer
      2. ES-T776.Check newly cancelled "open" last minute job, with offer`, () => {
    const jobTitle = faker.name.jobTitle();
    const jobLocation = 'Sandy Beach NSW 2456';
    const postCode = '36094';
    const workerFirstName = faker.random.alphaNumeric(4);
    const workerLastName = faker.random.alphaNumeric(10);
    const workerEmail = `auto_lmj_job_${workerLastName}@donotuse.com.au`;
    const postcode2 = '2456';
    const suburb2 = 'Corindi Beach';
    cy.log('Precondition: Create a cancelled LMJ')
      .createFullWokerThenShortlist(
        clientEmail,
        clientPass,
        workerEmail,
        workerFirstName,
        workerLastName,
        postcode2,
        suburb2,
        postcode2,
      )
      .createLastMinuteJob(
        clientEmail,
        clientPass,
        jobTitle,
        postCode,
        jobLocation,
      ).then((res) => {
        const jobId = res.body.data.id;
        cy.wait(4000)
          .pickJob(
            jobId,
            workerEmail,
            'password',
          )
          .pickJob(
            jobId,
            'auto_private_job_7si8ygzden@donotuse.com.au',
            'password',
          )
          .pickJob(
            jobId,
            'auto_private_job_cvbbjf9uwm@donotuse.com.au',
            'password',
          )
          .pickJob(
            jobId,
            'auto_private_job_at87zlq1ar@donotuse.com.au',
            'password',
          );
        cy.log(`Login a client: ${clientEmail}`)
          .loginToDashboard(clientEmail, clientPass)

          .log('Navigate to Jobs')
          .navigateByLeftMenuInDashboard('Jobs')
          .wait(1000)

          .log('Click Open job')
          .navigateToLMJByStatus(data.LMJContent.client.status.open)

          .log('Verify no offer text')
          .verifyTextVisible(data.LMJContent.client.jobDetails.noOffer)

          .log('Click Cancel job ')
          .clickElementOnText(data.LMJElements.client.jobDetails.button, 'Cancel')

          .log('Verify expired message')
          .verifyTextVisible(data.LMJContent.client.jobDetails.cancelledMessage)

          .log('ES-T759.Check newly cancelled "open" last minute job, with no offer')
          .log('Click "Job" on the left navigation')
          .navigateByLeftMenuInDashboard('Jobs')
          .wait(1000)

          .log('Click Archive tab')
          .clickElementOnText(data.regularJob.client.tabHeader, 'Archive')
          .wait(1000)

          .log('Click Cancelled job')
          .navigateToLMJByStatus(data.LMJContent.client.status.cancelled)

          .log('Verify expired message')
          .verifyTextVisible(data.LMJContent.client.jobDetails.cancelledMessage)
          .verifyTextVisible(data.LMJContent.client.jobDetails.cancelledOfferMessage);
      });
  });

  it(`1. ES-T763. Cancel filled last minute job
      2. ES-T764. View cancellation policy`, () => {
    cy.log(`Login a client: ${clientEmailLMJ}`)
      .loginToDashboard(clientEmailLMJ, clientPassLMJ)

      .log('Navigate to Jobs')
      .navigateByLeftMenuInDashboard('Jobs')
      .wait(1000)

      .clickElement("button[aria-label='Last page']")
      .wait(1000)

      .log('Click Filled job')
      .navigateToLMJByStatus(data.LMJContent.client.status.filled)

      .log('Verify Filled message')
      .verifyTextVisible(data.LMJContent.client.jobDetails.filledMessage)

      .log('Verify Your Support Worker text')
      .verifyTextVisible(data.LMJContent.client.jobDetails.yourSupportWorker)

      .log('Verify Message text')
      .verifyTextVisible(data.LMJContent.client.jobDetails.message)

      .log('Click Cancel job ')
      .clickElementOnText(data.LMJElements.client.jobDetails.button, 'Cancel')
      .wait(1000)

      .clickElementOnText(data.LMJElements.client.cancelFilledModal.button, 'Back')
      .wait(1000)

      .log('2. ES-T764. View cancellation policy')

      .log('Navigate to Jobs')
      .navigateByLeftMenuInDashboard('Jobs')
      .wait(1000)

      .clickElement("button[aria-label='Last page']")
      .wait(1000)

      .log('Click Filled job')
      .navigateToLMJByStatus(data.LMJContent.client.status.filled)

      .log('Verify Filled message')
      .verifyTextVisible(data.LMJContent.client.jobDetails.filledMessage)

      .log('Click Cancel job ')
      .clickElementOnText(data.LMJElements.client.jobDetails.button, 'Cancel')
      .wait(1000)

      .log('Verify Cancelled Filled Modal')
      .verifyObjectListVisible(data.LMJElements.client.cancelFilledModal)
      .verifyElementContainsTextObjectList(data.LMJElements.client.cancelFilledModal.item,
        data.LMJContent.client.cancelFilledModal);
  });

  it('ES-T765. Last minute job agreement', () => {
    cy.log(`Login a client: ${clientEmailLMJ}`)
      .loginToDashboard(clientEmailLMJ, clientPassLMJ)

      .log('Navigate to Jobs')
      .navigateByLeftMenuInDashboard('Jobs')
      .wait(1000)

      .clickElement("button[aria-label='Last page']")
      .wait(1000)

      .log('Click Filled job')
      .navigateToLMJByStatus(data.LMJContent.client.status.filled)

      .log('Verify Filled message')
      .verifyTextVisible(data.LMJContent.client.jobDetails.filledMessage)

      .log('Verify Your Support Worker text')
      .verifyTextVisible(data.LMJContent.client.jobDetails.yourSupportWorker)

      .log('Verify Message text')
      .verifyTextVisible(data.LMJContent.client.jobDetails.message)

      .getText('#fulfilled .name .title')
      .then((name) => {
        cy
          .log('Navigate to My support worker')
          .navigateByLeftMenuInDashboard('My support workers')
          .wait(1000)
          .clickElementOnText('div.mat-tab-label-content', 'Terminated')

          .get('app-support-workers-list .workerName')
          .contains(name)
          .parents('div.details')
          .children('div.container')
          .children('div.action')
          .children('button.link')
          .eq(0)
          .click()
          .verifyTextVisible('Agreement');
      });
  });
});
