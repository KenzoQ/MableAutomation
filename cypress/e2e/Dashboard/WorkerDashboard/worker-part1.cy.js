/* eslint-disable no-unused-vars */
import * as data from '../../../fixtures/test-data.json';

describe('Worker Dashboard', () => {
  const { completedWorker } = data.dashboardAccount;
  const { incompleteWorker } = data.dashboardAccount;
  const { inProgressWorker } = data.dashboardAccount;
  const { WAPWorker } = data.dashboardAccount;
  const { newlyApprovedWorker } = data.dashboardAccount;
  const { NAIncompleteWorkerNew } = data.dashboardAccount;

  const { WAPIncompleteWorker2 } = data.dashboardAccount;

  const { incompleteNoNDISWorker } = data.dashboardAccount;
  const { unflushotNoNDISPendingAgrWorker } = data.dashboardAccount;

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('ES-T631. Active profile worker dashboard', () => {
    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        completedWorker.email,
        completedWorker.password,
      )
      .findAndCloseCovidPopup(1)
      .log('Check "Welcome back <worker>" hero image')
      .verifyTextExist('Welcome back')
      .verifyElementExist('.heroImageContainer')

      .log('Check "Jobs" link')
      .verifyElementContainsText('.heroImageContainer a', 'jobs')

      .log('Click "Jobs" link')
      // .clickElementOnText('a[target="_blank"]', 'jobs')

      .log('Verify Agreement is visible')
      .verifyTextVisible('Agreements')
      .verifyTextExist('The agreements below need your attention. Your active and terminated agreements can be found on the \'My Clients\' page.')

      .log('Click "Show all"')
      .get('div[id="recentAgreements"] span')
      .contains('Show all')
      .should('be.visible')
      .click()
      .verifyTextExist('My clients')

      .log('Go to Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('On the agreement tile click "View"')
      .get('div[id="recentAgreements"] button')
      .contains('View')
      .click()
      .url()
      .should('include', '/conversation')
      .verifyTextExist('Inbox')

      .log('Go to Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')
      .reload()

      .log('Check "Update due" tile')
      .verifyTextExist('Updates due')

      .log('Check update due items')
      .verifyTextExist('Seasonal Flu Vaccine')

      .log('On "Seasonal Flu Vaccine" click "Update"')
      .get('div.updateType')
      .contains('Seasonal Flu Vaccine')
      .siblings('button')
      .contains('Update')
      .click()
      .url()
      .should('include', '/profile-building/immunisation')
      .verifyTextExist('Flu vaccine')

      .log('Go to Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Check "Invitation" tile')
      .verifyTextExist('Invitations')
      .verifyTextExist('You have been invited by the following people to join their team of support:')

      .log('Check "What\'s new?"')
      .verifyTextExist('What’s new?')
      .waitAppLoaderNotVisible()
      .verifyElementVisible('div#mableNews')
      .get('div#mableNews')
      .last()
      .scrollIntoView()

      .log('Check "What\'s new?" items')
      .checkButtonWithTextContainsLink('div[id="mableNews"] .panel button', 'Go to Wellbeing Platform', data.dashboardFeature.mableNews.MableWellbeingPlatformLink)
      .checkButtonWithTextContainsLink('div[id="mableNews"] .panel button', 'Go to YOUTax', data.dashboardFeature.mableNews.MableTaxBenefitsProgramLink)
      .checkButtonWithTextContainsLink('div[id="mableNews"] .panel button', 'Go to Learning Hub', data.dashboardFeature.mableNews.ProfessionalDevelopmentLink)
      .checkButtonWithTextContainsLink('div[id="mableNews"] .panel button', 'Access Guidelines', data.dashboardFeature.mableNews.ScreeningToolForShiftsLink)
      .checkButtonWithTextContainsLink('div[id="mableNews"] .panel button', 'Go to Mable Equip', data.dashboardFeature.mableNews.HelpingToProtectOurMableCommunityLink);
  });

  it('ES-T632. Active profile worker dashboard, incomplete profile building', () => {
    const account = incompleteWorker;

    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        account.email,
        account.password,
      )
      .findAndCloseCovidPopup(1)
      .log('Check "Welcome back <worker>" hero image')
      .verifyTextExist('Welcome back')
      .verifyElementExist('.heroImageContainer')

      .log('Check "Jobs" link')
      .verifyElementContainsText('.heroImageContainer a', 'jobs')

      .log('Click "Jobs" link')
      // .clickElementOnText('a[target="_blank"]', 'jobs')

      .log('Go to Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Check profile building tile')
      .log('Check "Build profile" button')
      .verifyListTextExistNoWaitV2(data.dashboardFeature.LetsBuildYourProfile)

      .log('Click "Build profile" button')
      .clickElementOnText('button', 'Build profile')
      .verifyTextExist('My profile')
      .verifyTextExist('Bank account')

      .log('On the left navigation pane, click "Dashboard"')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Verify Agreement is visible')
      .verifyTextVisible('Agreements')
      .verifyTextExist('The agreements below need your attention. Your active and terminated agreements can be found on the \'My Clients\' page.')

      .log('Click "Show all"')
      .get('div[id="recentAgreements"] span')
      .contains('Show all')
      .should('be.visible')
      .click()
      .verifyTextExist('My clients')

      .log('Go to Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('On the agreement tile click "View"')
      .get('div[id="recentAgreements"] button')
      .contains('View')
      .click()
      .url()
      .should('include', '/conversation')
      .checkInboxPopup()
      .verifyTextExist('Inbox')

      .log('Go to Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Check "Immediate action required" tile')
      .verifyTextExist('Immediate action required')

      .log('Check Immediate action required items')
      .verifyTextExist('COVID-19 vaccine')

      .log('Click the update button on the Covid-19 vaccine tile')
      .get('div.documentType')
      .contains('COVID-19 vaccine')
      .parents('.panel')
      .find('button')
      .contains('Update')
      .click()
      .url()
      .should('include', '/profile-building/immunisation')
      .verifyTextExist('Immunisation')
      .verifyTextExist('COVID-19 vaccine status')

      .log('Go to Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Check "Update due" tile')
      .verifyTextExist('Updates due')

      .log('Check update due items')
      .verifyTextExist('NDIS Worker Screening Check')
      .verifyTextExist('Seasonal Flu Vaccine')

      .log('On "NDIS Worker Screening Check" click "Update"')
      .get('div.updateType')
      .contains('NDIS Worker Screening Check')
      .siblings('button')
      .contains('Update')
      .click()
      .url()
      .should('include', '/profile-building/ndis-worker-screening')
      .verifyTextExist('NDIS Worker Screening Check')

      .log('Go to Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('On "Seasonal Flu Vaccine" click "Update"')
      .get('div.updateType')
      .contains('Seasonal Flu Vaccine')
      .siblings('button')
      .contains('Update')
      .click()
      .url()
      .should('include', '/profile-building/immunisation')
      .verifyTextExist('Flu vaccine')

      .log('Go to Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Check "Invitation" tile')
      .verifyTextExist('Invitations')
      .verifyTextExist('You have been invited by the following people to join their team of support:')

      .log('Check "What\'s new?"')
      .verifyTextExist('What’s new?')

      .log('Check "What\'s new?" items')
      .checkButtonWithTextContainsLink('div[id="mableNews"] button', 'Go to Wellbeing Platform', data.dashboardFeature.mableNews.MableWellbeingPlatformLink)
      .checkButtonWithTextContainsLink('div[id="mableNews"] button', 'Go to YOUTax', data.dashboardFeature.mableNews.MableTaxBenefitsProgramLink)
      .checkButtonWithTextContainsLink('div[id="mableNews"] button', 'Go to Learning Hub', data.dashboardFeature.mableNews.ProfessionalDevelopmentLink)
      .checkButtonWithTextContainsLink('div[id="mableNews"] button', 'Access Guidelines', data.dashboardFeature.mableNews.ScreeningToolForShiftsLink)
      .checkButtonWithTextContainsLink('div[id="mableNews"] button', 'Go to Mable Equip', data.dashboardFeature.mableNews.HelpingToProtectOurMableCommunityLink);
  });

  it('ES-T634. Incomplete worker profile dashboard, with profile progress', () => {
    data.dashboardFeature.immediateActionRequired.policeCheckTitle = null;
    data.dashboardFeature.immediateActionRequired.workingWithChildrenTitle = null;
    data.dashboardFeature.immediateActionRequired.heathRegTitle = null;
    data.dashboardFeature.immediateActionRequired.nursingReg = null;
    const account = inProgressWorker;
    // data.dashboardFeature.updatesDue.statDecTitle = null;
    // data.dashboardFeature.updatesDue.ndisTitle = null;
    cy.log('Login')
      .visit('/');
    cy.loginToDashboard(
      account.email,
      account.password,
    )
      .log('Check title message')
      .verifyTextExist('You\'re almost there!')

      .log('Check progress checker')
      .verifyTextVisible('What you\'ll need to set up your account')

      .log('Check progress item')
      .verifyTextVisible('Relevant qualification documents')
      .verifyTextVisible('Two references')
      .verifyTextVisible('Mandatory COVID-19 training')
      .verifyTextVisible('COVID-19 vaccination as required by your state')
      .verifyTextVisible('Police Check through Mable or a current check')
      .verifyTextVisible(
        'Working with Children Check (if working with children)',
      )

      .log('Check progress bar')
      .verifyElementExist('mat-progress-bar')

      .log('Click Resume account setup')
      .clickElementOnText('a', 'Resume account setup')
      .verifyElementContainsText('h2.welcomeTitle', 'let\'s get started!')

      .log('Chick Back to dashboard')
      .clickElementOnText('button span', 'Back to dashboard')

      .log('Check Helpful link')
      .verifyElementExist('#helpLinks')
      .verifyTextExist('Getting started as a worker')
      .verifyTextExist('Five ways to make your worker profile stand out')
      .verifyTextExist('How to create a winning profile')
      .verifyTextExist('your area')
      .verifyMultipleHreftList('div#helpLinks',
        'https://mable.com.au/help_topic/getting-started-as-a-worker/',
        'https://blog.mable.com.au/blog/care-workers/five-ways-to-make-your-worker-profile-stand-out-on-mable/',
        'https://mable.com.au/help_centre/create-winning-profile/',
        'https://uat.containers.staging-mable.com.au/app/workers/posted_jobs',
        'https://mable.com.au/covid-19/vaccination/');
  });

  it('ES-T635. Waiting for approval profile worker dashboard, answered flushot', () => {
    data.dashboardFeature.immediateActionRequired.policeCheckTitle = null;
    data.dashboardFeature.immediateActionRequired.workingWithChildrenTitle = null;
    data.dashboardFeature.immediateActionRequired.heathRegTitle = null;
    data.dashboardFeature.immediateActionRequired.nursingReg = null;
    const account = WAPWorker;
    // data.dashboardFeature.updatesDue.statDecTitle = null;
    // data.dashboardFeature.updatesDue.ndisTitle = null;
    cy.log('Login')
      .visit('/');
    cy.loginToDashboard(
      account.email,
      account.password,
    )

      .log('Check Thanks message')
      .verifyTextVisible('Thanks Iris!')

      .verifyTextVisible('Your account setup is complete and pending approval.')
      .verifyTextVisible('When the relevant sources send us your documents, we’ll review them within 3 weeks and approve your account.')
      .verifyTextVisible('Police check by Checked')
      .verifyTextVisible('Once your account is approved, you will receive an email.')
      .verifyTextVisible('Email sent')

      .log('Check nominated references tile')
      .verifyElementVisible('div#referencesStatus')
      .verifyTextVisible('Nominated references')

      .log('Click "Edit account setup" btn')
      .verifyTextVisible('Edit account setup')

      .log('Check Helpful link')
      .verifyElementExist('#helpLinks')
      .verifyTextExist('How workers can get the most out of Mable')
      .verifyTextExist('How to build your client base')
      .verifyTextExist('your area')
      .verifyTextExist('COVID-19 vaccination information')
      .verifyMultipleHreftList('div#helpLinks',
        'https://blog.mable.com.au/blog/care-workers/top-tips-revealed-the-secrets-from-the-mable-team-about-how-workers-can-get-the-most-out-of-the-platform/',
        'https://mable.com.au/help_centre/build-client-base/',
        'https://uat.containers.staging-mable.com.au/app/workers/posted_jobs',
        'https://mable.com.au/covid-19/vaccination/',
      );
  });

  it('ES-T636. Waiting for approval profile worker dashboard, incomplete profile building', () => {
    cy.log('Login')
      .visit('/')
      .log('Pre-condition: Account have to approve util 30days');
    const account = WAPIncompleteWorker2;
    data.dashboardFeature.elements.accessGuidelines = null;
    data.dashboardFeature.updatesDue.statDecTitle = null;
    data.dashboardFeature.immediateActionRequired.workingWithChildrenTitle = null;
    data.dashboardFeature.immediateActionRequired.nursingReg = null;
    data.dashboardFeature.immediateActionRequired.heathRegTitle = null;
    data.dashboardFeature.immediateActionRequired.policeCheckTitle = null;
    data.dashboardFeature.mableNews.shiftsTitle = null;
    data.dashboardFeature.mableNews.shiftsContent = null;
    data.dashboardFeature.mableNews.accessGuidelines = null;
    data.dashboardFeature.thingsHelpful.lblTricky = null;
    data.dashboardFeature.thingsHelpful.lblMableHelp = null;
    data.dashboardFeature.businessAndFlyersElements.mableHelp = null;
    data.dashboardFeature.businessAndFlyersElements.trickyQuestion = null;
    data.dashboardFeature.businessAndFlyersElements.businessPDF = null;
    data.dashboardFeature.thanks.thanksContent02 = 'When the relevant sources send us your documents, we’ll review them within 3 weeks and approve your account.';
    cy.loginToDashboard(
      account.email,
      account.password,
    );
    cy.checkDashboardContent(data.dashboardFeature.thanks,
      // data.dashboardFeature.immediateActionRequired,
      data.dashboardFeature.thingsHelpful,
      data.dashboardFeature.businessAndFlyersElements)
      .verifyTextVisible('When the relevant sources send us your documents, we’ll review them within 3 weeks and approve your account.')
      .verifyTextVisible('Police check by Checked')
      .verifyTextVisible('References')
      .verifyTextVisible('Once your account is approved, you will receive an email.')

      .verifyElementVisible('div#invitations')
      .log('Check Nominated references')
      .verifyTextVisible('Nominated references')
      .verifyTextVisible('Unable to reach referee')

      .log('Click Set up your account')
      .clickElementOnText('a', 'Edit account setup')
      .verifyElementContainsText('h2.welcomeTitle', 'let\'s get started!')

      .log('Back to dashboard')
      .clickElementOnText('button span', 'Back to dashboard')

      .log('Check profile buiding tile')
      .verifyTextVisible("Let's build your profile")

      .log('Click "Build Profile" btn')
      .clickElementOnText('button', 'Build profile')

      .verifyElementVisible('app-dialog')
      .verifyTextVisible('Edit your profile')
      .verifyTextVisible('If you would like to make changes to your: bio, services you offer or update your qualifications, please contact the Mable team. Call 1300 736 573 or email info@mable.com.au with your proposed changes.')
      .verifyTextVisible('For everything else, please continue to edit your profile.')
      .clickElementOnText('button', 'Continue to edit my profile')

      .log('Check My profile')
      .verifyElementVisible('app-profile-building')

      .log('Back to dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .verifyMultipleHreftList('div#helpLinks',
        'https://blog.mable.com.au/blog/care-workers/top-tips-revealed-the-secrets-from-the-mable-team-about-how-workers-can-get-the-most-out-of-the-platform/',
        'https://mable.com.au/help_centre/build-client-base/',
        'https://uat.containers.staging-mable.com.au/app/workers/posted_jobs',
        'https://mable.com.au/covid-19/vaccination/');
  });

  it('ES-T637. Newly approved profile worker dashboard, answered flushot', () => {
    data.dashboardFeature.immediateActionRequired.policeCheckTitle = null;
    data.dashboardFeature.immediateActionRequired.workingWithChildrenTitle = null;
    data.dashboardFeature.immediateActionRequired.heathRegTitle = null;
    data.dashboardFeature.immediateActionRequired.nursingReg = null;
    const account = newlyApprovedWorker;
    // data.dashboardFeature.updatesDue.statDecTitle = null;
    // data.dashboardFeature.updatesDue.ndisTitle = null;
    cy.log('Login')
      .visit('/');
    cy.loginToDashboard(
      account.email,
      account.password,
    )
      .findAndCloseCovidPopup(1)
      .log('Check "Congratulations <worker>" hero image')
      .verifyTextExist('Congratulations')
      .verifyElementExist('.heroImageContainer')

      .log('Check "Start applying for job" link')
      .verifyTextExist('start applying for jobs.')

      .log('Click "Start applying for job" link')
      .clickElementOnText('a', 'start applying for jobs.')
      .verifyTextExist('Jobs')
      .verifyCurrentURL('/jobs/search')

      .log('Go to Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Check business cards and flyers')
      .verifyTextExist('Business cards and flyers')

      .log('Click "Preview and download PDF"')
      .verifyTextExist('Preview and download PDF')

      .log('Check Helpful link')
      .verifyElementExist('#helpLinks')
      .verifyTextExist(
        'Your tricky questions as an independent worker explored',
      )
      .verifyTextExist('How to build your client base')
      .verifyTextExist('Mable\'s Help Centre')
      .checkATagWithTextContainsLink(' Your tricky questions as an independent worker explored', data.dashboardFeature.thingsHelpfulLink.yourTrickyQuestion)
      .checkATagWithTextContainsLink(' How to build your client base', data.dashboardFeature.thingsHelpfulLink.howToBuildYourClientBase)
      .checkATagWithTextContainsLink(' Mable\'s Help Centre', data.dashboardFeature.thingsHelpfulLink.MableHelpCenter)

      .log('Check "What\'s new?"')
      .verifyTextExist('What’s new?')
      .waitAppLoaderNotVisible()
      .verifyElementVisible('div#mableNews')

      .log('Check "What\'s new?" items')
      .checkButtonWithTextContainsLink('div[id="mableNews"] button', 'Go to Wellbeing Platform', data.dashboardFeature.mableNews.MableWellbeingPlatformLink)
      .checkButtonWithTextContainsLink('div[id="mableNews"] button', 'Go to YOUTax', data.dashboardFeature.mableNews.MableTaxBenefitsProgramLink)
      .checkButtonWithTextContainsLink('div[id="mableNews"] button', 'Go to Learning Hub', data.dashboardFeature.mableNews.ProfessionalDevelopmentLink)
      .checkButtonWithTextContainsLink('div[id="mableNews"] button', 'Go to Mable Equip', data.dashboardFeature.mableNews.HelpingToProtectOurMableCommunityLink);
  });

  it('ES-T638. Newly approved profile worker dashboard, incomplete profile building', () => {
    data.dashboardFeature.immediateActionRequired.policeCheckTitle = null;
    data.dashboardFeature.immediateActionRequired.workingWithChildrenTitle = null;
    data.dashboardFeature.immediateActionRequired.heathRegTitle = null;
    data.dashboardFeature.immediateActionRequired.nursingReg = null;
    cy.log('Login')
      .visit('/')
      .log('Pre-condition: Account have to approve util 30days');
    const account = NAIncompleteWorkerNew;
    data.dashboardFeature.updatesDue.statDecTitle = null;
    // data.dashboardFeature.updatesDue.ndisTitle = null;
    data.dashboardFeature.mableNews.shiftsTitle = null;
    data.dashboardFeature.mableNews.shiftsContent = null;
    data.dashboardFeature.mableNews.accessGuidelines = null;
    cy.unapprovedThenApprovedAgain(account.email, account.password)
      .loginToDashboard(
        account.email,
        account.password,
      )
      .findAndCloseCovidPopup(1)
      .log('Check "Congratulations <worker>" hero image')
      .verifyTextExist('Congratulations')
      .verifyElementExist('.heroImageContainer')

      .log('Check "Start applying for job" link')
      .verifyTextExist('start applying for jobs.')

      .log('Click "Start applying for job" link')
      .clickElementOnText('a', 'start applying for jobs.')
      .verifyTextExist('Jobs')
      .verifyCurrentURL('/jobs/search')

      .log('Go to Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Check business cards and flyers')
      .verifyTextExist('Business cards and flyers')

      .log('Click "Preview and download PDF"')
      .verifyTextExist('Preview and download PDF')

      .log('Check profile building tile')
      .log('Check "Build profile" button')
      .verifyListTextExistNoWaitV2(data.dashboardFeature.LetsBuildYourProfile)

      .log('Click "Build profile" button')
      .clickElementOnText('button', 'Build profile')
      .verifyTextExist('My profile')
      .verifyTextExist('Bank account')

      .log('On the left navigation pane, click "Dashboard"')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Check Helpful link')
      .verifyElementExist('#helpLinks')
      .verifyTextExist(
        'Your tricky questions as an independent worker explored',
      )
      .verifyTextExist('How to build your client base')
      .verifyTextExist('Mable\'s Help Centre')
      .checkATagWithTextContainsLink(' Your tricky questions as an independent worker explored', data.dashboardFeature.thingsHelpfulLink.yourTrickyQuestion)
      .checkATagWithTextContainsLink(' How to build your client base', data.dashboardFeature.thingsHelpfulLink.howToBuildYourClientBase)
      .checkATagWithTextContainsLink(' Mable\'s Help Centre', data.dashboardFeature.thingsHelpfulLink.MableHelpCenter)

      .log('Check "Immediate action required" tile')
      .log('Check Immediate action required items')
      .verifyListTextExistNoWaitV2([data.dashboardFeature.immediateActionRequired.title,
        data.dashboardFeature.immediateActionRequired.covidTitle])

      .log('Click "Update" button on COVID-19 vaccine in Immediate action required tile')
      .get('.documentType')
      .contains('COVID-19 vaccine')
      .parents('.panel')
      .children('button')
      .click()
      .verifyTextExist('My profile')
      .verifyTextExist('Immunisation')

      .log('On the left navigation pane, click "Dashboard"')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Check the "Updates due" tile.')
      .verifyTextExist('NDIS Worker Screening Check')
      .verifyTextExist('NDIS Worker Orientation Module')
      .verifyTextExist('Seasonal Flu Vaccine')

      .log('Click "Update" button on NDIS Worker screening check in Updates due tile')
      .get('div.updateType')
      .contains('NDIS Worker Screening Check')
      .siblings('button')
      .click()
      .verifyTextExist('My profile')
      .verifyTextExist('NDIS Worker Screening Check')

      .log('On the left navigation pane, click "Dashboard"')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Click "Update" button on NDIS Worker Orientation Module in Updates due tile')
      .get('div.updateType')
      .contains('NDIS Worker Orientation Module')
      .siblings('button')
      .click()
      .verifyTextExist('NDIS Worker Orientation Module')
      .verifyCurrentURL('/ndis-worker-orientation')

      .log('On the left navigation pane, click "Dashboard"')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Click "Update" button on Seasonal Flu Vaccine in Updates due tile')
      .get('div.updateType')
      .contains('Seasonal Flu Vaccine')
      .siblings('button')
      .click()
      .verifyCurrentURL('/profile-building/immunisation')

      .log('On the left navigation pane, click "Dashboard"')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Check "Invitation" tile')
      .verifyListTextExistNoWaitV2(data.dashboardFeature.invitations)

      .log('Check "What\'s new?"')
      .verifyTextExist('What’s new?')

      .log('Check "What\'s new?" items')
      .checkButtonWithTextContainsLink('button', 'Go to Wellbeing Platform', data.dashboardFeature.mableNews.MableWellbeingPlatformLink)
      .checkButtonWithTextContainsLink('button', 'Go to YOUTax', data.dashboardFeature.mableNews.MableTaxBenefitsProgramLink)
      .checkButtonWithTextContainsLink('button', 'Go to Learning Hub', data.dashboardFeature.mableNews.ProfessionalDevelopmentLink)
      .checkButtonWithTextContainsLink('button', 'Go to Mable Equip', data.dashboardFeature.mableNews.HelpingToProtectOurMableCommunityLink);
  });

  it('ES-T640. Active profile worker dashboard, Incomplete profile building, no NDIS training', () => {
    const account = incompleteNoNDISWorker;
    cy.log('Login')
      .visit('/')

      .loginToDashboard(
        account.email,
        account.password,
      )
      .findAndCloseCovidPopup(1)
      .log('Check "Welcome back <worker>" hero image')
      .verifyTextExist('Welcome back')
      .verifyElementExist('.heroImageContainer')

      .log('Check "Jobs" link')
      .verifyElementContainsText('.heroImageContainer a', 'jobs')

      .log('Click "Jobs" link')
      // .clickElementOnText('a[target="_blank"]', 'jobs')

      .log('Go to Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Check profile building tile')
      .log('Check "Build profile" button')
      .verifyListTextExistNoWaitV2(data.dashboardFeature.LetsBuildYourProfile)

      .log('Click "Build profile" button')
      .clickElementOnText('button', 'Build profile')
      .verifyTextExist('My profile')
      .verifyTextExist('Bank account')

      .log('On the left navigation pane, click "Dashboard"')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Verify Agreement is visible')
      .verifyTextVisible('Agreements')
      .verifyTextExist('The agreements below need your attention. Your active and terminated agreements can be found on the \'My Clients\' page.')

      .log('Click "Show all"')
      .get('div[id="recentAgreements"] span')
      .contains('Show all')
      .should('be.visible')
      .click()
      .verifyTextExist('My clients')

      .log('Go to Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('On the agreement tile click "View"')
      .get('div[id="recentAgreements"] button')
      .contains('View')
      .click()
      .url()
      .should('include', '/conversation')
      .checkInboxPopup()
      .verifyTextExist('Inbox')

      .log('Go to Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Check "Immediate action required" tile')
      .verifyTextExist('Immediate action required')

      .log('Check Immediate action required items')
      .verifyTextExist('Police Check')
      .verifyTextExist('COVID-19 vaccine')

      .log('Click the update button on the Police Check tile')
      .get('div.documentType')
      .contains('Police Check')
      .parents('.panel')
      .find('button')
      .contains('Update')
      .click()
      .url()
      .should('include', '/police-check')
      .verifyTextExist('Police Check')

      .log('Go to Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Click the update button on the Covid-19 vaccine tile')
      .get('div.documentType')
      .contains('COVID-19 vaccine')
      .parents('.panel')
      .find('button')
      .contains('Update')
      .click()
      .url()
      .should('include', '/profile-building/immunisation')
      .verifyTextExist('Immunisation')
      .verifyTextExist('COVID-19 vaccine status')

      .log('Go to Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Check "Update due" tile')
      .verifyTextExist('Updates due')

      .log('Check update due items')
      .verifyTextExist('NDIS Worker Screening Check')
      .verifyTextExist('NDIS Worker Orientation Module')
      .verifyTextExist('Seasonal Flu Vaccine')

      .log('On "NDIS Worker Screening Check" click "Update"')
      .get('div.updateType')
      .contains('NDIS Worker Screening Check')
      .siblings('button')
      .contains('Update')
      .click()
      .url()
      .should('include', '/profile-building/ndis-worker-screening')
      .verifyTextExist('NDIS Worker Screening Check')

      .log('Go to Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('On "NDIS Worker Orientation Module" click "Update"')
      .get('div.updateType')
      .contains('NDIS Worker Orientation Module')
      .siblings('button')
      .contains('Update')
      .click()
      .url()
      .should('include', '/ndis-worker-orientation')
      .verifyTextExist('NDIS Worker Orientation Module')

      .log('Go to Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('On "Seasonal Flu Vaccine" click "Update"')
      .get('div.updateType')
      .contains('Seasonal Flu Vaccine')
      .siblings('button')
      .contains('Update')
      .click()
      .url()
      .should('include', '/profile-building/immunisation')
      .verifyTextExist('Flu vaccine')

      .log('Go to Dashboard')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Check "What\'s new?"')
      .verifyTextExist('What’s new?')

      .log('Check "What\'s new?" items')
      .checkButtonWithTextContainsLink('div[id="mableNews"] button', 'Go to Wellbeing Platform', data.dashboardFeature.mableNews.MableWellbeingPlatformLink)
      .checkButtonWithTextContainsLink('div[id="mableNews"] button', 'Go to YOUTax', data.dashboardFeature.mableNews.MableTaxBenefitsProgramLink)
      .checkButtonWithTextContainsLink('div[id="mableNews"] button', 'Go to Learning Hub', data.dashboardFeature.mableNews.ProfessionalDevelopmentLink)
      .checkButtonWithTextContainsLink('div[id="mableNews"] button', 'Access Guidelines', data.dashboardFeature.mableNews.ScreeningToolForShiftsLink)
      .checkButtonWithTextContainsLink('div[id="mableNews"] button', 'Go to Mable Equip', data.dashboardFeature.mableNews.HelpingToProtectOurMableCommunityLink);
  });

  it('ES-T641. Active profile worker dashboard, unanswered flushot, unanswered NDIS training, pending agreement', () => {
    cy.log('Login')
      .visit('/')
      .log('Pre-condition: Account have to approve util 30days');
    const account = unflushotNoNDISPendingAgrWorker;
    data.dashboardFeature.immediateActionRequired.policeCheckTitle = null;
    data.dashboardFeature.immediateActionRequired.workingWithChildrenTitle = null;
    data.dashboardFeature.immediateActionRequired.heathRegTitle = null;
    data.dashboardFeature.immediateActionRequired.nursingReg = null;
    data.dashboardFeature.elements.accessGuidelines = null;
    // data.dashboardFeature.elements.updateDueTitle = null;
    // data.dashboardFeature.elements.updateDueButton = null;
    data.dashboardFeature.updatesDue.statDecTitle = null;
    // data.dashboardFeature.updatesDue.ndisTitle = null;
    data.dashboardFeature.mableNews.shiftsTitle = null;
    data.dashboardFeature.mableNews.shiftsContent = null;
    data.dashboardFeature.mableNews.accessGuidelines = null;
    cy.unapprovedThenApprovedAgain(account.email, account.password)
      .loginToDashboard(
        account.email,
        account.password,
      );
    cy.findAndCloseCovidPopup(1);

    cy
      .verifyTextVisible("Let's build your profile")

      .log('Check "Welcome back <worker>" hero image')
      .verifyTextExist('Welcome back')
      .verifyElementExist('.heroImageContainer')

      .log('Check "Jobs" link')
      .verifyElementContainsText('.heroImageContainer a', 'jobs')

      .log('Click "Jobs" link')
      // .clickElementOnText('a[target="_blank"]', 'jobs')

      .log('On the left navigation pane, click "Dashboard"')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Check the "Updates due" tile.')
      .verifyTextExist('NDIS Worker Screening Check')
      .verifyTextExist('NDIS Worker Orientation Module')
      .verifyTextExist('Seasonal Flu Vaccine')

      .log('Click "Update" button on NDIS Worker screening check in Updates due tile')
      .get('div.updateType')
      .contains('NDIS Worker Screening Check')
      .siblings('button')
      .click()
      .verifyTextExist('My profile')
      .verifyTextExist('NDIS Worker Screening Check')

      .log('On the left navigation pane, click "Dashboard"')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Click "Update" button on NDIS Worker Orientation Module in Updates due tile')
      .get('div.updateType')
      .contains('NDIS Worker Orientation Module')
      .siblings('button')
      .click()
      .verifyTextExist('NDIS Worker Orientation Module')
      .verifyCurrentURL('/ndis-worker-orientation')

      .log('On the left navigation pane, click "Dashboard"')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Click "Update" button on Seasonal Flu Vaccine in Updates due tile')
      .get('div.updateType')
      .contains('Seasonal Flu Vaccine')
      .siblings('button')
      .click()
      .verifyCurrentURL('/profile-building/immunisation')

      .log('On the left navigation pane, click "Dashboard"')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Check profile building tile')
      .log('Check "Build profile" button')
      .verifyListTextExistNoWaitV2(data.dashboardFeature.LetsBuildYourProfile)

      .log('Click "Build profile" button')
      .clickElementOnText('button', 'Build profile')
      .verifyTextExist('My profile')
      .verifyTextExist('Bank account')

      .log('On the left navigation pane, click "Dashboard"')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Check "Immediate action required" tile')
      .log('Check Immediate action required items')
      .verifyListTextExistNoWaitV2([data.dashboardFeature.immediateActionRequired.title,
        data.dashboardFeature.immediateActionRequired.covidTitle])

      .log('Click "Update" button on COVID-19 vaccine in Immediate action required tile')
      .get('.documentType')
      .contains('COVID-19 vaccine')
      .parents('.panel')
      .children('button')
      .click()
      .verifyTextExist('My profile')
      .verifyTextExist('Immunisation')

      .log('On the left navigation pane, click "Dashboard"')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Check "Invitation" tile')
      .verifyListTextExistNoWaitV2(data.dashboardFeature.invitations)

      .log('Check "What\'s new?"')
      .verifyTextExist('What’s new?')

      .log('Check "What\'s new?" items')
      .verifyElementContainsText('div[id="mableNews"] button', 'Go to Wellbeing Platform')
      .verifyElementContainsText('div[id="mableNews"] button', 'Go to YOUTax')
      .verifyElementContainsText('div[id="mableNews"] button', 'Go to Learning Hub')
      .verifyElementContainsText('div[id="mableNews"] button', 'Go to Wellbeing Platform');
  });
});
