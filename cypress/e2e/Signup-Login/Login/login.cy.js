import * as testData from '../../../fixtures/test-data.json';

describe('Login', () => {
  // Account
  const invalidEmail = 'mobile.test.carer@examplezz';
  const invalidPassword = 'passwordszz';
  const errorMessage = 'Invalid Email or password.';

  const adminEmail = testData.dashboardAccount.adminAccount.email;
  const adminPassword = testData.dashboardAccount.adminAccount.password;

  const clientEmail = testData.dashboardAccount.clientAccount.email;
  const clientPassword = testData.dashboardAccount.clientAccount.password;

  const workerEmail = testData.dashboardAccount.nonCompliantWorkerAccount.email;
  const workerPassword = testData.dashboardAccount.nonCompliantWorkerAccount.password;

  const orgAdminEmail = testData.dashboardAccount.orgAdminAccount.email;
  const orgAdminPassword = testData.dashboardAccount.orgAdminAccount.password;

  const coordinatorEmail = testData.dashboardAccount.coordinatorAccount.email;
  const coordinatorPassword = testData.dashboardAccount.coordinatorAccount.password;

  const validEmail = workerEmail;
  const validPassword = workerPassword;

  beforeEach(() => {
    cy.visit('/')
      .byPassAuthen();
  });

  it('ES-T116. Login with invalid credentials', () => {
    cy.log('Go to Login page')

      .log(`Enter valid email: ${validEmail}`)
      .enterEmail(validEmail)
      .log(`Enter invalid password: ${invalidPassword}`)
      .enterPassword(invalidPassword)
      .log('Click Login')
      .clickLogin()

      .log(`VP. cy is prompted with an error message: ${errorMessage}`)
      .verifyTextExist(errorMessage)

      .log(`Enter invalid email: ${invalidEmail}`)
      .enterEmail(invalidEmail)
      .log(`Enter valid password: ${validPassword}`)
      .enterPassword(validPassword)
      .log('Click Login')
      .clickLogin()

      .log(`VP. cy is prompted with an error message: ${errorMessage}`)
      .verifyTextExist(errorMessage)

      .log(`Enter invalid email: ${invalidEmail}`)
      .enterEmail(invalidEmail)
      .log(`Enter invalid password: ${validPassword}`)
      .enterPassword(invalidPassword)
      .log('Click Login')
      .clickLogin()

      .log(`VP. cy is prompted with an error message: ${errorMessage}`)
      .verifyTextExist(errorMessage);
  });

  it('ES-T118. Login with valid credentials', () => {
    cy.log('Go to Login page')

      .log(`Enter valid email: ${validEmail}`)
      .enterEmail(validEmail)
      .log(`Enter invalid password: ${validPassword}`)
      .enterPassword(validPassword)
      .log('Click Login')
      .clickLogin()

      .log('VP. cy successfully logged in and redirected to dashboard page')
      .verifyRedirectToDashboardPage();
  });

  it('ES-T119. Check login in session', () => {
    cy.log('Go to Login page')
      .log(`Enter valid email: ${validEmail}`)
      .enterEmail(validEmail)
      .log(`Enter invalid password: ${validPassword}`)
      .enterPassword(validPassword)

      .log('Click Login')
      .clickLogin()
      .log('VP. cy successfully logged in and redirected to dashboard page')
      .verifyRedirectToDashboardPage()

      .log('Navigate to jobs pages')
      .navigateByLeftMenuInDashboard('Jobs')
      .log('VP. cy redirect to job pages')
      .verifyRedirectToJobsPage();
  });

  it('ES-T120. Logout', () => {
    cy.log('Go to Login page')
      .log(`Enter valid email: ${validEmail}`)
      .enterEmail(validEmail)
      .log(`Enter valid password: ${validPassword}`)
      .enterPassword(validPassword)
      .log('Click Login')
      .clickLogin()

      .log('VP. cy successfully logged in and redirected to dashboard page')
      .verifyRedirectToDashboardPage()

      .url()
      .then(() => {
        cy.log('Click "Logout"')
          .clickLogout()
          .log('VP. cy is redirected to login page')
          .verifyRedirectToSignInPage();
      });
  });

  it('ES-T122. Check  log in', () => {
    cy.log('Go to Login page')
      // Admin
      .log(`Login as an admin: ${adminEmail}`)
      .loginToDashboard(adminEmail, adminPassword)

      .log('Click Logout')
      .clickLogoutOnTopMenu()

      .log('VP. cy is redirected to login page')
      .verifyRedirectToSignInPage()

      // Organisation admin
      .log(`Login as an Login as organisation admin: ${orgAdminEmail}`)
      .loginToDashboard(orgAdminEmail, orgAdminPassword)

      .log('Click Logout')
      .clickLogout()
      .log('VP. cy is redirected to login page')
      .verifyRedirectToSignInPage()

      // Coordinator
      .log(`Login as coordinator: ${coordinatorEmail}`)
      .loginToDashboard(coordinatorEmail, coordinatorPassword)

      .log('Click Logout')
      .clickLogout()
      .log('VP. cy is redirected to login paga')
      .verifyRedirectToSignInPage()

      // Client
      .log(`Login as an Login as client ${clientEmail}`)
      .loginToDashboard(clientEmail, clientPassword)

      .log('Click Logout')
      .clickLogout()

      .log('VP. cy is redirected to login page')
      .verifyRedirectToSignInPage()

      // Worker
      .log(`Login as an Login as worker ${workerEmail}`)
      .loginToDashboard(workerEmail, workerPassword)

      .log('Click Logout')
      .clickLogout()

      .log('VP. cy is redirected to login page')
      .verifyRedirectToSignInPage();
  });
});
