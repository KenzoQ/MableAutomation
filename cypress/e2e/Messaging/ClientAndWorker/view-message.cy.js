import * as data from '../../../fixtures/test-data.json';

describe('View message', () => {
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

  it('ES-T3196. Check newly received message from client', () => {
    cy.log('Send a new message toc client ')
      .loginToDashboard(workerEmail, workerPass)

      .log('Click Inbox on the left navigation')
      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log('Click on client')
      .clickElementOnText(
        data.message.inboxName,
        clientName,
      )

      .log('Input on message')
      .inputTextField(data.message.messageInput, 'worker send message')

      .log('Click send message')
      .clickElement(data.message.sendMessage, true)

      .log('Login as client')
      .loginToDashboard(clientEmail, clientPass)

      .log('Click Inbox on the left navigation')
      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log('Verify client can see new message of worker')
      .verifyTextVisible(workerName)
      .verifyElementVisible(data.message.notify)

      .log('Click on worker')
      .clickElementOnText(
        data.message.inboxName,
        workerName,
      )

      .log('Verify user is navigated to conversation page')
      .verifyTextVisible('Inbox')
      .verifyTextVisible(workerName)
      .verifyTextVisible('worker send message');
  });

  it('ES-T3195. Check newly received message from worker', () => {
    cy.log('Send a new message to worker')
      .loginToDashboard(clientEmail, clientPass)

      .log('Click Inbox on the left navigation')
      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log('Click on client')
      .clickElementOnText(
        data.message.inboxName,
        workerName,
      )

      .log('Input on message')
      .inputTextField(data.message.messageInput, 'client send message')

      .log('Click send message')
      .clickElement(data.message.sendMessage, true)

      .log('Login as worker')
      .loginToDashboard(workerEmail, workerPass)

      .log('Click Inbox on the left navigation')
      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log('Verify client can see new message of worker')
      .verifyTextVisible(clientName)
      .verifyElementVisible(data.message.notify)

      .log('Click on worker')
      .clickElementOnText(
        data.message.inboxName,
        clientName,
      )

      .log('Verify user is navigated to conversation page')
      .verifyTextVisible('Inbox')
      .verifyTextVisible(clientName)
      .verifyTextVisible('client send message');
  });

  it('ES-T3197. Viewed sent message by worker', () => {
    cy.log('Login as worker')
      .loginToDashboard(workerEmail, workerPass)

      .log('Click Inbox on the left navigation')
      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log('Click on worker')
      .clickElementOnText(
        data.message.inboxName,
        clientName,
      )

      .log('Verify user is navigated to conversation page')
      .verifyTextVisible('Inbox')
      .verifyTextVisible(clientName)

      .log('Verify the viewed message should be marked as Read')
      .verifyElementExist('.statusIcon .read');
  });

  it('ES-T3198. Viewed sent message by client', () => {
    cy.log('Login as worker')
      .loginToDashboard(clientEmail, clientPass)

      .log('Click Inbox on the left navigation')
      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log('Click on worker')
      .clickElementOnText(
        data.message.inboxName,
        workerName,
      )

      .log('Verify user is navigated to conversation page')
      .verifyTextVisible('Inbox')
      .verifyTextVisible(workerName)

      .log('Verify the viewed message should be marked as Read')
      .verifyElementExist('.statusIcon .read');
  });
});
