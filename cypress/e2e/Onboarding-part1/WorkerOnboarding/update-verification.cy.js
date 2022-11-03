import * as data from '../../../fixtures/test-data.json';
import faker from 'faker/locale/en_AU';

describe('Update verification', () => {
  const workerEmail = 'automation_kevin.onboarding.verification+worker@donotuse.com.au';
  const workerPass = 'qaAutomation2021';

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it('ES-T1662. Update "References", personal care - yes', () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.firstName();
    const phone = '0491570110';
    const email = faker.internet.email();
    const company = faker.company.companyName();

    cy
      .log('Login as worker')
      .loginToDashboard(
        workerEmail,
        workerPass,
      )

      .log('Click Resume account setup')
      .clickElementOnText(
        '#urgentCallToAction a',
        'Resume account setup',
      )

      .log('Select Reference page')
      .clickElementOnText(
        '.menu li a',
        'References',
      )

      .log('Update first name')
      .inputTextFieldAtPosition(
        data.onboarding.firstName,
        firstName,
        0,
      )

      .log('Update last name')
      .inputTextFieldAtPosition(
        data.onboarding.lastName,
        lastName,
        0,
      )

      .log('Update company')
      .inputTextFieldAtPosition(
        data.onboarding.company,
        company,
        0,
      )

      .log('Update "What was their role?"')
      .inputTextFieldAtPosition(
        data.onboarding.role,
        'testing',
        0,
      )

      .log('Update "How long have known your referee?"')
      .inputTextFieldAtPosition(
        data.onboarding.durationKnown,
        '2',
        0,
      )

      .log('On "Can referee verify that you have provided personal care services", select "Yes"')
      .clickElementOnText(
        '.radioLabel',
        'Yes',
      )

      .log('Update phone')
      .inputTextFieldAtPosition(
        data.onboarding.phoneNumber,
        phone,
        0,
      )

      .log('Update email')
      .inputTextFieldAtPosition(
        data.onboarding.email,
        email,
        0,
      )

      .log('Click Add new reference')
      .clickElementOnText(
        'button span',
        'Add new reference',
      )
      .wait(1000)

      .log('Delete reference')
      .get('[formarrayname="newReference"]')
      .last()
      .find('.link span')
      .contains('Delete reference')
      .click({ force: true })

      .waitAppLoaderNotVisible()
      .clickElementOnText('app-dialog button', 'Delete')

      .waitAppLoaderNotVisible()

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .goToSetUpAccount()

      .log('Select Reference page')
      .clickElementOnText(
        '.menu li a',
        'References',
      )

      .log('Verify Reference page')
      .verifyTextVisible('References')
      .log('Verify first name')
      .getAttributeAtPosition(data.onboarding.firstName, 'val', 0)
      .then((text) => cy.expect(text).to.equal(firstName))

      .log('Verify last name')
      .getAttributeAtPosition(data.onboarding.lastName, 'val', 0)
      .then((text) => cy.expect(text).to.equal(lastName))

      .log('Verify phone')
      .getAttributeAtPosition(data.onboarding.phoneNumber, 'val', 0)
      .then((text) => cy.expect(text).to.equal(phone))

      .log('Verify email')
      .getAttributeAtPosition(data.onboarding.email, 'val', 0)
      .then((text) => cy.expect(text).to.equal(email));
  });

  it('ES-T1666. Update stat dec, to answer "No"', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        workerEmail,
        workerPass,
      )

      .log('Click Resume account setup')
      .clickElementOnText(
        '#urgentCallToAction a',
        'Resume account setup',
      )
      .waitAppLoaderNotVisible()

      .log('Select Overseas residency page')
      .clickElementOnText(
        '.menu li a',
        'Overseas residency',
      )

      .verifyTextVisible('Overseas residency or citizenship')

      .log('Select No option')
      .clickElement('input[formcontrolname="otherCountryResident"]', true, 1)
      .waitAppLoaderNotVisible()

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )
      .waitAppLoaderNotVisible()

      .goToSetUpAccount()

      .log('Select Overseas residency page')
      .clickElementOnText(
        '.menu li a',
        'Overseas residency',
      )
      .waitAppLoaderNotVisible()

      .log('Verify Overseas residency page')
      .verifyTextVisible('Overseas residency or citizenship')
      .verifyElementNotExist('app-overseas-residency-shared');
  });

  it('ES-T1667. Update stat dec, to answer "Yes", no uploaded file', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        workerEmail,
        workerPass,
      )

      .log('Click Resume account setup')
      .clickElementOnText(
        '#urgentCallToAction a',
        'Resume account setup',
      )

      .log('Select Overseas residency page')
      .clickElementOnText(
        '.menu li a',
        'Overseas residency',
      )

      .verifyTextVisible('Overseas residency or citizenship')

      .log('Select Yes option')
      .clickElement('input[formcontrolname="otherCountryResident"]', true, 0)
      .verifyElementVisible('app-overseas-residency-shared')

      .log('Click Find out here in statuory declaration')
      .clickElementOnText(
        'app-overseas-residency-shared a',
        'Find out here',
      )

      .log('Click Ok btn in popup')
      .clickElementOnText(
        'mat-dialog-container button',
        'Ok',
      )

      .log('Select No option in "Have you completed a Statutory Declaration"')
      .clickElement('input[formcontrolname="statutoryDeclaration"]', true, 1)
      .verifyElementNotExist('app-file-upload button')

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .goToSetUpAccount()

      .log('Select Overseas residency page')
      .clickElementOnText(
        '.menu li a',
        'Overseas residency',
      )

      .log('Verify Overseas residency page')
      .verifyTextVisible('Overseas residency or citizenship')
      .verifyElementVisible('app-overseas-residency-shared')
      .verifyElementNotExist('app-file-upload button');
  });

  it('ES-T1668. Update stat dec, to answer "Yes", with uploaded file', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        workerEmail,
        workerPass,
      )

      .log('Click Resume account setup')
      .clickElementOnText(
        '#urgentCallToAction a',
        'Resume account setup',
      )

      .log('Select Overseas residency page')
      .clickElementOnText(
        '.menu li a',
        'Overseas residency',
      )

      .verifyTextVisible('Overseas residency or citizenship')

      .log('Select Yes option')
      .clickElement('input[formcontrolname="otherCountryResident"]', true, 0)
      .verifyElementVisible('app-overseas-residency-shared')

      .log('Click Find out here in statuory declaration')
      .clickElementOnText(
        'app-overseas-residency-shared a',
        'Find out here',
      )

      .log('Click Ok btn in popup')
      .clickElementOnText(
        'mat-dialog-container button',
        'Ok',
      )

      .log('Select No option in "Have you completed a Statutory Declaration"')
      .clickElement('input[formcontrolname="statutoryDeclaration"]', true, 1)
      .clickElement('input[formcontrolname="statutoryDeclaration"]', true, 0)
      .wait(2000)

      .log('Click Select file then upload a file')
      .fixture('hugh-jackman.jpg')
      .as('logo')
      .get('.fileInput input[type=file]')
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
      .verifyTextVisible('File uploaded')

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .goToSetUpAccount()

      .log('Select Overseas residency page')
      .clickElementOnText(
        '.menu li a',
        'Overseas residency',
      )

      .log('Verify Overseas residency page')
      .verifyTextVisible('Overseas residency or citizenship')
      .verifyElementVisible('app-overseas-residency-shared')
      .verifyElementNotExist('app-file-upload button')

      .log('Delete file')
      .clickElement('app-file-upload a.delete', true)
      .wait(2000)
      .clickElementOnText(
        '.mat-dialog-actions button',
        'Yes',
      );
  });

  it('ES-T1663. Update "Covid-19 training", answer to "Yes"', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        workerEmail,
        workerPass,
      )

      .log('Click Resume account setup')
      .clickElementOnText(
        '#urgentCallToAction a',
        'Resume account setup',
      )

      .log('Select Covid -19 training page')
      .clickElement(
        '.menu li a[href="/onboarding/covid-19-training"]',
        true,
      )
      .verifyTextVisible('COVID-19 Training')

      .log('On the options, select Yes')
      .clickElement('#covid19Section .radioLabel', true, 0)

      .log('Click Select file then upload a file')
      .fixture('hugh-jackman.jpg')
      .as('logo')
      .get('.fileInput input[type=file]')
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
      .verifyTextVisible('File uploaded')

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .goToSetUpAccount()

      .log('Select Overseas residency page')
      .clickElement(
        '.menu li a[href="/onboarding/covid-19-training"]',
        true,
      )
      .verifyTextVisible('COVID-19 Training')

      .log('Delete file')
      .clickElement('app-file-upload a.delete', true)
      .wait(1000)
      .clickElementOnText(
        '.mat-dialog-actions button',
        'Yes',
      );
  });

  it('ES-T1670. Update WWCC, answer to "No"', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        workerEmail,
        workerPass,
      )

      .log('Click Resume account setup')
      .clickElementOnText(
        '#urgentCallToAction a',
        'Resume account setup',
      )

      .log('Select Working with children page')
      .clickElementOnText(
        '.menu li a',
        'Working with Children Check',
      )
      .verifyTextVisible('Working with Children Check')

      .log('On the option, select No')
      .clickElement(
        'input[name="childrenCheckExists"]',
        true,
        1,
      )
      .verifyTextNotExist('Enter your Working with Children Check')

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .goToSetUpAccount()

      .log('Select Working with children page')
      .clickElementOnText(
        '.menu li a',
        'Working with Children Check',
      )
      .verifyTextVisible('Working with Children Check')
      .verifyTextNotExist('Enter your Working with Children Check');
  });

  it('ES-T1671. Update WWCC, answer to "Yes"', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        workerEmail,
        workerPass,
      )

      .log('Click Resume account setup')
      .clickElementOnText(
        '#urgentCallToAction a',
        'Resume account setup',
      )

      .log('Select Working with children page')
      .clickElementOnText(
        '.menu li a',
        'Working with Children Check',
      )

      .log('On the option, select Yes')
      .clickElement(
        'input[name="childrenCheckExists"]',
        true,
        0,
      )

      .verifyTextVisible('Enter your Working with Children Check')

      .log('Input reference number')
      .inputTextField(data.onboarding.childrenCheckNumber, '012345')

      .log('Enter expiry date')
      .selectDropdown(
        data.onboarding.childrenCheckExpiryDate,
        '4',
        0,
      )
      .selectDropdown(
        data.onboarding.childrenCheckExpiryDate,
        'January',
        1,
      )
      .selectDropdown(
        data.onboarding.childrenCheckExpiryDate,
        '2024',
        2,
      )

      .log('Click Select file then upload a file')
      .fixture('hugh-jackman.jpg')
      .as('logo')
      .get('.fileInput input[type=file]')
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
      .verifyTextVisible('File uploaded')

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .goToSetUpAccount()

      .log('Select Working with children page')
      .clickElementOnText(
        '.menu li a',
        'Working with Children Check',
      )

      .verifyTextVisible('Enter your Working with Children Check')
      .getAttribute(data.onboarding.childrenCheckNumber, 'val')
      .then((text) => cy.expect(text).to.equal('012345'))

      .log('Delete file')
      .clickElement('app-file-upload a.delete', true)
      .wait(1000)
      .clickElementOnText(
        '.mat-dialog-actions button',
        'Yes',
      );
  });

  it(`ES-T1673. Update "Insurance Declaration"
      ES-T972. Check newly completed`, () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        workerEmail,
        workerPass,
      )

      .log('Click Resume account setup')
      .clickElementOnText(
        '#urgentCallToAction a',
        'Resume account setup',
      )

      .clickElement('a[href="/onboarding/insurance-declaration"]')
      .verifyTextExist('Insurance Declaration')
      .wait(2000)

      .log('Select Insurance declaration page')
      .clickElementOnText(
        '.menu li a',
        'Insurance Declaration',
      )
      .verifyTextVisible('Insurance Declaration')

      .get('body')
      .then($body => {
        const DutyOfDisclosure = 'mat-checkbox[formcontrolname="readYourDutyOfDisclosure"] input[aria-checked="true"]';
        const FinancialServiceGuide = 'mat-checkbox[formcontrolname="readFinancialServiceGuide"] input[aria-checked="true"]';

        if ($body.find(DutyOfDisclosure).length > 0) {
          cy.clickElementOnText(
            '.mat-checkbox-label',
            ' Duty of Disclosure',
          );
        }

        if ($body.find(FinancialServiceGuide).length > 0) {
          cy.clickElementOnText(
            '.mat-checkbox-label',
            'Financial Services Guide ',
          );
        }
      })

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .log('Verify options are highlighted')
      .verifyElementVisible('.invalid mat-checkbox')

      .log('Check the Duty of Disclosure')
      .clickElementOnText(
        '.mat-checkbox-label',
        ' Duty of Disclosure',
      )

      .log('Click "Financial Services Guide " option')
      .clickElementOnText(
        '.mat-checkbox-label',
        'Financial Services Guide ',
      )

      .log('Verify options are not highlighted')
      .verifyElementNotExist('.invalid mat-checkbox')

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )
      .wait(3000)

      .log('ES-T972 (2.0) Check newly completed')
      .log('Verify "check mark" on the left NAV')
      .get('a[href="/onboarding/insurance-declaration"]')
      .siblings('app-icon')
      .find('svg path')
      .invoke('attr', 'd')
      .should('include', '9.58V9.61Z')

      .log('Click Back btn')
      .clickElementOnText(
        '#stepsAction button',
        'Back',
      )
      .wait(1000)

      .log('Check "previous" page')
      .verifyElementExist('mat-checkbox[formcontrolname="readYourDutyOfDisclosure"] input[aria-checked="true"]')
      .verifyElementExist('mat-checkbox[formcontrolname="readFinancialServiceGuide"] input[aria-checked="true"]')

      .log('On the right corner of the page, click "Back to dashboard"')
      .clickElementOnText('button span', 'Back to dashboard')
      .verifyTextExist('Resume account setup')

      .log('Click "Resume account setup" and navigate to the "page" for this test')
      .clickElementOnText('a', ' Resume account setup ')
      .clickElementOnText(
        '.menu li a',
        'Insurance Declaration',
      )
      .verifyElementExist('mat-checkbox[formcontrolname="readYourDutyOfDisclosure"] input[aria-checked="true"]')
      .verifyElementExist('mat-checkbox[formcontrolname="readFinancialServiceGuide"] input[aria-checked="true"]');
  });
});
