import * as data from '../../../fixtures/test-data.json';

describe('View feedback', () => {
  const clientEmail = 'automation_joshua+client@donotuse.com.au';
  const clientPass = 'qaAutomation2021';

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it('ES-T1299. Client cancels provide feedback transaction', () => {
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

      .log('Click the three dot of conversation')
      .clickElement(data.message.actionMenu)

      .log('Select Leave a review from the items displayed')
      .clickElementOnText(
        'span',
        'Leave a review',
      )
      .verifyTextExist('Review Ion')

      .log('Click Cancel btn')
      .clickElementOnText(
        '.action button',
        'Cancel',
      )
      .verifyTextVisible('Inbox');
  });

  it('ES-T1375. Client cancels provide feedback transaction (from my support worker page)', () => {
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
      .verifyTextVisible('Review')

      .log('Click Cancel btn')
      .clickElementOnText(
        '.action button',
        'Cancel',
      )
      .verifyTextVisible('My support workers');
  });

  it('ES-T1378. Client cancels provide feedback transaction [terminated tab]', () => {
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
      .verifyTextVisible('Review')

      .log('Click Cancel btn')
      .clickElementOnText(
        '.action button',
        'Cancel',
      )
      .verifyTextVisible('My support workers');
  });
});
