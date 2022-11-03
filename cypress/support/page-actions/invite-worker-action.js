Cypress.Commands.add('verifyErrorMessageIsShown', (inputCss, errorMessage) => {
  cy.get(inputCss)
    .parents('label')
    .find('.status span')
    .then(el => expect(el.text()).to.equal(errorMessage))
});