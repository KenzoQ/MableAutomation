import * as data from '../../../fixtures/test-data.json';

describe('Accept decline amended agreement', () => {
  const clientEmail = 'automation_junior.stamm.agreement+client@donotuse.com.au';
  const clientPass = 'qaAutomation2021';
  const clientId = '17876';
  const clientName = 'Junior';

  const workerEmail = 'automation_janell.waelchi.agreement+worker@donotuse.com.au';
  const workerPass = 'qaAutomation2021';
  const workerId = '17877';
  const workerName = 'Janell';

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it('1. ES-T108. Accept amended agreement \n 2. ES-T107. Check newly accepted amended agreement', () => {
    cy.removeAgreementIfExist(clientEmail, clientPass, workerId)
      .sendAgreementAsWorker(workerEmail, workerPass, clientId)

      .log('Login as worker')
      .loginToDashboard(workerEmail, workerPass)

      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log(`Select conversation with ${clientName}`)
      .clickElementOnText(data.agreement.client.inboxName, clientName)

      .log('Send a new message')
      .inputTextField(data.message.messageInput, 'send a new message')
      .clickElement(data.message.sendMessBtn, true)

      .log('Click Edit last sent offer')
      .verifyTextVisible('Edit last sent offer')
      .clickElementOnText('button span', 'Edit last sent offer')

      .log('Edit Agreed service field')
      .inputTextField(
        'textarea[formcontrolname="agreedService"]',
        'edit an offer',
      )
      .inputTextFieldAtPosition(data.agreement.worker.rateMount, '35', '0')
      .fillAgreedRate('35')
      .clickElementOnText('[aria-labelledby="jobFrequencyRadioLabel"] span', 'One-off')

      .log('Submit edit form')
      .clickElementOnText(
        '.agreementsActions button span',
        'Save and send to',
      )

      .log('Login as client')
      .loginToDashboard(clientEmail, clientPass)

      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log(`Select conversation with ${workerName}`)
      .clickElementOnText(data.agreement.client.inboxName, workerName)

      .log('Send a new message')
      .inputTextField(data.message.messageInput, 'send a new message')
      .clickElement(data.message.sendMessBtn, true)

      .clickElement('app-expansion-panel button>span')

      .log('Click Accept agrrment btn')
      .wait(1000)
      .clickOnText('Accept agreement')

      .navigateByLeftMenuInDashboard('My support workers')

      .log('Verify newly accept agreement is shown')
      .verifyTextVisible(workerName);
  });

  it('ES-T548. Check newly declined amended agreement', () => {
    cy.removeAgreementIfExist(clientEmail, clientPass, workerId)
      .sendAgreementAsWorker(workerEmail, workerPass, clientId)

      .log('Login as worker')
      .loginToDashboard(workerEmail, workerPass)

      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log(`Select conversation with ${clientName}`)
      .clickElementOnText(data.agreement.client.inboxName, clientName)

      .log('Send a new message')
      .inputTextField(data.message.messageInput, 'send a new message')
      .clickElement(data.message.sendMessBtn, true)

      .log('Click Edit last sent offer')
      .wait(1000)
      .clickElementOnText('button span', 'Edit last sent offer')

      .log('Edit Agreed service field')
      .inputTextField(
        'textarea[formcontrolname="agreedService"]',
        'edit an offer',
      )
      .inputTextFieldAtPosition(data.agreement.worker.rateMount, '35', '0')
      .fillAgreedRate('35')
      .clickElementOnText('[aria-labelledby="jobFrequencyRadioLabel"] span', 'One-off')

      .log('Submit edit form')
      .clickElementOnText(
        '.agreementsActions button span',
        'Save and send to',
      )

      .log('Login as client')
      .loginToDashboard(clientEmail, clientPass)

      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log(`Select conversation with ${workerName}`)
      .clickElementOnText(data.agreement.client.inboxName, workerName)

      .log('Send a new message')
      .inputTextField(data.message.messageInput, 'send a new message')
      .clickElement(data.message.sendMessBtn, true)

      .get('app-expansion-panel button>span')
      .trigger('mouseover')
      .clickElement('app-expansion-panel button>span')
      .verifyTextVisible('Agreement with')

      .log('Click Decline btn')
      .verifyTextExist('Accept agreement')
      .clickElementOnText('button span', 'Decline')

      .log('Verify client declined the pending agreeemnt successfully')
      .verifyTextNotExist('Accept agreement')
      .verifyTextVisible('Offer declined')

      .navigateByLeftMenuInDashboard('My support workers')

      .log('Verify newly declined agreement is shown')
      .verifyTextNotExist(workerName);
  });
});
