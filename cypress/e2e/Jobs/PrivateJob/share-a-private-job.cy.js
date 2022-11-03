describe('Share A Private job', () => {
  beforeEach('ClearCookies', () => {
    cy
      .clearCookies()
      .clearLocalStorage()
      .visit('/');
  });
  const defaultClientEmail = 'automation.kris.bernal.searchworker+client@donotuse.com.au';
  const defaultClientPass = 'qaAutomation2021';

  const newlyClientEmail = 'automation_chelsea_hbph5.private+client@donotuse.com.au';
  const newlyClientPass = 'qaAutomation2021';

  const defaultWorkerName = 'Kathryn';
  const newWorkerName = 'Rodrick';
  const newWorkerName2 = 'Matt';

  it('ES-T3854. Client should be able to share a recently created private job via kebab menu', () => {
    cy
      .log('Login as client')
      .loginToDashboard(newlyClientEmail, newlyClientPass)

      .navigateByLeftMenuInDashboard('Inbox')

      .url()
      .should('include', '/inbox')

      .navToTheInboxByName(newWorkerName2)
      .verifyElementVisible('app-inbox')
      .clickElement('button[aria-label*="add message menu"]')
      .verifyTextVisible('Attach job description')
      .clickElementOnText('[id*="mat-menu-panel"] button', 'Attach job description')
      .clickSendPJButton()
      .wait(2000)
      .clickElementOnText('button', 'View full job details')
      .verifyElementContainsText('div.chip', 'Privately shared');
  });

  it('ES-T1777. Client shared a private job - banner should be displayed and continue sharing banner should also displayed', () => {
    cy
      .log('Login as client')
      .loginToDashboard(newlyClientEmail, newlyClientPass)

      .navigateByLeftMenuInDashboard('Inbox')

      .url()
      .should('include', '/inbox')

      .navToTheInboxByName(newWorkerName)
      .verifyElementVisible('div#supportDescriptionBanner')
      .verifyElementVisible('app-sharing-tile .sharingTile app-avatar .avatar')
      .verifyElementContainsText('button', 'Search for more workers')

      .navigateByLeftMenuInDashboard('Dashboard')
  });

  it('ES-T1747. Client shared a private job to client after posting a regular job -BANNER WILL NOT BE DISPLAYED', () => {
    cy.log('Create new worker account')
      .log('Login as client')
      .loginToDashboard(defaultClientEmail, defaultClientPass)

      .navigateByLeftMenuInDashboard('Inbox')

      .url()
      .should('include', '/inbox')

      .navToTheInboxByName(defaultWorkerName)
      .moveToThePJInboxByClient('Kenzie')
      .verifyElementNotExist('div#supportDescriptionBanner')
      .navigateByLeftMenuInDashboard('Dashboard');
  });
});
