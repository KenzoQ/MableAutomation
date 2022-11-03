import * as data from '../../../fixtures/test-data.json';

describe('Search support worker', () => {
  // Account
  const clientEmail = data.dashboardAccount.hcpClientAccount.email;
  const clientPassword = data.dashboardAccount.hcpClientAccount.password;

  const krisEmail = 'automation.kris.bernal.searchworker+client@donotuse.com.au';
  const krisPassword = 'qaAutomation2021';

  const valerieEmail = 'automation_valerie.searchminor+client@donotuse.com.au';
  const valeriePassword = 'qaAutomation2021';

  const searchValue = 'ION';
  const postcodeText = 'Barangaroo NSW 2000';
  const postcodeShort = '2000 Barangaroo';
  const shortSuburt = 'Barangaroo NSW';

  beforeEach(() => {
    cy
      .visit('/')

      .byPassAuthen();
  });

  it('ES-T50. View search support worker page', () => {
    cy
      .log('Login as client')
      .loginToDashboard(krisEmail, krisPassword)

      .log('Go to the Search workers')
      .navigateByLeftMenuInDashboard('Search workers')

      .skipToResultSearchWorkers()

      .log('Navigate to search for worker suceesfully')
      .verifyTextVisible('Search workers')

      .log('Check address pin')
      .verifyElementVisible(data.search.client.addressInput)

      .log('Enter search keyword')
      .inputTextField(data.search.client.searchInput, 'Music')

      .get(data.search.client.searchInput)
      .clear()

      .log('Check address pin')
      .verifyElementVisible(data.search.client.addressInput)

      .log('Enter search keyword')
      .inputTextField(data.search.client.searchInput, postcodeText);
  });

  it('ES-T51. Search support worker by name', () => {
    const nameWorker = searchValue;

    cy
      .log('Login as client')
      .loginToDashboard(krisEmail, krisPassword)

      .log('Click "Search workers"')
      .clickSearchSupportWorkers()

      .skipToResultSearchWorkers()

      .clickElement('button.showAllFiltersAction')
      .verifyElementExist('#allFiltersSlideMenu')

      .clickElementByText('Search by support worker name')
      .log(`Enter ${nameWorker} in the textbox`)
      .inputTextField('input[formcontrolname="firstName"]', nameWorker)
      .clickElementOnText('.workerSearchByNameResultContent button', 'Search')
      .waitAppLoaderNotVisible()
      .verifyTextVisible('Results')
      .verifyTextVisible('match')
      .verifyTextVisible(nameWorker)

      .log('Click "View profile" 1 of the result list')
      .get('.workerSearchMatchContent')
      .first()
      .contains('View profile')
      .click({ force: false })
      .verifyElementVisible('app-carer-profile #profileHeader')

      .log('Click "Back to search results" btn')
      .clickElementOnText('app-back-button span', 'Back');
  });

  it('ES-T97. View search support worker page from dashboard', () => {
    cy
      .log('Login as client')
      .loginToDashboard(
        'automation_searchworker+sp@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Click Seach for workers on Using mable')
      .clickElementOnText(
        '.dashboardChecklists h4',
        'Search and message a support worker',
      )

      .skipToResultSearchWorkers()
      .log('Navigate to search for worker suceesfully')
      .verifyTextVisible('Search workers');
  });

  it('ES-T536. View search support worker page from left navigation pane', () => {
    cy
      .log('Login as client')
      .loginToDashboard(clientEmail, clientPassword)

      .log('Go to the Invited workers')
      .navigateByLeftMenuInDashboard('Search workers')

      .skipToResultSearchWorkers()

      .log('Navigate to search for worker suceesfully')
      .verifyTextVisible('Search workers');
  });

  it('ES-T130. Search support worker', () => {
    cy
      .log('Login as client')
      .loginToDashboard(krisEmail, krisPassword)

      .log('Go to the Search workers')
      .navToSearchWorkers()

      .log('Navigate to search for worker suceesfully')
      .verifyTextVisible('Search workers')

      .log(`Search: ${postcodeShort}`)
      .searchWorkersBySuburb(postcodeShort)

      .log('Verify "What types of support would this worker provide?"')
      .verifyAllSearchTypeOfSupport()

      .log('Verify "Total number of workers are displayed"')
      .verifyTotalNumberWorkerDisplay(shortSuburt)

      .log('Verify "Next and Back  button are displayed"')
      .verifyNextBackButtonVisible()

      .log('Verify "Skip to results link is displayed"')
      .verifySkipToResultsVisible()
      .clickSkipToResults();
  });

  it('ES-T3248. Search support worker by location - skip to see results', () => {
    cy
      .log('Login as client')
      .loginToDashboard(krisEmail, krisPassword)

      .log('Go to the Search workers')
      .skipToResultSearchWorkers()

      .log('Retrieved workers are displayed')
      .verifyCurrentURL('/worker-search-result?')
      .verifyElementVisible('.panel.workerSearchMatchCard')

      .log('Click View profile button')
      .clickElementOnText('.panel.workerSearchMatchCard', 'View profile')

      .log('Client is navigated to support worker profile')
      .verifyCurrentURL('/profile/worker/')

      .log('Click back button')
      .clickElement('app-back-button button')

      .log('Client is navigated to search results page')
      .verifyElementVisible('app-worker-search-by-location')

      .log('Click ShortList')
      .clickElementOnText('.panel.workerSearchMatchCard button', 'Shortlist')

      .log('Click ShortList')
      .verifyTextVisible('Shortlisted')

      .log('Shortlisted')
      .clickElementOnText('.panel.workerSearchMatchCard button', 'Shortlisted');
  });

  it('ES-T3252. Search support worker by location - with minor participants', () => {
    cy
      .log('Login as client')
      .loginToDashboard(valerieEmail, valeriePassword)

      .log('Go to the Search workers')
      .navToSearchWorkers()

      .log('Navigate to search for worker suceesfully')
      .verifyTextVisible('Search workers')

      .log(`Search: ${postcodeShort}`)
      .searchWorkersBySuburb(postcodeShort)

      .log('Verify "Will the worker support a child?"')
      .verifyWillSupportChild()

      .log('click next button')
      .clickElementOnText('button', 'Next')

      .log('Verify "What types of support would this worker provide?"')
      .verifyAllSearchTypeOfSupport()

      .log('Verify "Total number of workers are displayed"')
      .verifyTotalNumberWorkerDisplay(shortSuburt)

      .log('Select "Daily living, social and community activities"')
      .clickElementOnText('.carerTypeInfo', 'Daily living, social and community activities')

      .log('click next button')
      .clickElementOnText('button', 'Next')

      .log('Verify "What daily living, social and community activities activities would they support?')
      .verifyDailyLivingSupport()

      .log('click "Community activities and outings"')
      .clickElementOnText('mat-checkbox', 'Community activities and outings')

      .log('click next button')
      .clickElementOnText('button', 'Next')

      .verifyTextVisible('Do you prefer a specific gender?')

      .log('click See results button')
      .clickElementOnText('button', 'See results')

      .log('Verify "Result url"')
      .verifyCurrentURL('/worker-search-result?')

      .log('Click View profile button')
      .clickElementOnText('.panel.workerSearchMatchCard', 'View profile')

      .log('Client is navigated to support worker profile')
      .verifyCurrentURL('/profile/worker/')

      .log('Click back button')
      .clickElement('app-back-button button')

      .log('Client is navigated to search results page')
      .verifyElementVisible('app-worker-search-by-location')

      .log('Click ShortList')
      .clickElementOnText('.panel.workerSearchMatchCard button', 'Shortlist')

      .log('Click ShortList')
      .verifyTextVisible('Shortlisted')

      .log('Shortlisted')
      .clickElementOnText('.panel.workerSearchMatchCard button', 'Shortlisted');
  });

  it('ES-T3253. Search support worker by location - No minor participants', () => {
    cy
      .log('Login as client')
      .loginToDashboard(krisEmail, krisPassword)

      .log('Go to the Search workers')
      .navToSearchWorkers()

      .log('Navigate to search for worker suceesfully')
      .verifyTextVisible('Search workers')

      .log(`Search: ${postcodeShort}`)
      .searchWorkersBySuburb(postcodeShort)

      .log('Verify "What types of support would this worker provide?"')
      .verifyAllSearchTypeOfSupport()

      .log('Select "Daily living, social and community activities"')
      .clickElementOnText('.carerTypeInfo', 'Daily living, social and community activities')

      .log('click next button')
      .clickElementOnText('button', 'Next')

      .log('Verify "What daily living, social and community activities activities would they support?')
      .verifyDailyLivingSupport()

      .log('click "Community activities and outings"')
      .clickElementOnText('mat-checkbox', 'Community activities and outings')

      .log('click next button')
      .clickElementOnText('button', 'Next')

      .verifyTextVisible('Do you prefer a specific gender?')

      .log('click See results button')
      .clickElementOnText('button', 'See results')

      .log('Verify "Result url"')
      .verifyCurrentURL('/worker-search-result?')

      .log('Click View profile button')
      .clickElementOnText('.panel.workerSearchMatchCard', 'View profile')

      .log('Client is navigated to support worker profile')
      .verifyCurrentURL('/profile/worker/')

      .log('Click back button')
      .clickElement('app-back-button button')

      .log('Client is navigated to search results page')
      .verifyElementVisible('app-worker-search-by-location')

      .log('Click ShortList')
      .clickElementOnText('.panel.workerSearchMatchCard button', 'Shortlist')

      .log('Click ShortList')
      .verifyTextVisible('Shortlisted')

      .log('Shortlisted')
      .clickElementOnText('.panel.workerSearchMatchCard button', 'Shortlisted');
  });

  it('ES-T3255. Search support worker by location - Check what type of support would this worker provide page', () => {
    cy
      .log('Login as client')
      .loginToDashboard(krisEmail, krisPassword)

      .log('Go to the Search workers')
      .navToSearchWorkers()

      .log('Navigate to search for worker suceesfully')
      .verifyTextVisible('Search workers')

      .log(`Search: ${postcodeShort}`)
      .searchWorkersBySuburb(postcodeShort)

      .log('"Will the worker support a child" not be displayed')
      .verifyTextNotExist('Will the worker support a child')

      .log('Verify "What types of support would this worker provide?"')
      .verifyAllSearchTypeOfSupport()

      .log('Select "Personal care"')
      .clickElementOnText('.carerTypeInfo', 'Personal care')

      .log('click next button')
      .clickElementOnText('button', 'Next')

      .log('Verify "What personal care activities would they support?')
      .verifyTextVisible('What personal care activities would they support?')

      .log('click "Assistance with eating "')
      .clickElementOnText('mat-checkbox', 'Assistance with eating')

      .log('click back button')
      .clickElementOnText('button', 'Back')

      .verifyTextVisible('What types of support would this worker provide')

      .log('click back button')
      .clickElementOnText('button', 'Back')

      .log('Navigate to search for worker suceesfully')
      .verifyTextVisible('Search workers')

      .log('Go to the Search workers')
      .skipToResultSearchWorkers()

      .log('Retrieved workers are displayed')
      .verifyCurrentURL('/worker-search-result?')
      .verifyElementVisible('.panel.workerSearchMatchCard')

      .log('Click View profile button')
      .clickElementOnText('.panel.workerSearchMatchCard', 'View profile')

      .log('Client is navigated to support worker profile')
      .verifyCurrentURL('/profile/worker/')

      .log('Click back button')
      .clickElement('app-back-button button')

      .log('Client is navigated to search results page')
      .verifyElementVisible('app-worker-search-by-location')

      .log('Click ShortList')
      .clickElementOnText('.panel.workerSearchMatchCard button', 'Shortlist')

      .log('Click ShortList')
      .verifyTextVisible('Shortlisted')

      .log('Shortlisted')
      .clickElementOnText('.panel.workerSearchMatchCard button', 'Shortlisted');
  });

  it('ES-T3256. Search support worker by location - check "What daily living , social and community activities would they support? " UI', () => {
    cy
      .log('Login as client')
      .loginToDashboard(krisEmail, krisPassword)

      .log('Go to the Search workers')
      .navToSearchWorkers()

      .log('Navigate to search for worker suceesfully')
      .verifyTextVisible('Search workers')

      .log(`Search: ${postcodeShort}`)
      .searchWorkersBySuburb(postcodeShort)

      .log('Verify "What types of support would this worker provide?"')
      .verifyAllSearchTypeOfSupport()

      .log('Select "Daily living, social and community activities"')
      .clickElementOnText('.carerTypeInfo', 'Daily living, social and community activities')

      .log('click next button')
      .clickElementOnText('button', 'Next')

      .log('Verify "What daily living, social and community activities activities would they support?')
      .verifyDailyLivingSupport()

      .log('click "Community activities and outings"')
      .clickElementOnText('mat-checkbox', 'Community activities and outings')

      .log('click next button')
      .clickElementOnText('button', 'Next')

      .verifyTextVisible('Do you prefer a specific gender?')

      .log('click See results button')
      .clickElementOnText('button', 'See results')

      .log('Verify "Result url"')
      .verifyCurrentURL('/worker-search-result?');
  });

  it('ES-T3257.Search support worker by location - Check do you prefer a specific gender UI', () => {
    const gender = 'Male';
    cy
      .log('Login as client')
      .loginToDashboard(krisEmail, krisPassword)

      .log('Go to the Search workers')
      .navToSearchWorkers()

      .log('Navigate to search for worker suceesfully')
      .verifyTextVisible('Search workers')

      .log(`Search: ${postcodeShort}`)
      .searchWorkersBySuburb(postcodeShort)

      .log('Verify "What types of support would this worker provide?"')
      .verifyAllSearchTypeOfSupport()

      .log('Select "Daily living, social and community activities"')
      .clickElementOnText('.carerTypeInfo', 'Daily living, social and community activities')

      .log('click next button')
      .clickElementOnText('button', 'Next')

      .log('Verify "What daily living, social and community activities activities would they support?')
      .verifyDailyLivingSupport()

      .log('click "Community activities and outings"')
      .clickElementOnText('mat-checkbox', 'Community activities and outings')

      .log('click next button')
      .clickElementOnText('button', 'Next')

      .verifyTextVisible('Do you prefer a specific gender?')

      .clickElementOnText('.radioLabel', gender)

      .log(`'verify ${gender} selected'`)
      .get('.radioBtn.selected')
      .contains(gender)
      .should('be.visible')

      .log('click See results button')
      .clickElementOnText('button', 'See results')

      .log('Verify "Result url"')
      .verifyCurrentURL('/worker-search-result?');
  });

  it('ES-T3266. Check previous search contents in job triage page', () => {
    cy
      .log('Login as client')
      .loginToDashboard(krisEmail, krisPassword)

      .log('Go to the Search workers')
      .navToSearchWorkers()

      .log('Navigate to search for worker suceesfully')
      .verifyTextVisible('Search workers')

      .log('Previous search')
      .verifyElementVisible('div.previousSearchContentDetails')
      .verifyElementVisible('.distance.previousSearchField')
      .verifyElementVisible('.serviceType.previousSearchField')
      .verifyElementVisible('.gender.previousSearchField');
  });

  it('ES-T3295. Search worker by location - no results found', () => {
    const pos = 'Joyner 4500';
    cy
      .log('Login as client')
      .loginToDashboard(krisEmail, krisPassword)

      .log('Go to the Search workers')
      .navToSearchWorkers()

      .log('Navigate to search for worker suceesfully')
      .verifyTextVisible('Search workers')

      .log(`Search: ${pos}`)
      .searchWorkersBySuburb(pos)

      .verifyTextVisible('No workers in your area')

      .clickSkipToResults()

      .get('div:not(.top-results).panel.workerSearchMatchCard')
      .should('have.length', 0);
  });
});
