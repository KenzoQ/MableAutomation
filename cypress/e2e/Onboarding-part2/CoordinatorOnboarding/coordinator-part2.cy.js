import faker from 'faker/locale/en_AU';
import * as data from '../../../fixtures/test-data.json';

describe('Coordinator - part 2', () => {
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

  const clientPass = 'qaAutomation2021';
  const gender = data.coordinatorContent.addClientForm.gender.male;

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('ES-T3483 - Create Client Account [Client Managed] (Post surgery - Debit card)', () => {
    const firstNameNDIA = `surgery${faker.name.firstName()}`;
    const clientEmailNDIA = `auto_surgery_${firstName.toLowerCase()}_${rnd}.onboarding+client@donotuse.com.au`;
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
      .fillTypeOfCareForm(data.coordinatorContent.addClientForm.typeOfCare.postSurgery,
        null,
        null)

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
      .log('Check Payment Details page')
      .verifyTextVisible('Payment details')

      .log('Click "No" - Are you using government funding to pay for this support?')
      .clickElementOnText('label.radioBtn span', 'No')
      .wait(1000)

      .log('Click "Debit card" - How would you like to pay?')
      .selectRadioBtnByText('Direct debit')
      .fillDebitForm()
      .clickElementOnText('button', 'Submit')

      .verifyTextVisible('Search workers')
      .clickElementOnText('button', 'Search workers')
      .verifyTextVisible('Search workers')
      .verifyTextVisible('Suburb or postcode')

      .clickLeftMenuAccount()

      .verifyItemAccountDetailsCompleted();
  });

  it('ES-T3486 - Create Client Account [Client Managed] (Aged care - Other)', () => {
    const firstNameNDIA = `age${faker.name.firstName()}`;
    const clientEmailNDIA = `auto_age_${firstName.toLowerCase()}_${rnd}.onboarding+client@donotuse.com.au`;
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
        'Other')

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
      .verifyPaymentRadioChecked('Yes', 'Other', null)

      .fillInvoicesForm()
      .clickElementOnText('button', 'Submit')
      .clickOkGotIt()

      .verifyItemAccountDetailsCompleted();
  });

  it('ES-T1432 - View Compliance Terms and Conditions Empty State', () => {
    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        coordinator.noTerm.email,
        coordinator.noTerm.password,
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
      .verifyTextVisible(data.coordinatorContent.incidentsSupportNotes.terms.noTermsCoordinator);
  });

  it('ES-T1433 - View Compliance with Terms and Conditions', () => {
    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        coordinator.wilfStone.email,
        coordinator.wilfStone.password,
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
        data.coordinatorContent.incidentsSupportNotes.terms.rqBanner);
  });

  it('ES-T1434 - View Compliance: Support worker details', () => {
    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        coordinator.wilfStone.email,
        coordinator.wilfStone.password,
      )
      .clickElementOnText(data.coordinatorElements.mainMenu,
        data.coordinatorContent.mainMenu.compliance)
      .clickElementOnText(data.coordinatorElements.mainMenu,
        data.coordinatorContent.mainMenu.compliance)
      .verifyTextVisible('Terms and Conditions')
      .verifyTextVisible('Support worker details')

      .clickElementOnText('.mat-tab-links a', 'Support worker details')
      .waitAppLoaderNotVisible()
      .moveAndCheckSupportWorkerDetailsInCompliance();
  });

  it('ES-T1518 - View Compliance: Support worker details Empty State', () => {
    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        coordinator.noTerm.email,
        coordinator.noTerm.password,
      )
      .clickElementOnText(data.coordinatorElements.mainMenu,
        data.coordinatorContent.mainMenu.compliance)

      .verifyElementVisible(data.coordinatorElements.incidentsSupportNotes.page)

      .verifyElementContainsTextObjectList(data.coordinatorElements.incidentsSupportNotes.tabs,
        data.coordinatorContent.incidentsSupportNotes.tabs)

      .clickElementOnText(data.coordinatorElements.incidentsSupportNotes.tabs,
        data.coordinatorContent.incidentsSupportNotes.tabs.supportWorkerDetails)

      .verifyElementVisible(
        data.coordinatorElements.incidentsSupportNotes.supportWorkerDetails.page)

      .verifyTextVisible(
        data.coordinatorContent.incidentsSupportNotes.supportWorkerDetails.noSupportWorker);
  });

  it('ES-T1529 - [Client Managed] Create Account Duplicate Email validation', () => {
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
        coordinator.wilfStone.email,
        coordinator.wilfStone.password,
      )

      .clickElementOnText(data.coordinatorElements.button, data.coordinatorContent.addClient)
      .clickElementOnText(data.coordinatorElements.addClientForm.selectAccountTypeLabel,
        data.coordinatorContent.addClientForm.clientManaged)

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

  it('ES-T1481 - Check Search Functionality', () => {
    const invalidValue = '123showmethemoney';
    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        coordinator.wilfStone.email,
        coordinator.wilfStone.password,
      )

      .searchMemberOfCoordinatorByText(invalidValue)
      .verifyTextVisible(`No matches for "${invalidValue}"`)
      .searchMemberOfCoordinatorByText()
      .verifyElementVisible(data.coordinatorElements.logAsButton)
      .clickElementOnText('button', 'Back')
      .verifySearchBeEmpty();
  });

  it('ES-T2253 - Verify that the create client is unsuccessful if there is restrictive practices', () => {
    const restrictiveEmail = `restrictive_${firstName.toLowerCase()}_${rnd}.onboarding+client@donotuse.com.au`;
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
        restrictiveEmail,
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
      .selectSupportPlan(data.coordinatorContent.addClientForm.supportPlan.yesInvovle)

      .log('funding source')
      .selectfundingSource()

      .log('Medication')
      .clickElementOnText(data.coordinatorElements.addClientForm.medicationRadio,
        'No')

      .clickElementOnText(data.coordinatorElements.addClientForm.formButton,
        data.coordinatorContent.addClientForm.createClient)
      .verifyTextVisible('Can\'t create client')
      .verifyTextVisible('Restrictive practices must be delivered by a Registered Provider who is registered with the NDIS Commission to deliver specialist behaviour support. These rules are stated in the NDIS Legislation. For more information please visit the NDIS Quality and Safeguard commission website or contact us at')
      .verifyTextVisible('Call 1300 73 65 73.');
  });
});
