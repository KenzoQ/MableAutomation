import faker from 'faker/locale/en_AU';
import * as data from '../../../fixtures/test-data.json';

describe('View last minute job', () => {
  const clientEmail = data.dashboardAccount.validAgreementClient.email;
  const clientPass = data.dashboardAccount.validAgreementClient.password;

  const clientEmailLMJ = 'automation_maria.repollo.jobmessaging+client2@donotuse.com.au';
  const clientPassLMJ = 'qaAutomation2021';

  const clientEmailFilled = 'automation_squidgame.lmj+client@donotuse.com.au';
  const clientPassFilled = 'qaAutomation2021';

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it(`1. ES-T770.View open last minute job with less than 5 offers
  2. ES-T771.View open last minute job with 5 offers`, () => {
    const jobTitle = faker.name.jobTitle();
    const location = 'Arndell Park NSW 2148';
    const geoID = 34464;
    cy.setMultiTimeAvailableAPI(data.LMJAccountsViewOffer);
    cy
      .createLastMinuteJobGraphql(
        clientEmail,
        clientPass,
        jobTitle,
        geoID,
        location,
      ).then(res => {
        const jobId = res.body.data.flexJobCreateUpdate.postedJob.id;
        cy.log(`Wait to make sure Job: ${jobTitle}-${jobId} visible in the worker side...`)
          .wait(30000)

          .log(`Login a client: ${clientEmail}`)
          .loginToDashboard(clientEmail, clientPass)

          .pickJob(jobId, data.LMJAccountsViewOffer.completedWorker01.email,
            data.LMJAccountsViewOffer.completedWorker01.password)
          .pickJob(jobId, data.LMJAccountsViewOffer.completedWorker02.email,
            data.LMJAccountsViewOffer.completedWorker02.password)
          .pickJob(jobId, data.LMJAccountsViewOffer.completedWorker03.email,
            data.LMJAccountsViewOffer.completedWorker03.password)
          .pickJob(jobId, data.LMJAccountsViewOffer.completedWorker04.email,
            data.LMJAccountsViewOffer.completedWorker04.password);

        cy.log(`Login a client: ${clientEmail}`)
          .loginToDashboard(clientEmail, clientPass)

          .log('1. ES-T770.View open last minute job with less than 5 offers')
          .log('Navigate to Jobs')
          .navigateByLeftMenuInDashboard('Jobs')
          .wait(1000)

          .navigateToLMJByTitle(jobTitle)
          .wait(1000)

          .verifyElementVisible(data.LMJElements.client.timeLine)
          .verifyLMJOfferList()
          .verifyTextVisible(data.LMJContent.client.jobDetails.cancelJob)

          .pickJob(jobId, data.LMJAccountsViewOffer.completedWorker05.email,
            data.LMJAccountsViewOffer.completedWorker05.password);
        cy
          .log('Navigate to Jobs')
          .navigateByLeftMenuInDashboard('Jobs')
          .wait(1000)

          .navigateToLMJByTitle(jobTitle)
          .wait(1000)
          .log('2. ES-T771.View open last minute job with 5 offers')
          .verifyElementVisible(data.LMJElements.client.timeLine)
          .verifyLastOffer()
          .verifyTextVisible(data.LMJContent.client.jobDetails.cancelJob);
        cy.cancelJob(jobId, clientEmail, clientPass);
      });
  });

  it('ES-T768.View filled last minute jobs from posted job list', () => {
    cy.log(`Login a client: ${clientEmailFilled}`)
      .loginToDashboard(clientEmailFilled, clientPassFilled)

      .log('Navigate to Jobs')
      .navigateByLeftMenuInDashboard('Jobs')
      .wait(1000)

      .log('Click Filled job')
      .navigateToLMJByStatus(data.LMJContent.client.status.filled)

      .log('Verify Filled message')
      .verifyTextVisible(data.LMJContent.client.jobDetails.filledMessage)

      .log('Verify Your Support Worker text')
      .verifyTextVisible(data.LMJContent.client.jobDetails.yourSupportWorker)

      .log('Verify Message text')
      .verifyTextVisible(data.LMJContent.client.jobDetails.message)

      .log('Verify fullfilled element')
      .verifyElementVisible(data.LMJElements.client.fulfilled);
  });

  it('ES-T769.Client job offer screen UI, no offer', () => {
    const titleJob = faker.name.jobTitle();
    cy.log('Precondition: Create a cancelled LMJ')
      .createLastMinuteJob(clientEmailLMJ, clientPassLMJ, titleJob).then(($lmj) => {
        cy.log(`Login a client: ${clientEmailLMJ}`)
          .loginToDashboard(clientEmailLMJ, clientPassLMJ)

          .log('Navigate to Jobs')
          .navigateByLeftMenuInDashboard('Jobs')
          .wait(1000)

          .log('Click Open job')
          .navigateToLMJByStatus(data.LMJContent.client.status.open)

          .log('Verify no offer text')
          .verifyTextVisible(data.LMJContent.client.jobDetails.noOffer);

        cy.cancelJob($lmj.body.data.id, clientEmailLMJ, clientPassLMJ);
      });
  });

  it('ES-T772. View expired and cancelled job from post a job page', () => {
    const titleJob = faker.name.jobTitle();
    cy.log('Precondition: Create a cancelled LMJ')
      .createLastMinuteJob(clientEmailLMJ, clientPassLMJ, titleJob).then(($lmj) => {
        cy.cancelJob($lmj.body.data.id, clientEmailLMJ, clientPassLMJ);
      });
    cy.log(`Login a client: ${clientEmailLMJ}`)
      .loginToDashboard(clientEmailLMJ, clientPassLMJ)

      .log('Navigate to Jobs')
      .navigateByLeftMenuInDashboard('Jobs')
      .wait(1000)

      .log('Click Archive tab')
      .clickElementOnText(data.regularJob.client.tabHeader, 'Archive')
      .wait(1000)

      .log('Click Expired job')
      .navigateToLMJByStatus(data.LMJContent.client.status.expired)

      .log('Verify expired message')
      .verifyTextVisible(data.LMJContent.client.jobDetails.expiredMessage)

      .log('Click "Post a job" on the left navigation')
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
