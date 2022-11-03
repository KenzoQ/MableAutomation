import * as data from '../../../fixtures/test-data.json';

describe('Worker Account Setting', () => {
  const workerEmail = data.dashboardAccount.workerAccount.email;
  const workerPass = data.dashboardAccount.workerAccount.password;

  const updateEmail = 'sam.worker.update.1zuf1gg8xn@gmail.com';
  const updatePass = 'Mable2021';
  const contactLastName = 'Test LastName';
  const alertFirstName = 'Provide a first name.';
  const alertLastName = 'Provide a last name.';

  beforeEach(() => {
    cy.clearCookies()
      .clearLocalStorage()
      .visit('/')
      .byPassAuthen();
  });

  // Accessibility testing:
  // 1. Address tab
  // 2. Phone & SMS notification
  // 3. Emergency contacts
  // 3. Email Aleart
  // 4. Username & password
  it('ES-T714. View Account Settings', () => {
    cy.log('Login as worker')
      .loginToDashboard(workerEmail, workerPass)

      .log('Go to the Account Setting page')
      .navigateByLeftMenuInDashboard('Account')
      .verifyAccountSettingPageIsShown()

      .log('Click "Addrees" tab')
      .clickElementOnText(data.accountSetting.tab, 'Address')
      .verifyCurrentTabIs('Address')

      .log('Accessibility testing: Address Tab')
      // .injectAxe()
      // .checkA11y('app-account-settings', null, null, true)

      .log('Click "Phone & SMS notifications" tab')
      .clickElementOnText(data.accountSetting.tab, 'Phone & SMS notifications')
      .verifyCurrentTabIs('Phone & SMS notifications')

      .log('Accessibility testing: Phone & SMS notification')
      // .injectAxe()
      // .checkA11y('app-account-settings', null, null, true)

      .log('Click "Emergency contacts" tab')
      .clickElementOnText(data.accountSetting.tab, 'Emergency contacts')
      .verifyCurrentTabIs('Emergency contacts')

      .log('Accessibility testing: Emergency contacts')
      // .injectAxe()
      // .checkA11y('app-account-settings', null, null, true)

      .log('Click "Email alerts" tab')
      .clickElementOnText(data.accountSetting.tab, 'Email alerts')
      .verifyCurrentTabIs('Email alerts')

      .log('Accessibility testing: Email alerts')
      // .injectAxe()
      // .checkA11y('app-account-settings', null, null, true)

      .log('Click "Username & password" tab')
      .clickElementOnText(data.accountSetting.tab, 'Username & password')
      .verifyCurrentTabIs('Username & password')

      .log('Accessibility testing: Username & password');
    // .injectAxe()
    // .checkA11y('app-account-settings', null, null, true)
  });

  it('ES-T715. Update username', () => {
    const newEmail = 'sam.worker.update.1zuf1gg8xn@gmail.com';
    cy.log('Login as worker')
      .loginToDashboard(updateEmail, updatePass)

      .log('Go to the Account Setting page')
      .navigateByLeftMenuInDashboard('Account')
      .verifyAccountSettingPageIsShown()

      .log(`Verify current email is: ${updateEmail}`)
      .getValueOfInput(data.accountSetting.userAndPass.emailInput)
      .then((text) => expect(text).to.equal(updateEmail))

      .log('Update the email')
      .inputTextField(data.accountSetting.userAndPass.emailInput, newEmail)
      .log('Click Save Btn')
      .clickElement(data.accountSetting.userAndPass.saveBtn)

      .verifyCurrentTabIs('Username & password')
      .log(`Verify current email is ${newEmail}`)
      .getValueOfInput(data.accountSetting.userAndPass.emailInput)
      .then((text) => expect(text).to.equal(newEmail))

      .log('Log out and Login with new email')
      .clickLogoutOnTopMenu()
      .loginToDashboard(newEmail, updatePass)

      .log('Reset Account Information')
      .getAccount(newEmail, updatePass)
      .then((res) => {
        const body = res.body.data.attributes;
        body.email = updateEmail;
        cy.updateAccount(newEmail, updatePass, body);
      });
  });

  it('ES-T716. Update Password', () => {
    const newPass = '12345678Acd@!';
    cy.log('Login as worker')
      .loginToDashboard(updateEmail, updatePass)

      .log('Go to the Account Setting page')
      .navigateByLeftMenuInDashboard('Account')
      .verifyAccountSettingPageIsShown()

      .log('Update the email')
      .inputTextField(data.accountSetting.userAndPass.passInput, newPass)
      .inputTextField(data.accountSetting.userAndPass.comfirmPassInput, newPass)
      .log('Click Save Btn')
      .clickElement(data.accountSetting.userAndPass.saveBtn)

      .verifyCurrentTabIs('Username & password')
      .log('Verify current email is empty')
      .getValueOfInput(data.accountSetting.userAndPass.passInput)
      .then((text) => expect(text).to.equal(''))
      .getValueOfInput(data.accountSetting.userAndPass.comfirmPassInput)
      .then((text) => expect(text).to.equal(''))

      .log('Log out and Login with new email')
      .clickLogoutOnTopMenu()
      .loginToDashboard(updateEmail, newPass)

      .log('Reset Account Information')
      .getAccount(updateEmail, newPass)
      .then((res) => {
        const body = res.body.data.attributes;
        body.password = updatePass;
        body.password_confirmation = updatePass;
        cy.updateAccount(updateEmail, newPass, body);
      });
  });

  it('ES-T717. Validation of Username & password', () => {
    cy.log('Login as worker')
      .loginToDashboard(workerEmail, workerPass)

      .log('Go to the Account Setting page')
      .navigateByLeftMenuInDashboard('Account')
      .verifyAccountSettingPageIsShown()

      .log(`Verify current email is ${workerEmail}`)
      .getValueOfInput(data.accountSetting.userAndPass.emailInput)
      .then((text) => expect(text).to.equal(workerEmail))

      .log('Delete email')
      .clearTextField(data.accountSetting.userAndPass.emailInput)
      .verifyErrorMessageIsShown(
        data.accountSetting.userAndPass.emailInput,
        'Provide a valid email address.',
      )

      .log('Enter invalid email')
      .inputTextField(data.accountSetting.userAndPass.emailInput, 'toan.test')
      .verifyErrorMessageIsShown(
        data.accountSetting.userAndPass.emailInput,
        'Provide a valid email address.',
      )

      .log('Enter valid email')
      .inputTextField(data.accountSetting.userAndPass.emailInput, workerEmail)
      .verifyTextNotExist('Provide a valid email address.')

      .log('Enter password with less then 8 characters')
      .inputTextField(data.accountSetting.userAndPass.passInput, '1234')
      .verifyErrorMessageIsShown(
        data.accountSetting.userAndPass.passInput,
        'Use 8 characters or more for your password.',
      )

      .log('Enter valid password')
      .inputTextField(data.accountSetting.userAndPass.passInput, workerPass)
      .verifyTextNotExist('Use 8 characters or more for your password.')

      .inputTextField(
        data.accountSetting.userAndPass.comfirmPassInput,
        '123456789',
      )
      .verifyErrorMessageIsShown(
        data.accountSetting.userAndPass.comfirmPassInput,
        "Your passwords don't match.",
      )

      .inputTextField(
        data.accountSetting.userAndPass.comfirmPassInput,
        workerPass,
      )
      .verifyTextNotExist("Your passwords don't match.");
  });

  it('ES-T718. Register Address', () => {
    cy.log('Login as worker')
      .loginToDashboard(workerEmail, workerPass)

      .log('Go to the Account Setting page')
      .navigateByLeftMenuInDashboard('Account')
      .verifyAccountSettingPageIsShown()

      .log('Click "Addrees" tab')
      .clickElementOnText(data.accountSetting.tab, 'Address')
      .verifyCurrentTabIs('Address')

      .log('Clear Street Address and postcode')
      .clearTextField(data.accountSetting.address.streetAddressInput)
      .clearTextField(data.accountSetting.address.postCodeInput)

      .log('Verify that Postcode and Street address input is empty')
      .getValueOfInput(data.accountSetting.address.streetAddressInput)
      .then((text) => expect(text).to.equal(''))
      .getValueOfInput(data.accountSetting.address.postCodeInput)
      .then((text) => expect(text).to.equal(''))

      .log('Verify show the error message on Postcode and Street address input')
      .verifyErrorMessageIsShown(
        data.accountSetting.address.streetAddressInput,
        'Input a street address.',
      )
      .verifyErrorMessageIsShown(
        data.accountSetting.address.postCodeInput,
        'Select a suburb.',
      )

      .log('Enter street address and post code')
      .inputTextField(
        data.accountSetting.address.streetAddressInput,
        data.dashboardAccount.workerAccount.streetAddress,
      )
      .inputTextField(
        data.accountSetting.address.postCodeInput,
        data.dashboardAccount.workerAccount.postcode,
      )
      .wait(1000)
      .clickElement('.suggestions .listOption', true, 0)

      .log('Check the "Same as residential address" checkbox')
      .get(data.accountSetting.address.sameAsResidentialAddress)
      .invoke('attr', 'aria-checked')
      .then((value) => {
        if (value === 'false') {
          cy.get(data.accountSetting.address.sameAsResidentialAddress).click({
            force: true,
          });
        }
      })

      .log('Click Save button')
      .clickElement(data.accountSetting.address.saveBtn)

      .log(
        'Verify the value on Postal address is the same with the value on residental section',
      )
      .getValueOfInput(data.accountSetting.address.streetOnPostalAddress)
      .then((text) => expect(text).to.include(
        data.dashboardAccount.workerAccount.streetAddress,
      ))
      .getValueOfInput(data.accountSetting.address.postCodeOnPostalAddress)
      .then((text) => expect(text).to.include(data.dashboardAccount.workerAccount.postcode));
  });

  it('ES-T719. Update Phone & SMS notifications', () => {
    cy.log('Login as worker')
      .loginToDashboard(workerEmail, workerPass)

      .log('Go to the Account Setting page')
      .navigateByLeftMenuInDashboard('Account')
      .verifyAccountSettingPageIsShown()

      .log('Click "Phone & SMS notifications" tab')
      .clickElementOnText(data.accountSetting.tab, 'Phone & SMS notifications')
      .verifyCurrentTabIs('Phone & SMS notifications')

      .log('Input Phone number')
      .inputTextField(
        data.accountSetting.phone.contactInput,
        data.dashboardAccount.workerAccount.phone,
      )

      .log('Check Receive sms checkbox')
      .get(data.accountSetting.phone.receiveSmsCheckbox)
      .invoke('attr', 'aria-checked')
      .then((value) => {
        if (value === 'false') {
          cy.get(data.accountSetting.phone.receiveSmsCheckbox).click({
            force: true,
          });
        }
      })

      .log('Click save button')
      .clickElement(data.accountSetting.phone.saveBtn)

      .log('Verify that Receive sms is selected')
      .get(data.accountSetting.phone.receiveSmsCheckbox)
      .invoke('attr', 'aria-checked')
      .then((value) => expect(value).to.equal('true'))

      .log('Verify that contract is updated')
      .getAttribute(data.accountSetting.phone.contactInput, 'val')
      .then((value) => expect(value).to.equal(data.dashboardAccount.workerAccount.phone));
  });

  it('ES-T720. Register Emergency contacts', () => {
    const contactName = 'Test Name';
    const contactNumber = '0444444444';
    const relationship = 'Extended Family';

    cy.log('Login as worker')
      .loginToDashboard(workerEmail, workerPass)

      .log('Go to the Account Setting page')
      .navigateByLeftMenuInDashboard('Account')
      .verifyAccountSettingPageIsShown()

      .log('Click "Emergency contacts" tab')
      .clickElementOnText(data.accountSetting.tab, 'Emergency contacts')
      .verifyCurrentTabIs('Emergency contacts')

      .log('Enter contact full name')
      .inputTextField(data.accountSetting.emergency.contactName, contactName)
      .inputTextField(data.accountSetting.emergency.contactLastName, contactLastName)

      .log('Enter contact number')
      .inputTextField(
        data.accountSetting.emergency.contactNumber,
        contactNumber,
      )

      .log('Select relationship')
      .selectDropdown(data.accountSetting.emergency.relationship, relationship)

      .log('Click Save button')
      .clickElement(data.accountSetting.emergency.saveBtn);
  });

  it('ES-T721. Update Email alerts', () => {
    cy.log('Login as worker')
      .loginToDashboard(workerEmail, workerPass)

      .log('Go to the Account Setting page')
      .navigateByLeftMenuInDashboard('Account')
      .verifyAccountSettingPageIsShown()

      .log('Click "Email alerts" tab')
      .clickElementOnText(data.accountSetting.tab, 'Email alerts')
      .verifyCurrentTabIs('Email alerts')

      .log('Check all checkbox')
      .checkStatusCheckboxAndSelect(
        data.accountSetting.email.checkBoxOnEmailTab,
        0,
      )
      .checkStatusCheckboxAndSelect(
        data.accountSetting.email.checkBoxOnEmailTab,
        1,
      )
      .checkStatusCheckboxAndSelect(
        data.accountSetting.email.checkBoxOnEmailTab,
        2,
      )
      .checkStatusCheckboxAndSelect(
        data.accountSetting.email.checkBoxOnEmailTab,
        3,
      )

      .log('Verify all checkbox are selected')
      .verifyCheckBoxHaveStatus(0, true)
      .verifyCheckBoxHaveStatus(1, true)
      .verifyCheckBoxHaveStatus(2, true)
      .verifyCheckBoxHaveStatus(3, true)

      .log('Uncheck all checkboxs')
      .clickElement(data.accountSetting.email.checkBoxOnEmailTab, true, 0)
      .clickElement(data.accountSetting.email.checkBoxOnEmailTab, true, 1)
      .clickElement(data.accountSetting.email.checkBoxOnEmailTab, true, 2)
      .clickElement(data.accountSetting.email.checkBoxOnEmailTab, true, 3)

      .log('Click Save button')
      .clickElementOnText(data.accountSetting.email.saveBtn, 'Save')

      .log('Verify all checkbox are not selected')
      .verifyCheckBoxHaveStatus(0, false)
      .verifyCheckBoxHaveStatus(1, false)
      .verifyCheckBoxHaveStatus(2, false)
      .verifyCheckBoxHaveStatus(3, false)

      .log('check all checkboxs')
      .clickElement(data.accountSetting.email.checkBoxOnEmailTab, true, 0)
      .clickElement(data.accountSetting.email.checkBoxOnEmailTab, true, 1)
      .clickElement(data.accountSetting.email.checkBoxOnEmailTab, true, 2)
      .clickElement(data.accountSetting.email.checkBoxOnEmailTab, true, 3)

      .log('Click Save button')
      .clickElementOnText(data.accountSetting.email.saveBtn, 'Save')

      .log('Verify all checkbox are selected')
      .verifyCheckBoxHaveStatus(0, true)
      .verifyCheckBoxHaveStatus(1, true)
      .verifyCheckBoxHaveStatus(2, true)
      .verifyCheckBoxHaveStatus(3, true);
  });

  it('ES-T722. Validation of Address', () => {
    cy.log('Login as worker')
      .loginToDashboard(workerEmail, workerPass)

      .log('Go to the Account Setting page')
      .navigateByLeftMenuInDashboard('Account')
      .verifyAccountSettingPageIsShown()

      .log('Click "Addrees" tab')
      .clickElementOnText(data.accountSetting.tab, 'Address')
      .verifyCurrentTabIs('Address')

      .log(
        'Verify the curent value of Street Address on Residential Address section',
      )
      .getValueOfInput(data.accountSetting.address.streetAddressInput)
      .then((text) => expect(text).to.equal(
        data.dashboardAccount.workerAccount.streetAddress,
      ))

      .log('Clear Street Address on Residential Address section')
      .clearTextField(data.accountSetting.address.streetAddressInput)
      .verifyErrorMessageIsShown(
        data.accountSetting.address.streetAddressInput,
        'Input a street address.',
      )

      .log('Enter the Street Address on Residential Address section')
      .inputTextField(
        data.accountSetting.address.streetAddressInput,
        data.dashboardAccount.workerAccount.streetAddress,
      )
      .verifyTextNotExist('Input a street address. ')

      .log('Uncheck the "Same as residential address" checkbox')
      .get(data.accountSetting.address.sameAsResidentialAddress)
      .invoke('attr', 'aria-checked')
      .then((value) => {
        if (value === 'true') {
          cy.get(data.accountSetting.address.sameAsResidentialAddress).click({
            force: true,
          });
        }
      })

      .log('Delete PostCode on Residential Address section')
      .clearTextField(data.accountSetting.address.postCodeInput)
      .verifyErrorMessageIsShown(
        data.accountSetting.address.postCodeInput,
        'Select a suburb.',
      )

      .log('Select Post Code on Residential Address section')
      .inputTextField(
        data.accountSetting.address.postCodeInput,
        data.dashboardAccount.workerAccount.postcode,
      )
      .wait(1000)
      .clickElement('.suggestions .listOption', true, 0)

      .log('Delete Street address from Post Address')
      .clearTextField(data.accountSetting.address.streetOnPostalAddress, true)
      .verifyErrorMessageIsShown(
        data.accountSetting.address.streetOnPostalAddress,
        'Input a street address.',
      )

      .log('Enter street address from Postal Address content section')
      .inputTextField(
        data.accountSetting.address.streetOnPostalAddress,
        'test address',
      )
      .verifyTextNotExist('Input a street address.')

      .log('Delete Post code from Postal Address')
      .clearTextField(data.accountSetting.address.postCodeOnPostalAddress, true)
      .verifyErrorMessageIsShown(
        data.accountSetting.address.postCodeOnPostalAddress,
        'Select a suburb.',
      )

      .log('Enter Post code from Postal Address')
      .inputTextField(
        data.accountSetting.address.postCodeOnPostalAddress,
        data.dashboardAccount.workerAccount.postcode,
      )
      .wait(1000)
      .clickElement('.suggestions .listOption', true, 0)
      .verifyTextNotExist('Select a suburb.');
  });

  it('ES-T723. Validation of Phone and SMS notifications', () => {
    cy.log('Login as worker')
      .loginToDashboard(workerEmail, workerPass)

      .log('Go to the Account Setting page')
      .navigateByLeftMenuInDashboard('Account')
      .verifyAccountSettingPageIsShown()

      .log('Click "Phone & SMS notifications" tab')
      .clickElementOnText(data.accountSetting.tab, 'Phone & SMS notifications')
      .verifyCurrentTabIs('Phone & SMS notifications')

      .log('Clear Contact Number')
      .clearTextField(data.accountSetting.phone.contactInput)
      .verifyErrorMessageIsShown(
        data.accountSetting.phone.contactInput,
        'Input a valid phone number.',
      )

      .log('Enter invalid contact number')
      .inputTextField(data.accountSetting.phone.contactInput, 12334)
      .verifyErrorMessageIsShown(
        data.accountSetting.phone.contactInput,
        'Input a valid phone number.',
      )

      .log('Enter valid contact number')
      .inputTextField(
        data.accountSetting.phone.contactInput,
        data.dashboardAccount.workerAccount.phone,
      )
      .verifyTextNotExist('Input a valid phone number.');
  });

  it('ES-T724. Validation of Emergency Contacts', () => {
    const contactName = 'Test Name';

    cy.log('Login as worker')
      .loginToDashboard(workerEmail, workerPass)

      .log('Go to the Account Setting page')
      .navigateByLeftMenuInDashboard('Account')
      .verifyAccountSettingPageIsShown()

      .log('Click "Emergency contacts" tab')
      .clickElementOnText(data.accountSetting.tab, 'Emergency contacts')
      .verifyCurrentTabIs('Emergency contacts')

      .log('Delete the Contact name')
      .clearTextField(data.accountSetting.emergency.contactName)
      .verifyErrorMessageIsShown(
        data.accountSetting.emergency.contactName,
        alertFirstName,
      )
      .clearTextField(data.accountSetting.emergency.contactLastName)
      .verifyErrorMessageIsShown(
        data.accountSetting.emergency.contactLastName,
        alertLastName,
      )

      .log('Input the Contact Name')
      .inputTextField(data.accountSetting.emergency.contactName, contactName)
      .inputTextField(data.accountSetting.emergency.contactLastName, contactLastName)
      .verifyTextNotExist(alertFirstName)
      .verifyTextNotExist(alertLastName)

      .log('Delete Contact Number')
      .clearTextField(data.accountSetting.emergency.contactNumber)
      .verifyErrorMessageIsShown(
        data.accountSetting.emergency.contactNumber,
        'Input a valid phone number.',
      )

      .log('Enter invalid contract number')
      .inputTextField(data.accountSetting.emergency.contactNumber, '12345')
      .verifyErrorMessageIsShown(
        data.accountSetting.emergency.contactNumber,
        'Input a valid phone number.',
      );
  });

  it('ES-T725. Update Address', () => {
    cy.log('Login as worker')
      .loginToDashboard(workerEmail, workerPass)

      .log('Go to the Account Setting page')
      .navigateByLeftMenuInDashboard('Account')
      .verifyAccountSettingPageIsShown()

      .log('Click "Addrees" tab')
      .clickElementOnText(data.accountSetting.tab, 'Address')
      .verifyCurrentTabIs('Address')

      .log('Update the Street Address in the residential address section')
      .inputTextField(
        data.accountSetting.address.streetAddressInput,
        data.dashboardAccount.workerAccount.streetAddress,
      )

      .log('Update the Postcode in the residential address section')
      .inputTextField(
        data.accountSetting.address.postCodeInput,
        data.dashboardAccount.workerAccount.postcode,
      )
      .wait(1000)
      .clickElement('.suggestions .listOption', true, 0)

      .log('UnCheck the "Same as residential address" checkbox')
      .get(data.accountSetting.address.sameAsResidentialAddress)
      .invoke('attr', 'aria-checked')
      .then((value) => {
        if (value === 'true') {
          cy.get(data.accountSetting.address.sameAsResidentialAddress)
            .click({ force: true })
            .wait(2000);
        }
      })

      .log('Update the Street Address in the postal section')
      .inputTextField(
        data.accountSetting.address.streetOnPostalAddress,
        'Test address',
      )

      .log('Update the Street Address in the postal section')
      .inputTextField(
        data.accountSetting.address.postCodeOnPostalAddress,
        '2000',
      )
      .wait(1000)
      .clickElement('.suggestions .listOption', true, 0)

      .log('Click Save button')
      .clickElement(data.accountSetting.address.saveBtn);
  });

  it('ES-T726. Update Emergency contacts', () => {
    const contactName = 'Test Name';
    const contactNumber = '0444444444';
    const relationship = 'Extended Family';

    cy.log('Login as worker')
      .loginToDashboard(workerEmail, workerPass)

      .log('Go to the Account Setting page')
      .navigateByLeftMenuInDashboard('Account')
      .verifyAccountSettingPageIsShown()

      .log('Click "Emergency contacts" tab')
      .clickElementOnText(data.accountSetting.tab, 'Emergency contacts')
      .verifyCurrentTabIs('Emergency contacts')

      .log('Update the contact fullname')
      .inputTextField(data.accountSetting.emergency.contactName, contactName)
      .inputTextField(data.accountSetting.emergency.contactLastName, contactLastName)

      .log('Update contact number')
      .inputTextField(
        data.accountSetting.emergency.contactNumber,
        contactNumber,
      )

      .log('Update the relationship')
      .selectDropdown(data.accountSetting.emergency.relationship, relationship)

      .log('Click Save button')
      .clickElement(data.accountSetting.emergency.saveBtn);
  });
});
