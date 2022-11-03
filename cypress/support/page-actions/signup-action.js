/* eslint-disable camelcase */
import * as data from '../../fixtures/test-data.json';

const getLocator = (step, locator) => `div[data-step="${step}"] label[for="user_consumer_profile_attributes_${locator}"]`;

Cypress.Commands.add('inputAge', (age) => {
  cy.wait(500);
  cy.get('input#age').type(age);
  cy.clickNextButtonAtStep('age');
});

Cypress.Commands.add('clickNextButtonAtStep', (stepName) => {
  cy.wait(500);
  cy.get(`div[data-step="${stepName}"] .next-page-button`).click();
});

Cypress.Commands.add(
  'verifyTheScreenIsDisplayed',
  (stepName, expectedTitle) => {
    cy.wait(500);
    const locator = `div[data-step="${stepName}"] h4`;
    cy.get(locator).should('contain', expectedTitle);
  },
);

Cypress.Commands.add('clickSignUp', () => {
  cy.wait(500);
  cy.get('#signup-button').click();
});

Cypress.Commands.add('choosePostCode', (postCode, address) => {
  cy.wait(500);
  cy.get('input#postCode')
    .type(postCode)
    .wait(1000)
    .get('.tt-suggestion div')
    .contains(address)
    .click();
});

Cypress.Commands.add('chooseOptionInStep', (stepName, option) => {
  cy.wait(500);
  cy.get(getLocator(stepName, option)).click();
});

Cypress.Commands.add('inputValueIntoField', (stepName, fieldName, value) => {
  cy.wait(500);
  const locator = `div[data-step="${stepName}"] #user_sent_invitations_attributes_${fieldName}`;
  cy.get(locator).type(value);
});

Cypress.Commands.add('inputRegistrationValueIntoField', (locator, value) => {
  cy.wait(500);
  cy.get(locator).type(value);
});

Cypress.Commands.add('verifyRegistrationFieldIsRequired', (locator) => {
  cy.wait(500);
  cy.get(locator)
    .invoke('attr', 'class')
    .then(($class) => {
      expect($class).to.include('border-glow-blue');
    });
});

Cypress.Commands.add('chooseDayAndTime', (day, time) => {
  cy.wait(500);
  const stepName = 'days';
  const timeLocator = `required_${day}_${time}`;
  cy.get(getLocator(stepName, timeLocator)).click();
  cy.clickNextButtonAtStep(stepName);
});

Cypress.Commands.add(
  'createWorkerAccount',
  (firstName, lastName, email, password = 'Mable!2018') => {
    cy.fixture('test-data').then(() => {
      cy.clickElementByText('I want to provide support')
        .verifyTextExist('Where are you located?')
        .inputTextFieldByPlaceholder('Enter your postcode', '2600')
        .clickElementByText('Barton ACT 2600')
        .clickElementByText('11-25 hours')
        .inputTextFieldByPlaceholder('First name', firstName)
        .inputTextFieldByPlaceholder('Last name', lastName)
        .inputTextFieldByPlaceholder('Mobile number', '0412345678')
        .inputTextFieldByPlaceholder('Email', email)
        .inputTextFieldByPlaceholder('Password', password)
        .get('#referralSource')
        .select('Google')
        .clickElementByText('Next', 'button')
        .verifyTextExist(firstName)
        .verifyTextExist(lastName)
        .verifyTextExist('2600')
        .verifyTextExist('11-25 hours')
        .get('#confirm')
        .check({ force: true })
        .clickElementByText('Finish!')
        .verifyTextExist('Registration Successful');
    });
  },
);

Cypress.Commands.add('selectValueInDropDown', (stepName, value) => {
  const selectLocator = `div[data-step="${stepName}"] select`;
  cy.get(selectLocator).select(value, {
    force: true,
  });
});

Cypress.Commands.add('verifyErrorMessOnField', (selector, error, value = false) => {
  if (!!value) {
    cy.contains(error)
      .should('not.be.exist');
  } else {
    cy.get(selector)
      .parents('label')
      .find('.status span')
      .contains(error)
      .should('be.visible');
  }
});

Cypress.Commands.add('verifyListBoxText', (item) => {
  if (Array.isArray(item)) {
    for (let index = 0; index < item.length; index += 1) {
      cy.verifyTextVisibleNoWait(`${item[index]}`);
    }
  }
});

Cypress.Commands.add('verifySuburbTextbox', (text) => {
  cy.get(data.signup.worker.postcodeInput).invoke('prop', 'value').should('be.have', text);
});

Cypress.Commands.add('inputDetailsPage', (obj) => {
  cy
    .log('Enter first name')
    .inputTextField(data.signup.worker.firstNameInput, obj.firstName)

    .log('Enter last name')
    .inputTextField(data.signup.worker.lastNameInput, obj.lastName)

    .log('Enter phone number')
    .inputTextField(data.signup.worker.phoneInput, obj.phone)

    .log('Enter email')
    .inputTextField(data.signup.worker.emailInput, obj.email)

    .log('Enter password')
    .inputTextField(data.signup.worker.passwordInput, obj.password)

    .log('Select optiton "How did you hear about us?"')
    .selectDropdown(data.signup.worker.foundSelect, obj.found);
});
Cypress.Commands.add('clickRecaptcha', () => {
  cy.wait(3000);
  cy.get('#ngrecaptcha-2 *> iframe')
    .then($iframe => {
      const $body = $iframe.contents().find('body');
      cy.wrap($body)
        .find('.recaptcha-checkbox-border')
        .should('be.visible')
        .click();
    });
});

Cypress.Commands.add('bypassGoogleReCAPTCHA', () => {
  cy.wait(1000);
  this.listBuckets();
  cy.get('body').find('re-captcha *> iframe').then($item => {
    if ($item.length > 0) {
      cy.get('re-captcha *> iframe')
        .then($iframe => {
          const $body = $iframe.contents().find('body');
          cy.wrap($body)
            .find('.recaptcha-checkbox-border')
            .should('be.exist')
            .click();
          cy.get('#recaptcha-audio-button').click;
          cy.get('#audio-source')
            .invoke('attr', 'scr')
            // eslint-disable-next-line no-unused-vars
            .then(($scr) => {
              // cy.getTextAudioGoogle($scr).then((text) => {
              //   cy.get('#audio-response')
              //     .clear()
              //     .type(text);
              //   cy.get('#rc-button-default')
              //     .contains('VERIFY')
              //     .click();
              // });
            });
        });
    }
  });
});

Cypress.Commands.add('inputAndValidateDetailsPage', (obj, { alertFill } = data.signupData, invalidPhone = '0091570110') => {
  const alerts = Object.values(alertFill);
  cy
    .log('Click Next')
    .clickElementOnText(data.signup.worker.button, 'Next')

    .log(`Verify alert: ${alerts}`)
    .verifyListBoxText(alerts)

    .log('Enter first name')
    .inputTextField(data.signup.worker.firstNameInput, obj.firstName)

    .log('Enter last name')
    .inputTextField(data.signup.worker.lastNameInput, obj.lastName)

    .log('Enter phone number')
    .inputTextField(data.signup.worker.phoneInput, invalidPhone)

    .log(`Verify alert: ${alertFill.mobileNumber}`)
    .verifyListBoxText(alertFill.mobileNumber)

    .log('Enter phone number')
    .inputTextField(data.signup.worker.phoneInput, obj.phone)

    .log('Enter email')
    .inputTextField(data.signup.worker.emailInput, obj.email)

    .log('Enter password')
    .inputTextField(data.signup.worker.passwordInput, obj.password)

    .log('Select optiton "How did you hear about us?"')
    .selectDropdown(data.signup.worker.foundSelect, obj.found);

  // .bypassGoogleReCAPTCHA();
});

Cypress.Commands.add('inputParticipantDetails', (obj) => {
  cy
    .log('Enter first name')
    .inputTextField(data.signup.worker.firstNameInput, obj.participantFirstName)

    .log('Enter last name')
    .inputTextField(data.signup.worker.lastNameInput, obj.participantLastName);
});

Cypress.Commands.add('inputAndValidateParticipantDetails', (obj, { alertFill } = data.signupData) => {
  cy
    .log('Click Next')
    .clickElementOnText(data.signup.worker.button, 'Next')
    .log(`Verify alert: ${alertFill.firstName} and ${alertFill.lastName}`)
    .verifyListBoxText([alertFill.firstName, alertFill.lastName]);
  cy
    .log('Enter first name')
    .inputTextField(data.signup.worker.firstNameInput, obj.participantFirstName)

    .log('Enter last name')
    .inputTextField(data.signup.worker.lastNameInput, obj.participantLastName);
});

Cypress.Commands.add('verfyOptionByTextIsSelected', (text) => {
  cy
    .get('button span')
    .contains(text)
    .parent()
    .invoke('attr', 'class')
    .should('eq', 'item-selected');
});

Cypress.Commands.add('checkClickSkipForNow', () => {
  cy.wait(2000)
    .get('body')
    .then(($body) => {
      if ($body.find('app-register app-registration-successful').length > 0) {
        cy.clickElementByText(data.signupData.successful_button[1]);
      }
    });
});

Cypress.Commands.add('urgentCareSteps', () => {
  const {
    urgency_of_care_title,
    urgency_of_care_lsbox,
  } = data.signupData;
  cy
    .verifyListBoxText(urgency_of_care_title)
    .verifyListBoxText(urgency_of_care_lsbox)

    .log(`click on ${urgency_of_care_lsbox[0]}`)
    .clickElementOnTextNoWaitNoPosition('button span', urgency_of_care_lsbox[0]);
});
