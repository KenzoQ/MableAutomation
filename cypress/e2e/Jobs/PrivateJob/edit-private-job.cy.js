/* eslint-disable camelcase */
import faker from 'faker/locale/en_AU';

describe('Edit Private job', () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.firstName();
  const rnd = faker.random.alphaNumeric(5);
  const postcode = '2000';
  const suhurb = 'Barangaroo';
  const email = `automation_${firstName.toLowerCase()}_${rnd}.private+client@donotuse.com.au`;
  const password = 'qaAutomation2021';
  const phone = '0491570110';

  const desEdit2 = `Automation des 2 ${rnd}`;
  const desEdit1 = `Automation des 1 ${rnd}`;
  const workerIDList = [9452, 22122, 21409, 21677, 21676];

  beforeEach('ClearCookies', () => {
    cy
      .clearCookies()
      .clearLocalStorage()
      .visit('/');
  });

  const newlyClientEmail = 'automation_dylan_8g32y.private+client@donotuse.com.au';
  const newlyClientPass = 'qaAutomation2021';

  const newWorkerName2 = 'Natsu';

  it(`1. ES-T1130. Verify that client should be able to modify step 1 details of private jobs that are not yet published
  2. ES-T1131. Verify that client should be able to edit details of step 2 of private jobs that are not yet published`, () => {
    cy.log('Create new worker account')
      .log('Login as client')
      .loginToDashboard(newlyClientEmail, newlyClientPass)

      .log('On the left navigation pane click "Shortlist"')
      .clickElement('a[href="/shortlist"]')
      .verifyElementVisible('app-shortlist')

      .clickElementOnText('a.carerName', newWorkerName2)

      .verifyCurrentURL('/profile/worker/')
      .verifyTextVisible(`About ${newWorkerName2}`)
      .clickElement('button#messageButton')

      .verifyPrivateJobChipVisible()
      .verifyTextVisible('Privately share a new job description ')

      .clickReviewAndEditPJButton()
      .verifyTextVisible('Job description preview')
      .verifyElementVisible('app-review-private-jobs')
      .clickEditDescribeByIndex(0)

      .enterTextForTheDescribe1Or3(desEdit1)
      .clickElementOnText('button', 'Done')
      .waitAppLoaderNotVisible()

      .verifyTextVisible('updated')
      .verifyTextVisible(desEdit1)

      .verifyTextVisible('Job description preview')
      .clickEditDescribeByIndex(2)

      .clickElementOnText('button', 'Next')
      .waitAppLoaderNotVisible()

      // Question 2 step 2
      .enterTextForTheDescribe1Or3(desEdit2)
      .clickElementOnText('button', 'Done')
      .waitAppLoaderNotVisible()

      .verifyTextVisible('updated')
      .verifyTextVisible(desEdit2);
  });

  it(`1. ES-T1143 - Verify that client should be able to mark job as filled from private job details page
  2. ES-T1954 - Click fills a private job in job details page - first option was selected
  3. ES-T1955 - Client fills a private job in job details page - second option was selected
  4. ES-T1956 - Client fills a private job in job details page - Third option was selected
  5. ES-T1957 - Client fills a private job in job details page - None of the options was selected
  6. ES-T1958 - Client fills a private job in job details page - Close button was clicked`, () => {
    cy.log('Precondition: Create a new client + new Private job');
    cy.signUpAClientAndApprovedByAPI(email,
      password,
      firstName,
      lastName,
      postcode,
      suhurb,
      phone);
    cy.createPJOnlyDes2ByAPI(email,
      password,
      'private conversation',
      'Barangaroo NSW 2000',
      34160,
      workerIDList[0]);

    cy
      .log('Login as client')
      .loginToDashboard(email, password)

      .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

      .url()
      .should('include', 'jobs/posted-jobs')
      .verifyTextVisible('My jobs')
      .verifyElementContainsText('button', 'Post a job')

      .verifyTextVisible('Privately shared')
      .navToPrivateJobByIndex()
      .verifyThePrivateJobPreviewPage()

      .clickElementOnText('button', 'job as filled')
      .verifyTextVisible('How did you fill it')
      .verifyTextVisible('Mark filled')
      .clickElementOnText('div.action button', 'Close')

      .clickElementOnText('button', 'job as filled')
      .verifyTextVisible('How did you fill it')
      .verifyTextVisible('Mark filled')
      .clickElementOnText('div.action button', 'Mark filled')
      .verifyTextVisible('Please select an answer')
      .clickTheReasonPJByIndex()
      .clickElementOnText('div.action button', 'Mark filled')

      .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

      .url()
      .should('include', 'jobs/posted-jobs')
      .verifyTextVisible('My jobs')
      .verifyElementContainsMultipleText('div.details', 'Filled', 'Privately shared')

      .createPJOnlyDes2ByAPI(email,
        password,
        'private conversation',
        'Barangaroo NSW 2000',
        34160,
        workerIDList[1])
      .wait(2000)
      .reload()
      .fillAndVerifyPJWithTheReason(1)

      .createPJOnlyDes2ByAPI(email,
        password,
        'private conversation',
        'Barangaroo NSW 2000',
        34160,
        workerIDList[2])
      .wait(2000)
      .reload()
      .fillAndVerifyPJWithTheReason(2);
  });

  it(`1. ES-T1144 - Verify if client can cancel private jobs
  2. ES-T1145 - Verify if cancelled private jobs were displayed in archived jobs
  3. ES-T1820 - Client cancels a private job - first option was selected
  4. ES-T1821 - Client cancels a private job - second option was selected
  5. ES-T1822 - Client cancels a private job - Third option was selected
  6. ES-T1824 - Client cancels a private job - fourth option was selected
  7. ES-T1825 - Client cancels a private job - non of the option was selected`, () => {
    const newRnd = faker.random.alphaNumeric(5);
    const email = `automation_${firstName.toLowerCase()}_${newRnd}.private+client@donotuse.com.au`;
    cy.log('Precondition: Create a new client + new Private job');
    cy.signUpAClientAndApprovedByAPI(email,
      password,
      firstName,
      lastName,
      postcode,
      suhurb,
      phone);
    cy.createPJOnlyDes2ByAPI(email,
      password,
      'private conversation',
      'Barangaroo NSW 2000',
      34160,
      workerIDList[0]);

    cy
      .log('Login as client')
      .loginToDashboard(email, password)

      .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

      .url()
      .should('include', 'jobs/posted-jobs')
      .verifyTextVisible('My jobs')
      .verifyElementContainsText('button', 'Post a job')

      .verifyTextVisible('Privately shared')
      .navToPrivateJobByIndex()
      .verifyThePrivateJobPreviewPage()

      .clickElementOnText('button', 'Cancel job')
      .verifyTextVisible('Why are you cancelling it?')

      .clickElementOnText('div.action button', 'Close')

      .clickElementOnText('button', 'Cancel job')
      .verifyTextVisible('Why are you cancelling it?')

      .clickElementOnText('div.action button', 'Cancel Job')
      .verifyTextVisible('Please select an answer')
      .clickTheReasonPJByIndex()
      .clickElementOnText('div.action button', 'Cancel Job')

      .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

      .url()
      .should('include', 'jobs/posted-jobs')
      .verifyTextVisible('My jobs')
      .clickElementOnText('div.mat-tab-label-content', 'Archive')
      .verifyElementContainsMultipleText('div.details', 'Cancelled', 'Privately shared')

      .createPJOnlyDes2ByAPI(email,
        password,
        'private conversation',
        'Barangaroo NSW 2000',
        34160,
        workerIDList[1])
      .wait(2000)
      .reload()
      .cancelAndVerifyPJWithTheReason(1)

      .createPJOnlyDes2ByAPI(email,
        password,
        'private conversation',
        'Barangaroo NSW 2000',
        34160,
        workerIDList[2])
      .wait(2000)
      .reload()
      .cancelAndVerifyPJWithTheReason(2)

      .createPJOnlyDes2ByAPI(email,
        password,
        'private conversation',
        'Barangaroo NSW 2000',
        34160,
        workerIDList[2])
      .wait(2000)
      .reload()
      .cancelAndVerifyPJWithTheReason(3);
  });
});
