/* eslint-disable camelcase */
import faker from 'faker/locale/en_AU';

describe('Archive private job', () => {
  beforeEach('ClearCookies', () => {
    cy
      .clearCookies()
      .clearLocalStorage()
      .visit('/');
  });

  const firstName = faker.name.firstName();
  const lastName = faker.name.firstName();
  const rnd = faker.random.alphaNumeric(5);
  const postcode = '2000';
  const suhurb = 'Barangaroo';
  const email = `automation_${firstName.toLowerCase()}_${rnd}.private+client@donotuse.com.au`;
  const password = 'qaAutomation2021';
  const phone = '0491570110';

  const workerIDList = [9452, 22122, 21409, 21677, 21676];

  it('ES-T4738. Archived filled private job', () => {
    cy.signUpAClientAndApprovedByAPI(email,
      password,
      firstName,
      lastName,
      postcode,
      suhurb,
      phone);
    cy.createPJOnlyDes2ByAPI(email,
      password,
      'private conversation',
      'Barangaroo NSW 2000',
      34160,
      workerIDList[0]).then(($res) => {
      cy.fillAPrivateJob(email, password, $res.body.data.id);
    });
    cy
      .log(`Login as client ${email}`)
      .loginToDashboard(email, password)

      .navigateByLeftMenuInDashboard('Job')

      .url()
      .should('include', '/jobs/posted-jobs')

      .selectAPrivateJob('Filled')
      .verifyElementVisible('app-view-private-jobs')
      .clickElementOnText('button>span', 'Back to jobs')
      .verifyElementVisible('app-current-jobs')
      .archiveAPrivateJob('Filled')
      .verifyTextVisible('Job archived successfully');
  });

  // Need to run the ES-T4739 first
  it('ES-T4739. Check newly archived private job', () => {
    cy
      .log(`Login as client ${email}`)
      .loginToDashboard(email, password)

      .navigateByLeftMenuInDashboard('Job')

      .url()
      .should('include', '/jobs/posted-jobs')

      .clickElementOnText('div.mat-tab-label-content', 'Archive')
      .verifyElementVisible('app-archive-jobs.ng-star-inserted')

      .selectAPrivateJob('Archived')
      .verifyElementVisible('app-view-private-jobs')
      .clickElementOnText('button>span', 'Back to jobs')
      .verifyElementVisible('app-my-jobs');
  });
});
