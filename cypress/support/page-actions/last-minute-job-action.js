/* eslint-disable no-restricted-syntax */
import * as data from '../../fixtures/test-data.json';

Cypress.Commands.add('navigateToLMJByStatus', (status, isForce = false) => {
  cy.log(`'Navigate to Job by ${status}'`)
    .get(data.LMJElements.client.chip)
    .contains(status)
    .first()
    .parents('div.details')
    .children('div.jobTitle')
    .children('a.jobName')
    .click({ force: isForce });
});

Cypress.Commands.add('navigateToLMJByTitle', (title, isForce = false) => {
  cy.log(`'Navigate to Job by ${title}'`)
    .get(data.LMJElements.client.title)
    .contains(title)
    .first()
    .click({ force: isForce });
});

Cypress.Commands.add('verifyElementOffersVisible', (offerNumber) => {
  const args = Object.values(data.LMJElements.client.offerDetails);
  for (const element of args) {
    if (element.indexOf('div.details') >= 0 || element.indexOf('div.avatar ') >= 0) {
      const childrens = element.split(' ');
      // cy.get(data.LMJElements.client.offerItem)
      //   .eq(offerNumber)
      //   .children(childrens[0])
      //   .children(childrens[1])
      //   .trigger('mouseover');
      cy.get(data.LMJElements.client.offerItem)
        .eq(offerNumber)
        .children(childrens[0])
        .children(childrens[1])
        .should('be.visible');
    } else {
      // cy.get(data.LMJElements.client.offerItem)
      //   .eq(offerNumber)
      //   .children(element)
      //   .trigger('mouseover');
      cy.get(data.LMJElements.client.offerItem)
        .eq(offerNumber)
        .children(element)
        .should('be.visible');
    }

    cy.get(data.LMJElements.client.offerItem)
      .eq(offerNumber)
      .contains(data.LMJContent.client.jobDetails.offer.message);
    cy.get(data.LMJElements.client.offerItem)
      .eq(offerNumber)
      .contains(data.LMJContent.client.jobDetails.offer.instant);
  }
});

Cypress.Commands.add('verifyLMJOfferList', () => {
  cy.get(data.LMJElements.client.offerItem).should('be.visible');
  cy.get('body').then(($body) => {
    const numberOffer = $body.find(data.LMJElements.client.offerItem).length;
    if (numberOffer > 0) {
      for (let i = 0; i < numberOffer; i += 1) {
        cy.verifyElementOffersVisible(i);
      }
    }
  });
});

Cypress.Commands.add('verifyLastOffer', () => {
  cy.get(data.LMJElements.client.offerItem).should('be.visible');
  cy.get('body').then(($body) => {
    const numberOffer = $body.find(data.LMJElements.client.offerItem).length;
    const lastOfferNum = numberOffer - 1;
    cy.verifyElementOffersVisible(lastOfferNum);
  });
});

Cypress.Commands.add('CheckProfaneWordList', (profaneList, isForce = false) => {
  for (const item of profaneList) {
    const text = `${profaneList[0]} check ${item}`;
    cy.log('Enter the job title')
      .get(data.postAJob.lastMinuteJob.titleInput)
      .clear({ force: isForce })
      .type(text, { force: isForce })

      .log('Describe the job')
      .get(data.postAJob.lastMinuteJob.describeJob)
      .clear({ force: isForce })
      .type(text, { force: isForce })

      .log('The consumer description')
      .get(data.postAJob.lastMinuteJob.consumerDescription)
      .clear({ force: isForce })
      .type(text, { force: isForce })

      .log('Click "Post to local workers" btn')
      .clickElementOnText(
        data.postAJob.lastMinuteJob.actionBtn,
        'Post to local workers',
      )

      .get(data.postAJob.lastMinuteJob.titleInput)
      .parents('label.invalid')
      .children('div.status')
      .should('have.text', 'Contains sensitive language')

      .get(data.postAJob.lastMinuteJob.describeJob)
      .parents('label.invalid')
      .children('div.status')
      .should('have.text', 'Contains sensitive language')

      .get(data.postAJob.lastMinuteJob.consumerDescription)
      .parents('label.invalid')
      .children('div.status')
      .should('have.text', 'Contains sensitive language');
  }
});

Cypress.Commands.add('checkLMJInboxByTitle', (title) => {
  cy.get('div.lastMinuteJobDetails').should('be.visible');
  cy.get('div.lastMinuteJobDetails')
    .contains(title)
    .parents('div.info')
    .should('contain', 'Last Minute job')
    .should('contain', 'View');
});

Cypress.Commands.add('checkLMJInboxNoOfferByTitle', (title) => {
  cy.get('div.lastMinuteJobDetails').should('be.visible');
  cy.get('div.lastMinuteJobDetails')
    .contains(title)
    .parents('div.info')
    .should('contain', 'Last Minute job')
    .should('contain', 'No offers yet');
});
