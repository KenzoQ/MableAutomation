import faker from 'faker/locale/en_AU';
import * as data from '../../../fixtures/test-data.json';

describe('Coordinator - part 3', () => {
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
    org: {
      email: 'automation_lennon.garnet.20+coordinators+orgadmin@donotuse.com.au',
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

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('ES-T1426 - Create Client Account [Coordinator Managed] (Client Details)', () => {
    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        coordinator.wilfStone.email,
        coordinator.wilfStone.password,
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

  it('ES-T3478 - Create Client Account [Coordinator Managed] (Disability support - Self managed)', () => {
    const firstNameNDIA = `sm${faker.name.firstName()}`;
    const name = faker.name.firstName();
    const email = 'a@a.a';
    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        coordinator.wilfStone.email,
        coordinator.wilfStone.password,
      );

    const { alert } = data.coordinatorContent.addClientForm;
    alert.email = null;
    alert.password = null;
    alert.phone = null;
    cy
      .clickElementOnText(data.coordinatorElements.button, data.coordinatorContent.addClient)
      // .clickElementOnText(data.coordinatorElements.addClientForm.selectAccountTypeLabel,
      //   data.coordinatorContent.addClientForm.clientManaged)
      .clickElementOnText(data.coordinatorElements.addClientForm.formButton,
        data.coordinatorContent.addClientForm.createClient)
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        alert)

    // Fill form
      .fillBasicCoordinatorAccount(firstNameNDIA, lastName, gender, address,
        postcode, null)
      .fillTypeOfCareForm(data.coordinatorContent.addClientForm.typeOfCare.disabilitySupport,
        data.coordinatorContent.addClientForm.supportPlan.no,
        data.coordinatorContent.addClientForm.fundingSource.seft)

      .log('Medication')
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

  it('ES-T3480 - Create Client Account [Coordinator Managed] (Disability support - NDIA managed)', () => {
    const firstNameNDIA = `ndia${faker.name.firstName()}`;
    const name = faker.name.firstName();
    const email = 'a@a.a';
    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        coordinator.wilfStone.email,
        coordinator.wilfStone.password,
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
      .fillBasicCoordinatorAccount(firstNameNDIA, lastName, gender, address,
        postcode, null)
      .fillTypeOfCareForm(data.coordinatorContent.addClientForm.typeOfCare.disabilitySupport,
        data.coordinatorContent.addClientForm.supportPlan.no,
        data.coordinatorContent.addClientForm.fundingSource.ndia)

      .log('Medication')
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
      .verifyPaymentRadioChecked('Yes', 'NDIS', 'NDIA managed')
      .fillInvoicesForm()
      .clickElementOnText('button', 'Submit')
      .clickOkGotIt()

      .verifyItemAccountDetailsCompleted();
  });

  it('ES-T2239 - Create Client Account [Coordinator Managed] (Disability support - Plan managed)', () => {
    const firstNameNDIA = `plan${faker.name.firstName()}`;
    const name = faker.name.firstName();
    const email = 'a@a.a';
    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        coordinator.wilfStone.email,
        coordinator.wilfStone.password,
      );

    const { alert } = data.coordinatorContent.addClientForm;
    alert.email = null;
    alert.password = null;
    alert.phone = null;
    cy
      .clickElementOnText(data.coordinatorElements.button, data.coordinatorContent.addClient)
      // .clickElementOnText(data.coordinatorElements.addClientForm.selectAccountTypeLabel,
      //   data.coordinatorContent.addClientForm.clientManaged)
      .clickElementOnText(data.coordinatorElements.addClientForm.formButton,
        data.coordinatorContent.addClientForm.createClient)
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        alert)

    // Fill form
      .fillBasicCoordinatorAccount(firstNameNDIA, lastName, gender, address,
        postcode, null)
      .fillTypeOfCareForm(data.coordinatorContent.addClientForm.typeOfCare.disabilitySupport,
        data.coordinatorContent.addClientForm.supportPlan.no,
        data.coordinatorContent.addClientForm.fundingSource.plan)

      .log('Medication')
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

  it('ES-T3481 - Create Client Account [Coordinator Managed] (Disability support - Other)', () => {
    const firstNameNDIA = `other${faker.name.firstName()}`;
    const name = faker.name.firstName();
    const email = 'a@a.a';
    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        coordinator.wilfStone.email,
        coordinator.wilfStone.password,
      );

    const { alert } = data.coordinatorContent.addClientForm;
    alert.email = null;
    alert.password = null;
    alert.phone = null;
    cy
      .clickElementOnText(data.coordinatorElements.button, data.coordinatorContent.addClient)
      // .clickElementOnText(data.coordinatorElements.addClientForm.selectAccountTypeLabel,
      //   data.coordinatorContent.addClientForm.clientManaged)
      .clickElementOnText(data.coordinatorElements.addClientForm.formButton,
        data.coordinatorContent.addClientForm.createClient)
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        alert)

    // Fill form
      .fillBasicCoordinatorAccount(firstNameNDIA, lastName, gender, address,
        postcode, null)
      .fillTypeOfCareForm(data.coordinatorContent.addClientForm.typeOfCare.disabilitySupport,
        data.coordinatorContent.addClientForm.supportPlan.no,
        data.coordinatorContent.addClientForm.fundingSource.other)

      .log('Medication')
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
      .verifyPaymentRadioChecked('Yes', 'Other', null)
      .fillInvoicesForm()
      .clickElementOnText('button', 'Submit')
      .clickOkGotIt()

      .verifyItemAccountDetailsCompleted();
  });

  it('ES-T3482 - Create Client Account [Coordinator Managed] (Other - Credit card)', () => {
    const firstNameNDIA = `other${faker.name.firstName()}`;
    const name = faker.name.firstName();
    const email = 'a@a.a';
    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        coordinator.wilfStone.email,
        coordinator.wilfStone.password,
      );

    const { alert } = data.coordinatorContent.addClientForm;
    alert.email = null;
    alert.password = null;
    alert.phone = null;

    cy
      .clickElementOnText(data.coordinatorElements.button, data.coordinatorContent.addClient)
      // .clickElementOnText(data.coordinatorElements.addClientForm.selectAccountTypeLabel,
      //   data.coordinatorContent.addClientForm.clientManaged)
      .clickElementOnText(data.coordinatorElements.addClientForm.formButton,
        data.coordinatorContent.addClientForm.createClient)
      .verifyElementContainsTextObjectList(data.coordinatorElements.addClientForm.invalidFields,
        alert)

    // Fill form
      .fillBasicCoordinatorAccount(firstNameNDIA, lastName, gender, address,
        postcode, null)
      .fillTypeOfCareForm(data.coordinatorContent.addClientForm.typeOfCare.other,
        null,
        null)
      .log('Specify')
      .enterOtherSpecify()

      .log('Medication')
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
      .log('Check Payment Details page')
      .verifyTextVisible('Payment details')

      .log('Click "No" - Are you using government funding to pay for this support?')
      .clickElementOnText('label.radioBtn span', 'No')
      .wait(1000)

      .log('Click "Debit card" - How would you like to pay?')
      .selectRadioBtnByText('Credit card')
      .fillCreditForm()
      .wait(100000)
      .clickElementOnText('button', 'Submit')

      .verifyTextVisible('Search workers')
      .clickElementOnText('button', 'Search workers')
      .verifyTextVisible('Search workers')
      .verifyTextVisible('Suburb or postcode')

      .clickLeftMenuAccount()

      .verifyItemAccountDetailsCompleted();
  });

  it('ES-T2419 - Assign coordinator to organisation validation', () => {
    const name = 'Addy Happy';
    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        data.dashboardAccount.adminAccount.email,
        data.dashboardAccount.adminAccount.password,
      );

    cy
      .searchUserByAdmin(name)
      .wait(2000)
      .clickEditUserByIndex()
      .verifyTextVisible(`Edit ${name}`)
      .get('[name="user[organisation_name]"]')
      .invoke('prop', 'readonly')
      .should('be.equal', true);
  });
});
