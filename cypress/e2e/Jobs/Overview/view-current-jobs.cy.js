/* eslint-disable max-len */
import * as data from '../../../fixtures/test-data.json';
import faker from 'faker/locale/en_AU';

describe('View current jobs', () => {
  const clientEmail = 'automation_maria.repollo.jobmessaging+client@donotuse.com.au';
  const clientPass = 'qaAutomation2021';

  const newClientEmail = 'automation_maria.repollo.jobspec+client@donotuse.com.au';
  const newClientPass = 'qaAutomation2021';

  const detherClientEmail = 'automation_dether.ocampo.account+client@donotuse.com.au';
  const detherClientPass = 'qaAutomation2021';

  const workerEmail = 'automation_maria.repollo.jobspec+worker@donotuse.com.au';
  const workerPass = 'qaAutomation2021';
  const jobTextObjs = data.jobFeature.text;
  const jobElementObjs = data.jobFeature.elements;
  const dashboardOpenJobsTextsClient = jobTextObjs.dashboardOpenJob;
  const dashboardOpenJobsElementsClient = jobElementObjs.dashboardOpenJob;
  const dashboardOpenJobsElements = data.jobFeature.elementsInWorker.dashboardOpenJob;
  const dashboardOpenJobsTexts = data.jobFeature.textInWorker.dashboardOpenJob;
  const bannerText = 'Job Ref: Support for an adult';
  const bannerSendRecentJobText = 'Send your recent job description?';
  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it(`
  ES-T1748. Client navigated to other pages and return back to conversation screen - BANNER WILL NOT BE DISPLAYED
  ES-T1749. Client and worker has an existing conversation but regular jobs were created prior to having a convo - BANNER WILL NOT BE DISPLAYED
  ES-T1774. Client last conversation to the worker is later than the job creation, BANNER WILL NOT BE DISPLAYED`, () => {
    cy
      .log('Login as client')
      .loginToDashboard(
        'automation_dether.ocampo.account+client@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Verify the open jobs form')
      .verifyElementListVisible(dashboardOpenJobsElementsClient.jobForm,
        dashboardOpenJobsElementsClient.jobPanel,
        dashboardOpenJobsElementsClient.viewButton)
      .verifyElementContainsTextList(dashboardOpenJobsElementsClient.jobForm,
        dashboardOpenJobsTextsClient.title,
        dashboardOpenJobsTextsClient.showAll,
        dashboardOpenJobsTextsClient.view)

      .log('Click "Inbox" on the left navigation')
      .navigateByLeftMenuInDashboard('Inbox')

      .moveToUntilFoundName('Meg')
      .clickElementOnText('.channelContent .title', 'Meg')
      .verifyTextNotExist(bannerText)
      .verifyTextNotExist(bannerSendRecentJobText)

      .log('Click "Dashboard" on the left navigation')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Click "Inbox" on the left navigation')
      .navigateByLeftMenuInDashboard('Inbox')

      .moveToUntilFoundName('Meg')
      .clickElementOnText('.channelContent .title', 'Meg')
      .verifyTextNotExist(bannerText)
      .verifyTextNotExist(bannerSendRecentJobText)

      .log('Click "Inbox" on the left navigation')
      .navigateByLeftMenuInDashboard('Inbox')

      .moveToUntilFoundName('Emma')
      .clickElementOnText('.channelContent .title', 'Emma')
      .verifyTextNotExist(bannerText)
      .verifyTextNotExist(bannerSendRecentJobText)

      .log('Click "Inbox" on the left navigation')
      .navigateByLeftMenuInDashboard('Inbox')

      .moveToUntilFoundName('Tae Hee')
      .clickElementOnText('.channelContent .title', 'Tae Hee')
      .verifyTextNotExist(bannerText)
      .verifyTextNotExist(bannerSendRecentJobText);
  });
  // Outdated
  it(`ES-T1775. Client has no regular / private jobs opened- BANNER WILL NOT BE DISPLAYED 
  `, () => {
    cy
      .log('Login as client')
      .loginToDashboard(
        data.dashboardAccount.thorzodClient.email,
        data.dashboardAccount.thorzodClient.password,
      )

      .log('Click "Inbox" on the left navigation')
      .navigateByLeftMenuInDashboard('Inbox')

      .clickElementOnText('.channelContent .title', 'Meg')
      .verifyTextNotExist(bannerText)
      .verifyTextNotExist(bannerSendRecentJobText);
  });

  it(`ES-T1776. Client has no open regular jobs but has open last minute job - BANNER SHOULD NOT BE DISPLAYED 
  `, () => {
    cy
      .log('Create open job')
      .createLastMinuteJob(
        data.dashboardAccount.veronaClient.email,
        data.dashboardAccount.veronaClient.password,
        'Test LMJ',
        '48467',
        'Sandy Bay TAS 7005',
      )
      .log('Login as client')
      .loginToDashboard(
        data.dashboardAccount.veronaClient.email,
        data.dashboardAccount.veronaClient.password,
      )

      .log('Click "Inbox" on the left navigation')
      .navigateByLeftMenuInDashboard('Inbox')

      .moveToUntilFoundName('Amanda')

      .clickElementOnText('.channelContent .title', 'Amanda')
      .verifyTextNotExist(bannerText)
      .verifyTextNotExist(bannerSendRecentJobText);
  });

  it('ES-T1522. View open regular job details, block worker', () => {
    const jinName = 'Jin';
    cy
      .log('Login as client')
      .loginToDashboard(
        'automation_dether.ocampo.account+client@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Verify the open jobs form')
      .verifyElementListVisible(dashboardOpenJobsElementsClient.jobForm,
        dashboardOpenJobsElementsClient.jobPanel,
        dashboardOpenJobsElementsClient.viewButton)
      .verifyElementContainsTextList(dashboardOpenJobsElementsClient.jobForm,
        dashboardOpenJobsTextsClient.title,
        dashboardOpenJobsTextsClient.showAll,
        dashboardOpenJobsTextsClient.view)

      .log('Click "Search workers"')
      .navigateByLeftMenuInDashboard('Search workers')

      .searchWorkersByOnlySuburb('Plumbago')

      .wait(2000)
      .log('Click Profile btn')
      .get('.profile-name')
      .contains(jinName)
      .parents('.name')
      .find('button')
      .contains('View profile')
      .click()

      .log('check Support Worker\'s profile page')
      .verifyTextExist(`You have blocked ${jinName}`)
      .verifyTextExist(`About ${jinName}`)
      .verifyTextExist('Availability')
      .verifyTextExist('Services offered')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Mable verified')
      .verifyTextExist('More information')
      .verifyTextExist('Cultural backgrounds')

      .log('Client scrolls to the page and reach \'Hiring\' section')
      .verifyTextExist('Interested in engaging')
      .verifyTextExist(`Message ${jinName} to discuss your needs`)
      .verifyTextExist(`After ${jinName} replies, agree on rates and services`)
      .verifyTextExist('Jin will send you an agreement to accept')
      .verifyTextExist('Complete your profile to accept the agreement');
  });

  it('ES-T512. View posted job page, with records', () => {
    cy
      .log('Login as client')
      .loginToDashboard(clientEmail, clientPass)

      .log('Verify the open jobs form')
      .verifyElementListVisible(dashboardOpenJobsElementsClient.jobForm,
        dashboardOpenJobsElementsClient.jobPanel,
        dashboardOpenJobsElementsClient.viewButton)
      .verifyElementContainsTextList(dashboardOpenJobsElementsClient.jobForm,
        dashboardOpenJobsTextsClient.title,
        dashboardOpenJobsTextsClient.showAll,
        dashboardOpenJobsTextsClient.view)

      .log('Click See all on Open jobs section')
      .clickElementOnText(dashboardOpenJobsElementsClient.jobForm, dashboardOpenJobsTextsClient.showAll)
      .verifyTextVisible('My jobs')
      .verifyCurrentURL('/posted-jobs')

      .log('Click "Dashboard" on the left navigation')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Click "Post a job" on the left navigation')
      .navigateByLeftMenuInDashboard('Jobs')
      .wait(2000)
      .verifyTextVisible('My jobs')
      .verifyCurrentURL('/posted-jobs');
  });

  it('ES-T513. View posted job page, no records', () => {
    cy
      .log('Login as client')
      .loginToDashboard(newClientEmail, newClientPass)

      .log('Verify open jobs form is not visible')
      .verifyElementNotExist(dashboardOpenJobsElementsClient.jobForm)

      .log('Click "Post a job" on the left navigation')
      .navigateByLeftMenuInDashboard('Jobs')
      .wait(2000)
      .verifyCurrentURL('/jobs');
  });

  it('ES-T515. View open regular job with no reply from posted job list', () => {
    const titleJob = faker.name.jobTitle();
    const loacation = 'Acton ACT 2601';
    const geoID = '37274';

    cy
      .createRegularJobByAPI(clientEmail, clientPass, titleJob, loacation, geoID)
      .log('Login as client')
      .loginToDashboard(clientEmail, clientPass)

      .log('Click "Post a job" on the left navigation')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Click the regular job having title')
      .clickElementOnText(data.regularJob.client.titleJob, titleJob)

      .log('Verify "No workers have replied yet"')
      .verifyTextVisible('No workers have replied yet');
  });

  it('ES-T514. View filled regular job from posted job list', () => {
    cy
      .log('Login as client')
      .loginToDashboard(clientEmail, clientPass)

      .log('Click "Post a job" on the left navigation')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Select Reqular job with status as Open')
      .selectJobWithStatus('Open')

      .log('Get the title job')
      .getText('h2.header')
      .then((title) => {
        cy.log('Click "Mark job as filled"')
          .clickElementOnText('button span', 'Mark job as filled')
          .clickElement('input[type="radio"][name="reason"]', true, 0)
          .clickElementOnText('button', 'Mark filled')

          .log('Click "Post a job" on the left navigation')
          .navigateByLeftMenuInDashboard('Jobs')

          .log('Verify that job have status as Filled')
          .clickJobHasStatus(title.trim(), 'Filled');
      });
  });

  it(`
    ES-T515. View open regular job with no reply from posted job list
    ES-T517. View jobs from conversation page
  `, () => {
    const titleJob = faker.name.jobTitle();
    cy.removeAgreementIfExist(clientEmail, clientPass, 15613)
      .wait(2000)

      .createRegularJobByAPI(
        clientEmail,
        clientPass,
        titleJob,
        'Dawes Point NSW 2000',
        '34161',
      )
      .then((res) => {
        const jobID = res.body.data.id;
        cy.wait(2000).sendMessageToApplyJob(
          workerEmail,
          workerPass,
          jobID,
          'RICHARD G.',
        );
      })
      .then(() => {
        cy
          .wait(500)
          .log('Login as client')
          .loginToDashboard(clientEmail, clientPass)

          .log('Click "Post a job" on the left navigation')
          .navigateByLeftMenuInDashboard('Jobs')

          .log('Click the regular job having title')
          .clickElementOnText(data.regularJob.client.titleJob, titleJob)

          .log('Verify that job has status as Open')
          .verifyElementContainsText('.open span', 'Open')

          .log('Verify "Replies to job" sections is shown')
          .verifyTextVisible('Replies');
      })
      .then(() => {
        cy.log('Click "Post a job" on the left navigation')
          .navigateByLeftMenuInDashboard('Inbox')
          .checkInboxPopup()

          .log('Select worker Inbox: Regression W.')
          .clickElementOnText(data.message.nameInbox, 'Regression')

          .log('Send a new message')
          .inputTextField(data.message.messageInput, 'send a new message')
          .clickElement(data.message.sendMessBtn, true)

          .log('Click Job ref:<link>')
          .get('.messageContent .videoItem')
          .last()
          .click()

          .log('Verify user is navigated to Job detail')
          .verifyCurrentURL('/jobs')
          .verifyTextVisible(titleJob);
      });
  });

  it('ES-T518. Check current job page', () => {
    cy
      .log('Login as client')
      .loginToDashboard(clientEmail, clientPass)

      .log('Click "Post a job" on the left navigation')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Click Archive tab')
      .clickElementOnText(data.regularJob.client.tabHeader, 'Archive')

      .log('Verify the open job is not shown')
      .get('.mat-tab-body-active .details .chip span')
      .contains('Open')
      .should('not.be.exist')

      .log('Click Current tab')
      .clickElementOnText(data.regularJob.client.tabHeader, 'Current')

      .log('Verify the open job and filled job is ib the current job list')
      .verifyTextNotExist('Cancelled')
      .verifyTextNotExist('Expired')
      .verifyTextNotExist('Archived');
  });

  it('ES-T521. Empty state, newly sign up account', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        'automation_suzy.bae.newlysignup+worker@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Click Jobs on the left navigation')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Click Discover')
      .clickElementOnText('a', 'Discover')

      .log('Click "Complete your account" link')
      .get('#emptyState a')
      .contains('Complete your account')
      .invoke('removeAttr', 'target')
      .click()

      .log('Verify worker is redirect to onboarding approval flow')
      .verifyTextVisible("Hi Suzy, let's get started!")

      .log('Click "Back to dashboard"')
      .clickElementOnText('button span', 'Back to dashboard')

      .log('Click Jobs on the left navigation')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Click Applied')
      .clickElementOnText('a', 'Applied')

      .log('Verify user was navigated to Apllied tab')
      .verifyTextVisible('When you respond to job posts,');
  });

  it('ES-T1291. View open regular job details, approved', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(workerEmail, workerPass)

      .log('Go to the Job page')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Click Search tab')
      .clickElementOnText('[href="/jobs/search/all"]', 'Search')

      .log('Check address')
      .verifyElementVisible(data.search.worker.addressInput)

      .log('Enter new address')
      .inputTextField(data.search.worker.addressInput, 3000)
      .clickElement('.suggestions .listOption', true, 0)
      .wait(1000)

      .log('Click search btn')
      .clickElement(data.regularJob.worker.searchBtn)

      .log('Select the first job')
      .clickElement('.resultTile', true, 0)

      .log('Check job details page')
      .verifyElementVisible('.jobTitle')
      .verifyElementVisible('#jobInformation')
      .verifyElementVisible('#jobInformation span')
      .verifyElementContainsText('button', 'Message to apply')
      .verifyElementContainsText('#reportBtn span', 'Report')

      .log('Click "Message to apply"')
      .clickElementOnText('button', 'Message to apply')
      .verifyElementVisible(data.regularJob.worker.messageInput)

      .log('Click "Back to job list"')
      .clickElementOnText('#backToListBtn span', 'Back to job list')
      .verifyElementNotExist('#selectedJobContent');
  });

  it('ES-T1276. Empty state, incomplete account', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        'automation_suzy.bae.newlysignup+worker@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Click "Resume account setup" btn')
      .clickElementOnText('#urgentCallToAction a', 'Resume account setup')
      .verifyTextVisible("let's get started!")

      .log('Click "Back to dashboard"')
      .clickElementOnText('button span', 'Back to dashboard')

      .log('Go to the Job page')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Click "Complete your account" on Discover tab')
      .clickElementOnText('#emptyState a', 'Complete your account')
      .log('Verify worker is redirected to onboarding approval flow')
      .verifyTextExist("Hi Suzy, let's get started!")

      .log('Click "Back to dashboard"')
      .clickElementOnText('button span', 'Back to dashboard')

      .log('Go to the Job page')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Click Search tab')
      .clickElementOnText('[href="/jobs/search/all"]', 'Search')
      .verifyTextVisible('Suburb or postcode')

      .log('Click Applied tab')
      .clickElementOnText('a', 'Applied');
  });

  it('ES-T1277. Empty state, unapproved complete account', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        'automation_lee.jieun.completeunapproved+worker@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Click "Edit account setup" btn')
      .clickElementOnText('#urgentCallToAction a', 'Edit account setup')

      .log('Click "Back to dashboard"')
      .clickElementOnText('button span', 'Back to dashboard')

      .log('Go to the Job page')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Click Discover tab')
      .clickElementOnText('a', 'Discover')
      .verifyTextVisible('Your account is pending approval from us.')
      .verifyTextExist('Watch this space to discover new jobs once you get approved.')
      .verifyTextExist('In the meantime, feel free to search for jobs.')
      .verifyElementContainsText('app-discover-tab a', 'search for jobs')
      .url()
      .should('include', '/search/discover')

      .log('Click search tab')
      .clickElementOnText('[href="/jobs/search/all"]', 'Search')
      .verifyTextVisible('Suburb or postcode')
      .url()
      .should('include', '/search/all')

      .log('Click Applied tab')
      .clickElementOnText('a', 'Applied')
      .verifyTextVisible('When you respond to job posts,')
      .verifyTextVisible('they will appear here to help you keep track.')
      .url()
      .should('include', '/search/applied');
  });

  it('ES-T523. View open regular job details, unapproved and incomplete account', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        'automation_suzy.bae.newlysignup+worker@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Go to the Job page')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Click Search tab')
      .clickElementOnText('[href="/jobs/search/all"]', 'Search')

      .log('Enter new address')
      .inputTextField(data.search.worker.addressInput, 2000, true)
      .clickElement('.suggestions .listOption', true, 0)
      .wait(1000)

      .log('Click search btn')
      .clickElement(data.regularJob.worker.searchBtn)

      .log('Select the first job')
      .clickElement('.resultTile', true, 0)

      .log('Check Job Preview')
      .verifyTextVisible('This is a job preview.')

      .log('Check job details page')
      .verifyElementContainsText('#resultFocus button', 'Set up your account')
      .verifyElementNotExist('#reportBtn span', 'Report')

      .log('Click "Set up your account"')
      .clickElementOnText('#resultFocus button', 'Set up your account')
      .log('Verify worker is redirected to onboarding approval flow')
      .verifyTextExist("Hi Suzy, let's get started!")

      .log('Click "Back to dashboard"')
      .clickElementOnText('button span', 'Back to dashboard');
  });

  it('ES-T1289. View open regular job details, unapproved and complete account', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        'automation_lee.jieun.completeunapproved+worker@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Go to the Job page')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Click Search tab')
      .clickElementOnText('[href="/jobs/search/all"]', 'Search')

      .log('Check address')
      .verifyElementVisible(data.search.worker.addressInput)

      .log('Enter new address')
      .inputTextField(data.search.worker.addressInput, 3000)
      .clickElement('.suggestions .listOption', true, 0)
      .wait(1000)

      .log('Click search btn')
      .clickElement(data.regularJob.worker.searchBtn)

      .log('Select the first job')
      .clickElement('.resultTile', true, 0)

      .log('Check Job Preview')
      .verifyTextVisible('This is a job preview.')

      .log('Check job details page')
      .verifyTextNotExist('Set up your account')
      .verifyTextNotVisible('Message to apply')
      .verifyTextNotExist('Report')

      .log('Click "Back to job list"')
      .clickElementOnText('#backToListBtn span', 'Back to job list')
      .verifyElementNotExist('#selectedJobContent');
  });

  it('ES-T1290. View open regular job details, unqualified', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        'automation_kang.haneul.activeagreement+worker@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Verify the open jobs form')
      .verifyElementListVisible(dashboardOpenJobsElements.jobForm,
        dashboardOpenJobsElements.jobPanel,
        dashboardOpenJobsElements.viewButton)
      .verifyElementContainsTextList(dashboardOpenJobsElements.jobForm,
        dashboardOpenJobsTexts.title,
        dashboardOpenJobsTexts.showAll,
        dashboardOpenJobsTexts.view)

      .log('Go to the Job page')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Click Search tab')
      .clickElementOnText('[href="/jobs/search/all"]', 'Search')

      .log('Check address')
      .verifyElementVisible(data.search.worker.addressInput)

      .log('Enter new address')
      .inputTextField(data.search.worker.addressInput, 'Sydney 2000')
      .clickElement('.suggestions .listOption', true, 0)
      .wait(1000)

      .log('Click search btn')
      .clickElement(data.regularJob.worker.searchBtn)

      .log('Select "Assist with medication" on filter services')
      .clickElementOnText(data.search.worker.filterItem, 'Services')
      .clickElementOnText('.mat-checkbox-label', 'Assist with medication')
      .clickElementOnText('.filterMenuActions button', 'Apply')

      .wait(1000)
      .log('Select the first job')
      .clickElement('.resultTile.panel', false, 0)

      .log('Verify spiel')
      .verifyTextVisible(
        'You do not meet the requirements to respond to this job.',
      )

      .log('Click "Message to apply"')
      .clickElementOnText('button', 'Message to apply')
      .verifyElementVisible(data.regularJob.worker.messageInput)

      .log('Click "Back to job list"')
      .clickElementOnText('#backToListBtn span', 'Back to job list')
      .verifyElementNotExist('#selectedJobContent');
  });

  it('ES-T1521. View open regular job details, block client', () => {
    const loacation = 'Acton ACT 2601';
    const geoID = '37274';
    const titleJob = `blocked ${faker.name.jobTitle()}`;
    cy
      .createRegularJobByAPI(detherClientEmail, detherClientPass, titleJob, loacation, geoID).then(($job) => {
        const jobId = $job.body.data.id;
        cy
          .log('Login as worker')
          .loginToDashboard(
            'automation_park.shinhye.approved+worker@donotuse.com.au',
            'qaAutomation2021',
          );

        cy
          .log('Go to the Job page')
          .navigateByLeftMenuInDashboard('Jobs')

          .log('Click Search tab')
          .clickElementOnText('[href="/jobs/search/all"]', 'Search')

          .log('Check address')
          .verifyElementVisible(data.search.worker.addressInput)

          .log('Enter new address')
          .inputTextField(data.search.worker.addressInput, 2601)
          .clickElementOnText('.suggestions .listOption', 'Acton ACT 2601')
          .wait(1000)

          .log('Click search btn')
          .clickElement(data.regularJob.worker.searchBtn)

          .log('Click "Include nearby suburbs" checkbox')
          .get('#nearbySuburbsCheckbox input')
          .invoke('attr', 'aria-checked')
          .then((value) => {
            if (value === true) {
              cy.clickElement('#nearbySuburbsCheckbox input');
            }
          })

          .log('Select job that is blocked client')
          .clickElement(
            'a.jobTitle h3',
            false,
            0,
          )

          .log('Check the detailed job')
          .verifyTextVisible('You have blocked Dether O.')
          .verifyTextNotVisible('Message to apply')
          .verifyElementContainsText('#reportBtn span', 'Report');
        cy.cancelJob(jobId, detherClientEmail, detherClientPass);
      });
  });

  it('ES-T1293. View private job from conversation page', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        'automation_kang.haneul.activeagreement+worker@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Click Inbox on the left navigation')
      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log('Select Inbox of Seo Joon P.')

      .moveToUntilFoundName('Seo Joon')

      .clickElementOnText('.channelContent .title', 'Seo Joon')

      .log('Check Inbox details')
      .waitAppLoaderNotVisible()
      .verifyElementContainsText('.messageContent.jobCard .participantInfo ', '33 years old')

      .log('Click View full details')
      .clickElementOnText('.videoItem div', 'View full job details')
      .log('Verify user is navigated to detail page')
      .verifyTextVisible('Supporting with')

      .log('Click Back btn')
      .clickElementOnText('app-back-button span', 'Back')
      .log('Verify User is redirected back to chat page')
      .verifyElementVisible('app-inbox');
  });

  it('ES-T1278. Empty state, newly approved account and complete profile building', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        'automation_sana.minatozaki.empty.completeapproved+worker@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Go to the Job page')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Verify the current tab is Discover')
      .verifyTextVisible(
        'Watch this space to discover new jobs.',
      )

      .log('Click Search tab')
      .clickElementOnText('[href="/jobs/search/all"]', 'Search')
      .log('Check address')
      .verifyElementVisible(data.search.worker.addressInput)

      .log('Click Applied tab')
      .clickElementOnText('a', 'Applied')
      .verifyTextVisible('When you respond to job posts,')
      .verifyTextVisible('they will appear here to help you keep track.');
  });
});
