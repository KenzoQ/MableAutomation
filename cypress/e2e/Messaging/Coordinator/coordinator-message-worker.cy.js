/* eslint-disable no-unused-vars */
import * as data from '../../../fixtures/test-data.json';

import faker from 'faker/locale/en_AU';

describe('Coodinator Message Worker', () => {
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
  const gender = data.coordinatorContent.addClientForm.gender.male;
  const phone = '0491570110';
  const darrickEmail = 'automation_darrick.douglas.shiftnoteattachments+worker@donotuse.com.au';
  const darrickPass = 'qaAutomation2021';

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('ES-T3228. Message Worker as a Coordinator, Worker profile page - 5+ clients', () => {
    const searchValue1 = 'Midoriya ';
    const searchValue2 = 'Darrick';
    cy.setTimeAvailableAPI(darrickEmail, darrickPass);
    cy.visit('/');
    cy.log(`Login ${coordinatorAccounts.erna.email}`)

      .loginToDashboard(
        coordinatorAccounts.erna.email,
        coordinatorAccounts.erna.password,
      )

      .log('Check search')
      .verifyElementVisible(data.coordinator.searchBtn)
      .verifyElementVisible(data.coordinator.searchInput)

      // Precondition go to profile worker by name
      .log('Click "Search workers"')
      .clickSearchSupportWorkers()
      .skipToResultSearchWorkers()

      .clickElement('button.showAllFiltersAction')
      .verifyElementExist('#allFiltersSlideMenu')

      .clickElementByText('Search by support worker name')
      .log(`Enter ${searchValue1} in the textbox`)
      .inputTextField('input[formcontrolname="firstName"]', searchValue1)
      .clickElementOnText('.workerSearchByNameResultContent button', 'Search')
      .waitAppLoaderNotVisible()
      .verifyTextVisible('Results')
      .verifyTextVisible('match')
      .verifyTextVisible(searchValue1)

      .log('Click "View profile" 1 of the result list')
      .get('.workerSearchMatchContent')
      .first()
      .contains('View profile')
      .click({ force: false })
      .verifyElementVisible('app-carer-profile #profileHeader')

      .verifyTextVisible('About')
      .verifyTextVisible('Availability')
      .url()
      .should('include', 'profile/worker/')

      .clickElementByIndex('#headerBtnContainer button#messageButton')

      .clickElementOnText('mat-dialog-actions button', 'Message')
      .verifyTextVisible('Select client to continue.')

      .inputTextField('app-auto-complete input', 'Biff Lelan')
      .wait(2000)
      .clickElementByIndex('.suggestions [role="option"]')

      .clickElementOnText('mat-dialog-actions button', 'Message')
      .verifyTextVisible('Conversation starter')
      .clickElementOnText('button', 'Login as Coordinator')

    // Precondition go to profile worker by name
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

      .clickElementByIndex('#headerBtnContainer button#messageButton')

      .clickElementOnText('mat-dialog-actions button', 'Message')
      .verifyTextVisible('Select client to continue.')

      .inputTextField('app-auto-complete input', 'Merrill Diana')
      .clickElementByIndex('.suggestions [role="option"]')

      .clickElementOnText('mat-dialog-actions button', 'Message')
      .verifyElementVisible('app-inbox')

      .clickElementOnText(data.coordinatorElements.mainMenu, 'Dashboard');
  });

  it('ES-T3226. Message Worker as a Coordinator, Worker profile page - 1 to 5 clients', () => {
    const searchValue1 = 'Casimira';
    const searchValue2 = 'Darrick';
    cy.log('Login')
      .visit('/')
      .log(`Login ${coordinatorAccounts.jeremi.email}`)

      .loginToDashboard(
        coordinatorAccounts.jeremi.email,
        coordinatorAccounts.jeremi.password,
      )

    // Precondition go to profile worker by name
      .log('Click "Search workers"')
      .clickSearchSupportWorkers()
      .skipToResultSearchWorkers()

      .clickElement('button.showAllFiltersAction')
      .verifyElementExist('#allFiltersSlideMenu')

      .clickElementByText('Search by support worker name')
      .log(`Enter ${searchValue1} in the textbox`)
      .inputTextField('input[formcontrolname="firstName"]', searchValue1)
      .clickElementOnText('.workerSearchByNameResultContent button', 'Search')
      .waitAppLoaderNotVisible()
      .verifyTextVisible('Results')
      .verifyTextVisible('match')
      .verifyTextVisible(searchValue1)

      .log('Click "View profile" 1 of the result list')
      .get('.workerSearchMatchContent')
      .first()
      .contains('View profile')
      .click({ force: false })
      .verifyElementVisible('app-carer-profile #profileHeader')

      .verifyTextVisible('About')
      .verifyTextVisible('Availability')
      .url()
      .should('include', 'profile/worker/')

      .clickElementByIndex('#headerBtnContainer button#messageButton')

      .clickElementOnText('mat-dialog-actions button', 'Message')
      .verifyTextVisible('Select client to continue.')

      .clickElementOnText('#clientRadioLabel .radioLabel', 'Fern Charnette')

      .clickElementOnText('mat-dialog-actions button', 'Message')
      .verifyTextVisible('Conversation starter')
      .clickElementOnText('button', 'Login as Coordinator')

      .log('Check search')
      .verifyElementVisible(data.coordinator.searchBtn)
      .verifyElementVisible(data.coordinator.searchInput)

    // Precondition go to profile worker by name
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

      .verifyTextVisible('About')
      .verifyTextVisible('Availability')
      .url()
      .should('include', 'profile/worker/')

      .clickElementByIndex('#headerBtnContainer button#messageButton')

      .clickElementOnText('mat-dialog-actions button', 'Message')
      .verifyTextVisible('Select client to continue.')

      .clickElementOnText('#clientRadioLabel .radioLabel', 'Leighton Jenson')

      .clickElementOnText('mat-dialog-actions button', 'Message')
      .verifyElementVisible('app-inbox');
  });

  it('ES-T3277. Add client [Message worker modal][Worker profile page]', () => {
    const firstName = faker.name.firstName();
    const firstNameCoordinator = `Coordinator${firstName.toLowerCase()}`;
    const lastName = faker.name.firstName();
    const address = '2nd Ave';
    const postcode = 2000;
    const gender = data.coordinatorContent.addClientForm.gender.male;
    const searchValue1 = 'Midoriya ';
    cy.log('Login')
      .log(`Login ${coordinatorAccounts.erna.email}`)

      .loginAPI(
        coordinatorAccounts.erna.email,
        coordinatorAccounts.erna.password,
      )
      .visit('/dashboard')

      .log('Check search')
      .verifyElementVisible(data.coordinator.searchBtn)
      .verifyElementVisible(data.coordinator.searchInput)

      .log('On the left navigation pane click "Shortlist"')
      .clickElement('a[href="/shortlist"]')
      .verifyElementVisible('app-coordinator-shortlist')

      .navTheShorlistByName(searchValue1)
      .verifyTextVisible('Support Worker')
      .verifyTextVisible('About')
      .verifyTextVisible('Availability')
      .url()
      .should('include', 'profile/worker/')

      .clickElementByIndex('#headerBtnContainer button#messageButton')

      .clickElementOnText('mat-dialog-actions button', 'Message')
      .verifyTextVisible('Select client to continue.')
      .clickElementOnText('button', 'Add client')

      .fillBasicCoordinatorAccount(firstNameCoordinator, lastName, gender, address,
        postcode, null)
      .fillTypeOfCareForm(data.coordinatorContent.addClientForm.typeOfCare.disabilitySupport,
        data.coordinatorContent.addClientForm.supportPlan.no,
        data.coordinatorContent.addClientForm.fundingSource.seft)

      .log('Medication')
      .clickElementOnText(data.coordinatorElements.addClientForm.medicationRadio,
        'No')

      .clickElementOnText(data.coordinatorElements.addClientForm.formButton,
        data.coordinatorContent.addClientForm.createClient)

      .wait(2000)
      .clickElementOnText('button', 'Go back to')
      .verifyTextVisible('Shortlist')
      .clickElementByIndex('[href="/dashboard/coordinator"]')
      .searchMemberOfCoordinatorByText(firstNameCoordinator)
      .clickFistExpand()
      .verifyTextVisible(firstNameCoordinator);
  });
});
