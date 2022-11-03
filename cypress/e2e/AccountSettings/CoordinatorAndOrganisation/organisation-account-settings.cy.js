/* eslint-disable no-unused-vars */
import * as data from '../../../fixtures/test-data.json';

describe('Organisation  Account Settings', () => {
  const viewOrg = {
    email: 'automation_ramsey.sydnie.accountsettings+orgadmin@donotuse.com.au',
    password: 'qaAutomation2021',
  };
  const phone = '0491570110';
  const newPhone = '0491570111';
  const newEmail = `e${viewOrg.email}`;
  const newPassword = 'qaAutomation2022';
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('ES-T3863. [Organisation] View Account Settings', () => {
    cy.log('Login')
      .visit('/')
      .log(`Login ${viewOrg.email}`)

      .loginToDashboard(
        viewOrg.email,
        viewOrg.password,
      )

      .navToTheAccountSettings()
      .wait('@GET_account.json')
      .verifyCurrentURL('/account/email-password')
      .waitAppLoaderNotVisible()
      .verifyBasicAccountSettingsPage(viewOrg.email, phone);
  });

  it('ES-T3864. [Organisation] Validation of Username and password tab fields', () => {
    cy.log('Login')
      .visit('/')
      .log(`Login ${viewOrg.email}`)

      .loginToDashboard(
        viewOrg.email,
        viewOrg.password,
      )

      .navToTheAccountSettings()
      .wait('@GET_account.json')
      .verifyCurrentURL('/account/email-password')
      .waitAppLoaderNotVisible()
      .verifyBasicAccountSettingsPage(viewOrg.email, phone)
      .validateAllFieldsOfAccountSettingsPage(viewOrg.email,
        viewOrg.password,
        phone);
  });

  it('ES-T3865. [Organisation] Update Email address', () => {
    cy.log('Login')
      .visit('/')
      .log(`Login ${viewOrg.email}`)

      .loginToDashboard(
        viewOrg.email,
        viewOrg.password,
      )

      .navToTheAccountSettings()
      .wait('@GET_account.json')
      .verifyCurrentURL('/account/email-password')
      .waitAppLoaderNotVisible()
      .verifyBasicAccountSettingsPage(viewOrg.email, phone)
      .updateEmailAS(newEmail)
      .clickLogoutOnTopMenu()

      .loginToDashboard(
        newEmail,
        viewOrg.password,
      )
      .navToTheAccountSettings()
      .wait('@GET_account.json')
      .verifyCurrentURL('/account/email-password')
      .waitAppLoaderNotVisible()
      .verifyBasicAccountSettingsPage(newEmail, phone)
      .updateEmailAS(viewOrg.email);
  });

  it('ES-T3866. [Organisation] Update phone number', () => {
    cy.log('Login')
      .visit('/')
      .log(`Login ${viewOrg.email}`)

      .loginToDashboard(
        viewOrg.email,
        viewOrg.password,
      )

      .navToTheAccountSettings()
      .wait('@GET_account.json')
      .verifyCurrentURL('/account/email-password')
      .waitAppLoaderNotVisible()
      .verifyBasicAccountSettingsPage(viewOrg.email, phone)
      .updatePhoneAS(newPhone)
    // Update back
      .updatePhoneAS(phone);
  });

  it('ES-T3867. [Organisation] Update Password', () => {
    cy.log('Login')
      .visit('/')
      .log(`Login ${viewOrg.email}`)

      .loginToDashboard(
        viewOrg.email,
        viewOrg.password,
      )

      .navToTheAccountSettings()
      .wait('@GET_account.json')
      .verifyCurrentURL('/account/email-password')
      .waitAppLoaderNotVisible()
      .verifyBasicAccountSettingsPage(viewOrg.email, phone)
      .updatePasswordAS(newPassword)
      .clickLogoutOnTopMenu()

      .loginToDashboard(
        viewOrg.email,
        newPassword,
      )
      .navToTheAccountSettings()
      .wait('@GET_account.json')
      .verifyCurrentURL('/account/email-password')
      .waitAppLoaderNotVisible()
      .verifyBasicAccountSettingsPage(viewOrg.email, phone)
      .updatePasswordAS(viewOrg.password);
  });
});
