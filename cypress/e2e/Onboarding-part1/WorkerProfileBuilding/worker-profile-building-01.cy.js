import faker from 'faker/locale/en_AU';
import * as data from '../../../fixtures/test-data.json';
import { checkMarkIcons, chooseSection } from '../../../support/page-actions/profile-building-action';

describe('Worker profile building', () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.firstName();
  const workerEmail = `automation_${firstName.toLowerCase()}+${Date.now()}.profile+building@donotuse.com.au`;
  const workerPass = 'qaAutomation2021';
  const jesseEmail = 'automation_jesse+elijah.profile+building@donotuse.com.au';
  const jessePass = 'qaAutomation2021';

  // const workerEmail = 'automation_jesse+elijah.profile+building@donotuse.com.au';

  before(() => {
    cy
      .createWorkerAccountAPI(
        workerEmail,
        workerPass,
        firstName,
        lastName,
      );
  });

  beforeEach(() => {
    cy
      .visit('/')
      .wait(2000);
  });

  it('ES-T1045. Complete "Bank account", invalid bank account', () => {
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

      .log('Check bank account page')
      .verifyTextVisible('Bank account')
      .verifyTextVisible('Add your bank account details')

      .log('Click Submit btn')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.bankAccount.submitBtn,
      )
      .wait(1000)
      .verifyElementContainsText(
        data.profileBuildingLocators.bankAccount.status,
        'Provide a account name',
      )
      .verifyElementContainsText(
        data.profileBuildingLocators.bankAccount.status,
        'Provide a bank name',
      )
      .verifyElementContainsText(
        data.profileBuildingLocators.bankAccount.status,
        'Provide a valid bsb',
      )
      .verifyElementContainsText(
        data.profileBuildingLocators.bankAccount.status,
        'Provide a account number',
      )

      .log('Enter a vaild account name')
      .inputTextField(
        data.profileBuildingLocators.bankAccount.accountName,
        'test test',
      )

      .log('Enter a vaild bank name')
      .inputTextField(
        data.profileBuildingLocators.bankAccount.bankName,
        'Bank of AU',
      )

      .log('Enter a invaild BSB')
      .inputTextField(
        data.profileBuildingLocators.bankAccount.bsb,
        '1234rhhh',
      )

      .log('Enter a vaild account number')
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

      .log('Reload page')
      .reload()

      .log('Verify inputs are not saved')
      .getValueOfInput(data.profileBuildingLocators.bankAccount.accountName)
      .then((text) => expect(text).to.equal(''))
      .getValueOfInput(data.profileBuildingLocators.bankAccount.bankName)
      .then((text) => expect(text).to.equal(''))
      .getValueOfInput(data.profileBuildingLocators.bankAccount.bsb)
      .then((text) => expect(text).to.equal(''))
      .getValueOfInput(data.profileBuildingLocators.bankAccount.accountNumber)
      .then((text) => expect(text).to.equal(''));
  });

  it('ES-T1046. Complete "Bank account", valid bank account', () => {
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

      .log('Check bank account page')
      .verifyTextVisible('Bank account')
      .verifyTextVisible('Add your bank account details')

      .log('Click Submit btn')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.bankAccount.submitBtn,
      )
      .verifyElementContainsText(
        data.profileBuildingLocators.bankAccount.status,
        'Provide a account name',
      )
      .verifyElementContainsText(
        data.profileBuildingLocators.bankAccount.status,
        'Provide a bank name',
      )
      .verifyElementContainsText(
        data.profileBuildingLocators.bankAccount.status,
        'Provide a valid bsb',
      )
      .verifyElementContainsText(
        data.profileBuildingLocators.bankAccount.status,
        'Provide a account number',
      )

      .log('Enter a vaild account name')
      .inputTextField(
        data.profileBuildingLocators.bankAccount.accountName,
        'test test',
      )

      .log('Enter a vaild bank name')
      .inputTextField(
        data.profileBuildingLocators.bankAccount.bankName,
        'Bank of AU',
      )

      .log('Click "BSB" then enter more than 6 digits bsb')
      .inputTextField(
        data.profileBuildingLocators.bankAccount.bsb,
        '123456789',
      )
      .get(data.profileBuildingLocators.bankAccount.bsb)
      .invoke('val')
      .then($val => expect($val).eq('123456'))

      .log('Click "BSB" then enter less than 6 digits bsb and/or using letters and special characters')
      .inputTextField(
        data.profileBuildingLocators.bankAccount.bsb,
        'asdadd',
      )
      .verifyTextExist('Provide a valid bsb')

      .log('Enter a vaild account number')
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

      .log('Enter a vaild BSB')
      .inputTextField(
        data.profileBuildingLocators.bankAccount.bsb,
        '123456',
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
      .checkProfileBuildingPopup()

      .log('Check bank account page')
      .verifyTextVisible('Bank account')
      .verifyTextVisible('Add your bank account details')

      .log('Verify the inputs')
      .getValueOfInput(data.profileBuildingLocators.bankAccount.bsb)
      .then((text) => expect(text).to.equal('123456'))

      .getValueOfInput(data.profileBuildingLocators.bankAccount.accountNumber)
      .then((text) => expect(text).to.equal('123467888'))

      .getValueOfInput(data.profileBuildingLocators.bankAccount.bankName)
      .then((text) => expect(text).to.equal('Bank of AU'));
  });

  it('ES-T1048. Complete "Rates and availability", optional', () => {
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

      .log('Check "How much to charge" section')
      .verifyTextVisible('How much to charge?')
      .verifyTextVisible('Learn more on how much to charge for the service you offer')

      .log('Click submit btn')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )

      .log('Select Rates and availability again')
      .clickElementOnText(
        data.profileBuildingLocators.item,
        data.profileBuildingContent.rates.title,
      )
      .log('Verify all field are empty')
      .getValueOfInput(data.profileBuildingLocators.rates.location)
      .then(text => expect(text).to.equal(''));
  });

  it('ES-T1049. Complete "Rates and availability"', () => {
    cy
      .loginToDashboard(
        jesseEmail,
        jessePass,
      )

      .log('Go to the edit profile page')
      .clickElementOnText(
        data.profileBuildingLocators.editProfileBtn,
        data.profileBuildingContent.editProfileBtn,
      )
      .checkProfileBuildingPopup()

      .log('Select Rates and availability')
      .clickElementOnText(
        data.profileBuildingLocators.item,
        data.profileBuildingContent.rates.title,
      )
      .checkProfileBuildingPopup()
      .verifyTextVisible(
        data.profileBuildingContent.rates.title,
      )
      .verifyTextVisible(
        data.profileBuildingContent.rates.description,
      )

      .log('Toggle OFF the Available for work')
      .turnOffAvailableForWork()
      .verifyTextExist('Not available for work')

      .log('Toggle ON the \'Available for work\'')
      .turnOnAvailableForWork()
      .verifyTextExist('Available for work')

      .log('Check Help clients avoid disappointment banner')
      .verifyTextExist('Help clients avoid disappointment')
      .verifyTextExist('Keep your availability information up to date so potential clients aren’t disappointed if you’re not available at the time they want.')
      .verifyTextExist('I was excited about them but they’re not available when their profile said.')
      .verifyTextExist('They were a good fit and their profile showed when they weren\'t available so I changed my times.')

      .log('In the Available days and times section, click the "Update your availability and add times" link')
      .get('#daysSectionDisplay span')
      .contains('Update your availability ')
      .click()

      .log('In Tuesday section ,  click the toggle to on')
      .turnOffAllAvailableDaysAndTimes()
      .selectDayStartTimeEndTime('tuesday', '00:00', '17:00')

      .log('Check Total support hours per week on Mable section')
      .verifyTextExist('Total support hours per week on Mable')
      .verifyTextExist('What’s the total number of support hours per week you\'d like the Mable platform to help you achieve?')
      .verifyTextExist('Enter the hours of work you already have with Mable plus any additional support hours you’d like us to help you find.')
      .verifyTextExist('This will help us to send you job requests that better fit your support hours goals')
      .verifyElementExist('[formcontrolname="desiredHours"]')

      .log('In total support hours per week Add 100 in the value holder')
      .inputTextField('app-numeric-input input', 100)

      .log('Check Locations section')
      .verifyTextExist('Locations')
      .verifyTextExist('Enter the suburbs you will be available to work in.')
      .verifyTextExist('Type in a suburb or postcode')
      .verifyTextExist('Add')

      .log('Enter postcode that is less than 150kms')
      .deleteCurrentSuburbOrPostcode()
      .inputTextField(
        data.profileBuildingLocators.rates.location,
        'Barton',
      )
      .clickElementOnText(
        '.suggestions div',
        'Barton ACT 2600',
      )

      .log('Click Add btn')
      .clickElementOnText(
        '.locations button span',
        'Add',
        2000,
        false,
      )
      .wait(3000)

      .log('Enter postcode that is more than 150kms')
      .inputTextField(
        data.profileBuildingLocators.rates.location,
        'Barangaroo',
      )
      .clickElementOnText(
        '.suggestions div',
        'Barangaroo NSW 2000',
      )
      .log('Click Add btn')
      .clickElementOnText(
        '.locations button span',
        'Add',
        2000,
        false,
      )

      .log('Verify new work location popup')
      .wait(1000)
      .verifyElementVisible(data.profileBuildingLocators.rates.locationPopup.container)
      .verifyTextVisible('New work location')
      .verifyTextVisible('Add new location?')

      .log('Click <Discard location> button or click outside the pop-up modal')
      .clickElementOnText(
        data.profileBuildingLocators.rates.locationPopup.button,
        'Discard location',
      )
      .wait(2000)

      .log('Click Add btn')
      .clickElementOnText(
        '.locations button span',
        'Add',
        1000,
        false,
      )

      .log('Verify new work location popup')
      .wait(1000)
      .verifyElementVisible(data.profileBuildingLocators.rates.locationPopup.container)
      .verifyTextVisible('New work location')
      .verifyTextVisible('Add new location?')

      .log('Click <Add new location> button')
      .clickElementOnText(
        data.profileBuildingLocators.rates.locationPopup.button,
        'Add new location',
      )
      .verifyTextVisible('Location added')

      .log('Check Indicative rates section')
      .verifyTextExist('Indicative rates')
      .verifyTextExist('Your indicative hourly rates will be displayed on your profile as a guide for clients. Specific rates must be agreed with each client before you accept a job.')
      .verifyTextExist('How much to charge?')
      .verifyTextExist('Indicative rates provide a guide to your potential clients to help them make an informed decision about who supports them. Consider your rates based on')
      .verifyTextExist('Your experience, qualifications, other skills (such as languages) and services')
      .verifyTextExist('Your ratings and reviews from clients')
      .verifyTextExist('Your holiday pay, taxes and contributions to superannuation')
      .verifyTextExist('Don’t forget that the actual rate you receive will be 10% less than the agreed rate while your clients will pay 5% more, for the support and services Mable facilitates.')
      .verifyTextExist('Learn more on how much to charge for the service you offer')

      .log('Click "Weekday" then click "Save and continue"')
      .clearTextField(data.profileBuildingLocators.rates.weekdayRate)
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )
      .verifyTextExist('Provide a indicative hourly rate')

      .log('Enter weekday rate, alphanumeric/special character')
      .inputTextField(
        data.profileBuildingLocators.rates.weekdayRate,
        'aaa',
      )
      .verifyTextExist('Provide a numeric value')

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

      .log('Click "Weekend" then click "Save and continue"')
      .get('input[formcontrolname="weekendRate"]')
      .clear()
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )
      .verifyTextExist('Provide a indicative hourly rate')

      .log('Clear entered weekend rate then enter amount that is less than $25')
      .inputTextField('input[formcontrolname="weekendRate"]', 'aa')
      .verifyTextExist('Provide a numeric value')

      .log('Clear entered weekend rate then enter amount that is less than $25')
      .inputTextField('input[formcontrolname="weekendRate"]', 10)
      .verifyTextExist('Offer a minimum rate of $32 for active support under our terms of use')

      .log('Clear entered weekend rate then enter amount that is more than or equals to $25')
      .inputTextField('input[formcontrolname="weekendRate"]', 35)

      .log('Click "24-hour shift" then click "Save and continue"')
      .get('input[formcontrolname=\'hourShift24Rate\']')
      .clear()
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )
      .verifyTextExist('Provide a indicative flat rate')

      .log('Enter 24-hour shift,  alphanumeric/special character')
      .inputTextField('input[formcontrolname=\'hourShift24Rate\']', 'aa')
      .verifyTextExist('Provide a numeric value')

      .inputTextField('input[formcontrolname=\'hourShift24Rate\']', 10)
      .verifyTextExist('Rates for 24-hour support can be a combination of active support, passive support and sleep outlined in an agreement with a client.')

      .log('Click "I\'ll offer a free meet and greet to potential clients."')
      .uncheckIllOfferAFreeMeet()
      .wait(1000)
      .clickElement('mat-checkbox#meetPotentialClients label.mat-checkbox-layout')

      .log('Click "Save and continue"')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )
      .wait(2000)

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
      .get('li[aria-label="available tuesday,"] app-icon')
      .find('svg path')
      .invoke('attr', 'd')
      .should('include', '18L9.86 18Z')
      .verifyTextExist('wed')
      .verifyTextExist(' 12:00 am to 05:00 pm ')
      .verifyTextExist('$35.00')

      .log('Click "Edit my profile" button')
      .get('a[href="/profile-building"] span')
      .contains(' Edit my profile')
      .click({ force: true })
      .wait(2000)

      .get('a[href="/profile-building/bank-account"]')
      .parents('li')
      .invoke('attr', 'class')
      .should('include', 'selected');
  });

  it('ES-T1051. Complete "Work history"', () => {
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

      .log('Add a invalid end day')
      .selectDropdown(
        data.profileBuildingLocators.workHistory.endDateMonth,
        'January',
      )
      .selectDropdown(
        data.profileBuildingLocators.workHistory.endDateYear,
        '2019',
      )

      .log('Click submit btn')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )
      .verifyTextVisible('Start date must be before end date')

      .log('Enter valid end day')
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

      .log('Add new job')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.workHistory.addNew,
      )

      .log('Enter job title')
      .inputTextFieldAtPosition(
        data.profileBuildingLocators.workHistory.jobTitle,
        'Work history 2',
        1,
      )

      .log('Enter company name')
      .inputTextFieldAtPosition(
        data.profileBuildingLocators.workHistory.business,
        'company 2',
        1,
      )

      .log('Add start day')
      .selectDropdown(
        data.profileBuildingLocators.workHistory.startDateMonth,
        'May',
        1,
      )
      .selectDropdown(
        data.profileBuildingLocators.workHistory.startDateYear,
        '2021',
        1,
      )

      .log('Click "I am working with this role"')
      .clickElement(
        data.profileBuildingLocators.workHistory.stillCurrent,
        true,
        1,
      )

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
      .then(text => expect(text).to.equal('Work history 1'))

      .getAttributeAtPosition(data.profileBuildingLocators.workHistory.jobTitle, 'val', 1)
      .then(text => expect(text).to.equal('Work history 2'))

      .getAttributeAtPosition(data.profileBuildingLocators.workHistory.business, 'val', 0)
      .then(text => expect(text).to.equal('company 1'))

      .getAttributeAtPosition(data.profileBuildingLocators.workHistory.business, 'val', 1)
      .then(text => expect(text).to.equal('company 2'))

      .log('Click Preview profile')
      .clickElementOnText(
        'app-profile-building button span',
        'Preview profile',
      )

      .log('Verify the infor')
      .verifyTextVisible('Work history')
      .verifyTextVisible('Work history 1')
      .verifyTextVisible('Work history 2')
      .verifyTextVisible('company 1')
      .verifyTextVisible('company 2')

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
      .verifyTextVisible(data.profileBuildingContent.bankAccount.title);
  });

  it('ES-T1053. Complete "Education & training"', () => {
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

      .log('Click submit btn')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )
      .verifyElementContainsText(
        data.profileBuildingLocators.educationTraining.status,
        'Provide a institution',
      )
      .verifyElementContainsText(
        data.profileBuildingLocators.educationTraining.status,
        'Provide a degree/course',
      )
      .verifyElementContainsText(
        data.profileBuildingLocators.educationTraining.status,
        'Please select a month',
      )
      .verifyElementContainsText(
        data.profileBuildingLocators.educationTraining.status,
        'Please select a year',
      )

      .log('Enter Institution')
      .inputTextField(
        data.profileBuildingLocators.educationTraining.institution,
        'Institution test 1',
      )

      .log('Enter Degree/course')
      .inputTextField(
        data.profileBuildingLocators.educationTraining.degree,
        'Manual degree',
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

      .log('Add a invalid end day')
      .selectDropdown(
        data.profileBuildingLocators.educationTraining.endDateMonth,
        'January',
      )
      .selectDropdown(
        data.profileBuildingLocators.educationTraining.endDateYear,
        '2019',
      )

      .log('Click submit btn')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.educationTraining.submitBtn,
      )
      .verifyTextVisible('Start date must be before end date')

      .log('Enter valid end day')
      .selectDropdown(
        data.profileBuildingLocators.educationTraining.endDateYear,
        '2021',
      )

      .log('Add new job')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.educationTraining.addNew,
      )

      .log('Delete new additional education')
      .clickElement(data.profileBuildingLocators.educationTraining.deleteEducation, true, 1)

      .log('Add new job')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.educationTraining.addNew,
      )

      .log('Enter Institution')
      .inputTextFieldAtPosition(
        data.profileBuildingLocators.educationTraining.institution,
        'Institution test 2',
        1,
      )

      .log('Enter Degree/course')
      .inputTextFieldAtPosition(
        data.profileBuildingLocators.educationTraining.degree,
        'testing',
        1,
      )

      .log('Add start day')
      .selectDropdown(
        data.profileBuildingLocators.educationTraining.startDateMonth,
        'May',
        1,
      )
      .selectDropdown(
        data.profileBuildingLocators.educationTraining.startDateYear,
        '2021',
        1,
      )

      .log('Click "I am working with this role"')
      .clickElement(
        data.profileBuildingLocators.educationTraining.stillCurrent,
        true,
        1,
      )

      .log('Click submit btn')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.workHistory.submitBtn,
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
      .then(text => expect(text).to.equal('Institution test 1'))

      .getAttributeAtPosition(data.profileBuildingLocators.educationTraining.institution, 'val', 1)
      .then(text => expect(text).to.equal('Institution test 2'))

      .getAttributeAtPosition(data.profileBuildingLocators.educationTraining.degree, 'val', 0)
      .then(text => expect(text).to.equal('Manual degree'))

      .getAttributeAtPosition(data.profileBuildingLocators.educationTraining.degree, 'val', 1)
      .then(text => expect(text).to.equal('testing'))

      .log('Click Preview profile')
      .clickElementOnText(
        'app-profile-building button span',
        'Preview profile',
      )

      .log('Check the information')
      .verifyTextVisible('Education & training')
      .verifyTextVisible('Manual degree')
      .verifyTextVisible('Institution test 1')
      .verifyTextVisible('1/01/2020 - 1/01/2021')
      .verifyTextVisible('testing')
      .verifyTextVisible('Institution test 2')
      .verifyTextVisible('1/05/2021 - current')

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
      .verifyTextVisible(data.profileBuildingContent.bankAccount.title);
  });

  it('ES-T3432. Complete "NDIS Worker Screening Check", optional', () => {
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

      .log('Click submit btn')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )
      .verifyTextNotExist(data.profileBuildingContent.NDIS.title)

      .log('Select Education and training')
      .clickElementOnText(
        data.profileBuildingLocators.item,
        data.profileBuildingContent.NDIS.item,
      )
      .verifyTextVisible(data.profileBuildingContent.NDIS.title)

      .log('Verify no selected item')
      .verifyTextVisible('It’s optional to answer.')
      .verifyStatusOfCheckbox(
        data.profileBuildingLocators.NDIS.checkbox,
        false,
        0,
      )
      .verifyStatusOfCheckbox(
        data.profileBuildingLocators.NDIS.checkbox,
        false,
        1,
      );
  });

  it('ES-T3433. Complete "NDIS Worker Screening Check"', () => {
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
        'No',
      )

      .log('Selct Yes option')
      .clickElementOnText(
        'app-ndis-worker-screening label span',
        'Yes',
      )

      .log('Click submit btn')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )
      .verifyTextNotExist(data.profileBuildingContent.NDIS.title)

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

  it('ES-T1058. Complete "Badges", optional', () => {
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

      .log('Click submit btn')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )

      .log('Select Badges')
      .clickElementOnText(
        data.profileBuildingLocators.item,
        data.profileBuildingContent.badges.title,
      )
      .verifyTextVisible(data.profileBuildingContent.badges.title)

      .log('Verify no option are selected')
      .verifyStatusOfCheckbox(
        data.profileBuildingLocators.badges.checkbox,
        false,
        0,
      )
      .verifyStatusOfCheckbox(
        data.profileBuildingLocators.badges.checkbox,
        false,
        1,
      );
  });

  it('ES-T1059. Complete "Badges"', () => {
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

      .log('Selct No option')
      .clickElementOnText(
        'app-badges label span.radioLabel',
        'No',
      )

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
      .verifyTextVisible('LGBTI')

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
      .verifyTextVisible(data.profileBuildingContent.bankAccount.title);
  });

  it('ES-T1708: Update "Experience"', () => {
    const description = 'This is the random text generated by automation testing. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.';

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

      .log('Click Experience"')
      .get('a[href="/profile-building/experience"]')
      .contains('Experience')
      .click()
      .wait(2000)

      .log('Deselect the previous care experience (Aged care) and select different (Disability)')
      .get('span')
      .contains('Mental health')
      .click({ force: true })
      .wait(1000)

      .log('Fill up the Disability form, if needed')
      .get('span')
      .contains('Anxiety')
      .click({ force: true })
      .get('textarea[formcontrolname="description"]')
      .type(description)

      .log('Click "Save and continue"')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )
      .wait(2000)

      .log('On the right corner of the page click "Preview profile"')
      .get('app-profile-building button span')
      .contains('Preview profile')
      .click()
      .wait(2000)

      .log('Click "Edit my profile" button')
      .get('a[href="/profile-building"] span')
      .contains(' Edit my profile')
      .click({ force: true })
      .wait(2000)

      .log('Click Experience"')
      .get('a[href="/profile-building/experience"]')
      .click({ force: true })
      .wait(1000)

      .log('Select \'Chronic medical conditions\'')
      .get('span')
      .contains('Chronic medical conditions')
      .click({ force: true })
      .wait(1000)

      .log('Fill up the Disability form, if needed')
      .get('span')
      .contains('Arthritis')
      .click({ force: true })
      .get('textarea[formcontrolname="description"]')
      .eq(1)
      .type(description)

      .log('Click "Save and continue"')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      );
  });

  it('ES-T1055: Complete "Experience", optional', () => {
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

      .log('Click Experience"')
      .get('a[href="/profile-building/experience"]')
      .click()
      .wait(1000)

      .log('Click "Save and continue"')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )
      .wait(2000)

      .log('Click Experience"')
      .get('a[href="/profile-building/experience"]')
      .click()
      .wait(1000)

      .log('Check "Experience"page')
      .checkCareExperienceNoSelected('Aged care')
      .checkCareExperienceNoSelected('Chronic medical conditions')
      .checkCareExperienceNoSelected('Disability')
      .checkCareExperienceNoSelected('Mental health');
  });

  it('ES-T1056: Complete "Experience"', () => {
    const below100Characters = data.validate.below100characters;
    const above600Characters = data.validate.above600characters;
    const exact100Characters = data.validate.exact100characters;
    const profaneCharacters = `${exact100Characters} fuck sex cock shit bitch`;
    const link = 'https://mable.lifeworks.com/';
    const phone = '090866666';
    const wordsIncludeEmail = `${exact100Characters} ${workerEmail}`;
    const wordsIncludePhone = `${exact100Characters} ${phone}`;
    const wordsIncludeLink = `${exact100Characters} ${link}`;

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

      .log('Click Experience"');
    chooseSection('Experience');

    cy.log('Check "Experience" page')
      .verifyTextExist('Select all areas that you’ve worked or have professional or personal experience in.')
      .verifyElementContainsText('.mat-checkbox-label span', 'Aged care')
      .verifyElementContainsText('.mat-checkbox-label span', 'Chronic medical conditions')
      .verifyElementContainsText('.mat-checkbox-label span', 'Disability')
      .verifyElementContainsText('.mat-checkbox-label span', 'Mental health')
      .verifyTextExist('Provide more details and describe your experience and knowledge under each area.')
      .verifyElementContainsText('button span', 'Save and continue')

      .log('Select care experience "Aged care"')
      .clickElementOnText('.mat-checkbox-label span', 'Aged care')
      .verifyElementVisible('button[aria-label="Collapse Aged care"]')

      .log('Check screen objects')
      .verifyListTextExistNoWaitV2(['Professional', 'Personal'])
      .verifyListTextExistNoWaitV2(['Dementia', 'Parkinson\'s Disease'])
      .verifyTextExist('What are your key strengths, achievements and skills in aged care?')
      .verifyTextExist('Don\'t include personal details or prohibited content as under our terms of use. ')
      .verifyTextExist('Minimum 100 characters')
      .verifyTextExist('What other areas do you know about?')
      .verifyTextExist('This could be an area you\'ve studied or have informal experience.')
      .verifyElementContainsText('span', 'Dementia')
      .verifyElementContainsText('span', 'Parkinson\'s Disease')

      .log('Check Dementia on Select the areas you have the most experience in section')
      .clickElementOnText('fieldset[formgroupname="experience"] span', 'Dementia', 1000)
      .verifyElementContainsTextNotExist('fieldset[formgroupname="knowledge"] span', 'Dementia')

      .log('Click "Save and continue"')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )
      .verifyTextExist('There are errors on the following field:')
      .verifyElementExist('label.invalid')

      .log('Click Personal radio button on What type of experience do you have with aged care? section')
      .log('Click Professional and Personal radio buttons on What type of experience do you have with aged care? section')
      .clickElementOnText('fieldset[formgroupname="kind"] span', 'Professional', 1000, false)
      .clickElementOnText('fieldset[formgroupname="kind"] span', 'Personal', 1000, false)

      .log('Enter alphanumeric characters <100 on What are your key strengths, achievements and skills in aged care? text box.')
      .inputTextField('textarea[formcontrolname="description"]', below100Characters)
      .verifyTextExist('100 characters minimum.')

      .log('Enter alphanumeric characters >600 on What are your key strengths, achievements and skills in aged care? text box?')
      .inputTextField('textarea[formcontrolname="description"]', above600Characters)
      .verifyTextExist('600 characters maximum.')

      .log('Enter alphanumeric characters =>100 on What are your key strengths, achievements and skills in aged care? text box?')
      .inputTextField('textarea[formcontrolname="description"]', exact100Characters)
      .verifyTextNotExist('100 characters minimum.')
      .verifyTextNotExist('600 characters maximum.')

      .log('Enter profane words on What are your key strengths, achievements and skills in aged care?')
      .inputTextField('textarea[formcontrolname="description"]', profaneCharacters)
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )
      .verifyTextExist('Sensitive language found. Remove and try again.')

      .log('Enter phone number on What are your key strengths, achievements and skills in aged care?')
      .inputTextField('textarea[formcontrolname="description"]', wordsIncludePhone)
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )
      .verifyTextExist('Links, phone number or email found. Remove and try again.')

      .log('Enter email address on What are your key strengths, achievements and skills in aged care?')
      .inputTextField('textarea[formcontrolname="description"]', wordsIncludeEmail)
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )
      .verifyTextExist('Links, phone number or email found. Remove and try again.')

      .log('Enter link on What are your key strengths, achievements and skills in aged care?')
      .inputTextField('textarea[formcontrolname="description"]', wordsIncludeLink)
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )
      .verifyTextExist('Links, phone number or email found. Remove and try again.')

      .log('Enter a valid statement on What are your key strengths, achievements and skills in aged care?')
      .inputTextField('textarea[formcontrolname="description"]', exact100Characters)

      .log('Select care experience "Mental health"')
      .clickElementOnText('span', 'Mental health')

      .log('Click the expand button')
      .verifyTextNotVisible('What type of experience do you have with aged care?')
      .verifyTextVisible('What type of experience do you have with mental health?')

      .log('Check Bipolar disorder, Anxiety and Hoarding on Select the areas you have the most experience in. section')
      .clickElementOnText('span', 'Anxiety')
      .clickElementOnText('span', 'Bipolar Disorder')
      .clickElementOnText('span', 'Hoarding')
      .verifyTextExist('Select below other areas you know about.')

      .log('Uncheck Anxiety and check Hoarding')
      .clickElementOnText('span', 'Anxiety')
      .verifyTextNotExist('Select below other areas you know about.')

      .log('Fill up other required fields')
      .inputTextField('app-expansion-panel[heading="Mental health"] textarea[formcontrolname="description"]', exact100Characters)

      .log('Deselect "Aged care"')
      .clickElementOnText('span', ' Aged care', 1000, false)

      .log('Select "Aged care" again')
      .clickElementOnText('span', ' Aged care', 1000, false)

      .log('Click "Save and continue"')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      );

    cy.log('Check newly completed')
      .verifyTextExist('Work history');
    checkMarkIcons('Experience');

    cy.log('On the left navigation pane click the previously completed page');
    chooseSection('Experience');

    cy.log('Check the previous page')
      .verifyElementContainsText('mat-checkbox.mat-checkbox-checked', 'Aged care')
      .verifyElementContainsText('mat-checkbox.mat-checkbox-checked', 'Mental health')

      .log('On the right corner of the page click "Preview profile"')
      .get('app-profile-building button span')
      .contains('Preview profile')
      .click()
      .verifyTextExist('About')

      .verifyTextExist('Professional and personal experience')
      .verifyTextExist('professional experience')
      .verifyTextExist('Dementia')
      .verifyListTextExistNoWaitV2(['Bipolar Disorder', 'Hoarding'])

      .log('Click "Edit my profile" button')
      .get('a[href="/profile-building"] span')
      .contains(' Edit my profile')
      .click({ force: true })
      .verifyTextExist('My profile');

    chooseSection('Experience');
    cy.verifyElementContainsText('mat-checkbox.mat-checkbox-checked', 'Aged care')
      .verifyElementContainsText('mat-checkbox.mat-checkbox-checked', 'Mental health');
  });
});
