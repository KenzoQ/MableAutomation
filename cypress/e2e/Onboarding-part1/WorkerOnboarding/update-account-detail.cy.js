import * as data from '../../../fixtures/test-data.json';
import faker from 'faker/locale/en_AU';

describe('Update account detail', () => {
  const workerEmail = 'automation_kevin.onboarding.accountdetails+worker@donotuse.com.au';
  const workerPass = 'qaAutomation2021';

  beforeEach(() => {
    cy.visit('/').byPassAuthen();
  });

  it('ES-T1645. Update "Profile photo", meet all criteria', () => {
    cy.log('Login as worker')
      .loginToDashboard(workerEmail, workerPass)

      .log('Click Resume account setup')
      .clickElementOnText('#urgentCallToAction a', 'Resume account setup')

      .log('Check Profile photo')
      .clickElementOnText('.menu li a', 'Profile photo')

      .log('Click Upload a photo')
      .clickElementOnText('#photoUpdate button span', 'Upload new photo')

      .fixture('hugh-jackman.jpg')
      .as('logo')
      .get('input[type=file]')
      .then(function (el) {
        // convert the logo base64 string to a blob
        const blob = Cypress.Blob.base64StringToBlob(this.logo, 'image/jpg');

        const file = new File([blob], 'hugh-jackman.jpg', {
          type: 'image/jpg',
        });
        const list = new DataTransfer();

        list.items.add(file);
        const myFileList = list.files;

        el[0].files = myFileList;
        el[0].dispatchEvent(new Event('change', { bubbles: true }));
      });
    cy
      .wait(2000);

    cy.log('Click back btn')
      .clickElementOnText(
        '#stepsAction button',
        'Back',
      )
      .wait(2000)
      .clickElementOnText('button', 'Yes, use photo')

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
      .wait(1000)

      .log('Check Profile photo')
      .clickElementOnText('.menu li a', 'Profile photo')

      .log('Verify photo was uploaded')
      .verifyElementVisible('[style *=".jpg"]');
  });

  it('ES-T1641. Update "Your name" details, to legal name is "Yes"', () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.firstName();

    cy.log('Login as worker')
      .loginToDashboard(workerEmail, workerPass)

      .log('Click Resume account setup')
      .clickElementOnText('#urgentCallToAction a', 'Resume account setup')
      .verifyTextVisible('Your name')
      .verifyTextVisible('Why your legal name is important to us?')

      .log('Update the first name')
      .inputTextField(data.onboarding.firstName, firstName)

      .log('Update the last name')
      .inputTextField(data.onboarding.lastName, lastName)

      .log('On "Is this your legal name?" question, select "Yes"')
      .clickElementOnText('.radioBtn span.radioLabel', 'Yes')

      .log('Click Next btn')
      .clickElementOnText('#stepsAction button', 'Next')

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

  it('ES-T1642. Update "Your name" details, to legal name is "No"', () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    cy.log('Login as worker')
      .loginToDashboard(workerEmail, workerPass)

      .log('Click Resume account setup')
      .clickElementOnText('#urgentCallToAction a', 'Resume account setup')
      .wait(2000)

      .log('Update the first name')
      .clearTextField(data.onboarding.firstName, true)
      .inputTextField(data.onboarding.firstName, firstName)

      .log('Update the last name')
      .inputTextField(data.onboarding.lastName, lastName)

      .log('On "Is this your legal name?" question, select "Yes"')
      .clickElementOnText('.radioBtn span.radioLabel', 'No')

      .log('Update the legal first name')
      .inputTextField(data.onboarding.legalFirstName, 'Sanji')

      .log('Update the legal last name')
      .inputTextField(data.onboarding.legalLastName, 'Caldera')

      .log('Click Next btn')
      .clickElementOnText('#stepsAction button', 'Next')

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

  it(` 1.ES-T1647. Update "Your bio" details
      2.ES-T972.  Check newly completed`, () => {
    const bio = `add bio - automation testing - ${new Date()} rem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`;

    cy.log('Login as worker')
      .loginToDashboard(workerEmail, workerPass)

      .log('Click Resume account setup')
      .clickElementOnText('#urgentCallToAction a', 'Resume account setup')

      .log('Check Your bio')
      .clickElementOnText('.menu li a', 'Your bio')

      .log('Check the screen objects')
      .verifyTextVisible('Account details')
      .verifyTextVisible('Your bio')
      .verifyTextVisible(
        'Your bio is your opportunity to tell potential clients a little more about yourself. The information you provide helps them understand why you may be a good match and to decide if they’d like a meet and greet',
      )
      .verifyTextVisible('How to write your bio')
      .verifyTextVisible('Consider what a client might want to know about you')
      .verifyTextVisible('Include your key skills and interests')
      .verifyTextVisible(
        'Add a sentence about your values and things you enjoy',
      )
      .verifyTextVisible('Share your pronouns (optional)')
      .verifyTextVisible('Add your bio')
      .verifyTextVisible(
        'Take a moment to write your bio. You can update it at any time',
      )

      .log('Check the screen objects')
      .verifyTextVisible('Bio guidelines')
      .verifyTextVisible('Include your key services or areas of expertise')
      .verifyTextVisible('Say how long you’ve been providing support')
      .verifyTextVisible(
        'Add a sentence about your values and the things you enjoy',
      )
      .verifyTextVisible('Check the spelling and grammar')
      .verifyTextVisible('Use inclusive language')
      .verifyTextVisible(
        'Don’t list qualified services, for example nursing, unless you\'ve provided Mable with proof of your qualifications',
      )
      .verifyTextVisible(
        'Don’t add any personal information e.g. your phone number',
      )
      .verifyTextVisible(
        'Don’t share private details of support services you’ve provided clients',
      )

      .log('Delete the bio')
      .get(data.onboarding.bioTextarea)
      .clear()
      .click()
      .verifyTextVisible('Provide your bio with a minimum of 200 characters')

      .log('Click the Next button')
      .clickElementOnText('#stepsAction button', 'Next')
      .url()
      .should('include', '/your-bio')
      .verifyTextVisible('Provide your bio with a minimum of 200 characters')

      .log('Click "Add your bio" and enter bio details')
      .inputTextField(data.onboarding.bioTextarea, bio)

      .log('Click Next btn')
      .clickElementOnText('#stepsAction button', 'Next')
      .url()
      .should('not.contain', '/your-bio');

    cy.log('ES-T972. Check newly completed')
      .log('Click "Back" button')
      .go('back')
      .url()
      .should('include', '/your-bio')

      .log('Check "previous" page')
      .getAttribute(data.onboarding.bioTextarea, 'val')
      .then((text) => cy.expect(text).not.to.be.null)

      .log('Click "Back to dashboard"')
      .clickElementOnText('button span', 'Back to dashboard')
      .url()
      .should('include', '/dashboard')

      .log('Click Resume account setup')
      .clickElementOnText('#urgentCallToAction a', 'Resume account setup')
      .wait(2000)
      .url()
      .should('include', '/onboarding');
  });

  it('ES-T1649. Update "Other personal info" details', () => {
    cy.log('Login as worker')
      .loginToDashboard(workerEmail, workerPass)

      .log('Click Resume account setup')
      .clickElementOnText('#urgentCallToAction a', 'Resume account setup')

      .log('Check Other personal info')
      .clickElementOnText('.menu li a', 'Other personal info')

      .log('Update gender')
      .clickElementOnText('.radioBtn span.radioLabel', 'Female')

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

      .log('Click Next btn')
      .clickElementOnText('#stepsAction button', 'Next')

      .goToSetUpAccount()

      .log('Check Profile photo')
      .clickElementOnText('.menu li a', 'Other personal info')
      .verifyTextVisible('Other personal info')
      .wait(2000)

      .log('Verify the other personal info')
      .getAttributeAtPosition(data.onboarding.birthDate, 'val', 0)
      .then((text) => cy.expect(text).to.equal('4'));
  });

  it('ES-T1651. Update "Address" details, to same postal address', () => {
    cy.log('Login as worker')
      .loginToDashboard(workerEmail, workerPass)

      .log('Click Resume account setup')
      .clickElementOnText('#urgentCallToAction a', 'Resume account setup')

      .log('Check Your bio')
      .clickElementOnText('.menu li a', 'Address')
      .verifyTextVisible('Address')
      .wait(2000)

      .log('Input Residential Address')
      .inputTextField(data.onboarding.residentialAddress, 'Residential Address')

      .log('Input postcode')
      .inputTextField(data.onboarding.residentialPostcode, '2000')
      .clickElement('.suggestions .listOption', true, 0)

      .log('Click "Same as resident address" checkbox')
      .clickElement(data.onboarding.sameAsResidentialAddress, true)

      .log('Click Next btn')
      .clickElementOnText('#stepsAction button', 'Next')

      .goToSetUpAccount()

      .log('Click address tab')
      .clickElementOnText('.menu li a', 'Address')
      .verifyTextVisible('Address')
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

  it('ES-T1655. Update "Your ABN" details, to valid ABN', () => {
    cy.log('Login as worker')
      .loginToDashboard(workerEmail, workerPass)

      .log('Click Resume account setup')
      .clickElementOnText('#urgentCallToAction a', 'Resume account setup')

      .log('Check Your ABN')
      .clickElementOnText('.menu li a', 'Your ABN')
      .verifyTextVisible('Your ABN')
      .wait(2000)

      .log('Austalia business regiter is visible')
      .verifyElementContainsText('button', 'ABN is valid')

      .log('Verify Helpful tips when applying for an ABN is visible')
      .verifyElementContainsText(
        '.helpfulArticles a',
        'Helpful tips when applying for an ABN',
      )

      .log('Verify Why do I need an ABN? is visible')
      .verifyElementContainsText('.helpfulArticles a', 'Why do I need an ABN?')

      .log('Input abn')
      .inputTextField(data.onboarding.abn, '49 501 648 127')

      .log('Click Validate ABN')
      .clickElementOnText('button span', 'ABN is valid')

      .log('Click Next btn')
      .clickElementOnText('#stepsAction button', 'Next')

      .goToSetUpAccount()

      .log('Click Your ABN tab')
      .clickElementOnText('.menu li a', 'Your ABN')

      .log('Verify the other personal info')
      .verifyTextVisible('Your ABN')
      .verifyTextVisible('Enter your ABN')
      .verifyTextVisible('ABN must be in your own name and be 11 digits long.')
      .wait(1000)
      .getAttribute(data.onboarding.abn, 'val')
      .then((text) => cy.expect(text).to.equal('49501648127'));
  });
});
