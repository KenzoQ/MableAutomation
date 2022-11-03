import faker from 'faker/locale/en_AU';
import * as data from '../../../fixtures/test-data.json';

describe('Worker SignUp', () => {
  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it('ES-T711. Worker Sign Up', () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const phone = '0491570110';
    const email = faker.internet.email().toLowerCase();
    const password = 'password';

    cy
      .log('Click "Sign up here" btn')
      .clickElementOnText('a', 'Sign up here')
      .log('Verify user navigate to registration page')
      .verifyElementContainsText('h2', 'Welcome!')
      .verifyElementContainsText('p', 'What brings you to Mable?')
      .verifyCurrentURL('register')

      .log('Click "Provide support"')
      .clickElementOnText('button span', 'Provide support')

      .log('Enter post code')
      .inputTextField(data.signup.worker.postcodeInput, '2000')
      .clickElement('.suggestions .listOption', true, 0)
      .wait(1000)
      .log('Click Next btn')
      .clickElementOnText('app-registeration-form-controls button', 'Next')

      .log('Select "1-10 hours of work per weeek"')
      .clickElementOnText('button span', '1-10 hours of work per week')

      .log('Enter first name')
      .inputTextField(data.signup.worker.firstNameInput, firstName)

      .log('Enter last name')
      .inputTextField(data.signup.worker.lastNameInput, lastName)

      .log('Enter phone number')
      .inputTextField(data.signup.worker.phoneInput, phone)

      .log('Enter email')
      .inputTextField(data.signup.worker.emailInput, email)

      .log('Enter password')
      .inputTextField(data.signup.worker.passwordInput, password)

      .log('Select optiton "How did you hear about us?"')
      .selectDropdown(data.signup.worker.foundSelect, 'Google')

      .log('Click Next btn')
      .clickElementOnText('app-registeration-form-controls button', 'Next')

      .log('Select the required checkbox')
      .clickElementOnText(
        '.mat-checkbox-label',
        ' It’s OK for Mable to collect sensitive information about me to access the Mable platform.',
      )

      .log('Click Finish btn')
      .clickElementOnText('app-registeration-form-controls button', 'Finish')

      .wait(10000)
      .verifyTextVisible('Support Worker')
      .verifyTextVisible('Edit profile');
  });

  it('ES-T712. Worker sign up validation', () => {
    cy
      .log('Click "Sign up here" btn')
      .clickElementOnText('a', 'Sign up here')
      .log('Verify user navigate to registration page')
      .verifyElementContainsText('h2', 'Welcome!')
      .verifyElementContainsText('p', 'What brings you to Mable?')
      .verifyCurrentURL('register')

      .log('Click "Provide support"')
      .clickElementOnText('button span', 'Provide support')

      .log('Enter post code')
      .wait(1000)
      .inputTextField(data.signup.worker.postcodeInput, '2000')
      .wait(500)
      .clickElement('.suggestions .listOption', true, 0)
      .wait(1000)
      .log('Click Next btn')
      .clickElementOnText('app-registeration-form-controls button', 'Next')

      .log('Select "1-10 hours of work per weeek"')
      .clickElementOnText('button span', '1-10 hours of work per week')

      .log('Click Next btn')
      .clickElementOnText('app-registeration-form-controls button', 'Next')

      .log('Verify user can not navigate next step')
      .verifyTextVisible('Please provide your details')

      .log('Enter 1 character in first name field')
      .inputTextField(data.signup.worker.firstNameInput, 'a')
      .verifyErrorMessOnField(
        data.signup.worker.firstNameInput,
        'Input a first name',
      )

      .log('Enter 2 character in first name field')
      .inputTextField(data.signup.worker.firstNameInput, 'ab')
      .verifyErrorMessOnField(
        data.signup.worker.firstNameInput,
        'Input a first name',
        true,
      )

      .log('Enter last name')
      .inputTextField(data.signup.worker.lastNameInput, 'abd')

      .log('Enter mobile phone number (not au no')
      .inputTextField(data.signup.worker.phoneInput, '1234565')
      .verifyErrorMessOnField(
        data.signup.worker.phoneInput,
        'a valid phone number',
      )

      .log('Enter phone number')
      .inputTextField(data.signup.worker.phoneInput, '0491570110')
      .verifyErrorMessOnField(
        data.signup.worker.phoneInput,
        'a valid phone number',
        true,
      )

      .log('Enter invail email')
      .inputTextField(data.signup.worker.emailInput, 'abdt@123')
      .verifyErrorMessOnField(
        data.signup.worker.emailInput,
        'Input a valid email',
      )

      .log('Enter valid email')
      .inputTextField(data.signup.worker.emailInput, 'abd123@gmail.com')
      .verifyErrorMessOnField(
        data.signup.worker.emailInput,
        'Input a valid email',
        true,
      )

      .log('Enter password with lower than 8 characters')
      .inputTextField(data.signup.worker.passwordInput, '123445')
      .verifyErrorMessOnField(
        data.signup.worker.passwordInput,
        'Use 8 characters or more for your password',
      )

      .log('Enter password')
      .inputTextField(data.signup.worker.passwordInput, 'password')
      .verifyErrorMessOnField(
        data.signup.worker.passwordInput,
        'Use 8 characters or more for your password',
        true,
      )

      .log('Select optiton "How did you hear about us?"')
      .selectDropdown(data.signup.worker.foundSelect, 'Google')

      .log('Click Next btn')
      .clickElementOnText('app-registeration-form-controls button', 'Next')

      .log('Click Finish btn')
      .clickElementOnText('app-registeration-form-controls button', 'Finish')

      .log('Verify the error message is visible')
      .verifyTextVisible('In order to use Mable, you must check this box');
  });

  it('ES-T713. Worker sign up using existing email', () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const phone = '0491570110';
    const password = 'Automation123';

    cy
      .log('Click "Sign up here" btn')
      .clickElementOnText('a', 'Sign up here')
      .log('Verify user navigate to registration page')
      .verifyElementContainsText('h2', 'Welcome!')
      .verifyElementContainsText('p', 'What brings you to Mable?')
      .verifyCurrentURL('register')

      .log('Click "Provide support"')
      .clickElementOnText('button span', 'Provide support')

      .log('Enter post code')
      .wait(1000)
      .inputTextField(data.signup.worker.postcodeInput, '2000')
      .clickElement('.suggestions .listOption', true, 0)
      .wait(1000)
      .log('Click Next btn')
      .clickElementOnText('app-registeration-form-controls button', 'Next')

      .log('Select "1-10 hours of work per weeek"')
      .clickElementOnText('button span', '1-10 hours of work per week')
      .wait(2000)

      .log('Enter first name')
      .inputTextField(data.signup.worker.firstNameInput, firstName)

      .log('Enter last name')
      .inputTextField(data.signup.worker.lastNameInput, lastName)

      .log('Enter phone number')
      .inputTextField(data.signup.worker.phoneInput, phone)

      .log('Enter email')
      .inputTextField(
        data.signup.worker.emailInput,
        'automation_maria.repollo.jobspec+worker2@donotuse.com.au',
      )

      .log('Enter password')
      .inputTextField(data.signup.worker.passwordInput, password)

      .log('Select optiton "How did you hear about us?"')
      .selectDropdown(data.signup.worker.foundSelect, 'Radio Advertisement')

      .log('Click Next btn')
      .clickElementOnText('app-registeration-form-controls button', 'Next')
      .verifyTextVisible('Your email address is already registered.')

      .log('Click Reset password')
      .clickElementOnText(
        '.status a',
        'Reset password?',
      )
      .verifyTextVisible('Reset password');
  });

  it('ES-T1103. Information privacy checkbox validation, marketing checkbox, unticked', () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const phone = '0491570110';
    const email = faker.internet.email().toLowerCase();
    const password = 'password';

    cy
      .log('Click "Sign up here" btn')
      .clickElementOnText('a', 'Sign up here')

      .log('Click "Provide support"')
      .clickElementOnText('button span', 'Provide support')

      .log('Enter post code')
      .inputTextField(data.signup.worker.postcodeInput, '2000')
      .clickElement('.suggestions .listOption', true, 0)
      .wait(1000)
      .log('Click Next btn')
      .clickElementOnText('app-registeration-form-controls button', 'Next')

      .log('Select "1-10 hours of work per weeek"')
      .clickElementOnText('button span', '1-10 hours of work per week')

      .log('Enter first name')
      .inputTextField(data.signup.worker.firstNameInput, firstName)

      .log('Enter last name')
      .inputTextField(data.signup.worker.lastNameInput, lastName)

      .log('Enter phone number')
      .inputTextField(data.signup.worker.phoneInput, phone)

      .log('Enter email')
      .inputTextField(data.signup.worker.emailInput, email)

      .log('Enter password')
      .inputTextField(data.signup.worker.passwordInput, password)

      .log('Select optiton "How did you hear about us?"')
      .selectDropdown(data.signup.worker.foundSelect, 'Google')

      .log('Click Next btn')
      .clickElementOnText('app-registeration-form-controls button', 'Next')

      .log('Click Finish btn')
      .clickElementOnText('app-registeration-form-controls button', 'Finish')
      .log('Verify error message is shown')
      .verifyElementContainsText(
        'span',
        'In order to use Mable, you must check this box',
      )

      .log('Select the required checkbox')
      .clickElementOnText(
        '.mat-checkbox-label',
        ' It’s OK for Mable to collect sensitive information about me to access the Mable platform.',
      )
      .log('Verify the error message is hidden')
      .verifyTextNotExist(
        'span',
        'In order to use Mable, you must check this box',
      );
  });

  it('ES-T1105. Information privacy checkbox validation, marketing checkbox, unticked', () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const phone = '0491570110';
    const email = faker.internet.email().toLowerCase();
    const password = 'password';

    cy
      .log('Click "Sign up here" btn')
      .clickElementOnText('a', 'Sign up here')

      .log('Click "Provide support"')
      .clickElementOnText('button span', 'Provide support')

      .log('Enter post code')
      .inputTextField(data.signup.worker.postcodeInput, '2000')
      .clickElement('.suggestions .listOption', true, 0)
      .wait(1000)
      .log('Click Next btn')
      .clickElementOnText('app-registeration-form-controls button', 'Next')

      .log('Select "1-10 hours of work per weeek"')
      .clickElementOnText('button span', '1-10 hours of work per week')

      .log('Enter first name')
      .inputTextField(data.signup.worker.firstNameInput, firstName)

      .log('Enter last name')
      .inputTextField(data.signup.worker.lastNameInput, lastName)

      .log('Enter phone number')
      .inputTextField(data.signup.worker.phoneInput, phone)

      .log('Enter email')
      .inputTextField(data.signup.worker.emailInput, email)

      .log('Enter password')
      .inputTextField(data.signup.worker.passwordInput, password)

      .log('Select optiton "How did you hear about us?"')
      .selectDropdown(data.signup.worker.foundSelect, 'Google')

      .log('Click Next btn')
      .clickElementOnText('app-registeration-form-controls button', 'Next')

      .log(
        'Select "Keep me up to date about the Mable community and other offers"',
      )
      .clickElementOnText(
        'span',
        'Keep me up to date about the Mable community and other offers',
      )

      .log('Click Finish btn')
      .clickElementOnText('app-registeration-form-controls button', 'Finish')
      .log('Verify error message is shown')
      .verifyElementContainsText(
        'span',
        'In order to use Mable, you must check this box',
      )

      .log('Select the required checkbox')
      .clickElementOnText(
        '.mat-checkbox-label',
        ' It’s OK for Mable to collect sensitive information about me to access the Mable platform.',
      )
      .log('Verify the error message is hidden')
      .verifyTextNotExist(
        'span',
        'In order to use Mable, you must check this box',
      );
  });

  it('ES-T1104. View Mable terms of use and privacy policy', () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const phone = '0491570110';
    const email = faker.internet.email().toLowerCase();
    const password = 'qaAutomation2021';
    cy
      .log('Click "Sign up here" btn')
      .clickElementOnText('a', 'Sign up here')

      .log('Click "Provide support"')
      .clickElementOnText('button span', 'Provide support')

      .log('Enter post code')
      .inputTextField(data.signup.worker.postcodeInput, '2000')
      .clickElement('.suggestions .listOption', true, 0)
      .wait(1000)
      .log('Click Next btn')
      .clickElementOnText('app-registeration-form-controls button', 'Next')

      .log('Select "1-10 hours of work per weeek"')
      .clickElementOnText('button span', '1-10 hours of work per week')

      .log('Enter first name')
      .inputTextField(data.signup.worker.firstNameInput, firstName)

      .log('Enter last name')
      .inputTextField(data.signup.worker.lastNameInput, lastName)

      .log('Enter phone number')
      .inputTextField(data.signup.worker.phoneInput, phone)

      .log('Enter email')
      .inputTextField(data.signup.worker.emailInput, email)

      .log('Enter password')
      .inputTextField(data.signup.worker.passwordInput, password)

      .log('Select optiton "How did you hear about us?"')
      .selectDropdown(data.signup.worker.foundSelect, 'Google')

      .log('Click Next btn')
      .clickElementOnText('app-registeration-form-controls button', 'Next')

      .log('Verify Terms of use is shown')
      .verifyElementContainsText('app-preview a', 'terms of use')
      .get('app-preview a')
      .contains('terms of use')
      .invoke('attr', 'href')
      .should('include', 'terms-of-use')

      .log('Verify Privacy policy is shown')
      .verifyElementContainsText('app-preview a', 'privacy policy')
      .get('app-preview a')
      .contains('privacy policy')
      .invoke('attr', 'href')
      .should('include', 'privacy-policy')

      .log('Visit to Term of use page')
      .get('app-preview a')
      .contains('terms of use')
      .invoke('attr', 'href')
      .should('include', 'terms-of-use');
  });
});
