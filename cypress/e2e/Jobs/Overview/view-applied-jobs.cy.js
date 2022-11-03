describe('View applied jobs', () => {
  const workerEmail = 'automation_maria.repollo.jobspec+worker@donotuse.com.au';
  const workerPass = 'qaAutomation2021';

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it('ES-T525. View applied regular jobs from conversation page', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(workerEmail, workerPass)

      .log('Click Inbox on the left navigation')
      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log('Choose a conversation with regular job application')
      .get('app-channel-item .channelContent span.title')
      .contains('Robinsons')
      .click()

      .log('Check conversation page')
      .verifyTextExist('Job Ref:')

      .log('Click Job ref:<link>')
      .get('app-chat-bubble button app-icon')
      .last()
      .click({ force: true })

      .log('Verify user is navigated to the detailed page')
      .wait(2000)
      .verifyCurrentURL('jobs/search/view')
      .verifyTextExist('Jobs')
      .verifyTextExist('View Message')
      .verifyTextExist('Report');
  });

  it('ES-T1281. View job applied page, with records', () => {
    const STATUS = {
      OPEN: 'Open',
      AGREE: 'Agreement made',
      FILLED: 'Filled',
      ARCHIVED: 'Archived',
      CANCELLED: 'Cancelled',
      EXPIRED: 'Expired',
    };

    cy
      .log('Login as worker')
      .loginToDashboard(
        'automation_kang.haneul.activeagreement+worker@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Go to the Job page')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Click Applied tab')
      .clickElementOnText('a', 'Applied')

      .log('Verify the status of job list on Applied')
      .get('.jobStatus')
      .each((el) => {
        cy.get(el)
          .find('span')
          .invoke('text')
          .then((value) => {
            expect(value).to.be.oneOf(Object.values(STATUS));
          });
      });
  });

  it('ES-T526. View applied jobs', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        'automation_kang.haneul.activeagreement+worker@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Go to the Job page')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Click Applied tab')
      .clickElementOnText('a', 'Applied')

    // .log('Select Open job')
    // .clickElementOnText('.resultTile .jobStatus span', 'Open')
    // .wait(1000)

    // .log('Verify worker detail is shown')
    // .verifyElementVisible('#resultFocus')
    // .log('Verify View message btn is visible')
    // .verifyElementContainsText('#jobActions a', 'View Message')

      .log('Select Agreement made job')
      .clickElementOnText('.resultTile .jobStatus span', 'Agreement made')
      .wait(1000)

      .log('Verify worker detail is shown')
      .verifyElementVisible('#resultFocus')
      .log('Verify View message btn is visible')
      .verifyElementContainsText('#jobActions a', 'View Message')

      .log('Select Cancel job')
      .clickElementOnText('.resultTile .jobStatus span', 'Cancelled')
      .wait(1000)

      .log('Verify worker detail is shown')
      .verifyElementVisible('#resultFocus')
      .log('Verify View message btn is visible')
      .verifyElementContainsText('#jobActions a', 'View Message');

    cy.get('virtual-scroller#resultsList').scrollTo('bottom');
    cy
      .log('Select Filled job')
      .clickElementOnText('.resultTile .jobStatus span', 'Filled')
      .wait(1000)

      .log('Verify worker detail is shown')
      .verifyElementVisible('#resultFocus')
      .log('Verify View message btn is visible')
      .verifyElementContainsText('#jobActions a', 'View Message')

      .log('Select Expired job')
      .clickElementOnText('.resultTile .jobStatus span', 'Expired')
      .wait(1000)

      .log('Verify worker detail is shown')
      .verifyElementVisible('#resultFocus')
      .log('Verify View message btn is visible')
      .verifyElementContainsText('#jobActions a', 'View Message');
  });
});
