import * as data from '../../../fixtures/test-data.json';
import moment from 'moment';

describe('Accept-Reject Timesheet', () => {
  const workerEmail = 'automation_jacquline.dare.timesheet+worker@donotuse.com.au';
  const workerPass = 'qaAutomation2021';
  const workerName = 'Jacquline Dare';

  const clientEmail = 'automation_abby.streich.timesheet+client3@donotuse.com.au';
  const clientPass = 'qaAutomation2021';
  const agreementId = '7007';
  const agreementRateId = '28191';

  const clientEmail02 = 'automation_tiffani.hartmann.timesheet+client2@donotuse.com.au';
  const clientPass02 = 'qaAutomation2021';
  const agreementId02 = '7010';
  const agreementRateId02 = '28198';

  const coordinatorEmail = 'automation_charmain.cotton.nominor+coordinator@donotuse.com.au';
  const coordinatorPass = 'qaAutomation2021';

  const workerEmail02 = 'automation_maria.repollo.expresspaymobile+worker@donotuse.com.au';
  const workerPass02 = 'qaAutomation2021';
  const workerName02 = "Harlan O'Kon";

  const clientName03 = 'Sonny Hackett';
  // const clientShortName03 = 'Sonny';
  const agreementId03 = '5922';
  const agreementRateID03 = '26556';

  const orgClientEmail = 'automation_lizzie.heidenreich@donotuse.com.au';
  const orgClientPass = 'qaAutomation2021';
  const orgAgrId = '7708';
  const orgAgrRateId = '29157';

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it('ES-T1263. Approve Support hours - Private Paying Client And Payment Success', () => {
    const day = moment(new Date()).subtract(1, 'day').format('DD MMM YYYY');

    let hour = Math.floor(Math.random() * (13 - 23 + 1) + 13);
    hour = (`0${hour}`).slice(-2);

    cy
      .createTimesheetAsWorkerByAPI(
        workerEmail,
        workerPass,
        agreementId,
        agreementRateId,
        hour,
        hour,
        day,
      )

      .log('Login as client')
      .loginToDashboard(
        clientEmail,
        clientPass,
      )

      .log('Click Timesheet from the left menu')
      .navigateByLeftMenuInDashboard('Support hours')

      .log('Check Timesheet page')
      .verifyTextVisible('Support hours')
      .verifyTextVisible('Support sessions to approve')
      .verifyTextVisible('Approved / rejected sessions')

      .log('Check pending timesheet section')
      .wait(2000)
      .get('body')
      .then($body => {
        if ($body.find(`${data.timesheet.client.approveSession.workerName}:contains(${workerName})`).length > 0) {
          cy.checkApproveSession()

            .log('Click Detail link')
            .clickElementOnText(`${data.timesheet.client.approveSession.value} button`, 'Details')

            .log('Verify Delivery Record popup')
            .verifyTextVisible(data.timesheet.validate.timesheetSessionTitle)

            .log('Click Close btn')
            .clickElementOnText('mat-dialog-actions button', 'Close')

            .log('Click Detail link')
            .clickElementOnText(`${data.timesheet.client.approveSession.value} button`, 'Details')

            .log('Click icon btn')
            .clickElement('#timesheetDetail button.close')

            .log('Click Detail link')
            .clickElementOnText(`${data.timesheet.client.approveSession.value} button`, 'Details')

            .log('Click View agreeemnt link')
            .clickElementOnText('mat-dialog-content a', 'View agreement')
            .log('Verify user is navigated to agreement page')
            .verifyTextVisible('Agreement with')

            .log('Click Timesheet from the left menu')
            .navigateByLeftMenuInDashboard('Support hours')

            .verifyTextVisible('Support hours')
            .verifyTextVisible('Support sessions to approve')
            .verifyTextVisible('Approved / rejected sessions')

            .log('Click Aprrove btn')
            .get(data.timesheet.client.approveSession.workerName)
            .contains(workerName)
            .parents('tr')
            .find(data.timesheet.client.approveSession.action)
            .contains('Approve')
            .click();
        }
      })

      .log('Check Approve/Rejected section')
      .verifyElementContainsText(
        `${data.timesheet.client.approvedRejectTab.value} .incidentWithName span`,
        workerName,
      )
      .waitAppLoaderNotVisible()
      .verifyElementContainsText(
        `${data.timesheet.client.approvedRejectTab.value}`,
        day,
      );

    cy.log('Click Detail link')
      .clickElementOnText(
        `${data.timesheet.client.approvedRejectTab.value} button`,
        'Details',
      )
      .verifyTextVisible(data.timesheet.validate.timesheetSessionTitle)

      .log('Click close btn')
      .clickElementOnText(
        'mat-dialog-actions button',
        'Close',
      )

      .log('Click Detail link')
      .clickElementOnText(
        `${data.timesheet.client.approvedRejectTab.value} button`,
        'Details',
      )
      .verifyTextVisible(data.timesheet.validate.timesheetSessionTitle)

      .log('Click close icon')
      .clickElement('#timesheetDetail .close')

      .log('Click Detail link')
      .clickElementOnText(
        `${data.timesheet.client.approvedRejectTab.value} button`,
        'Details',
      )
      .verifyTextVisible(data.timesheet.validate.timesheetSessionTitle)

      .log('Click agreement link')
      .clickElementOnText(
        '.timesheetDetailContent a',
        'View agreement',
      )
      .verifyTextVisible('Agreement with');
  });

  it('ES-T1264. Reject Timesheet', () => {
    cy
      .createTimesheetAsWorkerByAPI(
        workerEmail,
        workerPass,
        agreementId02,
        agreementRateId02,
        '08',
        '09',
      )

      .log('Login as client')
      .loginToDashboard(
        clientEmail02,
        clientPass02,
      )

      .log('Click Timesheet from the left menu')
      .navigateByLeftMenuInDashboard('Support hours')

      .log('Check Timesheet page')
      .verifyTextVisible('Support hours')
      .verifyTextVisible('Support sessions to approve')
      .verifyTextVisible('Approved / rejected sessions')

      .log('Click Reject btn')
      .get(data.timesheet.client.approveSession.workerName)
      .contains(workerName)
      .parents('tr')
      .find(data.timesheet.client.approveSession.action)
      .contains('Reject')
      .click()

      .log('Click cancel btn')
      .verifyTextVisible('Confirmation')
      .clickElementOnText(
        'mat-dialog-container button',
        'Cancel',
      )

      .log('Click Reject btn')
      .get(data.timesheet.client.approveSession.workerName)
      .contains(workerName)
      .parents('tr')
      .find(data.timesheet.client.approveSession.action)
      .contains('Reject')
      .click()

      .log('Click reject btn')
      .verifyTextVisible('Confirmation')
      .clickElementOnText(
        'mat-dialog-container button',
        'Reject',
      )

      .log('Check Approve/Rejected section')
      .verifyElementContainsText(
        `${data.timesheet.client.approvedRejectTab.value} .incidentWithName span`,
        workerName,
      )

      .verifyElementContainsText(
        `${data.timesheet.client.approvedRejectTab.value} .rejectedVoidedStatus`,
        'Rejected',
      )

      .log('Click Detail link')
      .clickElementOnText(
        `${data.timesheet.client.approvedRejectTab.value} button`,
        'Details',
      )
      .verifyTextVisible(data.timesheet.validate.timesheetSessionTitle)

      .log('Click close btn')
      .clickElementOnText(
        'mat-dialog-actions button',
        'Close',
      )

      .log('Click Detail link')
      .clickElementOnText(
        `${data.timesheet.client.approvedRejectTab.value} button`,
        'Details',
      )
      .verifyTextVisible(data.timesheet.validate.timesheetSessionTitle)

      .log('Click close icon')
      .clickElement('#timesheetDetail .close')

      .log('Click Detail link')
      .clickElementOnText(
        `${data.timesheet.client.approvedRejectTab.value} button`,
        'Details',
      )
      .verifyTextVisible(data.timesheet.validate.timesheetSessionTitle)

      .log('Click agreement link')
      .clickElementOnText(
        '.timesheetDetailContent a',
        'View agreement',
      )
      .verifyTextVisible('Agreement with');
  });

  it('ES-T1393. View Newly Approved Timesheet', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        workerEmail,
        workerPass,
      )

      .log('Click Timesheet from the left menu')
      .navigateByLeftMenuInDashboard('Support hours')
      .checkPopupOnTimesheet()

      .log('Check Timesheet page')
      .verifyTextVisible('Support hours')
      .verifyTextVisible('Learn more');

    // .log('Hover on Approved status')
    // .get('body')
    // .then($body => {
    //   if ($body.find('table tbody tr td div.approvedStatus').length > 0) {
    //     cy
    //       .get('.approvedStatus')
    //       .contains('Approved')
    //       .wait(1000)
    //       .invoke('show')
    //       .trigger('mouseenter')
    //       .getText('mat-tooltip-component div')
    //       .then(text => expect(text).to.include('Approved on'));
    //   }
    // });
  });

  it('ES-T1394. View Newly Rejected Timesheet', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        workerEmail,
        workerPass,
      )

      .log('Click Timesheet from the left menu')
      .navigateByLeftMenuInDashboard('Support hours')
      .checkPopupOnTimesheet()

      .log('Check Timesheet page')
      .verifyTextVisible('Support hours')
      .verifyTextVisible('Learn more')

      .log('Click the more button on pending timesheet')
      .get('.table tbody tr td div')
      .contains('Rejected')
      .parents('tr')
      .find(data.timesheet.worker.moreBtn)
      .click({ force: true })

      .log('Click the Details btn')
      .clickElementOnText(
        'button.mat-menu-item',
        'Details',
      )

      .log('Click close icon')
      .clickElement('app-timesheet-details-dialog button.close')

      .log('Click the more button on pending timesheet')
      .get('.table tbody tr td div')
      .contains('Reject')
      .parents('tr')
      .find(data.timesheet.worker.moreBtn)
      .click({ force: true })

      .log('Click the Details btn')
      .clickElementOnText(
        'button.mat-menu-item',
        'Details',
      )

      .log('Click View Agreement')
      .clickElementOnText(
        'mat-dialog-content a',
        'View agreement',
      )
      .verifyTextVisible('Agreement with');
  });

  it('ES-T1402. View Approved timesheet sessions detail', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        workerEmail,
        workerPass,
      )

      .log('Click Timesheet from the left menu')
      .navigateByLeftMenuInDashboard('Support hours')
      .checkPopupOnTimesheet()

      .log('Check Timesheet page')
      .verifyTextVisible('Support hours')
      .verifyTextVisible('Learn more')

      .log('Click the more button on approved timesheet')
      .get('body')
      .then($body => {
        if ($body.find('table tbody tr td div.approvedStatus').length > 0) {
          cy
            .get('.table tbody tr td div.approvedStatus')
            .contains('Approved')
            .parents('tr')
            .find(data.timesheet.worker.moreBtn)
            .click({ force: true })

            .log('Click the Details btn')
            .clickElementOnText(
              'button.mat-menu-item',
              'Details',
            )
            .verifyTextVisible(data.timesheet.validate.timesheetSessionTitle)

            .log('Click close icon')
            .clickElement('app-timesheet-details-dialog button.close')

            .log('Click the more button on approved timesheet')
            .get('body')
            .then($body => {
              if ($body.find('table tbody tr td div.approvedStatus').length > 0) {
                cy
                  .get('.table tbody tr td div.approvedStatus')
                  .contains('Approved')
                  .parents('tr')
                  .find(data.timesheet.worker.moreBtn)
                  .click({ force: true })

                  .log('Click the Details btn')
                  .clickElementOnText(
                    'button.mat-menu-item',
                    'Details',
                  )

                  .log('Click Close btn')
                  .clickElementOnText(
                    'mat-dialog-actions button',
                    'Close',
                  )

                  .log('Click the more button on approved timesheet')
                  .get('.table tbody tr td div.approvedStatus')
                  .contains('Approved')
                  .parents('tr')
                  .find(data.timesheet.worker.moreBtn)
                  .click({ force: true })

                  .log('Click the Details btn')
                  .clickElementOnText(
                    'button.mat-menu-item',
                    'Details',
                  )

                  .log('Click View Agreement')
                  .clickElementOnText(
                    'mat-dialog-content a',
                    'View agreement',
                  )
                  .wait(1000)

                  .verifyTextVisible('Agreement with');
              }
            });
        }
      });
  });

  it('ES-T1403. View Rejected Support hours sessions detail', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        workerEmail,
        workerPass,
      )

      .log('Click Support hours from the left menu')
      .navigateByLeftMenuInDashboard('Support hours')
      .checkPopupOnTimesheet()

      .log('Check Timesheet page')
      .verifyTextVisible('Support hours')
      .verifyTextVisible('Learn more')

      .log('Click the more button on approved timesheet')
      .get('.table tbody tr td div')
      .contains('Rejected')
      .parents('tr')
      .find(data.timesheet.worker.moreBtn)
      .click({ force: true })

      .log('Click the Details btn')
      .clickElementOnText(
        'button.mat-menu-item',
        'Details',
      )
      .verifyTextVisible(data.timesheet.validate.timesheetSessionTitle)

      .log('Click close icon')
      .clickElement('app-timesheet-details-dialog button.close')

      .log('Click the more button on approved timesheet')
      .get('.table tbody tr td div')
      .contains('Rejected')
      .parents('tr')
      .find(data.timesheet.worker.moreBtn)
      .click({ force: true })

      .log('Click the Details btn')
      .clickElementOnText(
        'button.mat-menu-item',
        'Details',
      )

      .log('Click Close btn')
      .clickElementOnText(
        'mat-dialog-actions button',
        'Close',
      )

      .log('Click the more button on approved timesheet')
      .get('.table tbody tr td div')
      .contains('Rejected')
      .parents('tr')
      .find(data.timesheet.worker.moreBtn)
      .click({ force: true })

      .log('Click the Details btn')
      .clickElementOnText(
        'button.mat-menu-item',
        'Details',
      )

      .log('Click View Agreement')
      .clickElementOnText(
        'mat-dialog-content a',
        'View agreement',
      )

      .verifyTextVisible('Agreement with');
  });

  it('ES-T1280. Approve Timesheet - Private Paying Client And Payment Fail', () => {
    const day = moment(new Date()).subtract(1, 'day').format('DD MMM YYYY');
    let hour = Math.floor(Math.random() * (12 - 22 + 1) + 13);
    hour = (`0${hour}`).slice(-2);

    cy
      .rejectTimesheet(
        clientEmail02,
        clientPass02,
        workerName,
      )
      .createTimesheetAsWorkerByAPI(
        workerEmail,
        workerPass,
        agreementId02,
        agreementRateId02,
        hour,
        hour,
        day,
      )
      .log('Login as client')
      .loginToDashboard(
        clientEmail02,
        clientPass02,
      )

      .log('Click Timesheet from the left menu')
      .navigateByLeftMenuInDashboard('Support hours')

      .log('Check Timesheet page')
      .verifyTextVisible('Support hours')
      .verifyTextVisible('Support sessions to approve')
      .verifyTextVisible('Approved / rejected sessions')

      .log('Check pending timesheet section')
      .wait(2000)
      .get('body')
      .then($body => {
        if ($body.find(`${data.timesheet.client.approveSession.workerName}:contains(${workerName})`).length > 0) {
          cy.checkApproveSession()

            .log('Click Detail link')
            .clickElementOnText(`${data.timesheet.client.approveSession.value} button`, 'Details')

            .log('Verify Delivery Record popup')
            .verifyTextVisible(data.timesheet.validate.timesheetSessionTitle)

            .log('Click Close btn')
            .clickElementOnText('mat-dialog-actions button', 'Close')

            .log('Click Detail link')
            .clickElementOnText(`${data.timesheet.client.approveSession.value} button`, 'Details')

            .log('Click icon btn')
            .clickElement('#timesheetDetail button.close')

            .log('Click Approve btn')
            .get(data.timesheet.client.approveSession.workerName)
            .contains(workerName)
            .parents('tr')
            .find(data.timesheet.client.approveSession.action)
            .contains('Approve')
            .click()
            .wait(2000)

            .log('Verify timesheet approved successfully')
            .verifyElementContainsText(
              `${data.timesheet.client.approvedRejectTab.value} .incidentWithName span`,
              workerName,
            )

            .log('Click Detail link')
            .clickElementOnText(
              `${data.timesheet.client.approvedRejectTab.value} button`,
              'Details',
            )
            .verifyTextVisible(data.timesheet.validate.timesheetSessionTitle)

            .log('Click close btn')
            .clickElementOnText(
              'mat-dialog-actions button',
              'Close',
            );
        }
      });
  });

  it('ES-T1282. Approve Timesheet - government funding', () => {
    const day = moment(new Date()).subtract(1, 'day').format('DD MMM YYYY');
    let hour = Math.floor(Math.random() * (12 - 22 + 1) + 13);
    hour = (`0${hour}`).slice(-2);

    cy
      .createNDISTimesheetByAPI(
        workerEmail,
        workerPass,
        orgAgrId,
        orgAgrRateId,
        hour,
        hour,
        day,
      );
    cy
      .log(`Login ${orgClientEmail}`)

      .loginAPI(orgClientEmail,
        orgClientPass)
      .visit('/dashboard')

      .log('Click Timesheet from the left menu')
      .navigateByLeftMenuInDashboard('Support hours')

      .log('Check Timesheet page')
      .verifyTextVisible('Support hours')
      .verifyTextVisible('Support sessions to approve')
      .verifyTextVisible('Approved / rejected sessions')

      .log('Check pending timesheet section')
      .wait(2000)
      .get('body')
      .then($body => {
        if ($body.find(`${data.timesheet.client.approveSession.workerName}:contains(${workerName})`).length > 0) {
          cy.checkApproveSession()

            .log('Click Detail link')
            .clickElementOnText(`${data.timesheet.client.approveSession.value} button`, 'Details')

            .log('Verify Delivery Record popup')
            .verifyTextVisible(data.timesheet.validate.timesheetSessionTitle)

            .log('Click Close btn')
            .clickElementOnText('mat-dialog-actions button', 'Close')

            .log('Click Aprrove btn')
            .get(data.timesheet.client.approveSession.workerName)
            .contains(workerName)
            .parents('tr')
            .find(data.timesheet.client.approveSession.action)
            .contains('Approve')
            .click()
            .wait(2000)
            .verifyElementContainsText(
              `${data.timesheet.client.approvedRejectTab.value} .incidentWithName span`,
              workerName,
            );
        }
      });
  });

  it('ES-T1407. [Coordinator] Reject Timesheet', () => {
    cy
      .createTimesheetAsWorkerByAPI(
        workerEmail02,
        workerPass02,
        agreementId03,
        agreementRateID03,
        '11',
        '11',
      )

      .log('Login as Coordinator')
      .loginToDashboard(
        coordinatorEmail,
        coordinatorPass,
      )

      .log('Seach client')
      .inputTextField(
        data.coordinator.searchInput,
        clientName03,
      )
      .clickElementOnText(
        data.coordinator.searchBtn,
        'Search',
      )
      .waitAppLoaderNotVisible()
      .verifyTextVisible('match your search')

      .clickElementOnText(
        'button>span',
        'Support hours',
      )

      .log('Check Timesheet page')
      .waitAppLoaderNotVisible()
      .verifyTextVisible('Support hours')
      .verifyTextVisible('Support sessions to approve')
      .verifyTextVisible('Approved / rejected sessions')

      .log('Click Reject btn')
      .get(data.timesheet.client.approveSession.workerName)
      .contains(workerName02)
      .parents('tr')
      .find(data.timesheet.client.approveSession.action)
      .contains('Reject')
      .click()

      .log('Click cancel btn')
      .verifyTextVisible('Confirmation')
      .clickElementOnText(
        'mat-dialog-container button',
        'Cancel',
      )

      .log('Click Reject btn')
      .get(data.timesheet.client.approveSession.workerName)
      .contains(workerName02)
      .parents('tr')
      .find(data.timesheet.client.approveSession.action)
      .contains('Reject')
      .click()

      .log('Click reject btn')
      .verifyTextVisible('Confirmation')
      .clickElementOnText(
        'mat-dialog-container button',
        'Reject',
      )

      .log('Check Approve/Rejected section')
      .verifyElementContainsText(
        `${data.timesheet.client.approvedRejectTab.value} .incidentWithName span`,
        workerName02,
      )

      .verifyElementContainsText(
        `${data.timesheet.client.approvedRejectTab.value} .rejectedVoidedStatus`,
        'Rejected',
      )

      .log('Click Detail link')
      .clickElementOnText(
        `${data.timesheet.client.approvedRejectTab.value} button`,
        'Details',
      )
      .verifyTextVisible(data.timesheet.validate.timesheetSessionTitle)

      .log('Click close btn')
      .clickElementOnText(
        'mat-dialog-actions button',
        'Close',
      );
  });

  it('ES-T1408. [Coordinator] Approve Timesheet - Government Paying Client (no incident report)', () => {
    const day = moment(new Date()).subtract(1, 'day').format('DD MMM YYYY');

    let hour = Math.floor(Math.random() * (13 - 23 + 1) + 13);
    hour = (`0${hour}`).slice(-2);

    cy
      .createTimesheetAsWorkerByAPI(
        workerEmail02,
        workerPass02,
        agreementId03,
        agreementRateID03,
        hour,
        hour,
        day,
      )

      .log('Login as Coordinator')
      .loginToDashboard(
        coordinatorEmail,
        coordinatorPass,
      )

      .log('Seach client')
      .inputTextField(
        data.coordinator.searchInput,
        clientName03,
      )
      .clickElementOnText(
        data.coordinator.searchBtn,
        'Search',
      )
      .waitAppLoaderNotVisible()
      .verifyTextVisible('match your search')

      .clickElementOnText(
        'button>span',
        'Support hours',
      )

      .log('Check Timesheet page')
      .waitAppLoaderNotVisible()
      .verifyTextVisible('Support hours')
      .verifyTextVisible('Support sessions to approve')
      .verifyTextVisible('Approved / rejected sessions')

      .log('Check pending timesheet section')
      .wait(2000)
      .get('body')
      .then($body => {
        if ($body.find(`${data.timesheet.client.approveSession.workerName}:contains(${workerName02})`).length > 0) {
          cy
            .checkApproveSession()

            .log('Click Detail link')
            .clickElementOnText(`${data.timesheet.client.approveSession.value} button`, 'Details')

            .log('Verify Delivery Record popup')
            .verifyTextVisible(data.timesheet.validate.timesheetSessionTitle)

            .log('Click Close btn')
            .clickElementOnText('mat-dialog-actions button', 'Close')

            .log('Click Detail link')
            .clickElementOnText(`${data.timesheet.client.approveSession.value} button`, 'Details')

            .log('Click icon btn')
            .clickElement('#timesheetDetail button.close', true)
            .wait(1000)

            .log('Click Aprrove btn')
            .get(data.timesheet.client.approveSession.workerName)
            .first()
            .parents('tr')
            .find(data.timesheet.client.approveSession.action)
            .contains('Approve')
            .click({ force: true })
            .wait(3000);
        }
      })

      .log('Check Approve/Rejected section')
      .verifyElementContainsText(
        `${data.timesheet.client.approvedRejectTab.value} .incidentWithName span`,
        workerName02,
      )

      .verifyElementContainsText(
        `${data.timesheet.client.approvedRejectTab.value}`,
        day,
      )

      .verifyElementContainsText(
        `${data.timesheet.client.approvedRejectTab.value} .approvedStatus`,
        'Approved',
      );

    cy.log('Click Detail link')
      .clickElementOnText(
        `${data.timesheet.client.approvedRejectTab.value} button`,
        'Details',
      )
      .verifyTextVisible(data.timesheet.validate.timesheetSessionTitle)

      .log('Click close btn')
      .clickElementOnText(
        'mat-dialog-actions button',
        'Close',
      );
  });
});
