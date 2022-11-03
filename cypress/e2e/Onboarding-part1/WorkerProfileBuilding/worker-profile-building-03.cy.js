import faker from 'faker/locale/en_AU';
import * as data from '../../../fixtures/test-data.json';
import { checkMarkIcons } from '../../../support/page-actions/profile-building-action';

describe('Worker profile building', () => {
  const workerEmail = 'automation_burma.mahr.profilebuilding+worker@donotuse.com.au';
  const workerPass = 'qaAutomation2021';

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it('ES-T1041. Update "Bank account" details', () => {
    const bankName = 'bank of AB';
    const accountName = 'tes test';
    cy
      .loginToDashboard(
        workerEmail,
        workerPass,
      )

      .log('Go to the edit profile page')
      .clickElementOnText(
        data.profileBuildingLocators.editProfileBtn,
        data.profileBuildingContent.editProfileBtn,
      )

      .log('Check bank account page')
      .verifyTextVisible('Bank account')
      .verifyTextVisible('Add your bank account details')

      .log('Update to vaild account name')
      .inputTextField(
        data.profileBuildingLocators.bankAccount.accountName,
        accountName,
      )

      .log('Update a vaild bank name')
      .inputTextField(
        data.profileBuildingLocators.bankAccount.bankName,
        bankName,
      )

      .log('Update a vaild BSB')
      .inputTextField(
        data.profileBuildingLocators.bankAccount.bsb,
        '123456',
      )

      .log('Update a vaild account number')
      .inputTextField(
        data.profileBuildingLocators.bankAccount.accountNumber,
        '123467888',
      )

      .log('Check privacity checkbox')
      .clickElementOnText(
        '.mat-checkbox-label',
        'I understand that Mable is not responsible for checking the accuracy of my BSB and Account Number. Any errors in this information may result in me not being paid for services I have provided to clients.',
      )

      .log('Click Submit btn')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.bankAccount.submitBtn,
      )

      .log('Select Bank account')
      .clickElementOnText(
        data.profileBuildingLocators.item,
        data.profileBuildingContent.bankAccount.title,
      )

      .log('Check bank account page')
      .verifyTextVisible('Bank account')
      .verifyTextVisible('Add your bank account details')

      .log('Verify the inputs')
      .getValueOfInput(data.profileBuildingLocators.bankAccount.bsb)
      .then((text) => expect(text).to.equal('123456'))

      .getValueOfInput(data.profileBuildingLocators.bankAccount.accountName)
      .then((text) => expect(text).to.equal(accountName))

      .getValueOfInput(data.profileBuildingLocators.bankAccount.bankName)
      .then((text) => expect(text).to.equal(bankName));
  });

  it('ES-T1702. Update "Rates and availability"', () => {
    const weeekdayRate = Math.floor(Math.random() * (100 - 30) + 30);
    const hourRate = Math.floor(Math.random() * (30 - 5) + 5);

    cy
      .loginToDashboard(
        workerEmail,
        workerPass,
      )
      .closeMableDialog('Close')
      .log('Go to the edit profile page')
      .clickElementOnText(
        data.profileBuildingLocators.editProfileBtn,
        data.profileBuildingContent.editProfileBtn,
      )

      .log('Select Rates and availability')
      .clickElementOnText(
        data.profileBuildingLocators.item,
        data.profileBuildingContent.rates.title,
      )
      .verifyTextVisible(
        data.profileBuildingContent.rates.title,
      )
      .verifyTextVisible(
        data.profileBuildingContent.rates.description,
      )

      .verifyElementHaveText(
        'app-availability #daysSectionDisplay>h3',
        'Available days and times',
      )

      .log('Toggle ON the \'Available for work\'')
      .turnOnAvailableForWork()

      .log('Enter new postcode')
      .inputTextField(
        data.profileBuildingLocators.rates.location,
        'Barangaroo',
      )
      .clickElementOnText(
        '.suggestions div',
        'Barangaroo NSW 2000',
      )

      .log('Click Add btn')
      .wait(2000)
      .clickElementOnText(
        '.locations button span',
        'Add',
      )

      .log('Update weekday rate that as 25')
      .inputTextField(
        data.profileBuildingLocators.rates.weekdayRate,
        weeekdayRate,
      )

      .log('update 24 hour shift')
      .inputTextField(
        data.profileBuildingLocators.rates.hourShift24Rate,
        hourRate,
      )

      .log('Untick "I\'ll offer a free meet and greet to potential clients."')
      .uncheckIllOfferAFreeMeet()

      .log('Click update your availability')
      .get('#daysSectionDisplay span')
      .contains('Update your availability ')
      .click()

      .log('Toggle on one of the days and add hours')
      .selectDayStartTimeEndTime('wednesday', '00:00', '03:00')

      .log('Update total support per hours value')
      .get('app-numeric-input input')
      .clear()
      .type('100')

      .log('Click submit btn')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )
      .wait(4000)

      .log('ES-T1047: Check newly completed')

      .log('Check "check mark"')
      .get('a[href="/profile-building/availability"]')
      .siblings('app-icon')
      .find('svg path')
      .invoke('attr', 'd')
      .should('include', '9.58V9.61Z')
      .should('not.include', '4 12 4Z')

      .log('Select Rates and availability')
      .clickElementOnText(
        data.profileBuildingLocators.item,
        data.profileBuildingContent.rates.title,
      )

      .log('Check the previous page')
      .checkProfileBuildingPopup()
      .verifyTextVisible(
        data.profileBuildingContent.rates.title,
      )
      .verifyTextVisible(
        data.profileBuildingContent.rates.description,
      )
      .verifyTextVisible('Barangaroo NSW 2000')

      .log('On the right corner of the page click "Preview profile"')
      .get('app-profile-building button span')
      .contains('Preview profile')
      .click()
      .wait(2000)

      .log('Check Profile')
      .get('li[aria-label="available wednesday,"] app-icon')
      .find('svg path')
      .invoke('attr', 'd')
      .should('include', '18L9.86 18Z')
      .verifyTextExist('wed')
      .verifyTextExist(' 12:00 am to 03:00 am ')
      .verifyTextExist(`$${weeekdayRate}.00`)
      .verifyTextExist(`$${hourRate}.00`)

      .log('Click "Edit my profile" button')
      .get('a[href="/profile-building"] span')
      .contains(' Edit my profile')
      .click({ force: true })

      .wait(2000)

      .get('a[href="/profile-building/bank-account"]')
      .parents('li.ng-star-inserted')
      .invoke('attr', 'class')
      .should('include', 'selected')

      .log('ES-T3855: Edit specific section from worker profile')

      .log('Click \'Preview profile\' button')
      .get('app-profile-building button span')
      .contains('Preview profile')
      .click()
      .wait(2000)

      .log('Click \'Edit Profile\' button on highlighted section of worker profile')
      .get('a[href="/profile-building"] span')
      .contains(' Edit my profile')
      .click({ force: true })
      .wait(2000)

      .log('Click \'Preview profile\' button again')
      .get('app-profile-building button span')
      .contains('Preview profile')
      .click()
      .wait(2000)

      .log('Go to the last section you updated and click \'Edit\' button')
      .get('a[href="/profile-building"] span')
      .contains(' Edit my profile')
      .click({ force: true })
      .wait(2000)
      .get('a[href="/profile-building/availability"]')
      .click({ force: true })
      .verifyTextExist('Rates and availability')
      .verifyTextExist('Available for work')
      .verifyTextExist('Preview profile')

      .log('Update weekday rate that as 25')
      .inputTextField(
        data.profileBuildingLocators.rates.weekdayRate,
        99,
      )

      .log('update 24 hour shift')
      .inputTextField(
        data.profileBuildingLocators.rates.hourShift24Rate,
        98,
      )

      .log('Click submit btn')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )
      .wait(4000)

      .log('Click \'Preview profile\' button again')
      .get('app-profile-building button span')
      .contains('Preview profile')
      .click()
      .wait(2000)

      .verifyTextExist('$99.00')
      .verifyTextExist('$98.00');
  });

  it('ES-T1704. Update "Work history"', () => {
    const titleJob = faker.name.jobTitle();
    const company = faker.company.companyName();

    cy
      .loginToDashboard(
        workerEmail,
        workerPass,
      )

      .log('Go to the edit profile page')
      .clickElementOnText(
        data.profileBuildingLocators.editProfileBtn,
        data.profileBuildingContent.editProfileBtn,
      )

      .log('Select Work History')
      .clickElementOnText(
        data.profileBuildingLocators.item,
        data.profileBuildingContent.workHistory.title,
      )
      .verifyTextVisible(
        data.profileBuildingContent.workHistory.title,
      )
      .verifyTextVisible(
        data.profileBuildingContent.workHistory.description,
      )

      .log('Update job title')
      .inputTextFieldAtPosition(
        data.profileBuildingLocators.workHistory.jobTitle,
        titleJob,
        0,
      )

      .log('Update company name')
      .inputTextFieldAtPosition(
        data.profileBuildingLocators.workHistory.business,
        company,
        0,
      )

      .log('Update start day')
      .selectDropdown(
        data.profileBuildingLocators.workHistory.startDateMonth,
        'January',
        0,
      )
      .selectDropdown(
        data.profileBuildingLocators.workHistory.startDateYear,
        '2020',
        0,
      )

      .log('Update end day')
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
      .clickElement(data.profileBuildingLocators.workHistory.deleteJob, true, 2)

      .log('Click submit btn')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.workHistory.submitBtn,
      )

      .log('Select Work History')
      .clickElementOnText(
        data.profileBuildingLocators.item,
        data.profileBuildingContent.workHistory.title,
      )
      .verifyTextVisible(
        data.profileBuildingContent.workHistory.title,
      )
      .verifyTextVisible(
        data.profileBuildingContent.workHistory.description,
      )

      .log('Verify the inputs')
      .getAttributeAtPosition(data.profileBuildingLocators.workHistory.jobTitle, 'val', 0)
      .then(text => expect(text).to.equal(titleJob))

      .getAttributeAtPosition(data.profileBuildingLocators.workHistory.business, 'val', 0)
      .then(text => expect(text).to.equal(company))

      .log('Click Preview profile')
      .clickElementOnText(
        'app-profile-building button span',
        'Preview profile',
      )

      .log('Verify the infor')
      .verifyTextVisible(company)
      .verifyTextVisible(titleJob);
  });

  it('ES-T1706. Update "Education & training"', () => {
    const institution = 'University of Australia';
    const degree = 'BS IT';
    cy
      .loginToDashboard(
        workerEmail,
        workerPass,
      )

      .log('Go to the edit profile page')
      .clickElementOnText(
        data.profileBuildingLocators.editProfileBtn,
        data.profileBuildingContent.editProfileBtn,
      )
      .checkProfileBuildingPopup()

      .log('Select Education and training')
      .clickElementOnText(
        data.profileBuildingLocators.item,
        data.profileBuildingContent.educationTraining.title,
      )
      .verifyTextVisible(data.profileBuildingContent.educationTraining.title)

      .log('Update Institution')
      .inputTextFieldAtPosition(
        data.profileBuildingLocators.educationTraining.institution,
        institution,
        0,
      )

      .log('Update Degree/course')
      .inputTextFieldAtPosition(
        data.profileBuildingLocators.educationTraining.degree,
        degree,
        0,
      )

      .log('Update start day')
      .selectDropdown(
        data.profileBuildingLocators.educationTraining.startDateMonth,
        'January',
        0,
      )
      .selectDropdown(
        data.profileBuildingLocators.educationTraining.startDateYear,
        '2020',
        0,
      )

      .log('Update end day')
      .selectDropdown(
        data.profileBuildingLocators.educationTraining.endDateMonth,
        'January',
        0,
      )
      .selectDropdown(
        data.profileBuildingLocators.educationTraining.endDateYear,
        '2021',
        0,
      )

      .log('Add new job')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.educationTraining.addNew,
      )

      .log('Delete new additional education')
      .clickElement(data.profileBuildingLocators.educationTraining.deleteEducation, true, 2)

      .log('Click submit btn')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.educationTraining.submitBtn,
      )

      .log('Select Education and training')
      .clickElementOnText(
        data.profileBuildingLocators.item,
        data.profileBuildingContent.educationTraining.title,
      )
      .wait(2000)
      .verifyTextVisible(data.profileBuildingContent.educationTraining.title)

      .log('Verify the inputs')
      .getAttributeAtPosition(data.profileBuildingLocators.educationTraining.institution, 'val', 0)
      .then(text => expect(text).to.equal(institution))

      .getAttributeAtPosition(data.profileBuildingLocators.educationTraining.degree, 'val', 0)
      .then(text => expect(text).to.equal(degree))

      .log('Click Preview profile')
      .clickElementOnText(
        'app-profile-building button span',
        'Preview profile',
      )

      .log('Check the information')
      .verifyTextVisible('Education & training')
      .verifyTextVisible(institution)
      .verifyTextVisible(degree);
  });

  it('ES-T3434. Update "NDIS Worker Screening Check"', () => {
    cy
      .loginToDashboard(
        workerEmail,
        workerPass,
      )

      .log('Go to the edit profile page')
      .clickElementOnText(
        data.profileBuildingLocators.editProfileBtn,
        data.profileBuildingContent.editProfileBtn,
      )
      .checkProfileBuildingPopup()

      .log('Select NDIS')
      .clickElementOnText(
        data.profileBuildingLocators.item,
        data.profileBuildingContent.NDIS.item,
      )
      .verifyTextVisible(data.profileBuildingContent.NDIS.title)

      .log('Selct No option')
      .clickElementOnText(
        'app-ndis-worker-screening label span',
        'Yes',
      )

      .log('Click submit btn')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )

      .log('Select NDIS')
      .clickElementOnText(
        data.profileBuildingLocators.item,
        data.profileBuildingContent.NDIS.item,
      )
      .verifyTextVisible(data.profileBuildingContent.NDIS.title)

      .verifyStatusOfCheckbox(
        data.profileBuildingLocators.NDIS.checkbox,
        true,
        0,
      );
  });

  it('ES-T1709. Update "Badges"', () => {
    cy
      .loginToDashboard(
        workerEmail,
        workerPass,
      )

      .log('Go to the edit profile page')
      .clickElementOnText(
        data.profileBuildingLocators.editProfileBtn,
        data.profileBuildingContent.editProfileBtn,
      )
      .checkProfileBuildingPopup()

      .log('Select Badges')
      .clickElementOnText(
        data.profileBuildingLocators.item,
        data.profileBuildingContent.badges.title,
      )
      .verifyTextVisible(data.profileBuildingContent.badges.title)

      .log('Selct Yes option')
      .clickElementOnText(
        'app-badges label span.radioLabel',
        'Yes',
      )

      .log('Click submit btn')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )
      .verifyTextNotExist(data.profileBuildingContent.NDIS.title)

      .log('Select Badges')
      .clickElementOnText(
        data.profileBuildingLocators.item,
        data.profileBuildingContent.badges.title,
      )
      .verifyTextVisible(data.profileBuildingContent.badges.title)
      .verifyStatusOfCheckbox(
        data.profileBuildingLocators.badges.checkbox,
        true,
        0,
      )

      .log('Click Preview profile')
      .clickElementOnText(
        'app-profile-building button span',
        'Preview profile',
      )

      .log('Check the infor')
      .verifyTextVisible('LGBTI');
  });

  it('ES-T3714. Update "Immunisation"', () => {
    cy
      .loginToDashboard(
        workerEmail,
        workerPass,
      )

      .log('Go to the edit profile page')
      .clickElementOnText(
        data.profileBuildingLocators.editProfileBtn,
        data.profileBuildingContent.editProfileBtn,
      )
      .checkProfileBuildingPopup()

      .log('Select Immunisation')
      .clickElementOnText(
        data.profileBuildingLocators.item,
        data.profileBuildingContent.immunisation.title,
      )
      .verifyTextVisible(data.profileBuildingContent.immunisation.title)

      .log('On Are you up to date with your COVID-19 vaccine requirements? section, update the initial value, select "Yes, Im up to date"')
      .verifyTextExist('Are you up to date with your COVID-19 vaccine requirements?')
      .selectOptionByValueV2(
        data.profileBuildingLocators.immunisation.covidVaccine,
        'Select',
      )
      .selectOptionByValueV2(
        data.profileBuildingLocators.immunisation.covidVaccine,
        'yes_update_to_date',
      )

      .log('Click "Save and continue"')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )
      .verifyTextExist('Check box to continue.')
      .selectOptionByValueV2(
        data.profileBuildingLocators.immunisation.covidVaccine,
        'yes_update_to_date',
      )
      .verifyTextExist(' I’m up to date with an Australian-approved or recognised COVID-19 vaccine. I can provide evidence to support this. ')

      .log('Put a tick on I’m up to date with an Australian-approved or recognised COVID-19 vaccine. I can provide evidence to support this. <checkbox>')
      .clickElement('[formcontrolname="covidVaccineStatusConfirmed"] label')
      .verifyTextNotExist('Check box to continue.')

      .log('On Flu vaccine, update the initial value to "Yes"')
      .selectOptionByValue(
        data.profileBuildingLocators.immunisation.fluShot,
        'Yes',
      )

      .log('Click "Save and continue"')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )

      .log('Check newly completed')
      .log('Select Immunisation')
      .clickElementOnText(
        data.profileBuildingLocators.item,
        data.profileBuildingContent.immunisation.title,
      )
      .verifyTextVisible(data.profileBuildingContent.immunisation.title)

      .verifyStatusOfCheckbox(
        data.profileBuildingLocators.immunisation.fluShot,
        true,
        0,
      )

      .log('Edit specific section from worker profile')
      .log('Click Preview profile button')
      .clickElementOnText('button span', 'Preview profile')
      .verifyTextExist('About')

      .log('Click Edit Profile button on highlighted section of worker profile')
      .clickElement('[id="profilebtn"]')

      .log('Click Preview profile button again')
      .verifyTextExist('My profile')
      .clickElementOnText('button span', 'Preview profile')
      .verifyTextExist('About')

      .log('Go to the last section you updated and click Edit button')
      .clickElementOnText('a[href="/profile-building/immunisation"]', 'Edit')

      .log('Modify the initial value of the specific section/step and click Save and continue button')
      .verifyTextExist('Have you had a flu vaccine this season?')
      .selectOptionByValue(
        data.profileBuildingLocators.immunisation.fluShot,
        'No',
        false,
      )
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )
      .verifyTextExist('My profile')

      .log('Click Preview profile button')
      .clickElementOnText('button span', 'Preview profile')
      .verifyTextExist('About')
      .verifyTextNotExist('Seasonal flu vaccine 2022');
  });

  it('ES-T1711. Update "Language"', () => {
    cy
      .loginToDashboard(
        workerEmail,
        workerPass,
      )

      .log('Go to the edit profile page')
      .clickElementOnText(
        data.profileBuildingLocators.editProfileBtn,
        data.profileBuildingContent.editProfileBtn,
      )
      .checkProfileBuildingPopup()

      .log('Select Languages')
      .clickElementOnText(
        data.profileBuildingLocators.item,
        data.profileBuildingContent.languages.title,
      )
      .verifyTextVisible(data.profileBuildingContent.languages.title)

      .log('Unselect language')
      .get('app-languages .mat-checkbox-checked')
      .each(($el) => cy.wrap($el).click())

      .log('Select more languages')
      .clickElementOnText(
        data.profileBuildingLocators.languages.firstLanguages,
        'Vietnamese',
      )

      .log('Select more other languages')
      .clickElementOnText(
        data.profileBuildingLocators.languages.otherLanguages,
        'English',
      )

      .log('Click submit btn')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )

      .log('Select Languages')
      .clickElementOnText(
        data.profileBuildingLocators.item,
        data.profileBuildingContent.languages.title,
      )
      .verifyTextVisible(data.profileBuildingContent.languages.title)

      .log('Verity the inputs are saved')
      .verifyElementContainsText(
        'app-languages .mat-checkbox-checked',
        'English',
      )

      .verifyElementContainsText(
        'app-languages .mat-checkbox-checked',
        'Vietnamese',
      )

      .log('Click Preview profile')
      .clickElementOnText(
        'app-profile-building button span',
        'Preview profile',
      )

      .log('Check info')
      .verifyTextVisible('Language')
      .verifyTextVisible('First language')
      .verifyTextVisible('Vietnamese')
      .verifyTextVisible('English');
  });

  it('ES-T1712. Update "Cultural background"', () => {
    cy
      .loginToDashboard(
        workerEmail,
        workerPass,
      )

      .log('Go to the edit profile page')
      .clickElementOnText(
        data.profileBuildingLocators.editProfileBtn,
        data.profileBuildingContent.editProfileBtn,
      )
      .checkProfileBuildingPopup()

      .log('Select Cultural background')
      .clickElementOnText(
        data.profileBuildingLocators.item,
        data.profileBuildingContent.cultural.title,
      )
      .verifyTextVisible(data.profileBuildingContent.cultural.title)

      .log('Unselect all cultural')
      .get('app-cultural-background .mat-checkbox-checked')
      .eq(0)
      .click()
      .wait(1000)

      .get('app-cultural-background .mat-checkbox-checked')
      .eq(0)
      .click()

      .log('Select cultural')
      .clickElementOnText(
        data.profileBuildingLocators.cultural.option,
        'Australian',
      )
      .clickElementOnText(
        data.profileBuildingLocators.cultural.option,
        'Asian',
      )

      .log('Click submit btn')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )

      .log('Select Cultural background')
      .clickElementOnText(
        data.profileBuildingLocators.item,
        data.profileBuildingContent.cultural.title,
      )
      .verifyTextVisible(data.profileBuildingContent.cultural.title)

      .log('Verify the inputs are saved')
      .verifyElementContainsText(
        'app-cultural-background .mat-checkbox-checked',
        'Australian',
      )

      .log('Click Preview profile')
      .clickElementOnText(
        'app-profile-building button span',
        'Preview profile',
      )

      .log('Check the info')
      .verifyTextVisible('Cultural backgrounds')
      .verifyTextVisible('Australian');
  });

  it('ES-T1713. Update "Religion"', () => {
    cy
      .loginToDashboard(
        workerEmail,
        workerPass,
      )

      .log('Go to the edit profile page')
      .clickElementOnText(
        data.profileBuildingLocators.editProfileBtn,
        data.profileBuildingContent.editProfileBtn,
      )
      .checkProfileBuildingPopup()

      .log('Select Religion')
      .clickElementOnText(
        data.profileBuildingLocators.item,
        data.profileBuildingContent.religion.title,
      )
      .verifyTextVisible(data.profileBuildingContent.religion.title)

      .log('Unselect all religion')
      .get('app-religion .mat-checkbox-checked')
      .each(($el) => cy.wrap($el).click())

      .log('Select Religion')
      .clickElementOnText(
        data.profileBuildingLocators.religion.option,
        'Sikh',
      )
      .clickElementOnText(
        data.profileBuildingLocators.religion.option,
        'Other',
      )

      .log('Click submit btn')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )

      .log('Select Religion')
      .clickElementOnText(
        data.profileBuildingLocators.item,
        data.profileBuildingContent.religion.title,
      )
      .verifyTextVisible(data.profileBuildingContent.religion.title)

      .log('Verify the inputs are saved')
      .verifyElementContainsText(
        'app-religion .mat-checkbox-checked',
        'Sikh',
      )
      .verifyElementContainsText(
        'app-religion .mat-checkbox-checked',
        'Other',
      );
  });

  it('ES-T1714. Update "Interests & hobbies"', () => {
    cy
      .loginToDashboard(
        workerEmail,
        workerPass,
      )

      .log('Go to the edit profile page')
      .clickElementOnText(
        data.profileBuildingLocators.editProfileBtn,
        data.profileBuildingContent.editProfileBtn,
      )
      .checkProfileBuildingPopup()

      .log('Select Interests')
      .clickElementOnText(
        data.profileBuildingLocators.item,
        data.profileBuildingContent.interest.title,
      )
      .verifyTextVisible(data.profileBuildingContent.interest.title)

      .log('Deselect all interests')
      .get('app-interests-hobbies .mat-checkbox-checked')
      .each(($el) => cy.wrap($el).click())

      .log('Select options')
      .clickElementOnText(
        data.profileBuildingLocators.interest.option,
        'Cooking',
      )
      .clickElementOnText(
        data.profileBuildingLocators.interest.option,
        'Pets',
      )

      .log('Click submit btn')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )

      .log('Select Interests')
      .clickElementOnText(
        data.profileBuildingLocators.item,
        data.profileBuildingContent.interest.title,
      )
      .verifyTextVisible(data.profileBuildingContent.interest.title)

      .log('Verify the inputs are saved')
      .verifyElementContainsText(
        'app-interests-hobbies .mat-checkbox-checked',
        'Cooking',
      )
      .verifyElementContainsText(
        'app-interests-hobbies .mat-checkbox-checked',
        'Pets',
      )

      .log('Click Preview profile')
      .clickElementOnText(
        'app-profile-building button span',
        'Preview profile',
      )

      .log('Check the info')
      .verifyTextVisible('Interests')
      .verifyTextVisible('Cooking')
      .verifyTextVisible('Pets');
  });

  it('ES-T1715. Update "About me"', () => {
    cy
      .loginToDashboard(
        workerEmail,
        workerPass,
      )

      .log('Go to the edit profile page')
      .clickElementOnText(
        data.profileBuildingLocators.editProfileBtn,
        data.profileBuildingContent.editProfileBtn,
      )
      .checkProfileBuildingPopup()

      .log('Select About me')
      .clickElementOnText(
        data.profileBuildingLocators.item,
        data.profileBuildingContent.aboutMe.title,
      )
      .verifyTextVisible(data.profileBuildingContent.aboutMe.title)

      .clickCheckboxIfNotYetChecked(
        data.profileBuildingLocators.aboutMe.personality,
        0,
      )

      .clickCheckboxIfNotYetChecked(
        data.profileBuildingLocators.aboutMe.nonSmoker,
        0,
      )

      .clickCheckboxIfNotYetChecked(
        data.profileBuildingLocators.aboutMe.friendly,
        0,
      )

      .log('Click submit btn')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )

      .log('Select About me')
      .clickElementOnText(
        data.profileBuildingLocators.item,
        data.profileBuildingContent.aboutMe.title,
      )
      .verifyTextVisible(data.profileBuildingContent.aboutMe.title)

      .log('Veriy inputs are saved')
      .verifyStatusOfCheckbox(
        data.profileBuildingLocators.aboutMe.personality,
        true,
        0,
      )
      .verifyStatusOfCheckbox(
        data.profileBuildingLocators.aboutMe.nonSmoker,
        true,
        0,
      )
      .verifyStatusOfCheckbox(
        data.profileBuildingLocators.aboutMe.friendly,
        true,
        0,
      )

      .log('Click Preview profile')
      .clickElementOnText(
        'app-profile-building button span',
        'Preview profile',
      )

      .log('Check the info')
      .verifyTextVisible('Outgoing and engaging')
      .verifyTextVisible('Non-Smoker')
      .verifyTextVisible('Pet Friendly');
  });

  it('ES-T1717. Update "My preferences"', () => {
    cy
      .loginToDashboard(
        workerEmail,
        workerPass,
      )

      .log('Go to the edit profile page')
      .clickElementOnText(
        data.profileBuildingLocators.editProfileBtn,
        data.profileBuildingContent.editProfileBtn,
      )
      .checkProfileBuildingPopup()

      .log('Select My preferences')
      .clickElementOnText(
        data.profileBuildingLocators.item,
        data.profileBuildingContent.myPreferences.title,
      )
      .verifyTextVisible(data.profileBuildingContent.myPreferences.title)
      .verifyTextVisible(data.profileBuildingContent.myPreferences.description)

      .log('Deselect all initial option')
      .get('app-my-preferences .mat-checkbox-checked label')
      .each(($el) => cy.wrap($el).click())

      .log('Tick "Non-smoker"')
      .clickElementOnText(
        data.profileBuildingLocators.myPreference.option,
        'Non-smoker',
      )

      .log('Click submit btn')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.myPreferences.submitBtn,
      )

      .log('Click Edit my profile btn')
      .clickElementOnText(
        'app-carer-profile a span',
        'Edit my profile',
      )
      .checkProfileBuildingPopup()
      .verifyElementContainsText(
        data.profileBuildingLocators.title,
        data.profileBuildingContent.title,
      )
      .verifyTextVisible(data.profileBuildingContent.bankAccount.title)

      .log('Select My preferences')
      .clickElementOnText(
        data.profileBuildingLocators.item,
        data.profileBuildingContent.myPreferences.title,
      )
      .verifyTextVisible(data.profileBuildingContent.myPreferences.title)
      .verifyTextVisible(data.profileBuildingContent.myPreferences.description)

      .verifyElementContainsText(
        data.profileBuildingLocators.myPreference.checked,
        'Non-smoker',
      );

    checkMarkIcons('My preferences', true);
  });

  it('ES-T3855. Edit specific section from worker profile', () => {
    cy
      .loginToDashboard(
        workerEmail,
        workerPass,
      )

      .log('Go to the edit profile page')
      .clickElementOnText(
        data.profileBuildingLocators.editProfileBtn,
        data.profileBuildingContent.editProfileBtn,
      )
      .checkProfileBuildingPopup()

      .log('Click Preview profile')
      .clickElementOnText(
        'app-profile-building button span',
        'Preview profile',
      )
      .verifyTextVisible("Your profile isn't visible to clients until your account is approved")

      .log('Click Edit my profile btn')
      .clickElementOnText(
        'app-carer-profile a span',
        'Edit my profile',
      )
      .verifyTextVisible('Bank account')

      .log('Click Preview profile')
      .clickElementOnText(
        'app-profile-building button span',
        'Preview profile',
      )
      .verifyTextVisible("Your profile isn't visible to clients until your account is approved")

      .log('Click Edit on Availability')
      .clickElementOnText(
        '#availabilityPanel a',
        'Edit',
      )
      .verifyTextVisible('Rates and availability');
  });
});
