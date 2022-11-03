import faker from 'faker/locale/en_AU';
import * as data from '../../../fixtures/test-data.json';

const randomCharacter = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  return characters.charAt(Math.floor(Math.random() * characters.length));
};

describe('Coordinator Sign up', () => {
  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it('ES-T707. Client sign up - coordinator (my client)', () => {
    cy
      .log('Click "Sign up here" btn')
      .clickElementOnText('a', 'Sign up here')
      .log('Verify user navigate to registration page')
      .verifyCurrentURL('register')

      .verifyListBoxText(data.signupData.account_type_title)
      .verifyListBoxText(data.signupData.account_type_lsBox)

      .log(`Click on ${data.signupData.account_type_lsBox[0]}`)
      .clickElementOnText('button span', data.signupData.account_type_lsBox[0])

      .verifyListBoxText(data.signupData.participant_relationship_title)
      .verifyListBoxText(data.signupData.participant_relationship_lsBox)

      .log(`Click on ${data.signupData.participant_relationship_lsBox[2]}`)
      .clickElementOnText('button span', data.signupData.participant_relationship_lsBox[2])

      .log('Verify coordinator login page is shown')
      .verifyTextVisible('Create Coordinator Account');
  });

  it(`
    1. ES-T2326. Coordinator sign up
    2. ES-T2708. Check newly signed up coordinator account as admin`, () => {
    const firstName = 'Automation';
    const lastName = `Coordinator${randomCharacter()}${randomCharacter()}${randomCharacter()}`;
    const phone = '0491570110';
    const email = `uatautomation+coordinator${Date.now()}@donotuse.com.au`;
    const password = 'Mable2021';
    const address = '53 Woodlands Avenue';
    const postcode = '2163';
    cy
      .log('Click "Sign up here" btn')
      .clickElementOnText('a', 'Sign up here')
      .verifyCurrentURL('register')

      .verifyListBoxText(data.signupData.account_type_lsBox)

      .log(`Click on ${data.signupData.account_type_lsBox[0]}`)
      .clickElementOnText('button span', data.signupData.account_type_lsBox[0])

      .verifyListBoxText(data.signupData.participant_relationship_title)
      .verifyListBoxText(data.signupData.participant_relationship_lsBox)

      .log(`Click on ${data.signupData.participant_relationship_lsBox[2]}`)
      .clickElementOnText('button span', data.signupData.participant_relationship_lsBox[2])

      .log('Verify coordinator login page is shown')
      .verifyTextVisible('Create Coordinator Account')

      .log('Enter an email')
      .inputTextField(
        data.signup.coordinator.emailInput,
        email,
      )

      .log('Enter password')
      .inputTextField(
        data.signup.coordinator.passwordInput,
        password,
      )

      .log('Enter first name')
      .inputTextField(
        data.signup.coordinator.firstNameInput,
        firstName,
      )

      .log('Enter last name')
      .inputTextField(
        data.signup.coordinator.lastNameInput,
        lastName,
      )

      .log('Enter address')
      .inputTextField(
        data.signup.coordinator.address,
        address,
      )

      .log('Enter postcode')
      .inputTextField(data.signup.coordinator.postcodeInput, postcode)
      .clickElement('.suggestions .listOption', true, 0)

      .log('Enter Contact phone')
      .inputTextField(
        data.signup.coordinator.phoneInput,
        phone,
      )

      .log('Check required checbox')
      .clickElement(
        data.signup.coordinator.checkbox,
        true,
        0,
      )

      .log('Click Create btn')
      .clickElementOnText(
        'button',
        'Create',
      )
      .verifyNewlyCoodinatorContent();
    cy
      .log('Click on Logout')
      .clickElementOnText('button', ' Logout')

      .forceVisit(data.url)

      .log('ES-T2708. Check newly signed up coordinator account as admin')
      .loginToDashboard(
        data.dashboardAccount.adminAccount.email,
        data.dashboardAccount.adminAccount.password,
      )

      .log('Search client')
      .inputTextField('#search-users-input', email)
      .clickElement('input[value="Search"]')
      .wait(1000)

      .log('Click Login as btn')
      .clickElementOnText('li a', 'Login as')

      .verifyNewlyCoodinatorContent()
      .screenshot();
  });

  it('ES-T2599. Coordinator sign up using an existing email', () => {
    const oldEmail = data.dashboardAccount.coordinatorAccount.email;
    const firstName = faker.name.findName();
    const lastName = faker.name.lastName();
    const phone = '0491570110';
    const password = 'Mable2021';
    const address = '53 Woodlands Avenue';
    const postcode = '2163';

    cy
      .log('Click "Sign up here" btn')
      .clickElementOnText('a', 'Sign up here')
      .log('Verify user navigate to registration page')
      .verifyCurrentURL('register')

      .verifyListBoxText(data.signupData.account_type_title)
      .verifyListBoxText(data.signupData.account_type_lsBox)

      .log(`Click on ${data.signupData.account_type_lsBox[0]}`)
      .clickElementOnText('button span', data.signupData.account_type_lsBox[0])

      .verifyListBoxText(data.signupData.participant_relationship_title)
      .verifyListBoxText(data.signupData.participant_relationship_lsBox)

      .log(`Click on ${data.signupData.participant_relationship_lsBox[2]}`)
      .clickElementOnText('button span', data.signupData.participant_relationship_lsBox[2])

      .log('Verify coordinator login page is shown')
      .verifyTextVisible('Create Coordinator Account')

      .log('Enter an email')
      .inputTextField(
        data.signup.coordinator.emailInput,
        oldEmail,
      )

      .log('Enter password')
      .inputTextField(
        data.signup.coordinator.passwordInput,
        password,
      )

      .log('Enter first name')
      .inputTextField(
        data.signup.coordinator.firstNameInput,
        firstName,
      )

      .log('Enter last name')
      .inputTextField(
        data.signup.coordinator.lastNameInput,
        lastName,
      )

      .log('Enter address')
      .inputTextField(
        data.signup.coordinator.address,
        address,
      )

      .log('Enter postcode')
      .inputTextField(data.signup.coordinator.postcodeInput, postcode)
      .clickElement('.suggestions .listOption', true, 0)

      .log('Enter address')
      .inputTextField(
        data.signup.coordinator.phoneInput,
        phone,
      )

      .log('Check required checbox')
      .clickElement(
        data.signup.coordinator.checkbox,
        true,
        0,
      )

      .log('Click Create btn')
      .clickElementOnText(
        'button',
        'Create',
      )

      .log('Verify user can not create a coodinator account')
      .verifyTextVisible('email address is already registered')
      .verifyTextVisible('Create Coordinator Account');
  });

  it('ES-TT2418. Coordinator sign up validation', () => {
    const email = faker.internet.email().toLowerCase();
    const invalidEmail = 'toantest@';
    const firstName = faker.name.findName();
    const lastName = faker.name.lastName();
    const phone = '0491570110';
    const password = 'Mable2021';
    const address = '53 Woodlands Avenue';
    const postcode = '2163';

    cy
      .log('Click "Sign up here" btn')
      .clickElementOnText('a', 'Sign up here')
      .log('Verify user navigate to registration page')
      .verifyCurrentURL('register')

      .verifyListBoxText(data.signupData.account_type_title)
      .verifyListBoxText(data.signupData.account_type_lsBox)

      .clickElementOnText('button span', data.signupData.account_type_lsBox[0])

      .verifyListBoxText(data.signupData.participant_relationship_title)
      .verifyListBoxText(data.signupData.participant_relationship_lsBox)

      .log(`Click on ${data.signupData.participant_relationship_lsBox[2]}`)
      .clickElementOnText('button span', data.signupData.participant_relationship_lsBox[2])

      .log('Verify coordinator login page is shown')
      .verifyTextVisible('Create Coordinator Account')

      .log('Click Create btn')
      .clickElementOnText(
        'button',
        'Create',
      )

      .log('The error message is visible')
      .verifyTextVisible('Input a valid email address')
      .verifyTextVisible('Use 8 characters or more for your password')
      .verifyTextVisible('Input a first name')
      .verifyTextVisible('Input a last name')
      .verifyTextVisible('Input a street address')
      .verifyTextVisible('Select a suburb')
      .verifyTextVisible('Input a valid phone number')
      .verifyTextVisible('In order to use Mable, you must check this box')

      .log('Reload page')
      .reload()
      .log('Error message is removed')
      .verifyTextNotExist('Input a valid email address')

      .log('Enter invalid email')
      .inputTextField(
        data.signup.coordinator.emailInput,
        invalidEmail,
      )
      .verifyErrorMessOnField(
        data.signup.coordinator.emailInput,
        'Input a valid email address',
      )

      .log('Enter invalid email')
      .inputTextField(
        data.signup.coordinator.emailInput,
        email,
      )
      .verifyErrorMessOnField(
        data.signup.coordinator.emailInput,
        'Input a valid email address',
        true,
      )

      .log('Enter the password less than 8 charactors')
      .inputTextField(
        data.signup.coordinator.passwordInput,
        '123',
      )
      .verifyErrorMessOnField(
        data.signup.coordinator.passwordInput,
        'Use 8 characters or more for your password',
      )

      .log('Enter the password more than 8 charactors')
      .inputTextField(
        data.signup.coordinator.passwordInput,
        password,
      )
      .verifyErrorMessOnField(
        data.signup.coordinator.passwordInput,
        'Use 8 characters or more for your password',
        true,
      )

      .log('Enter first name')
      .inputTextField(
        data.signup.coordinator.firstNameInput,
        firstName,
      )

      .log('Enter last name')
      .inputTextField(
        data.signup.coordinator.lastNameInput,
        lastName,
      )

      .log('Enter address')
      .inputTextField(
        data.signup.coordinator.address,
        address,
      )

      .log('Enter postcode')
      .inputTextField(data.signup.coordinator.postcodeInput, postcode)
      .clickElement('.suggestions .listOption', true, 0)

      .log('Enter non australia phone')
      .inputTextField(
        data.signup.coordinator.phoneInput,
        '09669660737',
      )
      .verifyErrorMessOnField(
        data.signup.coordinator.phoneInput,
        'Input a valid phone number',
      )

      .log('Enter a australia phone')
      .inputTextField(
        data.signup.coordinator.phoneInput,
        phone,
      )
      .verifyErrorMessOnField(
        data.signup.coordinator.phoneInput,
        'Input a valid phone number',
        true,
      )

      .log('Click Create btn')
      .clickElementOnText(
        'button',
        'Create',
      )

      .log('Error is not able to create a coordinator account')
      .verifyTextVisible('Some form fields are incomplete')
      .verifyTextVisible('In order to use Mable, you must check this box');
  });
});
