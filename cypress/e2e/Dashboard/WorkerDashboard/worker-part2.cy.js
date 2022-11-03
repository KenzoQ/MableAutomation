/* eslint-disable no-unused-vars */
import * as data from '../../../fixtures/test-data.json';

describe('Worker Dashboard', () => {
  const { newlyWorker2 } = data.dashboardAccount;
  const { noNDISWorker } = data.dashboardAccount;

  const { unflushotUnNDISNoMessageWorker } = data.dashboardAccount;
  const { unflushotNoStatDecNoNDISWorker } = data.dashboardAccount;
  const { noAllDueActiveWorker } = data.dashboardAccount;
  const { incompleteNoQualificationWorker } = data.dashboardAccount;
  const { expiredWorker } = data.dashboardAccount;
  const { noActiveIncompleteWorker } = data.dashboardAccount;
  const { noActiveNoAllWorker } = data.dashboardAccount;
 
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('ES-T642. Active profile worker dashboard, unanswered flushot, unanswered NDIS training, incomplete stat dec', () => {
    const account = unflushotNoStatDecNoNDISWorker;

    cy.log('Login')
      .visit('/')

      .loginToDashboard(account.email, account.password)
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
      .verifyTextExist(
        "The agreements below need your attention. Your active and terminated agreements can be found on the 'My Clients' page.",
      )

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
      .verifyTextExist('NDIS Worker Orientation Module')
      .verifyTextExist('Statutory declaration due')

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

      .log('On "Statutory declaration due" click "Update"')
      .get('div.updateType')
      .contains('Statutory declaration due')
      .siblings('button')
      .contains('Update')
      .click()
      .url()
      .should('include', '/overseas-residency')
      .verifyTextExist(
        'Commonwealth Statutory Declaration for Aged Care support',
      )

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

      .log('Check "What\'s new?"')
      .verifyTextExist('What’s new?')

      .log('Check "What\'s new?" items')
      .checkButtonWithTextContainsLink(
        'div[id="mableNews"] button',
        'Go to Wellbeing Platform',
        data.dashboardFeature.mableNews.MableWellbeingPlatformLink,
      )
      .checkButtonWithTextContainsLink(
        'div[id="mableNews"] button',
        'Go to YOUTax',
        data.dashboardFeature.mableNews.MableTaxBenefitsProgramLink,
      )
      .checkButtonWithTextContainsLink(
        'div[id="mableNews"] button',
        'Go to Learning Hub',
        data.dashboardFeature.mableNews.ProfessionalDevelopmentLink,
      )
      .checkButtonWithTextContainsLink(
        'div[id="mableNews"] button',
        'Access Guidelines',
        data.dashboardFeature.mableNews.ScreeningToolForShiftsLink,
      )
      .checkButtonWithTextContainsLink(
        'div[id="mableNews"] button',
        'Go to Mable Equip',
        data.dashboardFeature.mableNews.HelpingToProtectOurMableCommunityLink,
      );
  });

  it('ES-T643. Active profile worker dashboard, unanswered flushot, unanswered NDIS training, unanswered stat dec, no messages', () => {
    cy.log('Login')
      .visit('/')
      .log('Pre-condition: Account have to approve util 30days');
    const account = unflushotUnNDISNoMessageWorker;
    data.dashboardFeature.immediateActionRequired.policeCheckTitle = null;
    data.dashboardFeature.immediateActionRequired.workingWithChildrenTitle =
      null;
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
    cy.unapprovedThenApprovedAgain(
      account.email,
      account.password,
    ).loginToDashboard(account.email, account.password);
    cy.checkAllPopups()
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

      .log('Check "Immediate action required" tile')
      .log('Check Immediate action required items')
      .verifyListTextExistNoWaitV2([
        data.dashboardFeature.immediateActionRequired.title,
        data.dashboardFeature.immediateActionRequired.covidTitle,
      ])

      .log(
        'Click "Update" button on COVID-19 vaccine in Immediate action required tile',
      )
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

      .log(
        'Click "Update" button on NDIS Worker screening check in Updates due tile',
      )
      .get('div.updateType')
      .contains('NDIS Worker Screening Check')
      .siblings('button')
      .click()
      .verifyTextExist('My profile')
      .verifyTextExist('NDIS Worker Screening Check')

      .log('On the left navigation pane, click "Dashboard"')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log(
        'Click "Update" button on NDIS Worker Orientation Module in Updates due tile',
      )
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

      .log('Check "What\'s new?"')
      .verifyTextExist('What’s new?')

      .log('Check "What\'s new?" items')
      .checkButtonWithTextContainsLink(
        'div[id="mableNews"] button',
        'Go to Wellbeing Platform',
        data.dashboardFeature.mableNews.MableWellbeingPlatformLink,
      )
      .checkButtonWithTextContainsLink(
        'div[id="mableNews"] button',
        'Go to YOUTax',
        data.dashboardFeature.mableNews.MableTaxBenefitsProgramLink,
      )
      .checkButtonWithTextContainsLink(
        'div[id="mableNews"] button',
        'Go to Learning Hub',
        data.dashboardFeature.mableNews.ProfessionalDevelopmentLink,
      )
      .checkButtonWithTextContainsLink(
        'div[id="mableNews"] button',
        'Access Guidelines',
        data.dashboardFeature.mableNews.ScreeningToolForShiftsLink,
      )
      .checkButtonWithTextContainsLink(
        'div[id="mableNews"] button',
        'Go to Mable Equip',
        data.dashboardFeature.mableNews.HelpingToProtectOurMableCommunityLink,
      );
  });

  it('ES-T644. Active profile worker dashboard, unanswered flushot, unanswered NDIS training, unanswered stat dec, no messages, no agreement', () => {
    cy.log('Login')
      .visit('/')
      .log('Pre-condition: Account have to approve util 30days');
    const account = noAllDueActiveWorker;
    data.dashboardFeature.immediateActionRequired.policeCheckTitle = null;
    data.dashboardFeature.immediateActionRequired.workingWithChildrenTitle =
      null;
    data.dashboardFeature.immediateActionRequired.heathRegTitle = null;
    data.dashboardFeature.immediateActionRequired.nursingReg = null;
    data.dashboardFeature.elements.accessGuidelines = null;
    // data.dashboardFeature.elements.updateDueTitle = null;
    // data.dashboardFeature.elements.updateDueButton = null;
    data.dashboardFeature.updatesDue.statDecTitle = null;
    data.dashboardFeature.businessAndFlyersElements.outOfMable = null;
    data.dashboardFeature.businessAndFlyersElements.yourArea = null;
    // data.dashboardFeature.updatesDue.ndisTitle = null;
    data.dashboardFeature.mableNews.shiftsTitle = null;
    data.dashboardFeature.mableNews.shiftsContent = null;
    data.dashboardFeature.mableNews.accessGuidelines = null;
    cy.unapprovedThenApprovedAgain(
      account.email,
      account.password,
    ).loginToDashboard(account.email, account.password);
    cy.findAndCloseCovidPopup(1)
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
      .verifyTextExist("Mable's Help Centre")
      .checkATagWithTextContainsLink(
        ' Your tricky questions as an independent worker explored',
        data.dashboardFeature.thingsHelpfulLink.yourTrickyQuestion,
      )
      .checkATagWithTextContainsLink(
        ' How to build your client base',
        data.dashboardFeature.thingsHelpfulLink.howToBuildYourClientBase,
      )
      .checkATagWithTextContainsLink(
        " Mable's Help Centre",
        data.dashboardFeature.thingsHelpfulLink.MableHelpCenter,
      )

      .log('Check "Immediate action required" tile')
      .log('Check Immediate action required items')
      .verifyListTextExistNoWaitV2([
        data.dashboardFeature.immediateActionRequired.title,
        data.dashboardFeature.immediateActionRequired.covidTitle,
      ])

      .log(
        'Click "Update" button on COVID-19 vaccine in Immediate action required tile',
      )
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

      .log(
        'Click "Update" button on NDIS Worker screening check in Updates due tile',
      )
      .get('div.updateType')
      .contains('NDIS Worker Screening Check')
      .siblings('button')
      .click()
      .verifyTextExist('My profile')
      .verifyTextExist('NDIS Worker Screening Check')

      .log('On the left navigation pane, click "Dashboard"')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log(
        'Click "Update" button on NDIS Worker Orientation Module in Updates due tile',
      )
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

      .log('Check "What\'s new?"')
      .verifyTextExist('What’s new?')

      .log('Check "What\'s new?" items')
      .checkButtonWithTextContainsLink(
        'div[id="mableNews"] button',
        'Go to Wellbeing Platform',
        data.dashboardFeature.mableNews.MableWellbeingPlatformLink,
      )
      .checkButtonWithTextContainsLink(
        'div[id="mableNews"] button',
        'Go to YOUTax',
        data.dashboardFeature.mableNews.MableTaxBenefitsProgramLink,
      )
      .checkButtonWithTextContainsLink(
        'div[id="mableNews"] button',
        'Go to Learning Hub',
        data.dashboardFeature.mableNews.ProfessionalDevelopmentLink,
      );
  });

  it('ES-T645. Non active profile worker dashboard, unanswered flushot, unanswered NDIS unanswered stat dec, no messages, no agreement', () => {
    cy.log('Login')
      .visit('/')
      .log('Pre-condition: Account have to approve util 30days');
    const account = noActiveNoAllWorker;
    data.dashboardFeature.immediateActionRequired.policeCheckTitle = null;
    data.dashboardFeature.immediateActionRequired.workingWithChildrenTitle =
      null;
    data.dashboardFeature.immediateActionRequired.heathRegTitle = null;
    data.dashboardFeature.immediateActionRequired.nursingReg = null;
    data.dashboardFeature.elements.accessGuidelines = null;
    // data.dashboardFeature.elements.updateDueTitle = null;
    // data.dashboardFeature.elements.updateDueButton = null;
    data.dashboardFeature.businessAndFlyersElements.outOfMable = null;
    data.dashboardFeature.businessAndFlyersElements.yourArea = null;
    data.dashboardFeature.updatesDue.statDecTitle = null;
    // data.dashboardFeature.updatesDue.ndisTitle = null;
    data.dashboardFeature.mableNews.shiftsTitle = null;
    data.dashboardFeature.mableNews.shiftsContent = null;
    data.dashboardFeature.mableNews.accessGuidelines = null;
    cy.unapprovedThenApprovedAgain(
      account.email,
      account.password,
    ).loginToDashboard(account.email, account.password);

    cy.findAndCloseCovidPopup(1)
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
      .verifyTextExist("Mable's Help Centre")
      .checkATagWithTextContainsLink(
        ' Your tricky questions as an independent worker explored',
        data.dashboardFeature.thingsHelpfulLink.yourTrickyQuestion,
      )
      .checkATagWithTextContainsLink(
        ' How to build your client base',
        data.dashboardFeature.thingsHelpfulLink.howToBuildYourClientBase,
      )
      .checkATagWithTextContainsLink(
        " Mable's Help Centre",
        data.dashboardFeature.thingsHelpfulLink.MableHelpCenter,
      )

      .log('Check "Immediate action required" tile')
      .log('Check Immediate action required items')
      .verifyListTextExistNoWaitV2([
        data.dashboardFeature.immediateActionRequired.title,
        data.dashboardFeature.immediateActionRequired.covidTitle,
      ])

      .log(
        'Click "Update" button on COVID-19 vaccine in Immediate action required tile',
      )
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

      .log(
        'Click "Update" button on NDIS Worker screening check in Updates due tile',
      )
      .get('div.updateType')
      .contains('NDIS Worker Screening Check')
      .siblings('button')
      .click()
      .verifyTextExist('My profile')
      .verifyTextExist('NDIS Worker Screening Check')

      .log('On the left navigation pane, click "Dashboard"')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log(
        'Click "Update" button on NDIS Worker Orientation Module in Updates due tile',
      )
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
      .checkButtonWithTextContainsLink(
        'div[id="mableNews"] button',
        'Go to Wellbeing Platform',
        data.dashboardFeature.mableNews.MableWellbeingPlatformLink,
      )
      .checkButtonWithTextContainsLink(
        'div[id="mableNews"] button',
        'Go to YOUTax',
        data.dashboardFeature.mableNews.MableTaxBenefitsProgramLink,
      )
      .checkButtonWithTextContainsLink(
        'div[id="mableNews"] button',
        'Go to Learning Hub',
        data.dashboardFeature.mableNews.ProfessionalDevelopmentLink,
      )
      .checkButtonWithTextContainsLink(
        'div[id="mableNews"] button',
        'Go to Wellbeing Platform',
        data.dashboardFeature.mableNews.HelpingToProtectOurMableCommunityLink,
      );
  });

  it('ES-T646. Non Active profile worker dashboard', () => {
    cy.log('Login')
      .visit('/')
      .log('Pre-condition: Account have to approve util 30days');
    const account = noActiveIncompleteWorker;
    data.dashboardFeature.immediateActionRequired.policeCheckTitle = null;
    data.dashboardFeature.immediateActionRequired.workingWithChildrenTitle =
      null;
    data.dashboardFeature.immediateActionRequired.heathRegTitle = null;
    data.dashboardFeature.immediateActionRequired.nursingReg = null;
    data.dashboardFeature.elements.accessGuidelines = null;
    data.dashboardFeature.elements.updateDueTitle = null;
    data.dashboardFeature.elements.updateDueButton = null;
    data.dashboardFeature.updatesDue.statDecTitle = null;
    // data.dashboardFeature.updatesDue.ndisTitle = null;
    data.dashboardFeature.mableNews.shiftsTitle = null;
    data.dashboardFeature.mableNews.shiftsContent = null;
    data.dashboardFeature.mableNews.accessGuidelines = null;
    cy.unapprovedThenApprovedAgain(
      account.email,
      account.password,
    ).loginToDashboard(account.email, account.password);

    cy.findAndCloseCovidPopup(1);

    cy.verifyTextVisible("Let's build your profile")

      .log('Check "Welcome back <worker>" hero image')
      .verifyTextExist('Welcome back')
      .verifyElementExist('.heroImageContainer')

      .log('Check "Jobs" link')
      .verifyElementContainsText('.heroImageContainer a', 'jobs')

      .log('Click "Jobs" link')
      // .clickElementOnText('a[target="_blank"]', 'jobs')

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

      .log('Check the "Updates due" tile.')
      .verifyTextExist('NDIS Worker Screening Check')

      .log(
        'Click "Update" button on NDIS Worker screening check in Updates due tile',
      )
      .get('div.updateType')
      .contains('NDIS Worker Screening Check')
      .siblings('button')
      .click()
      .verifyTextExist('My profile')
      .verifyTextExist('NDIS Worker Screening Check')

      .log('On the left navigation pane, click "Dashboard"')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Check "Immediate action required" tile')
      .log('Check Immediate action required items')
      .verifyListTextExistNoWaitV2([
        data.dashboardFeature.immediateActionRequired.title,
        data.dashboardFeature.immediateActionRequired.covidTitle,
      ])

      .log(
        'Click "Update" button on COVID-19 vaccine in Immediate action required tile',
      )
      .get('.documentType')
      .contains('COVID-19 vaccine')
      .parents('.panel')
      .children('button')
      .click()
      .verifyTextExist('My profile')
      .verifyTextExist('Immunisation')

      .log('On the left navigation pane, click "Dashboard"')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Check "What\'s new?"')
      .verifyTextExist('What’s new?')

      .log('Check "What\'s new?" items')
      .checkButtonWithTextContainsLink(
        'div[id="mableNews"] button',
        'Go to Wellbeing Platform',
        data.dashboardFeature.mableNews.MableWellbeingPlatformLink,
      )
      .checkButtonWithTextContainsLink(
        'div[id="mableNews"] button',
        'Go to YOUTax',
        data.dashboardFeature.mableNews.MableTaxBenefitsProgramLink,
      )
      .checkButtonWithTextContainsLink(
        'div[id="mableNews"] button',
        'Go to Learning Hub',
        data.dashboardFeature.mableNews.ProfessionalDevelopmentLink,
      );
  });

  it('ES-T1128. Expired police check and other registrations worker dashboard, incomplete profile building', () => {
    cy.log('Login')
      .visit('/')
      .log('Pre-condition: Account have to approve util 30days');
    const account = expiredWorker;
    const dashboardTemp = data.dashboardFeature;
    dashboardTemp.immediateActionRequired.covidTitle = null;
    dashboardTemp.elements.accessGuidelines = null;
    // dashboardTemp.elements.updateDueTitle = null;
    // dashboardTemp.elements.updateDueButton = null;
    dashboardTemp.updatesDue.statDecTitle = null;
    // dashboardTemp.updatesDue.ndisTitle = null;
    dashboardTemp.mableNews.shiftsTitle = null;
    dashboardTemp.mableNews.shiftsContent = null;
    dashboardTemp.mableNews.accessGuidelines = null;
    dashboardTemp.thingsHelpful.lblTricky = null;
    dashboardTemp.thingsHelpful.lblMableHelp = null;
    dashboardTemp.businessAndFlyersElements.mableHelp = null;
    dashboardTemp.businessAndFlyersElements.trickyQuestion = null;
    dashboardTemp.businessAndFlyersElements.businessPDF = null;
    dashboardTemp.thanks.thanksContent02 =
      'When the relevant sources send us your documents, we’ll review them within 3 weeks and approve your account.';
    cy.loginToDashboard(account.email, account.password);
    cy.checkDashboardContent(
      dashboardTemp.thanks,
      dashboardTemp.immediateActionRequired,
      dashboardTemp.thingsHelpful,
      dashboardTemp.businessAndFlyersElements,
    );
    cy.log('Click Set up your account')
      .clickElementOnText('a', 'Edit account setup')
      .verifyElementContainsText('h2.welcomeTitle', "let's get started!")

      .log('Back to dashboard')
      .clickElementOnText('button span', 'Back to dashboard')

      .verifyTextVisible("Let's build your profile")

      .log('Check nominated references tile')
      .verifyElementVisible('div#referencesStatus')
      .verifyTextVisible('Nominated references');
  });

  it('ES-T1083. Newly sign up worker dashboard', () => {
    cy.log('Login').visit('/');
    const account = newlyWorker2;
    cy.loginToDashboard(account.email, account.password)
      .log('Check Welcome message')
      .verifyTextVisible('Welcome')

      .log('Check progress checker')
      .verifyTextVisible("What you'll need to set up your account")

      .log('Check progress item')
      .verifyTextVisible('Two references')
      .verifyTextVisible('Mandatory COVID-19 training')
      .verifyTextVisible('COVID-19 vaccination as required by your state')
      .verifyTextVisible(
        'Working with Children Check (if working with children)',
      )

      .log('Click Set up your account')
      .clickElementOnText('a', 'Set up your account')
      .log('Verify your phone number')
      .wait(2000)
      .get('body')
      .then($body => {
        if ($body.find('app-verify-mobile-number').length > 0) {
          cy
            .inputTextField(
              'input[formcontrolname="verificationCode"]',
              '123456',
            )
            .clickElementOnText(
              'button span',
              'Submit',
            );
        }
      })

      .verifyElementContainsText('h2.welcomeTitle', "let's get started!")

      .log('Chick Back to dashboard')
      .clickElementOnText('button span', 'Back to dashboard');
  });

  it('ES-T1122. Incomplete worker profile dashboard with no qualification', () => {
    cy.log('Login').visit('/');
    const account = incompleteNoQualificationWorker;
    cy.loginToDashboard(account.email, account.password)
      .log('Check title message')
      .verifyTextExist("You're almost there!")

      .log('Check Invitation')
      .verifyTextVisible('Invitations')

      .log('Check progress checker')
      .verifyTextVisible("What you'll need to set up your account")

      .log('Check progress item')
      .verifyTextVisible('Australian Business Number (ABN)')
      .verifyTextVisible('Two references')
      .verifyTextVisible('Mandatory COVID-19 training')
      .verifyTextVisible(
        'Working with Children Check (if working with children)',
      )

      .log('Check progress bar')
      .verifyElementExist('mat-progress-bar')

      .log('Click Resume account setup')
      .clickElementOnText('a', 'Resume account setup')
      .verifyElementContainsText('h2.welcomeTitle', "let's get started!")

      .log('Chick Back to dashboard')
      .clickElementOnText('button span', 'Back to dashboard')

      .log('Check Helpful link')
      .verifyElementExist('#helpLinks')
      .verifyTextExist('Getting started as a worker')
      .verifyTextExist('Five ways to make your worker profile stand out')
      .verifyTextExist('How to create a winning profile')
      .verifyTextExist('your area')

      .verifyMultipleHreftList(
        'div#helpLinks',
        'https://mable.com.au/help_topic/getting-started-as-a-worker/',
        'https://blog.mable.com.au/blog/care-workers/five-ways-to-make-your-worker-profile-stand-out-on-mable/',
        'https://mable.com.au/help_centre/create-winning-profile/',
        'https://uat.containers.staging-mable.com.au/app/workers/posted_jobs',
        'https://mable.com.au/covid-19/vaccination/',
      );
  });

  it('ES-T1126. Active profile worker dashboard, complete profile building, no NDIS training', () => {
    const account = noNDISWorker;
    cy.log('Login')
      .visit('/')

      .loginToDashboard(account.email, account.password)

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

      .log('Check "Update due" tile')
      .verifyTextExist('Updates due')

      .log('Check update due items')
      .verifyTextExist('NDIS Worker Screening Check')

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

      .log('Check "Invitation" tile')
      .verifyTextExist('Invitations')
      .verifyTextExist(
        'You have been invited by the following people to join their team of support:',
      )

      .checkButtonWithTextContainsLink(
        'div[id="mableNews"] button',
        'Go to Wellbeing Platform',
        data.dashboardFeature.mableNews.MableWellbeingPlatformLink,
      )
      .checkButtonWithTextContainsLink(
        'div[id="mableNews"] button',
        'Go to YOUTax',
        data.dashboardFeature.mableNews.MableTaxBenefitsProgramLink,
      )
      .checkButtonWithTextContainsLink(
        'div[id="mableNews"] button',
        'Go to Learning Hub',
        data.dashboardFeature.mableNews.ProfessionalDevelopmentLink,
      )
      .checkButtonWithTextContainsLink(
        'div[id="mableNews"] button',
        'Access Guidelines',
        data.dashboardFeature.mableNews.ScreeningToolForShiftsLink,
      )
      .checkButtonWithTextContainsLink(
        'div[id="mableNews"] button',
        'Go to Mable Equip',
        data.dashboardFeature.mableNews.HelpingToProtectOurMableCommunityLink,
      )
      .checkButtonWithTextContainsLink(
        'div[id="mableNews"] button',
        'Access Training',
        data.dashboardFeature.mableNews.MandatoryCOVID19TrainingDueLink,
      );
  });
});
