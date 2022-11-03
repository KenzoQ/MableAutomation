/* eslint-disable no-unused-vars */
import * as data from '../../../fixtures/test-data.json';

describe('Organisation  dashboard', () => {
  const { baseUrl } = Cypress.config('baseUrl');
  const organisationAccounts = {
    bradpitt: {
      email: 'automation_brad.pitt.coordinator0client+orgadmin@donotuse.com.au',
      password: 'qaAutomation2021',
    },
    lennon: {
      email: 'automation_lennon.garnet.20+coordinators+orgadmin@donotuse.com.au',
      password: 'qaAutomation2021',
    },
    jake: {
      email: 'automation_jake.picking.empty+orgadmin@donotuse.com.au',
      password: 'qaAutomation2021',
    },
  };
  const welcomeContent = {
    emptyState: {
      welcome: 'Organisation',
      content1: 'You have no coordinators yet. If you’re ready,',
      content2: 'add coordinators here',
    },
    sigmud: {
      welcome: 'Welcome, ',
      name: 'Sigmund Chas',
      content1: 'Access messages, timesheets and agreements or log in as your client for all options and features. If you have any questions, please email us at ',
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
    shorstlist: `${baseUrl}2/shortlist/organisation`,
  };
  const how2StartContent = {
    how2Start: 'How to start:',
    add: ' your client.',
    search: ' worker profiles to find the right fit. ',
    shorstlist: ' workers to review or message later. ',
    manageAndConnect: ' Manage and connect your clients to their support. ',
  };
  const clientTileContent = {
    viewMessages: 'View messages',
    viewTimesheets: 'View support hours',
    logAs: 'Login as ',
  };
  const noClientContent = {
    noClientContent: 'No clients assigned to coordinator',
    createOne: 'Click here to create one!',

  };
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('ES-T1479. View Organisation Dashboard that has coordinator with 1 or more clients.', () => {
    cy.log('Login')
      .visit('/')
      .log(`Login ${organisationAccounts.lennon.email}`)

      .loginToDashboard(
        organisationAccounts.lennon.email,
        organisationAccounts.lennon.password,
      )

      .log('Check Add client button')
      .verifyElementContainsTextObjectList('button', { item: 'Add client' })

      .log('Check search')
      .verifyElementVisible(data.organisation.searchBtn)
      .verifyElementVisible(data.organisation.searchInput)
      .verifyElementContainsText('button', 'Add coordinator')
      .verifyElementContainsText('button', 'Add client')
      .verifyElementContainsText('h2', 'Coordinators');
  });

  it('ES-T1516. View Dashboard Empty State', () => {
    cy.log('Login')
      .visit('/')
      .log(`Login ${organisationAccounts.jake.email}`)

      .loginToDashboard(
        organisationAccounts.jake.email,
        organisationAccounts.jake.password,
      )

      .log('Check Welcome')
      .verifyElementContainsTextObjectList('div', welcomeContent.emptyState)

      .verifyElementContainsText('button', 'Add coordinator')
      .verifyElementNotContainsText('button', 'Add client')

      .log('Check How to start Link')
      .clickElementOnText('button', 'Add coordinator')

      .url()
      .should('include', 'coordinators/add');
  });

  it('ES-T1520. Check Dashboard pagination, Organisation', () => {
    cy.log('Login')
      .visit('/')
      .log(`Login ${organisationAccounts.lennon.email}`)

      .loginToDashboard(
        organisationAccounts.lennon.email,
        organisationAccounts.lennon.password,
      )

      .log('Check search')
      .verifyElementVisible(data.organisation.searchBtn)
      .verifyElementVisible(data.organisation.searchInput)

      .verifyTextVisible('Displaying 20 out of ')
      .verifyTextVisible('Page 1 of')

      .hasNumberCoordinatorOnPage(20)

      .clickElementByIndex('button[aria-label="Next page"]')
      .verifyTextVisible('Page 2 of')
      .clickElementByIndex('button[aria-label="Previous page"]')
      .verifyTextVisible('Page 1 of');
  });
});
