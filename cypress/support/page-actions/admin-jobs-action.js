Cypress.Commands.add('verifyPaginationWorkCorrectlyAtJobPage', () => {
  cy.wait(500);
  // Verify default page is 1
  cy.get('.pagination .active').eq(0).contains('1').should('exist');

  // Verify Next button works
  cy.get('.pagination .next_page a').eq(0).click().wait(2000);
  cy.get('.pagination .active').eq(0).contains('2').should('exist');
});

Cypress.Commands.add('clickViewFirstJobAtJobPage', () => {
  cy.wait(500);
  cy.get('.job-action-buttons')
    .eq(0)
    .contains('View')
    .click()
    .should('not.exist');
});

Cypress.Commands.add('clickPullJobFirstJobAtJobPage', () => {
  cy.wait(500);
  cy.get('.job-action-buttons')
    .eq(0)
    .contains('Pull Job')
    .click()
    .should('not.exist');
});

Cypress.Commands.add('clickDeleteJobFirstJobAtJobPage', () => {
  cy.wait(500);
  cy.get('.job-action-buttons')
    .eq(0)
    .contains('Delete')
    .click()
    .should('not.exist');
});

Cypress.Commands.add('getJobNameOfFirstJobAtJobPage', () => {
  cy.wait(500);
  return cy
    .get('tbody tr')
    .eq(0)
    .find('td')
    .eq(2)
    .invoke('text')
    .then((text) => text);
});

Cypress.Commands.add('searchJobs', (text) => {
  cy.wait(500);
  cy.inputTextField('#postcode_filter', text).wait(2000);
});

Cypress.Commands.add('switchTabsAtJob', (text) => {
  cy.wait(500);
  cy.get('[role="tab"]').contains(text).click().wait(3000); // Wait for tab switch
});

Cypress.Commands.add('approveFirstJobAtJobPage', () => {
  cy.wait(500);
  cy.get('tbody tr').eq(0).contains('Approve').click();
});
