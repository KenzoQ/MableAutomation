import faker from 'faker/locale/en_AU';
import * as data from '../../../fixtures/test-data.json';

describe('Onboarding Organisation - part 1', () => {
  // const orgHeaderEle = 'app-organisation-dashboard .pageHeader';
  const phone = '0491570110';
  const coordinator = {
    lennon: {
      email: 'automation_lennon.garnet.20+coordinators+orgadmin@donotuse.com.au',
      password: 'qaAutomation2021',
    },
    noTerm: {
      email: 'automation_coordinator+notermsandconditions@donotuse.com.au',
      password: 'qaAutomation2021',
    },
  };

  const firstName = faker.name.firstName();
  const lastName = faker.name.firstName();
  const rnd = faker.random.alphaNumeric(5);
  const address = '2nd Ave';
  const postcode = 2000;
  // const suhurb = 'Barangaroo NSW 2000';
  // const clientEmail = `auto_${firstName.toLowerCase()}_${rnd}.onboarding+client@donotuse.com.au`;
  const clientPass = 'qaAutomation2021';
  const gender = data.coordinatorContent.addClientForm.gender.male;

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('ES-T1468 - Create Client Account [Client Managed]', () => {
    const firstNameNDIA = `hcp${faker.name.firstName()}`;
    const clientEmailNDIA = `auto_hcp_${firstName.toLowerCase()}_${rnd}.onboarding+client@donotuse.com.au`;
    // const name = faker.name.firstName();
    // const email = 'a@a.a';
    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        coordinator.lennon.email,
        coordinator.lennon.password,
      );

    // const { alert } = data.coordinatorContent.addClientForm;

    cy.wait('@GET_account.json');
    cy
      .clickElementOnText(data.coordinatorElements.button, data.coordinatorContent.addClient)
      .clickElementOnText(data.coordinatorElements.addClientForm.selectAccountTypeLabel,
        data.coordinatorContent.addClientForm.clientManaged)

    // Fill form
      .fillOrganisationInCreateForm('Babette')

      .fillClientEmailAndPassword(clientEmailNDIA, clientPass)
      .fillBasicCoordinatorAccount(firstNameNDIA, lastName, gender, address,
        postcode, phone)
      .fillTypeOfCareForm(data.coordinatorContent.addClientForm.typeOfCare.agedCare, null,
        'Home Care Package Funding')

      .log('Medication')
      .clickElementOnText(data.coordinatorElements.addClientForm.medicationRadio,
        'No')

      .verifyElementNotExist(data.coordinatorElements.addClientForm.invalidFields)

      .clickElementOnText(data.coordinatorElements.addClientForm.formButton,
        data.coordinatorContent.addClientForm.createClient)
      .verifyTextVisible('account created')

      .clickElementOnText('button', 'Go back to dashboard')

      .searchMemberOfCoordinatorByText(clientEmailNDIA)
      .clickFirstLogAs()
      .clickLeftMenuAccount()
      .verifyItemAccountDetailsCompleted(data.coordinatorContent.consumerAccount.personalDetails,
        null, null);
  });

  it('ES-T1470 - Create Client Account Fields Validation [Client Managed]', () => {
    const firstNameNDIA = `hcp${faker.name.firstName()}`;
    const clientEmailNDIA = `auto_hcp_${firstName.toLowerCase()}_${rnd}.onboarding+client@donotuse.com.au`;
    // const name = faker.name.firstName();
    // const email = 'a@a.a';
    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        coordinator.lennon.email,
        coordinator.lennon.password,
      );

    const { alert } = data.coordinatorContent.addClientForm;
    alert.phone = 'Input a valid phone number';
    cy.wait('@GET_account.json');
    cy
      .clickElementOnText(data.coordinatorElements.button, data.coordinatorContent.addClient)
      .clickElementOnText(data.coordinatorElements.addClientForm.selectAccountTypeLabel,
        data.coordinatorContent.addClientForm.clientManaged)
      .clickElementOnText(data.coordinatorElements.addClientForm.formButton,
        data.coordinatorContent.addClientForm.createClient)
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        alert)

    // Fill form
      .fillOrganisationInCreateForm('Babette')

      .fillClientEmailAndPassword(clientEmailNDIA, clientPass)
      .fillBasicCoordinatorAccount(firstNameNDIA, lastName, gender, address,
        postcode, phone)
      .fillTypeOfCareForm(data.coordinatorContent.addClientForm.typeOfCare.agedCare, null,
        'Home Care Package Funding')

      .log('Medication')
      .clickElementOnText(data.coordinatorElements.addClientForm.medicationRadio,
        'No')

      .verifyElementNotExist(data.coordinatorElements.addClientForm.invalidFields);
  });

  it('ES-T1478 - Add Compliance Terms and Conditions', () => {
    const text = `Automation: Compliance Terms and Conditions ${faker.random.alphaNumeric(20)}`;
    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        coordinator.lennon.email,
        coordinator.lennon.password,
      )
      .wait('@GET_account.json')
      .clickElementOnText(data.coordinatorElements.mainMenu,
        data.coordinatorContent.mainMenu.compliance)
      .clickElement('a[href="/organisations/compliance"]')
      .verifyTextVisible('Terms and Conditions')
      .verifyTextVisible('Support worker details')
      .verifyTextVisible('All care workers will be required to acknowledge the following ')
      .verifyTextVisible(' Terms and Conditions when they enter into an agreement with clients of ')
      .verifyTextVisible('Organisation: East Care Funding')
      .verifyElementVisible('app-terms-and-conditions .terms')

      .clickElementOnText('button', 'Edit')
      .editTemOrg(text)
      .verifyTextVisible(text);
  });

  // outdated
  it('ES-T1480 - View Compliance: Support worker details', () => {
    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        coordinator.lennon.email,
        coordinator.lennon.password,
      )
      .wait('@GET_account.json')
      .clickElementOnText(data.coordinatorElements.mainMenu,
        data.coordinatorContent.mainMenu.compliance)
      .clickElementOnText(data.coordinatorElements.mainMenu,
        data.coordinatorContent.mainMenu.compliance)
      .verifyTextVisible('Terms and Conditions')
      .verifyTextVisible('Support worker details')

      .clickElementOnText('.mat-tab-links a', 'Support worker details')
      .moveAndCheckSupportWorkerDetailsInCompliance();
  });

  it('ES-T1490 -Verify Coordinator client counter badge', () => {
    const coordinatorName = 'Benjamen Itliong';
    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        coordinator.lennon.email,
        coordinator.lennon.password,
      )
      .verifyTextVisible('Dashboard')
      .wait('@GET_account.json')

      .checkCounterBadgeCoordinatorByname(coordinatorName, 12);
  });

  it('ES-T1492 - Check Search Functionality', () => {
    const invalidValue = '123showmethemoney';
    const coordinatorName = 'benj';
    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        coordinator.lennon.email,
        coordinator.lennon.password,
      )
      .wait('@GET_account.json')

      .searchMemberOfCoordinatorByText(invalidValue)
      .verifyTextVisible(`No matches for "${invalidValue}"`)
      .searchMemberOfCoordinatorByText(coordinatorName)
      .verifyElementVisible(data.coordinatorElements.logAsButton)
      .clickElementOnText('button', 'Back')
      .verifySearchBeEmpty();
  });

  it('ES-T1493 - Check Login as Client Functionality', () => {
    const clientName = 'Eileen';
    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        coordinator.lennon.email,
        coordinator.lennon.password,
      )
      .verifyTextVisible('Dashboard')
      .wait('@GET_account.json')

      .log('Check search')
      .inputTextField('app-search-user-input input', clientName)
      .clickElement('button [name="lookup"]')
      .verifyTextVisible(clientName)

      .verifyTextVisible(' match your search')
      .verifyTextVisible(`Login as ${clientName}`)
      .clickElementOnText('button', `Login as ${clientName}`)
      .verifyTextVisible(`${clientName}`);
  });

  it('ES-T1494 - Check Login as Coordinator Functionality', () => {
    const coordinatorName = 'Benjamen Itliong';
    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        coordinator.lennon.email,
        coordinator.lennon.password,
      )
      .verifyTextVisible('Dashboard')
      .wait('@GET_account.json')

      .clickElementOnText('button', `Login as ${coordinatorName}`)
      .verifyTextVisible(`Welcome, ${coordinatorName}`);
  });
});
