import * as testData from '../../../fixtures/test-data.json';

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/')
      .byPassAuthen();
  });

  it('ES-T3589: Login as admin then coordinator with routings', () => {
    const AdmEmail = testData.loginWithRouting.admin.email;
    const AdmPassword = testData.loginWithRouting.admin.password;
    const email = 'automation_david.sears+coordinator.minor@donotuse.com.au';

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
      .verifyTextVisible('David Sears')

      .log('Click \'Login as\' on selected client.')
      .get('a[href="/login_as/davidse"]')
      .click()

      .log('Check client\'s dashboard.')
      .wait(3000)
      .verifyTextVisible('Dashboard')
      .verifyTextVisible('Welcome, David Sears')

      .log('On upper right of the page, click "Add client"')
      .clickElementOnText('app-coordinators-dashboard button', 'Add client')

      .log('Check add client page.')
      .verifyTextVisible('Client details')

      .log('On the lower part of the add client page, click "Cancel"')
      .clickElementOnText('app-add-client button', 'Cancel')

      .log('On the Dashboard page, click "View messages"/"Messages" of the selected client')
      .get('h3')
      .contains('Nicolas English')
      .parents('app-coordinator-client-details')
      .find('button span')
      .contains('View messages')
      .click()

      .log('Check client\'s inbox page.')
      .verifyTextVisible('Nicolas English\'s inbox')

      .log('On conversation page, click "View profile"')
      .clickElementOnText('app-channel-item div span', 'Dylan P')
      .wait(2000)
      .clickElementOnText('app-chat-info button span', 'View profile')

      .log('Check worker profile page.')
      .verifyTextVisible('About Dylan P')

      .log('On the worker profile page, click "Contact <Worker\'s Name>" button')
      .clickElementOnText('app-carer-profile button', 'Contact')

      .log('Click "Cancel"')
      .clickElementOnText('mat-dialog-actions button', 'Cancel')

      .log('On the upper left of the worker profile page, click "<  Back"')
      .clickElementOnText('app-carer-profile button span', 'Back')

      .log('On the upper right of the conversation page, click "Log in as <Client\'s Name>" button')
      .clickElementOnText('app-coordinator-quick-reply button', 'Log in as Nicolas')

      .log('Check the conversation page.')
      .verifyTextVisible('Inbox')

      .log('On the upper right corner of the page, click "Login as Coordinator".')
      .clickElementOnText('app-header button', 'Login as Coordinator')

      .log('On the Dashboard page, click "View messages"/"Messages" of the selected client')
      .wait(2000)
      .get('h3')
      .contains('Nicolas English')
      .parents('app-coordinator-client-details')
      .find('button span')
      .contains('View messages')
      .click()

      .log('Choose conversation with the worker then click conversation card')
      .clickElementOnText('app-channel-item div span', 'Dylan P')
      .wait(2000)

      .log('On the conversation left side of the page, click "< Back to dashboard"')
      .clickElementOnText('app-coordinator-quick-reply button span', 'Back to dashboard')

      .log('On the inbox page menu tab, click "Agreements"')
      .get('h3')
      .contains('Nicolas English')
      .parents('app-coordinator-client-details')
      .find('button span')
      .contains('Agreements')
      .click()

      .log('Check client\'s all Agreement page.')
      .verifyTextVisible('Nicolas English\'s aggrements')

      .log('On the client\'s all Agreement page, click "View agreements"/"Agreements" of the selected worker')
      .get('h3')
      .contains('Janet T ')
      .parents('app-coordinator-agreements')
      .find('button span')
      .contains('View agreement')
      .click()

      .log('On the agreement details page left part, click "< Back to all agreements"')
      .clickElementOnText('app-coordinator-view-agreement button span', 'Back to all agreements')

      .log('On the upper right of the client\'s all agreement page, click "Log in as <Client\'s Name>" button')
      .clickElementOnText('app-coordinator-quick-reply button', 'Log in as Nicolas ')

      .log('Check client\'s my support worker page.')
      .verifyTextVisible('My support workers')

      .log('On the upper right corner of the page, click "Login as Coordinator".')
      .clickElementOnText('app-header button', 'Login as Coordinator')

      .log('On the Dashboard page, click "View messages"/"Messages" of the selected client')
      .get('h3')
      .contains('Nicolas English')
      .parents('app-coordinator-client-details')
      .find('button span')
      .contains('View messages')
      .click()

      .log('Choose conversation with the worker then click conversation card')
      .wait(2000)
      .clickElementOnText('app-channel-item div span', 'Janet T')
      .wait(2000)

      .log('On the conversation left side of the page, click "< Back to dashboard"')
      .clickElementOnText('app-coordinator-quick-reply button span', 'Back to dashboard')

      .log('On the client\'s all Agreement page, click "Support hours"')
      .get('h3')
      .contains('Nicolas English')
      .parents('app-coordinator-client-details')
      .find('button span')
      .contains('View support hours')
      .click()

      .log('On the upper right of the  Support hours page., click "Log in as <Client\'s Name>" button')
      .clickElementOnText('app-coordinator-quick-reply button', 'Log in as Nicolas')

      .log('Check client\'s Support hours page.')
      .url()
      .should('include', '/timesheet/consumer')

      .log('On the upper right corner of the page, click "Login as Coordinator".')
      .clickElementOnText('app-header button', 'Login as Coordinator')

      .log('Click Profile btn')
      .clickElement('#profileCardAvatar')

      .log('Account Settings')
      .verifyTextVisible('Account Settings')

      .log('On the left navigation pane, click "Dashboard"')
      .navigateByLeftMenuInDashboard('Dashboard')
      .url()
      .should('include', '/dashboard')

      .log('On the left navigation pane click "Search workers"')
      .navigateByLeftMenuInDashboard('Search workers')
      .verifyTextVisible('Search workers')

      .log('On the left navigation pane click "Shortlist"')
      .navigateByLeftMenuInDashboard('Shortlist')

      .log('Check shortlist page')
      .verifyTextVisible('Shortlist')

      .log('Tick the checkbox of the selected worker.')
      .clickElementOnText('app-coordinator-shortlist h2', 'NAMI S')

      .log('Click Message Workers button on the upper right of the page.')
      .clickElementOnText('app-carer-profile button', 'Contact')

      .log('Click Cancel')
      .clickElementOnText('app-select-client-dialog button', 'Cancel')

      .log('Check worker profile page.')
      .verifyTextVisible('About NAMI S')

      .log('On the left navigation pane, click Compliance')
      .navigateByLeftMenuInDashboard('Compliance')

      .log('Check Terms and Conditions page')
      .clickElementOnText('app-organisations a', 'Terms and Conditions ')

      .log('On the upper menu tab of the page, click Support worker details ')
      .clickElementOnText('app-organisations a', 'Support worker details ')

      .log('On the left navigation pane, click Account')
      .navigateByLeftMenuInDashboard('Account')
      .verifyTextVisible('Account Settings')

      .log('On the top right corner of the page click "Logout"')
      .clickLogoutOnTopMenu()
      .url()
      .should('include', '/login');
  });

  it('ES-T3590: Login as admin then coordinator then client with routings', () => {
    const AdmEmail = testData.loginWithRouting.admin.email;
    const AdmPassword = testData.loginWithRouting.admin.password;
    const email = 'automation_david.sears+coordinator.minor@donotuse.com.au';

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
      .verifyTextVisible('David Sears')

      .log('Click \'Login as\' on selected client.')
      .get('a[href="/login_as/davidse"]')
      .click()

      .log('Check client\'s dashboard.')
      .wait(3000)
      .verifyTextVisible('Dashboard')
      .verifyTextVisible('Welcome, David Sears')

      .log('On the Dashboard page, click \'Login as  <Client\'s Name>\'  button of the selected client')
      .clickElementOnText('app-coordinator-client-details button', 'Login as Nicolas')

      .log('Check client\'s Dashboard page.')
      .verifyTextVisible('Hi Nicolas')

      .log('On the left top corner of the page, click \'Account\'')
      .clickElementOnText('p span', 'Account')

      .log('Check Client\'s personal details page.')
      .verifyTextVisible('Nicolas’s personal details')

      .log('On the conversation left side of the page, click "< Back to dashboard"')
      .clickElementOnText('app-consumer-account-navigation button span', 'Back to dashboard')

      .log('On the left top corner of the page, click \'Search Workers\'')
      .navigateByLeftMenuInDashboard('Search workers')

      .log('Check \'Search Workers\' page.')
      .verifyTextVisible('Search workers')

      .log('On the left navigation pane, click \'Dashboard\'')
      .navigateByLeftMenuInDashboard('Dashboard')

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
      .verifyTextVisible('Choose the type of support you need')

      .log('On the page, click  \'Learn about the differences in how they work ')
      .clickElementOnText('app-expansion-panel h3', 'Learn about the differences in how they work')

      .log('On the page, click  \'Learn about the differences in how they work ')
      .clickElementOnText('app-expansion-panel h3', 'Learn about the differences in how they work')

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

      .log('On the left navigation pane, click Inbox')
      .navigateByLeftMenuInDashboard('Inbox')

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

      .log('On the left navigation pane, click \'Billing\'')
      .navigateByLeftMenuInDashboard('Billing')
      .verifyTextVisible('Billing')

      .log('On the upper menu tab of the current page, click \'Transactions\'')
      .clickElementOnText('.mat-tab-label-content', 'Transactions')

      .log('Click "Exports" tab')
      .clickElementOnText('.mat-tab-label-content', 'Exports')

      .log('Check exports page')
      .verifyTextVisible('Export your support hours in CSV format')
      .verifyTextVisible('Export your transaction history in CSV format')

      .log('On the upper menu tab of the current page, click \'Invoices & Receipts\'')
      .clickElementOnText('.mat-tab-label-content', 'Invoices')

      .log('On the left navigation pane, click \'Notes\'')
      .navigateByLeftMenuInDashboard('Notes')

      .log('Check Support notes page')
      .verifyTextVisible('Support notes')

      .log('On the upper right corner of the page, click "Login as Coordinator".')
      .clickElementOnText('app-header button', 'Login as Coordinator')

      .log('On the top right corner of the page click "Logout"')
      .clickLogoutOnTopMenu()
      .url()
      .should('include', '/login');
  });

  it('ES-T3592: Login as admin then org admin then client with routings', () => {
    const AdmEmail = testData.loginWithRouting.admin.email;
    const AdmPassword = testData.loginWithRouting.admin.password;
    const email = 'automation_sabrina.suarrez+org.admin@donotuse.com.au';

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
      .verifyTextVisible('Sabrina Suarezz')

      .log('Click \'Login as\' on selected client.')
      .get('a[href="/login_as/sabrinasu"]')
      .click()

      .log('Check client\'s dashboard.')
      .wait(3000)
      .verifyTextVisible('Dashboard')

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

  it('ES-T3599: Login as admin then org admin then coordinator with routings', () => {
    const AdmEmail = testData.loginWithRouting.admin.email;
    const AdmPassword = testData.loginWithRouting.admin.password;
    const email = 'automation_sabrina.suarrez+org.admin@donotuse.com.au';

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
      .verifyTextVisible('Sabrina Suarezz')

      .log('Click \'Login as\' on selected client.')
      .get('a[href="/login_as/sabrinasu"]')
      .click()

      .log('Check client\'s dashboard.')
      .wait(3000)
      .verifyTextVisible('Dashboard')

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

  it('ES-T3600: Login as admin then org admin then coordinator then client with routings', () => {
    const AdmEmail = testData.loginWithRouting.admin.email;
    const AdmPassword = testData.loginWithRouting.admin.password;
    const email = 'automation_sabrina.suarrez+org.admin@donotuse.com.au';

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
      .verifyTextVisible('Sabrina Suarezz')

      .log('Click \'Login as\' on selected org admin.')
      .get('a[href="/login_as/sabrinasu"]')
      .click()

      .log('Check client\'s dashboard.')
      .wait(3000)
      .verifyTextVisible('Dashboard')

      .log('On dashboard page, click \'Login as <Name>\' of the selected coordinator')
      .clickElementOnText('app-organisation-dashboard button', 'Login as Charmaine Cotton')

      .log('Check coordinator\'s dashboard.')
      .verifyTextVisible('Welcome, Charmaine Cotton')

      .log('On the upper right of the page, click \'Log in as <Client\'s Name>\' button')
      .clickElementOnText('app-coordinator-client-details button', 'Login as Sonny')
      .verifyTextVisible('Sonny Hackett')

      .log('On the dashboard click "Search & message workers"')
      .clickElementOnText('#callToAction span', 'Search & message workers')

      .log('Check Search workers page')
      .verifyTextVisible('Search workers')

      .log('On the left navigation pane, click "Dashboard"')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('On the dashboard click "Post a job"')
      .clickElementOnText('#callToAction span', 'Post a job')

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

      .log('Click back')
      .wait(3000)
      .go('back')

      .log('On the left navigation pane click "Search workers"')
      .navigateByLeftMenuInDashboard('Search workers')
      .verifyTextVisible('Search workers')

      .log('On the left navigation pane, click "Jobs"')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Check current jobs page')
      .verifyTextVisible('My jobs')

      .log('Click "Archived" tab')
      .clickElementOnText('.mat-tab-label-content', 'Archive')

      .log('Check archived jobs page')
      .verifyElementVisible('app-archive-jobs')

      .log('On the upper menu tab of the page, click \'Current\'')
      .clickElementOnText('.mat-tab-label-content', 'Current')

      .log('On the upper right of the page, click \'Post a job\'')
      .clickElementOnText('app-my-jobs button', 'Post a job')

      .log('Check Job Type page.')
      .verifyTextVisible('Choose job type')

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

      .log('on the left navigation pane, click Support hours')
      .navigateByLeftMenuInDashboard('Support hours')

      .log('Check client\'s Support hours page.')
      .url()
      .should('include', '/timesheet/consumer')
      .verifyTextVisible('Support hours')

      .log('On the left navigation pane, click Inbox')
      .navigateByLeftMenuInDashboard('Inbox')

      .log('Choose conversation with the worker then click conversation card')
      .clickElementOnText('app-channel-item span', 'Jacquline')

      .log('Check conversation page')
      .verifyTextVisible('Chat info')

      .log('On the upper part conversation page, click \'View profile\'')
      .clickViewProfileInChatInfo()
      .verifyTextVisible('About')

      .log('On worker profile page, click "Back" button')
      .clickElementOnText('button span', 'Back')

      .log('On the upper part conversation page, click \'Login as\'')
      .wait(3000)
      .get('button span.title')
      .contains('Login as Jacquline Dare')
      .click()

      .log('Check worker\'s dashboard page.')
      .verifyTextVisible('Welcome back Jacquline')

      .log('On the upper right corner of the page click "Login as Admin"')
      .clickElementOnText('app-header button', 'Login as Admin')

      .log('On the search textbox of the page, input the client\'s details')
      .wait(2000)
      .get('#search-users-input')
      .type(email)

      .log('Click the Search button')
      .get('.form-group #submit')
      .click()

      .log('Check the displayed result.')
      .verifyTextVisible('Sabrina Suarezz')

      .log('Click \'Login as\' on selected org admin.')
      .get('a[href="/login_as/sabrinasu"]')
      .click()

      .log('Check client\'s dashboard.')
      .wait(3000)
      .verifyTextVisible('Dashboard')

      .log('On dashboard page, click \'Login as <Name>\' of the selected coordinator')
      .clickElementOnText('app-organisation-dashboard button', 'Login as Charmaine Cotton')

      .log('Check coordinator\'s dashboard.')
      .verifyTextVisible('Welcome, Charmaine Cotton')

      .log('On the upper right of the page, click \'Log in as <Client\'s Name>\' button')
      .clickElementOnText('app-coordinator-client-details button', 'Login as Sonny')
      .verifyTextVisible('Sonny Hackett')

      .log('On the left navigation pane, click \'My support workers\'')
      .navigateByLeftMenuInDashboard('My support workers')

      .log('Check client\'s \'My Support Workers\' page')
      .wait(2000)
      .verifyTextVisible('My support workers')

      .log('On the current page, click View profile of the selected worker')
      .get('h2.workerName')
      .contains('Jacquline Dare')
      .parents('.panel')
      .find('span')
      .contains('View profile')
      .click()

      .log('On upper part of the page, click \'< Back\'')
      .get('app-back-button span')
      .contains(' Back')
      .click()

      .log('On the current page, click Provide feedback of the selected worker')
      .get('h2.workerName')
      .contains('Jacquline Dare')
      .parents('.panel')
      .find('span')
      .contains('Provide feedback')
      .click()

      .log('Check Review page.')
      .verifyTextVisible('Review Jacquline')

      .log('On upper part of the page, click \'< Back\'')
      .get('app-back-button span')
      .contains(' Back')
      .click()

      .log('On the upper menu tab of the current page, click \'Terminated\'')
      .wait(2000)
      .get('mat-tab-header div.mat-tab-label-content')
      .contains('Terminated')
      .click()

      .log('Check client\'s Terminated support workers page')
      .verifyTextExist('You don\'t have any terminated support workers.')

      .log('On the upper menu tab of the current page, click \'Active\'')
      .wait(2000)
      .get('mat-tab-header div.mat-tab-label-content')
      .contains('Active')
      .click()

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

      .log('On the page, click View profile of the selected worker')
      .get('h3')
      .contains('Toi S')
      .parents('.shortlistDetail')
      .find('a div')
      .contains('View profile')
      .click()
      .verifyTextVisible('About Toi S')

      .log('On upper part of the page, click \'< Back\'')
      .get('app-back-button span')
      .contains(' Back')
      .click()

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

      .log('On the upper right corner of the page click "Login as Admin"')
      .clickElementOnText('app-header button', 'Login as Admin')

      .log('On the top right corner of the page click "Logout"')
      .wait(3000)
      .clickLogoutOnTopMenu()
      .url()
      .should('include', '/login');
  });

  it('ES-T3591: Login as admin then org admin with routings', () => {
    const AdmEmail = testData.loginWithRouting.admin.email;
    const AdmPassword = testData.loginWithRouting.admin.password;
    const email = 'automation_sabrina.suarrez+org.admin@donotuse.com.au';

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
      .verifyTextVisible('Sabrina Suarezz')

      .log('Click \'Login as\' on selected client.')
      .get('a[href="/login_as/sabrinasu"]')
      .click()

      .log('Check client\'s dashboard.')
      .wait(3000)
      .verifyTextVisible('Dashboard')

      .log('On the upper right of the page, click Add coordinator')
      .clickElementOnText('button span', 'Add coordinator')

      .log('Check Add Coordinator page')
      .verifyTextVisible('Create Coordinator')

      .log('Click the back button of the browser.')
      .go('back')

      .log('On the upper right of the page, click Add client')
      .wait(2000)
      .clickElementOnText('app-organisation-dashboard button', 'Add client')

      .log('Check Add Client page')
      .verifyTextVisible('Client details')

      .log('On the lower part of the page, click Cancel')
      .clickElementOnText('app-add-client button', 'Cancel')

      .log('Click Profile btn')
      .clickElement('#profileCardAvatar')

      .log('Check Account Settings page')
      .verifyTextVisible('Account Settings')

      .log('On the left navigation pane, click "Dashboard"')
      .navigateByLeftMenuInDashboard('Dashboard')
      .url()
      .should('include', '/dashboard')

      .log('On the left navigation pane, click Compliance')
      .navigateByLeftMenuInDashboard('Compliance')

      .log('Check Terms and Conditions page')
      .clickElementOnText('app-organisations a', 'Terms and Conditions ')

      .log('On the upper menu tab of the page, click Support worker details ')
      .clickElementOnText('app-organisations a', 'Support worker details ')

      .log('On the left navigation pane, click Account')
      .navigateByLeftMenuInDashboard('Account')
      .verifyTextVisible('Account Settings')

      .log('On the top right corner of the page click "Logout"')
      .clickLogoutOnTopMenu()
      .url()
      .should('include', '/login');
  });
});
