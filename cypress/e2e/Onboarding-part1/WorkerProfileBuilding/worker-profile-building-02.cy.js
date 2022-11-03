import faker from 'faker/locale/en_AU';
import * as data from '../../../fixtures/test-data.json';
import { checkMarkIcons } from '../../../support/page-actions/profile-building-action';

describe('Worker profile building', () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.firstName();
  const workerEmail = `automation_${firstName.toLowerCase()}+${Date.now()}.profile+building@donotuse.com.au`;
  const workerPass = 'qaAutomation2021';

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

  it('ES-T3712. Complete "Immunisation", optional', () => {
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

      .log('Click submit btn')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )

      .log('Select Immunisation')
      .clickElementOnText(
        data.profileBuildingLocators.item,
        data.profileBuildingContent.immunisation.title,
      )
      .verifyTextVisible(data.profileBuildingContent.immunisation.title)

      .log('Verify no options are selected')
      .verifyStatusOfCheckbox(
        data.profileBuildingLocators.immunisation.covidVaccine,
        false,
        0,
      )
      .verifyStatusOfCheckbox(
        data.profileBuildingLocators.immunisation.covidVaccine,
        false,
        1,
      )
      .verifyStatusOfCheckbox(
        data.profileBuildingLocators.immunisation.covidVaccine,
        false,
        2,
      )
      .verifyStatusOfCheckbox(
        data.profileBuildingLocators.immunisation.fluShot,
        false,
        0,
      )
      .verifyStatusOfCheckbox(
        data.profileBuildingLocators.immunisation.fluShot,
        false,
        1,
      );
  });

  it('ES-T3713. Complete "Immunisation"', () => {
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

      .log('Check screen objects for COVID-19 vaccine status')
      .verifyTextExist('COVID-19 vaccine status')
      .verifyTextExist('To provide services via Mable, you acknowledge that you’ve met and will continue to meet any vaccination requirements in your state and territory and for your services.')
      .verifyTextExist('Learn more about')
      .verifyTextExist('COVID-19 vaccine requirements by state and territory')
      .verifyTextExist('Are you up to date with your COVID-19 vaccine requirements?')
      .verifyTextExist('You must answer truthfully.')
      .verifyTextExist(' Yes, I\'m up to date')
      .verifyTextExist(' I have a medical exemption')
      .verifyTextExist(' I only provide remote support or non-contact services')

      .log('Click COVID-19 vaccine requirements by state and territory link')
      .verifyElementExist('[href="https://mable.com.au/covid-19/vaccination/"]')

      .log('Check screen objects for Flu vaccine')
      .verifyTextExist('Flu vaccine')
      .verifyTextExist('A flu vaccine is a mandatory requirement for anyone who works in or enters a residential aged care facility. For those who work in a home care setting, the flu vaccination is highly recommended.')
      .verifyTextExist('Clients or providers can ask if you’ve been vaccinated for flu this year. Make sure you have prepared evidence to show them you have.')
      .verifyTextExist('It’s optional to answer. You can update your response at any time.')
      .verifyTextExist('If you answer yes, a flu vaccine badge will appear on your profile this season that can be viewed by clients. Clients can filter for workers with a flu vaccine badge.')
      .verifyTextExist('If you answer no, your profile will remain the same without a badge.')
      .verifyTextExist('Have you had a flu vaccine this season?')
      .verifyTextExist('It’s important to answer truthfully.')
      .verifyTextExist('Yes')
      .verifyTextExist('No')
      .verifyTextExist('Save and continue')

      .log('On Are you up to date with your COVID-19 vaccine requirements? section, update the initial value, select "I only provide remote support or non-contact services"')
      .verifyTextExist('Are you up to date with your COVID-19 vaccine requirements?')
      .selectOptionByValueV2(
        data.profileBuildingLocators.immunisation.covidVaccine,
        'Select',
      )
      .selectOptionByValueV2(
        data.profileBuildingLocators.immunisation.covidVaccine,
        'no_remote_support',
      )
      .verifyTextExist('Remote support is support by phone, computer or video call. Non-contact services are services delivered without physical contact.')

      .log('On "Are you up to date with your COVID-19 vaccine requirements?" section, answer "I have a medical exemption"')
      .selectOptionByValueV2(
        data.profileBuildingLocators.immunisation.covidVaccine,
        'Select',
      )
      .selectOptionByValueV2(
        data.profileBuildingLocators.immunisation.covidVaccine,
        'no_medical_exemption',
      )
      .verifyTextExist(' I have a valid ')
      .verifyTextExist(' signed by an eligible doctor. ')
      .verifyElementExist('[href="https://www.servicesaustralia.gov.au/im011"]')

      .log('Click "Save and continue"')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.rates.submitBtn,
      )
      .verifyTextExist('Check box to continue.')

      .log('Put a tick on I have a valid Australian Immunisation Register (AIR) - immunisation medical exemption form (IM011) form signed by an eligible doctor. <checkbox>')
      .clickElementOnText('span', ' I have a valid ')
      .verifyTextNotExist('Check box to continue.')

      .log('On Flu vaccine, update the initial value to "No"')
      .selectOptionByValue(
        data.profileBuildingLocators.immunisation.fluShot,
        'No',
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
        1,
      )

      .get(data.profileBuildingLocators.immunisation.covidVaccine)
      .should('have.value', 'no_medical_exemption');
  });

  it('ES-T1061. Complete "Languages", optional', () => {
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

      .log('Verify no options are selected')
      .verifyElementNotExist('app-languages .mat-checkbox-checked')

      .log('Click Preview profile')
      .clickElementOnText(
        'app-profile-building button span',
        'Preview profile',
      )

      .log('Check info')
      .verifyTextNotExist('Languages')

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

  it('ES-T1062. Complete "Languages"', () => {
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

      .log('Select more languages')
      .clickElementOnText(
        data.profileBuildingLocators.languages.firstLanguages,
        'Korean',
      )
      .clickElementOnText(
        data.profileBuildingLocators.languages.firstLanguages,
        'Vietnamese',
      )

      .log('Select more other languages')
      .clickElementOnText(
        data.profileBuildingLocators.languages.otherLanguages,
        'English',
      )
      .clickElementOnText(
        data.profileBuildingLocators.languages.otherLanguages,
        'Japanese',
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
      .verifyTextVisible('Korean')
      .verifyTextVisible('Second language')
      .verifyTextVisible('English')
      .verifyTextVisible('Japanese')

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

  it('ES-T1063. Complete "Cultural background", optional', () => {
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

      .log('Verify no options are selected')
      .verifyElementNotExist('app-cultural-background .mat-checkbox-checked');
  });

  it('ES-T1064. Complete "Cultural background"', () => {
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

      .verifyElementContainsText(
        'app-cultural-background .mat-checkbox-checked',
        'Asian',
      )

      .log('Click Preview profile')
      .clickElementOnText(
        'app-profile-building button span',
        'Preview profile',
      )

      .log('Check the info')
      .verifyTextVisible('Cultural backgrounds')
      .verifyTextVisible('Australian')
      .verifyTextVisible('Asian');
  });

  it('ES-T1065. Complete "Religion", optional', () => {
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

      .log('Click submit btn')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.religion.submitBtn,
      )

      .log('Select Religion')
      .clickElementOnText(
        data.profileBuildingLocators.item,
        data.profileBuildingContent.religion.title,
      )
      .verifyTextVisible(data.profileBuildingContent.religion.title)

      .log('Verify no options are selected')
      .verifyElementNotExist('app-religion .mat-checkbox-checked')

      .log('Click Preview profile')
      .clickElementOnText(
        'app-profile-building button span',
        'Preview profile',
      )

      .log('Check info')
      .verifyTextNotExist('Religion')

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

  it('ES-T1066. Complete "Religion"', () => {
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
      )

      .log('Click Preview profile')
      .clickElementOnText(
        'app-profile-building button span',
        'Preview profile',
      )

      .log('Check the info')
      .verifyTextVisible('Religion')
      .verifyTextVisible('Sikh')
      .verifyTextVisible('Other');
  });

  it('ES-T1067. Complete "Interests & hobbies ", optional', () => {
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

      .log('Click submit btn')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.interest.submitBtn,
      )

      .log('Select Interests')
      .clickElementOnText(
        data.profileBuildingLocators.item,
        data.profileBuildingContent.interest.title,
      )
      .verifyTextVisible(data.profileBuildingContent.interest.title)

      .log('Verify no options are selected')
      .verifyElementNotExist('app-interests-hobbies .mat-checkbox-checked')

      .log('Click Preview profile')
      .clickElementOnText(
        'app-profile-building button span',
        'Preview profile',
      )

      .log('Check info')
      .verifyTextNotExist('Interests & hobbies')

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

  it('ES-T1068. Complete "Interests & hobbies', () => {
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

  it('ES-T1069. Complete "About me", optional', () => {
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

      .log('Click submit btn')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.aboutMe.submitBtn,
      )

      .log('Select About me')
      .clickElementOnText(
        data.profileBuildingLocators.item,
        data.profileBuildingContent.aboutMe.title,
      )
      .verifyTextVisible(data.profileBuildingContent.aboutMe.title)

      .log('Verify no options are selected')
      .verifyStatusOfCheckbox(
        data.profileBuildingLocators.aboutMe.personality,
        false,
        0,
      )
      .verifyStatusOfCheckbox(
        data.profileBuildingLocators.aboutMe.personality,
        false,
        1,
      )

      .verifyStatusOfCheckbox(
        data.profileBuildingLocators.aboutMe.nonSmoker,
        false,
        0,
      )
      .verifyStatusOfCheckbox(
        data.profileBuildingLocators.aboutMe.nonSmoker,
        false,
        1,
      )

      .verifyStatusOfCheckbox(
        data.profileBuildingLocators.aboutMe.friendly,
        false,
        0,
      )
      .verifyStatusOfCheckbox(
        data.profileBuildingLocators.aboutMe.friendly,
        false,
        1,
      );
  });

  it('ES-TT1070. Complete "About me", answer "Yes"', () => {
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

      .log('On Personality, select "Outgoing and engaging"')
      .selectOptionByValue(
        data.profileBuildingLocators.aboutMe.personality,
        'Outgoing and engaging',
      )

      .log('On are you non smoker, select "Yes"')
      .selectOptionByValue(
        data.profileBuildingLocators.aboutMe.nonSmoker,
        'Yes',
      )

      .log('On are you pet friendly, select "Yes"')
      .selectOptionByValue(
        data.profileBuildingLocators.aboutMe.friendly,
        'Yes',
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

  it('ES-T1072. Complete "My preferences ", optional', () => {
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

      .log('Click submit btn')
      .clickElementOnText(
        'button span',
        data.profileBuildingContent.myPreferences.submitBtn,
      )

      .log('Check info')
      .verifyTextNotExist(data.profileBuildingContent.myPreferences.title)

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

      .log('Verify no options are selected')
      .verifyElementNotExist('app-my-preferences .mat-checkbox-checked');
  });

  it('ES-T1073. Complete "My preferences"', () => {
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

      .log('Select "Female Only" option on "Who do you prefer to work with?"')
      .clickElementOnText(
        data.profileBuildingLocators.myPreference.option,
        'Female only',
      )

      .log('Select "Male Only" option on "Who do you prefer to work with?"')
      .clickElementOnText(
        data.profileBuildingLocators.myPreference.option,
        'Male only',
      )
      .verifyElementNotContainsText(
        data.profileBuildingLocators.myPreference.checked,
        'Female only',
      )

      .log('Tick "Non-smoker"')
      .clickElementOnText(
        data.profileBuildingLocators.myPreference.option,
        'Non-smoker',
      )
      .verifyElementContainsText(
        data.profileBuildingLocators.myPreference.checked,
        'Non-smoker',
      )

      .log('Tick "No Pets"')
      .clickElementOnText(
        data.profileBuildingLocators.myPreference.option,
        'No pets',
      )
      .verifyElementContainsText(
        data.profileBuildingLocators.myPreference.checked,
        'No pets',
      )

      .log('Tick "No Preferences"')
      .clickElementOnText(
        data.profileBuildingLocators.myPreference.option,
        'No preferences',
      )
      .verifyElementNotContainsText(
        data.profileBuildingLocators.myPreference.checked,
        'Male only',
      )
      .verifyElementNotContainsText(
        data.profileBuildingLocators.myPreference.checked,
        'Female only',
      )
      .verifyElementNotContainsText(
        data.profileBuildingLocators.myPreference.checked,
        'Non-smoker',
      )
      .verifyElementNotContainsText(
        data.profileBuildingLocators.myPreference.checked,
        'No pets',
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

      .log('Check "My preferences" page')
      .verifyTextVisible(data.profileBuildingContent.myPreferences.title)
      .verifyTextVisible(data.profileBuildingContent.myPreferences.description)

      .verifyElementContainsText(
        data.profileBuildingLocators.myPreference.checked,
        'No preferences',
      );

    checkMarkIcons('My preferences', true);
  });
});
