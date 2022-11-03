/* eslint-disable no-unused-vars */
import * as data from '../../../fixtures/test-data.json';

describe('CoordinatorDashboard - Messages', () => {
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
    logAs: 'Login as ',
    logInAs: ' Log in as',
  };

  const inboxContent = {
    searchAndMessageNew: 'search and message new workers',
  };

  const activeAgreementClientName = 'Baker Darcy';
  const conversationsClientName = 'Burgundy Rickey';
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('ES-T3382.View client inbox - no conversations as a Coordinator', () => {
    cy.log('Login')
      .visit('/')
      .log(`Login ${coordinatorAccounts.wilfStone.email}`)

      .loginToDashboard(
        coordinatorAccounts.wilfStone.email,
        coordinatorAccounts.wilfStone.password,
      )

      .log('click first "View Message" of a client')
      .clickElementOnText('app-coordinator-client-details button', clientTileContent.viewMessages)

      .log('check Inbox')
      .get('[routerlink="inbox"]')
      .contains('Inbox')
      .should('be.visible')

      .verifyTextVisible('No messages yet')

      .clickElementOnText('app-coordinator-quick-reply button', clientTileContent.logInAs)

      .verifyElementVisible('app-members-area');
  });

  it('ES-T1485. View client inbox - with conversations as a Coordinator', () => {
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

      .log(`search ${conversationsClientName}`)
      .inputTextField('[formcontrolname="searchString"]', conversationsClientName)
      .clickElementOnText('button span', 'Search')

      .log(`click on ${clientTileContent.viewMessages}`)
      .clickElementOnText('app-coordinator-client-details button', clientTileContent.viewMessages)

      .log('check Message')
      .get('[routerlink="inbox"]')
      .contains('Inbox')
      .should('be.visible')

      .verifyTextVisible(inboxContent.searchAndMessageNew)

      .clickElementOnText('button', inboxContent.searchAndMessageNew)

      .verifyElementVisible('#workerSearchTriageContainer')

      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Check search')
      .verifyElementVisible(data.coordinator.searchBtn)
      .verifyElementVisible(data.coordinator.searchInput)

      .log(`search ${conversationsClientName}`)
      .inputTextField('[formcontrolname="searchString"]', conversationsClientName)
      .clickElementOnText('button span', 'Search')

      .log(`click on ${clientTileContent.viewMessages}`)
      .clickElementOnText('app-coordinator-client-details button', clientTileContent.viewMessages)

      .verifyElementVisible('[routerlink="inbox"]')
      .verifyTextVisible(inboxContent.searchAndMessageNew)

      .moveToUntilFoundName(workerName)
      .log(`Select conversation with ${workerName}`)
      .clickElementOnText(data.agreement.client.inboxName, workerName)

      .clickElementOnText('button', clientTileContent.logInAs)

      .verifyElementVisible('app-members-area')
      .verifyTextVisible(inboxContent.searchAndMessageNew);
  });

  it('ES-T3449. View profile as a Coordinator, Conversation screen', () => {
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

      .log(`search ${conversationsClientName}`)
      .inputTextField('[formcontrolname="searchString"]', conversationsClientName)
      .clickElementOnText('button span', 'Search')

      .log(`click on ${clientTileContent.viewMessages}`)
      .clickElementOnText('app-coordinator-client-details button', clientTileContent.viewMessages)

      .log('check Message')

      .verifyElementVisible('[routerlink="inbox"]')
      .verifyTextVisible(inboxContent.searchAndMessageNew)

      .moveToUntilFoundName(workerName)
      .log(`Select conversation with ${workerName}`)
      .clickElementOnText(data.agreement.client.inboxName, workerName)
      .wait(2000)

      // .clickElement('[name="info-line"]')
      .verifyElementVisible('app-chat-info')
      .clickElementOnText('button>span', 'View profile')
      .verifyElementVisible('app-carer-profile')
      .clickElementOnText('app-carer-profile button', 'Back')
      .verifyElementVisible('app-chat-wrapper');
  });

  it('ES-T3383. View conversation screen as a Coordinator', () => {
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

      .log(`search ${conversationsClientName}`)
      .inputTextField('[formcontrolname="searchString"]', conversationsClientName)
      .clickElementOnText('button span', 'Search')

      .log(`click on ${clientTileContent.viewMessages}`)
      .clickElementOnText('app-coordinator-client-details button', clientTileContent.viewMessages)

      .log('check Message')

      .verifyElementVisible('[routerlink="inbox"]')
      .verifyTextVisible(inboxContent.searchAndMessageNew)

      .moveToUntilFoundName(workerName)
      .log(`Select conversation with ${workerName}`)
      .clickElementOnText(data.agreement.client.inboxName, workerName)

      .clickElementOnText('button', clientTileContent.logInAs)

      .verifyElementVisible('app-members-area')
      .verifyTextVisible(inboxContent.searchAndMessageNew)

      .moveToUntilFoundName(workerName)
      .log(`Select conversation with ${workerName}`)
      .clickElementOnText(data.agreement.client.inboxName, workerName)

      .clickElementOnText('button', 'Login as Coordinator')

      .log('Check search')
      .verifyElementVisible(data.coordinator.searchBtn)
      .verifyElementVisible(data.coordinator.searchInput);
  });

  it('ES-T3384. Send message to a client\'s worker as a Coordinator', () => {
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

      .log(`search ${conversationsClientName}`)
      .inputTextField('[formcontrolname="searchString"]', conversationsClientName)
      .clickElementOnText('button span', 'Search')

      .log(`click on ${clientTileContent.viewMessages}`)
      .clickElementOnText('app-coordinator-client-details button', clientTileContent.viewMessages)

      .log('check Message')

      .verifyElementVisible('[routerlink="inbox"]')
      .verifyTextVisible(inboxContent.searchAndMessageNew)

      .moveToUntilFoundName(workerName)
      .log(`Select conversation with ${workerName}`)
      .clickElementOnText(data.agreement.client.inboxName, workerName)

      .log('Input on message')
      .inputTextField(data.message.messageInput, ' Automation testing..')

      .log('Click send message')
      .clickElement(data.message.sendMessage, true)
      .wait(1000)

      .log('Verify new message should be send')
      .verifyElementContainsText(
        '.msgBody',
        'Automation testing..',
      );
  });
});
