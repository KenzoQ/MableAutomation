Cypress.Commands.add('enterEmail', (email) => {
  cy.get("input[type='email']").clear().type(email).wait(1500);
});

Cypress.Commands.add('enterPassword', (password) => {
  cy.get("input[type='password']")
    .clear({ force: true })
    .type(password, { force: true });
});

Cypress.Commands.add('clickLogin', () => {
  cy.get('#loginBtn').click();
});

Cypress.Commands.add('clickLogout', () => {
  cy.get('body')
    .contains('Logout')
    .click({ force: true })
    .wait(2000);
});

Cypress.Commands.add('clickForgotYourPassword', () => {
  cy.get('#resetPasswordBtn').click();
});

Cypress.Commands.add('clickJobsButton', () => {
  cy.get('ul.main-navigation-list li a span')
    .contains('Jobs')
    .parent('a')
    .click();
});

Cypress.Commands.add('verifyRedirectToDashboardPage', () => {
  cy.wait(3000)
    .get('#callHelpCenter')
    .should('exist')
    .get('button')
    .contains('Logout')
    .should('exist');
});

Cypress.Commands.add('verifyRedirectToJobsPage', () => {
  cy.location().then((_loc) => {
    const url = _loc.pathname;
    cy.log(url);
    cy.url().should('include', '/search');
  });
});

Cypress.Commands.add('verifyRedirectToSignInPage', () => {
  cy.location().then((_loc) => {
    const url = _loc.pathname;
    cy.log(url);
    cy.url().should('include', '/login');
  });
});

Cypress.Commands.add('clickLogoutOnTopMenu', () => {
  cy.get('body').contains('Logout').click({ force: true }).wait(1000);
});

Cypress.Commands.add('clickResetButton', () => {
  cy.wait(500);
  cy.get('#resetBtn').should('exist').click();
});

Cypress.Commands.add('verifyErrorInResetPasswordForm', () => {
  cy.wait(500);
  cy
    .url().should('include', '/reset-password')
    .get('form label')
    .should('have.class', 'invalid')
    .verifyTextExist('Input a valid email')
    .get('form button')
    .should('not.be.disabled')
});
