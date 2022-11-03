import moment from 'moment';
import * as data from '../../../fixtures/test-data.json';

describe('Other Timesheet function', () => {
  const adminEmail = data.dashboardAccount.adminAccount.email;
  const adminPass = data.dashboardAccount.adminAccount.password;

  const workerEmail = 'automation_jacquline.dare.timesheet+worker@donotuse.com.au';
  const workerPass = 'qaAutomation2021';
  const workerName = 'Jacquline Dare';

  const clientEmail = 'automation_queenie.cartwright.timesheet+client@donotuse.com.au';
  const clientPass = 'qaAutomation2021';
  const clientName = 'Queenie Cartwright';
  const agreementId = '7011';
  const agreementRateId = '28201';

  const clientName02 = 'Tiffani Hartmann';

  const clientEmail03 = 'automation_abby.streich.timesheet+client3@donotuse.com.au';
  const clientPass03 = 'qaAutomation2021';

  const orgClientName = 'Lizzie Heidenreich';
  const orgClientEmail = 'automation_lizzie.heidenreich@donotuse.com.au';
  const orgClientPass = 'qaAutomation2021';

  beforeEach(() => {
    cy.clearCookies()
      .clearLocalStorage()
      .visit('/');
  });

  it('ES-T1395. View Tooltip - Invoiced status on Invoice sent for payment column', () => {
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

      .log('Hover on Invoice status')
      .get('.mat-tooltip-trigger.approvedStatus')
      .contains('Approved')
      .invoke('show')
      .trigger('mouseenter')

      .log('Verify tooltip is shown')
      .getText('mat-tooltip-component div')
      .then(text => expect(text).to.include('Approved on'));
  });

  it('ES-T1396. View Tooltip - Pending status on Payment received by Mable column', () => {
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

      .log('Hover on pending status')
      .get('body')
      .then($body => {
        if ($body.find('.mat-tooltip-trigger:contains(Pending)').length > 0) {
          cy
            .log('Hover on pending status')
            .get('.mat-tooltip-trigger')
            .contains('Pending')
            .invoke('show')
            .trigger('mouseenter')

            .log('Verify tooltip is shown')
            .verifyElementExist('mat-tooltip-component div');
        }
      });
  });

  it('ES-T1397. View Tooltip - Collected status on Payment received by Mable column', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        'automation_rosita.koelpin@donotuse.com.au',
        'Mable2021',
      )

      .log('Click Timesheet from the left menu')
      .navigateByLeftMenuInDashboard('Support hours')
      .checkPopupOnTimesheet()

      .log('Check Timesheet page')
      .verifyTextVisible('Support hours')
      .verifyTextVisible('Learn more')

      .log('Hover on Invoice status')
      .get('.mat-tooltip-trigger.approvedStatus div')
      .contains('Collected')
      .invoke('show')
      .trigger('mouseenter')

      .log('Verify tooltip is shown')
      .getText('mat-tooltip-component div')
      .then(text => expect(text).to.include('Received from client on'));
  });

  it('ES-T1398. View Tooltip - Paid status on Paid to you column', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        'automation_rosita.koelpin@donotuse.com.au',
        'Mable2021',
      )

      .log('Click Timesheet from the left menu')
      .navigateByLeftMenuInDashboard('Support hours')
      .checkPopupOnTimesheet()

      .log('Check Timesheet page')
      .verifyTextVisible('Support hours')
      .verifyTextVisible('Learn more')

      .log('Hover on Invoice status')
      .get('.mat-tooltip-trigger.approvedStatus div')
      .contains('Paid')
      .invoke('show')
      .trigger('mouseenter')

      .log('Verify tooltip is shown')
      .getText('mat-tooltip-component div')
      .then(text => expect(text).to.include('Paid on'));
  });

  it(`
    1. ES-T1465. Payment Inquiry
    2. ES-T1399. Enquire on Overdue payment status
  `, () => {
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

      .log('Click timesheet')
      .get('body')
      .then(($body) => {
        if ($body.find('.table tbody tr td div.overdueStatus a').length > 0) {
          cy
            .clickElement(
              '.table tbody tr td div.overdueStatus a',
              true,
              0,
            )

            .log('Click Enquire item')
            .clickElementOnText(
              '.mat-menu-content button',
              'Enquire',
            )

            .log('Verify the Enquire popup is shown')
            .verifyTextVisible('Payment status enquiry')

            .log('Click Cancel btn')
            .clickElementOnText(
              'mat-dialog-actions button',
              'Cancel',
            )

            .clickElement(
              '.table tbody tr td div.overdueStatus a',
              true,
              0,
            )

            .log('Click Enquire item')
            .clickElementOnText(
              '.mat-menu-content button',
              'Enquire',
            )

            .log('Click Enquire btn')
            .clickElementOnText(
              'mat-dialog-actions button',
              'Enquire',
            );
        }
      });
  });

  it('ES-T1467. Delivered hours validation', () => {
    const day = moment();
    const date = day.date();
    const month = day.format('MMMM');
    const year = day.year();

    const preDay = moment().subtract(2, 'day');
    const preDate = preDay.date();
    const preMonth = preDay.format('MMMM');
    const preYear = preDay.year();

    cy
      .rejectTimesheet(
        clientEmail,
        clientPass,
        workerName,
      )

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

      .log('Click Add new btn')
      .clickElementOnText(
        '.action button',
        'Add new',
      )
      .verifyTextVisible('Add new support hours')

      .log('Select client from client dropdown list')
      .selectDropdown(
        data.timesheet.worker.createForm.selectClient,
        clientName02,
      )

      .log('Click on start date')
      .selectDropdown(
        data.timesheet.worker.createForm.startDateSelect,
        date.toString(),
        0,
      )
      .selectDropdown(
        data.timesheet.worker.createForm.startDateSelect,
        month,
        1,
      )
      .selectDropdown(
        data.timesheet.worker.createForm.startDateSelect,
        year.toString(),
        2,
      )

      .log('Click on hours in start day')
      .selectDropdown(
        data.timesheet.worker.createForm.startTimeSelect,
        '06',
        0,
      )

      .log('Click on minutes in start day')
      .selectDropdown(
        data.timesheet.worker.createForm.startTimeSelect,
        '00',
        1,
      )

      .log('Click on AM/PM dropdown')
      .selectDropdown(
        data.timesheet.worker.createForm.startTimeSelect,
        'AM',
        2,
      )

      .log('Click on end date')
      .selectDropdown(
        data.timesheet.worker.createForm.endDateSelect,
        preDate.toString(),
        0,
      )
      .selectDropdown(
        data.timesheet.worker.createForm.endDateSelect,
        preMonth,
        1,
      )
      .selectDropdown(
        data.timesheet.worker.createForm.endDateSelect,
        preYear.toString(),
        2,
      )

      .log('Click on hours in end day')
      .selectDropdown(
        data.timesheet.worker.createForm.endTimeSelect,
        '11',
        0,
      )

      .log('Click on minutes in end day')
      .selectDropdown(
        data.timesheet.worker.createForm.endTimeSelect,
        '00',
        1,
      )

      .log('Click on AM/PM dropdown')
      .selectDropdown(
        data.timesheet.worker.createForm.endTimeSelect,
        'PM',
        2,
      )

      .log('Click on rate')
      .get(`${data.timesheet.worker.createForm.selectRate} > option:nth-child(2)`)
      .then(element => cy
        .selectDropdown(data.timesheet.worker.createForm.selectRate, element.val()))

      .clickOkIfExist()

      .log('Add shift note')
      .inputTextField(
        data.timesheet.worker.createForm.shiftNote,
        'create new timesheet',
      )

      .clickElementOnText('[aria-labelledby="incidentRadioLabel"] span', 'No')
      .waitAppLoaderNotVisible()

      .log('Click submit button')
      .clickElementOnText(
        'app-add-session button',
        'Submit',
      )

      .log('Verify the error message is shown')
      .verifyTextVisible('Important notice')
      .verifyTextVisible('Delivered hours must be greater than 0');
  });

  it('ES-T1400. Overlapping session validation', () => {
    const day = moment();
    const date = day.date();
    const month = day.format('MMMM');
    const year = day.year();
    cy
      .createTimesheetAsWorkerByAPI(
        workerEmail,
        workerPass,
        agreementId,
        agreementRateId,
        '06',
        '08',
        day,
      )

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

      .log('Click Add new btn')
      .clickElementOnText(
        'button',
        'Add new',
      )
      .verifyTextVisible('Add new support hours')

      .log('Select client from client dropdown list')
      .selectDropdown(
        data.timesheet.worker.createForm.selectClient,
        clientName,
      )

      .waitAppLoaderNotVisible()

      .log('Click on start date')
      .selectDropdown(
        data.timesheet.worker.createForm.startDateSelect,
        date.toString(),
        0,
      )
      .selectDropdown(
        data.timesheet.worker.createForm.startDateSelect,
        month,
        1,
      )
      .selectDropdown(
        data.timesheet.worker.createForm.startDateSelect,
        year.toString(),
        2,
      )

      .log('Click on hours in start day')
      .selectDropdown(
        data.timesheet.worker.createForm.startTimeSelect,
        '06',
        0,
      )

      .log('Click on minutes in start day')
      .selectDropdown(
        data.timesheet.worker.createForm.startTimeSelect,
        '00',
        1,
      )

      .log('Click on AM/PM dropdown')
      .selectDropdown(
        data.timesheet.worker.createForm.startTimeSelect,
        'AM',
        2,
      )

      .log('Click on end date')
      .selectDropdown(
        data.timesheet.worker.createForm.endDateSelect,
        date.toString(),
        0,
      )
      .selectDropdown(
        data.timesheet.worker.createForm.endDateSelect,
        month,
        1,
      )
      .selectDropdown(
        data.timesheet.worker.createForm.endDateSelect,
        year.toString(),
        2,
      )

      .log('Click on hours in start day')
      .selectDropdown(
        data.timesheet.worker.createForm.endTimeSelect,
        '08',
        0,
      )

      .log('Click on minutes in start day')
      .selectDropdown(
        data.timesheet.worker.createForm.endTimeSelect,
        '00',
        1,
      )

      .log('Click on AM/PM dropdown')
      .selectDropdown(
        data.timesheet.worker.createForm.endTimeSelect,
        'AM',
        2,
      )

      .log('Click on rate')
      .get(`${data.timesheet.worker.createForm.selectRate} > option:nth-child(2)`)
      .then(element => cy
        .selectDropdown(data.timesheet.worker.createForm.selectRate, element.val()))

      .clickCloseIfExist()

      .get(data.timesheet.worker.createForm.incident.checkbox)
      .first()
      .trigger('mouseover', { force: true })

      .waitAppLoaderNotVisible()
      .clickElement(
        data.timesheet.worker.createForm.incident.checkbox,
        true,
        0,
      )

      .log('Add shift note')
      .inputTextField(
        data.timesheet.worker.createForm.shiftNote,
        'create new timesheet',
      )

      .log('Click Learn more link')
      .clickElementOnText(
        'button.shiftNotes',
        'Learn more',
      )

      .verifyTextVisible('Writing notes')
      .clickElementOnText('app-expansion-panel .headerText', 'Writing notes')
      .verifyTextVisible('How to write support notes')
      .clickElementOnText('app-expansion-panel .headerText', 'Writing notes')
      .waitAppLoaderNotVisible()
      .verifyTextVisible('Attachment guidelines')
      .clickElementOnText('app-expansion-panel .headerText', 'Attachment guidelines')
      .verifyTextVisible('Terms of use (section 5)')
      .clickElementOnText('app-expansion-panel .headerText', 'Attachment guidelines')
      .waitAppLoaderNotVisible()

      .clickCloseIfExist()

      .log('Check Incident report')
      .verifyTextVisible('Incident report')

      .waitAppLoaderNotVisible()

      .get(data.timesheet.worker.createForm.incident.checkbox)
      .first()
      .trigger('mouseover', { force: true })

      .clickElement(
        data.timesheet.worker.createForm.incident.checkbox,
        true,
        1,
      )

      .log('Click submit button')
      .clickElementOnText(
        'button',
        'Submit',
      )

      .log('Verify worker can not submit the timesheet form')
      .verifyTextVisible('Add new support hours')
      .verifyTextVisible('Important notice');
  });

  it('ES-T1457. Total allocated time to Government/Org Paying item list [Validation]', () => {
    cy
      .rejectTimesheet(
        orgClientEmail,
        orgClientPass,
        workerName,
      )
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

      .log('Click Add new btn')
      .clickElementOnText(
        '.action button',
        'Add new',
      )
      .verifyTextVisible('Add new support hours')

      .log('Select client from client dropdown list')
      .selectDropdown(
        data.timesheet.worker.createForm.selectClient,
        orgClientName,
      )

      .log('Click on hours in start day')
      .selectDropdown(
        data.timesheet.worker.createForm.startTimeSelect,
        '08',
        0,
      )

      .log('Click on minutes in start day')
      .selectDropdown(
        data.timesheet.worker.createForm.startTimeSelect,
        '00',
        1,
      )

      .log('Click on AM/PM dropdown')
      .selectDropdown(
        data.timesheet.worker.createForm.startTimeSelect,
        'AM',
        2,
      )

      .log('Click on hours in end day')
      .selectDropdown(
        data.timesheet.worker.createForm.endTimeSelect,
        '10',
        0,
      )

      .log('Click on minutes in end day')
      .selectDropdown(
        data.timesheet.worker.createForm.endTimeSelect,
        '00',
        1,
      )

      .log('Click on AM/PM dropdown')
      .selectDropdown(
        data.timesheet.worker.createForm.endTimeSelect,
        'AM',
        2,
      )

      .log('Click on rate')
      .get(`${data.timesheet.worker.createForm.selectRate} > option:nth-child(2)`)
      .then(element => cy
        .selectDropdown(data.timesheet.worker.createForm.selectRate, element.val()))

      .clickOkIfExist()

      .log('Add the hour in support duration')
      .inputTextFieldAtPosition(
        data.timesheet.worker.createForm.supportDurationHour,
        '2',
        0,
      )
      .log('Add the minutes in support duration')
      .inputTextFieldAtPosition(
        data.timesheet.worker.createForm.supportDurationMinute,
        '00',
        0,
      )
      .log('Add the hour in support duration')
      .inputTextFieldAtPosition(
        data.timesheet.worker.createForm.supportDurationHour,
        '1',
        1,
      )
      .log('Add the minutes in support duration')
      .inputTextFieldAtPosition(
        data.timesheet.worker.createForm.supportDurationMinute,
        '00',
        1,
      )

      .log('Add shift note')
      .inputTextField(
        data.timesheet.worker.createForm.shiftNote,
        'create new timesheet',
      )

      .clickElementOnText('[aria-labelledby="incidentRadioLabel"] span', 'No')
      .waitAppLoaderNotVisible()

      .log('Click submit button')
      .clickElementOnText(
        'app-add-session button',
        'Submit',
      )
      .log('Verify error message is shown')
      .verifyTextVisible('Important notice')
      .verifyTextVisible('Total time allocated to NDIS items does not match the total duration worked');
  });

  it('ES-T1284. New Timesheet Notification', () => {
    cy
      .createTimesheetAsWorkerByAPI(
        workerEmail,
        workerPass,
        agreementId,
        agreementRateId,
        '05',
        '05',
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

      .verifyTextVisible('Support hours rejected successfully');
  });

  it('ES-T1369. View Incident Report with shared incident details', () => {
    cy
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

      .log('Check incident details')
      .verifyElementContainsText(
        '.incidentWithName div',
        'Incident',
      );
  });

  it('ES-T374. View Tooltip- Collected Status on Payment collected column', () => {
    cy
      .log('Login as client')
      .loginToDashboard(
        clientEmail03,
        clientPass03,
      )

      .log('Click Timesheet from the left menu')
      .navigateByLeftMenuInDashboard('Support hours')

      .log('Check Timesheet page')
      .verifyTextVisible('Support hours')
      .verifyTextVisible('Support sessions to approve')
      .verifyTextVisible('Approved / rejected sessions')

      .log('Hover on Collected status')
      .get(`${data.timesheet.client.approvedRejectTab.value} .approvedStatus div`)
      .contains('Collected')
      .invoke('show')
      .trigger('mouseenter')
      .getText('mat-tooltip-component div')
      .then(text => expect(text).to.include('Received from client on'));
  });

  it('ES-T1414. [Super Admin]- Void Timesheet session with Pending Payment', () => {
    cy
      .log('Login as admin')
      .loginToDashboard(
        adminEmail,
        adminPass,
      )

      .log('Search worker')
      .inputTextField(
        data.admin.searchInput,
        workerName,
      )
      .clickElement(data.admin.searchBtn)

      .wait(2000)
      .clickElementOnText(
        '.actions a',
        'Login as',
      )

      .log('Click Timesheet from the left menu')
      .navigateByLeftMenuInDashboard('Support hours')
      .checkPopupOnTimesheet()

      .log('Click timesheet')
      .clickElement('.mat-paginator-navigation-next', true)
      .wait(2000)
      .get('body')
      .then(($body) => {
        if ($body.find('.table tbody tr td button:contains("Express Pay")').length > 0) {
          cy.get('.table tbody tr td button')
            .contains('Express Pay')
            .parents('tr')
            .find(data.timesheet.worker.moreBtn)
            .click({ force: true })

            .log('Click the Void only btn')
            .clickElementOnText(
              'button.mat-menu-item',
              'Void only',
            )

            .log('Click cancel btn')
            .clickElementOnText(
              '.mat-dialog-actions button',
              'Cancel',
            )

            .get('.table tbody tr td button')
            .contains('Express Pay')
            .parents('tr')
            .find(data.timesheet.worker.moreBtn)
            .click({ force: true })

            .log('Click the Void only btn')
            .clickElementOnText(
              'button.mat-menu-item',
              'Void only',
            )

            .log('Click cancel btn')
            .clickElementOnText(
              '.mat-dialog-actions button',
              'Confirm',
            )

            .log('Verify Void successfully')
            .verifyTextVisible(
              'Timesheet voided successfully',
            )
            .verifyElementContainsText(
              '.rejectedVoidedStatus',
              'Voided',
            );
        }
      });
  });

  // it('ES-T1415. [Super Admin] - Void Timesheet session with Collected Payment', () => {
  //   cy
  //     .log('Login as admin')
  //     .loginToDashboard(
  //       adminEmail,
  //       adminPass,
  //     )

  //     .log('Search worker')
  //     .inputTextField(
  //       data.admin.searchInput,
  //       workerName,
  //     )
  //     .clickElement(data.admin.searchBtn)

  //     .wait(2000)
  //     .clickElementOnText(
  //       '.actions a',
  //       'Login as',
  //     )

  //     .log('Click Timesheet from the left menu')
  //     .navigateByLeftMenuInDashboard('Support hours')
  //     .checkPopupOnTimesheet()

  //     .log('Click timesheet')
  //     .clickElement('.mat-paginator-navigation-next', true)
  //     .wait(2000)
  //     .get('body')
  //     .then(($body) => {
  // eslint-disable-next-line max-len
  //       if ($body.find('.table tbody tr td .approvedStatus div:contains("Collected")').length > 0) {
  //         cy.get('.table tbody tr td .approvedStatus div')
  //           .contains('Collected')
  //           .parents('tr')
  //           .find(data.timesheet.worker.moreBtn)
  //           .click({ force: true })

  //           .log('Click the Void only btn')
  //           .clickElementOnText(
  //             'button.mat-menu-item',
  //             'Void only',
  //           )

  //           .log('Click cancel btn')
  //           .clickElementOnText(
  //             '.mat-dialog-actions button',
  //             'Cancel',
  //           )

  //           .get('.table tbody tr td .approvedStatus div')
  //           .contains('Collected')
  //           .parents('tr')
  //           .find(data.timesheet.worker.moreBtn)
  //           .click({ force: true })

  //           .log('Click the Void only btn')
  //           .clickElementOnText(
  //             'button.mat-menu-item',
  //             'Void only',
  //           )

  //           .log('Click cancel btn')
  //           .clickElementOnText(
  //             '.mat-dialog-actions button',
  //             'Confirm',
  //           )

  //           .log('Verify Void successfully')
  //           .verifyTextVisible(
  //             'Timesheet voided successfully',
  //           )
  //           .verifyElementContainsText(
  //             '.rejectedVoidedStatus',
  //             'Voided',
  //           );
  //       }
  //     });
  // });

  it('ES-T1447. [Super Admin] - Void and amend Timesheet session with Pending Payment', () => {
    cy
      .log('Login as admin')
      .loginToDashboard(
        adminEmail,
        adminPass,
      )

      .log('Search worker')
      .inputTextField(
        data.admin.searchInput,
        workerName,
      )
      .clickElement(data.admin.searchBtn)

      .wait(2000)
      .clickElementOnText(
        '.actions a',
        'Login as',
      )

      .log('Click Timesheet from the left menu')
      .navigateByLeftMenuInDashboard('Support hours')
      .checkPopupOnTimesheet()

      .log('Click timesheet')
      .clickElement('.mat-paginator-navigation-next', true)
      .clickElement('.mat-paginator-navigation-next', true)
      .clickElement('.mat-paginator-navigation-next', true)
      .clickElement('.mat-paginator-navigation-next', true)
      .clickElement('.mat-paginator-navigation-next', true)
      .wait(2000)
      .get('body')
      .then(($body) => {
        if ($body.find('.table tbody tr td div.overdueStatus a').length > 0) {
          cy
            .get('.table tbody tr td div.overdueStatus a')
            .contains('Overdue')
            .parents('tr')
            .find(data.timesheet.worker.moreBtn)
            .click({ force: true })

            .log('Click the Void only btn')
            .clickElementOnText(
              'button.mat-menu-item',
              'Void only',
            )

            .log('Click cancel btn')
            .clickElementOnText(
              '.mat-dialog-actions button',
              'Cancel',
            )

            .get('.table tbody tr td')
            .contains('Overdue')
            .parents('tr')
            .find(data.timesheet.worker.moreBtn)
            .click({ force: true })

            .log('Click the Void only btn')
            .clickElementOnText(
              'button.mat-menu-item',
              'Void only',
            )

            .log('Click cancel btn')
            .clickElementOnText(
              '.mat-dialog-actions button',
              'Confirm',
            )

            .log('Verify Void successfully')
            .verifyTextVisible(
              'Timesheet voided successfully',
            )
            .verifyElementContainsText(
              '.rejectedVoidedStatus',
              'Voided',
            );
        }
      });
  });
});
