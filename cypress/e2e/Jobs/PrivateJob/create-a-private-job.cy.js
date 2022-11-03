/* eslint-disable camelcase */
import faker from 'faker/locale/en_AU';

describe('Create A Private job', () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.firstName();
  const rnd = faker.random.alphaNumeric(5);
  const postcode = '2000';
  const suhurb = 'Barangaroo';
  const email = `automation_${firstName.toLowerCase()}_${rnd}.private+client@donotuse.com.au`;
  const password = 'qaAutomation2021';
  const phone = '0491570110';
  const sesText1 = 'Fuck';
  const sesText2 = 'Fuck 123';
  const sesText3 = '123 Fuck asdddddddddddffffffffffffff';

  const des1 = 'Automation des 1';
  const des2 = 'Automation des 2';
  const des3 = 'Automation des 3';

  beforeEach('ClearCookies', () => {
    cy
      .clearCookies()
      .clearLocalStorage()
      .visit('/');
  });
  const defaultClientEmail = 'automation_maria.repollo.jobmessaging+client@donotuse.com.au';
  const defaultClientPass = 'qaAutomation2021';

  const clientOver5SendEmail = 'automation_angelina_eznwy.private+client@donotuse.com.au';
  const clientOver5SendPass = 'qaAutomation2021';

  const newlyClientEmail = 'automation_dylan_8g32y.private+client@donotuse.com.au';
  const newlyClientPass = 'qaAutomation2021';

  const clientNoPJEmail = 'automation_joel_zbzal.private+client@donotuse.com.au';
  const clientNoPJPass = 'qaAutomation2021';

  const newlyClientNotPJYetEmail = 'automation_sofia_5bmpg.private+client@donotuse.com.au';
  const newlyClientNotPJYetPass = 'qaAutomation2021';

  // const workerEmail = 'automation_maria.repollo.expresspaymobile+worker@donotuse.com.au';
  // const workerPass = 'qaAutomation2021';
  const newWorkerName = 'Harlan';
  const newWorkerFullName = 'Harlan O';
  // const shortName = 'harlan';
  const profileID = '9966';
  const workerID = 16817;

  it('ES-T300. Create private job from support worker`s profile', () => {
    cy.log('Create new worker account')
      .log('Login as client')
      .loginToDashboard(defaultClientEmail, defaultClientPass)

      .clickElementOnText('div', 'Shortlist')

      .url()
      .should('include', 'shortlist/consumer')

      .clickElementOnText('div', 'View profile')
      .verifyTextVisible('Contact ')
      .clickElementOnText('button', 'Contact ')

      .url()
      .should('include', '/private-jobs/conversation-starter/')
      .verifyTextVisible('Conversation starter');
  });

  it('ES-T302. Check newly created private job in job list page', () => {
    cy
      .log('Login as client')
      .loginToDashboard(defaultClientEmail, defaultClientPass)

      .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

      .url()
      .should('include', 'jobs/posted-jobs')
      .verifyElementContainsText('button', ' Post a job ')

      .verifyTextNotExist('Privately shared');
  });

  it(`1. ES-T1092 - Verify that three questions where displayed in describe the support screen
  2. ES-T1093 - Verify that check mark should be displayed once step1 has been completed
  3. ES-T1095 - Verify that Review and Send to worker button should be displayed once step 2 has been completed
  4. ES-T1125 - Verify that once step 3 was completed, check mark should be displayed
  5. ES-T1127 - Verify that Job Description preview page will be displayed once Review and Send to support workers button was clicked
  6. ES-T1133 - Verify that Client should be able to see final explainer screen should be displayed when creating a private job
  7. ES-T1134 - Verify that Private job should be sent to the support workers,
  8. ES-T1136 - Verify that continue sharing banner was visible when private jobs was shared to less than 5 workers`, () => {
    cy.log('Precondition: Create a new client + new Private job');
    cy.signUpAClientAndApprovedByAPI(email,
      password,
      firstName,
      lastName,
      postcode,
      suhurb,
      phone);

    cy
      .log('Login as client')
      .loginToDashboard(email, password)

      .skipToResultSearchWorkers()
      .waitAppLoaderNotVisible()

      .log('On the left navigation pane click "Shortlist"')
      .clickElement('a[href="/shortlist"]')
      .verifyElementVisible('app-shortlist')

      .shortlistAWorkerIDByAPI(email, password, profileID)

      .reload()
      .verifyElementVisible('app-shortlist')

      .clickElementOnText('a.carerName', newWorkerFullName)

      .verifyCurrentURL(`/profile/worker/${workerID}`)
      .verifyTextVisible(`About ${newWorkerName}`)
      .clickElement('button#messageButton')

      .log('Verify your phone number')
      .wait(2000)
      .get('body')
      .then($body => {
        if ($body.find('app-verify-mobile-number').length > 0) {
          cy
            .inputTextField(
              'input[formcontrolname="verificationCode"]',
              '123456',
            )
            .clickElementOnText(
              'button span',
              'Submit',
            );
        }
      })

      // .enterVerificationCode()
      .verifyConversationStarter(newWorkerFullName)
      .navToDescribeTheSupport()
      .verifyDescribeTheSupport(newWorkerFullName)

    // Question 1
      .navToDescribe1()
      .verifyDescribe1()
      .enterTextForTheDescribe1Or3(des1)
      .clickElementOnText('button', 'Done')
      .verifyDescibe1Completed()

    // Question 3
      .navToDescribe3()
      .verifyDescribe3()

      .enterTextForTheDescribe1Or3(des3)
      .clickElementOnText('button', 'Done')
      .verifyDescibe3Completed()

    // Question 2 step 1

      .navToDescribe2()
      .verifyDescribe2Step1()
      .clickElementOnText('button', 'Next')

      // Question 2 step 2
      .verifyDescribe2Step2()

      .enterTextForTheDescribe1Or3(des2)
      .clickElementOnText('button', 'Done')
      .verifyDescibe2Completed()

      .clickElementOnText('button', 'Continue')

      .previewPrivateJob(des1, des2, des3)
      .waitAppLoaderNotVisible()
      .verifyTextExist('Share privately with')
      .clickSharePrivatelyWith()
      .waitAppLoaderNotVisible()
      .verifyCurrentURL('/conversation')
      .verifyElementContainsText('div.messageContent', 'I wanted to discuss a support need.')
      .waitAppLoaderNotVisible()
      .verifyElementVisible('mat-dialog-content button')
      .clickElement('mat-dialog-content button')
      .closeBeforeStartPopupIfExist()
      .verifyElementContainsText('div.chip', 'Privately shared')
      .verifyTextVisible('View full job details')
      .verifyElementVisible('app-sharing-tile .sharingTile')
      .verifyElementVisible('app-sharing-tile .sharingTile app-avatar .avatar')
      .waitAppLoaderNotVisible()
      .verifyElementContainsText('app-sharing-tile button', ' workers');
  });

  it('ES-T3318 - Check if error message "Contains sensitive language" will be displayed when the job posted contains profane words "', () => {
    cy
      .log('Login as client')
      .loginToDashboard(newlyClientNotPJYetEmail, newlyClientNotPJYetPass)

      .skipToResultSearchWorkers()
      .waitAppLoaderNotVisible()
      .verifyTextVisible('matches')

      .log('On the left navigation pane click "Shortlist"')
      .clickElement('a[href="/shortlist"]')
      .verifyElementVisible('app-shortlist')

      .shortlistAWorkerIDByAPI(newlyClientNotPJYetEmail, newlyClientNotPJYetPass, profileID)

      .reload()
      .verifyElementVisible('app-shortlist')

      .clickElementOnText('a.carerName', newWorkerFullName)

      .verifyCurrentURL(`/profile/worker/${workerID}`)
      .verifyTextVisible(`About ${newWorkerName}`)
      .clickElement('button#messageButton')

      .verifyConversationStarter(newWorkerName)
      .navToDescribeTheSupport()

    // Question 1
      .navToDescribe1()
      .verifyDescribe1()
      .enterTextForTheDescribe1Or3(sesText1)
      .clickElementOnText('button', 'Done')
      .verifyDescibe1Completed()

      // Question 3
      .navToDescribe3()
      .verifyDescribe3()

      .enterTextForTheDescribe1Or3(sesText2)
      .clickElementOnText('button', 'Done')
      .verifyDescibe3Completed()

    // Question 2 step 1

      .navToDescribe2()
      .clickElementOnText('button', 'Next')

      // Question 2 step 2
      .verifyDescribe2Step2()

      .enterTextForTheDescribe1Or3(sesText3)
      .clickElementOnText('button', 'Done')

      .clickElementOnText('button', 'Continue')
      .clickSharePrivatelyWith()
      .verifySensitivelanguageAllDesMessage();
  });

  it('ES-T1135. Verify that sharing prompt was displayed in my conversation page', () => {
    cy.log('Create new worker account')
      .log('Login as client')
      .loginToDashboard(defaultClientEmail, defaultClientPass)

      .navigateByLeftMenuInDashboard('Inbox')

      .url()
      .should('include', '/inbox')

      .moveToUntilFoundName(newWorkerName)

      .clickElementOnText('.channelContent .title', newWorkerName)
      .verifyTextExist('Privately shared')
      .verifyTextExist('View full job details')
      .verifyElementVisible('app-sharing-tile .sharingTile')
      .verifyElementVisible('app-sharing-tile .sharingTile app-avatar .avatar')
      .verifyElementContainsText('button', 'Search for more workers')
      .navigateByLeftMenuInDashboard('Dashboard');
  });

  it('ES-T1137. Verify that Continue sharing banner should not be displayed when private job was shared to more than 5 workers', () => {
    cy.log('Create new worker account')
      .log('Login as client')
      .loginToDashboard(clientOver5SendEmail, clientOver5SendPass)

      .navigateByLeftMenuInDashboard('Inbox')

      .url()
      .should('include', '/inbox')

      .get('.channelContent .title')
      .contains('Ed')
      .trigger('mouseover')
      .click()
      .verifyElementNotExist('app-sharing-tile .sharingTile')
      .verifyTextNotExist('Search for more workers')
      .verifyElementVisible('div.whatsNextContainer')
      .verifyTextVisible('Request an agreement')
      .navigateByLeftMenuInDashboard('Dashboard');
  });

  it('ES-T1138. Verify that continue sharing screen should not be displayed when last message sent to client was not a private job', () => {
    cy.log('Create new worker account')
      .log('Login as client')
      .loginToDashboard(clientNoPJEmail, clientNoPJPass)

      .navigateByLeftMenuInDashboard('Inbox')

      .url()
      .should('include', '/inbox')

      .get('.channelContent .title')
      .first()
      .click()
      .verifyElementNotExist('app-sharing-tile .sharingTile')
      .verifyTextNotExist('Search for more workers')
      .verifyTextVisible('Request an agreement')
      .navigateByLeftMenuInDashboard('Dashboard');
  });

  it('ES-T1139. Verify that client should be able to view details of private jobs in my conversation page', () => {
    cy.log('Create new worker account')
      .log('Login as client')
      .loginToDashboard(newlyClientEmail, newlyClientPass)

      .navigateByLeftMenuInDashboard('Inbox')

      .url()
      .should('include', '/inbox')

      .get('.channelContent .title')
      .first()
      .click()
      .waitAppLoaderNotVisible()
      .clickElementOnText('button', 'View full job details')
      .waitAppLoaderNotVisible()
      .verifyTextVisible('Privately shared')
      .verifyTextVisible('Cancel job')
      .verifyTextVisible('Mark job as filled');
  });
});
