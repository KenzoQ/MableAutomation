import * as data from '../../fixtures/test-data.json';

Cypress.Commands.add('checkProfileBuildingPopup', () => {
  cy.wait(3000)
    .get('body')
    .then($body => {
      if ($body.find('mat-dialog-container h3:contains("Edit your profile")').length > 0) {
        cy
          .verifyTextVisible(data.profileBuildingContent.editProfilePopup.title)
          .clickElementOnText(
            'button',
            data.profileBuildingContent.editProfilePopup.continueBtn,
          );
      }
    });
});

Cypress.Commands.add('closeMableDialog', (closeOrCancelOption) => {
  cy.get('body').then($body => {
    if ($body.find('mat-dialog-container').length > 0) {
      cy.get('mat-dialog-container button')
        .contains(closeOrCancelOption)
        .click();
    }
  });
});

Cypress.Commands.add('turnOnAvailableForWork', () => {
  cy.get('body').then($body => {
    if ($body.find('mat-slide-toggle.mat-checked').length === 0) {
      cy.get('mat-slide-toggle label.mat-slide-toggle-label')
        .click();
    }
  });
});

Cypress.Commands.add('turnOffAvailableForWork', () => {
  cy.get('body').then($body => {
    if ($body.find('mat-slide-toggle.mat-checked').length > 0) {
      cy.get('mat-slide-toggle label.mat-slide-toggle-label')
        .click();
    }
  });
});

Cypress.Commands.add('uncheckIllOfferAFreeMeet', () => {
  cy.get('body').then($body => {
    if ($body.find('mat-checkbox#meetPotentialClients.mat-checkbox-checked').length > 0) {
      cy.get('mat-checkbox#meetPotentialClients label.mat-checkbox-layout')
        .click();
    }
  });
});

Cypress.Commands.add('selectDayStartTimeEndTime', (day, startTime, endTime) => {
  cy.get('h4.h3')
    .contains(day.toLowerCase())
    .siblings('mat-slide-toggle')
    .invoke('attr', 'id')
    .then(id => {
      cy.get('body').then($body => {
        const selector = `mat-slide-toggle#${id}`;

        if ($body.find(`${selector}.mat-checked`).length > 0) {
          cy.get(`${selector} label.mat-slide-toggle-label`)
            .click();
        }

        cy.get(`${selector} label.mat-slide-toggle-label`)
          .click()
          .wait(1000);

        cy.get('select[name="startTime"]')
          .select(startTime)
          .wait(1000);

        cy.get('select[name="endTime"]')
          .select(endTime)
          .wait(1000);
      });
    });
});

Cypress.Commands.add('turnOffAllAvailableDaysAndTimes', () => {
  cy.get('body').then($body => {
    if ($body.find('#availabilityEditModeList mat-slide-toggle.mat-checked').length >= 1) {
      cy.get('body')
        .find('#availabilityEditModeList mat-slide-toggle.mat-checked')
        .then(($matSlideToggle) => {
          cy.wrap($matSlideToggle)
            .click();
        });
    }
  });
});

Cypress.Commands.add('deleteCurrentSuburbOrPostcode', () => {
  const locationElem = '.selectedLocationList app-icon[name="close"] svg';
  cy
    .get('body')
    .then($body => {
      const locations = $body.find(locationElem);
      const n = locations.length;
      if (n > 0) {
        for (let i = 0; i < n; i++) {
          cy.get(locationElem)
            .first()
            .trigger('click')
            .verifyTextVisible('Location deleted')
            .wait(1000);
        }
      }
    });
});

Cypress.Commands.add('checkCareExperienceNoSelected', (text) => {
  cy.get('mat-checkbox span.mat-checkbox-label span')
    .contains(text)
    .parents('span.mat-checkbox-label')
    .find('svg')
    .should('not.exist');
});

Cypress.Commands.add('verifyCovid19GobalBannerVisible', (ele = 'app-global-banners') => {
  cy
    .verifyElementExist(ele)
    .verifyTextVisible('COVID-19: ')
    .verifyTextVisible('Stay safe during in-person support and use our guidelines and screening questions.');
});

Cypress.Commands.add('verifyCovid19GobalBannerNotVisible', (ele = 'app-global-banners') => {
  cy
    .verifyElementExist(ele)
    .verifyTextNotExist('COVID-19: ')
    .verifyTextNotExist('Stay safe during in-person support and use our guidelines and screening questions.');
});

Cypress.Commands.add('navigationAndVerifyCovid19BannerVisible', (target = 'Inbox', ele = 'app-global-banners') => {
  let subUrl = null;
  switch (target.trim()) {
    case 'Support hours': subUrl = '/timesheet';
      break;
    default: subUrl = `/${target.toLowerCase()}`;
  }

  cy
    .navigateByLeftMenuInDashboard(target)
    .url()
    .should('include', subUrl)

    .verifyCovid19GobalBannerVisible(ele);
});

Cypress.Commands.add('navigationAndVerifyCovid19BannerNotVisible', (target = 'Inbox', ele = 'app-global-banners') => {
  let subUrl = null;
  switch (target.trim()) {
    case 'Support hours': subUrl = '/timesheet';
      break;
    default: subUrl = `/${target.toLowerCase()}`;
  }

  cy
    .navigateByLeftMenuInDashboard(target)
    .url()
    .should('include', subUrl)

    .verifyCovid19GobalBannerNotVisible(ele);
});

Cypress.Commands.add('loginAccountAndCheckExperienceBasic', (email, password, otherText = 'Enter your professional and personal experience.') => {
  cy
    .log(`Login ${email}`)
    .loginToDashboard(email, password)

    .clickElement('div:not(.duplicateNav)>nav #profileCardName')

    .verifyElementVisible('div.viewFromProfileCard')
    .get('div#careExperience')
    .trigger('mouseover')

    .verifyElementContainsText('h3', 'Experience')
    .verifyElementContainsText('p', 'Self declared')
    .verifyElementContainsText('div.h4', otherText)
    .verifyElementContainsText('p', 'Only visible to you')
    .verifyElementVisible('[href*="/profile-building/experience"]');
});

Cypress.Commands.add('navToWorkerBySuburb', (suburb, name) => {
  cy
    .clickElementOnText('div:not(.duplicateNav)>nav div#mainMenuSection', 'Search workers')
    .verifyElementContainsText('button', 'Search')

    .log(`Search: ${suburb}`)
    .searchWorkersBySuburb(suburb)
    .clickElementOnText('div#workerSearchByChildrenCheck .radioLabel', 'No')
    .clickElementOnText('#workerSearchStepSkip button', 'Skip to results')

    .log('Retrieved workers are displayed')
    .verifyElementVisible('.panel.workerSearchMatchCard')

    .get('.panel.workerSearchMatchCard .name')
    .contains(name)
    .click();
});

Cypress.Commands.add('VerifyWorkerExpFromClient', (otherText = ['hasn’t entered a full description of their experience yet.']) => {
  cy
    .get('div#careExperience')
    .trigger('mouseover')
    .verifyElementContainsText('h3', 'Experience')
    .verifyElementContainsText('p', 'Self declared')
    .verifyElementContainsText('p', 'If you are interested')
    .verifyElementContainsText('p', ' to find out more about their experience.')
    .verifyListBoxText(otherText);
});
