/* eslint-disable no-multiple-empty-lines */
import faker from 'faker/locale/en_AU';
import * as data from '../../../fixtures/test-data.json';

describe('View worker profile', () => {
  const detherEmail = 'automation_dether.ocampo.account+client@donotuse.com.au';
  const wilsmithEmail = 'automation_wil.smith.1clientdashboard+coordinator@donotuse.com.au';
  const kenzoEmail = 'automation_kenzo.ndis+sw@donotuse.com.au';
  const ninodavisEmail = 'automation_ninodavis+worker+dev@donotuse.com.au';
  const joanaEmail = 'automation_joana.okinawa.wprofile+client@donotuse.com.au';
  const defaultPassword = 'qaAutomation2021';

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it('ES-T3428. Workers you have invited, unapproved', () => {
    cy.log(`login ${detherEmail}`)
      .loginToDashboard(detherEmail, defaultPassword)

      .log('On dashboard page, left side panel, click \'Invite workers\' page')
      .navigateByLeftMenuInDashboard('Invite workers')
      .verifyTextExist('Invited workers')
      .url()
      .should('include', '/invite')

      .log('On \'Workers you have invited\' section, choose a worker that has accepted status. Click the worker name')
      .clickElementOnText('a', ' Mario Maurer-NDISPending ')
      .verifyTextExist('Contact')
      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Services offered')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Mable verified')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information');
  });

  it('ES-T3429. Shortlist, unapproved', () => {
    cy.log(`login ${detherEmail}`)
      .loginToDashboard(detherEmail, defaultPassword)

      .log('On dashboard page, left side panel, click \'Shortlist\' page')
      .navigateByLeftMenuInDashboard('Shortlist')
      .verifyTextExist('Shortlist')
      .url()
      .should('include', '/shortlist')

      .log('On \'Workers you have invited\' section, choose a worker that has accepted status. Click the worker name')
      .clickElementOnTextWithPosition('div', 'View profile', 0)
      .verifyTextExist('Contact')
      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Services offered')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Mable verified')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information');
  });

  it('ES-T3430. My conversations, approved', () => {
    cy.log(`login ${detherEmail}`)
      .loginToDashboard(detherEmail, defaultPassword)

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
      .verifyTextExist('More information');
  });

  it('ES-T3415. Search workers', () => {
    cy.log(`login ${wilsmithEmail}`)
      .loginToDashboard(wilsmithEmail, defaultPassword)

      .log('On dashboard page, left side panel, click \' Search workers \' page')
      .navigateByLeftMenuInDashboard('Search workers')
      .verifyTextExist('Search workers')

      .log('Choose a worker and click \'View profile\' button')
      .clickElementOnTextWithPosition('button', 'View profile', 0)

      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information');
  });

  it('ES-T3416. Shortlist', () => {
    cy.log(`login ${wilsmithEmail}`)
      .loginToDashboard(wilsmithEmail, defaultPassword)

      .log('On dashboard page, left side panel, click \'Shortlist\' button')
      .navigateByLeftMenuInDashboard('Shortlist')
      .verifyTextExist('Shortlist')
      .url()
      .should('include', '/shortlist')

      .log('In Shortlist, hover and click the name of the Support worker')
      .clickElementOnText('h2', 'Claudia B')
      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information');
  });

  it('ES-T3419. Client account created', () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.firstName();
    const address = '2nd Ave';
    const postcode = 2000;
    const gender = data.coordinatorContent.addClientForm.gender.male;

    cy.log(`login ${wilsmithEmail}`)
      .loginToDashboard(wilsmithEmail, defaultPassword)

      .log('On dashboard page, left side panel, click \' Search workers \' page')
      .navigateByLeftMenuInDashboard('Search workers')
      .verifyTextExist('Search workers')

      .log('Choose a worker and click \'View profile\' button')
      .clickElementOnTextWithPosition('button', 'View profile', 0)

      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information')

      .log('On dashboard page, left side panel, click \'Shortlist\' button')
      .navigateByLeftMenuInDashboard('Shortlist')
      .verifyTextExist('Shortlist')
      .url()
      .should('include', '/shortlist')

      .log('In Shortlist, hover and click the name of the Support worker')
      .clickElementOnText('h2', 'Claudia B')
      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information')

      .log('Click contact button')
      .clickElementOnText('button', 'Contact')
      .verifyTextExist('Select a client to message')

      .log('Click \'Add client\' button')
      .clickElementOnText('button', 'Add client')
      .verifyTextExist('Client details')

      .log('Fill up the client details form and click \'Create client\' button')
      .fillBasicCoordinatorAccount(firstName, lastName, gender, address,
        postcode, null)

      .fillTypeOfCareForm(data.coordinatorContent.addClientForm.typeOfCare.mentalHealth,
        data.coordinatorContent.addClientForm.supportPlan.no,
        data.coordinatorContent.addClientForm.fundingSource.ndia)

      .selectDropdown(
        'app-date-selector[formcontrolname="birth_date"] select',
        '17',
        0,
      )
      .selectDropdown(
        'app-date-selector[formcontrolname="birth_date"] select',
        'January',
        1,
      )
      .selectDropdown(
        'app-date-selector[formcontrolname="birth_date"] select',
        '2020',
        2,
      )

      .clickElementOnText(data.coordinatorElements.addClientForm.medicationRadio,
        'No')

      .clickElementOnText(data.coordinatorElements.addClientForm.formButton,
        data.coordinatorContent.addClientForm.createClient)

      .verifyTextExist('Client account created')

      .log('Click \'Go back to [Support Worker]\'s profile\' button')
      .clickElementOnText('button', ' Go back to ')

      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information');
  });

  it('ES-T3395. Profile photo', () => {
    cy.log(`login ${kenzoEmail}`)
      .loginToDashboard(kenzoEmail, defaultPassword)

      .log('On the dashboard page, click the profile photo')
      .clickElement('#profileCardAvatar')

      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Qualifications')
      .verifyTextExist('Services offered')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Mable verified')
      .verifyTextExist('Experience')
      .verifyTextExist('Work and education history')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information');
  });

  it('ES-T3399. View active agreement via My clients page', () => {
    cy.log(`login ${kenzoEmail}`)
      .loginToDashboard(kenzoEmail, defaultPassword)

      .log('On dashboard page, click My clients button')
      .navigateByLeftMenuInDashboard('My clients')
      .verifyTextExist('My clients')

      .log('On Active tab, choose a worker and click View agreement button')
      .clickElementOnTextWithPosition('span', 'View agreement', 0)
      .verifyTextExist('Agreement with')

      .log('Under Support worker section, click the View profile button')
      .clickElementOnText('#supportWorker a.viewProfile', 'View profile')

      .verifyTextExist('About')
      .verifyTextExist('Qualifications')
      .verifyTextExist('Services offered')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Mable verified')
      .verifyTextExist('Experience')
      .verifyTextExist('Work and education history')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information');
  });

  it('ES-T3400. View terminated agreement via My clients page', () => {
    cy.log(`login ${kenzoEmail}`)
      .loginToDashboard(kenzoEmail, defaultPassword)

      .log('On dashboard page, click My clients button')
      .navigateByLeftMenuInDashboard('My clients')
      .verifyTextExist('My clients')

      .log('Go to Past tab and choose a worker and click View agreement button')
      .clickElementOnText('div.mat-tab-label-content', 'Past')
      .verifyTextExist('My clients')
      .clickElementOnTextWithPosition('span', 'View agreement', 0)
      .verifyTextExist('Agreement with')

      .log('Click View profile button on Support worker section')
      .clickElementOnText('a', 'View profile')

      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Qualifications')
      .verifyTextExist('Services offered')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Mable verified')
      .verifyTextExist('Experience')
      .verifyTextExist('Work and education history')
      .verifyTextExist('Work locations')
      .verifyTextExist('More information');
  });

  it('ES-T3401. Search workers', () => {
    cy.log(`login ${kenzoEmail}`)
      .loginToDashboard(kenzoEmail, defaultPassword)

      .log('Check the Search Workers')
      .verifyTextExist('Search workers')
      .clickElementOnText('span', ' Search workers ', 2000, false)
      .verifyTextExist('Search workers')

      .log('Enter location')
      .inputTextField('input[id="searchInput"]', 2000)
      .type('{enter}')

      .log('Choose a worker from search result aand click View profile button')
      .clickElementOnTextWithPosition('button', 'View profile', 0)
      .verifyTextExist('About')
      .verifyTextExist('Availability')
      .verifyTextExist('Mable verified')
      .verifyTextExist('More information')
      .verifyListTextExistNoWaitV2(['Indicative rates', 'Work locations', 'Interested in engaging']);
  });

  it('ES-T4327. Check support provider\'s profile without WWCC, First Aid certificate, CPR certificate, and Australian Driver\'s licence', () => {
    cy.log(`login ${ninodavisEmail}`)
      .loginToDashboard(ninodavisEmail, defaultPassword)

      .log('On the dashboard page, click the profile photo')
      .clickElement('#profileCardAvatar')

      .verifyTextExist('Working with Children Check')
      .verifyTextExist('First aid certificate')
      .verifyTextExist('CPR certificate')
      .verifyTextExist('Australian Driver\'s Licence');
  });

  it('ES-T4328. Check support provider\'s profile with verified WWCC, First Aid certificate, CPR certificate, and Australian Driver\'s licence', () => {
    cy.log(`login ${kenzoEmail}`)
      .loginToDashboard(kenzoEmail, defaultPassword)

      .log('On the dashboard page, click the profile photo')
      .clickElement('#profileCardAvatar')

      .verifyTextExist('NDIS Safeguard training')
      .verifyTextExist('NDIS Worker Screening Check')
      .verifyTextExist('Working with Children Check (NSW)')
      .verifyTextExist('First aid certificate')
      .verifyTextExist('CPR certificate');
  });

  it('ES-T4333. Check the Support Provider\'s Additional Training UI', () => {
    cy.log(`login ${ninodavisEmail}`)
      .loginToDashboard(ninodavisEmail, defaultPassword)

      .log('Click the Edit profile button')
      .clickElementOnText('span', 'Edit profile')
      .skipContinueToEditMyProfileDialog()
      .verifyTextExist('My profile')

      .log('Check the left NAV')
      // check The Additional training mark
      .get('a[href="/profile-building/additional-training"]')
      .siblings('app-icon')
      .find('svg path')
      .invoke('attr', 'd')
      .should('include', '4 12 4Z')

      .log('Check the Additional training copy')
      .clickElement('a[href="/profile-building/additional-training"]')
      .verifyTextExist('CPR Certificate')
      .verifyTextExist('First Aid')
      .verifyTextExist('Valid Driver\'s Licence ')

      // Uncheck all options if had
      .uncheckAllAdditionalTraining()

      .log('Click')
      .clickElementByIndex('.checkboxListContainer mat-checkbox label', true, 0)
      .clickElementByIndex('.checkboxListContainer mat-checkbox label', true, 1)
      .clickElementByIndex('.checkboxListContainer mat-checkbox label', true, 2)
      .verifyElementHaveClass('.checkboxListContainer mat-checkbox', 0, 'mat-checkbox-checked')
      .verifyElementHaveClass('.checkboxListContainer mat-checkbox', 1, 'mat-checkbox-checked')
      .verifyElementHaveClass('.checkboxListContainer mat-checkbox', 2, 'mat-checkbox-checked')

      .log('Uncheck')
      .clickElementByIndex('.checkboxListContainer mat-checkbox label', true, 0)
      .clickElementByIndex('.checkboxListContainer mat-checkbox label', true, 1)
      .clickElementByIndex('.checkboxListContainer mat-checkbox label', true, 2)
      .verifyElementHaveNoClass('.checkboxListContainer mat-checkbox', 0, 'mat-checkbox-checked')
      .verifyElementHaveNoClass('.checkboxListContainer mat-checkbox', 1, 'mat-checkbox-checked')
      .verifyElementHaveNoClass('.checkboxListContainer mat-checkbox', 2, 'mat-checkbox-checked');
  });

  it('ES-T3414. Shortlist, approved', () => {
    cy
      .log(`login ${detherEmail}`)
      .loginToDashboard(detherEmail, defaultPassword)

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

  it('ES-T3413. Workers you have invited, approved', () => {
    cy
      .log(`login ${detherEmail}`)
      .loginToDashboard(detherEmail, defaultPassword)

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
      .verifyTextExist('More information');
  });

  it('ES-T3411. Terminated agreement via My support workers', () => {
    cy
      .log(`login ${detherEmail}`)
      .loginToDashboard(detherEmail, defaultPassword)
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
      .verifyTextExist('More information');
  });

  it('ES-T3410. Active agreement via My support workers', () => {
    cy
      .log(`login ${detherEmail}`)
      .loginToDashboard(detherEmail, defaultPassword)

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
      .verifyTextExist('More information');
  });

  it('ES-T3407. My jobs - Contact these workers', () => {
    cy
      .log(`login ${detherEmail}`)
      .loginToDashboard(detherEmail, defaultPassword)

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
      .verifyTextExist('More information');
  });

  it('ES-T3406. My jobs - Regular with replies', () => {
    cy
      .log(`login ${detherEmail}`)
      .loginToDashboard(detherEmail, defaultPassword)
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
      .verifyTextExist('More information');
  });

  it('ES-T3404. Search workers', () => {
    cy
      .log(`login ${detherEmail}`)
      .loginToDashboard(detherEmail, defaultPassword)

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
      .verifyTextExist('More information');
  });

  it('ES-T3403. Pending agreements', () => {
    cy
      .log(`login ${detherEmail}`)
      .loginToDashboard(detherEmail, defaultPassword)

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
      .verifyTextExist('More information');
  });

  it('ES-T3402. Search & message workers', () => {
    cy
      .log(`login ${detherEmail}`)
      .loginToDashboard(detherEmail, defaultPassword)

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
      .verifyTextExist('More information');
  });

  it('ES-T4135. View worker profile, with WWCC/WWVP', () => {
    cy
      .log(`login ${joanaEmail}`)
      .loginToDashboard(joanaEmail, defaultPassword)

      .log('On dashboard page, left side panel, click \' Search workers \' page')
      .navigateByLeftMenuInDashboard('Search workers')
      .verifyTextExist('Search workers')

      // Location: Barangaroo NSW 2000
      // Worker: Bea A
      .searchWorkersByOnlySuburbV2('2000', 0)
      .searchBySupportWorkerName('Bea')

      .verifyTextExist('Working with Children Check (NSW)')

      .log('On dashboard page, left side panel, click \' Search workers \' page')
      .navigateByLeftMenuInDashboard('Search workers')
      .verifyTextExist('Search workers')

      // Location: West Perth WA 6005
      // Worker: Belle M
      .searchWorkersByOnlySuburbV2('6005', 0)
      .searchBySupportWorkerName('Belle')

      .verifyTextExist('Working with Children Check (WA)')

      .log('On dashboard page, left side panel, click \' Search workers \' page')
      .navigateByLeftMenuInDashboard('Search workers')
      .verifyTextExist('Search workers')

      // Location: Adelaide SA 5000
      // Worker: Luisa M
      .searchWorkersByOnlySuburbV2('5000', 0)
      .searchBySupportWorkerName('Luisa')

      .verifyTextExist('Working with Children Check (SA)')

      .log('On dashboard page, left side panel, click \' Search workers \' page')
      .navigateByLeftMenuInDashboard('Search workers')
      .verifyTextExist('Search workers')

      // Location: Melbourne VIC 3000
      // Worker: Goran D
      .searchWorkersByOnlySuburbV2('3000', 0)
      .searchBySupportWorkerName('Goran')

      .verifyTextExist('Working with Children Check (VIC)')

      .log('On dashboard page, left side panel, click \' Search workers \' page')
      .navigateByLeftMenuInDashboard('Search workers')
      .verifyTextExist('Search workers')

      // Location: Brisbane Airport QLD 4008
      // Worker: Daniel P
      .searchWorkersByOnlySuburbV2('4008', 0)
      .searchBySupportWorkerName('Daniel')

      .verifyTextExist('Working with Children Check (QLD)')

    // .log('On dashboard page, left side panel, click \' Search workers \' page')
    // .navigateByLeftMenuInDashboard('Search workers')
    // .verifyTextExist('Search workers')

    // Location: Millner NT 0810
    // worker: Kathryn B

    // .searchWorkersByOnlySuburbV2('0810', 0)
    // .searchBySupportWorkerName('Kathryn')

    // .verifyTextExist('Working with Children Check (NT)')

      .log('On dashboard page, left side panel, click \' Search workers \' page')
      .navigateByLeftMenuInDashboard('Search workers')
      .verifyTextExist('Search workers')

      // Location: Acton ACT 2601
      // Worker: Dencio S
      .searchWorkersByOnlySuburbV2('2601', 0)
      .searchBySupportWorkerName('Dencio')

      .verifyTextExist('Working with Children Check (NSW)')

      .log('On dashboard page, left side panel, click \' Search workers \' page')
      .navigateByLeftMenuInDashboard('Search workers')
      .verifyTextExist('Search workers')

      // Location: Sandy Bay TAS 7005
      // worker: Jennifer S
      .searchWorkersByOnlySuburbV2('7005', 0)
      .clickElementOnText('button', 'View profile', 0)

      .verifyTextExist('Working with Vulnerable People card (ACT/TAS)');
  });

  it('ES-T4157. [Web] View own worker profile, with WWCC', () => {
    cy
      .log(`login ${joanaEmail}`)
      .loginToDashboard(joanaEmail, defaultPassword)

      .log('On dashboard page, left side panel, click \' Search workers \' page')
      .navigateByLeftMenuInDashboard('Search workers')
      .verifyTextExist('Search workers')

      // Location: Barangaroo NSW 2000
      // Worker: Bea A
      // automation_bea.alonzo.guidelines+sw@donotuse.com.au
      .searchWorkersByOnlySuburbV2('2000', 0)
      .searchBySupportWorkerName('Bea')

      .verifyTextExist('Working with Children Check (NSW)')

    // .log('On dashboard page, left side panel, click \' Search workers \' page')
    // .navigateByLeftMenuInDashboard('Search workers')
    // .verifyTextExist('Search workers')

    // // Location: West Perth WA 6005
    // // Worker: Belle M
    // // automation_belle.mariano+location+sw@donotuse.com.au
    // .searchWorkersByOnlySuburbV2('6005', 0)
    // .searchBySupportWorkerName('Belle')

    // .verifyTextExist('Working with Children Check (WA)')

      .log('On dashboard page, left side panel, click \' Search workers \' page')
      .navigateByLeftMenuInDashboard('Search workers')
      .verifyTextExist('Search workers')

      // Location: Adelaide SA 5000
      // Worker: Luisa M
      // automation.luisamadrigal.covid19+sw@donotuse.com.au
      .searchWorkersByOnlySuburbV2('5000', 0)
      .searchBySupportWorkerName('Luisa')

      .verifyTextExist('Working with Children Check (SA)')

      .log('On dashboard page, left side panel, click \' Search workers \' page')
      .navigateByLeftMenuInDashboard('Search workers')
      .verifyTextExist('Search workers')

    // Location: Melbourne VIC 3000
    // Worker: Colleen Hoover
    //  automation.colleenhoover.profile+sw@donotuse.com.au

      .searchWorkersByOnlySuburbV2('3000', 0)
      .searchBySupportWorkerName('Colleen')

      .verifyTextExist('Working with Children Check (VIC)')

      .log('On dashboard page, left side panel, click \' Search workers \' page')
      .navigateByLeftMenuInDashboard('Search workers')
      .verifyTextExist('Search workers')

      // Location: Brisbane Airport QLD 4008
      // Worker: Nicholas Sparks
      // automation.nicholassparks.profile+sw@donotuse.com.au
      .searchWorkersByOnlySuburbV2('4008', 0)
      .searchBySupportWorkerName('Nicholas')

      .verifyTextExist('Working with Children Check (QLD)')

      .log('On dashboard page, left side panel, click \' Search workers \' page')
      .navigateByLeftMenuInDashboard('Search workers')
      .verifyTextExist('Search workers')

    // Location: Millner NT 0810
    // worker: JK Rowling
    // automation.jkrowling.profile+sw@donotuse.com.au

      .searchWorkersByOnlySuburbV2('0810', 0)
      .searchBySupportWorkerName('JK')

      .verifyTextExist('Working with Children Check (NT)')

      .log('On dashboard page, left side panel, click \' Search workers \' page')
      .navigateByLeftMenuInDashboard('Search workers')
      .verifyTextExist('Search workers')

      // Location: Acton ACT 2601
      // Worker: Mark Manson
      // automation.markmanson.profile+sw@donotuse.com.au
      .searchWorkersByOnlySuburbV2('2601', 0)
      .searchBySupportWorkerName('Mark')

      .verifyTextExist('Working with Children Check (NSW)')

      .log('On dashboard page, left side panel, click \' Search workers \' page')
      .navigateByLeftMenuInDashboard('Search workers')
      .verifyTextExist('Search workers')

    // Location: Sandy Bay TAS 7005
    // worker: Amy Bloom
    // automation.amybloom.profile+sw@donotuse.com.au

      .searchWorkersByOnlySuburbV2('7005', 0)
      .clickElementOnText('a', 'Amy B')

      .verifyTextExist('Working with Vulnerable People card (ACT/TAS)');
  });
});
