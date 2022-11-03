/* eslint-disable camelcase */
import * as data from '../../fixtures/test-data.json';
import faker from 'faker/locale/en_AU';

describe('Client Onboarding', () => {
  beforeEach(() => {
    cy.visit('/').byPassAuthen();
  });

  it('ES-T2706. Check the Pre-fill info', () => {
    const {
      account_type_title,
      account_type_lsBox,
      participant_relationship_title,
      participant_relationship_lsBox,
      age_gate_title,
      age_gate_lsBox,
      suburb_title,
      type_of_care_title,
      type_of_care_lsBox,
      payment_title,
      payment_lsBox,
      ndis_title,
      ndis_lsBox,
      // urgency_of_care_title,
      // urgency_of_care_lsbox,
      hours_title,
      hours_lsbox,
      detail_title,
      review_title,
      review_checkbox,
      href,
      // dashboard_title,
      alertCheckBox,
      detailsData,
    } = data.signupData;

    detailsData.firstName = faker.name.firstName();
    detailsData.participantFirstName = faker.name.firstName();
    detailsData.lastName = faker.name.lastName();
    detailsData.participantLastName = faker.name.lastName();
    detailsData.phone = '0491570110';
    detailsData.email = faker.internet.email().toLowerCase();
    detailsData.password = 'qaAutomation2021';
    detailsData.postcode = '2000';

    // const clientEmail = 'automation_vivian.otherfunding+client@donotuse.com.au';
    // const clientPass = 'qaAutomation2021';

    cy
      .log('Click "Sign up here" btn')
      .clickElement('#content a[href="/register"]')
      .log('Verify user navigate to registration page')
      .verifyCurrentURL('register')

      .verifyListBoxText(account_type_title)
      .verifyListBoxText(account_type_lsBox)

      .log(`Click on ${account_type_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', account_type_lsBox[0])

      .verifyListBoxText(participant_relationship_title)
      .verifyListBoxText(participant_relationship_lsBox)

      .log(`Click on ${participant_relationship_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', participant_relationship_lsBox[0])

      .verifyListBoxText(age_gate_title)
      .verifyListBoxText(age_gate_lsBox)

      .log(`Click on ${age_gate_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', age_gate_lsBox[0])

      .verifyListBoxText(suburb_title)
      .inputTextField(data.signup.worker.postcodeInput, detailsData.postcode)
      .clickElement(data.signup.worker.optionSuburb, true, 0)

      .verifySuburbTextbox(detailsData.postcode)

      .log('Click Next btn')
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(type_of_care_title)
      .verifyListBoxText(type_of_care_lsBox)

      .log(`Click on ${type_of_care_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', type_of_care_lsBox[0])

      .verifyListBoxText(payment_title)
      .verifyListBoxText(payment_lsBox)

      .log(`Click on ${payment_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', payment_lsBox[0])

      .verifyListBoxText(ndis_title)
      .verifyListBoxText(ndis_lsBox)

      .log(`Click on ${ndis_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', ndis_lsBox[0])

      // .verifyListBoxText(urgency_of_care_title)
      // .verifyListBoxText(urgency_of_care_lsbox)
      // .log(`click on ${urgency_of_care_lsbox[0]}`)
      // .clickElementOnTextNoWaitNoPosition('button span', urgency_of_care_lsbox[0])
      .verifyListBoxText(hours_title)
      .verifyListBoxText(hours_lsbox)

      .log(`Click on ${hours_lsbox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', hours_lsbox[0])

      .verifyListBoxText(detail_title)

      .inputDetailsPage(detailsData)

      .log('Click Next btn')
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(review_title)
      .verifyListBoxText(review_checkbox)
      .verifyListBoxText(detailsData.firstName)
      .verifyListBoxText(detailsData.lastName)
      .verifyListBoxText(detailsData.postcode)
      .verifyListBoxText(type_of_care_lsBox[0])
      .verifyListBoxText(hours_lsbox[0])
      .verifyHrefExist(href[0])
      .verifyHrefExist(href[1])

      .log('Click Finish btn')
      .clickElementOnText(data.signup.worker.button, 'Finish')
      .checkClickSkipForNow()

      .log(`Verify the alert: ${alertCheckBox}`)
      .verifyListBoxText(alertCheckBox)

      .log('Select the required checkbox')
      .clickElementOnText(
        data.signup.worker.checkbox,
        review_checkbox[0],
      )

      .log('Click Finish btn')
      .clickElementOnText(data.signup.worker.button, 'Finish')
      .wait(2000)
      .clickElementOnText('button', 'Skip for now')
      .clickElementByText('Next')

      .wait(2000)
      .clickElementOnText('button', 'Skip')

      .log('Click Account btn')
      .clickElementOnText('.editProfile span', 'Account')

      .log('Go to the Personal Details')
      .clickElementOnText('.subMenu span', 'Payment details')
      .verifyTextVisible('Payment details')
      .get(`.checked ${data.clientOnboarding.payment.has_govt_funding}`)
      .parents('.checked')
      .invoke('text')
      .then(value => expect(value).to.equal('Yes'))

      .get(`.checked ${data.clientOnboarding.payment.funding_source_id}`)
      .parents('.checked')
      .invoke('text')
      .then((value) => expect(value).to.equal('NDIS'));
  });

  it('ES-T2709. Responsive design: Left NAV', () => {
    const clientEmail = 'automation_victor.incompleteprofile+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.viewport(550, 750)

      .log('Login')
      .loginToDashboard(clientEmail, clientPass)

      .log('Click Menn btn')
      .clickElement(data.clientOnboarding.menuToggleBtn)

      .log('Verify all sections in the left NAV')
      .verifyTextVisible('Dashboard')
      .verifyTextVisible('Search workers')
      .verifyTextVisible('Jobs')
      .verifyTextVisible('Support hours')
      .verifyTextVisible('Inbox')
      .verifyTextVisible('My support workers')
      .verifyTextVisible('Invite workers')
      .verifyTextVisible('Shortlist')
      .verifyTextVisible('Billing')
      .verifyTextVisible('Notes')

      .log('Click Account btn')
      .clickElementOnText('.editProfile span', 'Account')

      .log('Verify account page')
      .verifyTextVisible('Victor’s personal details')
      .verifyTextVisible('The person receiving support.');
  });

  it('ES-T2710. Responsive design: Personal details', () => {
    const clientEmail = 'automation_badong+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.viewport(550, 750)

      .log('Login')
      .loginToDashboard(clientEmail, clientPass)

      .log('Click Account btn')
      .clickElementOnText('.editProfile span', 'Account')

      .log('Verify account page')
      .verifyTextVisible('The person receiving support.')

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
        "is under 18 so check workers' profiles to make sure they have a Working with Children Check.",
      )

      .selectDropdown(
        data.clientOnboarding.personal.participant.birthDate,
        '1996',
        2,
      )
      .verifyTextNotExist(
        "is under 18 so check workers' profiles to make sure they have a Working with Children Check.",
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

      .log('Click Save and continue btn')
      .clickElementOnText('button span', 'Save and continue')
      .wait(2000)
      .verifyTextVisible('Who to add to your contacts');
  });

  it('ES-T2711. Responsive design: Self Managed', () => {
    const clientEmail = 'automation_victor.incompleteprofile+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.viewport(550, 750)

      .log('Login')
      .loginToDashboard(clientEmail, clientPass)

      .log('Click Menn btn')
      .clickElement(data.clientOnboarding.menuToggleBtn)

      .log('Click Account btn')
      .clickElementOnText('.editProfile span', 'Account')

      .log('Click Menn btn')
      .clickElement(data.clientOnboarding.menuToggleBtn)

      .log('Go to the Payment details')
      .clickElementOnText(
        '.subMenu span',
        'Payment details',
      )

      .log('Click "Yes" on Are you using government funding to pay for this support?')
      .get(`.checked ${data.clientOnboarding.payment.has_govt_funding}`)
      .parents('.checked')
      .find('span.radioLabel')
      .then($el => {
        if ($el.text === 'No') {
          cy.clickElementOnText(
            '.radioBtn span.radioLabel',
            'Yes',
          );
        }
      })

      .log('Click "NDIS" on What type of funding?')
      .get(`.checked ${data.clientOnboarding.payment.funding_source_code}`)
      .parents('.checked')
      .find('span.radioLabel')
      .then($el => {
        if ($el.text !== 'NDIS') {
          cy.clickElementOnText(
            '.radioBtn span.radioLabel',
            'NDIS',
          );
        }
      })

      .log('Click "Self managed" on What type of plan?')
      .get(`.checked ${data.clientOnboarding.payment.funding_source_code}`)
      .parents('.checked')
      .find('span.radioLabel')
      .then($el => {
        if ($el.text !== 'Self managed') {
          cy.clickElementOnText(
            '.radioBtn span.radioLabel',
            'Self managed',
          );
        }
      })

      .log('Click close icon on the Full NDIS letter if exist')
      .wait(2000)
      .get('body')
      .then($body => {
        if ($body.find(`${data.clientOnboarding.payment.ndis_letter_delete}`).length > 0) {
          cy
            .clickElement(data.clientOnboarding.payment.ndis_letter_delete, true)

            .log('Click yes on the delete popup')
            .clickElementOnText(
              'mat-dialog-container button',
              'No',
            )

            .clickElement(data.clientOnboarding.payment.ndis_letter_delete, true)

            .log('Click yes on the delete popup')
            .clickElementOnText(
              'mat-dialog-container button',
              'Yes',
            );
        }
      })

      .log('Upload the file')
      .get(data.clientOnboarding.payment.ndis_letter_input)
      .attachFile('debit.pdf')
      .wait(2000)
      .verifyElementExist(data.clientOnboarding.payment.ndis_letter_delete)

      .log('Click close icon on evidence if exist')
      .wait(2000)
      .get('body')
      .then($body => {
        if ($body.find(`${data.clientOnboarding.payment.evidence_delete}`).length > 0) {
          cy
            .clickElement(data.clientOnboarding.payment.evidence_delete, true)

            .log('Click yes on the delete popup')
            .clickElementOnText(
              'mat-dialog-container button',
              'No',
            )

            .clickElement(data.clientOnboarding.payment.evidence_delete, true)

            .log('Click yes on the delete popup')
            .clickElementOnText(
              'mat-dialog-container button',
              'Yes',
            );
        }
      })

      .log('Upload the file')
      .get(data.clientOnboarding.payment.evidence_input)
      .attachFile('debit.pdf')
      .wait(2000)
      .verifyElementExist(data.clientOnboarding.payment.evidence_delete)

      .log('Input NDIS field')
      .inputTextField(
        data.clientOnboarding.payment.nidsNumber,
        'hfgd',
      )
      .verifyTextVisible('Provide a valid NDIS number')

      .log('Clear NDIS field')
      .clearTextField(data.clientOnboarding.payment.nidsNumber)
      .verifyTextVisible('Provide an NDIS number')

      .log('Input NDIS field')
      .inputTextField(
        data.clientOnboarding.payment.nidsNumber,
        '122345665',
      )
      .verifyTextNotExist('Provide a valid NDIS number')

      .log("Input the field on Main recipient's email addrees")
      .inputTextField(
        data.clientOnboarding.payment.mainRecipientInput,
        'toan.test@gmail.com',
      )

      .log("Input the field on Additional recipient's email addrees")
      .inputTextField(
        data.clientOnboarding.payment.additionalRecipient,
        'toan.test123@gmail.com',
      )

      .log("Clear Additional recipient's eamil address")
      .clearTextField(data.clientOnboarding.payment.additionalRecipient)

      .log('Click Submit btn')
      .clickElementOnText(
        'button span',
        'Submit',
      )

      .verifyElementVisible(
        'h2',
        'Nice one!',
      )
      .verifyElementContainsText(
        'h2 span',
        'Account details sent for verification',
      )
      .verifyElementContainsText(
        'mat-dialog-actions button',
        'Search workers',
      );
  });

  it('ES-T2707. Check Behaviour support plan is enabled on Client Profile', () => {
    const {
      account_type_title,
      account_type_lsBox,
      participant_relationship_title,
      participant_relationship_lsBox,
      age_gate_title,
      age_gate_lsBox,
      suburb_title,
      type_of_care_title,
      type_of_care_lsBox,
      payment_title,
      payment_lsBox,
      ndis_title,
      ndis_lsBox,
      // urgency_of_care_title,
      // urgency_of_care_lsbox,
      hours_title,
      hours_lsbox,
      detail_title,
      review_title,
      review_checkbox,
      href,
      // dashboard_title,
      alertCheckBox,
      detailsData,
    } = data.signupData;

    detailsData.firstName = faker.name.firstName();
    detailsData.participantFirstName = faker.name.firstName();
    detailsData.lastName = faker.name.lastName();
    detailsData.participantLastName = faker.name.lastName();
    detailsData.phone = '0491570110';
    detailsData.email = faker.internet.email().toLowerCase();
    detailsData.password = 'qaAutomation2021';
    detailsData.postcode = '2000';

    cy
      .log('Click "Sign up here" btn')
      .clickElement('#content a[href="/register"]')
      .log('Verify user navigate to registration page')
      .verifyCurrentURL('register')

      .verifyListBoxText(account_type_title)
      .verifyListBoxText(account_type_lsBox)

      .log(`Click on ${account_type_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', account_type_lsBox[0])

      .verifyListBoxText(participant_relationship_title)
      .verifyListBoxText(participant_relationship_lsBox)

      .log(`Click on ${participant_relationship_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', participant_relationship_lsBox[0])

      .verifyListBoxText(age_gate_title)
      .verifyListBoxText(age_gate_lsBox)

      .log(`Click on ${age_gate_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', age_gate_lsBox[0])

      .verifyListBoxText(suburb_title)
      .inputTextField(data.signup.worker.postcodeInput, detailsData.postcode)
      .clickElement(data.signup.worker.optionSuburb, true, 0)

      .verifySuburbTextbox(detailsData.postcode)

      .log('Click Next btn')
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(type_of_care_title)
      .verifyListBoxText(type_of_care_lsBox)

      .log(`Click on ${type_of_care_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', type_of_care_lsBox[0])

      .verifyListBoxText(payment_title)
      .verifyListBoxText(payment_lsBox)

      .log(`Click on ${payment_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', payment_lsBox[0])

      .verifyListBoxText(ndis_title)
      .verifyListBoxText(ndis_lsBox)

      .log(`Click on ${ndis_lsBox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', ndis_lsBox[0])

      // .verifyListBoxText(urgency_of_care_title)
      // .verifyListBoxText(urgency_of_care_lsbox)
      // .log(`click on ${urgency_of_care_lsbox[0]}`)
      // .clickElementOnTextNoWaitNoPosition('button span', urgency_of_care_lsbox[0])
      .verifyListBoxText(hours_title)
      .verifyListBoxText(hours_lsbox)

      .log(`Click on ${hours_lsbox[0]}`)
      .clickElementOnTextNoWaitNoPosition('button span', hours_lsbox[0])

      .verifyListBoxText(detail_title)

      .inputDetailsPage(detailsData)

      .log('Click Next btn')
      .clickElementOnText(data.signup.worker.button, 'Next')

      .verifyListBoxText(review_title)
      .verifyListBoxText(review_checkbox)
      .verifyListBoxText(detailsData.firstName)
      .verifyListBoxText(detailsData.lastName)
      .verifyListBoxText(detailsData.postcode)
      .verifyListBoxText(type_of_care_lsBox[0])
      .verifyListBoxText(hours_lsbox[0])
      .verifyHrefExist(href[0])
      .verifyHrefExist(href[1])

      .log('Click Finish btn')
      .clickElementOnText(data.signup.worker.button, 'Finish')
      .checkClickSkipForNow()

      .log(`Verify the alert: ${alertCheckBox}`)
      .verifyListBoxText(alertCheckBox)

      .log('Select the required checkbox')
      .clickElementOnText(
        data.signup.worker.checkbox,
        review_checkbox[0],
      )

      .log('Click Finish btn')
      .clickElementOnText(data.signup.worker.button, 'Finish')
      .wait(2000)
      .clickElementOnText('button', 'Skip for now')
      .clickElementByText('Next')
      .wait(2000)
      .clickElementOnText('button', 'Skip')

      .log('Click Account btn')
      .clickElementOnText('.editProfile span', 'Account')

      .log('Verify the Behaviour support plan')
      .verifyTextExist('Behaviour support plan')
      .verifyTextExist('What’s a behaviour support plan?')
      .verifyElementExist(data.clientOnboarding.personal.plan);
  });

  it('ES-T2668. Account verification: Pre-approval - Coordinator - Check Personal details', () => {
    const clientEmail = 'automation_linda.coordinator@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginToDashboard(
        clientEmail,
        clientPass,
      )

      .log('Login as Froilan')
      .clickElementOnText(
        'button',
        'Login as Jojo',
      )

      .log('Click Account btn')
      .clickElementOnText(
        '.editProfile span',
        'Account',
      )

      .log('Verify account page')
      .verifyTextVisible('The person receiving support.')

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
        "is under 18 so check workers' profiles to make sure they have a Working with Children Check.",
      )

      .selectDropdown(
        data.clientOnboarding.personal.participant.birthDate,
        '1996',
        2,
      )
      .verifyTextNotExist(
        "is under 18 so check workers' profiles to make sure they have a Working with Children Check.",
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

      .log('Click Save and continue btn')
      .clickElementOnText('button span', 'Save and continue')
      .verifyTextVisible('My contacts')
      .verifyTextVisible('Who to add to your contacts');
  });

  it('ES-T2641. Check payment details: Government fund - Other', () => {
    const clientEmail = 'automation_vivian.otherfunding+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginToDashboard(
        clientEmail,
        clientPass,
      )

      .log('Click Account btn')
      .clickElementOnText(
        '.editProfile span',
        'Account',
      )

      .log('Go to the Payment Details')
      .clickElementOnText(
        '.subMenu span',
        'Payment details',
      )
      .verifyTextVisible('Payment details')
      .verifyTextVisible('Pending verification – your details are being verified.')

      .log('Click "Yes" on Are you using government funding to pay for this support?')
      .get(`.checked ${data.clientOnboarding.payment.has_govt_funding}`)
      .parents('.checked')
      .find('span.radioLabel')
      .then($el => {
        if ($el.text === 'No') {
          cy.clickElementOnText(
            '.radioBtn span.radioLabel',
            'Yes',
          );
        }
      })

      .log('Click "NDIS" on What type of funding?')
      .get(`.checked ${data.clientOnboarding.payment.funding_source_id}`)
      .parents('.checked')
      .find('span.radioLabel')
      .then($el => {
        if ($el.text !== 'Other') {
          cy.clickElementOnText(
            '.radioBtn span.radioLabel',
            'Other',
          );
        }
      })

      .log('Input any character in Invoice reference')
      .inputTextField(
        data.clientOnboarding.payment.invoicesInput,
        '2355Ahfyf',
      )

      .log('Clear the value in Invoice reference')
      .clearTextField(data.clientOnboarding.payment.invoicesInput)

      .log("Input the field on Main recipient's email addrees")
      .inputTextField(
        data.clientOnboarding.payment.mainRecipientInput,
        'toan.test@gmail.com',
      )

      .log("Input the field on Additional recipient's email addrees")
      .inputTextField(
        data.clientOnboarding.payment.additionalRecipient,
        'toan.test123@gmail.com',
      )

      .log('Clear the two emails inputted on the Recipient email 1 and 2')
      .clearTextField(data.clientOnboarding.payment.mainRecipientInput)
      .clearTextField(data.clientOnboarding.payment.additionalRecipient)

      .log('Click Submit btn')
      .clickElementOnText(
        'button span',
        'Submit',
      )
      .verifyElementVisible(
        'h2',
        'Contact us to proceed further',
      )
      .verifyElementContainsText(
        'mat-dialog-actions button',
        'Ok got it',
      );
  });

  it('ES-T2667. Account verification: Pre-approval - Participant managed - Check My contacts', () => {
    const clientEmail = 'automation_zaida+participantmanaged@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginToDashboard(
        clientEmail,
        clientPass,
      )

      .log('Click Account btn')
      .clickElementOnText(
        '.editProfile span',
        'Account',
      )

      .log('Verify account page')
      .verifyTextVisible('The person receiving support.')

      .log('Go to the My contacts')
      .clickElementOnText(
        '.subMenu span',
        'My contacts',
      )
      .verifyTextVisible('My contacts')
      .verifyTextVisible("What's their relationship with Primo?")
      .verifyTextVisible('Full name')
      .verifyTextVisible('Contact phone')
      .verifyTextVisible('Email (optional)')
      .verifyTextVisible('Add as an emergency contact')
      .verifyTextVisible('Authorised to receive information')

      .log('Check relationship field')
      .verifyElementContainsText(
        data.clientOnboarding.contact.relationshipOptions,
        'Partner / Spouse',
      )
      .verifyElementContainsText(
        data.clientOnboarding.contact.relationshipOptions,
        'Immediate Family',
      )
      .verifyElementContainsText(
        data.clientOnboarding.contact.relationshipOptions,
        'Extended Family',
      )
      .verifyElementContainsText(
        data.clientOnboarding.contact.relationshipOptions,
        'Legal Representative / Advocate',
      )
      .verifyElementContainsText(
        data.clientOnboarding.contact.relationshipOptions,
        'Approved Provider / Care Coordinator',
      )
      .verifyElementContainsText(
        data.clientOnboarding.contact.relationshipOptions,
        'Friend / Neighbour',
      )

      .log('Enter the full name of contant can not be same as participant')
      .inputTextField(
        data.clientOnboarding.contact.name,
        'Primo Pineda',
      )
      .verifyTextVisible('Can’t be the person receiving support.')

      .log('Enter the full name of the person managing the account.')
      .inputTextField(
        data.clientOnboarding.contact.name,
        'Zaida Pineda',
      )
      .verifyTextVisible('Can’t be the person managing this account.')

      .log('Enter the full name')
      .inputTextField(
        data.clientOnboarding.contact.name,
        'toan test',
      )

      .log('Input phone')
      .inputTextField(
        data.clientOnboarding.contact.phone,
        '0436458885',
      )

      .log('Input email')
      .inputTextField(
        data.clientOnboarding.contact.email,
        'test123@gmail.com',
      )

      .log('Toogle off on emergency checkbox')
      .get(data.clientOnboarding.contact.emergency)
      .invoke('attr', 'aria-checked')
      .then(value => {
        if (value) cy.clickElement(data.clientOnboarding.contact.emergency, true);
      })

      .log('Click Submit form')
      .clickElementOnText(
        'button span',
        'Save and continue',
      )
      .verifyTextVisible('You must have at least 1 emergency contact listed.')

      .log('Toggle on for emergency checkbox')
      .clickElement(data.clientOnboarding.contact.emergency, true)

      .log('Toggle  on/off on authorised information')
      .clickElement(data.clientOnboarding.contact.authorisedInformation, true)

      .log('Click Add another contact')
      .clickElementOnText(
        'button span',
        'Add another contact',
      )

      .log('Delete contact')
      .get(data.clientOnboarding.contact.deleteContact)
      .last()
      .click({ force: true })

      .log('Click Submit form')
      .clickElementOnText(
        'button span',
        'Save and continue',
      )
      .verifyTextVisible('Payment details');
  });

  it('ES-T2642. Check payment details: Non Government fund - Credit card', () => {
    const clientEmail = 'automation_iryn.creditcard+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginToDashboard(
        clientEmail,
        clientPass,
      )

      .log('Click Account btn')
      .clickElementOnText(
        '.editProfile span',
        'Account',
      )

      .log('Go to the Payment Details')
      .clickElementOnText(
        '.subMenu span',
        'Payment details',
      )
      .verifyTextVisible('Payment details')

      .log('Click "No" on Are you using government funding to pay for this support?')
      .get(`.checked ${data.clientOnboarding.payment.has_govt_funding}`)
      .parents('.checked')
      .find('span.radioLabel')
      .then($el => {
        if ($el.text === 'Yes') {
          cy.clickElementOnText(
            '.radioBtn span.radioLabel',
            'No',
          );
        }
      })

      .log('Click "Credid card" on Are you using government funding to pay for this support?')
      .get(`.checked ${data.clientOnboarding.payment.payment_options}`)
      .parents('.checked')
      .find('span.radioLabel')
      .then($el => {
        if ($el.text !== 'Credit card') {
          cy.clickElementOnText(
            '.radioBtn span.radioLabel',
            'Credit card',
          );
        }
      })

      .log('Check the Autorise Mable')
      .get(data.clientOnboarding.payment.authoriseCc)
      .invoke('attr', 'aria-checked')
      .then(value => {
        if (value === 'false') cy.clickElement(data.clientOnboarding.payment.authoriseCc, true);
      })

      .log('Uncheck the Autorise Mable')
      .clickElement(data.clientOnboarding.payment.authoriseCc, true)
      .verifyElementVisible(`.invalid ${data.clientOnboarding.payment.authoriseCc}`)

      .log('Check the Autorise Mable again')
      .clickElement(data.clientOnboarding.payment.authoriseCc, true)

      .log('Click Update credit card btn')
      .clickElementOnText(
        'button span',
        'Update credit card',
      )
      .verifyTextVisible('Your credit card details are securely verified and stored through Spreedly')

      .log('Click Cancel btn')
      .clickElementOnText(
        '#spreedly-close-button',
        'Cancel',
      )

      .log('Click Submit form')
      .clickElementOnText(
        'button span',
        'Submit',
      )
      .verifyTextVisible('Nice one! ')
      .verifyTextVisible('Your account details are verified')
      .verifyElementContainsText(
        'mat-dialog-actions button',
        'Search workers',
      );
  });

  it('ES-T2642.2 Check payment details: Request/Active agreement', () => {
    const clientEmail = 'automation_activeagreement.creditcard+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginToDashboard(
        clientEmail,
        clientPass,
      )

      .log('Click Account btn')
      .clickElementOnText(
        '.editProfile span',
        'Account',
      )

      .log('Go to the Personal Details')
      .clickElementOnText(
        '.subMenu span',
        'Payment details',
      )
      .verifyTextVisible('Payment details')

      .log('Click "No" on Are you using government funding to pay for this support?')
      .get(`.checked ${data.clientOnboarding.payment.has_govt_funding}`)
      .parents('.checked')
      .find('span.radioLabel')
      .then($el => {
        if ($el.text === 'Yes') {
          cy.clickElementOnText(
            '.radioBtn span.radioLabel',
            'No',
          );
        }
      })

      .log('Click "Credid card" on Are you using government funding to pay for this support?')
      .get(`.checked ${data.clientOnboarding.payment.payment_options}`)
      .parents('.checked')
      .find('span.radioLabel')
      .then($el => {
        if ($el.text !== 'Credit card') {
          cy.clickElementOnText(
            '.radioBtn span.radioLabel',
            'Credit card',
          );
        }
      })

      .log('Check the Autorise Mable')
      .get(data.clientOnboarding.payment.authoriseCc)
      .invoke('attr', 'aria-checked')
      .then(value => {
        if (value === 'false') cy.clickElement(data.clientOnboarding.payment.authoriseCc, true);
      })

      .log('Uncheck the Autorise Mable')
      .clickElement(data.clientOnboarding.payment.authoriseCc, true)
      .verifyElementVisible(`.invalid ${data.clientOnboarding.payment.authoriseCc}`)

      .log('Check the Autorise Mable again')
      .clickElement(data.clientOnboarding.payment.authoriseCc, true)

      .log('Click Update credit card btn')
      .clickElementOnText(
        'button span',
        'Update credit card',
      )
      .verifyTextVisible('Your credit card details are securely verified and stored through Spreedly')

      .log('Click Cancel btn')
      .clickElementOnText(
        '#spreedly-close-button',
        'Cancel',
      )

      .log('Click Submit form')
      .clickElementOnText(
        'button span',
        'Submit',
      )
      .verifyTextVisible('Nice one! ')
      .verifyTextVisible('Your account details are verified')
      .verifyElementContainsText(
        'mat-dialog-actions button',
        'View agreement',
      );
  });

  it('ES-T2643. Check payment details: Non Government fund - Direct debit', () => {
    const clientEmail = 'automation_tomholland_directdebit+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginToDashboard(
        clientEmail,
        clientPass,
      )

      .log('Click Account btn')
      .clickElementOnText(
        '.editProfile span',
        'Account',
      )

      .log('Go to the Personal Details')
      .clickElementOnText(
        '.subMenu span',
        'Payment details',
      )
      .verifyTextVisible('Payment details')

      .log('Click "No" on Are you using government funding to pay for this support?')
      .get(`.checked ${data.clientOnboarding.payment.has_govt_funding}`)
      .parents('.checked')
      .find('span.radioLabel')
      .then($el => {
        if ($el.text === 'Yes') {
          cy.clickElementOnText(
            '.radioBtn span.radioLabel',
            'No',
          );
        }
      })

      .log('Click "Direct debit" on Are you using government funding to pay for this support?')
      .get(`.checked ${data.clientOnboarding.payment.payment_options}`)
      .parents('.checked')
      .find('span.radioLabel')
      .then($el => {
        if ($el.text !== 'Direct Debit') {
          cy.clickElementOnText(
            '.radioBtn span.radioLabel',
            'Direct debit',
          );
        }
      })

      .log('Fill debitForm')
      .fillDebitForm()

      .log('Click close btn on Signed direct debit form')
      .clickElement(
        'app-file-upload a.delete',
        true,
        0,
      )

      .log('Click Yes on confirmation popup ')
      .clickElementOnText(
        '.mat-dialog-actions button',
        'Yes',
      )
      .wait(2000)

      .log('Reupload file on Signed direct debit form')
      .uploadFilePaymentDetails('debit.pdf', 0)
      .wait(2000)

      .log('Click close btn on Power of attorney statement')
      .clickElement(
        'app-file-upload a.delete',
        true,
        1,
      )

      .log('Click Yes on confirmation popup ')
      .clickElementOnText(
        '.mat-dialog-actions button',
        'Yes',
      )
      .wait(2000)

      .log('Reupload file on Power of attorney statement')
      .uploadFilePaymentDetails('debit.pdf', 1)
      .wait(2000)

      .log('Click Submit btn')
      .clickElementOnText(
        'button span',
        'Submit',
      )

      .verifyElementVisible(
        'h2',
        'Nice one!',
      )
      .verifyTextVisible(
        'Account details sent for verification')
      .verifyElementContainsText(
        'mat-dialog-actions button',
        'Search workers',
      );
  });

  it('ES-T2643.2 Check payment details: Client account with request agreement', () => {
    const clientEmail = 'automation_dencio.activeagreement.debit+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginToDashboard(
        clientEmail,
        clientPass,
      )

      .log('Click Account btn')
      .clickElementOnText(
        '.editProfile span',
        'Account',
      )

      .log('Go to the Personal Details')
      .clickElementOnText(
        '.subMenu span',
        'Payment details',
      )
      .verifyTextVisible('Payment details')

      .log('Click "No" on Are you using government funding to pay for this support?')
      .get(`.checked ${data.clientOnboarding.payment.has_govt_funding}`)
      .parents('.checked')
      .find('span.radioLabel')
      .then($el => {
        if ($el.text === 'Yes') {
          cy.clickElementOnText(
            '.radioBtn span.radioLabel',
            'No',
          );
        }
      })

      .log('Click "Direct debit" on Are you using government funding to pay for this support?')
      .get(`.checked ${data.clientOnboarding.payment.payment_options}`)
      .parents('.checked')
      .find('span.radioLabel')
      .then($el => {
        if ($el.text !== 'Direct Debit') {
          cy.clickElementOnText(
            '.radioBtn span.radioLabel',
            'Direct debit',
          );
        }
      })

      .log('Fill debitForm')
      .fillDebitForm()
      .wait(2000)

      .log('Click close btn on Signed direct debit form')
      .clickElement(
        'app-file-upload a.delete',
        true,
        0,
      )

      .log('Click Yes on confirmation popup ')
      .clickElementOnText(
        '.mat-dialog-actions button',
        'Yes',
      )
      .wait(2000)

      .log('Reupload file on Signed direct debit form')
      .uploadFilePaymentDetails('debit.pdf', 0)
      .wait(2000)

      .log('Click Submit btn')
      .clickElementOnText(
        'button span',
        'Submit',
      )

      .wait(2000)
      .verifyElementVisible(
        'h2',
        'Nice one!',
      )
      .verifyElementContainsText(
        'h2 span',
        'Account details sent for verification',
      )
      .verifyElementContainsText(
        'mat-dialog-actions button',
        'Complete profile',
      );
  });

  it('ES-T2669. Account verification: Pre-approval - Coordinator - Check My contacts', () => {
    const clientEmail = 'automation_badong+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginToDashboard(
        clientEmail,
        clientPass,
      )

      .log('Click Account btn')
      .clickElementOnText(
        '.editProfile span',
        'Account',
      )

      .log('Go to the My Contacts')
      .clickElementOnText(
        '.subMenu span',
        'My contacts',
      )
      .verifyTextVisible('My contacts')
      .verifyTextVisible("What's their relationship with Jojo?")
      .verifyTextVisible('Full name')
      .verifyTextVisible('Contact phone')
      .verifyTextVisible('Email (optional)')
      .verifyTextVisible('Add as an emergency contact')
      .verifyTextVisible('Authorised to receive information')

      .log('Enter the full name of the person receiving the support')
      .inputTextFieldAtPosition(
        data.clientOnboarding.contact.name,
        'Sharlene NC',
        0,
      )

      .log('Input phone')
      .inputTextFieldAtPosition(
        data.clientOnboarding.contact.phone,
        '0436458885',
        0,
      )

      .log('Input email')
      .inputTextFieldAtPosition(
        data.clientOnboarding.contact.email,
        'test123@gmail.com',
        0,
      )

      .log('Toogle off on emergency checkbox')
      .get(data.clientOnboarding.contact.emergency)
      .eq(0)
      .invoke('attr', 'aria-checked')
      .then(value => {
        if (value) cy.clickElement(data.clientOnboarding.contact.emergency, true, 0);
      })

      .log('Click Submit form')
      .clickElementOnText(
        'button span',
        'Save and continue',
      )
      .verifyTextVisible('You must have at least 1 emergency contact listed.')

      .log('Toggle on for emergency checkbox')
      .clickElement(data.clientOnboarding.contact.emergency, true, 0)

      .log('Toggle  on/off on authorised information')
      .clickElement(data.clientOnboarding.contact.authorisedInformation, true, 0)

      .get('[formarrayname="contactsAttributes"]')
      .then((el) => {
        for (let i = el.length; i < 4; i += 1) {
          cy
            .log('Click Add another contact')
            .clickElementOnText(
              'button span',
              'Add another contact',
            );
        }
      })

      .log('Verify user cannot add another contact. Max 4 accouts')
      .verifyTextNotExist('Add another contact')
      .verifyTextVisible('You must have at least 1 emergency contact listed.')

      .log('Delete contact')
      .get(data.clientOnboarding.contact.deleteContact)
      .last()
      .click({ force: true })

      .log('Click Submit form')
      .clickElementOnText(
        'button span',
        'Save and continue',
      )
      .verifyTextVisible('Payment details');
  });

  it('ES-T2670. Account verification: Line items - NDIS plan Details', () => {
    const clientEmail = 'automation_mark.activeagreement+client@donotuse.com.au ';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginToDashboard(
        clientEmail,
        clientPass,
      )

      .log('Click Account btn')
      .clickElementOnText(
        '.editProfile span',
        'Account',
      )

      .log('Go to the NDIS Plan Details')
      .clickElementOnText(
        '.subMenu span',
        'NDIS Plan Details',
      )
      .verifyTextVisible('NDIS plan details')

      .log('Input NDIS number')
      .inputTextField(
        data.clientOnboarding.ndis.ndisNumber,
        1234567,
      )

      .log('Input Day/Month/Year in Start Date')
      .selectDropdown(
        data.clientOnboarding.ndis.startDate,
        10,
        0,
      )
      .selectDropdown(
        data.clientOnboarding.ndis.startDate,
        'May',
        1,
      )
      .selectDropdown(
        data.clientOnboarding.ndis.startDate,
        '2022',
        2,
      )

      .log('Input Day/Month/Year in Review Date')
      .selectDropdown(
        data.clientOnboarding.ndis.reviewDate,
        10,
        0,
      )
      .selectDropdown(
        data.clientOnboarding.ndis.reviewDate,
        'July',
        1,
      )
      .selectDropdown(
        data.clientOnboarding.ndis.reviewDate,
        '2025',
        2,
      )

      .log('Input Amount')
      .inputTextField(
        data.clientOnboarding.ndis.amount,
        23,
      )

      .log('Input "A" and select one in dropdown')
      .inputTextField(
        data.clientOnboarding.ndis.ndisSupportItems,
        'a',
      )
      .clickElement(
        '.resultsList .listOption',
        true,
        0,
      )

      .log('Click Add btn')
      .clickElementOnText(
        'button span',
        'Add',
      )

      .log('Click collapse')
      .clickElement(
        data.clientOnboarding.ndis.collapseIcon,
      )
      .verifyTextVisible('[02_051_0108_1_1] transport')

      .log('Click collapse to hidden the list')
      .clickElement(
        data.clientOnboarding.ndis.collapseIcon,
      )
      .verifyTextNotVisible('[02_051_0108_1_1] transport')

      .log('Select dropdown "Add additional suport area"')
      .verifyElementContainsText(
        '.addButton select option',
        'Assistance with social and community participation',
      )
      .verifyElementContainsText(
        '.addButton select option',
        'Improved living arrangements',
      )
      .verifyElementContainsText(
        '.addButton select option',
        'Finding and keeping a job',
      )

      .log('Click Submit form')
      .clickElementOnText(
        'button span',
        'Save and continue',
      )
      .verifyTextVisible('About Mark')
      .verifyTextVisible('What’s important for support workers to know about Mark?');
  });

  it('ES-T3296. Incomplete Profile check', () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.firstName();
    const rnd = faker.random.alphaNumeric(5);
    const postcode = '2000';
    const suhurb = 'Barangaroo';
    const email = `automation_${firstName.toLowerCase()}_${rnd}.private+client@donotuse.com.au`;
    const password = 'qaAutomation2021';
    const phone = '0491570110';

    cy
      .signUpAClientAndApprovedByAPI(
        email,
        password,
        firstName,
        lastName,
        postcode,
        suhurb,
        phone,
      )

      .log('Login')
      .loginToDashboard(
        email,
        password,
      )

      .log('Click Account btn')
      .clickElementOnText(
        '.editProfile span',
        'Account',
      )

      .log('Go to the Personal Details')
      .clickElementOnText(
        '.subMenu span',
        'Payment details',
      )
      .verifyTextVisible('Payment details')

      .log('Upload the file')
      .get(data.clientOnboarding.payment.evidence_input)
      .attachFile('debit.pdf')
      .wait(2000)
      .verifyElementVisible(data.clientOnboarding.payment.evidence_delete)

      .log('Input NDIS field')
      .inputTextField(
        data.clientOnboarding.payment.nidsNumber,
        '122345665',
      )

      .log('Click Submit btn')
      .clickElementOnText(
        'button span',
        'Submit',
      )

      .log('Click Complete Now btn')
      .clickElementOnText(
        'mat-dialog-actions button',
        'Complete now',
      )
      .verifyTextVisible('personal details')

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
        '1996',
        2,
      )

      .log('Input Contact Phone')
      .inputTextField(
        data.clientOnboarding.personal.participant.contactPhone,
        '0436458885',
      )

      .log('Input address')
      .inputTextField(data.clientOnboarding.personal.address, '1st')

      .log('Select option in "Behaviour support plan" dropdown')
      .selectDropdown(data.clientOnboarding.personal.plan, 'No')

      .log('Click Save and continue btn')
      .clickElementOnText('button span', 'Save and continue')
      .verifyTextVisible('My contacts')
      .verifyTextVisible('Who to add to your contacts')

      .log('Go to the Personal Details')
      .clickElementOnText(
        '.subMenu span',
        'Payment details',
      )
      .verifyTextVisible('Payment details')

      .log('Click Submit btn')
      .clickElementOnText(
        'button span',
        'Submit',
      )

      .log('Click Complete Now btn')
      .clickElementOnText(
        'mat-dialog-actions button',
        'Complete now',
      )
      .verifyTextVisible('My contacts');
  });
});
