import * as data from '../../../fixtures/test-data.json';
import faker from 'faker/locale/en_AU';

describe('Blocked number', () => {
  const adminEmail = data.dashboardAccount.adminAccount.email;
  const adminPass = data.dashboardAccount.adminAccount.password;

  beforeEach(() => {
    cy.visit('/').byPassAuthen();
  });

  it('ES-T2530. Check blocked numbers in admin page', () => {
    cy.log('Login as admin')
      .loginToDashboard(adminEmail, adminPass)

      .log('Verify Blocked number link is displayed')
      .verifyElementContainsText(
        'li.main-navigation-list__item',
        'Blocked numbers',
      );
  });

  it('ES-T2531. Check blocked numbers page', () => {
    cy.log('Login as admin')
      .loginToDashboard(adminEmail, adminPass)

      .log('Verify Blocked number page should be displayed')
      .navigateByLeftMenuInDashboard('Blocked numbers', true)
      .verifyCurrentURL('/blocked_numbers')
      .verifyElementContainsText('.section-title', 'Blocked Numbers');
  });

  it('ES-T2533. Check add a number to block page', () => {
    cy.log('Login as admin')
      .loginToDashboard(adminEmail, adminPass)

      .log('Verify Blocked number page should be displayed')
      .navigateByLeftMenuInDashboard('Blocked numbers', true)
      .verifyCurrentURL('/blocked_numbers')
      .verifyElementContainsText('.section-title', 'Blocked Numbers')

      .log('Click Block new number')
      .clickElementOnText('a', 'Block New Number')
      .verifyTextVisible('Add a number to block');
  });

  it('ES-T2534. Cancel adding block numbers', () => {
    const phone = faker.phone.phoneNumber();

    cy.log('Login as admin')
      .loginToDashboard(adminEmail, adminPass)

      .log('Verify Blocked number page should be displayed')
      .navigateByLeftMenuInDashboard('Blocked numbers', true)
      .verifyCurrentURL('/blocked_numbers')
      .verifyElementContainsText('.section-title', 'Blocked Numbers')

      .log('Click Block new number')
      .clickElementOnText('a', 'Block New Number')
      .verifyTextVisible('Add a number to block')

      .log('Input phone number')
      .inputTextField(data.blockerNumber.phoneNumberInput, phone)

      .log('Click Cancel btn')
      .clickElementOnText('.btn', 'Cancel')
      .verifyTextVisible('Blocked Numbers')
      .verifyTextNotExist(phone);
  });

  it('ES-T2535. Edit blocked number', () => {
    const phone = faker.phone.phoneNumber();

    cy.log('Login as admin')
      .loginToDashboard(adminEmail, adminPass)

      .log('Verify Blocked number page should be displayed')
      .navigateByLeftMenuInDashboard('Blocked numbers', true)
      .verifyCurrentURL('/blocked_numbers')
      .verifyElementContainsText('.section-title', 'Blocked Numbers')

      .log('Click Edit btn')
      .clickElementOnText('td a', 'Edit')
      .verifyTextVisible('Edit Number in block list')

      .log('Update phone number')
      .inputTextField(data.blockerNumber.phoneNumberInput, phone)

      .log('Click Update btn')
      .clickElement('input[type="submit"]')
      .verifyTextVisible('Phone number updated successfully')
      .verifyTextVisible(phone);
  });

  it('ES-T2536. Cancel edit numbers', () => {
    const phone = faker.phone.phoneNumber();

    cy.log('Login as admin')
      .loginToDashboard(adminEmail, adminPass)

      .log('Verify Blocked number page should be displayed')
      .navigateByLeftMenuInDashboard('Blocked numbers', true)
      .verifyCurrentURL('/blocked_numbers')
      .verifyElementContainsText('.section-title', 'Blocked Numbers')

      .log('Click Edit btn')
      .clickElementOnText('td a', 'Edit')
      .verifyTextVisible('Edit Number in block list')

      .log('Update phone number')
      .inputTextField(data.blockerNumber.phoneNumberInput, phone)

      .log('Click Cancel btn')
      .clickElementOnText('.btn', 'Cancel')
      .verifyTextVisible('Blocked Numbers')
      .verifyTextNotExist(phone);
  });

  it("ES-T2538. Check CTA's", () => {
    cy.log('Login as admin')
      .loginToDashboard(adminEmail, adminPass)

      .log('Verify Blocked number page should be displayed')
      .navigateByLeftMenuInDashboard('Blocked numbers', true)
      .verifyCurrentURL('/blocked_numbers')
      .verifyElementContainsText('.section-title', 'Blocked Numbers')

      .log('Check Block number page')
      .verifyElementVisible('input[type="submit"][value="Search"]')
      .verifyElementContainsText('a', 'Block New Number')
      .verifyElementContainsText('a', 'Edit')
      .verifyElementContainsText('a', 'Delete');
  });

  it('ES-T2537. Delete added number', () => {
    cy.log('Login as admin')
      .loginToDashboard(adminEmail, adminPass)

      .log('Verify Blocked number page should be displayed')
      .navigateByLeftMenuInDashboard('Blocked numbers', true)
      .verifyCurrentURL('/blocked_numbers')
      .verifyElementContainsText('.section-title', 'Blocked Numbers')

      .log('Click Delete btn')
      .clickElementOnText('td a', 'Delete')
      .verifyTextVisible('Phone number successfully deleted from blocked list');
  });

  it('ES-T2533. Add blocked number', () => {
    const phone = faker.phone.phoneNumber();

    cy.log('Login as admin')
      .loginToDashboard(adminEmail, adminPass)

      .log('Verify Blocked number page should be displayed')
      .navigateByLeftMenuInDashboard('Blocked numbers', true)
      .verifyCurrentURL('/blocked_numbers')
      .verifyElementContainsText('.section-title', 'Blocked Numbers')

      .log('Click Block new number')
      .clickElementOnText('a', 'Block New Number')
      .verifyTextVisible('Add a number to block')

      .log('Input phone number')
      .inputTextField(data.blockerNumber.phoneNumberInput, phone)

      .log('Input reason')
      .inputTextField(data.blockerNumber.reason, 'test automation')

      .log('Click Add btn')
      .clickElement('input[type="submit"][value="Add"]')
      .verifyTextVisible('Phone number added successfully')
      .verifyTextVisible(phone);
  });
});
