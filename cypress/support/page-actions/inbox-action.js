/* eslint-disable no-loop-func */
import * as data from '../../fixtures/test-data.json';

Cypress.Commands.add('clickAgreementButtonOnActivityFeed', () => {
  cy.wait(500);
  cy.get('#activity-feed a').contains('agreement').click();
});

Cypress.Commands.add('verifyFieldsOnAmendAgreementPage', () => {
  cy.wait(500);
  // Rate description
  cy.get('#agreement_agreement_rates_attributes_0_rate_name').type('Monday');
  cy.get('#agreement_agreement_rates_attributes_0_rate_cents').type('32');
  cy.get('#agreement_agreement_rates_attributes_0_flat_rate_true').check();
  cy.get('#agreement_agreed_service').type('This is description');
});

Cypress.Commands.add('clickAgreementButtonOnActivityFeed', () => {
  cy.wait(500);
  cy.get('#activity-feed a').contains('agreement').click();
});

Cypress.Commands.add('verifyActivityFeedContainMessage', (message) => {
  cy.wait(500);
  cy.get('#activity-feed').contains(message).should('exist');
});

Cypress.Commands.add('verifyOfferInformation', (workerFirstName) => {
  cy.wait(500);
  cy.get('#agreement-section').contains(workerFirstName).should('exist');
  cy.get('#agreement-section')
    .contains('has sent you an agreement')
    .should('exist');
  cy.get('#agreement-section')
    .contains('total cost of support is 5% higher')
    .should('exist');
  cy.get('#agreement-section .icon-usd').should('exist');
  cy.get('#agreement-section').contains('Agreed Service').should('exist');
});

Cypress.Commands.add('clickConversationInbox', (text) => {
  cy.wait(500);
  cy.get('.name').contains(text).should('be.visible').click();
});

Cypress.Commands.add('verifyAcceptAgreementButtonDisplay', () => {
  cy.wait(500);
  cy.get('#accept-agreement').should('be.visible');
});

Cypress.Commands.add('clickRequestAgreement', () => {
  cy.wait(500);
  cy.get('#request-agreement').click();
});

Cypress.Commands.add('verifyStatutoryDeclarationPopupDisplay', () => {
  cy.wait(500);
  cy.get('.popup-title').contains('Statutory Declaration').should('exist');
});

Cypress.Commands.add('verifyStatutoryDeclarationPopupNotDisplay', () => {
  cy.wait(500);
  cy.get('.popup-title').should('not.be.visible');
});

Cypress.Commands.add('verifyAgreementRequestedButtonIsDisable', () => {
  cy.wait(500);
  cy.get('#request-agreement.disabled').should('exist');
});

Cypress.Commands.add('verifyRequestAgreementButtonIsDisable', () => {
  cy.wait(500);
  cy.get('[disabled="disabled"]').contains('Request Agreement').should('exist');
});

Cypress.Commands.add('verifyAgreementRequestedButtonIsEnable', () => {
  cy.wait(500);
  cy.get('#request-agreement').should('exist');
  cy.get('#request-agreement.disabled').should('not.exist');
});

Cypress.Commands.add('verifyRequestOfferPopupDisplay', () => {
  cy.wait(500);
  cy.get('.popup-title')
    .contains('The following users are requesting an offer of agreement')
    .should('be.visible');
});

Cypress.Commands.add('verifyRequestOfferPopupNotDisplay', () => {
  cy.wait(500);
  cy.get('.popup-title')
    .contains('The following users are requesting an offer of agreement')
    .should('not.be.visible');
});

Cypress.Commands.add('clickViewOnRequestOfferPopup', () => {
  cy.wait(500);
  cy.get('.popup .btn-success').click();
});

Cypress.Commands.add('clickDeclineOnRequestOfferPopup', () => {
  cy.wait(500);
  cy.get('.popup .decline').click();
});

Cypress.Commands.add('verifyRequestOfferPopupInformation', (name) => {
  cy.wait(500);
  cy.get('.popup').contains(name).should('be.visible');
  cy.get('.popup').contains('view').should('be.visible');
  cy.get('.popup').contains('decline').should('be.visible');
  cy.get('.popup .icon-close').should('be.visible');
});

Cypress.Commands.add('clickXButtonOnRequestOfferPopup', () => {
  cy.wait(500);
  cy.get('.popup .icon-close').click();
});

Cypress.Commands.add('clickEditLastSendOfferButton', () => {
  cy.wait(500);
  cy.get('#send_offer_btn').click();
});

Cypress.Commands.add('clickAmendAgreement', () => {
  cy.wait(500);
  cy.get('#send_offer_btn').click();
});

Cypress.Commands.add('clickAcceptAgreement', () => {
  cy.wait(500);
  cy.get('#accept-agreement').click();
});

Cypress.Commands.add('clickDeclineAgreement', () => {
  cy.wait(500);
  cy.get('#decline-agreement').click();
});

Cypress.Commands.add('verifyDeclineAgreementButtonDisplay', () => {
  cy.wait(500);
  cy.get('#decline-agreement').should('be.visible');
});

Cypress.Commands.add('verifyConversationPageDisplay', () => {
  cy.wait(500);
  cy.get('#messages-list').should('exist');
});

Cypress.Commands.add('verifyInboxPageDisplay', () => {
  cy.wait(500);
  cy.get('#inbox').should('exist');
});

Cypress.Commands.add('verifyMessageIsDisplayedInInbox', (text) => {
  cy.wait(500);
  cy.get('.text-holder').contains(text).should('exist');
});

Cypress.Commands.add('verifyBadgeNewMessageIconInInbox', (name) => {
  cy.wait(500);
  cy.get('.name')
    .contains(name)
    .parents('.line.conversation')
    .find('.mark-danger')
    .should('exist');
});

Cypress.Commands.add('archiveMessage', (name) => {
  cy.wait(500);
  cy.get('.name')
    .contains(name)
    .parents('.line.conversation')
    .find('.glyphicon-remove')
    .should('exist')
    .click();
});

Cypress.Commands.add('unArchiveMessage', (name) => {
  cy.wait(500);
  cy.get('.name')
    .contains(name)
    .parents('.line.conversation')
    .find('.glyphicon-inbox')
    .should('exist')
    .click();
});

Cypress.Commands.add('selectTabInInbox', (tab) => {
  cy.wait(500);
  cy.get('[role="tab"]').contains(tab).should('exist').click();
});

Cypress.Commands.add('verifyUserMessageDisplaysInInbox', (name) => {
  cy.wait(500);
  cy.get('.name').contains(name).should('exist');
});

Cypress.Commands.add('checkInboxPopup', () => {
  cy
    .wait(2000)
    .log('Check inbox')
    .get('body')
    .then(($body) => {
      if ($body.find('app-requested-agreement button').length > 0) {
        cy.log('Click close btn')
          .get(data.message.closeRequestedAgrPopup)
          .click({ force: true });
      }

      if ($body.find('mat-dialog-actions button:contains(Close)').length > 0) {
        cy.log('Click close btn')
          .clickElementOnText(
            'mat-dialog-actions button',
            'Close',
          );
      }

      if ($body.find('mat-dialog-actions button:contains(Got it!)').length > 0) {
        cy.log('Click Got it btn')
          .clickElementOnText(
            'mat-dialog-actions button',
            'Got it!',
          );
      }
    });
});

Cypress.Commands.add('moveInboxListToBottom', () => {
  cy
    .get('.channelListWrapper.styledScroll')
    .scrollTo('bottom');
});

Cypress.Commands.add('moveToUntilFoundName', (name, maxMoving = 10) => {
  for (let i = 0; i < maxMoving; i += 1) {
    let isFound = false;
    cy.get('body').find('.channelContent .title').then(($list) => {
      for (let item = 0; item < $list.length; item += 1) {
        cy.get('.channelContent .title')
          .eq(item).invoke('text').then((text) => {
            if (text.trim() === name) {
              isFound = true;
            }
            if (!isFound) {
              if (item === $list.length - 1) {
                cy
                  .get('.channelContent .title')
                  .last()
                  .trigger('mouseover');
              }
            } else {
              cy.log(`Found: ${text}`);
            }
          });
      }
    });
  }
});

Cypress.Commands.add('clickViewOfferInBox', (isForce = false) => {
  cy.get('.expandContainer button>span')
    .contains('View agreement')
    .click({ force: isForce });
});

Cypress.Commands.add('closeBeforeStartPopupIfExist', (isForce = false) => {
  cy.get('body').then(($body) => {
    if ($body.find('mat-dialog-container').length > 0) {
      cy.get('mat-dialog-container button')
        .first()
        .click({ force: isForce });
    }
  });
});
