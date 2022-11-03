/* eslint-disable no-unused-vars */
import * as data from '../../../fixtures/test-data.json';

describe('Terminate Agreement', () => {
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
  const workerName2 = 'Johnie';

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it(`1. ES-T2181. Check newly terminated agreement
      2. ES-T115. Terminate an agreement and cancel rating/feedback experience`, () => {
    cy
      .createAgreementIfNotExist(
        workerEmail,
        workerPass,
        workerId,
        clientId,
        clientEmail,
        clientPass,
      )

      .log('Login as client')
      .loginToDashboard(clientEmail, clientPass)

      .navigateByLeftMenuInDashboard('My support workers')

      .log(`Select agreement with ${workerName}`)
      .selectAgreementWithWorkerName(workerName)

      .log('Click Collapse btn')
      .clickElement(data.agreement.client.collapseBtn)

      .log('Click "Terminate agreement" btn')
      .clickElementOnText('button span', 'Terminate agreement')
      .log('Verify user will be redirected to Terminate Agreement page')
      .verifyTextVisible('Terminate agreement')

      .log('Select a temination cause')
      .clickElementOnText(
        '.radioLabel',
        'The independent support worker was not a good fit',
      )
      .clickElementOnText('button span', 'Terminate agreement')
      .clickElementOnText('.modal button', 'Cancel')

      .navigateByLeftMenuInDashboard('My support workers')

      .log(
        'Check the terminated worker: Ha Neul Khang is not shown on the Active list',
      )
      .verifyTextNotExist(workerName)

      .log('Click the Terminated tab')
      .clickElementOnText('.mat-tab-label-content', 'Terminated')

      .log(`Select conversation with ${workerName}`)
      .selectAgreementWithWorkerName(workerName)

      .log('Click Back btn')
      .clickElement('app-back-button button');
  });

  it('ES-T2144. Termination validation', () => {
    cy
      .createAgreementIfNotExist(
        workerEmail,
        workerPass,
        workerId,
        clientId,
        clientEmail,
        clientPass,
      )

      .log('Login as client')
      .loginToDashboard(clientEmail, clientPass)

      .navigateByLeftMenuInDashboard('My support workers')

      .log(`Select agreement with ${workerName}`)
      .selectAgreementWithWorkerName(workerName)

      .log('Click Collapse btn')
      .clickElement(data.agreement.client.collapseBtn)

      .log('Click "Terminate agreement" btn')
      .clickElementOnText('#manageAgreement button span', 'Terminate agreement')
      .log('Verify user will be redirected to Terminate Agreement page')
      .verifyTextVisible('Terminate agreement')

      .clickElementOnText('button span', 'Terminate agreement')
      .log('Verify the error message is shown')
      .verifyTextVisible('Please select at least one option.')

      .log('Click Other reason option')
      .clickElementOnText(
        '.radioLabel',
        'Other (please provide more information)',
      )
      .clickElementOnText('button span', 'Terminate agreement')
      .verifyTextVisible('Please enter reason.');
  });

  it('ES-T549. View terminated agreement', () => {
    cy
      .log('Login as client')
      .loginToDashboard(clientEmail, clientPass)

      .navigateByLeftMenuInDashboard('My support workers')

      .log('Click the Terminated tab')
      .clickElementOnText('.mat-tab-label-content', 'Terminated')

      .clickElementOnText('.action button span', 'View agreement')

      .log('Check the agreement detail')
      .verifyTextVisible('has been terminated')
      .verifyTextVisible('Agreed service')
      .verifyTextVisible('Agreed rates')

      .log('Click "How was this calculated" link')
      .clickElementOnText('#feesCalculation', 'How was this calculated?')
      .log('Verify the new popup is shown')
      .verifyElementContainsText('#feesModel h2', 'How is my fee calculated?')

      .log('Click close btn')
      .clickElement('#feesModel button.close')
      .log('Verify the fee popup is not shown')
      .verifyElementNotExist('#feesModel')

      .log('Check the right side panel')
      .verifyTextExist('Support worker')
      .verifyTextVisible('Account holder')
      .verifyTextVisible('Participant')

      .log('Click "View Profile" btn')
      .clickElementOnText('a.viewProfile', 'View profile')

      .wait(2000)
      .log('Verify user is navigated to Account holder')
      .verifyTextVisible('Account Holder Details');
  });

  it(`1. ES-T2146. Terminate an agreement
      2. ES-T2148. View terminated agreement
      3. ES-T1218. Validate Past Tab Content - Terminate Agreement`, () => {
    cy
      .createAgreementIfNotExist(
        workerEmail2,
        workerPass2,
        workerId2,
        clientId,
        clientEmail,
        clientPass,
      )

      .log('Login as worker')
      .loginToDashboard(workerEmail2, workerPass2)

      .log('Go to the My Clients')
      .navigateByLeftMenuInDashboard('My clients')

      .log(`View agreement of ${clientName}`)
      .get('h3.clientName')
      .contains(clientName)
      .parents('.clientPanel')
      .find('.actions button span')
      .contains('View agreement')
      .click({ force: true })

      .log('Check Manage agreement section')
      .verifyTextVisible('Manage agreement')
      .clickElement(data.agreement.worker.collapseBtn)

      .log('Click Terminate agreement')
      .clickElementOnText('button span', 'Terminate agreement')

      .log('Check header of terminated agreement page')
      .verifyTextVisible(
        'Why are you terminating this agreement with',
      )

      .log('Select option on radio')
      .clickElementOnText(
        '.radioBtn span',
        'The client no longer needs support',
      )

      .log('Check privacy indicator')
      .verifyTextVisible("This information isn't shared with clients.")

      .log('Click Other reason option')
      .clickElementOnText(
        '.radioBtn span',
        'Other (please provide more information)',
      )
      .verifyElementVisible('#otherReasonLabel textarea')

      .log('Click Cancel btn')
      .clickElementOnText('button span', 'Cancel')

      .log('Click "Terminate agreement" again')
      .clickElement(data.agreement.worker.collapseBtn)
      .clickElementOnText('button span', 'Terminate agreement')
      .wait(2000)
      .log('Click Back btn')
      .clickLastElement(data.agreement.worker.backBtn, true)
      .wait(2000)

      .log('Click "Terminate agreement" again')
      .clickElement(data.agreement.worker.collapseBtn)
      .clickElementOnText('button span', 'Terminate agreement')

      .log('Select option on radio')
      .clickElementOnText(
        '.radioBtn span',
        'The client no longer needs support',
      )

      .log('Click Terminate agreement btn')
      .clickElementOnText('button span', 'Terminate agreement')
      
      .log('Click OK, got it button')
      .clickElementOnText('div.mat-dialog-actions.action button', 'OK, got it')

      .log('Verify terminated page')
      .verifyTextVisible('Terminated Agreement with')

      .log('Check indicator')
      .verifyTextVisible('has been terminated')

      .log('Verify Agreed service')
      .verifyTextVisible('Agreed service')

      .log('Verify Agreed rates section')
      .verifyTextVisible('Agreed rates')

      .log('Click "How was this calculated" link')
      .clickElementOnText('#feesCalculation', 'How was this calculated?')
      .log('Verify the new popup is shown')
      .verifyElementContainsText('#feesModel h2', 'What are Mable fees?')

      .log('Click close btn')
      .clickElement('#feesModel button.close')
      .log('Verify the fee popup is not shown')
      .verifyElementNotExist('#feesModel')

      .log('Chick View profile btn')
      .clickElement('a.viewProfile')

      .log('Go to the My Clients')
      .navigateByLeftMenuInDashboard('My clients')

      .log('Verify the newly terminated client is not shown on active tab')
      .verifyTextNotExist(clientName)

      .log('Click Past Tab')
      .clickElementOnText('.mat-tab-label-content', 'Past')

      .log('Verify the new terminated client is shown on past tab')
      .verifyTextVisible(clientName);
  });

  it('ES-T2149. Termination validation', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(workerEmail2, workerPass2)

      .log('Go to the My Clients')
      .navigateByLeftMenuInDashboard('My clients')

      .log('Click View Agrrement')
      .clickElementOnText('app-clients-list button span', 'View agreement')

      .log('Check Manage agreement section')
      .verifyTextVisible('Manage agreement')
      .clickElement(data.agreement.worker.collapseBtn)

      .log('Click Terminate agreement')
      .clickElementOnText('button span', 'Terminate agreement')

      .log('Click Terminate agreement btn')
      .clickElementOnText('button span', 'Terminate agreement')

      .log('The error message is shown')
      .verifyTextVisible('Please select at least one option.')

      .log('Click Other reason option')
      .clickElementOnText(
        '.radioBtn span',
        'Other (please provide more information)',
      )
      .verifyElementVisible('#otherReasonLabel textarea')

      .log('Click Terminate agreement btn')
      .clickElementOnText('button span', 'Terminate agreement')

      .verifyTextVisible('Please enter reason.');
  });
});
