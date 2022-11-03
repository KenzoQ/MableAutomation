/* eslint-disable camelcase */
import faker from 'faker/locale/en_AU';

describe('View Private job', () => {
  const defaultUrl = 'https://uat.containers.staging-mable.com.au/';
  const rnd = faker.random.alphaNumeric(5);
  const desEdit3 = `Automation des 3 ${rnd}`;

  beforeEach('ClearCookies', () => {
    cy
      .clearCookies()
      .clearLocalStorage()
      .visit('/');
  });

  const clientOver5SendEmail = 'automation_angelina_eznwy.private+client@donotuse.com.au';
  const clientOver5SendPass = 'qaAutomation2021';

  const newlyClientEmail = 'automation_dylan_8g32y.private+client@donotuse.com.au';
  const newlyClientPass = 'qaAutomation2021';

  const clientNoPJ2Email = 'automation_mackenzie_rkv79.private+client@donotuse.com.au';
  const clientNoPJ2Pass = 'qaAutomation2021';

  const clientOneRJNoPJ2Email = 'automation_alex_onerj_nopj+client@donotuse.com.au';
  const clientOneRJNoPJ2Pass = 'qaAutomation2021';

  const newWorkerName = 'Harlan O';

  const newWorkerName2 = 'Natsu';

  const clientName = 'Ella';
  const urlDefaultPJ = '2/private-jobs/view/10148';
  const workerNoPJ = 'Vicenta R';
  const workerActiveNoPJ = 'Mark S';

  it('ES-T1140. Verify that private jobs was displayed in Jobs page', () => {
    cy.log('Create new worker account')
      .log('Login as client')
      .loginToDashboard(clientOver5SendEmail, clientOver5SendPass)

      .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

      .url()
      .should('include', 'jobs/posted-jobs')

      .verifyElementContainsText('div.chip', 'Privately shared');
  });

  it('ES-T301. view private job details from conversation page', () => {
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

  it('ES-T1085. NO OPEN JOB: Verify that show explainer screen is visible', () => {
    cy.log('Create new worker account')
      .log('Login as client')
      .loginToDashboard(clientNoPJ2Email, clientNoPJ2Pass)

      .clickElementOnText('div', 'Shortlist')

      .url()
      .should('include', 'shortlist/consumer')

      .clickElementOnText('div', 'View profile')
      .verifyTextVisible('Contact ')
      .clickElementOnText('button', 'Contact ')

      .verifyElementVisible('app-conversation-starter')

      .verifyConversationStarter(newWorkerName);
  });

  it(`1. ES-T1086. WITH OPEN REG JOB BUT HAS NO PRIVATE JOB: Verify that explainer screen is visible'
  2. ES-T1088. WITH OPEN REG JOB BUT HAS NO PRIVATE JOB: Verify that jobs available to share is visible ( open jobs only)`, () => {
    cy.log('Create new worker account')
      .log('Login as client')
      .loginToDashboard(clientOneRJNoPJ2Email, clientOneRJNoPJ2Pass)

      .clickElementOnText('div', 'Shortlist')

      .url()
      .should('include', 'shortlist/consumer')

      .clickElementOnText('div', 'View profile')
      .verifyTextVisible('Contact ')
      .clickElementOnText('button', 'Contact ')

      .verifyElementVisible('app-conversation-starter')

      .verifyConversationStarter();
  });

  it('ES-T1089. WITH OPEN PRIVATE JOBS: Verify that show explainer screen is no longer visible', () => {
    cy.log('Create new worker account')
      .log('Login as client')
      .loginToDashboard(clientOver5SendEmail, clientOver5SendPass)

      .clickElementOnText('div', 'Shortlist')

      .url()
      .should('include', 'shortlist/consumer')

      .navTheShorlistByName('Ed')
      .verifyTextVisible('Contact ')
      .clickElementOnText('button', 'Contact ')

      .verifyElementVisible('app-inbox')
      .url()
      .should('include', 'conversation/user/')

      .verifyElementNotExist('app-sharing-tile .sharingTile')
      .verifyTextNotExist('Search for more workers');
  });

  it('ES-T1091. WITH OPEN PRIVATE JOBS: Verify that jobs available to share is visible', () => {
    cy.log('Create new worker account')
      .log('Login as client')
      .loginToDashboard(clientOver5SendEmail, clientOver5SendPass)

      .clickElementOnText('div', 'Shortlist')

      .url()
      .should('include', 'shortlist/consumer')

      .navTheShorlistByName(newWorkerName2)
      .verifyTextVisible('Contact ')
      .clickElementOnText('button', 'Contact ')

      .verifyPrivateJobChipVisible()
      .verifyTextVisible(' Privately share a new job description ');
  });

  it('ES-T1132. Verify that client should be able to modify details of step 3 of private jobs that are not yet published', () => {
    cy.log('Create new worker account')
      .log('Login as client')
      .loginToDashboard(clientOver5SendEmail, clientOver5SendPass)

      .clickElementOnText('div', 'Shortlist')

      .url()
      .should('include', 'shortlist/consumer')

      .navTheShorlistByName(newWorkerName2)
      .verifyTextVisible('Contact ')
      .clickElementOnText('button', 'Contact ')

      .verifyPrivateJobChipVisible()
      .verifyTextVisible(' Privately share a new job description ')

      .clickReviewAndEditPJButton()
      .verifyTextVisible('Job description preview')
      .verifyElementVisible('app-review-private-jobs')
      .clickEditDescribeByIndex(1)

      .enterTextForTheDescribe1Or3(desEdit3)
      .clickElementOnText('button', 'Done')
      .waitAppLoaderNotVisible()

      .verifyTextVisible(' updated')
      .verifyTextVisible(desEdit3);
  });

  it('ES-T1141. Verify that client should be able to view details of private jobs from jobs page', () => {
    cy.log('Create new worker account')
      .log('Login as client')
      .loginToDashboard(clientOver5SendEmail, clientOver5SendPass)
      .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

      .url()
      .should('include', 'jobs/posted-jobs')
      .verifyTextVisible('My jobs')
      .verifyElementContainsText('button', 'Post a job')

      .verifyTextVisible('Privately shared')
      .navToPrivateJobByIndex()
      .verifyThePrivateJobPreviewPage();
  });

  it(`1. ES-T1146. Verify that worker should be able to see private jobs in my conversation page 
  2. ES-T1147. Verify that worker should be able to view details of private jobs from my conversation page
  3. ES-T303. Check newly received private job`, () => {
    cy.log(`Log as ${newWorkerName}`)
      .searchAndLogAsFromAdmin(newWorkerName)
      .navigateByLeftMenuInDashboard('Inbox')

      .url()
      .should('include', '/inbox')

      .moveToUntilFoundName(clientName)

      .get('.channelContent .title')
      .contains(clientName)
      .trigger('mouseover')
      .click()
      .verifyElementContainsText('div.chip', 'Privately shared')
      .verifyTextVisible('View full job details')
      .clickElementOnText('button', 'View full job details')

      .verifyElementVisible('app-view-private-jobs div.privateJobChip')
      .clickElementOnText('[href*="/jobs/"]', 'Job')
      .verifyTextNotExist('Privately shared');
  });

  it('ES-T312. Private job visibility', () => {
    cy.log('Create new worker account')
      .log('Login as client')
      .loginToDashboard(clientOver5SendEmail, clientOver5SendPass)

      .forceVisit(`${defaultUrl}${urlDefaultPJ}`)
      .verifyTextVisible('Privately shared')

      .log(`Log out and Login as ${newWorkerName}`)
      .clickLogoutOnTopMenu()
      .searchAndLogAsFromAdmin(newWorkerName)
      .forceVisit(`${defaultUrl}${urlDefaultPJ}`)
      .verifyTextVisible('Privately shared')

      .log(`Log out and Login as ${workerNoPJ}`)
      .clickLogoutOnTopMenu()
      .searchAndLogAsFromAdmin(workerNoPJ)
      .forceVisit(`${defaultUrl}${urlDefaultPJ}`)
      .verifyTextNotExist('Privately shared')
      .forceVisit(`${defaultUrl}2/jobs/search/discover`)
      .waitAppLoaderNotVisible()

      .verifyTextVisible('Your profile is currently set to unavailable for work.')

      .log(`Log out and Login as ${workerActiveNoPJ}`)
      .clickLogoutOnTopMenu()
      .searchAndLogAsFromAdmin(workerActiveNoPJ)
      .forceVisit(`${defaultUrl}${urlDefaultPJ}`)
      .verifyTextNotExist('Privately shared')
      .forceVisit(`${defaultUrl}2/jobs/search/discover`)
      .waitAppLoaderNotVisible()
      .verifyTextNotExist('Privately shared');
  });
});
