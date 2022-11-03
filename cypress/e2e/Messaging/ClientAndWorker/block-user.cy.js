import * as data from '../../../fixtures/test-data.json';
// Outdated
describe('Block user', () => {
  const workerEmail = 'automation_cherry.messaging+worker@donotuse.com.au';
  const workerPass = 'qaAutomation2021';
  const workerName = 'Shanika';
  const workerConversationId = '19571';

  const clientEmail = 'automation_cherry.blockedmessaging+client@donotuse.com.au';
  const clientPass = 'qaAutomation2021';
  const clientName = 'Loralee';
  const clientConversationId = '19567';

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it(`
    1. ES-T3199. Block a client
    2. ES-T3201. Check newly blocked client
  `, () => {
    cy
      .unBlockUserAPI(
        workerEmail,
        workerPass,
        workerConversationId,
      )
      .log('Login as worker')
      .loginToDashboard(workerEmail, workerPass)

      .log('Click Inbox on the left navigation')
      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log('Verify client can see new message of worker')
      .verifyTextVisible(clientName)

      .log('Click on client')
      .clickElementOnText(
        data.message.inboxName,
        clientName,
      )

      .log('Click Block btn')

      .clickElementOnText(
        'div.infoSection button',
        'Block',
      )

      .log('Click cancel btn')
      .waitAppLoaderNotVisible()
      .verifyElementVisible('mat-dialog-actions')
      .clickElementOnText(
        'mat-dialog-actions button',
        'Cancel',
      )

      .log('Click Block btn')
      .waitAppLoaderNotVisible()

      .clickElementOnText(
        'div.infoSection button',
        'Block',
      )

      .log('Select reason')
      .waitAppLoaderNotVisible()
      .verifyElementVisible('mat-dialog-actions')
      .selectDropdown(
        data.message.reasonSelect,
        'Persistent messaging',
      )

      .log('Enter note')
      .waitAppLoaderNotVisible()
      .inputTextField(
        data.message.reasonNote,
        'test block client',
      )

      .log('Click block btn')
      .clickElementOnText(
        'mat-dialog-actions button',
        'Block',
      )
      .log('Click close btn')
      .waitAppLoaderNotVisible()
      .clickElementOnText(
        '.mat-dialog-actions button',
        'Close',
      )
      .log('Check converstation page')
      .verifyTextVisible('You’ve blocked Loralee K.')
      .verifyElementContainsText(
        'div.infoSection button',
        'Unblock',
      )

      .log('Click Logout')
      .clickLogout()
      .log('VP. cy is redirected to login paga')
      .verifyRedirectToSignInPage()

      .log('Login as client')
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
      .verifyTextVisible('You can’t message or call them in this chat and you won’t receive their messages or calls.');
  });

  it(`
    1. ES-T3200. Unblock a client
    2. ES-TT3202. Check newly unblocked client
  `, () => {
    cy
      .blockUserAPI(
        workerEmail,
        workerPass,
        workerConversationId,
      )

      .log('Login as worker')
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

      .log('Click Unblock btn')
      .clickElementOnText(
        data.message.unblockBtn,
        'Unblock',
      )

      .log('Click cancel btn')
      .clickElementOnText(
        'mat-dialog-actions button',
        'Cancel',
      )

      .log('Click Unblock btn')
      .clickElementOnText(
        data.message.unblockBtn,
        'Unblock',
      )

      .log('Select reason')
      .selectDropdown(
        data.message.reasonSelect,
        'Accidentally blocked',
      )

      .log('Click block btn')
      .clickElementOnText(
        'mat-dialog-actions button',
        'Unblock',
      )

      .log('Input on message')
      .inputTextField(data.message.messageInput, 'send a new message')

      .log('Click send message')
      .clickElement(data.message.sendMessage, true)

      .log('Verify new message should be send')
      .wait(2000)
      .verifyElementContainsText(
        '.msgBody',
        'send a new message',
      )

      .log('Click Logout')
      .clickLogout()
      .log('VP. cy is redirected to login paga')
      .verifyRedirectToSignInPage()

      .log('Login as worker')
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
      .inputTextField(data.message.messageInput, 'client send a new message')

      .log('Click send message')
      .clickElement(data.message.sendMessage, true)

      .log('Verify new message should be send')
      .wait(2000)
      .verifyElementContainsText(
        '.msgBody',
        'client send a new message',
      );
  });

  it(`
    1. ES-T3203. Block a worker
    2. ES-T3205. Check newly blocked worker
  `, () => {
    cy
      .unBlockUserAPI(
        clientEmail,
        clientPass,
        clientConversationId,
      )

      .log('Login as client')
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

      .log('Click Block btn')
      .waitAppLoaderNotVisible()
      .clickElementOnText(
        'div.infoSection button',
        'Block',
      )

      .waitAppLoaderNotVisible()
      .log('Click cancel btn')
      .clickElementOnText(
        'mat-dialog-actions button',
        'Cancel',
      )

      .log('Click Block btn')
      .waitAppLoaderNotVisible()
      .clickElementOnText(
        'div.infoSection button',
        'Block',
      )

      .log('Select reason')
      .selectDropdown(
        data.message.reasonSelect,
        'Persistent messaging',
      )

      .log('Enter note')
      .inputTextField(
        data.message.reasonNote,
        'test block client',
      )

      .log('Click block btn')
      .clickElementOnText(
        'mat-dialog-actions button',
        'Block',
      )
      .waitAppLoaderNotVisible()
      .log('Click close btn')
      .clickElementOnText(
        '.mat-dialog-actions button',
        'Close',
      )
      .log('Check converstation page')
      .verifyTextVisible('You’ve blocked Shanika B.')
      .verifyElementContainsText(
        '.blockedInfo button',
        'Unblock',
      )

      .log('Click Logout')
      .clickLogout()
      .log('VP. cy is redirected to login paga')
      .verifyRedirectToSignInPage()

      .log('Login as worker')
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
      .verifyTextVisible('You can’t message or call them in this chat and you won’t receive their messages or calls.');
  });

  it(`
  1. ES-T3204. Unblock a worker
  2. ES-TT3206. Check newly unblocked worker
`, () => {
    cy
      .blockUserAPI(
        clientEmail,
        clientPass,
        clientConversationId,
      )

      .log('Login as worker')
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

      .log('Click Unblock btn')
      .clickElementOnText(
        data.message.unblockBtn,
        'Unblock',
      )

      .log('Click cancel btn')
      .clickElementOnText(
        'mat-dialog-actions button',
        'Cancel',
      )

      .log('Click Unblock btn')
      .clickElementOnText(
        data.message.unblockBtn,
        'Unblock',
      )

      .log('Select reason')
      .selectDropdown(
        data.message.reasonSelect,
        'Accidentally blocked',
      )

      .log('Click block btn')
      .clickElementOnText(
        'mat-dialog-actions button',
        'Unblock',
      )

      .log('Input on message')
      .inputTextField(data.message.messageInput, 'send a new message')

      .log('Click send message')
      .clickElement(data.message.sendMessage, true)

      .log('Verify new message should be send')
      .wait(2000)
      .verifyElementContainsText(
        '.msgBody',
        'send a new message',
      )

      .log('Click Logout')
      .clickLogout()
      .log('VP. cy is redirected to login paga')
      .verifyRedirectToSignInPage()

      .log('Login as worker')
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
      .inputTextField(data.message.messageInput, 'worker send a new message')

      .log('Click send message')
      .clickElement(data.message.sendMessage, true)

      .log('Verify new message should be send')
      .wait(2000)
      .verifyElementContainsText(
        '.msgBody',
        'worker send a new message',
      );
  });
});
