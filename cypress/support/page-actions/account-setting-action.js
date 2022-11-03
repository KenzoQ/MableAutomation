Cypress.Commands.add('verifyAccountSettingPageIsShown', () => {
  cy.log('Verify Account Setting Page is shown')
    .verifyTextVisible('Account Settings')
    .verifyCurrentTabIs('Username & password');
});

Cypress.Commands.add('verifyCurrentTabIs', (tab) => {
  cy.log(`Verify current tab is ${tab}`)
    .wait(1000)
    .get(
      'app-account-settings .mat-tab-nav-bar.mat-tab-header.mat-primary .mat-tab-label-active',
    )
    .first()
    .invoke('text')
    .then((text) => expect(text).to.include(tab));
});

Cypress.Commands.add('verifyErrorMessageIsShown', (inputField, message) => {
  cy.log('Verify the error message is shown')
    .get(inputField)
    .parents('label')
    .find('.status span')
    .invoke('text')
    .then((text) => expect(text).to.equal(message));
});

Cypress.Commands.add('verifyCheckBoxHaveStatus', (eq, status) => {
  cy.log('Verify checkbox is selected')
    .get('app-account-settings input[type="checkbox"].mat-checkbox-input')
    .eq(eq)
    .invoke('attr', 'aria-checked')
    .then((value) => {
      expect(value).to.equal(status.toString());
    });
});

Cypress.Commands.add('checkStatusCheckboxAndSelect', (element, eq = 0) => {
  cy.log('Check status of checkbox and Select it If Checkbox is false')
    .get(element)
    .eq(eq)
    .invoke('attr', 'aria-checked')
    .then((value) => {
      if (value === 'false') {
        cy.get(element).eq(eq).click({ force: true });
      }
    });
});

Cypress.Commands.add('navToTheAccountSettings', (isForce = false) => {
  cy.get('div:not(.duplicateNav)>nav a[href="/account"]').click({ force: isForce });
});

Cypress.Commands.add('verifyBasicAccountSettingsPage', (email, phone, firstName, lastName) => {
  cy.getValueOfInput('input[formcontrolname="email"]')
    .then((val) => expect(val).to.equal(email))
    .getValueOfInput('input[formcontrolname="contact_phone"]')
    .then((val) => expect(val).to.equal(phone))
    .getValueOfInput('input[formcontrolname="password"]')
    .then((val) => expect(val).to.equal(''))
    .getValueOfInput('input[formcontrolname="confirmPassword"]')
    .then((val) => expect(val).to.equal(''));
  if (firstName !== null && firstName !== undefined) {
    cy
      .getValueOfInput('input[formcontrolname="first_name"]')
      .then((val) => expect(val).to.equal(firstName));
  }

  if (lastName !== null && lastName !== undefined) {
    cy.getValueOfInput('input[formcontrolname="last_name"]')
      .then((val) => expect(val).to.equal(lastName));
  }
  cy
    .get('app-account-settings button')
    .contains('Save')
    .should('be.visible');
});

Cypress.Commands.add('validateAFieldByEleTextMess', (ele, invalidText = null, text, Mess) => {
  if (!(ele.indexOf('password') >= 0)) {
    cy.get(ele)
      .clear()
      .clickElementOnText('app-account-settings button', 'Save')
      .verifyTextVisible(Mess);
  }
  if (invalidText !== null) {
    cy
      .get(ele)
      .clear()
      .type(invalidText)
      .verifyTextVisible(Mess);
  }
  cy
    .get(ele)
    .clear()
    .type(text)
    .verifyTextNotExist(Mess);
});

Cypress.Commands.add('validatePasswordField', (ele, invalid, weak = null, moderate = null, strong = null) => {
  if (invalid !== null) {
    cy
      .get(ele)
      .clear()
      .type(invalid)
      .verifyTextVisible('Weak')
      .verifyTextVisible('Use 8 characters or more for your password.');
  }
  if (weak !== null) {
    cy
      .get(ele)
      .clear()
      .type(weak)
      .verifyTextVisible('Weak')
      .verifyTextVisible('Please choose a stronger password. Try a mix of letters, numbers and symbols');
  }
  if (moderate !== null) {
    cy
      .get(ele)
      .clear()
      .type(moderate)
      .verifyTextVisible('Moderate');
  }
  if (strong !== null) {
    cy
      .get(ele)
      .clear()
      .type(strong)
      .verifyTextVisible('Strong');
  }
});

Cypress.Commands.add('validateConfirmPasswordField', (ele, blank = false, notSame = null, same = null) => {
  if (blank) {
    // check make sure password strong is inputted
    cy.verifyTextVisible('Strong');
    cy.clickElementOnText('app-account-settings button', 'Save')
      .verifyTextVisible('Invalid form fields');
  }
  if (notSame !== null) {
    cy
      .get(ele)
      .clear()
      .type(notSame)
      .verifyTextVisible('Your passwords don\'t match');
  }
  if (same !== null) {
    cy
      .get(ele)
      .clear()
      .type(same)
      .verifyTextNotExist('Your passwords don\'t match')
      .verifyTextNotExist('Invalid form fields');
  }
});

Cypress.Commands.add('validateFirstNameAndLastName', (eleFirstName, eleLastName, firstName, lastName) => {
  if (eleFirstName !== null) {
    cy.get(eleFirstName)
      .clear()
      .clickElementOnText('app-account-settings button', 'Save')
      .verifyTextVisible('Input a first name');
    cy.get(eleFirstName)
      .clear()
      .type(firstName);
  }

  if (eleLastName !== null) {
    cy.get(eleLastName)
      .clear()
      .clickElementOnText('app-account-settings button', 'Save')
      .verifyTextVisible('Input a last name');
    cy.get(eleLastName)
      .clear()
      .type(lastName);
  }
});

Cypress.Commands.add('validateAllFieldsOfAccountSettingsPage', (email, password = 'qaAutomation2021', phone, firstName = null, lastName = null) => {
  cy.validateAFieldByEleTextMess(
    'input[formcontrolname="email"]',
    'invalidEmail',
    email,
    'Provide a valid email address.',
  );

  cy.get('input[formcontrolname="contact_phone"]').trigger('mouseover').clear().type('{backspace}');
  cy.validateAFieldByEleTextMess(
    'input[formcontrolname="contact_phone"]',
    null,
    phone,
    'a valid phone number',
  );

  cy.validatePasswordField(
    'input[formcontrolname="password"]',
    'qwerty',
    'qwertyuiop',
    'December2021',
    password,
  );

  cy.validateConfirmPasswordField(
    'input[formcontrolname="confirmPassword"]',
    true,
    '123',
    password,
  );
  if (firstName !== null) {
    cy.validateFirstNameAndLastName(
      'input[formcontrolname="first_name"]',
      'input[formcontrolname="last_name"]',
      firstName,
      lastName,
    );
  }
});

Cypress.Commands.add('updateEmailAS', (newEmail) => {
  const ele = 'input[formcontrolname="email"]';
  cy.get(ele)
    .clear()
    .type(newEmail)
    .clickElementOnText('app-account-settings button', 'Save')
    .getValueOfInput(ele)
    .then((val) => expect(val).to.equal(newEmail));
});

Cypress.Commands.add('updatePhoneAS', (newValue) => {
  const ele = 'input[formcontrolname="contact_phone"]';
  cy.get(ele)
    .clear()
    .type(newValue)
    .clickElementOnText('app-account-settings button', 'Save')
    .verifyTextVisible('Account updated')
    .getValueOfInput(ele)
    .then((val) => expect(val).to.equal(newValue));
});

Cypress.Commands.add('updateFirstNameAS', (newValue) => {
  const ele = 'input[formcontrolname="first_name"]';
  cy.get(ele)
    .clear()
    .type(newValue)
    .clickElementOnText('app-account-settings button', 'Save')
    .verifyTextVisible('Account updated')
    .getValueOfInput(ele)
    .then((val) => expect(val).to.equal(newValue));
});

Cypress.Commands.add('updateLastNameAS', (newValue) => {
  const ele = 'input[formcontrolname="last_name"]';
  cy.get(ele)
    .clear()
    .type(newValue)
    .clickElementOnText('app-account-settings button', 'Save')
    .verifyTextVisible('Account updated')
    .getValueOfInput(ele)
    .then((val) => expect(val).to.equal(newValue));
});

Cypress.Commands.add('updatePasswordAS', (newValue) => {
  const elePass = 'input[formcontrolname="password"]';
  const eleConfirmPass = 'input[formcontrolname="confirmPassword"]';
  cy.get(elePass)
    .clear()
    .type(newValue);
  cy.get(eleConfirmPass)
    .clear()
    .type(newValue)
    .clickElementOnText('app-account-settings button', 'Save')
    .verifyTextVisible('Account updated')
    .wait(1000);
});

Cypress.Commands.add('enterVerificationCode', (code = '123456') => {
  cy
    .log('Verify your phone number')
    .wait(2000)
    .get('body')
    .then($body => {
      if ($body.find('app-verify-mobile-number').length > 0) {
        cy
          .inputTextField(
            'input[formcontrolname="verificationCode"]',
            code,
          )
          .clickElementOnText(
            'button span',
            'Submit',
          );
      }
    });
});
