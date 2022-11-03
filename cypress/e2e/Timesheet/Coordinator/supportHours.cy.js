/* eslint-disable no-unused-vars */
import * as data from '../../../fixtures/test-data.json';
import moment from 'moment';

describe('CoordinatorDashboard - support hours', () => {
  const { baseUrl } = Cypress.config('baseUrl');
  const workerEmail = 'automation_kerry.washington.timesheet+worker@donotuse.com.au';
  const defaultPassword = 'qaAutomation2021';
  const workerName = 'Kerry';
  const workerID = '19858';
  const danielName = 'Daniel';
  const coordinatorAccounts = {
    emptyState: {
      email: 'automation_tom.hanks.emptystatedashboard+coordinator@donotuse.com.au',
      password: 'qaAutomation2021',
    },
    wilfStone: {
      email: 'automation_wilf.stone.20+clients+coordinator@donotuse.com.au',
      password: 'qaAutomation2021',
    },
    sigmud: {
      email: 'automation_sigmund.chas.notlinkedtoanorg+coordinator@donotuse.com.au',
      password: 'qaAutomation2021',
    },
    baker: {
      email: 'baker.darcy@mable.com.au',
      password: 'qaAutomation2021',
      name: 'Baker',
      id: '19548',
    },
  };
  const welcomeContent = {
    emptyState: {
      welcome: 'Welcome, ',
      name: 'Tom Hanks',
      content: 'Start to build a support network for your clients.',
    },
    wilfStone: {
      welcome: 'Welcome, ',
      name: 'Wilf Stone',
      content1: 'Access messages, support hours and agreements or log in as your client for all options and features. If you have any questions, please email us at ',
      content2: 'coordinator@mable.com.au',
      content3: ' or call us on 1300 73 65 73 and select option 4.',
    },
    sigmud: {
      welcome: 'Welcome, ',
      name: 'Sigmund Chas',
      content1: 'Access messages, support hours and agreements or log in as your client for all options and features. If you have any questions, please email us at ',
      content2: 'coordinator@mable.com.au',
      content3: ' or call us on 1300 73 65 73 and select option 4.',
    },
  };

  const clientTileContent = {
    accountholder: 'Account holder',
    viewMessages: 'View messages',
    viewAgreements: 'View agreements',
    agreements: 'Agreements',
    viewTimesheets: 'View support hours',
    supportHours: 'Support hours',
    logAs: 'Login as ',
    logInAs: ' Log in as',
  };

  const inboxContent = {
    searchAndMessageNew: 'search and message new workers',
  };

  const activeAgreementClientName = 'Baker Darcy';
  const conversationsClientName = 'Burgundy Rickey';
  const emptyStateClientName = 'Delia Jessye';
  const viewSupportClientName = 'Alaya Pearlie';
  const burgundyID = '19544';
  const agreementID = '9304';
  const agreementRateID = '31640';
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it(`1. ES-T1422. View client pending Support hours for approval as a Coordinator
      2. ES-T3386. Approve pending support hours as a Coordinator`, () => {
    const day = moment(new Date()).subtract(1, 'day').format('DD MMM YYYY');

    let startTime = Math.floor(Math.random() * (13 - 23 + 1) + 13);
    let endTime = 0;
    if (startTime <= 11) {
      endTime = startTime + 1;
    } else {
      startTime -= 1;
    }
    startTime = `0${startTime}`.slice(-2);
    endTime = `0${endTime}`.slice(-2);

    cy.log(`Create a support hour: ${startTime} - ${endTime}`)
      .createTimesheetAsWorkerByAPI(
        workerEmail,
        defaultPassword,
        agreementID,
        agreementRateID,
        startTime,
        endTime,
        day,
      )
      .then((res) => {
        cy.loginAPI(
          coordinatorAccounts.wilfStone.email,
          coordinatorAccounts.wilfStone.password,
        )
          .log('Login')
          .visit('/')
          .loginToDashboard(
            coordinatorAccounts.wilfStone.email,
            coordinatorAccounts.wilfStone.password,
          )

          .log('Check search')
          .verifyElementVisible(data.coordinator.searchBtn)
          .verifyElementVisible(data.coordinator.searchInput)

          .log(`Search ${conversationsClientName}`)
          .inputTextField(
            '[formcontrolname="searchString"]',
            conversationsClientName,
          )
          .clickElementOnText('button span', 'Search');

        if (res.body.data.createTimesheet !== null) {
          cy.log(`Click on ${clientTileContent.supportHours}`)
            .clickElementOnText(
              'app-coordinator-client-details button',
              'Support hours',
            )

            .log('Approve timesheet')
            .verifyElementVisible('app-approve-session-tab')
            .get('app-approve-session-tab')
            .find('div.incidentWithName>span')
            .contains(workerName)
            .parents('tr')
            .find('button>span')
            .contains('Approve')
            .click()

            .verifyTextVisible('Support hours approved successfully');
        } else {
          cy.log(
            `Click on ${clientTileContent.supportHours}`,
          ).clickElementOnText(
            'app-coordinator-client-details button',
            'support hours',
          );
        }
        cy.clickElementOnText('button', clientTileContent.logInAs)
          .verifyElementVisible('app-consumer-timesheet')

          .log('Check the approve timesheet')
          .get('#approveRejectTable')
          .find('tr')
          .eq(1)
          .invoke('text')
          .then(($txt) => {
            expect($txt).to.contain(workerName, 'Approved');
          })

          .clickElementOnText('button', 'Login as Coordinator')

          .log('Check search')
          .verifyElementVisible(data.coordinator.searchBtn)
          .verifyElementVisible(data.coordinator.searchInput)

          .log(`Search ${conversationsClientName}`)
          .inputTextField(
            '[formcontrolname="searchString"]',
            conversationsClientName,
          )
          .clickElementOnText('button span', 'Search')

          .log(`Click on ${clientTileContent.supportHours}`)
          .clickElementOnText('app-coordinator-client-details button', 'hours')

          .log('Check approve timesheet')
          .get('#approveRejectTable')
          .find('tr')
          .eq(1)
          .invoke('text')
          .then(($txt) => {
            expect($txt).to.contain(workerName, 'Approved');
          });
      });
  });

  it('ES-T3385. View client support hours - support hours empty state as a Coordinator', () => {
    const trackPayment = 'You can visit your billing page to keep track of your payments.';
    cy.log('Login')
      .visit('/')
      .log(`Login ${coordinatorAccounts.wilfStone.email}`)

      .loginToDashboard(
        coordinatorAccounts.wilfStone.email,
        coordinatorAccounts.wilfStone.password,
      )

      .log('Check search')
      .verifyElementVisible(data.coordinator.searchBtn)
      .verifyElementVisible(data.coordinator.searchInput)

      .log(`search ${emptyStateClientName}`)
      .inputTextField('[formcontrolname="searchString"]', emptyStateClientName)
      .clickElementOnText('button span', 'Search')

      .log(`click on ${clientTileContent.viewTimesheets}`)
      .clickElementOnText('app-coordinator-client-details button', clientTileContent.viewTimesheets)

      .verifyTextVisible(trackPayment)
      .verifyElementNotExist('#approveRejectTable')

      .clickElementOnText('button', trackPayment)
      .verifyElementVisible('.mat-dialog-actions')
      .clickElementOnText('.mat-dialog-actions button', 'Log in as')
      .verifyTextVisible(trackPayment)

      .clickElementOnText('button', 'Login as Coordinator')

      .log('Check search')
      .verifyElementVisible(data.coordinator.searchBtn)
      .verifyElementVisible(data.coordinator.searchInput);
  });

  it('ES-T1484. View client support hours - with support hours as a Coordinator', () => {
    cy.log('Login')
      .visit('/')
      .log(`Login ${coordinatorAccounts.wilfStone.email}`)

      .loginToDashboard(
        coordinatorAccounts.wilfStone.email,
        coordinatorAccounts.wilfStone.password,
      )

      .log('Check search')
      .verifyElementVisible(data.coordinator.searchBtn)
      .verifyElementVisible(data.coordinator.searchInput)

      .log(`search ${viewSupportClientName}`)
      .inputTextField('[formcontrolname="searchString"]', viewSupportClientName)
      .clickElementOnText('button span', 'Search')

      .log(`click on ${clientTileContent.viewTimesheets}`)
      .clickElementOnText('app-coordinator-client-details button', clientTileContent.viewTimesheets)

      .log('Click Detail link')
      .clickElementOnText('#approveRejectTable tr td button', 'Details')

      .log('Verify Delivery Record popup')
      .verifyTextVisible('Support hours record')

      .log('Click Close btn')
      .clickElementOnText('mat-dialog-actions button', 'Close')

      .log('Click Detail link')
      .clickElementOnText('#approveRejectTable tr td button', 'Details')

      .log('Click icon btn')
      .clickElement('#timesheetDetail button.close')

      .clickElementOnText('button', clientTileContent.logInAs)
      .verifyElementVisible('app-consumer-timesheet')

      .clickElementOnText('button', 'Login as Coordinator')

      .log('Check search')
      .verifyElementVisible(data.coordinator.searchBtn)
      .verifyElementVisible(data.coordinator.searchInput);
  });

  it('ES-T3387. Reject support hours as a Coordinator', () => {
    const day = moment(new Date()).subtract('day').format('DD MM YYYY');

    let startTime = Math.floor(Math.random() * 5 + 1);
    let endTime = startTime + 1;

    startTime = (`0${startTime}`).slice(-2);
    endTime = (`0${endTime}`).slice(-2);

    cy.log(`Create a support hour: ${startTime} - ${endTime}`)
      .createTimesheetAsWorkerByAPI(
        workerEmail,
        defaultPassword,
        agreementID,
        agreementRateID,
        '05',
        '06',
      )
      .loginAPI(
        coordinatorAccounts.wilfStone.email,
        coordinatorAccounts.wilfStone.password,
      )
      .log('Login')
      .visit('/')
      .loginToDashboard(
        coordinatorAccounts.wilfStone.email,
        coordinatorAccounts.wilfStone.password,
      )

      .log('Check search')
      .verifyElementVisible(data.coordinator.searchBtn)
      .verifyElementVisible(data.coordinator.searchInput)

      .log(`Search ${conversationsClientName}`)
      .inputTextField(
        '[formcontrolname="searchString"]',
        conversationsClientName,
      )
      .clickElementOnText('button span', 'Search')

      .log(`Click on ${clientTileContent.supportHours}`)
      .clickElementOnText(
        'app-coordinator-client-details button',
        'Support hours',
      )

      .log('Reject timesheet')
      .verifyElementVisible('app-approve-session-tab')
      .get('app-approve-session-tab')
      .find('div.incidentWithName>span')
      .contains(workerName)
      .parents('tr')
      .find('button>span')
      .contains('Reject')
      .click()

      .clickElementOnText('.mat-dialog-actions button', 'Reject')

      .verifyTextVisible('Rejected')

      .log('Verify the reject timesheet')
      .get('#approveRejectTable')
      .find('tr')
      .eq(1)
      .invoke('text')
      .then(($txt) => {
        expect($txt).to.contain(workerName, 'Rejected');
      })

      .clickElementOnText('button', clientTileContent.logInAs)
      .verifyElementVisible('app-consumer-timesheet')

      .log('Verify Reject timesheet')
      .get('#approveRejectTable')
      .find('tr')
      .eq(1)
      .invoke('text')
      .then(($txt) => {
        expect($txt).to.contain(workerName, 'Rejected');
      });
  });

  it('ES-T3452. Approved/Rejected Sessions Pagination, Coordinator', () => {
    cy.log('Login')
      .visit('/')
      .log(`Login ${coordinatorAccounts.wilfStone.email}`)

      .loginToDashboard(
        coordinatorAccounts.wilfStone.email,
        coordinatorAccounts.wilfStone.password,
      )

      .log('Check search')
      .verifyElementVisible(data.coordinator.searchBtn)
      .verifyElementVisible(data.coordinator.searchInput)

      .log(`search ${viewSupportClientName}`)
      .inputTextField('[formcontrolname="searchString"]', viewSupportClientName)
      .clickElementOnText('button span', 'Search')

      .log(`click on ${clientTileContent.viewTimesheets}`)
      .clickElementOnText('app-coordinator-client-details button', clientTileContent.viewTimesheets)

      .get('#approveRejectTable tr.ng-star-inserted')
      .its('length')
      .should('be.equal', 20)

      .clickElement('button[aria-label="Next page"]')
      .verifyTextVisible('Page 2 of')

      .clickElement('button[aria-label="Previous page"]')
      .verifyTextVisible('Page 1 of')

      .clickElement('button[aria-label="Last page"]')
      .verifyElementVisible('button[aria-label="Previous page"]')
      .verifyElementNotVisible('button[aria-label="Next page"]')

      .clickElement('button[aria-label="First page"]')
      .verifyTextVisible('Page 1 of');
  });
});
