describe('The spec is outdated please check TS-5446 - Share a regular job', () => {
  const cocoClientEmail = 'automation_coco.regularjob+client@donotuse.com.au';
  const clientPass = 'qaAutomation2021';
  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  // Outdated
  it(`1. ES-T3883. Share a regular job in a conversation
  2. ES-T3884. View regular job details page from the conversation`, () => {
    cy
      .log('Login as client')
      .loginToDashboard(cocoClientEmail, clientPass)

      .log('Click "Post a job" on the left navigation')
      .navigateByLeftMenuInDashboard('Inbox')

      .log('Verify My conversations')
      .verifyElementVisible('app-inbox')

      .log('Click first worker inbox')
      .get('app-channel-item .title')
      .first()
      .click()

      .log('Verify App messages')
      .verifyElementVisible('app-messages')

      .log('Verify kebab menu')
      .clickElement('div#headerAction [name="more-vertical"]')
      .clickElementOnText('#convoMatMenu button', 'Attach job description')

      .verifyElementVisible('app-public-job-tile .panel')

      .clickElementOnText('app-public-job-tile .panel button', 'Send to')

      .verifyElementVisible('.messageContent')
      .get('.messageContent')
      .last()
      .contains('Posted to local workers')
      .should('be.visible')

      .get('.messageContent')
      .last()
      .contains('View full job details')
      .click({ force: true })

      .verifyElementVisible('app-view-job .jobDetailsContainer');
  });
});
