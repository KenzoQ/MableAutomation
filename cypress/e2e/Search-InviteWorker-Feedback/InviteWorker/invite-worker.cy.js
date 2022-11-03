import faker from 'faker/locale/en_AU';
import * as data from '../../../fixtures/test-data.json';

describe('Invite Worker', () => {
  const noInviteEmail = data.dashboardAccount.noInviteClientAccount.email;
  const noInvitePass = data.dashboardAccount.noInviteClientAccount.password;

  const hadInviteEmail = data.dashboardAccount.hcpClientAccount.email;
  const hadInvitePass = data.dashboardAccount.hcpClientAccount.password;

  const newWorkerEmail = faker.internet.email().toLowerCase();
  const newWorkerEmail02 = faker.internet.email().toLowerCase();

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it('ES-T786. Add New invite worker - Worker has No Mable account', () => {
    const firstName = 'first name';
    const lastName = 'last name';
    const email = faker.internet.email();

    cy
      .loginAPI(hadInviteEmail, hadInvitePass)
      .visit('/dashboard')

      .log('Go to the Invite workers')
      .navigateByLeftMenuInDashboard('Invite workers')
      .log('Verify that user is navigated to "Invite new worker" page')
      .verifyCurrentURL('invite')

      .log('Click Invite new worker')
      .clickElementOnText(data.inviteWorker.inviteBtn, 'Invite new worker')

      .verifyTextVisible(
        'Enter the details of someone you’d like to invite to your team',
      )

      .log('Enter first name')
      .inputTextField(data.inviteWorker.firstNameInput, firstName)

      .log('Enter last name')
      .inputTextField(data.inviteWorker.lastNameInput, lastName)

      .log('Enter email address')
      .inputTextField(data.inviteWorker.emailInput, email)

      .log('Click Invite button')
      .clickElementOnText(data.inviteWorker.inviteFormBtn, 'Invite')
      .wait(1000)

      .log('Verify the new worker is shown on the invite table')
      .verifyElementVisible('[aria-describedby="invitedCarerHeading"]')
      .get(data.inviteWorker.infoOnInviteTable)
      .contains(email)
      .parent()
      .find('td')
      .contains('Sent')
      .should('be.visible');
  });

  // Note: Had to running ES-T787 before running ES-788, 792
  it('ES-T787. Add New invite worker - Worker with existing Mable account', () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.firstName();

    cy.createWorkerAccountAPI(newWorkerEmail, 'password', firstName, lastName);
    cy
      .loginAPI(hadInviteEmail, hadInvitePass)
      .visit('/dashboard')

      .log('Navigate to the Invite workers')
      .navigateByLeftMenuInDashboard('Invite workers')
      .log('Verify that user is navigated to "Invite new worker" page')
      .verifyCurrentURL('invite')

      .log('Click Invite new worker')
      .clickElementOnText(data.inviteWorker.inviteBtn, 'Invite new worker')
      .verifyTextVisible(
        'Enter the details of someone you’d like to invite to your team',
      )

      .log('Enter first name')
      .inputTextField(data.inviteWorker.firstNameInput, firstName)

      .log('Enter last name')
      .inputTextField(data.inviteWorker.lastNameInput, lastName)

      .log('Enter email address')
      .inputTextField(data.inviteWorker.emailInput, newWorkerEmail)

      .log('Click Invite button')
      .clickElementOnText(data.inviteWorker.inviteFormBtn, 'Invite')
      .wait(1000)

      .log('Verify that "Great news" popup is shown')
      .verifyTextVisible('Great news!')
      .verifyElementContainsText('mat-dialog-container button', 'OK, got it')

      .log('Click "Ok, got it" button')
      .clickElementOnText('mat-dialog-container button', 'OK, got it')

      .log('Verify the new worker is shown on the invite table')
      .get(data.inviteWorker.infoOnInviteTable)
      .contains(newWorkerEmail)
      .parent()
      .find('td')
      .contains('Sent')
      .should('be.visible');
  });

  it('ES-T792. Accept Invitation', () => {
    cy
      .loginAPI(newWorkerEmail, 'password')
      .visit('/dashboard')
      .waitAppLoaderNotVisible()
      .checkAllPopups()

      .log('Check Invitations')
      .verifyTextVisible('Invitations')
      .verifyElementContainsText(
        data.inviteWorker.invitationSection.inviteBtn,
        'Decline',
      )
      .verifyElementContainsText(
        data.inviteWorker.invitationSection.inviteBtn,
        'Accept',
      )

      .log('Click Accept button')
      .clickElementOnText(
        data.inviteWorker.invitationSection.inviteBtn,
        'Accept',
      );
  });

  it('ES-T788. Invite new worker Field Validation', () => {
    const firstName = 'first name';
    const lastName = 'last name';
    const email = faker.internet.email();

    cy
      .loginAPI(hadInviteEmail, hadInvitePass)
      .visit('/dashboard')

      .log('Go to the Invite workers')
      .navigateByLeftMenuInDashboard('Invite workers')
      .log('Verify that user is navigated to "Invite new worker" page')
      .verifyCurrentURL('invite')

      .log('Click Invite new worker')
      .clickElementOnText(data.inviteWorker.inviteBtn, 'Invite new worker')
      .verifyTextVisible(
        'Enter the details of someone you’d like to invite to your team',
      )

      .log('Verify that all field on Invite form are empty')
      .getValueOfInput(data.inviteWorker.firstNameInput)
      .then((val) => expect(val).to.equal(''))

      .getValueOfInput(data.inviteWorker.lastNameInput)
      .then((val) => expect(val).to.equal(''))

      .getValueOfInput(data.inviteWorker.emailInput)
      .then((val) => expect(val).to.equal(''))

      .log('Verify the error message is shown when firstName field is empty')
      .clickElement(data.inviteWorker.firstNameInput)
      .clickElement(data.inviteWorker.lastNameInput)
      .verifyErrorMessageIsShown(
        data.inviteWorker.firstNameInput,
        'Input a first name',
      )

      .log('Enter firstName')
      .inputTextField(data.inviteWorker.firstNameInput, firstName)
      .verifyTextNotExist('Input a first name')

      .log('Verify the error message is shown when lastName field is empty')
      .clickElement(data.inviteWorker.lastNameInput)
      .clickElement(data.inviteWorker.firstNameInput)
      .verifyErrorMessageIsShown(
        data.inviteWorker.lastNameInput,
        'Input a last name',
      )

      .log('Enter lastName')
      .inputTextField(data.inviteWorker.lastNameInput, lastName)
      .verifyTextNotExist('Input a last name')

      .log('Verify the error message is shown when enter invalid eamil')
      .inputTextField(data.inviteWorker.emailInput, 'toantest')
      .verifyErrorMessageIsShown(
        data.inviteWorker.emailInput,
        'Input a valid email',
      )

      .log('Enter valid email')
      .inputTextField(data.inviteWorker.emailInput, email)
      .verifyTextNotExist('Input a valid email');
  });

  it('ES-T789. Cancel Invite new worker - client with invitation history', () => {
    const firstName = 'first name';
    const lastName = 'last name';
    const email = faker.internet.email();

    cy
      .loginAPI(hadInviteEmail, hadInvitePass)
      .visit('/dashboard')

      .log('Go to the Invite workers')
      .navigateByLeftMenuInDashboard('Invite workers')
      .log('Verify that user is navigated to "Invite new worker" page')
      .verifyCurrentURL('invite')

      .log('Click Invite new worker')
      .clickElementOnText(data.inviteWorker.inviteBtn, 'Invite new worker')
      .verifyTextVisible(
        'Enter the details of someone you’d like to invite to your team',
      )

      .log('Enter first name')
      .inputTextField(data.inviteWorker.firstNameInput, firstName)

      .log('Enter last name')
      .inputTextField(data.inviteWorker.lastNameInput, lastName)

      .log('Enter email address')
      .inputTextField(data.inviteWorker.emailInput, email)

      .log('Click Cancel button')
      .clickElementOnText(data.inviteWorker.inviteFormBtn, 'Cancel')

      .log('Verify the worker is not shown on the invite table')
      .get(data.inviteWorker.infoOnInviteTable)
      .contains(email)
      .should('not.exist');
  });

  it('ES-T791. Invite new worker - Client with Invitation History - Back button functionality', () => {
    cy
      .loginAPI(hadInviteEmail, hadInvitePass)
      .visit('/dashboard')

      .log('Go to the Invite workers')
      .navigateByLeftMenuInDashboard('Invite workers')
      .log('Verify that user is navigated to "Invite new worker" page')
      .verifyCurrentURL('invite')

      .log('Click Invite new worker')
      .clickElementOnText(data.inviteWorker.inviteBtn, 'Invite new worker')

      .log('Check Invite new worker page')
      .verifyTextVisible(
        'Enter the details of someone you’d like to invite to your team',
      )

      .log('Click Back button')
      .clickElement(data.inviteWorker.backBtn)
      .verifyTextVisible('Invited workers');
  });

  it('ES-T794. Verify Status of Newly accepted invitation', () => {
    cy
      .loginAPI(hadInviteEmail, hadInvitePass)
      .visit('/dashboard')

      .log('Go to the Invite workers')
      .navigateByLeftMenuInDashboard('Invite workers')
      .log('Verify that user is navigated to "Invite new worker" page')
      .verifyCurrentURL('invite')

      .log('Click the name worker to wiew the Profile')
      .get(data.inviteWorker.statusInvite)
      .contains('Accepted')
      .parents('tr')
      .find('td>span')
      .click()
      .verifyTextVisible('Support Worker');
  });

  it('ES-T797. Cancel Invite new worker - Client with no invitation history', () => {
    const firstName = 'first name';
    const lastName = 'last name';
    const email = faker.internet.email();

    cy
      .loginAPI(noInviteEmail, noInvitePass)
      .visit('/dashboard')

      .log('Go to the Invite workers')
      .navigateByLeftMenuInDashboard('Invite workers')

      .log('Enter first name')
      .inputTextField(data.inviteWorker.firstNameInput, firstName)

      .log('Enter last name')
      .inputTextField(data.inviteWorker.lastNameInput, lastName)

      .log('Enter email address')
      .inputTextField(data.inviteWorker.emailInput, email)

      .log('Click Cancel button')
      .clickElementOnText(data.inviteWorker.inviteFormBtn, 'Cancel')

      .log('Go to the Invite workers')
      .navigateByLeftMenuInDashboard('Invite workers')

      .log('Click Cancel button')
      .clickElementOnText(data.inviteWorker.inviteFormBtn, 'Cancel');
  });

  it('ES-T798. Invite new worker - Back button functionality - Client has no invitation history', () => {
    cy
      .loginAPI(noInviteEmail, noInvitePass)
      .visit('/dashboard')

      .log('Go to the Invite workers')
      .navigateByLeftMenuInDashboard('Invite workers')

      .log('Click Cancel button')
      .clickElementOnText(data.inviteWorker.inviteFormBtn, 'Cancel')

      .log('Go to the Invite workers')
      .navigateByLeftMenuInDashboard('Invite workers')

      .log('Click Cancel button')
      .clickElementOnText(data.inviteWorker.inviteFormBtn, 'Cancel');
  });

  it('Pre-conditon for ES-T793 Add New invite worker', () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.firstName();

    cy.createWorkerAccountAPI(newWorkerEmail02, 'password', firstName, lastName);
    cy
      .loginAPI(hadInviteEmail, hadInvitePass)
      .visit('/dashboard')

      .log('Navigate to the Invite workers')
      .navigateByLeftMenuInDashboard('Invite workers')
      .log('Verify that user is navigated to "Invite new worker" page')
      .verifyCurrentURL('invite')

      .log('Click Invite new worker')
      .clickElementOnText(data.inviteWorker.inviteBtn, 'Invite new worker')
      .verifyTextVisible(
        'Enter the details of someone you’d like to invite to your team',
      )

      .log('Enter first name')
      .inputTextField(data.inviteWorker.firstNameInput, firstName)

      .log('Enter last name')
      .inputTextField(data.inviteWorker.lastNameInput, lastName)

      .log('Enter email address')
      .inputTextField(data.inviteWorker.emailInput, newWorkerEmail02)

      .log('Click Invite button')
      .clickElementOnText(data.inviteWorker.inviteFormBtn, 'Invite')
      .wait(1000)

      .log('Verify that "Great news" popup is shown')
      .verifyTextVisible('Great news!')
      .verifyElementContainsText('mat-dialog-container button', 'OK, got it')

      .log('Click "Ok, got it" button')
      .clickElementOnText('mat-dialog-container button', 'OK, got it')

      .log('Verify the new worker is shown on the invite table')
      .get(data.inviteWorker.infoOnInviteTable)
      .contains(newWorkerEmail02)
      .parent()
      .find('td')
      .contains('Sent')
      .should('be.visible');
  });

  it('ES-T793. Decline Invitation', () => {
    cy
      .loginAPI(newWorkerEmail02, 'password')
      .visit('/dashboard')
      .waitAppLoaderNotVisible()
      .checkAllPopups()

      .log('Check Invitations')
      .verifyTextVisible('Invitations')
      .verifyElementContainsText(
        data.inviteWorker.invitationSection.inviteBtn,
        'Decline',
      )
      .verifyElementContainsText(
        data.inviteWorker.invitationSection.inviteBtn,
        'Accept',
      )

      .log('Click Accept button')
      .get(data.inviteWorker.invitationSection.inviteBtn)
      .contains('Decline')
      .trigger('mouseover')
      .click()
      .wait(1000)
      .verifyTextVisible('declined');
  });

  it('ES-T795. Verify Status of Newly declined invitation', () => {
    cy
      .loginAPI(hadInviteEmail, hadInvitePass)
      .visit('/dashboard')
      .waitAppLoaderNotVisible()
      .checkAllPopups()

      .log('Go to the Invite workers')
      .navigateByLeftMenuInDashboard('Invite workers')
      .log('Verify that user is navigated to "Invite new worker" page')
      .verifyCurrentURL('invite')

      .log('Verify the new worker is shown on the invite table')
      .get(data.inviteWorker.infoOnInviteTable)
      .contains(newWorkerEmail02)
      .parent()
      .find('td')
      .contains('Declined')
      .should('be.visible');
  });
});
