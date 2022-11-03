/* eslint-disable no-unused-vars */
import * as data from '../../../fixtures/test-data.json';

describe('Coodinator View dashboard', () => {
  const { baseUrl } = Cypress.config('baseUrl');
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
  const purpleBanner = {
    content1: ' Before entering an agreement between your clients and workers, you need to link your account to your organisation. Would you please email us at ',
    content2: 'coordinator@mable.com.au',
    content3: ' or call us on 1300 73 65 73 and select option 4? ',
  };
  const contactUsContent = {
    title: 'Contact us',
    content1: 'We can help you add new clients, write job posts, message and shortlist support workers, post urgent support requests and more.',
    content2: 'If you have any questions, please email us at ',
    content3: 'coordinator@mable.com.au',
    content4: ' or call us on 1300 73 65 73 and select option 4. ',
  };
  const how2StartLink = {
    add: `${baseUrl}2/add-client`,
    search: `${baseUrl}profiles/search`,
    shorstlist: `${baseUrl}2/shortlist/coordinator`,
  };
  const how2StartContent = {
    how2Start: 'How to start:',
    add: ' your client.',
    search: ' worker profiles to find the right fit. ',
    shorstlist: ' workers to review or message later. ',
    manageAndConnect: ' Manage and connect your clients to their support. ',
  };
  const clientTileContent = {
    accountholder: 'Account holder',
    viewMessages: 'View messages',
    viewAgreements: 'View agreements',
    viewTimesheets: 'View support hours',
    logAs: 'Login as ',
  };
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('ES-T1420. View Dashboard Empty State', () => {
    cy.log('Login')
      .visit('/')
      .log(`Login ${coordinatorAccounts.emptyState.email}`)

      .loginToDashboard(
        coordinatorAccounts.emptyState.email,
        coordinatorAccounts.emptyState.password,
      )

      .log('Check Welcome')
      .verifyElementContainsTextObjectList('div', welcomeContent.emptyState)

      .log('Check Contact Us')
      .verifyElementContainsTextObjectList('div', contactUsContent)

      .log('Check How to start')
      .verifyElementContainsTextObjectList('div', how2StartContent)

      .log('Check How to start Link')
      .verifyHrefExistObjList(how2StartLink)

      .log('Check How to start Link')
      .clickElementOnText('button', 'Add client')

      .log('Check How to start Link')
      .verifyTextVisible('Client details')

      .url()
      .should('include', '/add-client')

      .log('Check How to start Link')
      .clickElementOnText('button', 'Cancel')

      .log('Check Welcome')
      .verifyElementContainsTextObjectList('div', welcomeContent.emptyState)

      .url()
      .should('include', '/dashboard/coordinator');
  });

  it('ES-T1421. View Dashboard, 1+ Clients, Coordinator is linked to an Org', () => {
    cy.log('Login')
      .visit('/')
      .log(`Login ${coordinatorAccounts.wilfStone.email}`)

      .loginToDashboard(
        coordinatorAccounts.wilfStone.email,
        coordinatorAccounts.wilfStone.password,
      )

      .log('Check Welcome')
      .verifyElementContainsTextObjectList('div', welcomeContent.wilfStone)

      .log('Check Add client button')
      .verifyElementContainsTextObjectList('button', { item: 'Add client' })

      .log('Check search')
      .verifyElementVisible(data.coordinator.searchBtn)
      .verifyElementVisible(data.coordinator.searchInput)

      .log('check client tile')
      .verifyElementContainsTextObjectList('div', clientTileContent)
      .verifyElementVisible('button[aria-label="expand"]');
  });

  it('ES-T1519. Check Dashboard pagination, Coordinator', () => {
    cy.log('Login')
      .visit('/')
      .log(`Login ${coordinatorAccounts.wilfStone.email}`)

      .loginToDashboard(
        coordinatorAccounts.wilfStone.email,
        coordinatorAccounts.wilfStone.password,
      )

      .log('Check Welcome')
      .verifyElementContainsTextObjectList('div', welcomeContent.wilfStone)

      .log('Check 20 tile on page')
      .hasNumberClientOnPage(20)

      .clickElement('button[aria-label="Next page"]')
      .verifyTextVisible('Page 2 of')

      .clickElement('button[aria-label="Previous page"]')
      .verifyTextVisible('Page 1 of')

      .clickElement('button[aria-label="Last page"]')
      .verifyElementNotVisible('button[aria-label="Last page"]')
      .verifyElementNotVisible('button[aria-label="Next page"]')

      .clickElement('button[aria-label="First page"]')
      .verifyElementNotVisible('button[aria-label="Previous page"]')
      .verifyTextVisible('Page 1 of');
  });

  it('ES-T1487. View Dashboard with 1+ clients, Coordinator is not linked to an Org yet', () => {
    const clientTile = clientTileContent;
    clientTile.accountholder = null;
    cy.log('Login')
      .visit('/')
      .log(`Login ${coordinatorAccounts.sigmud.email}`)

      .loginToDashboard(
        coordinatorAccounts.sigmud.email,
        coordinatorAccounts.sigmud.password,
      )

      .log('Check Welcome')
      .verifyElementContainsTextObjectList('div', welcomeContent.sigmud)

      .log('Check Add client button')
      .verifyElementContainsTextObjectList('button', { item: 'Add client' })

      .log('Check banner')
      .verifyElementContainsTextObjectList('.banner.alt', purpleBanner)

      .log('Check search')
      .verifyElementVisible(data.coordinator.searchBtn)
      .verifyElementVisible(data.coordinator.searchInput)

      .log('check client tile')
      .verifyElementContainsTextObjectList('div', clientTileContent)
      .verifyElementVisible('button[aria-label="expand"]');
  });

  it('ES-T1424. Check client badge visibility', () => {
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

      .verifyElementContainsText('.chip', 'Client Managed')
      .verifyTextVisible('Access messages, support hours and agreements or log in as your client for all options and features. If you have any questions, please email us at coordinator@mable.com.au or call us on 1300 73 65 73 and select option 4.');
  });
});
