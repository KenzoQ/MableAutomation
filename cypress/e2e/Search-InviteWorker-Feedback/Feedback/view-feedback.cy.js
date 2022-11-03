import * as data from '../../../fixtures/test-data.json';

describe('View feedback', () => {
  const clientEmail = 'automation_joshua+client@donotuse.com.au';
  const clientPass = 'qaAutomation2021';

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it('ES-T1296. Check provide feedback button on my conversation page [client does not have an agreement with worker]', () => {
    const workerName = 'VICE';

    cy.log('Log as client account')
      .loginToDashboard(clientEmail, clientPass)

      .log('Click Inbox btn')
      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log(`Select conversation with support worker: ${workerName}`)
      .clickElementOnText(data.agreement.client.inboxName, workerName)

      .log('Check my conversation')
      .verifyTextVisible('Inbox')
      .verifyTextVisible(workerName)

      .log('Click the info button  on the upper right corner of my conversation panel')
      .clickElement('button[aria-label="open info panel"]')

      .log('Verify the review link is not displayed in list')
      .verifyTextNotExist(
        'Leave a review',
      );
  });

  it('ES-T1297. Check leave a review link in my conversation page [client has an existing agreement with client]', () => {
    const workerName = 'ION';

    cy.log('Log as client account')
      .loginToDashboard(clientEmail, clientPass)

      .log('Click Inbox btn')
      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log(`Select conversation with support worker: ${workerName}`)
      .clickElementOnText(data.agreement.client.inboxName, workerName)

      .log('Check my conversation')
      .verifyTextVisible('Inbox')
      .verifyTextVisible(workerName)

      .log('Click the info button  on the upper right corner of my conversation panel')
      .clickElement('button[aria-label="open info panel"]')

      .log('Verify the review link is not displayed in list')
      .verifyTextNotExist(
        'Leave a review',
      );
  });

  it('ES-T1298. Accessing review <support worker > page from my conversation page', () => {
    const workerName = 'ION';
    const workerNameLowerCase = 'Ion';

    cy.log('Log as client account')
      .loginToDashboard(clientEmail, clientPass)

      .log('Click Inbox btn')
      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log(`Select conversation with support worker: ${workerName}`)
      .clickElementOnText(data.agreement.client.inboxName, workerName)

      .log('Check my conversation')
      .verifyTextVisible('Inbox')
      .verifyTextVisible(workerName)

      .log('Click the review item in list')
      .clickElementOnText(
        'button span',
        'Leave a review',
      )

      .log('Check the review page')
      .verifyCurrentURL('/provide-feedback')
      .verifyTextVisible(`Review ${workerNameLowerCase}`);
  });

  it('ES-T1372. Access review <support worker > page from My support worker page (active tab)', () => {
    cy.log('Log as client account')
      .loginToDashboard(clientEmail, clientPass)

      .log('Click My support worker')
      .navigateByLeftMenuInDashboard('My support workers')

      .log('Click provide feedback button')
      .clickElementOnText(
        'app-support-workers-list .action button span',
        'Provide feedback',
      )

      .log('Check the review page is displayed')
      .verifyCurrentURL('/provide-feedback')
      .verifyTextVisible('Review');
  });

  it('ES-T1377. Access review support worker from My support workers page [terminated tab]', () => {
    cy.log('Log as client account')
      .loginToDashboard(clientEmail, clientPass)

      .log('Click My support worker')
      .navigateByLeftMenuInDashboard('My support workers')

      .log('Click the Terminated tab')
      .clickElementOnText('.mat-tab-label-content', 'Terminated')

      .log('Click provide feedback button')
      .clickElementOnText(
        'app-support-workers-list .action button span',
        'Provide feedback',
      )

      .log('Check the review page is displayed')
      .verifyCurrentURL('/provide-feedback')
      .verifyTextVisible('Review');
  });

  it('ES-T1380. Check support worker rating', () => {
    const workerName = 'ION';
    cy.log('Log as client account')
      .loginToDashboard(clientEmail, clientPass)

      .log('Click My support worker')
      .navigateByLeftMenuInDashboard('My support workers')

      .log('Select support worker name')
      .viewProfileWithWorkerName(workerName)

      .log('Verify the rating should be displayed in support workler')
      .verifyElementVisible(
        '#feedback app-star-rating',
      );
  });

  it(`
    1. ES-T1381. Check client feedback in support worker profile
    2. ES-T1382. Verify that client reviews should be displayed in support workers profile
    3. ES-T1384. Check the name of client in reviews section
  `, () => {
    const workerName = 'ION';

    cy.log('Log as client account')
      .loginToDashboard(clientEmail, clientPass)

      .log('Click My support worker')
      .navigateByLeftMenuInDashboard('My support workers')

      .log('Select support worker name')
      .viewProfileWithWorkerName(workerName)

      .log('Verify the rating should be displayed in support workler')
      .verifyElementVisible(
        '#feedback app-star-rating',
      )
      .verifyTextExist('Reviews')
      .verifyElementVisible(
        '.review app-star-rating',
      )

      .log('Verify the the name of client should be displayed')
      .verifyElementContainsText(
        '.review .reviewerName',
        'Joshua',
      );
  });
});
