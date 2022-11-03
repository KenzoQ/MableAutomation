import * as data from '../../fixtures/test-data.json';

Cypress.Commands.add('checkPopupOnTimesheet', () => {
  cy.log('Check Covid popup')
    .wait(3000)
    .get('body')
    .then($body => {
      if ($body.find('.mat-dialog-container').length > 0) {
        cy.log('Close the Covid popup')
          .clickElement('mat-dialog-container button.close');
      }
    });
});

Cypress.Commands.add('checkErrorField', (locator, text, status = true) => {
  if (!!status) {
    cy.log('Check the error message is shown')
      .get(locator)
      .parents('label')
      .find('.status span')
      .contains(text)
      .should('be.exist');
  } else {
    cy.log('Check the error message is not shown')
      .get(locator)
      .parents('label')
      .find('span')
      .contains(text)
      .should('not.be.exist');
  }
});

Cypress.Commands.add('clickOkIfExist', () => {
  cy
    .wait(2000)
    .get('body')
    .then($body => {
      if ($body.find('mat-dialog-container').length > 0) {
        cy
          .clickElementOnText(
            'mat-dialog-actions button',
            'Ok',
          );
      }
    });
});

Cypress.Commands.add('clickCloseIfExist', () => {
  cy
    .wait(1000)
    .get('body')
    .then($body => {
      if ($body.find('mat-dialog-container').length > 0) {
        cy
          .clickElementOnText(
            'mat-dialog-actions button',
            'Close',
          );
      }
    });
});

Cypress.Commands.add('checkApproveSession', () => {
  cy.log('Check the aprrove session')
    .verifyElementContainsText(
      data.timesheet.client.approveSession.tableTitle,
      'Support worker',
    )

    .verifyElementContainsText(
      data.timesheet.client.approveSession.tableTitle,
      'Hours',
    )

    .verifyElementContainsText(
      data.timesheet.client.approveSession.tableTitle,
      'Rate',
    )

    .verifyElementContainsText(
      data.timesheet.client.approveSession.tableTitle,
      'Rate type',
    )

    .verifyElementContainsText(
      data.timesheet.client.approveSession.tableTitle,
      'Details',
    )

    .verifyElementContainsText(
      data.timesheet.client.approveSession.tableTitle,
      'Total due',
    )

    .verifyElementContainsText(
      data.timesheet.client.approveSession.tableTitle,
      'Actions',
    );
});

Cypress.Commands.add('verifyStartDate', (day, month, year) => {
  cy
    .wait(1000)
    .verifyTextVisible(day)
    .verifyTextVisible(month)
    .verifyTextVisible(year);
});

Cypress.Commands.add('verifyStartTime', (hours = '12', minutes = '00', amOrPm = 'AM') => {
  cy
    .wait(1000)
    .verifyTextVisible(hours)
    .verifyTextVisible(minutes)
    .verifyTextVisible(amOrPm);
});

Cypress.Commands.add('verifyEndDate', (day, month, year) => {
  cy
    .wait(1000)
    .verifyTextVisible(day)
    .verifyTextVisible(month)
    .verifyTextVisible(year);
});

Cypress.Commands.add('verifyEndTime', (hours = '12', minutes = '00', amOrPm = 'PM') => {
  cy
    .wait(1000)
    .verifyTextVisible(hours)
    .verifyTextVisible(minutes)
    .verifyTextVisible(amOrPm);
});
