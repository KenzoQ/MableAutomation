/* eslint-disable no-unused-vars */
import * as data from '../../../fixtures/test-data.json';
import faker from 'faker/locale/en_AU';

describe('View Agreement - Showcasers - Part 2', () => {
  const clientEmail = 'automation_junior.stamm.agreement+client@donotuse.com.au';
  const clientPass = 'qaAutomation2021';
  const clientId = '17876';
  const clientName = 'Junior';

  const workerEmail2 = 'automation_johnie.legros.agreement+worker2@donotuse.com.au';
  const workerPass2 = 'qaAutomation2021';
  const workerId2 = '17878';

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it('ES-T1212. Check My Client Page - Past Tab with Terminated Agreements', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(workerEmail2, workerPass2)

      .log('Go to the My Clients')
      .navigateByLeftMenuInDashboard('My clients')

      .log('Click Past Tab')
      .clickElementOnText('.mat-tab-label-content', 'Past')

      .log('Check terminated agreement')
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
        'Request review',
      )

      .log('Click View agreement')
      .clickElementOnText(
        data.agreement.worker.agreementAction,
        'View agreement',
      )

      .log('Click Back btn')
      .clickElement(data.agreement.worker.backBtn)

      .log('Click Past Tab')
      .clickElementOnText('.mat-tab-label-content', 'Past')
      .wait(1000)

      .log('Click Messages')
      .clickElementOnText('button span', 'Messages')
      .verifyTextVisible('Inbox');
  });

  it('ES-T1213. Check My Client Page - Past Tab with No Terminated Agreements', () => {
    cy
      .log('Login as worker')
      .loginToDashboard('layla69@yahoo.com', 'Password123!@')

      .log('Go to the My Clients')
      .navigateByLeftMenuInDashboard('My clients')

      .log('Verify the default tab is Active')
      .getText('.mat-tab-label-active div')
      .then((text) => expect(text).to.equal('Active'))

      .log('Click Past Tab')
      .clickElementOnText('.mat-tab-label-content', 'Past')

      .log('Check Past tab')
      .verifyTextVisible(
        'You don’t have any terminated agreements with clients.',
      );
  });

  it('ES-T1215. Validate Pending Tab Content - Edit Last Sent Offer', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(workerEmail2, workerPass2)

      .log('Go to the My Clients')
      .navigateByLeftMenuInDashboard('My clients')

      .log('Click Pending Tab')
      .clickElementOnText('.mat-tab-label-content', 'Pending')
      .wait(2000)
      .getText('app-clients-list .details .clientName')
      .then(($name) => {
        cy

          .log('Click View offer')
          .clickElementOnText(data.agreement.worker.agreementAction, 'View offer')
          .verifyTextVisible('Inbox')
          .wait(1000)

          .log('Check amend agreement page')
          .verifyTextVisible('Edit proposed agreement with')

          .log('Update rate description')
          .inputTextFieldAtPosition(
            data.agreement.worker.rateDescription,
            'Update rate description',
            '0',
          )
          .inputTextFieldAtPosition(data.agreement.worker.rateMount, '35', '0')
          .fillAgreedRate('35')

          .log('Enter Agreed services')
          .inputTextField(
            data.agreement.worker.agreedService,
            'Update last send offer',
          )

          .log('Click Submit btn')
          .clickElementOnText('button span', 'Save and send to')

          .log('Go to the My Clients')
          .navigateByLeftMenuInDashboard('My clients')

          .log('Select Pending tab')
          .clickElementOnText('.mat-tab-label-content', 'Pending')

          .log('Verify the client with newly created offer is shown')
          .wait(2000)
          .verifyElementContainsText(
            'app-clients-list .details .clientName',
            $name,
          );
      });
  });

  it(`1. ES-T2142. View agreement for the first time
      2. ES-T2185. View agreement for the second time and so on after it was accepted`, () => {
    cy
      .removeAgreementIfExist(clientEmail, clientPass, workerId2)
      .sendAgreementAsWorker(workerEmail2, workerPass2, clientId)

      .log('Login as client')
      .loginToDashboard(workerEmail2, workerPass2)

      .log('Go to the My Clients')
      .navigateByLeftMenuInDashboard('My clients')

      .log('Click Pending Tab')
      .clickElementOnText('.mat-tab-label-content', 'Pending')

      .log(`View agreement of ${clientName}`)
      .get('h3.clientName')
      .contains(clientName)
      .parents('.clientPanel')
      .find('.actions button span')
      .contains('Messages')
      .click({ force: true })

      .log('Verify the Offer agreement')
      .wait(2000)
      .verifyTextExist('Offer agreement')

      .log('Go to the My Clients')
      .navigateByLeftMenuInDashboard('My clients')

      .log('View the old agreement')
      .clickElementOnText('.actions button span', 'View agreement')

      .log('Check congratulatory banner not visible')
      .verifyTextNotExist('has accepted the agreement.');
  });

  it('ES-T2184. Agreement audit trail', () => {
    cy
      .log('Login as admin')

      .loginToDashboard(
        data.dashboardAccount.adminAccount.email,
        data.dashboardAccount.adminAccount.password,
      )

      .log('Search client')
      .inputTextField('#search-users-input', clientEmail)
      .clickElement('input[value="Search"]')
      .wait(2000)

      .log('Click Login as btn')
      .clickElementOnText('li a', 'Login as')

      .navigateByLeftMenuInDashboard('My support workers')

      .log('Click View agreement')
      .clickElementOnText('.details button span', 'View agreement')
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
});
