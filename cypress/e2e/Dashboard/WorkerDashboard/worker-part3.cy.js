import * as data from '../../../fixtures/test-data.json';

describe('Worker Dashboard', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  const { meganWorkerTASACTonly, mikaelWorkerTASACTonly } = data.dashboardAccount;

  it('ES-T3896: Newly sign up worker dashboard - TAS/ACT only', () => {
    cy.log('Login')
      .visit('/')
      .loginToDashboard(
        meganWorkerTASACTonly.email,
        meganWorkerTASACTonly.password,
      )

      .log('Check "Welcome <worker>" hero image')
      .verifyTextExist('Welcome Megan')
      .get('img#heroImage')
      .should('be.visible')
      .and(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
        expect($img[0].naturalHeight).to.be.greaterThan(0);
      })

      .log('Check progress checker')
      .get('body')
      .then(($body) => {
        const length = Number($body.find('div[id="whatYouWillNeed"] svg path').length);
        expect(length).to.equal(7);
      })

      .log('Check progress checker items')
      .verifyTextExist('Two references')
      .verifyTextExist('Mandatory COVID-19 training')
      .verifyTextExist('COVID-19 vaccination as required by your state')
      .verifyTextExist('Working with Children Check (if working with children)')
      .verifyTextExist('Working with Vulnerable People card (ACT/TAS)')
      .verifyTextExist('Police Check through Mable or a current check')

      .log('Check "Set up your account" button')
      .get('div[id="urgentCallToAction"] a')
      .contains('Set up your account')
      .should('be.visible')

      .log('Click "Set up your account" button')
      .get('div[id="urgentCallToAction"] a')
      .contains('Set up your account')
      .click()
      .url()
      .should('include', '/onboarding')

      .log('Click "Back to dashboard"')
      .wait(1000)
      .get('app-steps-header span')
      .contains('Back to dashboard')
      .click()
      .url()
      .should('include', '/dashboard')

      .log('Click "Logout" button')
      .clickLogoutOnTopMenu()
      .url()
      .should('include', '/login')

      .log('Go to the web app, login as newly signup worker based from ACT')
      .loginToDashboard(
        mikaelWorkerTASACTonly.email,
        mikaelWorkerTASACTonly.password,
      )

      .log('Check "Welcome <worker>" hero image')
      .verifyTextExist('Welcome Mikael')
      .get('img#heroImage')
      .should('be.visible')
      .and(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
        expect($img[0].naturalHeight).to.be.greaterThan(0);
      })

      .log('Check progress checker')
      .get('body')
      .then(($body) => {
        const length = Number($body.find('div[id="whatYouWillNeed"] svg path').length);
        expect(length).to.equal(7);
      })

      .log('Check progress checker items')
      .verifyTextExist('Two references')
      .verifyTextExist('Mandatory COVID-19 training')
      .verifyTextExist('COVID-19 vaccination as required by your state')
      .verifyTextExist('Working with Children Check (if working with children)')
      .verifyTextExist('Working with Vulnerable People card (ACT/TAS)')

      .log('Check "Set up your account" button')
      .get('div[id="urgentCallToAction"] a')
      .contains('Set up your account')
      .should('be.visible')

      .log('Click "Set up your account" button')
      .get('div[id="urgentCallToAction"] a')
      .contains('Set up your account')
      .click()
      .url()
      .should('include', '/onboarding')

      .log('Click "Back to dashboard"')
      .wait(1000)
      .get('app-steps-header span')
      .contains('Back to dashboard')
      .click()
      .url()
      .should('include', '/dashboard');
  });
});
