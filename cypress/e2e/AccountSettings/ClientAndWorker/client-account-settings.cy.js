import * as data from '../../../fixtures/test-data.json';

describe('Client Account Setting', () => {
  const updateClientEmail = 'automation_ethan_9lc8c.onboarding+client@donotuse.com.au';
  const updateClientPass = 'qaAutomation2021';

  const newClientEmail = 'automation_ethan_9lc8c_123.onboarding+client@donotuse.com.au';
  const newClientPass = 'qaAutomation2022';

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it('ES-T4056. View Account settings', () => {
    const clientEmail = 'automation_toan.tran.accountsettings+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login as client')
      .loginToDashboard(clientEmail, clientPass)

      .log('Click Account btn')
      .clickElementOnText('.editProfile span', 'Account')
      .verifyTextVisible('Toan’s personal details')
      .verifyTextVisible('The person receiving support.')

      .log('Click Login details')
      .clickElementOnText('.subMenu a span', 'Login details')
      .verifyTextVisible('Login details')
      .verifyTextVisible('Fields marked with an asterisk (*) are required.')
      .verifyTextVisible('Email')
      .verifyTextVisible('Password')
      .verifyTextVisible('Confirm password');
  });

  it('ES-T4057. Update Email address', () => {
    cy.log('Login as client')
      .loginToDashboard(updateClientEmail, updateClientPass)

      .log('Click Account btn')
      .clickElementOnText('.editProfile span', 'Account')
      .verifyTextVisible('personal details')
      .verifyTextVisible('The person receiving support.')

      .log('Click Login details')
      .clickElementOnText('.subMenu a span', 'Login details')
      .verifyTextVisible('Login details')

      .log('Update the email')
      .inputTextField(
        data.clientOnboarding.login.email,
        newClientEmail,
      )

      .log('Input the pass')
      .inputTextField(
        data.clientOnboarding.login.password,
        updateClientPass,
      )
      .log('Input the confirm pass')
      .inputTextField(
        data.clientOnboarding.login.confirmPassword,
        updateClientPass,
      )
      .waitAppLoaderNotVisible()

      .log('Click Save btn')
      .clickElementOnText(
        'app-email-and-password button',
        'Save',
      )
      .waitAppLoaderNotVisible()

      .log('Logout')
      .clickLogoutOnTopMenu()

      .log('Login with new email')
      .loginToDashboard(newClientEmail, updateClientPass)

      .log('Click Account btn')
      .clickElementOnText('.editProfile span', 'Account')
      .verifyTextVisible('personal details')
      .verifyTextVisible('The person receiving support.')

      .log('Click Login details')
      .clickElementOnText('.subMenu a span', 'Login details')
      .verifyTextVisible('Login details')
      .getValueOfInput(data.clientOnboarding.login.email)
      .then(value => expect(value).to.equal(newClientEmail))

      .log('Reset Account Information')
      .getAccount(newClientEmail, updateClientPass)
      .then((res) => {
        const body = res.body.data.attributes;
        body.email = updateClientEmail;
        cy.updateAccount(newClientEmail, updateClientPass, body);
      });
  });

  it('ES-T4058. Update password', () => {
    cy.log('Login as client')
      .loginToDashboard(updateClientEmail, updateClientPass)

      .log('Click Account btn')
      .clickElementOnText('.editProfile span', 'Account')
      .verifyTextVisible('personal details')
      .verifyTextVisible('The person receiving support.')

      .log('Click Login details')
      .clickElementOnText('.subMenu a span', 'Login details')
      .verifyTextVisible('Login details')

      .log('Input the pass')
      .inputTextField(
        data.clientOnboarding.login.password,
        newClientPass,
      )
      .log('Input the confirm pass')
      .inputTextField(
        data.clientOnboarding.login.confirmPassword,
        newClientPass,
      )

      .log('Click Save btn')
      .clickElementOnText(
        'app-email-and-password button',
        'Save',
      )

      .log('Logout')
      .clickLogoutOnTopMenu()

      .log('Login with new email')
      .loginToDashboard(updateClientEmail, newClientPass)

      .log('Click Account btn')
      .clickElementOnText('.editProfile span', 'Account')
      .verifyTextVisible('personal details')
      .verifyTextVisible('The person receiving support.')

      .log('Click Login details')
      .clickElementOnText('.subMenu a span', 'Login details')
      .verifyTextVisible('Login details')
      .getValueOfInput(data.clientOnboarding.login.email)
      .then(value => expect(value).to.equal(updateClientEmail))

      .log('Reset Account Information')
      .getAccount(updateClientEmail, newClientPass)
      .then((res) => {
        const body = res.body.data.attributes;
        body.password = updateClientPass;
        cy.updateAccount(updateClientEmail, newClientPass, body);
      });
  });

  it('ES-T4059. Validation of Email & password', () => {
    const clientEmail = 'automation_client.mob.accountsettings+client2@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login as client')
      .loginToDashboard(clientEmail, clientPass)

      .log('Click Account btn')
      .clickElementOnText('.editProfile span', 'Account')
      .verifyTextVisible('personal details')
      .verifyTextVisible('The person receiving support.')

      .log('Click Login details')
      .clickElementOnText('.subMenu a span', 'Login details')
      .verifyTextVisible('Login details')

      .log('Check on the email field')
      .getValueOfInput(data.clientOnboarding.login.email)
      .then(value => expect(value).to.equal(clientEmail))

      .log('Delete email')
      .clearTextField(data.clientOnboarding.login.email)
      .verifyTextVisible('Provide a valid email address.')

      .log('Click Save btn')
      .clickElementOnText(
        'app-email-and-password button',
        'Save',
      )
      .verifyTextVisible('Provide a valid email address.')

      .log('Click invaild email')
      .inputTextField(
        data.clientOnboarding.login.email,
        'tessttesst',
      )
      .verifyTextVisible('Provide a valid email address.')

      .log('Input valid email')
      .inputTextField(
        data.clientOnboarding.login.email,
        clientEmail,
      )
      .verifyTextNotExist('Provide a valid email address.')

      .log('Input password as a')
      .inputTextField(
        data.clientOnboarding.login.password,
        'a',
      )
      .verifyTextVisible('Strength: Weak')
      .verifyTextVisible('Use 8 characters or more for your password')

      .log('Input password as aaaa1234')
      .inputTextField(
        data.clientOnboarding.login.password,
        'aaaa1234',
      )
      .verifyTextVisible('Strength: Moderate')
      .verifyTextNotExist('Use 8 characters or more for your password')

      .log('Input password as Mable2021')
      .inputTextField(
        data.clientOnboarding.login.password,
        'Mable2021',
      )
      .verifyTextVisible('Strength: Strong')

      .log('Input confirm password as Mable2022')
      .inputTextField(
        data.clientOnboarding.login.confirmPassword,
        'Mable2022',
      )
      .verifyTextVisible("Your passwords don't match");
  });

  it('ES-T4060. Update Notifications', () => {
    const clientEmail = 'automation_client.mob.accountsettings+client2@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login as client')
      .loginToDashboard(clientEmail, clientPass)

      .log('Click Account btn')
      .clickElementOnText('.editProfile span', 'Account')
      .verifyTextVisible('personal details')
      .verifyTextVisible('The person receiving support.')

      .log('Click Notifications')
      .clickElementOnText('.subMenu a span', 'Notifications')
      .verifyTextVisible('Notifications')
      .wait(2000)

      .log('Check the checkbox: I would like to receive emails about agreements.')
      .verifyStatusNotificationCheckbox('I would like to receive emails about agreements')
      .then((value) => {
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label',
            'I would like to receive emails about agreements',
          );
        }
      })

      .log('Check the checkbox: I would like to receive emails about messages.')
      .verifyStatusNotificationCheckbox('I would like to receive emails about messages')
      .then((value) => {
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label',
            'I would like to receive emails about messages',
          );
        }
      })

      .log('Check the checkbox: I would like to receive SMS when notifications are sent.')
      .verifyStatusNotificationCheckbox('I would like to receive SMS when notifications are sent')
      .then((value) => {
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label',
            'I would like to receive SMS when notifications are sent',
          );
        }
      })

      .log('Check the checkbox: I would like to receive emails about support hours.')
      .verifyStatusNotificationCheckbox('I would like to receive emails about support hours')
      .then((value) => {
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label',
            'I would like to receive emails about support hours',
          );
        }
      })

      .log('Check the checkbox: I would like to receive emails about new support workers.')
      .verifyStatusNotificationCheckbox('I would like to receive emails about new support workers')
      .then((value) => {
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label',
            'I would like to receive emails about new support workers',
          );
        }
      })

      .log('Click Save btn')
      .clickElementOnText(
        'app-notifications button',
        'Save',
      )

      .log('Verify the fields after saving')
      .verifyStatusNotificationCheckbox('I would like to receive emails about agreements')
      .then((value) => expect(value).to.equal('true'))
      .verifyStatusNotificationCheckbox('I would like to receive emails about messages')
      .then((value) => expect(value).to.equal('true'))
      .verifyStatusNotificationCheckbox('I would like to receive SMS when notifications are sent')
      .then((value) => expect(value).to.equal('true'))
      .verifyStatusNotificationCheckbox('I would like to receive emails about support hours')
      .then((value) => expect(value).to.equal('true'))
      .verifyStatusNotificationCheckbox('I would like to receive emails about new support workers')
      .then((value) => expect(value).to.equal('true'));
  });
});
