import faker from 'faker/locale/en_AU';
import * as data from '../../../fixtures/test-data.json';

describe('Post a Last Minute Job - part 1', () => {
  const clientEmail = 'automation_karyll.createlmj+client@donotuse.com.au';
  const clientPass = 'qaAutomation2021';

  const clientEmail2 = 'automation_verona.lmj+client@donotuse.com.au';
  const clientPass2 = 'qaAutomation2021';

  const clientNoPaymentEmail = 'automation_nozel.silva.lmj+client@donotuse.com.au';
  const clientNoPaymentPass = 'qaAutomation2021';

  const noPaymentAndHasJobEmail = 'automation_alden.paymentunverified+client@donotuse.com.au';
  const noPaymentAndHasJobPass = 'qaAutomation2021';

  beforeEach(() => {
    cy
      .clearCookies()
      .clearLocalStorage()
      .visit('/')
      .byPassAuthen();
  });

  it(`1. ES-T753. Create last minute job from post a job page, with no existing job
      2. ES-T757. Check newly created last minute job`, () => {
    const jobTitle = faker.name.jobTitle();

    cy.log('Login as client')
      .loginToDashboard(clientEmail, clientPass)

      .log('Navigate to the Post a job')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Click "Post a job"')
      .clickElementOnText('.action button', 'Post a job')

      .log('Check "Learn more about job types"')
      .verifyElementContainsText(
        data.postAJob.learnText,
        'Learn more about job types',
      )
      .clickElement(data.postAJob.learnBtn)
      .verifyElementVisible(data.postAJob.learnExpand)

      .log('Close the expanded information')
      .clickElement(data.postAJob.learnBtn)
      .verifyElementNotVisible(data.postAJob.learnExpand)

      .log('Click Last Minute Job')
      .clickElementOnText(data.postAJob.typeJob, 'Last Minute job')
      .verifyTextVisible('How Last Minute jobs work')

      .log('Click "Create a Last Minute job" button')
      .clickElementOnText(
        data.postAJob.lastMinuteJob.howItWorkButton,
        'Create a Last Minute job',
      )

      .log('Enter the job title')
      .inputTextField(data.postAJob.lastMinuteJob.titleInput, jobTitle)

      .log('Select suburb')
      .inputTextField(data.postAJob.lastMinuteJob.suburbInput, 2000)
      .wait(1000)
      .clickElement('.suggestions .resultsList div', true, 0)

      .log('Select "When do you require support"')
      .clickElement(data.postAJob.lastMinuteJob.whenSuportRadio, true, 1)

      .log('Select "Start time"')
      .log('Select hours')
      .selectDropdown(data.postAJob.lastMinuteJob.startTimeSelect, '10', 0)
      .log('Select minutes')
      .selectDropdown(data.postAJob.lastMinuteJob.startTimeSelect, '00', 1)

      .log('Input duration')
      .inputTextField(data.postAJob.lastMinuteJob.durationInput, 4)

      .log('Describe the job')
      .inputTextField(
        data.postAJob.lastMinuteJob.describeJob,
        'Create last minute job by automation',
      )

      .log('The consumer description')
      .inputTextField(
        data.postAJob.lastMinuteJob.consumerDescription,
        'Create the last minute job by automation',
      )

      .log('Select gender')
      .selectDropdown(data.postAJob.lastMinuteJob.genderSelect, 'Male')

      .log('Select service')
      .clickElement(data.postAJob.lastMinuteJob.serviceCheckbox, true, 1)

      .log('Click "Post to local workers" btn')
      .clickElementOnText(
        data.postAJob.lastMinuteJob.actionBtn,
        'Post to local workers',
      )
      .verifyTextVisible(jobTitle)
      .verifyTextVisible('Posted to nearby workers')

      .navigateByLeftMenuInDashboard('Jobs')
      .verifyStatusLastMinuteJob(jobTitle, 'Open');
  });

  it('ES-T754. Create last minute job from post a job page, with existing job', () => {
    const jobTitle = faker.name.jobTitle();

    cy.log('Login as client')
      .loginToDashboard(clientEmail2, clientPass2)

      .log('Navigate to the Post a job')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Click "Post a job"')
      .clickElementOnText('.action button', 'Post a job')

      .log('Check "Learn more about job types"')
      .verifyElementContainsText(
        data.postAJob.learnText,
        'Learn more about job types',
      )
      .clickElement(data.postAJob.learnBtn)
      .verifyElementVisible(data.postAJob.learnExpand)

      .log('Close the expanded information')
      .clickElement(data.postAJob.learnBtn)
      .verifyElementNotVisible(data.postAJob.learnExpand)

      .log('Click Last Minute Job')
      .clickElementOnText(data.postAJob.typeJob, 'Last Minute job')
      .verifyTextVisible('How Last Minute jobs work')

      .log('Click "Create a Last Minute job" button')
      .clickElementOnText(
        data.postAJob.lastMinuteJob.howItWorkButton,
        'Create a Last Minute job',
      )

      .log('Enter the job title')
      .inputTextField(data.postAJob.lastMinuteJob.titleInput, jobTitle)

      .log('Select suburb')
      .inputTextField(data.postAJob.lastMinuteJob.suburbInput, 2000)
      .wait(1000)
      .clickElement('.suggestions .resultsList div', true, 0)

      .log('Select "When do you require support"')
      .clickElement(data.postAJob.lastMinuteJob.whenSuportRadio, true, 1)

      .log('Select "Start time"')
      .log('Select hours')
      .selectDropdown(data.postAJob.lastMinuteJob.startTimeSelect, '10', 0)
      .log('Select minutes')
      .selectDropdown(data.postAJob.lastMinuteJob.startTimeSelect, '00', 1)

      .log('Input duration')
      .inputTextField(data.postAJob.lastMinuteJob.durationInput, 4)

      .log('Describe the job')
      .inputTextField(
        data.postAJob.lastMinuteJob.describeJob,
        'Create last minute job by automation',
      )

      .log('The consumer description')
      .inputTextField(
        data.postAJob.lastMinuteJob.consumerDescription,
        'Create the last minute job by automation',
      )

      .log('Select gender')
      .selectDropdown(data.postAJob.lastMinuteJob.genderSelect, 'Male')

      .log('Select service')
      .clickElement(data.postAJob.lastMinuteJob.serviceCheckbox, true, 1)

      .log('Click "Post to local workers" btn')
      .clickElementOnText(
        data.postAJob.lastMinuteJob.actionBtn,
        'Post to local workers',
      )
      .verifyTextVisible(jobTitle)
      .verifyTextVisible('Posted to nearby workers')

      .navigateByLeftMenuInDashboard('Jobs')
      .verifyStatusLastMinuteJob(jobTitle, 'Open');
  });

  it('ES-T755. Create last minute job from post a job page, no existing job, no payment verification', () => {
    cy.log('Login as client')
      .loginToDashboard(clientNoPaymentEmail, clientNoPaymentPass)

      .log('Navigate to the Post a job')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Check "Learn more about job types"')
      .verifyElementContainsText(
        data.postAJob.learnText,
        'Learn more about job types',
      )
      .clickElement(data.postAJob.learnBtn)
      .verifyElementVisible(data.postAJob.learnExpand)

      .log('Close the expanded information')
      .clickElement(data.postAJob.learnBtn)
      .verifyElementNotVisible(data.postAJob.learnExpand)

      .log('Click Last Minute Job')
      .clickElementOnText(data.postAJob.typeJob, 'Last Minute job')

      .log('Click "Create a Last Minute job" button')
      .clickOnText('Create a Last Minute job')

      .log('The error message is shown')
      .verifyTextVisible('Incomplete profile')
      .verifyTextVisible(
        'Please complete your profile before posting a Last Minute job.',
      );
  });

  it('ES-T756. Create last minute job from Post a job page, with existing job, no payment verification', () => {
    cy.log('Login as client')
      .loginToDashboard(noPaymentAndHasJobEmail, noPaymentAndHasJobPass)

      .log('Navigate to the Post a job')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Click "Post a job"')
      .clickElementOnText('.action button', 'Post a job')
      .verifyTextVisible('Select a job that reflects the kind of support you want.')

      .log('Check "Learn more about job types"')
      .verifyElementContainsText(
        data.postAJob.learnText,
        'Learn more about job types',
      )
      .clickElement(data.postAJob.learnBtn)
      .verifyElementVisible(data.postAJob.learnExpand)

      .log('Close the expanded information')
      .clickElement(data.postAJob.learnBtn)
      .verifyElementNotVisible(data.postAJob.learnExpand)

      .log('Click Last Minute Job')
      .clickElementOnText(data.postAJob.typeJob, 'Last Minute job')
      .verifyTextVisible('How Last Minute jobs work')

      .log('Click "Create a Last Minute job" button')
      .clickElementOnText(
        data.postAJob.lastMinuteJob.howItWorkButton,
        'Create a Last Minute job',
      )

      .log('The error message is shown')
      .verifyTextVisible('Incomplete profile')
      .verifyTextVisible(
        'Please complete your profile before posting a Last Minute job.',
      );
  });
});
