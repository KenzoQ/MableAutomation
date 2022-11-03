Cypress.Commands.add('verifyAmendAgreementPageDisplay', () => {
  cy.get('.edit_agreement').should('exist');
});

Cypress.Commands.add('verifyMySupportWorkerPageDisplay', () => {
  cy.get('.section-title').contains('My Support Workers').should('exist');
});

Cypress.Commands.add('verifyDisplayWhyTerminateAgreementPage', () => {
  cy.get('p')
    .contains('Why are you terminating this agreement with')
    .should('exist');
});

Cypress.Commands.add('verifyAgreementBeenTerminatePageDisplay', () => {
  cy.get('#review-heading')
    .contains('Agreement has been terminated')
    .should('exist');
});

Cypress.Commands.add('verifyMyClientPageDisplay', () => {
  cy.get('.section-title').contains('My Clients').should('exist');
});

Cypress.Commands.add('clickTerminateTheAgreement', () => {
  cy.get('a').contains('Terminate the Agreement').click();
});

Cypress.Commands.add('viewAgreementAtMySupportWorker', () => {
  cy.get('.name').parent().contains('View Agreement').click();
});

Cypress.Commands.add('viewAgreementAtMyClient', () => {
  cy.get('.name').parent().contains('View Agreement').click();
});

Cypress.Commands.add('clickSaveAndSentAgreementPage', () => {
  cy.get('input[type="submit"][value="SAVE AND SEND"]').click({ force: true });
});

Cypress.Commands.add('inputAgreedServiceAgreementPage', (text) => {
  cy.get('.edit_agreement textarea').clear().type(text);
});

Cypress.Commands.add(
  'verifyTimesheetRowIsCorrect',
  (date, workerFullname, amount) => {
    cy.xpath(
      `//tr[contains(@class,"carer_invoice_statement") and contains(.,"${workerFullname}") and contains(.,"${date}") and contains(.,"${amount}")]`,
    ).should('exist');
  },
);

Cypress.Commands.add(
  'verifyTimeSheetNotExistInWaitForApproveTable',
  (date, workerFullname, amount) => {
    cy.xpath(
      `//table[@class="table-blue"]//tr[contains(@class,"table-blue") and contains(.,"${workerFullname}") and contains(.,"${date}") and contains(.,"${amount}")]`,
    ).should('not.exist');
  },
);

Cypress.Commands.add('selectSuburbBidJobForm', (text) => {
  cy.wait(500);
  cy.get('#suburb-search-results__list .font-semibold')
    .contains(text)
    .should('exist')
    .click();
});

Cypress.Commands.add('selectJobBidJobForm', (text) => {
  cy.wait(500);
  cy.get('a').contains('Most Recent').click({ force: true });
  cy.get('.posted-jobs-listing__list')
    .contains(text)
    .should('exist')
    .click({ force: true });
});

Cypress.Commands.add('verifyRateNumberIs', (text) => {
  cy.wait(500);
  cy.get('.icon-usd input')
    .invoke('attr', 'value')
    .then((value) => {
      expect(value).to.have.string(text);
    });
});

Cypress.Commands.add('viewAgreement', (name) => {
  cy.wait(500);
  cy.get('.name')
    .contains(name)
    .parent()
    .contains('View Agreement')
    .should('exist')
    .click();
});

Cypress.Commands.add('deleteAllRateProposedForm', () => {
  cy.wait(500);
  // cy.get('.remove_fields').click({multiple: true})

  cy.get('.remove_fields').each(($each) => {
    cy.get('body').then(($body) => {
      if ($body.find('.remove_fields').length > 1) {
        cy.wrap($each).click();
      }
    });
  });
});

Cypress.Commands.add('inputRateProposalForm', (rateName, rateValue) => {
  cy.wait(500);
  cy.get('.agreement_rate')
    .not('[style="display: none;"]')
    .find('input.rate_value[type="text"]')
    .clear()
    .type(rateName);
  cy.get('.agreement_rate')
    .not('[style="display: none;"]')
    .find('input.rate_value[type="number"]')
    .clear()
    .type(rateValue);
});

Cypress.Commands.add('clickTerminated', () => {
  cy.get('ul li a[href="#terminated"]').should('exist').click();
});

Cypress.Commands.add('terminateAgreement', (name) => {
  cy.wait(500);
  let isExist = false;
  cy.get('body').then(($body) => {
    if ($body.find('#users-list-active .name').length > 0) {
      cy.get('#users-list-active .name')
        .each(($name) => {
          cy.wrap($name)
            .invoke('text')
            .then(($text) => {
              const getText = $text;
              cy.log(getText);
              if (getText.includes(name) === true) {
                isExist = true;
              }
            });
        })
        .then(() => {
          if (isExist === true) {
            cy.viewAgreement(name)
              .clickElementByText('Terminate the Agreement')
              .clickElement(
                '#agreement_termination_reason_no_longer_needs_support',
              )
              .clickSubmitButton()
              .verifyTextExist('Agreement has been terminated');
          }
        });
    }
  });
});

Cypress.Commands.add('declineRequestingOffer', () => {
  cy.wait(500);
  cy.isElementExisting('.btn-danger.decline').then((isTrue) => {
    if (isTrue) {
      cy.get('.btn-danger.decline').each((item) => {
        cy.get(item).click({ force: true });
      });
    }
  });
});

Cypress.Commands.add('generateRandomDay', () => {
  cy.wait(500);
  // 1. Add all existing day to an array
  // Count how many a in timesheet => Click .next_page as many

  // Add Delivery Date to array
  const count = cy.get('body').find('.pagination a').length;
  cy.log(count);
  const i = 0;
  while (i < count / 2) {
    cy
      .get('tr td:nth-child(2)')
      .each(($each) => {
        console.log($search);
        cy
          .wrap($each)
          .invoke('text')
          .then(($text) => {
            cy
              .log($text)
              .get('.next_page')
              .click();
          });
       });
  }
});

Cypress.Commands.add('clickApprovedTimesheet', (text) => {
  cy.wait(500);
  cy.get('#pending-timesheets')
    .contains(text)
    .parents('tr')
    .find('.approve-timesheet')
    .click();
});

Cypress.Commands.add(
  'verifyTimeSheetExistInWaitForApproveTable',
  (workerFullname, startDay, duration, budget) => {
    cy.wait(500)
      .verifyElementContainsText('.user-name', workerFullname)
      .verifyElementContainsText('.text', startDay)
      .verifyElementContainsText('.text', duration)
      .verifyElementContainsText('.text', budget);
  },
);

Cypress.Commands.add('verifyFirstRowInBillingTalbeContains', (text) => {
  cy.wait(500);
  cy.get('tbody>tr').first().contains(text).should('exist');
});
