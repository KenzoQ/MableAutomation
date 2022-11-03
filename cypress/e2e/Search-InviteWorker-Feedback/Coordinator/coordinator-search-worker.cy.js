/* eslint-disable no-unused-vars */
import * as data from '../../../fixtures/test-data.json';

describe('Coodinator Search worker', () => {
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
  };
  const searchValue = 'Matteo';
  const searchValue2 = 'Tae Hee';
  const postcodeText = '2000';
  const suburb = 'Barangaroo NSW 2000';
  const serviceName = 'Nurse';
  const gender = 'Female';
  const postcodeShort = 'Melbourne 3000';
  const postcode = 'Melbourne VIC 3000';
  const postcodeShort2 = 'Barangaroo 2000';
  const postcode2 = 'Barangaroo NSW 2000';
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it(`1. ES-T3193. Search workers visibility, Coordinator
      2. ES-T3194. Search workers as a Coordinator`, () => {
    cy.log('Login')
      .visit('/')
      .log(`Login ${coordinatorAccounts.arthur.email}`)

      .loginToDashboard(
        coordinatorAccounts.arthur.email,
        coordinatorAccounts.arthur.password,
      )

      .log('Check search')
      .verifyElementVisible(data.coordinator.searchBtn)
      .verifyElementVisible(data.coordinator.searchInput)

      .log('Go to the Search workers')
      .navToSearchWorkers()

      .log('Navigate to search for worker suceesfully')
      .verifyTextVisible('Search workers')

      .log(`Search: ${postcodeShort}`)
      .searchWorkersBySuburb(postcodeShort)

      .log('Verify "What types of support would this worker provide?"')
      .verifyAllSearchTypeOfSupport()

      .clickElementOnText('#workerSearchStepSkip button', 'Skip to results')
      .verifyElementVisible('.panel.workerSearchMatchCard')
      .clickElementOnText('button', 'View profile')

      .verifyTextVisible('About')
      .verifyTextVisible('Availability')
      .url()
      .should('include', 'profile/worker/')

      .waitAppLoaderNotVisible(10, 1000)
      .get('#profileHeader app-back-button [name="arrow-ios-backward"]')
      .last()
      .click()
      .verifyTextVisible('Search workers')
      .url()
      .should('include', '/worker-search-result?')

      .clickElementOnText('button.showAllFiltersAction', 'Show all filters')

      .log('Click "Service" select')
      .clickElementOnText('mat-checkbox .checkboxText', serviceName)
      .waitAppLoaderNotVisible()
      .clickElementOnText('.allFiltersHeaderSection button', ' Show ')

      .log('Click "View Profile" 1 of the result list')
      .waitAppLoaderNotVisible()
      .get(data.search.client.btnOnSearchItem)
      .eq(1)
      .contains('View profile')
      .click({ force: true })
      .waitAppLoaderNotVisible()
      .verifyTextVisible('Support Worker')

      .waitAppLoaderNotVisible()
      .verifyElementVisible('app-carer-profile')
      .verifyElementVisible('#profileHeader')
      .verifyTextVisible('Contact')
      .log('Click "Back to search results" btn')
      .waitAppLoaderNotVisible()
      .get('#profileHeader app-back-button [name="arrow-ios-backward"]')
      .last()
      .click()

      .log('Check search keyword textbox and gender filder')
      .getAttribute(data.search.client.searchInput, 'val')
      .then((text) => cy.expect(text).to.equal(postcode))

      .waitAppLoaderNotVisible()
      .clickElementOnText('button.showAllFiltersAction', 'Show all filters')

      .waitAppLoaderNotVisible()

      .log('Click "Clear filter"')
      .clickElementOnText('.allFiltersHeaderSection button', ' Clear ');
  });

  it('ES-T3207. Search workers Pagination, Coodinator', () => {
    cy.log('Login')
      .visit('/')
      .log(`Login ${coordinatorAccounts.arthur.email}`)

      .loginToDashboard(
        coordinatorAccounts.arthur.email,
        coordinatorAccounts.arthur.password,
      )

      .log('Check search')
      .verifyElementVisible(data.coordinator.searchBtn)
      .verifyElementVisible(data.coordinator.searchInput)

      .log('Go to the Search workers')
      .navToSearchWorkers()

      .log('Navigate to search for worker suceesfully')
      .verifyTextVisible('Search workers')

      .log(`Search: ${postcodeShort2}`)
      .searchWorkersBySuburb(postcodeShort2)

      .log('Verify "What types of support would this worker provide?"')
      .verifyAllSearchTypeOfSupport()

      .clickElementOnText('#workerSearchStepSkip button', 'Skip to results')
      .verifyElementVisible('.panel.workerSearchMatchCard')

      .hasNumberWorkerOnPage(20)
      .waitAppLoaderNotVisible(10, 2000)
      .verifyTextExist('Page 1 of')

      .clickElementByIndex('.mat-paginator-navigation-next')
      .waitAppLoaderNotVisible()
      .verifyTextVisible('Page 2 of')

      .clickElementByIndex('.mat-paginator-navigation-previous')
      .waitAppLoaderNotVisible()
      .verifyTextVisible('Page 1 of');
  });

  it('ES-T3218. Search workers by name, Coordinator', () => {
    cy.log('Login')
      .visit('/')
      .log(`Login ${coordinatorAccounts.arthur.email}`)

      .loginToDashboard(
        coordinatorAccounts.arthur.email,
        coordinatorAccounts.arthur.password,
      )
      .log('Click "Search workers"')
      .clickSearchSupportWorkers()

      .skipToResultSearchWorkers()

      .clickElement('button.showAllFiltersAction')
      .verifyElementExist('#allFiltersSlideMenu')

      .clickElementByText('Search by support worker name')
      .log(`Enter ${searchValue2} in the textbox`)
      .inputTextField('input[formcontrolname="firstName"]', searchValue2)
      .clickElementOnText('.workerSearchByNameResultContent button', 'Search')
      .waitAppLoaderNotVisible()
      .verifyTextVisible('Results')
      .verifyTextVisible('match')
      .verifyTextVisible(searchValue2)

      .log('Click "View profile" 1 of the result list')
      .get('.workerSearchMatchContent')
      .first()
      .contains('View profile')
      .click({ force: false })
      .verifyElementVisible('app-carer-profile #profileHeader')

      .log('Click "Back to search results" btn')
      .clickElementOnText('app-back-button span', 'Back');
  });
});
