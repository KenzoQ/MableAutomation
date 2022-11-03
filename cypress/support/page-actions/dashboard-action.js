/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
import * as data from '../../fixtures/test-data.json';

Cypress.Commands.add('viewAgreementAtDashboard', (firstname) => {
  cy.get('h4')
    .contains('Agreements')
    .parent()
    .parent()
    .parent()
    .contains(firstname)
    .parent()
    .parent()
    .contains('View & Approve')
    .click();
});

Cypress.Commands.add(
  'verifyAgreementStatusAtDashboard',
  (firstname, status) => {
    cy.get('h4')
      .contains('Agreements')
      .parent()
      .parent()
      .parent()
      .contains(firstname)
      .parent()
      .parent()
      .contains(status)
      .should('exist');
  },
);

Cypress.Commands.add('viewRequestAgreementAtDashboard', (firstname) => {
  cy.get('h4')
    .contains('Agreements')
    .parent()
    .parent()
    .parent()
    .contains(firstname)
    .parent()
    .parent()
    .contains('View')
    .click();
});

Cypress.Commands.add('clickAgreementByPosition', (eq = 0) => (
  cy.wait(500)
    .get('body')
    .then($body => {
      let check = false;
      if ($body.find('.agreementPanel button').length !== 0) {
        cy.get('.agreementPanel button')
          .eq(eq)
          .click();
        check = true;
      }

      return new Promise(resolve => resolve(check));
    })
));

Cypress.Commands.add('clickMessageByPosition', (eq = 0) => (
  cy.wait(500)
    .get('body')
    .then($body => {
      let check = false;
      if ($body.find('.conversationPanel button').length !== 0) {
        cy.get('.conversationPanel button')
          .eq(eq)
          .click();
        check = true;
      }
      return new Promise(resolve => resolve(check));
    })
));

Cypress.Commands.add('clickRecommnededJobByPosition', (eq = 0) => (
  cy.wait(500)
    .get('body')
    .then($body => {
      let check = false;
      if ($body.find('.jobPanel button').length !== 0) {
        cy.get('.jobPanel button')
          .eq(eq)
          .click();
        check = true;
      }
      return new Promise(resolve => resolve(check));
    })
));

Cypress.Commands.add('unapprovedThenApprovedAgain', (email, password) => {
  cy.getAccount(
    email,
    password,
  ).then((infoAccount) => {
    if (infoAccount !== undefined) {
      cy.log(`Approved: ${infoAccount.body.data.attributes.approved}`);
      if (infoAccount.body.data.attributes.approved === true) {
        // Unapprove
        cy.approveAcc(infoAccount.body.data.id)
        // Approve
          .approveAcc(infoAccount.body.data.id);
      } else {
        cy.approveAcc(infoAccount.body.data.id);
      }
    }
  });
});

Cypress.Commands.add('findCheckBackToDashboard', () => {
  cy.get('body')
    .then($body => {
      if ($body.find('[href="/dashboard"]').length > 0) {
        cy.get('[href="/dashboard"]').first()
          .click({ force: true });
      } else if ($body.find('app-onboarding button').length > 0) {
        cy.clickElementOnText('app-onboarding button', 'Back to dashboard');
      }
    });
});

Cypress.Commands.add('verifyNavigateToImmediate', (title, url) => {
  cy.get(data.dashboardFeature.elements.immediateTitle)
    .contains(title)
    .parents('.panel')
    .find('button')
    .click()
    .wait(2000);
  cy.verifyCurrentURL(url);
  cy.findCheckBackToDashboard();
  cy.checkAllPopups();
});
Cypress.Commands.add('verifyNavigateToUpdateDue', (title, url) => {
  cy.get(data.dashboardFeature.elements.updateDueTitle)
    .contains(title)
    .next()
    .click()
    .wait(2000);
  cy.verifyCurrentURL(url);
  cy.verifyCurrentURL(url);
  cy.findCheckBackToDashboard();
  cy.checkAllPopups();
});
Cypress.Commands.add('checkDashboardContent', (...elements) => {
  const args = [...elements];
  cy.log(args);
  for (const item of args) {
    if (typeof (item) !== 'undefined') {
      if (item.title !== undefined || item.welcomeBack !== undefined || item.congratulations !== undefined || item.thanks !== undefined) {
        const list = Object.values(item);
        for (const content of list) {
          if (content !== null) {
            cy.verifyTextExistNoWait(content);
          }
        }
        if (item.title === 'Immediate action required') {
          item.covidTitle !== null ? cy.verifyNavigateToImmediate(data.dashboardFeature.immediateActionRequired.covidTitle,
            data.dashboardFeature.urls.profileBadge) : null;
          item.policeCheckTitle !== null ? cy.verifyNavigateToImmediate(data.dashboardFeature.immediateActionRequired.policeCheckTitle,
            data.dashboardFeature.urls.policeCheck) : null;
          item.workingWithChildrenTitle !== null ? cy.verifyNavigateToImmediate(data.dashboardFeature.immediateActionRequired.workingWithChildrenTitle,
            data.dashboardFeature.urls.workingWithChildern) : null;
          item.heathRegTitle !== null ? cy.verifyNavigateToImmediate(data.dashboardFeature.immediateActionRequired.heathRegTitle,
            data.dashboardFeature.urls.healthReg) : null;
          item.heathRegTitle !== null ? cy.verifyNavigateToImmediate(data.dashboardFeature.immediateActionRequired.nursingReg,
            data.dashboardFeature.urls.nursingReg) : null;
          cy.checkAllPopups();
        }
        if (item.title === 'Updates Due') {
          item.fluVaccineTitle !== null ? cy.verifyNavigateToUpdateDue(data.dashboardFeature.updatesDue.fluVaccineTitle,
            data.dashboardFeature.urls.profileBadge) : null;
          item.ndisTitle !== null ? cy.verifyNavigateToUpdateDue(data.dashboardFeature.updatesDue.ndisTitle,
            data.dashboardFeature.urls.nidsPage) : null;
          cy.checkAllPopups();
        }
        if (item.title === 'NDIS Worker Screening Check') {
          for (const content of list) {
            if (content !== null) {
              cy.verifyTextExistNoWait(content);
              cy.get('.updateDue .updateType').contains(item.title).parent().find('button.primary')
                .click();
              cy.verifyCurrentURL(data.dashboardFeature.NDISWorkerPage.url);
              cy.verifyElementExistNoWait(data.dashboardFeature.NDISWorkerPage.link);
              const ndisTextList = Object.values(data.dashboardFeature.NDISWorkerPage.text);
              cy.verifyListTextExistNoWait(ndisTextList);
              cy.get('[href="/dashboard"]').first().click();
              cy.checkAllPopups();
            }
          }
        }
      } else {
        const list = Object.values(item);
        for (const content of list) {
          if (content !== null) {
            cy.verifyElementExistNoWait(content);
          }
        }
      }
    }
  }
});
Cypress.Commands.add('verifyNewlyCoodinatorContent', () => {
  cy
    .log('Verify user is navigate to coordinator page')
    .wait(2000)
    .verifyTextVisible('Welcome')
    .verifyTextVisible('Start to build a support network for your clients.')
    .verifyTextVisible('Coordinator')
    .verifyTextVisible('Dashboard')
    .verifyTextVisible('Search workers')
    .verifyTextVisible('Shortlist')
    .verifyTextVisible('Compliance')
    .verifyTextVisible('Account')

    .verifyTextVisible('How to start')
    .verifyTextVisible('Add your client.')
    .verifyTextVisible('Search worker profiles to find the right fit.')
    .verifyTextVisible('Shortlist workers to review or message later.')
    .verifyTextVisible('Manage and connect your clients to their support.')

    .verifyTextVisible('Contact us')
    .verifyTextVisible('We can help you add new clients, write job posts, message and shortlist support workers, post urgent support requests and more.')
    .verifyTextVisible('If you have any questions, please email us at coordinator@mable.com.au or call us on 1300 73 65 73 and select option 4.');
});
Cypress.Commands.add('closeCovidPopup', () => {
  cy.get('body').then(($body) => {
    if ($body.find('.mat-dialog-actions button').length > 0) {
      cy
        .log('Click Close btn')
        .get('.mat-dialog-actions button').contains('Close').click({ force: true });
    }
  });
});
Cypress.Commands.add('findAndCloseCovidPopup', (times) => {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < times; i++) {
    // eslint-disable-next-line no-loop-func
    cy.get('body').then(($body) => {
      if ($body.find('.mat-dialog-actions button').length < 1) {
        cy.wait(1000);
      }
    });
  }
});
Cypress.Commands.add('hasNumberClientOnPage', (number = 20) => {
  cy.get('.panel.clientTile').should('have.length', number);
});

Cypress.Commands.add('hasNumberWorkerOnPage', (number = 20) => {
  cy.get('.panel.workerSearchMatchCard').should('have.length', number);
});

Cypress.Commands.add('removeShortListByName', (name) => {
  cy.get('div .carerName h2')
    .contains(name)
    .then(($ele) => {
      cy.wrap($ele).parents('div.shortlistDetailHeader')
        .children('div.shortlistDetailHeaderControls')
        .children('button.removeFromShortlistLink')
        .click();
    });
});

Cypress.Commands.add('hasNumberCoordinatorOnPage', (number = 20) => {
  cy.get('div.coordinatorSummary').should('have.length', number);
});

Cypress.Commands.add('verifyBuildProfileTile', () => {
  cy.log('Check profile buiding tile')
    .verifyTextVisible("Let's build your profile")

    .log('Click "Build Profile" btn')
    .clickElementOnText('button', 'Build profile')

    .log('Check My profile')
    .verifyElementVisible('app-profile-building')

    .log('Back to dashboard')
    .navigateByLeftMenuInDashboard('Dashboard');
});

Cypress.Commands.add('verifyAndClickShowAllAgreements', () => {
  cy.log('Verify and click show all agreement')
    .verifyElementVisible('div.agreementPanel')
    .get('div#recentAgreements span')
    .contains('Show all')
    .trigger('mouseover')
    .click()
    .then((res) => {
      if (res) {
        cy.verifyCurrentURL('/clients')
          .log('Go to the dashboard')
          .navigateByLeftMenuInDashboard('Dashboard');
      }
    });
});

Cypress.Commands.add('checkMableNewsOnClientDashboard', () => {
  cy.log('Check Mable new in Client Dashboard');

  Object.keys(data.dashboardFeature.clientMableNews).forEach(item => {
    cy.log('Verify section of Mable news')
      .verifyTextExist(data.dashboardFeature.clientMableNews[item].title);

    Object.values(data.dashboardFeature.clientMableNews[item].contents).forEach(content => {
      cy.verifyTextExist(content);
    });
  });
});

Cypress.Commands.add('checkItemInObject', (data) => {
  Object.keys(data).forEach(item => {
    cy.verifyTextVisible(data[item]);
  });
});

Cypress.Commands.add('inputAddressAndClickSearchButton', (address, position) => {
  cy.verifyTextVisible('Search workers')
    .inputTextField('app-suburb-selector input', address, true)
    .wait(1000)
    .clickElement('.suggestions .listOption', true, position)
    .wait(1000)
    .clickElementOnText('button span', 'Search');
});

Cypress.Commands.add('clickSelectorIfExist', (selector) => {
  cy.get('body').then($body => {
    if ($body.find(selector).length > 0) {
      cy.get(selector).click();
    }
  });
});

Cypress.Commands.add('clickLoginAsOrganisation', () => {
  cy.xpath('//header//button[contains(.,\'Login as Organisation\')]')
    .click()
    .wait(2000);
});

Cypress.Commands.add('clickViewProfileInChatInfo', () => {
  cy.xpath('//span[contains(.,\'View profile\')]')
    .click()
    .wait(2000);
});

Cypress.Commands.add('skipContinueToEditMyProfileDialog', () => {
  cy.wait(2000)
    .get('body')
    .then(($body) => {
      if ($body.find('.mat-dialog-container').length > 0) {
        cy.get('button')
          .contains('Continue to edit my profile')
          .click({ force: true });
      }
    });
});

Cypress.Commands.add('uncheckAllAdditionalTraining', () => {
  cy.wait(1000)
    .get('body')
    .then(($body) => {
      if ($body.find('.checkboxListContainer mat-checkbox.mat-checkbox-checked').length > 1) {
        cy.get('.checkboxListContainer mat-checkbox.mat-checkbox-checked label')
          .each(($item) => {
            cy.wrap($item).click({ force: true });
          });
      }
    });
});

Cypress.Commands.add('waitAppLoaderNotVisible', (loop = 10, defaultTime = 500) => {
  cy.log('Waiting until the app loader is completed');
  cy.wait(defaultTime);
  for (let i = 0; i < loop; i += 1) {
    cy
      .get('body')
      .then(($body) => {
        if ($body.find('app-loader').length > 1) {
          cy.wait(defaultTime);
        }
      });
  }
});
