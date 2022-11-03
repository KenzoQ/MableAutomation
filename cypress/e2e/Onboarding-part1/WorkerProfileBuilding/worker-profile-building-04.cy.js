import faker from 'faker/locale/en_AU';
import * as data from '../../../fixtures/test-data.json';

describe('Worker profile building', () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.firstName();
  const workerEmail = `automation_${firstName.toLowerCase()}+${Date.now()}.profile+building04@donotuse.com.au`;
  const workerPass = 'qaAutomation2021';

  before(() => {
    cy.createWorkerAccountAPI(workerEmail, workerPass, firstName, lastName);
  });

  beforeEach(() => {
    cy.visit('/').wait(2000);
  });

  it('ES-T1728. Add work location from my profile page', () => {
    cy.loginToDashboard(workerEmail, workerPass)

      .log('Go to the edit profile page')
      .clickElement(data.profileBuildingLocators.profileCardAvatar)
      .verifyTextVisible('On Mable since')

      .log('Click See list of locations')
      .clickElementOnText('#locationsPanel a', 'See list of locations')
      .verifyTextVisible('Barton ACT 2600')

      .log('Click Edit btn on Work location section')
      .clickElementOnText('#locationsPanel a', 'Edit')
      .checkProfileBuildingPopup()
      .verifyTextVisible('Rates and availability')

      .log('Enter postcode that is more than 150kms')
      .inputTextField(data.profileBuildingLocators.rates.location, '2601')
      .clickElementOnText('.suggestions div', 'Acton ACT 2601')
      .log('Click Add btn')
      .clickElementOnText('.locations button span', 'Add')

      .log('Clear input')
      .get(data.profileBuildingLocators.rates.location)
      .clear()

      .log('Click Add btn')
      .clickElementOnText('.locations button span', 'Add')
      .verifyTextVisible('Provide a postcode/suburb')

      .log('Click Delete Postcode')
      .clickElement(data.profileBuildingLocators.rates.deletePostcode, true, 0)
      .verifyTextVisible('Location deleted')

      .log('Enter postcode that is more than 150kms')
      .inputTextField(data.profileBuildingLocators.rates.location, 'Acton')
      .clickElementOnText('.suggestions div', 'Acton ACT 2601')
      .log('Click Add btn')
      .clickElementOnText('.locations button span', 'Add')

      .log('Click "Save and continue"')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      );
  });

  it('ES-T1732. Add work and education history from my profile page', () => {
    cy.loginToDashboard(workerEmail, workerPass)

      .log('Go to the edit profile page')
      .clickElement(data.profileBuildingLocators.profileCardAvatar)
      .verifyTextVisible('On Mable since')

      .log('Click Add work and education history')
      .clickElementOnText('#historyPanel a', 'Add work and education history')
      .checkProfileBuildingPopup()
      .verifyTextVisible('Work history')

      .log('Click Submit btn')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )
      .verifyElementContainsText(
        data.profileBuildingLocators.workHistory.status,
        'Provide a job title/role',
      )
      .verifyElementContainsText(
        data.profileBuildingLocators.workHistory.status,
        'Provide a company name',
      )
      .verifyElementContainsText(
        data.profileBuildingLocators.workHistory.status,
        'Please select a month',
      )
      .verifyElementContainsText(
        data.profileBuildingLocators.workHistory.status,
        'Please select a year',
      )
      .log('Enter job title')
      .inputTextField(
        data.profileBuildingLocators.workHistory.jobTitle,
        'Work history 1',
      )

      .log('Enter company name')
      .inputTextField(
        data.profileBuildingLocators.workHistory.business,
        'company 1',
      )

      .log('Add start day')
      .selectDropdown(
        data.profileBuildingLocators.workHistory.startDateMonth,
        'January',
      )
      .selectDropdown(
        data.profileBuildingLocators.workHistory.startDateYear,
        '2020',
      )

      .log('Add a valid end day')
      .selectDropdown(
        data.profileBuildingLocators.workHistory.endDateMonth,
        'January',
      )
      .selectDropdown(
        data.profileBuildingLocators.workHistory.endDateYear,
        '2021',
      )

      .log('Add new job')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.workHistory.addNew,
      )

      .log('Delete new additional job')
      .clickElement(data.profileBuildingLocators.workHistory.deleteJob, true, 1)

      .log('Click submit btn')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.workHistory.submitBtn,
      )
      .verifyTextVisible('Education & training');
  });

  it('ES-T3665. View support worker`s profile as a client', () => {
    cy.loginToDashboard(
      'automation_dether.ocampo.account+client@donotuse.com.au',
      'qaAutomation2021',
    )

      .log('Click "Search workers"')
      .navigateByLeftMenuInDashboard('Search workers')

      .searchWorkersByOnlySuburb('Bar beach')

      .log('Click View profile btn on Omer Y')
      .wait(2000)
      .log('Click Profile btn')
      .get('.carerName')
      .contains('Omer Y')
      .parents('.workerSearchMatchContent')
      .find('button')
      .contains('View profile')
      .click()

      .log('Check profile details')
      .verifyTextVisible('Omer Y')
      .verifyTextVisible('Registered Nurse')
      .verifyTextVisible('On Mable since 04/04/2022')
      .verifyTextVisible('Contact Omer')

      .log('Check Bio')
      .verifyTextVisible('About Omer Y')

      .log('Check Mable verified')
      .verifyTextVisible('Mable verified')
      .verifyTextVisible(
        'We ensure every support worker is checked and verified to provide a trusted and positive experience.',
      )
      .verifyTextVisible('ABN registered')
      .verifyTextVisible('Police check')
      .verifyTextVisible('Insurance covered')
      .verifyTextVisible('Infection control training (COVID-19)')

      .log('Check Indicative rates')
      .verifyTextVisible('Meet & greet')
      .verifyTextVisible('Weekday')
      .verifyTextVisible('Weekend')
      .verifyTextVisible('24-hour session')

      .log('Check Work location')
      .verifyTextVisible('Work locations')
      .verifyTextVisible('See list of locations')

      .log('Check more information')
      .verifyTextVisible('More information')
      .verifyTextVisible('Language')
      .verifyTextVisible('Cultural backgrounds')
      .verifyTextVisible('Religion')
      .verifyTextVisible('Interests')
      .verifyTextVisible('Personality')

      .log('Check the Services offered section')
      .verifyTextVisible('Services offered')

      .log('Check Badges')
      .verifyTextVisible('LGBTI')
      .verifyTextVisible('Non-Smoker')
      .verifyTextVisible('Pet Friendly')

      .log('Check education')
      .verifyTextVisible('Work and education history')
      .verifyTextVisible('Work history')
      .verifyTextVisible('Education & training')

      .log('Check Interested in engaging Omer?')
      .verifyTextVisible('Message Omer to discuss your needs.')
      .verifyTextVisible('After Omer replies, agree on rates and services.')
      .verifyTextVisible('Omer will send you an agreement to accept.')
      .verifyTextVisible('Complete your profile to accept the agreement.');
  });

  it(`
    1. ES-T1726. Add preferred days from my profile page
    2. ES-T1736. Updated preferred days from my profile page
  `, () => {
    cy.loginToDashboard(workerEmail, workerPass)

      .log('Go to the edit profile page')
      .clickElement(data.profileBuildingLocators.profileCardAvatar)
      .verifyTextVisible('On Mable since')

      .log('Click Edit btn on Availability section')
      .clickElementOnText('#availabilityPanel a', 'Edit')
      .checkProfileBuildingPopup()
      .verifyTextVisible(data.profileBuildingContent.rates.title)
      .verifyTextVisible(data.profileBuildingContent.rates.description)

      .log('Click the Update btn to update the time')
      .clickElementOnText(
        '.showAvailabilityLink span',
        'Update your availability',
      )
      .wait(2000)

      .log('Toggle Monday')
      .clickElement('#availabilityEditModeList .availableDay input', true, 0)

      .log('Select Start time')
      .selectDropdown(data.profileBuildingLocators.rates.startTime, '00:00')

      .log('Select End time')
      .selectDropdown(data.profileBuildingLocators.rates.endTime, '07:30')

      .log('Click "Save and continue"')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )
      .checkProfileBuildingPopup()
      .wait(2000)

      .log('Click Preview profile')
      .clickElementOnText('app-profile-building button span', 'Preview profile')

      .log('Click Edit btn on Availability section')
      .clickElementOnText('#availabilityPanel a', 'Edit')
      .checkProfileBuildingPopup()
      .verifyTextVisible(data.profileBuildingContent.rates.title)
      .verifyTextVisible(data.profileBuildingContent.rates.description)

      .log('Click the Update btn to update the time')
      .clickElementOnText(
        '.showAvailabilityLink span',
        'Update your availability',
      )

      .log('Select End time')
      .selectDropdown(data.profileBuildingLocators.rates.endTime, '09:30')

      .log('Click "Save and continue"')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )
      .checkProfileBuildingPopup()

      .log('Click Preview profile')
      .clickElementOnText('app-profile-building button span', 'Preview profile')
      .verifyTextVisible('12:00 am to 09:30 am');
  });

  it('ES-T1730. Add more information from my profile page', () => {
    cy.loginToDashboard(workerEmail, workerPass)

      .log('Go to the edit profile page')
      .clickElement(data.profileBuildingLocators.profileCardAvatar)
      .verifyTextVisible('On Mable since')

      .log('Click Edit btn in More information section')
      .clickElementOnText('#moreInfoPanel a', 'Edit')
      .checkProfileBuildingPopup();
  });

  it('ES-T1724. Add rates from my profile page', () => {
    cy.loginToDashboard(workerEmail, workerPass)

      .log('Go to the edit profile page')
      .clickElement(data.profileBuildingLocators.profileCardAvatar)
      .verifyTextVisible('On Mable since')

      .log('Add the rates')
      .clickElementOnText('#ratesPanel a', 'Add rates')

      .log('Click continue to edit my profile CTA')
      .checkProfileBuildingPopup()
      .verifyTextVisible(data.profileBuildingContent.rates.title)

      .log('Select Rates and availability again')
      .clickElementOnText(
        data.profileBuildingLocators.item,
        data.profileBuildingContent.rates.title,
      )
      .verifyTextExist('Available days and times')

      .log('Click Save and Continue button even if form is not yet completed')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )
      .verifyTextExist('Experience')

      .log('Go back to Rates and availability')
      .clickElementOnText(
        data.profileBuildingLocators.item,
        data.profileBuildingContent.rates.title,
      )
      .verifyTextExist('Available days and times')

      .log('Check toggle for Available for work is working')
      .turnOnAvailableForWork()

      .log('Update the total support hours per week')
      .verifyTextVisible('Total support hours per week on Mable')
      .inputTextField('app-numeric-input input', '5')

      .log('Check Learn more on how much to charge for the service you offer link')
      .verifyElementExist('[href="https://help.mable.com.au/knowledge-base/how-much-should-i-charge/"]')

      .log('Check Weekday checkbox')
      .clickElement('[formcontrolname="weekday"] input', true)

      .log('Enter weekday rate amount that is less than $32')
      .inputTextField("input[formcontrolname='weekdayRate']", 10)
      .verifyTextExist(
        'Offer a minimum rate of $32 for active support under our terms of use',
      )

      .log('Clear entered weekday rate then enter amount that is more than or equals to $32')
      .inputTextField("input[formcontrolname='weekdayRate']", 35)
      .verifyTextNotExist(
        'Offer a minimum rate of $32 for active support under our terms of use',
      )

      .log('Check Weekend checkbox')
      .clickElement('[formcontrolname="weekend"] input', true)

      .log('Enter weekend rate amount that is less than $32')
      .inputTextField('input[formcontrolname="weekendRate"]', 10)
      .verifyTextExist(
        'Offer a minimum rate of $32 for active support under our terms of use',
      )

      .log('Clear entered weekday rate then enter amount that is more than or equals to $32')
      .inputTextField('input[formcontrolname="weekendRate"]', 35)
      .verifyTextNotExist(
        'Offer a minimum rate of $32 for active support under our terms of use',
      )

      .log('Check 24-hour shift')
      .clickElement('[formcontrolname="hourShift24"] input', true)

      .log('Add a rate')
      .inputTextField('input[formcontrolname="hourShift24Rate"]', 10)
      .verifyTextExist(
        'Rates for 24-hour support can be a combination of active support, passive support and sleep outlined in an agreement with a client.',
      )

      .log('Click "I will offer a free meet and greet to potential clients."')
      .uncheckIllOfferAFreeMeet()
      .wait(1000)
      .clickElement(
        'mat-checkbox#meetPotentialClients label.mat-checkbox-layout',
        true,
      )

      .log('Click "Save and continue"')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )
      .wait(2000)

      .log('Check "check mark"')
      .get('a[href="/profile-building/availability"]')
      .siblings('app-icon')
      .find('svg path')
      .invoke('attr', 'd')
      .should('include', '4 12 4Z')
      .should('not.include', '9.58V9.61Z');
  });

  it('ES-T1734. Update rates from my profile page', () => {
    cy.loginToDashboard(
      'automation_rates.availability.profilebuilding+worker@donotuse.com.au',
      'qaAutomation2021',
    )

      .log('Go to the edit profile page')
      .clickElement(data.profileBuildingLocators.profileCardAvatar)
      .verifyTextVisible('On Mable since')

      .log('Click Edit btn on Indicative rates section')
      .clickElementOnText('#availabilityPanel a', 'Edit')
      .verifyTextVisible(data.profileBuildingContent.rates.title)

      .log('Input weekday rate')
      .inputTextField("input[formcontrolname='weekdayRate']", 27)
      .verifyTextNotExist(
        'Offer a minimum rate of $25 for active support under our terms of use',
      )

      .log('Input weekend rate')
      .inputTextField('input[formcontrolname="weekendRate"]', 27)
      .verifyTextNotExist(
        'Offer a minimum rate of $25 for active support under our terms of use',
      )

      .log('Input 24-hour rate')
      .inputTextField('input[formcontrolname="hourShift24Rate"]', 27)

      .log('Click "Save and continue"')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )
      .wait(2000)

      .log('Click "Preview profile"')
      .clickElementOnText('app-profile-building button span', 'Preview profile')
      .wait(2000)

      .log('Check Profile details page')
      .verifyTextVisible('$27.00 p/hour')
      .verifyTextVisible('$27.00 p/session');
  });

  it('ES-T1742. Update badge from my profile page', () => {
    cy.loginToDashboard(
      'automation_update.badge.profilebuilding+worker@donotuse.com.au',
      'qaAutomation2021',
    )

      .log('Go to the edit profile page')
      .clickElement(data.profileBuildingLocators.profileCardAvatar)
      .verifyTextVisible('On Mable since')

      .log('Click Edit on Bage')
      .clickElementOnText('#badgesPanel a', 'Edit')
      .verifyTextVisible(data.profileBuildingContent.badges.title)

      .log('Selct No option')
      .clickElementOnText('app-badges label span.radioLabel', 'No')

      .log('Click submit btn')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )

      .log('Click Preview profile')
      .clickElementOnText('app-profile-building button span', 'Preview profile')
      .wait(2000)

      .log('Check Badges')
      .verifyTextNotExist('Badges')
      .verifyTextNotExist('LGBTI')

      .log('Go to the edit profile page')
      .clickElementOnText(
        data.profileBuildingLocators.editProfileBtn,
        data.profileBuildingContent.editProfileBtn,
      )

      .log('Select Badges')
      .clickElementOnText(
        data.profileBuildingLocators.item,
        data.profileBuildingContent.badges.title,
      )
      .verifyTextVisible(data.profileBuildingContent.badges.title)

      .log('Selct Yes option')
      .clickElementOnText('app-badges label span.radioLabel', 'Yes')

      .log('Click submit btn')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      );
  });

  it('ES-T1740. Update more information from my profile page', () => {
    cy.loginToDashboard(
      'automation_more.information.profilebuilding+worker@donotuse.com.au',
      'qaAutomation2021',
    )

      .log('Go to the edit profile page')
      .clickElement(data.profileBuildingLocators.profileCardAvatar)
      .verifyTextVisible('On Mable since')

      .log('Click Edit in More information section')
      .clickElementOnText('#moreInfoPanel a', 'Edit');
  });

  it('ES-T1744. Update work and education history from my profile page', () => {
    const companyName = faker.company.companyName();
    const jobTitle = faker.name.jobTitle();
    const degree = faker.name.jobType();

    cy.loginToDashboard(
      'automation_work.education.profilebuilding+worker@donotuse.com.au',
      'qaAutomation2021',
    )

      .log('Go to the edit profile page')
      .clickElement(data.profileBuildingLocators.profileCardAvatar)
      .verifyTextVisible('On Mable since')

      .log('Click Edit on Education')
      .clickElementOnText('#historyPanel a', 'Edit')
      .verifyTextVisible('Work history')

      .log('Enter job title')
      .inputTextField(
        data.profileBuildingLocators.workHistory.jobTitle,
        jobTitle,
      )

      .log('Enter company name')
      .inputTextField(
        data.profileBuildingLocators.workHistory.business,
        companyName,
      )

      .log('Add start day')
      .selectDropdown(
        data.profileBuildingLocators.workHistory.startDateMonth,
        'January',
      )
      .selectDropdown(
        data.profileBuildingLocators.workHistory.startDateYear,
        '2020',
      )

      .log('Add new job')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.workHistory.addNew,
      )

      .log('Delete new additional job')
      .clickElement(data.profileBuildingLocators.workHistory.deleteJob, true, 1)

      .log('Click submit btn')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.workHistory.submitBtn,
      )
      .verifyTextVisible(data.profileBuildingContent.educationTraining.title)

      .log('Enter Institution')
      .inputTextField(
        data.profileBuildingLocators.educationTraining.institution,
        'Institution test 1',
      )

      .log('Enter Degree/course')
      .inputTextField(
        data.profileBuildingLocators.educationTraining.degree,
        degree,
      )

      .log('Add start day')
      .selectDropdown(
        data.profileBuildingLocators.educationTraining.startDateMonth,
        'January',
      )
      .selectDropdown(
        data.profileBuildingLocators.educationTraining.startDateYear,
        '2020',
      )

      .log('Add end day')
      .selectDropdown(
        data.profileBuildingLocators.educationTraining.endDateMonth,
        'January',
      )
      .selectDropdown(
        data.profileBuildingLocators.educationTraining.endDateYear,
        '2022',
      )

      .log('Click submit btn')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.educationTraining.submitBtn,
      )

      .log('Click Preview profile')
      .clickElementOnText('app-profile-building button span', 'Preview profile')

      .log('Check the information')
      .wait(2000)
      .verifyTextExist(companyName)
      .verifyTextExist(jobTitle)
      .verifyTextExist(degree)
      .verifyTextVisible('1/01/2020 - 1/01/2022');
  });

  it('ES-T1738. Update work location from my profile page', () => {
    cy.loginToDashboard(
      'automation_work.location.profilebuilding+worker@donotuse.com.au',
      'qaAutomation2021',
    )

      .log('Go to the edit profile page')
      .clickElement(data.profileBuildingLocators.profileCardAvatar)
      .verifyTextVisible('On Mable since')

      .log('Click Edit btn on Work location section')
      .clickElementOnText('#locationsPanel a', 'Edit')

      .log('Enter postcode that is more than 150kms')
      .wait(2000)
      .inputTextField(data.profileBuildingLocators.rates.location, '2601')
      .clickElementOnText('.suggestions div', 'Acton ACT 2601')
      .log('Click Add btn')
      .clickElementOnText('.locations button span', 'Add')

      .verifyTextVisible('Add new location?')

      .log('Click <Add new location> button')
      .clickElementOnText(
        data.profileBuildingLocators.rates.locationPopup.button,
        'Add new location',
      )

      .log('Click "Save and continue"')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )
      .wait(2000)

      .log('Click Preview profile')
      .clickElementOnText('app-profile-building button span', 'Preview profile')

      .log('Click See list of locations')
      .clickElementOnText('#locationsPanel a', 'See list of locations')
      .verifyTextVisible('Acton ACT 2601')

      .log('Click Edit btn on Work location section')
      .clickElementOnText('#locationsPanel a', 'Edit')

      .log('Remove new location')
      .get('.selectedLocationList span')
      .contains('Acton ACT 2601')
      .parent()
      .find('app-icon[name="close"]')
      .click({ force: true })

      .log('Click "Save and continue"')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      );
  });
});
