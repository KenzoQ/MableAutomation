/* eslint-disable no-unused-vars */
import * as data from '../../../fixtures/test-data.json';
import faker from 'faker/locale/en_AU';

describe('Create and Edit Agreement', () => {
  const clientEmail = 'automation_junior.stamm.agreement+client@donotuse.com.au';
  const clientPass = 'qaAutomation2021';
  const clientId = '17876';
  const clientName = 'Junior';

  const clientEmail02 = 'automation.kris.bernal.searchworker+client@donotuse.com.au';
  const clientPass02 = 'qaAutomation2021';
  const clientName02 = 'KRIS';

  const detherEmail = 'automation_dether.ocampo.account+client@donotuse.com.au';
  const detherPass = 'qaAutomation2021';
  const detherName = 'Dether';

  const organisationEmail = 'automation_activendis.plan+client@donotuse.com.au';
  const organisationPass = 'qaAutomation2021';
  const organisationName = 'Ndis';

  const workerEmail2 = 'automation_johnie.legros.agreement+worker2@donotuse.com.au';
  const workerPass2 = 'qaAutomation2021';
  const workerId2 = '17878';

  const workerEmail03 = 'automation_kim.taehee.jobagreement+worker@donotuse.com.au';
  const workerPass03 = 'qaAutomation2021';
  const workerId03 = '16566';

  const workerEmail04 = 'automation_gongyoo.jobagreement+worker@donotuse.com.au';
  const workerPass04 = 'qaAutomation2021';
  const workerId04 = '21284';

  const minimumRate = '25';
  const minimumRateText = `Offer a minimum rate of $${minimumRate} for active support under our terms of use.`;

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it(`1. ES-T103. Create an agreement, with related job
      2. ES-T565. Check newly created agreement
      3. ES-T2190. View agreement page from conversations activity feed`, () => {
    const rateAmount = '35';
    cy
      .removeAgreementIfExist(
        clientEmail,
        clientPass,
        workerId2,
      )

      .log('Login as client')
      .loginToDashboard(workerEmail2, workerPass2)

      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log(`Select conversation ${clientName}`)
      .moveToUntilFoundName(clientName)
      .clickElementOnText('.channelContent .title', clientName)

      .log('Send a new message')
      .inputTextField(data.message.messageInput, 'send a new message')
      .clickElement(data.message.sendMessBtn, true)

      .log('Click Offer an agreement btn')
      .verifyTextVisible('Inbox')
      .verifyTextVisible('Offer an agreement')
      .clickElementOnText('button span', 'Offer an agreement')

      .log('Check create agreement page')
      .verifyTextVisible('Offer new agreement to')

      .log('Click related job')
      .get('#jobList span')
      .eq(0)
      .parents('.radioBtn')
      .should('have.class', 'selected')

      .fillAgreementDetailWithFlatRate('Add new rate', '35', 'automation testing')

      .log('Click Submit btn')
      .clickElementOnText('button span', 'Offer agreement to')

      .log('Verify conversion page')
      .verifyTextVisible('Inbox')
      .verifyTextVisible('Edit last sent offer')
      .verifyTextNotExist('Offer an agreement')

      .log('Click Edit last sent offer')
      .clickElementOnText('button span', 'Edit last sent offer')

      .log('Check amend agreement page')
      .verifyTextVisible('Edit proposed agreement with')

      .log('Check agreement detail')
      .getAttributeAtPosition(data.agreement.worker.rateDescription, 'val', 0)
      .then((text) => expect(text).to.equal('Add new rate'))

      .getAttributeAtPosition(data.agreement.worker.rateMount, 'val', 0)
      .then((text) => expect(text).to.equal(rateAmount))

      .getAttribute(data.agreement.worker.agreedService, 'val')
      .then((text) => expect(text).to.equal('automation testing'));
  });

  it('ES-T566. Create an agreement, with no related job', () => {
    cy
      .log('Login as client')
      .removeAgreementIfExist(
        clientEmail02,
        clientPass02,
        workerId03,
      )

      .log('Login as worker')
      .loginToDashboard(
        workerEmail03,
        workerPass03,
      )

      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log(`Select conversation ${clientEmail02}`)
      .moveToUntilFoundName(clientName02)
      .clickElementOnText('.channelContent .title', clientName02)

      .log('Send a new message')
      .inputTextField(data.message.messageInput, 'send a new message')
      .clickElement(data.message.sendMessBtn, true)

      .log('Click Offer an agreeent')
      .verifyTextVisible('Inbox')
      .verifyTextVisible('Offer an agreement')
      .clickElementOnText('button span', 'Offer an agreement')

      .fillAgreementDetailWithFlatRate('Add new rate', '35', 'automation testing')

      .log('Click Job type: One-off')
      .clickElementOnText(data.agreement.worker.rateRadio, 'One-off')

      .log('Click Submit btn')
      .clickElementOnText('button span', 'Offer agreement to');
  });

  it(`1. ES-T567. Create an agreement, NDIS funded
      2. ES-T1214. Validate Pending Tab Content - New Offer Agreement`, () => {
    cy
      .removeAgreementIfExist(
        detherEmail,
        detherPass,
        workerId04,
      )

      .log('Login as worker')
      .loginToDashboard(
        workerEmail04,
        workerPass04,
      )

      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log(`Select conversation ${detherName}`)
      .moveToUntilFoundName(detherName)
      .clickElementOnText('.channelContent .title', detherName)

      .log('Send a new message')
      .inputTextField(data.message.messageInput, 'send a new message')
      .clickElement(data.message.sendMessBtn, true)

      .log('Click Offer an agreement btn')
      .clickElementOnText('button span', 'Offer an agreement')

      .log('Check create agreement page')
      .verifyTextVisible('Offer new agreement to Dether')

      .log('Enter rate description')
      .inputTextFieldAtPosition(data.agreement.worker.rateDescription, 'Add new rate', '0')

      .log('Enter rate amount')
      .inputTextFieldAtPosition(data.agreement.worker.rateMount, '35', 0)
      .verifyTextNotExist(minimumRateText)

      .log('Click Flat rate')
      .clickAllRadioHaveName('Flat rate')

      .log('Click No, we\'ll discuss and update the agreement later')
      .clickElementOnText(data.agreement.worker.rateRadio, 'No, we\'ll discuss and update the agreement later')

      .log('Select NDIS support items')
      .clickElementOnText(
        'span',
        'grp bd community, social and rec activities - weekday evening - ratio 1:3',
      )

      .log('Enter Agreed services')
      .inputTextField(data.agreement.worker.agreedService, 'automation testing')

      .log('Click Submit btn')
      .clickElementOnText('button span', 'Offer agreement to')

      .log('Go to the My Clients')
      .wait(2000)
      .navigateByLeftMenuInDashboard('My clients')

      .log('Select Pending tab')
      .clickElementOnText('.mat-tab-label-content', 'Pending')

      .log('Verify the client with newly created offer is shown')
      .wait(2000)
      .verifyElementContainsText(
        'app-clients-list .details .clientName',
        'Dether O',
      );
  });

  it('ES-T569. Create an agreement, with organisation', () => {
    cy
      .removeAgreementIfExist(
        organisationEmail,
        organisationPass,
        workerId03,
      )

      .log('Login as worker')
      .loginToDashboard(
        workerEmail03,
        workerPass03,
      )

      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log(`Select conversation ${organisationName}`)
      .moveToUntilFoundName(organisationName)
      .clickElementOnText('.channelContent .title', organisationName)

      .log('Send a new message')
      .inputTextField(data.message.messageInput, 'send a new message')
      .clickElement(data.message.sendMessBtn, true)

      .log('Click Offer an agreeent')
      .clickElementOnText('button span', 'Offer an agreement')

      .log('Check create agreement page')
      .verifyTextVisible('Offer new agreement to Ndis')

      .fillAgreementDetailWithFlatRate('Add new rate', '35', 'automation testing')

      .log('Click Job type: One-off')
      .clickElementOnText(data.agreement.worker.rateRadio, 'One-off')

      .log('Click "I understand that the documents"')
      .clickElement('#mat-checkbox-2-input', true)

      .log('Click submit btn')
      .clickElementOnText('button span', 'Offer agreement to Ndis');
  });

  it('ES-T3622. Create an agreement, validation', () => {
    const minimumRate = '32';
    cy
      .log('Login as client')
      .removeAgreementIfExist(
        clientEmail,
        clientPass,
        workerId2,
      )

      .log('Login as client')
      .loginToDashboard(workerEmail2, workerPass2)

      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log(`Select conversation ${clientName}`)
      .moveToUntilFoundName(clientName)
      .clickElementOnText('.channelContent .title', clientName)

      .log('Send a new message')
      .inputTextField(data.message.messageInput, 'send a new message')
      .clickElement(data.message.sendMessBtn, true)

      .log('Click Offer an agreement btn')
      .verifyTextVisible('Inbox')
      .verifyTextVisible('Offer an agreement')
      .clickElementOnText('button span', 'Offer an agreement')

      .log('Check create agreement page')
      .verifyTextVisible('Offer new agreement to')

      .log('Click related job')
      .get('#jobList span')
      .eq(0)
      .parents('.radioBtn')
      .should('have.class', 'selected')

      .fillAgreementDetailWithFlatRate('Add new rate', '35', 'automation testing')

      .log('On 24 hour rate (flat), remove the amount')
      .clearTextFieldAtPosition(data.agreement.worker.rateMount, 2)
      .verifyTextVisible('Please enter the agreed rate')

      .log('On 24 hour rate, enter 1')
      .inputTextFieldAtPosition(data.agreement.worker.rateMount, '1', '2')
      .verifyTextNotExist('Please enter the agreed rate')

      .log('Untick the flat rate')
      .clickElement(data.agreement.worker.flat, true, 4)

      .log('On 24 hour rate (flat), remove the amount')
      .clearTextFieldAtPosition(data.agreement.worker.rateMount, 2)
      .verifyTextVisible('Please enter the agreed rate')

      .log('On 24 hour rate, enter 1')
      .inputTextFieldAtPosition(data.agreement.worker.rateMount, '1', '2')
      .verifyTextVisible(`Offer a minimum rate of $${minimumRate} for active support under our terms of use.`)

      .log('Click Add rate')
      .clickElementOnText(
        'button span',
        'Add another rate',
      )

      .log('Delete rate')
      .wait(2000)
      .clickLastElement(
        data.agreement.worker.deleteRate,
      );
  });
});
