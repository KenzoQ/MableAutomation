/* eslint-disable no-unused-vars */
import * as data from '../../../fixtures/test-data.json';

describe('Amended Agreement', () => {
  const clientEmail = 'automation_junior.stamm.agreement+client@donotuse.com.au';
  const clientPass = 'qaAutomation2021';
  const clientId = '17876';
  const clientName = 'Junior';

  const workerEmail2 = 'automation_johnie.legros.agreement+worker2@donotuse.com.au';
  const workerPass2 = 'qaAutomation2021';
  const workerId2 = '17878';

  const workerEmail3 = 'automation_karl.agreement+sw@donotuse.com.au';
  const workerPass3 = 'qaAutomation2021';
  const workerId3 = '23096';

  const clientEmail3 = 'automation_liezl.agreement+client@donotuse.com.au';
  const clientPass3 = 'qaAutomation2021';
  const clientId3 = '24855';
  const clientName3 = 'Liezl';

  const des = 'automation testing';

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it('ES-T3624. Amend agreement, validation', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(workerEmail2, workerPass2)

      .log('Go to the My Clients')
      .navigateByLeftMenuInDashboard('My clients')

      .log('Click View Agrrement')
      .verifyElementContainsText('h1', 'My clients')
      .clickElementOnText('app-clients-list button span', 'View agreement')

      .log('Click Update agreement btn')
      .clickElement(data.agreement.worker.collapseBtn)
      .clickElementOnText('button span', 'Update agreement')
      .verifyTextVisible('Amend agreement with')

      .log('Check rate')
      .log('Click rate amount and enter rate amount that is < $25')
      .inputTextFieldAtPosition(data.agreement.worker.rateMount, '24', '0')
      .verifyTextVisible('Offer a minimum rate of $32 for active support under our terms of use.')

      .log('Click rate amount and enter rate amount that is > $25')
      .inputTextFieldAtPosition(data.agreement.worker.rateMount, '35', '0')
      .verifyTextNotExist('Offer a minimum rate of $25 for active support under our terms of use.')

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
      .verifyTextVisible('Offer a minimum rate of $32 for active support under our terms of use.')

      .log('Click Add rate')
      .clickElementOnText(
        'button span',
        'Add another rate',
      )

      .log('Delete rate')
      .wait(2000)
      .clickLastElement(
        data.agreement.worker.deleteRate,
      )

      .log('Clear the Agreed service')
      .clearTextField(data.agreement.worker.agreedService)

      .log('Click submit btn')
      .clickElementOnText('button span', 'Save and send to')
      .wait(500)
      .verifyTextVisible('Some form fields are incomplete');
  });

  it(`
    1. ES-T104. Amend pending agreement by clicking "Edit last sent offer" in Inbox 
    2. ES-T568. Check newly amended pending agreement
  `, () => {
    cy
      .removeAgreementIfExist(
        clientEmail,
        clientPass,
        workerId2,
      )
      .sendAgreementAsWorker(
        workerEmail2,
        workerPass2,
        clientId,
      )
      .log('Login as worker')
      .loginToDashboard(workerEmail2, workerPass2)

      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log(`Select conversation ${clientName}`)
      .clickElementOnText(data.agreement.worker.inboxName, clientName)

      .log('Send a new message')
      .inputTextField(data.message.messageInput, 'send a new message')
      .clickElement(data.message.sendMessBtn, true)

      .log('Click Edit last send offer')
      .clickElementOnText('button span', 'Edit last sent offer')

      .log('Check amend agreement page')
      .verifyTextVisible('Edit proposed agreement with')

      .log('Update rate description')
      .inputTextFieldAtPosition(
        data.agreement.worker.rateDescription,
        'Update rate description',
        '0',
      )

      .log('Update rate amount')
      .inputTextFieldAtPosition(data.agreement.worker.rateMount, '35', '0')
      .fillAgreedRate('35')

      .log('Enter Agreed services')
      .inputTextField(
        data.agreement.worker.agreedService,
        'Update last send offer',
      )

      .verifyTextNotExist('Offer a minimum rate of $32 for active support under our terms of use.')

      .log('Click Flat rate')
      .clickAllRadioHaveName('Flat rate')

      .log('Click No, we\'ll discuss and update the agreement later')
      .clickElementOnText(data.agreement.worker.rateRadio, 'No, we\'ll discuss and update the agreement later')

      .clickElementOnText('[aria-labelledby="jobFrequencyRadioLabel"] span', 'One-off')

      .log('Click Submit btn')
      .clickElementOnText('button span', 'Save and send to')

      .log('Check conversation')
      .verifyTextVisible('Edit last sent offer')

      .log('Click Edit last sent offer')
      .clickElementOnText('button span', 'Edit last sent offer')

      .log('Check amend agreement page')
      .verifyTextVisible('Edit proposed agreement with')

      .log('Check agreement detail')
      .getAttribute(data.agreement.worker.rateDescription, 'val')
      .then((text) => expect(text).to.equal('Update rate description'))

      .getAttribute(data.agreement.worker.rateMount, 'val')
      .then((text) => expect(text).to.equal('35'))

      .getAttribute(data.agreement.worker.agreedService, 'val')
      .then((text) => expect(text).to.equal('Update last send offer'));
  });

  it(`
    1. ES-T111. Amend active agreement from conversation page 
    2. ES-T570. Check newly amended active agreement
  `, () => {
    cy.log('Create an amend agreement from SP.');

    cy.removeAgreementIfExist(clientEmail, clientPass, workerId2)
      .sendAgreementAsWorker(workerEmail2, workerPass2, clientId)
      .log('Login as worker')
      .loginToDashboard(
        workerEmail2,
        workerPass2,
      )

      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log(`Go to conversations and select Liezl${clientName}}`)
      .clickElementOnText(data.agreement.worker.inboxName, clientName)

      .log('Click Amend Agreement | Edit last send offer')
      .verifyTextExist('Edit last sent offer')
      .clickElementOnText('button span', 'Edit last sent offer', 1000)
      .verifyCurrentURL('/agreement')

      .log('Check information')
      .verifyTextVisible('Edit proposed agreement with')
      .verifyListTextExistNoWait(['Service', 'Service description'])
      .verifyListTextExistNoWait(['Dates and times', 'Job type', 'Ongoing', 'One-off', 'Have you agreed on dates and times?', 'Yes', 'No, we\'ll discuss and update the agreement later'])
      .verifyTextExist('Adding agreed dates, days and times for your support sessions so it’s clear when you’ll provide support. You can change this information at any time by updating the agreement.')
      .verifyListTextExistNoWait(['Rates', 'Description', 'Agreed rate', 'Includes 10% worker service fee', 'Per hour', 'Flat rate', 'Delete rate'])

      .log('Click rate description then update')
      .inputTextFieldAtPosition(
        data.agreement.worker.rateDescription,
        'Weekday',
        '0',
      )

      .log('Click rate amount then update')
      .inputTextFieldAtPosition(data.agreement.worker.rateMount, '35', '0')

      .log('Click "Add rate"')
      .clickElementOnText('span', 'Add another rate')

      .log('Click rate description and enter rate description')
      .inputTextFieldAtPosition(
        data.agreement.worker.rateDescription,
        'new Rate',
        0,
        true,
      )
      .log('Click rate amount and enter rate amount')
      .inputTextFieldAtPosition(data.agreement.worker.rateMount, '35', 0,
        true)

      .log('Click flat rate')
      .get(data.agreement.worker.rateRadio)
      .last()
      .contains('Flat rate')
      .click({ force: true })

      .clickElementOnText('span', 'Ongoing')
      .inputTextFieldAtPosition(data.agreement.worker.rateMount, '35', '1')

      // edit last fields
      .get(data.agreement.worker.rateDescription)
      .last()
      .should('exist')
      .clear()
      .type('new Rate')
      .get(data.agreement.worker.rateMount)
      .last()
      .should('exist')
      .clear()
      .type('35')

      .log(`Click "Save and send to ${clientName}`)
      .clickElementOnText('button span', 'Save and send to')

      .log('ES-T570. Check newly amended active agreement')
      .log('Check conversation page')
      .verifyTextExist('Inbox')

      .log('Check "Amend agreement" | Edit last send offer button')
      .verifyTextExist('Edit last sent offer')

      .log('Click Amend Agreement | Edit last send offer')
      .clickElementOnText('button span', 'Edit last sent offer', 1000)
      .verifyCurrentURL('/agreement')

      .log('Check agreement details')
      .get('textarea[formcontrolname="agreedService"]')
      .invoke('val')
      .then((text) => expect(text).to.equal('Automation testing'))

      .get(data.agreement.worker.rateDescription)
      .last()
      .invoke('val')
      .then((text) => expect(text).to.equal('new Rate'))

      .get(data.agreement.worker.rateMount)
      .last()
      .invoke('val')
      .then((text) => expect(text).to.equal('35'));
  });

  it('ES-T1903. Amend agreement', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(workerEmail2, workerPass2)

      .log('Go to the My Clients')
      .navigateByLeftMenuInDashboard('My clients')

      .log('Click View Agrrement')
      .clickElementOnText('app-clients-list button span', 'View agreement')

      .log('Click Update agreement btn')
      .clickElement(data.agreement.worker.collapseBtn)
      .clickElementOnText('button span', 'Update agreement')
      .verifyTextVisible('Amend agreement with')

      .log('Click Delete rate btn')
      .clickElementOnText('button span', 'Delete rate')

      .log('Click "Add another rate" btn')
      .clickElementOnText('button span', 'Add another rate')

      .log('Click Cancel btn')
      .clickElementOnText('button span', 'Cancel')

      .log('Click Update agreement btn')
      .verifyTextVisible('Manage agreement')
      .clickElement(data.agreement.worker.collapseBtn)
      .log('Check Update agreement and Terminate agreement btn')
      .clickElementOnText('.message button span', 'Update agreement')
      .verifyTextVisible('Amend agreement with')

      .log('Click Back btn')
      .clickElement(data.agreement.worker.backBtn)

      .log('Click Update agreement btn')
      .clickElement(data.agreement.worker.collapseBtn)
      .log('Check Update agreement and Terminate agreement btn')
      .clickElementOnText('.message button span', 'Update agreement')
      .verifyTextVisible('Amend agreement with')

      .log('Leave Agreed service null')
      .clearTextField(data.agreement.worker.agreedService)

      .log('Click submit btn')
      .clickElementOnText('button span', 'Save and send to')

      .log('The error message is shown')
      .verifyTextVisible('Please enter agreed service details')

      .log('Input Agreed serive field')
      .inputTextField(data.agreement.worker.agreedService, 'Amend agreement')

      .log('Update rate amount')
      .inputTextFieldAtPosition(data.agreement.worker.rateMount, '35', '0')

      .fillAgreedRate('35')

      .log('Click submit btn')
      .clickElementOnText('button span', 'Save and send to')
      .wait(500)
      .verifyTextVisible('Agreement with')
      .verifyTextVisible('Manage agreement');
  });
});
