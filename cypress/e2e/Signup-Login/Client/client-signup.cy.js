/* eslint-disable camelcase */
import faker from 'faker/locale/en_AU';
import * as data from '../../../fixtures/test-data.json';

describe('Client SignUp', () => {
  // const { url } = data;
  const { account_type_title,
    account_type_lsBox,
    participant_relationship_title,
    participant_relationship_lsBox,
    age_gate_title,
    age_gate_lsBox,
    age_gate_farmily_title,
    age_gate__family_lsBox,
    suburb_title,
    type_of_care_title,
    type_of_care_lsBox,
    type_of_care_over18_lsBox,
    payment_title,
    payment_lsBox,
    ndis_title,
    ndis_lsBox,
    hours_title,
    hours_lsbox,
    // eslint-disable-next-line no-unused-vars
    urgency_of_care_title,
    // eslint-disable-next-line no-unused-vars
    urgency_of_care_lsbox,
    detail_title,
    review_title,
    review_checkbox,
    href,
    // successful_title,
    // successful_button,
    // dashboard_title,
    participant_details_title,
    under18,
    alertCheckBox,
    // urlCoordinatorsRegister,
    coordinatorsRegisterTexts,
    detailsData } = data.signupData;

  beforeEach(() => {
    detailsData.firstName = faker.name.firstName();
    detailsData.participantFirstName = faker.name.firstName();
    detailsData.lastName = faker.name.lastName();
    detailsData.participantLastName = faker.name.lastName();
    detailsData.phone = '0491570110';
    detailsData.email = faker.internet.email().toLowerCase();
    detailsData.password = 'password';
    detailsData.postcode = '2000';
    cy
      .visit('/')
      .byPassAuthen();
  });

  it('ES-T1952. Client sign up - coordinator (my client)', () => {
    const list = Object.values(coordinatorsRegisterTexts);
    cy
      .log('Click "Sign up here" btn')
      .clickElement('#content a[href="/register"]')
      .log('Verify user navigate to registration page')
      .verifyCurrentURL('register')

      .verifyListBoxText(account_type_title)
      .verifyListBoxText(account_type_lsBox)

      .log(`click on ${account_type_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', account_type_lsBox[0])

      .verifyListBoxText(participant_relationship_title)
      .verifyListBoxText(participant_relationship_lsBox)

      .log(`click on ${participant_relationship_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', participant_relationship_lsBox[2])

      .log('Verify /coordinators/register')
      .verifyCurrentURL('/coordinators/register')

      .log('Verify all texts')
      .verifyListBoxText(list);
  });

  it('ES-T710. Client sign up using an existing email', () => {
    detailsData.email = 'logan.client.alz4nm4rpw@gmail.com';
    cy
      .log('Click "Sign up here" btn')
      .clickElement('#content a[href="/register"]')
      .log('Verify user navigate to registration page')
      .verifyCurrentURL('register')

      .verifyListBoxText(account_type_title)
      .verifyListBoxText(account_type_lsBox)

      .log(`click on ${account_type_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', account_type_lsBox[0])

      .verifyListBoxText(participant_relationship_title)
      .verifyListBoxText(participant_relationship_lsBox)

      .log(`click on ${participant_relationship_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', participant_relationship_lsBox[0])

      .verifyListBoxText(age_gate_title)
      .verifyListBoxText(age_gate_lsBox)

      .log(`click on ${age_gate_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', age_gate_lsBox[0])

      .verifyListBoxText(suburb_title)
      .inputTextField(data.signup.worker.postcodeInput, detailsData.postcode)
      .clickElement(data.signup.worker.optionSuburb, true, 0)

      .verifySuburbTextbox(detailsData.postcode)

      .log('Click Next btn')
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(type_of_care_title)
      .verifyListBoxText(type_of_care_lsBox)

      .log(`click on ${type_of_care_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', type_of_care_lsBox[0])

      .verifyListBoxText(payment_title)
      .verifyListBoxText(payment_lsBox)

      .log(`click on ${payment_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', payment_lsBox[0])

      .verifyListBoxText(ndis_title)
      .verifyListBoxText(ndis_lsBox)

      .log(`click on ${ndis_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', ndis_lsBox[0])

    // .urgentCareSteps()

      .verifyListBoxText(hours_title)
      .verifyListBoxText(hours_lsbox)

      .log(`click on ${hours_lsbox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', hours_lsbox[0])

      .verifyListBoxText(detail_title)

      .inputDetailsPage(detailsData)

      .log('Click Next btn')
      .clickElementOnText(data.signup.worker.button, 'Next')

      .log('Verify "Your email address is already registered."')
      .verifyTextVisible('Your email address is already registered.', 'Next')

      .log('Click Reset password')
      .clickElementOnText(
        '.status a',
        'Reset password?',
      )
      .verifyTextVisible('Reset password');
  });

  it(`
    ES-T708. Client sign up validation (over 18)
    ES-T1102. Marketing checkbox validation`, () => {
    detailsData.found = 'News Article';
    cy
      .log('Click "Sign up here" btn')
      .clickElement('#content a[href="/register"]')
      .log('Verify user navigate to registration page')
      .verifyCurrentURL('register')

      .verifyListBoxText(account_type_title)
      .verifyListBoxText(account_type_lsBox)
      .log(`click on ${account_type_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', account_type_lsBox[0])

      .log('Click Back btn')
      .clickElementOnText(data.signup.worker.button, 'Back')

      // Verify account type is saved
      .verifyListBoxText(account_type_title)
      .verifyListBoxText(account_type_lsBox)
      .verfyOptionByTextIsSelected(account_type_lsBox[0])
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(participant_relationship_title)
      .verifyListBoxText(participant_relationship_lsBox)
      .log(`click on ${participant_relationship_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', participant_relationship_lsBox[0])

      .log('Click Back btn')
      .clickElementOnText(data.signup.worker.button, 'Back')

      // Verify relationship is saved
      .verifyListBoxText(participant_relationship_title)
      .verifyListBoxText(participant_relationship_lsBox)
      .verfyOptionByTextIsSelected(participant_relationship_lsBox[0])
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(age_gate_title)
      .verifyListBoxText(age_gate_lsBox)
      .log(`click on ${age_gate_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', age_gate_lsBox[0])

      .log('Click Back btn')
      .clickElementOnText(data.signup.worker.button, 'Back')
      // Verify age is saved
      .verifyListBoxText(age_gate_title)
      .verifyListBoxText(age_gate_lsBox)
      .verfyOptionByTextIsSelected(age_gate_lsBox[0])
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(suburb_title)
      .inputTextField(data.signup.worker.postcodeInput, detailsData.postcode)
      .clickElement(data.signup.worker.optionSuburb, true, 0)
      .verifySuburbTextbox(detailsData.postcode)
      .clickElementOnText(data.signup.worker.button, 'Next')

      .log('Click Back btn')
      .clickElementOnText(data.signup.worker.button, 'Back')

    // Verify suburb is saved
      .verifyListBoxText(suburb_title)
      .verifySuburbTextbox(detailsData.postcode)
      .log('Click Next btn')
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(type_of_care_title)
      .verifyListBoxText(type_of_care_lsBox)
      .log(`click on ${type_of_care_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', type_of_care_lsBox[0])

      .log('Click Back btn')
      .clickElementOnText(data.signup.worker.button, 'Back')
      // Verify type of care is saved
      .verifyListBoxText(type_of_care_title)
      .verifyListBoxText(type_of_care_lsBox)
      .verfyOptionByTextIsSelected(type_of_care_lsBox[0])
      .clickElementOnText(data.signup.worker.button, 'Next')

    // Verify payment
      .verifyListBoxText(payment_title)
      .verifyListBoxText(payment_lsBox)
      .log(`click on ${payment_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', payment_lsBox[0])

      .log('Click Back btn')
      .clickElementOnText(data.signup.worker.button, 'Back')
      // Verify payment
      .verifyListBoxText(payment_title)
      .verifyListBoxText(payment_lsBox)
      .verfyOptionByTextIsSelected(payment_lsBox[0])
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(ndis_title)
      .verifyListBoxText(ndis_lsBox)
      .log(`click on ${ndis_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', ndis_lsBox[0])

      .log('Click Back btn')
      .clickElementOnText(data.signup.worker.button, 'Back')
      // Verify the ndis is saved
      .verifyListBoxText(ndis_title)
      .verifyListBoxText(ndis_lsBox)
      .verfyOptionByTextIsSelected(ndis_lsBox[0])
      .clickElementOnText(data.signup.worker.button, 'Next')

    // .urgentCareSteps()

      .verifyListBoxText(hours_title)
      .verifyListBoxText(hours_lsbox)
      .log(`click on ${hours_lsbox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', hours_lsbox[0])

      .log('Click Back btn')
      .clickElementOnText(data.signup.worker.button, 'Back')
      // Verify the ndis is saved
      .verifyListBoxText(hours_title)
      .verifyListBoxText(hours_lsbox)
      .verfyOptionByTextIsSelected(hours_lsbox[0])
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(detail_title)

      .inputAndValidateDetailsPage(detailsData)

      .log('Click Next btn')
      .clickElementOnText(data.signup.worker.button, 'Next')

      .log('ES-T1102. Marketing checkbox validation')
      .log('Check review')
      .verifyListBoxText(review_title)
      .verifyListBoxText(review_checkbox)
      .verifyListBoxText(detailsData.firstName)
      .verifyListBoxText(detailsData.lastName)
      .verifyListBoxText(detailsData.postcode)
      .verifyListBoxText(type_of_care_lsBox[0])
      .verifyListBoxText(hours_lsbox[0])
      .verifyHrefExist(href[0])
      .verifyHrefExist(href[1])

      .log('Click Finish btn')
      .clickElementOnText(data.signup.worker.button, 'Finish')
      .checkClickSkipForNow()

      .log(`Verify the alert: ${alertCheckBox}`)
      .verifyListBoxText(alertCheckBox)

      .log('Select the required checkbox')
      .clickElementOnText(
        data.signup.worker.checkbox,
        review_checkbox[0],
      )

      .log('Select the Optional checkbox')
      .clickElementOnText(
        data.signup.worker.checkbox,
        review_checkbox[1],
      )

      .log('Click Finish btn')
      .clickElementOnText(data.signup.worker.button, 'Finish')

      .verifyElementVisible('app-verify-mobile-number')
      .clickElementByText('Skip for now')
      .clickElementByText('Next')

      .log('Tap the Invite button')
      .wait(2000)
      .clickElementOnText('button', 'Invite')

      .verifyListBoxText(['Some form fields are incomplete', 'Input a worker\'s first name', 'Input a worker\'s last name', 'Input a valid email'])

      .log('Enter Worker\'s first name')
      .inputTextField('input[formcontrolname="first_name"]', faker.name.firstName())

      .log('Enter Worker\'s last name')
      .inputTextField('input[formcontrolname="last_name"]', faker.name.lastName())

      .log('Enter Worker\'s email')
      .inputTextField('input[formcontrolname="email"]', faker.internet.email().toLowerCase())

      .log('Click "Invite"')
      .clickElementOnText('button', 'Invite')
      .wait(1000)
      .url()
      .should('include', '/dashboard');
  });

  it('ES-T709. Client sign up validation (under 18)', () => {
    detailsData.found = 'News Article';
    cy
      .log('Click "Sign up here" btn')
      .clickElement('#content a[href="/register"]')
      .log('Verify user navigate to registration page')
      .verifyCurrentURL('register')

      .verifyListBoxText(account_type_title)
      .verifyListBoxText(account_type_lsBox)
      .log(`click on ${account_type_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', account_type_lsBox[0])

      .log('Click Back btn')
      .clickElementOnText(data.signup.worker.button, 'Back')

      // Verify account type is saved
      .verifyListBoxText(account_type_title)
      .verifyListBoxText(account_type_lsBox)
      .verfyOptionByTextIsSelected(account_type_lsBox[0])
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(participant_relationship_title)
      .verifyListBoxText(participant_relationship_lsBox)
      .log(`click on ${participant_relationship_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', participant_relationship_lsBox[0])

      .log('Click Back btn')
      .clickElementOnText(data.signup.worker.button, 'Back')

      // Verify relationship is saved
      .verifyListBoxText(participant_relationship_title)
      .verifyListBoxText(participant_relationship_lsBox)
      .verfyOptionByTextIsSelected(participant_relationship_lsBox[0])
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(age_gate_title)
      .verifyListBoxText(age_gate_lsBox)
      .log(`click on ${age_gate_lsBox[1]}`)
      .clickElementOnTextNoWaitNoPosition('button span', age_gate_lsBox[1])

      .verifyListBoxText(participant_details_title)

      .log('Click Back btn')
      .clickElementOnText(data.signup.worker.button, 'Back')
      // Verify age is saved
      .verifyListBoxText(age_gate_title)
      .verifyListBoxText(age_gate_lsBox)
      .verfyOptionByTextIsSelected(age_gate_lsBox[1])
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(participant_details_title)
      .inputAndValidateParticipantDetails(detailsData)
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(suburb_title)
      .inputTextField(data.signup.worker.postcodeInput, detailsData.postcode)
      .clickElement(data.signup.worker.optionSuburb, true, 0)
      .verifySuburbTextbox(detailsData.postcode)
      .clickElementOnText(data.signup.worker.button, 'Next')

      .log('Click Back btn')
      .clickElementOnText(data.signup.worker.button, 'Back')

    // Verify suburb is saved
      .verifyListBoxText(suburb_title)
      .verifySuburbTextbox(detailsData.postcode)
      .log('Click Next btn')
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(type_of_care_title)
      .verifyTextNotExist(type_of_care_over18_lsBox[0])
      .verifyListBoxText(type_of_care_lsBox)
      .log(`click on ${type_of_care_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', type_of_care_lsBox[0])

      .log('Click Back btn')
      .clickElementOnText(data.signup.worker.button, 'Back')
      // Verify type of care is saved
      .verifyListBoxText(type_of_care_title)
      .verifyTextNotExist(type_of_care_over18_lsBox[0])
      .verifyListBoxText(type_of_care_lsBox)
      .verfyOptionByTextIsSelected(type_of_care_lsBox[0])
      .clickElementOnText(data.signup.worker.button, 'Next')

    // Verify payment
      .verifyListBoxText(payment_title)
      .verifyListBoxText(payment_lsBox)
      .log(`click on ${payment_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', payment_lsBox[0])

      .log('Click Back btn')
      .clickElementOnText(data.signup.worker.button, 'Back')
      // Verify payment
      .verifyListBoxText(payment_title)
      .verifyListBoxText(payment_lsBox)
      .verfyOptionByTextIsSelected(payment_lsBox[0])
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(ndis_title)
      .verifyListBoxText(ndis_lsBox)
      .log(`click on ${ndis_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', ndis_lsBox[0])

      .log('Click Back btn')
      .clickElementOnText(data.signup.worker.button, 'Back')
      // Verify the ndis is saved
      .verifyListBoxText(ndis_title)
      .verifyListBoxText(ndis_lsBox)
      .verfyOptionByTextIsSelected(ndis_lsBox[0])
      .clickElementOnText(data.signup.worker.button, 'Next')

    // .urgentCareSteps()

      .verifyListBoxText(hours_title)
      .verifyListBoxText(hours_lsbox)
      .log(`click on ${hours_lsbox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', hours_lsbox[0])

      .log('Click Back btn')
      .clickElementOnText(data.signup.worker.button, 'Back')
      // Verify the ndis is saved
      .verifyListBoxText(hours_title)
      .verifyListBoxText(hours_lsbox)
      .verfyOptionByTextIsSelected(hours_lsbox[0])
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(detail_title)

      .inputAndValidateDetailsPage(detailsData)

      .log('Click Next btn')
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(review_title)
      .verifyListBoxText(under18[0])
      .verifyListBoxText(review_checkbox[1])
      .verifyListBoxText(detailsData.firstName)
      .verifyListBoxText(detailsData.lastName)
      .verifyListBoxText(detailsData.postcode)
      .verifyListBoxText(type_of_care_lsBox[0])
      .verifyListBoxText(hours_lsbox[0])
      .verifyHrefExist(href[0])
      .verifyHrefExist(href[1])

      .log('Click Finish btn')
      .clickElementOnText(data.signup.worker.button, 'Finish')
      .checkClickSkipForNow()

      .log(`Verify the alert: ${alertCheckBox}`)
      .verifyListBoxText(alertCheckBox)

      .log('Select the required checkbox')
      .clickElementOnText(
        data.signup.worker.checkbox,
        under18[0],
      )

      .log('Click Finish btn')
      .clickElementOnText(data.signup.worker.button, 'Finish')
      .verifyElementVisible('app-verify-mobile-number')
      .clickElementByText('Skip for now')
      .clickElementByText('Next')

      .log('Tap the Invite button')
      .wait(2000)
      .clickElementOnText('button', 'Invite')

      .verifyListBoxText(['Some form fields are incomplete', 'Input a worker\'s first name', 'Input a worker\'s last name', 'Input a valid email'])

      .log('Enter Worker\'s first name')
      .inputTextField('input[formcontrolname="first_name"]', faker.name.firstName())

      .log('Enter Worker\'s last name')
      .inputTextField('input[formcontrolname="last_name"]', faker.name.lastName())

      .log('Enter Worker\'s email')
      .inputTextField('input[formcontrolname="email"]', faker.internet.email().toLowerCase())

      .log('Click "Invite"')
      .clickElementOnText('button', 'Invite')
      .wait(1000)
      .url()
      .should('include', '/dashboard');
  });

  it('ES-T1099. Information privacy checkbox validation, my self', () => {
    cy
      .log('Click "Sign up here" btn')
      .clickElement('#content a[href="/register"]')
      .log('Verify user navigate to registration page')
      .verifyCurrentURL('register')

      .verifyListBoxText(account_type_title)
      .verifyListBoxText(account_type_lsBox)

      .log(`click on ${account_type_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', account_type_lsBox[0])

      .verifyListBoxText(participant_relationship_title)
      .verifyListBoxText(participant_relationship_lsBox)

      .log(`click on ${participant_relationship_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', participant_relationship_lsBox[0])

      .verifyListBoxText(age_gate_title)
      .verifyListBoxText(age_gate_lsBox)

      .log(`click on ${age_gate_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', age_gate_lsBox[0])

      .verifyListBoxText(suburb_title)
      .inputTextField(data.signup.worker.postcodeInput, detailsData.postcode)
      .clickElement(data.signup.worker.optionSuburb, true, 0)

      .verifySuburbTextbox(detailsData.postcode)

      .log('Click Next btn')
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(type_of_care_title)
      .verifyListBoxText(type_of_care_lsBox)

      .log(`click on ${type_of_care_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', type_of_care_lsBox[0])

      .verifyListBoxText(payment_title)
      .verifyListBoxText(payment_lsBox)

      .log(`click on ${payment_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', payment_lsBox[0])

      .verifyListBoxText(ndis_title)
      .verifyListBoxText(ndis_lsBox)

      .log(`click on ${ndis_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', ndis_lsBox[0])

    // .urgentCareSteps()

      .verifyListBoxText(hours_title)
      .verifyListBoxText(hours_lsbox)
      .log(`click on ${hours_lsbox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', hours_lsbox[0])

      .verifyListBoxText(detail_title)

      .inputDetailsPage(detailsData)

      .log('Click Next btn')
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(review_title)
      .verifyListBoxText(review_checkbox)
      .verifyListBoxText(detailsData.firstName)
      .verifyListBoxText(detailsData.lastName)
      .verifyListBoxText(detailsData.postcode)
      .verifyListBoxText(type_of_care_lsBox[0])
      .verifyListBoxText(hours_lsbox[0])
      .verifyHrefExist(href[0])
      .verifyHrefExist(href[1])

      .log('Click Finish btn')
      .clickElementOnText(data.signup.worker.button, 'Finish')
      .checkClickSkipForNow()

      .log(`Verify the alert: ${alertCheckBox}`)
      .verifyListBoxText(alertCheckBox)

      .log('Select the required checkbox')
      .clickElementOnText(
        data.signup.worker.checkbox,
        review_checkbox[0],
      )

      .log('Click Finish btn')
      .clickElementOnText(data.signup.worker.button, 'Finish')
      .verifyElementVisible('app-verify-mobile-number')
      .clickElementByText('Skip for now')
      .clickElementByText('Next')

      .log('Tap the Invite button')
      .wait(2000)
      .clickElementOnText('button', 'Invite')

      .verifyListBoxText(['Some form fields are incomplete', 'Input a worker\'s first name', 'Input a worker\'s last name', 'Input a valid email'])

      .log('Enter Worker\'s first name')
      .inputTextField('input[formcontrolname="first_name"]', faker.name.firstName())

      .log('Enter Worker\'s last name')
      .inputTextField('input[formcontrolname="last_name"]', faker.name.lastName())

      .log('Enter Worker\'s email')
      .inputTextField('input[formcontrolname="email"]', faker.internet.email().toLowerCase())

      .log('Click "Invite"')
      .clickElementOnText('button', 'Invite')
      .wait(1000)
      .url()
      .should('include', '/dashboard');
  });

  it('ES-T1100. Information privacy checkbox validation, someone else', () => {
    cy
      .log('Click "Sign up here" btn')
      .clickElement('#content a[href="/register"]')
      .log('Verify user navigate to registration page')
      .verifyCurrentURL('register')

      .verifyListBoxText(account_type_title)
      .verifyListBoxText(account_type_lsBox)

      .log(`click on ${account_type_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', account_type_lsBox[0])

      .verifyListBoxText(participant_relationship_title)
      .verifyListBoxText(participant_relationship_lsBox)

      .log(`click on ${participant_relationship_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', participant_relationship_lsBox[0])

      .verifyListBoxText(age_gate_title)
      .verifyListBoxText(age_gate_lsBox)

      .log(`click on ${age_gate_lsBox[1]}`)
      .clickElementOnTextNoWaitNoPosition('button span', age_gate_lsBox[1])

      .verifyListBoxText(participant_details_title)
      .inputParticipantDetails(detailsData)

      .log('Click Next btn')
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(suburb_title)
      .inputTextField(data.signup.worker.postcodeInput, detailsData.postcode)
      .clickElement(data.signup.worker.optionSuburb, true, 0)

      .verifySuburbTextbox(detailsData.postcode)

      .log('Click Next btn')
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(type_of_care_title)
      .verifyTextNotExist(type_of_care_over18_lsBox[0])
      .verifyListBoxText(type_of_care_lsBox)

      .log(`click on ${type_of_care_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', type_of_care_lsBox[0])

      .verifyListBoxText(payment_title)
      .verifyListBoxText(payment_lsBox)

      .log(`click on ${payment_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', payment_lsBox[0])

      .verifyListBoxText(ndis_title)
      .verifyListBoxText(ndis_lsBox)

      .log(`click on ${ndis_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', ndis_lsBox[0])

    // .urgentCareSteps()

      .verifyListBoxText(hours_title)
      .verifyListBoxText(hours_lsbox)

      .log(`click on ${hours_lsbox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', hours_lsbox[0])

      .verifyListBoxText(detail_title)

      .inputDetailsPage(detailsData)

      .log('Click Next btn')
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(review_title)
      .verifyListBoxText(under18[0])
      .verifyListBoxText(review_checkbox[1])
      .verifyListBoxText(detailsData.firstName)
      .verifyListBoxText(detailsData.lastName)
      .verifyListBoxText(detailsData.postcode)
      .verifyListBoxText(type_of_care_lsBox[0])
      .verifyListBoxText(hours_lsbox[0])
      .verifyHrefExist(href[0])
      .verifyHrefExist(href[1])

      .log('Click Finish btn')
      .clickElementOnText(data.signup.worker.button, 'Finish')
      .checkClickSkipForNow()

      .log(`Verify the alert: ${alertCheckBox}`)
      .verifyListBoxText(alertCheckBox)

      .log('Select the required checkbox')
      .clickElementOnText(
        data.signup.worker.checkbox,
        under18[0],
      )

      .log('Click Finish btn')
      .clickElementOnText(data.signup.worker.button, 'Finish')

      .verifyElementVisible('app-verify-mobile-number')
      .clickElementByText('Skip for now')
      .clickElementByText('Next')

      .log('Tap the Invite button')
      .wait(2000)
      .clickElementOnText('button', 'Invite')

      .verifyListBoxText(['Some form fields are incomplete', 'Input a worker\'s first name', 'Input a worker\'s last name', 'Input a valid email'])

      .log('Enter Worker\'s first name')
      .inputTextField('input[formcontrolname="first_name"]', faker.name.firstName())

      .log('Enter Worker\'s last name')
      .inputTextField('input[formcontrolname="last_name"]', faker.name.lastName())

      .log('Enter Worker\'s email')
      .inputTextField('input[formcontrolname="email"]', faker.internet.email().toLowerCase())

      .log('Click "Invite"')
      .clickElementOnText('button', 'Invite')
      .wait(1000)
      .url()
      .should('include', '/dashboard');
  });

  it('ES-T1101. View Mable terms of use and privacy policy', () => {
    cy
      .log('Click "Sign up here" btn')
      .clickElement('#content a[href="/register"]')
      .log('Verify user navigate to registration page')
      .verifyCurrentURL('register')

      .verifyListBoxText(account_type_title)
      .verifyListBoxText(account_type_lsBox)

      .log(`click on ${account_type_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', account_type_lsBox[0])

      .verifyListBoxText(participant_relationship_title)
      .verifyListBoxText(participant_relationship_lsBox)

      .log(`click on ${participant_relationship_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', participant_relationship_lsBox[0])

      .verifyListBoxText(age_gate_title)
      .verifyListBoxText(age_gate_lsBox)

      .log(`click on ${age_gate_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', age_gate_lsBox[0])

      .verifyListBoxText(suburb_title)
      .inputTextField(data.signup.worker.postcodeInput, detailsData.postcode)
      .clickElement(data.signup.worker.optionSuburb, true, 0)

      .verifySuburbTextbox(detailsData.postcode)

      .log('Click Next btn')
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(type_of_care_title)
      .verifyListBoxText(type_of_care_lsBox)

      .log(`click on ${type_of_care_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', type_of_care_lsBox[0])

      .verifyListBoxText(payment_title)
      .verifyListBoxText(payment_lsBox)

      .log(`click on ${payment_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', payment_lsBox[0])

      .verifyListBoxText(ndis_title)
      .verifyListBoxText(ndis_lsBox)

      .log(`click on ${ndis_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', ndis_lsBox[0])

    // .urgentCareSteps()

      .verifyListBoxText(hours_title)
      .verifyListBoxText(hours_lsbox)

      .log(`click on ${hours_lsbox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', hours_lsbox[0])

      .verifyListBoxText(detail_title)

      .inputDetailsPage(detailsData)

      .log('Click Next btn')
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(review_title)
      .verifyListBoxText(review_checkbox)
      .verifyListBoxText(detailsData.firstName)
      .verifyListBoxText(detailsData.lastName)
      .verifyListBoxText(detailsData.postcode)
      .verifyListBoxText(type_of_care_lsBox[0])
      .verifyListBoxText(hours_lsbox[0])
      .verifyHrefExist(href[0])
      .verifyHrefExist(href[1])

      .log('Click Finish btn')
      .clickElementOnText(data.signup.worker.button, 'Finish')
      .checkClickSkipForNow()

      .log(`Verify the alert: ${alertCheckBox}`)
      .verifyListBoxText(alertCheckBox)

      .log('Select the required checkbox')
      .clickElementOnText(
        data.signup.worker.checkbox,
        review_checkbox[0],
      )

      .log('Click Finish btn')
      .clickElementOnText(data.signup.worker.button, 'Finish')
      .verifyElementVisible('app-verify-mobile-number')
      .clickElementByText('Skip for now')
      .clickElementByText('Next')

      .log('Tap the Invite button')
      .wait(2000)
      .clickElementOnText('button', 'Invite')

      .verifyListBoxText(['Some form fields are incomplete', 'Input a worker\'s first name', 'Input a worker\'s last name', 'Input a valid email'])

      .log('Enter Worker\'s first name')
      .inputTextField('input[formcontrolname="first_name"]', faker.name.firstName())

      .log('Enter Worker\'s last name')
      .inputTextField('input[formcontrolname="last_name"]', faker.name.lastName())

      .log('Enter Worker\'s email')
      .inputTextField('input[formcontrolname="email"]', faker.internet.email().toLowerCase())

      .log('Click "Invite"')
      .clickElementOnText('button', 'Invite')
      .wait(1000)
      .url()
      .should('include', '/dashboard');
  });

  it('ES-T701. Client sign up - myself (over 18), self managed', () => {
    cy
      .log('Click "Sign up here" btn')
      .clickElement('#content a[href="/register"]')
      .log('Verify user navigate to registration page')
      .verifyCurrentURL('register')

      .verifyListBoxText(account_type_title)
      .verifyListBoxText(account_type_lsBox)

      .log(`click on ${account_type_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', account_type_lsBox[0])

      .verifyListBoxText(participant_relationship_title)
      .verifyListBoxText(participant_relationship_lsBox)

      .log(`click on ${participant_relationship_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', participant_relationship_lsBox[0])

      .verifyListBoxText(age_gate_title)
      .verifyListBoxText(age_gate_lsBox)

      .log(`click on ${age_gate_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', age_gate_lsBox[0])

      .verifyListBoxText(suburb_title)
      .inputTextField(data.signup.worker.postcodeInput, detailsData.postcode)
      .clickElement(data.signup.worker.optionSuburb, true, 0)

      .verifySuburbTextbox(detailsData.postcode)

      .log('Click Next btn')
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(type_of_care_title)
      .verifyListBoxText(type_of_care_lsBox)

      .log(`click on ${type_of_care_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', type_of_care_lsBox[0])

      .verifyListBoxText(payment_title)
      .verifyListBoxText(payment_lsBox)

      .log(`click on ${payment_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', payment_lsBox[0])

      .verifyListBoxText(ndis_title)
      .verifyListBoxText(ndis_lsBox)

      .log(`click on ${ndis_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', ndis_lsBox[0])

    // .urgentCareSteps()

      .verifyListBoxText(hours_title)
      .verifyListBoxText(hours_lsbox)

      .log(`click on ${hours_lsbox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', hours_lsbox[0])

      .verifyListBoxText(detail_title)

      .inputDetailsPage(detailsData)

      .log('Click Next btn')
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(review_title)
      .verifyListBoxText(review_checkbox)
      .verifyListBoxText(detailsData.firstName)
      .verifyListBoxText(detailsData.lastName)
      .verifyListBoxText(detailsData.postcode)
      .verifyListBoxText(type_of_care_lsBox[0])
      .verifyListBoxText(hours_lsbox[0])
      .verifyHrefExist(href[0])
      .verifyHrefExist(href[1])

      .log('Select the required checkbox')
      .clickElementOnText(
        data.signup.worker.checkbox,
        review_checkbox[0],
      )

      .log('Click Finish btn')
      .clickElementOnText(data.signup.worker.button, 'Finish')
      .verifyElementVisible('app-verify-mobile-number')
      .clickElementByText('Skip for now')
      .clickElementByText('Next')

      .log('Tap the Invite button')
      .wait(2000)
      .clickElementOnText('button', 'Invite')

      .verifyListBoxText(['Some form fields are incomplete', 'Input a worker\'s first name', 'Input a worker\'s last name', 'Input a valid email'])

      .log('Enter Worker\'s first name')
      .inputTextField('input[formcontrolname="first_name"]', faker.name.firstName())

      .log('Enter Worker\'s last name')
      .inputTextField('input[formcontrolname="last_name"]', faker.name.lastName())

      .log('Enter Worker\'s email')
      .inputTextField('input[formcontrolname="email"]', faker.internet.email().toLowerCase())

      .log('Click "Invite"')
      .clickElementOnText('button', 'Invite')
      .wait(1000)
      .url()
      .should('include', '/dashboard');
  });

  it('ES-T702. Client sign up - myself (under 18), plan managed', () => {
    cy
      .log('Click "Sign up here" btn')
      .clickElement('#content a[href="/register"]')
      .log('Verify user navigate to registration page')
      .verifyCurrentURL('register')

      .verifyListBoxText(account_type_title)
      .verifyListBoxText(account_type_lsBox)

      .log(`click on ${account_type_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', account_type_lsBox[0])

      .verifyListBoxText(participant_relationship_title)
      .verifyListBoxText(participant_relationship_lsBox)

      .log(`click on ${participant_relationship_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', participant_relationship_lsBox[0])

      .verifyListBoxText(age_gate_title)
      .verifyListBoxText(age_gate_lsBox)

      .log(`click on ${age_gate_lsBox[1]}`)
      .clickElementOnTextNoWaitNoPosition('button span', age_gate_lsBox[1])

      .verifyListBoxText(participant_details_title)
      .inputParticipantDetails(detailsData)

      .log('Click Next btn')
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(suburb_title)
      .inputTextField(data.signup.worker.postcodeInput, detailsData.postcode)
      .clickElement(data.signup.worker.optionSuburb, true, 0)

      .verifySuburbTextbox(detailsData.postcode)

      .log('Click Next btn')
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(type_of_care_title)
      .verifyTextNotExist(type_of_care_over18_lsBox[0])
      .verifyListBoxText(type_of_care_lsBox)

      .log(`click on ${type_of_care_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', type_of_care_lsBox[0])

      .verifyListBoxText(payment_title)
      .verifyListBoxText(payment_lsBox)

      .log(`click on ${payment_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', payment_lsBox[0])

      .verifyListBoxText(ndis_title)
      .verifyListBoxText(ndis_lsBox)

      .log(`click on ${ndis_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', ndis_lsBox[0])

    // .urgentCareSteps()
      .verifyListBoxText(hours_title)
      .verifyListBoxText(hours_lsbox)

      .log(`click on ${hours_lsbox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', hours_lsbox[0])

      .verifyListBoxText(detail_title)

      .inputDetailsPage(detailsData)

      .log('Click Next btn')
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(review_title)
      .verifyListBoxText(under18[0])
      .verifyListBoxText(review_checkbox[1])
      .verifyListBoxText(detailsData.firstName)
      .verifyListBoxText(detailsData.lastName)
      .verifyListBoxText(detailsData.postcode)
      .verifyListBoxText(type_of_care_lsBox[0])
      .verifyListBoxText(hours_lsbox[0])
      .verifyHrefExist(href[0])
      .verifyHrefExist(href[1])

      .log('Select the required checkbox')
      .clickElementOnText(
        data.signup.worker.checkbox,
        under18[0],
      )

      .log('Click Finish btn')
      .clickElementOnText(data.signup.worker.button, 'Finish')
      .verifyElementVisible('app-verify-mobile-number')
      .clickElementByText('Skip for now')
      .clickElementByText('Next')

      .log('Tap the Invite button')
      .wait(2000)
      .clickElementOnText('button', 'Invite')

      .verifyListBoxText(['Some form fields are incomplete', 'Input a worker\'s first name', 'Input a worker\'s last name', 'Input a valid email'])

      .log('Enter Worker\'s first name')
      .inputTextField('input[formcontrolname="first_name"]', faker.name.firstName())

      .log('Enter Worker\'s last name')
      .inputTextField('input[formcontrolname="last_name"]', faker.name.lastName())

      .log('Enter Worker\'s email')
      .inputTextField('input[formcontrolname="email"]', faker.internet.email().toLowerCase())

      .log('Click "Invite"')
      .clickElementOnText('button', 'Invite')
      .wait(1000)
      .url()
      .should('include', '/dashboard');
  });

  it('ES-T703. Client sign up - friends/family member (over 18), agency managed', () => {
    detailsData.found = 'Television';
    cy
      .log('Click "Sign up here" btn')
      .clickElement('#content a[href="/register"]')
      .log('Verify user navigate to registration page')
      .verifyCurrentURL('register')

      .verifyListBoxText(account_type_title)
      .verifyListBoxText(account_type_lsBox)

      .log(`click on ${account_type_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', account_type_lsBox[0])

      .verifyListBoxText(participant_relationship_title)
      .verifyListBoxText(participant_relationship_lsBox)

      .log(`click on ${participant_relationship_lsBox[1]}`)
      .clickElementOnTextNoWaitNoPosition('button span', participant_relationship_lsBox[1])

      .verifyListBoxText(participant_details_title)
      .inputParticipantDetails(detailsData)
      .log('Click Next btn')
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(age_gate_farmily_title)
      .verifyListBoxText(age_gate__family_lsBox)

      .log(`click on ${age_gate__family_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', age_gate__family_lsBox[0])

      .verifyListBoxText(suburb_title)
      .inputTextField(data.signup.worker.postcodeInput, detailsData.postcode)
      .clickElement(data.signup.worker.optionSuburb, true, 0)

      .verifySuburbTextbox(detailsData.postcode)

      .log('Click Next btn')
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(type_of_care_title)
      .verifyListBoxText(type_of_care_over18_lsBox)
      .verifyListBoxText(type_of_care_lsBox)

      .log(`click on ${type_of_care_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', type_of_care_lsBox[0])

      .verifyListBoxText(payment_title)
      .verifyListBoxText(payment_lsBox)

      .log(`click on ${payment_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', payment_lsBox[0])

      .verifyListBoxText(ndis_title)
      .verifyListBoxText(ndis_lsBox)

      .log(`click on ${ndis_lsBox[2]}`)
      .clickElementOnTextNoWaitNoPosition('button span', ndis_lsBox[2])

    // .urgentCareSteps()
      .verifyListBoxText(hours_title)
      .verifyListBoxText(hours_lsbox)

      .log(`click on ${hours_lsbox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', hours_lsbox[0])

      .verifyListBoxText(detail_title)

      .inputDetailsPage(detailsData)

      .log('Click Next btn')
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(review_title)
      .verifyListBoxText(under18[0])
      .verifyListBoxText(review_checkbox[1])
      .verifyListBoxText(detailsData.firstName)
      .verifyListBoxText(detailsData.lastName)
      .verifyListBoxText(detailsData.postcode)
      .verifyListBoxText(type_of_care_lsBox[0])
      .verifyListBoxText(hours_lsbox[0])
      .verifyHrefExist(href[0])
      .verifyHrefExist(href[1])

      .log('Select the required checkbox')
      .clickElementOnText(
        data.signup.worker.checkbox,
        under18[0],
      )

      .log('Click Finish btn')
      .clickElementOnText(data.signup.worker.button, 'Finish')
      .verifyElementVisible('app-verify-mobile-number')
      .clickElementByText('Skip for now')
      .clickElementByText('Next')

      .log('Tap the Invite button')
      .wait(2000)
      .clickElementOnText('button', 'Invite')

      .verifyListBoxText(['Some form fields are incomplete', 'Input a worker\'s first name', 'Input a worker\'s last name', 'Input a valid email'])

      .log('Enter Worker\'s first name')
      .inputTextField('input[formcontrolname="first_name"]', faker.name.firstName())

      .log('Enter Worker\'s last name')
      .inputTextField('input[formcontrolname="last_name"]', faker.name.lastName())

      .log('Enter Worker\'s email')
      .inputTextField('input[formcontrolname="email"]', faker.internet.email().toLowerCase())

      .log('Click "Invite"')
      .clickElementOnText('button', 'Invite')
      .wait(1000)
      .url()
      .should('include', '/dashboard');
  });

  it('ES-T704. Client sign up - friends/family member (under 18), other, pay privately', () => {
    detailsData.found = 'Television';
    const payment_lsBox_new = payment_lsBox;
    const ndis = payment_lsBox_new.splice(0, 1);
    cy
      .log('Click "Sign up here" btn')
      .clickElement('#content a[href="/register"]')
      .log('Verify user navigate to registration page')
      .verifyCurrentURL('register')

      .verifyListBoxText(account_type_title)
      .verifyListBoxText(account_type_lsBox)

      .log(`click on ${account_type_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', account_type_lsBox[0])

      .verifyListBoxText(participant_relationship_title)
      .verifyListBoxText(participant_relationship_lsBox)

      .log(`click on ${participant_relationship_lsBox[1]}`)
      .clickElementOnTextNoWaitNoPosition('button span', participant_relationship_lsBox[1])

      .verifyListBoxText(participant_details_title)
      .inputParticipantDetails(detailsData)
      .log('Click Next btn')
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(age_gate_farmily_title)
      .verifyListBoxText(age_gate__family_lsBox)

      .log(`click on "${age_gate__family_lsBox[1]}"`)
      .clickElementOnTextNoWaitNoPosition('button span', age_gate__family_lsBox[1])

      .verifyListBoxText(suburb_title)
      .inputTextField(data.signup.worker.postcodeInput, detailsData.postcode)
      .clickElement(data.signup.worker.optionSuburb, true, 0)

      .verifySuburbTextbox(detailsData.postcode)

      .log('Click Next btn')
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(type_of_care_title)
      .verifyTextNotExist(type_of_care_over18_lsBox[0])
      .verifyListBoxText(type_of_care_lsBox)

      .log(`click on "${type_of_care_lsBox[3]}"`)
      .clickElementOnTextNoWaitNoPosition('button span', type_of_care_lsBox[3])

      .verifyListBoxText(payment_title)
      .verifyListBoxText(payment_lsBox_new)
      .verifyTextNotExist(ndis[0])

      .log(`click on ${payment_lsBox_new[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', payment_lsBox_new[0])

    // .urgentCareSteps()
      .verifyListBoxText(hours_title)
      .verifyListBoxText(hours_lsbox)

      .log(`click on ${hours_lsbox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', hours_lsbox[0])

      .verifyListBoxText(detail_title)

      .inputDetailsPage(detailsData)

      .log('Click Next btn')
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(review_title)
      .verifyListBoxText(under18[0])
      .verifyListBoxText(review_checkbox[1])
      .verifyListBoxText(detailsData.firstName)
      .verifyListBoxText(detailsData.lastName)
      .verifyListBoxText(detailsData.postcode)
      .verifyListBoxText(type_of_care_lsBox[0])
      .verifyListBoxText(hours_lsbox[0])
      .verifyHrefExist(href[0])
      .verifyHrefExist(href[1])

      .log('Select the required checkbox')
      .clickElementOnText(
        data.signup.worker.checkbox,
        under18[0],
      )

      .log('Click Finish btn')
      .clickElementOnText(data.signup.worker.button, 'Finish')
      .verifyElementVisible('app-verify-mobile-number')
      .clickElementByText('Skip for now')
      .clickElementByText('Next')

      .log('Tap the Invite button')
      .wait(2000)
      .clickElementOnText('button', 'Invite')

      .verifyListBoxText(['Some form fields are incomplete', 'Input a worker\'s first name', 'Input a worker\'s last name', 'Input a valid email'])

      .log('Enter Worker\'s first name')
      .inputTextField('input[formcontrolname="first_name"]', faker.name.firstName())

      .log('Enter Worker\'s last name')
      .inputTextField('input[formcontrolname="last_name"]', faker.name.lastName())

      .log('Enter Worker\'s email')
      .inputTextField('input[formcontrolname="email"]', faker.internet.email().toLowerCase())

      .log('Click "Invite"')
      .clickElementOnText('button', 'Invite')
      .wait(1000)
      .url()
      .should('include', '/dashboard');
  });

  it('ES-T705. Client sign up - myself (over 18), HCP', () => {
    payment_lsBox[0] = 'Home Care Package';
    detailsData.found = 'Flyer';
    cy
      .log('Click "Sign up here" btn')
      .clickElement('#content a[href="/register"]')
      .log('Verify user navigate to registration page')
      .verifyCurrentURL('register')

      .verifyListBoxText(account_type_title)
      .verifyListBoxText(account_type_lsBox)

      .log(`click on ${account_type_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', account_type_lsBox[0])

      .verifyListBoxText(participant_relationship_title)
      .verifyListBoxText(participant_relationship_lsBox)

      .log(`click on ${participant_relationship_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', participant_relationship_lsBox[0])

      .verifyListBoxText(age_gate_title)
      .verifyListBoxText(age_gate_lsBox)

      .log(`click on ${age_gate_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', age_gate_lsBox[0])

      .verifyListBoxText(suburb_title)
      .inputTextField(data.signup.worker.postcodeInput, detailsData.postcode)
      .clickElement(data.signup.worker.optionSuburb, true, 0)

      .verifySuburbTextbox(detailsData.postcode)

      .log('Click Next btn')
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(type_of_care_title)
      .verifyListBoxText(type_of_care_lsBox)

      .log(`click on ${type_of_care_over18_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', type_of_care_over18_lsBox[0])

      .verifyListBoxText(payment_title)
      .verifyListBoxText(payment_lsBox)

      .log(`click on ${payment_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', payment_lsBox[0])

    // .urgentCareSteps()
      .verifyListBoxText(hours_title)
      .verifyListBoxText(hours_lsbox)

      .log(`click on ${hours_lsbox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', hours_lsbox[0])

      .verifyListBoxText(detail_title)

      .inputDetailsPage(detailsData)

      .log('Click Next btn')
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(review_title)
      .verifyListBoxText(review_checkbox)
      .verifyListBoxText(detailsData.firstName)
      .verifyListBoxText(detailsData.lastName)
      .verifyListBoxText(detailsData.postcode)
      .verifyListBoxText(type_of_care_lsBox[0])
      .verifyListBoxText(hours_lsbox[0])
      .verifyHrefExist(href[0])
      .verifyHrefExist(href[1])

      .log('Select the required checkbox')
      .clickElementOnText(
        data.signup.worker.checkbox,
        review_checkbox[0],
      )

      .log('Click Finish btn')
      .clickElementOnText(data.signup.worker.button, 'Finish')
      .verifyElementVisible('app-verify-mobile-number')
      .clickElementByText('Skip for now')
      .clickElementByText('Next')

      .log('Tap the Invite button')
      .wait(2000)
      .clickElementOnText('button', 'Invite')

      .verifyListBoxText(['Some form fields are incomplete', 'Input a worker\'s first name', 'Input a worker\'s last name', 'Input a valid email'])

      .log('Enter Worker\'s first name')
      .inputTextField('input[formcontrolname="first_name"]', faker.name.firstName())

      .log('Enter Worker\'s last name')
      .inputTextField('input[formcontrolname="last_name"]', faker.name.lastName())

      .log('Enter Worker\'s email')
      .inputTextField('input[formcontrolname="email"]', faker.internet.email().toLowerCase())

      .log('Click "Invite"')
      .clickElementOnText('button', 'Invite')
      .wait(1000)
      .url()
      .should('include', '/dashboard');
  });

  it('ES-T706. Client sign up - myself (under 18), post surgery', () => {
    cy
      .log('Click "Sign up here" btn')
      .clickElement('#content a[href="/register"]')
      .log('Verify user navigate to registration page')
      .verifyCurrentURL('register')

      .verifyListBoxText(account_type_title)
      .verifyListBoxText(account_type_lsBox)

      .log(`click on ${account_type_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', account_type_lsBox[0])

      .verifyListBoxText(participant_relationship_title)
      .verifyListBoxText(participant_relationship_lsBox)

      .log(`click on ${participant_relationship_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', participant_relationship_lsBox[0])

      .verifyListBoxText(age_gate_title)
      .verifyListBoxText(age_gate_lsBox)

      .log(`click on ${age_gate_lsBox[1]}`)
      .clickElementOnTextNoWaitNoPosition('button span', age_gate_lsBox[1])

      .verifyListBoxText(participant_details_title)
      .inputParticipantDetails(detailsData)

      .log('Click Next btn')
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(suburb_title)
      .inputTextField(data.signup.worker.postcodeInput, detailsData.postcode)
      .clickElement(data.signup.worker.optionSuburb, true, 0)

      .verifySuburbTextbox(detailsData.postcode)

      .log('Click Next btn')
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(type_of_care_title)
      .verifyTextNotExist(type_of_care_over18_lsBox[0])
      .verifyListBoxText(type_of_care_lsBox)

      .log(`click on ${type_of_care_lsBox[2]}`)
      .clickElementOnTextNoWaitNoPosition('button span', type_of_care_lsBox[2])

    // .urgentCareSteps()
      .verifyListBoxText(hours_title)
      .verifyListBoxText(hours_lsbox)

      .log(`click on ${hours_lsbox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', hours_lsbox[0])

      .verifyListBoxText(detail_title)

      .inputDetailsPage(detailsData)

      .log('Click Next btn')
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(review_title)
      .verifyListBoxText(under18[0])
      .verifyListBoxText(review_checkbox[1])
      .verifyListBoxText(detailsData.firstName)
      .verifyListBoxText(detailsData.lastName)
      .verifyListBoxText(detailsData.postcode)
      .verifyListBoxText(type_of_care_lsBox[0])
      .verifyListBoxText(hours_lsbox[0])
      .verifyHrefExist(href[0])
      .verifyHrefExist(href[1])

      .log('Select the required checkbox')
      .clickElementOnText(
        data.signup.worker.checkbox,
        under18[0],
      )

      .log('Click Finish btn')
      .clickElementOnText(data.signup.worker.button, 'Finish')
      .verifyElementVisible('app-verify-mobile-number')
      .clickElementByText('Skip for now')
      .clickElementByText('Next')

      .log('Tap the Invite button')
      .wait(2000)
      .clickElementOnText('button', 'Invite')

      .verifyListBoxText(['Some form fields are incomplete', 'Input a worker\'s first name', 'Input a worker\'s last name', 'Input a valid email'])

      .log('Enter Worker\'s first name')
      .inputTextField('input[formcontrolname="first_name"]', faker.name.firstName())

      .log('Enter Worker\'s last name')
      .inputTextField('input[formcontrolname="last_name"]', faker.name.lastName())

      .log('Enter Worker\'s email')
      .inputTextField('input[formcontrolname="email"]', faker.internet.email().toLowerCase())

      .log('Click "Invite"')
      .clickElementOnText('button', 'Invite')
      .wait(1000)
      .url()
      .should('include', '/dashboard');
  });
});
