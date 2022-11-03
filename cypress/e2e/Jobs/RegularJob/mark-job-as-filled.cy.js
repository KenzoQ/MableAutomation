import * as data from '../../../fixtures/test-data.json';
import faker from 'faker/locale/en_AU';

describe('Mark job as filled', () => {
  const clientEmail = 'automation_richard.gutierrez.regularjob+client@donotuse.com.au';
  const clientPass = 'qaAutomation2021';
  const clientId = '15443';

  const workerEmail = 'automation_maria.repollo.jobspec+worker@donotuse.com.au';
  const workerPass = 'qaAutomation2021';
  const workerId = '15613';

  const workerEmail02 = 'automation_kim.taehee.jobagreement+worker@donotuse.com.au';
  const workerPass02 = 'qaAutomation2021';
  const workerId02 = '16566';

  const workerInboxName = 'Regression';
  const workerInboxName2 = 'Tae Hee';

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it(`1. ES-T530. Mark open job as filled
      2.ES-T131 Check newly marked job as filled`, () => {
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

  it(`1. ES-T556. Marking job as filled from agreement page
      2. ES-T557. Check newly marked job as filled, with associated agreement`, () => {
    const titleJob = faker.name.jobTitle();
    cy.removeAgreementIfExist(clientEmail, clientPass, workerId)
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
        cy.wait(2000).sendAgreementAsWorker(
          workerEmail,
          workerPass,
          clientId,
          jobID,
        );
      })
      .then(() => {
        cy
          .log('Login as client')
          .wait(1000)
          .loginToDashboard(clientEmail, clientPass)

          .log('Click "Inbox" on the left navigation')
          .navigateByLeftMenuInDashboard('Inbox')

          .log('Select worker Inbox: Regression W.')
          .moveToUntilFoundName(workerInboxName)
          .clickElementOnText(data.message.nameInbox, workerInboxName)

          .log('Send a new message')
          .inputTextField(data.message.messageInput, 'send a new message')
          .clickElement(data.message.sendMessBtn, true)

          .acceptAgreementFromConversationAsClient()

          .log('Verify the confirmation popup is shown')
          .verifyTextExist('Agreement accepted')

          .log('Click "Yes, no other worker are needed"')
          .clickElementOnText(
            'mat-dialog-content button span',
            'Yes, no other workers are needed',
          )

          .log('Click "Send message to all other applicants"')
          .clickElementOnText(
            'mat-dialog-actions button',
            'Send message to all other applicants',
          )

          .log('Click "Post a job" on the left navigation')
          .navigateByLeftMenuInDashboard('Jobs')

          .log('Click the regular job having title')
          .clickElementOnText(data.regularJob.client.titleJob, titleJob)

          .log('Verify that job has status as Filled')
          .verifyElementContainsText('span', 'Filled');
      });
  });

  it(`1. ES-T558. Keep job as open from agreement page
      2. ES-T559. Check newly kept job as open, with associated agreement`, () => {
    const titleJob = faker.name.jobTitle();
    cy.removeAgreementIfExist(clientEmail, clientPass, workerId)
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
        cy.wait(2000).sendAgreementAsWorker(
          workerEmail,
          workerPass,
          clientId,
          jobID,
        );
      })
      .then(() => {
        cy
          .log('Login as client')
          .loginToDashboard(clientEmail, clientPass)

          .log('Click "Post a job" on the left navigation')
          .navigateByLeftMenuInDashboard('Inbox')

          .log('Select worker Inbox: Regression W.')
          .moveToUntilFoundName(workerInboxName)
          .clickElementOnText(data.message.nameInbox, workerInboxName)

          .log('Send a new message')
          .inputTextField(data.message.messageInput, 'send a new message')
          .clickElement(data.message.sendMessBtn, true)

          .acceptAgreementFromConversationAsClient()

          .log('Verify the confirmation popup is shown')
          .verifyTextExist('Agreement accepted')

          .log('Click "No, I am looking for other workers as well"')
          .clickElementOnText(
            'mat-dialog-content button span',
            'No, I’m looking for other workers as well',
          )

          .log('Click "Post a job" on the left navigation')
          .navigateByLeftMenuInDashboard('Jobs')

          .log('Click the regular job having title')
          .clickElementOnText(data.regularJob.client.titleJob, titleJob)

          .log('Verify that job has status as Open')
          .verifyElementContainsText('span', 'Open');
      });
  });

  it(`1. ES-T597. Notify all unsuccessful worker upon marking job as filled
      2. ES-T598. Check newly notified unsuccessful applicants`, () => {
    const titleJob = faker.name.jobTitle();
    cy
      .removeAgreementIfExist(clientEmail, clientPass, workerId)
      .removeAgreementIfExist(clientEmail, clientPass, workerId02)
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
        cy.wait(2000)
          .sendAgreementAsWorker(workerEmail, workerPass, clientId, jobID)

          .sendAgreementAsWorker(workerEmail02, workerPass02, clientId, jobID);
      })
      .then(() => {
        cy
          .log('Login as client')
          .loginToDashboard(clientEmail, clientPass)

          .log('Click "Post a job" on the left navigation')
          .navigateByLeftMenuInDashboard('Inbox')

          .log('Select worker Inbox: Regression W.')
          .moveToUntilFoundName(workerInboxName2)
          .clickElementOnText(data.message.nameInbox, workerInboxName2)

          .log('Send a new message')
          .inputTextField(data.message.messageInput, 'send a new message')
          .clickElement(data.message.sendMessBtn, true)

          .acceptAgreementFromConversationAsClient()

          .log('Verify the confirmation popup is shown')
          .verifyTextExist('Agreement accepted')

          .log('Click "Yes, no other worker are needed"')
          .clickElementOnText(
            'mat-dialog-content button span',
            'Yes, no other workers are needed',
          )

          .log('Click "Send message to all other applicants"')
          .clickElementOnText(
            'mat-dialog-actions button',
            'Send message to all other applicants',
          )

          // ES-T598. Check newly notified unsuccessful applicants
          .log('Click "Post a job" on the left navigation')
          .navigateByLeftMenuInDashboard('Inbox')

          .log('Select worker Inbox: Regression W.')
          .moveToUntilFoundName(workerInboxName)
          .clickElementOnText(data.message.nameInbox, workerInboxName);
      });
  });

  it(`1. ES-T599. Don't notify all unsuccessful worker upon marking job as filled
      2. ES-T600. Check newly don't notify unsuccessful applicants`, () => {
    const titleJob = faker.name.jobTitle();
    cy
      .removeAgreementIfExist(clientEmail, clientPass, workerId)
      .removeAgreementIfExist(clientEmail, clientPass, workerId02)
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
        cy.wait(2000)
          .sendAgreementAsWorker(workerEmail, workerPass, clientId, jobID)

          .sendAgreementAsWorker(workerEmail02, workerPass02, clientId, jobID);
      })
      .then(() => {
        cy
          .log('Login as client')
          .wait(1000)
          .loginToDashboard(clientEmail, clientPass)

          .log('Click "Post a job" on the left navigation')
          .navigateByLeftMenuInDashboard('Inbox')

          .log('Select worker Inbox: Regression W.')
          .moveToUntilFoundName(workerInboxName)
          .clickElementOnText(data.message.nameInbox, workerInboxName)

          .acceptAgreementFromConversationAsClient()

          .log('Verify the confirmation popup is shown')
          .verifyTextExist('Agreement accepted')

          .log('Click "Yes, no other worker are needed"')
          .clickElementOnText(
            'mat-dialog-content button span',
            'Yes, no other workers are needed',
          )

          .log('Click "I’ll contact them indiviually"')
          .clickElementOnText(
            'mat-dialog-actions button',
            'I’ll contact them indiviually',
          )

          // Check newly don't notify unsuccessful applicants
          .log('Click "Post a job" on the left navigation')
          .navigateByLeftMenuInDashboard('Inbox')

          .log('Select worker Inbox: Regression W.')
          .moveToUntilFoundName(workerInboxName2)
          .clickElementOnText(data.message.nameInbox, workerInboxName2)

          .log('Verify new message to unsccessful worker are not visible')
          .verifyTextNotExist(
            'Thanks for your reply to my job. I’m currently trialling someone for the position. I may be in contact again if the situation changes.',
          );
      });
  });
});
