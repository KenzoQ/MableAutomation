import faker from 'faker/locale/en_AU';
import * as data from '../../../fixtures/test-data.json';

describe('Complete verification', () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.firstName();
  const workerEmail = `automation_${firstName.toLowerCase()}${lastName.toLowerCase()}.onboarding_auto+worker@donotuse.com.au`;
  const workerPass = 'qaAutomation2021';

  before(() => {
    cy
      .createWorkerAccountAPI(
        workerEmail,
        workerPass,
        firstName,
        lastName,
      )
      .completeServiceProfile(
        workerEmail,
        workerPass,
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

  it('ES-T261. Complete "References"', () => {
    const phone = '0491570110';
    const firstName = faker.name.firstName();
    const lastName = faker.name.firstName();
    const phone1 = '0491570158';
    const email = faker.internet.email();
    const company = faker.company.companyName();

    const firstName2 = faker.name.firstName();
    const lastName2 = faker.name.firstName();
    const phone2 = '0436458885';
    const email2 = faker.internet.email();
    const company2 = faker.company.companyName();

    cy
      .log('Select Reference page')
      .clickElementOnText(
        '.menu li a',
        'References',
      )
      .verifyTextVisible('References')
      .verifyTextVisible('References 1')

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .log('Verify the error message')
      .verifyTextVisible('Provide a first name')
      .verifyTextVisible('Provide a last name')
      .verifyTextExist('Provide a referee information maximum 100 character')

      .log('Enter first name')
      .inputTextField(
        data.onboarding.firstName,
        firstName,
      )

      .log('Enter last name')
      .inputTextField(
        data.onboarding.lastName,
        lastName,
      )

      .log('Enter company')
      .inputTextField(
        data.onboarding.company,
        company,
      )

      .log('Enter "What was their role?"')
      .inputTextField(
        data.onboarding.role,
        'testing',
      )

      .log('Enter "How long have known your referee?"')
      .inputTextField(
        data.onboarding.durationKnown,
        '2',
      )

      .log('Enter "What was your role at this company?"')
      .inputTextField(
        data.onboarding.myRole,
        'QA',
      )

      .log('Click "I confirm this person is not a family member by marriage or biological; or a partner/spouse or a client or family member of client')
      .clickElement(data.onboarding.notFamilyMember, true, 0)

      .log('Enter phone')
      .inputTextField(
        data.onboarding.phoneNumber,
        phone,
      )

      .log('Enter email')
      .inputTextField(
        data.onboarding.email,
        email,
      )

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .log('Verify the error message')
      .verifyTextVisible('This can not be your own phone number')

      .log('Enter phone again')
      .inputTextField(
        data.onboarding.phoneNumber,
        phone1,
      )

      .log('Click Add new reference')
      .clickElementOnText(
        'button span',
        'Add new reference',
      )
      .verifyTextVisible('References 2')

      .log('Input first name')
      .inputTextFieldAtPosition(
        data.onboarding.firstName,
        firstName2,
        1,
      )

      .log('Input last name')
      .inputTextFieldAtPosition(
        data.onboarding.lastName,
        lastName2,
        1,
      )

      .log('Input company')
      .inputTextFieldAtPosition(
        data.onboarding.company,
        company2,
        1,
      )

      .log('Input "What was their role?"')
      .inputTextFieldAtPosition(
        data.onboarding.role,
        'testing',
        1,
      )

      .log('Input "How long have known your referee?"')
      .inputTextFieldAtPosition(
        data.onboarding.durationKnown,
        '3',
        1,
      )

      .log('Enter "What was your role at this company?"')
      .inputTextFieldAtPosition(
        data.onboarding.myRole,
        'QA',
        1,
      )

      .log('Click "I confirm this person is not a family member by marriage or biological; or a partner/spouse or a client or family member of client')
      .clickElement(data.onboarding.notFamilyMember, true, 1)

      .log('Input phone')
      .inputTextFieldAtPosition(
        data.onboarding.phoneNumber,
        phone2,
        1,
      )

      .log('Input email')
      .inputTextFieldAtPosition(
        data.onboarding.email,
        email2,
        1,
      )

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
      .verifyTextVisible('References 1')
      .verifyTextVisible('References 2');
  });

  it(`ES-T1036. Complete "Insurance Declaration"
      ES-T972. Check newly completed`, () => {
    cy
      .log('Select Insurance declaration page')
      .clickElementOnText(
        '.menu li a',
        'Insurance Declaration',
      )
      .verifyTextVisible('Insurance Declaration')

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

  it('ES-T1023. Complete "Covid-19 training", answer "Yes"', () => {
    cy
      .log('Select Covid -19 training page')
      .clickElement(
        '.menu li a[href="/onboarding/covid-19-training"]',
        true,
      )
      .verifyTextVisible('COVID-19 Training')
      .wait(2000)

      .log('On the options, select Yes')
      .clickElement('#covid19Section .radioLabel', true, 0)

      .log('Click Select file then upload a file')
      .fixture('hugh-jackman.jpg')
      .as('logo')
      .get('app-file-upload input')
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

      .log('Delete file')
      .clickElement('app-file-upload a.delete', true)
      .clickElementOnText(
        '.mat-dialog-actions button',
        'No',
      )

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
      .clickElementOnText('#covid19Section .radioLabel', 'Yes')
      .verifyElementVisible('app-file-upload a.delete');
  });

  it('ES-T1022. Complete "Covid-19 training", answer "No"', () => {
    cy
      .log('Select Covid -19 training page')
      .clickElement(
        '.menu li a[href="/onboarding/covid-19-training"]',
        true,
      )
      .verifyTextVisible('COVID-19 Training')

      .log('On the options, select No')
      .clickElement('#covid19Section .radioLabel', true, 1)

      .log('Verify Complete course btn is visible')
      .verifyTextVisible('Complete course')

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
      .wait(2000)
      .verifyTextVisible('Complete course');
  });

  it('ES-T1027. Complete stat dec, answer "No"', () => {
    cy
      .log('Select Overseas residency page')
      .clickElementOnText(
        '.menu li a',
        'Overseas residency',
      )

      .verifyTextVisible('Overseas residency or citizenship')

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .log('Verify the error message is visible')
      .verifyTextVisible('Please select an option')

      .log('Select No option')
      .clickElement('input[formcontrolname="otherCountryResident"]', true, 1)
      .verifyElementNotExist('app-overseas-residency-shared')

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
      .verifyElementNotExist('app-overseas-residency-shared');
  });

  it('ES-T1030. Complete stat dec, answer "Yes", no uploaded file', () => {
    cy
      .log('Select Overseas residency page')
      .clickElementOnText(
        '.menu li a',
        'Overseas residency',
      )
      .verifyTextVisible('Overseas residency or citizenship')

      .log('Select Yes option')
      .clickElement('input[formcontrolname="otherCountryResident"]', true, 0)
      .waitAppLoaderNotVisible()
      .verifyElementVisible('app-overseas-residency-shared')

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )
      .waitAppLoaderNotVisible()
      .verifyTextVisible('Please select an option')

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

  it('ES-T1031. Complete stat dec, answer "Yes", with uploaded file', () => {
    cy
      .log('Select Overseas residency page')
      .clickElementOnText(
        '.menu li a',
        'Overseas residency',
      )
      .verifyTextVisible('Overseas residency or citizenship')

      .log('Select Yes option')
      .clickElementOnText('span.radioLabel', 'Yes')
    // .clickElement('input[formcontrolname="otherCountryResident"]', true, 0)

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
      .verifyElementVisible('app-file-upload button')

      .log('Click Select file then upload a file')
      .fixture('hugh-jackman.jpg')
      .as('logo')
      .get('app-file-upload input')
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
      .clickElementOnText(
        '.mat-dialog-actions button',
        'Yes',
      );
  });

  it('ES-1033. Complete WWCC, answer "No"', () => {
    cy
      .log('Select Working with children page')
      .clickElementOnText(
        '.menu li a',
        'Working with Children Check',
      )
      .verifyTextVisible('Working with Children Check')
      .wait(2)

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )
      .verifyTextVisible('Please select an option')

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

  it('ES-T1034. Complete WWCC, answer "Yes"', () => {
    cy
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

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .verifyTextVisible('Provide a Reference number')
      .verifyTextVisible('Select a date (Day/Month/Year)')

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
      .get('app-file-upload input')
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
      .verifyElementExist('app-file-upload a.delete');
  });

  it('ES-T1039. Complete "Insurance question", answer "No", 100% percent complete', () => {
    cy
      .log('Select Insurance questions page')
      .clickElementOnText(
        '.menu li a',
        'Insurance questions',
      )
      .verifyTextVisible('Insurance questions')
      .verifyTextVisible('Date of first relevant paid care experience?')
      .wait(2000)

      .log('Click Submit btn')
      .clickElementOnText(
        '#stepsAction button',
        'Submit',
      )
      .verifyTextVisible('Select a date (Day/Month/Year)')

      .log('Add date of first relevant paid experience')
      .selectDropdown(
        data.onboarding.firstExperienceDate,
        '4',
        0,
      )
      .selectDropdown(
        data.onboarding.firstExperienceDate,
        'January',
        1,
      )
      .selectDropdown(
        data.onboarding.firstExperienceDate,
        '2020',
        2,
      )

      .log('Click I am new to the industry')
      .clickElementOnText(
        '.mat-checkbox-label',
        'I am new to the industry',
      )

      .log('Select "No" options')
      .clickElement(data.onboarding.declaredBankruptcy, true, 1)
      .clickElement(data.onboarding.involvedFraud, true, 1)
      .clickElement(data.onboarding.awarePotentialClaim, true, 1)
      .clickElement(data.onboarding.professionalIndemnity, true, 1)
      .clickElement(data.onboarding.publicLiability, true, 1)
      .clickElement(data.onboarding.workersCompensation, true, 1)
      .clickElement(data.onboarding.personalAccident, true, 1)
      .clickElement(data.onboarding.declinedInsurance, true, 1)

      .log('Click Submit btn')
      .clickElementOnText(
        '#stepsAction button',
        'Submit',
      )

      .log('Click Resume account setup')
      .clickElementOnText(
        '#urgentCallToAction a',
        'Resume account setup',
      )

      .log('Select Working with children page')
      .clickElementOnText(
        '.menu li a',
        'Insurance questions',
      )
      .verifyTextVisible('Insurance questions')
      .verifyTextVisible('Date of first relevant paid care experience?')
      .wait(2000)

      .verifyTextVisible('Insurance questions')
      .getAttributeAtPosition(data.onboarding.firstExperienceDate, 'val', 0)
      .then((text) => cy.expect(text).to.equal(null))

      .getAttributeAtPosition(data.onboarding.firstExperienceDate, 'val', 1)
      .then((text) => cy.expect(text).to.equal(null))

      .getAttributeAtPosition(data.onboarding.firstExperienceDate, 'val', 2)
      .then((text) => cy.expect(text).to.equal(null));
  });

  it('ES-T1037. Complete "Insurance question", answer "Yes", not 100% percent complete', () => {
    cy
      .log('Select Insurance questions page')
      .clickElementOnText(
        '.menu li a',
        'Insurance questions',
      )
      .verifyTextVisible('Insurance questions')
      .verifyTextVisible('Date of first relevant paid care experience?')
      .wait(2000)

      .log('Add date of first relevant paid experience')
      .selectDropdown(
        data.onboarding.firstExperienceDate,
        '12',
        0,
      )
      .selectDropdown(
        data.onboarding.firstExperienceDate,
        'May',
        1,
      )
      .selectDropdown(
        data.onboarding.firstExperienceDate,
        '2020',
        2,
      )

      .log('Select "Yes" options')
      .clickElement(data.onboarding.declaredBankruptcy, true, 0)
      .clickElement(data.onboarding.involvedFraud, true, 0)
      .clickElement(data.onboarding.awarePotentialClaim, true, 0)
      .clickElement(data.onboarding.professionalIndemnity, true, 0)
      .clickElement(data.onboarding.publicLiability, true, 0)
      .clickElement(data.onboarding.workersCompensation, true, 0)
      .clickElement(data.onboarding.personalAccident, true, 0)
      .clickElement(data.onboarding.declinedInsurance, true, 0)

      .log('Add date of bank ruptcy day')
      .selectDropdown(
        data.onboarding.bankruptcyDate,
        '21',
        0,
      )
      .selectDropdown(
        data.onboarding.bankruptcyDate,
        'July',
        1,
      )
      .selectDropdown(
        data.onboarding.bankruptcyDate,
        '2020',
        2,
      )

      .log('Add description')
      .inputTextField(
        data.onboarding.bankruptcyExplanation,
        'complete verification - test automation',
      )
      .inputTextField(
        data.onboarding.futureClaimAgainstExplanation,
        'complete verification - test automation',
      )
      .inputTextField(
        data.onboarding.futureClaimAgainstPrevention,
        'complete verification - test automation',
      )
      .inputTextField(
        data.onboarding.claimHistoryMedPiExplanation,
        'complete verification - test automation',
      )
      .inputTextField(
        data.onboarding.claimHistoryMedPiPrevention,
        'complete verification - test automation',
      )
      .inputTextField(
        data.onboarding.claimHistoryCgiExplanation,
        'complete verification - test automation',
      )
      .inputTextField(
        data.onboarding.claimHistoryCgiPrevention,
        'complete verification - test automation',
      )
      .inputTextField(
        data.onboarding.workersCompClaimDuties,
        'complete verification - test automation',
      )
      .inputTextField(
        data.onboarding.workersCompClaimExplanation,
        'complete verification - test automation',
      )
      .inputTextField(
        data.onboarding.claimHistoryPersonalAccidentExplanation,
        'complete verification - test automation',
      )
      .inputTextField(
        data.onboarding.claimHistoryPersonalAccidentPrevention,
        'complete verification - test automation',
      )
      .inputTextField(
        data.onboarding.workersCompClaimEmployerName,
        'test autoamtion',
      )

      .log('Add date of workers comp claim day')
      .selectDropdown(
        data.onboarding.workersCompClaimDay,
        '22',
        0,
      )
      .selectDropdown(
        data.onboarding.workersCompClaimDay,
        'July',
        1,
      )
      .selectDropdown(
        data.onboarding.workersCompClaimDay,
        '2020',
        2,
      )

      .log('Click Select file then upload a file')
      .fixture('hugh-jackman.jpg')
      .as('logo')
      .get('app-file-upload input')
      .eq(0)
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

      .get('app-file-upload input')
      .eq(1)
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

      .log('Click Submit btn')
      .clickElementOnText(
        '#stepsAction button',
        'Submit',
      )

      .log('Click Resume account setup')
      .verifyElementVisible('app-navigation-old')
      .clickElement(
        '#urgentCallToAction a',
      )

      .log('Select Working with children page')
      .clickElementOnText(
        '.menu li a',
        'Insurance questions',
      )
      .verifyTextVisible('Insurance questions')
      .verifyTextVisible('Date of first relevant paid care experience?')
      .wait(2000)

      .log('Verify the result')
      .verifyElementExist(data.onboarding.bankruptcyExplanation)
      .verifyElementExist(data.onboarding.futureClaimAgainstExplanation)
      .verifyElementExist(data.onboarding.futureClaimAgainstPrevention)
      .verifyElementExist(data.onboarding.claimHistoryMedPiExplanation)
      .verifyElementExist(data.onboarding.claimHistoryMedPiPrevention);
  });

  it('ES-T1021. Complete "References", unanswered services', () => {
    cy
      .loginToDashboard(
        'automation_henry.onboarding+worker@donotuse.com.au',
        workerPass,
      )

      .log('Click Set up your account')
      .clickElement('#urgentCallToAction a')

      .log('Click "Go to the service"')
      .clickElementOnText('app-onboarding-menu .menuHeading p', 'Your services')
      .waitAppLoaderNotVisible()
      .clickElementOnText('app-onboarding-menu .menuHeading p', 'Your services')
      .waitAppLoaderNotVisible()
      .clickElementOnText('a[href="/onboarding/services-you-offer"]', 'Services you offer')
      .verifyTextVisible('Services you offer')

      .log('Select Reference page')
      .clickElementOnText(
        '.menu li a',
        'References',
      )
      .verifyTextVisible('References')

      .clickElementOnText('a[href="/onboarding/services-you-offer"]', 'Services you offer')
      .verifyElementContainsText(
        'a[href="/onboarding/services-you-offer"]',
        'Services you offer',
      );
  });

  it('ES-T1020. Complete "References", personal care - no', () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.firstName();
    const phone = '0491570110';
    const email = faker.internet.email();
    const company = faker.company.companyName();

    cy
      .loginToDashboard(
        'automation_luke.onboarding+worker@donotuse.com.au',
        workerPass,
      )

      .log('Click Set up your account')
      .clickElement('#urgentCallToAction a')

      .log('Select Reference page')
      .clickElementOnText(
        '.menu li a',
        'References',
      )
      .verifyTextVisible('References')
      .verifyTextVisible('References 1')

      .log('Enter first name')
      .inputTextField(
        data.onboarding.firstName,
        firstName,
      )

      .log('Enter last name')
      .inputTextField(
        data.onboarding.lastName,
        lastName,
      )

      .log('Enter company')
      .inputTextField(
        data.onboarding.company,
        company,
      )

      .log('Enter "What was their role?"')
      .inputTextField(
        data.onboarding.role,
        'testing',
      )

      .log('Enter "How long have known your referee?"')
      .inputTextField(
        data.onboarding.durationKnown,
        '2',
      )

      .log('Enter "What was your role at this company?"')
      .inputTextField(
        data.onboarding.myRole,
        'QA',
      )

      .log('Enter "What was their role?"')
      .inputTextField(
        data.onboarding.jobTitle,
        'job title',
      )

      .log('Enter the start date')
      .selectDropdown(
        data.onboarding.startDateMonth,
        'May',
      )
      .selectDropdown(
        data.onboarding.startDateYear,
        '2020',
      )

      .log('Enter the end date')
      .selectDropdown(
        data.onboarding.endDateMonth,
        'May',
      )
      .selectDropdown(
        data.onboarding.endDateYear,
        '2021',
      )

      .log('On "Can referee verify that you have provided personal care services", select "Yes"')
      .clickElementOnText(
        '.radioLabel',
        'No',
      )

      .log('Click "I confirm this person is not a family member by marriage or biological; or a partner/spouse or a client or family member of client')
      .clickElement(data.onboarding.notFamilyMember, true, 0)

      .log('Enter phone')
      .inputTextField(
        data.onboarding.phoneNumber,
        phone,
      )

      .log('Enter email')
      .inputTextField(
        data.onboarding.email,
        email,
      )

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )
      .verifyTextExist('We are only able to accept references who can verify you have provided these services.');
  });
});
