/* eslint-disable no-unused-vars */
import * as data from '../../../fixtures/test-data.json';
import faker from 'faker/locale/en_AU';

describe('Request Agreement', () => {
  const clientEmail = 'automation_junior.stamm.agreement+client@donotuse.com.au';
  const clientPass = 'qaAutomation2021';
  const clientId = '17876';
  const clientName = 'Junior';

  const workerEmail = 'automation_janell.waelchi.agreement+worker@donotuse.com.au';
  const workerPass = 'qaAutomation2021';
  const workerId = '17877';
  const workerName = 'Janell W';

  const workerEmail2 = 'automation_johnie.legros.agreement+worker2@donotuse.com.au';
  const workerPass2 = 'qaAutomation2021';

  const password = 'qaAutomation2021';
  const phone = '0491570110';
  //   const workerId2 = '17878';

  beforeEach(() => {
    cy.visit('/').byPassAuthen();
  });

  it('ES-T1945. View requested agreement', () => {
    cy.log('Login as worker')
      .loginToDashboard(workerEmail2, workerPass2)

      .navigateByLeftMenuInDashboard('Inbox')

      .log('Check pop menu')
      .verifyTextVisible(
        'The following users are requesting an offer of agreement',
      )
      .verifyElementContainsText('button span', 'Go to conversation')
      .verifyElementContainsText('button span', 'Dismiss Notification');
  });

  it('ES-T102. Check newly received requested agreement', () => {
    cy.log('Login as worker')
      .loginToDashboard(workerEmail2, workerPass2)

      .navigateByLeftMenuInDashboard('Inbox')

      .log('Verify the newly request agreement popup is shown')
      .verifyTextVisible(
        'The following users are requesting an offer of agreement',
      )

      .log('Click close popup')
      .clickElement(data.message.closeRequestedAgrPopup)

      .navigateByLeftMenuInDashboard('Jobs')
      .navigateByLeftMenuInDashboard('Inbox')

      .log('Verify the newly requested agreement popup is shown')
      .verifyTextVisible(
        'The following users are requesting an offer of agreement',
      )

      .log('Click "Go to conversation" on requested agreement popup')
      .clickElementOnText('button span', 'Go to conversation')
      .verifyTextVisible('Inbox');
  });

  it('ES-T946. Decline requested agreement', () => {
    cy.log('Login as worker')
      .loginToDashboard(workerEmail2, workerPass2)

      .navigateByLeftMenuInDashboard('Inbox')

      .log('Verify the newly request agreement popup is shown')
      .verifyTextVisible(
        'The following users are requesting an offer of agreement',
      )

      .log('Click "Go to conversation" on requested agreement popup')
      .clickElementOnText('button span', 'Go to conversation')
      .verifyTextVisible('Inbox');
  });

  it('ES-T947. Requested agreement popup - Close button Function', () => {
    cy.log('Login as worker')
      .loginToDashboard(workerEmail2, workerPass2)

      .navigateByLeftMenuInDashboard('Inbox')

      .log('Verify the newly request agreement popup is shown')
      .verifyTextVisible(
        'The following users are requesting an offer of agreement',
      )

      .log('Click close popup')
      .clickElement(data.message.closeRequestedAgrPopup)
      .verifyTextVisible('Inbox')
      .verifyTextNotExist(
        'The following users are requesting an offer of agreement',
      );
  });

  it('ES-T1413. Dismiss newly received requested agreement', () => {
    const email = faker.internet.email().toLowerCase();
    const firstName = faker.name.findName();
    const lastName = faker.name.lastName();
    const titleJob = faker.name.jobTitle();

    cy.signUpAClientAndApprovedByAPI(
      email,
      password,
      firstName,
      lastName,
      '2148',
      'Arndell Park',
      phone,
    )
      .createRegularJobByAPI(
        email,
        password,
        titleJob,
        'Arndell Park NSW 2148',
        '34464',
      )
      .then((res) => {
        const jobID = res.body.data.id;
        cy.wait(2000)
          .sendMessageToApplyJob(workerEmail2, workerPass2, jobID, 'VICE G.')
          .then((res) =>
            cy.requestAgreeentAsClient(
              email,
              password,
              res.body.data.attributes.conversation_id,
            ),
          );
      })
      .then(() => {
        cy.loginToDashboard(workerEmail2, workerPass2)

          .navigateByLeftMenuInDashboard('Inbox')

          .log('Verify the newly request agreement popup is shown')
          .verifyTextVisible(
            'The following users are requesting an offer of agreement',
          )

          .log('Dismiss notification the first newly request agreement')
          .get('app-requested-agreement p.bold')
          .eq(0)
          .then(($el) => {
            const name = $el.text();
            cy.get($el)
              .parent('div')
              .find('button span')
              .contains('Dismiss Notification')
              .click()

              .navigateByLeftMenuInDashboard('Dashboard')
              .navigateByLeftMenuInDashboard('Inbox')
              .verifyElementNotContainsText(
                'app-requested-agreement p.bold',
                name,
              );
          });
      });
  });

  it('ES-T68. Request agreement', () => {
    const clientEmail = 'automation_liezl.agreement+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    const workerId = '23099';
    const workerName = 'Boyd';
    const workerEmail = 'automation_boyd.agreement+sw@donotuse.com.au';
    const workerPass = 'qaAutomation2021';

    cy
      .declineAgreement(
        workerEmail,
        workerPass,
        workerId,
        clientEmail,
        clientPass,
      )
      .removeAgreementIfExist(
        clientEmail,
        clientPass,
        workerId,
      )

      .log('Login as client')
      .loginToDashboard(
        clientEmail,
        clientPass,
      )

      .navigateByLeftMenuInDashboard('Inbox')
      .wait(2000)
      .checkInboxPopup()

      .log('Select conversation with Carin')

      .moveToUntilFoundName(workerName)

      .clickElementOnText('.channelContent .title', workerName)

      .log('Send a new message')
      .inputTextField(data.message.messageInput, 'send a new message')
      .clickElement(data.message.sendMessBtn, true)

      .log('Verify the request agreement')
      .wait(1000)
      .verifyTextVisible('Inbox')
      .verifyTextVisible('Request an agreement')
      .verifyElementContainsText('button span', 'Request an agreement')

      .log('Click Request agreement')
      .clickElementOnText(
        'button span',
        'Request an agreement',
      )

      .log('Check Request agreement')
      .verifyTextNotExist('Request an agreement')
      .verifyTextVisible('Agreement requested');
  });

  it('ES-T1751. Request agreement to worker - BANNER WILL NOT BE DISPLAYED', () => {
    const clientEmail = 'automation_jaron+client@donotuse.com.au';
    const clietnPass = 'qaAutomation2021';
    const workerName = 'VICE';

    cy.log('Login as client')
      .loginToDashboard(clientEmail, clientPass)

      .navigateByLeftMenuInDashboard('Inbox')

      .log(`Select conversation with name: ${workerName}`)
      .clickElementOnText(data.agreement.client.inboxName, workerName)

      .log('Check conversation page')
      .verifyTextVisible('Inbox')
      .verifyTextVisible(workerName)

      .log('Verify share job description banner is not displayed')
      .verifyTextNotExist('Send your recent job description?');
  });

  it('ES-T1753. Worker has declined the agreement - BANNER WILL BE DISPLAYED', () => {
    const clientEmail = 'automation_benedict+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';
    const workerName = 'VICE';

    cy.log('Login as client')
      .loginToDashboard(clientEmail, clientPass)

      .navigateByLeftMenuInDashboard('Inbox')

      .log(`Select conversation with name: ${workerName}`)
      .clickElementOnText(data.agreement.client.inboxName, workerName)

      .log('Check conversation page')
      .verifyTextVisible('Inbox')
      .verifyTextVisible(workerName)

      .log('Verify share job description banner is displayed')
      .verifyTextVisible('Send your recent job description?')

      .navigateByLeftMenuInDashboard('Dashboard');
  });

  it(`1. ES-T572. Respond to requested agreement, with related job
      2. ES-T564. Check newly responded requested agreement`, () => {
    const titleJob = faker.name.jobTitle();

    const workerEmail = 'automation_oscar.agreement+sw@donotuse.com.au';
    const workerPass = 'qaAutomation2021';
    const workerId = '22894';

    const clientEmail = 'automation_jude.agreement+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy
      .removeAgreementIfExist(
        clientEmail,
        clientPass,
        workerId,
      )
      .createRegularJobByAPI(
        clientEmail,
        clientPass,
        titleJob,
        'Arndell Park NSW 2148',
        '34464',
      )
      .then((res) => {
        cy.wait(2000)
          .then((res) =>
            cy.requestAgreeentAsClient(
              clientEmail,
              clientPass,
              '14563',
            ),
          );
      })
      .then(() => {
        cy.loginToDashboard(workerEmail, workerPass)

          .navigateByLeftMenuInDashboard('Inbox')

          .log('Verify the newly request agreement popup is shown')
          .verifyTextVisible(
            'The following users are requesting an offer of agreement',
          )

          .log('Click the conversation of newly requested agreement')
          .clickElementOnText(
            'app-requested-agreement button span',
            'Go to conversation',
          )

          .log('Click Offer an agreement btn')
          .verifyTextVisible('Inbox')
          .verifyTextVisible('Offer an agreement')
          .clickElementOnText('button span', 'Offer an agreement')

          .log('Check create agreement page')
          .verifyTextVisible('Offer new agreement to')

          .log('Enter rate description')
          .inputTextFieldAtPosition(
            data.agreement.worker.rateDescription,
            'Add new rate',
            '0',
          )

          .log('Enter rate amount')
          .clickElementOnText('.radioLabel', 'Per hour')
          .inputTextFieldAtPosition(data.agreement.worker.rateMount, '30', '0')
          .log('Verify the error message is shown')
          .verifyElementContainsText(
            '.status span',
            'Offer a minimum rate of $32 for active support under our terms of use.',
          )

          .log('Enter rate amount')
          .inputTextFieldAtPosition(data.agreement.worker.rateMount, '35', '0')
          .inputTextFieldAtPosition(data.agreement.worker.rateMount, '35', '1')

          .log('Input Expected start date')
          .selectDropdown('app-date-selector[formcontrolname="expectedStartDate"] select', '1', 0)
          .selectDropdown('app-date-selector[formcontrolname="expectedStartDate"] select', 'January', 1)
          .selectDropdown('app-date-selector[formcontrolname="expectedStartDate"] select', '2024', 2)

          .log('Click Flat rate')
          .clickElementOnText(data.agreement.worker.rateRadio, 'Flat rate')

          .log('Enter Agreed services')
          .inputTextField(
            data.agreement.worker.agreedService,
            'automation testing',
          )

          .log('Click Submit btn')
          .clickElementOnText('button span', 'Save and send to')

          .log('Verify conversion page')
          .verifyTextVisible('Inbox')
          .verifyTextVisible('Edit last sent offer')

          .log('Click Edit last sent offer')
          .clickElementOnText('button span', 'Edit last sent offer')

          .log('Check amend agreement page')
          .verifyTextVisible('Edit proposed agreement with');
      });
  });

  it('ES-T3623. Respond to requested agreement, validation', () => {
    const workerEmail = 'automation_oscar.agreement+sw@donotuse.com.au';
    const workerPass = 'qaAutomation2021';
    const workerId = '22894';

    const clientEmail = 'automation_jude.agreement+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    const titleJob = faker.name.jobTitle();
    cy
      .removeAgreementIfExist(
        clientEmail,
        clientPass,
        workerId,
      )
      .createRegularJobByAPI(
        clientEmail,
        clientPass,
        titleJob,
        'Arndell Park NSW 2148',
        '34464',
      )
      .then((res) => {
        cy.wait(2000)
          .requestAgreeentAsClient(
            clientEmail,
            clientPass,
            '14563',
          );
      })

      .loginToDashboard(workerEmail, workerPass)
      .navigateByLeftMenuInDashboard('Inbox')

      .log('Verify the newly request agreement popup is shown')
      .verifyTextVisible(
        'The following users are requesting an offer of agreement',
      )

      .log('Click the conversation of newly requested agreement')
      .clickElementOnText(
        'app-requested-agreement button span',
        'Go to conversation',
      )

      .log('Click Offer an agreement btn')
      .verifyTextVisible('Inbox')
      .verifyTextVisible('Offer an agreement')
      .clickElementOnText('button span', 'Offer an agreement')

      .log('Check create agreement page')
      .verifyTextVisible('Offer new agreement to')

      .log('Click rate amount and enter rate amount that is > $32')
      .inputTextFieldAtPosition(data.agreement.worker.rateMount, '35', '0')
      .inputTextFieldAtPosition(data.agreement.worker.rateMount, '35', '1')
      .verifyTextNotExist(
        'Offer a minimum rate of $32 for active support under our terms of use.',
      )

      .log('On 24 hour rate (flat), remove the amount')
      .clearTextFieldAtPosition(data.agreement.worker.rateMount, 2)
      .verifyTextVisible('Please enter the agreed rate')

      .log('On 24 hour rate, enter 1')
      .inputTextFieldAtPosition(data.agreement.worker.rateMount, '1', '2')
      .verifyTextNotExist('Please enter the agreed rate')

      .log('Untick the flat rate')
      .clickElement(data.agreement.worker.flat, true, 4)

      .log('On 24 hour rate (flat), remove the amount')
      .clearTextFieldAtPosition(data.agreement.worker.rateMount, 2)
      .verifyTextVisible('Please enter the agreed rate')

      .log('On 24 hour rate, enter 1')
      .inputTextFieldAtPosition(data.agreement.worker.rateMount, '1', '2')
      .verifyTextVisible(
        'Offer a minimum rate of $32 for active support under our terms of use.',
      )

      .log('Click Add rate')
      .clickElementOnText('button span', 'Add another rate')

      .log('Delete rate')
      .wait(2000)
      .clickLastElement(data.agreement.worker.deleteRate);
  });

  it('ES-T563. Respond to requested agreement, no related job', () => {
    const titleJob = faker.name.jobTitle();

    const workerEmail = 'automation_oscar.agreement+sw@donotuse.com.au';
    const workerPass = 'qaAutomation2021';
    const workerId = '22894';

    const clientEmail = 'automation_jude.agreement+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy
      .removeAgreementIfExist(
        clientEmail,
        clientPass,
        workerId,
      )
      .createRegularJobByAPI(
        clientEmail,
        clientPass,
        titleJob,
        'Arndell Park NSW 2148',
        '34464',
      )
      .then((res) => {
        cy.wait(2000)
          .then((res) =>
            cy.requestAgreeentAsClient(
              clientEmail,
              clientPass,
              '14563',
            ),
          );
      })
      .then(() => {
        cy.loginToDashboard(workerEmail, workerPass)

          .navigateByLeftMenuInDashboard('Inbox')

          .log('Verify the newly request agreement popup is shown')
          .verifyTextVisible(
            'The following users are requesting an offer of agreement',
          )

          .log('Click the conversation of newly requested agreement')
          .clickElementOnText(
            'app-requested-agreement button span',
            'Go to conversation',
          )

          .log('Click Offer an agreement btn')
          .verifyTextVisible('Inbox')
          .verifyTextVisible('Offer an agreement')
          .clickElementOnText('button span', 'Offer an agreement')
          .wait(1000)

          .log('Check create agreement page')
          .verifyTextVisible('Offer new agreement to')
          .wait(1000)

          .log('Select no related job')
          .get('.radioLabel')
          .contains('A job not listed here')
          .parent('.radioBtn')
          .find('input[type="radio"]')
          .click()

          .log('Enter rate description')
          .inputTextFieldAtPosition(
            data.agreement.worker.rateDescription,
            'Add new rate',
            '0',
          )

          .log('Enter rate amount')
          .clickElementOnText('.radioLabel', 'Per hour')
          .inputTextFieldAtPosition(data.agreement.worker.rateMount, '20', '0')
          .log('Verify the error message is shown')
          .verifyTextVisible(
            'Offer a minimum rate of $32 for active support under our terms of use.',
          )

          .log('Enter rate amount')
          .inputTextFieldAtPosition(data.agreement.worker.rateMount, '35', '0')
          .fillAgreedRate('35')
          .verifyTextNotExist(
            'Offer a minimum rate of $32 for active support under our terms of use.',
          )

          .log('Input Expected start date')
          .selectDropdown('app-date-selector[formcontrolname="expectedStartDate"] select', '1', 0)
          .selectDropdown('app-date-selector[formcontrolname="expectedStartDate"] select', 'January', 1)
          .selectDropdown('app-date-selector[formcontrolname="expectedStartDate"] select', '2024', 2)

          .log('Click Flat rate')
          .clickElementOnText(data.agreement.worker.rateRadio, 'Flat rate')

          .log('Enter Agreed services')
          .inputTextField(
            data.agreement.worker.agreedService,
            'automation testing',
          )

          .log('Click Submit btn')
          .clickElementOnText('button span', 'Save and send to');
      });
  });
});
