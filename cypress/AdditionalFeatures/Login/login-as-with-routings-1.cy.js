import * as testData from '../../../fixtures/test-data.json';

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/')
      .byPassAuthen();
  });

  it('ES-T3437. Login as client with routing', () => {
    const clientEmail = testData.loginWithRouting.MariaClient.email;
    const clientPassword = testData.loginWithRouting.MariaClient.password;

    cy.log('Login as client')
      .loginToDashboard(clientEmail, clientPassword)

      .log('Check dashboard page')
      .url()
      .should('include', '/dashboard')

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
      .verifyTextVisible('Choose the type of support you need')

      .log('On the job types page, click "Post standard job"')
      .clickElementOnText('button span', 'Post standard job')

      .log('Check post a regular job page')
      .verifyTextVisible('Post a job')

      .log('Click Back button')
      .clickElementOnText('button span', ' Back')

      .log('Check job types page')
      .verifyTextVisible('Choose the type of support you need')

      .log('On the job types page, click "Last Minute job"')
      .clickElementOnText('button span', 'Last Minute job')

      .log('Check how last minute jobs work page')
      .verifyTextVisible('How Last Minute jobs work')

      .log('On how last minute jobs work page, click "Create a last minute job"')
      .clickElementOnText('button span', 'Create a Last Minute job')

      .log('Check post a last minute job page')
      .verifyTextVisible('Post a job')
      .verifyTextVisible('Create a Last Minute job')

      .log('On the left navigation pane, click "Dashboard"')
      .navigateByLeftMenuInDashboard('Dashboard')
      .url()
      .should('include', '/dashboard')

      .log('On the dashboard page, click "Go to profile"')
      .clickElementOnText('a span', 'Go to profile')

      .log('Check client onboarding page')
      .url()
      .should('include', '/client-account/about')
      .verifyTextVisible('About Sonny')

      .log('On client onboarding page click "Back" button')
      .clickElementOnText('span', ' Back to dashboard')
      .url()
      .should('include', '/dashboard')

      .log('Click Profile btn')
      .clickElement('#profileCardAvatar')

      .log('Check client onboarding page')
      .verifyTextVisible('personal details')

      .log('On client onboarding page click "Back" button')
      .clickElementOnText('span', ' Back to dashboard')
      .url()
      .should('include', '/dashboard')

      .log('On the left navigation pane click "Search workers"')
      .navigateByLeftMenuInDashboard('Search workers')
      .verifyTextVisible('Search workers')

      .log('Input address and click Search button.')
      .inputTextField('app-suburb-selector input', 2000, true)
      .wait(1000)
      .clickElement('.suggestions .listOption', true, 0)
      .wait(1000)
      .clickElementOnText('button span', 'Search')

      .log('Click Skip to result button.')
      .clickElementOnText('button span', 'Skip to results')

      .log('On the search result click "View profile"')
      .viewProfileOf('Bea A')

      .log('Check worker profile page')
      .verifyTextVisible('About Bea A')

      .log('On worker profile page, click "Back" button')
      .clickElementOnText('button span', 'Back')
      .verifyTextVisible('Search workers')

      .log('On the left navigation pane, click "Jobs"')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Check current jobs page')
      .verifyTextVisible('My jobs')

      .log('Choose any job and click "View details"');
    cy.xpath('(//span[contains(.,\'View details\')])[1]')
      .click();

    cy.log('Check job details page')
      .url().should('include', '/view')

      .log('On job details page, click "Back" button')
      .clickElementOnText('button span', 'Back')
      .verifyTextVisible('My jobs')

      .log('Click "Archived" tab')
      .clickElementOnText('.mat-tab-label-content', 'Archive')

      .log('Check archived jobs page')
      .verifyElementVisible('app-archive-jobs')

      .log('On the right corner of the screen, click "Post a job" button')
      .clickElementOnText('button', ' Post a job ')
      .verifyTextVisible('Choose the type of support you need')

      .log('On the left navigation pane, click "Support hours"')
      .navigateByLeftMenuInDashboard('Support hours')

      .log('Check Support hours page')
      .verifyTextVisible('Support hours')

      .log('On shift to approve area, click "Details"')
      .clickElementOnText('button.link', 'Details')

      .log('On the modal pop up, click "View agreement"')
      .clickElementOnText('button a', 'View agreement')
      .verifyTextVisible('Agreement with')

      .log('On the left navigation pane, click "Inbox"')
      .navigateByLeftMenuInDashboard('Inbox')

      .log('Check inbox page')
      .verifyTextVisible('Inbox')

      .log('Choose conversation with the worker then click conversation card')
      .clickElementOnText('app-channel-item', 'Jacquline D')

      .log('Check conversation page')
      .verifyTextVisible('Chat info')

      .log('On the left navigation pane, click "My support workers"')
      .navigateByLeftMenuInDashboard('My support workers')

      .log('Check agreement list page')
      .verifyTextVisible('My support workers')

      .log('On agreement details page, on support worker section, click "View profile"');
    cy.xpath('(//span[contains(.,\'View agreement\')])[3]')
      .click();

    cy.log('Check agreement details page')
      .verifyTextVisible('Agreement with')

      .log('On agreement details page, on support worker section, click "View profile"')
      .clickElementOnText('#supportWorker a', 'View profile ')
      .verifyTextVisible('About')

      .log('On worker profile page, click "Back" button')
      .clickElementOnText('button span', 'Back')

      .log('On agreement details page, on account holder section, click "View profile"')
      .clickElementOnText('#accountHolder a', 'View profile ')
      .verifyTextVisible('Account Holder Details')

      .log('On the left navigation pane, click "My support workers"')
      .navigateByLeftMenuInDashboard('My support workers')

      .log('On agreement list page, click "Terminated" tab')
      .clickElementOnText('.mat-tab-label-content', 'Terminated')

      .log('Check terminated agreement page')
      .verifyTextVisible('You don\'t have any terminated support workers.')

      .log('On the left navigation pane, click "Invite worker"')
      .navigateByLeftMenuInDashboard('Invite worker')

      .log('Check invite worker page')
      .verifyTextVisible('Enter the details of someone you’d like to invite to your team')

      .log('On the left navigation pane click "Shortlist"')
      .navigateByLeftMenuInDashboard('Shortlist')

      .log('Check shortlist page')
      .verifyTextVisible('Shortlist')

      .log('Choose worker to send a message by clicking "Send message"');
    cy.xpath('//h3[contains(.,\'Midoriya I\')]/ancestor::a/following-sibling::ul//div[contains(.,\'Send message\')]')
      .click();

    cy.log('Check Conversation starter page')
      .verifyTextVisible('Conversation starter')

      .log('On the left navigation pane click "Shortlist"')
      .navigateByLeftMenuInDashboard('Shortlist')

      .log('Choose worker and view profile by clicking "View profile"');
    cy.xpath('//h3[contains(.,\'Midoriya I\')]/ancestor::a/following-sibling::ul//div[contains(.,\'View profile\')]')
      .click();
    cy.verifyTextVisible('About Midoriya I')

      .log('On worker profile page, click "Back" button')
      .clickElementOnText('button span', 'Back')

      .log('On the left navigation pane click "Shortlist"')
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

      .log('Check Support notes page')
      .verifyTextVisible('Support notes')
      .verifyElementVisible('app-shift-notes table tbody tr')

      .log('On the top right corner of the page click "Logout"')
      .clickLogoutOnTopMenu()
      .url()
      .should('include', '/login');
  });

  it('ES-T3469: Login as worker with routing', () => {
    const workerEmail = testData.loginWithRouting.MariaWorker.email;
    const workerPassword = testData.loginWithRouting.MariaWorker.password;

    cy.log('Login as worker')
      .loginToDashboard(workerEmail, workerPassword)

      .log('Check dashboard page')
      .url()
      .should('include', '/dashboard')

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

  it('ES-T3520: Login as coordinator with routing', () => {
    const coordinatorEmail = testData.loginWithRouting.DavidCoordinator.email;
    const coordinatorPassword = testData.loginWithRouting.DavidCoordinator.password;

    cy.log('Login as coordinator')
      .loginToDashboard(coordinatorEmail, coordinatorPassword)

      .log('Check dashboard page')
      .url()
      .should('include', '/dashboard')

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

  it('ES-T3534: Login as coordinator then client with routing', () => {
    const coordinatorEmail = testData.loginWithRouting.DavidCoordinator.email;
    const coordinatorPassword = testData.loginWithRouting.DavidCoordinator.password;

    cy.log('Login as coordinator')
      .loginToDashboard(coordinatorEmail, coordinatorPassword)

      .log('Check dashboard page')
      .url()
      .should('include', '/dashboard')

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

  it('ES-T3535: Login as org admin with routings', () => {
    const orgAdmEmail = testData.loginWithRouting.sabrinaOrgAdmin.email;
    const orgAdmPassword = testData.loginWithRouting.sabrinaOrgAdmin.password;

    cy.log('Login as org admin')
      .loginToDashboard(orgAdmEmail, orgAdmPassword)

      .log('Check dashboard page')
      .url()
      .should('include', '/dashboard')

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
