import moment from 'moment';
import * as data from '../../../fixtures/test-data.json';

describe('Create edit timesheet', () => {
  const workerEmail = 'automation_jacquline.dare.timesheet+worker@donotuse.com.au';
  const workerPass = 'qaAutomation2021';
  const workerName = 'Jacquline Dare';

  const clientEmail = 'automation_queenie.cartwright.timesheet+client@donotuse.com.au';
  const clientPass = 'qaAutomation2021';
  const clientName = 'Queenie Cartwright';
  const agreementId = '7011';
  const agreementRateId = '28201';

  const clientEmail02 = 'automation_tiffani.hartmann.timesheet+client2@donotuse.com.au';
  const clientPass02 = 'qaAutomation2021';
  const clientName02 = 'Tiffani Hartmann';
  const agreementId02 = '7010';
  const agreementRateId02 = '28198';

  const clientName03 = 'Sonny Hackett';
  const clientEmail03 = 'automation_maria.repollo.expresspaymobile+client@donotuse.com.au';
  const clientPass03 = 'qaAutomation2021';

  const orgClientName = 'Lizzie Heidenreich';
  const orgClientEmail = 'automation_lizzie.heidenreich@donotuse.com.au';
  const orgClientPass = 'qaAutomation2021';

  // const orgClientName = 'Lizzie Heidenreich';
  // const orgClientEmail = 'automation_lizzie.heidenreich@donotuse.com.au';
  // const orgClientPass = 'Mable2021';
  const orgAgrId = '7708';
  const orgAgrRateId = '29157';

  const adminEmail = data.dashboardAccount.adminAccount.email;
  const adminPass = data.dashboardAccount.adminAccount.password;

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it('ES-T1455. Create Timesheet session which overlap with void session', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        workerEmail,
        workerPass,
      )

      .log('Click Timesheet from the left menu')
      .navigateByLeftMenuInDashboard('Support hours')
      .checkPopupOnTimesheet()

      .log('Check Timesheet page')
      .verifyTextVisible('Support hours')
      .verifyTextVisible('Learn more')

      .log('Get date of invoiced timesheet')
      .clickElement('.mat-paginator-navigation-next', true)
      .wait(2000)
      .get('body')
      .then($body => {
        if ($body.find('table tbody td .rejectedVoidedStatus:contains("Voided")').length > 0) {
          cy
            .get('table tbody td .rejectedVoidedStatus')
            .contains('Voided')
            .parents('tr')
            .find('td')
            .then($el => {
              let name;
              let date;
              let month;
              let year;
              let time;
              cy
                .get($el[0])
                .invoke('text')
                .then(text => {
                  name = text;
                });

              cy.get($el[1])
                .invoke('text')
                .then(text => {
                  console.log('date', text);
                  const day = moment(text, 'DD MMM YYYY');
                  date = day.date();
                  month = day.format('MMMM');
                  year = day.year();
                });

              cy.get($el[2])
                .invoke('text')
                .then(text => {
                  const result = text.match(/[0-9]+/);
                  // eslint-disable-next-line prefer-destructuring
                  time = result[0];
                  time = (`0${time}`).slice(-2);

                  console.log(time);
                })
                .then(() => {
                  if (name === orgClientName) {
                    cy
                      .rejectTimesheet(
                        orgClientEmail,
                        orgClientPass,
                        workerName,
                        true,
                      )

                      .log('Login as worker')
                      .loginToDashboard(
                        workerEmail,
                        workerPass,
                      )

                      .navigateByLeftMenuInDashboard('Support hours')
                      .checkPopupOnTimesheet()

                      .log('Click Add new btn')
                      .clickElementOnText(
                        'button',
                        'Add new',
                      )
                      .verifyTextVisible('Add new support hours')

                      .log('Select client from client dropdown list')
                      .selectDropdown(
                        data.timesheet.worker.createForm.selectClient,
                        name,
                      )

                      .log('Click on start date')
                      .selectDropdown(
                        data.timesheet.worker.createForm.startDateSelect,
                        date.toString(),
                        0,
                      )
                      .selectDropdown(
                        data.timesheet.worker.createForm.startDateSelect,
                        month,
                        1,
                      )
                      .selectDropdown(
                        data.timesheet.worker.createForm.startDateSelect,
                        year.toString(),
                        2,
                      )

                      .log('Click on hours in start day')
                      .selectDropdown(
                        data.timesheet.worker.createForm.startTimeSelect,
                        time,
                        0,
                      )

                      .log('Click on minutes in start day')
                      .selectDropdown(
                        data.timesheet.worker.createForm.startTimeSelect,
                        '00',
                        1,
                      )

                      .log('Click on AM/PM dropdown')
                      .selectDropdown(
                        data.timesheet.worker.createForm.startTimeSelect,
                        'AM',
                        2,
                      )

                      .log('Click on end date')
                      .selectDropdown(
                        data.timesheet.worker.createForm.endDateSelect,
                        date.toString(),
                        0,
                      )
                      .selectDropdown(
                        data.timesheet.worker.createForm.endDateSelect,
                        month,
                        1,
                      )
                      .selectDropdown(
                        data.timesheet.worker.createForm.endDateSelect,
                        year.toString(),
                        2,
                      )

                      .log('Click on hours in start day')
                      .selectDropdown(
                        data.timesheet.worker.createForm.endTimeSelect,
                        time,
                        0,
                      )

                      .log('Click on minutes in start day')
                      .selectDropdown(
                        data.timesheet.worker.createForm.endTimeSelect,
                        '40',
                        1,
                      )

                      .log('Click on AM/PM dropdown')
                      .selectDropdown(
                        data.timesheet.worker.createForm.endTimeSelect,
                        'AM',
                        2,
                      )

                      .log('Click on rate')
                      .get(`${data.timesheet.worker.createForm.selectRate} > option:nth-child(2)`)
                      .then(element => cy
                        .selectDropdown(data.timesheet.worker.createForm.selectRate, element.val()))

                      .ClickCloseIfExist()

                      .log('Add the hour in support duration')
                      .inputTextFieldAtPosition(
                        data.timesheet.worker.createForm.supportDurationHour,
                        '0',
                        0,
                      )
                      .log('Add the minutes in support duration')
                      .inputTextFieldAtPosition(
                        data.timesheet.worker.createForm.supportDurationMinute,
                        '00',
                        0,
                      )
                      .log('Add the hour in support duration')
                      .inputTextFieldAtPosition(
                        data.timesheet.worker.createForm.supportDurationHour,
                        '0',
                        1,
                      )
                      .log('Add the minutes in support duration')
                      .inputTextFieldAtPosition(
                        data.timesheet.worker.createForm.supportDurationMinute,
                        '40',
                        1,
                      )

                      .log('Add shift note')
                      .inputTextField(
                        data.timesheet.worker.createForm.shiftNote,
                        'Create Timesheet session which overlap with void session',
                      )

                      .log('Click submit button')
                      .clickElementOnText(
                        'button',
                        'Submit',
                      )

                      .log('Verify the successful message is shown')
                      .verifyTextVisible('Success - your timesheet has been sent to');
                  }
                });
            });
        }
      });
  });

  it('ES-T1288. Create a timesheet, private paying', () => {
    const today = moment(new Date()).format('DD MMM YYYY');
    const day = moment();
    const date = day.date();
    const month = day.format('MMMM');
    const year = day.year();

    cy
      .rejectTimesheet(
        clientEmail02,
        clientPass02,
        workerName,
      )
      .log('Login as worker')
      .loginToDashboard(
        workerEmail,
        workerPass,
      )

      .log('Click Timesheet from the left menu')
      .navigateByLeftMenuInDashboard('Support hours')
      .checkPopupOnTimesheet()

      .log('Check Timesheet page')
      .verifyTextVisible('Support hours')
      .verifyTextVisible('Learn more')
      .url()
      .should('include', '/timesheet')

      .log('Click Add new btn')
      .clickElementOnText(
        'app-members-area button',
        'Add new',
      )
      .verifyTextVisible('Add new support hours')

      .log('Click Back btn')
      .clickElement(data.timesheet.worker.createForm.goBack)
      .verifyTextVisible('Support hours')
      .wait(2000)

      .log('Click Add new btn')
      .clickElementOnText(
        'app-members-area button',
        'Add new',
      )
      .verifyTextVisible('Add new support hours')

      .log('Check on start date')
      .verifyStartDate(date.toString(), month, year.toString())

      .log('Check on start time')
      .verifyStartTime()

      .log('Check on end date')
      .verifyEndDate(date.toString(), month, year.toString())

      .log('Check on end time')
      .verifyEndTime()

      .log('Select client from client dropdown list')
      .selectDropdown(
        data.timesheet.worker.createForm.selectClient,
        clientName02,
      )

      .log('Click on day dropdown from the start date AND select day')
      .selectDropdown(
        data.timesheet.worker.createForm.startDateSelect,
        date.toString(),
        0,
      )

      .log('Click on month dropdown from the start date AND select month')
      .selectDropdown(
        data.timesheet.worker.createForm.startDateSelect,
        month,
        1,
      )

      .log('Click on year dropdown from the start date AND select year')
      .selectDropdown(
        data.timesheet.worker.createForm.startDateSelect,
        year.toString(),
        2,
      )

      .log('Click on hours in start day')
      .selectDropdown(
        data.timesheet.worker.createForm.startTimeSelect,
        '07',
        0,
      )

      .log('Click on minutes in start day')
      .selectDropdown(
        data.timesheet.worker.createForm.startTimeSelect,
        '00',
        1,
      )

      .log('Click on AM/PM dropdown')
      .selectDropdown(
        data.timesheet.worker.createForm.startTimeSelect,
        'AM',
        2,
      )

      .log('Check on end date')
      .verifyEndDate(date.toString(), month, year.toString())

      .log('Click on day dropdown from the end date AND select day')
      .selectDropdown(
        data.timesheet.worker.createForm.endDateSelect,
        date.toString(),
        0,
      )

      .log('Click on month dropdown from the end date AND select month')
      .selectDropdown(
        data.timesheet.worker.createForm.endDateSelect,
        month,
        1,
      )

      .log('Click on year dropdown from the end date AND select year')
      .selectDropdown(
        data.timesheet.worker.createForm.endDateSelect,
        year.toString(),
        2,
      )

      .log('Click on hours in end day')
      .selectDropdown(
        data.timesheet.worker.createForm.endTimeSelect,
        '08',
        0,
      )

      .log('Click on minutes in end day')
      .selectDropdown(
        data.timesheet.worker.createForm.endTimeSelect,
        '00',
        1,
      )

      .log('Click on AM/PM dropdown')
      .selectDropdown(
        data.timesheet.worker.createForm.endTimeSelect,
        'PM',
        2,
      )

      .log('Check duration')
      .verifyTextExist('Duration')

      .log('Click on rate')
      .get(`${data.timesheet.worker.createForm.selectRate} > option:nth-child(2)`)
      .then(element => cy
        .selectDropdown(data.timesheet.worker.createForm.selectRate, element.val()))

      .clickOkIfExist()

      .log('Check duration')
      .verifyTextExist('Total')
      .verifyTextExist('Hourly cost of support')
      .verifyTextExist('Less Mable Fee')
      .verifyTextExist('Agreed Hourly rate')

      .log('Add shift note')
      .inputTextField(
        'textarea',
        'create new timesheet',
      )

      .log('Click Learn more link')
      .clickElementOnText(
        'button.shiftNotes',
        'Learn more',
      )
      .verifyTextExist('Support notes')

      .log('Click Writing notes expand button')
      .clickElementOnText('h3', 'Writing notes')
      .verifyTextExist('How to write support notes')
      .verifyTextExist('Write with your client to learn what\'s important to them')
      .verifyTextExist('Consider your client’s goals and outcomes')
      .verifyTextExist('Be clear and specific')
      .verifyTextExist('Starter questions')
      .verifyTextExist('How did I help my client achieve their goals and outcomes?')
      .verifyTextExist('How did I connect my client to their community or family?')
      .verifyTextLinkHaveHref('View example support notes', '/help_centre/write-shift-notes')

      .log('Click writing notes collapse button')
      .clickElementOnText('h3', 'Writing notes')

      .log('Click Writing notes expand button')
      .clickElementOnText('h3', 'Attachment guidelines')
      .verifyTextExist('Ask for your client’s consent to share photos or videos of them')
      .verifyTextExist('Upload relevant attachments about the support session only')
      .verifyTextExist('Don’t include sensitive information as per our privacy policy')
      .verifyTextExist('Don\'t include prohibited content as per our terms of use')
      .verifyTextLinkHaveHref('Privacy Policy', '/privacy-policy')
      .verifyTextLinkHaveHref('Terms of use (section 5)', '/terms-of-use/#content-and-use')
      .clickCloseIfExist()

      .log('Check Incident report')
      .verifyTextVisible('Incident report')

      .log('Click No btn')
      .clickElement(
        data.timesheet.worker.createForm.incident.checkbox,
        true,
        1,
      )

      .log('Click submit button')
      .clickElementOnText(
        'button',
        'Submit',
      )

      .log('Click Close btn')
      .clickElement('mat-dialog-container button.close')

      .log('Check newly added timesheet')
      .verifyElementContainsText('table tr td span', clientName02)
      .verifyTextVisible(today)

      .rejectTimesheet(
        clientEmail02,
        clientPass02,
        workerName,
      );
  });

  it('ES-T1385. Check Create a timesheet Fields Validation', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        workerEmail,
        workerPass,
      )

      .log('Click Timesheet from the left menu')
      .navigateByLeftMenuInDashboard('Support hours')
      .checkPopupOnTimesheet()

      .log('Check Timesheet page')
      .verifyTextVisible('Support hours')
      .verifyTextVisible('Learn more')

      .log('Click Add new btn')
      .clickElementOnText(
        'button',
        'Add new',
      )
      .verifyTextVisible('Add new support hours')

      .log('Click submit button')
      .clickElementOnText(
        'button',
        'Submit',
      )

      .log('Verify the error message is shown')
      .checkErrorField(
        data.timesheet.worker.createForm.selectClient,
        'Please select client',
      )

      .log('Select client from client dropdown list')
      .selectDropdown(
        data.timesheet.worker.createForm.selectClient,
        clientName,
      )

      .checkErrorField(
        data.timesheet.worker.createForm.selectClient,
        'Please select client',
        false,
      )

      .checkErrorField(
        data.timesheet.worker.createForm.selectRate,
        'Please select rate',
      )

      .log('Click on rate')
      .get(`${data.timesheet.worker.createForm.selectRate} > option:nth-child(2)`)
      .then(element => cy
        .selectDropdown(data.timesheet.worker.createForm.selectRate, element.val()))

      .checkErrorField(
        data.timesheet.worker.createForm.selectRate,
        'Please select rate',
        false,
      )

      .checkErrorField(
        data.timesheet.worker.createForm.shiftNote,
        'Please enter support notes',
      )

      .log('Add shift note')
      .inputTextField(
        data.timesheet.worker.createForm.shiftNote,
        'create new timesheet',
      )

      .checkErrorField(
        data.timesheet.worker.createForm.shiftNote,
        'Please enter support notes',
        false,
      );
  });

  it('ES-T1386. Create a timesheet with Incident Report', () => {
    const day = moment();
    const date = day.date();
    const month = day.format('MMMM');
    const year = day.year();

    cy
      .rejectTimesheet(
        clientEmail03,
        clientPass03,
        workerName,
      )

      .log('Login as worker')
      .loginToDashboard(
        workerEmail,
        workerPass,
      )

      .log('Click Timesheet from the left menu')
      .navigateByLeftMenuInDashboard('Support hours')
      .checkPopupOnTimesheet()

      .log('Check Timesheet page')
      .verifyTextVisible('Support hours')
      .verifyTextVisible('Learn more')

      .log('Click Add new btn')
      .clickElementOnText(
        'button',
        'Add new',
      )
      .verifyTextVisible('Add new support hours')

      .log('Select client from client dropdown list')
      .selectDropdown(
        data.timesheet.worker.createForm.selectClient,
        clientName03,
      )

      .waitAppLoaderNotVisible()

      .log('Click on start date')
      .selectDropdown(
        data.timesheet.worker.createForm.startDateSelect,
        date.toString(),
        0,
      )
      .selectDropdown(
        data.timesheet.worker.createForm.startDateSelect,
        month,
        1,
      )
      .selectDropdown(
        data.timesheet.worker.createForm.startDateSelect,
        year.toString(),
        2,
      )

      .log('Click on hours in start day')
      .selectDropdown(
        data.timesheet.worker.createForm.startTimeSelect,
        '06',
        0,
      )

      .log('Click on minutes in start day')
      .selectDropdown(
        data.timesheet.worker.createForm.startTimeSelect,
        '00',
        1,
      )

      .log('Click on AM/PM dropdown')
      .selectDropdown(
        data.timesheet.worker.createForm.startTimeSelect,
        'AM',
        2,
      )

      .log('Click on end date')
      .selectDropdown(
        data.timesheet.worker.createForm.endDateSelect,
        date.toString(),
        0,
      )
      .selectDropdown(
        data.timesheet.worker.createForm.endDateSelect,
        month,
        1,
      )
      .selectDropdown(
        data.timesheet.worker.createForm.endDateSelect,
        year.toString(),
        2,
      )

      .log('Click on hours in start day')
      .selectDropdown(
        data.timesheet.worker.createForm.endTimeSelect,
        '08',
        0,
      )

      .log('Click on minutes in start day')
      .selectDropdown(
        data.timesheet.worker.createForm.endTimeSelect,
        '00',
        1,
      )

      .log('Click on AM/PM dropdown')
      .selectDropdown(
        data.timesheet.worker.createForm.endTimeSelect,
        'AM',
        2,
      )

      .log('Click on rate')
      .get(`${data.timesheet.worker.createForm.selectRate} > option:nth-child(2)`)
      .then(element => cy
        .selectDropdown(data.timesheet.worker.createForm.selectRate, element.val()))

      .clickOkIfExist()

      .get(data.timesheet.worker.createForm.incident.checkbox)
      .first()
      .trigger('mouseover', { force: true })

      .waitAppLoaderNotVisible()
      .clickElement(
        data.timesheet.worker.createForm.incident.checkbox,
        true,
        0,
      )

      .log('Add shift note')
      .inputTextField(
        data.timesheet.worker.createForm.shiftNote,
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old',
      )

      .log('Click Learn more link')
      .clickElementOnText(
        'button.shiftNotes',
        'Learn more',
      )

      .verifyTextVisible('Writing notes')
      .clickElementOnText('app-expansion-panel .headerText', 'Writing notes')
      .verifyTextVisible('How to write support notes')
      .clickElementOnText('app-expansion-panel .headerText', 'Writing notes')
      .waitAppLoaderNotVisible()
      .verifyTextVisible('Attachment guidelines')
      .clickElementOnText('app-expansion-panel .headerText', 'Attachment guidelines')
      .verifyTextVisible('Terms of use (section 5)')
      .clickElementOnText('app-expansion-panel .headerText', 'Attachment guidelines')
      .waitAppLoaderNotVisible()

      .clickCloseIfExist()

      .log('Check Incident report')
      .verifyTextVisible('Incident report')

      .waitAppLoaderNotVisible()

      .log('Click on incident date filed')
      .selectDropdown(
        data.timesheet.worker.createForm.incident.date,
        date.toString(),
        0,
      )
      .selectDropdown(
        data.timesheet.worker.createForm.incident.date,
        month,
        1,
      )
      .selectDropdown(
        data.timesheet.worker.createForm.incident.date,
        year.toString(),
        2,
      )

      .log('Enter location of incident')
      .inputTextField(
        data.timesheet.worker.createForm.incident.location,
        'location of incident',
      )

      .log('Input on Who was involved in the incident?')
      .inputTextField(
        data.timesheet.worker.createForm.incident.who,
        'abc test',
      )

      .log('Input on what are the details of the incident field?')
      .inputTextField(
        data.timesheet.worker.createForm.incident.detail,
        'enter the details of the incident',
      )

      .log('Input on what happened before the incident field?')
      .inputTextField(
        data.timesheet.worker.createForm.incident.what,
        'enter what the happend before the incident',
      )

      .log('Input on what immediate actions did you take field?')
      .inputTextField(
        data.timesheet.worker.createForm.incident.actions_take,
        'enter what immediate actions did you take',
      )

      .log('Input on what injuries or damage occurred a result of this incident field')
      .inputTextField(
        data.timesheet.worker.createForm.incident.injuries_damage,
        'injuries and damage of the incident',
      )

      .log('Input on Did you take any steps to minimise the chance of this incident occurring again?')
      .inputTextField(
        data.timesheet.worker.createForm.incident.steps_prevent,
        '6',
      )

      .log('Input on List details of any witnesses including contact numbers if known field?')
      .inputTextField(
        data.timesheet.worker.createForm.incident.witness,
        'enter the witnesses',
      )

      .log('Input on Who else have you notified about this incident?')
      .inputTextField(
        data.timesheet.worker.createForm.incident.already_notified,
        'band test',
      )

      .log('Select: Do you want to share the incident details with your client?')
      .clickElement(
        data.timesheet.worker.createForm.incident.show_incident_to_client,
        true,
        0,
      )
      .waitAppLoaderNotVisible()
      // Failed at step 54 there is no checkbox
      .log('Select:  If your client has a provider organisation')
      .clickElement(
        data.timesheet.worker.createForm.incident.incident_report_to_org,
        true,
        0,
      )
      .log('Click submit button')
      .clickElementOnText(
        'button',
        'Submit',
      )

      .waitAppLoaderNotVisible()

      .log('Click Close btn')
      .clickElement('mat-dialog-container button[class="primary medium"]')

      .log('Verify new timesheet')
      .wait(2000)
      .verifyTextVisible('Support hours')
      .get('body')
      .then(() => cy
        .verifyElementContainsText(
          '.table tbody tr td:nth-child(1) div span',
          clientName,
        ))
      .verifyElementContainsText(
        '.table tbody tr td div',
        ' Pending ',
      );
  });

  it('ES-T1389. Check Timesheet with Pagination', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        workerEmail,
        workerPass,
      )

      .log('Click Timesheet from the left menu')
      .navigateByLeftMenuInDashboard('Support hours')
      .checkPopupOnTimesheet()

      .log('Check Timesheet page')
      .verifyTextVisible('Support hours')
      .verifyTextVisible('Learn more')
      .verifyElementVisible('mat-paginator')

      .log('Click on the next icon')
      .clickElement('.mat-paginator-navigation-next', true)
      .verifyElementContainsText(
        'app-paginator p',
        ' Page 2 of',
      )

      .log('Click on the previous icon')
      .clickElement('.mat-paginator-navigation-previous', true)
      .verifyElementContainsText(
        'app-paginator p',
        ' Page 1 of',
      )

      .log('Click on last page icon')
      .clickElement('.mat-paginator-navigation-last')

      .log('Click on first page icon')
      .clickElement('.mat-paginator-navigation-first', true)
      .verifyElementContainsText(
        'app-paginator p',
        ' Page 1 of',
      );
  });

  it('ES-T1391. Delete Support hours - Pending status on Support hours Approved column', () => {
    cy
      .createTimesheetAsWorkerByAPI(
        workerEmail,
        workerPass,
        agreementId02,
        agreementRateId02,
      )
      .log('Login as worker')
      .loginToDashboard(
        workerEmail,
        workerPass,
      )

      .log('Click Timesheet from the left menu')
      .navigateByLeftMenuInDashboard('Support hours')
      .checkPopupOnTimesheet()

      .log('Check timesheet page')
      .verifyTextVisible('Support hours')

      .log('Click the more button on pending timesheet')
      .get('.table tbody tr td div')
      .contains('Pending')
      .parents('tr')
      .find(data.timesheet.worker.moreBtn)
      .click({ force: true })

      .log('Click the Delete btn')
      .clickElementOnText(
        'button.mat-menu-item',
        'Delete',
      )

      .log('Click the cancel btn')
      .clickElementOnText(
        'button',
        'Cancel',
      )

      .log('Click the more button on pending timesheet')
      .get('.table tbody tr td div')
      .contains('Pending')
      .parents('tr')
      .find(data.timesheet.worker.moreBtn)
      .click({ force: true })

      .log('Click the Delete btn')
      .clickElementOnText(
        'button.mat-menu-item',
        'Delete',
      )

      .log('Click the cancel btn')
      .clickElementOnText(
        'button',
        'Confirm',
      );
  });

  it('ES-T1456. Create a timesheet [Government/Org Paying Client with item list]', () => {
    const today = moment(new Date()).format('DD MMM YYYY');
    const day = moment();
    const date = day.date();
    const month = day.format('MMMM');
    const year = day.year();

    let startTime = Math.floor(Math.random() * 5 + 1);
    let endTime = startTime + 1;

    startTime = (`0${startTime}`).slice(-2);
    endTime = (`0${endTime}`).slice(-2);

    cy
      .rejectTimesheet(
        orgClientEmail,
        orgClientPass,
        workerName,
      )

      .log('Login as worker')
      .loginToDashboard(
        workerEmail,
        workerPass,
      )

      .log('Click Timesheet from the left menu')
      .navigateByLeftMenuInDashboard('Support hours')
      .checkPopupOnTimesheet()

      .log('Check Timesheet page')
      .verifyTextVisible('Support hours')
      .verifyTextVisible('Learn more')

      .log('Click Add new btn')
      .clickElementOnText(
        'button',
        'Add new',
      )
      .verifyTextVisible('Add new support hours')

      .log('Select client from client dropdown list')
      .selectDropdown(
        data.timesheet.worker.createForm.selectClient,
        orgClientName,
      )

      .log('Click on start date')
      .selectDropdown(
        data.timesheet.worker.createForm.startDateSelect,
        date.toString(),
        0,
      )
      .selectDropdown(
        data.timesheet.worker.createForm.startDateSelect,
        month,
        1,
      )
      .selectDropdown(
        data.timesheet.worker.createForm.startDateSelect,
        year.toString(),
        2,
      )

      .log('Click on hours in start day')
      .selectDropdown(
        data.timesheet.worker.createForm.startTimeSelect,
        startTime,
        0,
      )

      .log('Click on minutes in start day')
      .selectDropdown(
        data.timesheet.worker.createForm.startTimeSelect,
        '00',
        1,
      )

      .log('Click on AM/PM dropdown')
      .selectDropdown(
        data.timesheet.worker.createForm.startTimeSelect,
        'AM',
        2,
      )

      .log('Click on end date')
      .selectDropdown(
        data.timesheet.worker.createForm.endDateSelect,
        date.toString(),
        0,
      )
      .selectDropdown(
        data.timesheet.worker.createForm.endDateSelect,
        month,
        1,
      )
      .selectDropdown(
        data.timesheet.worker.createForm.endDateSelect,
        year.toString(),
        2,
      )

      .log('Click on hours in end day')
      .selectDropdown(
        data.timesheet.worker.createForm.endTimeSelect,
        endTime,
        0,
      )

      .log('Click on minutes in end day')
      .selectDropdown(
        data.timesheet.worker.createForm.endTimeSelect,
        '00',
        1,
      )

      .log('Click on AM/PM dropdown')
      .selectDropdown(
        data.timesheet.worker.createForm.endTimeSelect,
        'AM',
        2,
      )

      .log('Click on rate')
      .get(`${data.timesheet.worker.createForm.selectRate} > option:nth-child(2)`)
      .then(element => cy
        .selectDropdown(data.timesheet.worker.createForm.selectRate, element.val()))

      .clickCloseIfExist()

      .log('Add the hour in support duration')
      .inputTextFieldAtPosition(
        data.timesheet.worker.createForm.supportDurationHour,
        '1',
        0,
      )
      .log('Add the minutes in support duration')
      .inputTextFieldAtPosition(
        data.timesheet.worker.createForm.supportDurationMinute,
        '00',
        0,
      )

      .log('Add the hour in support duration')
      .inputTextFieldAtPosition(
        data.timesheet.worker.createForm.supportDurationHour,
        '0',
        1,
      )
      .log('Add the minutes in support duration')
      .inputTextFieldAtPosition(
        data.timesheet.worker.createForm.supportDurationMinute,
        '00',
        1,
      )

      .log('Add shift note')
      .inputTextField(
        data.timesheet.worker.createForm.shiftNote,
        'create new timesheet',
      )

      .log('Click No btn')
      .clickElement(
        data.timesheet.worker.createForm.incident.checkbox,
        true,
        1,
      )

      .log('Click submit button')
      .clickElementOnText(
        'button',
        'Submit',
      )

      .log('Verify the successful message is shown')
      .wait(4000)
      .verifyTextVisible('Success - your hours have been sent to')

      .log('Click Close btn')
      .clickElement('mat-dialog-container button.close')

      .log('Verify new timesheet')
      .verifyTextVisible('Support hours')
      .verifyElementContainsText(
        '.table tbody tr td div span',
        orgClientName,
      )
      .verifyElementContainsText(
        '.table tbody tr td',
        today,
      )
      .verifyElementContainsText(
        '.table tbody tr td div',
        ' Pending ',
      )
      .rejectTimesheet(
        orgClientEmail,
        orgClientPass,
        workerName,
      );
  });

  it('ES-T1392. Edit Timesheet- Pending status on Invoice sent for payment column', () => {
    cy
      .createTimesheetAsWorkerByAPI(
        workerEmail,
        workerPass,
        agreementId,
        agreementRateId,
      )

      .log('Login as worker')
      .loginToDashboard(
        workerEmail,
        workerPass,
      )

      .log('Click Timesheet from the left menu')
      .navigateByLeftMenuInDashboard('Support hours')
      .checkPopupOnTimesheet()

      .log('Check Timesheet page')
      .verifyTextVisible('Support hours')
      .verifyTextVisible('Learn more')

      .log('Click the more button on pending timesheet')
      .get('.table tbody tr td:nth-child(8) div')
      .contains('Pending')
      .parents('tr')
      .find(data.timesheet.worker.moreBtn)
      .click({ force: true })

      .log('Click the Edit btn')
      .clickElementOnText(
        'button.mat-menu-item',
        'Edit',
      )

      .log('Check edit page')
      .verifyTextVisible('Edit support hours')

      .log('Change hour of start time')
      .selectDropdown(
        data.timesheet.worker.createForm.startTimeSelect,
        '09',
        0,
      )

      .log('Change minutes of start time')
      .selectDropdown(
        data.timesheet.worker.createForm.startTimeSelect,
        '30',
        1,
      )

      .log('Change hours in end day')
      .selectDropdown(
        data.timesheet.worker.createForm.endTimeSelect,
        '11',
        0,
      )

      .log('Change minutes in end day')
      .selectDropdown(
        data.timesheet.worker.createForm.endTimeSelect,
        '10',
        1,
      )

      .log('Change rate')
      .get(`${data.timesheet.worker.createForm.selectRate} > option:nth-child(2)`)
      .then(element => cy
        .selectDropdown(data.timesheet.worker.createForm.selectRate, element.val()))
      .clickOkIfExist()

      .log('Change shift note')
      .inputTextField(
        data.timesheet.worker.createForm.shiftNote,
        'update timesheet',
      )

      .log('Click update')
      .clickElementOnText(
        'button',
        'Update',
      )

      .log('Check Timesheet page')
      .verifyTextVisible('Support hours')
      .verifyTextVisible('Learn more')

      .rejectTimesheet(
        clientEmail,
        clientPass,
        workerName,
      );
  });

  it('ES-T1458. Edit Timesheet- Pending status on Timesheet Approved column', () => {
    cy
      .createTimesheetAsWorkerByAPI(
        workerEmail,
        workerPass,
        agreementId,
        agreementRateId,
      )
      .log('Login as worker')
      .loginToDashboard(
        workerEmail,
        workerPass,
      )

      .log('Click Timesheet from the left menu')
      .navigateByLeftMenuInDashboard('Support hours')
      .checkPopupOnTimesheet()

      .log('Check Timesheet page')
      .verifyTextVisible('Support hours')
      .verifyTextVisible('Learn more')

      .log('Click the more button on pending timesheet')
      .get('body')
      .then($body => {
        if ($body.find('.table tbody tr td:nth-child(8) div:contains("Pending")').length > 0) {
          cy
            .get('.table tbody tr td:nth-child(8) div')
            .contains('Pending')
            .parents('tr')
            .find(data.timesheet.worker.moreBtn)
            .click({ force: true })

            .log('Click the Edit btn')
            .clickElementOnText(
              'button.mat-menu-item',
              'Edit',
            )

            .log('Check edit page')
            .wait(2000)
            .verifyTextVisible('Edit support hours')

            .log('Change hour of start time')
            .selectDropdown(
              data.timesheet.worker.createForm.startTimeSelect,
              '06',
              0,
            )

            .log('Change minutes of start time')
            .selectDropdown(
              data.timesheet.worker.createForm.startTimeSelect,
              '00',
              1,
            )

            .log('Change hours in end day')
            .selectDropdown(
              data.timesheet.worker.createForm.endTimeSelect,
              '07',
              0,
            )

            .log('Change minutes in end day')
            .selectDropdown(
              data.timesheet.worker.createForm.endTimeSelect,
              '00',
              1,
            )

            .wait(2000)
            .clickCloseIfExist()
            .clickCloseIfExist()

            .log('Change shift note')
            .inputTextField(
              data.timesheet.worker.createForm.shiftNote,
              'update timesheet',
            )

            .log('Click update')
            .clickElementOnText(
              'button',
              'Update',
            )

            .log('Check Timesheet page')
            .verifyTextVisible('Support hours')
            .verifyTextVisible('Learn more');

          // .rejectTimesheet(
          //   clientEmail,
          //   clientPass,
          //   workerName,
          // );
        }
      });
  });

  it('ES-T1461. [Super Admin] Edit Timesheet with Pending status on Invoice sent for payment column', () => {
    const day = moment(new Date()).subtract(1, 'day').format('DD MMM YYYY');

    let hour = Math.floor(Math.random() * (11 - 6 + 1) + 6);
    hour = (`0${hour}`).slice(-2);
    cy
      .createNDISTimesheetByAPI(
        workerEmail,
        workerPass,
        orgAgrId,
        orgAgrRateId,
        hour,
        hour,
        day,
      ).then((res) => {
        if (res.status === 200) {
          const timesheetId = res.body.data.createTimesheet.timesheet.id;
          cy
            .approvedTimesheetById(
              orgClientEmail,
              orgClientPass,
              timesheetId,
            );
        }
      })

      .log('Login as admin')
      .loginToDashboard(
        adminEmail,
        adminPass,
      )

      .log('Search worker')
      .inputTextField(
        data.admin.searchInput,
        workerName,
      )
      .clickElement(data.admin.searchBtn)

      .wait(2000)
      .clickElementOnText(
        '.actions a',
        'Login as',
      )

      .log('Click Timesheet from the left menu')
      .navigateByLeftMenuInDashboard('Support hours')
      .checkPopupOnTimesheet()

      .log('Click the more button on pending timesheet')
      .get('body')
      .then($body => {
        if ($body.find('.table tbody tr td:nth-child(9) div:contains("Pending)').length > 0) {
          cy
            .get('.table tbody tr td:nth-child(9) div')
            .contains('Pending')
            .parents('tr')
            .find(data.timesheet.worker.moreBtn)
            .click({ force: true })

            .log('Click the Edit btn')
            .clickElementOnText(
              'button.mat-menu-item',
              'Edit',
            )

            .log('Check edit page')
            .verifyTextVisible('Edit support hours')

            .wait(2000)
            .ClickCloseIfExist()
            .ClickCloseIfExist()

            .log('Change shift note')
            .inputTextField(
              data.timesheet.worker.createForm.shiftNote,
              'update timesheet',
            )

            .log('Click update')
            .clickElementOnText(
              'button',
              'Update',
            )

            .log('Login as admin')
            .clickElementOnText(
              'header button',
              'Login as Admin',
            )

            .log('Search client')
            .inputTextField(
              data.admin.searchInput,
              orgClientName,
            )

            .clickElement(data.admin.searchBtn)

            .wait(2000)
            .clickElementOnText(
              '.actions a',
              'Login as',
            )

            .log('Click Timesheet from the left menu')
            .navigateByLeftMenuInDashboard('Support hours')

            .log('Check Timesheet page')
            .verifyTextVisible('Support hours')
            .verifyTextVisible('Shifts to approve')
            .verifyTextVisible('Approved / rejected sessions')

            .log('Check Approve/Rejected section')
            .verifyElementContainsText(
              data.timesheet.client.approveSession.workerName,
              workerName,
            );
        }
      });
  });

  it('ES-T1462. [Super Admin] Edit Timesheet with Pending status on Timesheet Approved column', () => {
    cy
      .createTimesheetAsWorkerByAPI(
        workerEmail,
        workerPass,
        agreementId,
        agreementRateId,
        11,
        11,
      )

      .log('Login as admin')
      .loginToDashboard(
        adminEmail,
        adminPass,
      )

      .log('Search worker')
      .inputTextField(
        data.admin.searchInput,
        workerName,
      )
      .clickElement(data.admin.searchBtn)

      .wait(2000)
      .clickElementOnText(
        '.actions a',
        'Login as',
      )

      .log('Click Timesheet from the left menu')
      .navigateByLeftMenuInDashboard('Support hours')
      .checkPopupOnTimesheet()

      .log('Click the more button on pending timesheet')
      .get('body')
      .then($body => {
        if ($body.find('.table tbody tr td:nth-child(8) div:contains("Pending)').length > 0) {
          cy
            .get('.table tbody tr td:nth-child(8) div')
            .contains('Pending')
            .parents('tr')
            .find(data.timesheet.worker.moreBtn)
            .click({ force: true })

            .log('Click the Edit btn')
            .clickElementOnText(
              'button.mat-menu-item',
              'Edit',
            )
            .log('Check edit page')
            .verifyTextVisible('Edit support hours')

            .log('Select client from client dropdown list')
            .selectDropdown(
              data.timesheet.worker.createForm.selectClient,
              clientName02,
            )
            .log('Change hour of start time')
            .selectDropdown(
              data.timesheet.worker.createForm.startTimeSelect,
              '12',
              0,
            )

            .log('Change minutes of start time')
            .selectDropdown(
              data.timesheet.worker.createForm.startTimeSelect,
              '00',
              1,
            )

            .log('Change hours in end day')
            .selectDropdown(
              data.timesheet.worker.createForm.endTimeSelect,
              '12',
              0,
            )

            .log('Change minutes in end day')
            .selectDropdown(
              data.timesheet.worker.createForm.endTimeSelect,
              '30',
              1,
            )

            .log('Click on rate')
            .get(`${data.timesheet.worker.createForm.selectRate} > option:nth-child(2)`)
            .then(element => cy
              .selectDropdown(data.timesheet.worker.createForm.selectRate, element.val()))

            .ClickCloseIfExist()

            .wait(2000)
            .ClickCloseIfExist()
            .ClickCloseIfExist()

            .inputTextField(
              data.timesheet.worker.createForm.shiftNote,
              'update timesheet',
            )

            .log('Click update')
            .clickElementOnText(
              'button',
              'Update',
            )

            .log('Login as admin')
            .clickElementOnText(
              'header button',
              'Login as Admin',
            )

            .log('Search client')
            .inputTextField(
              data.admin.searchInput,
              clientName02,
            )
            .clickElement(data.admin.searchBtn)

            .wait(2000)
            .clickElementOnText(
              '.actions a',
              'Login as',
            )

            .log('Click Timesheet from the left menu')
            .navigateByLeftMenuInDashboard('Support hours')

            .log('Check Timesheet page')
            .verifyTextVisible('Support hours')
            .verifyTextVisible('Shifts to approve')
            .verifyTextVisible('Approved / rejected sessions')

            .log('Check Approve/Rejected section')
            .verifyElementContainsText(
              data.timesheet.client.approveSession.workerName,
              workerName,
            )

            .rejectTimesheet(
              clientEmail02,
              clientPass02,
              workerName,
            );
        }
      });
  });

  it('ES-T1463. [Super Admin] Delete Timesheet- Pending status on Timesheet Approved column', () => {
    cy
      .createTimesheetAsWorkerByAPI(
        workerEmail,
        workerPass,
        agreementId,
        agreementRateId,
        '09',
        '09',
      )

      .log('Login as admin')
      .loginToDashboard(
        adminEmail,
        adminPass,
      )

      .log('Search worker')
      .inputTextField(
        data.admin.searchInput,
        workerName,
      )
      .clickElement(data.admin.searchBtn)

      .wait(2000)
      .clickElementOnText(
        '.actions a',
        'Login as',
      )

      .log('Click Timesheet from the left menu')
      .navigateByLeftMenuInDashboard('Support hours')
      .checkPopupOnTimesheet()

      .log('Click the more button on pending timesheet')
      .get('.table tbody tr td div')
      .contains('Pending')
      .parents('tr')
      .find(data.timesheet.worker.moreBtn)
      .click({ force: true })

      .log('Click the Delete btn')
      .clickElementOnText(
        'button.mat-menu-item',
        'Delete',
      )

      .log('Click the cancel btn')
      .clickElementOnText(
        'button',
        'Cancel',
      )

      .log('Click the more button on pending timesheet')
      .get('body')
      .then($body => {
        if ($body.find('.table tbody tr td:nth-child(8) div:contains("Pending)').length > 0) {
          cy
            .get('.table tbody tr td div')
            .contains('Pending')
            .parents('tr')
            .find(data.timesheet.worker.moreBtn)
            .click({ force: true })

            .log('Click the Delete btn')
            .clickElementOnText(
              'button.mat-menu-item',
              'Delete',
            )

            .log('Click the cancel btn')
            .clickElementOnText(
              'button',
              'Confirm',
            );
        }
      });
  });
});
