Cypress.Commands.add('goToProfile', () => {
  cy.wait(500)
    .get('#profileCardAvatar').click({ force: true });
});

Cypress.Commands.add('playYoutubeVideo', () => {
  cy.wait(500);
  cy.get('#iframe-video')
    .then((iframe1) => {
      cy.log(iframe1);
      iframe1.contents().find('.ytp-large-play-button').click();
      cy.wait(5000); // Give time for video playing
    })
    .then(() => {
      cy.get('#iframe-video').then((iframe2) => {
        cy.log(iframe2);
        cy.wrap(iframe2).click();
        // iframe2.contents().find('.ytp-play-button').click({force: true})
      });
    });
});

Cypress.Commands.add('goThroughQuestionSteps', () => {
  cy.wait(500);
  // p.contains("text").parents('.question').find("input[value='0']")
  cy.get('p')
    .contains('When should you respond to messages from clients?')
    .parents('.question')
    .find("input[value='1']")
    .click({ force: true });
  cy.clickContinueQuizButton();
  cy.get('p')
    .contains(
      'Can you start working for a client before you send them an offer?',
    )
    .parents('.question')
    .find("input[value='3']")
    .click({ force: true });
  cy.clickContinueQuizButton();
  cy.get('p')
    .contains('How do care workers get paid?')
    .parents('.question')
    .find("input[value='0']")
    .click({ force: true });
  cy.clickContinueQuizButton();
  cy.get('p')
    .contains(
      'If a client asks you to assist with medication, but you aren’t formally qualified, what should you do?',
    )
    .parents('.question')
    .find("input[value='2']")
    .click({ force: true });
  cy.clickContinueQuizButton();
  cy.get('p')
    .contains(
      'What should you do first if you’re running late or need to cancel a shift?',
    )
    .parents('.question')
    .find("input[value='0']")
    .check();
  cy.clickContinueQuizButton();
  cy.get('p')
    .contains('Who should you call first in an emergency?')
    .parents('.question')
    .find("input[value='1']")
    .check();
  cy.clickContinueQuizButton();
  cy.get('p')
    .contains(
      'If you are witnessing the abuse of your client, who should you report this to first?',
    )
    .parents('.question')
    .find("input[value='2']")
    .click()
    .wait(2000);
});

Cypress.Commands.add('clickContinueQuizButton', () => {
  cy.get('#quiz-button button').click().wait(2000);
});

Cypress.Commands.add('selectInsuranceQuestion', (selector, value) => {
  cy.wait(500);
  cy.get(selector).parent().contains(value).should('exist').click();
});

Cypress.Commands.add('selectDateOfIssue', (day, month, year) => {
  cy.wait(500);
  cy.get('.date_picker_dropdowns_day').select(day);
  cy.get('.date_picker_dropdowns_month').select(month);
  cy.get('.date_picker_dropdowns_year').select(year);
});

Cypress.Commands.add('inputUserFirstNameProfile', (text) => {
  cy.wait(500);
  cy.get('#user_first_name').should('exist').type(text);
});

Cypress.Commands.add('inputUserLastNameProfile', (text) => {
  cy.wait(500);
  cy.get('#user_last_name').should('exist').type(text);
});

Cypress.Commands.add('sendFileOtherQualificationProfile', (text) => {
  cy.wait(500);
  cy.get('#hidden-asset').should('exist').type(text);
});

Cypress.Commands.add('inputUserBirthdayProfile', (text) => {
  cy.wait(500);
  cy.get('#user_birth_date').should('exist').type(text);
});

Cypress.Commands.add('inputUserResidentialAddressProfle', (text) => {
  cy.wait(500);
  cy.get('#user_address_line_1').should('exist').type(text);
});

Cypress.Commands.add('clickNoAtPoliceCheck', () => {
  cy.wait(500);
  cy.get('[data-event-code="PCfrom_police_station_no"]').click({ force: true });
});

Cypress.Commands.add('clickValidateABNButton', () => {
  cy.wait(500);
  cy.get('#lookup_abn').should('be.visible').click();
});

Cypress.Commands.add('clickYesAtPoliceCheck', () => {
  cy.wait(500);
  cy.get('#profile_police_check_exists_true').check({ force: true });
});

Cypress.Commands.add('clickSubmitProfile', () => {
  cy.wait(500);
  cy.get('#submit').should('exist').click();
});

Cypress.Commands.add('selectAvailability', (text) => {
  cy.wait(500);
  cy.get('.tt-suggestions').contains(text).should('exist').click();
});

Cypress.Commands.add('declareNotFamily', (position) => {
  cy.wait(500);
  cy.get('body').then(($body) => {
    if ($body.find('.not_a_family_member_declaration').length !== 0) {
      cy.get('.not_a_family_member_declaration')
        .eq(position - 1)
        .check();
    } else {
    }
  });
});

Cypress.Commands.add('selectLiveOutSideAustralia', (text) => {
  cy.wait(500);
  cy.get('body').then(($body) => {
    if (
      $body.find(
        '#user_carer_profile_attributes_lived_outside_australia_over_a_year_false',
      ).length !== 0
    ) {
      cy.get(
        '#user_carer_profile_attributes_lived_outside_australia_over_a_year_false',
      ).click({ force: true });
    } else {
    }
  });
});

Cypress.Commands.add(
  'verifyUnsucessfulEdittingAccountAndInformErrorMessage',
  (field, textError, parent = false) => {
    cy.wait(500);
    cy.url()
      .should('include', '/profile/main')
      .get('h4.section-title')
      .contains('Account Details')
      .should('be.visible');

    if (!parent) {
      cy.get(field)
        .parent()
        .find('span.help-block')
        .contains(textError)
        .should('be.visible');
    } else {
      cy.get(field)
        .parents(parent)
        .find('span.help-block')
        .contains(textError)
        .should('be.visible');
    }
  },
);

Cypress.Commands.add('verifyErrorMessageNotShown', (field, parent = false) => {
  cy.wait(500);

  if (!parent) {
    cy.get(field)
      .parent()
      .then(($el) => {
        const check = $el.find('span.help-block').length;
        expect(check).to.equal(0);
      });
  } else {
    cy.get(field)
      .parents(parent)
      .then(($el) => {
        const check = $el.find('span.help-block').length;
        expect(check).to.equal(0);
      });
  }
});

Cypress.Commands.add('verifySuccessfulEdittingAccount', () => {
  cy.wait(1000);
  cy.url()
    .should('include', '/profile/services')
    .get('h4.section-title')
    .contains('Services Offered')
    .should('be.visible');
});

Cypress.Commands.add('goToTheAccountDetailPage', () => {
  cy.wait(500);
  cy.get('a[href="/profile/main"]')
    .contains('1. Account Details')
    .should('be.visible')
    .click({ force: true })
    .url()
    .should('include', '/profile/main')
    .get('h4.section-title')
    .contains('Account Details')
    .should('be.visible');
});

Cypress.Commands.add('verifyLegalNameIsShown', () => {
  cy.wait(500);
  cy.get('#legal-names')
    .should('exist')
    .get('#legal-names .alert')
    .contains(
      'Please provide your legal name so that we can approve you on Mable.',
    )
    .should('exist');
});
