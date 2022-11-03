/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/newline-after-import
import * as data from '../../fixtures/test-data.json';

export class AgreementAction {
  selectExpertedStartDay(text = '1') {
    cy.get(data.agreement.worker.expertedStartDateEle)
      .eq(0)
      .select(text);
  }

  selectExpertedStartMonth(text = 'January') {
    cy.get(data.agreement.worker.expertedStartDateEle)
      .eq(1)
      .select(text);
  }

  selectExpertedStartYear(text = '2022') {
    cy.get(data.agreement.worker.expertedStartDateEle)
      .eq(2)
      .select(text);
  }

  selectOfterTime(text = 'Weekly') {
    cy.get(data.agreement.worker.ofterTimeEle)
      .eq(0)
      .select(text);
  }

  selectAvailableDay(text = 'tuesday') {
    cy.get(data.agreement.worker.availabledayEle)
      .contains(text)
      .parents(data.agreement.worker.availabledayEle)
      .find('.mat-slide-toggle-bar')
      .click();
  }

  selectAvailableStartTimeByIndex(text = '09:00 am', index = 0) {
    cy.get(data.agreement.worker.availableTimeSelector)
      .eq(index)
      .select(text);
  }

  selectAvailableEndTimeByIndex(text = '11:00 am', index = 1) {
    cy.get(data.agreement.worker.availableTimeSelector)
      .eq(index)
      .select(text);
  }

  selectLastAmountRadioByName(text = 'Flat rate') {
    cy.get(data.agreement.worker.amountRadio)
      .last()
      .contains(text)
      .click();
  }

  selectNDISSupportItemsByName(text = 'training for carers/parents') {
    cy.get(data.agreement.worker.ndisItemsChkLabel)
      .contains(text, { matchCase: false })
      .click();
  }
}
Cypress.Commands.add('selectAgreementWithWorkerName', (name) => {
  cy.get('.workerName')
    .contains(name)
    .parents('.panel')
    .find('button span')
    .contains('View agreement')
    .click();
});

Cypress.Commands.add('viewProfileWithWorkerName', (name) => {
  cy.get('.workerName')
    .contains(name)
    .parents('.panel')
    .find('button span')
    .contains('View profile')
    .click();
});

Cypress.Commands.add('verifyCounterAgreementInCoordinator', (status = 'Pending') => {
  const agreementTxt = 'Agreements';
  cy.get('.panel .details button>span')
    .contains(agreementTxt)
    .next()
    .invoke('text')
    .then(($number) => {
      cy
        .log(`click on ${agreementTxt}`)
        .clickElementOnText('app-coordinator-client-details button', agreementTxt)
        .get('.agreementDetail .chip')
        .contains(status)
        .its('length')
        .should('be.equal', Number($number));
    });
});

Cypress.Commands.add('verifyNumberCounterAgreement', (number = 1) => {
  const agreementTxt = 'View agreement';
  cy.get('.panel .details button>span')
    .contains(agreementTxt)
    .parents('button').then(($item) => {
      expect($item.find('span.chip').length).to.equal(number);
    });
});

Cypress.Commands.add('clickAgreementThenCheckDetail', (name = null) => {
  const selector = '.agreementDetail .name';
  if (name !== null) {
    cy.get(selector)
      .contains(name)
      .parents('div.agreementDetail')
      .find('button')
      .contains('View agreement')
      .click();
  } else {
    cy.get('div.agreementDetail')
      .find('button')
      .contains('View agreement')
      .click();
  }
  cy.verifyTextVisible('Back to all agreements');
});

Cypress.Commands.add('clickFirstAgreementOfClientByStatus', (status = 'Pending') => {
  cy
    .log(`click on Agreements then select the first agreement with ${status}`)
    .verifyElementVisible('app-coordinator-client-details')
    .get('.panel button.link.action>span')
    .eq(1)
    .click({ force: true })
    .verifyElementVisible('.agreementDetail')
    .get('.agreementDetail .chip')
    .contains(status)
    .parents('div.agreementDetail')
    .find('button')
    .contains('View agreement')
    .click();
});

Cypress.Commands.add('clickSendMessageFollowName', (name = 'Daniel') => {
  const selector = '.agreementDetail .name';
  if (name !== null) {
    cy.get(selector)
      .parents('div.agreementDetail')
      .find('button')
      .contains('Send message')
      .click();
  } else {
    cy.get('div.agreementDetail')
      .find('button')
      .contains('Send message')
      .click();
  }
});

Cypress.Commands.add('sendMessageFromAgreementCard', (name = 'Daniel', text = 'Automation testing') => {
  cy.clickSendMessageFollowName(name);
  cy
    .log('Input on message')
    .inputTextField(data.message.messageInput, text)

    .log('Click send message')
    .clickElement(data.message.sendMessage, true)
    .wait(1000)

    .log('Verify new message should be send')
    .verifyElementContainsText(
      '.msgBody',
      text,
    );
});

Cypress.Commands.add('clickAllRadioHaveName', (name = 'Flat rate') => {
  cy.get(data.agreement.worker.rateRadio)
    .each(($item) => {
      cy.wrap($item)
        .invoke('text')
        .then(($text) => {
          if ($text.indexOf(name) >= 0) {
            cy.wrap($item)
              .trigger('mouseover')
              .click();
          }
        });
    });
});

Cypress.Commands.add('fillAgreementDetailWithFlatRate', (name = 'Add new rate',
  rateAmount = '35',
  des = 'automation testing') => {
  cy
    .log('Enter rate description')
    .inputTextFieldAtPosition(data.agreement.worker.rateDescription, name, '0')

    .log('Enter rate amount')
    .inputTextFieldAtPosition(data.agreement.worker.rateMount, '20', '0')
    .log('Verify the error message is shown')
    .verifyTextVisible('Offer a minimum rate of $32 for active support under our terms of use.')

    .log('Enter rate amount')
    .inputTextFieldAtPosition(data.agreement.worker.rateMount, rateAmount, '0')

    .log('Enter agreed rate amount')
    .fillAgreedRate(rateAmount)

    .verifyTextNotExist('Offer a minimum rate of $32 for active support under our terms of use.')

    .log('Click Flat rate')
    .clickAllRadioHaveName('Flat rate')

    .log('Click No, we\'ll discuss and update the agreement later')
    .clickElementOnText(data.agreement.worker.rateRadio, 'No, we\'ll discuss and update the agreement later')

    .log('Enter Agreed services')
    .inputTextField(data.agreement.worker.agreedService, des);
});

Cypress.Commands.add('fillAgreedRate', (rateAmount = '35') => {
  cy
    .log('Enter rate amount')
    .inputTextFieldAtPosition(data.agreement.worker.rateMount, rateAmount, 1);
});

Cypress.Commands.add('acceptAgreementFromConversationAsClient', () => {
  cy.log('Click view Agreement')
    .clickElementOnText(
      'app-expansion-panel button>span',
      'View agreement',
    )

    .log('Check agreement details')
    .waitAppLoaderNotVisible()
    .verifyElementVisible('app-pending-agreement')
    .verifyTextVisible('Agreement with')
    .verifyTextVisible('Service')
    .verifyTextVisible('Rates')

    .waitAppLoaderNotVisible()
    .verifyElementVisible('app-pending-agreement .agreementsActions')
    .clickElementOnText('button>span', 'Accept agreement');
});
