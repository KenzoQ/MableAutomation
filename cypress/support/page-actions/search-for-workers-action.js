/* eslint-disable quotes */
// import { cy } from 'date-fns/locale';
import * as data from '../../fixtures/test-data.json';

Cypress.Commands.add('clickFindOut', () => {
  cy.get('#what-happens-not-signed').click();
});

Cypress.Commands.add('clickRemoveFile', () => {
  cy.get('.delete-file').click();
});

Cypress.Commands.add('verifyRemoveFileIsVisible', () => {
  cy.get('.delete-file').should('be.visible');
});

Cypress.Commands.add('clickRequiredQuestion', () => {
  cy.get('[href="/profile/add_on_flu_shot"]').click();
});

Cypress.Commands.add('clickUpdateProfileAddOn', () => {
  cy.get('[href*="/profile/add_on"]').click();
});

Cypress.Commands.add('clickEditProfile', () => {
  cy.wait(1000)
    .url()
    .then((url) => {
      if (url.includes('/2/')) {
        cy.get('#urgentCallToAction a')
          .contains('Complete your profile')
          .click();
      } else {
        cy.get('[href="/profile/main"]').eq(1).click();
      }
    });
});

Cypress.Commands.add('clickVerification', () => {
  cy.get('[href="/profile/verification"]').click({ force: true });
});

Cypress.Commands.add('clickSearchSupportWorkers', () => {
  cy.navigateByLeftMenuInDashboard('Search workers');
});

Cypress.Commands.add('clickProfile', () => {
  cy.get('.profile.uppercase').click();
});

Cypress.Commands.add('clickLoginAsAdmin', () => {
  cy.get('body').contains('Login as Admin').click({ force: true });
});

Cypress.Commands.add('clickBankAccountDetails', () => {
  cy.get('[href="/profile/bank_account"]').click({ force: true });
});

Cypress.Commands.add('clickUpdateButton', () => {
  cy.get('[href="/profile/add_on"]').click();
});

Cypress.Commands.add('clickLearnMored', () => {
  cy.get('#learn_more_stat_dec_panel').click();
});

Cypress.Commands.add('verifyAddFileIsVisible', () => {
  cy.get('.attach-new-file').should('be.visible');
});

Cypress.Commands.add('verifyProfileAddOnIsVisible', () => {
  cy.get('.profile-add-on-nav').should('be.visible');
});

Cypress.Commands.add('verifyProfileAddOnIsNotVisible', () => {
  cy.get('.profile-add-on-nav').should('not.visible');
});

Cypress.Commands.add('checkPlaceHolder', (placeholder) => {
  cy.get(`[placeholder="${placeholder}"]`).should('exist');
});

Cypress.Commands.add('checkXButton', () => {
  cy.get('.icon-close').should('be.visible');
});

Cypress.Commands.add('clickXButton', () => {
  cy.get('.icon-close').first().click();
});

Cypress.Commands.add('clickFirstViewProfileButton', () => {
  cy.get('.btn.btn-sm.btn-primary').first().click();
});

Cypress.Commands.add('clickSearchTextBox', () => {
  cy.get('.full-text-search').click();
});

Cypress.Commands.add('clickLoginAs', () => {
  cy.get('#users-result').should('be.visible');
  cy.get('a[href*="/login_as/"]').first().click();
});

Cypress.Commands.add('enterValueInTextBox', (value) => {
  cy.get('.full-text-search').clear().type(value);
});

Cypress.Commands.add('enterEmailInToSearch', (email) => {
  cy.get('#search-users-input').clear().type(email);
});

Cypress.Commands.add('waitForTextIsNotExist', (text) => {
  cy.wait(1000);
  cy.get('body').contains(text).should('not.visible');
});

Cypress.Commands.add('verifyUpdateTileIsVisible', () => {
  cy.get('[href*="/profile/add_on"]').should('be.exist');
});

Cypress.Commands.add('verifyUpdateTileIsNotVisible', () => {
  cy.get('.popup-title')
    .contains(`Statutory Declaration`)
    .should('not.be.exist');
});

Cypress.Commands.add('verifyUpdateButtonInStatutoryDeclarationEnabled', () => {
  cy.verifyTextNotExist(`Update`);
});

Cypress.Commands.add('verifyStatutoryDeclarationPopUpIsVisible', () => {
  cy.get('.popup-title').contains(`Statutory Declaration`).should(`be.visible`);
});

Cypress.Commands.add(
  'verifyAdditionalProfileQuestionsPromptedIsVisible',
  () => {
    cy.get('h3').contains(`Additional Profile Questions`).should(`be.visible`);
  },
);

Cypress.Commands.add('verifyRedirectToProfileMain', () => {
  cy.url().should('include', 'profile/main');
});

Cypress.Commands.add('verifyRedirectToVerification', () => {
  cy.url().should('include', '/profile/verification');
});

Cypress.Commands.add('verifyRedirectToProfileAddOnFluShot', () => {
  cy.url().should('include', 'profile/add_on_flu_shot');
});

Cypress.Commands.add('verifyRedirectToProfileAddon', () => {
  cy.url().should('include', 'profile/add_on');
});

Cypress.Commands.add('verifyContinueButtonIsDisabled', () => {
  cy.get(`#submit`).should(`be.disabled`);
});

Cypress.Commands.add('verifyYesProfileAddOnIsUnselected', () => {
  cy.get(`#stat_dec_have_completed_true`).should(`not.be.selected`);
});

Cypress.Commands.add('verifyYesIsUnselected', () => {
  cy.get(`#stat_dec_other_country_resident_true`).should(`not.be.selected`);
});

Cypress.Commands.add('verifyNoIsUnselected', () => {
  cy.get(`#stat_dec_other_country_resident_false`).should(`not.be.selected`);
});

Cypress.Commands.add('clickNo', () => {
  cy.get(`#stat_dec_other_country_resident_false`).click();
});

Cypress.Commands.add('verifyNoProfileAddOnIsUnselected', () => {
  cy.get(`#stat_dec_have_completed_false`).should(`not.be.selected`);
});

Cypress.Commands.add('clickNoProfileAddOn', () => {
  cy.get(`[id*= "_false"]`).click({ force: true });
});

Cypress.Commands.add('verifyNoIsSelected', () => {
  cy.wait(500);
  cy.get(`#stat_dec_other_country_resident_false[class *="active"]`).should(
    `exist`,
  );
}); //

Cypress.Commands.add('verifyNoProfileAddOnIsSelected', () => {
  cy.wait(500);
  cy.get(`[id*= "_false"]`).parents('[class *="active"]').should(`exist`);
});

Cypress.Commands.add('clickYesProfileAddOn', () => {
  cy.get(`[id*= "_true"]`).click({ force: true });
});

Cypress.Commands.add('verifyYesProfileAddOnIsSelected', () => {
  cy.wait(500);
  cy.get(`[id*= "_true"]`).parents('[class *="active"]').should(`exist`);
});

Cypress.Commands.add('clickYesOtherCountry', () => {
  cy.get(`#stat_dec_other_country_resident_true`).click();
});

Cypress.Commands.add('clickNoOtherCountry', () => {
  cy.get(`#stat_dec_other_country_resident_false`).click();
});

Cypress.Commands.add('clickYes', () => {
  cy.get(`#stat_dec_other_country_resident_true`).click();
});

Cypress.Commands.add('verifyYesOtherCountryIsSelected', () => {
  cy.wait(500);
  cy.get(`#stat_dec_other_country_resident_true[class *="active"]`).should(
    `exist`,
  );
});

Cypress.Commands.add('verifyThereIsNoPrompted', () => {
  cy.wait(500);
  cy.get(`[class *="naked-popup-content"]`).should(`not.visible`);
});

Cypress.Commands.add('verifyContinueButtonIsEnabled', () => {
  cy.wait(500);
  cy.get(`#submit`).should(`be.enabled`);
});

Cypress.Commands.add('clickContinueButton', () => {
  cy.get(`#submit`).click();
});

Cypress.Commands.add('approvedWorkerByEmail', (email) => {
  cy.log(`Search Email: ${email}`)
    .enterEmailInToSearch(email)
    .log(`Click Search button`)
    .clickSubmitButton()
    .log(`Wait for Please wait.. is not exist`)
    .waitForTextIsNotExist(`Please Wait...`)
    .verifyHrefContainsEmailIsVisible(email)
    .log(`Click Edit`)
    .get(`[target="_self"]`)
    .contains(`Edit`)
    .click()
    .get(`#user_carer_profile_attributes_review_profile_verified`)
    .click()
    .get(`.btn#submit`)
    .click()
    .get(`.btn#submit`)
    .should(`be.visible`)
    .get(`#admin-approve`)
    .focus()
    .click();
});
Cypress.Commands.add('clickEditUser', () => {
  cy.get(`[target="_self"]`).contains(`Edit`).click();
});

Cypress.Commands.add('verifyCloseButtonIsClickable', () => {
  cy.get(`.btn`)
    .contains(`Close`)
    .should(`be.exist`)
    .focus()
    .click({ force: true });
});

Cypress.Commands.add('verifyCarerProfilePopupIsNotVisible', () => {
  cy.get(`.naked-popup-content #carer_profile_questions`).should(`not.visible`);
});

Cypress.Commands.add('verifyHrefContainsEmailIsVisible', (email) => {
  cy.get(`[href="mailto:${email}"]`).should(`be.visible`);
});

Cypress.Commands.add('clickStatDecNo', () => {
  cy.get(`#stat_dec_other_country_resident_false`).click();
});

Cypress.Commands.add('verifyOverseasResidentIsNo', () => {
  cy.get(`p`)
    .contains(`Overseas resident/citizen since 16 years:`)
    .children(`strong`)
    .contains(`NO`)
    .should(`be.visible`);
});

Cypress.Commands.add('verifyOverseasResidentIsYes', () => {
  cy.get(`p`)
    .contains(`Overseas resident/citizen since 16 years:`)
    .children(`strong`)
    .contains(`YES`)
    .should(`be.visible`);
});

Cypress.Commands.add('verifyStatDecIsNo', () => {
  cy.get(`p`)
    .contains(`Stat dec uploaded:`)
    .children(`strong`)
    .contains(`NO`)
    .should(`be.visible`);
});

Cypress.Commands.add('verifyStatDecIsYes', () => {
  cy.get(`p`)
    .contains(`Stat dec uploaded:`)
    .children(`strong`)
    .contains(`YES`)
    .should(`be.visible`);
});

Cypress.Commands.add('verifyReviewStatDecIsNotBeCheck', () => {
  cy.get(`#user_carer_profile_attributes_review_stat_dec_verified`).should(
    `not.checked`,
  );
});

Cypress.Commands.add('clickSearchForSupportWorkerFromClient', () => {
  cy.navigateByLeftMenuInDashboard('Search workers');
});

Cypress.Commands.add('clickViewSupportWorkerProfile', () => {
  cy.get(`[href*="/carer/"]`).first().click();
});

Cypress.Commands.add('verifyBlueMessageVisible', () => {
  cy.get(`.alert.alert-info`).should(`be.visible`);
});

Cypress.Commands.add('verifyBlueMessageNotVisible', () => {
  cy.get(`.alert.alert-info.medical-box`).should(`not.be.visible`);
});

Cypress.Commands.add('clickLearnMore', () => {
  cy.get(`.info-div`).contains(` Learn more... `).focus().click();
});

Cypress.Commands.add('verifyPopupVisible', () => {
  cy.get(`.popup .section-title.blue`).should(`be.visible`);
});

Cypress.Commands.add('verifyPopupNotVisible', () => {
  cy.get(`.popup .section-title.blue`).should(`not.be.visible`);
});

Cypress.Commands.add('clickClosePopup', () => {
  cy.get(`[onclick="recenterPopUp()"]`).focus().click();
});

Cypress.Commands.add('inputFullTextSearch', (text) => {
  cy.get(`#full-text-search-input`).focus().type(text);
});

Cypress.Commands.add('clickViewProfile', () => {
  cy.get(`.btn-sm`).contains(`View Profile`).first().focus()
    .click();
});

Cypress.Commands.add('clickLastViewProfile', () => {
  cy.get(`.btn-sm`).contains(`View Profile`).last().focus()
    .click();
});

Cypress.Commands.add('verifyYesIsSelected', () => {
  cy.get(`#stat_dec_other_country_resident_true.active`).should('exist');
});

Cypress.Commands.add('checkAfterOfJobAlertToggle', () => {
  cy.get('app-search-tab mat-slide-toggle input')
    .invoke('attr', 'aria-checked')
    .then((value) => expect(value).to.equal(value));
});

Cypress.Commands.add('setJobAlertToggleIsOff', () => {
  cy.get('app-search-tab mat-slide-toggle input')
    .invoke('attr', 'aria-checked')
    .then((value) => {
      if (value === true) {
        cy.clickElement(data.search.worker.jobAlertCheckBox, true)

          .log('Click "Yes" button')
          .clickElementOnText(data.search.worker.popupBtn, 'Yes')

          .log('Verify the success popup is shown')
          .verifyTextVisible('Your job alert has been removed')

          .log('Close the popup')
          .clickElementOnText(data.search.worker.popupBtn, 'Close');
      }
    });
});

Cypress.Commands.add('checkTheResultSearch', () => {
  cy.log('Check the result search')
    .get('body')
    .then(($el) => {
      let isHasJob = false;
      if ($el.find('.posted-jobs-listing__list h4').length > 0) {
        cy.verifyTextVisible('Keep looking!');
      } else {
        isHasJob = true;
        cy.clickElement(data.search.worker.itemResult, true, 0)
          .log('Check job detail page')
          .verifyElementVisible(data.search.worker.jobDetail);
      }

      new Cypress.Promise((res) => res(isHasJob));
    });
});

Cypress.Commands.add('verifyCheckboxWithStatus', (label, status) => {
  cy.log('Verify Checkbox is selected')
    .get('mat-checkbox')
    .contains(label)
    .parents('mat-checkbox')
    .find('input')
    .invoke('attr', 'aria-checked')
    .then((value) => expect(value).to.equal(status));
});

Cypress.Commands.add('checkGenderAndSelect', (gender = 'Male') => {
  cy.log(`Checking Gender:${gender} and select`)
    .get(`input#${gender}`)
    .invoke('prop', 'checked').then((isCheck) => {
      if (isCheck) {
        cy.log(`${gender} Already Checked`);
      } else {
        cy
          .clickElementOnText('[aria-labelledby="gender"] .checkbox-label', gender)
          .wait('@GET_/profiles/search');
      }
    });
});

Cypress.Commands.add('checkServiceAndSelect', (service = 'basic_nurse') => {
  cy.log(`Checking Gender:${service} and select`)
    .get(`input#${service}`)
    .invoke('prop', 'checked').then((isCheck) => {
      if (isCheck) {
        cy.log(`${service} Already Checked`);
      } else {
        cy
          .get(`input#${service}`)
          .click()
          .wait('@GET_/profiles/search');
      }
    });
});

Cypress.Commands.add('skipToResultSearchWorkers', () => {
  cy.clickElementOnText('div:not(.duplicateNav)>nav div#mainMenuSection', 'Search workers')
    .clickElementOnText('button', 'Search')
    .clickElementOnText('#workerSearchStepSkip button', 'Skip to results');
  // .verifyElementVisible('#workerSearchByLocationContainer');
});

Cypress.Commands.add('navToSearchWorkers', () => {
  cy.clickElementOnText('div:not(.duplicateNav)>nav div#mainMenuSection', 'Search workers');
});

Cypress.Commands.add('verifyAllSearchTypeOfSupport', (isMatch = false) => {
  cy.verifyListTextVisibleNoWait([
    'Step',
    'What types of support would this worker provide?',
    'Daily living, social and community activities',
    'Social support, housework, transport, meal prep and more.',
    'Personal care',
    'Showering, hoist and transfer, assistance with medication and more.',
    'Nursing',
    'Wound care, catheter care and more.',
    'Allied health',
    'Occupational therapy, physiotherapy and more.',
  ], isMatch);
});

Cypress.Commands.add('verifyWillSupportChild', (isMatch = false) => {
  cy.verifyListTextVisibleNoWait([
    'Step 1 of',
    'Will the worker support a child?',
    'Only workers who have a Working With Children Check (WWCC) can support children.',
    'Learn more about WWCC',
  ], isMatch);
});

Cypress.Commands.add('verifyDailyLivingSupport', (isMatch = false) => {
  cy.verifyListTextVisibleNoWait([
    'Show all',
    'Community activities and outings',
    'Gardening',
    'Home maintenance',
    'Housework',
  ], isMatch);
  cy.get('mat-checkbox').contains('Transport').trigger('mouseover');
  cy.verifyListTextVisibleNoWait([
    'Meal delivery',
    'Meal preparation',
    'Personal admin',
    'Shopping',
    'Social support',
    'Sports and exercise',
    'Transport',
  ], isMatch);
});

Cypress.Commands.add('verifyTotalNumberWorkerDisplay', (shortSuburt = 'Barangaroo', isMatch = false) => {
  cy.verifyListTextVisibleNoWait([
    'worker matches',
    `Are open to work in ${shortSuburt}`,
  ], isMatch);
});

Cypress.Commands.add('verifySearchByCarerTypeElements', () => {
  cy.verifyElementVisible('#workerSearchByCarerType');
});

Cypress.Commands.add('verifyNextBackButtonVisible', () => {
  cy.verifyElementContainsText('button', 'Next');
  cy.verifyElementContainsText('button', 'Back');
});

Cypress.Commands.add('verifySkipToResultsVisible', () => {
  cy.verifyElementContainsText('#workerSearchStepSkip', 'Skip to results');
});

Cypress.Commands.add('verifySearchResultsPage', () => {
  cy.verifyElementVisible('#workerSearchByLocationContainer');
});

Cypress.Commands.add('clickSkipToResults', () => {
  cy.clickElementOnText('#workerSearchStepSkip', 'Skip to results');
});

Cypress.Commands.add('searchWorkersBySuburb', (suburb = '2000') => {
  cy.get('app-suburb-selector input')
    .should('be.visible')
    .wait(1000);
  cy.get('app-suburb-selector input')
    .clear()
    .type(suburb)
    .get('.suggestions [role = "listbox"]')
    .children()
    .first()
    .click()
    .get('button')
    .contains('Search')
    .click();
});

Cypress.Commands.add('searchWorkersByOnlySuburb', (postcodeShort = '2000') => {
  cy
    .log(`Search: ${postcodeShort}`)
    .searchWorkersBySuburb(postcodeShort)

    .log('Verify "Next and Back  button are displayed"')
    .verifyNextBackButtonVisible()

    .log('Verify "Skip to results link is displayed"')
    .verifySkipToResultsVisible()
    .clickSkipToResults();
});

Cypress.Commands.add('searchWorkersBySuburbV2', (suburb = '2000', index = 0) => {
  cy.get('app-suburb-selector input')
    .clear()
    .type(suburb)
    .wait(1000)
    .get('.suggestions [role = "listbox"]')
    .children()
    .eq(index)
    .click()
    .get('button')
    .contains('Search')
    .click();
});

Cypress.Commands.add('searchWorkersByOnlySuburbV2', (postcodeShort = '2000', index = 0) => {
  cy
    .log(`Search: ${postcodeShort}`)
    .searchWorkersBySuburbV2(postcodeShort, index)

    .log('Verify "Skip to results link is displayed"')
    .verifySkipToResultsVisible()
    .clickSkipToResults();
});

Cypress.Commands.add('searchBySupportWorkerName', (searchValue) => {
  cy.clickElement('button.showAllFiltersAction')

    .clickElementByText('Search by Support Worker Name')
    .log(`Enter ${searchValue} in the textbox`)
    .inputTextField('[name="search_name"]', searchValue)
    .clickElement('#search-carer', true)
  // .wait('@GET_/profiles/search_name')
    .verifyElementContainsText('.panel.workerSearchMatchCard', searchValue)

    .log('Click "View Profile" 1 of the result list')
    .get('.panel.workerSearchMatchCard a[href]')
    .contains(searchValue)
    .first()
    .click({ force: true });
});

Cypress.Commands.add('verifyShortlistButtonIsChangedToText', (index = 0, text = 'Shortlisted') => {
  cy.get('button.shortlist span')
    .eq(index)
    .invoke('text')
    .then(($txt) => {
      expect($txt).to.contain(text);
    });
});

Cypress.Commands.add('changeToShortlist', (index = 0, text = 'Shortlisted', isForce = true) => {
  cy.getTextByIndex('button.shortlist span', index)
    .then(($txt) => {
      cy.log(`Current Status: ${$txt}`);
      if ($txt.indexOf(text) >= 0) {
        cy.get('button.shortlist')
          .eq(index)
          .click({ force: isForce });
      }
    });
});

Cypress.Commands.add('changeToRemoveShortlist', (index = 0, text = 'Shortlist', isForce = true) => {
  cy.getTextByIndex('button.shortlist span', index)
    .then(($txt) => {
      cy.log(`Current Status: ${$txt}`);
      if ($txt.indexOf(text) >= 0) {
        cy.get('button.shortlist')
          .eq(index)
          .click({ force: isForce });
      }
    });
});
