/* eslint-disable no-unused-vars */
import * as data from '../../../fixtures/test-data.json';

describe('CoordinatorDashboard - Agreements', () => {
  const { baseUrl } = Cypress.config('baseUrl');
  const workerEmail =
    'automation_kerry.washington.timesheet+worker@donotuse.com.au';
  const defaultPassword = 'qaAutomation2021';
  const workerName = 'Kerry';
  const workerID = '19858';
  const danielName = 'Daniel';
  const coordinatorAccounts = {
    emptyState: {
      email:
        'automation_tom.hanks.emptystatedashboard+coordinator@donotuse.com.au',
      password: 'qaAutomation2021',
    },
    wilfStone: {
      email: 'automation_wilf.stone.20+clients+coordinator@donotuse.com.au',
      password: 'qaAutomation2021',
    },
    sigmud: {
      email:
        'automation_sigmund.chas.notlinkedtoanorg+coordinator@donotuse.com.au',
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
      content1:
        'Access messages, support hours and agreements or log in as your client for all options and features. If you have any questions, please email us at ',
      content2: 'coordinator@mable.com.au',
      content3: ' or call us on 1300 73 65 73 and select option 4.',
    },
    sigmud: {
      welcome: 'Welcome, ',
      name: 'Sigmund Chas',
      content1:
        'Access messages, support hours and agreements or log in as your client for all options and features. If you have any questions, please email us at ',
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

  const activeAgreementClientName = 'Baker Darcy';
  const pendingAgreementClientName = 'Cathleen Sibyl';
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('ES-T3409.View client agreements - with active agreements as a Coordinator', () => {
    cy.log('Login')

      .log(`Login ${coordinatorAccounts.wilfStone.email}`)

      .loginAPI(
        coordinatorAccounts.wilfStone.email,
        coordinatorAccounts.wilfStone.password,
      )
      .visit('/dashboard')

      .log('Check search')
      .verifyElementVisible(data.coordinator.searchBtn)
      .verifyElementVisible(data.coordinator.searchInput)

      .log(`search ${activeAgreementClientName}`)
      .inputTextField(
        '[formcontrolname="searchString"]',
        activeAgreementClientName,
      )
      .clickElementOnText('button span', 'Search')
      .verifyTextVisible('match your search')
      .verifyElementVisible('app-coordinator-client-details')

      .log(`click on ${clientTileContent.viewAgreements}`)
      .clickElement('app-coordinator-client-details button', false, 1)

      .log('check agreement')
      .get('[routerlink="agreements"]')
      .contains('Agreements')
      .should('be.visible')

      .verifyElementHaveLengthAleast('.panel.agreementDetail', 1)

      .clickElementOnText('button', clientTileContent.logInAs)

      .verifyElementVisible('app-members-area');
  });

  it(`1. ES-T3422.Accept pending agreement as a Coordinator
  2. ES-T3530.Terminate Agreement as a Coordinator`, () => {
    cy.log(
      `Precondition create an agreemnt with ${coordinatorAccounts.baker.name}`,
    );
    cy.removeAgreementIfExist(
      coordinatorAccounts.baker.email,
      coordinatorAccounts.baker.password,
      workerID,
    ).sendAgreementAsWorker(
      workerEmail,
      defaultPassword,
      coordinatorAccounts.baker.id,
    );
    cy.clearCookies()
      .clearLocalStorage()
      .visit('')
      .loginToDashboard(
        coordinatorAccounts.wilfStone.email,
        coordinatorAccounts.wilfStone.password,
      )

      .log('Check search')
      .verifyElementVisible(data.coordinator.searchBtn)
      .verifyElementVisible(data.coordinator.searchInput)

      .log(`search ${activeAgreementClientName}`)
      .inputTextField(
        '[formcontrolname="searchString"]',
        activeAgreementClientName,
      )
      .clickElementOnText('button span', 'Search')
      .verifyTextVisible('match your search')
      .verifyElementVisible('app-coordinator-client-details')

      .log(`click on ${clientTileContent.agreements}`)
      .verifyCounterAgreementInCoordinator('Pending')

      .clickAgreementThenCheckDetail(workerName)
      .waitAppLoaderNotVisible()
      .verifyElementVisible('app-coordinator-view-agreement')
      .verifyElementVisible('div#supportWorker')
      .verifyElementVisible('div.agreementsActions')
      .verifyElementContainsText('button>span', 'Decline')
      .verifyElementContainsText('button>span', 'Accept agreement')

      .clickElementOnText('button>span', 'Accept agreement')
      .verifyTextVisible('Offer accepted')
      .waitAppLoaderNotVisible()

      .reload()
      .clickAgreementThenCheckDetail(workerName)
      .verifyTextVisible(`You have accepted the agreement with ${workerName}`)

      .navigateByLeftMenuInDashboard('Dashboard')
      .log('Check search')
      .verifyElementVisible(data.coordinator.searchBtn)
      .verifyElementVisible(data.coordinator.searchInput)

      .log(`search ${activeAgreementClientName}`)
      .inputTextField(
        '[formcontrolname="searchString"]',
        activeAgreementClientName,
      )
      .clickElementOnText('button span', 'Search')
      .verifyTextVisible('match your search')
      .waitAppLoaderNotVisible()

      .verifyNumberCounterAgreement(0)

      .clickFirstAgreementOfClientByStatus('Accepted')

      .get('#manageAgreement')
      .trigger('mouseover')
      .clickElement('button.collapseIcon')
      .verifyTextVisible('Terminate agreement')
      .verifyElementContainsText('#supportWorker', 'Support worker')
      .verifyElementContainsText('#accountHolder', 'Account holder')

      .clickElementOnText('button>span', 'Terminate agreement')
      .verifyTextVisible(
        'The action is not available in this view. Login as your client to continue with your action.',
      )
      .clickElementOnText('.mat-dialog-actions button', 'Log in as')

      .selectAgreementWithWorkerName(workerName)

      .get('#manageAgreement')
      .trigger('mouseover')
      .clickElement('button.collapseIcon')
      .verifyTextVisible('Terminate agreement')
      .verifyElementContainsText('#supportWorker', 'Support worker')
      .verifyElementContainsText('#accountHolder', 'Account holder')

      .clickElementOnText('button>span', 'Terminate agreement')
      .verifyTextVisible('Why are you terminating this agreement with')
      .get('.terminationReasons .radioBtn')
      .first()
      .click()

      .clickElementOnText('button>span', 'Terminate agreement')
      .verifyTextVisible('You have terminated your agreement with')
      .clickElementOnText('.mat-dialog-actions button', 'Cancel')
      .verifyTextVisible('has been terminated.');
  });

  it('ES-T3393.View client with pending agreements as a Coordinator', () => {
    cy.log('Login')

      .log(`Login ${coordinatorAccounts.wilfStone.email}`)

      .loginAPI(
        coordinatorAccounts.wilfStone.email,
        coordinatorAccounts.wilfStone.password,
      )
      .visit('/dashboard')

      .log('Check search')
      .verifyElementVisible(data.coordinator.searchBtn)
      .verifyElementVisible(data.coordinator.searchInput)

      .log(`search ${pendingAgreementClientName}`)
      .inputTextField(
        '[formcontrolname="searchString"]',
        pendingAgreementClientName,
      )
      .clickElementOnText('button span', 'Search')
      .verifyTextVisible('match your search')
      .verifyElementVisible('app-coordinator-client-details')

      .log(`click on ${clientTileContent.agreements}`)
      .verifyCounterAgreementInCoordinator('Pending')

      .clickAgreementThenCheckDetail()
      .waitAppLoaderNotVisible()
      .verifyElementVisible('div.agreementsActions')
      .verifyElementVisible('app-coordinator-view-agreement')

      .verifyElementVisible('div.agreementsActions')
      .verifyElementContainsText('button>span', 'Decline')
      .verifyElementContainsText('button>span', 'Accept agreement');
  });

  it('ES-T3423.Decline pending agreement as a Coordinator', () => {
    cy.log(
      `Precondition create an agreemnt with ${coordinatorAccounts.baker.name}`,
    );
    cy.removeAgreementIfExist(
      coordinatorAccounts.baker.email,
      coordinatorAccounts.baker.password,
      workerID,
    )
      .sendAgreementAsWorker(
        workerEmail,
        defaultPassword,
        coordinatorAccounts.baker.id,
      )
      .loginAPI(
        coordinatorAccounts.wilfStone.email,
        coordinatorAccounts.wilfStone.password,
      )

      .log(`Login ${coordinatorAccounts.wilfStone.email}`)

      .loginAPI(
        coordinatorAccounts.wilfStone.email,
        coordinatorAccounts.wilfStone.password,
      )
      .visit('/dashboard')

      .log('Check search')
      .verifyElementVisible(data.coordinator.searchBtn)
      .verifyElementVisible(data.coordinator.searchInput)

      .log(`search ${activeAgreementClientName}`)
      .inputTextField(
        '[formcontrolname="searchString"]',
        activeAgreementClientName,
      )
      .clickElementOnText('button span', 'Search')
      .verifyTextVisible('match your search')
      .verifyElementVisible('app-coordinator-client-details')

      .verifyElementVisible('app-coordinator-client-details')

      .log(`click on ${clientTileContent.agreements}`)
      .verifyCounterAgreementInCoordinator('Pending')

      .clickAgreementThenCheckDetail(workerName)
      .waitAppLoaderNotVisible()
      .verifyElementVisible('app-coordinator-view-agreement')

      .verifyElementVisible('div.agreementsActions')
      .verifyElementContainsText('button>span', 'Decline')
      .verifyElementContainsText('button>span', 'Accept agreement')

      .clickElementOnText('button>span', 'Decline')
      .verifyTextVisible('Offer declined')

      .reload()
      .verifyTextNotExist(workerName);
  });

  it('ES-T3435.View Agreement details as a Coordinator, Pending Agreement', () => {
    cy.log('Login')

      .log(`Login ${coordinatorAccounts.wilfStone.email}`)

      .loginAPI(
        coordinatorAccounts.wilfStone.email,
        coordinatorAccounts.wilfStone.password,
      )
      .visit('/dashboard')

      .log('Check search')
      .verifyElementVisible(data.coordinator.searchBtn)
      .verifyElementVisible(data.coordinator.searchInput)

      .log(`search ${pendingAgreementClientName}`)
      .inputTextField(
        '[formcontrolname="searchString"]',
        pendingAgreementClientName,
      )
      .clickElementOnText('button span', 'Search')
      .verifyTextVisible('match your search')
      .verifyElementVisible('app-coordinator-client-details')

      .verifyElementVisible('app-coordinator-client-details')

      .log(`click on ${clientTileContent.agreements}`)
      .verifyCounterAgreementInCoordinator('Pending')

      .clickAgreementThenCheckDetail()
      .wait(2000)
      .verifyElementVisible('div.agreementsActions')
      .verifyElementContainsText('button>span', 'Decline')
      .verifyElementContainsText('button>span', 'Accept agreement')

      .verifyElementContainsText('#supportWorker', 'Support worker')
      .verifyElementContainsText('#accountHolder', 'Account holder')

      .clickElementOnText('.link', 'How was this calculated?')
      .verifyElementContainsText(
        '.mat-dialog-title',
        'How is my fee calculated?',
      )
      .verifyElementContainsText('h3', 'How do Mable’s fees work?')
      .verifyElementContainsText('mat-dialog-actions button', 'Learn more')
      .verifyElementContainsText('mat-dialog-actions button', 'OK, got it')

      .clickElementOnText('mat-dialog-actions button', 'OK, got it')
      .verifyElementNotExist('mat-dialog-actions')
      .clickElementOnText('#supportWorker', 'View profile')
      .verifyElementVisible('app-carer-profile')
      .clickElementOnText('app-carer-profile button', 'Back')
      .verifyElementVisible('app-coordinator-view-agreement')
      .verifyElementVisible('[href="https://mable.com.au/safeguards/"]');
  });

  it('ES-T3446.View Agreement details as a Coordinator, Active Agreement', () => {
    cy.log('Login')

      .log(`Login ${coordinatorAccounts.wilfStone.email}`)

      .loginAPI(
        coordinatorAccounts.wilfStone.email,
        coordinatorAccounts.wilfStone.password,
      )
      .visit('/dashboard')

      .log('Check search')
      .verifyElementVisible(data.coordinator.searchBtn)
      .verifyElementVisible(data.coordinator.searchInput)

      .log(`search ${activeAgreementClientName}`)
      .inputTextField(
        '[formcontrolname="searchString"]',
        activeAgreementClientName,
      )
      .clickElementOnText('button span', 'Search')
      .verifyTextVisible('match your search')
      .verifyElementVisible('app-coordinator-client-details')

      .clickFirstAgreementOfClientByStatus('Accepted')

      .get('#manageAgreement')
      .trigger('mouseover')
      .clickElement('button.collapseIcon')
      .verifyTextVisible('Terminate agreement')
      .verifyElementContainsText('#supportWorker', 'Support worker')
      .verifyElementContainsText('#accountHolder', 'Account holder');
  });

  it('ES-T3526. Decline amended agreement as a Coordinator', () => {
    cy.log(
      `Precondition create an agreemnt with ${coordinatorAccounts.baker.name}`,
    );
    cy.removeAgreementIfExist(
      coordinatorAccounts.baker.email,
      coordinatorAccounts.baker.password,
      workerID,
    )
      .sendAgreementAsWorker(
        workerEmail,
        defaultPassword,
        coordinatorAccounts.baker.id,
      )
      .then(($res) => {
        const agreemntID = $res.body.data.id;
        cy.acceptAgreementAsClient(
          coordinatorAccounts.baker.email,
          coordinatorAccounts.baker.password,
          agreemntID,
        );
        cy.amendAgreementGraphqlAPI(
          workerEmail,
          defaultPassword,
          coordinatorAccounts.id,
          agreemntID,
        );
      })
      .loginAPI(
        coordinatorAccounts.wilfStone.email,
        coordinatorAccounts.wilfStone.password,
      )

      .log(`Login ${coordinatorAccounts.wilfStone.email}`)

      .loginAPI(
        coordinatorAccounts.wilfStone.email,
        coordinatorAccounts.wilfStone.password,
      )
      .visit('/dashboard')

      .log('Check search')
      .verifyElementVisible(data.coordinator.searchBtn)
      .verifyElementVisible(data.coordinator.searchInput)

      .log(`search ${activeAgreementClientName}`)
      .inputTextField(
        '[formcontrolname="searchString"]',
        activeAgreementClientName,
      )
      .clickElementOnText('button span', 'Search')
      .verifyTextVisible('match your search')
      .verifyElementVisible('app-coordinator-client-details')

      .verifyElementVisible('app-coordinator-client-details')

      .log(`click on ${clientTileContent.agreements}`)
      .verifyCounterAgreementInCoordinator('Changes Pending')

      .clickAgreementThenCheckDetail(workerName)
      .get('.agreementsActions')
      .trigger('mouseover')
      .verifyElementVisible('div.agreementsActions')
      .verifyElementContainsText('button>span', 'Decline')
      .verifyElementContainsText('button', 'Accept amendment')

      .clickElementOnText('button>span', 'Decline')
      .verifyTextVisible('Amendments declined')

      .wait(2000)
      .reload()
      .verifyTextVisible(workerName);
  });

  it(`1. ES-T3524. View client amended agreements as a Coordinator
  2. ES-T3527. View Agreement details as a Coordinator, Amended Agreement
  3. ES-T3525. Accept amended agreement as a Coordinator`, () => {
    cy.log(
      `Precondition create an agreemnt with ${coordinatorAccounts.baker.name}`,
    );
    cy.removeAgreementIfExist(
      coordinatorAccounts.baker.email,
      coordinatorAccounts.baker.password,
      workerID,
    )
      .sendAgreementAsWorker(
        workerEmail,
        defaultPassword,
        coordinatorAccounts.baker.id,
      )
      .then(($res) => {
        const agreemntID = $res.body.data.id;
        cy.acceptAgreementAsClient(
          coordinatorAccounts.baker.email,
          coordinatorAccounts.baker.password,
          agreemntID,
        );
        cy.amendAgreementGraphqlAPI(
          workerEmail,
          defaultPassword,
          coordinatorAccounts.id,
          agreemntID,
        );
      })
      .loginAPI(
        coordinatorAccounts.wilfStone.email,
        coordinatorAccounts.wilfStone.password,
      )

      .log(`Login ${coordinatorAccounts.wilfStone.email}`)

      .loginAPI(
        coordinatorAccounts.wilfStone.email,
        coordinatorAccounts.wilfStone.password,
      )
      .visit('/dashboard')

      .log('Check search')
      .verifyElementVisible(data.coordinator.searchBtn)
      .verifyElementVisible(data.coordinator.searchInput)

      .log(`search ${activeAgreementClientName}`)
      .inputTextField(
        '[formcontrolname="searchString"]',
        activeAgreementClientName,
      )
      .clickElementOnText('button span', 'Search')
      .verifyTextVisible('match your search')
      .verifyElementVisible('app-coordinator-client-details')

      .verifyElementVisible('app-coordinator-client-details')

      .log(`click on ${clientTileContent.agreements}`)
      .verifyCounterAgreementInCoordinator('Changes Pending')

      .clickAgreementThenCheckDetail(workerName)
      .get('.agreementsActions')
      .trigger('mouseover')
      .verifyElementVisible('div.agreementsActions')
      .verifyElementContainsText('button>span', 'Decline')
      .verifyElementContainsText('button', 'Accept amendment')

      .clickElementOnText('button', 'Accept amendment')
      .verifyTextVisible('Amendments accepted')

      .reload()
      .clickAgreementThenCheckDetail(workerName)
      .verifyTextVisible(`You have accepted the agreement with ${workerName}`)

      .navigateByLeftMenuInDashboard('Dashboard')
      .log('Check search')
      .verifyElementVisible(data.coordinator.searchBtn)
      .verifyElementVisible(data.coordinator.searchInput)

      .log(`search ${activeAgreementClientName}`)
      .inputTextField(
        '[formcontrolname="searchString"]',
        activeAgreementClientName,
      )
      .clickElementOnText('button span', 'Search')
      .verifyTextVisible('match your search')
      .verifyElementVisible('app-coordinator-client-details')

      .verifyElementVisible('app-coordinator-client-details')

      .verifyNumberCounterAgreement(0);
  });

  it('ES-T3528. View worker profile as a Coordinator, Agreement card', () => {
    // #Bug: https://bettercaring.atlassian.net/browse/ES-8016
    cy.log('Login')

      .log(`Login ${coordinatorAccounts.wilfStone.email}`)

      .loginAPI(
        coordinatorAccounts.wilfStone.email,
        coordinatorAccounts.wilfStone.password,
      )
      .visit('/dashboard')

      .log('Check search')
      .verifyElementVisible(data.coordinator.searchBtn)
      .verifyElementVisible(data.coordinator.searchInput)

      .log(`search ${pendingAgreementClientName}`)
      .inputTextField(
        '[formcontrolname="searchString"]',
        pendingAgreementClientName,
      )
      .clickElementOnText('button span', 'Search')
      .verifyTextVisible('match your search')
      .verifyElementVisible('app-coordinator-client-details')

      .verifyElementVisible('app-coordinator-client-details')

      .log(`click on ${clientTileContent.agreements}`)
      .verifyCounterAgreementInCoordinator('Pending')
      .clickElementOnText('button', 'View profile')
      .verifyElementVisible('app-carer-profile')
      .clickElementOnText('app-carer-profile button', 'Back')
      .verifyElementVisible('app-coordinator-agreements');
  });

  it('ES-T3529. Send message as a Coordinator, Agreement card', () => {
    cy.log('Login')

      .log(`Login ${coordinatorAccounts.wilfStone.email}`)

      .loginAPI(
        coordinatorAccounts.wilfStone.email,
        coordinatorAccounts.wilfStone.password,
      )
      .visit('/dashboard')

      .log('Check search')
      .verifyElementVisible(data.coordinator.searchBtn)
      .verifyElementVisible(data.coordinator.searchInput)

      .log(`search ${activeAgreementClientName}`)
      .inputTextField(
        '[formcontrolname="searchString"]',
        activeAgreementClientName,
      )
      .clickElementOnText('button span', 'Search')
      .verifyTextVisible('match your search')
      .verifyElementVisible('app-coordinator-client-details')

      .log(`click on ${clientTileContent.viewAgreements}`)
      .clickElement('app-coordinator-client-details button', false, 1)

      .sendMessageFromAgreementCard(danielName, 'Automation testing')

      .go('back')

      .verifyElementVisible('app-coordinator-agreements');
  });

  it('ES-T3531.Message worker as a Coordinator, Agreement details', () => {
    cy.log('Login')

      .log(`Login ${coordinatorAccounts.wilfStone.email}`)

      .loginAPI(
        coordinatorAccounts.wilfStone.email,
        coordinatorAccounts.wilfStone.password,
      )
      .visit('/dashboard')

      .log('Check search')
      .verifyElementVisible(data.coordinator.searchBtn)
      .verifyElementVisible(data.coordinator.searchInput)

      .log(`search ${activeAgreementClientName}`)
      .inputTextField(
        '[formcontrolname="searchString"]',
        activeAgreementClientName,
      )
      .clickElementOnText('button span', 'Search')
      .verifyTextVisible('match your search')
      .verifyElementVisible('app-coordinator-client-details')

      .clickFirstAgreementOfClientByStatus('Accepted')

      .get('#manageAgreement')
      .trigger('mouseover')
      .clickElement('button.collapseIcon')
      .verifyTextVisible('Terminate agreement')
      .verifyElementContainsText('#supportWorker', 'Support worker')
      .verifyElementContainsText('#accountHolder', 'Account holder')

      .clickElementOnText('button>span', 'Message')

      .log('Input on message')
      .inputTextField(data.message.messageInput, ' Automation testing..')

      .log('Click send message')
      .clickElement(data.message.sendMessage, true)
      .wait(1000)

      .log('Verify new message should be send')
      .verifyElementContainsText('.msgBody', 'Automation testing..');
  });
});
