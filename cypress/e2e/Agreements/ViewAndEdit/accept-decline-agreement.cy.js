import * as data from '../../../fixtures/test-data.json';

describe('Accept and decline agreement', () => {
  const clientEmail = 'automation_junior.stamm.agreement+client@donotuse.com.au';
  const clientPass = 'qaAutomation2021';
  const clientId = '17876';

  const workerEmail = 'automation_janell.waelchi.agreement+worker@donotuse.com.au';
  const workerPass = 'qaAutomation2021';
  const workerId = '17877';
  const workerName = 'Janell';

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it(`1. ES-T560. Accept pending agreement, with no related job
      2. ES-T113. Check newly accepted pending agreement`, () => {
    cy.removeAgreementIfExist(clientEmail, clientPass, workerId)
      .sendAgreementAsWorker(workerEmail, workerPass, clientId)
      .log('Login as client')
      .loginToDashboard(clientEmail, clientPass)

      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log(`Select conversation with ${workerName}`)
      .clickElementOnText(data.agreement.client.inboxName, workerName)

      .log('Send a new message')
      .inputTextField(data.message.messageInput, 'send a new message')
      .clickElement(data.message.sendMessBtn, true)

      .clickViewOfferInBox()

      .log('Click Accept agrrment btn')
      .wait(1000)
      .clickOnText('Accept agreement')

      .navigateByLeftMenuInDashboard('My support workers')

      .log('Verify newly accept agreement is shown')
      .verifyTextVisible(workerName);
  });

  it(`1. ES-T112. Decline amended agreement
      2. ES-T105. Check newly declined pending agreement`, () => {
    cy.removeAgreementIfExist(clientEmail, clientPass, workerId)
      .sendAgreementAsWorker(workerEmail, workerPass, clientId)
      .log('Login as client')
      .loginToDashboard(clientEmail, clientPass)

      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log(`Select conversation with ${workerName}`)
      .clickElementOnText(data.agreement.client.inboxName, workerName)

      .log('Send a new message')
      .inputTextField(data.message.messageInput, 'send a new message')
      .clickElement(data.message.sendMessBtn, true)

      .clickViewOfferInBox()

      .log('Click Decline btn')
      .verifyTextVisible('Inbox')
      .verifyTextVisible('Decline')
      .clickElementOnText('button span', 'Decline')

      .log('Verify client declined the pending agreeemnt successfully')
      .verifyTextNotExist('Accept agreement')
      .verifyTextNotExist('Offer declined')
      .verifyTextVisible('Request an agreement');
  });

  it('ES-T106. Accept pending agreement, with related job', () => {
    const taeHeeKimWorkerName = 'Tae Hee';
    cy.removeAgreementIfExist(
      'automation_dether.ocampo.account+client@donotuse.com.au',
      'qaAutomation2021',
      '16566',
    )
      .sendAgreementAsWorker(
        'automation_kim.taehee.jobagreement+worker@donotuse.com.au',
        'qaAutomation2021',
        '14164',
        '4458',
      )

      .log('Login as client')
      .loginToDashboard('automation_dether.ocampo.account+client@donotuse.com.au', 'qaAutomation2021')

      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .moveToUntilFoundName(taeHeeKimWorkerName)
      .log(`Select conversation with ${taeHeeKimWorkerName}`)
      .clickElementOnText(data.agreement.client.inboxName, taeHeeKimWorkerName)

      .log('Send a new message')
      .inputTextField(data.message.messageInput, 'send a new message')
      .clickElement(data.message.sendMessBtn, true)

      .clickViewOfferInBox()

      .log('Click Accept agrrment btn')
      .wait(1000)
      .clickOnText('Accept agreement')
      .log('Click "Send message to all other applicants"')
      .clickElementOnText(
        'mat-dialog-actions button',
        'Send',
      )

      .navigateByLeftMenuInDashboard('My support workers')

      .log('Verify newly accept agreement is shown')
      .verifyTextVisible(taeHeeKimWorkerName);
  });
});
