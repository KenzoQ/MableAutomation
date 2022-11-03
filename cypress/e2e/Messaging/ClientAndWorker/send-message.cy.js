import * as data from '../../../fixtures/test-data.json';

describe('Send message', () => {
  const workerEmail = 'automation_cherry.messaging+worker@donotuse.com.au';
  const workerPass = 'qaAutomation2021';
  const workerName = 'Shanika';

  const clientEmail = 'automation_cherry.messaging+client@donotuse.com.au';
  const clientPass = 'qaAutomation2021';
  const clientName = 'Patrick';

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it('ES-T3119. Send message to Client', () => {
    cy.log('Login as worker')
      .loginToDashboard(workerEmail, workerPass)

      .log('Click Inbox on the left navigation')
      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log('Verify client can see new message of worker')
      .verifyTextVisible(clientName)

      .log('Click on worker')
      .clickElementOnText(
        data.message.inboxName,
        clientName,
      )

      .log('Input on message')
      .inputTextField(data.message.messageInput, 'test send message')

      .log('Click send message')
      .clickElement(data.message.sendMessage, true)

      .log('Verify new message should be send')
      .verifyElementContainsText(
        '.msgBody',
        'test send message',
      );
  });

  it('ES-T3120. Send message to Worker', () => {
    cy.log('Login as client')
      .loginToDashboard(clientEmail, clientPass)

      .log('Click Inbox on the left navigation')
      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log('Verify client can see new message of worker')
      .verifyTextVisible(workerName)

      .log('Click on worker')
      .clickElementOnText(
        data.message.inboxName,
        workerName,
      )

      .log('Input on message')
      .inputTextField(data.message.messageInput, 'test send message')

      .log('Click send message')
      .clickElement(data.message.sendMessage, true)

      .log('Verify new message should be send')
      .verifyElementContainsText(
        '.msgBody',
        'test send message',
      );
  });
});
