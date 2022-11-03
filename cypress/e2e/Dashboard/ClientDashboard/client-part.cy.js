import * as data from '../../../fixtures/test-data.json';
import faker from 'faker/locale/en_AU';

describe('Client Dashboard', () => {
  const clientDashboard = [
    'Create your account',
    'Post your first job',
    'Search and message a support worker',
    'Complete your account verification',
    'Book a support worker',
    'Invitations',
  ];
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('ES-T1149. Check Mable News: Introducing Last Minute Jobs Functions and Visibility', () => {
    const clientEmail = 'automation_anna.dashboard+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginAPI(clientEmail, clientPass)
      .visit('/dashboard')

      .log('Check Mable news')
      .checkMableNewsOnClientDashboard()

      .log('Click Learn more btn')
      .clickElementOnText('#mableNews a', 'Learn more')
      .verifyTextVisible('How Last Minute jobs work')
      .verifyTextVisible('Create a Last Minute job')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Click Post a job btn')
      .clickElementOnText('#mableNews a', 'Post a job')
      .verifyTextVisible('Post a job')
      .verifyTextVisible('Create a Last Minute job')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')
      .verifyTextVisible('Mable news');
  });

  it('ES-T1121. Newly Signup Client Dashboard', () => {
    const clientEmail = 'automation_joan.newaccount+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginAPI(clientEmail, clientPass)
      .visit('/dashboard')

      .log('Verify Welcome title')
      .verifyTextVisible('Hi Joan')

      .log('Check Dashboard')
      .verifyTextVisible('Post your first job')
      .verifyTextVisible('Search and message a support worker')
      .verifyTextVisible('Complete your account verification')
      .verifyTextVisible('Book a support worker')

      .log('Click Post your first job btn')
      .clickElementOnText('h4', 'Post your first job')
      .verifyTextVisible('Choose job type')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Click Search and message a support worker')
      .clickElementOnText('h4', 'Search and message a support worker')
      .verifyTextVisible('Search workers')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Click Complete your account verification')
      .clickElementOnText('h4', 'Complete your account verification')
      .verifyTextVisible('Joan’s personal details')

      .log('Click Back to dashboard')
      .clickElementOnText('app-back-button button span', 'Back to dashboard')

      .log('Click Book a support worker')
      .clickElementOnText('h4', 'Book a support worker')
      .verifyTextVisible('My support workers')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')
      .verifyTextVisible('Hi Joan');
  });

  it('ES-T1123. Newly Signup with BYO Worker Dashboard', () => {
    const clientEmail = 'automation_katcademia@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginAPI(clientEmail, clientPass)
      .visit('/dashboard')

      .log('Verify Welcome title')
      .verifyTextVisible('Hi Kat')

      .log('Check Dashboard')
      .verifyTextVisible('Post your first job')
      .verifyTextVisible('Search and message a support worker')
      .verifyTextVisible('Complete your account verification')
      .verifyTextVisible('Book a support worker')
      .verifyTextVisible('Invitations')

      .log('Click Post your first job btn')
      .clickElementOnText('h4', 'Post your first job')
      .verifyTextVisible('Choose job type')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Click Search and message a support worker')
      .clickElementOnText('h4', 'Search and message a support worker')
      .verifyTextVisible('Search workers')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Click Complete your account verification')
      .clickElementOnText('h4', 'Complete your account verification')
      .verifyTextVisible('Kat’s personal details')

      .log('Click Back to dashboard')
      .clickElementOnText('app-back-button button span', 'Back to dashboard')

      .log('Click Book a support worker')
      .clickElementOnText('h4', 'Book a support worker')
      .verifyTextVisible('My support workers')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Click Show all btn on Invitations section')
      .clickElementOnText('#invitations span', 'Show all')
      .verifyTextVisible('Invited workers')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Check Invitation')
      .verifyElementContainsText('.invitationPanel div', 'Mark Support Worker');
  });

  it('ES-T1124. Incomplete profile with payment verified Dashboard', () => {
    const clientEmail = 'automation_dean.dashboard@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginAPI(clientEmail, clientPass)
      .visit('/dashboard')

      .log('Verify Welcome title')
      .verifyTextVisible('Hi Dean')

      .log('Check Dashboard')
      .verifyListBoxText(clientDashboard)

      .log('Click Post your first job btn')
      .clickElementOnText('h4', 'Post your first job')
      .verifyTextVisible('Choose job type')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Click Search and message a support worker')
      .clickElementOnText('h4', 'Search and message a support worker')
      .verifyTextVisible('Search workers')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Click Complete your account verification')
      .clickElementOnText('h4', 'Complete your account verification')
      .verifyTextVisible('Dean’s personal details')

      .log('Click Back to dashboard')
      .clickElementOnText('app-back-button button span', 'Back to dashboard')

      .log('Click Book a support worker')
      .clickElementOnText('h4', 'Book a support worker')
      .verifyTextVisible('My support workers')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Click Show all btn on Invitations section')
      .log('Verify invitations')
      .verifyElementVisible('#invitations')
      .verifyElementVisible('.invitationPanel.panel')
      .verifyTextVisible('Invitations')
      .verifyTextVisible('Show all')
      .verifyTextVisible('You have invited the following people to join your team of support.')
      .verifyElementContainsText('.textCapitalize', 'Sent')
      .clickElementOnText('#invitations span', 'Show all')
      .verifyTextVisible('Invited workers')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Check Invitation')
      .verifyElementContainsText('.invitationPanel div', 'Mark Worker');
  });

  it('ES-T1129. Complete profile with no household/social/medical needs Dashboard', () => {
    const clientEmail = 'automation_anna.dashboard+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginAPI(clientEmail, clientPass)
      .visit('/dashboard')

      .log('Check tiles arrangement in left hand side')
      .checkItemInObject({
        tilte1: 'Find support',
        tilte2: 'Search & message workers',
        tilte3: 'Post a job',
        tilte4: 'Agreements',
        tilte5: 'Open jobs',
      })

      .log('Check tiles arrangement in right hand side')
      .checkItemInObject({
        tilte1: 'Invitations',
        tilte2: 'Mable news',
        tilte3: 'COVID-19 screening questions',
        tilte4: 'Introducing Last Minute Jobs',
        tilte5: 'Helping to protect our Mable community',
        tilte6: 'Update',
        tilte7: 'Go to profile',
      })

      .log('Check Find Support tile')
      .verifyTextExist('Search & message workers')
      .verifyTextExist('Post a job')

      .log('Click Search and messsage workers button')
      .clickElementOnText('#callToAction span', 'Search & message workers')
      .verifyTextVisible('Search workers')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Click Post a job btn')
      .clickElementOnText('#mableNews a', 'Post a job')
      .verifyTextVisible('Post a job')
      .verifyTextVisible('Create a Last Minute job')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Check the Agreements section')
      .verifyElementContainsText('#recentAgreements h3', 'Agreements')
      .verifyElementContainsText('#recentAgreements span', 'Show all')
      .verifyElementContainsText('.agreementChip .chip span', 'Pending')
      .verifyElementContainsText('.agreementChip .chip span', 'Changes')

      .log('Click Show all in Agreement section')
      .clickElementOnText('#recentAgreements span', 'Show all')
      .verifyTextVisible('My support workers')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Click View btn')
      .clickElementOnText('#recentAgreements button', 'View')
      .verifyTextVisible('Agreement with')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Check Open jobs tile')
      .verifyElementContainsText('#postedJobs h3', 'Open jobs')
      .verifyElementContainsText('#postedJobs span', 'Show all')
      .verifyElementContainsText('#postedJobs .panel button', 'View')
      .find('.jobPanel')
      .should($panel => {
        expect($panel.length).not.to.greaterThan(3);
      })

      .log('Click Show all on Open jobs section')
      .clickElementOnText('#postedJobs span', 'Show all')
      .verifyTextVisible('My jobs')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('On the Open jobs tile, click one View button')
      .wait(2000)
      .get('#postedJobs .panel button')
      .contains('View')
      .click()

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Check Update tile')
      .verifyElementContainsText(
        '#dismissableTiles h3',
        'Share support needs with your workers',
      )

      .log('Click Go the profile btn')
      .clickElementOnText('#dismissableTiles a span', 'Go to profile')
      .verifyTextVisible('About Anna')

      .log('Click Back to dashboard')
      .clickElementOnText('app-back-button button span', 'Back to dashboard')

      .log('Click close btn on Share support needs with your workers')
      .clickElement('#dismissableTiles [name="close"]', true)
      .verifyTextNotExist('Share support needs with your workers')

      .log('Reload page')
      .reload()
      .verifyElementContainsText(
        '#dismissableTiles h3',
        'Share support needs with your workers',
      )

      .log('Check Invitations tile')
      .verifyElementContainsText('#invitations h3', 'Invitations')
      .verifyElementContainsText('#invitations span', 'Show all')
      // .verifyElementContainsText('#invitations .chip', ' Sent ')
      .verifyElementContainsText('#invitations .chip', 'Declined')
      .verifyElementContainsText('#invitations .chip', ' Accepted ')
      .find('.invitationPanel')
      .should($panel => {
        expect($panel.length).not.to.greaterThan(3);
      })

      .log('Click Show all btn on Invitations section')
      .clickElementOnText('#invitations span', 'Show all')
      .verifyTextVisible('Invited workers')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Check Mable news')
      .verifyTextExist('COVID-19 screening questions')
      .verifyElementContainsText('#mableNews .panel a', 'View Questions ')
      .verifyTextExist('Introducing Last Minute Jobs')
      .verifyElementContainsText('#mableNews .panel a', 'Learn more')
      .verifyElementContainsText('#mableNews .panel a', 'Post a job')
      .verifyTextExist('Helping to protect our Mable community')
      .verifyElementContainsText('#mableNews .panel a', 'Access Mable Equip ')

      .log('Click "View Questions" button')
      .get('a[href="https://mable.com.au/covid-19/guidelines/"]')
      .contains('View Questions ')
      .should('be.exist')

      .log('Click Learn more button')
      .clickElementOnText('#mableNews .panel a', 'Learn more')
      .verifyTextExist('How Last Minute jobs work')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Click Post a job button')
      .clickElementOnText('#mableNews .panel a', 'Post a job')
      .verifyTextExist('Post a job')
      .verifyTextExist('Create a Last Minute job')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Click Access Mable Equip button')
      .get('a[href="http://mableequip.com.au"]')
      .contains('Access Mable Equip ')
      .should('be.exist');
  });

  it('ES-T1142. Complete profile with household/social/medical needs Dashboard', () => {
    const clientEmail = 'automation_nica.completeprofile+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';
    const clientId = '22315';

    const workerEmail = 'automation_cham.nc+sw@donotuse.com.au';
    const workerPass = 'qaAutomation2021';
    // const workerName = 'Cham N';
    const workerId = '21619';

    cy.removeAgreementIfExist(clientEmail, clientPass, workerId)
      .sendAgreementAsWorker(
        workerEmail,
        workerPass,
        clientId,
      );

    cy.log('Login')
      .loginAPI(clientEmail, clientPass)
      .visit('/dashboard')

      .log('Check tiles arrangement in left hand side')
      .checkItemInObject({
        tilte1: 'Find support',
        tilte2: 'Search & message workers',
        tilte3: 'Post a job',
        tilte4: 'Agreements',
        tilte5: 'Open jobs',
      })

      .log('Check tiles arrangement in right hand side')
      .checkItemInObject({
        tilte1: 'Invitations',
        tilte2: 'Mable news',
        tilte3: 'COVID-19 screening questions',
        tilte4: 'Introducing Last Minute Jobs',
        tilte5: 'Helping to protect our Mable community',
      })

      .log('Check Find Support tile')
      .verifyTextExist('Search & message workers')
      .verifyTextExist('Post a job')

      .log('Click Search and messsage workers button')
      .clickElementOnText('#callToAction span', 'Search & message workers')
      .verifyTextVisible('Search workers')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Click Post a job btn')
      .clickElementOnText('#mableNews a', 'Post a job')
      .verifyTextVisible('Post a job')
      .verifyTextVisible('Create a Last Minute job')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Check the Agreements section')
      .verifyElementContainsText('#recentAgreements h3', 'Agreements')
      .verifyElementContainsText('#recentAgreements span', 'Show all')
      .verifyElementContainsText('.agreementChip .chip span', 'Pending')

      .log('Click Show all in Agreement section')
      .clickElementOnText('#recentAgreements span', 'Show all')
      .verifyTextVisible('My support workers')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Click View btn')
      .clickElementOnText('#recentAgreements button', 'View')
      .verifyTextVisible('Agreement with')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Check Open jobs tile')
      .verifyElementContainsText('#postedJobs h3', 'Open jobs')
      .verifyElementContainsText('#postedJobs span', 'Show all')
      .verifyElementContainsText('#postedJobs .panel button', 'View')
      .find('.jobPanel')
      .should($panel => {
        expect($panel.length).not.to.greaterThan(3);
      })

      .log('Click Show all button')
      .clickElementOnText('#postedJobs span', 'Show all')
      .verifyTextExist('My jobs')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('On the Open jobs tile, click one View button')
      .wait(2000)
      .get('#postedJobs .panel button')
      .contains('View')
      .click()

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Check Invitations tile')
      .verifyElementContainsText('#invitations h3', 'Invitations')
      .verifyElementContainsText('#invitations span', 'Show all')
      .verifyElementContainsText('#invitations .chip', ' Sent ')
      .verifyElementContainsText('#invitations .chip', 'Declined')
      .verifyElementContainsText('#invitations .chip', ' Accepted ')
      .find('.invitationPanel')
      .should($panel => {
        expect($panel.length).not.to.greaterThan(3);
      })

      .log('Click Show all btn on Invitations section')
      .clickElementOnText('#invitations span', 'Show all')
      .verifyTextVisible('Invited workers')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Check Mable news')
      .verifyTextExist('COVID-19 screening questions')
      .verifyElementContainsText('#mableNews .panel a', 'View Questions ')
      .verifyTextExist('Introducing Last Minute Jobs')
      .verifyElementContainsText('#mableNews .panel a', 'Learn more')
      .verifyElementContainsText('#mableNews .panel a', 'Post a job')
      .verifyTextExist('Helping to protect our Mable community')
      .verifyElementContainsText('#mableNews .panel a', 'Access Mable Equip ')

      .log('Click "View Questions" button')
      .get('a[href="https://mable.com.au/covid-19/guidelines/"]')
      .contains('View Questions ')
      .should('be.exist')

      .log('Click Learn more button')
      .clickElementOnText('#mableNews .panel a', 'Learn more')
      .verifyTextExist('How Last Minute jobs work')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Click Post a job button')
      .clickElementOnText('#mableNews .panel a', 'Post a job')
      .verifyTextExist('Post a job')
      .verifyTextExist('Create a Last Minute job')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Click Access Mable Equip button')
      .get('a[href="http://mableequip.com.au"]')
      .contains('Access Mable Equip ')
      .should('be.exist');
  });

  it('ES-T1148. Check Update Tile: Share support needs with your workers Functions and Visibility', () => {
    const clientEmail = 'automation_anna.dashboard+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginAPI(clientEmail, clientPass)
      .visit('/dashboard')

      .log('Check Update tile')
      .verifyElementContainsText(
        '#dismissableTiles h3',
        'Share support needs with your workers',
      )

      .log('Click Go the profile btn')
      .clickElementOnText('#dismissableTiles a span', 'Go to profile')
      .verifyTextVisible('About Anna')

      .log('Click Back to dashboard')
      .clickElementOnText('app-back-button button span', 'Back to dashboard')

      .log('Click close btn on Share support needs with your workers')
      .clickElement('#dismissableTiles [name="close"]', true)
      .verifyTextNotExist('Share support needs with your workers')

      .log('Reload page')
      .reload()
      .verifyElementContainsText(
        '#dismissableTiles h3',
        'Share support needs with your workers',
      );
  });

  it('ES-T1150. Check Welcome tile Visibility', () => {
    const clientEmail = 'automation_jessy.welcometile@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginAPI(clientEmail, clientPass)
      .visit('/dashboard')

      .log('Check Welcome tile')
      .verifyTextVisible('Hi Jessy')
      .verifyTextVisible(
        'Start looking for independent support workers near you.',
      );
  });

  it('ES-T1151. Check Agreements tile Functions and Visibility', () => {
    const clientEmail = 'automation_anna.dashboard+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginAPI(clientEmail, clientPass)
      .visit('/dashboard')

      .log('Check Agreements tile under Find Support tile')
      .verifyElementContainsText('#recentAgreements h3', 'Agreements')
      .verifyTextVisible(
        "The agreements below need your feedback or approval. Your approved and terminated agreements can be found on 'My support workers' page.",
      )
      .verifyElementContainsText('.agreementChip .chip span', 'Pending')
      .verifyElementContainsText('.agreementChip .chip span', 'Changes')

      .log('Check agreements panel arrangement')
      .get('div.bold')
      .contains('Gray Fullbuster')
      .should('be.exist')

      .log('Check agreements panel display')
      .get('body')
      .find('.agreementPanel')
      .should($panel => {
        expect($panel.length).to.greaterThan(0);
      })

      .log('Check new agreement status')
      .verifyTextExist('Pending')

      .log('Check amended agreement status')
      .verifyTextExist('Changes')

      .log('Click Show all in Agreement section')
      .clickElementOnText('#recentAgreements span', 'Show all')
      .verifyTextVisible('My support workers')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Click View btn')
      .log('Click View button')
      .get('div.bold')
      .contains('Carson E')
      .parents('div.agreementInfoContainer')
      .siblings('button')
      .contains('View')
      .click()
      .verifyTextExist('Agreement with Carson E')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')
      .verifyElementContainsText('#recentAgreements h3', 'Agreements');
  });

  it('ES-T1153. Check Open Jobs tile Functions and Visibility', () => {
    const clientEmail = 'automation_openjobstile@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginAPI(clientEmail, clientPass)
      .visit('/dashboard')

      .log('Check Open jobs section')
      .verifyElementContainsText('#postedJobs h3', 'Open jobs')

      .log('Click Show all on Open jobs section')
      .clickElementOnText('#postedJobs span', 'Show all')
      .verifyTextVisible('My jobs')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Click View btn on LMJ job')
      .clickElementOnText('#postedJobs button', 'View')
      .verifyTextVisible('Mark job as filled')
      .verifyTextVisible('Cancel job')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard');
  });

  it('ES-T1154. Check Invitations tile Functions and Visibility', () => {
    const clientEmail = 'automation_anna.dashboard+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginAPI(clientEmail, clientPass)
      .visit('/dashboard')

      .log('Check Invitations')
      .verifyElementContainsText('#invitations h3', 'Invitations')

      .log('Click Show all btn on Invitations section')
      .clickElementOnText('#invitations span', 'Show all')
      .verifyTextVisible('Invited workers');
  });

  it('ES-T3181. Check Mable News: Helping to protect our Mable community', () => {
    const clientEmail = 'automation_anna.dashboard+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginAPI(clientEmail, clientPass)
      .visit('/dashboard')

      .log('Check Mable news')
      .checkMableNewsOnClientDashboard()

      .log('Click Learn more btn')
      .clickElementOnText('#mableNews a', 'Learn more')
      .verifyTextVisible('How Last Minute jobs work')
      .verifyTextVisible('Create a Last Minute job')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Click Post a job btn')
      .clickElementOnText('#mableNews a', 'Post a job')
      .verifyTextVisible('Post a job')
      .verifyTextVisible('Create a Last Minute job')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')
      .verifyTextVisible('Mable news');
  });

  it('ES-T1192. Invitations tile: Declined Invitations Visibility', () => {
    const clientEmail = 'automation_anna.dashboard+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginAPI(clientEmail, clientPass)
      .visit('/dashboard')

      .log('Check Invitations')
      .verifyElementContainsText('#invitations h3', 'Invitations')

      .log('Check declined invitation panel')
      .verifyElementContainsText('#invitations .actionsContainer', 'Declined');
  });

  it('ES-T1191. Invitations tile: Accepted Invitations Visibilit', () => {
    const clientEmail = 'automation_anna.dashboard+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginAPI(clientEmail, clientPass)
      .visit('/dashboard')

      .log('Check Invitations')
      .verifyElementContainsText('#invitations h3', 'Invitations')

      .log('Check declined invitation panel')
      .verifyElementContainsText('#invitations .actionsContainer', 'Accepted');
  });

  it('ES-T1190. Invitations tile: New Sent Invitations Visibility', () => {
    const clientEmail = 'automation_nica.completeprofile+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginAPI(clientEmail, clientPass)
      .visit('/dashboard')

      .log('Check Invitations')
      .verifyElementContainsText('#invitations h3', 'Invitations')

      .log('Check declined invitation panel')
      .verifyElementContainsText('#invitations .actionsContainer', 'Sent');
  });

  it('ES-T1189. Agreements tile: Declined Agreement Visibility', () => {
    const clientEmail = 'automation_declinedagreement@donotuse.com.au';
    const clientPass = 'qaAutomation2021';
    const clientId = '25179';

    const workerEmail = 'automation_cham.nc+sw@donotuse.com.au';
    const workerPass = 'qaAutomation2021';
    // const workerName = 'Cham N';
    const workerId = '21619';

    cy
      .removeAgreementIfExist(clientEmail, clientPass, workerId)
      .sendAgreementAsWorker(
        workerEmail,
        workerPass,
        clientId,
      )

      .log('Login')
      .loginAPI(clientEmail, clientPass)
      .visit('/dashboard')

      .log('Check the Agreements section')
      .verifyElementContainsText('#recentAgreements h3', 'Agreements')

      .log('Click View btn on "Pending" agreement')
      .get('.agreementChip span')
      .contains('Pending')
      .parents('.agreementPanel')
      .find('button')
      .contains('View')
      .click()
      .wait(2000)

      .log('Click Decline btn')
      .clickElementOnText(
        '.agreementsActions button span',
        'Decline',
      )

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Verify the declined Agreement should not be visible in agreements list')
      .get('.agreementInfo div')
      .should('not.exist');
  });

  it('ES-T1188. Agreements tile: Accepted Agreement Visibility', () => {
    const clientEmail = 'automation_nica.completeprofile+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';
    const clientId = '22315';

    const workerEmail = 'automation_eugene.osinski_sendagreement+worker@donotuse.com.au';
    const workerPassword = 'qaAutomation2021';
    const workerName = 'Eugene O';
    const workerId = '35061';

    // const workerEmail = 'automation_mark.clientagreement01@donotuse.com.au';
    // const workerPassword = 'qaAutomation2021';
    // const workerName = 'Herbert C';
    // const workerId = '31729';

    cy
      .removeAgreementIfExist(clientEmail, clientPass, workerId)
      .sendAgreementAsWorker(workerEmail, workerPassword, clientId)

      .log('Login')
      .loginAPI(clientEmail, clientPass)
      .visit('/dashboard')

      .log('Check client dashboard page')
      .verifyTextVisible('Agreements')
      .verifyTextExist('The agreements below need your feedback or approval. Your approved and terminated agreements can be found on \'My support workers\' page.')

      .log('Check Agreements tile under Find Support tile')
      .verifyTextExist(workerName)
      .verifyTextExist('View profile')

      .log('Check new offer of agreement status')
      .verifyTextExist('Pending')

      .log('Click View button')
      .get('div.bold')
      .contains(workerName)
      .parents('div.agreementInfoContainer')
      .siblings('button')
      .contains('View')
      .click()
      .verifyTextExist(`Agreement with ${workerName}`)

      .log('Click Accept Agreement button')
      .clickElementOnText('div.agreementsActions button span', 'Accept agreement')
      .wait(2000)

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Check Agreements tile');
    cy.clickLogoutOnTopMenu();

    // For automation maintenance purpose. See details in ES-T1188
    cy.wait(2000)
      .clearCookies()
      .clearLocalStorage();

    cy.visit('/')
      .loginAPI(workerEmail, workerPassword)
      .visit('/dashboard')

      .log('Click "My Client"')
      .navigateByLeftMenuInDashboard(' My clients ')

      .log('Select Nica Smith and click "View agreement"')
      .verifyElementVisible('app-clients-list .clientContactItem')
      .clickElementOnText('span', 'View agreement')
      .verifyTextExist('Agreement with Nica Smith')

      .log('Terminate the agreement')
      .clickElement('button.collapseIcon app-icon')
      .clickElementOnText('button span', 'Terminate agreement')
      .verifyElementVisible('app-terminate-agreement')
      .verifyTextExist('Terminate agreement')
      .clickElementOnText('span', 'The client no longer needs support')
      .clickElementOnText('button span', 'Terminate agreement')

      .log('Click Inbox on the left NAV')
      .navigateByLeftMenuInDashboard('Inbox')

      .log('Select Nica S and offer an agreement')
      .clickElementOnText('span', 'Nica');
    // .verifyTextExist('Chat info')
    // .wait(2000)
    // .clickElementOnText('app-expansion-panel button span', 'Offer an agreement')
    // .verifyTextExist('Offer new agreement to Nica')

    // .log('Complete the mandatory field and send the agreement')
    // .inputTextField('textarea[formcontrolname="agreedService"]', 'Automation testing...')
    // .clickElementOnText('span.radioLabel', 'Ongoing')
    // .selectDropdown('app-date-selector[formcontrolname="expectedStartDate"] select', '1', 0)
    // .selectDropdown(
    // 'app-date-selector[formcontrolname="expectedStartDate"] select', 'January', 1)
    // .selectDropdown('app-date-selector[formcontrolname="expectedStartDate"] select', '2024', 2)
    // .inputTextField('input[formcontrolname="name"]', 'weekday')
    // .clickElementOnText('span', 'Offer agreement to Nica')
    // .verifyTextExist('Inbox');
  });

  it('ES-T1187. Agreements tile: Edit Last Sent Agreement Visibility', () => {
    const clientEmail = 'automation_editagreement.dashboard@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginAPI(clientEmail, clientPass)
      .visit('/dashboard')

      .log('Check the Agreements section')
      .verifyElementContainsText('#recentAgreements h3', 'Agreements')

      .log('Check edited offer of agreement in agreement tile')
      .verifyTextExist('Ed S')
      .verifyTextExist('Pending')

      .log('Click View button')
      .get('div.bold')
      .contains('Ed S')
      .parents('div.agreementInfoContainer')
      .siblings('button')
      .contains('View')
      .click()
      .verifyTextExist('Agreement with Ed S')

      .log('Click Dashboard from left menu panel')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Check Agreements tile')
      .verifyTextExist('Ed S')
      .verifyTextExist('View profile')
      .verifyTextExist('View')
      .verifyTextExist('Pending');
  });

  it('ES-T1186. Agreements tile: Amend Accepted Agreement Visibility', () => {
    const clientEmail = 'automation_openjobstile@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginAPI(clientEmail, clientPass)
      .visit('/dashboard')

      .log('Check client dashboard page')
      .verifyTextVisible('Agreements')
      .verifyTextExist('The agreements below need your feedback or approval. Your approved and terminated agreements can be found on \'My support workers\' page.')

      .log('Check Agreements tile under Find Support tile')
      .verifyTextExist('Ed Sheeran')
      .verifyTextExist('View profile')
      .verifyTextExist('View')

      .log('Check amend accepted agreement status')
      .verifyTextExist('Changes')

      .log('Click View button')
      .get('div.bold')
      .contains('Ed Sheeran')
      .parents('div.agreementInfoContainer')
      .siblings('button')
      .contains('View')
      .click()
      .verifyTextExist('Agreement with Ed Sheeran')

      .log('Click Dashboard from left menu panel')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Check Agreements tile')
      .verifyTextExist('Ed Sheeran')
      .verifyTextExist('View profile')
      .verifyTextExist('View')
      .verifyTextExist('Changes');
  });

  it('ES-T1185. Agreements tile: New Agreement Visibility', () => {
    const clientEmail = 'automation_editagreement.dashboard@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginAPI(clientEmail, clientPass)
      .visit('/dashboard')

      .log('Check the Agreements section')
      .verifyElementContainsText('#recentAgreements h3', 'Agreements')

      .log('Check edited offer of agreement in agreement tile')
      .verifyTextExist('Ed S')
      .verifyTextExist('Pending')

      .log('Click View button')
      .get('div.bold')
      .contains('Ed S')
      .parents('div.agreementInfoContainer')
      .siblings('button')
      .contains('View')
      .click()
      .verifyTextExist('Agreement with Ed S')

      .log('Click Dashboard from left menu panel')
      .navigateByLeftMenuInDashboard('Dashboard');
  });

  it('ES-T1182. Open Job: Newly Posted Private Job Visibility', () => {
    const clientEmail = 'automation_anna.dashboard+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy
      .createPJOnlyDes2ByAPI(
        clientEmail,
        clientPass,
      )
      .log('Login')
      .loginAPI(clientEmail, clientPass)
      .visit('/dashboard')

      .log('Check Open jobs section')
      .verifyElementContainsText('#postedJobs h3', 'Open jobs')

      .log('Click View btn on Open jobs')
      .clickElementOnText('#postedJobs button', 'View')

      .log('Verify user is rediredted to job detail page')
      .verifyCurrentURL('private-jobs')
      .verifyTextVisible('Post to local workers')
      .verifyTextVisible('Mark job as filled')
      .verifyTextVisible('Cancel job')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')
      .verifyElementContainsText('#postedJobs h3', 'Open jobs');
  });

  it('ES-T1181. Open Job: Cancelled Last Minute Job Visibility', () => {
    const clientEmail = 'automation_mark.lastminutejob@donotuse.com.au';
    const clientPass = 'qaAutomation2021';
    const jobTitle = faker.name.jobTitle();

    cy
      .createLastMinuteJob(
        clientEmail,
        clientPass,
        jobTitle,
        '48467',
        'Sandy Bay TAS 7005',
      )

      .log('Login')
      .loginAPI(clientEmail, clientPass)
      .visit('/dashboard')

      .log('Check Open jobs section')
      .verifyElementContainsText('#postedJobs h3', 'Open jobs')

      .log('Click View btn on Open jobs')
      .clickElementOnText('.jobTitle', jobTitle)

      .log('Click Cancel job btn')
      .verifyElementVisible('app-view-last-minute-job')
      .verifyTextExist('Cancel Job')
      .clickElementOnText(
        'button span',
        'Cancel Job',
      )

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')
      .wait(2000)
      .verifyElementNotContainsText('.jobTitle', jobTitle);
  });

  it('ES-T1180. Open Job: Filled Last Minute Job Visibility', () => {
    const clientEmail = 'automation_nica.completeprofile+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';
    const jobTitle = faker.name.jobTitle();
    const jobLocation = 'Barangaroo NSW 2000';
    const postCode = '34160';

    cy
      .createLastMinuteJob(
        clientEmail,
        clientPass,
        jobTitle,
        postCode,
        jobLocation,
      ).then(res => {
        const jobId = res.body.data.id;
        Cypress.env('jobId', jobId);
        cy.wait(4000)
          .pickJob(
            jobId,
            'automation_mark.supportworker21@donotuse.com.au',
            'qaAutomation2021',
          )
          .wait(2000)
          .pickJob(
            jobId,
            'automation_mark.supportworker22@donotuse.com.au',
            'qaAutomation2021',
          )
          .wait(2000)
          .pickJob(
            jobId,
            'automation_mark.supportprovider23@donotuse.com.au',
            'qaAutomation2021',
          );
      });

    cy.log('Login')
      .visit('/')
      .checkInboxPopup()
      .loginToDashboard(clientEmail, clientPass)

      .log('Check Open jobs section')
      .verifyElementContainsText('#postedJobs h3', 'Open jobs')
      .checkInboxPopup()

      .log('Click View btn on Lmj job with status as Pending')
      .clickElementOnText('.jobTitle', jobTitle)
      .verifyCurrentURL('jobs/view')

      .log('Check instant book btn')
      .get('body')
      .then($body => {
        if ($body.find('.action button:contains(Instant book)').length > 0) {
          cy
            .clickElementOnText('.action button', 'Instant book')
            .verifyTextVisible('Confirm booking with')
            .clickElementOnText('button', 'Confirm booking')
            .log('Verify Filled message')
            .verifyTextVisible(data.LMJContent.client.jobDetails.filledMessage)

            .log('Click Dashboard')
            .navigateByLeftMenuInDashboard('Dashboard')
            .wait(2000)
            .verifyElementNotContainsText('.jobTitle', jobTitle)

            .cancelJob(Cypress.env('jobId'), clientEmail, clientPass);
        }
      });
  });

  it('ES-T1177. Open Job: Cancelled Regular Job Visibility', () => {
    const clientEmail = 'automation_anna.dashboard+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    const jobTitle = faker.name.jobTitle();
    const loacation = 'Acton ACT 2601';
    const geoID = '37274';

    cy
      .createRegularJobByAPI(clientEmail, clientPass, jobTitle, loacation, geoID)
      .log('Login')
      .loginAPI(clientEmail, clientPass)
      .visit('/dashboard')

      .log('Check Open jobs section')
      .verifyElementContainsText('#postedJobs h3', 'Open jobs')

      .log('Click View btn on regular job')
      .clickElementOnText('.jobTitle', jobTitle)
      .verifyCurrentURL('jobs/view')
      .verifyTextVisible('Job details')

      .log('Click Cancel job btn')
      .clickElementOnText(
        'button span',
        'Cancel job',
      )

      .log('The cancel popup is shown')
      .verifyTextVisible('Why are you cancelling it?')
      .clickElementOnText('.radioLabel', 'I found a worker on Mable')

      .log('Click Cancel Job on the popup')
      .clickElementOnText(data.postAJob.cancelJobPop.btn, 'Cancel Job')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')
      .wait(2000)
      .verifyElementNotContainsText('.jobTitle', jobTitle);
  });

  it('ES-T1178. Open Job: Newly Posted Last Minute Job Visibility', () => {
    const clientEmail = 'automation_mark.lastminutejob@donotuse.com.au';
    const clientPass = 'qaAutomation2021';
    const jobTitle = faker.name.jobTitle();

    cy
      .createLastMinuteJob(
        clientEmail,
        clientPass,
        jobTitle,
        '48467',
        'Sandy Bay TAS 7005',
      )

      .log('Login')
      .loginAPI(clientEmail, clientPass)
      .visit('/dashboard')

      .log('Check Open jobs section')
      .verifyElementContainsText('#postedJobs h3', 'Open jobs')

      .log('Click View btn on Open jobs')
      .clickElementOnText('.jobTitle', jobTitle)

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')
      .wait(2000)
      .verifyElementContainsText('.jobTitle', jobTitle);
  });

  it('ES-T1157. Open Job: Filled Standard Job Visibility', () => {
    const clientEmail = 'automation_anna.dashboard+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    const jobTitle = faker.name.jobTitle();
    const loacation = 'Acton ACT 2601';
    const geoID = '37274';

    cy
      .createRegularJobByAPI(clientEmail, clientPass, jobTitle, loacation, geoID)
      .log('Login')
      .loginAPI(clientEmail, clientPass)
      .visit('/dashboard')

      .log('Check Open jobs section')
      .verifyElementContainsText('#postedJobs h3', 'Open jobs')

      .log('Click View btn on regular job')
      .clickElementOnText('.jobTitle', jobTitle)
      .verifyCurrentURL('jobs/view')
      .verifyTextVisible('Job details')

      .log('Click "Mark job as filled"')
      .clickElementOnText('button span', 'Mark job as filled')
      .clickElement('input[type="radio"][name="reason"]', true, 0)
      .clickElementOnText('button', 'Mark filled')

      .log('Click Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')
      .wait(2000)
      .verifyElementNotContainsText('.jobTitle', jobTitle);
  });
});
