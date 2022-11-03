import faker from 'faker/locale/en_AU';
import * as data from '../../../fixtures/test-data.json';
// run as local
describe('Last minute job Messaging', () => {
  const clientEmail = 'automation_verona.lmj+client@donotuse.com.au';
  const clientPass = 'qaAutomation2021';

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it('ES-T773. Send a message to worker from filled last minute job details', () => {
    const message = faker.random.alphaNumeric(10);
    const jobTitle = faker.name.jobTitle();
    const location = 'Arndell Park NSW 2148';
    const geoID = 34464;
    cy.setMultiTimeAvailableAPI(data.LMJAccountsMessageFilled);
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
          .pickJobMultiAccount(jobId, data.LMJAccountsMessageFilled)

          .log(`Login a client: ${clientEmail}`)
          .loginToDashboard(clientEmail, clientPass)

          .pickJobMultiAccount(jobId, data.LMJAccountsMessageFilled)

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
          .verifyTextVisible(data.LMJContent.client.jobDetails.filledMessage)

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
          .verifyElementVisible(data.LMJElements.client.fulfilled)

          .log('Click Message')
          .clickElementOnText(data.LMJElements.client.jobDetails.button,
            data.LMJContent.client.jobDetails.message)
          .wait(1000)

          .log('Input on message')
          .inputTextField(data.message.messageInput, message)

          .log('Click send message')
          .clickElement(data.message.sendMessage, true)
          .wait(1000)

          .log('Verify new message should be send')
          .verifyElementContainsText(
            '.msgBody',
            message,
          );
        cy.cancelJob(jobId, clientEmail, clientPass);
      });
    cy.removeAgreementMultiAccountsIfExist(data.LMJAccountsMessageFilled, clientEmail, clientPass);
  });

  it('ES-T774. Send a message to worker from open last minute job details screen', () => {
    const message = faker.random.alphaNumeric(10);
    const jobTitle = faker.name.jobTitle();
    const location = 'Arndell Park NSW 2148';
    const geoID = 34464;
    cy.setMultiTimeAvailableAPI(data.LMJAccountsMessageOffer);
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
          .pickJobMultiAccount(jobId, data.LMJAccountsMessageOffer)

          .log(`Login a client: ${clientEmail}`)
          .loginToDashboard(clientEmail, clientPass)

          .pickJobMultiAccount(jobId, data.LMJAccountsMessageOffer)

          .log('Navigate to Jobs')
          .navigateByLeftMenuInDashboard('Jobs')
          .wait(1000)

          .log('Click Open job')
          .navigateToLMJByTitle(jobTitle)
          .wait(1000)

          .log('Click Message')
          .clickElementOnText(data.LMJElements.client.jobDetails.button,
            data.LMJContent.client.jobDetails.message)
          .wait(1000)

          .log('Input on message')
          .inputTextField(data.message.messageInput, message)

          .log('Click send message')
          .clickElement(data.message.sendMessage, true)
          .wait(1000)

          .log('Verify new message should be send')
          .verifyElementContainsText(
            '.msgBody',
            message,
          );
        cy.cancelJob(jobId, clientEmail, clientPass);
      });
  });

  it('ES-T956. View Inbox - Filled Last Minute Job', () => {
    cy.log(`Login a client: ${clientEmail}`)
      .loginToDashboard(clientEmail, clientPass)
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

      .getText('app-view-last-minute-job .panel .details h2')
      .then((name) => {
        cy
          .log('Navigate to Inbox')
          .navigateByLeftMenuInDashboard('Inbox')
          .wait(1000)
          .verifyTextNotExist(name);
      });
  });

  it('ES-T954. View Inbox - Last Minute Job, with Offer', () => {
    const jobTitle = faker.name.jobTitle();
    const location = 'Arndell Park NSW 2148';
    const geoID = 34464;
    cy.setMultiTimeAvailableAPI(data.LMJAccountsMessageOffer);
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
          .pickJobMultiAccount(jobId, data.LMJAccountsMessageOffer)

          .log(`Login a client: ${clientEmail}`)
          .loginToDashboard(clientEmail, clientPass)

          .pickJobMultiAccount(jobId, data.LMJAccountsMessageOffer)

          .log('Navigate to Inbox')
          .navigateByLeftMenuInDashboard('Inbox')
          .wait(1000)

          .verifyTextVisible(jobTitle)

          .log(`Click ${jobTitle}`)
          .clickElementOnText('a.lastMinuteJobItem span',
            jobTitle)
          .wait(1000)

          .log('Click Message')
          .clickElementOnText(data.LMJElements.client.jobDetails.button,
            data.LMJContent.client.jobDetails.message);
        cy.cancelJob(jobId, clientEmail, clientPass);
      });
  });
});
