/* eslint-disable no-unused-vars */
import * as data from '../../../fixtures/test-data.json';

import faker from 'faker/locale/en_AU';

describe('Coodinator shortlist', () => {
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
    arthur: {
      email: 'automation_arthur.stone.searchworkers+coordinator@donotuse.com.au',
      password: 'qaAutomation2021',
    },
    dannie: {
      email: 'automation_dannie.clint.shortlistempty+coordinator@donotuse.com.au',
      password: 'qaAutomation2021',
    },
    mathilda: {
      email: 'automation_mathilda.fabian.shortlistworkers+coordinator@donotuse.com.au',
      password: 'qaAutomation2021',
    },
    dillan: {
      email: 'automation_dillan.shelley.shortlist1+workers+coordinator@donotuse.com.au',
      password: 'qaAutomation2021',
    },
    floretta: {
      email: 'automation_floretta.ittai.messageworkernoclient+coordinator@donotuse.com.au',
      password: 'qaAutomation2021',
    },
    jeremi: {
      email: 'automation_jeremi.svetomir.messageworker1+client+coordinator@donotuse.com.au',
      password: 'qaAutomation2021',
    },
    erna: {
      email: 'automation_erna.rosanna.messageworker5+clients+coordinator@donotuse.com.au',
      password: 'qaAutomation2021',
    },
  };
  const firstName = faker.name.firstName();
  const firstNameCoordinator = `Coordinator${firstName.toLowerCase()}`;
  const lastName = faker.name.firstName();
  const address = '2nd Ave';
  const postcode = 2000;
  const suhurb = 'Barangaroo NSW 2000';
  const suhurb2 = '3000';
  const gender = data.coordinatorContent.addClientForm.gender.male;
  const phone = '0491570110';

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it(`1. ES-T3233. Shortlist visibility, Coordinator
      2. ES-T3234. View Shortlist page, Empty state`, () => {
    cy.log('Login')
      .visit('/')
      .log(`Login ${coordinatorAccounts.dannie.email}`)

      .loginToDashboard(
        coordinatorAccounts.dannie.email,
        coordinatorAccounts.dannie.password,
      )

      .log('Check search')
      .verifyElementVisible(data.coordinator.searchBtn)
      .verifyElementVisible(data.coordinator.searchInput)

      .clickElementOnText('div', 'Shortlist')
      .verifyTextVisible('You have not shortlisted any support workers yet.')
      .verifyElementContainsTextObjectList('#emptyShortlistNotice [href="/workers"]', { item: 'Search for support workers' })
      .verifyTextVisible('for your clients and shortlist those that are a good fit for them.')
      .url()
      .should('include', '/shortlist/coordinator');
  });

  it(`1. ES-T3235. Shortlist workers as a Coordinator, Search workers page
      2. ES-T3247. Remove shortlisted workers as a Coordinator, Shortlist page`, () => {
    cy.log('Login')
      .visit('/')
      .log(`Login ${coordinatorAccounts.mathilda.email}`)

      .loginToDashboard(
        coordinatorAccounts.mathilda.email,
        coordinatorAccounts.mathilda.password,
      )

      .clickElementOnText('div', ' Search workers ')
      .verifyTextVisible('Search workers')
      .verifyElementVisible('app-suburb-selector input[type="search"]')

      .searchWorkersBySuburb(suhurb2)
      .waitAppLoaderNotVisible()
      .clickSkipToResults()
      .waitAppLoaderNotVisible()
      .verifyTextVisible('Search by location')
      .verifyTextVisible('are open to work')

      .waitAppLoaderNotVisible()
      .changeToRemoveShortlist(1)
      .waitAppLoaderNotVisible()
      .verifyShortlistButtonIsChangedToText(1, 'Shortlisted')
      .waitAppLoaderNotVisible()
      .getTextByIndex('.carerName', 1)
      .then(($name) => {
        cy
          .navigateByLeftMenuInDashboard('Shortlist')
          .url().should('include', '/shortlist/coordinator')
          .get('div .carerName h2')
          .last()
          .trigger('mouseover')
          .waitAppLoaderNotVisible()
          .verifyElementContainsText('div .carerName h2', $name.trim());
      });
  });

  it('ES-T3236. Shortlist workers as a Coordinator, Worker profile page', () => {
    cy.log('Login')
      .visit('/')
      .log(`Login ${coordinatorAccounts.mathilda.email}`)

      .loginToDashboard(
        coordinatorAccounts.mathilda.email,
        coordinatorAccounts.mathilda.password,
      )

      .clickElementOnText('div', ' Search workers ')
      .verifyTextVisible('Search workers')
      .verifyElementVisible('app-suburb-selector input[type="search"]')

      .searchWorkersBySuburb(suhurb2)
      .waitAppLoaderNotVisible()
      .clickSkipToResults()
      .waitAppLoaderNotVisible()
      .verifyTextVisible('Search by location')
      .verifyTextVisible('are open to work')

      .changeToShortlist(0)
      .waitAppLoaderNotVisible()
      .getTextByIndex('.carerName', 0)
      .then(($name) => {
        cy
          .clickElementOnText('.profileActions button', 'View profile')
          .url().should('include', '/profile/worker/')

          .clickElementOnText('#shortlistBtn', 'Shortlist')
          .waitAppLoaderNotVisible()
          .verifyElementContainsText('#shortlistBtn', 'Shortlisted')

          .clickElementOnText('div', 'Shortlist')
          .url()
          .should('include', '/shortlist/coordinator')
          .get('div .carerName h2')
          .last()
          .trigger('mouseover')
          .waitAppLoaderNotVisible()
          .verifyElementContainsText('div .carerName h2', $name.trim());
      });
  });

  it('ES-T3237. View Shortlist page, 1+ Workers', () => {
    cy.log('Login')
      .visit('/')
      .log(`Login ${coordinatorAccounts.dillan.email}`)

      .loginToDashboard(
        coordinatorAccounts.dillan.email,
        coordinatorAccounts.dillan.password,
      )

      .clickElementOnText('div', 'Shortlist')
      .url()
      .should('include', '/shortlist/coordinator')
      .verifyElementVisible('.shortlistDetail .carerName')
      .verifyElementVisible('.shortlistDetail .locationAndRating')
      .verifyElementVisible('.shortlistDetail .jobServices')
      .verifyElementContainsText('button.removeFromShortlistLink', 'Remove from shortlist')
      .verifyElementContainsText('.chip', 'COVID-19 vaccinated')
      .verifyElementContainsText('.chip', 'Very responsive');
  });

  it('ES-T3245. Remove shortlisted workers as a Coordinator, Search workers page', () => {
    cy.log('Login')
      .visit('/')
      .log(`Login ${coordinatorAccounts.mathilda.email}`)

      .loginToDashboard(
        coordinatorAccounts.mathilda.email,
        coordinatorAccounts.mathilda.password,
      )

      .clickElementOnText('div', ' Search workers ')
      .verifyTextVisible('Search workers')
      .verifyElementVisible('app-suburb-selector input[type="search"]')

      .searchWorkersBySuburb(suhurb2)
      .waitAppLoaderNotVisible()
      .clickSkipToResults()
      .waitAppLoaderNotVisible()
      .verifyTextVisible('Search by location')
      .verifyTextVisible('are open to work')

      .changeToRemoveShortlist()
      .changeToShortlist()
      .verifyShortlistButtonIsChangedToText(0, 'Shortlist')
      .getTextByIndex('.carerName', 0)
      .then(($name) => {
        cy
          .clickElementOnText('div', 'Shortlist')
          .url().should('include', '/shortlist/coordinator')
          .get('div .carerName h2')
          .last()
          .scrollIntoView()
          .verifyElementNotContainsText('div .carerName h2', $name.trim());
      });
  });

  it('ES-T3246. Remove shortlisted workers as a Coordinator, Worker profile page', () => {
    cy.log('Login')
      .visit('/')
      .log(`Login ${coordinatorAccounts.mathilda.email}`)

      .loginToDashboard(
        coordinatorAccounts.mathilda.email,
        coordinatorAccounts.mathilda.password,
      )

      .clickElementOnText('div', ' Search workers ')
      .verifyTextVisible('Search workers')
      .verifyElementVisible('app-suburb-selector input[type="search"]')

      .searchWorkersBySuburb(suhurb2)
      .waitAppLoaderNotVisible()
      .clickSkipToResults()
      .waitAppLoaderNotVisible()
      .verifyTextVisible('Search by location')
      .verifyTextVisible('are open to work')
      .waitAppLoaderNotVisible()

      .changeToRemoveShortlist(0)
      .getTextByIndex('.carerName', 0)
      .then(($name) => {
        cy
          .clickElementOnText('.profileActions button', 'View profile')
          .url().should('include', '/profile/worker/')

          .clickElementOnText('#shortlistBtn span', 'Shortlisted')
          .verifyElementContainsText('#shortlistBtn', 'Shortlist')

          .clickElementOnText('div', 'Shortlist')
          .url()
          .should('include', '/shortlist/coordinator')
          .get('div .carerName h2')
          .last()
          .scrollIntoView()
          .verifyElementNotContainsText('div .carerName h2', $name.trim());
      });
  });

  it('ES-T3306. View worker profile, Shortlist page', () => {
    cy.log('Login')
      .visit('/')
      .log(`Login ${coordinatorAccounts.dillan.email}`)

      .loginToDashboard(
        coordinatorAccounts.dillan.email,
        coordinatorAccounts.dillan.password,
      )

      .clickElementOnText('div', 'Shortlist')
      .url()
      .should('include', '/shortlist/coordinator')
      .getTextByIndex('div .carerName h2', 0)
      .then(($name) => {
        cy.get('div .carerName h2').eq(0).click()
          .url()
          .should('include', '/profile/worker/')

          .verifyElementContainsText('#shortlistBtn', 'Shortlisted')

          .clickElementOnText('button', ' Back')
          .url()
          .should('include', '/shortlist/coordinator')
          .get('div .carerName h2')
          .last()
          .scrollIntoView()
          .verifyElementContainsText('div .carerName h2', $name.trim());
      });
  });
});
