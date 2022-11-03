/* eslint-disable no-unused-vars */
import * as data from '../../../fixtures/test-data.json';
import faker from 'faker/locale/en_AU';

describe('View Agreement - Showcasers - Part 1', () => {
  const clientEmail = 'automation_junior.stamm.agreement+client@donotuse.com.au';
  const clientPass = 'qaAutomation2021';
  const clientId = '17876';
  const clientName = 'Junior';

  const workerEmail = 'automation_janell.waelchi.agreement+worker@donotuse.com.au';
  const workerPass = 'qaAutomation2021';
  const workerId = '17877';
  const workerName = 'Janell';

  const workerEmail2 = 'automation_johnie.legros.agreement+worker2@donotuse.com.au';
  const workerPass2 = 'qaAutomation2021';
  const workerId2 = '17878';

  const detherEmail = 'automation_dether.ocampo.account+client@donotuse.com.au';
  const detherPass = 'qaAutomation2021';

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it('ES-T2143. View Fee Explainer', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(workerEmail2, workerPass2)

      .log('Go to the My Clients')
      .navigateByLeftMenuInDashboard('My clients')

      .log('Click View Agrrement')
      .verifyTextVisible('My clients')
      .verifyTextVisible('View agreement')
      .clickElementOnText('app-clients-list button span', 'View agreement')

      .log('Click "How was this calculated" link')
      .hoverElement('#fees a')
      .clickElementOnText('#fees a', 'How was this calculated?')
      .log('Verify the new popup is shown')
      .verifyElementContainsText('#feesModel h2', 'What are Mable fees?')

      .log('Click close btn')
      .clickElement('#feesModel button.close')
      .log('Verify the fee popup is not shown')
      .verifyElementNotExist('#feesModel')

      .log('Click "How was this calculated" link')
      .clickElementOnText('#fees a ', 'How was this calculated?')

      .log('Click "Ok, got it" btn')
      .clickElementOnText('button', 'OK, got it')
      .log('Verify the fee popup is not shown')
      .verifyElementNotExist('#feesModel')

      .log('Click "How was this calculated" link')
      .clickElementOnText('#fees a ', 'How was this calculated?')

      .log('Click "How was this calculated" link')
      .clickElementOnText('#fees a ', 'How was this calculated?')
      .log('Click "Learn more" btn')
      .verifyElementContainsText('#feesModel button', 'Learn more');
  });

  it('1.ES-T2190. View agreement page from conversations activity feed \n 2. ES-T216. Validate Active Tab Content - Accepted Agreement', () => {
    cy
      .log('Login as worker')
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

      .log('Login as client')

      .loginToDashboard(workerEmail2, workerPass2)

      .log('Go to the My Clients')
      .navigateByLeftMenuInDashboard('My clients')
      .clickElementOnText('.mat-tab-label-content', 'Pending')

      .log('Verify newly accepted offer')
      .verifyTextVisible(clientName)

      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log('Select conversation with ')
      .moveToUntilFoundName(clientName)
      .clickElementOnText('.channelContent .title', clientName)

      .log('Send a new message')
      .inputTextField(data.message.messageInput, 'send a new message')
      .clickElement(data.message.sendMessBtn, true)

      .log('Click View agreement btn')
      .clickElement('.expandContainer #content button')
      .verifyTextVisible('agreement with');
  });

  it('ES-T2191. Agreement audit trail', () => {
    cy
      .log('Login as admin')
      .loginToDashboard(
        data.dashboardAccount.adminAccount.email,
        data.dashboardAccount.adminAccount.password,
      )

      .log('Search client')
      .inputTextField('#search-users-input', workerEmail2)
      .clickElement('input[value="Search"]')
      .wait(1000)

      .log('Click Login as btn')
      .clickElementOnText('li a', 'Login as')

      .navigateByLeftMenuInDashboard('My clients')

      .log('Click View Agrrement')
      .verifyTextVisible('My clients')
      .verifyTextVisible('View agreement')
      .clickElementOnText('app-clients-list button span', 'View agreement')
      .wait(2000)

      .log('Click Audit Trial dropdown')
      .clickElementOnText('button span', 'Audit Trail')

      .log('Select agreement option on dropdown')
      .clickElementOnText('button.mat-menu-item span', 'Agreement')

      .log('Verify the new popup is shown')
      .verifyElementContainsText('h2', 'Audit trail')

      .log('Close popup')
      .clickElement('button.close');
  });

  it('ES-T1208. Check My Client Page - Active Tab with Active Agreements', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(workerEmail2, workerPass2)

      .log('Go to the My Clients')
      .navigateByLeftMenuInDashboard('My clients')

      .log('Verify the default tab is Active')
      .getText('.mat-tab-label-active div')
      .then((text) => expect(text).to.equal('Active'))

      .log('Check agreement on Active tab')
      .verifyElementVisible(data.agreement.worker.contactAddress)
      .verifyElementVisible(data.agreement.worker.contactPhone)
      .verifyElementContainsText(
        data.agreement.worker.agreementAction,
        'View agreement',
      )
      .verifyElementContainsText(
        data.agreement.worker.agreementAction,
        'Messages',
      )
      .verifyElementContainsText(
        data.agreement.worker.agreementAction,
        'View profile',
      )
      .verifyElementContainsText(
        data.agreement.worker.agreementAction,
        'Request review',
      )

      .log('Click View agreement')
      .clickElementOnText('app-clients-list button span', 'View agreement')

      .log('Click Back btn')
      .clickElement(data.agreement.worker.backBtn)

      .log('Click Messages')
      .verifyTextVisible('My clients')
      .wait(2000)
      .clickElementOnText('button span', 'Messages')
      .verifyTextVisible('Inbox');
  });

  it('ES-T1210. Check My Client Page - Pending Tab with Pending Agreements', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(workerEmail2, workerPass2)

      .log('Go to the My Clients')
      .navigateByLeftMenuInDashboard('My clients')

      .log('Click Pending Tab')
      .clickElementOnText('.mat-tab-label-content', 'Pending')

      .log('Check Pending agreement')
      .verifyElementContainsText(
        data.agreement.worker.agreementAction,
        'View offer',
      )
      .verifyElementContainsText(
        data.agreement.worker.agreementAction,
        'Messages',
      )

      .log('Click View offer')
      .clickElementOnText(data.agreement.worker.agreementAction, 'View offer')
      .verifyTextVisible('Inbox')

      .log('Click Back btn')
      .clickElement(data.agreement.worker.backBtn)

      .log('Click View offer')
      .clickElementOnText(data.agreement.worker.agreementAction, 'Messages')
      .verifyTextVisible('Inbox');
  });

  it('ES-T1209. Check My Client Page - Active Tab with No Active Agreements', () => {
    cy
      .log('Login as worker')
      .loginToDashboard('layla69@yahoo.com', 'Password123!@')

      .log('Go to the My Clients')
      .navigateByLeftMenuInDashboard('My clients')

      .log('Verify the default tab is Active')
      .getText('.mat-tab-label-active div')
      .then((text) => expect(text).to.equal('Active'))

      .log('Check active tab message')
      .verifyTextVisible(
        "You don't have any accepted agreements with clients yet.",
      )
      .verifyTextVisible('to send an offer to clients or')
      .verifyTextVisible('apply for more jobs')

      .log('Click Message')
      .clickElementOnText('.emptyState a', 'messages')
      .verifyTextVisible('Inbox')

      .log('Go to the My Clients')
      .navigateByLeftMenuInDashboard('My clients')

      .log('Cick apply for more jobs')
      .clickElementOnText('.emptyState a', 'apply for more jobs');
  });

  it('ES-T1211. Check My Client Page - Pending Tab with No Pending Agreements', () => {
    cy
      .log('Login as worker')
      .loginToDashboard('layla69@yahoo.com', 'Password123!@')

      .log('Go to the My Clients')
      .navigateByLeftMenuInDashboard('My clients')

      .log('Click Pending Tab')
      .clickElementOnText('.mat-tab-label-content', 'Pending')

      .log('Check active tab message')
      .verifyTextVisible(
        "You haven't sent any offers of agreements to clients yet.",
      )
      .verifyTextVisible('apply for more jobs')

      .log('Click Message')
      .clickElementOnText('.emptyState a', 'messages')
      .verifyTextVisible('Inbox')

      .log('Go to the My Clients')
      .navigateByLeftMenuInDashboard('My clients')

      .log('Click Pending Tab')
      .clickElementOnText('.mat-tab-label-content', 'Pending')

      .log('Cick apply for more jobs')
      .clickElementOnText('.emptyState a', 'apply for more jobs');
  });
});
