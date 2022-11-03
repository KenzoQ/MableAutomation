/* eslint-disable no-multiple-empty-lines */
// import faker from 'faker/locale/en_AU';

describe('View worker profile', () => {
  const galgadotEmail = 'automation_erika.galgadot+experience+sw@donotuse.com.au';
  const galgadotName = 'Gal';
  const ryanreynoldsEmail = 'automation_erika.ryanreynolds+experience+sw@donotuse.com.au';
  const ryanreynoldsName = 'Ryan';
  const dwaynejohnsonEmail = 'automation_erika.dwaynejohnson+experience+sw@donotuse.com.au';
  const dwaynejohnsonName = 'Dwayne';
  const clientEmail = 'automation_lorenz.careexp+client@donotuse.com.au';
  const kenzoNDISEmail = 'automation_kenzo.ndis+sw@donotuse.com.au';
  const kenzoNDISName = 'Haldrin';
  const detherEmail = 'automation_dether.ocampo.account+client@donotuse.com.au';
  // const TaeHeeKimEmail = 'automation_kim.taehee.jobagreement+worker@donotuse.com.au';
  // const TaeHeeKimFirstName = 'TaeHee';
  // const TaeHeeKimLastName = 'Kim';

  const mainExpContent = 'Enter your main experience areas.';
  const proExpContent = 'Enter your professional and personal experience.';
  const defaultPassword = 'qaAutomation2021';
  const suburb1 = 'Victoria 0852';
  const suburb2 = 'South Arm 7022';
  const suburb3 = 'Wallaroo 4702';
  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it('ES-T3643. Empty states for view profile - as a client', () => {
    cy
      .log(`login ${clientEmail}`)
      .loginToDashboard(clientEmail, defaultPassword)

      .navToWorkerBySuburb(suburb1, galgadotName)
      .VerifyWorkerExpFromClient(['professional experience',
        'hasn’t entered a full description of their experience yet.'])


      .navToWorkerBySuburb(suburb2, ryanreynoldsName)
      .verifyElementNotExist('#careExperience')

      .navToWorkerBySuburb(suburb3, dwaynejohnsonName)
      .VerifyWorkerExpFromClient(['professional experience',
        'hasn’t entered a full description of their experience yet.']);
  });

  it('ES-T3650. Empty states for view profile - as a worker', () => {
    cy
      .loginAccountAndCheckExperienceBasic(galgadotEmail, defaultPassword, mainExpContent)
      .verifyTextVisible('professional experience')

      .log('On the top right corner of the page click "Logout"')
      .clickLogoutOnTopMenu()
      .url()
      .should('include', '/login')

      .loginAccountAndCheckExperienceBasic(ryanreynoldsEmail, defaultPassword, proExpContent)

      .log('On the top right corner of the page click "Logout"')
      .clickLogoutOnTopMenu()
      .url()
      .should('include', '/login')

      .loginAccountAndCheckExperienceBasic(dwaynejohnsonEmail, defaultPassword, mainExpContent)
      .verifyTextVisible('professional experience');
  });

  it('ES-T3396. Preview profile', () => {
    cy.log(`login ${kenzoNDISEmail}`)
      .loginToDashboard(kenzoNDISEmail, defaultPassword)

      .log('Click Edit Profile')
      .clickElementOnTextWithPosition('#profileCardSection span', 'Edit profile', 0)

      .log('Click Preview Profile')
      .clickElementOnText('button span', 'Preview profile')
      .verifyTextExist(`${kenzoNDISName}`)
      .verifyTextExist('Availability')
      .verifyTextExist('Qualifications')
      .verifyTextExist('Services offered')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Mable verified')
      .verifyTextExist('Experience')
      .verifyTextExist('Work and education history')
      .verifyTextExist('More information');
  });

  it('ES-T1244. Check worker details in active tab', () => {
    cy.log(`login ${detherEmail}`)
      .loginToDashboard(detherEmail, defaultPassword)

      .log('On the left navigation pane, click "My support workers"')
      .navigateByLeftMenuInDashboard('My support workers')

      .verifyTextExist('My support workers')
      .url()
      .should('include', '/my-support-workers')

      .verifyElementExist('app-support-workers-list div.panel.ng-star-inserted')

      .log('Check details of support worker')
      .verifyElementExist('h2.workerName')
      .verifyElementExist('app-icon[label="phone number"]')
      .verifyTextExist('View agreement')
      .verifyTextExist('Send message')
      .verifyTextExist('View profile')
      .verifyTextExist('Provide feedback');
  });

  it('ES-T1245. Check worker details in terminated tab', () => {
    cy.log(`login ${detherEmail}`)
      .loginToDashboard(detherEmail, defaultPassword)

      .log('On the left navigation pane, click "My support workers"')
      .navigateByLeftMenuInDashboard('My support workers')

      .verifyTextExist('My support workers')
      .url()
      .should('include', '/my-support-workers')

      .verifyElementExist('app-support-workers-list div.panel.ng-star-inserted')

      .log('Click <Terminated> tab')
      .clickElementOnText('.mat-tab-label-content', 'Terminated')
      .verifyElementExist('app-support-workers-list')

      .log('Verify list of support workers should be displayed')
      .verifyElementExist('app-support-workers-list div.panel.ng-star-inserted')
      .verifyElementExist('h2.workerName')
      .verifyTextExist('View agreement')
      .verifyTextExist('Send message')
      .verifyTextExist('View profile')
      .verifyTextExist('Provide feedback');
  });

  it('ES-T3431. My conversations, unapproved', () => {
    cy.log(`login ${detherEmail}`)
      .loginToDashboard(detherEmail, defaultPassword)

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

  // outdated
  it('ES-T3417. Client Managed', () => {
    cy.log(`login ${detherEmail}`)
      .loginToDashboard(detherEmail, defaultPassword)

      .log('ES-T3402. Search & message workers')
      .log('Click search')
      .clickElementOnText('span', 'Search & message workers')

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

    // will update it, approved by APIs got error
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

    // .log('Click How is this info used? link')
    // .clickElementOnText('a','How is this info used?')
    // .clickElementOnText('button','Ok')

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
      .verifyTextExist('More information');
  });
});



