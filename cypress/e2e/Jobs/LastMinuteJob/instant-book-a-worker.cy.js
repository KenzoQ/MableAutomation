import faker from 'faker/locale/en_AU';
import * as data from '../../../fixtures/test-data.json';
// Run as local
describe('Instant book a worker', () => {
  const clientEmail = data.dashboardAccount.validAgreementClient.email;
  const clientPass = data.dashboardAccount.validAgreementClient.password;

  beforeEach(() => {
    cy
      .visit('/');
  });

  it('ES-T779. Offer tile validation', () => {
    const jobTitle = faker.name.jobTitle();
    const location = 'Arndell Park NSW 2148';
    const geoID = 34464;
    cy.setMultiTimeAvailableAPI(data.LMJAccountsNew);
    cy
      .log('Precondition ES-T779: ')
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
          .pickJobMultiAccount(jobId, data.LMJAccountsNew)

          .log(`Login a client: ${clientEmail}`)
          .loginToDashboard(clientEmail, clientPass)

          .pickJobMultiAccount(jobId, data.LMJAccountsNew)

          .log('Navigate to Jobs')
          .navigateByLeftMenuInDashboard('Jobs')
          .wait(1000)

          .navigateToLMJByTitle(jobTitle)
          .wait(1000)

          .verifyElementVisible(data.LMJElements.client.timeLine)
          .verifyLMJOfferList()
          .verifyTextVisible(data.LMJContent.client.jobDetails.cancelJob);
      });
  });

  it(`1. ES-T761. Instant book worker for last minute job
      2.ES-T762. Check newly filled last minute job`, () => {
    const jobTitle = faker.name.jobTitle();
    const location = 'Arndell Park NSW 2148';
    const geoID = 34464;
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
          .pickJobMultiAccount(jobId, data.LMJAccountsNew)

          .log(`Login a client: ${clientEmail}`)
          .loginToDashboard(clientEmail, clientPass)

          .pickJobMultiAccount(jobId, data.LMJAccountsNew)

          .log('Navigate to Jobs')
          .navigateByLeftMenuInDashboard('Jobs')
          .wait(1000)

          .navigateToLMJByTitle(jobTitle)
          .wait(1000)

          .verifyElementVisible(data.LMJElements.client.timeLine)
          .verifyTextVisible(data.LMJContent.client.jobDetails.cancelJob)
          .clickElementOnText('.action button', 'Instant book')
          .verifyTextVisible('Confirm booking with')
          .clickElementOnText('button', 'Confirm booking')
          .log('Verify Filled message')
          .verifyTextVisible(data.LMJContent.client.jobDetails.filledMessage);

        cy.cancelJob(jobId, clientEmail, clientPass);
      });
    cy.removeAgreementMultiAccountsIfExist(data.LMJAccountsNew, clientEmail, clientPass);
  });
});
