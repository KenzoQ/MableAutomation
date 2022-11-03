/* eslint-disable no-unused-vars */
import * as data from '../../../fixtures/test-data.json';

describe('Coodinator Account Settings', () => {
  const viewCoo = {
    email: 'automation_fletcher.esmund.accountsettings+coordinator@donotuse.com.au',
    password: 'qaAutomation2021',
    firstName: 'Fletcher',
    lastName: 'Esmund',
  };
  const phone = '0487458469';
  const newPhone = '0491570111';
  const newEmail = `e${viewCoo.email}`;
  const newPassword = 'qaAutomation2022';

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('ES-T3856. [Coordinator] View Account Settings', () => {
    cy
      .log(`Login ${viewCoo.email}`)

      .loginAPI(viewCoo.email,
        viewCoo.password)
      .visit('/dashboard')

      .navToTheAccountSettings()
      .wait('@GET_account.json')
      .verifyCurrentURL('/account/email-password')
      .waitAppLoaderNotVisible()

      .verifyBasicAccountSettingsPage(viewCoo.email, phone, viewCoo.firstName, viewCoo.lastName);
  });

  it('ES-T3857. [Coordinator] Validation of Username and password tab fields', () => {
    cy
      .log(`Login ${viewCoo.email}`)

      .loginAPI(viewCoo.email,
        viewCoo.password)
      .visit('/dashboard')

      .navToTheAccountSettings()
      .wait('@GET_account.json')
      .verifyCurrentURL('/account/email-password')
      .waitAppLoaderNotVisible()
      .waitAppLoaderNotVisible()

      .verifyBasicAccountSettingsPage(viewCoo.email, phone, viewCoo.firstName, viewCoo.lastName)
      .validateAllFieldsOfAccountSettingsPage(viewCoo.email,
        viewCoo.password,
        phone,
        viewCoo.firstName,
        viewCoo.lastName);
  });

  it('ES-T3858. [Coordinator] Update Email address', () => {
    cy
      .log(`Login ${viewCoo.email}`)

      .loginAPI(viewCoo.email,
        viewCoo.password)
      .visit('/dashboard')

      .navToTheAccountSettings()
      .wait('@GET_account.json')
      .verifyCurrentURL('/account/email-password')
      .waitAppLoaderNotVisible()
      .verifyBasicAccountSettingsPage(viewCoo.email, phone)
      .updateEmailAS(newEmail)
      .clickLogoutOnTopMenu()

      .loginToDashboard(
        newEmail,
        viewCoo.password,
      )
      .navToTheAccountSettings()
      .wait('@GET_account.json')
      .verifyCurrentURL('/account/email-password')
      .waitAppLoaderNotVisible()
      .verifyBasicAccountSettingsPage(newEmail, phone)
      .updateEmailAS(viewCoo.email);
  });

  it('ES-T3859. [Coordinator] Update phone number', () => {
    cy
      .log(`Login ${viewCoo.email}`)

      .loginAPI(viewCoo.email,
        viewCoo.password)
      .visit('/dashboard')

      .navToTheAccountSettings()
      .wait('@GET_account.json')
      .verifyCurrentURL('/account/email-password')
      .waitAppLoaderNotVisible()
      .verifyBasicAccountSettingsPage(viewCoo.email, phone)
      .updatePhoneAS(newPhone)
    // Update back
      .updatePhoneAS(phone);
  });

  it('ES-T3860. [Coordinator] Update Password', () => {
    cy
      .log(`Login ${viewCoo.email}`)

      .loginAPI(viewCoo.email,
        viewCoo.password)
      .visit('/dashboard')

      .navToTheAccountSettings()
      .wait('@GET_account.json')
      .verifyCurrentURL('/account/email-password')
      .waitAppLoaderNotVisible()
      .verifyBasicAccountSettingsPage(viewCoo.email, phone)
      .updatePasswordAS(newPassword)
      .clickLogoutOnTopMenu()

      .loginToDashboard(
        viewCoo.email,
        newPassword,
      )
      .navToTheAccountSettings()
      .wait('@GET_account.json')
      .verifyCurrentURL('/account/email-password')
      .waitAppLoaderNotVisible()
      .verifyBasicAccountSettingsPage(viewCoo.email, phone)
      .updatePasswordAS(viewCoo.password);
  });

  it('ES-T3861. [Coordinator] Update first name', () => {
    cy
      .log(`Login ${viewCoo.email}`)

      .loginAPI(viewCoo.email,
        viewCoo.password)
      .visit('/dashboard')

      .navToTheAccountSettings()
      .wait('@GET_account.json')
      .verifyCurrentURL('/account/email-password')
      .waitAppLoaderNotVisible()
      .verifyBasicAccountSettingsPage(viewCoo.email, phone)
      .updateFirstNameAS(`e${viewCoo.firstName}`)
    // Update back
      .updateFirstNameAS(viewCoo.firstName);
  });

  it('ES-T3862. [Coordinator] Update last name', () => {
    cy
      .log(`Login ${viewCoo.email}`)

      .loginAPI(viewCoo.email,
        viewCoo.password)
      .visit('/dashboard')

      .navToTheAccountSettings()
      .wait('@GET_account.json')
      .verifyCurrentURL('/account/email-password')
      .waitAppLoaderNotVisible()
      .verifyBasicAccountSettingsPage(viewCoo.email, phone)
      .updateLastNameAS(`e${viewCoo.lastName}`)
    // Update back
      .updateLastNameAS(viewCoo.lastName);
  });
});
