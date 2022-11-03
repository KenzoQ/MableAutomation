import * as data from '../../../fixtures/test-data.json';

describe('View feedback', () => {
  const clientEmail = 'automation_joshua+client@donotuse.com.au';
  const clientPass = 'qaAutomation2021';

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it('ES-T1367. Client provides feedback to worker', () => {
    const workerName = 'Jennifer';

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

      .log('Select over all rating(5 stars)')
      .clickElement(
        data.feedback.client.start,
        true,
        4,
      )

      .log('Enter details on write your review page')
      .inputTextField(
        data.feedback.client.reviewInput,
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
      )

      .log('Tag "include my first name option"')
      .clickElementOnText(
        '.radioLabel',
        'Yes, include my first name',
      )

      .log('Click Submit btn')
      .clickElementOnText(
        '.action button',
        'Submit',
      )

      .log('Review submition form')
      .verifyElementContainsText(
        'mat-dialog-container h3',
        'Review submitted',
      )

      .log('Click close btn')
      .clickElementOnText(
        '.mat-dialog-actions button',
        'Close',
      )
      .wait(1000)
      .verifyTextVisible('Inbox');
  });

  it('ES-T1368. Check provide feedback button in My support worker page (active tab)', () => {
    cy.log('Log as client account')
      .loginToDashboard(clientEmail, clientPass)

      .log('Click My support worker')
      .navigateByLeftMenuInDashboard('My support workers')

      .log('Verify list of worker with actice agreement was displayed')
      .get('.details button:nth-child(4)')
      .each(el => {
        cy.get(el)
          .contains('Provide feedback')
          .should('exist');
      });
  });

  it('ES-T1379. Client provides feedback to worker from my support worker page [Terminated tab]', () => {
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

      .log('Check the review page')
      .verifyTextVisible('Reminder')
      .verifyTextVisible('Rate the support')

      .log('Select rating')
      .clickElement(
        data.feedback.client.start,
        true,
        3,
      )

      .log('Enter details on write your review page')
      .inputTextField(
        data.feedback.client.reviewInput,
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
      )

      .log('Tag "include my first name option"')
      .clickElementOnText(
        '.radioLabel',
        'Yes, include my first name',
      )

      .log('Click Submit btn')
      .clickElementOnText(
        '.action button',
        'Submit',
      )

      .log('Review submition form')
      .verifyElementContainsText(
        'mat-dialog-container h3',
        'Review submitted',
      )

      .log('Click close btn')
      .clickElementOnText(
        '.mat-dialog-actions button',
        'Close',
      )
      .wait(1000)
      .verifyTextVisible('My support workers');
  });

  it('ES-T1371. Check provide feedback button in my support worker page (Terminated tab)', () => {
    cy.log('Log as client account')
      .loginToDashboard(clientEmail, clientPass)

      .log('Click My support worker')
      .navigateByLeftMenuInDashboard('My support workers')

      .log('Click the Terminated tab')
      .clickElementOnText('.mat-tab-label-content', 'Terminated')

      .log('Verify list of worker with actice agreement was displayed')
      .get('.details button:nth-child(4)')
      .each(el => {
        cy.get(el)
          .contains('Provide feedback')
          .should('exist');
      });
  });

  it('ES-T1376. Client provides feedback to worker from my support worker page [active tab]', () => {
    cy.log('Log as client account')
      .loginToDashboard(clientEmail, clientPass)

      .log('Click My support worker')
      .navigateByLeftMenuInDashboard('My support workers')

      .log('Click provide feedback btn')
      .clickElementOnText(
        'app-support-workers-list .action button span',
        'Provide feedback',
      )

      .log('Check the review page')
      .verifyTextVisible('Reminder')
      .verifyTextVisible('Rate the support')

      .log('Select rating')
      .clickElement(
        data.feedback.client.start,
        true,
        3,
      )

      .log('Enter details on write your review page')
      .inputTextField(
        data.feedback.client.reviewInput,
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
      )

      .log('Tag "include my first name option"')
      .clickElementOnText(
        '.radioLabel',
        'Yes, include my first name',
      )

      .log('Click Submit btn')
      .clickElementOnText(
        '.action button',
        'Submit',
      )

      .log('Review submition form')
      .verifyElementContainsText(
        'mat-dialog-container h3',
        'Review submitted',
      )

      .log('Click close btn')
      .clickElementOnText(
        '.mat-dialog-actions button',
        'Close',
      )
      .wait(1000)
      .verifyTextVisible('My support workers');
  });
});
