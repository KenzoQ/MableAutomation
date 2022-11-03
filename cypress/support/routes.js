beforeEach('Set up routes', () => {
  cy.log('( •_•) Setting up routes for XHR requests');
  cy.server();
  cy.intercept('GET', '/profiles/search?*').as('GET_/profiles/search');
  cy.intercept('GET', '/search/suburb_search/*').as('GET_/search/suburb_search');
  cy.intercept('GET', '/profiles/search_name?*').as('GET_/profiles/search_name');
  cy.intercept('GET', '*/incidents/new.json').as('GET_/incidents/new.json');
  cy.intercept('GET', '/app/settings/account.json').as('GET_account.json');
  cy.intercept('GET', '/app/api/v1/optimizely_tracking.json').as('GET_optimizely_tracking.json');
});
