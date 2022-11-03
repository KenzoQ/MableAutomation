import * as data from '../../fixtures/test-data.json';

Cypress.Commands.add('verifyConversationStarter', (name = null) => {
  if (name !== undefined && name !== null) {
    cy.verifyTextVisible(name);
  }
  cy.verifyTextVisible('Conversation starter')
    .verifyTextVisible('Start the conversation with')
    .verifyTextVisible('How it works')
    .verifyTextVisible('the support you are seeking')
    .verifyTextVisible('It will be privately')
    .verifyTextVisible('You can share it with other workers later if you choose to');
});

Cypress.Commands.add('navToDescribeTheSupport', () => {
  cy.clickElementOnText('button', 'Describe the support');
});

Cypress.Commands.add('verifyDescribeTheSupport', (name = null) => {
  if (name !== undefined && name !== null) {
    cy.verifyTextVisible(`You’ll get a chance to say hi to ${name} later, start by just describing the support.`);
  } else {
    cy.verifyTextVisible('You’ll get a chance to say hi to ')
      .verifyTextVisible('later, start by just describing the support.');
  }
  cy
    .verifyTextVisible('About you (optional)')
    .verifyTextVisible('What, when & where')
    .verifyTextVisible('Worker preferences (optional)');
});

Cypress.Commands.add('navToDescribe1', () => {
  cy.clickElementOnText('[class="stepItem"]', 'About you');
});

Cypress.Commands.add('navToDescribe2', () => {
  cy.clickElementOnText('[class="stepItem"]', 'What, when & where');
});

Cypress.Commands.add('navToDescribe3', () => {
  cy.clickElementOnText('[class="stepItem"]', 'Worker preferences');
});

Cypress.Commands.add('verifyDescribe1', () => {
  cy
    .verifyTextVisible('Tell us about yourself')
    .verifyTextVisible(' personality, interests or medical information')
    .verifyElementVisible('textarea[placeholder="I am..."]')
    .verifyElementContainsText('button', 'Done');
});

Cypress.Commands.add('verifyDescribe2Step1', () => {
  cy
    .verifyTextVisible('Step 1 of 2')
    .verifyTextVisible('When and where will the job take place?')
    .verifyElementContainsText('.required', 'Starting suburb')
    .verifyElementVisible('app-suburb-selector input')
    .verifyElementContainsText('.required', 'Frequency')
    .verifyElementContainsText('.radioLabel', 'Ongoing, after trial period')
    .verifyElementContainsText('.radioLabel', 'Once off')
    .verifyElementContainsText('.required', 'Scheduling')
    .verifyElementContainsText('.radioLabel', 'I\'m flexible')
    .verifyElementContainsText('.radioLabel', 'I have preferred days and times')
    .verifyElementContainsText('.required', 'Estimated hours per week ')
    .verifyElementContainsText('.radioLabel', '1-5')
    .verifyElementContainsText('.radioLabel', '5-10')
    .verifyElementContainsText('.radioLabel', '10-20')
    .verifyElementContainsText('.radioLabel', '20+')
    .verifyElementContainsText('button', 'Next');
});

Cypress.Commands.add('verifyDescribe2Step2', () => {
  const quaReq = 'Qualification required';
  cy
    .verifyTextVisible('Step 2 of 2')
    .verifyTextVisible('Describe the support activities')
    .verifyElementContainsText('.required', 'What will the support person do?')
    .verifyElementVisible('textarea[formcontrolname="job_description"]')
    .verifyTextVisible('Services (optional)')
    .verifyElementContainsTextList('.mat-checkbox-label',
      'Companionship and social support',
      'Community participation, sports and activities',
      'Meal delivery, preparation and shopping',
      'Light housework')
    .verifyElementContainsMultipleText('.mat-checkbox-label',
      'Provide transport', 'Driver\'s license required')
    .verifyElementContainsMultipleText('.mat-checkbox-label',
      'Showering, toileting and dressing ', quaReq)
    .verifyElementContainsMultipleText('.mat-checkbox-label',
      'Manual transfer & mobility ', quaReq)
    .verifyElementContainsMultipleText('.mat-checkbox-label',
      'Assist with medication ', quaReq)
    .verifyElementContainsMultipleText('.mat-checkbox-label',
      'Nursing services ', quaReq)
    .verifyElementContainsMultipleText('.mat-checkbox-label',
      'Allied health services ', quaReq)
    .verifyElementContainsText('button', 'Done');
});

Cypress.Commands.add('verifyDescribe3', (name = null) => {
  if (name !== undefined && name !== null) {
    cy.verifyTextVisible(`Help ${name} understand if they are a good match.`);
  } else {
    cy.verifyTextVisible('Help')
      .verifyTextVisible('understand if they are a good match.');
  }
  cy
    .verifyTextVisible(' What qualities are you looking for in a support person?')
    .verifyTextVisible('The description may include personality, skills, experience, age, language, etc.')
    .verifyElementVisible('textarea[formcontrolname]')
    .verifyElementContainsText('button', 'Done');
});

Cypress.Commands.add('enterTextForTheDescribe1Or3', (text) => {
  cy.verifyElementVisible('textarea[formcontrolname]');
  cy.inputTextField('textarea[formcontrolname]', text);
});

Cypress.Commands.add('verifyDescibe1Completed', () => {
  cy.verifyElementVisible('svg[aria-label="Step 1 - completed"]');
});

Cypress.Commands.add('verifyDescibe2Completed', () => {
  cy.verifyElementVisible('svg[aria-label="Step 2 - completed"]');
});

Cypress.Commands.add('verifyDescibe3Completed', () => {
  cy.verifyElementVisible('svg[aria-label="Step 3 - completed"]');
});

Cypress.Commands.add('previewPrivateJob', (contentDes1, contentDes2, contentDes3) => {
  const desEle = 'div.description';
  cy.verifyTextVisible('Job description preview')
    .verifyElementContainsText('div.privateJobChip', 'Privately shared')
    .verifyElementContainsText('button.primary', 'Share privately with')
    .verifyElementVisible('div.participant')
    .verifyElementVisible('div.jobServices');
  cy.get(desEle).find('button.editDescription').should('have.length', 3);
  cy.get(desEle).should('contain', 'About me')
    .and('contain', contentDes1)
    .and('contain', 'Edit');
  cy.get(desEle).should('contain', 'I’m looking for')
    .and('contain', contentDes2)
    .and('contain', 'Edit');
  cy.get(desEle).should('contain', 'Supporting with')
    .and('contain', contentDes3)
    .and('contain', 'Edit');
});

Cypress.Commands.add('clickSharePrivatelyWith', () => {
  cy.clickElementOnText('button.primary', 'Share privately with');
});

Cypress.Commands.add('verifyFinalPrivateJob', () => {
  cy
    .verifyElementContainsText('div.messageContent', 'I wanted to discuss a support need.')
    .verifyElementContainsText('div.chip', 'Privately shared')
    .verifyTextVisible('View full job details')
    .verifyElementVisible('app-sharing-tile .sharingTile')
    .verifyElementVisible('app-sharing-tile .sharingTile app-avatar .avatar')
    .verifyElementContainsText('button', 'Search for more workers');
});

Cypress.Commands.add('navToFirstSupportWorker', () => {
  cy
    .skipToResultSearchWorkers()

    .get('div.panel.workerSearchMatchCard div.name').first().click()

    .verifyCurrentURL('/profile/worker/')
    .verifyTextVisible('About')
    .clickElement('button#messageButton');
});

Cypress.Commands.add('verifyPrivateJobThatAlreadyExist', () => {
  cy.verifyTextVisible('Conversation starter')
    .verifyTextVisible('Start the conversation with information that helps')
    .verifyElementContainsText('div.chip', 'Privately shared')
    .verifyElementContainsText('button', 'Review / Edit')
    .verifyElementContainsText('button', 'Send to ')
    .verifyElementContainsText('button', ' Privately share a new job description');
});

Cypress.Commands.add('verifySensitivelanguageAllDesMessage', () => {
  cy.verifyTextVisible('description contains sensitive language')
    .verifyTextVisible('I’m looking for contains sensitive language')
    .verifyTextVisible('About me contains sensitive language');
});

Cypress.Commands.add('navTheShorlistByName', (name, isForce = false) => {
  cy.get('a.carerName').contains(name).click({ force: isForce });
});

Cypress.Commands.add('navToTheInboxByName', (name, isForce = false) => {
  cy.get('.channelContent .title').contains(name).click({ force: isForce });
});

Cypress.Commands.add('verifyPrivateJobChipVisible', () => {
  cy.get('div.privateJobChip').contains('Privately shared').should('be.visible');
});

Cypress.Commands.add('clickEditDescribeByIndex', (index = 0, isForce = false) => {
  cy.get('button.editDescription span').eq(index).click({ force: isForce });
});

Cypress.Commands.add('clickReviewAndEditPJButton', (isForce = false) => {
  cy.get('app-private-job-tile button').contains('Review / Edit').click({ force: isForce });
});

Cypress.Commands.add('clickSendPJButton', (isForce = false) => {
  cy.get('app-private-job-tile button').contains('Send ').click({ force: isForce });
});

Cypress.Commands.add('navToPrivateJobByIndex', (index = 0, isForce = false) => {
  cy.get('[href*="/private-jobs/view/"]').eq(index).click({ force: isForce });
});

Cypress.Commands.add('verifyThePrivateJobPreviewPage', () => {
  cy.get('app-view-private-jobs div.chip').should('be.visible');
});

Cypress.Commands.add('searchAndLogAsFromAdmin', (name, isForce = false) => {
  cy
    .log('Login as admin')
    .loginAPI(data.dashboardAccount.adminAccount.email,
      data.dashboardAccount.adminAccount.password)
    .visit('/dashboard')
    .waitAppLoaderNotVisible()
    .inputTextField('#search-users-input', name)

    .clickElement('#submit')
    .wait(2000)
    .get('[href*="/login_as/"]')
    .first()
    .click({ force: isForce })
    .wait(1000)
    .closeCovidPopup()
    .verifyTextVisible(name);
});

Cypress.Commands.add('navToTheWorkerFound', (index = 0, isForce = false) => {
  cy
    .get('div.panel.workerSearchMatchCard div.name a').eq(index).should('be.visible').click({ force: isForce });
});

Cypress.Commands.add('clickTheReasonPJByIndex', (index = 0, isForce = false) => {
  cy
    .get('span.radioLabel').eq(index).should('be.visible').click({ force: isForce });
});

Cypress.Commands.add('moveToThePJInboxByClient', (name) => {
  cy
    .get(`app-avatar[title*=${name}]`).trigger('mouseenter')
    .get(`app-avatar[title*=${name}]`).click;
});

Cypress.Commands.add('fillAndVerifyPJWithTheReason', (index = 0) => {
  cy
    .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

    .url()
    .should('include', 'jobs/posted-jobs')
    .verifyTextVisible('My jobs')
    .verifyElementContainsText('button', 'Post a job')

    .verifyTextVisible('Privately shared')
    .navToPrivateJobByIndex()
    .verifyThePrivateJobPreviewPage()

    .clickElementOnText('button', 'job as filled')
    .verifyTextVisible('How did you fill it')
    .verifyTextVisible('Mark filled')
    .clickTheReasonPJByIndex(index)

    .clickElementOnText('div.action button', 'Mark filled')

    .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

    .url()
    .should('include', 'jobs/posted-jobs')
    .verifyTextVisible('My jobs')
    .verifyElementContainsMultipleText('div.details', 'Filled', 'Privately shared');
});

Cypress.Commands.add('cancelAndVerifyPJWithTheReason', (index = 0) => {
  cy
    .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

    .url()
    .should('include', 'jobs/posted-jobs')
    .verifyTextVisible('My jobs')
    .verifyElementContainsText('button', 'Post a job')

    .verifyTextVisible('Privately shared')
    .navToPrivateJobByIndex()
    .verifyThePrivateJobPreviewPage()

    .clickElementOnText('button', 'Cancel job')
    .verifyTextVisible('Why are you cancelling it?')

    .clickTheReasonPJByIndex(index)
    .clickElementOnText('div.action button', 'Cancel Job')

    .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

    .url()
    .should('include', 'jobs/posted-jobs')
    .verifyTextVisible('My jobs')
    .clickElementOnText('div.mat-tab-label-content', 'Archive')
    .verifyElementContainsMultipleText('div.details', 'Cancelled', 'Privately shared');
});

Cypress.Commands.add('selectAPrivateJob', (status = 'Filled', index = 0) => {
  cy.get('app-client-private-job .chip')
    .contains(status)
    .eq(index)
    .parents('div.details')
    .contains('View details')
    .click();
});

Cypress.Commands.add('archiveAPrivateJob', (status = 'Filled', index = 0) => {
  cy.get('app-client-private-job .chip')
    .contains(status)
    .eq(index)
    .parents('div.details')
    .contains('Archive')
    .click();
});
