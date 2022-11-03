/* eslint-disable no-restricted-syntax */
import * as data from '../../fixtures/test-data.json';

Cypress.Commands.add('goToSetUpAccount', () => {
  cy.log('Click back btn')
    .clickElementOnText(
      '#stepsAction button',
      'Back',
    )
    .wait(2000)

    .log('Click Back to dashboard')
    .clickElementOnText(
      'button span',
      'Back to dashboard',
    )
    .wait(2000)

    .log('Click Resume account setup')
    .verifyElementVisible('app-navigation-old')
    .clickElement(
      '#urgentCallToAction a',
    )
    .wait(1000);
});

Cypress.Commands.add('uncheckOptions', () => {
  cy
    .wait(2000)
    .get('body')
    .then($body => {
      if ($body.find('mat-checkbox.mat-checkbox-checked label input').length > 0) {
        cy.get('mat-checkbox.mat-checkbox-checked label input')
          .click({ multiple: true, force: true });
      }
    });
});

Cypress.Commands.add('selectDateOfBirth', (day = 1, month = 1, year = 1969) => {
  cy
    .wait(2000)
    .get(`${data.coordinatorElements.addClientForm.birthDateSelector} select`)
    .eq(0)
    .select(day)
    .get(`${data.coordinatorElements.addClientForm.birthDateSelector} select`)
    .eq(1)
    .select(month)
    .get(`${data.coordinatorElements.addClientForm.birthDateSelector} select`)
    .eq(2)
    .select(year.toString());
});

Cypress.Commands.add('selectTypeOfCare', (text = data.coordinatorContent.addClientForm.typeOfCare.disabilitySupport) => {
  cy
    .wait(2000)
    .get(`${data.coordinatorElements.addClientForm.typeOfCare}`)
    .select(text);
});

Cypress.Commands.add('selectSupportPlan', (text = data.coordinatorContent.addClientForm.supportPlan.no) => {
  cy
    .wait(2000)
    .get(`${data.coordinatorElements.addClientForm.supportPlanSelector}`)
    .select(text);
});

Cypress.Commands.add('selectfundingSource', (text = data.coordinatorContent.addClientForm.fundingSource.seft) => {
  cy
    .wait(2000)
    .get(`${data.coordinatorElements.addClientForm.fundingSourceSelector}`)
    .select(text);
});

Cypress.Commands.add('searchMemberOfCoordinatorByText', (name = 'Burgundy') => {
  cy
    .wait(1000)
    .inputTextField(data.coordinatorElements.searchField, name)
    .clickElement(data.coordinatorElements.searchButton);
});

Cypress.Commands.add('clickFirstLogAs', (isForce = false) => {
  cy
    .wait(1000)
    .get(data.coordinatorElements.logAsButton)
    .first()
    .click({ force: isForce });
});

Cypress.Commands.add('clickLeftMenuAccount', () => {
  cy
    .wait(1000)
    .clickElement(data.coordinatorElements.editProfileButton);
});

Cypress.Commands.add('verifyRadioChecked', (text = data.coordinatorContent.addClientForm.gender.male) => {
  cy
    .get('.radioBtn').contains(text).parent().find('input')
    .then(($el) => cy.wrap($el).should('be.checked'));
});

Cypress.Commands.add('verifyPersonalDetailsSelected', () => {
  cy
    .get('li.selected')
    .contains(data.coordinatorContent.consumerAccount.personalDetails)
    .should('be.visible');
});

Cypress.Commands.add('clickLogAsCoordinator', (isForce = false) => {
  cy
    .get('button')
    .contains('Login as Coordinator')
    .click({ force: isForce });
});

Cypress.Commands.add('clickFistExpand', (isForce = false) => {
  cy.wait(1000)
    .get('button[aria-label = "expand"]')
    .first()
    .click({ force: isForce });
});

Cypress.Commands.add('clickFistCollapse', (isForce = false) => {
  cy.wait(1000)
    .get('button[aria-label = "collapse"]')
    .first()
    .click({ force: isForce });
});

Cypress.Commands.add('verifyPersonalDetailsFields', (list = ['Burgundy', 'Rickey', '',
  '0491570110', '13th Ave', 'Perth SA 6000']) => {
  cy
    .clickElementOnText(data.coordinatorElements.consumerAccount.subMenu,
      data.coordinatorContent.consumerAccount.personalDetails);
  // cy.get('input[type="text"]').each(($item, index) => {
  //   if (index < list.length) {
  //     cy.wrap($item).should('have.value', list[index]);
  //   }
  // });
  cy.get('input[formcontrolname="firstName"]').should('have.value', list[0])
    .get('input[formcontrolname="lastName"]').should('have.value', list[1])
    .get('input[formcontrolname="preferredName"]')
    .should('have.value', list[2])
    .get('input[formcontrolname="contactPhone"]')
    .should('have.value', list[3])
    .get('input[formcontrolname="participantAddressLine1"]')
    .should('have.value', list[4])
    .get('input[aria-describedby="suggestionsHelp"]')
    .should('have.value', list[5]);
});

Cypress.Commands.add('verifyClientDetails', (list = ['burgundy.rickey@mable.com.au', '0491570110']) => {
  cy.wait(1000);
  cy.get('.panel .clientDetails p>a').each(($item, index) => {
    if (index < list.length) {
      cy.wrap($item).should('have.text', list[index]);
    }
  });
});

Cypress.Commands.add('verifyClientDetailsNotVisible', () => {
  cy.wait(1000);
  cy.get('.panel .clientDetails p>a').should('not.exist');
});

Cypress.Commands.add('verifySearchBeEmpty', () => {
  cy.wait(1000);
  cy.get('app-search-user-input input')
    .should('be.empty');
});

Cypress.Commands.add('verifyEmergencyToggleIsOn', (isOn = true) => {
  cy
    .get(`${data.coordinatorElements.consumerAccount.myContacts.emergencyToggle} input`)
    .then(($el) => {
      if (isOn) {
        cy.wrap($el).should('be.checked');
      } else {
        cy.wrap($el).should('not.be.checked');
      }
    });
});

Cypress.Commands.add('verifyAuthorisedToggleIsOn', (isOn = true) => {
  cy
    .get(`${data.coordinatorElements.consumerAccount.myContacts.authorisedToggle} input`)
    .then(($el) => {
      if (isOn) {
        cy.wrap($el).should('be.checked');
      } else {
        cy.wrap($el).should('not.be.checked');
      }
    });
});

Cypress.Commands.add('toggleEmergencyTo', (isOn = true, index = 0) => {
  cy
    .get(`${data.coordinatorElements.consumerAccount.myContacts.emergencyToggle} input`)
    .eq(index)
    .invoke('attr', 'aria-checked').then(($isDif) => {
      cy.log(`Toggle: ${$isDif}`);
      if ($isDif !== isOn.toString()) {
        cy.get(data.coordinatorElements.consumerAccount.myContacts.emergencyToggle)
          .eq(index)
          .click();
      }
    });
});

Cypress.Commands.add('toggleAuthorisedTo', (isOn = true, index = 0) => {
  cy
    .get(`${data.coordinatorElements.consumerAccount.myContacts.authorisedToggle} input`)
    .eq(index)
    .invoke('attr', 'aria-checked').then(($isDif) => {
      if ($isDif !== isOn.toString()) {
        cy.get(data.coordinatorElements.consumerAccount.myContacts.authorisedToggle)
          .eq(index)
          .click();
      }
    });
});

Cypress.Commands.add('clickAddAnotherContact', () => {
  cy.clickElementOnText('button', 'Add another contact');
});

Cypress.Commands.add('fillMycontacts', (formNumber = 1, name, phone, email,
  emergencyOn = true, authorIsOn = true) => {
  const index = formNumber - 1;
  cy.get(data.coordinatorElements.consumerAccount.myContacts.relationshipSelector)
    .eq(index)
    // eslint-disable-next-line max-len
    .select(data.coordinatorContent.consumerAccount.myContactsForm.relationshipOptions.partnerSpouse);
  cy.get(data.coordinatorElements.consumerAccount.myContacts.name)
    .eq(index)
    .clear()
    .type(name);
  cy.get(data.coordinatorElements.consumerAccount.myContacts.phone)
    .eq(index)
    .clear()
    .type(phone);
  cy.get(data.coordinatorElements.consumerAccount.myContacts.email)
    .eq(index)
    .clear()
    .type(email);
  cy.toggleEmergencyTo(emergencyOn, index);
  cy.toggleAuthorisedTo(authorIsOn, index);
});

Cypress.Commands.add('uploadFilePaymentDetails', (fileName = 'flower.jpeg', index = 0) => {
  cy
    .get('app-file-upload input')
    .eq(index)
    .attachFile(fileName)
    .wait(500);
});

Cypress.Commands.add('fillPlanPaymentDetails', (plan = 'QA Funding Organisation', ndisNumber = '012345678',
  invoice = 'Inv-001', recipient1 = 'a@a.a', additionalEmail = 'a@a.a') => {
  cy.inputTextField(data.coordinatorElements.consumerAccount.paymentDetails.fundingPlan,
    plan);
  cy.get(data.coordinatorElements.consumerAccount.paymentDetails.fundingPlanOption)
    .click({ force: true });
  cy.inputTextField(data.coordinatorElements.consumerAccount.paymentDetails.ndisNumber,
    ndisNumber);
  cy.inputTextField(data.coordinatorElements.consumerAccount.paymentDetails.invoice,
    invoice);
  cy.inputTextField(data.coordinatorElements.consumerAccount.paymentDetails.recipient1,
    recipient1);
  cy.inputTextField(data.coordinatorElements.consumerAccount.paymentDetails.additionalRecipient,
    additionalEmail);
});

Cypress.Commands.add('fillPaymentDetails', (ndisNumber = '012345678',
  invoice = 'Inv-001', recipient1 = 'a@a.a', additionalEmail = 'a@a.a') => {
  cy.inputTextField(data.coordinatorElements.consumerAccount.paymentDetails.ndisNumber,
    ndisNumber);
  cy.inputTextField(data.coordinatorElements.consumerAccount.paymentDetails.invoice,
    invoice);
  cy.inputTextField(data.coordinatorElements.consumerAccount.paymentDetails.recipient1,
    recipient1);
  cy.inputTextField(data.coordinatorElements.consumerAccount.paymentDetails.additionalRecipient,
    additionalEmail);
});

Cypress.Commands.add('fillInvoicesForm', (invoice = 'Inv-001',
  recipient1 = 'a@a.a',
  recipient2 = 'b@b.b') => {
  cy.inputTextField(data.coordinatorElements.consumerAccount.paymentDetails.invoice,
    invoice);
  cy.inputTextField(data.coordinatorElements.consumerAccount.paymentDetails.recipient1,
    recipient1);
  cy.inputTextField(data.coordinatorElements.consumerAccount.paymentDetails.additionalRecipient,
    recipient2);
});

Cypress.Commands.add('fillHCPInvoicesForm', (hcp = 'Ability Options', invoice = 'Inv-001',
  recipient1 = 'a@a.a',
  recipient2 = 'b@b.b') => {
  cy
    .inputTextField(data.coordinatorElements.consumerAccount.paymentDetails.hcp,
      hcp)
    .get(data.coordinatorElements.consumerAccount.paymentDetails.fundingPlanOption)
    .eq(0)
    .click({ force: true })
    .fillInvoicesForm(invoice,
      recipient1,
      recipient2);
});

Cypress.Commands.add('verifyPaymentRadioChecked', (usingGoverment = 'Yes', typeOfFunding = 'NDIS',
  typeOfPlan = 'Self managed') => {
  cy.get(data.coordinatorElements.consumerAccount.paymentDetails.radioChecked)
    .contains(usingGoverment)
    .should('be.visible');
  if (typeOfPlan !== null) {
    cy
      .get(data.coordinatorElements.consumerAccount.paymentDetails.radioChecked)
      .contains(typeOfFunding)
      .should('be.visible');
  }
  if (typeOfPlan !== null) {
    cy
      .get(data.coordinatorElements.consumerAccount.paymentDetails.radioChecked)
      .contains(typeOfPlan)
      .should('be.visible');
  }
});

Cypress.Commands.add('verifyItemAccountDetailsCompleted', (personalDetails = data.coordinatorContent.consumerAccount.personalDetails,
  myContacts = data.coordinatorContent.consumerAccount.myContacts,
  paymentDetails = data.coordinatorContent.consumerAccount.paymentDetails) => {
  const tempArr = [personalDetails, myContacts, paymentDetails];
  cy.get(data.coordinatorElements.consumerAccount.accountVerificationChecked)
    .each(($el, index) => {
      if (index < tempArr.length && tempArr[index] !== null) {
        cy.wrap($el).contains(tempArr[index]).should('be.visible');
      }
    });
});

Cypress.Commands.add('fillClientEmailAndPassword', (clientEmail, clientPass) => {
  cy
    .log('Enter an email')
    .inputTextField(
      data.coordinatorElements.addClientForm.emailField,
      clientEmail,
    )

    .log('Enter password')
    .inputTextField(
      data.coordinatorElements.addClientForm.passwordField,
      clientPass,
    );
});

Cypress.Commands.add('fillBasicCoordinatorAccount', (firstName, lastName, gender, address,
  postcode, phone = null) => {
  cy
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
    .wait(2000)
    .clickElement('.suggestions .listOption', true, 0);
  if (phone !== null) {
    cy.log('Enter phone')
      .inputTextField(
        data.coordinatorElements.addClientForm.phone,
        phone,
      );
  }
});

Cypress.Commands.add('fillTypeOfCareForm', (typeOfCare = data.coordinatorContent.addClientForm.typeOfCare.mentalHealth,
  supportPlan = data.coordinatorContent.addClientForm.supportPlan.no,
  funding = data.coordinatorContent.addClientForm.fundingSource.ndia) => {
  cy
    .log('Type of care')
    .selectTypeOfCare(typeOfCare);
  if (supportPlan !== null) {
    cy
      .log('support plan')
      .selectSupportPlan(supportPlan);
  }
  if (funding !== null) {
    cy
      .log('funding source')
      .selectfundingSource(funding);
  }
});

Cypress.Commands.add('selectRadioBtnByText', (text = 'Direct debit', isForce = false) => {
  cy.get(data.coordinatorElements.consumerAccount.paymentDetails.radioBtn)
    .contains(text)
    .click({ force: isForce });
});

Cypress.Commands.add('fillDebitForm', (accountName = 'Charmaine Deborah',
  bank = 'Security Bank',
  bsb = '012345',
  number = '0123456789') => {
  cy
    .log('Enter Account name')
    .inputTextField(
      data.coordinatorElements.consumerAccount.paymentDetails.debitForm.accountName,
      accountName,
    );
  cy
    .log('Enter bank')
    .inputTextField(
      data.coordinatorElements.consumerAccount.paymentDetails.debitForm.bankName,
      bank,
    );
  cy
    .log('Enter bsb')
    .inputTextField(
      data.coordinatorElements.consumerAccount.paymentDetails.debitForm.bsb,
      bsb,
    );
  cy
    .log('Enter number')
    .inputTextField(
      data.coordinatorElements.consumerAccount.paymentDetails.debitForm.number,
      number,
    );
  cy.uploadFilePaymentDetails('debit.pdf');
});

Cypress.Commands.add('fillCreditForm', (name = 'Landon Roderick',
  number = '4111111111111111',
  mm = '04', yy = '23',
  cvv = '123') => {
  cy
    .log('Check Authorise CC')
    .get('#mat-checkbox-1').click();
  cy.clickElementOnText('button', 'Add credit card')
    .verifyElementVisible('#spreedly-sidebar-content')
    .inputTextField('#spreedly-name', name)
    .getIframe('iframe[id*="spreedly-number-frame-"]')
    .click()
    .type(number)
    .inputTextField('#spreedly-exp-month', mm)
    .inputTextField('#spreedly-exp-year', yy)
    .getIframe('iframe[id*="spreedly-cvv-frame-"]')
    .click()
    .type(cvv)
    .get('#spreedly-submit-button')
    .click()
    .verifyTextVisible('Credit card details have been added');
});

Cypress.Commands.add('executePlanManagedSteps', (searchText, name, phone, email) => {
  cy
    .searchMemberOfCoordinatorByText(searchText)
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
    .verifyPaymentRadioChecked('Yes', 'NDIS', 'Plan managed')
    .fillPlanPaymentDetails()
    .clickElementOnText('button', 'Submit')

    .verifyTextVisible('Search workers')
    .clickElementOnText('button', 'Search workers')
    .verifyTextVisible('Search workers')
    .verifyTextVisible('Suburb or postcode')

    .clickLeftMenuAccount()

    .verifyItemAccountDetailsCompleted();
  cy.backToDashboardThenLogout();
});

Cypress.Commands.add('executeOtherSteps', (searchText, name, phone, email) => {
  cy
    .searchMemberOfCoordinatorByText(searchText)
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
    .verifyPaymentRadioChecked('Yes', 'Other', null)

    .fillInvoicesForm()
    .clickElementOnText('button', 'Submit')
    .clickOkGotIt()

    .verifyItemAccountDetailsCompleted();
  cy.backToDashboardThenLogout();
});

Cypress.Commands.add('executeOtherCreditCard', (searchText, name, phone, email) => {
  cy
    .searchMemberOfCoordinatorByText(searchText)
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
    .verifyPaymentRadioChecked('No', null, null)

    .selectRadioBtnByText('No')
    .verifyTextVisible('Credit card')
    .selectRadioBtnByText('Credit card')
    .fillCreditForm()
    .clickElementOnText('button', 'Submit')

    .verifyTextVisible('Search workers')
    .clickElementOnText('button', 'Search workers')
    .verifyTextVisible('Search workers')
    .verifyTextVisible('Suburb or postcode')

    .clickLeftMenuAccount()

    .verifyItemAccountDetailsCompleted();
  cy.backToDashboardThenLogout();
});

Cypress.Commands.add('enterOtherSpecify', (name = 'Urgent care') => {
  cy
    .inputTextField(data.coordinatorElements.addClientForm.whatCare, name);
});

Cypress.Commands.add('getIframe', (iframe) => cy.get(iframe)
  .its('0.contentDocument.body')
  .should('be.visible')
  .then(cy.wrap));

Cypress.Commands.add('searchUserByAdmin', (name = 'otherHamish') => {
  cy
    .inputTextField(data.admin.searchInput, name)
    .clickElement(data.admin.searchBtn);
});

Cypress.Commands.add('clickEditUserByIndex', (index = 0, isForce = false) => {
  cy
    .get('.actions li')
    .contains('Edit')
    .eq(index)
    .click({ force: isForce });
});

Cypress.Commands.add('clickOkGotIt', (index = 0, isForce = false) => {
  cy
    .get('mat-dialog-actions button')
    .contains('Ok got it')
    .eq(index)
    .click({ force: isForce });
});

Cypress.Commands.add('backToDashboardThenLogout', (index = 0, isForce = false) => {
  cy
    .get('app-back-button button')
    .contains('Back to dashboard')
    .eq(index)
    .click({ force: isForce })
    .wait(1000);
  cy
    .get('app-header button')
    .contains('Logout')
    .eq(index)
    .click({ force: isForce });
});

Cypress.Commands.add('assignToOrganisation', (email, org, orgEmail, orgPassword) => {
  cy
    .searchUserByAdmin(email)
    .wait(2000)
    .clickEditUserByIndex()
  // .verifyTextVisible(`Edit ${firstName}`)
    .inputTextField('#org-name', org)
    .get('.tt-dataset-organisations')
    .click()
    .get('#submit')
    .click()
    .clickElementOnText('[href="/manage/users"]', '< return to list')
    .searchUserByAdmin(email)
    .wait(2000)
    .get('[title="Organisation"]')
    .should('have.text', org)
    .clickElementOnText('[href="/users/sign_out"]', 'Logout')
    .loginToDashboard(
      orgEmail,
      orgPassword,
    )
    .searchMemberOfCoordinatorByText(email)
    .clickFirstLogAs();
});

Cypress.Commands.add('fillOrganisationInCreateForm', (org) => {
  cy
    .inputTextField('[formcontrolname="coordinator_id"] input', org)
    .clickElementOnText('.suggestions div[role="option"]', org);
});

Cypress.Commands.add('editTemOrg', (text) => {
  cy
    .inputTextField('textarea[formcontrolname="terms"]', text)
    .clickElementOnText('button', 'Save');
});

Cypress.Commands.add('checkNotiMessageCoordinatorByClientname', (clientName, number = 1) => {
  cy.get('app-coordinator-client-details .details')
    .contains(clientName).then(($client) => {
      cy.wrap($client)
        .parents('div.details')
        .find('.actions button.link span.chip')
        .contains(number);
    });
});

Cypress.Commands.add('checkCounterBadgeCoordinatorByname', (name, number = 1) => {
  cy.get('.summaryColumn .coordinatorSummary')
    .contains(name).then(($client) => {
      cy.wrap($client)
        .parents('.coordinatorSummary')
        .children('span.chip')
        .contains(number);
    });
});

Cypress.Commands.add('clickViewTimesheetByClientName', (clientName) => {
  cy.get('app-coordinator-client-details .details')
    .contains(clientName).then(($client) => {
      cy.wrap($client)
        .parents('app-coordinator-client-details .details')
        .find('.actions button.link')
        .contains('View support hours')
        .click();
    });
});

Cypress.Commands.add('clickViewMessageByClientName', (clientName) => {
  cy.get('.clientName')
    .contains(clientName).then(($client) => {
      cy.wrap($client)
        .parents('div.details')
        .find('.actions button.link')
        .contains('View messages')
        .click();
    });
});

Cypress.Commands.add('fillBasicCoordinatorAccountFromOriginsation', (firstName, lastName, address,
  postcode, phone = null) => {
  cy
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

    .log('Enter address')
    .inputTextField(
      data.coordinatorElements.addClientForm.street,
      address,
    )

    .log('Enter postcode')
    .inputTextField(data.coordinatorElements.addClientForm.suburb, postcode)
    .clickElement('.suggestions .listOption', true, 0);
  if (phone !== null) {
    cy.log('Enter phone')
      .inputTextField(
        data.coordinatorElements.addClientForm.phone,
        phone,
      );
  }
});

Cypress.Commands.add('verifyStatusCheckbox', (label) => {
  cy
    .get('mat-checkbox span.mat-checkbox-label span')
    .contains(label)
    .parents('mat-checkbox')
    .find('input[type="checkbox"]')
    .invoke('attr', 'aria-checked');
});

Cypress.Commands.add('verifyStatusNotificationCheckbox', (label) => {
  cy
    .get('mat-checkbox span.mat-checkbox-label')
    .contains(label)
    .parents('mat-checkbox')
    .find('input[type="checkbox"]')
    .invoke('attr', 'aria-checked');
});

Cypress.Commands.add('checkRadioOnboarding', (section, label) => {
  cy
    .get(section)
    .parent()
    .find('span.radioLabel')
    .contains(label)
    .click({ force: true });
});

Cypress.Commands.add('typeAddressAndSearch', (address) => {
  cy
    .get('div.suggestions-container input')
    .clear()
    .type(`${address}`)
    .get('button[aria-label="Search"]')
    .click();
});

Cypress.Commands.add('viewProfileOf', (name) => {
  cy
    .get('div.workerSearchMatchContent .carerName')
    .contains(name)
    .parents('div.workerSearchMatchContent')
    .find('.profileActions button')
    .scrollIntoView()
    .click({ force: true })
    .waitAppLoaderNotVisible();
});

Cypress.Commands.add('verifyAddAsAnEmergencyContactShouldBe', (valueToCompare) => {
  cy.wait(500)
    .get('input#mat-slide-toggle-1-input')
    .invoke('attr', 'aria-checked')
    .should('contain', valueToCompare);
});

Cypress.Commands.add('verifyAuthorisedToReceiveInformation', (valueToCompare) => {
  cy.wait(500)
    .get('input#mat-slide-toggle-2-input')
    .invoke('attr', 'aria-checked')
    .should('contain', valueToCompare);
});

Cypress.Commands.add('moveAndCheckSupportWorkerDetailsInCompliance', () => {
  const columnEle = '#supportWorkersTable th';
  const list = ['Client under 18', 'WWCC/NDIS WSC', 'Job description', 'Services requested',
    'Verified services offered by support worker', 'Qualifications', 'Other qualifications (As at Mable approval of support worker)',
    'Desired cultural identification and language', 'Client\'s language', "Support worker's language",
    "Support worker's cultural identification", 'Insurance'];
  for (const item of list) {
    cy.get(columnEle)
      .contains(item)
      .trigger('mouseover')
      .verifyElementContainsText(columnEle, item);
  }
});

Cypress.Commands.add('checkTheTraining', (training) => {
  cy.get('h3')
    .contains(training)
    .parents('.checkboxListContainer')
    .find('mat-checkbox.mat-checkbox-checked')
    .should('exist');
});

Cypress.Commands.add('tickAndCheckTheTraining', (training, checkForIssueDateAppear) => {
  cy.get('h3')
    .contains(training)
    .click({ force: true });

  cy.checkTheTraining(training);

  cy.get('h3')
    .contains(training)
    .parents('.checkboxListContainer')
    .find('app-file-upload')
    .should('exist');

  if (checkForIssueDateAppear) {
    cy.get('h3')
      .contains(training)
      .parents('.checkboxListContainer')
      .find('app-date-selector')
      .should('exist');
  }
});

Cypress.Commands.add('uploadAndCheckForTraining', (training, skipCheckSteps) => {
  cy.get('h3')
    .contains(training)
    .parents('.checkboxListContainer')
    .find('input[type="file"]')
    .attachFile('debit.pdf')
    .wait(2000)
    .verifyTextExist('debit.pdf')
    .verifyElementExist('a.delete');

  if (skipCheckSteps) {
    cy.log('Click the x button')
      .get('h3')
      .contains(training)
      .parents('.checkboxListContainer')
      .find('a.delete')
      .click({ force: true })
      .verifyTextExist(' Delete File ')
      .verifyTextExist(' Are you sure you want to delete file? ')

      .log('Click the No button')
      .clickElementOnText('button', 'No')
      .wait(2000)

      .log('Click the x button and tap the Yes button')
      .get('h3')
      .contains(training)
      .parents('.checkboxListContainer')
      .find('a.delete')
      .click({ force: true })
      .clickElementOnText('button', 'Yes')
      .wait(2000)

      .log('Reupload the file')
      .get('h3')
      .contains(training)
      .parents('.checkboxListContainer')
      .find('input[type="file"]')
      .attachFile('debit.pdf')
      .wait(2000)
      .verifyTextExist('debit.pdf')
      .verifyElementExist('a.delete');
  }
});
