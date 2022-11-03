Cypress.Commands.add('clickPostAJob', () => {
  cy.wait(1000).get('.action button').contains('Post a job').click();
});

Cypress.Commands.add(
  'createAJob',
  (
    suburbNumber,
    jobKind,
    hourWorkingFor,
    supportRequire,
    jobTitle,
    jobDescription,
    gender,
    service,
  ) => {
    cy.wait(500)
      .inputSuburb(suburbNumber)
      .chooseJobKind(jobKind)
      .chooseHoursLookingFor(hourWorkingFor)
      .chooseSupportRequire(supportRequire)
      .inputTextField('#job_title', jobTitle)
      .inputTextField('#job_job_description', jobDescription);
    if (gender !== undefined) {
      cy.get(
        `[id="posted_job_search_filter_advanced_users.gender__${gender}"]`,
      ).check();
    }
    if (service !== undefined) {
      cy.get('span').contains(service).click();
    }
    cy.clickPostJob();
  },
);

Cypress.Commands.add('verifyPostJobInfoDisplaysCorrectly', (label, text) => {
  cy.wait(500);
  cy.get('label')
    .contains(label)
    .parents('.row')
    .contains(text)
    .should('exist');
});

Cypress.Commands.add('chooseJobKind', (item) => {
  cy.wait(500);
  cy.get('#frequency_btn_group').contains(item).click();
});

Cypress.Commands.add('chooseHoursLookingFor', (item) => {
  cy.wait(500);
  cy.get('#hours_btn_group').contains(item).click();
});

Cypress.Commands.add('chooseSupportRequire', (item) => {
  cy.wait(500);
  cy.get('#scheduling_btn_group').contains(item).click();
});

Cypress.Commands.add('inputTextFieldByLabel', (label, text) => {
  cy.wait(500);
  cy.get('label')
    .contains(label)
    .parents('.form-group')
    .find('input')
    .clear()
    .type(text);
});

Cypress.Commands.add('inputTextAreaByLabel', (label, text) => {
  cy.wait(500);
  cy.get('label')
    .contains(label)
    .parents('.form-group')
    .find('textarea')
    .type(text);
});

Cypress.Commands.add('inputSuburb', (text) => {
  cy.wait(500);
  cy.get('#bloodhound2').clear().type(text).wait(1000)
    .type('{enter}');
});

Cypress.Commands.add('selectCheckboxInPostJobForm', (label, checkbox) => {
  cy.wait(500);
  cy.get('#push')
    .contains(label)
    .parent()
    .contains(checkbox)
    .parent()
    .find('input')
    .check();
});

Cypress.Commands.add('clickPostJob', () => {
  cy.wait(500);
  cy.get('#postJob').click({ force: true });
});

Cypress.Commands.add('selectCheckboxByLabel', (item) => {
  cy.wait(500);
  cy.get('body').contains(item).parent().find('input')
    .check();
});

Cypress.Commands.add('selectCheckboxAgreeTerms', () => {
  cy.wait(500);
  cy.get('body').then(($body) => {
    if ($body.find('#agreement_agree_terms').length > 0) {
      cy.get('#agreement_agree_terms').check();
    }
  });
});

Cypress.Commands.add('verifyStatusLastMinuteJob', (name, status) => {
  cy.get('app-current-jobs .jobTitle .jobName')
    .contains(name)
    .parents('app-client-lastminute-job')
    .find('span')
    .contains(status);
});
