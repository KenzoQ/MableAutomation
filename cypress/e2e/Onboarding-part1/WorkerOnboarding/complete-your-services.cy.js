import * as data from '../../../fixtures/test-data.json';
import faker from 'faker/locale/en_AU';

describe('Complete your service', () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.firstName();
  const randomUUID = Math.floor(Math.random() * (9999999));
  const workerEmail = `automation_${firstName.toLowerCase()}_${randomUUID}.onboarding+worker@donotuse.com.au`;
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

  it('ES-T993. Complete "Services you offer"', () => {
    const indexCheckbox = Math.floor(Math.random() * (3 - 0));

    cy
      .log('Chick Services you offer')
      .clickElementOnText(
        '.menu li a',
        'Services you offer',
      )

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .log('Verify the error message is visible')
      .verifyTextVisible('Please select at least one service.')

      .log('Select the offer option')
      .clickElement(
        '#servicesYouOffer mat-checkbox input',
        true,
        indexCheckbox,
      )

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .goToSetUpAccount()

      .log('Chick Services you offer')
      .clickElementOnText(
        '.menu li a',
        'Services you offer',
      )

      .verifyElementHasClass(
        '#servicesYouOffer mat-checkbox',
        'mat-checkbox-checked',
        indexCheckbox,
      );
  });

  it('ES-TT994. Complete "SSDA" service', () => {
    cy
      .log('Open your service submenu ')
      .wait(2000)
      .get('body')
      .then($el => {
        if ($el.find('ul li:nth-child(2) .menuHeading app-icon').length > 0) {
          cy
            .clickElementOnText(
              '.menuHeading p',
              'Your services',
            );
        }
      })

      .log('Chick Services you offer')
      .clickElementOnText(
        '.menu li a',
        'Services you offer',
      )

      .log('Select uncheck all options')
      .uncheckOptions()

      .log('Select SSDA')
      .clickElementOnText(
        '#servicesYouOffer mat-checkbox h3',
        'Social support & domestic assistance (SSDA)',
      )

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .log('Check SSDA page')
      .verifyTextVisible('Social support & domestic assistance')

      .log('Click plus(+) icon')
      .clickElement('.action app-icon[name="plus"]', true, 0)
      .verifyElementVisible('.mat-checkbox-layout .details')

      .log('Click minus(-) icon')
      .clickElement('.action app-icon[name="minus"]', true, 0)
      .verifyElementNotExist('.mat-checkbox-layout .details')

      .log('Select option')
      .clickElement(
        'app-onboarding-services-checkbox-list mat-checkbox input',
        true,
        '0',
      )

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .goToSetUpAccount()
      .verifyTextVisible("let's get started!")

      .log('Open your service submenu')
      .wait(2000)
      .get('body')
      .then($el => {
        if ($el.find('ul li:nth-child(2) .menuHeading app-icon').length > 0) {
          cy
            .clickElementOnText(
              '.menuHeading p',
              'Your services',
            );
        }
      })

      .log('Click SSDA')
      .clickElementOnText(
        '.menu li a',
        'SSDA',
      )

      .verifyElementHasClass(
        'mat-checkbox',
        'mat-checkbox-checked',
        '0',
      );
  });

  it('ES-T996. Complete "SSDA" service, provide transport, driver license uploaded', () => {
    cy
      .log('Open your service submenu ')
      .wait(2000)
      .get('body')
      .then($el => {
        if ($el.find('ul li:nth-child(2) .menuHeading app-icon').length > 0) {
          cy
            .clickElementOnText(
              '.menuHeading p',
              'Your services',
            );
        }
      })

      .log('Chick Services you offer')
      .clickElementOnText(
        '.menu li a',
        'Services you offer',
      )

      .log('Select uncheck all options')
      .uncheckOptions()

      .log('Select SSDA')
      .clickElementOnText(
        '#servicesYouOffer mat-checkbox h3',
        'Social support & domestic assistance (SSDA)',
      )

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .log('Check SSDA page')
      .verifyTextVisible('Social support & domestic assistance')

      .log('Select uncheck all options')
      .uncheckOptions()

      .log('Select option')
      .get('app-onboarding-services-checkbox-list mat-checkbox h3')
      .contains('Transport')
      .trigger('mouseover')
      .clickElementOnText(
        'app-onboarding-services-checkbox-list mat-checkbox h3',
        'Transport',
      )

      .fixture('hugh-jackman.jpg')
      .as('logo')
      .get('input[type=file]')
      .then(function (el) {
        // convert the logo base64 string to a blob
        const blob = Cypress.Blob.base64StringToBlob(this.logo, 'image/jpg');

        const file = new File([blob], 'hugh-jackman.jpg', { type: 'image/jpg' });
        const list = new DataTransfer();

        list.items.add(file);
        const myFileList = list.files;

        el[0].files = myFileList;

        const changeEvent = new Event('change', {
          bubbles: true,
        });

        el[0].dispatchEvent(changeEvent);
      })
      .verifyTextVisible('File uploaded')

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .goToSetUpAccount()
      .verifyTextVisible("let's get started!")

      .log('Open your service submenu')
      .wait(2000)
      .get('body')
      .then($el => {
        if ($el.find('ul li:nth-child(2) .menuHeading app-icon').length > 0) {
          cy
            .clickElementOnText(
              '.menuHeading p',
              'Your services',
            );
        }
      })

      .log('Click SSDA')
      .clickElementOnText(
        '.menu li a',
        'SSDA',
      )

      .log('Check SSDA page')
      .verifyTextVisible('Social support & domestic assistance')

      .log('Select option')
      .get('app-onboarding-services-checkbox-list mat-checkbox h3')
      .contains('Transport')
      .trigger('mouseover')
      .clickElementOnText(
        'app-onboarding-services-checkbox-list mat-checkbox h3',
        'Transport',
      )

      .log('Delete file')
      .clickElement('app-file-upload a.delete', true)
      .clickElementOnText(
        'app-dialog button',
        'Yes',
      );
  });

  it('ES-T1001. Complete "Personal care" service with uploaded documents', () => {
    cy
      .log('Open your service submenu ')
      .wait(2000)
      .get('body')
      .then($el => {
        if ($el.find('ul li:nth-child(2) .menuHeading app-icon').length > 0) {
          cy
            .clickElementOnText(
              '.menuHeading p',
              'Your services',
            );
        }
      })

      .log('Chick Services you offer')
      .clickElementOnText(
        '.menu li a',
        'Services you offer',
      )

      .log('Select Personal care')
      .clickElementOnText(
        '#servicesYouOffer mat-checkbox h3',
        'Personal care',
      )

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .log('Check Qualification page')
      .verifyTextVisible('Qualifications for personal care')

      .log('Select uncheck all options')
      .uncheckOptions()

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .log('Verify error message')
      .verifyTextVisible('Please select at least one qualifications.')

      .log('Slect options')
      .clickElementOnText(
        'app-qualifications mat-checkbox h3',
        'Certificate 3 Aged Care',
      )

      .log('Upload the file')
      .fixture('hugh-jackman.jpg')
      .as('logo')
      .get('input[type=file]')
      .then(function (el) {
        // convert the logo base64 string to a blob
        const blob = Cypress.Blob.base64StringToBlob(this.logo, 'image/jpg');

        const file = new File([blob], 'hugh-jackman.jpg', { type: 'image/jpg' });
        const list = new DataTransfer();

        list.items.add(file);
        const myFileList = list.files;

        el[0].files = myFileList;

        const changeEvent = new Event('change', {
          bubbles: true,
        });
        el[0].dispatchEvent(changeEvent);
      })
      .verifyTextVisible('File uploaded')

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .log('Check Personal care page')
      .verifyTextVisible('Personal care')

      .log('Click plus(+) icon')
      .clickElement('.action app-icon[name="plus"]', true, 0)
      .verifyElementVisible('.mat-checkbox-layout .details')

      .log('Click minus(-) icon')
      .clickElement('.action app-icon[name="minus"]', true, 0)
      .verifyElementNotExist('.mat-checkbox-layout .details')

      .log('Select option')
      .clickElement(
        'app-personal-care mat-checkbox input',
        true,
        '0',
      )

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .goToSetUpAccount()
      .verifyTextVisible("let's get started!")

      .log('Open your service submenu')
      .wait(2000)
      .get('body')
      .then($el => {
        if ($el.find('ul li:nth-child(2) .menuHeading app-icon').length > 0) {
          cy
            .clickElementOnText(
              '.menuHeading p',
              'Your services',
            );
        }
      })

      .log('Click SSDA')
      .clickElementOnText(
        '.menu li a',
        'Qualifications',
      )
      .verifyTextVisible('Qualifications for personal care')

      .log('Select uncheck all options')
      .uncheckOptions()

      .log('Select option')
      .clickElement(
        'app-qualifications mat-checkbox input',
        true,
        '0',
      )

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      );
  });

  it('ES-T1007. Complete "Nursing" service, enrolled nurse', () => {
    cy
      .log('Open your service submenu ')
      .wait(2000)
      .get('body')
      .then($el => {
        if ($el.find('ul li:nth-child(2) .menuHeading app-icon').length > 0) {
          cy
            .clickElementOnText(
              '.menuHeading p',
              'Your services',
            );
        }
      })

      .log('Chick Services you offer')
      .clickElementOnText(
        '.menu li a',
        'Services you offer',
      )

      .log('Select Nursing services')
      .clickElementOnText(
        '#servicesYouOffer mat-checkbox h3',
        'Nursing services',
      )

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .log('Check Nursing registration page')
      .verifyTextVisible('Nursing registration')

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .log('Verify error message is visible')
      .verifyTextVisible('Please select nursing type')

      .log('Select I am an enrolled nurse')
      .wait(2000)
      .clickElement('input[formcontrolname="nursingType"]', true, 1)
      .verifyTextVisible('I acknowledge my AHPRA registration has been active for at least 12 months')

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .log('The error message is visible')
      .verifyTextVisible('Provide a registration number')

      .log('Click checkboxs')
      .get('#nursingRegistration input[type="checkbox"]')
      .click({ multiple: true, force: true })

      .log('Add expiry date')
      .selectDropdown(
        data.onboarding.expiryDate,
        '4',
        0,
      )
      .selectDropdown(
        data.onboarding.expiryDate,
        'May',
        1,
      )
      .selectDropdown(
        data.onboarding.expiryDate,
        '2025',
        2,
      )

      .log('Input Registration number')
      .inputTextField(
        data.onboarding.registrationNumber,
        '123456',
      )

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .log('Check Nursing page')
      .verifyTextVisible('Nursing')
      .verifyTextVisible('Continence Assessment & Management ')

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .log('Verify error message is visible')
      .verifyTextExist('Please select at least one nursing services.')

      .log('Select Nursing service')
      .clickElement(
        'app-onboarding-services-checkbox-list input',
        true,
        1,
      )

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .goToSetUpAccount()
      .verifyTextVisible("let's get started!")

      .log('Open your service submenu')
      .wait(2000)
      .get('body')
      .then($el => {
        if ($el.find('ul li:nth-child(2) .menuHeading app-icon').length > 0) {
          cy
            .clickElementOnText(
              '.menuHeading p',
              'Your services',
            );
        }
      })

      .log('Select Nursing registration')
      .clickElementOnText(
        '.menu li a',
        'Nursing registration',
      )

      .log('Verify the result')
      .getAttribute(data.onboarding.registrationNumber, 'val')
      .then((text) => cy.expect(text).to.equal('123456'));
  });

  it('ES-T1005. Complete "Nursing" service, registered nurse', () => {
    cy
      .log('Open your service submenu ')
      .wait(2000)
      .get('body')
      .then($el => {
        if ($el.find('ul li:nth-child(2) .menuHeading app-icon').length > 0) {
          cy
            .clickElementOnText(
              '.menuHeading p',
              'Your services',
            );
        }
      })

      .log('Chick Services you offer')
      .clickElementOnText(
        '.menu li a',
        'Services you offer',
      )

      .log('Select uncheck all options')
      .uncheckOptions()

      .log('Select Nursing services')
      .clickElementOnText(
        '#servicesYouOffer mat-checkbox h3',
        'Nursing services',
      )

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .log('Check Nursing registration page')
      .verifyTextVisible('Nursing registration')

      .log('Select I am a registered nurse')
      .wait(2000)
      .clickElement('#nursingSection .radioBtn input[type="radio"]', true, 0)
      .verifyTextNotExist('I acknowledge my AHPRA registration has been active for at least 12 months')

      .log('Click checkboxs')
      .uncheckOptions()
      .clickElement('#nursingRegistration input[type="checkbox"]', true)

      .log('Add expiry date')
      .selectDropdown(
        data.onboarding.expiryDate,
        '4',
        0,
      )
      .selectDropdown(
        data.onboarding.expiryDate,
        'May',
        1,
      )
      .selectDropdown(
        data.onboarding.expiryDate,
        '2025',
        2,
      )

      .log('Input Registration number')
      .inputTextField(
        data.onboarding.registrationNumber,
        '12345645',
      )

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .log('Check Nursing page')
      .verifyTextVisible('Nursing')
      .verifyTextVisible('Continence Assessment & Management')

      .log('Select Nursing service')
      .clickElement(
        'app-onboarding-services-checkbox-list input',
        true,
        2,
      )

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .goToSetUpAccount()
      .verifyTextVisible("let's get started!")

      .log('Open your service submenu')
      .wait(2000)
      .get('body')
      .then($el => {
        if ($el.find('ul li:nth-child(2) .menuHeading app-icon').length > 0) {
          cy
            .clickElementOnText(
              '.menuHeading p',
              'Your services',
            );
        }
      })

      .log('Select Nursing registration')
      .clickElementOnText(
        '.menu li a',
        'Nursing registration',
      )

      .log('Verify the result')
      .getAttribute(data.onboarding.registrationNumber, 'val')
      .then((text) => cy.expect(text).to.equal('12345645'));
  });

  it('ES-T1013. Complete "Additional training" with no selected additional training', () => {
    cy
      .log('Open your service submenu ')
      .wait(2000)
      .get('body')
      .then($el => {
        if ($el.find('ul li:nth-child(2) .menuHeading app-icon').length > 0) {
          cy
            .clickElementOnText(
              '.menuHeading p',
              'Your services',
            );
        }
      })
      .log('Click Additional tranining')
      .wait(2000)
      .clickElementOnText(
        '.menu li a',
        'Additional training',
      )
      .verifyTextVisible('Additional training (optional)')

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .log('Verify check mark is visible')
      .verifyElementContainsText('.subMenu li a', 'Additional training')

      .goToSetUpAccount();

    cy.log('Click Additional tranining')
      .wait(2000)
      .clickElementOnText(
        '.menu li a',
        'Additional training',
      )
      .verifyTextVisible('Additional training (optional)')

      .verifyElementNotExist('mat-checkbox.mat-checkbox-checked');
  });

  it('ES-T1014. Complete "Additional training" with selected training', () => {
    cy.log('Open your service submenu ')
      .wait(2000)
      .get('body')
      .then($el => {
        if ($el.find('ul li:nth-child(2) .menuHeading app-icon').length > 0) {
          cy
            .clickElementOnText(
              '.menuHeading p',
              'Your services',
            );
        }
      })
      .log('Chick Services you offer')
      .clickElementOnText(
        '.menu li a',
        'Additional training',
      )
      .verifyTextVisible('Additional training (optional)')

      .log('Select option')
      .clickElement(
        'app-onboarding-services-checkbox-list mat-checkbox input',
        true,
        1,
      )

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .log('Verify the error message is visible')
      .verifyTextVisible('Please upload a file for selected additional training.')

      .log('Upload file')
      .fixture('hugh-jackman.jpg')
      .as('logo')
      .get('.checkboxList .fileInput input[type=file]')
      .then(function (el) {
        // convert the logo base64 string to a blob
        const blob = Cypress.Blob.base64StringToBlob(this.logo, 'image/jpg');

        const file = new File([blob], 'hugh-jackman.jpg', { type: 'image/jpg' });
        const list = new DataTransfer();

        list.items.add(file);
        const myFileList = list.files;

        el[0].files = myFileList;

        const changeEvent = new Event('change', {
          bubbles: true,
        });
        el[0].dispatchEvent(changeEvent);
      })
      .verifyTextVisible('File uploaded')

      .log('Enter data on the issue date')
      .selectDropdown(
        'select',
        '1',
        0,
      )
      .selectDropdown(
        'select',
        'January',
        1,
      )
      .selectDropdown(
        'select',
        '2022',
        2,
      )

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .goToSetUpAccount()

      .log('Chick Services you offer')
      .clickElementOnText(
        '.menu li a',
        'Additional training',
      )
      .verifyTextVisible('Additional training (optional)')
      .verifyElementVisible('app-file-upload a.delete');
  });

  it('ES-T1009. Complete "Allied health" service', () => {
    cy
      .log('Open your service submenu ')
      .wait(2000)
      .get('body')
      .then($el => {
        if ($el.find('ul li:nth-child(2) .menuHeading app-icon').length > 0) {
          cy
            .clickElementOnText(
              '.menuHeading p',
              'Your services',
            );
        }
      })
      .waitAppLoaderNotVisible()

      .log('Chick Services you offer')
      .clickElementOnText(
        '.menu li a',
        'Services you offer',
      )
      .verifyTextVisible('Services you offer')

      .log('Select uncheck all options')
      .uncheckOptions()
      .waitAppLoaderNotVisible()

      .log('Select Allied health')
      .clickElementOnText(
        '#servicesYouOffer mat-checkbox h3',
        'Allied health',
      )
      .waitAppLoaderNotVisible()

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .log('Check Allied health registration page')
      .verifyTextVisible('Allied health registration')

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .log('Verify error message is visible')
      .verifyTextVisible('Please select at least one allied health services.')
      .verifyTextVisible('Provide a registration number')

      .log('Select Allied health service')
      .clickElement(
        'app-onboarding-services-checkbox-list input',
        true,
        2,
      )
      .waitAppLoaderNotVisible()
      .log('Input Registration number')
      .inputTextField(
        data.onboarding.registrationNumber,
        '12345666',
      )
      .waitAppLoaderNotVisible()

      .log('Add expiry date')
      .selectDropdown(
        data.onboarding.expiryDate,
        '4',
        0,
      )
      .selectDropdown(
        data.onboarding.expiryDate,
        'May',
        1,
      )
      .selectDropdown(
        data.onboarding.expiryDate,
        '2025',
        2,
      )

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .goToSetUpAccount()
      .verifyTextVisible("let's get started!")

      .log('Open your service submenu')
      .wait(2000)
      .get('body')
      .then($el => {
        if ($el.find('ul li:nth-child(2) .menuHeading app-icon').length > 0) {
          cy
            .clickElementOnText(
              '.menuHeading p',
              'Your services',
            );
        }
      })

      .log('Select Allied health')
      .clickElementOnText(
        '.menu li a',
        'Allied health',
      )
      .verifyTextVisible('Allied health registration')
      .verifyTextVisible('Please indicate which you are qualified to provide')

      .log('Verify the result')
      .getAttribute(data.onboarding.registrationNumber, 'val')
      .then((text) => cy.expect(text).to.equal('12345666'));
  });

  it('ES-T1011. Complete "Allied health" service, speech therapy/pathology', () => {
    cy
      .log('Open your service submenu ')
      .wait(2000)
      .get('body')
      .then($el => {
        if ($el.find('ul li:nth-child(2) .menuHeading app-icon').length > 0) {
          cy
            .clickElementOnText(
              '.menuHeading p',
              'Your services',
            );
        }
      })
      .waitAppLoaderNotVisible()

      .log('Chick Services you offer')
      .clickElementOnText(
        '.menu li a',
        'Services you offer',
      )
      .waitAppLoaderNotVisible()

      .log('Select uncheck all options')
      .uncheckOptions()

      .log('Select Allied health')
      .clickElementOnText(
        '#servicesYouOffer mat-checkbox h3',
        'Allied health',
      )

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .log('Check Allied health registration page')
      .verifyTextVisible('Allied health registration')

      .log('Select Speech pathologist')
      .clickElementOnText(
        'app-onboarding-services-checkbox-list mat-checkbox h3',
        'Speech pathologist',
      )
      .waitAppLoaderNotVisible()
      .log('Input Registration number')
      .inputTextField(
        data.onboarding.registrationNumber,
        '12345666',
      )
      .waitAppLoaderNotVisible()

      .log('Add expiry date')
      .selectDropdown(
        data.onboarding.expiryDate,
        '4',
        0,
      )
      .selectDropdown(
        data.onboarding.expiryDate,
        'May',
        1,
      )
      .selectDropdown(
        data.onboarding.expiryDate,
        '2025',
        2,
      )

      .log('Upload file')
      .fixture('hugh-jackman.jpg')
      .as('logo')
      .get('input[type=file]')
      .then(function (el) {
        // convert the logo base64 string to a blob
        const blob = Cypress.Blob.base64StringToBlob(this.logo, 'image/jpg');

        const file = new File([blob], 'hugh-jackman.jpg', { type: 'image/jpg' });
        const list = new DataTransfer();

        list.items.add(file);
        const myFileList = list.files;

        el[0].files = myFileList;

        const changeEvent = new Event('change', {
          bubbles: true,
        });

        el[0].dispatchEvent(changeEvent);
      })
      .verifyTextVisible('File uploaded')

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .goToSetUpAccount()
      .verifyTextVisible("let's get started!")

      .log('Open your service submenu')
      .wait(2000)
      .get('body')
      .then($el => {
        if ($el.find('ul li:nth-child(2) .menuHeading app-icon').length > 0) {
          cy
            .clickElementOnText(
              '.menuHeading p',
              'Your services',
            );
        }
      })

      .log('Select Allied health registration')
      .clickElementOnText(
        '.menu li a',
        'Allied health registration',
      )
      .verifyTextVisible('Allied health registration')

      .log('Verify the result')
      .getAttribute(data.onboarding.registrationNumber, 'val')
      .then((text) => cy.expect(text).to.equal('12345666'))

      .verifyElementVisible('app-file-upload a.delete');
  });

  it('ES-T1003. Complete "Personal care" service with other relevant qualification', () => {
    cy
      .log('Open your service submenu ')
      .wait(2000)
      .get('body')
      .then($el => {
        if ($el.find('ul li:nth-child(2) .menuHeading app-icon').length > 0) {
          cy
            .clickElementOnText(
              '.menuHeading p',
              'Your services',
            );
        }
      })

      .log('Chick Services you offer')
      .clickElementOnText(
        '.menu li a',
        'Services you offer',
      )
      .verifyTextVisible('Services you offer')

      .log('Select uncheck all options')
      .uncheckOptions()

      .log('Select personal care')
      .clickElementOnText(
        '#servicesYouOffer mat-checkbox h3',
        'Personal care',
      )

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .log('Check Qualifications page')
      .verifyTextVisible('Qualifications for personal care')

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .log('Verify error message is visible')
      .verifyTextVisible('Please select at least one qualifications.')

      .log('Select quanlifications')
      .clickElement(
        'app-qualifications input',
        true,
        2,
      )

      .log('Upload the file')
      .fixture('hugh-jackman.jpg')
      .as('logo')
      .get('input[type=file]')
      .then(function (el) {
        // convert the logo base64 string to a blob
        const blob = Cypress.Blob.base64StringToBlob(this.logo, 'image/jpg');

        const file = new File([blob], 'hugh-jackman.jpg', { type: 'image/jpg' });
        const list = new DataTransfer();

        list.items.add(file);
        const myFileList = list.files;

        el[0].files = myFileList;

        const changeEvent = new Event('change', {
          bubbles: true,
        });
        el[0].dispatchEvent(changeEvent);
      })
      .verifyTextVisible('File uploaded')

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .log('Check Personal care page')
      .verifyTextVisible('Personal care')

      .log('Click plus(+) icon')
      .clickElement('.action app-icon[name="plus"]', true, 0)
      .verifyElementVisible('.mat-checkbox-layout .details')

      .log('Click minus(-) icon')
      .clickElement('.action app-icon[name="minus"]', true, 0)
      .verifyElementNotExist('.mat-checkbox-layout .details')

      .log('Select option')
      .clickElement(
        'app-personal-care mat-checkbox input',
        true,
        '0',
      )

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .goToSetUpAccount()
      .verifyTextVisible("let's get started!")

      .log('Open your service submenu')
      .wait(2000)
      .get('body')
      .then($el => {
        if ($el.find('ul li:nth-child(2) .menuHeading app-icon').length > 0) {
          cy
            .clickElementOnText(
              '.menuHeading p',
              'Your services',
            );
        }
      })

      .log('Click Qualifications')
      .clickElementOnText(
        '.menu li a',
        'Qualifications',
      )
      .verifyTextVisible('Qualifications for personal care')

      .verifyElementVisible('app-file-upload a.delete');
  });

  it('ES-T1004. Complete "Personal care" service with no uploaded documents', () => {
    cy
      .loginToDashboard(
        'kevin.gavin.wdashboard.incomplete_noupload1@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Click Set up your account')
      .clickElement('#urgentCallToAction a')

      .log('Click SSDA')
      .clickElementOnText(
        '.menu li a',
        'Qualifications',
      )
      .verifyTextVisible('Qualifications for personal care')

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .log('Verify error message is visible')
      .verifyTextVisible('Please select at least one qualifications.')

      .log('Slect options')
      .clickElementOnText(
        'app-qualifications mat-checkbox h3',
        'Certificate 3 Aged Care',
      )

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .verifyTextVisible('Please upload a file for selected qualification')

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .log('Worker is not able to go to the next page')
      .verifyTextVisible('Qualifications for personal care')
      .verifyElementNotExist('ul li:nth-child(2) .menuHeading app-icon');
  });

  it('ES-T5418. Complete all the additional training and check the validation', () => {
    const CPRCertificate = 'CPR Certificate (HLTAID0012/HLTAID009 and previously HLTAID004/HLTAID001)';
    const FirstAid = 'First Aid (HLTAID0012/HLTAID011 and previously HLTAID004 /HLTAID03)';
    const ManualHandlingCertified = 'Manual Handling Certified ';
    const MedicationAssistance = 'Medication Assistance ';
    const ValidDriverLicence = 'Valid Driver\'s Licence ';
    const isTheIssueDateShown = true;

    cy
      .log('Open your service submenu ')
      .wait(2000)
      .get('body')
      .then($el => {
        if ($el.find('ul li:nth-child(2) .menuHeading app-icon').length > 0) {
          cy
            .clickElementOnText(
              '.menuHeading p',
              'Your services',
            );
        }
      })
      .log('Click Services you offer')
      .clickElementOnText(
        '.menu li a',
        'Additional training',
      )
      .verifyTextVisible('Additional training (optional)')

      .log('Check the copy under the header')
      .verifyTextExist('Select any additional training you’ve completed and upload your documents for verification. Additional vocational training is popular with clients and will help your profile to stand out. ')

      .log('Check the list of  trainings')
      .verifyTextExist(CPRCertificate)
      .verifyTextExist(FirstAid)
      .verifyTextExist(ManualHandlingCertified)
      .verifyTextExist(MedicationAssistance)
      .verifyTextExist(ValidDriverLicence)

      .log('Tap the check box for CPR certificate')
      .tickAndCheckTheTraining(CPRCertificate, isTheIssueDateShown)
      .verifyTextExist('Please upload a file for selected additional training.')

      .log('Tap the checkbox for First aid')
      .tickAndCheckTheTraining(FirstAid, isTheIssueDateShown)

      .log('Tap the checkbox for Manual Handling Certified')
      .tickAndCheckTheTraining(ManualHandlingCertified)

      .log('Tap the checkbox for Medication Assistance')
      .tickAndCheckTheTraining(MedicationAssistance)

      .log('Tap the checkbox for Valid Driver\'s Licence')
      .tickAndCheckTheTraining(ValidDriverLicence, isTheIssueDateShown)

      .log('Tap the Next button')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )
      .verifyCurrentURL('/onboarding/additional-training')
      .verifyTextExist('Please upload a file for selected additional training.')
      .verifyElementExist('app-date-selector.ng-invalid')

      .log('Enter past dates in CPR Certificate')
      .selectDropdown(
        '[formcontrolname="cprCertificateExpiryDate"] select',
        '1',
        0,
      )
      .selectDropdown(
        '[formcontrolname="cprCertificateExpiryDate"] select',
        'January',
        1,
      )
      .selectDropdown(
        '[formcontrolname="cprCertificateExpiryDate"] select',
        '2017',
        2,
      )
      .verifyTextExist('The issue date you entered has already passed')

      .log('Enter today\'s date')
      .selectDropdown(
        '[formcontrolname="cprCertificateExpiryDate"] select',
        '2022',
        2,
      )
      .verifyTextNotExist('The issue date you entered has already passed')

      .log('Enter past dates in First Aid')
      .selectDropdown(
        '[formcontrolname="firstAidExpiryDate"] select',
        '1',
        0,
      )
      .selectDropdown(
        '[formcontrolname="firstAidExpiryDate"] select',
        'January',
        1,
      )
      .selectDropdown(
        '[formcontrolname="firstAidExpiryDate"] select',
        '2017',
        2,
      )
      .verifyTextExist('The issue date you entered has already passed')

      .log('Enter today\'s date')
      .selectDropdown(
        '[formcontrolname="firstAidExpiryDate"] select',
        '2022',
        2,
      )
      .verifyTextNotExist('The issue date you entered has already passed')

      .log('Enter past dates in Valid Driver\'s Licence')
      .selectDropdown(
        '[formcontrolname="driverLicenseExpiryDate"] select',
        '1',
        0,
      )
      .selectDropdown(
        '[formcontrolname="driverLicenseExpiryDate"] select',
        'January',
        1,
      )
      .selectDropdown(
        '[formcontrolname="driverLicenseExpiryDate"] select',
        '2022',
        2,
      )
      .verifyTextExist('The expiry date you entered has already passed')

      .log('Enter today\'s date')
      .selectDropdown(
        '[formcontrolname="driverLicenseExpiryDate"] select',
        '2032',
        2,
      )
      .verifyTextNotExist('The expiry date you entered has already passed')

      .log('Tap the Next button')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )
      .verifyCurrentURL('/onboarding/additional-training')
      .verifyTextExist('Please upload a file for selected additional training.')

      .log('Upload CPR certificate')
      .uploadAndCheckForTraining(CPRCertificate)

      .log('Upload First Aid')
      .uploadAndCheckForTraining(FirstAid)

      .log('Upload Manual Handling Certified')
      .uploadAndCheckForTraining(ManualHandlingCertified, true)

      .log('Upload Medication Assistance')
      .uploadAndCheckForTraining(MedicationAssistance, true)

      .log('Upload Valid Driver Licence')
      .uploadAndCheckForTraining(ValidDriverLicence)

      .log('Tap the Next button')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )
      .verifyTextExist('References')

    // .log('Verify the Additional training item on the side nav')
    // .get('a[href="/onboarding/additional-training"]')
    // .siblings('app-icon')
    // .find('svg path')
    // .invoke('attr', 'd')
    // .should('include', '9.58V9.61Z')

      .clickElementOnText(
        '#stepsAction button',
        'Back',
      )
      .verifyTextExist('Additional training (optional)')
      .verifyTextExist('debit.pdf')
      .verifyElementExist('a.delete')
      .checkTheTraining(CPRCertificate)
      .checkTheTraining(FirstAid)
      .checkTheTraining(ManualHandlingCertified)
      .checkTheTraining(MedicationAssistance)
      .checkTheTraining(ValidDriverLicence);
  });
});
