import * as data from '../../fixtures/test-data.json';

describe('Client Onboarding', () => {
  beforeEach(() => {
    cy.visit('/').byPassAuthen();
  });

  it('ES-T2074.2 Check payment details: Government fund - Home Care Package with Requested/Active Agreement', () => {
    const clientEmail = 'automation_diane.activeagreement.hcp+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginToDashboard(clientEmail, clientPass)

      .log('Click Account btn')
      .clickElementOnText('.editProfile span', 'Account')

      .log('Go to the Personal Details')
      .clickElementOnText('.subMenu span', 'Payment details')
      .verifyTextVisible('Payment details')

      .log(
        'Click "Yes" on Are you using government funding to pay for this support?',
      )
      .get(`.checked ${data.clientOnboarding.payment.has_govt_funding}`)
      .parents('.checked')
      .find('span.radioLabel')
      .then(($el) => {
        if ($el.text === 'No') {
          cy.clickElementOnText('.radioBtn span.radioLabel', 'Yes');
        }
      })

      .log('Click "NDIS" on What type of funding?')
      .get('.checked input[formcontrolname="funding_source_id"]')
      .parents('.checked')
      .find('span.radioLabel')
      .then(($el) => {
        if ($el.text !== 'Home Care Package') {
          cy.clickElementOnText(
            '.radioBtn span.radioLabel',
            'Home Care Package',
          );
        }
      })

      .log('Input Home Care Package Provider')
      .inputTextField(data.clientOnboarding.payment.homeCareInput, 'QA Homes')
      .clickElement('.suggestions .listOption')

      .log('Input any character in Invoice reference')
      .inputTextField(data.clientOnboarding.payment.invoicesInput, '2355Ahfyf')

      .log('Clear the value in Invoice reference')
      .clearTextField(data.clientOnboarding.payment.invoicesInput)

      .log("Input the field on Main recipient's email addrees")
      .inputTextField(
        data.clientOnboarding.payment.mainRecipientInput,
        'toan.test@gmail.com',
      )

      .inputTextField(
        data.clientOnboarding.payment.additionalRecipient,
        'toan.test123@gmail.com',
      )

      .log('Clear the two emails inputted on the Recipient email 1 and 2')
      .clearTextField(data.clientOnboarding.payment.mainRecipientInput)
      .clearTextField(data.clientOnboarding.payment.additionalRecipient)

      .log('Click Submit btn')
      .clickElementOnText('button span', 'Submit')

      .verifyElementVisible('h2', 'Nice one!')
      .verifyElementContainsText('h2 span', 'Account details sent for verification')
      .verifyElementContainsText(
        'mat-dialog-actions button',
        'Complete profile',
      );
  });

  it('ES-T2072. Account verification: Pre-approval with an account holder- Personal details', () => {
    const clientEmail = 'automation_lisa+guardian@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginToDashboard(clientEmail, clientPass)

      .log('Click Account btn')
      .clickElementOnText('.editProfile span', 'Account')
      .verifyTextVisible('personal details')
      .verifyTextVisible('The person receiving support')

      .log('Click Add person')
      .clickElementOnText(
        '.managePerson button span',
        'Add person to manage your account',
      )

      .log('Input first name')
      .inputTextField(
        data.clientOnboarding.personal.participant.firstName,
        'Jojo',
      )

      .log('Input last name')
      .inputTextField(
        data.clientOnboarding.personal.participant.lastName,
        'Sogoni',
      )

      .log('Input Preferred name')
      .inputTextField(
        data.clientOnboarding.personal.participant.preferredName,
        'toan test',
      )

      .log('Select gender')
      .clickElementOnText('.radioLabel', 'Male')

      .log('Input Date of birth')
      .selectDropdown(
        data.clientOnboarding.personal.participant.birthDate,
        '17',
        0,
      )
      .selectDropdown(
        data.clientOnboarding.personal.participant.birthDate,
        'January',
        1,
      )
      .selectDropdown(
        data.clientOnboarding.personal.participant.birthDate,
        '2020',
        2,
      )
      .verifyTextVisible(
        "Jojo is under 18 so check workers' profiles to make sure they have a Working with Children Check.",
      )

      .selectDropdown(
        data.clientOnboarding.personal.participant.birthDate,
        '1996',
        2,
      )
      .verifyTextNotExist(
        "Jojo is under 18 so check workers' profiles to make sure they have a Working with Children Check.",
      )

      .log('Input Contact Phone')
      .inputTextField(
        data.clientOnboarding.personal.participant.contactPhone,
        '0436458885',
      )

      .log('Input address')
      .inputTextField(data.clientOnboarding.personal.address, '1st')

      .log('Input postcode')
      .inputTextField(data.clientOnboarding.personal.postcode, '2000')
      .clickElementOnText('.suggestions div', 'Barangaroo')

      .log('Verify the link "What is a behaviour support plan?" is visible')
      .verifyTextVisible('What’s a behaviour support plan?')

      .log('Select option in "Behaviour support plan" dropdown')
      .selectDropdown(data.clientOnboarding.personal.plan, 'No')
      .selectDropdown(
        data.clientOnboarding.personal.plan,
        'Yes, and it does involve restrictive practices',
      )
      .verifyTextVisible("We aren't able to provide service")
      .clickElementOnText('mat-dialog-actions button', 'OK, got it')

      .log('Verify Account holder information')
      .selectDropdown(
        data.clientOnboarding.personal.manage.relationship,
        'Legal Representative / Advocate',
      )

      .log('Input first name')
      .inputTextField(data.clientOnboarding.personal.manage.firstName, 'Lisa')

      .log('Input last name')
      .inputTextField(data.clientOnboarding.personal.manage.lastName, 'Sogoni')

      .log('Input Contact Phone')
      .inputTextField(
        data.clientOnboarding.personal.manage.contactPhone,
        '0436458885',
      )

      .log('Input Date of birth')
      .selectDropdown(data.clientOnboarding.personal.manage.birthDate, '20', 0)
      .selectDropdown(data.clientOnboarding.personal.manage.birthDate, 'May', 1)
      .selectDropdown(
        data.clientOnboarding.personal.manage.birthDate,
        '2020',
        2,
      )
      .verifyTextVisible('You must be 18 to manage this account.')

      .selectDropdown(
        data.clientOnboarding.personal.manage.birthDate,
        '1996',
        2,
      )
      .verifyTextNotExist('You must be 18 to manage this account.')

      .log('Click the toggle on "Primary emergency contact"')
      .clickElement('.mat-slide-toggle-bar input', true)

      .log('Verify the link "Mable is privacy policy"')
      .verifyTextVisible('Mable’s privacy policy')

      .log('Click Remove this person btn')
      .clickElementOnText('button span', 'Remove this person')
      .verifyTextVisible('Remove this person managing this account?')
      .log('Click Cancel btn')
      .clickElementOnText('mat-dialog-actions button', 'Cancel')

      .log('Click Remove this person btn')
      .clickElementOnText('button span', 'Remove this person')
      .verifyTextVisible('Remove this person managing this account?')
      .log('Click Cancel btn')
      .clickElementOnText('mat-dialog-actions button', 'Remove person')

      .log('Click Save and continue btn')
      .clickElementOnText('button span', 'Save and continue')
      .verifyTextVisible('My contacts')
      .verifyTextVisible(
        'Add up to 4 contacts that support you as emergency contacts or authorised to receive information.',
      );
  });

  it('ES-T2666. Account verification: Pre-approval -Participant managed - Check Personal details', () => {
    const clientEmail = 'automation_nelson.participantmanaged+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginToDashboard(clientEmail, clientPass)

      .log('Click Account btn')
      .clickElementOnText('.editProfile span', 'Account')
      .verifyTextVisible('personal details')
      .verifyTextVisible('The person receiving support')

      .log('Input first name')
      .inputTextField(
        data.clientOnboarding.personal.participant.firstName,
        'Nelson',
      )

      .log('Input last name')
      .inputTextField(
        data.clientOnboarding.personal.participant.lastName,
        'Mandela',
      )

      .log('Input Preferred name')
      .inputTextField(
        data.clientOnboarding.personal.participant.preferredName,
        'toan test',
      )

      .log('Select gender')
      .clickElementOnText('.radioLabel', 'Male')

      .log('Input Date of birth')
      .selectDropdown(
        data.clientOnboarding.personal.participant.birthDate,
        '21',
        0,
      )
      .selectDropdown(
        data.clientOnboarding.personal.participant.birthDate,
        'January',
        1,
      )
      .selectDropdown(
        data.clientOnboarding.personal.participant.birthDate,
        '2020',
        2,
      )
      .verifyTextVisible('You must be 18 to manage this account.')

      .selectDropdown(
        data.clientOnboarding.personal.participant.birthDate,
        '1996',
        2,
      )
      .verifyTextNotExist('You must be 18 to manage this account.')

      .log('Input Contact Phone')
      .inputTextField(
        data.clientOnboarding.personal.participant.contactPhone,
        '0436458885',
      )

      .log('Input address')
      .inputTextField(data.clientOnboarding.personal.address, '1st')

      .log('Input postcode')
      .inputTextField(data.clientOnboarding.personal.postcode, '2000')
      .clickElementOnText('.suggestions div', 'Barangaroo')

      .log('Verify the link "What is a behaviour support plan?" is visible')
      .verifyTextVisible('What’s a behaviour support plan?')

      .log('Select option in "Behaviour support plan" dropdown')
      .selectDropdown(data.clientOnboarding.personal.plan, 'No')

      .selectDropdown(
        data.clientOnboarding.personal.plan,
        'Yes, and it does involve restrictive practices',
      )
      .verifyTextVisible("We aren't able to provide service")
      .verifyTextVisible('NDIS Quality and Safeguard Commission website')
      .clickElementOnText('mat-dialog-actions button', 'OK, got it')

      .log('Click Save and continue btn')
      .clickElementOnText('button span', 'Save and continue')

      .log('Click Personal details item')
      .clickElementOnText('ul.subMenu li span', 'Personal details')

      .log('Click Add person to manage your account btn')
      .clickElementOnText('button span', 'Add person to manage your account')

      .log('Click login and password details"')
      .clickElementOnText('a', 'login and password details.')
      .verifyTextVisible('Login details')

      .log('Click Personal details item')
      .clickElementOnText('ul.subMenu li span', 'Personal details')

      .log('Click Add person to manage your account btn')
      .clickElementOnText('button span', 'Add person to manage your account')

      .log('Verify the link "What is a behaviour support plan?" is visible')
      .verifyTextVisible('What’s a behaviour support plan?')

      .log('Select relationship')
      .selectDropdown(
        data.clientOnboarding.personal.manage.relationship,
        'Legal Representative / Advocate',
      )

      .log('Input first name')
      .inputTextField(data.clientOnboarding.personal.manage.firstName, 'Lisa')

      .log('Input last name')
      .inputTextField(data.clientOnboarding.personal.manage.lastName, 'Sogoni')

      .log('Input Contact Phone')
      .inputTextField(
        data.clientOnboarding.personal.manage.contactPhone,
        '0436458885',
      )

      .log('Input Date of birth')
      .selectDropdown(data.clientOnboarding.personal.manage.birthDate, '20', 0)
      .selectDropdown(data.clientOnboarding.personal.manage.birthDate, 'May', 1)
      .selectDropdown(
        data.clientOnboarding.personal.manage.birthDate,
        '2020',
        2,
      )
      .verifyTextVisible('You must be 18 to manage this account.')

      .log('Click the toggle on "Primary emergency contact"')
      .clickElement('.mat-slide-toggle-bar input', true)

      .log('Verify the Mable`s privacy policy')
      .verifyTextVisible('Mable’s privacy policy')

      .log('Click Remove this person btn')
      .clickElementOnText('button span', 'Remove this person')
      .verifyTextVisible('Remove this person managing this account?')
      .log('Click Cancel btn')
      .clickElementOnText('mat-dialog-actions button', 'Cancel')

      .log('Click Remove this person btn')
      .clickElementOnText('button span', 'Remove this person')
      .verifyTextVisible('Remove this person managing this account?')
      .log('Click Cancel btn')
      .clickElementOnText('mat-dialog-actions button', 'Remove person')

      .log('Click Save and continue btn')
      .clickElementOnText('button span', 'Save and continue')
      .verifyTextVisible('My contacts')
      .verifyTextVisible(
        'Add up to 4 contacts that support you as emergency contacts or authorised to receive information.',
      );
  });

  it('ES-T2701. Check of Back button', () => {
    const clientEmail = 'automation_gio.backbutton+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginToDashboard(clientEmail, clientPass)

      .log('Click Account btn')
      .clickElementOnText('.editProfile span', 'Account')
      .verifyTextVisible('personal details')
      .verifyTextVisible('The person receiving support')

      .log('Click the Back to dashboard')
      .clickElementOnText('app-back-button span', 'Back to dashboard')

      .log('Navigate to')
      .navigateByLeftMenuInDashboard('Search workers')

      .log('Click Account btn')
      .clickElementOnText('.editProfile span', 'Account')
      .verifyTextVisible('personal details')
      .verifyTextVisible('The person receiving support')

      .log('Click the Back to dashboard')
      .clickElementOnText('app-back-button span', 'Back to dashboard')

      .log('Navigate to')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Click Account btn')
      .clickElementOnText('.editProfile span', 'Account')
      .verifyTextVisible('personal details')
      .verifyTextVisible('The person receiving support')

      .log('Click the Back to dashboard')
      .clickElementOnText('app-back-button span', 'Back to dashboard')

      .log('Navigate to')
      .navigateByLeftMenuInDashboard('Support hours')

      .log('Click Account btn')
      .clickElementOnText('.editProfile span', 'Account')
      .verifyTextVisible('personal details')
      .verifyTextVisible('The person receiving support')

      .log('Click the Back to dashboard')
      .clickElementOnText('app-back-button span', 'Back to dashboard')

      .log('Navigate to')
      .navigateByLeftMenuInDashboard('Inbox')

      .log('Click Account btn')
      .clickElementOnText('.editProfile span', 'Account')
      .verifyTextVisible('personal details')
      .verifyTextVisible('The person receiving support')

      .log('Click the Back to dashboard')
      .clickElementOnText('app-back-button span', 'Back to dashboard')

      .log('Navigate to')
      .navigateByLeftMenuInDashboard('My support workers')

      .log('Click Account btn')
      .clickElementOnText('.editProfile span', 'Account')
      .verifyTextVisible('personal details')
      .verifyTextVisible('The person receiving support')

      .log('Click the Back to dashboard')
      .clickElementOnText('app-back-button span', 'Back to dashboard')

      .log('Navigate to')
      .navigateByLeftMenuInDashboard('Invite workers')

      .log('Click Account btn')
      .clickElementOnText('.editProfile span', 'Account')
      .verifyTextVisible('personal details')
      .verifyTextVisible('The person receiving support')

      .log('Click the Back to dashboard')
      .clickElementOnText('app-back-button span', 'Back to dashboard')

      .log('Navigate to')
      .navigateByLeftMenuInDashboard('Shortlist')

      .log('Click Account btn')
      .clickElementOnText('.editProfile span', 'Account')
      .verifyTextVisible('personal details')
      .verifyTextVisible('The person receiving support')

      .log('Click the Back to dashboard')
      .clickElementOnText('app-back-button span', 'Back to dashboard')

      .log('Navigate to')
      .navigateByLeftMenuInDashboard('Billing')

      .log('Click Account btn')
      .clickElementOnText('.editProfile span', 'Account')
      .verifyTextVisible('personal details')
      .verifyTextVisible('The person receiving support')

      .log('Click the Back to dashboard')
      .clickElementOnText('app-back-button span', 'Back to dashboard')

      .log('Navigate to')
      .navigateByLeftMenuInDashboard('Notes')

      .log('Click Account btn')
      .clickElementOnText('.editProfile span', 'Account')
      .verifyTextVisible('personal details')
      .verifyTextVisible('The person receiving support')

      .log('Click the Back to dashboard')
      .clickElementOnText('app-back-button span', 'Back to dashboard');
  });

  it('ES-T2680. Check Profile: About Participant', () => {
    const clientEmail = 'automation_miguel.profile+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';
    const participant = 'Miguel';

    cy.log('Login')
      .loginToDashboard(clientEmail, clientPass)

      .log('Click Account btn')
      .clickElementOnText('.editProfile span', 'Account')
      .verifyTextVisible('personal details')
      .verifyTextVisible('The person receiving support')

      .log(`Click About ${participant} of participant`)
      .clickElementOnText('.subMenu a span', 'About Miguel')

      .log('Toggle the interest and hobbies')
      .clickElementOnText(
        data.clientOnboarding.about.expandPanel,
        'Interests and hobbies',
      )

      .log('Select cooking')
      .verifyStatusCheckbox('Cooking')
      .then((value) => {
        console.log('tesst', value);
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label span',
            'Cooking',
          );
        }
      })

      .log('Uncheck cooking')
      .clickElementOnText(
        'mat-checkbox span.mat-checkbox-label span',
        'Cooking',
      )
      .wait(2000)
      .verifyStatusCheckbox('Cooking')
      .then((value) => expect(value).to.equal('false'))

      .log('Select Pets')
      .verifyStatusCheckbox('Pets')
      .then((value) => {
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label span',
            'Pets',
          );
        }
      })

      .log('Uncheck Pets')
      .clickElementOnText('mat-checkbox span.mat-checkbox-label span', 'Pets')
      .wait(2000)
      .verifyStatusCheckbox('Pets')
      .then((value) => expect(value).to.equal('false'))

      .log('Select Gardening')
      .verifyStatusCheckbox('Gardening')
      .then((value) => {
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label span',
            'Gardening',
          );
        }
      })

      .log('Uncheck Gardening')
      .clickElementOnText(
        'mat-checkbox span.mat-checkbox-label span',
        'Gardening',
      )
      .wait(2000)
      .verifyStatusCheckbox('Gardening')
      .then((value) => expect(value).to.equal('false'))

      .log('Select Photography / Art')
      .verifyStatusCheckbox('Photography / Art')
      .then((value) => {
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label span',
            'Photography / Art',
          );
        }
      })

      .log('Uncheck Photography / Art')
      .clickElementOnText(
        'mat-checkbox span.mat-checkbox-label span',
        'Photography / Art',
      )
      .wait(2000)
      .verifyStatusCheckbox('Photography / Art')
      .then((value) => expect(value).to.equal('false'))

      .log('Select Indoor Games / Puzzles')
      .verifyStatusCheckbox('Indoor Games / Puzzles')
      .then((value) => {
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label span',
            'Indoor Games / Puzzles',
          );
        }
      })

      .log('Uncheck Indoor Games / Puzzles')
      .clickElementOnText(
        'mat-checkbox span.mat-checkbox-label span',
        'Indoor Games / Puzzles',
      )
      .wait(2000)
      .verifyStatusCheckbox('Indoor Games / Puzzles')
      .then((value) => expect(value).to.equal('false'))

      .log('Select Travel')
      .verifyStatusCheckbox('Travel')
      .then((value) => {
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label span',
            'Travel',
          );
        }
      })

      .log('Uncheck Travel')
      .clickElementOnText('mat-checkbox span.mat-checkbox-label span', 'Travel')
      .wait(2000)
      .verifyStatusCheckbox('Travel')
      .then((value) => expect(value).to.equal('false'))

      .log('Select Other')
      .verifyStatusCheckbox('Other')
      .then((value) => {
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label span',
            'Other',
          );
        }
      })

      .log('Uncheck Other')
      .clickElementOnText('mat-checkbox span.mat-checkbox-label span', 'Other')
      .wait(2000)
      .verifyStatusCheckbox('Other')
      .then((value) => expect(value).to.equal('false'))

      .log('Click all the button under the Interest and hobbies')
      .verifyStatusCheckbox('Cooking')
      .then((value) => {
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label span',
            'Cooking',
          );
        }
      })

      .verifyStatusCheckbox('Movies')
      .then((value) => {
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label span',
            'Movies',
          );
        }
      })

      .verifyStatusCheckbox('Reading')
      .then((value) => {
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label span',
            'Reading',
          );
        }
      })

      .verifyStatusCheckbox('Pets')
      .then((value) => {
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label span',
            'Cultural Festivities',
          );
        }
      })

      .verifyStatusCheckbox('Music')
      .then((value) => {
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label span',
            'Music',
          );
        }
      })

      .verifyStatusCheckbox('Sport')
      .then((value) => {
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label span',
            'Sports',
          );
        }
      })

      .verifyStatusCheckbox('Gardening')
      .then((value) => {
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label span',
            'Gardening',
          );
        }
      })

      .verifyStatusCheckbox('Pets')
      .then((value) => {
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label span',
            'Pets',
          );
        }
      })

      .verifyStatusCheckbox('Travel')
      .then((value) => {
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label span',
            'Travel',
          );
        }
      })

      .verifyStatusCheckbox('Other')
      .then((value) => {
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label span',
            'Other',
          );
        }
      })

      .log('Toggle the Languages')
      .clickElementOnText(data.clientOnboarding.about.expandPanel, 'Languages')

      .log('Select Arabic')
      .verifyStatusCheckbox('Arabic')
      .then((value) => {
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label span',
            'Arabic',
          );
        }
      })

      .log('Uncheck Arabic')
      .clickElementOnText('mat-checkbox span.mat-checkbox-label span', 'Arabic')
      .wait(2000)
      .verifyStatusCheckbox('Arabic')
      .then((value) => expect(value).to.equal('false'))

      .log('Select English')
      .verifyStatusCheckbox('English')
      .then((value) => {
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label span',
            'English',
          );
        }
      })

      .log('Uncheck English')
      .clickElementOnText(
        'mat-checkbox span.mat-checkbox-label span',
        'English',
      )
      .wait(2000)
      .verifyStatusCheckbox('English')
      .then((value) => expect(value).to.equal('false'))

      .log('Select French')
      .verifyStatusCheckbox('French')
      .then((value) => {
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label span',
            'French',
          );
        }
      })

      .log('Uncheck French')
      .clickElementOnText('mat-checkbox span.mat-checkbox-label span', 'French')
      .wait(2000)
      .verifyStatusCheckbox('French')
      .then((value) => expect(value).to.equal('false'))

      .log('Select Other')
      .verifyStatusCheckbox('Other')
      .then((value) => {
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label span',
            'Other',
          );
        }
      })

      .log('Uncheck Other')
      .clickElementOnText('mat-checkbox span.mat-checkbox-label span', 'Other')
      .wait(2000)
      .verifyStatusCheckbox('Other')
      .then((value) => expect(value).to.equal('false'))

      .log('Toggle the Cultural background')
      .clickElementOnText(
        data.clientOnboarding.about.expandPanel,
        'Cultural background',
      )

      .log('Select Asian')
      .verifyStatusCheckbox('Asian')
      .then((value) => {
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label span',
            'Asian',
          );
        }
      })

      .log('Uncheck Asian')
      .clickElementOnText('mat-checkbox span.mat-checkbox-label span', 'Asian')
      .wait(2000)
      .verifyStatusCheckbox('Asian')
      .then((value) => expect(value).to.equal('false'))

      .log('Select Australian')
      .verifyStatusCheckbox('Australian')
      .then((value) => {
        console.log('tesst', value);
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label span',
            'Australian',
          );
        }
      })

      .log('Uncheck Australian')
      .clickElementOnText(
        'mat-checkbox span.mat-checkbox-label span',
        'Australian',
      )
      .wait(2000)
      .verifyStatusCheckbox('Australian')
      .then((value) => expect(value).to.equal('false'))

      .log('Click the Save and continue btn')
      .clickElementOnText('button span', 'Save and continue')
      .verifyTextVisible('Support needs');
  });

  it('ES-T2682. Check Profile: Household details', () => {
    const clientEmail = 'automation_miguel.profile+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginToDashboard(clientEmail, clientPass)

      .log('Click Account btn')
      .clickElementOnText('.editProfile span', 'Account')
      .verifyTextVisible('personal details')
      .verifyTextVisible('The person receiving support')

      .log('Click Household details')
      .clickElementOnText('.subMenu a span', 'Household details')
      .verifyTextVisible('Household details')

      .log('Click Yes radio btn on Parking')
      .checkRadioOnboarding('#parkingRadioLabel', 'Yes')

      .log('Click No radio btn on Parking')
      .checkRadioOnboarding('#parkingRadioLabel', 'No')

      .log('Click Yes radio btn on Access')
      .checkRadioOnboarding('#accessRadioLabel', 'Yes')

      .log('Click No radio btn on Access')
      .checkRadioOnboarding('#accessRadioLabel', 'No')

      .log('Click Yes radio btn on Equipment')
      .checkRadioOnboarding('#equipmentRadioLabel', 'Yes')

      .log('Click No radio btn on Equipment')
      .checkRadioOnboarding('#equipmentRadioLabel', 'No')

      .log('Click Yes radio btn on smoking')
      .checkRadioOnboarding('#smokingRadioLabel', 'Yes')

      .log('Click No radio btn on smoking')
      .checkRadioOnboarding('#smokingRadioLabel', 'No')

      .log('Input Access information field')
      .inputTextField(
        data.clientOnboarding.household.accessInformation,
        'automation testing',
      )

      .log('Input Emergency response and access information')
      .inputTextField(
        data.clientOnboarding.household.emergencyInstructions,
        'automationt testing',
      )

      .log('Select Dog')
      .verifyStatusCheckbox('Dog')
      .then((value) => {
        console.log('tesst', value);
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label span',
            'Dog',
          );
        }
      })

      .log('Uncheck Dog')
      .clickElementOnText('mat-checkbox span.mat-checkbox-label span', 'Dog')
      .wait(2000)
      .verifyStatusCheckbox('Dog')
      .then((value) => expect(value).to.equal('false'))

      .log('Select Cat')
      .verifyStatusCheckbox('Cat')
      .then((value) => {
        console.log('tesst', value);
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label span',
            'Cat',
          );
        }
      })

      .log('Uncheck Dog')
      .clickElementOnText('mat-checkbox span.mat-checkbox-label span', 'Cat')
      .wait(2000)
      .verifyStatusCheckbox('Cat')
      .then((value) => expect(value).to.equal('false'))

      .log(
        'Select checkbox "I’ve inspected the place where support will take place and consider it a safe working environment for a support worker."',
      )
      .get(data.clientOnboarding.household.premisesConsideredSafe)
      .invoke('attr', 'aria-checked')
      .then((value) => {
        if (value === 'false') {
          cy.clickElement(
            data.clientOnboarding.household.premisesConsideredSafe,
          );
        }
      })

      .log('Submit form')
      .clickElementOnText('button span', 'Save and continue')
      .verifyTextVisible('Login details');
  });

  it('ES-T2681. Check Profile: Support needs', () => {
    const clientEmail = 'automation_miguel.profile+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginToDashboard(clientEmail, clientPass)

      .log('Click Account btn')
      .clickElementOnText('.editProfile span', 'Account')
      .verifyTextVisible('personal details')
      .verifyTextVisible('The person receiving support')

      .log('Click Support needs item')
      .clickElementOnText('.subMenu a span', 'Support needs')
      .verifyTextVisible('Support needs')
      .verifyTextVisible('It’s optional to create a profile. Add information here that can be shared with your support worker when you’re ready to book them.')

      .log('Check "Do you need support?" section')
      .verifyTextVisible('Do you need support in the following?')

      .log('Select Cardiac / Vascular')
      .verifyStatusCheckbox('Cardiac / Vascular')
      .then((value) => {
        console.log('tesst', value);
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label span',
            'Cardiac / Vascular',
          );
        }
      })

      .log('Select Incontinence (bladder or bowel)')
      .verifyStatusCheckbox('Incontinence (bladder or bowel)')
      .then((value) => {
        console.log('tesst', value);
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label span',
            'Incontinence (bladder or bowel)',
          );
        }
      })

      .log('Select Physical / Mobility')
      .verifyStatusCheckbox('Physical / Mobility')
      .then((value) => {
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label span',
            'Physical / Mobility',
          );
        }
      })
      .log('Uncheck Physical / Mobility')
      .clickElementOnText(
        'mat-checkbox span.mat-checkbox-label span',
        'Physical / Mobility',
      )
      .wait(2000)
      .verifyStatusCheckbox('Physical / Mobility')
      .then((value) => expect(value).to.equal('false'))

      .log('Select Psychological / Behavioural')
      .verifyStatusCheckbox('Psychological / Behavioural')
      .then((value) => {
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label span',
            'Psychological / Behavioural',
          );
        }
      })
      .log('Uncheck Psychological / Behavioural')
      .clickElementOnText(
        'mat-checkbox span.mat-checkbox-label span',
        'Psychological / Behavioural',
      )
      .wait(2000)
      .verifyStatusCheckbox('Psychological / Behavioural')
      .then((value) => expect(value).to.equal('false'))

      .log('Input the Medication name')
      .inputTextField(
        data.clientOnboarding.support.medication,
        'Medicaiton testing',
      )

      .log('Input the Dosage')
      .inputTextField(
        data.clientOnboarding.support.dosage,
        '1',
      )

      .log('Input the frequency')
      .inputTextField(
        data.clientOnboarding.support.frequency,
        '2',
      )

      .log('Input reason taken')
      .inputTextField(
        data.clientOnboarding.support.reasonTaken,
        'testing',
      )

      .log('Click Add another medication btn')
      .clickElementOnText(
        'button span',
        'Add another medication',
      )

      .log('Click Delete medication')
      .clickElement(
        '[formarrayname="medicationJson"] button',
        true,
        1,
      )

      .log('Upload file on Care plan')
      .get(data.clientOnboarding.support.carePlanUpload)
      .attachFile('debit.pdf')
      .wait(2000)

      .log('Click close icon')
      .clickElement(data.clientOnboarding.support.carePlanDelete, true)
      .verifyTextVisible('Delete File')
      .verifyTextVisible('Are you sure you want to delete file?')

      .log('Click No btn')
      .clickElementOnText(
        'mat-dialog-container button',
        'No',
      )

      .log('Click close icon')
      .clickElement(data.clientOnboarding.support.carePlanDelete, true)

      .clickElementOnText(
        'mat-dialog-container button',
        'Yes',
      )
      .verifyElementNotExist(data.clientOnboarding.support.carePlanDelete)

      .log('Upload file on GP documents')
      .get(data.clientOnboarding.support.GPUpload)
      .attachFile('debit.pdf')
      .wait(2000)

      .log('Click close icon')
      .clickElement(data.clientOnboarding.support.GPDelete, true)
      .verifyTextVisible('Delete File')
      .verifyTextVisible('Are you sure you want to delete file?')

      .log('Click No btn')
      .clickElementOnText(
        'mat-dialog-container button',
        'No',
      )

      .log('Click close icon')
      .clickElement(data.clientOnboarding.support.GPDelete, true)
      .clickElementOnText(
        'mat-dialog-container button',
        'Yes',
      )
      .verifyElementNotExist(data.clientOnboarding.support.GPDelete)

      .log('Upload file on Other document')
      .get(data.clientOnboarding.support.otherUpload)
      .attachFile('debit.pdf')
      .wait(2000)

      .log('Click close icon')
      .clickElement(data.clientOnboarding.support.otherDelete, true)
      .verifyTextVisible('Delete File')
      .verifyTextVisible('Are you sure you want to delete file?')

      .log('Click No btn')
      .clickElementOnText(
        'mat-dialog-container button',
        'No',
      )

      .log('Click close icon')
      .clickElement(data.clientOnboarding.support.otherDelete, true)
      .clickElementOnText(
        'mat-dialog-container button',
        'Yes',
      )
      .verifyElementNotExist(data.clientOnboarding.support.otherDelete)

      .log('Click the Save and continue btn')
      .clickElementOnText('button span', 'Save and continue')
      .verifyTextVisible('Household details');
  });

  it('ES-T2683. Check Settings: Login details', () => {
    const clientEmail = 'automation_miguel.profile+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    const newPass = 'qaAutomation2022';

    cy
      .log('Login')
      .loginToDashboard(clientEmail, clientPass)

      .log('Click Account btn')
      .clickElementOnText('.editProfile span', 'Account')
      .verifyTextVisible('personal details')
      .verifyTextVisible('The person receiving support')

      .log('Click Login details')
      .clickElementOnText('.subMenu a span', 'Login details')
      .verifyTextVisible('Login details')

      .log('Input the Email')
      .inputTextField(
        data.clientOnboarding.login.email,
        clientEmail,
      )

      .log('Input new password with value as a')
      .inputTextField(
        data.clientOnboarding.login.password,
        'a',
      )
      .verifyTextVisible('Use 8 characters or more for your password')

      .log('Input new password')
      .inputTextField(
        data.clientOnboarding.login.password,
        'aaaa1234',
      )
      .verifyTextVisible('Strength: Moderate')

      .log('Input new password')
      .inputTextField(
        data.clientOnboarding.login.password,
        clientPass,
      )

      .log('Input confirm password')
      .inputTextField(
        data.clientOnboarding.login.confirmPassword,
        newPass,
      )
      .verifyTextVisible("Your passwords don't match")

      .log('Input confirm password')
      .inputTextField(
        data.clientOnboarding.login.confirmPassword,
        clientPass,
      )
      .verifyTextNotExist("Your passwords don't match")

      .log('Click Save btn')
      .clickElementOnText(
        'app-email-and-password button',
        'Save',
      )
      .clickLogoutOnTopMenu()
      .loginToDashboard(clientEmail, clientPass);
  });

  it('ES-T2684. Check Settings: Notifications', () => {
    const clientEmail = 'automation_miguel.profile+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginToDashboard(clientEmail, clientPass)

      .log('Click Account btn')
      .clickElementOnText('.editProfile span', 'Account')
      .verifyTextVisible('personal details')
      .verifyTextVisible('The person receiving support')

      .log('Click Notifications')
      .clickElementOnText('.subMenu a span', 'Notifications')
      .verifyTextVisible('Notifications')
      .wait(4000)

      .log('Select I would like to receive emails about agreements.')
      .verifyStatusNotificationCheckbox('I would like to receive emails about agreements.')
      .then((value) => {
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label',
            'I would like to receive emails about agreements.',
          );
        }
      })

      .log('Uncheck')
      .clickElementOnText(
        'mat-checkbox span.mat-checkbox-label',
        'I would like to receive emails about agreements.',
      )
      .wait(2000)
      .verifyStatusNotificationCheckbox('I would like to receive emails about agreements.')
      .then((value) => expect(value).to.equal('false'))

      .log('Select I would like to receive emails about messages')
      .verifyStatusNotificationCheckbox('I would like to receive emails about messages')
      .then((value) => {
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label',
            'I would like to receive emails about messages.',
          );
        }
      })

      .log('Uncheck')
      .clickElementOnText(
        'mat-checkbox span.mat-checkbox-label',
        'I would like to receive emails about messages.',
      )
      .wait(2000)
      .verifyStatusNotificationCheckbox('I would like to receive emails about messages.')
      .then((value) => expect(value).to.equal('false'))

      .log('Select I would like to receive SMS when notifications are sent.')
      .verifyStatusNotificationCheckbox('I would like to receive SMS when notifications are sent.')
      .then((value) => {
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label',
            'I would like to receive SMS when notifications are sent.',
          );
        }
      })

      .log('Uncheck')
      .clickElementOnText(
        'mat-checkbox span.mat-checkbox-label',
        'I would like to receive SMS when notifications are sent.',
      )
      .wait(2000)
      .verifyStatusNotificationCheckbox('I would like to receive SMS when notifications are sent.')
      .then((value) => expect(value).to.equal('false'))

      .log('Select I would like to receive emails about new support workers.')
      .verifyStatusNotificationCheckbox('I would like to receive emails about new support workers.')
      .then((value) => {
        if (value === 'false') {
          cy.clickElementOnText(
            'mat-checkbox span.mat-checkbox-label',
            'I would like to receive emails about new support workers.',
          );
        }
      })

      .log('Uncheck')
      .clickElementOnText(
        'mat-checkbox span.mat-checkbox-label',
        'I would like to receive emails about new support workers.',
      )
      .wait(2000)
      .verifyStatusNotificationCheckbox('I would like to receive emails about new support workers.')
      .then((value) => expect(value).to.equal('false'))

      .log('Click Save btn')
      .clickElementOnText(
        'button',
        'Save',
      )
      .wait(4000)
      .verifyStatusNotificationCheckbox('I would like to receive emails about new support workers.')
      .then((value) => expect(value).to.equal('false'))

      .verifyStatusNotificationCheckbox('I would like to receive SMS when notifications are sent.')
      .then((value) => expect(value).to.equal('false'))

      .verifyStatusNotificationCheckbox('I would like to receive emails about messages.')
      .then((value) => expect(value).to.equal('false'));
  });
});
