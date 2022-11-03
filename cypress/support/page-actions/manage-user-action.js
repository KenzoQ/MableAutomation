Cypress.Commands.add('searchUserAtManageUser', (text) => {
  cy.wait(500);
  cy.inputTextField('#search-users-input', text)
    .clickElement('#submit')
    .wait(1000);
});

Cypress.Commands.add('viewSupportWorkerProfileAtManageUser', (text) => {
  cy.wait(500);
  const wrapEl = cy
    .get('.clear')
    .contains(text)
    .parents('.info')
    .contains('View Support Worker Profile')
    .invoke('attr', 'href')
    .then(($link) => {
      cy.visit($link);
    });
});

Cypress.Commands.add('choosePostCodeAtManageUser', (postCode, address) => {
  cy.wait(500);
  cy.get('input#user_postcode')
    .type(postCode)
    .wait(1000)
    .get('.tt-suggestion div')
    .contains(address)
    .should('exist')
    .click({ force: true });
});

Cypress.Commands.add('editUserAtManageUser', (text) => {
  cy.wait(500);
  const wrapEl = cy
    .get('.clear')
    .contains(text)
    .parents('.info')
    .contains('Edit')
    .click();
});

Cypress.Commands.add('inputOrganisationAtCreateCoordinator', (text) => {
  cy.wait(500);
  cy.get('[placeholder="NOTHING SELECTED"]').type(text).wait(2000);
  cy.get('.tt-dataset-organisations').contains(text).click();
});

Cypress.Commands.add('loginAsAtManageUser', (text) => {
  cy.wait(500);
  const wrapEl = cy
    .get('.clear')
    .contains(text)
    .parents('.info')
    .contains('Login as')
    .click();
});

Cypress.Commands.add('loginAsUser', (user) => {
  cy.wait(500)
    .navigateByLeftMenuInDashboard('Manage users')
    .searchUserAtManageUser(user)
    .get('.clear')
    .contains(user)
    .parents('.info')
    .contains('Login as')
    .click();
});

Cypress.Commands.add('editAccount', (user) => {
  cy.wait(500)
    .navigateByLeftMenuInDashboard('Manage users')
    .searchUserAtManageUser(user)
    .get('.clear')
    .contains(user)
    .parents('.info')
    .contains('Edit')
    .click();
});

Cypress.Commands.add('editUserFromAdminView', (user) => {
  cy.wait(500)
    .navigateByLeftMenuInDashboard('Manage users')
    .searchUserAtManageUser(user)
    .get('.clear')
    .contains(user)
    .parents('.info')
    .contains('Edit')
    .click();
});

Cypress.Commands.add('selectRoleTabAtUser', (text) => {
  cy.wait(500);
  cy.get('.tab').contains(text).click().wait(1000);
});

Cypress.Commands.add('verifyUsersInListOnlyContain', (text) => {
  cy.wait(500);
  cy.get('.clear').each(($each) => {
    cy.wrap($each).contains(text).should('exist');
  });
});

Cypress.Commands.add('getListUser', () => {
  cy.wait(500);
  return cy.get('.clear').then(($list) => $list);
});

Cypress.Commands.add('selectTypeOfCareAtCreateClient', (value) => {
  cy.wait(500);
  cy.get('#user_consumer_profile_attributes_type_of_care').select(value, {
    force: true,
  });
});
