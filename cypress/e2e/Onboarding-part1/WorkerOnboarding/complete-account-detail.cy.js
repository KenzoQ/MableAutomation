import faker from 'faker/locale/en_AU';
import * as data from '../../../fixtures/test-data.json';

describe('Complete account detail', () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.firstName();
  const workerEmail = `automation_${firstName.toLowerCase()}_${lastName.toLowerCase()}.onboardingapi+worker@donotuse.com.au`;
  const workerPass = 'qaAutomation2021';

  before(() => {
    cy
      .createWorkerAccountAPI(
        workerEmail,
        workerPass,
        firstName,
        lastName,
      );
  });

  beforeEach(() => {
    cy
      .visit('/')
      .wait(2000)

      .loginToDashboard(
        workerEmail,
        workerPass,
      )

      .log('Click Set up your account')
      .clickElement('#urgentCallToAction a')

      .log('Verify your phone number')
      .wait(2000)
      .get('body')
      .then($body => {
        if ($body.find('app-verify-mobile-number').length > 0) {
          cy
            .inputTextField(
              'input[formcontrolname="verificationCode"]',
              '123456',
            )
            .clickElementOnText(
              'button span',
              'Submit',
            );
        }
      });
  });

  it(`
    1. ES-T974. Complete "Profile photo", meet all criteria
    2. ES-T976. Complete "Profile photo", doesn't meet all criteria
  `, () => {
    cy
      .log('Check Profile photo')
      .clickElementOnText(
        '.menu li a',
        'Profile photo',
      )
      .wait(2000)

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )
      .wait(1000)
      .verifyTextExist('Provide a profile photo.')

      .fixture('hugh-jackman.jpg')
      .as('logo')
      .get('#photoUpdate input[type=file]')
      .then(function (el) {
        // convert the logo base64 string to a blob
        const blob = Cypress.Blob.base64StringToBlob(this.logo, 'image/jpg');

        const file = new File([blob], 'hugh-jackman.jpg', { type: 'image/jpg' });
        const list = new DataTransfer();

        list.items.add(file);
        const myFileList = list.files;

        el[0].files = myFileList;
        el[0].dispatchEvent(new Event('change', { bubbles: true }));
      })
      .wait(2000)
      .log('Click Use this photo')
      .clickElementOnText(
        'button span',
        'Use this photo',
      )

      .verifyTextVisible('Your bio')
      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Back',
      )

      .goToSetUpAccount()

      .log('Check Profile photo')
      .clickElementOnText(
        '.menu li a',
        'Profile photo',
      )

      .log('Verify photo was uploaded')
      .verifyElementVisible('.avatar');
  });

  it('ES-T129. Complete "Your name" details, legal name is "Yes"', () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.firstName();

    cy
      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )
      .wait(2000)

      .log('Input the first name')
      .inputTextField(
        data.onboarding.firstName,
        firstName,
      )

      .log('Input the last name')
      .inputTextField(
        data.onboarding.lastName,
        lastName,
      )

      .log('On "Is this your legal name?" question, select "Yes"')
      .clickElementOnText(
        '.radioBtn span.radioLabel',
        'Yes',
      )
      .verifyTextNotExist('Please select an option')

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .goToSetUpAccount()

      .log('Verify your name')
      .wait(2000)
      .verifyTextVisible('Your name')
      .verifyTextVisible('Account details')
      .log('Verify first name')
      .getAttribute(data.onboarding.firstName, 'val')
      .then((text) => cy.expect(text).to.equal(firstName))

      .log('Verify last name')
      .getAttribute(data.onboarding.lastName, 'val')
      .then((text) => cy.expect(text).to.equal(lastName));
  });

  it('ES-T262. Complete "Your name" details, legal name is "No"', () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.firstName();

    cy
      .log('Input the first name')
      .inputTextField(
        data.onboarding.firstName,
        firstName,
      )

      .log('Input the last name')
      .inputTextField(
        data.onboarding.lastName,
        lastName,
      )

      .log('On "Is this your legal name?" question, select "Yes"')
      .clickElementOnText(
        '.radioBtn span.radioLabel',
        'No',
      )

      .log('Input the legal first name')
      .inputTextField(
        data.onboarding.legalFirstName,
        'Sanji',
      )

      .log('Input the legal last name')
      .inputTextField(
        data.onboarding.legalLastName,
        'Caldera',
      )

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .goToSetUpAccount()

      .log('Verify your name')
      .wait(2000)
      .verifyTextVisible('Your name')
      .verifyTextVisible('Account details')
      .getAttribute(data.onboarding.firstName, 'val')
      .then((text) => cy.expect(text).to.equal(firstName))

      .log('Verify last name')
      .getAttribute(data.onboarding.lastName, 'val')
      .then((text) => cy.expect(text).to.equal(lastName))

      .log('Verify legal first name')
      .getAttribute(data.onboarding.legalFirstName, 'val')
      .then((text) => cy.expect(text).to.equal('Sanji'))

      .log('Verify legal last name')
      .getAttribute(data.onboarding.legalLastName, 'val')
      .then((text) => cy.expect(text).to.equal('Caldera'));
  });

  it('ES-T978. Complete "Your bio" details', () => {
    cy
      .log('Check Your bio')
      .clickElementOnText(
        '.menu li a',
        'Your bio',
      )
      .verifyTextVisible('Bio guidelines')

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )
      .verifyTextExist('Provide your bio with a minimum of 200 characters')

      .log('Click add your bio')
      .inputTextField(
        data.onboarding.bioTextarea,
        `add bio - automation testing - ${new Date()} rem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not  five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
      )
      .verifyTextNotExist('Provide your bio with a minimum of 200 characters')

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .goToSetUpAccount()

      .log('Check Profile photo')
      .clickElementOnText(
        '.menu li a',
        'Your bio',
      )

      .log('Verify your bio')
      .wait(2000)
      .getAttribute(data.onboarding.bioTextarea, 'val')
      .then((text) => cy.expect(text).to.be.not.null);
  });

  it('ES-T980. Complete "Other personal info" details', () => {
    cy
      .log('Check Other personal info')
      .clickElementOnText(
        '.menu li a',
        'Other personal info',
      )
      .wait(2000)

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )
      .wait(1000)
      .verifyTextExist('Please select gender')
      .verifyTextExist('Select a birth date (Day/Month/Year)')

      .log('Update gender')
      .clickElementOnText(
        '.radioBtn span.radioLabel',
        'Female',
      )
      .verifyTextNotExist('Please select gender')

      .log('Update birthday')
      .selectDropdown(
        data.onboarding.birthDate,
        '4',
        0,
      )
      .selectDropdown(
        data.onboarding.birthDate,
        'May',
        1,
      )
      .selectDropdown(
        data.onboarding.birthDate,
        '1999',
        2,
      )
      .verifyTextNotExist('Select a birth date (Day/Month/Year)')

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .goToSetUpAccount()

      .log('Check Profile photo')
      .clickElementOnText(
        '.menu li a',
        'Other personal info',
      )

      .log('Verify the other personal info')
      .wait(2000)
      .getAttributeAtPosition(data.onboarding.birthDate, 'val', 0)
      .then((text) => cy.expect(text).to.equal('4'));
  });

  it('ES-T982. Complete "Address" details, same postal address', () => {
    cy
      .log('Check Your bio')
      .clickElementOnText(
        '.menu li a',
        'Address',
      )
      .wait(2000)
      .verifyTextVisible('Address')

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )
      .wait(2000)
      .verifyTextExist('Provide a residential address')
      .verifyTextExist('Provide a postcode/suburb')

      .log('Input Residential Address')
      .inputTextField(
        data.onboarding.residentialAddress,
        'Residential Address',
      )

      .log('Input postcode')
      .inputTextField(
        data.onboarding.residentialPostcode,
        '2000',
      )
      .clickElement('.suggestions .listOption', true, 0)

      .log('Click "Same as resident address" checkbox')
      .clickElement(data.onboarding.sameAsResidentialAddress, true)

      .verifyTextNotExist('Provide a postcode/suburb')
      .verifyTextNotExist('Provide a residential address')

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .goToSetUpAccount()

      .log('Click address tab')
      .clickElementOnText(
        '.menu li a',
        'Address',
      )
      .wait(2000)

      .log('Verify the other personal info')
      .getAttribute(data.onboarding.residentialAddress, 'val')
      .then((text) => cy.expect(text).to.equal('Residential Address'))

      .getAttribute(data.onboarding.postalAddress, 'val')
      .then((text) => cy.expect(text).to.equal('Residential Address'))

      .getAttribute(data.onboarding.postalPostcode, 'val')
      .then((text) => cy.expect(text).to.includes('2000'))

      .getAttribute(data.onboarding.residentialPostcode, 'val')
      .then((text) => cy.expect(text).to.includes('2000'));
  });

  it('ES-T986. Complete "Your ABN" details, valid ABN', () => {
    const ABN = '42992841827';
    const legalFirstName = 'John';
    const legalLastName = 'Anderson';

    // Precondition : Fill legalFirstName and legalLastName to match the ABN

    cy
      .log('Check Your ABN')
      .clickElementOnText(
        '.menu li a',
        'Your name',
      )

      .clickElementOnText('span.radioLabel', 'No')
      .inputTextField('input[formcontrolname="legalFirstName"]', legalFirstName)
      .inputTextField('input[formcontrolname="legalLastName"]', legalLastName)

      .clickElementOnText(
        '#stepsAction button',
        'Next',
      );

    cy
      .log('Check Your ABN')
      .clickElementOnText(
        '.menu li a',
        'Your ABN',
      )
      .verifyTextVisible('Your ABN')
      .wait(2000)

      .log('Verify Read more is visible')
      .verifyElementContainsText(
        'a',
        'Read more',
      )

      .log('Verify Helpful tips when applying for an ABN is visible')
      .verifyElementContainsText(
        '.helpfulArticles a',
        'Helpful tips when applying for an ABN',
      )

      .log('Verify Why do I need an ABN? is visible')
      .verifyElementContainsText(
        '.helpfulArticles a',
        'Why do I need an ABN?',
      )

      .log('Input abn')
      .inputTextField(
        data.onboarding.abn,
        '49 501 ',
      )
      .verifyTextVisible('Please enter 11 digit number')

      .log('Enter an invalid 11 digit ABN')
      .inputTextField(
        data.onboarding.abn,
        ABN,
      )
      .verifyTextNotExist('Please enter 11 digit number')

      .log('Click Validate ABN')
      .clickElementOnText(
        'button span',
        'Validate ABN',
      )
      .verifyTextExist('ABN is valid')

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .goToSetUpAccount()

      .log('Click Your ABN tab')
      .clickElementOnText(
        '.menu li a',
        'Your ABN',
      )

      .log('Verify the other personal info')
      .wait(3000)
      .getAttribute(data.onboarding.abn, 'val')
      .then((text) => cy.expect(text).to.equal(ABN));
  });

  it('ES-T988. Complete "Your ABN" details, invalid ABN', () => {
    cy
      .log('Check Your ABN')
      .clickElementOnText(
        '.menu li a',
        'Your ABN',
      )

      .log('Verify Read more is visible')
      .verifyElementContainsText(
        'a',
        'Read more',
      )

      .log('Verify Helpful tips when applying for an ABN is visible')
      .verifyElementContainsText(
        '.helpfulArticles a',
        'Helpful tips when applying for an ABN',
      )

      .log('Verify Why do I need an ABN? is visible')
      .verifyElementContainsText(
        '.helpfulArticles a',
        'Why do I need an ABN?',
      )

      .log('Input abn')
      .inputTextField(
        data.onboarding.abn,
        '49 501 ',
      )
      .verifyTextVisible('Please enter 11 digit number')

      .log('Enter an invalid 11 digit ABN')
      .inputTextField(
        data.onboarding.abn,
        '11111111111',
      )
      .verifyTextNotExist('Please enter 11 digit number')

      .log('Click "ABN is valid"')
      .wait(2000)
      .clickElementOnText('button span', 'ABN is valid')
      .verifyTextVisible('Valid ABN required. New ABNs can take 24 hours to become active. Try again in 24 hours.')

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )
      .verifyTextExist('Emergency contact')

      .goToSetUpAccount()

      .log('Click Your ABN tab')
      .clickElementOnText(
        '.menu li a',
        'Your ABN',
      )

      .log('Verify the other personal info')
      .wait(2000)
      .getAttribute(data.onboarding.abn, 'val')
      .then((text) => cy.expect(text).to.equal('11111111111'));
  });

  it('ES-T990. Complete "Emergency contact" details', () => {
    const contactLastName = 'last name';
    const name = faker.name.findName();
    const phone = '0491570111';
    cy
      .log('Check Your ABN')
      .clickElementOnText(
        '.menu li a',
        'Emergency contact',
      )
      .verifyTextVisible('Emergency contact')

      .get(data.accountSetting.emergency.firstNameInSetup)
      .clear()

      .get(data.onboarding.phone)
      .clear()

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .verifyTextExist('Input a valid phone number')

      .log('Input first and last name of emergecy')
      .log('Update the contact fullname')
      .inputTextField(data.accountSetting.emergency.firstNameInSetup, name)
      .inputTextField(data.accountSetting.emergency.lastNameInSetup, contactLastName)
      .verifyTextNotExist('Provide a first name')

      .log('Input the phone')
      .inputTextField(
        data.onboarding.phone,
        phone,
      )
      .verifyTextNotExist('Input a valid phone number')

      .log('Input relationship')
      .selectDropdown(
        data.onboarding.relationship,
        'Immediate Family',
      )
      .verifyTextNotExist('Provide a relationship.')

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .goToSetUpAccount()

      .log('Check Your ABN')
      .clickElementOnText(
        '.menu li a',
        'Emergency contact',
      )

      .verifyTextVisible('Emergency contact')
      .wait(2000)
      .getAttribute(data.onboarding.phone, 'val')
      .then((text) => cy.expect(text).to.equal(phone))

      .getAttribute(data.accountSetting.emergency.firstNameInSetup, 'val')
      .then((text) => cy.expect(text).to.equal(name));
  });
});
