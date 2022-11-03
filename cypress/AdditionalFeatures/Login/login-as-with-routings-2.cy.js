import * as testData from '../../../fixtures/test-data.json';

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/')
      .byPassAuthen();
  });

  it('ES-T3536: Login as org admin then client with routings', () => {
    const orgAdmEmail = testData.loginWithRouting.sabrinaOrgAdmin.email;
    const orgAdmPassword = testData.loginWithRouting.sabrinaOrgAdmin.password;

    cy.log('Login as org admin')
      .loginToDashboard(orgAdmEmail, orgAdmPassword)

      .log('Check dashboard page')
      .url()
      .should('include', '/dashboard')

      .log('On dashboard page, click View Support hours/Support hours link of the selected client')
      .get('h3.bold')
      .contains('Sonny Hackett')
      .parents('.header')
      .find('button span')
      .contains('Support hours')
      .click()

      .log('Check client\'s Support hours page.')
      .verifyTextVisible('Support hours')

      .log('On the upper right corner of the page, click "Login as Organsation".')
      .clickLoginAsOrganisation()

      .log('On dashboard page, click View Messages/Messages link of the selected client')
      .get('h3.bold')
      .contains('Sonny Hackett')
      .parents('.header')
      .find('button span')
      .contains('Support hours')
      .click()

      .log('On the upper right corner of the page, click "Login as Organsation".')
      .clickLoginAsOrganisation()

      .log('On dashboard page, click \'Login as <Client Name>\' button of the selected client')
      .clickElementOnText('app-coordinator-clients-summary button', 'Login as Sonny Hackett')

      .log('Check client\'s Dashboard page.')
      .url()
      .should('include', '/dashboard/consumer')

      .log('On the dashboard click "Search & message workers"')
      .clickElementOnText('app-consumer-dashboard span', 'Search & message workers')

      .log('Check Search workers page')
      .verifyTextVisible('Search workers')

      .log('On the left navigation pane, click "Dashboard"')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('On the dashboard click "Post a job"')
      .clickElementOnText('app-consumer-dashboard span', 'Post a job')

      .log('Check job types page.')
      .verifyTextVisible('Choose job type')

      .log('On the page, click  \'Learn more about job types ')
      .clickElementOnText('app-expansion-panel h3', 'Learn more about job types')

      .log('On the page, click  \'Learn more about job types ')
      .clickElementOnText('app-expansion-panel h3', 'Learn more about job types')

      .log('On the Job Type page, click  \'Post standard job\'')
      .clickElementOnText('app-triage button span', 'Post standard job')

      .log('Check Post A Job page.')
      .verifyTextVisible('Post a job')

      .log('On the upper part of Post A Job page, click \'< Back\'')
      .clickElementOnText('app-post-job-granular-availability button span', 'Back')

      .log('On the Job Type page, click  \'Last Minute job\'')
      .wait(1000)
      .clickElementOnText('app-triage button span', 'Last Minute job')

      .log('Check How it works page.')
      .verifyTextVisible('How Last Minute jobs work')

      .log('Click Create a Last Minute job button')
      .clickElementOnText('app-how-it-works button span', 'Create a Last Minute job')

      .log('Check Create a last minute job page.')
      .verifyTextVisible('Post a job')
      .verifyTextVisible('Create a Last Minute job')

      .log('On the lower part of the page, click \'Cancel\'')
      .clickElementOnText('app-post-last-minutes-jobs button', 'Cancel')

      .log('On the left top corner of the page, click \'Account\'')
      .clickElementOnText('p span', 'Account')

      .log('Check Client Account page.')
      .verifyTextVisible('personal details')

      .log('On the left upper corner of the page, click\'< Back to dashboard\'')
      .clickElementOnText('app-consumer-account-navigation button span', 'Back to dashboard')

      .log('On the left top corner of the page, click \'Search Workers\'')
      .navigateByLeftMenuInDashboard('Search workers')

      .log('Check \'Search Workers\' page.')
      .verifyTextVisible('Search workers')

      .log('On the left navigation pane, click \'Jobs\'')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Check Current posted-job page.')
      .verifyTextVisible('My jobs')

      .log('On the upper menu tab of the page, click \'Archive\'')
      .clickElementOnText('.mat-tab-label-content', 'Archive')

      .log('Check Archive posted-job page.')
      .verifyElementVisible('app-archive-jobs')

      .log('On the upper menu tab of the page, click \'Current\'')
      .clickElementOnText('.mat-tab-label-content', 'Current')

      .log('On the upper right of the page, click \'Post a job\'')
      .clickElementOnText('app-my-jobs button', 'Post a job')

      .log('On the Job Type page, click  \'Post standard job\'')
      .clickElementOnText('app-triage button span', 'Post standard job')

      .log('Check Post A Job page.')
      .verifyTextVisible('Post a job')

      .log('On the upper part of Post A Job page, click \'< Back\'')
      .clickElementOnText('app-post-job-granular-availability button span', 'Back')

      .log('On the Job Type page, click  \'Last Minute job\'')
      .wait(1000)
      .clickElementOnText('app-triage button span', 'Last Minute job')

      .log('Check How it works page.')
      .verifyTextVisible('How Last Minute jobs work')

      .log('on the left navigation pane, click Support hours')
      .navigateByLeftMenuInDashboard('Support hours')

      .log('Check client\'s Support hours page.')
      .url()
      .should('include', '/timesheet/consumer')
      .verifyTextVisible('Support hours')

      .log('On shift to approve area, click "Details"')
      .get('app-approve-session-tab button')
      .contains('Details')
      .eq(0)
      .click()

      .log('On the modal pop up, click "View agreement"')
      .wait(1000)
      .clickElementOnText('mat-dialog-content button a', 'View agreement')

      .log('On the left navigation pane, click "Inbox"')
      .navigateByLeftMenuInDashboard('Inbox')

      .log('Check inbox page')
      .verifyTextVisible('Inbox')

      .log('Choose conversation with the worker then click conversation card')
      .clickElementOnText('app-channel-item', 'Jacquline D')

      .log('Check conversation page')
      .verifyTextVisible('Chat info')

      .log('On the upper part conversation page, click \'View profile\'')
      .clickViewProfileInChatInfo()
      .verifyTextVisible('About')

      .log('On worker profile page, click "Back" button')
      .clickElementOnText('button span', 'Back')

      .log('On the left navigation pane, click \'My support workers\'')
      .navigateByLeftMenuInDashboard('My support workers')

      .log('On the current page, click Send message of the selected worker')
      .get('h2.workerName')
      .contains('Jacquline Dare')
      .parents('.details')
      .find('button span')
      .contains('Send message')
      .click()
      .verifyTextVisible('Inbox')

      .log('On upper part of the page, click \'< Back\'')
      .go('back')

      .log('On the current page, click View profile of the selected worker')
      .get('h2.workerName')
      .contains('Jacquline Dare')
      .parents('.details')
      .find('button span')
      .contains('View profile')
      .click()
      .verifyTextVisible('About Jacquline D')

      .log('On the upper left of the worker profile page, click "<  Back"')
      .clickElementOnText('app-carer-profile button span', 'Back')

      .log('On the current page, click Provide feedback of the selected worker')
      .get('h2.workerName')
      .contains('Jacquline Dare')
      .parents('.details')
      .find('button span')
      .contains('Provide feedback')
      .click()

      .log('Check Review page.')
      .verifyTextVisible('Review Jacquline')

      .log('On upper part of the page, click \'< Back\'')
      .clickElementOnText('app-provide-feedback button span', 'Back')

      .log('On agreement list page, click "Terminated" tab')
      .clickElementOnText('.mat-tab-label-content', 'Terminated')

      .log('Check terminated agreement page')
      .verifyTextVisible('You don\'t have any terminated support workers.')

      .log('On the upper menu tab of the client\'s Active support workers page, click \'Active\'')
      .wait(2000)
      .clickElementOnText('.mat-tab-label-content', 'Active')

      .log('On the left navigation pane, click \'Invite workers\'')
      .navigateByLeftMenuInDashboard('Invite workers')

      .log('Check Invite Carer page.')
      .url()
      .should('include', '/invite/add')
      .verifyTextVisible('Enter the details of someone you’d like to invite to your team')

      .log('On the Invite Carer page upper part, click\'< Back')
      .clickElementOnText('app-invite-carer button span', 'Back')

      .log('On the left navigation pane click "Shortlist"')
      .navigateByLeftMenuInDashboard('Shortlist')

      .log('Check shortlist page')
      .verifyTextVisible('Shortlist')

      .log('On the page, click Send message of the selected worker')
      .get('h3')
      .contains('Toi S')
      .parents('.shortlistDetail')
      .find('a div')
      .contains('Send message')

      .log('Check Conversation starter page.')
      .verifyTextVisible('Inbox')

      .log('On the left navigation pane click "Shortlist"')
      .navigateByLeftMenuInDashboard('Shortlist')

      .log('On the page, click Send message of the selected worker')
      .get('h3')
      .contains('Toi S')
      .parents('.shortlistDetail')
      .find('a div')
      .contains('View profile')
      .click()
      .verifyTextVisible('About Toi S')

      .log('On the left navigation pane, click \'Billing\'')
      .navigateByLeftMenuInDashboard('Billing')
      .verifyTextVisible('Billing')

      .log('Check invoices and receipts page')
      .verifyTextVisible('Date')
      .verifyTextVisible('Invoice Number')
      .verifyTextVisible('Collection Status')
      .verifyTextVisible('Payment Status')
      .verifyTextVisible('Total')
      .verifyTextVisible('View')
      .verifyElementVisible('app-billing table tbody tr')

      .log('click "Transaction" tab')
      .clickElementOnText('.mat-tab-label-content', 'Transactions')

      .log('Check transactions page')
      .verifyTextVisible('Date')
      .verifyTextVisible('Description')
      .verifyTextVisible('Debit')
      .verifyTextVisible('Credit')
      .verifyElementVisible('app-billing table tbody tr')

      .log('Click "Exports" tab')
      .clickElementOnText('.mat-tab-label-content', 'Exports')

      .log('Check exports page')
      .verifyTextVisible('Export your support hours in CSV format')
      .verifyTextVisible('Export your transaction history in CSV format')

      .log('On the upper menu tab of the current page, click \'Invoices & Receipts\'')
      .clickElementOnText('.mat-tab-label-content', 'Invoices & Receipts')

      .log('On the left navigation pane, click "Notes"')
      .navigateByLeftMenuInDashboard('Notes')

      .log('Check Support notes page')
      .verifyTextVisible('Support notes')
      .verifyElementVisible('app-shift-notes table tbody tr')

      .log('On the upper right corner of the page click "Login as Organisation"')
      .clickElementOnText('app-header button', 'Login as Organisation')

      .log('On the top right corner of the page click "Logout"')
      .clickLogoutOnTopMenu()
      .url()
      .should('include', '/login');
  });

  it('ES-T3539: Login as org admin then coordinator with routings', () => {
    // has bug. will update soon
    const orgAdmEmail = testData.loginWithRouting.sabrinaOrgAdmin.email;
    const orgAdmPassword = testData.loginWithRouting.sabrinaOrgAdmin.password;

    cy.log('Login as org admin')
      .loginToDashboard(orgAdmEmail, orgAdmPassword)

      .log('Check dashboard page')
      .url()
      .should('include', '/dashboard')

      .log('On dashboard page, click \'Login as <Name>\' of the selected coordinator')
      .clickElementOnText('app-organisation-dashboard button', 'Login as Charmaine Cotton')

      .log('Check coordinator\'s dashboard.')
      .verifyTextVisible('Welcome, Charmaine Cotton')

      .log('On the upper right of the current page, click Add client')
      .clickElementOnText('app-coordinators-dashboard button', ' Add client ')

      .log('Check Add Client page.')
      .verifyTextVisible('Client details')

      .log('On the lower part of the page, click Cancel')
      .clickElementOnText('.formButtons button', 'Cancel')

      .log('On the Dashboard page, click "View messages"/"Messages" of the selected client')
      .get('h3.bold')
      .contains('Sonny Hackett')
      .parents('.header')
      .find('button span')
      .contains('View messages')
      .click()

      .log('Check client\'s inbox page.')
      .verifyTextVisible('Sonny Hackett\'s inbox')

      .log('Choose conversation with the worker then click conversation card')
      .clickElementOnText('app-channel-item', 'Jacquline D')

      .log('Check conversation page')
      .verifyTextVisible('Chat info')

    // .log('On the upper part conversation page, click \'View profile\'')
    // .clickViewProfileInChatInfo()
    // .verifyTextVisible('About')

    // .log('On worker profile page, click "Back" button')
    // .clickElementOnText('button span', 'Back')

      .log('Check client\'s all agreements page')
      .click('mat-tab-link-container a', 'Agreements')

      .log('Check client\'s all agreements page')
      .verifyTextVisible('Sonny Hackett\'s aggrements')

      .log('On the current page, click View agreement of the selected worker')
      .get('h3.semiBold')
      .contains('Jacquline Dare')
      .parents('.panel.agreementDetail')
      .find('View agreement')
      .click()

      .log('Check agreement details')
      .verifyTextVisible('Agreement with Jacquline Dare')

      .log('On the current page, click \'< Back to all agreements')
      .clickElementOnText('app-coordinator-view-agreement button span', ' Back to all agreements')

      .log('On the current page, click Send message of the selected worker')
      .get('h3.semiBold')
      .contains('Jacquline Dare')
      .parents('.panel.agreementDetail')
      .find('Send message')
      .click()

      .log('On the left top corner of the page click avatar or profile picture')
      .clickElement('#profileCardAvatar')

      .log('Check coordinator\'s Account Settings page.')
      .verifyTextVisible('Account Settings')

      .log('On the left navigation pane, click "Dashboard"')
      .navigateByLeftMenuInDashboard('Dashboard')
      .url()
      .should('include', '/dashboard')

      .log('On the left navigation pane click "Search workers"')
      .navigateByLeftMenuInDashboard('Search workers')

      .log('Check Search workers page.')
      .verifyTextVisible('Search workers')

      .log('On the left navigation pane click "Shortlist"')
      .navigateByLeftMenuInDashboard('Shortlist')

      .log('Check shortlist page')
      .verifyTextVisible('Shortlist')

      .log('On the left navigation pane, click Compliance')
      .navigateByLeftMenuInDashboard('Compliance')

      .log('Check Terms and Conditions page')
      .clickElementOnText('app-organisations a', 'Terms and Conditions ')

      .log('On the upper menu tab of the page, click Support worker details ')
      .clickElementOnText('app-organisations a', 'Support worker details ')

      .log('On the left navigation pane, click Account')
      .navigateByLeftMenuInDashboard('Account')
      .verifyTextVisible('Account Settings')

      .log('On the upper right corner of the page click "Login as Organisation"')
      .clickElementOnText('app-header button', 'Login as Organisation')

      .log('On the top right corner of the page click "Logout"')
      .clickLogoutOnTopMenu()
      .url()
      .should('include', '/login');
  });

  it('ES-T3540: Login as org admin then coordinator then client with routings', () => {
    const orgAdmEmail = testData.loginWithRouting.sabrinaOrgAdmin.email;
    const orgAdmPassword = testData.loginWithRouting.sabrinaOrgAdmin.password;

    cy.log('Login as org admin')
      .loginToDashboard(orgAdmEmail, orgAdmPassword)

      .log('Check dashboard page')
      .url()
      .should('include', '/dashboard')

      .log('On dashboard page, click \'Login as <Name>\' of the selected coordinator')
      .clickElementOnText('app-organisation-dashboard button', 'Login as Charmaine Cotton')

      .log('Check coordinator\'s dashboard.')
      .verifyTextVisible('Welcome, Charmaine Cotton')

      .log('On the Dashboard page, click "View messages"/"Messages" of the selected client')
      .get('h3.bold')
      .contains('Sonny Hackett')
      .parents('.header')
      .find('button span')
      .contains('View messages')
      .click()

      .log('Check client\'s inbox page')
      .verifyTextVisible('Sonny Hackett\'s inbox')

      .navigateByLeftMenuInDashboard('Dashboard')
      .verifyTextVisible('Welcome, Charmaine Cotton')

      .log('On the upper right of the page, click \'Log in as <Client\'s Name>\' button')
      .clickElementOnText('app-coordinator-client-details button', 'Login as Sonny')
      .verifyTextVisible('Sonny Hackett')

      .log('On the upper right corner of the page, click \'Login as Organisation\'')
      .clickElementOnText('app-header button', 'Login as Organisation')
      .verifyTextVisible('Automation Test Funding')

      .log('On dashboard page, click \'Login as <Name>\' of the selected coordinator')
      .clickElementOnText('app-organisation-dashboard button', 'Login as Charmaine Cotton')
      .verifyTextVisible('Welcome, Charmaine Cotton')

      .log('On the Dashboard page, click "View messages"/"Messages" of the selected client')
      .get('h3.bold')
      .contains('Sonny Hackett')
      .parents('.header')
      .find('button span')
      .contains('View agreements')
      .eq(0)
      .click()

      .log('Check client\'s all agreement page')
      .verifyTextVisible('Sonny Hackett\'s aggrements')

      .log('On the upper right of the page, click \'Log in as <Client\'s Name>\' button')
      .clickElementOnText('app-coordinator-quick-reply button', 'Log in as Sonny')
      .verifyTextVisible('Sonny Hackett')

      .log('Check client\'s \'My Support Workers\' page')
      .wait(2000)
      .verifyTextVisible('My support workers')

      .log('On the upper right corner of the page click "Login as Organisation"')
      .clickElementOnText('app-header button', 'Login as Organisation')
      .wait(3000)

      .log('On dashboard page, click \'Login as <Name>\' of the selected coordinator')
      .clickElementOnTextWithPosition('app-organisation-dashboard button', 'Login as Charmaine Cotton', 0)
      .wait(3000)

      .log('Check client\'s Support hours page')
      .get('h3.bold')
      .contains('Sonny Hackett')
      .parents('.header')
      .find('button span')
      .contains('Support hours')
      .click()

      .log('Check client\'s Support hours page.')
      .verifyTextVisible('Sonny Hackett\'s timesheets')

      .log('On the upper right corner of the page click "Login as Organisation"')
      .clickElementOnText('app-header button', 'Login as Organisation')
      .wait(3000)

      .log('On dashboard page, click \'Login as <Name>\' of the selected coordinator')
      .clickElementOnText('app-organisation-dashboard button', 'Login as Charmaine Cotton')
      .wait(3000)

      .log('On the upper right of the page, click \'Log in as <Client\'s Name>\' button')
      .clickElementOnText('app-coordinator-client-details button', 'Login as Sonny')
      .wait(3000)

      .log('On the dashboard click "Search & message workers"')
      .clickElementOnText('#callToAction span', 'Search & message workers')
      .verifyTextVisible('Search workers')

      .log('On the left navigation pane, click "Dashboard"')
      .navigateByLeftMenuInDashboard('Dashboard')
      .url()
      .should('include', '/dashboard')

      .log('On the dashboard click "Post a job"')
      .clickElementOnText('#callToAction span', 'Post a job')
      .url()
      .should('include', '/jobs')

      .log('Check job types page')
      .verifyTextVisible('Choose job type')

      .log('On the page, click  \'Learn more about job types ')
      .clickElementOnText('app-expansion-panel h3', 'Learn more about job types')

      .log('On the page, click  \'Learn more about job types ')
      .clickElementOnText('app-expansion-panel h3', 'Learn more about job types')

      .log('On the Job Type page, click  \'Post standard job\'')
      .clickElementOnText('app-triage button span', 'Post standard job')

      .log('Check Post A Job page.')
      .verifyTextVisible('Post a job')

      .log('On the upper part of Post A Job page, click \'< Back\'')
      .clickElementOnText('app-post-job-granular-availability button span', 'Back')

      .log('On the Job Type page, click  \'Last Minute job\'')
      .wait(1000)
      .clickElementOnText('app-triage button span', 'Last Minute job')

      .log('Check How it works page.')
      .verifyTextVisible('How Last Minute jobs work')

      .log('Click Create a Last Minute job button')
      .clickElementOnText('app-how-it-works button span', 'Create a Last Minute job')

      .log('Check Create a last minute job page.')
      .verifyTextVisible('Post a job')
      .verifyTextVisible('Create a Last Minute job')

      .log('On the lower part of the page, click \'Cancel\'')
      .clickElementOnText('app-post-last-minutes-jobs button', 'Cancel')

      .log('On the left top corner of the page, click \'Account\'')
      .clickElementOnText('p span', 'Account')

      .log('Check Client Account page.')
      .verifyTextVisible('personal details')

      .log('On the left upper corner of the page, click\'< Back to dashboard\'')
      .clickElementOnText('app-consumer-account-navigation button span', 'Back to dashboard')

      .log('On the left top corner of the page, click \'Search Workers\'')
      .navigateByLeftMenuInDashboard('Search workers')

      .log('Check \'Search Workers\' page.')
      .verifyTextVisible('Search workers')

      .log('On the left navigation pane, click \'Jobs\'')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Check Current posted-job page.')
      .verifyTextVisible('My jobs')

      .log('On the upper menu tab of the page, click \'Archive\'')
      .clickElementOnText('.mat-tab-label-content', 'Archive')

      .log('Check Archive posted-job page.')
      .verifyElementVisible('app-archive-jobs')

      .log('On the upper menu tab of the page, click \'Current\'')
      .clickElementOnText('.mat-tab-label-content', 'Current')

      .log('On the upper right of the page, click \'Post a job\'')
      .clickElementOnText('app-my-jobs button', 'Post a job')

      .log('On the Job Type page, click  \'Post standard job\'')
      .clickElementOnText('app-triage button span', 'Post standard job')

      .log('Check Post A Job page.')
      .verifyTextVisible('Post a job')

      .log('On the upper part of Post A Job page, click \'< Back\'')
      .clickElementOnText('app-post-job-granular-availability button span', 'Back')

      .log('On the Job Type page, click  \'Last Minute job\'')
      .wait(1000)
      .clickElementOnText('app-triage button span', 'Last Minute job')

      .log('Check How it works page.')
      .verifyTextVisible('How Last Minute jobs work')

      .log('on the left navigation pane, click Support hours')
      .navigateByLeftMenuInDashboard('Support hours')

      .log('Check client\'s Support hours page.')
      .url()
      .should('include', '/timesheet/consumer')
      .verifyTextVisible('Support hours')

      .log('On the left navigation pane, click "Inbox"')
      .navigateByLeftMenuInDashboard('Inbox')

      .log('Check inbox page')
      .verifyTextVisible('Inbox')

      .log('On the left navigation pane, click \'My support workers\'')
      .navigateByLeftMenuInDashboard('My support workers')

      .log('Check client\'s \'My Support Workers\' page')
      .wait(2000)
      .verifyTextVisible('My support workers')

      .log('On the current page, click Send message of the selected worker')
      .get('h2.workerName')
      .contains('Jacquline Dare')
      .parents('.details')
      .find('button span')
      .contains('Send message')
      .click()
      .verifyTextVisible('Inbox')

      .log('On upper part of the page, click \'< Back\'')
      .go('back')

      .log('On the current page, click View profile of the selected worker')
      .get('h2.workerName')
      .contains('Jacquline Dare')
      .parents('.details')
      .find('button span')
      .contains('View profile')
      .click()
      .verifyTextVisible('About Jacquline D')

      .log('On the upper left of the worker profile page, click "<  Back"')
      .clickElementOnText('app-carer-profile button span', 'Back')

      .log('On the current page, click Provide feedback of the selected worker')
      .get('h2.workerName')
      .contains('Jacquline Dare')
      .parents('.details')
      .find('button span')
      .contains('Provide feedback')
      .click()

      .log('Check Review page.')
      .verifyTextVisible('Review Jacquline')

      .log('On upper part of the page, click \'< Back\'')
      .clickElementOnText('app-provide-feedback button span', 'Back')

      .log('On agreement list page, click "Terminated" tab')
      .clickElementOnText('.mat-tab-label-content', 'Terminated')

      .log('Check terminated agreement page')
      .verifyTextVisible('You don\'t have any terminated support workers.')

      .log('On the upper menu tab of the client\'s Active support workers page, click \'Active\'')
      .wait(2000)
      .clickElementOnText('.mat-tab-label-content', 'Active')

      .log('On the left navigation pane, click \'Invite workers\'')
      .navigateByLeftMenuInDashboard('Invite workers')

      .log('Check Invite Carer page.')
      .url()
      .should('include', '/invite/add')
      .verifyTextVisible('Enter the details of someone you’d like to invite to your team')

      .log('On the Invite Carer page upper part, click\'< Back')
      .clickElementOnText('app-invite-carer button span', 'Back')

      .log('On the left navigation pane click "Shortlist"')
      .navigateByLeftMenuInDashboard('Shortlist')

      .log('On the page, click Send message of the selected worker')
      .get('h3')
      .contains('Toi S')
      .parents('.shortlistDetail')
      .find('a div')
      .contains('Send message')

      .log('Check Conversation starter page.')
      .verifyTextVisible('Inbox')

      .log('On the left navigation pane click "Shortlist"')
      .navigateByLeftMenuInDashboard('Shortlist')

      .log('On the page, click View profile of the selected worker')
      .get('h3')
      .contains('Toi S')
      .parents('.shortlistDetail')
      .find('a div')
      .contains('View profile')
      .click()
      .verifyTextVisible('About Toi S')

      .log('On the worker profile page, click "Contact <Worker\'s Name>" button')
      .clickElementOnText('app-carer-profile button', 'Contact')

      .log('On the left navigation pane click "Shortlist"')
      .navigateByLeftMenuInDashboard('Shortlist')

      .log('On the page, click View profile of the selected worker')
      .get('h3')
      .contains('Toi S')
      .parents('.shortlistDetail')
      .find('a div')
      .contains('View profile')
      .click()
      .verifyTextVisible('About Toi S')

      .log('On the upper left of the worker profile page, click "<  Back"')
      .clickElementOnText('app-carer-profile button span', 'Back')

      .log('On the left navigation pane, click \'Billing\'')
      .navigateByLeftMenuInDashboard('Billing')
      .verifyTextVisible('Billing')

      .log('Check invoices and receipts page')
      .verifyTextVisible('Date')
      .verifyTextVisible('Invoice Number')
      .verifyTextVisible('Collection Status')
      .verifyTextVisible('Payment Status')
      .verifyTextVisible('Total')
      .verifyTextVisible('View')
      .verifyElementVisible('app-billing table tbody tr')

      .log('click "Transaction" tab')
      .clickElementOnText('.mat-tab-label-content', 'Transactions')

      .log('Check transactions page')
      .verifyTextVisible('Date')
      .verifyTextVisible('Description')
      .verifyTextVisible('Debit')
      .verifyTextVisible('Credit')
      .verifyElementVisible('app-billing table tbody tr')

      .log('Click "Exports" tab')
      .clickElementOnText('.mat-tab-label-content', 'Exports')

      .log('Check exports page')
      .verifyTextVisible('Export your support hours in CSV format')
      .verifyTextVisible('Export your transaction history in CSV format')

      .log('On the upper menu tab of the current page, click \'Invoices & Receipts\'')
      .clickElementOnText('.mat-tab-label-content', 'Invoices & Receipts')

      .log('On the left navigation pane, click "Notes"')
      .navigateByLeftMenuInDashboard('Notes')

      .log('Check Support notes page')
      .verifyTextVisible('Support notes')
      .verifyElementVisible('app-shift-notes table tbody tr')

      .log('On the upper right corner of the page click "Login as Organisation"')
      .clickElementOnText('app-header button', 'Login as Organisation')

      .log('On the top right corner of the page click "Logout"')
      .clickLogoutOnTopMenu()
      .url()
      .should('include', '/login');
  });

  it('ES-T3562: Login as admin then client with routings', () => {
    const AdmEmail = testData.loginWithRouting.admin.email;
    const AdmPassword = testData.loginWithRouting.admin.password;
    const email = 'automation_maria.repollo.expresspaymobile+client@donotuse.com.au';

    cy.log('Login as admin')
      .loginToDashboard(AdmEmail, AdmPassword)

      .log('Check Manage users page.')
      .verifyTextVisible('Manage users')

      .log('On the search textbox of the page, input the client\'s details')
      .get('#search-users-input')
      .type(email)

      .log('Click the Search button')
      .get('.form-group #submit')
      .click()

      .log('Check the displayed result.')
      .verifyTextVisible('Sonny Hackett')

      .log('Click \'Login as\' on selected client.')
      .get('a[href="/login_as/sonnyha"]')
      .click()

      .log('Check client\'s dashboard.')
      .wait(3000)
      .verifyTextVisible('Dashboard')
      .verifyTextVisible('Explore workers’ profiles')

      .log('On the dashboard click "Search & message workers"')
      .clickElementOnText('#callToAction span', 'Search & message workers')
      .verifyTextVisible('Search workers')

      .log('On the left navigation pane, click "Dashboard"')
      .navigateByLeftMenuInDashboard('Dashboard')
      .url()
      .should('include', '/dashboard')

      .log('On the dashboard click "Post a job"')
      .clickElementOnText('#callToAction span', 'Post a job')
      .url()
      .should('include', '/jobs')

      .log('Check job types page')
      .verifyTextVisible('Choose job type')

      .log('On the page, click  \'Learn more about job types ')
      .clickElementOnText('app-expansion-panel h3', 'Learn more about job types')

      .log('On the page, click  \'Learn more about job types ')
      .clickElementOnText('app-expansion-panel h3', 'Learn more about job types')

      .log('On the job types page, click "Post standard job"')
      .clickElementOnText('button span', 'Post standard job')

      .log('Check post a regular job page')
      .verifyTextVisible('Post a job')

      .log('Click Back button')
      .clickElementOnText('button span', ' Back')

      .log('Check job types page')
      .verifyTextVisible('Choose job type')

      .log('On the job types page, click "Last Minute job"')
      .clickElementOnText('button span', 'Last Minute job')

      .log('Check how last minute jobs work page')
      .verifyTextVisible('How Last Minute jobs work')

      .log('On how last minute jobs work page, click "Create a last minute job"')
      .clickElementOnText('button span', 'Create a Last Minute job')

      .log('Check post a last minute job page')
      .verifyTextVisible('Post a job')
      .verifyTextVisible('Create a Last Minute job')

      .log('On the left navigation pane, click Account')
      // .navigateByLeftMenuInDashboard('Account')
      .get('nav span')
      .contains('Account')
      .eq(0)
      .click()

      .log('Check Client Account page.')
      .verifyTextVisible('Account details')

      .log('Click Back to dashboard')
      .get('app-back-button span')
      .contains(' Back to dashboard')
      .eq(0)
      .click()
      .wait(2000)

      .log('On the left top corner of the page, click \'Search Workers\'')
      .navigateByLeftMenuInDashboard('Search workers')

      .log('Check \'Search Workers\' page.')
      .verifyTextVisible('Search workers')

      .log('On the left navigation pane, click \'Jobs\'')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Check Current posted-job page.')
      .verifyTextVisible('My jobs')

      .log('On the upper menu tab of the page, click \'Archive\'')
      .clickElementOnText('.mat-tab-label-content', 'Archive')

      .log('Check Archive posted-job page.')
      .verifyElementVisible('app-archive-jobs')

      .log('On the upper menu tab of the page, click \'Current\'')
      .clickElementOnText('.mat-tab-label-content', 'Current')

      .log('On the upper right of the page, click \'Post a job\'')
      .clickElementOnText('app-my-jobs button', 'Post a job')

      .log('Check Job Type page.')
      .verifyTextVisible('Choose job type')

      .log('On the Job Type page, click  \'Last Minute job\'')
      .wait(1000)
      .clickElementOnText('app-triage button span', 'Last Minute job')

      .log('Check How it works page.')
      .verifyTextVisible('How Last Minute jobs work')

      .log('Click Create a Last Minute job button')
      .clickElementOnText('app-how-it-works button span', 'Create a Last Minute job')

      .log('Check Create a last minute job page.')
      .verifyTextVisible('Post a job')
      .verifyTextVisible('Create a Last Minute job')

      .log('On the lower part of the page, click \'Cancel\'')
      .clickElementOnText('app-post-last-minutes-jobs button', 'Cancel')

      .log('on the left navigation pane, click Support hours')
      .navigateByLeftMenuInDashboard('Support hours')

      .log('Check client\'s Support hours page.')
      .url()
      .should('include', '/timesheet/consumer')
      .verifyTextVisible('Support hours')

      .log('On the left navigation pane, click "Inbox"')
      .navigateByLeftMenuInDashboard('Inbox')

      .log('Check inbox page')
      .verifyTextVisible('Inbox')

      .log('Choose conversation with the worker then click conversation card')
      .clickElementOnText('app-channel-item', 'Jacquline D')

      .log('Check conversation page')
      .verifyTextVisible('Chat info')

      .log('On the upper part conversation page, click \'View profile\'')
      .clickViewProfileInChatInfo()
      .verifyTextVisible('About')

      .log('On worker profile page, click "Back" button')
      .clickElementOnText('button span', 'Back')

      .log('On the upper part conversation page, click \'Login as\'')
      .wait(3000)
      .get('app-header header button')
      .contains(' Login as Admin ')
      .eq(0)
      .click()
      .wait(3000)
      .verifyTextVisible('Manage users')

      .log('On the search textbox of the page, input the client\'s details')
      .get('#search-users-input')
      .type(email)

      .log('Click the Search button')
      .get('.form-group #submit')
      .click()

      .log('Check the displayed result.')
      .verifyTextVisible('Sonny Hackett')

      .log('Click \'Login as\' on selected client.')
      .get('a[href="/login_as/sonnyha"]')
      .click()

      .log('Check client\'s dashboard.')
      .wait(3000)
      .verifyTextVisible('Dashboard')
      .verifyTextVisible('Explore workers’ profiles')

      .log('On the left navigation pane, click "Inbox"')
      .navigateByLeftMenuInDashboard('Inbox')

      .log('Check inbox page')
      .verifyTextVisible('Inbox')

      .log('On the left navigation pane, click "My support workers"')
      .navigateByLeftMenuInDashboard('My support workers')

      .log('Check client\'s Active support workers page.')
      .verifyTextVisible('My support workers')

      .log('On the current page, click Send message of the selected worker')
      .get('h2.workerName')
      .contains('Jacquline Dare')
      .parents('.details')
      .find('button span')
      .contains('Send message')
      .click()
      .verifyTextVisible('Inbox')

      .log('On upper part of the page, click \'< Back\'')
      .go('back')

      .log('On the current page, click View profile of the selected worker')
      .get('h2.workerName')
      .contains('Jacquline Dare')
      .parents('.details')
      .find('button span')
      .contains('View profile')
      .click()
      .verifyTextVisible('About Jacquline D')

      .log('On the upper left of the worker profile page, click "<  Back"')
      .clickElementOnText('app-carer-profile button span', 'Back')

      .log('On the current page, click Provide feedback of the selected worker')
      .get('h2.workerName')
      .contains('Jacquline Dare')
      .parents('.details')
      .find('button span')
      .contains('Provide feedback')
      .click()

      .log('Check Review page.')
      .verifyTextVisible('Review Jacquline')

      .log('On upper part of the page, click \'< Back\'')
      .clickElementOnText('app-provide-feedback button span', 'Back')

      .log('On agreement list page, click "Terminated" tab')
      .clickElementOnText('.mat-tab-label-content', 'Terminated')

      .log('Check terminated agreement page')
      .verifyTextVisible('You don\'t have any terminated support workers.')

      .log('On the upper menu tab of the client\'s Active support workers page, click \'Active\'')
      .wait(2000)
      .clickElementOnText('.mat-tab-label-content', 'Active')

      .log('On the left navigation pane, click \'Invite workers\'')
      .navigateByLeftMenuInDashboard('Invite workers')

      .log('Check Invite Carer page.')
      .url()
      .should('include', '/invite/add')
      .verifyTextVisible('Enter the details of someone you’d like to invite to your team')

      .log('On the Invite Carer page upper part, click\'< Back')
      .clickElementOnText('app-invite-carer button span', 'Back')

      .log('On the left navigation pane click "Shortlist"')
      .navigateByLeftMenuInDashboard('Shortlist')

      .log('Check shortlist page')
      .verifyTextVisible('Shortlist')

      .log('On the page, click Send message of the selected worker')
      .get('h3')
      .contains('Toi S')
      .parents('.shortlistDetail')
      .find('a div')
      .contains('Send message')

      .log('Check Conversation starter page.')
      .verifyTextVisible('Inbox')

      .log('On the page, click Send message of the selected worker')
      .get('h3')
      .contains('Toi S')
      .parents('.shortlistDetail')
      .find('a div')
      .contains('View profile')
      .click()

      .log('Check bulk_message page.')
      .verifyTextVisible('About Toi S')

      .log('On the left navigation pane click "Shortlist"')
      .navigateByLeftMenuInDashboard('Shortlist')

      .log('Check shortlist page')
      .verifyTextVisible('Shortlist')

      .log('On the page, click View profile of the selected worker')
      .get('h3')
      .contains('Toi S')
      .parents('.shortlistDetail')
      .find('a div')
      .contains('View profile')
      .click()
      .verifyTextVisible('About Toi S')

      .log('On the left navigation pane, click \'Billing\'')
      .navigateByLeftMenuInDashboard('Billing')
      .verifyTextVisible('Billing')

      .log('Check invoices and receipts page')
      .verifyTextVisible('Date')
      .verifyTextVisible('Invoice Number')
      .verifyTextVisible('Collection Status')
      .verifyTextVisible('Payment Status')
      .verifyTextVisible('Total')
      .verifyTextVisible('View')
      .verifyElementVisible('app-billing table tbody tr')

      .log('click "Transaction" tab')
      .clickElementOnText('.mat-tab-label-content', 'Transactions')

      .log('Check transactions page')
      .verifyTextVisible('Date')
      .verifyTextVisible('Description')
      .verifyTextVisible('Debit')
      .verifyTextVisible('Credit')
      .verifyElementVisible('app-billing table tbody tr')

      .log('Click "Exports" tab')
      .clickElementOnText('.mat-tab-label-content', 'Exports')

      .log('Check exports page')
      .verifyTextVisible('Export your support hours in CSV format')
      .verifyTextVisible('Export your transaction history in CSV format')

      .log('On the left navigation pane, click "Notes"')
      .navigateByLeftMenuInDashboard('Notes')

      .log('On the upper part conversation page, click \'Login as\'')
      .wait(3000)
      .get('app-header header button')
      .contains(' Login as Admin ')
      .eq(0)
      .click()
      .wait(3000)
      .verifyTextVisible('Manage users')

      .log('On the top right corner of the page click "Logout"')
      .clickLogoutOnTopMenu()
      .url()
      .should('include', '/login');
  });

  it('ES-T3588: Login as admin then worker with routings', () => {
    const AdmEmail = testData.loginWithRouting.admin.email;
    const AdmPassword = testData.loginWithRouting.admin.password;
    const email = 'automation_maria.repollo.expresspaymobile+worker@donotuse.com.au';

    cy.log('Login as admin')
      .loginToDashboard(AdmEmail, AdmPassword)

      .log('Check Manage users page.p')
      .verifyTextVisible('Manage users')

      .log('On the search textbox of the page, input the client\'s details')
      .get('#search-users-input')
      .type(email)

      .log('Click the Search button')
      .get('.form-group #submit')
      .click()

      .log('Check the displayed result.')
      .verifyTextVisible('Harlan O\'Kon')

      .log('Click \'Login as\' on selected client.')
      .get('a[href="/login_as/harlano"]')
      .click()

      .log('Check client\'s dashboard.')
      .wait(3000)
      .verifyTextVisible('Dashboard')
      .verifyTextVisible('Welcome back Harlan')

      .log('Check worker profile page')
      .log('Click Profile btn')
      .clickElement('#profileCardAvatar')

      .log('Check worker profile page')
      .verifyTextVisible('About Harlan O')

      .log('On the left upper corner of the page click "Edit Profile"')
      .clickElementOnText('span', 'Edit profile')

      .log('Check profile building page')
      .verifyTextVisible('Preview profile')
      .verifyTextVisible('Profile photo')
      .verifyTextVisible('Your bio')
      .verifyTextVisible('WWCC')
      .verifyTextVisible('Bank account')
      .verifyTextVisible('Rates and availability')
      .verifyTextVisible('Experience')
      .verifyTextVisible('Work history')
      .verifyTextVisible('Education & training')
      .verifyTextVisible('NDIS Worker Screening')
      .verifyTextVisible('Badges')
      .verifyTextVisible('Immunisation')
      .verifyTextVisible('Languages')
      .verifyTextVisible('Cultural background')
      .verifyTextVisible('Religion')
      .verifyTextVisible('Interests & hobbies')
      .verifyTextVisible('About me')
      .verifyTextVisible('My preferences')
      .verifyTextVisible('Save and continue')

      .log('On the right  upper corner of the page click "Preview profile"')
      .clickElementOnText('span', 'Preview profile')

      .log('Check \'profilePreviewFromProfileBuilding\' page')
      .verifyTextVisible('About Harlan O')
      .verifyTextVisible('Availability')
      .verifyTextVisible('Qualifications')
      .verifyTextVisible('Services offered')
      .verifyTextVisible('Indicative rates')
      .verifyTextVisible('Badges')
      .verifyTextVisible('Immunisation')
      .verifyTextVisible('Mable verified')
      .verifyTextVisible('Experience')
      .verifyTextVisible('Work locations')
      .verifyTextVisible('Work and education history')
      .verifyTextVisible('Disability')
      .verifyTextVisible('More information')

      .log('In the left upper corner of the profilePreviewFromProfileBuilding page click the Edit my profile')
      .clickElementOnText('span', ' Edit my profile')

      .log('On the left navigation pane, click "Dashboard"')
      .navigateByLeftMenuInDashboard('Dashboard')
      .url()
      .should('include', '/dashboard')

      .log('On the left navigation pane, click "Jobs"')
      .navigateByLeftMenuInDashboard('Jobs')
      .verifyTextVisible('Jobs')

      .log('Check Discover job page.')
      .clickElementOnText('a', 'Discover')
      .verifyTextVisible('Jobs you might be interested in based on your profile')
      .url()
      .should('include', '/jobs/search/discover')

      .log('On Jobs page upper menu tab click "Search"')
      .clickElementOnText('a', 'Search')
      .url()
      .should('include', '/jobs/search/all')
      .verifyTextVisible('Suburb or postcode')
      .verifyTextVisible('Include nearby suburbs')

      .log('On Jobs page upper menu tab click "Applied"')
      .clickElementOnText('a', 'Applied')

      .log('Check Search Applied jobs page')
      .verifyTextVisible('Expired')

      .log('On the left navigation pane, click "Support hours"')
      .navigateByLeftMenuInDashboard('Support hours')
      .wait(1000)
      .clickSelectorIfExist('mat-dialog-actions button')
      .verifyTextVisible('Jobs')

      .log('Check "Support hours" page')
      .verifyTextVisible('Support hours')

      .log('In upper right of the Support hours page click "Add new"')
      .clickElementOnText('app-carer-timesheet button', 'Add new')

      .log('Check Add session page.')
      .verifyTextVisible('Add new support hours')
      .verifyTextVisible('Time and rate')
      .verifyTextVisible('Support notes')
      .verifyTextVisible('Incident report (optional)')
      .verifyTextVisible('Submit')

      .log('In upper left of the page click "<  Back"')
      .clickElement('app-add-session app-back-button button')
      .verifyTextVisible('Support hours')

      .log('On the left navigation pane, click "Inbox"')
      .navigateByLeftMenuInDashboard('Inbox')

      .log('Choose conversation with the client then click conversation card')
      .clickElementOnText('span', 'Go to conversation')

      .log('Check conversation page')
      .verifyTextVisible('Chat info')

      .log('On the left navigation pane click "Shortlist"')
      .navigateByLeftMenuInDashboard('Billing')
      .verifyTextVisible('Billing')

      .log('Check \'My invoices\' page.')
      .verifyTextVisible('Keep track of your invoices below.')
      .verifyTextVisible('Date')
      .verifyTextVisible('Invoice')
      .verifyTextVisible('Client')
      .verifyTextVisible('Collection')
      .verifyTextVisible('Payment')
      .verifyTextVisible('Net total')
      .verifyTextVisible('View')
      .verifyElementVisible('app-my-invoices table tbody tr')

      .log('click "Payments tab')
      .clickElementOnText('.mat-tab-label-content', 'Payments')
      .verifyTextVisible('Keep track of your incoming payments below.')
      .verifyTextVisible('Date')
      .verifyTextVisible('Description')
      .verifyTextVisible('Credit')
      .verifyElementVisible('app-billing table tbody tr')

      .log('On upper menu tab of the Billing page, click "Business income"')
      .clickElementOnText('.mat-tab-label-content', 'Business income')

      .log('Check Worker\'s business net summary income page')
      .verifyTextVisible('Business net income summary')

      .log('Click "Exports" tab')
      .clickElementOnText('.mat-tab-label-content', 'Exports')

      .log('Check exports page')
      .verifyTextVisible('Export your support hours in CSV format')

      .log('On the left navigation pane, click "My clients"')
      .navigateByLeftMenuInDashboard('My clients')

      .log('Check list of active clients page.')
      .verifyTextVisible('Sonny Hackett')
      .verifyTextVisible('Tracey Truong')

      .log('On the list active of clients page, click "View agreement" for the selected client.')
      .get('app-clients-list button span')
      .contains('View agreement')
      .eq(0)
      .click()
      .verifyTextVisible('Agreement with')

      .log('On upper left of the agreement details page, click "<  Back"')
      .clickElementOnText('app-view-agreement button span', 'Back')

      .log('On the list of active clients page, click "Messages" for the selected client.')
      .get('app-clients-list button span')
      .contains('Messages')
      .eq(0)
      .click()
      .verifyTextVisible('Inbox')

      .log('On the right side of the Conversation page, click "Amend agreement" button')
      .wait(1000)
      .clickElementOnText('app-expansion-panel button span', 'Amend agreement')

      .log('Check Amend agreement page')
      .verifyTextVisible('Amend agreement with')
      .verifyTextVisible('Service')
      .verifyTextVisible('Dates and times')
      .verifyTextVisible('Rates')
      .verifyTextVisible('Save and send to')

      .log('On upper left of the Amend agreement page, click "<  Back"')
      .clickElementOnText('app-agreement button span', 'Back')

      .log('On upper left of the Conversation page, click "<  Back"')
      .go('back')

      .log('On the list of active clients page, click "View profile" for the selected client.')
      .get('app-clients-list button span')
      .contains('View profile')
      .eq(0)
      .click()
      .verifyTextVisible('Care Information – Private & Confidential')
      .verifyTextVisible('Account Holder Details')
      .verifyTextVisible('Customer Details')
      .verifyTextVisible('Customer Household Information')
      .verifyTextVisible('Emergency Contact(s) and Instructions')

      .log('On the left navigation pane, click "My clients"')
      .navigateByLeftMenuInDashboard('My clients')

      .log('On the list of active clients page, click "Request a review" from the selected client.')
      .get('app-clients-list button span')
      .contains('Request a review')
      .eq(0)
      .click()

      .log('Click "Cancel"')
      .clickElementOnText('app-dialog button', 'Cancel')

      .log('On the upper menu tab of the list of active clients page, click "Pending"')
      .clickElementOnText('.mat-tab-label-content', 'Pending')

      .log('Check list of clients with pending offer approval page.')
      .verifyElementVisible('app-clients-list div')

      .log('On the upper menu tab, click "Past"')
      .clickElementOnText('.mat-tab-label-content', 'Past')

      .log('Check list of past clients page')
      .verifyElementVisible('app-clients-list div')

      .log('On the list of past clients page, click "View agreement" for the selected client.')
      .get('app-clients-list button span')
      .contains('View agreement')
      .eq(0)
      .click()
      .verifyTextVisible('Terminated Agreement with')

      .log('On the upper left of the Terminated agreement details page, click "<  Back"')
      .go('back')

      .log('On the upper menu tab of the list of active clients page, click "Past".')
      .clickElementOnText('.mat-tab-label-content', 'Past')

      .log('On the list of past clients page, click "Messages" for the selected client.')
      .get('app-clients-list button span')
      .contains('Messages')
      .eq(0)
      .click()
      .verifyTextVisible('Inbox')

      .log('On the upper left of the Conversation page, click "<  Back"')
      .go('back')

      .log('On the upper menu tab of the list of active clients page, click "Past".')
      .clickElementOnText('.mat-tab-label-content', 'Past')

      .log('On the list of past clients page, click "Request a review" for the selected client.')
      .get('app-clients-list button span')
      .contains('Request a review')
      .eq(0)
      .click()

      .log('Click "Cancel"')
      .clickElementOnText('app-dialog button', 'Cancel')

      .log('On the upper menu tab, click "Active".')
      .clickElementOnText('.mat-tab-label-content', 'Active')

      .log('On the top right corner of the page click "Logout"')
      .clickLogoutOnTopMenu()
      .url()
      .should('include', '/login');
  });
});
