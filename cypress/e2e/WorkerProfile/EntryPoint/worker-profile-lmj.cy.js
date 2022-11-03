/* eslint-disable no-multiple-empty-lines */
import faker from 'faker/locale/en_AU';
import * as data from '../../../fixtures/test-data.json';

describe('Worker Profile Last Minute Job', () => {
  const client = 'automation_squidgame.lmj+client@donotuse.com.au';
  const swFiled = 'automation_kangsaebyeok.lmj+sw@donotuse.com.au';
  const password = 'qaAutomation2021';
  const postCode = '36010';
  const workerProfileFiled = '21397';
  const address = 'Taylors Arm NSW 2447';
  const address2 = 'Millers Point NSW 2000';
  const jobTitle = faker.name.jobTitle();
  const workerProfile = '/2/profile/worker/21925';
  const supportName = 'Ji Y';

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  // no worker is matched with job
  it('ES-T766. View support workers profile (bidder profile) from open last minute job offer tile', () => {
    const jobTitle = faker.name.jobTitle();
    const location = 'Arndell Park NSW 2148';
    const geoID = 34464;
    const clientEmail = data.dashboardAccount.validAgreementClient.email;
    const clientPass = data.dashboardAccount.validAgreementClient.password;
    cy
      .createLastMinuteJobGraphql(
        clientEmail,
        clientPass,
        jobTitle,
        geoID,
        location,
      ).then(res => {
        const jobId = res.body.data.flexJobCreateUpdate.postedJob.id;
        const workerProfile = '/profile/worker/';
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
        cy
          .log('Login as client')
          .loginToDashboard(clientEmail, clientPass)

          .log('Navigate to jobs page')
          .navigateByLeftMenuInDashboard('Jobs')

          .log('Navigate to LMJ details')
          .navigateToLMJByTitle(jobTitle)

          .log('Verify CTA message')
          .verifyElementContainsText('#offers', 'Message')
          .verifyElementContainsText('#offers', 'Instant book')
          .verifyElementContainsText('#content', 'Cancel Job')

          .log('Click profile worker image')
          .wait(500)
          .get('#offers div a')
          .first()
          .invoke('removeAttr', 'target')
          .click()

          .log(`'Verify ${workerProfile}'`)
          .verifyCurrentURL(workerProfile)

          .log('Check support profile details')
          .verifyTextNotExist('Rates')
          .verifyTextNotExist('Availability')
          .verifyTextNotExist('Review')
          .verifyElementContainsTextList('#messageButton', 'Contact')

          .log('Navigate Contact <user name>')
          .clickElementOnText('#messageButton', 'Contact')

          .log('Veriy right side panel')
          .wait(500)
          .verifyTextVisible('made an offer for your Last Minute job')
          .verifyElementContainsText('#content', 'View profile')
          .verifyElementContainsText('#content', 'Instant book')
          .clickElementOnText('#content', 'Instant book')

          .log('Verify Cancelled Filled Modal')
          .wait(500)
          .verifyElementContainsText('#mat-dialog-0 button', 'Cancel')
          .verifyElementContainsText('#mat-dialog-0 button', 'Confirm booking')
          .verifyTextVisible('Confirm booking with')

          .clickElementOnText('#mat-dialog-0 button', 'Cancel')
          .verifyTextVisible('made an offer for your Last Minute job')

          .log('Back to the profile page')
          .go('back')

          .log('Validate the if navigated to to the worker profle page again')
          .waitAppLoaderNotVisible()
          .verifyCurrentURL(workerProfile)

          .log('Back to the last minute job page')
          .clickElementOnText('#content', ' Back')
          .waitAppLoaderNotVisible()

          .log('Validate if on the LMJ first again')
          .verifyTextVisible(jobTitle);
        cy.cancelJob(jobId, clientEmail, clientPass);
      });
  });

  it('ES-T767. View support workers profile from filled last minute job offer tile', () => {
    cy
      .log('Cancel Agreement to apply LMJ')
      .removeAgreementIfExist(client, password, workerProfileFiled)

      .log('Create LMJ with filled job')
      .createFilledJob('Human Research Associate', client, password, workerProfileFiled, swFiled, password, postCode, address)

      .log('Login as client')
      .loginToDashboard(client, password)

      .log('Navigate to jobs page')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Navigate to LMJ details')
      .navigateToLMJByStatus('Filled');

    cy.log('Verify worker profile')
      .getText('#fulfilled  div.name h4')
      .then((name) => {
        cy.wait(500)
          .get('#fulfilled  a')
          .invoke('removeAttr', 'target')
          .click()
          .verifyTextVisible(name);
      })

      .log('Check support profile details')
      .verifyElementContainsTextList('#reviewBtn span', 'Review')
      .verifyElementContainsTextList('#messageButton', 'Contact');
  });
});



