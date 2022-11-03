import * as data from '../../../fixtures/test-data.json';
import faker from 'faker/locale/en_AU';

describe('The date and time is outdated please check ES-T5447 Edit a regular job', () => {
  const clientEmail = 'automation_richard.gutierrez.regularjob+client@donotuse.com.au';
  const clientPass = 'qaAutomation2021';

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it(`1. ES-T137. Update an open job
      2. ES-T531. Check newly updated open job`, () => {
    const titleJob = faker.name.jobTitle();
    cy
      .log('Login as client')
      .loginToDashboard(clientEmail, clientPass)

      .log('Click "Post a job" on the left navigation')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Click Edit btn on Regular job having status as Open')
      .selectEditOnNoRepliesYetJob()

      .log('Update the title job')
      .inputTextField(data.regularJob.client.titleJobInput, titleJob)

      .log('Verify the address is not clickable')
      .verifyElementNotExist(data.regularJob.client.postCodeInput)

      .log('Select Frequency')
      .selectRadioOnPostAJob('Ongoing, after trial period')

      .log('Click Scheduling')
      .selectRadioOnPostAJob("I'm flexible")

      .log('Select Estimated hours per week')
      .selectRadioOnPostAJob('1 to 5 hours')

      .log('Update the Describe textarea')
      .inputTextField(
        data.regularJob.client.carerDescribeTextarea,
        `Update regular job with title ${titleJob}`,
      )

      .log('Update the "I am looking for someone who"')
      .inputTextField(
        data.regularJob.client.jobDescribeTextarea,
        `Update regular job with title ${titleJob}`,
      )

      .log('Gender is not clickable')
      .verifyElementNotExist('data.regularJob.client.genderSelect')

      .log('Serive is not clickable')
      .verifyElementNotExist('#jobs-result input[value="basic_companionship"]')

      .log('Click Edit job')
      .clickElementOnText('button', 'Update')
      .wait(2000)

      // Check newly updated open job
      .log('Check job status as Open')
      .verifyTextVisible('Job details')
      .verifyTextVisible(titleJob)
      .verifyElementContainsText('.open span', 'Open')

      .log('Check the job detail')
      .verifyTextExist(`Update regular job with title ${titleJob}`)

      .log('Check the job title')
      .verifyTextVisible(titleJob)

      .log('Click "Post a job" on the left navigation')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Verify the updated job exists with status as Open')
      .verifyJobHasStatus(titleJob, 'Open');
  });
});
