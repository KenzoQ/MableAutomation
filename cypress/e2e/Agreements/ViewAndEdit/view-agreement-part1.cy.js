import * as data from '../../../fixtures/test-data.json';

describe('View Agreement - Matchmakers', () => {
  const clientEmail = 'automation_junior.stamm.agreement+client@donotuse.com.au';
  const clientPass = 'qaAutomation2021';
  const clientId = '17876';
  // eslint-disable-next-line no-unused-vars
  const clientName = 'Junior';

  const workerEmail = 'automation_janell.waelchi.agreement+worker@donotuse.com.au';
  const workerPass = 'qaAutomation2021';
  const workerId = '17877';
  const workerName = 'Janell';

  const workerEmail2 = 'automation_johnie.legros.agreement+worker2@donotuse.com.au';
  const workerPass2 = 'qaAutomation2021';

  const detherEmail = 'automation_dether.ocampo.account+client@donotuse.com.au';
  const detherPass = 'qaAutomation2021';

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('ES-T545. View agreement page', () => {
    cy
      .log('Login as client')
      .loginAPI(clientEmail, clientPass)
      .visit('/dashboard')

      .navigateByLeftMenuInDashboard('My support workers')

      .log('Select a support worker in Active tab')
      .clickElementOnText(data.agreement.client.agreementBtn, 'View agreement')

      .log('Check agreement details')
      .verifyTextVisible('Agreement with')
      .verifyTextVisible('Agreed service')
      .verifyTextVisible('Agreed rates')
      .verifyTextVisible('Manage agreement')

      .log('Click Collapse btn')
      .clickElement(data.agreement.client.collapseBtn)

      .log('Check Message btn')
      .verifyElementContainsText('.message', 'Message')

      .log('Check "Terminate agreement"')
      .verifyElementContainsText('button span', 'Terminate agreement')

      .log('Check support worker info')
      .verifyTextVisible('Manage agreement')
      .verifyTextVisible('Account holder');
  });

  it('ES-T546. View agreement', () => {
    cy
      .log('Login as client')
      .loginAPI(
        'automation_vince.agreement+client@donotuse.com.au',
        'qaAutomation2021',
      )
      .visit('/dashboard')

      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      // Request agreement
      .log('Select conversation with Marylin O')
      .clickElementOnText(data.agreement.client.inboxName, 'Marylin')

      .log('Send a new message')
      .inputTextField(data.message.messageInput, 'send a new message')
      .clickElement(data.message.sendMessBtn, true)

      .log('Check converstation page')
      .verifyTextVisible('Agreement requested')

      // Pending agreeement
      .log('Select conversation with Brittney')
      .moveToUntilFoundName('Brittney')
      .clickElementOnText(data.agreement.client.inboxName, 'Brittney')

      .log('Send a new message')
      .inputTextField(data.message.messageInput, 'send a new message')
      .clickElement(data.message.sendMessBtn, true)

      .log('Check conversation page')
      .verifyTextVisible('View agreement')

      .log('Click View agreement btn')
      .clickElementOnText(
        'button span',
        'View agreement',
      )
      .verifyTextVisible('Agreement with Brittney B')
      .verifyTextVisible('Brittney B has offered you an agreement.')

      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      // Accept agreement
      .log('Select conversation with Gavin')
      .moveToUntilFoundName('Gavin')
      .clickElementOnText(data.agreement.client.inboxName, 'Gavin')

      .log('Send a new message')
      .inputTextField(data.message.messageInput, 'send a new message')
      .clickElement(data.message.sendMessBtn, true)

      .log('Check converstaion')
      .verifyTextVisible('Gavin Yost')

      .navigateByLeftMenuInDashboard('My support workers')
      .verifyTextVisible('Gavin Yost')

      .log('View agreement of Gavin Yost')
      .get('.workerName')
      .contains('Gavin Yost')
      .parents('.details')
      .find('button span')
      .contains('View agreement')
      .click()
      .verifyTextVisible('Agreement with Gavin Yost')

      // Changes pending
      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log('Select conversation with Rossie')
      .moveToUntilFoundName('Rossie')
      .clickElementOnText(data.agreement.client.inboxName, 'Rossie')

      .log('Send a new message')
      .inputTextField(data.message.messageInput, 'send a new message')
      .clickElement(data.message.sendMessBtn, true)

      .log('Check conversation page')
      .verifyTextVisible('View agreement')

      .log('Click View agreement btn')
      .clickElementOnText(
        'button span',
        'View agreement',
      )
      .verifyTextVisible('Agreement with Rossie Fisher')
      .verifyTextVisible('Rossie Fisher has amended your agreement.')

      .navigateByLeftMenuInDashboard('My support workers')
      .clickElementOnText('.mat-tab-label-content', 'Pending')
      .verifyTextVisible('Rossie Fisher');
  });

  it('ES-T2140. View Fee Explainer', () => {
    cy
      .log('Login as client')
      .loginAPI(clientEmail, clientPass)
      .visit('/dashboard')

      .navigateByLeftMenuInDashboard('My support workers')

      .log('Select a support worker in Active tab')
      .clickElementOnText(data.agreement.client.agreementBtn, 'View agreement')

      .log('Click "How was this calculated" link')
      .clickElementOnText('#feesCalculation', 'How was this calculated?')
      .log('Verify the new popup is shown')
      .verifyElementContainsText('#feesModel h2', 'How is my fee calculated?')

      .log('Click close btn')
      .clickElement('#feesModel button.close')
      .log('Verify the fee popup is not shown')
      .verifyElementNotExist('#feesModel')

      .log('Click "How was this calculated" link')
      .clickElementOnText('#feesCalculation', 'How was this calculated?')
      .log('Verify the new popup is shown')
      .verifyElementContainsText('#feesModel h2', 'How is my fee calculated?')

      .log('Click "Ok, got it" btn')
      .clickElementOnText('button', 'OK, got it')
      .log('Verify the fee popup is not shown')
      .verifyElementNotExist('#feesModel')

      .log('Click "How was this calculated" link')
      .clickElementOnText('#feesCalculation', 'How was this calculated?')

      .log('Click "Learn more" btn')
      .verifyElementContainsText('#feesModel button', 'Learn more')
      .clickElementOnText('button', 'OK, got it');
  });

  it('ES-T1928. View agreement for the first time', () => {
    cy
      .removeAgreementIfExist(
        clientEmail,
        clientPass,
        workerId,
      )
      .sendAgreementAsWorker(workerEmail, workerPass, clientId);

    cy.log('Login as client')
      .loginAPI(clientEmail, clientPass)
      .visit('/dashboard')

      .navigateByLeftMenuInDashboard('My support workers')

      .log(`Select conversation with ${workerName}`)
      .clickElementOnText('.mat-tab-label-content', 'Pending')
      .selectAgreementWithWorkerName(workerName);
    cy.xpath('//span[contains(.,\'Accept agreement\')]')
      .click({ force: true })
      .wait(2000)
      .selectAgreementWithWorkerName(workerName)

      .log('Check green banner')
      .verifyTextVisible('You have accepted the agreement with');
  });

  it('ES-T2139. View profile', () => {
    cy
      .log('Login as client')
      .loginAPI(clientEmail, clientPass)
      .visit('/dashboard')

      .navigateByLeftMenuInDashboard('My support workers')

      .log('Select a support worker in Active tab')
      .clickElementOnText(data.agreement.client.agreementBtn, 'View agreement')

      .log('Click View profile on Support worker')
      .clickElementOnText('a.viewProfile', 'View profile')
      .verifyCurrentURL('/profile')

      .log('Click Back btn')
      .clickElement('app-back-button button');
  });

  it('ES-T2141. Terminate an agreement and provide feedback', () => {
    cy
      .removeAgreementIfExist(
        clientEmail,
        clientPass,
        workerId,
      )
      .sendAgreementAsWorker(workerEmail, workerPass, clientId)

      .log('Login as client')
      .loginAPI(clientEmail, clientPass)
      .visit('/dashboard')

      .navigateByLeftMenuInDashboard('My support workers')

      .log(`Select conversation with ${workerName}`)
      .clickElementOnText('.mat-tab-label-content', 'Pending')
      .selectAgreementWithWorkerName(workerName);
    cy.xpath('//span[contains(.,\'Accept agreement\')]')
      .click({ force: true })
      .wait(2000)
      .selectAgreementWithWorkerName(workerName)

      .log('Click Collapse btn')
      .clickElement(data.agreement.client.collapseBtn)

      .log('Click "Terminate agreement" btn')
      .clickElementOnText('#manageAgreement button span', 'Terminate agreement')
      .log('Verify user will be redirected to Terminate Agreement page')
      .verifyTextVisible('Terminate agreement')

      .log('Check sub-header')
      .verifyTextVisible('Why are you terminating this agreement with')

      .log('Check privacy indicator')
      .verifyTextVisible("This information isn't shared with support workers.")

      .log('Click Other reason option')
      .clickElementOnText(
        '.radioLabel',
        'Other (please provide more information)',
      )
      .verifyElementVisible('#otherReasonLabel')

      .log('Click Cancel btn')
      .clickElementOnText('.action button span', 'Cancel')

      .log('Click Collapse btn')
      .clickElement(data.agreement.client.collapseBtn)

      .log('Click "Terminate agreement" btn')
      .clickElementOnText('#manageAgreement button span', 'Terminate agreement')
      .log('Verify user will be redirected to Terminate Agreement page')
      .verifyTextVisible('Why are you terminating this agreement with Janell?')

      .log('Click Back btn')
      .clickElement('app-back-button button')

      .log('Click Collapse btn')
      .clickElement(data.agreement.client.collapseBtn)

      .log('Click "Terminate agreement" btn')
      .clickElementOnText('#manageAgreement button span', 'Terminate agreement')
      .log('Verify user will be redirected to Terminate Agreement page')
      .verifyTextVisible('Terminate agreement')

      .log('Select a temination cause')
      .clickElementOnText(
        '.radioLabel',
        'The independent support worker was not a good fit',
      )
      .clickElementOnText('button span', 'Terminate agreement')
      .clickElementOnText('.modal button', 'Leave a review')

      .log('The feedback page is shown')
      .verifyTextVisible('Review');
  });

  it('ES-T2194. View agreement for the second time and so on after it was accepted', () => {
    cy
      .log('Login as client')
      .loginAPI(clientEmail, clientPass)
      .visit('/dashboard')

      .navigateByLeftMenuInDashboard('My support workers')

      .log('Select a support worker in Active tab')
      .clickElementOnText(data.agreement.client.agreementBtn, 'View agreement')

      .log('Verify the green conformation is not shown')
      .verifyTextNotExist('You have accepted the agreement with');
  });

  it('ES-T2018. Verify “Agree to work for the following” at the start of description was already removed', () => {
    cy
      .log('Login as client')
      .loginAPI(clientEmail, clientPass)
      .visit('/dashboard')

      .navigateByLeftMenuInDashboard('My support workers')

      .log('Select a support worker in Active tab')
      .clickElementOnText(data.agreement.client.agreementBtn, 'View agreement')

      .log('Check removal of spiel')
      .verifyTextNotExist('Agree to work for the following');
  });

  it('ES-T2017. Verify "Single shift" on the rate', () => {
    cy
      .log('Login as client')
      .loginAPI(clientEmail, clientPass)
      .visit('/dashboard')

      .navigateByLeftMenuInDashboard('My support workers')

      .log('Select a support worker in Active tab')
      .wait(2000)
      .verifyTextVisible('Josh Volkman')
      .get('h2')
      .contains('Josh Volkman')
      .parents('.panel')
      .find(data.agreement.client.agreementBtn)
      .contains('View agreement')
      .click({ force: true })

      .log('Verify Single shif on the rate')
      .verifyTextVisible('24HourShift');
  });

  it('ES-T561. View agreement page', () => {
    cy
      .log('Login as worker')
      .loginAPI(workerEmail2, workerPass2)
      .visit('/dashboard')

      .log('Go to the My Clients')
      .navigateByLeftMenuInDashboard('My clients')

      .log('Click View Agrrement')
      .verifyTextVisible('My clients')
      .verifyTextVisible('View agreement')
      .clickElementOnText('button span', 'View agreement')

      .log('Check header')
      .verifyTextVisible('Agreement with')

      .log('Check Agreed service')
      .verifyTextVisible('Agreed service')

      .log('Check Agreed rates')
      .verifyTextVisible('Agreed rates')

      .log(
        'Check Inclusive of all platform fees and How was this calculated link',
      )
      .verifyTextVisible('Inclusive of all platform fees.')
      .verifyTextVisible('How was this calculated?')

      .log('Check Manage agreement section')
      .verifyTextVisible('Manage agreement')
      .clickElement(data.agreement.worker.collapseBtn)
      .log('Check Update agreement and Terminate agreement btn')
      .verifyElementContainsText('button span', 'Update agreement')
      .verifyElementContainsText('button span', 'Terminate agreement')

      .log(
        'Check Account Holder, Participant and Support Worker information on the right side panel',
      )
      .verifyTextVisible('Account holder')
      .verifyTextVisible('Support worker');
  });

  it('ES-T2145. View profiles', () => {
    cy
      .log('Login as worker')
      .loginAPI(workerEmail2, workerPass2)
      .visit('/dashboard')

      .log('Go to the My Clients')
      .navigateByLeftMenuInDashboard('My clients')

      .log('Click View Agrrement')
      .verifyTextVisible('My clients')
      .verifyTextVisible('View agreement')
      .clickElementOnText('button span', 'View agreement')

      .log('Click View profile CTA')
      .clickElementOnText('a.viewProfile', 'View profile ');
  });
});
