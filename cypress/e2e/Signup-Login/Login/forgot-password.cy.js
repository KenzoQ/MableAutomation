import * as testData from '../../../fixtures/test-data.json';

describe('Forgot Password', () => {
  const workerEmail = testData.forgotPassword.email.worker;

  const clientEmail = testData.forgotPassword.email.client;

  beforeEach(() => {
    cy.visit('/')
      .byPassAuthen();
  });

  it('ES-T121. Forgot password', () => {
    cy.log('Go to Login page')

      .log('From login page, click Forgot your password?')
      .clickForgotYourPassword()

      .log('Leave the email field null AND click Reset button')
      .clickResetButton()
      .verifyTextExist('Input a valid email')

      .log('Enter invalid email asdf')
      .enterEmail('asdf')

      .log('Click Reset')
      .clickResetButton()
      .verifyErrorInResetPasswordForm()

      .log('Enter invalid email asdf@')
      .enterEmail('asdf')

      .log('Click Reset')
      .clickResetButton()
      .verifyErrorInResetPasswordForm()

      .log('Enter invalid email asdf')
      .enterEmail('asdf')

      .log('Click Reset')
      .clickResetButton()
      .verifyErrorInResetPasswordForm()

      .log('Enter invalid email asdf.com')
      .enterEmail('asdf.com')

      .log('Click Reset')
      .clickResetButton()
      .verifyErrorInResetPasswordForm()

      .log('Click Reset')
      .clickResetButton()
      .verifyErrorInResetPasswordForm()

      .log('Enter valid email: Client')
      .enterEmail(clientEmail)

      .log('Click Reset')
      .clickResetButton()

      .log('Verify reset password successfully')
      .verifyTextExist('Success')

      .reload()
      .wait(1500)

      .log('Enter valid email: Worker')
      .enterEmail(workerEmail)

      .log('Click Reset')
      .clickResetButton()

      .log('Verify reset password successfully')
      .verifyTextExist('Success');
  });
});
