/* eslint-disable no-restricted-syntax */
/* eslint-disable no-restricted-globals */
import faker from 'faker/locale/en_AU';
import * as data from '../../fixtures/test-data.json';

Cypress.Commands.add(
  'createRegularJobWithParticularDays',
  (titleJob, postCode = false) => {
    cy.log('Verify "Post a new job" is shown').verifyTextVisible('Post a job');

    if (!!postCode) {
      cy.log('Enter post code')
        .inputTextField(data.regularJob.client.postCodeInput, postCode)
        .wait(1000)
        .clickElement('.suggestions .listOption', true, 0);
    }

    cy.log('Enter the title job')
      .inputTextField(data.regularJob.client.titleJobInput, titleJob)

      .log('Select Frequency')
      .selectRadioOnPostAJob('Ongoing, after a trial period')

      .log('Click Scheduling')
      .selectRadioOnPostAJob('I have preferred days and times')

      .log('Select Monday morning')
      .get('.mat-checkbox-layout span')
      .contains('Morning')
      .eq(0)
      .click()

      .log('Select Estimated hours per week')
      .selectRadioOnPostAJob('1 to 5 hours')

      .log('Enter the detail on the Describe textarea')
      .inputTextField(
        data.regularJob.client.consumerDescribeTextarea,
        `Create a new regular job with title ${titleJob}`,
      )

      .log('Enter the "I am looking for someone who"')
      .inputTextField(
        data.regularJob.client.carerDescribeTextarea,
        `Create a new regular job with title ${titleJob}`,
      )

      .log('Enter "Describe the support activities in detail"')
      .inputTextField(
        data.regularJob.client.jobDescribeTextarea,
        `Create a new regular job with title ${titleJob}`,
      )

      .log('Select Service')
      .selectCheckboxOnPostAJob('Companionship and social support')
      .selectCheckboxOnPostAJob(
        'Community participation, sports and activities',
      )
      .selectCheckboxOnPostAJob('Provide transport ')

      .log('Select Gender as Male')
      .selectDropdown(data.regularJob.client.genderSelect, 'Male')

      .clickElementOnText(
        data.regularJob.client.postJobSubmit,
        'Post to local workers',
      );
  },
);

Cypress.Commands.add(
  'createRegularJobWithParticularDaysV2',
  (titleJob, postCode = false) => {
    cy.log('Verify "Post a new job" is shown').verifyTextVisible('Post a job');

    if (!!postCode) {
      cy.log('Enter post code')
        .inputTextField(data.regularJob.client.postCodeInput, postCode)
        .wait(1000)
        .clickElement('.suggestions .listOption', true, 0);
    }

    cy.log('Enter the title job')
      .inputTextField(data.regularJob.client.titleJobInput, titleJob)

      .log('Select Frequency')
      .selectRadioOnPostAJob('Ongoing, after a trial period')

      .log('Select Monday')
      .get('mat-slide-toggle#mat-slide-toggle-1')
      .click()
      .wait(1000)
      .get('select[formcontrolname="startTime"]')
      .select('08:00')
      .wait(1000)
      .get('select[formcontrolname="endTime"]')
      .select('17:00')

      .log('Enter the detail on the Describe textarea')
      .inputTextField(
        data.regularJob.client.consumerDescribeTextarea,
        `Create a new regular job with title ${titleJob}`,
      )

      .log('Enter the "I am looking for someone who"')
      .inputTextField(
        data.regularJob.client.carerDescribeTextarea,
        `Create a new regular job with title ${titleJob}`,
      )

      .log('Enter "Describe the support activities in detail"')
      .inputTextField(
        data.regularJob.client.jobDescribeTextarea,
        `Create a new regular job with title ${titleJob}`,
      )

      .log('Select Service')
      .selectCheckboxOnPostAJob('Companionship and social support')
      .selectCheckboxOnPostAJob(
        'Community participation, sports and activities',
      )
      .selectCheckboxOnPostAJob('Provide transport ')

      .log('Select Gender as Male')
      .selectDropdown(data.regularJob.client.genderSelect, 'Male')

      .log('Add support session')
      .inputTextField(' label[id="supportSessionLabel"] input', 3, true)

      .log('Add estimated hours')
      .inputTextField(' label[id="estimatedHoursLabel"] input', 10, true)

      .log('Select As soon as possible')
      .selectRadioOnPostAJob('As soon as possible')

      .clickElementOnText(
        data.regularJob.client.postJobSubmit,
        'Post to local workers',
      );
  },
);

Cypress.Commands.add(
  'createRegularJobWithFlexibleDays',
  (titleJob, postCode = false) => {
    cy.log('Verify "Post a new job" is shown').verifyTextVisible('Post a job');

    if (!!postCode) {
      cy.log('Enter post code')
        .inputTextField(data.regularJob.client.postCodeInput, postCode)
        .wait(1000)
        .clickElement('.suggestions .listOption', true, 0);
    }

    cy.log('Enter the title job')
      .inputTextField(data.regularJob.client.titleJobInput, titleJob)

      .log('Select Frequency')
      .selectRadioOnPostAJob('Ongoing, after a trial period')

      .log('Select I\'m flexible')
      .get('[formcontrolname="scheduling"] label')
      .clickElementOnText('button', 'Yes, reset my times')

      .log('Enter the detail on the Describe textarea')
      .inputTextField(
        data.regularJob.client.consumerDescribeTextarea,
        `Create a new regular job with title ${titleJob}`,
      )

      .log('Enter the "I am looking for someone who"')
      .inputTextField(
        data.regularJob.client.carerDescribeTextarea,
        `Create a new regular job with title ${titleJob}`,
      )

      .log('Enter "Describe the support activities in detail"')
      .inputTextField(
        data.regularJob.client.jobDescribeTextarea,
        `Create a new regular job with title ${titleJob}`,
      )

      .log('Select Service')
      .selectCheckboxOnPostAJob('Companionship and social support')
      .selectCheckboxOnPostAJob(
        'Community participation, sports and activities',
      )
      .selectCheckboxOnPostAJob('Provide transport ')

      .log('Select Gender as Male')
      .selectDropdown(data.regularJob.client.genderSelect, 'Male')

      .log('Add support session')
      .inputTextField(' label[id="supportSessionLabel"] input', 3, true)

      .log('Add estimated hours')
      .inputTextField(' label[id="estimatedHoursLabel"] input', 10, true)

      .log('Select As soon as possible')
      .selectRadioOnPostAJob('As soon as possible')

      .clickElementOnText(
        data.regularJob.client.postJobSubmit,
        'Post to local workers',
      );
  },
);

Cypress.Commands.add(
  'createRegularJobWithFlexibleDaysV2',
  (titleJob, postCode = false) => {
    cy.log('Verify "Post a new job" is shown').verifyTextVisible('Post a job');

    if (!!postCode) {
      cy.log('Enter post code')
        .inputTextField(data.regularJob.client.postCodeInput, postCode)
        .wait(1000)
        .clickElement('.suggestions .listOption', true, 0);
    }

    cy.log('Enter the title job')
      .inputTextField(data.regularJob.client.titleJobInput, titleJob)

      .log('Select Frequency')
      .selectRadioOnPostAJob('Ongoing, after a trial period')

      .log('Select I\'m flexible')
      .get('[formcontrolname="scheduling"] label')
      .click()
      .wait(1000)

      .log('Enter the detail on the Describe textarea')
      .inputTextField(
        data.regularJob.client.consumerDescribeTextarea,
        `Create a new regular job with title ${titleJob}`,
      )

      .log('Enter the "I am looking for someone who"')
      .inputTextField(
        data.regularJob.client.carerDescribeTextarea,
        `Create a new regular job with title ${titleJob}`,
      )

      .log('Enter "Describe the support activities in detail"')
      .inputTextField(
        data.regularJob.client.jobDescribeTextarea,
        `Create a new regular job with title ${titleJob}`,
      )

      .log('Select Service')
      .selectCheckboxOnPostAJob('Companionship and social support')
      .selectCheckboxOnPostAJob(
        'Community participation, sports and activities',
      )
      .selectCheckboxOnPostAJob('Provide transport ')

      .log('Select Gender as Male')
      .selectDropdown(data.regularJob.client.genderSelect, 'Male')

      .log('Add support session')
      .inputTextField(' label[id="supportSessionLabel"] input', 3, true)

      .log('Add estimated hours')
      .inputTextField(' label[id="estimatedHoursLabel"] input', 10, true)

      .log('Select As soon as possible')
      .selectRadioOnPostAJob('As soon as possible')

      .clickElementOnText(
        data.regularJob.client.postJobSubmit,
        'Post to local workers',
      );
  },
);

Cypress.Commands.add('selectJobWithStatus', (status) => {
  cy.get(data.regularJob.client.jobWithStatus)
    .contains(status)
    .parents('.details')
    .find('ul.action li span')
    .contains('View details')
    .click({ force: true });
});

Cypress.Commands.add('clickJobHasStatus', (title, status) => {
  cy.get(data.regularJob.client.titleJob)
    .contains(title)
    .parents('.details')
    .find('.chip span')
    .contains(status)
    .should('exist')
    .parents('.details')
    .find('ul.action li span')
    .contains('View details')
    .click({ force: true });
});

Cypress.Commands.add('clickArchiveJobHasStatus', (title, status) => {
  cy.get('app-archive-jobs .jobName')
    .contains(title)
    .parents('.details')
    .find('.chip span')
    .contains(status)
    .should('exist')
    .parents('.details')
    .find('ul.action li span')
    .contains('View details')
    .click({ force: true });
});

Cypress.Commands.add('verifyJobHasStatus', (title, status) => {
  cy.get(data.regularJob.client.titleJob)
    .contains(title)
    .parents('.details')
    .find('.chip span')
    .contains(status)
    .should('exist');
});

Cypress.Commands.add('verifyJobHasStatusOnWorker', (title, status) => {
  cy.log(`Verify Job Has Status as ${status} on worker`)
    .get(data.regularJob.worker.titleJob)
    .contains(title)
    .parents('.posted-job-list__list-item')
    .find('div > span')
    .contains(status)
    .should('be.visible');
});

Cypress.Commands.add('selectCheckboxOnPostAJob', (label) => {
  cy.log('Select checkbox:', label)
    .get('.mat-checkbox-label h3')
    .contains(label)
    .parents('mat-checkbox')
    .find('input[type="checkbox"]')
    .click({ force: true });
});

Cypress.Commands.add('selectRadioOnPostAJob', (label) => {
  cy.log('Select Radio:', label)
    .get('.radioLabel')
    .contains(label)
    .parents('label.radioBtn')
    .find('input[type="radio"]')
    .click({ force: true });
});

Cypress.Commands.add('selectEditOnJobHaveStatus', (status) => {
  cy.get(data.regularJob.client.jobWithStatus)
    .contains(status)
    .parents('.details')
    .find('.action li span')
    .contains('Edit')
    .click();
});

Cypress.Commands.add('selectEditOnNoRepliesYetJob', () => {
  cy.get('app-client-regular-job li a span')
    .contains('No replies yet')
    .parents('.action')
    .find('li span')
    .contains('Edit')
    .click();
});

Cypress.Commands.add('markAsFilledAJobDetailThenSelectOption', (option = 0) => {
  cy
    .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

    .url()
    .should('include', 'jobs/posted-jobs')
    .verifyElementContainsText('button', ' Post a job ')

    .log('Select Reqular job with status as Open')
    .selectJobWithStatus('Open')

    .log('Get the title job')
    .getText('h2.header')
    .then((title) => {
      cy.log('Click "Mark job as filled"')
        .clickElementOnText('button span', 'Mark job as filled')
        .clickElement('input[type="radio"][name="reason"]', true, option)
        .clickElementOnText('button', 'Mark filled')

        .log('Click "Post a job" on the left navigation')
        .navigateByLeftMenuInDashboard('Jobs')

        .log('Verify that job have status as Filled')
        .clickJobHasStatus(title.trim(), 'Filled');
    });
});

Cypress.Commands.add('markAsFilledAJobDetailThenNoOption', (isClickFill = true) => {
  cy
    .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

    .url()
    .should('include', 'jobs/posted-jobs')
    .verifyElementContainsText('button', ' Post a job ')

    .log('Select Reqular job with status as Open')
    .selectJobWithStatus('Open')

    .log('Get the title job')
    .getText('h2.header')
    .then(() => {
      cy.log('Click "Mark job as filled"')
        .clickElementOnText('button span', 'Mark job as filled')
        .verifyTextVisible('How did you fill it');
      isClickFill ? cy.clickElementOnText('button', 'Mark filled') : cy.clickElementOnText('button', 'Close');
      isClickFill ? cy.verifyTextVisible('Please select an answer') : null;
    });
});

Cypress.Commands.add('markAsFilledFirstJobThenSelectOption', (option = 0) => {
  cy
    .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

    .url()
    .should('include', 'jobs/posted-jobs')
    .verifyElementContainsText('button', ' Post a job ')

    .log('Get the title job')
    .getTextByIndex('a.jobName', 0)
    .then((title) => {
      cy.log('Click "Mark job as filled"')
        .clickElementOnText('a span', 'Mark job as filled')
        .clickElement('input[type="radio"][name="reason"]', true, option)
        .clickElementOnText('button', 'Mark filled')

        .verifyTextVisible('Job fulfilled successfully')

        .verifyTextNotExist('How did you fill it')

        .log('Verify that job have status as Filled')
        .wait(2000)
        .clickJobHasStatus(title.trim(), 'Filled');
    });
});

Cypress.Commands.add('markAsFilledFirstJobThenNoOption', (isClickFill = true) => {
  cy
    .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

    .url()
    .should('include', 'jobs/posted-jobs')
    .verifyElementContainsText('button', ' Post a job ')

    .log('Get the title job')
    .getTextByIndex('a.jobName', 0)
    .then(() => {
      cy.log('Click "Mark job as filled"')
        .clickElementOnText('a span', 'Mark job as filled')
        .verifyTextVisible('How did you fill it');
      isClickFill ? cy.clickElementOnText('button', 'Mark filled') : cy.clickElementOnText('button', 'Close');
      isClickFill ? cy.verifyTextVisible('Please select an answer') : null;
    });
});

Cypress.Commands.add('verifyHowDidYouFillPrompt', () => {
  const radioLabel = 'span.radioLabel';
  const button = 'app-report-job-mark-as-filled-modal button';
  cy
    .verifyElementVisible('app-report-job-mark-as-filled-modal')
    .verifyElementContainsText('h3#jobFilledReasonRadioLabel', 'How did you fill it?')
    .verifyElementContainsText(radioLabel, 'I found a worker on Mable')
    .verifyElementContainsText(radioLabel, 'I found a worker somewhere else')
    .verifyElementContainsText(radioLabel, 'It hasn\'t been filled yet, but I already have enough applicants')
    .verifyElementContainsText(radioLabel, 'I made a mistake')
    .verifyElementContainsText(button, 'Close')
    .verifyElementContainsText(button, 'Mark filled');
});

Cypress.Commands.add('verifyHowDidYouFillPromptInJobPage', () => {
  cy
    .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

    .url()
    .should('include', 'jobs/posted-jobs')
    .verifyElementContainsText('button', ' Post a job ')

    .log('Get the title job')
    .getTextByIndex('a.jobName', 0)
    .then(() => {
      cy.log('Click "Mark job as filled"')
        .clickElementOnText('a span', 'Mark job as filled')
        .verifyHowDidYouFillPrompt();
    });
});

Cypress.Commands.add('verifyHowDidYouFillPromptInJobDetails', () => {
  cy
    .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

    .url()
    .should('include', 'jobs/posted-jobs')
    .verifyElementContainsText('button', ' Post a job ')

    .log('Select Reqular job with status as Open')
    .selectJobWithStatus('Open')

    .log('Get the title job')
    .getText('h2.header')
    .then(() => {
      cy.log('Click "Mark job as filled"')
        .clickElementOnText('button span', 'Mark job as filled')
        .verifyHowDidYouFillPrompt();
    });
});

Cypress.Commands.add('cancelFirstJobThenSelectOption', (option = 0) => {
  cy
    .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

    .url()
    .should('include', 'jobs/posted-jobs')
    .verifyElementContainsText('button', ' Post a job ')

    .log('Get the title job')
    .getTextByIndex('a.jobName', 0)
    .then((title) => {
      cy.log('Click "Cancel job"')
        .clickElementOnText('a span', 'Cancel job')
        .clickElement('input[type="radio"][name="reason"]', true, option)
        .clickElementOnText('button', 'Cancel Job')

        .verifyTextVisible('Job cancelled successfully')

        .verifyTextNotExist('Why are you cancelling it?')

        .log('Verify that job have status as Cancelled')

        .clickElementOnText('.mat-tab-label-content', 'Archive')
        .clickArchiveJobHasStatus(title.trim(), 'Cancelled');
    });
});

Cypress.Commands.add('cancelFirstJobThenNoOption', (isClickCancel = true) => {
  cy
    .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

    .url()
    .should('include', 'jobs/posted-jobs')
    .verifyElementContainsText('button', ' Post a job ')

    .log('Get the title job')
    .getTextByIndex('a.jobName', 0)
    .then(() => {
      cy.log('Click "Cancel job"')
        .clickElementOnText('a span', 'Cancel job')

        .verifyTextVisible('Why are you cancelling it?');
      isClickCancel ? cy.clickElementOnText('button', 'Cancel Job') : cy.clickElementOnText('button', 'Close');
      isClickCancel ? cy.verifyTextVisible('Please select an answer') : null;
    });
});

Cypress.Commands.add('cancelFirstPrivateJobThenNoOption', (isClickCancel = false, jobIndex = 0) => {
  cy
    .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

    .url()
    .should('include', 'jobs/posted-jobs')
    .verifyElementContainsText('button', ' Post a job ');

  cy
    .log('Get the title private job')
    .getTextByIndex('app-client-private-job a.jobName', jobIndex)
    .then(() => {
      cy.log('Click "Cancel job"')
        .clickElementOnText('a span', 'Cancel job')

        .verifyTextVisible('Why are you cancelling it?');
      isClickCancel ? cy.clickElementOnText('button', 'Cancel Job') : cy.clickElementOnText('button', 'Close');
      isClickCancel ? cy.verifyTextVisible('Please select an answer') : null;
    });
});

Cypress.Commands.add('cancelFirstJobDetailThenSelectOption', (option = 0) => {
  cy
    .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

    .url()
    .should('include', 'jobs/posted-jobs')
    .verifyElementContainsText('button', ' Post a job ')

    .log('Select Reqular job with status as Open')
    .selectJobWithStatus('Open')

    .log('Get the title job')
    .getText('h2.header')
    .then((title) => {
      cy.log('Click "Cancel job"')
        .clickElementOnText('button span', 'Cancel job')
        .clickElement('input[type="radio"][name="reason"]', true, option)
        .clickElementOnText('button', 'Cancel Job')

        .verifyTextVisible('Job cancelled successfully')

        .verifyTextNotExist('Why are you cancelling it?')

        .log('Verify that job have status as Cancelled')
        .verifyTextVisible('Cancelled')

        .log('Click "Post a job" on the left navigation')
        .navigateByLeftMenuInDashboard('Jobs')

        .clickElementOnText('.mat-tab-label-content', 'Archive')
        .clickArchiveJobHasStatus(title.trim(), 'Cancelled');
    });
});

Cypress.Commands.add('cancelFirstJobDetailThenNoOption', (isClickCancel = true) => {
  cy
    .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

    .url()
    .should('include', 'jobs/posted-jobs')
    .verifyElementContainsText('button', ' Post a job ')
    .log('Select Reqular job with status as Open')
    .selectJobWithStatus('Open')

    .log('Get the title job')
    .getText('h2.header')
    .then(() => {
      cy.log('Click "Cancel job"')
        .clickElementOnText('button span', 'Cancel job')

        .verifyTextVisible('Why are you cancelling it?');
      isClickCancel ? cy.clickElementOnText('button', 'Cancel Job') : cy.clickElementOnText('button', 'Close');
      isClickCancel ? cy.verifyTextVisible('Please select an answer') : null;
    });
});

Cypress.Commands.add('rePostAFilledRegularJob', (option = 0) => {
  cy
    .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

    .url()
    .should('include', 'jobs/posted-jobs')
    .verifyElementContainsText('button', ' Post a job ')

    .get('app-client-regular-job .panel')
    .find('div.filled')
    .eq(option)
    .parents('app-client-regular-job')
    .find('a.jobName')
    .invoke('text')
    .then((title) => {
      cy.log('Click "Copy and post new job"')
        .clickElementOnText('a span', 'Copy and post new job')
        .verifyElementVisible('app-post-job-granular-availability')
        .inputEstimatedHoursPerWeek('10')
        .clickElementOnText('button', 'Post to local workers')

        .verifyTextVisible('Job Posted')

        .verifyTextVisible('Open to applications from local workers')

        .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

        .get('app-client-regular-job .panel a.jobName')
        .should(($item) => {
          expect($item, 'Have job in the list: ').to.contain(title);
        });

      cy.log('Click "Cancel job"')
        .clickElementOnText('a span', 'Cancel job')
        .clickElement('input[type="radio"][name="reason"]', true, option)
        .clickElementOnText('button', 'Cancel Job')
        .verifyTextVisible('Job cancelled successfully');
    });
});

Cypress.Commands.add('rePostAnExpiredRegularJob', (option = 0) => {
  cy
    .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

    .url()
    .should('include', 'jobs/posted-jobs')
    .verifyElementContainsText('button', ' Post a job ')

    .clickElementOnText('div.mat-tab-label-content', 'Archive')
    .wait(1000)

    .get('app-client-regular-job .panel .chip')
    .contains('Expired')
    .eq(option)
    .parents('app-client-regular-job')
    .find('a.jobName')
    .invoke('text')
    .then((title) => {
      cy.log('Click "Copy and post new job"')
        .clickElementOnText('a span', 'Copy and post new job')
        .verifyElementVisible('app-post-job-granular-availability')
        .inputEstimatedHoursPerWeek('10')
        .clickElementOnText('button', 'Post to local workers')

        .verifyTextVisible('Job Posted')

        .verifyTextVisible('Open to applications from local workers')

        .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

        .get('app-client-regular-job .panel a.jobName')
        .should(($item) => {
          expect($item, 'Have job in the list: ').to.contain(title);
        });
    });
});

Cypress.Commands.add('rePostACancelledRegularJob', (option = 0) => {
  cy
    .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

    .url()
    .should('include', 'jobs/posted-jobs')
    .verifyElementContainsText('button', ' Post a job ')

    .clickElementOnText('div.mat-tab-label-content', 'Archive')
    .wait(1000)

    .get('app-client-regular-job .panel .chip')
    .contains('Cancelled')
    .eq(option)
    .parents('app-client-regular-job')
    .find('a.jobName')
    .invoke('text')
    .then((title) => {
      cy.log('Click "Copy and post new job"')
        .clickElementOnText('a span', 'Copy and post new job')
        .verifyElementVisible('app-post-job-granular-availability')
        .inputEstimatedHoursPerWeek('10')
        .clickElementOnText('button', 'Post to local workers')

        .verifyTextVisible('Job Posted')

        .verifyTextVisible('Open to applications from local workers')

        .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

        .get('app-client-regular-job .panel a.jobName')
        .should(($item) => {
          expect($item, 'Have job in the list: ').to.contain(title);
        });

      cy.log('Click "Cancel job"')
        .clickElementOnText('a span', 'Cancel job')
        .clickElement('input[type="radio"][name="reason"]', true, option)
        .clickElementOnText('button', 'Cancel Job')
        .verifyTextVisible('Job cancelled successfully');
    });
});

Cypress.Commands.add('verifyCannotRepostAnOpenJob', (option = 0) => {
  cy
    .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

    .url()
    .should('include', 'jobs/posted-jobs')
    .verifyElementContainsText('button', ' Post a job ')

    .get('app-client-regular-job .panel')
    .find('div.open')
    .eq(option)
    .parents('app-client-regular-job .panel')
    .should('not.contain', 'Copy and post new job');
});

Cypress.Commands.add('rePostAndEditTitleAFilledRegularJob', (option = 0, title = faker.name.jobTitle()) => {
  cy
    .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

    .url()
    .should('include', 'jobs/posted-jobs')
    .verifyElementContainsText('button', ' Post a job ')

    .get('app-client-regular-job .panel')
    .find('div.filled')
    .eq(option)
    .parents('app-client-regular-job')
    .find('a.jobName')
    .invoke('text')
    .then(() => {
      cy.log('Click "Copy and post new job"')
        .clickElementOnText('a span', 'Copy and post new job')
        .verifyElementVisible('app-post-job-granular-availability')

        .log('Enter the title job')
        .inputTextField(data.regularJob.client.titleJobInput, title)

        .inputEstimatedHoursPerWeek('10')
        .clickElementOnText('button', 'Post to local workers')

        .verifyTextVisible('Job Posted')

        .verifyTextVisible('Open to applications from local workers')

        .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

        .get('app-client-regular-job .panel a.jobName')
        .should(($item) => {
          expect($item, 'Have job in the list: ').to.contain(title);
        });

      cy.log('Click "Cancel job"')
        .clickElementOnText('a span', 'Cancel job')
        .clickElement('input[type="radio"][name="reason"]', true, option)
        .clickElementOnText('button', 'Cancel Job')
        .verifyTextVisible('Job cancelled successfully');
    });
});

Cypress.Commands.add('rePostAndEditSuburbAFilledRegularJob', (option = 0, postCode = '2148') => {
  cy
    .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

    .url()
    .should('include', 'jobs/posted-jobs')
    .verifyElementContainsText('button', ' Post a job ')

    .get('app-client-regular-job .panel')
    .find('div.filled')
    .eq(option)
    .parents('app-client-regular-job')
    .find('a.jobName')
    .invoke('text')
    .then(() => {
      cy.log('Click "Copy and post new job"')
        .clickElementOnText('a span', 'Copy and post new job')
        .verifyElementVisible('app-post-job-granular-availability');

      cy.log('Enter post code')
        .get(data.regularJob.client.postCodeInput)
        .click()
        .wait(1000)
        .clear()
        .type(postCode)
        .wait(1000)
        .clickElement('.suggestions .listOption', true, 0)
        .inputEstimatedHoursPerWeek('10')
        .clickElementOnText('button', 'Post to local workers')

        .verifyTextVisible('Job Posted')

        .verifyTextVisible('Open to applications from local workers')

        .get('.jobField')
        .should(($item) => {
          expect($item, 'Have job in the list: ').to.contain(postCode);
        })
      // Back to Job page
        .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

        .url()
        .should('include', 'jobs/posted-jobs')
        .verifyElementContainsText('button', ' Post a job ');

      cy.log('Click "Cancel job"')
        .clickElementOnText('a span', 'Cancel job')
        .clickElement('input[type="radio"][name="reason"]', true, option)
        .clickElementOnText('button', 'Cancel Job')
        .verifyTextVisible('Job cancelled successfully');
    });
});

Cypress.Commands.add('rePostAndEditFrequencyAFilledRegularJob', (option = 0, frequency = 'One-off') => {
  cy
    .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

    .url()
    .should('include', 'jobs/posted-jobs')
    .verifyElementContainsText('button', ' Post a job ')

    .get('app-client-regular-job .panel')
    .find('div.filled')
    .eq(option)
    .parents('app-client-regular-job')
    .find('a.jobName')
    .invoke('text')
    .then(() => {
      cy.log('Click "Copy and post new job"')
        .clickElementOnText('a span', 'Copy and post new job')
        .verifyElementVisible('app-post-job-granular-availability');

      cy.log(`'Updated ${frequency}'`)
        .clickElementOnText('.radioLabel', frequency)
        .inputEstimatedHoursPerWeek('10')

        .clickElementOnText('button', 'Post to local workers')

        .verifyTextVisible('Job Posted')

        .verifyTextVisible('Open to applications from local workers')

        .get('.jobField')
        .should(($item) => {
          expect($item, 'Have job in the list: ').to.contain(frequency);
        })
      // Back to Job page
        .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

        .url()
        .should('include', 'jobs/posted-jobs')
        .verifyElementContainsText('button', ' Post a job ');

      cy.log('Click "Cancel job"')
        .clickElementOnText('a span', 'Cancel job')
        .clickElement('input[type="radio"][name="reason"]', true, option)
        .clickElementOnText('button', 'Cancel Job')
        .verifyTextVisible('Job cancelled successfully');
    });
});

Cypress.Commands.add('rePostAndEditSchedulingAFilledRegularJob', (option = 0,
  preDays = 1,
  startTime = '08:00',
  endTime = '21:00',
  listDay) => {
  cy
    .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

    .url()
    .should('include', 'jobs/posted-jobs')
    .verifyElementContainsText('button', ' Post a job ')

    .get('app-client-regular-job .panel')
    .find('div.filled')
    .eq(option)
    .parents('app-client-regular-job')
    .find('a.jobName')
    .invoke('text')
    .then(() => {
      cy.log('Click "Copy and post new job"')
        .clickElementOnText('a span', 'Copy and post new job')
        .verifyElementVisible('app-post-job-granular-availability');
      cy
        .inputTextField('#estimatedHoursLabel input', 5);

      cy
        .verifyTextVisible('Which days and times suit you? ')
        .selectDayAndTimeSuit(preDays, startTime, endTime);

      cy
        .clickElementOnText('button', 'Post to local workers')

        .verifyTextVisible('Job Posted')

        .verifyTextVisible('Open to applications from local workers');

      for (let i = 0; i < preDays; i += 1) {
        cy
          .get('li.availabilityRequiredDays .displayOncePerRow')
          .should('contain', listDay[i])
          .should('contain', `${startTime} to ${endTime}`);
      }

      cy
      // Back to Job page
        .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

        .url()
        .should('include', 'jobs/posted-jobs')
        .verifyElementContainsText('button', ' Post a job ');

      cy.log('Click "Cancel job"')
        .clickElementOnText('a span', 'Cancel job')
        .clickElement('input[type="radio"][name="reason"]', true, option)
        .clickElementOnText('button', 'Cancel Job')
        .verifyTextVisible('Job cancelled successfully');
    });
});

Cypress.Commands.add('selectPreferredDaysInJob', (preDays = ['Morning', 'Morning']) => {
  for (let day = 0; day < 7; day += 1) {
    if (preDays[day] !== null || preDays[day] !== undefined) {
      cy.get('#specificDays mat-checkbox')
        .eq(day)
        .click({ force: true });
    }
  }
});

Cypress.Commands.add('rePostAndEditEstimatedAFilledRegularJob', (option = 0, hours = '5 to 10 hours') => {
  cy
    .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

    .url()
    .should('include', 'jobs/posted-jobs')
    .verifyElementContainsText('button', ' Post a job ')

    .get('app-client-regular-job .panel')
    .find('div.filled')
    .eq(option)
    .parents('app-client-regular-job')
    .find('a.jobName')
    .invoke('text')
    .then(() => {
      cy.log('Click "Copy and post new job"')
        .clickElementOnText('a span', 'Copy and post new job')
        .verifyElementVisible('app-post-job-granular-availability');
      cy
        .inputTextField('#estimatedHoursLabel input', 5);

      // cy.log(`'Updated ${hours}'`)
      //   .clickElementOnText('.radioLabel', hours);
      cy
        .clickElementOnText('button', 'Post to local workers')

        .verifyTextVisible('Job Posted')

        .verifyTextVisible('Open to applications from local workers')

        .get('.jobField')
        .should(($item) => {
          expect($item, 'Have job in the list: ').to.contain(hours);
        })
      // Back to Job page
        .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

        .url()
        .should('include', 'jobs/posted-jobs')
        .verifyElementContainsText('button', ' Post a job ');

      cy.log('Click "Cancel job"')
        .clickElementOnText('a span', 'Cancel job')
        .clickElement('input[type="radio"][name="reason"]', true, option)
        .clickElementOnText('button', 'Cancel Job')
        .verifyTextVisible('Job cancelled successfully');
    });
});

Cypress.Commands.add('rePostAndEditServiceAFilledRegularJob', (option = 0, service = 'Community participation, sports') => {
  cy
    .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

    .url()
    .should('include', 'jobs/posted-jobs')
    .verifyElementContainsText('button', ' Post a job ')

    .get('app-client-regular-job .panel')
    .find('div.filled')
    .eq(option)
    .parents('app-client-regular-job')
    .find('a.jobName')
    .invoke('text')
    .then(() => {
      cy.log('Click "Copy and post new job"')
        .clickElementOnText('a span', 'Copy and post new job')
        .verifyElementVisible('app-post-job-granular-availability')
        .inputTextField('#estimatedHoursLabel input', 5);

      cy.log(`'Updated ${service}'`)
        .clickElementOnText('mat-checkbox', service)

        .clickElementOnText('button', 'Post to local workers')

        .verifyTextVisible('Job Posted')

        .verifyTextVisible('Open to applications from local workers')

        .get('.panel')
        .should(($item) => {
          expect($item, 'Should have: ').to.contain(service);
        })
      // Back to Job page
        .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

        .url()
        .should('include', 'jobs/posted-jobs')
        .verifyElementContainsText('button', ' Post a job ');

      cy.log('Click "Cancel job"')
        .clickElementOnText('a span', 'Cancel job')
        .clickElement('input[type="radio"][name="reason"]', true, option)
        .clickElementOnText('button', 'Cancel Job')
        .verifyTextVisible('Job cancelled successfully');
    });
});

Cypress.Commands.add('rePostAndWhatSupportAFilledRegularJob', (option = 0, whatSupport = 'Support automation 123') => {
  cy
    .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

    .url()
    .should('include', 'jobs/posted-jobs')
    .verifyElementContainsText('button', ' Post a job ')

    .get('app-client-regular-job .panel')
    .find('div.filled')
    .eq(option)
    .parents('app-client-regular-job')
    .find('a.jobName')
    .invoke('text')
    .then(() => {
      cy.log('Click "Copy and post new job"')
        .clickElementOnText('a span', 'Copy and post new job')
        .verifyElementVisible('app-post-job-granular-availability');
      cy
        .inputTextField('#estimatedHoursLabel input', 5);

      cy
        .log('Enter the "What qualities are you looking for in a support person?"')
        .inputTextField(
          data.regularJob.client.carerDescribeTextarea,
          whatSupport,
        )

        .clickElementOnText('button', 'Post to local workers')

        .verifyTextVisible('Job Posted')

        .verifyTextVisible('Open to applications from local workers')

        .get('.panel')
        .should(($item) => {
          expect($item, 'Should have: ').to.contain(whatSupport);
        })
      // Back to Job page
        .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

        .url()
        .should('include', 'jobs/posted-jobs')
        .verifyElementContainsText('button', ' Post a job ');

      cy.log('Click "Cancel job"')
        .clickElementOnText('a span', 'Cancel job')
        .clickElement('input[type="radio"][name="reason"]', true, option)
        .clickElementOnText('button', 'Cancel Job')
        .verifyTextVisible('Job cancelled successfully');
    });
});

Cypress.Commands.add('rePostAndWhatQualityAFilledRegularJob', (option = 0, whatQuality = 'Qualities automation 123') => {
  cy
    .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

    .url()
    .should('include', 'jobs/posted-jobs')
    .verifyElementContainsText('button', ' Post a job ')

    .get('app-client-regular-job .panel')
    .find('div.filled')
    .eq(option)
    .parents('app-client-regular-job')
    .find('a.jobName')
    .invoke('text')
    .then(() => {
      cy.log('Click "Copy and post new job"')
        .clickElementOnText('a span', 'Copy and post new job')
        .verifyElementVisible('app-post-job-granular-availability');
      cy
        .inputTextField('#estimatedHoursLabel input', 5);

      cy
        .log('Enter the "What qualities are you looking for in a support person?"')
        .inputTextField(
          data.regularJob.client.jobDescribeTextarea,
          whatQuality,
        )

        .clickElementOnText('button', 'Post to local workers')

        .verifyTextVisible('Job Posted')

        .verifyTextVisible('Open to applications from local workers')

        .get('.panel')
        .should(($item) => {
          expect($item, 'Should have: ').to.contain(whatQuality);
        })
      // Back to Job page
        .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

        .url()
        .should('include', 'jobs/posted-jobs')
        .verifyElementContainsText('button', ' Post a job ');

      cy.log('Click "Cancel job"')
        .clickElementOnText('a span', 'Cancel job')
        .clickElement('input[type="radio"][name="reason"]', true, option)
        .clickElementOnText('button', 'Cancel Job')
        .verifyTextVisible('Job cancelled successfully');
    });
});

Cypress.Commands.add('rePostAndWhatImportantAFilledRegularJob', (option = 0, whatImportant = 'Important automation 123') => {
  cy
    .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

    .url()
    .should('include', 'jobs/posted-jobs')
    .verifyElementContainsText('button', ' Post a job ')

    .get('app-client-regular-job .panel')
    .find('div.filled')
    .eq(option)
    .parents('app-client-regular-job')
    .find('a.jobName')
    .invoke('text')
    .then(() => {
      cy.log('Click "Copy and post new job"')
        .clickElementOnText('a span', 'Copy and post new job')
        .verifyElementVisible('app-post-job-granular-availability');
      cy
        .inputTextField('#estimatedHoursLabel input', 5);

      cy
        .log('Enter the "What is important for support people to know about you?"')
        .inputTextField(
          data.regularJob.client.consumerDescribeTextarea,
          whatImportant,
        )

        .clickElementOnText('button', 'Post to local workers')

        .verifyTextVisible('Job Posted')

        .verifyTextVisible('Open to applications from local workers')

        .get('.panel')
        .should(($item) => {
          expect($item, 'Should have: ').to.contain(whatImportant);
        })
      // Back to Job page
        .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

        .url()
        .should('include', 'jobs/posted-jobs')
        .verifyElementContainsText('button', ' Post a job ');

      cy.log('Click "Cancel job"')
        .clickElementOnText('a span', 'Cancel job')
        .clickElement('input[type="radio"][name="reason"]', true, option)
        .clickElementOnText('button', 'Cancel Job')
        .verifyTextVisible('Job cancelled successfully');
    });
});

Cypress.Commands.add('rePostAndGenderAFilledRegularJob', (option = 0, gender = 'Female') => {
  cy
    .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

    .url()
    .should('include', 'jobs/posted-jobs')
    .verifyElementContainsText('button', ' Post a job ')

    .get('app-client-regular-job .panel')
    .find('div.filled')
    .eq(option)
    .parents('app-client-regular-job')
    .find('a.jobName')
    .invoke('text')
    .then(() => {
      cy.log('Click "Copy and post new job"')
        .clickElementOnText('a span', 'Copy and post new job')
        .verifyElementVisible('app-post-job-granular-availability');
      cy
        .inputTextField('#estimatedHoursLabel input', 5);
      cy
        .log(`'Select Gender as ${gender}'`)
        .selectDropdown(data.regularJob.client.genderSelect, gender)

        .clickElementOnText('button', 'Post to local workers')

        .verifyTextVisible('Job Posted')

        .verifyTextVisible('Open to applications from local workers')

        .get('.jobField')
        .should(($item) => {
          expect($item, 'Have job in the list: ').to.contain(gender);
        })
      // Back to Job page
        .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

        .url()
        .should('include', 'jobs/posted-jobs')
        .verifyElementContainsText('button', ' Post a job ');

      cy.log('Click "Cancel job"')
        .clickElementOnText('a span', 'Cancel job')
        .clickElement('input[type="radio"][name="reason"]', true, option)
        .clickElementOnText('button', 'Cancel Job')
        .verifyTextVisible('Job cancelled successfully');
    });
});

Cypress.Commands.add('rePostAllFieldsAFilledRegularJob', (option = 0, list) => {
  cy
    .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

    .url()
    .should('include', 'jobs/posted-jobs')
    .verifyElementContainsText('button', ' Post a job ')

    .get('app-client-regular-job .panel')
    .find('div.filled')
    .eq(option)
    .parents('app-client-regular-job')
    .find('a.jobName')
    .invoke('text')
    .then(() => {
      cy.log('Click "Copy and post new job"')
        .clickElementOnText('a span', 'Copy and post new job')
        .verifyElementVisible('app-post-job-granular-availability');
      cy
        .inputTextField('#estimatedHoursLabel input', 5);
      cy

        .log('Enter the title job')
        .inputTextField(data.regularJob.client.titleJobInput, list.title)

        .log(`'Select Gender as ${list.gender}'`)
        .selectDropdown(data.regularJob.client.genderSelect, list.gender)

        .log('Enter post code')
        .inputTextField(data.regularJob.client.postCodeInput, list.postCode)
        .wait(1000)
        .clickElement('.suggestions .listOption', true, 0)

        .log(`'Updated ${list.frequency}'`)
        .clickElementOnText('.radioLabel', list.frequency)

        .log(`'Updated ${list.hours}'`)
        .clickElementOnText('.radioLabel', list.hours)

        .log(`'Updated ${list.service}'`)
        .clickElementOnText('mat-checkbox', list.service)

        .log('Enter the "What qualities are you looking for in a support person?"')
        .inputTextField(
          data.regularJob.client.carerDescribeTextarea,
          list.whatSupport,
        )

        .log('Enter the "What qualities are you looking for in a support person?"')
        .inputTextField(
          data.regularJob.client.jobDescribeTextarea,
          list.whatQuality,
        )

        .log('Enter the "What is important for support people to know about you?"')
        .inputTextField(
          data.regularJob.client.consumerDescribeTextarea,
          list.whatImportant,
        )

        .log(`'Updated ${list.scheduling}'`)
        .clickElementOnText('.radioLabel', list.scheduling)
        .wait(1000);

      if (list.scheduling !== 'I\'m flexible') {
        // eslint-disable-next-line prefer-destructuring
        list.scheduling = list.preDays[0];
        cy
          .verifyTextVisible('Which days and times do you prefer?')
          .selectPreferredDaysInJob(list.preDays);
      }

      cy
        .clickElementOnText('button', 'Post to local workers')

        .verifyTextVisible('Job Posted')

        .verifyTextVisible('Open to applications from local workers');

      const listTxt = Object.values(list);

      cy
        .verifyListBoxText(listTxt)
      // Back to Job page
        .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

        .url()
        .should('include', 'jobs/posted-jobs')
        .verifyElementContainsText('button', ' Post a job ');

      cy.log('Click "Cancel job"')
        .clickElementOnText('a span', 'Cancel job')
        .clickElement('input[type="radio"][name="reason"]', true, option)
        .clickElementOnText('button', 'Cancel Job')
        .verifyTextVisible('Job cancelled successfully');
    });
});

Cypress.Commands.add('navigateToRegularByStatus', (status, index = 0, isForce = false) => {
  cy.log(`'Navigate to Job by ${status}'`)
    .get(data.regularJob.client.jobWithStatus)
    .contains(status)
    .eq(index)
    .parents('div.details')
    .children('div.jobTitle')
    .children('a.jobName')
    .click({ force: isForce });
});

Cypress.Commands.add('navigateAJobAndContactWorkerRecommendationTile', (option = 0) => {
  cy
    .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

    .url()
    .should('include', 'jobs/posted-jobs')
    .verifyElementContainsText('button', ' Post a job ')

    .log('Navigate to Job ')
    .navigateToRegularByStatus('Open', 0)

    .verifyElementVisible('div#recommendedWorkerSection')

    .log('Have 4 recommend worker')
    .get('.contactWorkerItem.panel')
    .should('have.length', 4)

    .verifyTextVisible('Contact these workers')
    .verifyTextVisible('Based on the details you\'ve entered these workers may also be a good fit and give you more options when building your support team.')

    .get('.contactWorkerItem.panel button')
    .contains('Contact')
    .eq(option)
    .click();
});

Cypress.Commands.add('navigateAJobAndViewProfileWorkerRecommendationTile', (option = 0) => {
  cy
    .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

    .url()
    .should('include', 'jobs/posted-jobs')
    .verifyElementContainsText('button', ' Post a job ')

    .log('Navigate to Job ')
    .navigateToRegularByStatus('Open', 0)

    .verifyElementVisible('div#recommendedWorkerSection')

    .log('Have 4 recommend worker')
    .get('.contactWorkerItem.panel')
    .should('have.length', 4)

    .verifyTextVisible('Contact these workers')
    .verifyTextVisible('Based on the details you\'ve entered these workers may also be a good fit and give you more options when building your support team.')

    .get('.contactWorkerItem.panel button')
    .contains('View profile')
    .eq(option)
    .click()

    .verifyElementVisible('div#profileHeader');
});

Cypress.Commands.add('viewAReplyRegularJob', (option = 0) => {
  cy
    .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

    .url()
    .should('include', 'jobs/posted-jobs')
    .verifyElementContainsText('button', ' Post a job ')

    .get('app-client-regular-job .panel span')
    .contains('1 reply')
    .eq(option)
    .click()

    .verifyElementVisible('div.jobDetailsContainer')
    .verifyTextVisible('Job details')

    .clickElement('div#messageReplyContainer app-avatar', true)

    .verifyElementVisible('div#profileHeader');
});

Cypress.Commands.add('viewAReplyRegularJobAndViewProfile', (option = 0) => {
  cy
    .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

    .url()
    .should('include', 'jobs/posted-jobs')
    .verifyElementContainsText('button', ' Post a job ')

    .get('app-client-regular-job .panel span')
    .contains('1 reply')
    .eq(option)
    .click()

    .verifyElementVisible('div.jobDetailsContainer')
    .verifyTextVisible('Job details')

    .clickElementOnText('div#messageReplyContainer .details', 'View profile')

    .verifyElementVisible('div#profileHeader');
});

Cypress.Commands.add('navigateALMJAndCheckRecommendationTile', (option = 0) => {
  cy
    .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

    .url()
    .should('include', 'jobs/posted-jobs')
    .verifyElementContainsText('button', ' Post a job ')

    .log('Navigate to LMJ ')
    .navigateToLMJByStatus('Open', option)

    .verifyElementNotExist('div#recommendedWorkerSection');
});

Cypress.Commands.add('checkProfaneWordListInStandardJob', (profaneList, isForce = false) => {
  for (const item of profaneList) {
    const text = `${profaneList[0]} check ${item}`;
    cy.log('Enter the job title')
      .get(data.regularJob.client.consumerDescribeTextarea)
      .clear({ force: isForce })
      .type(text, { force: isForce })

      .log('Describe the job')
      .get(data.regularJob.client.carerDescribeTextarea)
      .clear({ force: isForce })
      .type(text, { force: isForce })

      .log('The consumer description')
      .get(data.regularJob.client.jobDescribeTextarea)
      .clear({ force: isForce })
      .type(text, { force: isForce })

      .clickElementOnText(
        data.regularJob.client.postJobSubmit,
        'Post to local workers',
      )

      .get(data.regularJob.client.consumerDescribeTextarea)
      .parents('label.invalid')
      .children('div.status')
      .should('have.text', 'Contains sensitive language')

      .get(data.regularJob.client.carerDescribeTextarea)
      .parents('label.invalid')
      .children('div.status')
      .should('have.text', 'Contains sensitive language')

      .get(data.regularJob.client.jobDescribeTextarea)
      .parents('label.invalid')
      .children('div.status')
      .should('have.text', 'Contains sensitive language');
  }
});

Cypress.Commands.add('archivedAfilledRegularJob', (option = 0) => {
  cy
    .clickElementOnText('[href="/jobs/posted-jobs"]', 'Job')

    .url()
    .should('include', 'jobs/posted-jobs')
    .verifyElementContainsText('button', ' Post a job ')

    .get('app-client-regular-job .panel .chip')
    .contains('Filled')
    .eq(option)
    .parents('app-client-regular-job')
    .find('a.jobName')
    .invoke('text')
    .then((title) => {
      cy.log('Click "Archive"')
        .clickElementOnText('a span', 'Archive')

        .verifyTextVisible('Job archived successfull')

        .clickElementOnText('div.mat-tab-label-content', 'Archive')
        .wait(1000)
        // .clickElement('button[aria-label="Last page"]', true)
        // .wait(1000)

        .get('app-client-regular-job .panel a.jobName')
        .should(($item) => {
          expect($item, 'Have job in the list: ').to.contain(title);
        })

        .clickElementOnText('app-client-regular-job .panel a.jobName', title)

        .verifyElementVisible('app-view-job')

        .get('.publicJobChip .chip')
        .contains('Archived')
        .should('be.visible');
    });
});

Cypress.Commands.add('inputEstimatedHoursPerWeek', (hours = 10) => {
  cy
    .inputTextField('[formcontrolname="estimatedHoursPerWeek"] input', hours);
});

Cypress.Commands.add('scrollToBottomInJob', (times = 1) => {
  for (let i = 0; i < times; i += 1) {
    cy.get('virtual-scroller').scrollTo('bottom')
      .wait(2000);
  }
});

Cypress.Commands.add('selectDayAndTimeSuit', (onDays = 7, startTime = '08:00', endTime = '21:00') => {
  for (let i = 1; i <= onDays; i += 1) {
    const index = i - 1;
    cy.get(`mat-slide-toggle#mat-slide-toggle-${i}`)
      .click()
      .wait(1000)
      .get('select[formcontrolname="startTime"]')
      .eq(index)
      .select(startTime)
      .wait(1000)
      .get('select[formcontrolname="endTime"]')
      .eq(index)
      .select(endTime);
  }
});
