import faker from 'faker/locale/en_AU';
import * as data from '../../../fixtures/test-data.json';

describe('Coordinator - part 1', () => {
  const phone = '0491570110';
  const coordinator = {
    wilfStone: {
      email: 'automation_wilf.stone.20+clients+coordinator@donotuse.com.au',
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
  const suhurb = 'Barangaroo NSW 2000';
  const clientEmail = `automation_${firstName.toLowerCase()}_${rnd}.onboarding+client@donotuse.com.au`;
  const clientPass = 'qaAutomation2021';
  const gender = data.coordinatorContent.addClientForm.gender.male;

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it(`1. ES-T1425 - Create Client Account [Client Managed] (Client Details)
      2. ES-T1486 - View client details
      3. ES-T1482 - Check login as client functionality, Coordinator Dashboard
      4. ES-T1483 - Check Login as Coordinator Functionalit`, () => {
    const name = faker.name.firstName();
    const email = 'a@a.a';
    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        coordinator.wilfStone.email,
        coordinator.wilfStone.password,
      )

      .clickElementOnText(data.coordinatorElements.button, data.coordinatorContent.addClient)
      .clickElementOnText(data.coordinatorElements.addClientForm.selectAccountTypeLabel,
        data.coordinatorContent.addClientForm.clientManaged)
      .clickElementOnText(data.coordinatorElements.addClientForm.formButton,
        data.coordinatorContent.addClientForm.createClient)
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        data.coordinatorContent.addClientForm.alert)

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

      .log('Enter phone')
      .inputTextField(
        data.coordinatorElements.addClientForm.phone,
        phone,
      )

      .log('Type of care')
      .selectTypeOfCare(data.coordinatorContent.addClientForm.typeOfCare.mentalHealth)

      .log('support plan')
      .selectSupportPlan()

      .log('funding source')
      .selectfundingSource()

      .log('Medication')
      .clickElementOnText(data.coordinatorElements.addClientForm.medicationRadio,
        'No')

      .clickElementOnText(data.coordinatorElements.addClientForm.formButton,
        data.coordinatorContent.addClientForm.createClient)
      .verifyTextVisible('account created')

      .clickElementOnText('button', 'Go back to dashboard')

      .searchMemberOfCoordinatorByText(clientEmail)
      .clickFistExpand()
      .verifyClientDetails([clientEmail, phone])
      .clickFistCollapse()
      .verifyClientDetailsNotVisible()

      .clickFirstLogAs()
      .clickLeftMenuAccount()
      .verifyPersonalDetailsSelected()
      .verifyRadioChecked(gender)
      .verifyPersonalDetailsFields([firstName, lastName, '', phone, address, suhurb])

      .clickLogAsCoordinator()

      .searchMemberOfCoordinatorByText(clientEmail)
      .clickFirstLogAs()
      .clickLeftMenuAccount()
      .verifyItemAccountDetailsCompleted(data.coordinatorContent.consumerAccount.personalDetails,
        null, null)

      // My contact
      .clickElementOnText(data.coordinatorElements.consumerAccount.subMenu,
        data.coordinatorContent.consumerAccount.myContacts)

      // My contact form 1
      .clickElementOnText('button',
        data.coordinatorContent.consumerAccount.saveAndContinue)
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        data.coordinatorContent.consumerAccount.myContactsRequired)
      .fillMycontacts(1, name, phone, email)
      .clickAddAnotherContact()

      // My contact form 2
      .clickElementOnText('button',
        data.coordinatorContent.consumerAccount.saveAndContinue)
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        data.coordinatorContent.consumerAccount.myContactsRequired)
      .fillMycontacts(2, name, phone, email)
      .clickAddAnotherContact()

      // My contact form 3
      .clickElementOnText('button',
        data.coordinatorContent.consumerAccount.saveAndContinue)
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        data.coordinatorContent.consumerAccount.myContactsRequired)
      .fillMycontacts(3, name, phone, email)
      .clickAddAnotherContact()

      // My contact form 4
      .clickElementOnText('button',
        data.coordinatorContent.consumerAccount.saveAndContinue)
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        data.coordinatorContent.consumerAccount.myContactsRequired)
      .fillMycontacts(4, name, phone, email)

      .verifyTextNotExist('Add another contact')

      .clickElementOnText('button',
        data.coordinatorContent.consumerAccount.saveAndContinue)

    // Payment
      .verifyTextVisible('Payment details')
      .verifyPaymentRadioChecked()
      .uploadFilePaymentDetails()
      .fillPaymentDetails()
      .clickElementOnText('button', 'Submit')

      .verifyTextVisible('Search workers')
      .clickElementOnText('button', 'Search workers')
      .verifyTextVisible('Search workers')
      .verifyTextVisible('Suburb or postcode')

      .clickLeftMenuAccount()

      .verifyItemAccountDetailsCompleted();
    cy.backToDashboardThenLogout();
  });

  it('ES-T3521 - Create Client Account [Client Managed] (Mental Health - Self managed)', () => {
    const firstNameNDIA = `self${faker.name.firstName()}`;
    const clientEmailNDIA = `auto_self_${firstName.toLowerCase()}_${rnd}.onboarding+client@donotuse.com.au`;
    const name = faker.name.firstName();
    const email = 'a@a.a';
    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        coordinator.wilfStone.email,
        coordinator.wilfStone.password,
      );

    const { alert } = data.coordinatorContent.addClientForm;

    cy.log('Click "Add client"')
      .clickElementOnText(data.coordinatorElements.button, data.coordinatorContent.addClient)

      .log('Select "Client Managed" on client account type')
      .clickElementOnText(data.coordinatorElements.addClientForm.selectAccountTypeLabel,
        data.coordinatorContent.addClientForm.clientManaged)

      .log('Click Create client button without entering any information')
      .clickElementOnText(data.coordinatorElements.addClientForm.formButton,
        data.coordinatorContent.addClientForm.createClient)
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        alert)

      .fillClientEmailAndPassword(clientEmailNDIA, clientPass)

      .fillBasicCoordinatorAccount(firstNameNDIA, lastName, gender, address,
        postcode, phone)
      .fillTypeOfCareForm(data.coordinatorContent.addClientForm.typeOfCare.mentalHealth,
        data.coordinatorContent.addClientForm.supportPlan.no,
        data.coordinatorContent.addClientForm.fundingSource.seft)

      .log('Select Yes on "Does the client require any assistance with medication? "')
      .clickElementOnText(data.coordinatorElements.addClientForm.medicationRadio,
        'Yes')

      .log('Click "Create client" button')
      .clickElementOnText(data.coordinatorElements.addClientForm.formButton,
        data.coordinatorContent.addClientForm.createClient)
      .verifyTextVisible('Client account created')

      .log('Click Login as client button')
      .clickElementOnText(data.coordinatorElements.addClientForm.logInAsClient,
        data.coordinatorContent.addClientForm.logInAsClient)

      .log('Click Account button below the client name')
      .clickLeftMenuAccount()
      .verifyItemAccountDetailsCompleted(data.coordinatorContent.consumerAccount.personalDetails,
        null, null)

      .log('Click My Contacts on the left nav pane')
      .clickElementOnText(data.coordinatorElements.consumerAccount.subMenu,
        data.coordinatorContent.consumerAccount.myContacts)

      .log('Click Save and continue button without entering any information')
      .clickElementOnText('button',
        data.coordinatorContent.consumerAccount.saveAndContinue)
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        data.coordinatorContent.consumerAccount.myContactsRequired)

      .fillMycontacts(1, name, phone, email)

      .log('Leave Add as an emergency contact toggle on')
      .verifyAddAsAnEmergencyContactShouldBe('true')

      .log('Turn on toggle for Authorised to receive information')
      .get('label[for="mat-slide-toggle-2-input"]')
      .click()
      .click()
      .verifyAuthorisedToReceiveInformation('true')

      .log('Click "Add another contact" button')
      .clickAddAnotherContact()

      .log('Click Save and continue button without entering any information')
      .clickElementOnText('button',
        data.coordinatorContent.consumerAccount.saveAndContinue)
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        data.coordinatorContent.consumerAccount.myContactsRequired)

      .log('Fill up second emergency contact  fields (do the same steps like the first emergency contact)')
      .fillMycontacts(2, name, phone, email)

      .log('Click "Add another contact" button')
      .clickAddAnotherContact()

      .log('Click Save and continue button without entering any information')
      .clickElementOnText('button',
        data.coordinatorContent.consumerAccount.saveAndContinue)
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        data.coordinatorContent.consumerAccount.myContactsRequired)

      .log('Fill up third emergency contact fields (do the same steps like the first and second and emergency contacts)')
      .fillMycontacts(3, name, phone, email)

      .log('Click "Add another contact" button')
      .clickAddAnotherContact()

      .log('Click Save and continue button without entering any information')
      .clickElementOnText('button',
        data.coordinatorContent.consumerAccount.saveAndContinue)
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        data.coordinatorContent.consumerAccount.myContactsRequired)

      .log('Fill up fourth emergency contact fields (do the same steps like the first and second emergency contacts)')
      .fillMycontacts(4, name, phone, email)

      .log('Check "Add another contact" button')
      .verifyTextNotExist('Add another contact')

      .log('Click "Save and continue" button')
      .clickElementOnText('button',
        data.coordinatorContent.consumerAccount.saveAndContinue)
      .wait(1000)

    // Payment
      .verifyTextVisible('Payment details')
      .verifyPaymentRadioChecked()
      .uploadFilePaymentDetails()
      .fillPaymentDetails()
      .clickElementOnText('button', 'Submit')

      .verifyTextVisible('Search workers')
      .clickElementOnText('button', 'Search workers')
      .verifyTextVisible('Search workers')
      .verifyTextVisible('Suburb or postcode')

      .clickLeftMenuAccount()

      .verifyItemAccountDetailsCompleted();
  });

  it('ES-T3487 -Create Client Account [Client Managed] (Aged care - HCP)', () => {
    const firstNameNDIA = `hcp${faker.name.firstName()}`;
    const clientEmailNDIA = `auto_hcp_${firstName.toLowerCase()}_${rnd}.onboarding+client@donotuse.com.au`;
    const name = faker.name.firstName();
    const email = 'a@a.a';
    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        coordinator.wilfStone.email,
        coordinator.wilfStone.password,
      );

    const { alert } = data.coordinatorContent.addClientForm;

    cy
      .log('Click "Add client"')
      .clickElementOnText(data.coordinatorElements.button, data.coordinatorContent.addClient)

      .log('Select "Client Managed" on client account type')
      .clickElementOnText(data.coordinatorElements.addClientForm.selectAccountTypeLabel,
        data.coordinatorContent.addClientForm.clientManaged)

      .log('Click Create client button without entering any information')
      .clickElementOnText(data.coordinatorElements.addClientForm.formButton,
        data.coordinatorContent.addClientForm.createClient)
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        alert)

      .fillClientEmailAndPassword(clientEmailNDIA, clientPass)

      .fillBasicCoordinatorAccount(firstNameNDIA, lastName, gender, address,
        postcode, phone)

      .fillTypeOfCareForm(data.coordinatorContent.addClientForm.typeOfCare.agedCare, null,
        'Home Care Package Funding')

      .log('Select Yes on "Does the client require any assistance with medication? "')
      .clickElementOnText(data.coordinatorElements.addClientForm.medicationRadio,
        'Yes')

      .log('Click "Create client" button')
      .clickElementOnText(data.coordinatorElements.addClientForm.formButton,
        data.coordinatorContent.addClientForm.createClient)
      .verifyTextVisible('Client account created')

      .log('Click Login as client button')
      .clickElementOnText(data.coordinatorElements.addClientForm.logInAsClient,
        data.coordinatorContent.addClientForm.logInAsClient)

      .log('Click Account button below the client name')
      .clickLeftMenuAccount()
      .verifyItemAccountDetailsCompleted(data.coordinatorContent.consumerAccount.personalDetails,
        null, null)

      .log('Click My Contacts on the left nav pane')
      .clickElementOnText(data.coordinatorElements.consumerAccount.subMenu,
        data.coordinatorContent.consumerAccount.myContacts)

      .log('Click Save and continue button without entering any information')
      .clickElementOnText('button',
        data.coordinatorContent.consumerAccount.saveAndContinue)
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        data.coordinatorContent.consumerAccount.myContactsRequired)

      .fillMycontacts(1, name, phone, email)

      .log('Leave Add as an emergency contact toggle on')
      .verifyAddAsAnEmergencyContactShouldBe('true')

      .log('Turn on toggle for Authorised to receive information')
      .get('label[for="mat-slide-toggle-2-input"]')
      .click()
      .click()
      .verifyAuthorisedToReceiveInformation('true')

      .log('Click "Add another contact" button')
      .clickAddAnotherContact()

      .log('Click Save and continue button without entering any information')
      .clickElementOnText('button',
        data.coordinatorContent.consumerAccount.saveAndContinue)
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        data.coordinatorContent.consumerAccount.myContactsRequired)

      .log('Fill up second emergency contact  fields (do the same steps like the first emergency contact)')
      .fillMycontacts(2, name, phone, email)

      .log('Click "Add another contact" button')
      .clickAddAnotherContact()

      .log('Click Save and continue button without entering any information')
      .clickElementOnText('button',
        data.coordinatorContent.consumerAccount.saveAndContinue)
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        data.coordinatorContent.consumerAccount.myContactsRequired)

      .log('Fill up third emergency contact fields (do the same steps like the first and second and emergency contacts)')
      .fillMycontacts(3, name, phone, email)

      .log('Click "Add another contact" button')
      .clickAddAnotherContact()

      .log('Click Save and continue button without entering any information')
      .clickElementOnText('button',
        data.coordinatorContent.consumerAccount.saveAndContinue)
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        data.coordinatorContent.consumerAccount.myContactsRequired)

      .log('Fill up fourth emergency contact fields (do the same steps like the first and second emergency contacts)')
      .fillMycontacts(4, name, phone, email)

      .log('Check "Add another contact" button')
      .verifyTextNotExist('Add another contact')

      .log('Click "Save and continue" button')
      .clickElementOnText('button',
        data.coordinatorContent.consumerAccount.saveAndContinue)
      .wait(1000)

      .log('Check Payment Details page')
      .verifyTextVisible('Payment details')
      .verifyPaymentRadioChecked('Yes', 'Home Care Package', null)

      .fillHCPInvoicesForm()

      .log('Click "Submit" button')
      .clickElementOnText('button', 'Submit')

      .log('Click Search workers button')
      .verifyTextVisible('Search workers')
      .clickElementOnText('button', 'Search workers')
      .verifyTextVisible('Search workers')
      .verifyTextVisible('Suburb or postcode')

      .log('Click Account button below the client name')
      .clickLeftMenuAccount()

      .log('Check Account verification on the left nav pane')
      .verifyItemAccountDetailsCompleted();
  });

  it('ES-T3522 - Create Client Account [Client Managed] (Mental Health - NDIA managed)', () => {
    const firstNameNDIA = `ndia${faker.name.firstName()}`;
    const clientEmailNDIA = `auto_ndia_${firstName.toLowerCase()}_${rnd}.onboarding+client@donotuse.com.au`;
    const name = faker.name.firstName();
    const email = 'a@a.a';
    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        coordinator.wilfStone.email,
        coordinator.wilfStone.password,
      );

    const { alert } = data.coordinatorContent.addClientForm;

    cy
      .log('Click "Add client"')
      .clickElementOnText(data.coordinatorElements.button, data.coordinatorContent.addClient)

      .log('Select "Client Managed" on client account type')
      .clickElementOnText(data.coordinatorElements.addClientForm.selectAccountTypeLabel,
        data.coordinatorContent.addClientForm.clientManaged)

      .log('Click Create client button without entering any information')
      .clickElementOnText(data.coordinatorElements.addClientForm.formButton,
        data.coordinatorContent.addClientForm.createClient)
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        alert)

      .fillClientEmailAndPassword(clientEmailNDIA, clientPass)

      .fillBasicCoordinatorAccount(firstNameNDIA, lastName, gender, address,
        postcode, phone)

      .fillTypeOfCareForm(data.coordinatorContent.addClientForm.typeOfCare.mentalHealth,
        data.coordinatorContent.addClientForm.supportPlan.no,
        data.coordinatorContent.addClientForm.fundingSource.ndia)

      .log('Select No on "Does the client require any assistance with medication? "')
      .clickElementOnText(data.coordinatorElements.addClientForm.medicationRadio,
        'No')

      .log('Click "Create client" button')
      .clickElementOnText(data.coordinatorElements.addClientForm.formButton,
        data.coordinatorContent.addClientForm.createClient)
      .verifyTextVisible('Client account created')

      .log('Click Login as client button')
      .clickElementOnText(data.coordinatorElements.addClientForm.logInAsClient,
        data.coordinatorContent.addClientForm.logInAsClient)

      .log('Click Account button below the client name')
      .clickLeftMenuAccount()
      .verifyItemAccountDetailsCompleted(data.coordinatorContent.consumerAccount.personalDetails,
        null, null)

      .log('Click My Contacts on the left nav pane')
      .clickElementOnText(data.coordinatorElements.consumerAccount.subMenu,
        data.coordinatorContent.consumerAccount.myContacts)

      .log('Click Save and continue button without entering any information')
      .clickElementOnText('button',
        data.coordinatorContent.consumerAccount.saveAndContinue)
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        data.coordinatorContent.consumerAccount.myContactsRequired)

      .fillMycontacts(1, name, phone, email)

      .log('Leave Add as an emergency contact toggle on')
      .verifyAddAsAnEmergencyContactShouldBe('true')

      .log('Turn on toggle for Authorised to receive information')
      .get('label[for="mat-slide-toggle-2-input"]')
      .click()
      .click()
      .verifyAuthorisedToReceiveInformation('true')

      .log('Click "Add another contact" button')
      .clickAddAnotherContact()

      .log('Click Save and continue button without entering any information')
      .clickElementOnText('button',
        data.coordinatorContent.consumerAccount.saveAndContinue)
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        data.coordinatorContent.consumerAccount.myContactsRequired)

      .log('Fill up second emergency contact  fields (do the same steps like the first emergency contact)')
      .fillMycontacts(2, name, phone, email)

      .log('Click "Add another contact" button')
      .clickAddAnotherContact()

      .log('Click Save and continue button without entering any information')
      .clickElementOnText('button',
        data.coordinatorContent.consumerAccount.saveAndContinue)
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        data.coordinatorContent.consumerAccount.myContactsRequired)

      .log('Fill up third emergency contact fields (do the same steps like the first and second and emergency contacts)')
      .fillMycontacts(3, name, phone, email)

      .log('Click "Add another contact" button')
      .clickAddAnotherContact()

      .log('Click Save and continue button without entering any information')
      .clickElementOnText('button',
        data.coordinatorContent.consumerAccount.saveAndContinue)
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        data.coordinatorContent.consumerAccount.myContactsRequired)

      .log('Fill up fourth emergency contact fields (do the same steps like the first and second emergency contacts)')
      .fillMycontacts(4, name, phone, email)

      .log('Check "Add another contact" button')
      .verifyTextNotExist('Add another contact')

      .log('Click "Save and continue" button')
      .clickElementOnText('button',
        data.coordinatorContent.consumerAccount.saveAndContinue)
      .wait(1000)

      .verifyTextVisible('Payment details')
      .verifyPaymentRadioChecked('Yes', 'NDIS', 'NDIA managed')
      .fillInvoicesForm()
      .clickElementOnText('button', 'Submit')
      .clickOkGotIt()

      .verifyItemAccountDetailsCompleted();
  });

  it('ES-T3519 - Create Client Account [Client Managed] (Mental Health - Plan managed)', () => {
    const firstNameNDIA = `plan${faker.name.firstName()}`;
    const clientEmailNDIA = `auto_plan_${firstName.toLowerCase()}_${rnd}.onboarding+client@donotuse.com.au`;
    const name = faker.name.firstName();
    const email = 'a@a.a';
    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        coordinator.wilfStone.email,
        coordinator.wilfStone.password,
      );

    const { alert } = data.coordinatorContent.addClientForm;

    cy.log('Click "Add client"')
      .clickElementOnText(data.coordinatorElements.button, data.coordinatorContent.addClient)

      .log('Select "Client Managed" on client account type')
      .clickElementOnText(data.coordinatorElements.addClientForm.selectAccountTypeLabel,
        data.coordinatorContent.addClientForm.clientManaged)

      .log('Click Create client button without entering any information')
      .clickElementOnText(data.coordinatorElements.addClientForm.formButton,
        data.coordinatorContent.addClientForm.createClient)
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        alert)

      .fillClientEmailAndPassword(clientEmailNDIA, clientPass)

      .fillBasicCoordinatorAccount(firstNameNDIA, lastName, gender, address,
        postcode, phone)
      .fillTypeOfCareForm(data.coordinatorContent.addClientForm.typeOfCare.mentalHealth,
        data.coordinatorContent.addClientForm.supportPlan.no,
        data.coordinatorContent.addClientForm.fundingSource.plan)

      .log('Select No on "Does the client require any assistance with medication? "')
      .clickElementOnText(data.coordinatorElements.addClientForm.medicationRadio,
        'No')

      .log('Click "Create client" button')
      .clickElementOnText(data.coordinatorElements.addClientForm.formButton,
        data.coordinatorContent.addClientForm.createClient)
      .verifyTextVisible('Client account created')

      .log('Click Login as client button')
      .clickElementOnText(data.coordinatorElements.addClientForm.logInAsClient,
        data.coordinatorContent.addClientForm.logInAsClient)

      .log('Click Account button below the client name')
      .clickLeftMenuAccount()
      .verifyItemAccountDetailsCompleted(data.coordinatorContent.consumerAccount.personalDetails,
        null, null)

      .log('Click My Contacts on the left nav pane')
      .clickElementOnText(data.coordinatorElements.consumerAccount.subMenu,
        data.coordinatorContent.consumerAccount.myContacts)

      .log('Click Save and continue button without entering any information')
      .clickElementOnText('button',
        data.coordinatorContent.consumerAccount.saveAndContinue)
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        data.coordinatorContent.consumerAccount.myContactsRequired)

      .fillMycontacts(1, name, phone, email)

      .log('Leave Add as an emergency contact toggle on')
      .verifyAddAsAnEmergencyContactShouldBe('true')

      .log('Turn on toggle for Authorised to receive information')
      .get('label[for="mat-slide-toggle-2-input"]')
      .click()
      .click()
      .verifyAuthorisedToReceiveInformation('true')

      .log('Click "Add another contact" button')
      .clickAddAnotherContact()

      .log('Click Save and continue button without entering any information')
      .clickElementOnText('button',
        data.coordinatorContent.consumerAccount.saveAndContinue)
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        data.coordinatorContent.consumerAccount.myContactsRequired)

      .log('Fill up second emergency contact  fields (do the same steps like the first emergency contact)')
      .fillMycontacts(2, name, phone, email)

      .log('Click "Add another contact" button')
      .clickAddAnotherContact()

      .log('Click Save and continue button without entering any information')
      .clickElementOnText('button',
        data.coordinatorContent.consumerAccount.saveAndContinue)
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        data.coordinatorContent.consumerAccount.myContactsRequired)

      .log('Fill up third emergency contact fields (do the same steps like the first and second and emergency contacts)')
      .fillMycontacts(3, name, phone, email)

      .log('Click "Add another contact" button')
      .clickAddAnotherContact()

      .log('Click Save and continue button without entering any information')
      .clickElementOnText('button',
        data.coordinatorContent.consumerAccount.saveAndContinue)
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        data.coordinatorContent.consumerAccount.myContactsRequired)

      .log('Fill up fourth emergency contact fields (do the same steps like the first and second emergency contacts)')
      .fillMycontacts(4, name, phone, email)

      .log('Check "Add another contact" button')
      .verifyTextNotExist('Add another contact')

      .log('Click "Save and continue" button')
      .clickElementOnText('button',
        data.coordinatorContent.consumerAccount.saveAndContinue)
      .wait(1000)

    // Payment
      .verifyTextVisible('Payment details')
      .verifyPaymentRadioChecked('Yes', 'NDIS', 'Plan managed')
      .fillPlanPaymentDetails()
      .clickElementOnText('button', 'Submit')

      .verifyTextVisible('Search workers')
      .clickElementOnText('button', 'Search workers')
      .verifyTextVisible('Search workers')
      .verifyTextVisible('Suburb or postcode')

      .clickLeftMenuAccount()

      .verifyItemAccountDetailsCompleted();
  });

  it('ES-T3523 - Create Client Account [Client Managed] (Mental Health - Other)', () => {
    const firstNameNDIA = `other${faker.name.firstName()}`;
    const clientEmailNDIA = `auto_other_${firstName.toLowerCase()}_${rnd}.onboarding+client@donotuse.com.au`;
    const name = faker.name.firstName();
    const email = 'a@a.a';
    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        coordinator.wilfStone.email,
        coordinator.wilfStone.password,
      );

    const { alert } = data.coordinatorContent.addClientForm;

    cy
      .log('Click "Add client"')
      .clickElementOnText(data.coordinatorElements.button, data.coordinatorContent.addClient)

      .log('Select "Client Managed" on client account type')
      .clickElementOnText(data.coordinatorElements.addClientForm.selectAccountTypeLabel,
        data.coordinatorContent.addClientForm.clientManaged)

      .log('Click Create client button without entering any information')
      .clickElementOnText(data.coordinatorElements.addClientForm.formButton,
        data.coordinatorContent.addClientForm.createClient)
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        alert)

      .fillClientEmailAndPassword(clientEmailNDIA, clientPass)

      .fillBasicCoordinatorAccount(firstNameNDIA, lastName, gender, address,
        postcode, phone)

      .fillTypeOfCareForm(data.coordinatorContent.addClientForm.typeOfCare.mentalHealth,
        data.coordinatorContent.addClientForm.supportPlan.yesNotInvovle,
        data.coordinatorContent.addClientForm.fundingSource.other)

      .log('Select Yes on "Does the client require any assistance with medication? "')
      .clickElementOnText(data.coordinatorElements.addClientForm.medicationRadio,
        'Yes')

      .log('Click "Create client" button')
      .clickElementOnText(data.coordinatorElements.addClientForm.formButton,
        data.coordinatorContent.addClientForm.createClient)
      .verifyTextVisible('Client account created')

      .log('Click Login as client button')
      .clickElementOnText(data.coordinatorElements.addClientForm.logInAsClient,
        data.coordinatorContent.addClientForm.logInAsClient)

      .log('Click Account button below the client name')
      .clickLeftMenuAccount()
      .verifyItemAccountDetailsCompleted(data.coordinatorContent.consumerAccount.personalDetails,
        null, null)

      .log('Click My Contacts on the left nav pane')
      .clickElementOnText(data.coordinatorElements.consumerAccount.subMenu,
        data.coordinatorContent.consumerAccount.myContacts)

      .log('Click Save and continue button without entering any information')
      .clickElementOnText('button',
        data.coordinatorContent.consumerAccount.saveAndContinue)
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        data.coordinatorContent.consumerAccount.myContactsRequired)

      .fillMycontacts(1, name, phone, email)

      .log('Leave Add as an emergency contact toggle on')
      .verifyAddAsAnEmergencyContactShouldBe('true')

      .log('Turn on toggle for Authorised to receive information')
      .get('label[for="mat-slide-toggle-2-input"]')
      .click()
      .click()
      .verifyAuthorisedToReceiveInformation('true')

      .log('Click "Add another contact" button')
      .clickAddAnotherContact()

      .log('Click Save and continue button without entering any information')
      .clickElementOnText('button',
        data.coordinatorContent.consumerAccount.saveAndContinue)
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        data.coordinatorContent.consumerAccount.myContactsRequired)

      .log('Fill up second emergency contact  fields (do the same steps like the first emergency contact)')
      .fillMycontacts(2, name, phone, email)

      .log('Click "Add another contact" button')
      .clickAddAnotherContact()

      .log('Click Save and continue button without entering any information')
      .clickElementOnText('button',
        data.coordinatorContent.consumerAccount.saveAndContinue)
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        data.coordinatorContent.consumerAccount.myContactsRequired)

      .log('Fill up third emergency contact fields (do the same steps like the first and second and emergency contacts)')
      .fillMycontacts(3, name, phone, email)

      .log('Click "Add another contact" button')
      .clickAddAnotherContact()

      .log('Click Save and continue button without entering any information')
      .clickElementOnText('button',
        data.coordinatorContent.consumerAccount.saveAndContinue)
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        data.coordinatorContent.consumerAccount.myContactsRequired)

      .log('Fill up fourth emergency contact fields (do the same steps like the first and second emergency contacts)')
      .fillMycontacts(4, name, phone, email)

      .log('Check "Add another contact" button')
      .verifyTextNotExist('Add another contact')

      .log('Click "Save and continue" button')
      .clickElementOnText('button',
        data.coordinatorContent.consumerAccount.saveAndContinue)
      .wait(1000)

    // Payment
      .verifyTextVisible('Payment details')
      .verifyPaymentRadioChecked('Yes', 'Other', null)

      .fillInvoicesForm()
      .clickElementOnText('button', 'Submit')
      .clickOkGotIt()

      .verifyItemAccountDetailsCompleted();
  });
});
