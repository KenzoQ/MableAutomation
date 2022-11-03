/* eslint-disable no-multiple-empty-lines */
import faker from 'faker/locale/en_AU';
import * as data from '../../../fixtures/test-data.json';

describe('View worker profile', () => {
  const detherEmail = 'automation_dether.ocampo.account+client@donotuse.com.au';

  const adminEmail = data.dashboardAccount.adminAccount.email;
  const adminPass = data.dashboardAccount.adminAccount.password;
  const coordinatorEmail = 'automation_arthur.stone.searchworkers+coordinator@donotuse.com.au';
  const coordinatorPassword = 'qaAutomation2021';

  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const newWorkerEmail = `automation_${firstName.toLowerCase()}_${Date.now()}.onboardingapi+worker@donotuse.com.au`;
  const newWorkerPass = 'qaAutomation2021';

  before(() => {
    cy
      .createWorkerAccountAPI(
        newWorkerEmail,
        newWorkerPass,
        firstName,
        lastName,
      );
  });

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it('ES-T3418. Coordinator Managed', () => {
    // we login coordinatorEmail
    // then we login as Coordinator Managed: Bartholomew

    cy.log(`login ${coordinatorEmail}`)
      .loginToDashboard(coordinatorEmail, coordinatorPassword)

      .verifyTextExist('Welcome')
      .clickElementOnText('button', 'Login as Bartholomew')

      .log('ES-T3403. Pending agreements')
      .log('On dashboard page, click the My support workers')
      .navigateByLeftMenuInDashboard('My support workers')

      .verifyTextExist('My support workers')
      .verifyCurrentURL('/my-support-workers')

      .verifyElementContainsText('div[role="tab"].mat-tab-label-active', 'Active')

      .log('Select the Pending tab.')
      .clickElementOnText('.mat-tab-label-content', 'Pending')
      .verifyElementExist('app-support-workers-list')
      .verifyElementExist('app-support-workers-list div.panel.ng-star-inserted')

      .log('Choose a worker and click the View profile button')
      .clickElementOnTextWithPosition('button span', 'View profile', 0)
      .verifyListTextExistNoWaitV2(['About', 'Availability', 'Services offered', 'Indicative rates', 'Mable verified', 'Work locations', 'More information', 'Interested in engaging'])

      .log('ES-T3402. Search & message workers')
      .log('On dashboard page, click Search Workers button')
      .navigateByLeftMenuInDashboard('Search workers')

      .log('Enter location using suburb or postcode to search workers and click Search button')
      .searchWorkersByOnlySuburbV2('2000', 0)

      .log('Choose a worker and click the View profile button')
      .verifyTextExist('Results')
      .clickElementOnTextWithPosition('button', 'View profile', 0, 2000)

      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information')

      .log('ES-T3404. Search workers')
      .log('On the left navigation pane, click "Search Workers"')
      .navigateByLeftMenuInDashboard('Search workers')

      .verifyTextExist('Search workers')
      .verifyCurrentURL('/workers')

      .log('Enter location using suburb or postcode to search workers and click Search button')
      .searchWorkersByOnlySuburbV2('2148', 1)

      .log('Choose a worker and click the \'View profile\' button')
      .verifyTextExist('Results')
      .clickElementOnTextWithPosition('button', 'View profile', 0, 2000)

      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information')
      .verifyTextExist('Interested in engaging')

    // can't reproduce
    // .log('ES-T3406. My jobs - Regular with replies')
    // .log('On dashboard page, left side panel, click \'Jobs\' page')
    // .navigateByLeftMenuInDashboard('Jobs')

    // .verifyTextExist('My jobs')
    // .url()
    // .should('include', '/jobs')

    // .log('Click a regular job post that has replies from workers')
    // .visit('jobs/view/15385')

    // .log('On Replies section, choose a worker and click \'View profile\' button')
    // .clickElementOnText('a', 'View profile ')
    // .url()
    // .should('include', '/profile/worker')
    // .verifyTextExist('About')
    // .verifyTextExist('Availability')
    // .verifyTextExist('Services offered')
    // .verifyTextExist('Indicative rates')
    // .verifyTextExist('Mable verified')
    // .verifyTextExist('Experience')
    // .verifyTextExist('Work locations')
    // .verifyTextExist('More information')

    // can't reproduce
    // .log('ES-T3407. My jobs - Contact these workers')
    // .log('On dashboard page, left side panel, click \'Jobs\' page')
    // .navigateByLeftMenuInDashboard('Jobs')

    // .verifyTextExist('My jobs')
    // .url()
    // .should('include', '/jobs')

    // .log('Click a regular job post that has replies from workers')
    // .visit('jobs/view/16034')

    // .log('On Contact section, choose a worker and click \'View profile\' button')
    // .clickElementOnText('a', 'View profile ')
    // .url()
    // .should('include', '/profile/worker')
    // .verifyTextExist('About')
    // .verifyTextExist('Availability')
    // .verifyTextExist('Services offered')
    // .verifyTextExist('Indicative rates')
    // .verifyTextExist('Mable verified')
    // .verifyTextExist('Experience')
    // .verifyTextExist('Work locations')
    // .verifyTextExist('More information')

      .log('ES-T3410. Active agreement via My support workers')
      .log('On the left navigation pane, click "My support workers"')
      .navigateByLeftMenuInDashboard('My support workers')

      .verifyTextExist('My support workers')
      .verifyCurrentURL('/my-support-workers')

      .verifyElementExist('app-support-workers-list div.panel.ng-star-inserted')

      .log('On active tab, choose a worker and click \'View profile\' button')
      .clickElementOnTextWithPosition('span', 'View profile', 0)
      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information')

      .log('Click Back button ')
      .go('back')
      .wait(2000)

      .log('On active tab, choose a worker and click \'View agreement\' button')
      .clickElementOnTextWithPosition('span', 'View agreement', 0)
      .verifyTextExist('Agreement with')

      .log('On Support worker section on the right side of page, click \'View profile\' button')
      .clickElementOnTextWithPosition('a.viewProfile', 'View profile ', 0)

      .verifyCurrentURL('/profile/worker')
      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information')

      .log('ES-T3411. Terminated agreement via My support workers')
      .log('On the left navigation pane, click "My support workers"')
      .navigateByLeftMenuInDashboard('My support workers')

      .verifyTextExist('My support workers')
      .verifyCurrentURL('/my-support-workers')

      .verifyElementExist('app-support-workers-list div.panel.ng-star-inserted')

      .log('Click Terminated tab')
      .clickElementOnText('.mat-tab-label-content', 'Terminated')
      .verifyElementExist('app-support-workers-list')
      .verifyElementExist('app-support-workers-list div.panel.ng-star-inserted')

      .log('On terminated tab, choose a worker and click the \'View agreement\' button')
      .clickElementOnTextWithPosition('span', 'View agreement', 0)
      .verifyTextExist('Terminated Agreement with')
      .verifyCurrentURL('/agreement/view')

      .log('Click back button')
      .go('back')
      .wait(2000)

      .log('Click Terminated tab')
      .clickElementOnText('.mat-tab-label-content', 'Terminated')
      .verifyElementExist('app-support-workers-list')
      .verifyElementExist('app-support-workers-list div.panel.ng-star-inserted')

      .log('Choose a worker and click \'View profile\' button')
      .clickElementOnTextWithPosition('span', 'View profile', 0)
      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information')

      .log('ES-T3412. Invite new worker, approved')
      .log('On dashboard page, left side panel, click \'Invite workers\' page')
      .navigateByLeftMenuInDashboard('Invite workers')
      .verifyTextExist('Invited workers')
      .verifyCurrentURL('/invite')

      .log('Click \'Invite new worker\' button')
      .clickElementOnText('button span', 'Invite new worker')

      .log('Enter the details according to the fields')
      .inputTextField('input[formcontrolname="firstName"]', firstName)
      .inputTextField('input[formcontrolname="lastName"]', lastName)
      .inputTextField('input[formcontrolname="email"]', newWorkerEmail)

      .log('Click Invite button')
      .clickElementOnText('button', 'Invite')
      .verifyTextExist('Great news!')

      .log('Click "Ok, got it" button from the modal')
      .clickElementOnText('button', 'OK, got it')

    // This function has been removed
    // .log('ES-T3413. Workers you have invited, approved')
    // .log('On dashboard page, left side panel, click \'Invite workers\' page')
    // .navigateByLeftMenuInDashboard('Invite workers')
    // .verifyTextExist('Invited workers')
    // .url()
    // .should('include', '/invite')

    // eslint-disable-next-line max-len
    // .log('On \'Workers you have invited\' section, choose a worker that has accepted status. Click the worker name')
    // .clickElementOnText('a', ' Rochelle Victoria ')
    // .verifyTextExist('About')
    // .verifyTextExist('Availability')
    // .verifyTextExist('Indicative rates')
    // .verifyTextExist('Work locations')
    // .verifyTextExist('More information')

      .log('ES-T3414. Shortlist, approved')
      .log('On dashboard page, left side panel, click \'Shortlist\' button')
      .navigateByLeftMenuInDashboard('Shortlist')
      .verifyTextExist('Shortlist')
      .verifyCurrentURL('/shortlist')

      .log('Choose a worker and click \'View profile\' button')
      .clickElementOnTextWithPosition('div', 'View profile', 0)
      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information');
  });

  it.skip('ES-T3466. View Support Worker Profile, login as a coordinator', () => {
    cy.log(`login ${adminEmail}`)
      .loginToDashboard(adminEmail, adminPass)

      .verifyTextExist('Users')
      .clickElement('a[id="show-coord"]')

      .log('Select a coordinator and click the Login as')
      .inputTextField('input[id="search-users-input"]', coordinatorEmail)
      .clickElement('input[type="submit"]')
      .wait(2000)
      .clickElementOnText('a', 'Login as')

      .log('ES-T3402. Search & message workers')
      .log('On dashboard page, click Search Workers button')
      .navigateByLeftMenuInDashboard('Search workers')

      .log('Enter location using suburb or postcode to search workers and click Search button')
      .inputTextField('input[id="searchInput"]', 2000)
      .type('{enter}')

      .log('Choose a worker and click the View profile button')
      .clickElementOnTextWithPosition('button', 'View profile', 0)

      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information')

      .log('ES-T3403. Pending agreements')
      .log('On dashboard page, click the My support workers')
      .navigateByLeftMenuInDashboard('My support workers')

      .verifyTextExist('My support workers')
      .url()
      .should('include', '/my-support-workers')

      .log('Click <Pending> tab')
      .clickElementOnText('.mat-tab-label-content', 'Pending')
      .verifyElementExist('app-support-workers-list')
      .verifyElementExist('app-support-workers-list div.panel.ng-star-inserted')

      .log('Choose a worker and click the \'View profile\' button')
      .clickElementOnTextWithPosition('span', 'View profile', 0)
      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information')

      .log('ES-T3404. Search workers')
      .log('On the left navigation pane, click "Search Workers"')
      .navigateByLeftMenuInDashboard('Search workers')

      .verifyTextExist('Search workers')
      .url()
      .should('include', '/workers')

      .log('Enter location using suburb or postcode to search workers and click Search button')
      .clickElementOnText('button span', 'Search')
      .clickElementOnText('button span', 'Skip to results')
      .verifyTextExist('Search workers')

      .log('Choose a worker and click the \'View profile\' button')
      .clickElementOnTextWithPosition('button', 'View profile', 0)
      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information')

      .log('ES-T3406. My jobs - Regular with replies')
      .log('On dashboard page, left side panel, click \'Jobs\' page')
      .navigateByLeftMenuInDashboard('Jobs')

      .verifyTextExist('My jobs')
      .url()
      .should('include', '/jobs')

      .log('Click a regular job post that has replies from workers')
      .visit('jobs/view/15385')

      .log('On Replies section, choose a worker and click \'View profile\' button')
      .clickElementOnText('a', 'View profile ')
      .url()
      .should('include', '/profile/worker')
      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Services offered')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Mable verified')
      .verifyTextExist('Experience')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information')

      .log('ES-T3407. My jobs - Contact these workers')
      .log('On dashboard page, left side panel, click \'Jobs\' page')
      .navigateByLeftMenuInDashboard('Jobs')

      .verifyTextExist('My jobs')
      .url()
      .should('include', '/jobs')

      .log('Click a regular job post that has replies from workers')
      .visit('jobs/view/16034')

      .log('On Contact section, choose a worker and click \'View profile\' button')
      .clickElementOnText('a', 'View profile ')
      .url()
      .should('include', '/profile/worker')
      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Services offered')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Mable verified')
      .verifyTextExist('Experience')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information')

      .log('ES-T3410. Active agreement via My support workers')
      .log('On the left navigation pane, click "My support workers"')
      .navigateByLeftMenuInDashboard('My support workers')

      .verifyTextExist('My support workers')
      .url()
      .should('include', '/my-support-workers')

      .verifyElementExist('app-support-workers-list div.panel.ng-star-inserted')

      .log('On active tab, choose a worker and click \'View profile\' button')
      .clickElementOnTextWithPosition('span', 'View profile', 0)
      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information')

      .log('Click Back button ')
      .go('back')
      .wait(2000)

      .log('On active tab, choose a worker and click \'View agreement\' button')
      .clickElementOnTextWithPosition('span', 'View agreement', 0)
      .verifyTextExist('Agreement with')

      .log('On Support worker section on the right side of page, click \'View profile\' button')
      .clickElementOnText('a.viewProfile', 'View profile ')

      .url()
      .should('include', '/profile/worker')
      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information')

      .log('ES-T3411. Terminated agreement via My support workers')
      .log('On the left navigation pane, click "My support workers"')
      .navigateByLeftMenuInDashboard('My support workers')

      .verifyTextExist('My support workers')
      .url()
      .should('include', '/my-support-workers')

      .verifyElementExist('app-support-workers-list div.panel.ng-star-inserted')

      .log('Click Terminated tab')
      .clickElementOnText('.mat-tab-label-content', 'Terminated')
      .verifyElementExist('app-support-workers-list')
      .verifyElementExist('app-support-workers-list div.panel.ng-star-inserted')

      .log('On terminated tab, choose a worker and click the \'View agreement\' button')
      .clickElementOnTextWithPosition('span', 'View agreement', 0)
      .verifyTextExist('Terminated Agreement with')
      .url()
      .should('include', '/agreement/view')

      .log('Click back button')
      .go('back')
      .wait(2000)

      .log('Click Terminated tab')
      .clickElementOnText('.mat-tab-label-content', 'Terminated')
      .verifyElementExist('app-support-workers-list')
      .verifyElementExist('app-support-workers-list div.panel.ng-star-inserted')

      .log('Choose a worker and click \'View profile\' button')
      .clickElementOnTextWithPosition('span', 'View profile', 0)
      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information')

      .log('ES-T3413. Workers you have invited, approved')
      .log('On dashboard page, left side panel, click \'Invite workers\' page')
      .navigateByLeftMenuInDashboard('Invite workers')
      .verifyTextExist('Invited workers')
      .url()
      .should('include', '/invite')

      .log('On \'Workers you have invited\' section, choose a worker that has accepted status. Click the worker name')
      .clickElementOnText('a', ' Ji Hyun Jun ')
      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information')

      .log('ES-T3414. Shortlist, approved')
      .log('On dashboard page, left side panel, click \'Shortlist\' button')
      .navigateByLeftMenuInDashboard('Shortlist')
      .verifyTextExist('Shortlist')
      .url()
      .should('include', '/shortlist')

      .log('Choose a worker and click \'View profile\' button')
      .clickElementOnTextWithPosition('div', 'View profile', 0)
      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information')

      .log('ES-T3414. Shortlist, approved')
      .log('On dashboard page, left side panel, click \'Shortlist\' button')
      .navigateByLeftMenuInDashboard('Shortlist')
      .verifyTextExist('Shortlist')
      .url()
      .should('include', '/shortlist')

      .log('Choose a worker and click \'View profile\' button')
      .clickElementOnTextWithPosition('div', 'View profile', 0)
      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information');
  });

  it.skip('ES-T3465. View Support Worker Profile, login as a client', () => {
    cy.log('Login as admin')
      .loginToDashboard(adminEmail, adminPass)

      .log('On Manage users page, click the Customers tab')
      .clickElement('a[id="show-customer"]')

      .log('Select a support worker and click the Login as')
      .inputTextField('input[id="search-users-input"]', detherEmail)
      .clickElement('input[type="submit"]')
      .wait(2000)
      .clickElementOnText('a', 'Login as')

      .log('ES-T3402. Search & message workers')
      .verifyTextExist('Find support')
      .log('Click search')
      .clickElementOnText('a span', 'Search & message workers')

      .verifyTextExist('Search workers')
      .url()
      .should('include', '/workers')

      .log('Enter location using suburb or postcode to search workers and click Search button')
      .clickElementOnText('button span', 'Search')
      .clickElementOnText('button span', 'Skip to results')
      .verifyTextExist('Search workers')

      .log('Choose a worker and click the \'View profile\' button')
      .clickElementOnTextWithPosition('button', 'View profile', 0)
      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information')

      .log('ES-T3403. Pending agreements')
      .log('On dashboard page, click the My support workers')
      .navigateByLeftMenuInDashboard('My support workers')

      .verifyTextExist('My support workers')
      .url()
      .should('include', '/my-support-workers')

      .log('Click <Pending> tab')
      .clickElementOnText('.mat-tab-label-content', 'Pending')
      .verifyElementExist('app-support-workers-list')
      .verifyElementExist('app-support-workers-list div.panel.ng-star-inserted')

      .log('Choose a worker and click the \'View profile\' button')
      .clickElementOnTextWithPosition('span', 'View profile', 0)
      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information')

      .log('ES-T3404. Search workers')
      .log('On the left navigation pane, click "Search Workers"')
      .navigateByLeftMenuInDashboard('Search workers')

      .verifyTextExist('Search workers')
      .url()
      .should('include', '/workers')

      .log('Enter location using suburb or postcode to search workers and click Search button')
      .clickElementOnText('button span', 'Search')
      .clickElementOnText('button span', 'Skip to results')
      .verifyTextExist('Search workers')

      .log('Choose a worker and click the \'View profile\' button')
      .clickElementOnTextWithPosition('button', 'View profile', 0)
      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information')

      .log('ES-T3406. My jobs - Regular with replies')
      .log('On dashboard page, left side panel, click \'Jobs\' page')
      .navigateByLeftMenuInDashboard('Jobs')

      .verifyTextExist('My jobs')
      .url()
      .should('include', '/jobs')

      .log('Click a regular job post that has replies from workers')
      .visit('jobs/view/15385')

      .log('On Replies section, choose a worker and click \'View profile\' button')
      .clickElementOnText('a', 'View profile ')
      .url()
      .should('include', '/profile/worker')
      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Services offered')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Mable verified')
      .verifyTextExist('Experience')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information')

      .log('ES-T3407. My jobs - Contact these workers')
      .log('On dashboard page, left side panel, click \'Jobs\' page')
      .navigateByLeftMenuInDashboard('Jobs')

      .verifyTextExist('My jobs')
      .url()
      .should('include', '/jobs')

      .log('Click a regular job post that has replies from workers')
      .visit('jobs/view/16034')

      .log('On Contact section, choose a worker and click \'View profile\' button')
      .clickElementOnText('a', 'View profile ')
      .url()
      .should('include', '/profile/worker')
      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Services offered')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Mable verified')
      .verifyTextExist('Experience')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information')

      .log('ES-T3408. Active agreement via activity feed')
      .log('On dashboard page, left side panel, click \'Inbox\' page')
      .navigateByLeftMenuInDashboard('Inbox')

      .verifyTextExist('Inbox')
      .url()
      .should('include', '/inbox')

      .log('Choose a worker that you have conversation with')
      .clickElementOnText('span.title', 'Tae Hee')
      .wait(2000)
      .verifyTextExist('Chat info')
      .verifyTextExist('Tae Hee K')

      .log('ES-T3410. Active agreement via My support workers')
      .log('On the left navigation pane, click "My support workers"')
      .navigateByLeftMenuInDashboard('My support workers')

      .verifyTextExist('My support workers')
      .url()
      .should('include', '/my-support-workers')

      .verifyElementExist('app-support-workers-list div.panel.ng-star-inserted')

      .log('On active tab, choose a worker and click \'View profile\' button')
      .clickElementOnTextWithPosition('span', 'View profile', 0)
      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information')

      .log('Click Back button ')
      .go('back')
      .wait(2000)

      .log('On active tab, choose a worker and click \'View agreement\' button')
      .clickElementOnTextWithPosition('span', 'View agreement', 0)
      .verifyTextExist('Agreement with')

      .log('On Support worker section on the right side of page, click \'View profile\' button')
      .clickElementOnText('a.viewProfile', 'View profile ')

      .url()
      .should('include', '/profile/worker')
      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information')

      .log('ES-T3411. Terminated agreement via My support workers')
      .log('On the left navigation pane, click "My support workers"')
      .navigateByLeftMenuInDashboard('My support workers')

      .verifyTextExist('My support workers')
      .url()
      .should('include', '/my-support-workers')

      .verifyElementExist('app-support-workers-list div.panel.ng-star-inserted')

      .log('Click Terminated tab')
      .clickElementOnText('.mat-tab-label-content', 'Terminated')
      .verifyElementExist('app-support-workers-list')
      .verifyElementExist('app-support-workers-list div.panel.ng-star-inserted')

      .log('On terminated tab, choose a worker and click the \'View agreement\' button')
      .clickElementOnTextWithPosition('span', 'View agreement', 0)
      .verifyTextExist('Terminated Agreement with')
      .url()
      .should('include', '/agreement/view')

      .log('Click back button')
      .go('back')
      .wait(2000)

      .log('Click Terminated tab')
      .clickElementOnText('.mat-tab-label-content', 'Terminated')
      .verifyElementExist('app-support-workers-list')
      .verifyElementExist('app-support-workers-list div.panel.ng-star-inserted')

      .log('Choose a worker and click \'View profile\' button')
      .clickElementOnTextWithPosition('span', 'View profile', 0)
      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information')

    // .log('ES-T3412. Invite new worker, approved')
    // .log('On dashboard page, left side panel, click \'Invite workers\' page')
    // .navigateByLeftMenuInDashboard('Invite workers')
    // .verifyTextExist('Invited workers')
    // .url()
    // .should('include', '/invite')

    // .log('Click \'Invite new worker\' button')
    // .clickElementOnText('button span','Invite new worker')

    // .log('Enter the details according to the fields')
    // .inputTextField('input[formcontrolname="firstName"]', TaeHeeKimFirstName)
    // .inputTextField('input[formcontrolname="lastName"]', TaeHeeKimLastName)
    // .inputTextField('input[formcontrolname="email"]', TaeHeeKimEmail)

      .log('ES-T3413. Workers you have invited, approved')
      .log('On dashboard page, left side panel, click \'Invite workers\' page')
      .navigateByLeftMenuInDashboard('Invite workers')
      .verifyTextExist('Invited workers')
      .url()
      .should('include', '/invite')

      .log('On \'Workers you have invited\' section, choose a worker that has accepted status. Click the worker name')
      .clickElementOnText('a', ' Ji Hyun Jun ')
      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information')

      .log('ES-T3414. Shortlist, approved')
      .log('On dashboard page, left side panel, click \'Shortlist\' button')
      .navigateByLeftMenuInDashboard('Shortlist')
      .verifyTextExist('Shortlist')
      .url()
      .should('include', '/shortlist')

      .log('Choose a worker and click \'View profile\' button')
      .clickElementOnTextWithPosition('div', 'View profile', 0)
      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information')

      .log('ES-T3428. Workers you have invited, unapproved')
      .log('On dashboard page, left side panel, click \'Invite workers\' page')
      .navigateByLeftMenuInDashboard('Invite workers')
      .verifyTextExist('Invited workers')
      .url()
      .should('include', '/invite')

      .log('On \'Workers you have invited\' section, choose a worker that has accepted status. Click the worker name')
      .clickElementOnText('a', 'Mario Maurer-NDISPending')
      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information')

      .log('ES-T3429. Shortlist, unapproved')
      .log('On dashboard page, left side panel, click \'Shortlist\' button')
      .navigateByLeftMenuInDashboard('Shortlist')
      .verifyTextExist('Shortlist')
      .url()
      .should('include', '/shortlist')

      .log('Choose a worker and click \'View profile\' button')
      .clickElementOnTextWithPosition('div', 'View profile', 0)
      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information')

      .log('ES-T3430. My conversations, approved')
      .log('On dashboard page, left side panel, click \'Inbox\' page')
      .navigateByLeftMenuInDashboard('Inbox')
      .verifyTextExist('Inbox')

      .log('Choose a worker to open the conversation')
      .clickElementOnText('span', 'Lizzy')
      .wait(2000)

      .log('Click the Information icon (the i button)')
      .verifyTextExist('Chat info')
      .verifyTextExist('Contact')
      .clickElementOnText('span', 'View profile')

      .verifyTextExist('Contact')
      .verifyTextExist('About')
      .verifyTextExist('Services offered')
      .verifyTextExist('Mable verified')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information')

      .log('ES-T3431. My conversations, unapproved')
      .log('On the left navigation pane, click "Inbox"')
      .navigateByLeftMenuInDashboard('Inbox')

      .verifyTextExist('Inbox')
      .url()
      .should('include', '/inbox')

      .log('Choose a worker to open the conversation')
      .clickElementOnText('span.title', 'Mario')
      .wait(2000)
      .verifyTextExist('Chat info')
      .verifyTextExist('Mario M')

      .log('If Chat info is not yet showing, click the i icon to show it.')
      .verifyTextExist(' Enrolled Nurse / Personal Carer / Social Support & Domestic Assistant / Allied Health Professional (Occupational Therapist / Physiotherapist / Speech Pathologist)')
      .verifyTextExist('Contact')
      .verifyTextExist('View profile')

      .log('Click the \'View profile\' button')
      .clickElementOnText('span.title', 'View profile')
      .verifyTextExist('About Mario M')
      .verifyTextExist('Availability')
      .verifyTextExist('Qualifications')
      .verifyTextExist('Services offered')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Mable verified')
      .verifyTextExist('Badges')
      .verifyTextExist('Experience')
      .verifyTextExist('More information');
  });
});
