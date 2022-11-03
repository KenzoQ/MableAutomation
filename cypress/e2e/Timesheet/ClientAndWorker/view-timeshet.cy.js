import * as data from '../../../fixtures/test-data.json';

describe('View Timesheet', () => {
  const adminEmail = data.dashboardAccount.adminAccount.email;
  const adminPass = data.dashboardAccount.adminAccount.password;

  const coordinatorEmail = 'automation_charmain.cotton.nominor+coordinator@donotuse.com.au';
  const coordinatorPass = 'qaAutomation2021';

  const workerName = 'Jacquline Dare';

  const clientEmail = 'automation_abby.streich.timesheet+client3@donotuse.com.au';
  const clientPass = 'qaAutomation2021';

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it('ES-T1256. Timesheet: Empty state view', () => {
    cy
      .log('Login as client')
      .loginToDashboard(
        'automation_dorine.kiehn.timesheet+client5@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Click Timesheet from the left menu')
      .navigateByLeftMenuInDashboard('Support hours')

      .log('Check Timesheet page')
      .verifyTextVisible('You can visit your billing page to keep track of your payments.')

      .log('Click on this link')
      .clickElementOnText(
        'a',
        'You can visit your billing page to keep track of your payments.',
      )
      .log('Verify user will be navigated to Bill page')
      .verifyTextVisible('Billing');
  });

  it('ES-T1257. No Shifts to Approve with Approved/Rejected Sessions view', () => {
    cy
      .rejectTimesheet(
        'automation_abby.streich.timesheet+client3@donotuse.com.au',
        'qaAutomation2021',
        workerName,
        true,
      )

      .log('Login as client')
      .loginToDashboard(
        'automation_abby.streich.timesheet+client3@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Click Timesheet from the left menu')
      .navigateByLeftMenuInDashboard('Support hours')

      .log('Check the timesheet page')
      .verifyTextVisible('Support hours')

      .log('Check Shifts to Approve section')
      .verifyTextVisible('There are no support sessions to approve')

      .log('Check Approved/Rejected Sessions section')
      .verifyTextVisible('Approved / rejected sessions');
  });

  it('ES-T1259. Shifts to Approve with Approved/Rejected Sessions View', () => {
    cy
      .log('Login as client')
      .loginToDashboard(
        'automation_queenie.cartwright.timesheet+client@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Click Timesheet from the left menu')
      .navigateByLeftMenuInDashboard('Support hours')

      .log('Check Timesheet page')
      .verifyTextVisible('Support hours')
      .verifyTextVisible('Scroll left and right to view more columns')
      .verifyTextVisible('Support sessions to approve')
      .verifyTextVisible('Approved / rejected sessions')

      .log('Check Approved / rejected sessions')
      .verifyTextVisible('Support worker')
      .verifyTextVisible('Support date')
      .verifyTextVisible('Start time')
      .verifyTextVisible('Hours')
      .verifyTextVisible('Rate')
      .verifyTextVisible('Rate type')
      .verifyTextVisible('Amount due')
      .verifyTextVisible('Invoice sent for payment')
      .verifyTextVisible('Payment received by Mable')
      .verifyTextVisible('Paid to support worker')
      .verifyTextVisible('Details');
  });

  it('ES-T1261. Approved/Rejected Sessions with Pagination', () => {
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
      .verifyTextVisible('Scroll left and right to view more columns')
      .verifyTextVisible('Support sessions to approve')
      .verifyTextVisible('Approved / rejected sessions')
      .verifyElementVisible('mat-paginator')

      .log('Click on the next icon')
      .clickElement('.mat-paginator-navigation-next', true)
      .verifyElementContainsText(
        'app-paginator p',
        ' Page 2 of',
      )

      .log('Click on the previous icon')
      .clickElement('.mat-paginator-navigation-previous', true)
      .verifyElementContainsText(
        'app-paginator p',
        ' Page 1 of',
      )

      .log('Click on last page icon')
      .clickElement('.mat-paginator-navigation-last')

      .log('Click on first page icon')
      .clickElement('.mat-paginator-navigation-first', true)
      .verifyElementContainsText(
        'app-paginator p',
        ' Page 1 of',
      );
  });

  it('ES-T1404. [Super Admin] - View Approved timesheet sessions detail', () => {
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

      .log('Click Detail link')
      .clickElement(data.timesheet.worker.moreBtn, true, 0)

      .log('Click the Details btn')
      .clickElementOnText(
        'button.mat-menu-item',
        'Details',
      )

      .log('Click Close btn')
      .clickElementOnText('mat-dialog-actions button', 'Close')

      .log('Click Detail link')
      .clickElement(data.timesheet.worker.moreBtn, true, 0)

      .log('Click the Details btn')
      .clickElementOnText(
        'button.mat-menu-item',
        'Details',
      )

      .log('Click View agreeemnt link')
      .clickElementOnText('mat-dialog-content a', 'View agreement')
      .log('Verify user is navigated to agreement page')
      .verifyTextVisible('Agreement with');
  });

  it('ES-T1405. [Super Admin] - View Rejected timesheet sessions detail', () => {
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

  it('ES-T1406. [Super Admin] - View Audit Trails with Incident report', () => {
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

      .log('Click Detail link')
      .clickElement(data.timesheet.worker.moreBtn, true, 0)

      .log('Click the Details btn')
      .clickElementOnText(
        'button.mat-menu-item',
        'Audit trail',
      )

      .log('Check Audit trail page')
      .verifyElementContainsText(
        'mat-dialog-container h2',
        'Audit Trail',
      );
  });

  it('ES-T1464. [Coordinator dashboard] Verify timesheet redirection link', () => {
    const client = 'Sonny Hackett';
    const shortName = 'Sonny';
    cy
      .log('Login as client')
      .loginToDashboard(
        coordinatorEmail,
        coordinatorPass,
      )

      .log('Seach client')
      .inputTextField(
        data.coordinator.searchInput,
        client,
      )
      .clickElementOnText(
        data.coordinator.searchBtn,
        'Search',
      )

      .clickElementOnText(
        '.clientTile button',
        `Login as ${shortName}`,
      )

      .log('Click Timesheet from the left menu')
      .navigateByLeftMenuInDashboard('Support hours')

      .log('Check Timesheet page')
      .verifyTextVisible('Support hours')
      .verifyTextVisible('Support sessions to approve')
      .verifyTextVisible('Approved / rejected sessions');
  });
});
