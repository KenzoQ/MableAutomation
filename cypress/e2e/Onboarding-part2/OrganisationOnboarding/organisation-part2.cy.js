import faker from 'faker/locale/en_AU';
import * as data from '../../../fixtures/test-data.json';

describe('Onboarding Organisation - part 2', () => {
  const phone = '0491570110';
  const organisation = {
    lennon: {
      email: 'automation_lennon.garnet.20+coordinators+orgadmin@donotuse.com.au',
      password: 'qaAutomation2021',
    },
    noTerm: {
      email: 'automation_denzel.washington.swdocumentsempty+orgadmin@donotuse.com.au',
      password: 'qaAutomation2021',
    },
    org: {
      email: 'automation_lennon.garnet.20+coordinators+orgadmin@donotuse.com.au',
      password: 'qaAutomation2021',
    },
  };

  const firstName = faker.name.firstName();
  const firstNameCoordinator = `Coordinator${firstName.toLowerCase()}`;
  const lastName = faker.name.firstName();
  const rnd = faker.random.alphaNumeric(5);
  const address = '2nd Ave';
  const postcode = 2000;
  const suhurb = 'Barangaroo NSW 2000';
  const gender = data.coordinatorContent.addClientForm.gender.male;

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('ES-T1429 - Create Client Account [Coordinator Managed]', () => {
    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        organisation.lennon.email,
        organisation.lennon.password,
      );

    const { alert } = data.coordinatorContent.addClientForm;
    alert.email = null;
    alert.password = null;
    alert.phone = null;
    cy
      .clickElementOnText(data.coordinatorElements.button, data.coordinatorContent.addClient)

    // Fill form
      .fillOrganisationInCreateForm('Babette')
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
      .verifyTextVisible('account created')

      .clickElementOnText('button', 'Go back to dashboard')

      .searchMemberOfCoordinatorByText(firstNameCoordinator)
      .clickFirstLogAs()
      .clickLeftMenuAccount()
      .verifyItemAccountDetailsCompleted(data.coordinatorContent.consumerAccount.personalDetails,
        null, null)
      .verifyPersonalDetailsSelected()
      .verifyRadioChecked(gender)
      .verifyPersonalDetailsFields([firstNameCoordinator, lastName, '', phone, address, suhurb]);
  });

  it('ES-T1471 - Create Client Account Fields Validation [Coordinator Managed]', () => {
    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        organisation.lennon.email,
        organisation.lennon.password,
      );

    const { alert } = data.coordinatorContent.addClientForm;
    alert.email = null;
    alert.password = null;
    alert.phone = null;
    cy
      .clickElementOnText(data.coordinatorElements.button, data.coordinatorContent.addClient)
      .clickElementOnText(data.coordinatorElements.addClientForm.formButton,
        data.coordinatorContent.addClientForm.createClient)
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        alert)

    // Fill form
      .fillOrganisationInCreateForm('Babette')
      .fillBasicCoordinatorAccount(firstNameCoordinator, lastName, gender, address,
        postcode, null)
      .fillTypeOfCareForm(data.coordinatorContent.addClientForm.typeOfCare.disabilitySupport,
        data.coordinatorContent.addClientForm.supportPlan.no,
        data.coordinatorContent.addClientForm.fundingSource.seft)

      .log('Medication')
      .clickElementOnText(data.coordinatorElements.addClientForm.medicationRadio,
        'No')

      .verifyElementNotExist(data.coordinatorElements.addClientForm.invalidFields);
  });

  it('ES-T1500 -Check Login as Organisation Functionality', () => {
    const coordinatorName = 'Benjamen Itliong';
    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        organisation.lennon.email,
        organisation.lennon.password,
      )
      .verifyTextVisible('Dashboard')

      .clickElementOnText('button', `Login as ${coordinatorName}`)
      .verifyTextVisible(`Welcome, ${coordinatorName}`)

      .clickElementOnText('button', 'Login as Organisation')
      .verifyTextVisible('Lennon Garnet');
  });

  it(`ES-T1507 -Create Coordinator Account Validation
  ES-T1472 - Create Coordinator Account`, () => {
    // const firstNameNDIA = `${faker.name.firstName()}`;
    const clientEmailNDIA = `auto_${firstName.toLowerCase()}_${rnd}.onboarding+client@donotuse.com.au`;
    const clientPass = organisation.lennon.password;
    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        organisation.lennon.email,
        organisation.lennon.password,
      );

    const { alert } = data.coordinatorContent.addClientForm;
    alert.phone = 'Input a valid phone number';
    alert.birth = null;
    alert.referral = null;
    alert.medication = null;
    cy
      .clickElementOnText(data.coordinatorElements.button, 'Add coordinator')
      .clickElementOnText('button',
        'Create')
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        alert)

    // Fill form
      // .fillOrganisationInCreateForm('Babette')
      .fillClientEmailAndPassword(clientEmailNDIA, clientPass)
      .fillBasicCoordinatorAccountFromOriginsation(firstNameCoordinator, lastName, address,
        postcode, '0491570110')

      .verifyElementNotExist(data.coordinatorElements.addClientForm.invalidFields)

      .clickElementOnText('button',
        'Create');
  });

  it('ES-T1515 - Edit Compliance Terms and Conditions', () => {
    const text = `Automation: Compliance Terms and Conditions ${faker.random.alphaNumeric(20)}`;
    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        organisation.lennon.email,
        organisation.lennon.password,
      )
      .clickElementOnText(data.coordinatorElements.mainMenu,
        data.coordinatorContent.mainMenu.compliance)

      .verifyElementVisible(data.coordinatorElements.incidentsSupportNotes.page)

      .verifyElementContainsTextObjectList(data.coordinatorElements.incidentsSupportNotes.tabs,
        data.coordinatorContent.incidentsSupportNotes.tabs)

      .clickElementOnText(data.coordinatorElements.incidentsSupportNotes.tabs,
        data.coordinatorContent.incidentsSupportNotes.tabs.terms)

      .verifyElementVisible(data.coordinatorElements.incidentsSupportNotes.terms.page)
      .verifyTextObjectsVisible(
        data.coordinatorContent.incidentsSupportNotes.terms.rqBanner)

      .clickElementOnText('button', 'Edit')
      .editTemOrg(text)
      .verifyTextVisible(text);
  });

  it('ES-T1635 - View Compliance: Terms and Conditions Empty State', () => {
    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        organisation.noTerm.email,
        organisation.noTerm.password,
      )
      .clickElementOnText(data.coordinatorElements.mainMenu,
        data.coordinatorContent.mainMenu.compliance)
      .clickElementOnText(data.coordinatorElements.mainMenu,
        data.coordinatorContent.mainMenu.compliance)

      .verifyElementVisible(data.coordinatorElements.incidentsSupportNotes.page)

      .verifyElementContainsTextObjectList(data.coordinatorElements.incidentsSupportNotes.tabs,
        data.coordinatorContent.incidentsSupportNotes.tabs)

      .clickElementOnText(data.coordinatorElements.incidentsSupportNotes.tabs,
        data.coordinatorContent.incidentsSupportNotes.tabs.terms)
      .verifyTextVisible(data.coordinatorContent.incidentsSupportNotes.terms.noTerms);
  });

  it('ES-T1517- View Compliance: Support worker details Empty State', () => {
    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        organisation.noTerm.email,
        organisation.noTerm.password,
      )
      .clickElementOnText(data.coordinatorElements.mainMenu,
        data.coordinatorContent.mainMenu.compliance)

      .verifyElementVisible(data.coordinatorElements.incidentsSupportNotes.page)
      .verifyElementContainsTextObjectList(data.coordinatorElements.incidentsSupportNotes.tabs,
        data.coordinatorContent.incidentsSupportNotes.tabs)

      .clickElementOnText(data.coordinatorElements.incidentsSupportNotes.tabs,
        data.coordinatorContent.incidentsSupportNotes.tabs.supportWorkerDetails)
      .verifyTextVisible(
        data.coordinatorContent.incidentsSupportNotes.supportWorkerDetails.noSupportWorker);
  });

  it('ES-T2621 - Organisation, Create a client managed account with duplicate email', () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.firstName();
    const address = '2nd Ave';
    const postcode = 2000;
    const clientEmail = 'lizzy.cody@mable.com.au';
    const clientPass = 'qaAutomation2021';
    const gender = data.coordinatorContent.addClientForm.gender.male;
    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        organisation.lennon.email,
        organisation.lennon.password,
      )

      .clickElementOnText(data.coordinatorElements.button, data.coordinatorContent.addClient)
      .clickElementOnText(data.coordinatorElements.addClientForm.selectAccountTypeLabel,
        data.coordinatorContent.addClientForm.clientManaged)

      .fillOrganisationInCreateForm('Babette')
      .log('Enter an email')
      .inputTextField(
        data.coordinatorElements.addClientForm.emailField,
        clientEmail,
      )

      .log('Enter password')
      .inputTextField(
        data.coordinatorElements.addClientForm.passwordField,
        clientPass,
      )

      .log('Enter first name')
      .inputTextField(
        data.coordinatorElements.addClientForm.firstName,
        firstName,
      )

      .log('Enter last name')
      .inputTextField(
        data.coordinatorElements.addClientForm.lastName,
        lastName,
      )

      .log('Gender')
      .clickElementOnText(data.coordinatorElements.addClientForm.genderRadio,
        gender)

      .selectDateOfBirth()

      .log('Enter address')
      .inputTextField(
        data.coordinatorElements.addClientForm.street,
        address,
      )

      .log('Enter postcode')
      .inputTextField(data.coordinatorElements.addClientForm.suburb, postcode)
      .clickElement('.suggestions .listOption', true, 0)

      .log('Enter address')
      .inputTextField(
        data.coordinatorElements.addClientForm.phone,
        phone,
      )

      .log('Type of care')
      .selectTypeOfCare()

      .log('support plan')
      .selectSupportPlan()

      .log('funding source')
      .selectfundingSource()

      .log('Medication')
      .clickElementOnText(data.coordinatorElements.addClientForm.medicationRadio,
        'No')

      .clickElementOnText(data.coordinatorElements.addClientForm.formButton,
        data.coordinatorContent.addClientForm.createClient)
      .verifyTextVisible('email has already been taken');
  });

  it('ES-T2622 -Organisation, Create a coordinator account with duplicate email', () => {
    // const firstNameNDIA = `${faker.name.firstName()}`;
    const clientEmailNDIA = 'lizzy.cody@mable.com.au';
    const clientPass = organisation.lennon.password;
    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        organisation.lennon.email,
        organisation.lennon.password,
      );

    const { alert } = data.coordinatorContent.addClientForm;
    alert.phone = 'Input a valid phone number';
    alert.birth = null;
    alert.referral = null;
    alert.medication = null;
    cy
      .clickElementOnText(data.coordinatorElements.button, 'Add coordinator')
      .clickElementOnText('button',
        'Create')
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        alert)

    // Fill form
      // .fillOrganisationInCreateForm('Babette')
      .fillClientEmailAndPassword(clientEmailNDIA, clientPass)
      .fillBasicCoordinatorAccountFromOriginsation(firstNameCoordinator, lastName, address,
        postcode, '0491570110')

      .verifyElementNotExist(data.coordinatorElements.addClientForm.invalidFields)

      .clickElementOnText('button',
        'Create')

      .verifyTextVisible('Your email address is already registered');
  });
});
