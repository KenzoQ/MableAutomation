import * as data from '../../../fixtures/test-data.json';

describe('Report user', () => {
  const workerEmail = 'automation_cherry.reportmessaging+worker@donotuse.com.au';
  const workerPass = 'qaAutomation2021';
  const workerName = 'Antonia';

  const clientEmail = 'automation_cherry.reportmessaging+client@donotuse.com.au';
  const clientPass = 'qaAutomation2021';
  const clientName = 'Thersa';

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it(`
    1. ES-T876. Report Worker
    2. ES-T1563. Check newly reported worker
  `, () => {
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

      .log('Click Report btn')
      .clickElementOnText(
        '.infoSectionItem span',
        'Report',
      )

      .log('Verify the block popup is visible')
      .verifyElementContainsText(
        '.mat-dialog-title',
        `You are about to report ${workerName}`,
      )

      .log('Click cancel btn')
      .clickElementOnText(
        'mat-dialog-actions button',
        'Cancel',
      )

      .log('Click Report btn')
      .clickElementOnText(
        '.infoSectionItem span',
        'Report',
      )

      .log('Verify the block popup is visible')
      .verifyElementContainsText(
        '.mat-dialog-title',
        `You are about to report ${workerName}`,
      )

      .log('Click Continue btn')
      .clickElementOnText(
        'mat-dialog-actions button',
        'Continue',
      )
      .verifyElementContainsText(
        '.mat-dialog-title',
        'Please tell us more',
      )

      .log('Click cancel btn')
      .clickElementOnText(
        'mat-dialog-actions button',
        'Cancel',
      )

      .log('Click Report btn')
      .clickElementOnText(
        '.infoSectionItem span',
        'Report',
      )

      .log('Verify the block popup is visible')
      .verifyElementContainsText(
        '.mat-dialog-title',
        `You are about to report ${workerName}`,
      )

      .log('Click Continue btn')
      .clickElementOnText(
        'mat-dialog-actions button',
        'Continue',
      )
      .verifyElementContainsText(
        '.mat-dialog-title',
        'Please tell us more',
      )

      .log('Select reason')
      .selectDropdown(
        data.message.reasonSelect,
        'Inappropriate or offensive conduct',
      )

      .log('Provide more details')
      .inputTextField(
        data.message.reasonNote,
        'add note',
      )

      .log('Click block btn')
      .clickElementOnText(
        'mat-dialog-actions button',
        'Submit',
      )
      .verifyTextVisible('Code of conduct')
      .verifyTextVisible('Terms of use')

      .log('Close popup')
      .clickElementOnText(
        'mat-dialog-actions button',
        'Close',
      )

      .log('Client send a message')
      .log('Input on message')
      .inputTextField(data.message.messageInput, 'test report worker')

      .log('Click send message')
      .clickElement(data.message.sendMessage, true)

      .log('Verify new message should be send')
      .wait(2000)
      .verifyElementContainsText(
        '.msgBody',
        'test report worker',
      );
  });

  it(`
    1. ES-T864. Report Client
    2. ES-T1593. Check newly reported client
  `, () => {
    cy.log('Login as worker')
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

      .log('Click Report btn')
      .clickElementOnText(
        '.infoSectionItem span',
        'Report',
      )

      .log('Verify the block popup is visible')
      .verifyElementContainsText(
        '.mat-dialog-title',
        `You are about to report ${clientName}`,
      )

      .log('Click cancel btn')
      .clickElementOnText(
        'mat-dialog-actions button',
        'Cancel',
      )

      .log('Click Report btn')
      .clickElementOnText(
        '.infoSectionItem span',
        'Report',
      )

      .log('Verify the block popup is visible')
      .verifyElementContainsText(
        '.mat-dialog-title',
        `You are about to report ${clientName}`,
      )

      .log('Click Continue btn')
      .clickElementOnText(
        'mat-dialog-actions button',
        'Continue',
      )
      .verifyElementContainsText(
        '.mat-dialog-title',
        'Please tell us more',
      )

      .log('Click cancel btn')
      .clickElementOnText(
        'mat-dialog-actions button',
        'Cancel',
      )

      .log('Click Report btn')
      .clickElementOnText(
        '.infoSectionItem span',
        'Report',
      )

      .log('Verify the block popup is visible')
      .verifyElementContainsText(
        '.mat-dialog-title',
        `You are about to report ${clientName}`,
      )

      .log('Click Continue btn')
      .clickElementOnText(
        'mat-dialog-actions button',
        'Continue',
      )
      .verifyElementContainsText(
        '.mat-dialog-title',
        'Please tell us more',
      )

      .log('Select reason')
      .selectDropdown(
        data.message.reasonSelect,
        'Inappropriate or offensive conduct',
      )

      .log('Provide more details')
      .inputTextField(
        data.message.reasonNote,
        'add note',
      )

      .log('Click block btn')
      .clickElementOnText(
        'mat-dialog-actions button',
        'Submit',
      )
      .verifyTextVisible('Code of conduct')
      .verifyTextVisible('Terms of use')

      .log('Close popup')
      .clickElementOnText(
        'mat-dialog-actions button',
        'Close',
      )

      .log('Client send a message')
      .log('Input on message')
      .inputTextField(data.message.messageInput, 'test report client')

      .log('Click send message')
      .clickElement(data.message.sendMessage, true)

      .log('Verify new message should be send')
      .wait(2000)
      .verifyElementContainsText(
        '.msgBody',
        'test report client',
      );
  });
});
