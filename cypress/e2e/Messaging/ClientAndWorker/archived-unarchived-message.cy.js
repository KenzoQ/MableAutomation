import * as data from '../../../fixtures/test-data.json';

describe('Archived-Unarchived message', () => {
  const workerEmail =
    'automation_cherry.archivemessaging+worker@donotuse.com.au';
  const workerPass = 'qaAutomation2021';
  const workerName = 'Raymon';

  const clientEmail =
    'automation_cherry.archivemessaging+client@donotuse.com.au';
  const clientPass = 'qaAutomation2021';
  const clientName = 'Brent';

  beforeEach(() => {
    cy.visit('/').byPassAuthen();
  });

  it(`
    1. ES-T959. [Client] Archived Conversation 
    2. ES-T3190. [Client] Unarchived Conversation
  `, () => {
    cy.log('Login as client')
      .loginToDashboard(clientEmail, clientPass)

      .log('Click Inbox on the left navigation')
      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log('Verify client can see new message of worker')
      .verifyTextVisible(workerName)

      .log('Click on worker')
      .clickElementOnText(data.message.inboxName, workerName)

      .log('Click Archive btn')
      .clickElementOnText('.infoSectionItem span', 'Archive chat')
      .verifyElementContainsText('mat-dialog-container h2', 'Archive chat?')

      .log('Click Cancel btn')
      .clickElementOnText('mat-dialog-actions button', 'Cancel')

      .log('Click Archive btn')
      .clickElementOnText('.infoSectionItem span', 'Archive chat')
      .verifyElementContainsText('mat-dialog-container h2', 'Archive chat?')

      .log('Click Archive btn')
      .clickElementOnText('mat-dialog-actions button', 'Archive')

      .log('Verify Archive sucessfully')
      .verifyTextVisible('Chat archived')
      .verifyElementContainsText('.infoSectionItem span', 'Unarchive chat')
      .verifyElementContainsText('app-channel-list h2', 'Archived chats')

      .log('Click on worker')
      .clickElementOnText(data.message.inboxName, workerName)

      .log('Click Unarchive btn')
      .clickElementOnText('.infoSectionItem span', 'Unarchive chat')

      .log('Verify Unarchive successfully')
      .verifyTextVisible('Chat archived')
      .verifyElementContainsText('.infoSectionItem span', 'Archive chat')
      .verifyElementContainsText('app-channel-list h1', 'Inbox');
  });

  it('ES-T5725 [Client] Unarchived Conversation by sending new message', () => {
    cy.log('Login as client')
      .loginToDashboard(clientEmail, clientPass)

      .log('Click Inbox on the left navigation')
      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log('Verify client can see new message of worker')
      .verifyTextVisible(workerName)

      .log('Click on worker')
      .clickElementOnText(data.message.inboxName, workerName)

      .log('Click Archive btn')
      .clickElementOnText('.infoSectionItem span', 'Archive chat')
      .verifyElementContainsText('mat-dialog-container h2', 'Archive chat?')

      .log('Click Cancel btn')
      .clickElementOnText('mat-dialog-actions button', 'Cancel')

      .log('Click Archive btn')
      .clickElementOnText('.infoSectionItem span', 'Archive chat')
      .verifyElementContainsText('mat-dialog-container h2', 'Archive chat?')

      .log('Click Archive btn')
      .clickElementOnText('mat-dialog-actions button', 'Archive')

      .log('Verify Archive sucessfully')
      .verifyTextVisible('Chat archived')
      .verifyElementContainsText('.infoSectionItem span', 'Unarchive chat')
      .verifyElementContainsText('app-channel-list h2', 'Archived chats')

      .log('Back Inbox page')
      .navigateByLeftMenuInDashboard('Dashboard')
      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log('View archived chat')
      .clickElement('.chatHeaderActions .actionMenuButton')
      .clickElementOnText(
        'button.mat-menu-item',
        'View archived chat',
      )

      .log('Click on worker')
      .clickElementOnText(data.message.inboxName, workerName)
      .verifyElementContainsText('.infoSectionItem span', 'Unarchive chat')

      .log('Send a new message')
      .inputTextField(data.message.messageInput, 'send a new message')
      .clickElement(data.message.sendMessBtn, true)

      .log('Verify unarchived sucessfully')
      .verifyElementContainsText('.infoSectionItem span', 'Archive chat')
      .verifyElementContainsText('app-channel-list h1', 'Inbox');
  });

  it(`
    1. ES-T3189. [Worker] Archived Conversation 
    2. ES-T3191. [Worker] Unarchived Conversation
  `, () => {
    cy.log('Login as worker')
      .loginToDashboard(workerEmail, workerPass)

      .log('Click Inbox on the left navigation')
      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log('Verify client can see new message of worker')
      .verifyTextVisible(clientName)

      .log('Click on worker')
      .clickElementOnText(data.message.inboxName, clientName)

      .log('Click Archive btn')
      .clickElementOnText('.infoSectionItem span', 'Archive chat')
      .verifyElementContainsText('mat-dialog-container h2', 'Archive chat?')

      .log('Click Cancel btn')
      .clickElementOnText('mat-dialog-actions button', 'Cancel')

      .log('Click Archive btn')
      .clickElementOnText('.infoSectionItem span', 'Archive chat')
      .verifyElementContainsText('mat-dialog-container h2', 'Archive chat?')

      .log('Click Archive btn')
      .clickElementOnText('mat-dialog-actions button', 'Archive')

      .log('Verify Archive sucessfully')
      .verifyTextVisible('Chat archived')
      .verifyElementContainsText('.infoSectionItem span', 'Unarchive chat')
      .verifyElementContainsText('app-channel-list h2', 'Archived chats')

      .log('Click on worker')
      .clickElementOnText(data.message.inboxName, clientName)

      .log('Click Unarchive btn')
      .clickElementOnText('.infoSectionItem span', 'Unarchive chat')

      .log('Verify Unarchive successfully')
      .verifyTextVisible('Chat archived')
      .verifyElementContainsText('.infoSectionItem span', 'Archive chat')
      .verifyElementContainsText('app-channel-list h1', 'Inbox');
  });

  it('ES-T5724 [Worker] Unarchived Conversation by sending new message', () => {
    cy.log('Login as worker')
      .loginToDashboard(workerEmail, workerPass)

      .log('Click Inbox on the left navigation')
      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log('Verify client can see new message of worker')
      .verifyTextVisible(clientName)

      .log('Click on worker')
      .clickElementOnText(data.message.inboxName, clientName)

      .log('Click Archive btn')
      .clickElementOnText('.infoSectionItem span', 'Archive chat')
      .verifyElementContainsText('mat-dialog-container h2', 'Archive chat?')

      .log('Click Cancel btn')
      .clickElementOnText('mat-dialog-actions button', 'Cancel')

      .log('Click Archive btn')
      .clickElementOnText('.infoSectionItem span', 'Archive chat')
      .verifyElementContainsText('mat-dialog-container h2', 'Archive chat?')

      .log('Click Archive btn')
      .clickElementOnText('mat-dialog-actions button', 'Archive')

      .log('Verify Archive sucessfully')
      .verifyTextVisible('Chat archived')
      .verifyElementContainsText('.infoSectionItem span', 'Unarchive chat')
      .verifyElementContainsText('app-channel-list h2', 'Archived chats')

      .log('Back Inbox page')
      .navigateByLeftMenuInDashboard('Dashboard')
      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log('View archived chat')
      .clickElement('.chatHeaderActions .actionMenuButton')
      .clickElementOnText(
        'button.mat-menu-item',
        'View archived chat',
      )

      .log('Click on worker')
      .clickElementOnText(data.message.inboxName, clientName)
      .verifyElementContainsText('.infoSectionItem span', 'Unarchive chat')

      .log('Send a new message')
      .inputTextField(data.message.messageInput, 'send a new message')
      .clickElement(data.message.sendMessBtn, true)

      .log('Verify unarchived sucessfully')
      .verifyElementContainsText('.infoSectionItem span', 'Archive chat')
      .verifyElementContainsText('app-channel-list h1', 'Inbox');
  });
});
